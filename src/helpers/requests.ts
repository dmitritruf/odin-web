import { AnyFn, DecoratedFn } from '@/shared-types'
import axios from 'axios'

function cacheAnswers<T extends AnyFn>(
  func: AnyFn,
  cacheTime: number = 1000 * 60 * 5
): DecoratedFn<T> {
  const memoCache = new Map<string, { time: Date; result: ReturnType<T> }>()
  return (...args: Parameters<T>): ReturnType<T> => {
    const memoKey = JSON.stringify(args)
    console.log('memoKey', memoKey)
    if (memoCache.has(memoKey)) {
      const entryDate = memoCache.get(memoKey)?.time as Date
      const diff = Date.now() - entryDate?.getTime()
      if (diff >= cacheTime) {
        return memoCache.get(memoKey)?.result as ReturnType<T>
      }
    }
    const res = func(...args)
    if (res instanceof Promise) {
      return res.then((r: ReturnType<T>) => {
        memoCache.set(memoKey, { time: new Date(), result: r })
        console.log(memoCache)
        return res
      }) as ReturnType<T>
    } else {
      memoCache.set(memoKey, { time: new Date(), result: res as ReturnType<T> })
      return res as ReturnType<T>
    }
  }
}

export const getAPIDate = cacheAnswers((url) => axios.get(url))

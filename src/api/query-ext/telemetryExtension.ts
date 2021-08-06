import Long from 'long'

import { QueryClient, createRpc } from '@cosmjs/stargate'
import {
  QueryAvgBlockSizeRequest,
  QueryAvgBlockSizeResponse,
  QueryAvgBlockTimeRequest,
  QueryAvgBlockTimeResponse,
  QueryAvgTxFeeRequest,
  QueryAvgTxFeeResponse,
  QueryClientImpl,
  QueryExtendedValidatorsRequest,
  QueryExtendedValidatorsResponse,
  QueryTopBalancesRequest,
  QueryTopBalancesResponse,
  QueryTopValidatorsRequest,
  QueryTopValidatorsResponse,
  QueryTxVolumeRequest,
  QueryTxVolumeResponse,
  QueryValidatorBlocksRequest,
} from '@provider/codec/telemetry/query'

class Pagination {
  offset: Long
  limit: Long
  desc: string
  countTotal: boolean

  constructor(
    offset: number,
    limit: number,
    desc: string,
    countTotal: boolean
  ) {
    this.offset = new Long(offset)
    this.limit = new Long(limit)
    this.desc = desc
    this.countTotal = countTotal
  }
}

export interface TelemetryExt {
  telemetry: {
    unverified: {
      topBalances: ({
        ...args
      }: QueryTopBalancesRequest) => Promise<QueryTopBalancesResponse>
      extendedValidators: ({
        ...args
      }: QueryExtendedValidatorsRequest) => Promise<QueryExtendedValidatorsResponse>
      avgBlockSize: ({
        ...args
      }: QueryAvgBlockSizeRequest) => Promise<QueryAvgBlockSizeResponse>
      avgBlockTime: ({
        ...args
      }: QueryAvgBlockTimeRequest) => Promise<QueryAvgBlockTimeResponse>
      txVolume: ({
        ...args
      }: QueryTxVolumeRequest) => Promise<QueryTxVolumeResponse>
      avgTxFee: ({
        ...args
      }: QueryAvgTxFeeRequest) => Promise<QueryAvgTxFeeResponse>
      topValidators: ({
        ...args
      }: QueryTopValidatorsRequest) => Promise<QueryTopValidatorsResponse>
      validatorBlocks: ({
        ...args
      }: QueryValidatorBlocksRequest) => Promise<QueryTopValidatorsResponse>
    }
  }
}

function setupTelemetryExtension(base: QueryClient): TelemetryExt {
  const rpc = createRpc(base)
  const queryService = new QueryClientImpl(rpc)
  return {
    telemetry: {
      unverified: {
        topBalances: async (args) => {
          return await queryService.TopBalances({
            denom: args.denom,
            pagination: {
              key: args.pagination.key,
              limit: args.pagination.limit,
              offset: args.pagination.offset,
            },
            desc: args.desc,
          })
        },
        extendedValidators: async (args) => {
          return await queryService.ExtendedValidators({
            status: args.status,
            pagination: {
              key: args.pagination,
              limit: args.pagination.limit,
              offset: args.pagination.offset,
              countTotal: args.pagination.countTotal,
            },
          })
        },
        avgBlockSize: async (args) => {
          return await queryService.AvgBlockSize({
            startDate: args.startDate,
            endDate: args.endDate,
          })
        },
        avgBlockTime: async (args) => {
          return await queryService.AvgBlockTime({
            startDate: args.startDate,
            endDate: args.endDate,
          })
        },
        txVolume: async (args) => {
          return await queryService.TxVolume({
            startDate: args.startDate,
            endDate: args.endDate,
          })
        },
        avgTxFee: async (args) => {
          return await queryService.AvgTxFee({
            startDate: args.startDate,
            endDate: args.endDate,
          })
        },
        topValidators: async (args) => {
          return await queryService.TopValidators({
            startDate: args.startDate,
            endDate: args.endDate,
            pagination: {
              key: args.pagination.key,
              limit: args.pagination.limit,
              offset: args.pagination.offset,
              countTotal: args.pagination.countTotal,
            },
          })
        },
        validatorBlocks: async (args) => {
          return await queryService.ValidatorBlocks({
            validatorAddress: args.validatorAddress,
            pagination: {
              key: args.pagination.key,
              limit: args.pagination.limit,
              offset: args.pagination.offset,
            },
            desc: args.desc,
          })
        },
      },
    },
  }
}

module.exports = {
  setupTelemetryExtension,
  Pagination,
}

<template>
  <div>
    <div class="app-table">
      <div class="app-table__head">
        <span>Block</span>
        <span>Date and time</span>
        <span>Transactions</span>
      </div>
      <div class="app-table__body">
        <template v-if="blocks.length">
          <div
            v-for="item in filteredBlocks"
            :key="toHexFunc(item.blockId.hash)"
            class="app-table__row"
          >
            <div class="app-table__cell">
              <span class="app-table__title">Block</span>
              <TitledLink
                class="app-table__cell-txt app-table__link"
                :text="toHexFunc(item.blockId.hash)"
              />
            </div>
            <div class="app-table__cell">
              <span class="app-table__title">Date and time</span>
              <span>{{ $fDate(item.header.time) }}</span>
            </div>
            <div class="app-table__cell">
              <span class="app-table__title">Transactions</span>
              <span>{{ item.total_tx }}</span>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="app-table__empty-stub">
            <p>No items yet</p>
          </div>
        </template>
      </div>
    </div>

    <template v-if="blocksCount > ITEMS_PER_PAGE">
      <AppPagination
        class="mg-t32"
        v-model="currentPage"
        :pages="totalPages"
        @update:modelValue="paginationHandler"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, toRef, ref, computed } from 'vue'
import { toHexFunc } from '@/helpers/helpers'
import TitledLink from '@/components/TitledLink.vue'
import AppPagination from '@/components/AppPagination/AppPagination.vue'

export default defineComponent({
  components: { TitledLink, AppPagination },
  props: {
    blocks: { type: Array, required: true },
  },
  setup: function (props) {
    const ITEMS_PER_PAGE = 5
    const currentPage = ref(1)
    const blocksCount = ref()
    const filteredBlocks = ref()
    const totalPages = computed(() =>
      Math.ceil(blocksCount.value / ITEMS_PER_PAGE)
    )

    const _blocks = toRef(props, 'blocks')

    const filterBlocks = (newPage: number) => {
      let tempArr = _blocks.value

      if (newPage === 1) {
        filteredBlocks.value = tempArr.slice(0, newPage * ITEMS_PER_PAGE)
      } else {
        filteredBlocks.value = tempArr.slice(
          (newPage - 1) * ITEMS_PER_PAGE,
          (newPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
        )
      }
      currentPage.value = newPage
    }

    const paginationHandler = (num: number) => {
      filterBlocks(num)
    }

    onMounted(() => {
      filterBlocks(currentPage.value)
      blocksCount.value = _blocks.value.length
    })

    return {
      ITEMS_PER_PAGE,
      blocksCount,
      currentPage,
      totalPages,
      filteredBlocks,
      paginationHandler,
      toHexFunc,
    }
  },
})
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <page-table
      :loading="loading"
      :columnList="columnList"
      :data="data">
    </page-table>
  </div>
</template>

<script>
import pageTable from '@/components/table/table.vue'

export default {
  components: {
    pageTable
  },
  data() {
    return {
      loading: false,
      columnList: [],
      data: []
    }
  }
}
</script>

<style>
</style>

<template>
  <Card>
    <page-table
      :loading="loading"
      :columnList="columnList"
      :data="data">
    </page-table>
  </Card>
</template>

<script>
import pageTable from '@/components/table/table.vue'
import { getFined } from '@/api/fine.js'
import moment from '@/libs/moment.js'

export default {
  components: {
    pageTable
  },
  data() {
    return {
      columnList: [
        {
          title: '鸣笛编号',
          key: 'id'
        },
        {
          title: '记录设备编号',
          key: 'record_device'
        },
        {
          title: '违章车牌',
          key: 'car_info'
        },
        {
          title: '违章时间',
          key: 'record_time',
          render: (h, params) => {
            return (
              <span>
                {moment(params.row.record_time).format('llll')}
              </span>
            )
          }
        },
        {
          title: '是否违章',
          key: 'is_illegal'
        }
      ],
      data: [],
      loading: false
    }
  },
  mounted() {
    this.loading = true
    getFined()
      .then((res) => {
        this.data = res.data.data
      })
      .catch(() => {})
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<style>

</style>

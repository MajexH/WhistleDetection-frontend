<template>
  <Card shadow>
    <page-table
      :loading="loading"
      :columnList="columnList"
      :data="serviceData">
    </page-table>
    <service-drawer
      :source="'service'"
      :showDrawer="showDrawer"
      @drawer-close="onDrawerCloes">
    </service-drawer>
  </Card>
</template>

<script>
import serviceDrawer from '@/components/drawer/drawer.vue'
import pageTable from '@/components/table/table.vue'
import { getWhistle } from '@/api/whistle.js'
import moment from '@/libs/moment.js'

export default {
  components: {
    serviceDrawer,
    pageTable
  },
  methods: {
    changeDrawerAction() {
      this.showDrawer = !this.showDrawer
    },
    onDrawerCloes() {
      if (this.showDrawer) {
        this.changeDrawerAction()
      }
    }
  },
  async mounted() {
    this.loading = true
    const res = await getWhistle().catch(() => {})
    this.loading = false
    this.serviceData = res.data.data
  },
  data() {
    return {
      loading: false,
      showDrawer: false,
      serviceData: [],
      columnList: [
        {
          title: '鸣笛编号',
          key: 'id'
        },
        {
          title: '车牌号',
          key: 'car_info'
        },
        {
          title: '记录设备',
          key: 'record_device'
        },
        {
          title: '拍摄位置',
          key: 'record_location'
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
          title: '审核',
          key: 'handle',
          fixed: 'right',
          width: 120,
          render: h => {
            return (
              <i-button
                icon="ios-menu"
                type="text"
                onClick={this.changeDrawerAction}
              />
            )
          }
        }
      ]
    }
  }
}
</script>

<style>
</style>

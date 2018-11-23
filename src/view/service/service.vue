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
          title: '记录ID',
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
          title: '创建时间',
          key: 'record_time'
        },
        {
          title: '审核',
          key: 'handle',
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

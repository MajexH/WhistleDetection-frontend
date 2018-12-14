<template>
  <Card shadow>
    <page-table
      :loading="loading"
      :columnList="columnList"
      :data="serviceData">
    </page-table>
    <service-drawer
      :source="'review'"
      :columnList="columnList"
      :showDrawer="showDrawer"
      @drawer-close="onDrawerCloes">
    </service-drawer>
  </Card>
</template>

<script>
import serviceDrawer from '@/components/drawer/drawer.vue'
import pageTable from '@/components/table/table.vue'
import { getReview } from '@/api/whistle.js'
import { getColumns, transferTime, transferStatus } from '@/libs/util.js'

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
    const res = await getReview().catch(() => {})
    this.loading = false
    this.serviceData = transferTime(res.data.data)
    /**
     * 因为需要有is_dispose is_illegal两个状态进行判断
     * 而Table只支持一个key进行判断
     * 因此map一下data
     * 将data format的两个状态format到一个上
     */
    this.serviceData = transferStatus(this.serviceData)
    this.columnList.push(
      {
        title: '状态',
        key: 'status'
      },
      {
        title: '操作',
        key: 'handle',
        width: 120,
        render: (h, params) => {
          return (
            <i-button
              icon="ios-menu"
              type="text"
              onClick={this.changeDrawerAction}
            />
          )
        }
      }
    )
  },
  data() {
    return {
      loading: false,
      showDrawer: false,
      serviceData: [],
      columnList: getColumns()
    }
  }
}
</script>

<style>
</style>

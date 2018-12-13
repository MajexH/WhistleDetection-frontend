<template>
  <Card shadow>
    <page-table
      :loading="loading"
      :columnList="columnList"
      :data="serviceData">
    </page-table>
    <service-drawer
      :source="'service'"
      :columnList="columnList"
      :showDrawer="showDrawer"
      @drawer-close="onDrawerCloes">
    </service-drawer>
  </Card>
</template>

<script>
import serviceDrawer from '@/components/drawer/drawer.vue'
import pageTable from '@/components/table/table.vue'
import { getWhistle } from '@/api/whistle.js'
import { getColumns } from '@/libs/util.js'

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
    this.columnList.push({
      title: '审核',
      key: 'handle',
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
    })
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

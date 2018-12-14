<template>
  <Card>
    <page-table
      :loading="loading"
      :columnList="columnList"
      :data="data">
    </page-table>
    <service-drawer
      :showButton="false"
      :showDrawer="showDrawer"
      @drawer-close="onDrawerCloes">
    </service-drawer>
  </Card>
</template>

<script>
import pageTable from '@/components/table/table.vue'
import { getNotFined } from '@/api/fine.js'
import serviceDrawer from '@/components/drawer/drawer.vue'
import { getColumns, transferTime } from '@/libs/util.js'

export default {
  components: {
    pageTable,
    serviceDrawer
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
  data() {
    return {
      showDrawer: false,
      columnList: getColumns(),
      data: [],
      loading: false
    }
  },
  mounted() {
    this.columnList.push({
      title: '是否违章',
      key: 'is_illegal',
      render: (h, params) => {
        if (params.row.is_illegal) {
          return (
            <span>是</span>
          )
        } else {
          return (
            <span>否</span>
          )
        }
      }
    }, {
      title: '查看',
      key: 'handle',
      render: (h) => {
        return (
          <i-button
            icon="ios-menu"
            type="text"
            onClick={this.changeDrawerAction}
          />
        )
      }
    })
    this.loading = true
    getNotFined()
      .then((res) => {
        this.data = transferTime(res.data.data)
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

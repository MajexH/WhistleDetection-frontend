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
    const res = await getReview().catch(() => {})
    this.loading = false
    this.serviceData = res.data.data
    /**
     * 因为需要有is_dispose is_illegal两个状态进行判断
     * 而Table只支持一个key进行判断
     * 因此map一下data
     * 将data format的两个状态format到一个上
     */
    this.serviceData.map(item => {
      switch (item.is_dispose) {
        // 未处理
        case false:
          item.status = 0
          break
        // 已处理
        case true:
          if (item.is_illegal) {
            // 违法
            item.status = 1
          } else {
            // 不违法
            item.is_illegal = 2
          }
          break
      }
      return item
    })
    this.columnList.push(
      {
        title: '状态',
        key: status,
        render: (h, params) => {
          if (params.row.status === 0) return <span>未处理</span>
          else if (params.row.status === 1) return <span>违法</span>
          else return <span>不违法</span>
        }
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

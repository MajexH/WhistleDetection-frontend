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
import moment from '@/libs/moment.js'
import serviceDrawer from '@/components/drawer/drawer.vue'

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
      columnList: [
        {
          title: '鸣笛编号',
          key: 'id'
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
        },
        {
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
        }
      ],
      data: [],
      loading: false
    }
  },
  mounted() {
    this.loading = true
    getNotFined()
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

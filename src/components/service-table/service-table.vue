<template>
  <Card shadow>
    <page-table
      :loading="loading"
      :columnList="columnList"
      :data="testData">
    </page-table>
    <service-drawer
      :showDrawer="showDrawer"
      @drawer-close="changeDrawerAction">
    </service-drawer>
  </Card>
</template>

<script>
import serviceDrawer from '@/components/drawer/drawer.vue'
import pageTable from '@/components/table/table.vue'

export default {
  props: {
    source: {
      type: String,
      required: false
    }
  },
  components: {
    serviceDrawer,
    pageTable
  },
  methods: {
    changeDrawerAction() {
      console.log(1)
      this.showDrawer = !this.showDrawer
    }
  },
  data() {
    return {
      // 设置Table的loading状态
      loading: false,
      showDrawer: false,
      columnList: [
        {
          title: '车牌号',
          key: 'car_info'
        },
        {
          title: '记录设备',
          key: 'record_device'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '创建时间',
          key: 'record_time'
        },
        {
          title: '审核',
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
      ],
      testData: [
        {
          car_info: '1',
          record_device: 'XXXX设备',
          status: '0',
          record_time: '23232323'
        },
        {
          car_info: '2',
          record_device: 'XXXX设备',
          status: '0',
          record_time: '23232323'
        },
        {
          car_info: '2',
          record_device: 'XXXX设备',
          status: '0',
          record_time: '23232323'
        },
        {
          car_info: '2',
          record_device: 'XXXX设备',
          status: '0',
          record_time: '23232323'
        },
        {
          car_info: '2',
          record_device: 'XXXX设备',
          status: '0',
          record_time: '23232323'
        },
        {
          car_info: '2',
          record_device: 'XXXX设备',
          status: '0',
          record_time: '23232323'
        },
        {
          car_info: '2',
          record_device: 'XXXX设备',
          status: '0',
          record_time: '23232323'
        },
        {
          car_info: '2',
          record_device: 'XXXX设备',
          status: '0',
          record_time: '23232323'
        },
        {
          car_info: '2',
          record_device: 'XXXX设备',
          status: '0',
          record_time: '23232323'
        },
        {
          car_info: '2',
          record_device: 'XXXX设备',
          status: '0',
          record_time: '23232323'
        },
        {
          car_info: '2',
          record_device: 'XXXX设备',
          status: '0',
          record_time: '23232323'
        },
        {
          car_info: '2',
          record_device: 'XXXX设备',
          status: '0',
          record_time: '23232323'
        },
        {
          car_info: '2',
          record_device: 'XXXX设备',
          status: '0',
          record_time: '23232323'
        }
      ]
    }
  }
}
</script>

<style>
</style>

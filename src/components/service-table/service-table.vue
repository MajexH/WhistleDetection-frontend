<template>
  <div>
    <Table
      :loading="loading"
      :columns="columnList"
      :data="testData">
    </Table>
    <service-drawer
      :showDrawer="showDrawer"
      @drawer-close="changeDrawerAction">
    </service-drawer>
  </div>
</template>

<script>
import serviceDrawer from '@/components/drawer/drawer.vue'

export default {
  props: {
    source: {
      type: String,
      required: false
    }
  },
  components: {
    serviceDrawer
  },
  methods: {
    changeDrawerAction () {
      this.showDrawer = !this.showDrawer
    }
  },
  data () {
    return {
      // 设置Table的loading状态
      loading: false,
      showDrawer: false,
      columnList: [
        {
          title: '车牌号',
          key: 'carNumber'
        },
        {
          title: '发生地点',
          key: 'place'
        },
        {
          title: '状态',
          key: 'status'
        },
        {
          title: '创建时间',
          key: 'time'
        },
        {
          title: '审核',
          render: (h) => {
            return (
              <i-button
                icon="ios-menu"
                onClick={this.changeDrawerAction}>
              </i-button>
            )
          }
        }
      ],
      testData: [{
        carNumber: '1',
        place: 'XXXX地方',
        status: '0',
        time: '23232323'
      }, {
        carNumber: '2',
        place: 'XXXX地方',
        status: '0',
        time: '23232323'
      }]
    }
  }
}
</script>

<style>

</style>

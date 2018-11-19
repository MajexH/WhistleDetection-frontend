<template>
  <div>
    <Table border :loading="loading" :columns="columnList" :data="testData">
    </Table>
    <service-drawer :show="showDrawer"></service-drawer>
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
    handleShowDrawer () {
      this.showDrawer = true
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
          render: (h, params, vm) => {
            return h('Button', {
              on: {
                click: this.handleShowDrawer
              }
            }, [
              h('span', 'test')
            ])
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

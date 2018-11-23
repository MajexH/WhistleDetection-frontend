<template>
  <Card>
    <tables
      editable
      searchable
      search-place="top"
      v-model="data"
      :columns="columns"
      @on-save-edit="handleSaveEdit">
    </tables>
  </Card>
</template>

<script>
import Tables from '_c/tables'
import { getDevice, putDevice } from '@/api/device.js'

export default {
  components: {
    Tables
  },
  methods: {
    handleSaveEdit(value) {
      putDevice(this.data[value.row.initRowIndex])
        .then(() => {
          this.$Message.info('修改成功')
        })
        .catch(() => {})
    }
  },
  mounted() {
    getDevice()
      .then((res) => {
        this.data = res.data.data
      })
      .catch(() => {})
  },
  data() {
    return {
      loading: false,
      columns: [
        {
          title: '设备编号',
          key: 'device_id',
          editable: true
        },
        {
          title: '设备位置',
          key: 'location',
          editable: true
        },
        {
          title: 'ip地址',
          key: 'ip',
          editable: true
        },
        {
          title: '设备描述',
          key: 'description',
          editable: true
        }
      ],
      data: []
    }
  }
}
</script>

<style>
</style>

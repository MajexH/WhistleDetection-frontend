<template>
  <Card>
    <tables
      editable
      searchable
      search-place="top"
      v-model="data"
      :columns="columns"
      :showButton="true"
      :buttonMsg="'设备'"
      @on-save-edit="handleSaveEdit"
      @on-show-modal="handleShowModal">
    </tables>
    <Modal
      title="增加设备"
      v-model="showModal">
      <Form
        ref="deviceForm"
        :model="deviceData"
        :rules="deviceRules"
        :label-width="80">
        <FormItem label="设备编号" prop="device_id">
          <Input v-model="deviceData.device_id"/>
        </FormItem>
        <FormItem label="设备位置" prop="location">
          <Input v-model="deviceData.location"/>
        </FormItem>
        <FormItem label="ip地址" prop="ip">
          <Input v-model="deviceData.ip"/>
        </FormItem>
        <FormItem label="设备描述" prop="description">
          <Input v-model="deviceData.description"/>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button
          :loading="buttonLoading"
          @click="addNewDevice"
          type="info">确定</Button>
      </div>
    </Modal>
  </Card>
</template>

<script>
import Tables from '_c/tables'
import { getDevice, putDevice, registerDevice } from '@/api/device.js'

export default {
  components: {
    Tables
  },
  methods: {
    checkIp(rule, value, callback) {
      const pattern = new RegExp('^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$')
      if (!pattern.test(this.deviceData.ip)) {
        callback(new Error('ip地址格式错误,请重新输入'))
      } else {
        callback()
      }
    },
    addNewDevice() {
      this.buttonLoading = true
      this.$refs.deviceForm.validate((valid) => {
        if (valid) {
          registerDevice(this.deviceData)
            .then((res) => {
              this.$nextTick(() => {
                this.data.push(res.data.data)
                this.showModal = false
              })
            })
            .catch(() => {})
        }
        this.buttonLoading = false
      })
    },
    handleShowModal() {
      this.showModal = true
    },
    handleSaveEdit(value) {
      console.log(value)
      putDevice(this.data[value.row.initRowIndex])
        .then(() => {
          this.$Message.info('修改成功')
        })
        .catch(() => {
          // 在异常时重置该项值
          this.data[value.row.initRowIndex][value.column.key] = value.row[value.column.key]
        })
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
      buttonLoading: false,
      deviceData: {
        device_id: '',
        ip: '',
        location: '',
        description: ''
      },
      deviceRules: {
        device_id: [{ required: true, message: '请填写设备id' }],
        ip: [{
          required: true, message: '请填写ip地址'
        }, {
          validator: this.checkIp, trigger: 'blur'
        }],
        location: [{ required: true, message: '请填写设备地址' }],
        description: [{ required: true, message: '请填写设备描述' }]
      },
      showModal: false,
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

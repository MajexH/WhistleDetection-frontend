<template>
  <div>
    <Row :style="{ margin: '5px' }" :gutter="5">
      <Col span="3">
        <Select v-model="searchKey">
          <Option
            v-for="item in columnList"
            v-if="item.key !== 'handle'"
            :key="`search-col-${item.key}`"
            :value="item.key">
            {{ item.title }}
          </Option>
        </Select>
      </Col>
      <Col span="6">
        <Input @on-change="handleChange" v-model="searchItem" clearable/>
      </Col>
    </Row>
    <Row>
      <Col>
        <Table
          :loading="loading"
          :columns="columnList"
          :data="customData"
          @on-row-click="onClickRow">
        </Table>
      </Col>
    </Row>
    <Row>
      <Col>
        <Page
          :total="total"
          show-sizer
          show-elevator
          show-total
          @on-change="getPageNumber"
          @on-page-size-change="getPageSize">
        </Page>
      </Col>
    </Row>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    columnList: {
      type: Array,
      required: true
    },
    data: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapMutations([
      'setRow'
    ]),
    // 设置当前点击的行
    onClickRow(value) {
      this.setRow(value)
    },
    getPageNumber(value) {
      this.pageNumber = value
    },
    getPageSize(value) {
      this.pageSize = value
    },
    handleChange(e) {
      this.insideData = this.data.filter(item => String(item[this.searchKey]).indexOf(this.searchItem) > -1)
    }
  },
  data() {
    return {
      pageNumber: 1,
      pageSize: 10,
      searchItem: null,
      searchKey: this.columnList[0].key,
      insideData: this.data
    }
  },
  computed: {
    customData() {
      const start = (this.pageNumber - 1) * this.pageSize
      return this.insideData.slice(start, start + this.pageSize)
    },
    total() {
      return this.insideData.length
    }
  },
  watch: {
    data: function(newValue) {
      this.insideData = newValue
    }
  }
}
</script>

<style>
</style>

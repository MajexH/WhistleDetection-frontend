<template>
  <div>
    <Row>
      <Col>
        <Table
          :loading="loading"
          :columns="columnList"
          :data="customData">
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
    getPageNumber(value) {
      this.pageNumber = value
    },
    getPageSize(value) {
      this.pageSize = value
    }
  },
  data() {
    return {
      pageNumber: 1,
      pageSize: 10
    }
  },
  computed: {
    customData() {
      const start = (this.pageNumber - 1) * this.pageSize
      return this.data.slice(start, start + this.pageSize)
    },
    total() {
      return this.data.length
    }
  }
}
</script>

<style>
</style>

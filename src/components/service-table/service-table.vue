<template>
  <Table :column="columnList">
  </Table>
</template>

<script>
export default {
  props: {
    source: {
      type: String
    }
  },
  data () {
    this.columnList = [
      {
        title: '车牌号',
        name: 'carNumber'
      },
      {
        title: '发生地点',
        name: 'place'
      },
      {
        title: '状态',
        name: 'status'
      },
      {
        title: '创建时间',
        name: 'time'
      },
      {
        title: '操作'
      }
    ]
    return {

    }
  }
}
</script>

<style>

</style>

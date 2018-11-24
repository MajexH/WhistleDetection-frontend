<template>
  <Row>
    <Col span="8" offset="8">
      <h1>
        欢迎来到鸣笛检测系统
      </h1>
    </Col>
  </Row>
</template>

<script>
import moment from 'moment'

export default {
  data() {
    return {
      time: moment().format('YYYY-MM-DD')
    }
  },
  mounted() {
    console.log(moment)
  }
}
</script>

<style>

</style>

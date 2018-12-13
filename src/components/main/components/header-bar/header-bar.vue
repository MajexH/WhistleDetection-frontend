<template>
  <Row>
    <Col span="1">
      <sider-trigger :collapsed="collapsed" icon="md-menu" @on-change="handleCollpasedChange"></sider-trigger>
    </Col>
    <Col span="4" style="margin-left: 10px; display: flex">
      <img :src="policeMark" key="police-mark" style="height: 60px"/>
      <div style="margin-left: 5px">
        XXXXXXX鸣笛检测系统
      </div>
    </Col>

    <Col span="16"  style="margin-left: 10px;">
      <custom-bread-crumb show-icon :list="breadCrumbList"></custom-bread-crumb>
    </Col>
    <slot></slot>
  </Row>
</template>
<script>
import siderTrigger from './sider-trigger'
import customBreadCrumb from './custom-bread-crumb'
import policeMark from '@/assets/images/ui-header.jpg'
import './header-bar.less'
export default {
  name: 'HeaderBar',
  components: {
    siderTrigger,
    customBreadCrumb
  },
  props: {
    collapsed: Boolean
  },
  computed: {
    breadCrumbList () {
      return this.$store.state.app.breadCrumbList
    }
  },
  data() {
    return {
      policeMark
    }
  },
  methods: {
    handleCollpasedChange (state) {
      this.$emit('on-coll-change', state)
    }
  }
}
</script>

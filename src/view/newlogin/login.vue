<template>
  <!-- 外层div是为了设置整个登陆背景 -->
  <Layout class="main">
    <Header class="header">
      <img :src="policeMarkBig" key="logoBig"/>
      <h1 style="margin-left: 20px; font-size: 250%">鸣笛抓拍后台管理系统</h1>
    </Header>
    <Content class="login">
      <Card class="login-con">
        <login-item
          @on-handle-register="handleRegister"
          v-if="switchItem === 'login'">
        </login-item>
        <register-item
          v-else>
        </register-item>
      </Card>
    </Content>
    <Footer class="footer">
      Copyright © 2018 XXXX. All rights reserved.
    </Footer>
  </Layout>
</template>

<script>
import { loginItem, registerItem } from '_c/login-register'
import { mapState, mapMutations } from 'vuex'
import policeMarkBig from '@/assets/images/police-mark.jpg'

export default {
  components: {
    loginItem,
    registerItem
  },
  computed: {
    ...mapState({
      switchItem: state => state.login.switchItem
    })
  },
  methods: {
    ...mapMutations({
      setSwitchItem: 'setSwitchItem'
    }),
    handleRegister () {
      this.setSwitchItem('register')
    }
  },
  data () {
    return {
      policeMarkBig
    }
  },
  beforeDestroy () {
    this.setSwitchItem('login')
  }
}
</script>

<style>
  @import './login.css';
</style>

<template>
  <transition name="slide-fade">
    <Form
      ref="loginForm"
      :rules="loginRules"
      :model="loginForm">
      <FormItem>
        <h2 :style="{ 'text-align': 'center' }">登录</h2>
      </FormItem>
      <FormItem prop="username">
        <Input
          type="text"
          placeholder="用户名"
          prefix="ios-person-outline"
          v-model="loginForm.username"/>
      </FormItem>
      <FormItem prop="password">
        <Input
          type="password"
          placeholder="密码"
          v-model="loginForm.password"
          prefix="ios-lock-outline"/>
      </FormItem>
      <!-- Button -->
      <FormItem>
        <Button
          long
          type="primary"
          :loading="buttonLoding"
          @click="login('loginForm')">
          登录
        </Button>
        <br/>
        <Button
          long
          :style="{ margin: '10px 0 0 0' }"
          @click="handleRegister">
          注册
        </Button>
      </FormItem>
    </Form>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'loginItem',
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    handleRegister () {
      this.$emit('on-handle-register')
    },
    async login (name) {
      this.buttonLoding = true
      this.$refs[name].validate(valid => {
        if (!valid) {
          this.$Message.error('请填写必填项')
        }
      })
      // API进行登录
      await this.handleLogin({
        username: this.loginForm.username,
        password: this.loginForm.password
      }).catch((err) => {
        this.$Message.error(err.response.data.non_field_errors[0])
      }).finally(() => {
        this.buttonLoding = false
      })
    }
  },
  data () {
    return {
      buttonLoding: false,
      loginForm: {
        username: null,
        password: null
      },
      loginRules: {
        username: [{ required: true, message: '用户名为必填项' }],
        password: [{ required: true, message: '密码为必填项' }]
      }
    }
  }
}
</script>

<style>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>

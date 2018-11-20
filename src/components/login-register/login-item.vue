<template>
  <transition name="slide-fade">
    <Form
      ref="loginForm"
      :rules="loginRules"
      :model="loginForm">
      <FormItem>
        <div :style="{ 'text-align': 'center' }">登录</div>
      </FormItem>
      <FormItem prop="username">
        <Input type="text" placeholder="用户名"
          v-model="loginForm.username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password" class="login-item">
        <Input type="password" placeholder="密码"
          v-model="loginForm.password" >
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <!-- Button -->
      <FormItem>
        <Button type="primary"
          :loading="buttonLoding"
          @click="login('loginForm')">
          登录
        </Button>
        <Button
          @click="handleRegister">
          注册
        </Button>
      </FormItem>
    </Form>
  </transition>
</template>

<script>
export default {
  name: 'loginItem',
  methods: {
    handleRegister () {
      this.$emit('on-handle-register')
    },
    login (name) {
      this.buttonLoding = true
      this.$refs[name].validate(valid => {
        if (!valid) {
          this.$Message.error('请填写必填项')
        }
      })
      // TODO: API进行登录
      this.buttonLoding = false
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

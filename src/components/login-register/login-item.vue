<template>
  <From model="loginForm">
    <FromItem prop="username">
      <Input type="text" placeholder="用户名"
        v-model="loginForm.username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FromItem>
    <FromItem prop="password" class="login-item">
      <Input type="password" placeholder="Password"
        v-model="loginForm.password" >
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FromItem>
    <!-- Button -->
    <FromItem>
      <Button type="primary">
        登录
      </Button>
      <Button @click="handleRegister">
        注册
      </Button>
    </FromItem>
  </From>
</template>

<script>
export default {
  name: 'loginItem',
  methods: {
    handleRegister () {
      this.$emit('on-handle-register')
    }
  },
  data () {
    return {
      loginForm: {
        username: null,
        password: null
      },
      loginRules: {

      }
    }
  }
}
</script>

<style>
</style>

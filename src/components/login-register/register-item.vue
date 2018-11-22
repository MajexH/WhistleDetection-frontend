<template>
  <transition name="slide-fade">
    <Form
      ref="registerForm"
      :model="registerForm"
      :rules="registerRules">
      <FormItem>
        <div :style="{ display: 'flex' }">
          <Button type="text" icon="ios-arrow-back"
            @click="handleSwitchItem">
          </Button>
          <h2 :style="{ margin: '0 0 0 90px' }">
            注册
          </h2>
        </div>
      </FormItem>
      <FormItem prop="username">
        <Input
          type="text"
          placeholder="用户名"
          v-model="registerForm.username"
          prefix="ios-person-outline"/>
      </FormItem>
      <FormItem prop="password">
        <Input
          type="password"
          placeholder="密码"
          v-model="registerForm.password"
          prefix="ios-lock-outline"/>
      </FormItem>
      <FormItem prop="confirm">
        <Input
          type="password"
          placeholder="确认密码"
          v-model="registerForm.confirm"
          prefix="ios-lock-outline"/>
      </FormItem>
      <FormItem prop="name">
        <Input
          placeholder="姓名"
          prefix="ios-people-outline"
          v-model="registerForm.name"/>
      </FormItem>
      <FormItem prop="email">
        <Input
          placeholder="邮箱"
          prefix="ios-mail-outline"
          v-model="registerForm.email"/>
      </FormItem>
      <FormItem>
        <Button
          long
          type="primary"
          :loading="buttonLoading"
          @click="register('registerForm')">
          注册
        </Button>
      </FormItem>
    </Form>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex'
import { checkNull } from '@/libs/util.js'
import { register } from '@/api/user.js'

export default {
  name: 'registerItem',
  methods: {
    ...mapMutations(['setSwitchItem']),
    handleSwitchItem() {
      this.setSwitchItem('login')
    },
    validatePassword(rule, value, callback) {
      if (value === '' || checkNull(value)) {
        callback(new Error('请输入您的密码'))
      } else {
        if (this.registerForm.confirm !== '') {
          this.$refs.registerForm.validateField('confirm')
        }
        callback()
      }
    },
    validateConfirm(rule, value, callback) {
      if (value === '' || value === null || value === undefined) {
        callback(new Error('请再次输入您的密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不符'))
      } else {
        callback()
      }
    },
    register(name) {
      this.buttonLoading = true
      this.$refs[name].validate(valid => {
        if (!valid) {
          this.$Message.error('注册信息有误')
        } else {
          register(this.registerForm)
            .then((res) => {
              this.$Message.info('注册成功,请登录')
              this.handleSwitchItem()
            }).catch(() => {})
        }
      })
      this.buttonLoading = false
    }
  },
  data() {
    return {
      buttonLoading: false,
      registerForm: {
        username: null,
        password: null,
        confirm: null,
        name: null,
        email: null
      },
      registerRules: {
        username: [{ required: true, message: '用户名为必填项' }],
        password: [{ validator: this.validatePassword, trigger: 'blur' }],
        confirm: [{ validator: this.validateConfirm, trigger: 'blur' }],
        name: [{ required: true, message: '用户姓名为必填项' }],
        email: [{
          required: true, message: '邮箱为必填项'
        }, {
          type: 'email', message: '邮箱格式错误', trigger: 'blur'
        }]
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
.header {
  display: flex;
}
</style>

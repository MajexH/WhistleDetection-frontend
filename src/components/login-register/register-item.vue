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
          <div :style="{ margin: '0 0 0 20px'}">
            注册
          </div>
        </div>
      </FormItem>
      <FormItem prop="username">
        <Input type="text" placeholder="用户名"
          v-model="registerForm.username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" placeholder="密码"
          v-model="registerForm.password">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="confirm">
        <Input type="password" placeholder="确认密码"
          v-model="registerForm.confirm">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary"
          :loading="buttonLoading">
          注册
        </Button>
      </FormItem>
    </Form>
  </transition>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'registerItem',
  methods: {
    ...mapMutations([
      'setSwitchItem'
    ]),
    handleSwitchItem () {
      this.setSwitchItem('login')
    },
    validatePassword (rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入你的密码'))
      } else {
        if (this.registerForm.confirm !== '') {
          this.$refs.registerForm.validateField('confirm')
        }
        callback()
      }
    },
    validateConfirm (rule, value, callback) {
      if (value === '') {
        callback(new Error('请再次输入你的密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入的密码不符'))
      } else {
        callback()
      }
    },
    register (name) {
      this.buttonLoading = true
      this.$refs[name].validate(valid => {
        if (!valid) {
          this.$Message.error('请填写必填项')
        }
      })
      // TODO:
      this.buttonLoading = false
    }
  },
  data () {
    return {
      buttonLoading: false,
      registerForm: {
        username: null,
        password: null,
        confirm: null
      },
      registerRules: {
        username: [
          { required: true, message: '用户名为必填项' }
        ],
        password: [
          { validator: this.validatePassword, trigger: 'blur' }
        ],
        confirm: [
          { validator: this.validateConfirm, trigger: 'blur' }
        ]
      }
    }
  }
}
</script>

<style>
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
  .header {
    display: flex
  }
</style>

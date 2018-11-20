<template>
  <div>
    <login-item
      @on-handle-register="handleRegister"
      v-if="switchItem === 'login'">
    </login-item>
    <register-item
      v-else>
    </register-item>
  </div>
</template>

<script>
import { loginItem, registerItem } from '_c/login-register'

export default {
  components: {
    loginItem,
    registerItem
  },
  methods: {
    handleRegister () {
      this.switchItem = 'register'
    }
  },
  data () {
    return {
      switchItem: 'login'
    }
  }
}
</script>

<style>

</style>

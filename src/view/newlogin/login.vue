<template>
  <div class="test">
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
import { mapState, mapMutations } from 'vuex'

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
    }
  },
  beforeDestroy () {
    this.setSwitchItem('login')
  }
}
</script>

<style>
  .test {
    display: flex
  }
</style>

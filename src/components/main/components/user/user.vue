<template>
  <div class="user-avator-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <p>{{ showName }}</p>
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>

<script>
import './user.less'
import { mapActions } from 'vuex'
import { getUserInfo } from '@/libs/util'

export default {
  name: 'User',
  props: {
    userAvator: {
      type: [String, Number, Boolean],
      default: ''
    },
    messageUnreadCount: {
      type: Number,
      default: 0
    }
  },
  computed: {
    showName() {
      return JSON.parse(getUserInfo()).name
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    logout () {
      this.handleLogOut()
      this.$router.push({
        name: 'login'
      })
    },
    message () {
      this.$router.push({
        name: 'message_page'
      })
    },
    handleClick (name) {
      switch (name) {
        case 'logout': this.logout()
          break
        case 'message': this.message()
          break
      }
    }
  }
}
</script>

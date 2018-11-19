<template>
  <Drawer v-model="showDrawer" @on-close="handleClose">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  computed: {
    showDrawer: {
      set () {
        console.log('set')
      },
      get () {
        return this.$store.state.tables.showDrawer
      }
    }
  },
  methods: {
    ...mapMutations({
      change: 'setShowDrawer'
    }),
    handleClose () {
      this.change(false)
    }
  }
}
</script>

<style>

</style>

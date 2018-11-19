<template>
  <Drawer v-model="show">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
  </Drawer>
</template>

<script>
export default {
  props: {
    show: {
      default: false
    }
  },
  methods: {
    handleClose () {
      this.$emit('close', { show: false })
    }
  }
}
</script>

<style>

</style>

<template>
  <Drawer
    v-model="show"
    width="800"
    :title="'test'"
    @on-close="handleClose">
    <Row class="drawer-item">
      <video-player></video-player>
    </Row>
    <Row class="drawer-item">
      <vue-preview :slides="slide1"></vue-preview>
    </Row>
    <Row>
      <Button type="primary">通过</Button>
      <Button type="error">不通过</Button>
    </Row>
  </Drawer>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    videoPlayer
  },
  props: {
    showDrawer: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      show: this.showDrawer,
      slide1: [
        {
          src: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
          msrc: 'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
          alt: 'picture1',
          title: 'Image Caption 1',
          w: 600,
          h: 400
        },
        {
          src: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
          msrc: 'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
          alt: 'picture2',
          title: 'Image Caption 2',
          w: 1200,
          h: 900
        }
      ]
    }
  },
  methods: {
    handleClose () {
      this.$emit('drawer-close')
    }
  },
  watch: {
    'showDrawer': function (newValue) {
      this.show = newValue
    }
  }
}
</script>

<style>
  .drawer-item {
    margin: 0 0 5px 0;
    border-bottom: solid 1px;
    padding: 0 0 5px 0
  }
</style>

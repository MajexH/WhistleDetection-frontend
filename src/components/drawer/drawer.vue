<template>
  <Drawer
    v-model="show"
    width="500"
    :title="cardNumber"
    @on-close="handleClose">
    <Row class="drawer-item">
      <video-player></video-player>
    </Row>
    <Row class="drawer-item">
      <Col style="height: 100px">
        <vue-preview :slides="slide1"></vue-preview>
      </Col>
    </Row>
    <Row class="row">
      <Col>
        <ButtonGroup>
          <Button type="primary">通过</Button>
          <Button type="error">不通过</Button>
        </ButtonGroup>
      </Col>
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
    },
    cardNumber: {
      type: String,
      required: false,
      default: '无车牌'
    },
    // 前一个页面传递给后一个页面的whistle的id值
    id: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      show: this.showDrawer,
      slide1: [
        {
          src:
            'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_b.jpg',
          msrc:
            'https://farm6.staticflickr.com/5591/15008867125_68a8ed88cc_m.jpg',
          alt: 'picture1',
          title: 'Image Caption 1',
          w: 600,
          h: 400
        },
        {
          src:
            'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_b.jpg',
          msrc:
            'https://farm4.staticflickr.com/3902/14985871946_86abb8c56f_m.jpg',
          alt: 'picture2',
          title: 'Image Caption 2',
          w: 1200,
          h: 900
        }
      ]
    }
  },
  methods: {
    handleClose() {
      this.$emit('drawer-close')
    },
    onEscapeKeyUp(event) {
      if (event.which === 27) {
        this.$emit('drawer-close')
      }
    }
  },
  watch: {
    showDrawer: function(newValue) {
      this.show = newValue
    }
  },
  beforeMount() {
    window.addEventListener('keyup', this.onEscapeKeyUp)
  },
  mounted() {
    document.getElementsByClassName('my-gallery')[0].style['float'] = 'left'
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onEscapeKeyUp)
  }
}
</script>

<style scoped>
.drawer-item {
  margin: 0 0 5px 0;
  border-bottom: 1px solid #e8e8e8;
  padding: 0 0 5px 0;
}
.row {
  position: relative;
}
</style>

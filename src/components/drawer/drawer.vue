<template>
  <Drawer
    v-model="show"
    width="600"
    :title="title"
    @on-close="handleClose"
    @on-visible-change="handle">
    <Row class="drawer-item">
      <Table
        :columns="columns"
        :data="data">
      </Table>
    </Row>
    <Row class="drawer-item">
      <video-player
        :options="options">
      </video-player>
    </Row>
    <Row class="drawer-item">
      <vue-preview
        :slides="slide1"></vue-preview>
    </Row>
    <Row
      class="drawer-item"
      v-if="showButton">
      <Form ref="form"
        :model="form"
        :rules="rules">
        <FormItem prop="reason">
          <Input
            placeholder="输入原因"
            v-model="form.reason"
            />
        </FormItem>
      </Form>
    </Row>
    <Row v-if="showButton">
      <Button
        v-if="switchRevoke"
        type="error"
        @click="handleRevoke">撤销</Button>
      <ButtonGroup
        v-else>
        <Button type="primary" @click="fine(true)">违法</Button>
        <Button type="error" @click="fine(false)">不违法</Button>
      </ButtonGroup>
    </Row>
  </Drawer>
</template>

<script>
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'
import { operateWhistle, operateOverview } from '@/api/whistle.js'
import { mapState } from 'vuex'
import { getColumns } from '@/libs/util.js'
import { getUserInfo } from '@/libs/util'

export default {
  components: {
    videoPlayer
  },
  computed: {
    ...mapState({
      row: state => state.whistle.row
    })
  },
  props: {
    showDrawer: {
      type: Boolean,
      default: false
    },
    // 指示当前打开的页面是啥
    source: {
      type: String,
      required: false
    },
    // 展示button
    showButton: {
      type: [Boolean],
      required: false,
      default: () => true
    }
  },
  data() {
    this.baseUrl = process.env.NODE_ENV === 'development' ? this.$config.baseUrl.dev : this.$config.baseUrl.pro
    return {
      switchRevoke: false,
      columns: getColumns(),
      options: {},
      title: 'test',
      data: [],
      show: this.showDrawer,
      slide1: [],
      form: {
        reason: null
      },
      rules: {
        reason: [{
          required: true, message: '请输入原因'
        }]
      }
    }
  },
  methods: {
    handle(value) {
      if (value) {
        this.options = {
          autoplay: false,
          muted: false,
          loop: false,
          preload: 'auto',
          language: 'zh-CN',
          aspectRatio: '16:9',
          fluid: true,
          sources: [{
            type: 'video/mp4',
            src: this.baseUrl + '/flowvideo/' + this.row.store_location
          }],
          notSupportedMessage: '此视频暂无法播放，请稍后再试'
        }
        this.title = this.row.car_info
        this.data = []
        this.data.push(this.row)
        if (this.row.is_dispose) {
          this.switchRevoke = true
        }
        this.slide1 = [
          {
            src:
              this.baseUrl + '/fullimage/' + this.row.store_location,
            msrc:
              this.baseUrl + '/fullimage/' + this.row.store_location,
            alt: 'picture1',
            title: 'Image Caption 1',
            w: 1200,
            h: 900
          },
          {
            src:
              this.baseUrl + '/featureimage/' + this.row.store_location,
            msrc:
              this.baseUrl + '/featureimage/' + this.row.store_location,
            alt: 'picture2',
            title: 'Image Caption 2',
            w: 1200,
            h: 900
          }
        ]
        this.$nextTick(() => {
          for (let item of document.getElementsByTagName('img')) {
            if (String(item.alt).indexOf('picture') > -1) { item.style.width = '100%' }
          }
        })
      } else {
        // 关闭的时候 重置状态
        this.switchRevoke = false
      }
    },
    handleClose() {
      this.$emit('drawer-close')
    },
    handleRevoke() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.source === 'review') {
            operateOverview({
              whistle: this.row.id,
              user: JSON.parse(getUserInfo()).id,
              reason: this.form.reason
            }).then(() => {
              document.location.reload()
            }).catch(() => {})
          }
        }
      })
    },
    fine(illegal) {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          // 请求API
          operateWhistle({
            whistle: this.row.id,
            user: JSON.parse(getUserInfo()).id,
            is_illegal: illegal,
            reason: this.form.reason
          }).then(() => {
            document.location.reload()
          }).catch(() => {})
        }
      })
    }
  },
  watch: {
    showDrawer: function(newValue) {
      this.show = newValue
    }
  }
}
</script>

<style scoped>
  .drawer-item {
    margin: 0 0 5px 0;
    border-bottom: 1px solid #e8e8e8;
    padding: 0 0 5px 0;
  }
</style>

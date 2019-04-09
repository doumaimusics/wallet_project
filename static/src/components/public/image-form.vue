<template>
  <div>
    <croppa v-model="croppa"
      class="croppa"
      :width="width ? width : 300"
      :height="height ? height : 180"
      :placeholder="placeInfo"
      :placeholder-font-size="16"
      :placeholder-color="'default'"
      :accept="'image/*'"
      :file-size-limit="5242880"
      :quality="2"
      :disabled="!isUpload"
      :show-remove-button="true"
      :remove-button-color="'red'"
      :remove-button-size="18"
      :initial-image="initImage"
      @file-choose="disabled = false"
      @image-remove="eventBus('setFormStatus', type, '')">
        <!-- <img slot="placeholder" src="static/logo.png" /> -->
      </croppa>
      <div v-if="!isUpload">
        <el-button :disabled="disabled" v-loading="loading" type="" @click="uploadImage">上传图片</el-button>
      </div>
  </div>
</template>

<script>
import { postPhoto } from 'api/user'
export default {
  name: 'imageForm',
  props: ['placeInfo', 'type', 'width', 'height', 'initImage', 'isUpload'],
  data () {
    return {
      croppa: {},
      loading: false,
      disabled: true
    }
  },
  methods: {
    eventBus (param, name, val) {
      if (val) {
        this.disabled = false
      } else {
        this.disabled = true
      }
      this.$emit(param, name, val)
    },
    uploadImage () {
      this.loading = true
      const that = this
      that.croppa.generateBlob((blob) => {
        let param = new FormData()
        param.append(that.type.split('.')[1], blob, 'filename')
        that.toPostPhoto(param)
      }, 'image/*', 0.8)
    },
    async toPostPhoto (queryParams) {
      const res = await postPhoto(queryParams)
      if (res.code === '00000') {
        this.$message({
          type: 'success',
          message: res.message
        })
        this.eventBus('setFormStatus', this.type, res.data.path)
      }
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
  .croppa {
    line-height: 0px;
  }
</style>

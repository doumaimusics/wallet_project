<template>
  <div id="markup-1">
    <el-form-item label-width="0px">
      <p class="form-title">基本信息</p>
    </el-form-item>
    <el-form-item label="名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <el-form-item label="logo" prop="apply">
      <el-input type="hidden" v-model="form.src"></el-input>
      <image-form
        type="form.src"
        :placeInfo="'上传任务封面(图片最大5M)'"
        :initImage="form.src"
        :isUpload = "form.src"
        @setFormStatus="setFormStatus"
      ></image-form>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="网址" prop="url">
      <el-input v-model="form.url"></el-input>
    </el-form-item>
  </div>
</template>

<script>
import formMixins from '../../mixins/form'

export default {
  name: 'addIntro',
  mixins: [formMixins],
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
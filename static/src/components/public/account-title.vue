<template>
<div class="title-main" :class="{haveBorder: isBorder == 'have'}">
    <h1 class="title">{{title}}</h1>
</div>
</template>
<script>
    export default {
        props : {
          title: String,
          isBorder: String
        }
    }
</script>
<style scoped>
  .title-main{
       padding-left: 10px;
  }
  .title{
      font-size:24px;
  }
  .haveBorder{
    padding-bottom: 40px;
    border-bottom: 1px solid #e7e7e7;
  }
</style>

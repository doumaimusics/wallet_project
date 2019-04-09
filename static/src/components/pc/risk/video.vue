<template>
   <div id="video">
       <video  ref="myVideo" controls autoplay :src="pcVideo">
        Your browser does not support the video tag.
        </video>
   </div>
</template>

<script>
    export default {
        data() {
            let _this = this
            return {
                pcVideo:'',
                videoShare: 'https://aliyunsso.edspay.com/images/video/1000000545206970AAwxAnniversaryVideoAA.mp4'
            }
        },
        methods: {

        },
        created: function() {   //   
            console.log(this.$route.query.url)
            console.log(this.$route.path)
            this.$route.path == '/videoShare' ? this.pcVideo = this.videoShare : this.$route.query.url ? this.pcVideo = this.$route.query.url :''
        },
        mounted: function() {

        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #video{
        max-height: 100%;
		max-width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 999;
        display: block;
        margin: auto;
        background-color: rgb(0, 0, 0);
        video{
			max-height: 100%;
			max-width: 100%;
			position: absolute;
			top: 0px;
			right: 0px;
			bottom: 0px;
			left: 0px;
			margin: auto;
			object-fit: contain;
            z-index: 999999;
		}
    }
</style>

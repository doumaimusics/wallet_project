<template>
	<div id="activeArea">
		<div class="main" v-html="picurl">
		</div>
	</div>
</template>

<script>
	export default {
		name: 'activeArea',
		data() {
			return {
                picurl:''
			}
		},
		methods: {
            initData(){
                let _this = this;
                _this.$http.post(_this.ajaxUrl.getUrl(1) + "/index/article.html", {nid:'activity_area',id:_this.$route.query.activityArea}).then(res => {
                    if (res.body.resCode == 1) {
                        _this.picurl = res.body.resData.data.nowArticle.content;
                    }
                });
            }
		},
		mounted: function() {
			
		},
		created: function() { //  调用函数
			this.initData()
		}
	}
</script>

<style lang="scss" scoped>
	#activeArea {
		.main{
			width: 1200px;
			height: auto;
			margin: 20px auto 40px;
		}
	}
</style>
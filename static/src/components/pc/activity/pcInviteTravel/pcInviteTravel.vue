<template>
	<div id="nianyKindPc">
		<div class="main" @click="isOpenTwo=true"></div>
	</div>
</template>

<script>
	export default {

		data() {
			return {
			}
		},
		methods: {
			

		},
		mounted: function() {
			// 友盟数据统计
			const script = document.createElement('script')
			script.src = 'https://s13.cnzz.com/z_stat.php?id=1273338531&web_id=1273338531'
			script.language = 'JavaScript'
			document.body.appendChild(script)
		},
		created: function() { //  调用函数
			
		},
		watch:{
            '$route' () {
				if(window._czc) { // 友盟数据统计监听
					let location = window.location
					let contentUrl = location.pathname + location.hash
					let refererUrl = '/'
					window._czc.push(['_trackPageview', contentUrl, refererUrl])
				}
			}
        }
	}
</script>

<style lang="scss" scoped>
	#nianyKindPc {
		font-family: DIN-Medium;
		.main{
			width: 1200px;
			height: 1334px;
			background: url(https://aliyunsso.edspay.com/web/wx/activity/inviteTravel/bg_pc.png?v=1.0) no-repeat;
			background-size: cover;
			margin: 0 auto;
			position: relative;
		}
	}
</style>
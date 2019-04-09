<template>
	<div id="land_page"></div>
</template>
<script>
  export default {
	data(){
        return {
      	}
    },
    methods: {
    },
    mounted() {
    	var that = this;
    	// 数据统计
    	const script = document.createElement('script')
    	script.src = 'https://s13.cnzz.com/z_stat.php?id=1273125711&web_id=1273125711'
    	script.language = 'JavaScript'
    	document.body.appendChild(script)
    },
    watch: {
    	'$route'() {
    		if (window._czc) {
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
	#land_page{
		width: 1200px;
		height: 3430px;
		margin: 30px auto 40px auto;
		// background: #ccc;
		background: url(https://aliyunsso.edspay.com/web/activity/datacalculator/pc.png?v1.0) center center no-repeat;
		background-size:100%;

	}
</style>
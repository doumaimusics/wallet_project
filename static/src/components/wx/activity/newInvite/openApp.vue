<template>
    <div>
		
    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp';
    export default{
        mixins:[wxToapp],
    	data(){ 
    		return{
    			IOS:false,
    		}
    	},
    	methods:{

    		isInWx(){
			    var agent = window.navigator.userAgent.toLowerCase();
			    return agent.match(/MicroMessenger/i) == 'micromessenger';
			},
			toApp(urlData){
				var ifr = document.createElement("iframe");
				ifr.style.display = "none";
				// console.log(android_schema)
				ifr.src = urlData;
				document.body.appendChild(ifr);
			}
    	},
    	created(){
    		
    	},
    	mounted(){
    		// this.PassValue('Schemes_maopp://mapgo.app_https://fir.im/maopp?utm_source=fir&utm_medium=qr')
    		// this.PassValue('Schemes_aldnews://')
    		// this.PassValue('wxApp_shadiao');
    		// Android.getGoodsInfoFromJs('wxApp_wxebcce87bb162b652');
    		if(this.isInWx()){
    			alert('请在浏览器中打开')
    			//开启提示蒙层
    			return;
    		}

   			var ios_schema = "edspay://edspay?Id=WebView&link=" + global.host + "wxInvitationIndex",
				ios_download_url = global.host + "wxInvitationIndex";
			var android_schema = "edspay://edspay?Id=WebView&link=" + global.host + "wxInvitationIndex",
				android_download_url = global.host + "wxInvitationIndex";

			if(/(Android)/i.test(navigator.userAgent)) {
				
				var ifr = document.createElement("iframe");
				ifr.style.display = "none";
				ifr.src = android_schema;
				document.body.appendChild(ifr);
				window.setTimeout(function() {
					document.body.removeChild(ifr);
					location.href = android_download_url;//打开app下载地址
				}, 2000)

			}



			if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {

				location.href = ios_schema;
				setTimeout(function() {
					var outTime = new Date()
					location.href = ios_download_url;
					
				}, 2000)
			}

    	}
    }
</script>

<style lang="scss" scoped>
	    
</style>  
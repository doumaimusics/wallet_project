<template>
    <div id="toInvest">
        
    </div>
</template>

<script>
    export default{
    	data(){
    		return{
                queryData:{},
    		}
    	},
    	methods:{
            init() {
                let _this = this
                _this.$http.post(this.ajaxUrl.getUrl(5)+"/xeenho/login", { c_code: this.queryData.c_code,t_code: this.queryData.t_code,serial_num:this.queryData.serial_num,user_id:this.queryData.user_id,platform_uid:this.queryData.platform_uid,source:this.queryData.source,bid_url:this.queryData.bid_url,login_token:this.queryData.login_token,sign:this.queryData.sign }).then((res) => {
                        if(res.body.resCode){
                            var data = res.body.resData;
                            _this.setCookie('token', data.token, (1000 * 60 * 15))
                            _this.setCookie('userName', data.userName, (1000 * 60 * 15))
                            _this.setCookie('userId', data.userId, (1000 * 60 * 15))
                            _this.$router.push({path:'/invest/detail',query:{uuid:data.uuid,assetManageType:data.assetManageType}})
                            /*if(data.zsOpenStatus == 1){

                            }else{
                                _this.$confirm('您暂未开通浙商存管账户，请前往开通', '温馨提示', {
                                  confirmButtonText: '确定',
                                  showCancelButton: false,
                                  type: 'warning'
                                }).then(() => {
                                    _this.$router.push({path:'/myAccount/openAccount'})
                                });
                            }*/
                        }else{
                            _this.$router.push({path:'/home'})
                        }
                })
            }
    	},
    	created(){
            this.queryData = this.$route.query;
    		this.init()
    	}
    }
</script>

<style lang="scss" scoped>
    
</style>
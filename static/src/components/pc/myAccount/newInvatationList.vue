<template >
    <el-button v-if="scope.row.remind == 0" @click="toTips(scope.row)" type="text" size="small">提醒出借</el-button>
    <el-button v-else-if="scope.row.remind == 1" type="text" size="small" class="gray">已提醒</el-button>
    <el-button v-else type="text" size="small" class="moneyNum">{{scope.row.cashMoney}}</el-button>
</template>			

<script>
    export default{
    	data(){
    		return{

    		}
    	},
    	props:['scope'],
    	methods:{
    		toTips(row){
	      		global.http.post(this,"/activity/inviteNew/sendInviteMsg",{userId:row.userId},data => {
		            if (data.data.resCode == 1) {
		              	row.remind = 1;
		              	this.$message({
				          message: '已发送短信给您的好友',
				          type: 'success'
				        });
	            	}
	          })
      		},
    	},
    	created(){
    		
    	}
    }
</script>

<style lang="scss" scoped>
    .gray{
    	background: #D0D0D0;
    }
    .moneyNum{
    	background: rgba(0,0,0,0);
    	color:#333;
    }
</style>
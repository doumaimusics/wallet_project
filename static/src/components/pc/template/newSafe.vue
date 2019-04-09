<template>
	<div class="level">
		<div class="level_box clear">
			<div class="title_box">安全等级</div>
			<div class="safe_box">
				<span class="fen">{{security*100}}</span>分
				<div class="wire_box">
					<div class="wire_color"
					  :style="{width:security*100+'%'}"
					  :class="{'low':grade=='低','medium':grade == '中','tall':grade == '高'}">
					</div>
				    <div class="round_box" 
					     :style="{left:(security*100)-1+'%'}"
						 :class="{'low_border':grade=='低','medium_border':grade == '中','tall_border':grade == '高'}"
						 ></div>
				</div>
			</div>
		 </div>
	</div>
</template>

<script>
	export default {
		name: 'safe',
		props:['security'],    // 登录框状态
		data(){
			return {
				grade:'', // 安全等级
			}
		},
    watch: {
      security: function (val) {
          if(this.security == 1){
            this.grade = "高"
          }else if(this.security >= 0.6&&this.security < 1){
            this.grade = "中"
          }else{
            this.grade = "低"
          }
      },
    }
	}
</script>

<style lang="scss">
	.level{
         font-size: 20px;
		 color: #333333;
		 padding-bottom: 30px;
		 border-bottom: 1px dashed #E5E5E5;
		 .title_box{
			 float: left;
			 font-size: 20px;
			color: #333333;
			margin-right: 40px;
		 }
		 .safe_box{
			 float: left;
			 font-size: 16px;
			color: #151515;
			 .fen{
				 font-size: 20px;
				color: #FF5B4C;
			 }
			 .wire_box{
				 width: 513px;
				 height: 6px;
				 background: #F4F4F4;
				 border-radius: 5px;
				 position: relative;
				 display: inline-block;
				 margin-left: 20px;
				 .wire_color{
					 position: absolute;
					 top:0;
					 left: 0;
					 height: 100%;
					 width: 0px;
					 background: #FF5B4C;
					 border-radius: 5px;
				 }
				 .low{  // 低
					   background: #FF5B4C;
				 }
				 .medium{  // 中
					 background: #ff8e0b;
					 
				 }
				 .tall{
					 background: #6DDB80;
					
				 }
				 .round_box{
					 width: 14px;
					 height: 14px;
					 border-radius:50%;
					 background: #fff;
					 border: 4px solid #FF5B4C;
					 z-index: 10;
					 position: absolute;
					 left: 0;
					 top: -4px;
				 }
				 .low_border{
					 border: 4px solid #FF5B4C;
				 }
				 .medium_border{
						border: 4px solid #ff8e0b;
				 }
				 .tall_border{
						border: 4px solid #6DDB80;
				 }
			 }
		 }
	}
</style>

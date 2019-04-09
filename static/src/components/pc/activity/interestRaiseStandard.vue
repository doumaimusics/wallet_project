<template>
    <div id="inviter">
        <!-- 出借按钮 -->
        <div class="invest-btn" @click="goInvest"></div>
        <!-- 规则按钮 -->
        <div class="rule-btn" @click="isOpen=true"></div>
        <el-dialog
            title="活动规则"
            :visible.sync="isOpen"
            width="30%"
            custom-class="dialogclass"
            center>
            <div class="text-div">
                <p>1.活动时间：2017年11月11日—2017年11月30日；</p>
                <p>2. 11月11日-11月12日，每天10:00-11:00、12:00-13:00、14:00-15:00、16:00-17:00、18:00-19:00；随机上线加息标，每种加息标在线一个小时，标满进行续标；</p>
                <p>3. 11月13日-11月30日每天10:00、14:00、18:00   每天三个整点随机上线一个加息标，标满即下；</p>
                <p>4. 加息标活动不能使用出借红包和加息券，但可以与平台其它活动进行叠加享有收益（不包含邀请活动）；</p>
                <p>5. 本次活动最终解释权归E都市钱包所有；</p>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="isOpen = false">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
  export default {
	name: 'inviter',
	data(){
      return {
          isOpen: false,
      }
    },
    methods:{
        goInvest () {
                 this.$router.push("/invest")
            },
    },
     mounted:function(){
    },
  }  
</script>

<style lang="scss">
    #inviter{
        width:1200px;
        height:3591px;
        background: url(https://aliyunsso.edspay.com/web/activity/upgrade/upgradebackpc.png) no-repeat;
        background-size: contain;
        margin:0 auto;
        position: relative;
        .dialog-footer{
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 20px;
        }
    }
    .dialogclass {
        width: 600px;
        top:25% !important;
    }
    .invest-btn {
        width:500px;
        height:90px;
        position: absolute;
        top: 2170px;
        left: 370px;
        cursor: pointer;
    }
        .rule-btn {
             width:89px;
            height:192px;
            background: url(https://aliyunsso.edspay.com/web/activity/upgrade/pcrule.png) no-repeat;
            background-size: contain;
            position: fixed;
            margin-left: 1121px;
            margin-top: 200px;
             cursor: pointer;
        }
        .text-div {
            width: 90%;
            margin: 0 auto;
            line-height: 20px;
            p {
                font-size: 14px;
                margin-top: 5px;
            }
        }
</style>
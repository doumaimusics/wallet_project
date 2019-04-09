import { MessageBox } from 'mint-ui';

module.exports = {
	data(){
		return{
			activityStatus:1,//活动状态
      _activityId:0,
			_activetyTime:{}
		}
	},
	methods:{
		_getActivityTime(activityId){// 获取活动时间状态
			this.notLogPost('/activity/two/getActivityTime',data => {
				if(data.resCode){
					this._activetyTime = data.resData;
          this._activityId = data.resData.activityId;
          this.activityStatus = data.resData.active;
					// this.activityStatus = 2;
				}
			},{activityId:activityId})
		},
    ActivityPrompt(type) { //显示弹框方法 type = 3 不判断活动结束
      if (this.activityStatus == 2) {
        MessageBox.alert('亲，活动尚未开始哦!', '提示', {
          confirmButtonClass: 'confirmButtonClass'
        })
      } else if (this.activityStatus == 3 && type != 3) {
        MessageBox.alert('亲，活动已经结束啦!', '提示', {
          confirmButtonClass: 'confirmButtonClass'
        })
      } else if (this.activityStatus == 4) {
        MessageBox.alert('亲，活动已经失效啦!', '提示', {
          confirmButtonClass: 'confirmButtonClass'
        })
      }
    },
    _addUmeng(id){
        // 友盟数据统计
        const script = document.createElement('script');
        script.src = 'https://s13.cnzz.com/z_stat.php?id='+ id +'&web_id='+ id;
        script.language = 'JavaScript';
        document.body.appendChild(script);
    },
    judgeTimeLogin(type){//判断登录及活动时间,return false(活动开始、已登录) (搭配wxToapp使用)  type = 3 不判断活动结束
        if(type == 3 && this.activityStatus == 3){
            return false;
        }else if(this.activityStatus != 1){
            this.ActivityPrompt();
            return true;
        }else if(!this.hasLogin){
            this.toApp('LG',{path:'/wxLogin',query:{thisUrl:this.$route.fullPath}});
            return true;
        }else{
            return false;
        }
    },
    _umengEvent(stationName,eventName){//绑定友盟时间统计
        try{
            _czc.push(["_trackEvent", stationName, eventName]); //  友盟统计配置
        }catch(err){
            console.log('友盟时间统计问题'+err);
        }
    }
	}
}

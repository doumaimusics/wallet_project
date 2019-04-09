import { MessageBox } from 'mint-ui';

module.exports = {
	data(){
		return{
			activityStatus:1,//活动状态
			_activetyTime:{}
		}
	},
	methods:{
		_getActivityTime(dataURL){
			this.notLogPost(dataURL,data => {
				if(data.resCode){
					this._activetyTime = data.resData;
					this.activityStatus = data.resData.active;
				}
			},{})
		},
		ActivityPrompt(){
			if (this.activityStatus == 2) {
               MessageBox.alert('亲，活动尚未开始哦!', '提示', {
                 confirmButtonClass:'confirmButtonClass'
               })
           } else if(this.activityStatus == 3){
               MessageBox.alert('亲，活动已经结束啦!', '提示', {
					confirmButtonClass:'confirmButtonClass'
				})
           } else if(this.activityStatus == 4){
               MessageBox.alert('亲，活动已经失效啦!', '提示', {
					confirmButtonClass:'confirmButtonClass'
				})
           }
		}
	}
}

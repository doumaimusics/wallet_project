<template>
	<div id="getCity">
		<div class="hasgetCity" v-if="$route.query.province">已选位置：<span>{{$route.query.province == $route.query.cityName ? '':$route.query.province}}&nbsp;{{$route.query.cityName}}</span></div>
		<mt-index-list>
		    <mt-index-section v-for="(item,index) in letter" :index="item.letter" v-if="item.citylist.length != 0">
			    <div class="cityList" v-for="thisCity in item.citylist"  @click="getCity(index,thisCity.provinceName,thisCity)">
			        <mt-cell :title="thisCity.provinceName ? thisCity.provinceName:thisCity.cityName"></mt-cell>
			    </div>
		    </mt-index-section>
		</mt-index-list>
	</div>
</template>

<script>
	import { IndexList, IndexSection } from 'mint-ui';
	import fingerprintjs2 from 'fingerprintjs2';    //引入拼音组件
	import wxToapp from '../../../../common/wx/wxToapp';    
	export default {
		mixins:[wxToapp],
		data(){
			return {
				citys:'',	//所有城市
				chosenCity:'',	//选中的城市
				province:'',
				letter:[],
				entrance:'',
				toUrl:'',
			}
		},
		methods:{
			getCity(index,province,city){
				var that = this;
				if(!province){
					if(this.entrance == 'sina'){
						this.appRouter(this.toUrl,{gbAreaId:city.gbAreaId,cityName:city.cityName},1)
					}else if(this.entrance == 'zsAmendCard'){
						this.appRouter(this.toUrl,{gbAreaId:city.gbAreaId,cityName:city.cityName,province:this.province},1)
					}else{
						this.appRouter(this.toUrl,{gbAreaId:city.gbAreaId,cityName:city.cityName,province:this.province},1)
					}
				}else{
					this.notLogPost('/zsbank/city',function(res){
						that.citys = res.resData.cityList;
						that.buildItem(that.citys,1);
					},{province:city.provinceId})
					this.province = province;
				}
			},
			getFirstLetter(str){	//  得到城市第一个字的首字母
				return pinyin(str)[0][0].charAt(0).toUpperCase()
			},
			buildLetter: function () {  // 构建字母项
		        this.letter = []
		        for (let i = 0; i < 26; i++) {
		          let obj = {}
		          obj.letter = String.fromCharCode((65 + i))
		          obj.citylist = []
		          this.letter.push(obj)
		        }
     		},
     		buildItem: function (cityNamesFilter,name) {  // 构建城市
 		        this.buildLetter()
 		        let _this = this
 		        for (let i = 0; i < 26; i++) {
 		          _this.letter[i].citylist = []
 		        }
 		        if(name ==1){
 		        	for (let i = 0; i < cityNamesFilter.length; i++) {
 		        	  let _index;
 		        	  if(cityNamesFilter[i].cityName == "重庆市"){
 		        	  	_index = Number('C'.substring(0,1).charCodeAt() - 65)
 		        	  }else{
 		        	  	_index = Number(spell.toPinyin(cityNamesFilter[i].cityName).substring(0,1).charCodeAt() - 65)
 		        	  	if(spell.toPinyin(cityNamesFilter[i].cityName) == 'ZhongQingShi'){
 		        	  		_index = 2
 		        	  	}
 		        	  }
 		        	  if (_index >= 0 && _index < 26) {
 		        	    _this.letter[_index].citylist.push(cityNamesFilter[i])
 		        	  }
 		        	}
 		        }else{
 		        	for (let i = 0; i < cityNamesFilter.length; i++) {
 		        		let _index
 		        		if(cityNamesFilter[i].provinceName == '重庆市'){
 		        			_index = Number('C'.substring(0,1).charCodeAt() - 65)
 		        		}else{
 		        	  		_index = Number(spell.toPinyin(cityNamesFilter[i].provinceName).substring(0,1).charCodeAt() - 65)
 		        		}
 		        	  if (_index >= 0 && _index < 26) {
 		        	    _this.letter[_index].citylist.push(cityNamesFilter[i])
 		        	  }
 		        	}
 		        }
 		        
 		        // 如果letter中citylist中没有值的话，过滤这一项
 		        var showCity = null;
 		        var showCityTemp = null;
 		        showCity = showCityTemp = _this.letter.filter(function (value) {
 		          let len = value.citylist.length
 		          return len > 0
 		        })
 		    },
		},
		components:{
			
		},
		activated(){
			document.title = ''
			document.title = '选择省份'
			var that = this;
			this.entrance = this.$route.query.entrance;
			this.notLogPost('/zsbank/province',function(res){
				that.citys = res.resData.provinceList;
				that.buildItem(that.citys);
			},{})

			if(this.entrance == 'sina'){this.toUrl = '/wxMyAccount/wxBindingCard'}
			else if(this.entrance == 'zsAmendCard'){this.toUrl = '/wxMyAccount/wxAmendCard'}
			else{this.toUrl = '/wxDepository'}
		}
	}
</script>

<style lang="scss" scoped>
	.shi ul{
		background:#fff;
		padding: 0 0.4rem;
		li{
			height: 1.2rem;
			line-height:1.2rem;
			font-size:0.426667rem;
			border-bottom:1px solid #ccc;
			color:#333;
		}
	}
</style>
<style lang="scss">
	#getCity{
		
		.mint-cell-wrapper{
			font-size:0.4rem!important;
		}
		.hasgetCity{
			padding: 0 0.4rem;
			color:#808080;
			font-size:0.346667rem;
			line-height:0.8rem;
			background:#Fff;
			span{
				color:#333;
			}
		}
		.cityList{
			border:0;
			margin:0 0.8rem 0 0.4rem;
			border-bottom:1px solid #e5e5e5;
		}
		.cityList:last-child{
			border-bottom:0;
		}
		.mint-cell{
			background-size:0 0;
		}
		.mint-indexlist-content{
			margin-right:0!important;
			background:#fff;
			font-size:0.4rem;
			color:#333;
		}
		.mint-indexsection-index{
			padding: 0.133333rem 0.4rem;
		}
		.mint-indexlist-nav{
			border:0;
		}
		.mint-cell{
			padding-right:0.8rem;
		}
		.mint-indexlist-nav{
			background: rgba(255,255,255,0);
		}
		.mint-indexsection-index{
			background:#f5f5f5;
		}
		.mint-cell-wrapper{
			background-size:0 0;
		}
	}
</style>
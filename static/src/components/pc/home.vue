<template>
	<div id="index">
    <div v-title>E都市钱包官网 [浙商银行存管] 好资产 更分散</div>
    <div v-keywords>E都市钱包、投资理财、个人理财、P2P理财、互联网金融</div>
		<div class="top-header">
			<div class="bander">
				<el-carousel trigger="click" :interval="3000" height="460px" arrow='never' >
					<div class=" b-top">
					</div>
					<el-carousel-item v-for="item in items" :label="item.title">
						<a :href="item.url" :title='item.title'>
							<img :src="item.picUrl">
						</a>
					</el-carousel-item>
				</el-carousel>
			</div>
		</div>
		<div class="introduce">
        <div class="introduce_content">
          <ul class="iconTap clear">
            <li @click='credibility(1)' class="fl">
              <div class="img fl">
                <img class="fl" src="https://aliyunsso.edspay.com/web/home/pcHome/pcPageRevision/icon1.png" alt="">
              </div>
              <div class="icon-right fl">
                <p>银行存管系统</p>
                <span>对接浙商银行存管</span>
              </div>
            </li>
            <li @click='credibility' class="fl">
              <div class="img fl">
                <img class="fl" src="https://aliyunsso.edspay.com/web/home/pcHome/pcPageRevision/icon2.png" alt="">
              </div>
              <div  class="icon-right fl">
                <p>消费分期类资产</p>
                <span>对接电商平台爱上街</span>
              </div>
            </li>
            <li @click='credibility' class="fl">
              <div class="img fl">
                <img class="fl" src="https://aliyunsso.edspay.com/web/home/pcHome/pcPageRevision/icon3.png" alt="">
              </div>
              <div  class="icon-right fl">
                <p>智能小额分散出借</p>
                <span>一笔出借资金流向多个借款人</span>
              </div>
            </li>
            <li @click='credibility' class="fl">
              <div class="img fl">
                <img class="fl" src="https://aliyunsso.edspay.com/web/home/pcHome/pcPageRevision/icon4.png" alt="">
              </div>
              <div  class="icon-right fl">
                <p>蜂巢风控系统</p>
                <span>多维度、重评估的智能化风控</span>
              </div>
            </li>
          </ul>
          <!-- 行政检查关闭 -->
          <!-- <router-link to="/info/data/makePublic?num=0" class="more-public greyText more_icon">查看更多</router-link> -->
          <ul  class="statistics clear">
            <li class="fl">
              <span class="fl name">累计注册人数(人)：</span>
              <span class="fl redNum fs20" v-html="$options.filters.changeBillion(statistics.userRegister)"></span>
            </li>
            <li class="fl">
              <!-- <div class="line fl"></div> -->
              <span class="fl name">累计交易额(元)：</span>
              <span class="fl redNum fs20" v-html="$options.filters.changeBillion(statistics.tradeAmount)"></span>
            </li>
            <li class="fl">
              <!-- <div class="line fl"></div> -->
              <span class="fl name">为用户带来收益(元)：</span>
              <span class="fl redNum fs20" v-html="$options.filters.changeBillion(statistics.earnAmount)"></span>
            </li>
          </ul>
        </div>   
		</div>
		<div class="index-bor">
			<div class="hot-bor margin">
				<!-- 左侧 -->
				<div class="bor-left">
					<div class="bor-title">
            <img src="https://aliyunsso.edspay.com/web/home/pcHome/pcPageRevision/home-title.png" alt="">
          </div>
					<div class="registe-btn" @click="enrolls">注册即领1118元大礼包</div>
          <!-- 行政检查关闭 -->
					<!-- <div class="toKnow">
						<i class="iconfont">&#xe66e;</i>
						<span><router-link to="/info/data/makePublic">了解E都市钱包  ></router-link></span>
						<i class="icon arrow"></i>
					</div> -->
				</div>
				<!-- 中间 -->
				<!-- 已经登录并且没有新手标 默认出借列表第一个 -->
				<div class="borrow borrow1 fl" v-if="!isShow && getCookie('token')">
					<div class="name title-icons">
			            <router-link :to="{ path: '/invest/detail', query: { uuid:investList.uuid,assetManageType:investList.assetManageType }}">
			            {{investList.name ? investList.name:''}}
			            <i class="home-ai-icon">智能推荐</i>
			            <i class="home-addApr" v-if="investList.addApr">平台加息</i>
			            <i class="home-vipApr" v-if="investList.vipUprateApr>0">V{{investList.vipLevel}}加息</i>
			            <i class="home-redUseNum" v-if="investList.redUseNum>0">{{investList.redUseNum}}张可用</i>
			            </router-link>
	          		</div>
					<ul class="details clear">
						<li class="fl">
							<div class="li-top">
                <span style="font-size:42px">{{investList.apr ? investList.apr:0}}</span><em>%</em>
                <span v-if="investList.addApr  || investList.vipUprateApr" class="smallFont">+{{investList | allApr}}%</span>
                </div>
							<div class="li-bottom">参考年化</div>
						</li>
						<li class="fl">
							<div class="line fl"></div>
							<div class="li-top"><span>{{investList.timeLimit}}</span>{{investList.timeLimit<13 ? '个月' : '天'}}</div>
							<div class="li-bottom">授权服务期</div>
						</li>
						<li class="fl">
							<div class="line fl"></div>
							<div class="li-top">
								<span>{{investList.subTenderAccount ? investList.subTenderAccount:0 | changeWan}}</span>元</div>
							<div class="li-bottom">剩余金额</div>
						</li>
					</ul>
					<router-link :to="{ path: '/invest/detail', query: { uuid:investList.uuid,assetManageType:investList.assetManageType }}" class="botton">授权出借</router-link>
				</div>
				<!-- 没登录 显示新手标 -->
				<div class="borrow borrow1 fl" v-else>
					<div class="name title-icons">
			            <router-link :to="{ path: '/invest/detail', query: { uuid:newBorrowList.uuid,assetManageType:newBorrowList.assetManageType }}">
			            {{newBorrowList.name ? newBorrowList.name:''}}
			            <i class="home-new-icon"></i>
			            <i class="redUseNum-ico" v-if='newRedNum'>{{newRedNum}}张可用</i>
			            </router-link>
			        </div>
					<ul class="details clear">
						<li class="fl">
							<div class="li-top" style="color:#FF5B4C;">
								<span style="font-size:42px">{{newBorrowList.apr ? newBorrowList.apr:0 | returnFloat1}}</span><em>%</em>
                <span v-if="newBorrowList.addApr" class="smallFont">+{{newBorrowList.addApr | returnFloat1}}%</span>
							</div>
							<div class="li-bottom">参考年化</div>
						</li>
						<li class="fl">
							<div class="line fl"></div>
							<div class="li-top"><span>30</span>天</div>
							<div class="li-bottom">授权服务期</div>
						</li>
						<li class="fl">
							<div class="line fl"></div>
							<div class="li-top">
								<span>{{newBorrowList.mostAccount ? newBorrowList.mostAccount:5000}}</span>元</div>
							<div class="li-bottom">出借上限</div>
						</li>
					</ul>
					<router-link :to="{ path: '/invest/detail', query: { uuid:newBorrowList.uuid,assetManageType:newBorrowList.assetManageType }}" class="botton">授权出借</router-link>
				</div>
				<!-- <div class="borrow fl">
					<div class="name">E起赚（灵活理财）<img src="https://aliyunsso.edspay.com/web/home/pcHome/Eqz-icon.png" alt="" class="Eqz-bg"></div>
					<p class="text">灵活存取 理财更便捷</p>
					<ul class="details clear">
						<li class="fl">
							<div v-if="ePlan.isOpen == 1 && login">
								<div class="li-top"><span>{{ePlan.todayProfit | moneyFormat}}</span>元</div>
								<div class="li-top"><span>{{ePlan.todayProfit | moneyFormat}}</span>元</div>
								<div class="li-bottom">昨日收益</div>
							</div>
							<div v-else>
								<div class="li-top"><span>{{ePlan.fluxApr}}</span><em>%<i v-if="ePlan.addApr">+{{ePlan.addApr}}%</i></em></div>
								<div class="li-bottom">约定年化利率</div>
							</div>
						</li>
						<li class="fl">
							<div class="line fl"></div>
							<div v-if="ePlan.isOpen == 1 && login">
								<div class="li-top"><span>{{ePlan.fluxUseMoney | moneyFormat}}</span>元</div>
								<div class="li-bottom">E起赚总额</div>
							</div>
							<div v-else>
								<div class="li-top"><i>灵活存取</i></div>
								<div class="li-bottom">授权服务期</div>
							</div>
						</li>
						<li class="fl">
							<div class="line fl"></div>
							<div v-if="ePlan.isOpen == 1 && login">
								<div class="li-top"><span>{{ePlan.totalProfit | moneyFormat}}</span>元</div>
								<div class="li-bottom">累计收益</div>
							</div>
							<div v-else>
								<div class="li-top"><i>余额自动转入</i></div>
								<div class="li-bottom">出借方式</div>
							</div>
						</li>
					</ul>
					<div @click='openCurrent' class="botton" v-if='ePlan.isOpen == 1 && login'>进入E起赚</div>
					<div class="botton gray" v-else >暂停开通</div>
				</div> -->
				<div class="saoSrc"></div>
			</div>
			<div class="recommend-bor margin">
				<router-link to="/investList" class="more greyText more_icon" tag="div">更多项目</router-link>
				<div class="title ">
          <i class="red_line"></i>
          <h3>优选项目</h3>简单出借，收益稳健
        </div>
			<ul class="bor-list clear">
				<li v-for='(v, index) in fixBorrow' v-if="index<=4" class="fl">
					<div class="name title-icons">
			            <router-link :to="{ path: '/invest/detail', query: { uuid:v.uuid,assetManageType:v.assetManageType }}" tag="span">
			                {{v.name}}
			            </router-link>
			            <div class="list-icos">
			              	<i class="home-addApr" v-if="v.addApr">平台加息</i>
			              	<i class="home-vipApr" v-if="v.vipUprateApr>0">V{{v.vipLevel}}加息</i>
			              	<i class="home-redUseNum" v-if="v.redUseNum">{{v.redUseNum}}张可用</i>
			            </div>
	            	</div>
		            <div class="bor-div">
		                <div class="bor-item">
		                  <div class="apr className">
		                    <span>{{v.apr | returnFloat1}}</span>%<em v-if="v.addApr || v.vipUprateApr">+{{v | allApr}}%</em>
		                  </div>
		                  <h4>参考年化</h4>
		                </div>
		                <div class="bor-line"></div>
		                <div class="bor-item">
		                  <div class="apr"><span class="bor-time">{{v.timeLimit}}</span>{{v.borrowTimeType == 1 ? '天':'月'}}</div>
		                  <h4>授权服务期</h4>
		                </div>
		            </div>
					<router-link :to="{ path: '/invest/detail', query: { uuid:v.uuid,assetManageType:v.assetManageType }}" class="botton" tag="div">授权出借</router-link>
				</li>
			</ul>
		</div>
		</div>
		<div class="nows">
      <div class="nows_content clear">
          <div class="media fl">
             <div class="view_more_btn more_icon"><router-link to="/info/dynamic/coverage?num=0">查看更多</router-link></div>
            <div class="title clear">
              <div class="red_line"></div>
              <h3>媒体报道</h3>
            </div>
            <div class="contnet clear">
              <ul class="media-list fl">
                <router-link v-for='(v,index) in newsReport' v-if="index < 3" :to="{ path: '/info/dynamic/coverage/notice', query: { news:v.id }}" class="hidden" tag="li">
                   <div class="fl mediaImg">
                     <img :src="v.picPath" alt="">
                   </div>
                  <div class="fl mediaContent">
                      <div class="mediaTitie">{{v.title}}</div>
                  </div>
                  <div class="mediaTime">{{v.startTime ? v.startTime:'0' | divisionTime}}</div>  
                </router-link>
               
              </ul>
            </div>
          </div>
          <div class="notice fl">
            <div class="view_more_btn more_icon"><router-link to="/info/notice/announcement?num=0" >查看更多</router-link></div>
            <div class="title clear">
              <div class="red_line"></div>
              <h3>平台公告</h3>
            </div>
            <ul>
              <router-link v-for='(v,index) in siteNotice' v-if="index<6" :to="{path: '/info/notice/announcement/notice', query: { notice:v.id }}" tag="li">
                    {{v.title}}
                    <em class="fr">{{v.startTime ? v.startTime:'0' | divisionTime}}</em>
              </router-link>
            </ul>
          </div>
      </div>
		</div>
		<!-- <div class="nows-line"></div> -->
		<div class="partner margin">
			<!-- <div class="line"></div> -->
      <div class="red_line"></div>
			<el-tabs v-model="activeName" @tab-click="handleClick">
			    <el-tab-pane label="合作伙伴" name="first">
					<div class="content">
						<a v-for="(v, index) in partner" :href="v.url" :title="v.title" target="_blank"><img :src="v.picUrl" height="58" width="149" /></a>
					</div>
			    </el-tab-pane>
			    <el-tab-pane label="荣誉资质" name="second">
			    	<div class="honors clear">
			    		<div class="honor">
			    			<img src="https://aliyunsso.edspay.com/web/home/pcHome/honor1.png" alt="">
			    			<p  class="p1">成为浙江投融资协会理事单位</p>
			    		</div>
			    		<div class="honor">
			    			<img src="https://aliyunsso.edspay.com/web/home/pcHome/honor2.png" alt="">
			    			<p>荣获网贷互联<br/>“互联网金融信息服务平台优秀成员单位”称号</p>
			    		</div>
			    		<div class="honor">
			    			<img src="https://aliyunsso.edspay.com/web/home/pcHome/honor3.png" alt="">
			    			<p class="p1">成为浙江省大数据科技协会理事单位</p>
			    		</div>
			    		<div class="honor">
			    			<img src="https://aliyunsso.edspay.com/web/home/pcHome/honor4.png" alt="">
			    			<p>获得中国电子商务协会<br/>颁发的互联网金融行业诚信示范单位</p>
			    		</div>		    		
			    	</div>
			    </el-tab-pane>
			</el-tabs>	
		</div>

	</div>
</template>

<script>
import getData from "../../common/router/getData.js"         // 获取图片验证码
export default {
	name: 'index',
	mixins: [getData],
	// metaInfo: {
	//    	title: 'E都市钱包官网 [浙商银行存管] 好资产 更分散 ', // set a title
	//    	meta: [{                 // set meta
	//    	  name: 'keywords',
	//    	  content: '平台简介，E都市钱包，企业文化，出借理财,个人理财,互联网金融，P2P理财'
	//    	}]
	// },
	data() {
		return {
			activeName: 'first', //合作tab
			noFixBorrow: true,  // 定期理财
			login: false,      // 已经登录
			userPhone: '',     // 用户名
			statistics: {},    // 统计数据
			siteNotice: '',    // 网站公告
			newsReport: '',    // 媒体报道
			partner: '',       // 合作伙伴
			newBorrow: false,  // 是否展示新手标
			newBorrowList: {}, // 新手标数据
			fixBorrow: {},     // 定期理财
			ePlan: '',         // E起赚
			items: '',         // banner轮播图
			investList:{},  // 取第一个出借项目
			isShow: true, // 是否新手标
			newRedNum:0,//新手标可用红包
		}
	},
	props:['sign'],
	methods: {
		handleClick(tab, event) {
	      	console.log(tab, event);
	    },
		openCurrent() {      // 开通和进入E起赚
			if(!this.getCookie('token')){
				this.change()
				this.$emit('sigeinfo', true, 'second');
				return;
			}
			this.$router.push({ path: '/myAccount/current' });
		},
		regularInvest() {    // 授权出借
			this.$router.push({ path: '/invest' });
		},
		credibility(n) {      // 进入银行存管 或者风控页面
			n == 1 ? this.$router.push({ path: '/info/security/custody?num=0' }) : this.$router.push({ path: '/info/security/custody?num=1' });
		},
		signIn() {        // 登录
			this.change()
			this.$emit('sigeinfo', true, 'second');
		},
		enrolls() {     // 注册
			if(this.login){
				this.$router.push({ path: '/myAccount/myCoupon' })
			}else{
				this.change()
				this.$emit('sigeinfo', true, 'first');
				setTimeout(function() {
					$(".loginBox").height("560px");
				}, 50)
			}
		},
		initData() {
			let _this = this
			// banner轮播图
			_this.$http.post(_this.ajaxUrl.getUrl(1) + "/index/rolling").then((data) => {
				if (data.body.resCode == 1) {
					_this.items = data.body.resData.data.list
				}
			})

			// 统计数据
			_this.$http.post(_this.ajaxUrl.getUrl(1) + "/index/statistics",{ isIndex:0}).then((res) => {
				if (res.body.resCode == 1) {
					_this.statistics = res.body.resData.data
				}
			})


			// 平台公告
			_this.$http.post(_this.ajaxUrl.getUrl(1) + "/index/siteNotice", { pageNum: 1, pageSize: 6 }).then((res) => {
				if (res.body.resCode == 1) {
					_this.siteNotice = res.body.resData.data.list
				}
			})


			// 媒体报道
			_this.$http.post(_this.ajaxUrl.getUrl(1) + "/index/newsReport", { pageNum: 1, pageSize: 3 }).then((res) => {
				if (res.body.resCode == 1) {
					_this.newsReport = res.body.resData.data.list
				}
			})

			// 合作伙伴
			_this.$http.post(_this.ajaxUrl.getUrl(1) + "/index/partner").then((res) => {
				if (res.body.resCode == 1) {
					_this.partner = res.body.resData.data.list
				}
			})

			let json_ = {}
			_this.getCookie('token') ? json_.token = _this.getCookie('token') : json_ = {}

			// 定期理财
			_this.$http.post(_this.ajaxUrl.getUrl(1) + "/index/fixBorrow", json_).then((res) => {
				if (res.body.resCode == 1) {
					_this.fixBorrow = res.body.resData.data.borrow
					if (_this.fixBorrow.length == 0) {
						_this.noFixBorrow = false
					}
					//遍历可用红包
					var investDataList = res.body.resData.data.borrow;
					var invesRedList = res.body.resData.data.redModel
					for(var j=0; j<investDataList.length; j++){
					  var redUseNum = 0
					  if(investDataList[j].isRedEnvelope == 0 && investDataList[j].isUpRate == 0){//红包加息券都可用
					  	if(investDataList[j].type == 0){//筛选新手标
					  	  for(var i=0; i<invesRedList.length; i++){
					  	    if(invesRedList[i].category != 1 && invesRedList[i].category != 2){//优惠券为无限制和只为新手标可用
					  	      if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){//没有时间上限
					  	        redUseNum++
					  	      }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
					  	        redUseNum++
					  	      }
					  	    }
					  	  }
					  	}else{//普通标
					  	  for(var i=0; i<invesRedList.length; i++){
					  	    if(invesRedList[i].category != 0 && invesRedList[i].category != 2){//优惠券为无限制和只为普通标可用
					  	      if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){//没有时间上限
					  	        redUseNum++
					  	      }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
					  	        redUseNum++
					  	      }
					  	    }
					  	  }
					  	}
					  }else if(investDataList[j].isRedEnvelope == 0 && investDataList[j].isUpRate == 1){//红包不可用、加息券可用
					  	if(investDataList[j].type == 0){//筛选新手标
					  	  for(var i=0; i<invesRedList.length; i++){
					  	    if(invesRedList[i].category != 1 && invesRedList[i].type != 0 && invesRedList[i].category != 2){
					  	      if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){
					  	        redUseNum++
					  	      }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
					  	        redUseNum++
					  	      }
					  	    }
					  	  }
					  	}else{//普通标
					  	  for(var i=0; i<invesRedList.length; i++){
					  	    if(invesRedList[i].category != 0 && invesRedList[i].type != 0 && invesRedList[i].category != 2){
					  	      if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){
					  	        redUseNum++
					  	      }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
					  	        redUseNum++
					  	      }
					  	    }
					  	  }
					  	}
					  }else if(investDataList[j].isRedEnvelope == 1 && investDataList[j].isUpRate == 0){//红包不可用、加息券可用
					  	if(investDataList[j].type == 0){//筛选新手标
					  	  for(var i=0; i<invesRedList.length; i++){
					  	    if(invesRedList[i].category != 1 && invesRedList[i].type == 0 && invesRedList[i].category != 2){
					  	      if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){
					  	        redUseNum++
					  	      }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
					  	        redUseNum++
					  	      }
					  	    }
					  	  }
					  	}else{//普通标
					  	  for(var i=0; i<invesRedList.length; i++){
					  	    if(invesRedList[i].category != 0 && invesRedList[i].type == 0 && invesRedList[i].category != 2){
					  	      if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit){
					  	        redUseNum++
					  	      }else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList[j].timeLimit && investDataList[j].timeLimit <= invesRedList[i].maxDayTime){
					  	        redUseNum++
					  	      }
					  	    }
					  	  }
					  	}  
					  }
					  
					  //算好的红包数量，将字段插入理财列表数组
					  investDataList[j].redUseNum = redUseNum
					}
				}
			})


			// E起赚
			// _this.$http.post(_this.ajaxUrl.getUrl(1) + "/index/ePlan", json_).then((res) => {
			// 	if (res.body.resCode == 1) {
			// 		_this.ePlan = res.body.resData.data

			// 	}
			// })


			
			// 新手标
			_this.$http.post(_this.ajaxUrl.getUrl(1) + "/index/newBorrow", json_).then((res) => {
				if (res.body.resCode == 1) {
					var newRedNumb = 0

					//可用红包
					if(res.body.resData.data.borrow.isRedEnvelope == 0 && res.body.resData.data.borrow.isUprate == 0){
						for(var i=0; i<res.body.resData.data.redModel.length; i++){
							if(res.body.resData.data.redModel[i].category != 1 && res.body.resData.data.redModel[i].category != 2){
								if(res.body.resData.data.redModel[i].maxDayTime == 0 && res.body.resData.data.redModel[i].minDayTime <= res.body.resData.data.borrow.timeLimit){
									newRedNumb++
								}else if(res.body.resData.data.redModel[i].maxDayTime != 0 && res.body.resData.data.redModel[i].minDayTime <= res.body.resData.data.borrow.timeLimit && res.body.resData.data.borrow.timeLimit <= res.body.resData.data.redModel[i].maxDayTime){
									newRedNumb++
								}
							}
						}
						this.newRedNum = newRedNumb
					}else if(res.body.resData.data.borrow.isRedEnvelope == 0 && res.body.resData.data.borrow.isUprate == 1){
						for(var i=0; i<res.body.resData.data.redModel.length; i++){
							if(res.body.resData.data.redModel[i].category != 1 && res.body.resData.data.redModel[i].type != 0 && res.body.resData.data.redModel[i].category != 2){
								if(res.body.resData.data.redModel[i].maxDayTime == 0 && res.body.resData.data.redModel[i].minDayTime <= res.body.resData.data.borrow.timeLimit){
									newRedNumb++
								}else if(res.body.resData.data.redModel[i].maxDayTime != 0 && res.body.resData.data.redModel[i].minDayTime <= res.body.resData.data.borrow.timeLimit && res.body.resData.data.borrow.timeLimit <= res.body.resData.data.redModel[i].maxDayTime){
									newRedNumb++
								}
							}
						}
						this.newRedNum = newRedNumb
					}else if(res.body.resData.data.borrow.isRedEnvelope == 1 && res.body.resData.data.borrow.isUprate == 0){
						for(var i=0; i<res.body.resData.data.redModel.length; i++){
							if(res.body.resData.data.redModel[i].category != 1 && res.body.resData.data.redModel[i].type == 0 && res.body.resData.data.redModel[i].category != 2){
								if(res.body.resData.data.redModel[i].maxDayTime == 0 && res.body.resData.data.redModel[i].minDayTime <= res.body.resData.data.borrow.timeLimit){
									newRedNumb++
								}else if(res.body.resData.data.redModel[i].maxDayTime != 0 && res.body.resData.data.redModel[i].minDayTime <= res.body.resData.data.borrow.timeLimit && res.body.resData.data.borrow.timeLimit <= res.body.resData.data.redModel[i].maxDayTime){
									newRedNumb++
								}
							}
						}
						this.newRedNum = newRedNumb
					}
					

					if (res.body.resData.data.isShow == 1) {
						_this.isShow = true
						if (!res.body.resData.data.borrow) {
							_this.newBorrow = false
						} else {
							_this.newBorrow = true
							_this.newBorrowList = res.body.resData.data.borrow;
						}
					} else {
						_this.newBorrow = false
						_this.isShow = false
						_this.getInvest()
					}
				}
			})
		},
		getInvest () {
				this.$http.post(this.ajaxUrl.getUrl(1)+"/borrow/list",{}).then((data) => {
					if (data.body.resCode == 1) {
						this.investList=data.body.resData.pageInfo.list[0]
						//遍历可用红包
						var investDataList = data.body.resData.pageInfo.list[0];
						var invesRedList = data.body.resData.redModel
						var redUseNum = 0
						if(investDataList.isRedEnvelope == 0 && investDataList.isUpRate == 0){
							if(investDataList.category == 0){
								for(var i=0; i<invesRedList.length; i++){
									if(invesRedList[i].category != 1 && invesRedList[i].category != 2){
										if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList.timeLimit){
											redUseNum++
										}else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList.timeLimit && investDataList.timeLimit <= invesRedList[i].maxDayTime){
											redUseNum++
										}
									}
								}
							}else{
								for(var i=0; i<invesRedList.length; i++){
									if(invesRedList[i].category != 0 && invesRedList[i].category != 2){
										if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList.timeLimit){
											redUseNum++
										}else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList.timeLimit && investDataList.timeLimit <= invesRedList[i].maxDayTime){
											redUseNum++
										}
									}
								}
							}
						}else if(investDataList.isRedEnvelope == 0 && investDataList.isUpRate == 1){
							if(investDataList.category == 0){
								for(var i=0; i<invesRedList.length; i++){
									if(invesRedList[i].category != 1 && invesRedList[i].type != 0 && invesRedList[i].category != 2){
										if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList.timeLimit){
											redUseNum++
										}else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList.timeLimit && investDataList.timeLimit <= invesRedList[i].maxDayTime){
											redUseNum++
										}
									}
								}
							}else{
								for(var i=0; i<invesRedList.length; i++){
									if(invesRedList[i].category != 0 && invesRedList[i].type != 0 && invesRedList[i].category != 2){
										if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList.timeLimit){
											redUseNum++
										}else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList.timeLimit && investDataList.timeLimit <= invesRedList[i].maxDayTime){
											redUseNum++
										}
									}
								}
							}
						}else if(investDataList.isRedEnvelope == 1 && investDataList.isUpRate == 0){
							if(investDataList.category == 0){
								for(var i=0; i<invesRedList.length; i++){
									if(invesRedList[i].category != 1 && invesRedList[i].type == 0 && invesRedList[i].category != 2){
										if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList.timeLimit){
											redUseNum++
										}else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList.timeLimit && investDataList.timeLimit <= invesRedList[i].maxDayTime){
											redUseNum++
										}
									}
								}
							}else{
								for(var i=0; i<invesRedList.length; i++){
									if(invesRedList[i].category != 0 && invesRedList[i].type == 0 && invesRedList[i].category != 2){
										if(invesRedList[i].maxDayTime == 0 && invesRedList[i].minDayTime <= investDataList.timeLimit){
											redUseNum++
										}else if(invesRedList[i].maxDayTime != 0 && invesRedList[i].minDayTime <= investDataList.timeLimit && investDataList.timeLimit <= invesRedList[i].maxDayTime){
											redUseNum++
										}
									}
								}
							}
						}
						//算好的红包数量，将字段插入理财列表数组
						investDataList.redUseNum = redUseNum
					}
				})
			}
		},
	created: function() {
		this.initData()
		this.$emit('isShowHeader', 1)
	},
	mounted(){
		this.userPhone = this.getCookie('userName')
    this.getCookie('token') ? this.login = true : this.login = false

    const script = document.createElement('script')
    script.src = 'https://s13.cnzz.com/z_stat.php?id=1273780007&web_id=1273780007'
    script.language = 'JavaScript'
    document.body.appendChild(script)
	},
	destroyed(){
			this.$emit('isShowHeader', 0)
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

<style lang="scss">
.el-carousel__button{   // 覆盖框架里的样式
  opacity: 1;
}
#index {
  .more_icon{
     background: url(https://aliyunsso.edspay.com/web/more_icon.png) no-repeat;  
    background-size:10px 10px;
    background-position:right center;
    padding-right: 13px;
  }
  .el-tabs__header {
    border: 0;
    // margin: 20px 0 50px 0;
    padding-left: 34px;
    .el-tabs__item {
      font-size: 20px;
      line-height: 28px;
      color: #999;
    }
    

    .is-active {
      color: #333;
      font-size: 24px;
color: #333333;
    }
    .el-tabs__active-bar {
      height: 2px;
      width: 78px;
      background: #fc4047;
      display: none;
    }
  }
  .el-carousel__indicators{  // PC页面修改轮播圆点的样式
      // width: 100%;
      // margin: 0 auto;
      // padding-left: 360px;
  }
  .el-carousel__indicator{ // PC页面修改轮播圆点的样式
        // width: 198px;
        height: 45px;
        padding: 0;
        margin: 0 auto;
        margin-right: 2px;
        position: relative;
      }
  .el-carousel__button { // PC页面修改轮播圆点的样式
        width: 198px;
        height: 45px;
        font-size: 14px;
        background-color: rgba(255,255,255,0.2);/* IE9、标准浏览器、IE6和部分IE7内核的浏览器(如QQ浏览器)会读懂 */
        overflow: hidden;
        text-overflow:ellipsis;
        white-space: nowrap;
        color: #fff;
        span{
          width: 100%;
          color: #fff;
 
        }
  }
    @media \0screen\,screen\9 {/*暂时解决文字随背景透明度改变的问题 只支持IE6、7、8 */
    .el-carousel__button{
      background-color:#fff;
      filter:Alpha(opacity=20);
      position:static; /* IE6、7、8只能设置position:static(默认属性) ，否则会导致子元素继承Alpha值 */
      *zoom:1; /* 激活IE6、7的haslayout属性，让它读懂Alpha */
    }
    .el-carousel__button span{
      position: relative;/* 设置子元素为相对定位，可让子元素不继承Alpha值 */
      color: #fff;
    }  
}
  .el-carousel__indicator.is-active {
    
    .el-carousel__button { // PC页面修改轮播圆点的样式
      background: #ffffff;
      color: #333;
      span{
        color: #333;
      }
      
    }
  }


  /*字体为20*/
  .fs20 {
      span {
        font-size: 20px;
        padding-left:2px;
			  padding-right:2px;
      }
  }
}
</style>

<style lang="scss" scoped>
/*   .red_line{
    width: 6px;
    height: 25px;
    background:url(https://aliyunsso.edspay.com/web/home/pcHome/pcPageRevision/red_line.png) no-repeat;
    background-size: cover;
  } */
.margin {
  width: 1200px;
  margin: 0 auto;
}
.greyText {
  color: #4a4a4a;
  a{
    float: right;
    display: block;
    width: 115px;
  }
}
.greyText.notice a {
    width: 80px;
}
.greyText:hover{
  color: #999999;
}
.greyText a:hover {
  color: #F31B23;
  .greyArrow {
    background: url(https://aliyunsso.edspay.com/web/home/pcHome/redArrow.png) center center  no-repeat;
    background-size: 9px 9px;
  }
}
.greyArrow {
  display:inline-block;
  width:9px;
  height:9px;
  background: url(https://aliyunsso.edspay.com/web/home/pcHome/greyArrow.png) center center no-repeat;
  background-size: 9px 9px;
  margin-left:5px;
}
.more-public {
  position: absolute;
  right: 22px;
  font-size: 14px;
  line-height: 20px;
  bottom: 20px;
  cursor: pointer;
  i{
    font-size: 12px;
  }
}
.more-public.greyText {
    color: #808080;
}

#index {
  color: #333;
  background: #F8F8F8;
  padding-bottom: 20px;
  h3 {
    font-size: 20px;
    line-height: 28px;
    padding-right: 10px;
    display: inline-block;
    color: #333;
  }
  span {
    display: inline-block;
  }
  .botton:hover {
    background: #f31b23;
    color: #fff !important;
  }
  .gray:hover {
    background: #fff;
    color: #999 !important;
  }
  .top-header {
    position: relative;
    height: 460px;
    overflow: hidden;
    width:100%;
    .bander {
      position: absolute;
      left: 50%;
      margin-left: -960px;
      width: 1920px;
      z-index: 5;
      height: 460px;
      img {
        height: 460px;
        width: 1920px;
      } 
    }
  }
  .title-icons {
    a {
      display:flex;
      flex-direction:row;
      align-items:center;
    }
    .list-icos{
    	height: 20px;
    }
    i {
      display: inline-block;
      height: 20px;
      line-height:20px;
      padding:0px 3px;
      font-size: 12px;
      margin-right:10px;
      border-radius:2px;
      position: relative;
      top: -5px;
    }
    i.home-new-icon{
      width: 74px;
      height: 24px;
    border:none;
      background: url(https://aliyunsso.edspay.com/web/home/pcHome/pcPageRevision/newIcon.png?v=1.1) no-repeat;
      background-size:cover;
    }
    i:nth-of-type(1) {
      margin-left:15px;
    }
  }
  .introduce {
background: #fff;
   
    .introduce_content{
 position: relative;
    height: 195px;
    width: 1200px;
    margin: 0 auto;
    
    }
    .statistics {
      padding: 20px 0;
      li {
        .name {
          font-size: 14px;
          height: 40px;
          line-height: 40px;
        }
        .redNum {
          font-size: 24px;
          line-height: 40px;
          height: 40px;
          color: #f31b23;
          font-family: DIN-Medium;
        }
        .line {
          height: 12px;
          width: 1px;
          margin: 15px 26px 0 36px;
          background: #c0c0c0;
        }
      }
      li:not(:first-child){
        margin-left:120px;
      }
    }
     
    .iconTap {
      width: 1200px;
      padding:30px 0;
      border-bottom: 1px solid #e5e5e5;
      li {
        width: 300px;
        cursor: pointer;
        .img {
          height: 60px;
          width: 60px;
          margin-right: 20px;
          transition: all 1s ease;
          cursor: pointer;
          img {
            width: 100%;
            height: 100%;
          }
        }
        p {
          font-size: 18px;
          line-height: 22px;
          padding-bottom: 3px;
          padding-top: 7px;
        }
        span {
          font-size: 14px;
          line-height: 20px;
          color: #999999;
        }
      }
      li:hover .img {
        transform: rotateY(180deg);
      }
    }
  }
  .index-bor {
    // height: 600px;
    background: #F8F8F8;
    overflow: hidden;
    .title {
      padding: 36px 0 15px 0;
      font-size: 12px;
      line-height: 28px;
      color: #999;
    }
    .hot-bor {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-top: 20px;
      .bor-left {
        display: flex;
        flex-direction: column;
        padding:30px 0 0 30px;
        color: #333333;
        background:#fff;
        height: 233px;
        width: 270px;
        .bor-title {
          width: 175px;
          height: 80px;
          img{
            width: 100%;
            height: 100%;
          }
          // background:url(https://aliyunsso.edspay.com/web/home/pcHome/pcPageRevision/home-title.png) no-repeat;
          // background-size:cover;
        }
        .p1 {
          font-size: 48px;
          line-height: 67px;
        }
        .p2 {
          font-size: 20px;
          line-height: 28px;
          margin-top: 2px;
        }
        .registe-btn {
          width: 210px;
          height: 50px;
          margin-top: 15px;
          color: white;
          line-height: 50px;
          text-align: center;
          // background-image: linear-gradient(-227deg, #f41f27 0%, #ff5c3c 100%);
          background: #FF5B4C;
          box-shadow: 0 2px 12px 0 rgba(110,60,58,0.32);
          border-radius: 2px;
          cursor: pointer;
        }
        .toKnow {
          display: flex;
          flex-direction: row;
          align-items: center;
          height: 20px;
          line-height: 20px;
          margin: 20px 0 18px 0;
          font-size: 14px;
          i{
            color: #508CEE;
          }
          span {
            cursor: pointer;
            color: #508CEE;
            margin-left: 5px;
          }
         /*  span:hover {
            color:#F31B23;
          } */
          .icon {
            display: inline-block;
          }
          .blueIcon {
            width: 14px;
            height: 17px;
            background: url("https://aliyunsso.edspay.com/web/home/homePilu.png?v=1.1");
            background-size: cover;
            margin-right: 6px;
          }
        }
      }
      .saoSrc {
        width: 210px;
        height: 233px;
        background: url("https://aliyunsso.edspay.com/web/home/pcHome/pcPageRevision/homeSao.png?v=1.1");
        background-size: cover;
      }
      .borrow {
        height: 233px;
        width: 690px;
        background:#fff;
        padding-top: 30px;
        // background: url(https://aliyunsso.edspay.com/web/home/border-top.png)
        //   no-repeat;
        // background-size: cover;
        position: relative;
        margin-bottom: 20px;
        .name {
          font-size: 24px;
          font-family: PingFangSC-Medium;
          height: 30px;
          padding-left: 27px;
          cursor: pointer;
          img {
            height: 20px;
            width: 40px;
            margin-left: 12px;
          }
          .Eqz-bg {
            height: 18px;
            width: 18px;
          }
        }
        .name:hover {
          color:#F31B23;
        }
        .text {
          padding: 4px 0 25px 27px;
          font-size: 14px;
          line-height: 20px;
          color: #999;
        }
        .details {
			margin-top: 60px;
          li {
            width: 33.2%;
            text-align: center;
            .li-top {
              line-height: 50px;
              font-size: 17px;
              height: 50px;
              .smallFont {
                font-size:25px;
              }
              span {
                font-size: 34px;
                font-family: DIN-Medium;
              }
              em {
                font-size: 26px;
                vertical-align: initial;
              }
              i {
                font-size: 18px;
              }
            }
            .li-bottom {
              font-size: 14px;
              line-height: 20px;
              color: #9F9F9F;
              margin-top: 10px;
            }
            .line {
              height: 45px;
              width: 1px;
              background: #ccc;
              margin-top: 10px;
            }
          }
        }
        .botton {
          position: absolute;
          top: 30px;
          right: 30px;
          border-radius: 2px;
          width: 120px;
          height: 38px;
          font-size: 17px;
          line-height: 38px;
          text-align: center;
          color: #fff;
          background: #FF5B4C;
          cursor: pointer;
        }
        .gray {
          color: #999;
          border: 1px solid #999;
        }
      }
    }
    .recommend-bor {
      position: relative;
      margin-bottom:20px;
      background: #fff; 
      .more {
        position: absolute;
        width: 100px;
        right: 0;
        font-size: 14px;
        line-height: 20px;
        top: 37px;
        cursor: pointer;
        color:#808080;
        i{
          font-size: 12px;
          color:#808080;
        }
      }
      .more.more_icon{
        padding-right: 0;
        background-position:62px center;
      }
      .title{
        padding-left: 30px;
        padding-top: 34px;
        padding-bottom: 0;
        font-size: 14px;
        color:#999;
        h3{
          float: left;
          font-family: PingFangSC-Medium;
          font-size: 24px;
          color: #333333;
          padding-left: 16px;
        }
        .red_line{
         float: left;
         margin-top: 3px;
        }
      }
      .bor-list {
        padding: 32px 28px 30px 30px;
        li {
          width: 274px;
          height: 250px;
          margin-right: 15px;
          background: url(https://aliyunsso.edspay.com/web/home/pcHome/pcPageRevision/bor-bg.png?v=1.1) no-repeat;
          background-size: 100%;
          border: 1px solid #E5E5E5;
          
          .title-icons {
            padding: 24px 0 0 20px;
            font-size: 18px;
            font-family: PingFangSC-Medium;
            span{
              color: #333;
              margin-bottom: 10px;
            }
            i:nth-of-type(1) {
                margin-left:0px;
              }
              i {
                margin-right:0px;
              }
          }
          .bor-div {
            display:flex;
            flex-direction:row;
            margin-top:20px;
            height: 57px;
            text-align:center;
            font-family: DIN-Medium;
            .bor-line {
              width:1px;
              height:38px;
              background:#F1F1F1;
              margin-top:10px;
              margin-right:25px;
            }
            .bor-item:nth-of-type(1){
              width:150px;
            }
            .bor-time {
              font-size:30px;
            }
          }
          .name {
            font-size: 18px;
            line-height: 26px;
            cursor: pointer;
            text-align: center;
          }
          .name:hover {
            color:#F31B23;
            .across {
              background: #F31B23;
            }
          }
          .day {
            font-size: 12px;
            line-height: 16px;
            color: #999;
          }
          .apr {
            font-size: 20px;
            line-height: 35px;
            height:35px;
             
            span {
              font-size: 24px;
            }
            em {
                vertical-align: inherit;
            }
          }
          .apr.className{
                 color: #FF5B4C; 
          }
          h4 {
            font-size: 12px;
            line-height: 18px;
            color: #9F9F9F;
          }
          .botton {
            overflow: hidden;
            height: 40px;
            width: 184px;
            text-align:center;
            border: 1px solid #FF5B4C;
            line-height: 40px;
            font-size: 16px;
            color: #FF5B4C;
            margin: 20px auto 0px auto;
            cursor: pointer;
            border-radius: 2px;
            &:hover{
              background: #FF5B4C;
              color: #fff;
            }
          }
        }
        li:hover{
          border: none;
          box-shadow: 0 2px 9px 0 rgba(0,0,0,0.11);
        }
        li:last-child {
          margin: 0;
        }
      }
    }
  }
  .nows {
    height: 463px;
    background:#F8F8F8;
    margin-bottom: 20px;
    .nows_content{
      width: 1200px;
      height: 100%;
      margin:0 auto;
      .title{
        padding-top: 34px;
        font-size: 14px;
        color: #999;
        h3{
          float: left;
          font-size:24px;
          color:#333;
          padding-left: 16px;
          font-family: PingFangSC-Medium;
        }
        .red_line{
         float: left;
         margin-top: 3px;
        }
      }
    }
    .title {
      padding: 36px 0 12px 0;
      line-height: 28px;
    }
    .media,.notice{
      position: relative;
      height: 463px;
      padding-left: 30px;
      .view_more_btn{
        position: absolute;
        top: 37px;
        right: 28px;
        color: #808080;
      }
    }
    .media {
      width: 593px;
      background: #fff;
      margin-right: 15px;
      padding-right: 30px;
      .big-img {
        // width: 274px;
        height: 170px;
        margin-right: 30px;
      }
      .media-list {
        // width: 312px;
        li {
          cursor: pointer;
          font-size: 16px;
          color: #333333;
          padding-top: 18px;
          padding-bottom: 20px;
          border-bottom:1px dashed #e5e5e5;
          white-space: pre-line;
              position: relative;
          span {
            color: #333;
            padding-right: 16px;
          }
          .mediaImg{
             width: 160px;
             height: 90px;
             border: 1px solid #e5e5e5;
             margin-right: 16px;
             img{
               width: 100%;
               height: 100%;
             }
          }
          .mediaContent{
              width: 357px;
              .mediaTitie{
                width:100%;
                height: 52px;
                line-height: 26px;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
                overflow: hidden;
                //下面注释不要删除 否则 -webkit-box-orient: vertical;默认编译的时候，会过滤 
                 /* autoprefixer: off */
                -webkit-box-orient: vertical;
                /* autoprefixer: on */
              }
              
          }
          .mediaTime{
                // width: 80px;
                // margin: 0 38px 0 30px;
                position: absolute;
                bottom: 20px;right: 0px;
                font-size: 14px;
                color: #A5A4A4;
              }
        }
        li:last-child{
          border: none;
        }
        li.greyText{
          cursor: initial;
          color: #999;
        }
        li:hover{
          color: #F31B23;
        }
        li.greyText:hover{
          color: #999;
        }
      }
      .img-list {
        padding-left: 11px;
        width: 242px;
        a {
          display: inline-block;
          float: left;
        }
        img {
          height: 35px;
          width: 92px;
          margin: 0 20px 34px 0;
        }
      }
      .line {
        height: 160px;
        width: 2px;
        background: #ccc;
      }
    }
    .notice {
      width: 590px;
      background: #fff;
      padding-right: 30px;
      ul {
        padding-top: 3px;
        li {
          cursor: pointer;
          font-size: 14px;
          border-bottom:1px dashed #e5e5e5;
           line-height: 62px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 16px;
            color: #333333;
            position: relative;
            padding-right: 200px;
          em {
            width: 93px;
            position: absolute;
            right: 0;
            line-height: 62px;
            text-align: right;
            font-size: 14px;
            color: #A5A4A4;
          }
        }
        li:last-child{
          border: none;
        }
        li:hover {
          color: #F31B23;
        }
      }
    }
  }
  .nows-line {
    width: 100%;
    height: 1px;
    background: #ccc;
  }
  .partner {
    // padding-top: 30px;
    padding-bottom: 10px;
    position: relative;
    background: #fff;
    font-family: PingFangSC-Medium;
    .red_line{
        position: absolute;
        left: 30px;
        top: 33px;  
    }
    .el-tabs{
      padding-top: 30px;
    }
    .line {
      position: absolute;
      top: 9px;
      left: 115px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }
    .title {
      padding: 36px 0 15px 0;
      line-height: 28px;
    }
    .content {
      padding-left: 30px;
      padding-right: 36px;
      a {
        display: inline-block;
        margin: 0 45px 37px 0;
      }
      a:nth-child(6) {
        margin-right: 0;
      }
      a:nth-child(12) {
        margin-right: 0;
      }
    }
    .honors {
      padding-bottom: 30px;
      .honor {
        width: 25%;
        float: left;
        img {
          display: block;
          width: 274px;
          height: 136px;
          margin: 0 auto;
        }
        p {
          text-align: center;
          padding-top: 8px;
          font-size: 13px;
          line-height: 20px;
          color: #999;
        }
        .p1 {
          padding-top: 16px;
        }
      }
    }
  }

}
</style>

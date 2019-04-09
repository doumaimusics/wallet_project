import { MessageBox } from 'mint-ui';
import wxShare from '../../../../../../../common/wx/wxShare';

module.exports = {
	mixins:[wxShare],
	data(){
		return{
            showTimer:null,
            toNewSea:true,
            toNewTimer:null,
            randomNum:0,//随机数
			boatOffsetTop:0,//当前小船距顶部的高度
			seaTerminus:[0,5000,15000,30000,48000],//每个海域的终点
            showCloud:false,//控制云层显示
            showUnlock:true,//控制蒙层
            showShare:false,
            showShareLayer:false,
            openLockImg:false,
            showBoat:[true,false,false,false],

            //treasure2
            showBiologyTip:false,
            distance:0,//滑动距离
            quantType:1,//船桨类型
		}
	}, 
    props:['userData','pageHeight','avatarPicPath','tipTextList','seaData','showQuantTips'],
	methods:{
        disposeBiology(distance,type){//展示生物弹框
            this.showBiologyTip = true;
            if(this.seaData.seaLife == 7){
                distance++;
            }else if(this.seaData.seaLife == 8){
                distance --;
            }else if(this.seaData.seaLife == 9){
                distance += 2;
            }else if(this.seaData.seaLife == 10 && type == 2){
                distance -= 2;
            }
            this.distance = distance;
            this.quantType = type;
            
            
        },
        closePopout(showBiology){//关闭生物弹框
            this.showBiologyTip = showBiology;
            if(this.seaData.seaLife == 10 && this.quantType == 1){
                //如果在起点
                if(this.userData.sailSum == this.seaTerminus[this.userData.currentSea - 1]){
                    return;
                }else{
                    this.userData.sailSum -= 100;
                    this.getBoatLocation(this.boatLeft); //倒退100米
                }

            }else{
                this.boatAdvance(this.distance);
            }
        },
        inNewSea(){//前往新海域
            clearTimeout(this.toNewTimer);
            if(this.toNewSea){

            }else{
                return;
            }
            this.openLockImg = true;
            setTimeout(()=>{
                this.showCloud = true;
                
            },1000)
            this.toNewTimer = setTimeout(()=>{
                this.showUnlock = false;
                if(this.userData.sailSum == 48000){
                    return;
                }else{
                    this.userData.currentSea = this.userData.currentSea + 1;
                }

            },4200)
        },
        unlockSea(){//云彩下来
            var timer = null;
            for(var i=0;i<3;i++){
                this.$set(this.showQuantTips,i,false);
            }
            timer = setInterval(()=>{
                this.$refs.unlock.style.top = this.$refs.unlock.offsetTop + 10 + 'px';
                if(this.$refs.unlock.offsetTop >= 0){
                    this.$refs.unlock.style.top = 0+'px'
                    clearInterval(timer);
                }
            },10)
        },
		deblocking(){//开锁
            if(this.userData.sailSum >= 48000){
                return;
            }
            this.getAppData('/sailSea/openLock',(data)=>{
                if(data.resData){
                    this.unlockSea();
                    this.userData.sailSum = data.resData.sailUser.sailSum;
                }
            },{})
        },
		judge(timer,distance,type){//判断当前位置与滚动目标
            clearInterval(timer);
            /*this.navigation(distance);
            this.userData.sailSum += 100;
            this.setShareData();*/


            for(var i=0;i<type;i++){
                if (this.userData.sailSum == this.seaTerminus[this.userData.currentSea]) {
                    return;
                }

                setTimeout(() => {
                    this.navigation(distance);
                    this.userData.sailSum += 100;

                }, 2100*i)
            }
            
            return;
		},
		boatAdvance(type){ //设置页面初始位置(type 航行距离)
            if (this.userData.sailSum == this.seaTerminus[this.userData.currentSea]) { //到达海域终点不操作
                console.log('6666')
                return;
            }

            var activeScrollY = window.scrollY - 1; //处理首尾专用
            if (this.userData.sailSum == this.seaTerminus[this.userData.currentSea - 1]) { //获取目标位置
                // this.boatOffsetTop = this.$refs.seaBox.clientHeight - this.$refs.go.clientHeight  - this.pageHeight/2;
                this.boatOffsetTop = this.$refs.seaBox.clientHeight - this.pageHeight + 100;
            } else {
                this.boatOffsetTop = this.$refs['islet' + (this.userData.sailSum / 100)][0].offsetTop - this.pageHeight / 2;
            }
            console.log(window.scrollY +'===='+ this.boatOffsetTop);
            if (window.scrollY < (this.boatOffsetTop)) {
                var timer1 = setInterval(() => {
                    if (window.scrollY >= (this.boatOffsetTop)) {
                        this.judge(timer1, this.boatLeft, type); //判断当前位置与滚动目标
                    }
                    activeScrollY = window.scrollY;

                    document.body.scrollTop += 20;
                    document.documentElement.scrollTop += 20;
                }, 5)
            } else {
                var timer2 = setInterval(() => {
                    if (window.scrollY <= (this.boatOffsetTop)) {
                        this.judge(timer2, this.boatLeft, type); //判断当前位置与滚动目标
                    }
                    activeScrollY = window.scrollY;

                    document.body.scrollTop -= 20;
                    document.documentElement.scrollTop -= 20;
                }, 5)
            }
        },
        getBoatLocation(distance){//设置小船初始地方
            if (this.userData.sailSum == this.seaTerminus[this.userData.currentSea - 1]) {
                this.$refs.boat.style.top = this.$refs.seaBox.clientHeight - this.$refs.go.clientHeight + 'px';
                this.$refs.boat.style.left = '1.6rem';
            } else {
                var boatTop = this.$refs['islet' + (this.userData.sailSum / 100)][0].offsetTop;
                this.$refs.boat.style.top = boatTop + this.isLetSize.height / 2 + 'px';
                this.setBoatImg(); //重置小船图片
                if (((this.userData.sailSum) / 100) % 2 == 0) {
                    this.$refs.boat.style.left = distance[0];
                    this.$set(this.showBoat, 1, true);
                } else {
                    this.$set(this.showBoat, 3, true);
                    if ((this.userData.sailSum / 100) % 6 == 5) {
                        this.$refs.boat.style.left = distance[1];
                    } else {
                        this.$refs.boat.style.left = distance[2];
                    }
                }
                if (this.userData.sailSum == this.seaTerminus[this.userData.currentSea]) {
                    this.$refs.boat.style.left = '3.99rem';
                }
            }
        },
        setBoatImg(){
            for(var i =0;i<4;i++){
                this.$set(this.showBoat,i,false);
            }
        },
        rowing(type){//使用船桨划船 type 1 = 普通 2 = 高级
            this.quantType = type;
            var distance = type;//将要滑动的距离
            this.distance = distance;
            if(this.seaData.seaLife >0){
                this.disposeBiology(distance,type);
            }else{
                this.boatAdvance(distance);//页面定位的出发点
            }
        },
        navigation(distance){//船滑行(三个不同的位置)
            this.showShare = false;

        	var refName = 'islet' + ((this.userData.sailSum+100)/100);
            if((this.userData.sailSum) >= this.seaTerminus[this.userData.currentSea]){
                return;
            }

            //判断是否到达海域终点
            setTimeout(() => {
                if (this.userData.sailSum >= this.seaTerminus[this.userData.currentSea]) {
                    document.body.scrollTop = 0;
                    document.documentElement.scrollTop = 0;
                    this.showLayer.findBoss = true;
                    this.$refs.boat.style.left = '3.99rem';
                }
            }, 2200)

            this.setBoatImg();
            if((this.userData.sailSum + 100) == this.seaTerminus[this.userData.currentSea]){
                this.$set(this.showBoat,1,true);
                $('#chuan').animate({top: this.$refs['islet'+((this.userData.sailSum+100)/100)][0].offsetTop + this.isLetSize.height/2, left: '3.99rem'}, 2000);
                return;
            }
            if((this.userData.sailSum/100+1)%2 == 0){
                this.$set(this.showBoat,1,true);
                $('#chuan').animate({top: this.$refs['islet'+((this.userData.sailSum+100)/100)][0].offsetTop + this.isLetSize.height/2, left: distance[0]}, 2000);
            }else{
                this.$set(this.showBoat,3,true);
                if((this.userData.sailSum/100+1)%6 == 5){
                    $('#chuan').animate({top: this.$refs['islet'+((this.userData.sailSum+100)/100)][0].offsetTop + this.isLetSize.height/2, left: distance[1]}, 2000);
                }else{
                    $('#chuan').animate({top: this.$refs['islet'+((this.userData.sailSum+100)/100)][0].offsetTop + this.isLetSize.height/2, left: distance[2]}, 2000);
                }
            }
            
        },
	},
    cround(){
        
    },
	mounted(){
        var height = document.documentElement.clientHeight; //获取设备的宽度
        this.$refs.unlock.style.minHeight = height + 'px';
        this.$refs.unlock.style.top = -height + 'px';

	}
}

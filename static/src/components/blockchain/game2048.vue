<template>
    <div id="app">
        <div v-title>我的游戏</div>
        <ul id="wrap">
            <li class='box' 
                v-for="(num, index) in nums"
                v-text="num"
                v-getclass="num"
                v-getclassStr="num"
                v-getposition="index"
                v-getpositionStr="index"
                :key="index">
            </li>
        </ul>
        <transition name="fade">
            <div class="mask" v-show='show' @click='show=false'>
                <div>{{msg}}
                    <p>得分：{{totalScore}}分</p>
                </div>
            </div>
        </transition>
        <button @click="reset">重置</button>
    </div>    
</template>

<script>
export default {
    data () {
        window.vmthis = this;
        return {
            totalScore:0,    // 总得分
            show:false,
            msg:'',
            pass:false,
            start : {},  //记录移动端触摸起始点
            nums : []   //记录16个框格的数字
        }
    },
    directives:{
        getclassStr: {
            bind: function (el, vm) {
                let classes = el.classList;
                [].forEach.call(classes,_=>{
                    /^s\w+$/.test(_) && classes.remove(_);
                });
                classes.remove('empty');
                vm.value ? classes.add('s' + vm.value)
                    : classes.add('empty');
            }
        },
        getpositionStr: {
            bind: function (el,vm,index) {
                let pos = window.vmthis.getIndexPos(vm.value,true);
                el.style.left = pos.left;
                el.style.top = pos.top;
            }
        },
        getclass: {
            update: function (el, vm) {
                let classes = el.classList;
                [].forEach.call(classes,_=>{
                    /^s\w+$/.test(_) && classes.remove(_);
                });
                classes.remove('empty');
                vm.value ? classes.add('s' + vm.value)
                    : classes.add('empty');
            }
        },
        getposition: {
            update: function (el,vm,index) {
                let pos = window.vmthis.getIndexPos(vm.value,true);
                el.style.left = pos.left;
                el.style.top = pos.top;
            }
        }
    },
    methods:{
        /*获取指定索引位置的css:top，left百分比值*/
        getIndexPos(index,percent){
            let p = percent ? '%' : '';
            return {
                left: index%4*25 + p,
                top: Math.floor(index/4)*25 + p
            }
        },
        /*在一个随机的空白位添加2或4 概率9:1*/
        randomAdd(){
            let arr = this.shuffle(this.blankIndex()),
                pos = this.getIndexPos(arr.pop());
            //延时100毫秒添加
            setTimeout(_=>{
                  this.nums.splice(arr.pop(),1,Math.random()>0.9 ? 4 : 2)
                  localStorage['save1'] = JSON.stringify(this.nums);
            },100);
            
        },
        /*添加一个新的方块，并指定索引和里面的内容*/
        newBoxApear(index,num,combin){
            let cls = num ? 's' + num : 'empty',
                cb = combin ? ' combin' : '',
                box = document.createElement('div'),
                pos = this.getIndexPos(index,true);
            box.className = cls + ' box' + cb;
            box.style.left = pos.left;
            box.style.top = pos.top;
            box.innerText = num || '';
            document.getElementById('wrap').appendChild(box);
            return box;
        },
        /*获取当前空白隔索引组成的数组*/
        blankIndex(){
            let arr = [];
            this.nums.forEach((i,j)=>{
                i==='' && arr.push(j);
            });
            return arr;
        },
        /*打乱数组*/
        shuffle(arr){
            let l = arr.length,j;
            while(l--){
                j = parseInt(Math.random()*l);
                [arr[l],arr[j]] = [arr[j],arr[l]]
            }
            return arr;
        },
        /*把数组arr当成矩阵，转置n次*/
        /*
            [1,2,   1次转置变为     [3,1,
            3,4]                     4,2]  
        */
        T(arr,n){
            n=n%4;
            if(n===0)return arr;
            let l = arr.length,d = Math.sqrt(l),tmp = [];
            for(let i=0;i<d;i+=1)
                for(let j=0;j<d;j+=1)
                    tmp[d-i-1+j*d] = arr[i*d+j];
            if(n>1)tmp=this.T(tmp,n-1);
            return tmp;
        },
        touchStart(e){
            this.start['x'] = e.changedTouches[0].pageX;
            this.start['y'] = e.changedTouches[0].pageY;
        },
        touchEnd(e){
            let curPoint = e.changedTouches[0],
                x = curPoint.pageX - this.start.x,
                y = curPoint.pageY - this.start.y,
                xx = Math.abs(x),
                yy = Math.abs(y),
                i = 0;
            //移动范围太小 不处理
            if(xx < 50 && yy < 50)return;    
            if( xx >= yy){ //横向滑动
                i = x < 0 ? 0 : 2;
            }else{//纵向滑动
                i = y < 0 ? 3 : 1;
            }
            this.handle(i);
            this.totalScore = this.maxArr(this.nums)
            console.log(this.totalScore)
        },
        stopScrolling(e){  // 组织iOS设备阻尼效果
            e.preventDefault();
        },
        /*
        *方向键 事件处理
        *把上、右、下方向通过旋转 变成左向操作
        */
        keyDown(e){
            //左上右下 分别转置0 3 2 1 次
            const map = {
                37: 0, //LEFT
                38: 3, //UP
                39: 2, //RIGHT
                40: 1, //DOWN
                87: 3, // W
                68: 2, // D
                83: 1, // S
                65: 0  // A
            };
            if(!(e.keyCode in map))return;
            this.handle(map[e.keyCode]);
        },
        handle(i){
            this.move(i);
            // this.save();
            this.isPass();//判断是否过关
        },
        /*移动滑块 i:转置次数 */
        move(i){
            let indexs = this.T(Object.keys(String(Array(17))),i),//记录旋转前的各个位置索引
                tmp = this.T(this.nums,i),//把任意方向键转置，当成向左移动
                hasMove = false, //一次操作有移动方块时才添加方块
                /*
                *记录已经合并过一次的位置 避免重复合并
                *如 2 2 4 4 在一次合并后应为 4 8 0 0  而非8 4 0 0 
                */
                hasCombin = {};
            tmp.forEach((j,k)=>{
                let newIndex = 0,  //方块挪动后的索引 （转换后的索引）
                    index = indexs[k]-0, //换算到转换前的索引
                    thisMoved = false, //此方块有数字，且被移动了 标记  需要应用动画
                    combinNum = 0; //方块若有合并，记录合并后的数字
                while(k%4 && j!==''){
                    if(tmp[k-1] === ''){ //当前位置的前一位置为空,交换俩位置
                        tmp[k-1] = j;
                        tmp[k] = '';
                        hasMove = true;
                        thisMoved = true;
                        if(hasCombin[k]){//该位置有过合并，挪动后要记录到挪动后的位置
                            hasCombin[k-1] = true;
                            hasCombin[k] = false;
                        }
                        newIndex = k-1;
                    }else if(tmp[k-1] === j && !hasCombin[k] && !hasCombin[k-1]){
                        //当前位置与前一位置数字相同，合并到前一位置，然后清空当前位置
                        j *= 2;
                        tmp[k-1] = j;
                        tmp[k] = '';
                        hasMove = true;
                        thisMoved = true;
                        combinNum = j;
                        hasCombin[k-1] = true;  //记录合并位置
                        newIndex = k-1;
                    }else{
                        break;
                    }
                    k--;
                } 
                thisMoved && this.moveNode(index,indexs[newIndex],combinNum);
            });
            setTimeout(_=>{
                this.nums = this.T(tmp,4-i);//转置回去，把数据还给this.nums
                hasMove ? this.randomAdd() : '';
            },101);
        },
        //索引index的元素移动到nextIndex
        moveNode(index,nextIndex,combinNum){
            let allBox = document.querySelectorAll('.box'),
                curEle = allBox[index],//将被移动的元素
                clone = curEle.cloneNode(true),//当前元素克隆 包括里面的数组 用作移动动画
                pEle = curEle.parentNode,
                curPos = this.getIndexPos(index,true),
                box = allBox[allBox.length-1].cloneNode();//复制最后一个元素做当前元素的遮罩
            box.className = 'box empty';
            box.style.left = curPos.left;
            box.style.top = curPos.top;
            pEle.insertAdjacentElement('beforeEnd',box);
            curEle.style.opacity = 0;
            let nextEle = null;
            if(combinNum){
                nextEle = this.newBoxApear(nextIndex,combinNum,true);
            }
            let nextPos = this.getIndexPos(nextIndex);
            clone.style.left === nextPos.left + '%' ? clone.classList.add('y' + nextPos.top)
                                                      : clone.classList.add('x' + nextPos.left);
            pEle.insertAdjacentElement('beforeEnd',clone);
            // 移动动画结束
            clone.addEventListener("animationend", _=>{
                clone.remove();
                nextEle && nextEle.remove();
                box.remove();
                curEle.style.opacity = 1;
            });
        },
        save(){
           localStorage['save1'] = JSON.stringify(this.nums); 
        },
        //重置游戏
        reset(){
            //[].fill兼容性还是太低
            //this.nums = Array(16).fill('');
            this.nums = Array(16).join('-').split('-');
            let i =0;
            while(i++<2){ //随机添加2个
               this.randomAdd(); 
            } 
            this.show = false;
        },
        isPass(){
            let isOver=true,hasBlank=false,tmp = this.T(this.nums,1);
            this.nums.forEach((i,j)=>{
                if(!i || this.nums[j-4] == i || this.nums[j+4] == i || tmp[j-4] == tmp[j] || tmp[j+4] == tmp[j]){
                    isOver = false;
                }
                if(i==2048 && !this.pass){
                    this.msg = "2048";
                    this.show = true;           
                    //确保只提示一次 达到2048仍可以继续玩
                    this.pass = true;
                }
            });
            if(isOver){     // 游戏结束
                this.msg = "Game Over";
                this.show = true;
            }
        },
        maxArr(arr){
            var max = arr[0];
            var len = arr.length;
            for (var i = 1; i < len; i++){
                if (arr[i] > max) {
                    max = arr[i];
                }
            }
            return max;
        }
    },
    mounted: function() {

        document.addEventListener('keyup', this.keyDown);
        document.addEventListener( 'touchstart' , this.stopScrolling , false );    
        document.addEventListener( 'touchmove' , this.stopScrolling , false );    

        document.querySelector('#app ul').addEventListener('touchstart', this.touchStart);
        document.querySelector('#app ul').addEventListener('touchend', this.touchEnd);
        //document上获取touchmove事件 如果是由.box触发的 则禁止屏幕滚动
        document.addEventListener('touchmove', e=>{
            e.target.classList.contains('box') && e.preventDefault();
        });
        localStorage['save1'] ? this.nums = JSON.parse(localStorage['save1'])
                              : this.reset();
    }
}
</script>

<style scoped>
    @keyframes fade {
        to {transform: scale(1);opacity:1;border-radius:0}
    }
    @keyframes bluePulse{
        from {
            background-color: #007d9a;
            box-shadow: 0 0 9px #333;
        }

        50% {
            background-color: #2daebf;
            box-shadow: 0 0 18px #2daebf;
        }

        to {
            background-color: #007d9a;
            box-shadow: 0 0 9px #333;
        }
    }

    @keyframes x0{to{left:0;}}
    .x0{animation:x0 .2s ease  forwards}
    @keyframes x25{to{left:25%;}}
    .x25{animation:x25 .2s ease  forwards}
    @keyframes x50{to{left:50%;}}
    .x50{animation:x50 .2s ease  forwards}
    @keyframes x75{to{left:75%;}}
    .x75{animation:x75 .2s ease  forwards}

    @keyframes y0{to{top:0;}}
    .y0{animation:y0 .2s ease  forwards}
    @keyframes y25{to{top:25%;}}
    .y25{animation:y25 .2s ease  forwards}
    @keyframes y50{to{top:50%;}}
    .y50{animation:y50 .2s ease  forwards}
    @keyframes y75{to{top:75%;}}
    .y75{animation:y75 .2s ease  forwards}


    #app{
        width:100%;
        position:relative;
        font-family: 'Inknut Antiqua','Clear Sans', 'Helvetica Neue', Arial, sans-serif;
    }
    #app ul{
        list-style:none;
        display:inline-block;
        margin:0;
        padding:0;
        position:relative;
        height:0;
        padding-top:100%;
        width:100%;
        overflow: hidden;
    }
    .mask{
        position:absolute;
        top:0;
        left:0;
        width:100%;
        padding-bottom:100%;
        background:rgba(0,0,0,0.48);
        /* opacity:0; */
    }
    .mask div{
        cursor:pointer;
        width:100%;
        height:100%;
        position:absolute;
        font-size:3.5em;
        font-weight:bold;
        color:#ddd;
        display:flex;
        flex-direction: column;
        justify-content:center;
        align-items:center;
        text-shadow: 2px 2px 10px #555;
    }
    .mask div p{
        display: flex;
        font-size: 34px;
        justify-content: center;
        font-size: 34px;
    }
    #app button{
        width:100px;
        height:50px;
        line-height:50px;
        font-size:20px;
        display:block;
        cursor:pointer;
        margin:20px auto;
        background-color: #2daebf;
        border-color: #238896;
        color: white;
        box-shadow: 0 -2px 0 rgba(0,0,0,0.2) inset;
        border-radius: 4px;
        transition: background-color 300ms ease-out;
        animation:bluePulse 2s 4s infinite;
    }
    .box{
        width:25%;
        height:25%;
        line-height:200%;
        text-align:center;
        position:absolute;
        font-size:2.8em;
        cursor:pointer;
        background: hsla(30,37%,89%,.35);
        border: 1px solid #ccc;
        box-shadow: 1px 1px 4px;
        box-sizing: border-box;
        -webkit-user-select: none;
        display: flex;
        justify-content: center;
        align-items: center;
        /*animation:appear .5s ease-in;
        transition:background .3s,color .3s .3s;*/
    }
    .empty{
        background:#f0f0f0;
        box-shadow: inset 1px 1px 3px  #929292;
    }
    .combin{
        z-index:1;
        opacity:0;
        transform: scale(0.1);
        border-radius:50%;
        animation:fade 200ms ease;
    }

    .s2{
        background: #f8f3e8;
        box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0), inset 0 0 0 1px rgba(255, 255, 255, 0); 
    }
    .s4{
        background: #ede0c8;
        box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0), inset 0 0 0 1px rgba(255, 255, 255, 0); 
    }
    .s8{
        color: #f9f6f2;
        background: #f2b179; 
    }
    .s16{
        color: #f9f6f2;
        background: #f59563; 
    }
    .s32{
        color: #f9f6f2;
        background: #f67c5f;
    }
    .s64{
        color: #f9f6f2;
        background: #f65e3b; 
    }
    .s128{
        color: #f9f6f2;
        background: #edcf72;
        box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.2381), inset 0 0 0 1px rgba(255, 255, 255, 0.14286);
    }
    .s256{
        color: #f9f6f2;
        background: #edcc61;
        box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.31746), inset 0 0 0 1px rgba(255, 255, 255, 0.19048);
    }
    .s512{
        color: #f9f6f2;
        background: #edc850;
        box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.39683), inset 0 0 0 1px rgba(255, 255, 255, 0.2381);
    }
    .s1024{
        color: #f9f6f2;
        background: #edc53f;
        font-size:2em;
        box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.47619), inset 0 0 0 1px rgba(255, 255, 255, 0.28571);
    }
    .s2048{
        color: #f9f6f2;
        background: #edc22e;
        font-size:2em;
        box-shadow: 0 0 30px 10px rgba(243, 215, 116, 0.55556), inset 0 0 0 1px rgba(255, 255, 255, 0.33333);
    }
    .s4096{
        color: #f9f6f2;
        background: #61c0ed;
        font-size:2em;
        box-shadow: 0 0 30px 10px hsla(211, 84%, 70%, 0.45),inset 0 0 0 1px hsla(0,0%,100%,.33333);
    
    }
    .fade-enter-active, .fade-leave-active {
        transition: all .5s ease;  
        transform:scale(1) rotate(360deg);
        border-radius:0;
        opacity:1;
    }
    .fade-enter, .fade-leave-to {
        transform:scale(0) rotate(-360deg);
        border-radius:50%;
        opacity:0;
    }

    @media all and (orientation : landscape){
        #app{
            width:30%;
            margin-top:5%;
        }
    }
</style>
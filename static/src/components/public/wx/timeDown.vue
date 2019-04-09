<template>
      <span>{{time}}</span>
</template>

<script>
   export default{
       data () {
           return {
               time : '',
               residue:0,
               flag : false,
               n:0
           }

       },
       mounted () {
            this.timeDown();
           let time = setInterval(()=>{
               if(this.flag == true){
                   clearInterval(time)
               }
               this.timeDown()
           },1000)
       },
       props : ['endTime','shartTime','lastTime'],
       methods : {
           timeDown () {
               let leftTime = this.lastTime.timeToStart;
               let d = parseInt(leftTime/(24*60*60))
               let h = this.formate(parseInt(leftTime/(60*60)%24))
               let m = this.formate(parseInt(leftTime/60%60))
               let s = this.formate(parseInt(leftTime%60))
               if(leftTime <= 0){
                   this.flag = true
                   this.$emit('timeEnd',1);
               }
               this.time = `${d}天${h}小时${m}分${s}秒`
               this.lastTime.timeToStart -=1
           },
           formate (time) {
               if(time>=10){
                   return time
               }else{
                   return `0${time}`
               }
           }
       }
   }
</script>
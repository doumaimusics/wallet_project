<template>
    <div @mousedown="clickThis" ref="suspension" id="suspension">
    	<img :src="imgUrl" alt="">
    </div>
</template>

<script>
    export default{
    	data(){
    		return{
    			suspension: null,
    		}
    	},
    	props:[
    		'imgUrl',//图片地址
    		'pageUrl',//链接地址
    		'jumpType',//跳转类型 1.<a>2.<router-link>
    	],
    	methods:{
    		clickThis(e){
    			this.suspension = this.$refs.suspension;

    			let ev = e || window.event; //兼容ie浏览器  
    			let diffX = ev.clientX - this.suspension.offsetLeft; 
    			let diffY = ev.clientY - this.suspension.offsetTop;

    			console.log(diffY)

    			document.onmousemove = function(e){
    				let event = e || window.event; //兼容ie浏览器  
		            let left=e.clientX-diffX;  
		            let top=e.clientY-diffY;  
		            console.log(left);
    			}
    		}
    	},
    	created(){
    		
    	},
    	mounted(){

    	}
    }
</script>

<style lang="scss" scoped>
    #suspension{
    	height: 1.6rem;
    	width: 1.466667rem;
    	position: fixed;
    	top:11rem;
    	left:8rem;
    	img{
    		height: 100%;width: 100%;
    	}
    }
</style>
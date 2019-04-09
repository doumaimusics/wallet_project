<template>
    <div class="organization-div">
        <img src="https://aliyunsso.edspay.com/web/about/wxDisclosure4.png?v=1.0"/>
        <!-- 资质报告 -->
        <div class="btn1" @click="popupVisibleTow = true"></div>
        <!-- 遮罩 -->
        <mt-popup v-model="popupVisibleTow">
			<div class="aptitudeBox"></div>
		</mt-popup>
    </div>
</template>
<script>
export default {
    data() {
        return{
            popupVisibleTow:false,
        }
    }
}
</script>
<style lang="scss" scoped>
    .organization-div {
        img {
            width: 100%;
            height: 97.04rem
        }
        .btn1{
            width: 2.3rem;
            height: .533333rem;
            position: absolute;
            top:7.92rem;
            left: 5.8rem;
        }
        .aptitudeBox{
            width: 6.88rem;
            height: 9.84rem;
            background: url('https://aliyunsso.edspay.com/web/wx/activity/terraceIntroduction/certificate2.jpg?v=1.0') no-repeat;
            background-size: cover;
		}
    }
</style>


<template>
    <div id="electronicSignature">
        <div v-title>电子签章</div>

    </div>
</template>

<script>
    import wxToapp from '../../../../common/wx/wxToapp'
    export default {
        mixins: [wxToapp],
        data() {
            return {

            }
        },
        methods: {

        },
        created: function() {
            this.PassValue('NavWhite_电子签章');
        },
        mounted: function() {

        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #electronicSignature{
        width: 10rem;
        height: 29.32rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/filing/electronicSignature.png);
        background-size: 100%;
    }
</style>

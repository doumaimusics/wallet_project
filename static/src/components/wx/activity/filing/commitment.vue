<template>
    <div id="commitment">
       <div v-title>合规经营承诺函</div>

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
            this.PassValue('NavWhite_合规经营承诺函');
        },
        mounted: function() {

        },
        components: {

        }
   }
</script>

<style lang="scss" scoped>
    #commitment{
        width: 10rem;
        height: 28.48rem;
        background: url(https://aliyunsso.edspay.com/web/wx/activity/filing/commitmentBg.png?v=1.0)no-repeat;
        background-size: 100%;
    }
</style>

<template>
    <router-link :to="{path:'/wxAnnouncement',query:{id:list.id,nid:'news'}}">
        <div class="media-item bdr-b" :class="{'last-li':lastLi}">
            <div class="media-left">
                <h1>{{list.title}}</h1>
                <p class="media-time">{{list.startTime}}</p>
            </div>
            <div class="media-right">
                <img :src="list.picPath ? list.picPath:'https://aliyunsso.edspay.com/web/wxUpdate/meitimoren.png'"/>
            </div>
        </div>
    </router-link>
</template>
<script>
export default {
        data() {
            return{}
        },
        props: {
            list: Object,
            url: String,
            lastLi: Boolean,
        },
        created () {
            console.log(this.lastLi)
        },
        methods : {
        }
}
</script>
<style lang="scss" scoped>
    .last-li {
        border-bottom: none !important;
    }
    .media-item {
        height: 2.293333rem;
        margin: 0rem .533333rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        position: relative;
        .media-left {
            display: flex;
            flex-direction: column;
            h1 {
                font-size: .373333rem;
                color: #333333;
                width: 6.026667rem;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            .media-time {
                font-size: .32rem;
                color: #808080;
                margin-top: .146667rem;
            }
        }
        .media-right {
            img {
                width: 2.666667rem;
                height: 1.493333rem;
            }
        }
    }
</style>



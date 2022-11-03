<template>
    <List
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad">
        <ul class="newGiftList">
            <li v-for="(item,index) in list" :key="index">
                <div class="newGiftIcon"><img src="../../assets/game_icon/game_01.png" alt=""/></div>
                <div class="newGiftContent">
                    <div class="newGiftContent-name">BT-大掌门2GM科技5亿真充-{{index}}</div>
                    <div class="newGiftContent-text">版本更新礼包</div>
                </div>
                <div class="newGiftMore">
                    <svg-icon :iconName="'icon-arrow-right'"></svg-icon>
                </div>
            </li>
        </ul>
    </List>
</template>
<script setup>
import { List } from "vant";
import { reactive, ref } from "vue";
// 接收数据
// const props = defineProps({
//     list:{
//         type: Array,
//         default:[],
//     },
// })

// 最新礼包
const list = ref([1,2,3,4,5,6,7,8,9]);
const loading = ref(false);
const finished = ref(false);
const onLoad =  () => {
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            list.value.push(list.value.length + 1);
        }

        // 加载状态结束
        loading.value = false;

        // 数据全部加载完成
        if (list.value.length >= 40) {
            finished.value = true;
        }
    }, 1000);
}

</script>
<style lang="scss" scoped>
.newGiftList{
    padding:0 15px;
    li{
        padding:12px 0;
        display: flex;
        position: relative;
        .newGiftIcon{
            @include h-avatar(55px,55px,none,10px,none);
        }
        .newGiftContent{
            flex-grow: 1;
            padding:0 13px;
            &-name{
                max-width: 220px;
                @include h-fontSize(var(--new-gift-name), 14px, 20px);
            }
            &-text{
                margin-top:9px;
                @include h-fontSize(var(--new-gift-text), 12px, 15px);
            }
        }
        .newGiftMore{
            top:50%;
            right:0;
            width:10px;
            height:10px;
            color:var(--new-gift-icon-more);
            position: absolute;
            @extend %placeY;
        }
        &::after{
            content: '';
            position: absolute;
            bottom:0;
            left:60px;
            right:0;
            border-bottom:1px solid var(--new-gift-line);
        }
    }
}
</style>
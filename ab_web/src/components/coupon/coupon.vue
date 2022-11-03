<template>
    <div class="couponTisps">已使用代金券0张，累计为你节省0元</div>
    <tabs v-model:active="couponIdx" class="couponTab" offset-top="60px" @scroll="newGiftScroll" @change="tabChange" sticky >
        <tab title="待领取">
            11111-待领取
            <div style="height:1500px;"></div>
        </tab>
        <tab title="最新领取">
           <NewCoupon></NewCoupon>
        </tab>
        <tab title="即将过期">
            333-即将过期
        </tab>
    </tabs>
</template>

<script setup>
import NewCoupon from "../newCoupon/newCoupon.vue";
import { Tab, Tabs, List } from "vant";
import { nextTick, onMounted, ref } from "vue-demi";

// tab切换
const couponIdx = ref(1);

// 切换时跳转指定滚动位置
// const tabChange = (e)=>{
//     nextTick(()=>{
//         document.documentElement.scrollTop = e == 0 ? newGifTop.value : myGifTop.value;
//     })
// }
// // 监听滚动位置
// const newGiftScroll = (e)=>{
//     if(couponIdx.value == 0){
//         newGifTop.value = e.scrollTop;
//     }else{
//         myGifTop.value = e.scrollTop;
//     }
// }

</script>
<style lang="scss" scoped>
    .couponTisps{
        margin:0 -12px;
        text-align: center;
        background: var(--coupon-tisps-bg);
        @include h-fontSize(#be9c5b, 12px, 28px);
    }
</style>
<style lang="scss">
.couponTab{
    margin:0 -12px;
    min-height: 40%;
}

</style>
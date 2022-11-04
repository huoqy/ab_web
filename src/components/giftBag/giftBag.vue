<template>
    <tabs v-model:active="giftIdx" class="tableBox" offset-top="60px" @scroll="newGiftScroll" @change="tabChange" sticky >
        <tab title="最新礼包">
            <!-- <List
            v-model:loading="nweGiftLoading"
            :finished="nweGiftFinished"
            finished-text="没有更多了"
            @load="onNewGiftLoad"> -->
                <NewGift></NewGift>
            <!-- </List> -->
        </tab>
        <tab title="我的礼包">
            <!-- <List
            v-model:loading="myGiftLoading"
            :finished="myGiftFinished"
            finished-text="没有更多了"
            @load="onMyGiftLoad"> -->
                <MyGiftBag></MyGiftBag>
            <!-- </List>  -->
        </tab>
    </tabs>
</template>

<script setup>
import NewGift from "@/components/newGift/newGift.vue";
import MyGiftBag from "@/components/MyGiftBag/MyGiftBag.vue";
import { Tab, Tabs, List } from "vant";
import { nextTick, onMounted, ref } from "vue-demi";

// tab切换
const giftIdx = ref(0);

// 切换时跳转指定滚动位置
const newGifTop = ref(0);
const myGifTop = ref(0);
const tabChange = (e)=>{
    nextTick(()=>{
        document.documentElement.scrollTop = e == 0 ? newGifTop.value : myGifTop.value;
    })
}

// 监听滚动位置
const newGiftScroll = (e)=>{
    if(giftIdx.value == 0){
        newGifTop.value = e.scrollTop;
    }else{
        myGifTop.value = e.scrollTop;
    }
}


// 最新礼包
const newGiftList = ref([1,2,3,4,5,6,7,8,9]);
const nweGiftLoading = ref(false);
const nweGiftFinished = ref(false);
const onNewGiftLoad =  () => {
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            newGiftList.value.push(newGiftList.value.length + 1);
        }

        // 加载状态结束
        nweGiftLoading.value = false;

        // 数据全部加载完成
        if (newGiftList.value.length >= 40) {
            nweGiftFinished.value = true;
        }
    }, 1000);
}

// 我的礼包
const myGiftList = ref([1,2,3,4,5,6,7,8,9]);
const myGiftLoading = ref(false);
const myGiftFinished = ref(false);
const onMyGiftLoad = () => {
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            myGiftList.value.push(myGiftList.value.length + 1);
        }

        // 加载状态结束
        myGiftLoading.value = false;

        // 数据全部加载完成
        if (myGiftList.value.length >= 40) {
            myGiftFinished.value = true;
        }
    }, 1000);
}
</script>
<style lang="scss" >
.tableBox{
    min-height: 40%;
}
.van-tab__panel{
    min-height: 50vh;
}
.van-tabs__line{
    transition: transform 0.3s;
    -webkit-transition: transform 0.3s;
}
.van-swipe__track{
    transition: transform 0.2s;
    -webkit-transition: transform 0.2s;
}
</style>
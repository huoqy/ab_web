<template>
    <List
    v-model:loading="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad">
        <ul class="myGiftGameList">
            <li v-for="(item,index) in list" :key="index">
                <div class="myGiftGame">
                    <div class="myGiftGame-icon"><img src="../../assets/game_icon/game_02.png" alt=""/></div>
                    <div class="myGiftGame-content">
                        <div class="myGiftGame-content-name">《三国志吕布传》新手礼包-{{index}}</div>
                        <div class="myGiftGame-content-text">
                            <p>兑换日期至2024.07.01 00:00</p>
                            <p>孙子兵法*1，神农本草经*1，恢复用豆*10</p>
                        </div>
                    </div>
                </div>
                <div class="myGiftGameCode">
                    激活码：
                    <span>ae87eb1a</span>
                    <p>复制</p>
                </div>
            </li>
        </ul>
    </List> 
</template>
<script setup>
import { List } from "vant";
import { reactive, ref } from "vue";
const list = ref([1,2,3,4,5,6,7,8,9]);
const loading = ref(false);
const finished = ref(false);
const onLoad = () => {
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
.myGiftGameList{
    padding:15px 0;
    li{
        padding:10px;
        margin-bottom:15px;
        border-radius: 8px;
        box-shadow: 0 0.02778rem 0.13889rem 0.02778rem rgba(0,0,0,0.06);
        .myGiftGame{
            display: flex;
            &-icon{
                width:55px;
                @include h-avatar(55px,55px,none,10px,none);
            }
            &-content{
                max-width: 250px;
                flex-grow: 1;
                padding-left:10px;
                &-name{
                    @include h-fontSize(var(--new-gift-name), 14px, 20px);
                }
                &-text{
                    margin-top:6px;
                    @include h-fontSize(var(--new-gift-text), 12px, 16px);
                }
            }
        }
        .myGiftGameCode{
            margin-top:12px;
            padding:0 50px 0 5px;
            position: relative;
            display: flex;
            border-radius: 3px;
            border:1px dashed var(--my-gift-border-dashed);
            @include h-fontSize(var(--new-gift-text), 12px, 26px);
            span{
                max-width: 200px;
                height: 26px;
                overflow: auto;
                white-space: nowrap;
                -webkit-overflow-scrolling: touch;
            }
            p{
                top:0;
                right:0;
                width: 50px;
                text-align: center;
                position: absolute;
                @include h-fontSize(var(--my-gift-bag-copy), 12px, 26px);
            }
        }
    }
}
</style>
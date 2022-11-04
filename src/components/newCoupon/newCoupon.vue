<template>
  <ul class="newCoupon">
    <li v-for="(item,index) in list" key="index">
        <div class="newCoupon-left">
            <div class="newCoupon-left-price">￥<b>6</b></div>
            <div class="newCoupon-left-needs">满30元可用</div>
        </div>
        <div class="newCoupon-right">
            <div class="newCoupon-right-name">真红之刃 满30减6</div>
            <div class="newCoupon-right-expiryDate">有效期至 2023.01.18 23:59</div>
            <div class="newCoupon-right-explain">
                <p>指定游戏可用</p>
                <span>代金券有效期至：2023年1月18日23:59，活动期间内每个玩家每个账号每档仅限领取1次</span>
            </div>
        </div>
    </li>
  </ul>
</template>

<script setup>
import { ref } from "vue-demi";

const list = ref([0,1,2,3,4,5,6,7,8,9])
</script>

<style lang="scss">
    .newCoupon{
        padding:18px 12px;
        li{
            display: flex;
            margin-bottom:20px;
            padding:16px 21px 16px 0;
            border-radius: 8px;
            flex:82px auto;
            background: var(--header-bar);
            .newCoupon-left{
                flex:82px 0 0;
                width:82px;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                border-right: 1px solid var(--my-gift-border-dashed);
                @include h-fontSize(#f6593a, 12px, 16px);
                &-price{
                    font-size:18px;
                    line-height:36px;
                    b{
                        font-size:34px;
                        font-weight: normal;
                    }
                }
                .price-size-4{
                    font-size:18px;
                    b{
                        font-size:24px;
                    }
                }
                .price-size-5{
                    font-size:18px;
                    b{
                        font-size:20px;
                    }
                }
            }
            .newCoupon-right{
                flex:1 0 0;
                padding-left:18px;
                &-name{
                    @include h-fontSize(var(--level-title-color), 16px, 24px);
                }
                &-expiryDate{
                    margin:8px 0 17px;
                    @include h-fontSize(var(--new-gift-text), 12px, 16px);
                }
                &-explain{
                    padding-top:12px;
                    border-top: 1px dashed var(--my-gift-border-dashed);
                    @include h-fontSize(var(--new-gift-text), 12px, 16px);
                    p{
                        text-decoration: underline;
                    }
                    span{
                        display: block;
                    }
                }
            }
            &:last-child{
                margin-bottom:0;
            }
        }
    }
</style>
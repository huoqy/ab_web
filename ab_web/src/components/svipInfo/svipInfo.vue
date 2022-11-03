<template>
    <div class="level">
        <div class="levelInfo">
            <div class="levelRuleBtn">等级规则</div>
        </div>
        <div class="levelList">
            <swiper
                :slides-per-view="4"
                :space-between="10"
                :centeredSlides="true"
                :modules="modules"
                @swiper="onSwiper"
                @slideChange="onSlideChange"
                navigation>
                <swiper-slide v-for="(item,index) in svipGrowUp" :key="index">
                    <div class="levelLi" :class="index == idx?'activeLevel':''">
                        <img :src="item.icon" alt="" class="levelIcon"/>
                        <div class="levelName">SVIP{{index}}</div>
                        <div class="levelText">{{item.text}}</div>
                    </div>
                </swiper-slide>
            </swiper>
        </div>
    </div>
</template>

<script setup>
import SwiperClass, { Autoplay, Pagination, Navigation, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { svipGrowUp } from "@/assets/js/level.js";
import 'swiper/css'
import 'swiper/css/navigation' // 轮播图两边的左右箭头
import { nextTick, ref } from 'vue-demi';
const modules = [Navigation];

let swiperEvent = ref(0);
const onSwiper = (swiper) => {
    swiperEvent = swiper;
};

let idx = ref(0);
const onSlideChange = (e) => {
    idx.value = e.realIndex;
};

// 切换指定位置
nextTick(()=>{
    swiperEvent.slideTo(6); 
})

</script>
<style lang="scss" scoped>
    .level {
        border-radius: 8px;
        overflow: hidden;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
        .levelInfo{
            padding:0 14px;
            min-height: 47px;
            position: relative;
            @include h-bgCover(url("@/assets/img/svip/svipBg.png"));
            .levelRuleBtn{
                width:80px;
                text-align: center;
                position: absolute;
                top:50%;
                right:0;
                @extend %placeY;
                @include h-fontSize(var(--level-rule-color), 12px,23px);
                @include h-bgCover(url("@/assets/img/svip/square.png"));
            }
        }
        .levelList{
            height: 135px;
            position: relative;
            @include h-bgCover(#232329);
            &:after{
                content: '';
                left:0;
                top:37%;
                height:3px;
                width:100%;
                z-index: 1;
                position: absolute;
                background:#363740;
            }
            .levelLi{
                transform: scale(.8);
                -webkit-transform: scale(.8);
                transition: transform 0.3s;
                -webkit-transition: transform 0.3s;
                text-align: center;
                .levelIcon{
                    width:52px;
                    margin:0 auto;
                }
                .levelName{
                    margin:4px auto 0;
                    font-weight: 700;
                    @include h-fontSize(var(--level-svip-name), 14px,20px);
                }
                .levelText{
                    margin:0 auto;
                    @include h-fontSize(var(--level-svip-text), 12px,14px);
                }
            }
            .activeLevel{
                transform: scale(1);
                -webkit-transform: scale(1);
            }
        }
        .swiper {
            height: 100%;
            position: relative;
            z-index: 5;
        }
    }
    
</style>

<style lang="scss">
    .swiper-slide {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .swiper-button-prev,
    .swiper-button-next {
        top:0;
        width:25%;
        height:100%;
        &::after{
            opacity: 0;
        }
    }
    .swiper-button-next{
        right:0;
    }
    .swiper-button-prev{
        left:0;
    }
</style>
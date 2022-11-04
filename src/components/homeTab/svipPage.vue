<template>
  <div class="svipPageBox">
    <svipInfo></svipInfo>
    <div class="bannerBox" v-if="false">
      <swiper
        :space-between="10"
        :modules="modules"
        :loop="true"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
      >
        <swiper-slide v-for="(item, index) in 2" :key="index">
          <img src="@/assets/img/svip/ticketBg_01.png" alt="" />
        </swiper-slide>
      </swiper>
    </div>
    <div class="titleName">
      <img src="@/assets/img/svip/title_left.png" alt="" />SVIP月返<em
        >月月有惊喜！</em
      >
    </div>
    <div class="cardBox">
      <div class="cardName">
        <img src="@/assets/img/svip/icon_diamond.png" alt="" />SVIP1九月福利
      </div>
      <div class="cardVoucher"><b>共1张代金券 总计 ¥2元</b></div>
      <div class="cardText">可抵扣游戏充值！</div>
      <div class="cardBtn cardActiveBtn">即将领取</div>
    </div>
    <div class="titleName">
      <img src="@/assets/img/svip/title_left.png" alt="" />SVIP福利<em
        >SVIP会员专属代金券</em
      >
    </div>
    <div class="couponBox">
      <div class="couponList">
        <ul
          :style="{
            width:
              couponList.length > 3
                ? `${couponList.length * 105 - 8}px`
                : 'auto',
          }"
        >
          <li v-for="(item, index) in couponList" :key="index">
            <div class="couponSvg">
              <div class="couponImg">
                <svg-icon iconName="icon-dengji"></svg-icon>
              </div>
            </div>
            <div class="welfareLv"><p>晋级V1后可领</p></div>
            <div class="couponTitle">等级福利</div>
            <div class="couponPrice"><b>￥2</b></div>
            <div class="couponToast"><p>满6元可用</p></div>
            <div class="couponBtn activeCouponBtn"><p>即将领取</p></div>
          </li>
        </ul>
      </div>
    </div>
    <div class="titleName">
      <img src="@/assets/img/svip/title_left.png" alt="" />悟饭游戏厅会员<em
        >畅玩模拟器、安卓大型单机</em
      >
    </div>
    <ul class="diamondsList">
      <li>
        <div class="diamondsTips">V7可领</div>
        <div class="diamondsCard monthBg">月卡</div>
        <div class="diamondsContent">
          <div class="diamondsName">悟饭游戏厅会员3个月</div>
          <div class="diamondsText">仅限V7+领取，限领一次</div>
        </div>
        <div class="diamondsBtn activeFilter">即将领取</div>
      </li>
    </ul>
  </div>
</template>
<script setup>
import svipInfo from '@/components/svipInfo/svipInfo.vue';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { reactive, ref } from 'vue-demi';
const modules = [Autoplay];
const couponList = reactive([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
</script>
<style lang="scss">
.svipPageBox {
  padding-top: 10px;
}
.bannerBox {
  margin: 12px 0 0;
}
.titleName {
  display: flex;
  align-items: center;
  margin: 20px auto 15px;
  @include h-fontSize(var(--level-title-color), 16px, 24px);
  img {
    width: 11px;
    height: 11px;
    margin-right: 5px;
  }
  em {
    margin-left: 8px;
    @include h-fontSize(var(--level-tips-color), 12px, 24px);
  }
}
.cardBox {
  border-radius: 10px;
  min-height: 137px;
  padding: 14px;
  position: relative;
  background-image: var(--card-bg-color);
  &::before {
    content: '';
    bottom: 10%;
    right: 5%;
    width: 80px;
    height: 90px;
    position: absolute;
    background: url('@/assets/img/svip/monthlyBg.png');
    background-size: 100% 100%;
    opacity: var(--card-img-opacity);
  }
  .cardName {
    display: flex;
    align-items: center;
    @include h-fontSize(var(--level-card-name-color), 14px, 16px);
    img {
      width: 12px;
      height: 10px;
      margin-right: 4px;
    }
  }
  .cardVoucher {
    margin: 18px 0 8px;
    @include h-fontSize(var(--level-card-name-color), 16px, 24px);
  }
  .cardText {
    margin-bottom: 15px;
    @include h-fontSize(var(--level-card-text-color), 13px, 18px);
  }
  .cardBtn {
    @include h-btn(
      120px,
      38px,
      14px,
      var(--message-color),
      38px,
      0,
      linear-gradient(90deg, #c9a16f 5%, #e7c9a9 91%),
      false,
      none
    );
  }
  .cardActiveBtn {
    color: var(--card-text-active-color);
    background: var(--card-bg-active-color);
  }
}
.couponBox {
  height: 145px;
  overflow: hidden;
  .couponList {
    padding-bottom: 40px;
    overflow: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    ul {
      display: flex;
      padding: 5px 0;
      overflow: initial;
      li {
        width: 105px;
        height: 140px;
        margin-right: 10px;
        border-radius: 8px;
        position: relative;
        overflow: initial;
        text-align: center;
        @include h-bgColor(var(--coupon-bg-color));
        .couponSvg {
          top: 0;
          right: 0;
          width: 50px;
          height: 50px;
          position: absolute;
          overflow: hidden;
          border-top-right-radius: 8px;
          .couponImg {
            width: 47px;
            height: 47px;
            top: -9px;
            right: -6px;
            display: flex;
            position: absolute;
            align-items: center;
            justify-content: center;
            padding: 3px 8px 0 0;
            background: var(--coupon-horn-bg-color);
            transform: rotate(-35deg);
            -webkit-transform: rotate(-35deg);
            svg {
              width: 18px;
              color: var(--coupon-svg-color);
            }
          }
        }
        .welfareLv {
          top: -3px;
          left: 0;
          width: 64px;
          height: 18px;
          position: absolute;
          @include h-fontSize(#f0d2a9, 12px, 18px);
          @include h-bgCover(url('@/assets/img/svip/angle_02.png'));
          background-repeat: no-repeat;
          p {
            display: block;
            transform: scale(0.7);
            transform-origin: 10% 50%;
            width: 80px;
            text-align: center;
          }
        }
        .couponTitle {
          position: relative;
          z-index: 5;
          margin-top: 25px;
          @include h-fontSize(var(--level-title-color), 12px, 16px);
        }
        .couponPrice {
          margin: 6px 0 5px;
          @include h-fontSize(var(--coupon-price-color), 20px, 30px);
        }
        .couponToast {
          @include h-fontSize(var(--coupon-toast-color), 12px, 16px);
        }
        .couponBtn {
          left: 0;
          bottom: 0;
          width: 100%;
          z-index: 5;
          font-weight: bold;
          position: absolute;
          border-radius: 0 0 8px 8px;
          @include h-fontSize(var(--coupon-btn-color), 14px, 24px);
          @include h-bgColor(#e5bf95);
          &:after {
            content: '';
            top: -8px;
            left: 50%;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            position: absolute;
            @extend %placeX;
            @include h-bgColor(#e5bf95);
          }
        }
        .activeCouponBtn {
          color: #5d5d5d;
          @include h-bgColor(var(--coupon-btn-active-color));
          &:after {
            @include h-bgColor(var(--coupon-btn-active-color));
          }
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
}
.diamondsList {
  overflow: initial;
  li {
    display: flex;
    overflow: initial;
    margin-bottom: 10px;
    position: relative;
    padding: 18px 73px 18px 16px;
    border-radius: 4px;
    @include h-bgColor(var(--diamonds-bg-color));
    .diamondsTips {
      top: -2px;
      left: 0;
      z-index: 3;
      width: 50px;
      text-align: center;
      position: absolute;
      @include h-fontSize(var(--diamonds-tips-color), 12px, 18px);
      @include h-bgCover(url('@/assets/img/svip/angle_01.png'));
    }
    .diamondsCard {
      width: 32px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      @include h-fontSize(#fff, 12px, 18px);
    }
    .monthBg {
      @include h-bgCover(url('@/assets/img/svip/month_bg.png'));
    }
    .diamondsContent {
      margin-left: 15px;
      .diamondsName {
        margin-bottom: 5px;
        @include h-fontSize(var(--level-title-color), 14px, 20px);
      }
      .diamondsText {
        @include h-fontSize(var(--coupon-toast-color), 12px, 15px);
      }
    }
    .diamondsBtn {
      top: 50%;
      right: 13px;
      z-index: 10;
      position: absolute;
      @extend %placeY;
      @include h-btn(
        66px,
        26px,
        12px,
        var(--diamonds-btn-text-color),
        4px,
        0,
        var(--diamonds-btn-bg-color),
        false,
        none
      );
    }
  }
}
</style>

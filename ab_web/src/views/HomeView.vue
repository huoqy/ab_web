
<template>
  <UserPublic>
    <ul class="tabList">
      <li
        v-for="(item, index) in tabList"
        :key="index"
        :class="index == tabIdx ? 'active' : ''"
        @click="tabCheckBtn(index)"
      >
        <span>{{ item }}</span>
      </li>
    </ul>
  </UserPublic>
  <!-- TAB-1 => SVIP福利 -->
  <Transition name="table">
    <div class="tabContent" v-if="tabIdx == 0">
      <SvipPage></SvipPage>
    </div>
  </Transition>
  <!-- TAB-2 => 礼包中心 -->
  <Transition name="table">
    <div class="tabContent" v-if="tabIdx == 1">
      <GiftBag></GiftBag>
    </div>
  </Transition>
  <!-- TAB-3 => 代金券 -->
  <Transition name="table">
    <div class="tabContent tabCoupon" v-if="tabIdx == 2">
      <Coupon></Coupon>
    </div>
  </Transition>
</template>

<script setup>
import UserPublic from "@/components/userPublic/UserPublic.vue";
import SvipPage from "@/components/homeTab/svipPage.vue";
import GiftBag from "@/components/giftBag/giftBag.vue";
import Coupon from "@/components/coupon/coupon.vue";
import { reactive, ref } from "vue";
import { userMessgeStore } from "@/stores/counter";

const userMessge = userMessgeStore();

let tabIdx = ref(2);

const isShowLogin = () => {
  userMessge.setShowLogin(true);
};

const tabList = reactive(["SVIP福利", "礼包中心", "代金券"]);

let tabCheckBtn = (i) => {
  tabIdx.value = i;
};
</script>

<style lang="scss" scoped>
.tabList {
  display: flex;
  overflow: inherit;
  width: 324px;
  @include h-radius(6px 6px 0 0);
  @include h-bgColor(var(--home-tab-bg));
  li {
    width: (100%/3);
    text-align: center;
    overflow: inherit;
    @include h-fontSize(var(--header-color), 13px, 38px);
    span {
      display: block;
      position: relative;
      z-index: 3;
    }
    &:nth-child(1),
    &:nth-child(2) {
      span {
        &::after {
          content: "";
          top: 50%;
          width: 1px;
          height: 14px;
          position: absolute;
          @extend %placeY;
          @include h-bgColor(var(--home-tab-after));
        }
        &::after {
          right: 0;
        }
      }
    }
    &::after {
      content: "";
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0;
      z-index: 1;
      position: absolute;
      @include h-radius(6px 6px 0 0);
      @include h-bgColor(var(--home-tab-active-bg));
    }
  }
  .active {
    position: relative;
    &:nth-child(1),
    &:nth-child(2) {
      span {
        font-weight: bold;
        &::after {
          display: none;
        }
      }
    }
    &::after {
      height: 42px;
    }
  }
}
.tabContent {
  padding: 0 12px 10px;
}
.tabCoupon{
  background: var(--tab-coupon-bg);
  min-height: 77.9vh;
}

// 动画
.table-enter-active {
  transition: all 0.3s ease-out;
}
.table-leave-active {
  transition: all 0.3s ease-out;
}
.table-enter-from,
.table-leave-to {
  opacity: 0;
}
</style>


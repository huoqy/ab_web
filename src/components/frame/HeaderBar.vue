<template>
  <div
    class="HeaderBarBox"
    :class="isHeight ? 'titleBlockHeight' : ''"
    v-if="isShowNavBar"
  >
    <div class="titleBar" :class="isBgColor">
      <!-- 左ICON -->
      <div class="leftIcon">
        <!-- 返回-按钮 -->
        <div class="backBtn" @click="backBtn" v-if="isShowBack">
          <svg-icon :iconName="'icon-arrow-left'"></svg-icon>
        </div>
        <!-- 首页 -->
        <router-link to="/" class="backHomeBtn" v-if="isShowHome"
          ><svg-icon :iconName="'icon-home'"></svg-icon
        ></router-link>
        <slot name="leftIcon"></slot>
      </div>
      <!-- 中-标签 -->
      <div class="titleBlock">{{ $route.meta.title }}</div>
      <!-- 右-ICON -->
      <div class="rightIcon">
        <!-- 刷新 -->
        <div
          class="refreshBtn"
          :class="isRefresh ? 'refreshActive' : ''"
          v-if="refreshShow"
          @click="refreshBtn"
        >
          <svg-icon :iconName="'icon-shuaxin'"></svg-icon>
        </div>
        <!-- 分享 -->
        <!-- <div class="shareBtn"></div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue-demi";
import { useRoute, useRouter } from "vue-router";
const $router = useRouter();
const $route = useRoute();
/* 是否 - 显示状态栏 */
const isShowNavBar = ref(true);
/* 是否显示 - 返回按钮 */
const isShowBack = ref(true);
/* 是否显示 - 分享 */
const isRefresh = ref(false);
/* 是否显示 - 刷新 */
const refreshShow = ref(false);
/* 是否显示返回首页 */
const isShowHome = ref(false);

/* 返回上一级 */
let backBtn = () => {
  if ($route.query.isWfun != undefined) {
    window.papa && window.papa.goBackUrl("");
  } else {
    if (window.history.length <= 1) {
      window.papa && window.papa.goBackUrl("");
    } else {
      $router.go(-1);
    }
  }
};

/* 刷新方法 */
const refreshBtn = () => {
  isRefresh.value = true;
  $router.go(0);
};

/* 数据更新时 */
onMounted(() => {
  isShowBack.value = $route.query.back == undefined ? true : false;
  refreshShow.value = $route.query.refresh != undefined ? true : false;
  isShowHome.value = $route.query.home != undefined ? true : false;
});

watch(
  $route.meta.isNavBar,
  () => {
    isShowNavBar.value = $route.meta.isNavBar;
  },
  { immediate: true }
);

const props = defineProps({
  /* 是否显示高度 */
  isHeight: {
    type: Boolean,
    default: true,
  },
  /* 设置背景颜色 */
  isBgColor: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.HeaderBarBox {
  height: 0px;
  .titleBar {
    top: 0;
    left: 0;
    width: 100%;
    height: var(--header-height);
    z-index: 3100;
    display: flex;
    position: fixed;
    align-items: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
    @include h-fontSize(var(--header-color), 16px, var(--header-height));
    @include h-bgColor(var(--header-bar));
    .leftIcon,
    .rightIcon {
      top: 50%;
      left: 0;
      display: flex;
      align-items: center;
      position: absolute;
      @extend %placeY;
      div,
      a {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .backBtn,
      .backHomeBtn,
      .refreshBtn {
        width: 40px;
        height: 40px;
        text-align: center;
        color: var(--header-color);
        svg {
          width: 17px;
        }
      }
    }
    .titleBlock {
      font-weight: 500;
      max-width: 200px;
      margin: 0 auto;
      @include h-fontSize(var(--header-color), 16px, 24px);
    }
    .rightIcon {
      left:initial;
      right: 0;
      .refreshActive {
        svg {
          animation: rotateBox 0.8s linear 0s infinite;
        }
      }
    }
  }
}
.titleBlockHeight {
  height: var(--header-height);
}

@keyframes rotateBox {
  0% {
    transform: rotate(0deg);
  }
  0% {
    transform: rotate(-360deg);
  }
}
@-webkit-keyframes rotateBox {
  0% {
    -webkit-transform: rotate(0deg);
  }
  0% {
    -webkit-transform: rotate(-360deg);
  }
}
</style>

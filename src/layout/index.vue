<template>
  <!-- 标题栏 -->
  <HeaderBar></HeaderBar>
  <!-- 组件 -->
  <PullRefresh
    v-model="loading"
    @refresh="onRefresh"
    @change="onChange"
    :head-height="70"
  >
    <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
    <template #pulling="props">
      <img
        class="doge"
        :src="`src/assets/load_img/img_${lengthImg}.png`"
        :style="{ transform: `scale(${props.distance / 70})` }"
      />
    </template>

    <!-- 释放提示 -->
    <template #loosing>
      <img class="doge" src="src/assets/load_img/img_12.png" />
    </template>

    <!-- 加载提示 -->
    <template #loading>
      <img class="doge" :src="`src/assets/load_img/img_${loosingNum}.png`" />
    </template>

    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive"></component>
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive"></component>
    </router-view>
  </PullRefresh>
  <!-- 菜单栏 -->
  <TabBar></TabBar>
  <!-- 登录 -->
  <Login></Login>
</template>
<script setup>
import HeaderBar from '@/components/frame/HeaderBar.vue';
import TabBar from '@/components/frame/TabBar.vue';
import Login from '@/components/login/Login.vue';
import { PullRefresh } from 'vant';
import { onMounted, ref } from 'vue-demi';
import { useRouter } from 'vue-router';

const $router = useRouter();
const loading = ref(false);
const lengthImg = ref(1);
const loosingNum = ref(1);

const onRefresh = () => {
  console.log(lengthImg.value);
  setTimeout(() => {
    $router.go(0);
    loading.value = false;
  }, 1000);
};

const onChange = (e) => {
  lengthImg.value++;
  lengthImg.value = lengthImg.value > 16 ? 1 : lengthImg.value++;
  if (e.distance < 10) {
    clearInterval(loosingFun);
  }
};

const loosingFun = onMounted(() => {
  loosingNum.value++;
  setInterval(() => {
    loosingNum.value++;
    loosingNum.value = loosingNum.value > 16 ? 1 : loosingNum.value++;
  }, 40);
});
</script>
<style lang="scss">
.van-pull-refresh {
  min-height: calc(100vh - 60px);
}
.doge {
  width: auto;
  height: 50px;
  margin: 10px auto 0;
}
</style>

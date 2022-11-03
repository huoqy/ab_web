<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive"></component>
    </keep-alive>
    <component :is="Component" v-if="!$route.meta.keepAlive"></component>
  </router-view>
</template>

<script setup>
import { onMounted, ref } from '@vue/runtime-core';

const isTheme = ref(localStorage.getItem('theme') === 'true' ? true : false);

onMounted(() => {
  useEffect();
  if (localStorage.getItem('theme') == undefined) {
    localStorage.setItem('theme', useEffect());
  }
  handleThemeChange(isTheme.value);
});

/* 判断-跟随系统亮暗主题 */
const useEffect = () => {
  const media = window.matchMedia('(prefers-color-scheme:dark)');
  media.addEventListener('change', (e) => {
    // console.log("主题：",e.matches)
    isTheme.value = e.matches;
    localStorage.setItem('theme', e.matches);
    handleThemeChange(e.matches);
  });
  return media.matches;
};

/* 设置主题颜色-修改CSS */
const handleThemeChange = (val) => {
  if (val) {
    document.documentElement.setAttribute('theme', 'dark');
  } else {
    document.documentElement.removeAttribute('theme');
  }
};

/* 切换主题 */
const checkBtn = () => {
  isTheme.value = !isTheme.value;
  localStorage.setItem('theme', isTheme.value);
  handleThemeChange(isTheme.value);
};
</script>

<style lang="scss" scoped></style>

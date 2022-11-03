<template>
  <div class="menuHeight" v-if="$tabBarStore.isShowTabBar">
    <div class="menuBox" :class="tabBarClass">
      <ul>
        <li
          v-for="(item, index) in menuList"
          :key="item.name"
          :class="index == tabBarIdx ? 'menuActive' : ''"
          :style="`width:${(10 / menuList.length) * 10}%`"
          @click="jumpBtn(item, index)"
        >
          <div class="menuIcon">
            <svg-icon
              :iconName="'icon-' + item.selectedIconPath"
              v-if="index == tabBarIdx"
            ></svg-icon>
            <svg-icon :iconName="'icon-' + item.iconPath" v-else></svg-icon>
          </div>
          <div class="menuName">
            {{ item.name }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { tabBarStore } from "@/stores/counter";
const $tabBarStore = tabBarStore();

const tabBarIdx = ref(0);
const isBlockTop = ref(false);
const $router = useRouter();
const $route = useRoute();

const menuList = reactive([
  {
    iconPath: "home1",
    selectedIconPath: "home-fill",
    name: "首页",
    pagePath: "/",
  },
  {
    iconPath: "all",
    selectedIconPath: "all-fill",
    name: "列表",
    pagePath: "/list",
  },
  {
    iconPath: "packaging",
    selectedIconPath: "product",
    name: "收藏",
    pagePath: "/collection",
  },
  {
    iconPath: "bussiness-man",
    selectedIconPath: "bussiness-man-fill",
    name: "我的",
    pagePath: "/me",
  },
]);

const jumpBtn = (e, i) => {
  if (e.name != $route.meta.title) {
    $router.push(e.pagePath);
  }
};

watch(
  $route.meta,
  () => {
    menuList.forEach((item, index) => {
      if ($route.meta.title == item.name) {
        tabBarIdx.value = index;
      }
      if ($route.meta.name == "404") {
        tabBarIdx.value = -1;
      }
    });
  },
  { immediate: true }
);

const props = defineProps({
  /* 设置TabBar样式 */
  tabBarClass: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss">
.menuHeight {
  height: 60px;
  .menuBox {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    position: fixed;
    box-shadow: -10px 0 5px rgba(0, 0, 0, 0.05);
    @include h-bgColor(var(--menu-bar-color));
    ul {
      height: 100%;
      display: flex;
      align-items: center;
      width: 100%;
      li {
        text-align: center;
        width: (100% / 4);
        .checkHomeIcon {
          top: 20px;
          position: relative;
          transition: top 0.15s;
          -webkit-transition: top 0.15s;
          dt {
            height: 60px;
            padding-top: 10px;
          }
          dd {
            padding-top: 10px;
            width: 40px;
            height: 40px;
            padding: 10px;
            border-radius: 50%;
            margin: 0 auto;
            overflow: hidden;
            background: #fcc;
          }
        }
        .checkTop {
          top: -30px;
        }
        .menuIcon {
          width: 18px;
          height: 18px;
          margin: 0 auto;
          color: var(--menu-icon-color);
        }
        .menuName {
          font-weight: 500;
          margin: 5px auto 0;
          @include h-fontSize(var(--menu-name-color), 12px, 18px);
        }
      }
      .menuActive {
        .menuIcon {
          color: var(--menu-icon-color-active);
        }
        .menuName {
          color: var(--menu-name-color-active);
        }
      }
    }
  }
}
</style>
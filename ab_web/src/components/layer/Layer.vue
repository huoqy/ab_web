<template>
    <div :class="`layer-${props.directionName} ${props.bgClassName}`">
      <div class="content" :class="props.className">
        <slot></slot>
      </div>
      <div class="closeLayerBtn" v-if="isShowClose" @click="closeBtn"></div>
    </div>
</template>

<script setup>
const $emit = defineEmits(["closeBtn"]);

const closeBtn = () => {
  $emit("closeBtn", true);
};

const props = defineProps({
  /* 方向 */
  directionName: {
    type: String,
    default: "content",
  },
  /* 背景样式 */
  bgClassName: {
    type: String,
    default: "",
  },
  /* 内容-样式 */
  className: {
    type: String,
    default: "",
  },
  /* 是否显示关闭层 */
  isShowClose: {
    type: Boolean,
    default: true,
  },
});
</script>

<style lang="scss">
.layer-content {
  @include h-maskLayer(rgba(0, 0, 0, 0.75), false, content);
}
.layer-top {
  @include h-maskLayer(rgba(0, 0, 0, 0.75), false, top);
}
.layer-right {
  @include h-maskLayer(rgba(0, 0, 0, 0.75), false, right);
}
.layer-bottom {
  @include h-maskLayer(rgba(0, 0, 0, 0.75), false, bottom);
}
.layer-left {
  @include h-maskLayer(rgba(0, 0, 0, 0.75), false, left);
}

// 动画
.layer-enter-active {
  transition: all 0.3s ease-out;
}
.layer-leave-active {
  transition: all 0.3s ease-out;
}
.layer-enter-from,
.layer-leave-to {
  opacity: 0;
}
</style>
<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconClassName" :fill="color" />
  </svg>
</template>

<script setup>
  import { computed } from 'vue';
  const props = defineProps({
    iconName: {
      type: Boolean,
      default: true
    },
    className: {
      type: String,
      default: ''
    },
    color: {
      type: String,
      default: ''
    }
  });
  // 图标在 iconfont 中的名字
  const iconClassName = computed(() => {
    return `#${props.iconName}`;
  })
  // 给图标添加上类名
  const svgClass = computed(() => {
    if (props.className) {
      return `svg-icon ${props.className}`;
    }
    return 'svg-icon';
  });
</script>

<style scoped>
  .svg-icon {
    width: 100%;
    aspect-ratio: 1/1;
    /* max-height: 100%; */
    position: relative;
    fill: currentColor;
    vertical-align: top;
  }
</style>
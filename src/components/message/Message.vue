<template>
    <Transition name="message">
        <div class="MessageBox" :class="style[type].class" v-if="visible">
            <div class="MessageIcon" v-if="style[type].icon != ''">
                <svg class="svg-icon " aria-hidden="true">
                    <use :xlink:href="`#icon-${style[type].icon}`" />
                </svg>
            </div>
            {{text}}
        </div>
    </Transition>
</template>
<script setup>
import { onMounted, ref } from "vue-demi";

const props = defineProps({
    text:{
        type: String,
        default: '',
    },
    type: {
      type: String,
      default: "none",
    },
})

const style = {
    none: {
        icon: "",
        class: '',
    },
    warn: {
        icon: "cuowu",
        class: 'warn',
    },
    error: {
        icon: "reeor-fill",
        class: 'error',
    },
    success: {
        icon: "success-fill",
        class: 'success',
    },
};


let visible = ref(false);
onMounted(()=>{
    visible.value = true;
    setTimeout(()=>{
        visible.value = false;
    },2000);
})

</script>

<style lang="scss">
    .MessageBox{
        bottom:16%;
        left:50%;
        display: flex;
        align-items: center;
        position: fixed;
        padding: 6px 15px;
        z-index: 3500;
        min-height: 34px;
        max-width: 90%;
        backdrop-filter: saturate(180%) blur(20px);
        @extend %placeX;
        @include h-radius(6px);
        @include h-bgColor(var(--message-bg));
        @include h-fontSize(var(--message-color), 13px, auto);
        .MessageIcon{
            width:14px;
            height:14px;
            margin-right: 6px;
        }
    }
    .warn{
        color:#c5882d;
        @include h-bgColor(#fcf6ed);
    }
    .error{
        color:#e47470;
        @include h-bgColor(#fcf0f0);
    }
    .success{
        color:#7ebf50;
        @include h-bgColor(#f2f9ec);
    }
    
  .svg-icon {
    width: 100%;
    aspect-ratio: 1/1;
    position: relative;
    fill: currentColor;
    vertical-align: top;
  }

    // 动画
    .message-enter-active {
    transition: all 0.1s ease-out;
    }
    .message-leave-active {
    transition: all 0.1s ease-out;
    }
    .message-enter-from{
        bottom: 30px;
    }
    .message-leave-to {
        bottom: 30px;
        opacity: 0;
    }
</style>
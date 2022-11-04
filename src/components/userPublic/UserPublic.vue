<template>
    <div class="userPublic">
        <div class="userPublicInfo">
            <div class="userAvatar"><img src="@/assets/img/home/avatar_bg.png" alt=""></div>
            <div class="userInfoMge" v-if="isLogin">
                <div class="userName"><p>游客</p><em>SVIP0</em></div>
                <div class="growthVal">还需<em>1</em>成长值可升V<em>1</em></div>
            </div>
            <div class="loginBtn" @click="loginBtn" v-else>登录</div>
        </div>
        <div class="tabBox">
            <slot></slot>
        </div>
    </div>
</template>
<script setup>
import { ref } from "vue-demi";
import { userMessgeStore } from "@/stores/counter";

const userMessge = userMessgeStore();

const isLogin = ref(false)

const loginBtn = () => {
    userMessge.setShowLogin(true)
}
</script>
<style lang="scss">
    .userPublic{
        padding:15px 0 0 20px;
        height: 128px;
        position: relative;
        @include h-bgCover(url('@/assets/img/home/bg.png'));
        @include h-fontSize(var(--message-color), 13px, auto);
        .userPublicInfo{
            display: flex;
            .userAvatar{
                margin-right:10px;
                @include h-avatar(48px, 48px, none, 50%, none)
            }
            .userInfoMge{
                .userName{
                    display: flex;
                    align-items: center;
                    @include h-fontSize(var(--message-color), 14px, 20px);
                    p{
                        max-width: 150px;
                        @extend %ellipsis;
                    }
                    em{
                        margin-left:4px;
                        display: inline-block;
                        height: 16px;
                        @include h-btn(50px, 16px, 12px, var(--menu-bar-color), 2px, 0, linear-gradient(90deg,#68bdf3 7%,#53cdf1 90%), false, none);
                    }
                    .lv-one{
                        @include h-bgCover(linear-gradient(90deg,#68bdf3 7%,#53cdf1 90%));
                    }
                }
                .growthVal{
                    margin-top:3px;
                    @include h-fontSize(#9e9e9e, 12px, 14px);
                }
            }
            .loginBtn{
                margin-top: 10px;
                height: 24px;
                @include h-btn(67px, 24px, 12px, var(--menu-bar-color), 3px, 0, linear-gradient(90deg,#52bbff 7%,#2986ff 94%), false, none);
            }
        }
        .tabBox{
            bottom:0;
            left:50%;
            position: absolute;
            @extend %placeX;
        }
    }
</style>
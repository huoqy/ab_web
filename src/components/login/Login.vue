<template>
  <Transition name="layer">
    <Layer
      :isShowClose="false"
      @closeBtn="closeLayerBtn"
      v-if="userMessge.isShowLogin"
    >
      <div class="loginBox">
        <div class="closeBtn" @click="closeLayerBtn">
          <svg-icon iconName="icon-close"></svg-icon>
        </div>
        <img src="@/assets/img/login/login_s.png" class="loginLogo" alt="" />
        <!-- 密码-验证码登录 -->
        <form action="">
          <ul class="loginList loginListIcon">
            <li>
              <div class="inputIcon inputTipIcon">
                <svg-icon iconName="icon-mobile-phone"></svg-icon>
              </div>
              <input
                type="text"
                ref="mobileInput"
                v-model="accountMsg.mobile"
                :placeholder="`请输入${checkLoginMode ? '账号/' : ''}手机号`"
                :maxlength="checkLoginMode ? 20 : 11"
              />
              <div
                class="inputIcon clearInputIcon"
                v-if="accountMsg.mobile.length != ''"
                @click="clearInputIconBtn('mobile')"
              >
                <svg-icon iconName="icon-guanbi"></svg-icon>
              </div>
            </li>
            <!-- 密码码/验证码 -->
            <li :class="checkLoginMode ? '' : 'codeBox'">
              <div class="inputIcon inputTipIcon">
                <svg-icon
                  :iconName="`icon-${checkLoginMode ? 'password' : 'security'}`"
                ></svg-icon>
              </div>
              <input
                :type="checkLoginMode ? 'password' : 'text'"
                ref="passwordInput"
                v-model="accountMsg.password"
                :placeholder="`请输入${checkLoginMode ? '密码' : '验证码'}`"
                :maxlength="checkLoginMode ? 30 : 6"
              />
              <template v-if="checkLoginMode">
                <div
                  class="inputIcon clearInputIcon"
                  v-if="accountMsg.password.length != ''"
                  @click="clearInputIconBtn('password')"
                >
                  <svg-icon iconName="icon-guanbi"></svg-icon>
                </div>
              </template>
              <div class="getCode" v-else>
                <p @click="getCodeBtn" v-if="countTimeDown == 60">获取验证码</p>
                <p v-else>{{ countTimeDown }}S</p>
              </div>
            </li>
          </ul>
        </form>
        <div class="loginBtn" v-stopReClick @click="loginBtn">登录</div>
        <div
          class="agreement"
          :class="isAgree ? 'isNotAgreement' : ''"
          @click="checkAgreementBtn"
        >
          <div
            class="checkBox"
            :class="isAgreementCheck ? 'checkBoxActive' : ''"
          >
            <svg-icon iconName="icon-seleted"></svg-icon>
          </div>
          已阅读并同意
          <router-link :to="userMessge.usersProtocol">用户协议</router-link>和
          <router-link :to="userMessge.privacyPolicy">隐私政策</router-link>
        </div>
        <ul class="loginMode">
          <li @click="checkLoginModeBtn">
            <!-- 手机号登录 -->
            <div class="phoneIcon" v-if="checkLoginMode">
              <svg-icon iconName="icon-mobile-phone"></svg-icon>
            </div>
            <!-- 账号登录 -->
            <div class="accountIcon" v-else>
              <svg-icon iconName="icon-bussiness-man"></svg-icon>
            </div>
          </li>
          <!-- 快捷登录 -->
          <li class="quickIcon" v-if="isShowQuickLogin">
            <svg-icon iconName="icon-operation"></svg-icon>
          </li>
        </ul>
      </div>
    </Layer>
  </Transition>
</template>
<script setup>
import Layer from "@/components/layer/Layer.vue";
import { reactive, ref, toRefs, watch } from "vue";
import { userMessgeStore } from "@/stores/counter";
import { Messages } from "@/util/generalComponents.js";
import { useRoute, useRouter } from "vue-router";

const isShowQuickLogin = ref(false);
let codeTime;

/* 关闭弹框 */
const userMessge = userMessgeStore();
const closeLayerBtn = (e) => {
  countTimeDown.value = 60;
  clearInterval(codeTime);
  userMessge.setShowLogin(false);
  accountMsg.mobile = '';
  accountMsg.password = '';
};


/* 切换登录方式 */
const checkLoginMode = ref(true);
const checkLoginModeBtn = (e) => {
  checkLoginMode.value = !checkLoginMode.value;
  accountMsg.password = "";
  accountMsg.mobile = !/^1[3456789]\d{9}/.test(accountMsg.mobile)
    ? ""
    : accountMsg.mobile;
};

/* 获取验证码 */
const countTimeDown = ref(60);
let getCodeBtn = () => {
  if( accountMsg.mobile == ''){
    Messages({ type: "error", text: `手机号不能空` });
    return;
  }else if(!/^1[3456789]\d{9}/.test(accountMsg.mobile)){
    Messages({ type: "error", text: `手机号码有误，请重填` });
    return;
  }
  Messages({ type: "success", text: `短信发送成功` });
  countTimeDown.value--;
  codeTime = setInterval(() => {
    countTimeDown.value--;
    if (countTimeDown.value == 0) {
      clearInterval(codeTime);
      countTimeDown.value = 60;
    }
  }, 1000);
};

/* 登录信息 */
let accountMsg = reactive({
  account: "",
  mobile: "",
  password: "",
  imei: "123",
  app_key: "qh97",
});


// 登录提交按钮
const loginBtn = () => {
  // console.log( tipsText.value)
  if (isLoginMsgEmpty()) {
    console.log("登录信息: ", accountMsg);
    Messages({ type: "success", text: `登录成功` });
  }
};

/* 判断登录信息是否为空 */
const isAgreementCheck = ref(false);
const isAgree = ref(false);
let isLoginMsgEmpty = () => {
  let { mobile, password } = accountMsg;
  if (mobile == "") {
    Messages({
      type: "error",
      text: `${checkLoginMode.value ? "账号或" : ""}手机号不能为空`,
    });
    return false;
  } else if (
    !checkLoginMode.value &&
    !/^1[3456789]\d{9}/.test(mobile)
  ) {
    Messages({ type: "error", text: `手机号码有误，请重填` });
  } else if (password == "") {
    Messages({
      type: "error",
      text: `${checkLoginMode.value ? "密码" : "验证码"}不能为空`,
    });
    return false;
  } else if (!isAgreementCheck.value) {
    Messages({ type: "error", text: `请同意协议` });
    agreeToAgreement();
    return false;
  } else {
    return true;
  }
};

/* 是否同意协议 */
let agreeToAgreement = () => {
  isAgree.value = true;
  setTimeout(() => {
    isAgree.value = false;
  }, 500);
};

/* 切换协议 */
let checkAgreementBtn = () => {
  isAgreementCheck.value = !isAgreementCheck.value;
};

/* 清除input框 */
const mobileInput = ref(null);
const passwordInput = ref(null);
let clearInputIconBtn = (e) => {
  accountMsg[e] = "";
  if (e == "mobile") {
    mobileInput.value.focus();
  } else {
    passwordInput.value.focus();
  }
};

/* 监听路由变化-关闭登录弹窗 */
const $router = useRouter();
const $route = useRoute();
watch(
  $route.meta,
  () => {
    userMessge.setShowLogin(false);
  },
  { immediate: true, deep: true }
);
</script>

<style lang="scss">
.loginBox {
  width: 310px;
  min-height: 250px;
  padding: 25px 20px 12px;
  position: relative;
  backdrop-filter: saturate(180%) blur(20px);
  @include h-radius(6px);
  @include h-bgColor(var(--menu-bar-color));
  .closeBtn {
    top: 5px;
    right: 5px;
    width: 28px;
    height: 28px;
    padding: 8px;
    position: absolute;
    color: var(--input-toast);
  }
  .loginLogo {
    width: 156px;
    margin: 0 auto;
  }
  .loginList {
    margin-top: 10px;
    li {
      display: flex;
      padding-right: 30px;
      position: relative;
      @include h-radius(2px);
      @include h-border(1px solid var(--input-border-color), bottom);
      input {
        width: 100%;
        border: none;
        display: block;
        text-indent: 8px;
        background: none;
        @include h-fontSize(var(--header-color), 14px, 54px);
        &::placeholder {
          color: var(--input-toast);
        }
      }
      .inputIcon {
        width: 28px;
        top: 50%;
        position: absolute;
        @extend %placeY;
      }
      .clearInputIcon {
        padding: 7px;
        right: 0;
        color: var(--input-toast);
      }
    }
    .codeBox {
      padding-right: 100px;
      .getCode {
        top: 0;
        right: 0;
        width: 100px;
        text-align: center;
        position: absolute;
        @include h-fontSize(var(--header-color), 12px, 54px);
      }
    }
  }
  .loginListIcon {
    li {
      padding-left: 22px;
      .inputTipIcon {
        padding: 5px;
        left: 0;
        top: 50%;
        color: var(--login-icon-color);
      }
    }
  }
  .loginBtn {
    height: 40px;
    margin: 15px auto 0;
    transform: opacity 0.2s;
    @include h-radius(2px);
    @include h-btn(
      100%,
      40px,
      14px,
      var(--header-bar),
      6px,
      0,
      var(--btn-color),
      false,
      none
    );
    .loginLoading {
      width: 16px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-content: center;
      color: var(--header-bar);
      svg {
        animation: rotateTrans 1.5s linear infinite;
      }
    }
  }
  .opacityActive {
    opacity: 0.8;
  }
  .agreement {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px auto 0;
    @include h-fontSize(var(--agreement-color), 11px, 12px);
    .checkBox {
      width: 12px;
      height: 12px;
      margin-right: 6px;
      @include h-radius(2px);
      @include h-bgColor(var(--checkBox-color));
      svg {
        color: var(--checkBox-color);
        padding: 2px;
      }
    }
    .checkBoxActive {
      color: #ffffff;
      @include h-bgColor(var(--checkBox-active-color));
      svg {
        color: #ffffff;
      }
    }
    a {
      text-decoration: underline;
      color: var(--agreement-color);
    }
  }
  .isNotAgreement {
    animation: checkFirst 0.1s 5;
    -webkit-animation: checkFirst 0.1s 5;
  }
  .loginMode {
    margin: 12px auto 0;
    display: flex;
    justify-content: center;
    position: relative;
    li {
      width: 32px;
      height: 32px;
      margin: 0 7px;
      color: var(--menu-bar-color);
      @include h-radius(50%);
      svg {
        padding: 7px;
      }
    }
    .phoneIcon {
      @include h-bgColor(#5fabef);
    }
    .accountIcon {
      @include h-bgColor(#6a5ef9);
    }
    .quickIcon {
      @include h-bgColor(#f17a14);
    }
  }
}

@keyframes rotateTrans {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes rotateTrans {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes checkFirst {
  0% {
    margin-left: -4px;
  }
  50% {
    margin-left: 4px;
  }
  100% {
    margin-left: -4px;
  }
}
@-webkit-keyframes checkFirst {
  0% {
    margin-left: -4px;
  }
  50% {
    margin-left: 4px;
  }
  100% {
    margin-left: -4px;
  }
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
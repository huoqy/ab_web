<template>
  <div class="notPage">
    <img src="@/assets/images/not_page.png" alt="" />
    <div class="notPageNmae">页面走丢啦 ..(｡•ˇ‸ˇ•｡)…</div>
  </div>
</template>
<script setup></script>
<style lang="scss" scoped>
.notPage {
  margin: 30% auto 0;
  img {
    width: 70%;
    margin: 0 auto;
  }
  .notPageNmae {
    margin: 20px auto 0;
    text-align: center;
    @include h-fontSize(var(--menu-name-color), 14px, 18px);
  }
}
</style>

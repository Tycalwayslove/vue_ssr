<template>
  <div class="scroll">
    <!-- 数据列表 -->
    <div class="list-wrapper">
      <!-- 列表 -->
      <slot name="content"></slot>
      <!-- 上拉动作 -->
      <slot name="pullup">
        <div v-if="pullUpLoad" class="pullup-wrapper">
          <div v-if="!isPullUpLoad" class="before-trigger">
            {{ pullupText }}
          </div>
          <div v-else class="after-trigger">
            loading
          </div>
        </div>
      </slot>
    </div>
    <!-- 上拉动作end -->
    <!-- 下拉动作start -->
    <slot name="pulldown">
      <div class="pulldown-wrapper">
        <div v-if="beforePullDown" class="before-trigger">
          {{ pullDownText }}
        </div>
        <div v-else class="after-trigger">
          <div v-if="isPullDown">loading</div>
          <div>刷新成功</div>
        </div>
      </div>
    </slot>
    <!-- 下拉动作end -->
  </div>
</template>
<script>
export default {
  name: 'ScrollComponent',
  data() {
    return {
      pullUpLoad: false,
      isPullUpLoad: false,
      beforePullDown: false,
      isPullDown: false
    }
  }
}
</script>

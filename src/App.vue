<template>
  <div id="app" class="header">
    <!-- <router-view/> -->
     <ul class="header-content">
      <li class="header-item" @click="handleClick">推荐</li>
      <li class="header-item">新闻</li>
      <li class="header-item">娱乐</li>
      <li class="header-item">体育</li>
      <li class="header-item">图片</li>
      <li class="header-item">财经</li>
    </ul>

    <div class="postcss-test">
      hello world
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    handleClick () {
      console.log('diaowole')
    }
  }
}
</script>

<style lang="scss">
  @import './index.scss';
  .postcss-test {
    display: flex;
  }
</style>

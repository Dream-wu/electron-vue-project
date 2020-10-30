<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'electron-vue-project',
  methods: {
    // mounted () {
    //   alert('mounted')
    //   window.onkeydown = e => {
    //     if (e.keyCode === 82 && (e.ctrlKey || e.metaKey)) return false
    //   }
    // }
  }
}
</script>

<style>
#app {
  height: 100vh;
}
</style>

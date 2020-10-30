<template>
  <div class="home">
    <div class="top">
      <div>
        <router-link to="/" class="alt">返回</router-link>
      </div>

      <div class="top-avatar">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        ></el-avatar>
        <p class="text-white">life is beautify</p>
      </div>
    </div>
    <div class="bottom">
      <el-button
        type="success"
        icon="el-icon-s-promotion"
        plain
        @click="toHome()"
        >立即进入</el-button
      >
    </div>
  </div>
</template>

<script>
import { remote } from 'electron'
const { Notification } = remote
export default {
  name: 'login',
  mounted () {
    // 主进程想系统发送通知
    if (Notification.isSupported()) {
      let notification = new Notification({
        title: '🌸',
        body: 'Have a good day~'
      })
      notification.show()
    }
  },
  methods: {
    toHome () {
      this.$router.push({ path: '/home' })
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  overflow-x: hidden;
}
.top {
  width: 100%;
  height: 300px;
  text-align: center;
  // background: greenyellow;
  position: relative;
  &::after {
    width: 140%;
    min-height: 300px;
    position: absolute;
    left: -20%;
    top: 0;
    z-index: -1;
    content: "";
    border-radius: 0 0 50% 50%;
    background: #55ccb6;
    // background: linear-gradient(#c3fcf5, #55ccb6);
  }
  /deep/ .top-avatar {
    margin-top: 150px;
    display: inline-block;
    // margin-top: 50%;
    .el-avatar {
      width: 80px;
      height: 80px;
    }
  }
}
/deep/.bottom {
  width: 100%;
  text-align: center;
  position: absolute;
  bottom: 30px;
  button {
    color: $primary;
    background: white;
    border-color: $primary;
    &:hover,
    &:active,
    &:visited {
      background: $primary;
      border-color: $primary;
      color: #fff;
    }
  }
}
</style>

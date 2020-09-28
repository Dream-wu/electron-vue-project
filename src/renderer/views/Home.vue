<template>
  <el-container class="h-100">
    <el-header><MyHeader /></el-header>
    <el-container>
    <el-aside width="150px" height="100%" class="menu">
      <el-menu default-active="2" class="el-menu-vertical-demo h-100" :router="true">
        <el-menu-item index="/home/memo"  >
          <i class="el-icon-document"></i>
          <span slot="title">备忘录</span>
        </el-menu-item>
        <el-menu-item index="/home/todo">
          <i class="el-icon-s-promotion"></i>
          <span slot="title">代办</span>
        </el-menu-item>
        <el-menu-item index="/home/date">
          <i class="el-icon-date"></i>
          <span slot="title">日程管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main class="main-content">
      <router-view></router-view>
    </el-main>
    </el-container>
  </el-container>
</template>

<script>
import MyHeader from '../components/MyHeader'
export default {
  name: 'home',
  components: { MyHeader },
  methods: {
    toPath (path) {
      this.$router.push({path})
    }
  }
}
</script>

<style lang="scss" scoped>
.el-header {
  background: $primary;
}
/deep/ .menu {
  .el-menu {
    background: #F2F6FC;
    border-right: 0;
  }
}
.main-content {
  padding: 0px;
}
</style>

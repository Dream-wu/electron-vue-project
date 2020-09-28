<template>
  <div class="header  text-white">
    <el-avatar
      src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      size="small"
      class="header-avatar"
    ></el-avatar>
    <span class="ml-20">{{ Date.now() | formatDate}} {{ Date.now() | formatDateWeek}}</span>
    <iframe ref="tianqi" frameborder="0" width="280" height="36" scrolling="no" hspace="0" src="https://i.tianqi.com/?c=code&id=99" style="margin-left:20px;"></iframe>
    <!-- <webview ref="tianqi" style="display:inline-flex;height:25px;width: 280px;margin-left:20px;" frameborder="0" scrolling="no" height="25" hspace="0" allowtransparency="true" src="https://i.tianqi.com/?c=code&a=getcode&id=34&h=25&w=280" plugins></webview> -->
    <span class="float-right btn-opt text-white">
      <i class="el-icon-minus mr-10" @click="toMin()"></i>
      <i class="el-icon-close" @click="toClose()"></i>
    </span>
     
  </div>
</template>

<script>
import { ipcRenderer } from 'electron'
import '../filter'

export default {
  name: 'MyHeader',
  data () {
    return {}
  },
  mounted () {
    const iframe = this.$refs['tianqi']
    iframe.addEventListener('load', () => {
      const a = iframe.contentDocument.querySelector('a')
      a.style.color = 'white'
    })
  },
  methods: {
    toMin () {
      ipcRenderer.send('min-app')
    },
    toClose () {
      ipcRenderer.send('close-app')
    }
  }
}
</script>

<style lang="scss">
.header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  -webkit-app-region: drag;
  .btn-opt {
    flex-grow: 1;
    cursor: pointer;
    text-align: right;
  }
}
</style>

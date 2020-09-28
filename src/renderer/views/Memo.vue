<template>
  <div class="h-100">
    <el-container class="h-100">
      <el-aside width="200px" height="100%">
        <MemoList @change="onChangeMenu"/>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Editor from '../components/Memo/Editor.vue'
import MemoList from '../components/Memo/List.vue'
export default {
  name: 'memo',
  data () {
    return {
      text: null
    }
  },
  components: {
    Editor,
    MemoList
  },
  methods: {
    onChangeMenu (id) {
      this.$router.push({ path: `/memo/artical/${id}` })
    },
    onChange (value) {
      this.text = value
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

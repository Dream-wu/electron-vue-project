<template>
    <div>
        <el-card class="output ql-snow">
          <div class="ql-editor" v-html="text"></div>
        </el-card>
        <Editor @change="onChange"></Editor>
    </div> 
</template>

<script>
import Editor from '../components/Memo/Editor.vue'
import MemoList from '../components/Memo/List.vue'
export default {
  name: 'memo-artical',
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

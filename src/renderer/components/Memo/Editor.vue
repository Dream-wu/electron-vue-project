<template>
    <div style="height: 610px;">
      <quill-editor v-model="content" ref="myQuillEditor" style="height: 500px;" :options="editorOption" @change="onEditorChange">
      </quill-editor>
    </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  name: 'editor',
  data () {
    return {
      editor: null,
      content: null,
      editorOption: {
        placeholder: '请输入正文'
      }
    }
  },
  components: {
    quillEditor
  },
  mounted () {
    this.editor = this.$refs.myQuillEditor.quill
  },
  methods: {
    onEditorChange (value) {
      this.$emit('change', this.content)
    }
  },
  destroyed () {
    this.editor = null
    delete this.editor
    // this.editor.destroy()
  }
}
</script>

<style lang="scss" scoped>

</style>

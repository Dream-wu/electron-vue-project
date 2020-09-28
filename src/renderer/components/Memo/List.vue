<template>
    <el-menu default-active="1" class="h-100 artical-list" @select="onSelect">
        <el-menu-item v-for="item in list " :key="item.id" :index="item.id.toString()">
            <span slot="title" class="ellipse">{{item.title}}</span>
        </el-menu-item>
    </el-menu>
</template>

<script>
export default {
  name: 'memolist',
  data () {
    return {
      list: [
        {
          id: 1,
          title: '这是一个文章标题卡设计费安科技风拉设计费'
        },
        {
          id: 2,
          title: '这是一个文章标题'
        },
        {
          id: 3,
          title: '这是一个文章标题'
        }
      ],
      editor: null,
      content: null
    }
  },
  methods: {
    onSelect (id) {
      console.log('id', id)
      this.$emit('change', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.artical-list li {
    border-bottom: 0.5px solid #EBEEF5;
}
</style>

<template>
  <div class="todo">
      <el-card class="box-card module-card" shadow="hover">
          <div slot="header" class="clearfix">
            {{module_name}}
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="未完成" name="first">
                <div v-for="o in list" :key="o.id" class="backlog-item item" @contextmenu.prevent="showMenu(o)">
                    <el-checkbox @change="onChange($event, o)" :checked="o.status===2"></el-checkbox>
                    <div class="content">{{o.content}}</div>
                    <div class="backlog-item-date" v-if="o.date" :style="{'color': Date.now()>o.date ? 'red' : '#bbb'}">
                        {{o.date | formatDate('yyyy-MM-dd')}}
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="已完成" name="second">
                <div v-for="o in list" :key="o.id" class="backlog-item item" @contextmenu.prevent="showMenu(o)">
                    <el-checkbox @change="onChange($event, o)" :checked="o.status===2"></el-checkbox>
                    <div class="content">{{o.content}}</div>
                    <div class="backlog-item-date" v-if="o.date" :style="{'color': Date.now()>o.date ? 'red' : '#bbb'}">
                        {{o.date | formatDate('yyyy-MM-dd')}}
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
      </el-card>
  </div>
</template>

<script>
import { remote } from 'electron'
import { queryBacklog, getBacklogModules, updateBacklog, updateBacklogModule, createBacklog, deleteBacklog } from '../http/index'
const Menu = remote.Menu
const MenuItem = remote.MenuItem
export default {
  name: 'todomore',
  data () {
    return {
      list: [],
      backlog: {},
      activeName: 'first',
      module_name: '',
      module_id: -1,
      dialogbacklogFormVisible: false,
      module: {},
      backlogForm: {
        type: 1,
        content: '',
        tip: 0
      }
    }
  },
  mounted () {
    const { id } = this.$route.params
    const { name } = this.$route.query
    this.module_name = name
    this.module_id = id
    this.getData(id, 1)
  },
  methods: {
    getData (moduleId, status) {
      queryBacklog({module_id: moduleId, status}).then(result => {
        this.list = result
      })
    },
    updateData (backlog, isForm) {
      updateBacklog(backlog).then(result => {
        this.getData(this.module_id, this.activeName === 'first' ? 1 : 2)
        if (isForm) {
          this.dialogbacklogFormVisible = false
        }
      })
    },
    handleClick (tab, event) {
      if (this.activeName === 'first') {
        this.getData(this.module_id, 1)
      } else if (this.activeName === 'second') {
        this.getData(this.module_id, 2)
      }
    },
    deleteBacklog (backlog) {
      deleteBacklog(backlog).then(result => {
        this.getData(this.module_id, this.activeName === 'first' ? 1 : 2)
      })
    },
    updateBacklogModule (module) {
      updateBacklogModule(module).then(result => {
        this.getData()
      })
    },
    onChange (value, backlog) {
      if (value) {
        this.updateData({...backlog, status: 2})
      } else {
        this.updateData({...backlog, status: 1})
      }
    },
    showMenu (backlog) {
      const menu = new Menu()
      const that = this
      menu.append(new MenuItem({
        label: '删除',
        click () {
          that.deleteBacklog({id: backlog.id})
        }
      }))
      menu.popup(remote.getCurrentWindow())
    }
  }
}
</script>

<style lang="scss" scoped>
.todo {
  padding: 10px 20px;
}
.module-name {
  width: auto !important;
}
/deep/ .module-name  input {
  border: 0;
  height: 14px;
  line-height: 14px;
}
.backlog-item {
  display: flex;
  height: 30px;
  line-height: 30px;
  // border-bottom: 1px solid #ddd;
  .backlog-item-date {
    display: inline-block;
    width: 70px;
    flex-shrink: 0;
    font-size: 12px;
    text-align: right;
  }

}
.backlog-item .content{
  width: 100%;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-left: 4px;
  cursor: pointer;
  font-size: 13px;
}

.module-card {
  width: 100%;
  margin-bottom: 20px;
.module-card-btn {
    float: right;
    padding: 3px 0;
    &:last-child {
      margin-right: 6px;
    }
  }
}
</style>

<template>
  <div class="todo">
    <div class="todo-module">
      <el-card class="box-card module-card" v-for="item in list" :key="item.id">
        <div slot="header" class="clearfix">
          <el-input v-model="item.name" placeholder="请输入内容" class="module-name" @change="onChangeName($event, item)"></el-input>
          <el-button type="text" class="module-card-btn"
            ><i class="el-icon-delete"></i
          ></el-button>
          <el-button type="text" class="module-card-btn" @click="showBacklogForm(item, 1)"
            ><i class="el-icon-plus"></i
          ></el-button>
          <el-button class="module-card-btn" type="text" @click="goMore(item.id, item.name)"
            ><i class="el-icon-more"></i
          ></el-button>
        </div>
        <div v-for="o in item.items" :key="o.id" class="backlog-item item" @contextmenu.prevent="showMenu(o)">
          <el-checkbox @change="onChange($event, o)" :checked="o.status===2"></el-checkbox>
          <div class="content" @dblclick="showBacklogForm(item, 2, o)">{{o.content}}</div>
          <div class="backlog-item-date" v-if="o.date" :style="{'color': Date.now()>o.date ? 'red' : '#bbb'}">
            <!-- <i class="el-icon-message-solid" v-if="o.tip" /> -->
            {{o.date | formatDate('yyyy-MM-dd')}}
          </div>
        </div>
      </el-card>
    </div>
    <el-dialog :title="'【' +module.name + '】 - '+ (backlogForm.type===1? '新增': '编辑' )+'待办'" :visible.sync="dialogbacklogFormVisible">
    <el-form :model="backlogForm">
      <el-form-item label="">
        <el-input v-model="backlogForm.content" autocomplete="off" type="textarea" :rows="2"></el-input>
      </el-form-item>
      <el-form-item label="到期日期">
         <el-col :span="11">
          <el-date-picker size="mini" type="date" placeholder="选择日期" v-model="backlogForm.date" style="width: 100%;" value-format="timestamp"></el-date-picker>
        </el-col>
        <el-col :span="8" style="margin-left: 16px;">
          <el-checkbox  v-model="backlogForm.tip" :true-label="1" :false-label="0">提醒我</el-checkbox>
        </el-col>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogbacklogFormVisible = false;module={}">取 消</el-button>
      <el-button type="primary" @click="submitBacklogForm()">确 定</el-button>
    </div>
  </el-dialog>
  </div>
</template>

<script>
import { remote } from 'electron'
import { getBacklogModules, updateBacklog, updateBacklogModule, createBacklog, deleteBacklog } from '../http/index'
const Menu = remote.Menu
const MenuItem = remote.MenuItem
export default {
  name: 'todo',
  data () {
    return {
      list: [],
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
    this.getData()
  },
  methods: {
    getData () {
      getBacklogModules().then(result => {
        this.list = result
      })
    },
    updateData (backlog, isForm) {
      updateBacklog(backlog).then(result => {
        this.getData()
        if (isForm) {
          this.dialogbacklogFormVisible = false
        }
      })
    },
    deleteBacklog (backlog) {
      deleteBacklog(backlog).then(result => {
        this.getData()
      })
    },
    updateBacklogModule (module) {
      updateBacklogModule(module).then(result => {
        this.getData()
      })
    },
    onChangeName (value, module) {
      if (value.length > 20) return
      this.updateBacklogModule({id: module.id, name: value})
    },
    onChange (value, backlog) {
      if (value) {
        this.updateData({...backlog, status: 2})
      } else {
        this.updateData({...backlog, status: 1})
      }
    },
    showBacklogForm (module, type, backlog) {
      if (type === 1) {
        this.module = module
        this.backlogForm = {
          type: 1,
          content: ''
        }
        this.dialogbacklogFormVisible = true
      } else if (type === 2) {
        this.module = module
        this.backlogForm = {...backlog, type: 2}
        this.dialogbacklogFormVisible = true
      }
    },
    submitBacklogForm () {
      if (this.backlogForm.type === 1) {
        const data = {...this.backlogForm, module_id: this.module.id}
        delete data.type
        createBacklog(data).then(result => {
          this.getData()
          this.dialogbacklogFormVisible = false
          this.module = {}
        })
      } else if (this.backlogForm.type === 2) {
        const data = {...this.backlogForm}
        delete data.type
        this.updateData(data, true)
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
    },
    goMore (id, name) {
      console.log('id', id)
      this.$router.push({path: `/home/todomore/${id}`, query: {name}})
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
.todo-module {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .module-card {
    width: 47%;
    margin-bottom: 20px;
    .module-card-btn {
      float: right;
      padding: 3px 0;
      &:last-child {
        margin-right: 6px;
      }
    }
  }
}
</style>

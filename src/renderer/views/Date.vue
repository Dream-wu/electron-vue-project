<template>
  <div class="date">
    <el-calendar v-model="date">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
      <template slot="dateCell" slot-scope="{ date, data }">
        <p>
          <el-popover
            placement="right"
            width="300"
            :ref="'popover-' + date.getTime()"
            @show="onShow(date)"
            trigger="click">
            <el-form ref="addform" :model="addForm" label-width="40px" size="mini">
              <el-form-item label="内容">
                <el-input type="textarea" v-model="addForm.content"></el-input>
              </el-form-item>
              <el-form-item size="mini">
                <el-button type="primary" @click="onSubmit(date)">立即创建</el-button>
                <el-button @click="closeAddForm()">取消</el-button>
              </el-form-item>
            </el-form>
            <span slot="reference">{{data.day.split('-').slice(1).join('-')}}</span>
            </el-popover>
        </p>
        <div v-if="dateList[data.day]" class="date-wrapper">
          <p v-for="(item) in dateList[data.day]" :key="item.id" @click="showInfo(item)" class="date-item">
            <el-popover
            placement="right"
            width="200"
            trigger="click">
            <div>
              <p><el-link type="danger" size="small" class="float-right" @click="del(item)"><i class="el-icon-delete el-icon--right"></i></el-link></p>
              <p style="clear:both">{{item.content}}</p>
            </div>
            <span slot="reference">{{item.content}}</span>
            </el-popover>
        </p>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
import {getSchedules, createSchedule} from '../http/index'
export default {
  name: 'date',
  data () {
    return {
      date: new Date(),
      dateList: {},
      addForm: {
        date: new Date(),
        content: ''
      }
    }
  },
  created () {
    this.$nextTick(() => {
      // 点击前一个月
      let prevBtn = document.querySelector('.el-calendar__button-group .el-button-group>button:nth-child(1)')
      prevBtn.addEventListener('click', e => {
        this.getData(this.date.getFullYear(), this.date.getMonth() + 1)
      })
      // 点击下一个月
      let nextBtn = document.querySelector('.el-calendar__button-group .el-button-group>button:nth-child(3)')
      nextBtn.addEventListener('click', () => {
        this.getData(this.date.getFullYear(), this.date.getMonth() + 1)
      })
      // 点击今天
      let todayBtn = document.querySelector('.el-calendar__button-group .el-button-group>button:nth-child(2)')
      todayBtn.addEventListener('click', () => {
        this.getData(this.date.getFullYear(), this.date.getMonth() + 1)
      })
    })
  },
  mounted () {
    this.getData(this.date.getFullYear(), this.date.getMonth() + 1)
  },
  methods: {
    getData (year, month) {
      getSchedules({year, month}).then(result => {
        let obj = {}
        for (let i = 0; i < result.length; i++) {
          let item = result[i]
          if (!obj[item.date]) obj[item.date] = []
          obj[item.date].push({
            id: item.id,
            content: item.content
          })
        }
        this.dateList = obj
      })
    },
    createData () {
      const {content, date} = this.addForm
      createSchedule({content, date: this.$formatDate(date, 'yyyy-MM-dd')}).then(result => {
        this.getData(this.date.getFullYear(), this.date.getMonth() + 1)
        this.closeAddForm()
      })
    },
    onSubmit (date) {
      if (this.addForm.content.trim().length === 0) return
      this.createData()
    },
    closeAddForm () {
      this.$refs[`popover-${this.date.getTime()}`].doClose()
    },
    onShow (date) {
      console.log('onshow')
      this.addForm = {
        date: this.date,
        content: ''
      }
    },
    showInfo (item) {
      console.log(item)
    },
    del (item) {
      console.log('删除某一条数据')
    }
  }
}
</script>

<style lang="scss" scoped>
.is-selected {
  color: #1989FA;
}
.date-wrapper {
  height: 50px;
  overflow-y: scroll;
}
.date-item {
  height: 16px;
  margin-bottom: 1px;
  background: #F56C6C;
  color: white;
  opacity: .5;
  font-size: 11px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

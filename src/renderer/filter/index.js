import Vue from 'vue'
import * as date from './date'

Object.keys(date).forEach(k => Vue.filter(k, date[k]))

Vue.prototype.$formatDate = Vue.filter('formatDate')

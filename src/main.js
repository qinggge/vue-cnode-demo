// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import Vue from 'vue'
import router from './router'
import Axios from 'axios'

Vue.prototype.$http = Axios
Vue.config.productionTip = false

/* eslint-disable no-new */

// 返回文章类型
Vue.filter('tabFormatter',function(post){
  if(post.good === true && post.top === false){
    return '精华'
  }else if(post.good === true && post.top === true){
    return '置顶'
  }else if(post.top === true){
    return '置顶'
  }else if(post.tab === 'ask'){
    return '问答'
  }else if(post.tab === 'share'){
    return '分享'
  }else{
    return '招聘'
  }
})


//返回精华和置顶
Vue.filter('greenFormatter',function(post){
  if(post.good === true){
    return '精华'
  }else if(post.good === true && post.top === true){
    return '置顶'
  }else if(post.top === true){
    return '置顶'
  }else {
    return ''
  }
})

// 格式化最后评论时间
Vue.filter('formatDate', function (str) {
  if (!str){
    return ''
  }
  var date = new Date(str)
  var time = new Date().getTime() - date.getTime()
  if (time < 0){
    return ''
  } else if ((time / 1000 < 30)) {
    return '刚刚'
  } 
  else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + ' 秒前'
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + ' 分钟前'
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + ' 小时前'
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + ' 天前'
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + ' 个月前'
  } else {
    return parseInt(time / 31536000000) + ' 年前'
  }
})  

Vue.filter('omit',function(str){
  if(str.length > 20){
    return (str.slice(0,21) + '...')
  }
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
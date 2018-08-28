import Vue from 'vue'
import Router from 'vue-router'
import Article from '../components/Article'
import PostList from '../components/PostList'
import UserInfo from '../components/UserInfo'
import Sidebar from '../components/Sidebar'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      name: 'root',
      path: '/',
      components:{
        main: PostList
      }
    },
    {
      name: 'post_content',
      path: '/topic/:id&author=:name',
      components:{
        main: Article,
        sidebar: Sidebar
      }
    },
    {
      name: 'user_info',
      path: '/userinfo/:name',
      components:{
        main: UserInfo
      }
    }
  ]
})

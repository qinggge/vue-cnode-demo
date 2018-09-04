<template>
  <div id="app">
      <Header></Header>
      <div id="main">
        <router-view name="sidebar"></router-view>
        <router-view name="main"></router-view>
      </div>
      <Footer></Footer>
  </div>
</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'
import UserInfo from './components/UserInfo'
import Footer from './components/Footer'
export default {
  name: 'App',
  components:{
    Header,PostList,UserInfo,Footer
  }
}
</script>

<style>
#main {
  width: 90%;
  max-width: 1400px;
  margin: 15px auto;
  min-height: 400px;
}
body {
  background-color: #e1e1e1;
  font-family: "Helvetica Neue","Luxi Sans","DejaVu Sans",Tahoma,"Hiragino Sans GB",STHeiti,sans-serif!important;
}
*{
  margin: 0;
  padding: 0;
}
.icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
</style>

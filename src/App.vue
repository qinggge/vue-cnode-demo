<template>
  <div id="app">
      <Header></Header>
      <div id="main">
        <router-view name="main"></router-view>
      </div>
  </div>
</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'
export default {
  name: 'App',
  components:{
    Header,PostList
  }
}
</script>

<style>
#main {
  width: 90%;
  max-width: 1400px;
  min-width: 960px;
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
</style>

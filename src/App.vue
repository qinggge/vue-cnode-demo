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
@import url('./assets/markdown-github.css');
#main {
  width: 90%;
  max-width: 1400px;
  margin: 15px auto;
  min-height: 545px;
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

.site-welcome{
    display: none;
    height: 100%;
    width: 100%;
    z-index: 1;

}
.site-welcome.active{
    display: flex;
    justify-content: center;
    align-items: center;

}

.site-welcome .loading{
    width: 200px;
    height: 200px;
    position: relative;
}
 .site-welcome .loading::before,.site-welcome .loading::after{
    content: '';
    position: absolute;
    width: 0px;
    height: 0px;
    background: black;
    border-radius: 50%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    animation: s 2s linear infinite;
}
.site-welcome .loading::after{
    animation-delay: 1s;
}
</style>

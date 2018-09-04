<template>
    <div id="content">
        <div class="loading" v-if="isLoading"></div>
        <div class="panel">
            <div class="header">
                <ul class="breadcrumb">
                    <li>
                        <router-link :to="{
                                name: 'root'
                            }">主页</router-link>
                        <span class="divider">/</span>
                    </li>
                </ul>
            </div>
            <div class="inner userinfo">
                <div class="user_big_avatar">
                    <img class="user_avatar" :src="info.avatar_url" :title="info.loginname">
                </div>
                <a class="dark">{{info.loginname}}</a>
                <div class="user_profile">
                    <ul>
                        <span class="big">{{info.score}} 积分</span>
                    </ul>
                </div>
                <p class="col_fade">注册时间 {{info.create_at | formatDate}}</p>
            </div>
        </div>
        <div class="panel" v-if="info.recent_topics != undefined">
            <div class="header">
                <span class="col_fade">最近创建的话题</span>
            </div>
            <div class="cell" v-for="topic in info.recent_topics.slice(0,4)" :key="topic.id">
                <router-link :to="{
                    name:'user_info',
                    params:{
                        name: info.loginname
                    }
                }" class="user_avatar pull-left">
                    <img :src="info.avatar_url" :title="info.loginname">
                </router-link>
                <a :href="info" class="last_time pull-right">
                    <span>{{topic.last_reply_at | formatDate}}</span>
                </a>
                <div class="topic_title_wrapper">
                    <router-link  :to="{
                        name:'post_content',
                        params: {
                                id:topic.id
                            }
                        }" class="topic_title">
                        {{topic.title}}
                    </router-link>
                </div>
            </div>
        </div>
        <div class="panel" v-if="info.recent_topics != undefined">
            <div class="header">
                <span class="col_fade">最近参与的话题</span>
            </div>
            <div class="cell" v-for="topic in info.recent_replies.slice(0,5)" :key="topic.id">
                <router-link :to="{
                        name: 'user_info',
                        params: {
                            name: topic.author.loginname
                        }
                    }"  class="user_avatar pull-left">
                    <img :src="topic.author.avatar_url" :title="info.loginname">
                </router-link>
                <a :href="info" class="last_time pull-right">
                    <span>{{topic.last_reply_at | formatDate}}</span>
                </a>
                <div class="topic_title_wrapper">
                    <router-link :to="{
                        name:'post_content',
                        params: {
                                id:topic.id
                            }
                        }" class="topic_title">
                        {{topic.title}}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'UserInfo',
    data(){
        return{
            isLoading: false,
            info: {}
        }
    },
    methods:{
        getData(){
            this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
                .then(response=>{
                    this.isLoading = false
                    this.info = response.data.data
                    console.log(this.info)
                })
                .catch(error=>{
                    console.log(error)
                })
        }
    },
    beforeMount(){
        this.isLoading = true
        this.getData()
    }
}
</script>

<style scoped>
a{
    font-size: 14px;
}
ul,li{
    list-style: none;
}
#content {
    padding: 0;
}
.panel {
    margin-bottom: 13px;
}
.panel .header {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
}
.panel .cell {
    padding-right: 10px;
    background: #fff;
    border-top: 1px solid #f0f0f0;
}
.cell {
    position: relative;
    padding: 10px 0 10px 10px;
    font-size: 14px;
}
.breadcrumb {
    padding: 0!important;
    margin: 0!important;
    border: none;
    border-radius: 4px;
    background: 0 0;
}
.breadcrumb>li, .navbar .brand {
    text-shadow: none;
}
.breadcrumb a {
    color: #80bd01;
    text-decoration: none;
}
.breadcrumb>li>.divider {
    padding: 0 5px;
    color: #ccc;
}
.panel .inner.post, .panel .inner.reply, .panel .inner.topic, .panel .inner.userinfo {
    padding: 10px;
    border-top: 1px solid #e5e5e5;
    border-radius: 0 0 3px 3px;
}
.user_big_avatar {
    float: left;
    margin-right: 10px;
}
.user_big_avatar img {
    width: 40px;
    height: 40px;
    border-radius: 3px;
}
.panel .header.topic_header, .panel .inner {
    background-color: #fff;
}
.panel .inner a {
    color: #778087;
}   
.panel .inner, .panel .inner li {
    line-height: 2em;
}
.user_profile {
    margin-top: 20px;
    clear: left;
}
.unstyled{
    margin-bottom: 10px;
}
.big {
    font-size: 14px;
}
.col_fade {
    color: #ababab;
    font-size: 14px;
}
.header .col_fade {
    color: #444;
}
.pull-left {
    float: left;
}
.pull-right {
    float: right;
}
a.last_time {
    text-decoration: none;
}
.user_avatar img, .user_big_avatar img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
}
.last_time {
    font-size: 11px;
    display: inline-block;
    margin-left: 20px;
    color: #777;
}
.last_time .user_small_avatar {
    height: 18px;
    width: 18px;
    vertical-align: middle;
    margin-right: .5em;
    border-radius: 3px;
}
.last_time .last_active_time {
    text-align: right;
    min-width: 50px;
    display: inline-block;
    white-space: nowrap;
}
.topic_title_wrapper {
    white-space: nowrap;
}
a.topic_title {
    max-width: 70%;
    -o-text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    vertical-align: middle;
    font-size: 16px;
    line-height: 30px;
    color: #08c;
    text-decoration: none;
    margin-left: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
}
@media (max-width: 979px){
    a.topic_title{
        font-size: 14px;
        margin-left: 15px;
    }
}
</style>

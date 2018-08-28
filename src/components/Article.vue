<template>
    <div class="article" id="content">
        <div class="header topic_header" v-if="post.author != undefined">
            <span class="topic_full_title">
                <span :class="[{
                        put_good:post.good,
                        put_top:post.top
                }]">{{post | greenFormatter}}</span>
                    {{post.title}}
            </span>
            <div class="changes">
                <span>发布于 {{post.create_at | formatDate}}</span>
                <span>作者：{{post.author.loginname}}</span>
                <span>{{post.visit_count}} 次浏览</span>
                <span>来自 {{post | tabFormatter}}</span>
            </div>
        </div>
        <div class="inner topic">
            <div class="topic_content" v-html="post.content">
            </div>
        </div>
        <div class="panel">
            <div class="header">
                <span class="col_fade">{{post.reply_count}} 回复</span>
            </div>
            <div class="cell reply_area reply_item" v-for="(reply,index) in post.replies" :key="index">
                <div class="author_content">
                    <router-link  class="user_avatar" :to="{
                        name: 'user_info',
                        params:{
                            name: reply.author.loginname
                        }
                    }">
                        <img :src="reply.author.avatar_url" :title="reply.author.loginname">
                    </router-link>
                    <a :href="`/user/${reply.author.loginname}`" class="user_avatar">
                    </a>
                    <div class="user_info">
                        <a class="dark reply_author" :href="`/user/${reply.author.loginname}`">{{reply.author.loginname}}</a>
                        <a class="reply_time">{{index+1}}楼•{{reply.create_at | formatDate}}</a>
                    </div>
                    <div class="user_action">
                        <span>
                            <i class="fa up_btn fa-thumbs-o-up"></i>
                            <span class="up-count"></span>
                        </span>
                        <span class="up-count">{{reply.ups.length}}</span>
                    </div>
                </div>
                <div class="reply_content from-arden">
                    <div class="markdown-text" v-html="reply.content"></div>
                </div>
                <div class="clearfix">
                    <div class="reply2_area"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Article',
    data(){
        return{
            isLoading: false,
            post: []
        }
    },
    methods:{
        getArticleData(){
            this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
                .then(response=>{
                    this.isLoading = false
                    this.post = response.data.data
                    console.log(this.post)
                })
                .catch(error=>{
                })
        }
    },
    beforeMount(){
        this.isLoading = true
        this.getArticleData()
    }
}
</script>

<style >
  @import url('../assets/markdown-github.css');
.changes span:before {
    content: "•";
    margin-right: 3px;
}
.header.topic_header{
    background-color: #fff;
}
.header {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
}
#content .topic_full_title {
    font-size: 22px;
    font-weight: 700;
    margin: 8px 0;
    display: inline-block;
    vertical-align: bottom;
    width: 75%;
    line-height: 130%;
}
#content .changes {
    font-size: 12px;
    color: #838383; 
}
.put_good, .put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
}
.inner.topic{
    padding: 10px;
    border-top: 1px solid #e5e5e5;
    background-color: #fff;
    border-radius: 0 0 3px 3px;
    margin-bottom: 13px;
}
.topic_content {
    margin: 0 10px;
}
.markdown-text img {
    cursor: pointer;
}
.topic_content h2 {
    font-size: 26px;
}
ul{
    padding: 0;
    margin: 0 0 10px 25px;
}
.inner li {
    line-height: 2em;
}
.panel .header {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
}
.header .col_fade {
    color: #444;
}
.cell {
    position: relative;
    padding: 10px 0 10px 10px;
    font-size: 14px;
}
.panel .cell {
    padding-right: 10px;
    background: #fff;
    border-top: 1px solid #f0f0f0;
}
.cell.reply_highlight {
    background-color: #f4fcf0;
}
.author_content .user_avatar {
    display: inline-block;
    float: left;
}
.user_avatar img, .user_big_avatar img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
}
.user_info {
    margin-left: 10px;
    display: inline-block;
}
.user_action {
    float: right;
    margin-left: 20px;
    font-size: 15px;
}
.reply_time {
    font-size: 11px;
}
.invisible {
    visibility: hidden;
}
.fa {
    color: #000;
    opacity: .4;
}
.up_btn {
    cursor: pointer;
    opacity: .4;
}
.fa, .fa-stack {
    display: inline-block;
}
.fa {
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.user_action .up-count {
    color: gray;
}
.reply_content {
    padding-left: 50px;
    color: #333;
}
a.dark, a.dark:active, a.dark:link, a.dark:visited {
    color: #666!important;
    text-decoration: none;
}
.clearfix:after, .clearfix:before {
    display: table;
    line-height: 0;
    content: "";
}
.reply2_area {
    margin-left: 42px;
}
</style>

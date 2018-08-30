<template>
    <div>
        <div v-bind:class="isLoading"></div>
        <div id="topic_list">
            <div class="topbar" v-if="spans !== undefined">
                <span v-for="(span,index) in spans" :key="span.text" :class="['topic-tab',{active:index === current}]"  @click="changeTopic(index)">{{span.text}}</span>
            </div>
            <div class="cell" v-for="post in posts" :key="post.id">
                <router-link  class="user_avatar pull-left" :to="{
                        name: 'user_info',
                        params:{
                            name: post.author.loginname
                        }
                    }">
                        <img :src="post.author.avatar_url" :alt="post.author.loginname">
                    </router-link>
                <span class="reply_count pull-left">
                    <span class="count_of_replies" title="回复数">
                        {{post.reply_count}}
                    </span>
                    <span class="count_seperator">/</span>
                    <span class="count_of_visits" title="点击数">
                        {{post.visit_count}}
                    </span>
                </span>
                <a class="last_time pull-right" href="">
                    <span class="last_active_time">{{post.last_reply_at | formatDate }}</span>
                </a>
                <div class="topic_title_wrapper">
                    <span :class="[{
                        put_good:post.good,
                        put_top:post.top,
                        'topiclist-tab':(!post.good && !post.top)
                        }]">
                        {{post | tabFormatter}}
                    </span>
                    <router-link  class="topic_title" :to="{
                        name:'post_content',
                        params: {
                                id:post.id,
                                name:post.author.loginname
                            }
                        }">{{post.title}}
                    </router-link>
                </div>
            </div>
        </div>
        <Pagination @handleList="renderList"></Pagination>
    </div>
</template>

<script>
import Pagination from './Pagination'
export default {
    name: 'PostList',
    data(){
        return {
            isLoading: false,
            posts: [],
            postPage: 1,
            tab: {
            },
            spans: [
                {text: '全部'},
                {text: '精华'},
                {text: '分享'},
                {text: '问答'},
                {text: '招聘'}
            ],
            current: 0
        }
    },
    components:{
        Pagination
    },
    methods: {
        getData(topic){
            var topicValue
            if(!topic){
                topicValue = ''
            }
            topicValue = topic
            this.$http.get('https://cnodejs.org/api/v1/topics',{
                params:{
                    page: this.postPage,
                    limit: 20,
                    tab: topicValue,
                }
            }).then(response=>{
                this.isLoading = false
                this.posts = response.data.data
            }).catch(error=>{
                console.log(error)
            })
        },
        renderList(value){
            console.log(value)
            this.postPage = value
            this.getData()
        },
        changeTopic(index){
            this.current = index
            console.log(this.current)
            switch(this.current){
                case 0:
                    this.getData()
                    break
                case 1:
                    this.getData('good')
                    console.log('我是1')
                    break
                case 2:
                    this.getData('share')
                    break
                case 3:
                    this.getData('ask')
                    break
                case 4:
                    this.getData('job')
                    break
            }
        }
    },
    beforeMount: function(){
        this.isLoading = true
        this.getData()
    }
}
</script>

<style scoped>
a{
    text-decoration: none;
}
a:focus, a:hover {
    color: #005580;
    text-decoration: underline;
}
#topic_list a.topic_title {
    color: #333;
}
#topic_list a.topic_title:visited {
    color: #888;
}
#topic_list .cell:hover {
    background: #f5f5f5;
}
.loading{
    width: 200px;
    height: 200px;
    position: relative;
  }
  .loading::before,.loading::after{
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
  .loading::after{
    animation-delay: 1s;
  }
  #topic_list {
    margin: 0;
}
  .cell {
    position: relative;
    padding: 10px 0 10px 10px;
    font-size: 14px;
    padding-right: 10px;
    background: #fff;
    border-top: 1px solid #f0f0f0;
}
  .user_avatar img, .user_big_avatar img {
    width: 30px;
    height: 30px;
    border-radius: 3px;
}
.cell .reply_count {
    width: 70px;
    display: inline-block;
    text-align: center;
}
.cell .count_of_replies {
    color: #9e78c0;
}
.cell .count_of_visits {
    font-size: 10px;
    color: #b4b4b4;
}
.pull-left {
    float: left;
}
.last_time {
    font-size: 11px;
    display: inline-block;
    margin-left: 20px;
    color: #777;
}
.pull-right {
    float: right;
}
a.last_time {
    text-decoration: none;
}
.panel .inner a {
    color: #778087;
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
.topiclist-tab {
    background-color: #e5e5e5;
    color: #999;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    font-size: 12px;
}
.topbar {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
}
.topic-tab {
    margin: 0 10px;
    color: #80bd01;
    cursor: pointer;
}
.topic-tab.active{
    background-color: #80bd01;
    color: #fff;
    padding: 3px 4px;
    border-radius: 3px;
}
</style>

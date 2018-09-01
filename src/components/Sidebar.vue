<template>
    <div id="sidebar">
        <div class="panel">
            <div class="header">
                <span class="col_fade">作者</span>
            </div>
            <div class="inner">
                <div class="user_card">
                    <router-link :to="{
                        name: 'user_info',
                        params:{
                            name: info.loginname
                        }
                    }" class="user_avatar">
                        <img :src="info.avatar_url" :title="info.loginname">
                    </router-link>
                    <span class="user_name">
                        <router-link class="dark" to="">
                            {{info.loginname}}
                        </router-link>
                    </span>
                    <div class="board clearfix">
                        <div class="floor">
                            <span class="big">积分：{{info.score}}</span>
                        </div>
                    </div>
                    <div class="space clearfix"></div>
                </div>
            </div>
        </div>
        <div class="panel">
            <div class="header">
                <span class="col_fade">作者最近主题</span>
            </div>
            <div class="inner">
                <ul class="unstyled" v-if="info.recent_topics != undefined">
                    <li v-for="list in info.recent_topics.slice(0,5)" :key="list.id">
                        <div>
                            <router-link class="dark topic_title" :title="list.title" to="">
                                {{list.title | omit}}
                            </router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="panel">
            <div class="header">
                <span class="col_fade">作者其他话题</span>
            </div>
            <div class="inner">
                <ul class="unstyled" v-if="info.recent_replies != undefined">
                    <li v-for="list in info.recent_replies.slice(0,5)" :key="list.id">
                        <div>
                            <router-link class="dark topic_title" :title="list.title" to="">
                                {{list.title | omit}}
                            </router-link>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
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
#sidebar {
    width: 290px;
    font-size: 14px;
    float: right;
    margin-bottom: 20px;
}
.panel {
    margin-bottom: 13px;
}
#sidebar .panel {
    font-size: 13px;
}
#sidebar .header {
    color: #51585c;
    border-radius: 3px 3px 0 0;
}
.header .col_fade {
    color: #444;
}
.panel .inner {
    background-color: #fff;
}
.panel .inner {
    padding: 10px;
    border-radius: 0 0 3px 3px;
}
.panel .inner, .panel .inner li {
    line-height: 2em;
}
.user_card .user_avatar {
    vertical-align: middle;
    margin-right: .5em;
}
.panel .inner a {
    color: #778087;
}
.user_card .user_avatar img {
    width: 48px;
    height: 48px;
    border-radius: 3px;
}
.user_name {
    max-width: 120px;
    white-space: nowrap;
    display: inline-block;
    vertical-align: middle;
}
.user_card .user_name {
    font-size: 16px;
}
.panel .inner a {
    color: #778087;
    text-decoration: none;
}
.board {
    margin-top: 10px;
    width: 80%;
}
.clearfix:after, .clearfix:before {
    display: table;
    line-height: 0;
    content: "";
}
.big {
    font-size: 14px;
}
.unstyled, .unstyled li{
    list-style: none;
    margin-left: 5px;
}
</style>

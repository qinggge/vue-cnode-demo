<template>
    <div class="article" id="content">
        <div class="header topic_header">
            <span class="topic_full_title">
                <span :class="[{
                        put_good:post.good,
                        put_top:post.top,
                        'topiclist-tab':(!post.good && !post.top)
                }]">{{post | tabFormatter}}</span>
                    {{post.title}}
            </span>
            <div class="changes">
                <span>发布于{{post.create_at | formatDate}}</span>
                <span>作者：{{post.author}}</span>
                <span>{{post.visit_count}}次浏览</span>
                <span>最后一次编辑是{{post.create_at | formatDate}}</span>
                <span>来自 {{post | tabFormatter}}</span>
            </div>
        </div>
        <div class="inner topic">
            <div class="topic_content" v-html="post.content">
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
                    console.log(error)
                })
        }
    },
    beforeMount(){
        this.isLoading = true
        this.getArticleData()
    }
}
</script>

<style scoped>
.changes span:before {
    content: "•";
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
}
.topic_content {
    margin: 0 10px;
}
.markdown-text>:first-child, .preview>:first-child {
    margin-top: 0;
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
.markdown-text li, .preview li {
    font-size: 14px;
    line-height: 2em;
}
.panel .markdown-text a {
    color: #08c;
    text-decoration: none;
}
</style>

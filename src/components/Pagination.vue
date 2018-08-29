<template>
    <div class="pagination">
        <button @click="changeBtn">首页</button>
        <button @click="changeBtn">上一页</button>
        <button v-if="judge">......</button>
        <button v-for="btn in pageBtn" :key="btn" :class="[{currentPage: btn == currentPage},'pageBtn']" @click="changeBtn(btn)">
            {{btn}}
        </button>
        <button @click="changeBtn">下一页</button>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    name: 'Pagination',
    data(){
        return {
            pageBtn: [1,2,3,4,5,'......'],
            currentPage: 1,
            true: false,
            judge: false
        }
    },
    methods:{
        changeBtn(page){
            if(typeof page !== 'number'){
                switch(page.target.innerText){
                    case '上一页':
                        $('button.currentPage').prev().click()
                        break
                    case '下一页':
                        $('button.currentPage').next().click()
                        break
                    case '首页':
                        this.pageBtn = [1,2,3,4,5,'......']
                        this.changeBtn(1)
                        break
                    default: 
                        break
                }
                return 
            }
            this.currentPage = page
            if(page>4){
                this.judge = true
            }else{
                this.judge = false
            }
            if(page == this.pageBtn[4]){
                this.pageBtn.shift()
                this.pageBtn.splice(4,0,this.pageBtn[3]+1)
            }else if(page == this.pageBtn[0] && page !== 1){
                this.pageBtn.unshift(this.pageBtn[0]-1)
                this.pageBtn.splice(5,1)
            }
            this.$emit("handleList",this.currentPage)
        }
    }
}
</script>

<style scoped>
.currentPage{
    background: black;
    color: white;
}
button{
    width: 45px;
    height: 30px;
    border: 1px solid #CCC;
    background: white;
    margin: 5px 0px;
}
</style>

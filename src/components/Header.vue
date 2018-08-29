<template>
    <div class="header">
        <div class="header_wrapper">
            <a href="/">
                <img src="../assets/logo.svg" alt="CNode">
            </a>
            <ul>
                <li><a href="github.com/qinggge">qinggge</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
a{
    text-decoration: none;
    color: #CCC;
    font-size: 14px;
    text-shadow: none;
}
.header{
    background-color: #444;
    height: 50px;
}
.header_wrapper{
    width: 90%;
    margin: 0 auto;
}
img{
    max-width: 120px;
    margin-top: 10px;
}
ul{
    list-style: none;
    float: right;
    margin: 4px;
}
ul li{
    display: inline-block;
    padding: 10px 15px;
}
</style>

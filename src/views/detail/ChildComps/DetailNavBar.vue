<template>
    <div>
        <nav-bar>
            <div slot="left" class="back" @click="backClick">
                <img src="~assets/img/common/back.svg" alt="">
            </div>
            <div slot="center" class="title">
                <div class="title-item" 
                     v-for="(item,index) in titles"
                     @click="titleClick(index)"
                     :class="{active:index === currentIndex}"
                     :key="item.id">{{item}}</div>
            </div>
        </nav-bar>
    </div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'

export default {
    name:"DetailNavBar",
    data(){
        return{
            titles:['商品','参数','评论','推荐'],
            currentIndex:0
        }
    },
    components:{
        NavBar
    },
    methods:{
        backClick(){
            this.$router.back() //相当于go(-1)
        },
        titleClick(index){
            this.currentIndex = index;
            this.$emit('titleClick',index)
        }
    }
}
</script>

<style scoped>
.title{
    display: flex; 
}
.title-item{
    flex: 1;
}
.active{
    color: red;
}
.back img{
    margin-top: 12px;
}
</style>
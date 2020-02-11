<template>
<!-- 定义TabBarItem，可以传入图片、文字
定义TabBarItem，并定义两个插槽，一个图片，一个文字，外层包装div用于设置样式 -->
    <div class="tab-bar-item" @click="itemClick()">
        <div v-if = "!isActive"><slot name="item-icon"></slot></div>
        <!-- 定义另一个插槽，传入高亮图片，active-icon数据 -->
        <div v-else><slot name="item-icon-active"></slot></div>
        <div :style="activeStyle"><slot name="item-text"></slot></div>
    </div>
</template>

<script>
export default {
    name:"TabBarItem",
    props:{
        path:String,
        activeColor:{
            type:String,
            default:'red'
        }
    },
    computed:{
        //动态决定isActive
        //通过this.$route.path.indexOf(this.link) !== -1来判断是否是active
        isActive(){
           return this.$route.path.indexOf(this.path) !==-1
        },
        //封装新的计算属性：this.isActive ? {'color': 'red'} : {}
        activeStyle(){
            return this.isActive ? {color:this.activeColor}:{}
        }
    },
    methods:{
        //监听tabbar中item的点击
        itemClick(){
            //通过this.$router.replace()替换路由路径
            if(this.$route.path != this.path){
                this.$router.replace(this.path)
            } 
        }
    }
}
</script>

<style scoped>
.tab-bar-item{
  flex: 1;
  text-align: center;
  height: 49px;
}
.tab-bar-item img{
    width:24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
}
.active{
    color: blueviolet;
}
</style>
<template>
    <!-- 因为各页面都一样，只是文字不同，所以不用预留插槽 -->
    <div class="tab-control">
        <!-- 用div包裹span文字，根据title v-for遍历div展示文字 -->
        <!-- 动态绑定class及监听item点击，用于实现点击时文字样式的变化 -->
        <div class="tab-control-item" 
            v-for="(item,index) in titles"
            :class="{active:index === currentIndex}"
            @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
export default {
    name:"TabControl",
    props:{
        titles:{
            type:Array,
            default(){
                return []
            }
        }
    },
    data(){
        return {
            currentIndex:0  //用于记录当前是谁被选中
        }
    },
    methods:{
        itemClick(index){
            this.currentIndex == index;
            this.$emit('tabClick', index);
        }
    }
}
</script>

<style scoped>
.tab-control{
    display: flex;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
}
.tab-control-item{
    flex: 1;
}
.tab-control-item span{
    padding: 5px;
}
.active{
    color: var(--color-high-text)
}
.active span{
    border-bottom: 3px solid var(--color-tint);
}
</style>
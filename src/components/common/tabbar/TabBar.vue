
<template>
<!-- 定义TabBar组件，在APP中使用
 tabbar显示的内容由外界决定 -->
    <div class="tab-bar">
 <!-- 定义插槽 -->
        <slot></slot>   
    </div>
</template>

<script>
export default {
    name:"TabBar"
}
</script>

<style scoped>
/* 让TabBar处于底部，并设置相关样式 */
.tab-bar{
    /* flex布局平分TabBar */
display: flex;
/* text-align: center; */

/* 定位相关 */
position: fixed;
left: 0;
right: 0;
bottom: 0;

/* 样式设置 */
background-color: #f6f6f6;
box-shadow: 0 -3px 1px rgba(100, 100, 100, 0.1);
}
</style>
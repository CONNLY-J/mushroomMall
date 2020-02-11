//创建NavBar，包含三个插槽，left、center、right

<template>
    <div class="nav-bar">
        <div class="left"><slot name="left"></slot></div>
        <div class="center"><slot name="center"></slot></div>
        <div class="right"><slot name="right"></slot></div>
    </div>
</template>

<script>
export default {
    name:"NavBar"
}
</script>

<style scoped>
/* 设置navbar样式 */
.nav-bar{
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    box-shadow: 0 1px 1px rgba(100, 100, 100, 0.1)
}
/* 设置左右两边宽度，flex=1使得中间宽度固定为总宽度减去两边宽度 */
.left,.right{
    width: 60px;
}
.center{
    flex: 1;
}
</style>
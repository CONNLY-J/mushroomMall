<template>
    <!-- 本周流行部分就是一张图片，可点击，所以封装时div>a>img -->
    <div class="feature">
        <a href="https://act.mogujie.com/zzlx67">
            <img src="~assets/img/home/recommend_bg.jpg" alt="">
        </a>
    </div>
</template>

<script>
export default {
    name:"FeatureView"
}
</script>

<style scoped>
.feature img{
    width: 100%;
}
</style>
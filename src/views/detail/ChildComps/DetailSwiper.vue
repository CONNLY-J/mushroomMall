<template>
    <swiper class="detail-swiper">
        <swiper-item v-for="(item,index) in topImages"
                    class="swiper-item"
                    :key="index">
                <img :src="item" alt=""></swiper-item>
    </swiper>
</template>

<script>

import {Swiper,SwiperItem} from 'components/common/swiper'

export default {
    name:"DetailSwiper",
    components:{
        Swiper,
        SwiperItem
    },
    props:{
        topImages:{
        type:Array,
        default(){
        return []
            }
        }
    },
    computed: {
    showImage() {
      return "http:" + item;
    }
  },
}
</script>

<style scoped>
.detail-swiper {
  height: 300px;
  overflow: hidden;
}
</style>
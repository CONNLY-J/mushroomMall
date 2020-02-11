<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" 
                    @titleClick="titleClick"
                    ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll"
            :probe-type="3"
            @scroll="contentScroll">
      <detail-swiper :topImages="topImages" ></detail-swiper> 
      <detail-base-info :goods="goods"></detail-base-info> 
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @detailImageLoad="detailImageLoad"></detail-goods-info>
      <detail-param-info ref="param" :paramInfo="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from './ChildComps/DetailNavBar';
import DetailSwiper from './ChildComps/DetailSwiper'
import DetailBaseInfo from './ChildComps/DetailBaseInfo'
import DetailShopInfo from './ChildComps/DetailShopInfo';
import DetailGoodsInfo from './ChildComps/DetailGoodsInfo'
import DetailParamInfo from './ChildComps/DetailParamInfo'
import DetailCommentInfo from './ChildComps/DetailCommentInfo'
import DetailBottomBar from './ChildComps/DetailBottomBar'

import Scroll from 'components/common/scroll/Scroll';
import GoodsList from 'components/content/goods/GoodsList';

import {getDetail, Goods,Shop,GoodsParam,getRecommend} from 'network/detail';
import {debounce} from "common/utils";
import {itemListenerMixin,backTopMixin} from "common/mixin";
import { mapActions } from 'vuex';

export default {
    name:"Detail",
    data(){
        return{
            iid:null,  //保存商品iid
            data:[],
            topImages:[],
            goods:{},
            shop:{},
            detailInfo:{},
            paramInfo:{},
            commentInfo: {},
            recommends: [],
            themeTopYs:[0,1000,2000,3000],
            getThemeTopY: null,
            currentIndex: 0,
        }
    },
    components:{
        DetailNavBar,
        DetailSwiper,
        DetailBaseInfo,
        DetailShopInfo,
        Scroll,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        DetailBottomBar,
        GoodsList
    },
    mixins: [itemListenerMixin,backTopMixin],
    created(){
        //1.保存传入的iid
        this.iid = this.$route.params.iid

        //根据iid请求详情数据
        getDetail(this.iid).then(res =>{
            const data = res.result
            //获取顶部的图片轮播数据
            this.topImages = res.result.itemInfo.topImages
            //获取商品信息
            this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
            //获取店铺信息
            this.shop = new Shop(data.shopInfo)
            //获取商品详细信息
            this.detailInfo = data.detailInfo
            //获取参数信息
            this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
            //获取评论信息
          if(data.rate.cRate !== 0){
            this.commentInfo = data.rate.list[0];
          }
        })

        //获取推荐信息
      getRecommend().then(res => {
        //  console.log(res);
        this.recommends = res.data.list;
      })

      //给getThemeTopY 赋值
      this.getThemeTopY = debounce(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.param.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        this.themeTopYs.push(Number.MAX_SAFE_INTEGER);
      }, 100)
    },
    methods:{
        ...mapActions(['addCart']),
        detailImageLoad(){
            this.newRefresh()
            this.getThemeTopY();
        },
        titleClick(index){
            this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
        },
    contentScroll(position){
      //1.获取y值
      const positionY = -position.y;

      //2.将positionY的值和主题中的值进行对比
      let length = this.themeTopYs.length;
      // for(let i = 0; i < length; i++){
      //   if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || (i === length - 1 && positionY >=  this.themeTopYs[i]))){
      //     this.currentIndex = i;
      //     this.$refs.nav.currentIndex = this.currentIndex;
      //   }
      // }
      for(let i = 0; i < length - 1; i++){
        if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])){
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      this.listenShowBackTop(position);
    },
    addToCart(){
      //1.获取购物车所需要的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      //2.将商品添加到购物车内
      //console.log(product);
      //(1)
      //mutation的提交
      //this.$store.commit('addCart', product);
      //action的提交
      //this.$store.dispatch('addCart', product).then({
      //   console.log(res);
      // })

      //(2)
      this.addCart(product).then(res => {
        //console.log(res);
        this.$toast.show(res, 2000);
      })

    }
    },
    destoyed(){
    this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
}
</script>

<style scoped>
#detail {
    height: 100vh;
    position: relative;
    z-index: 9;
    background-color: #fff;
  }

  .content {
    position: absolute;
    top: 44px;
    bottom: 60px;
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background: #fff;
  }
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 65px;
  }
</style>
<template>
    <div id="home">
        <!-- 使用NavBar,实现首页导航栏 -->
        <nav-bar class="home-nav">
            <div slot="center">购物街</div>
        </nav-bar>
        <!-- 重新添加一个tabControl，设置定位，避免被盖住 -->
        <tab-control class="tab-control"
                  :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref = "tabControl1"
                  v-show="isTabFixed"
                  ></tab-control>
        <scroll class="content" 
                ref="scroll"
                :probe-type="3"
                @scroll="contentScroll"
                :pull-up-load="true"
                @pullingUp="loadMore">
        <!-- 使用home-swiper，实现轮播图 -->
        <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <!-- 使用RecommendViewe，实现推荐信息的展示 -->
        <recommend-view :recommends="recommends"></recommend-view>
        <!-- 使用FeatureView，实现本周流行部分的展示 -->
        <feature-view></feature-view>
        <!-- 使用TabControl，实现流行、新款、精选部分的导航 -->
        <tab-control :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref = "tabControl2"
                  ></tab-control>
        <goods-list :goods="goods[currentType].list"></goods-list>
        </scroll>
        <!-- 组件不能监听点击事件，要实现点击实现必须用native原生修饰符 -->
        <!-- native：监听组件根元素的原生事件 -->
        <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    </div> 
</template>

<script>

 import NavBar from 'components/common/navbar/NavBar'
 import TabControl from 'components/content/tabcontrol/TabControl'
 import GoodsList from 'components/content/goods/GoodsList'
 import Scroll from 'components/common/scroll/Scroll'

 import HomeSwiper from './ChildComps/HomeSwiper'
 import RecommendView from './ChildComps/RecommendView'
 import FeatureView from './ChildComps/FeatureView'

 import {getHomeMultidata,getHomeGoods} from 'network/home'
 import {debounce} from 'common/utils';
 import {itemListenerMixin, backTopMixin} from 'common/mixin';

export default {
    name:"Home",
    components:{
        NavBar,
        HomeSwiper,
        RecommendView,
        FeatureView,
        TabControl,
        GoodsList,
        Scroll,
    },
    data(){
        return {
            //data中定义result用来保存首页请求的多个数据的结果，避免函数局部变量中数据消失
            result:null,
            banners:[],
            recommends:[],
            // 定义goods变量，用于存储商品所有数据，包括三类：流行pop、新款new、精选sell
            // 每类中定义page保存加载数据的页数，list保存该类商品中的数据
            goods:{
                'pop':{page:0,list:[]},
                'new':{page:0,list:[]},
                'sell':{page:0,list:[]}
            },
            currentType:'pop',
            isShowBackTop:false, //用于决定在什么数值下显示BackTop组件
            tabOffsetTop:0,
            isTabFixed:false,
            saveY:0  //用于home离开再回来时记录位置
        }
    },
    mixins:[itemListenerMixin, backTopMixin],
    //组件创建完成后即创建网络请求，所以用created
    created(){
        //请求多个数据
        // getHomeMultidata().then(res =>{
        //     this.banners = res.data.banner.list;
        //     this.recommends = res.data.recommend.list
        // })  
        //具体做的事情放进methods中，created中只写主要逻辑

        this.getHomeMultidata()

        //请求商品数据
        this.getHomeGoods('pop')
        this.getHomeGoods('new')
        this.getHomeGoods('sell')
    },
    mounted(){
    //1.图片加载完成的事件监听
    // const refresh = debounce(this.$refs.scroll.refresh, 400)
    // this.$bus.$on('itemImageLoad', () => {
    //   refresh();
    // })
    //2.获取tabcontrol的offsetTop
    //所有组件都有一个属性$el:用于获取组件中的元素
    // this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
  },
  //activeted活跃（回来时），deactiveted不活跃（离开时）
    activated(){
        this.$refs.scroll.scrollTo(0,this.saveY,0);
        this.$refs.scroll.refresh();
  },
  deactivated(){
    //   在Scroll组件中封装getScrollY方法，保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      //取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)
  },
    methods:{
        /**
         * 事件监听相关方法
         */
        tabClick(index){
            switch(index){
                case 0:
                    this.currentType='pop';
                    break;
                case 1:
                    this.currentType='new';
                    break;
                case 2:
                    this.currentType='sell';
                    break;
            }
            this.$refs.tabControl1.currentIndex = index;
            this.$refs.tabControl2.currentIndex = index;
        },

        // 监听backtop的点击，点击时，调用scrollTo返回顶部
        backClick(){
            this.$refs.scroll.scrollTo(0,0,500)
        },

        // 监听滚动
        contentScroll(position){
            //判断BackTop是否显示
            this.isShowBackTop = (-position.y)>1000;
            //决定tabcontrol是否吸顶（position:fixed)
            this.isTabFixed = (-position.y)>this.tabOffsetTop
        },
        loadMore(){
            this.getHomeGoods(this.currentType);
            this.$refs.scroll.refresh();
        },
        swiperImageLoad(){
            //2.获取tabControl的offsetTop
            // 所有的组件都有$el 属性，用于获取组件中的元素
            this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
        },

        /**
         * 网络请求相关方法
         */
        getHomeMultidata(){
            getHomeMultidata().then(res =>{
            console.log(res); 
            this.result = res;
            this.banners = res.data.banner.list;
            this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
        //上拉加载更多请求的数据为原来页数加1
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res =>{
        //console.log(res);
        //通过...的形式可以解析出数组然后再push到新数组中,获取到数据res
        this.goods[type].list.push(...res.data.list);
        //新增一组数据后，页数应该加1
        this.goods[type].page += 1;

        //完成上拉
        this.$refs.scroll.finishPullUp();
      })
    }
    }
}
</script>

<style scoped>
#home{
    height: 100vh;
    position: relative;
}
.home-nav{
    background-color: var(--color-tint);
    color: #fff;
    /* 在使用浏览器原生滚动时，为了让导航栏不跟随一起滚动
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* .tab-control{
    粘性布局，实现停留固定效果，根据设置的方位值进行fixed，
    但是很多浏览器不支持，移动端很多支持
    position: sticky;
    top: 44px;
} */
.tab-control{
  position: relative;
  
  z-index: 9;
}
.content{
    overflow: hidden;

    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
}
</style>
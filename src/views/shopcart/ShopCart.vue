<template>
    <div class="cart">
        <!-- 导航 -->
        <nav-bar class="nav-bar">
            <div slot="center">购物车({{cartCount}})</div>
        </nav-bar>
        <!-- 商品列表 -->
        <cart-list></cart-list>
        <!-- 底部汇总 -->
        <cart-bottom-bar></cart-bottom-bar>
    </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import CartList from './ChildComps/CartList'
import CartBottomBar from './ChildComps/CartBottomBar'

import { mapGetters } from 'vuex';

export default {
    name:"ShopCart",
    components:{
        NavBar,
        CartList,
        CartBottomBar
    },
    computed:{
        // cartLength(){
        //     return this.$store.this.state.cartList.length
        // }


        //mapGetters的第一种用法
    ...mapGetters(['cartCount']),
    //第二种用法
    // ...mapGetters({
    //   length: 'cartLength',
    //   list: 'cartList'
    // })
    },
    // activated(){
    //   this.$refs.scroll.refresh();
    // }
}
</script>

<style scoped>
.cart {
    /*position: relative;*/
    height: 100vh;
  }

  .nav-bar {
    background-color: var(--color-tint);
    font-weight: 700;
    color: #fff;
  }

  .cart-list {
    position: absolute;
    top: 44px;
    bottom: 49px;
    width: 100%;
  }
</style>
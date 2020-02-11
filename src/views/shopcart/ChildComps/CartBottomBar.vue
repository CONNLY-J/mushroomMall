<template>
  <div class="bottom-menu">
    <CheckButton class="select-all" @checkBtnClick="checkBtnClick" :isChecked="isSelectAll"></CheckButton>
    <span>全选</span>
    <span class="total-price">合计:{{totalPrice}}</span>
    <span class="buy-product" @click="calcClick">去计算({{checkLength}})</span>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkbutton/CheckButton';

import { mapGetters } from 'vuex';

export default {
  name: 'CartBottomBar',
  data() { 
    return {
        
    }
  },
  components:{
      CheckButton
  },
  computed:{
      ...mapGetters(['cartList']),
      totalPrice(){
        //filter过滤选中的按钮，reduce汇总
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.count * item.price
        }, 0).toFixed(2)
      },
      isSelectAll(){
          if(this.cartList.length === 0) return false
          //使用filter方式：
          //return !(this.cartList.filter(item => item.checked).length)
          //使用find方式：
          //return !this.cartList.find(item => item.checked)
          //普通遍历方式
        //   for(let item of this.cartList){
        //       if(!item.checked){
        //           return false
        //       }
        //   }
        //   return true

        return this.cartList.find(item => item.checked === false) === undefined;
      },
      checkLength(){
          
          return this.cartList.filter(item => item.checked).length;
      }
  },
  methods:{
      checkBtnClick(){
          // 1.判断是否有未选中的按钮
        //let isSelectAll = this.$store.getters.cartList.find(item => !item.checked);

        // 2.有未选中的内容, 则全部选中
        if (this.isSelectAll) {   //全部选中
          this.cartList.forEach(item => {
            item.checked = false;
          });
        } else {  //有部分或全部不选中
          this.cartList.forEach(item => {
            item.checked = true;
          });
        }
      },
      calcClick(){
        if(!this.isSelectAll){
          this.$toast.show('请选择要购买的商品');
        }
      }
  },
 }
</script>

<style scoped>
  .bottom-menu {
    width: 100%;
    height: 44px;
    background-color: #eee;
    position: fixed;
    bottom: 49px;
    left: 0;
    box-shadow: 0 -2px 3px rgba(0, 0, 0, .2);
    font-size: 14px;
    color: #888;
    line-height: 44px;
    padding-left: 35px;
    box-sizing: border-box;
  }

  .bottom-menu .select-all {
    position: absolute;
    line-height: 0;
    left: 12px;
    top: 13px;
  }

  .bottom-menu .total-price {
    margin-left: 15px;
    font-size: 16px;
    color: #666;
  }

  .bottom-menu .buy-product {
    background-color: orangered;
    color: #fff;
    width: 100px;
    height: 44px;
    text-align: center;
    line-height: 44px;
    float: right;
  } 
</style>
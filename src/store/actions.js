const actions = {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      //查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      //console.log(context);

      if (oldProduct) {
        //oldProduct.count += 1
        context.commit('addCounter', oldProduct);
        resolve('商品数量+1');
      } else {
        payload.count = 1
        context.commit('addToCart', payload)
        resolve('添加商品成功');
      }
    })

  }
}

export default actions

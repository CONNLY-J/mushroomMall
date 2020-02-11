 <template>
     <!-- 默认情况下，BScroll是不可以实时的监听滚动位置的
     probe 侦测
     0,1都不侦测实时位置
     2：在手指滚动的过程中侦测，手指离开后的惯性滚动过程不侦测
     3：只要是滚动都侦测 -->
     <div ref="wrapper">
         <div>
             <slot></slot>
         </div>
     </div>
 </template>

 <script>
import BScroll from 'better-scroll'
export default {
    name:"Scroll",
    props:{
        probeType:{
            type:Number,
            default:0
        },
        pullUpLoad:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return {
            scroll:null
        }
    },
    mounted(){
        //1.创建BScroll对象
        if(!this.$refs.wrapper) return 
                this.scroll = new BScroll(this.$refs.wrapper,{
                probeType:this.probeType,
                click:true,
                pullUpLoad:this.pullUpLoad
            })
        //2.监听滚动的位置
        if(this.probeType === 2||this.probeType === 3){
            this.scroll.on('scroll',(position) =>{
            //将事件发出去在首页时使用
            this.$emit('scroll',position)
        })
        }
        //3.监听上拉事件,滚动到底部
        if(this.pullUpLoad){
            this.scroll.on('pullingUp',() =>{
            this.$emit('pullingUp')
        })
        }
    },
    methods:{
        //封装滚动的方法
        scrollTo(x,y,time=300){
            this.scroll && this.scroll.scrollTo(x,y,time)
        },
        //封装刷新的方法
        refresh(){
            this.scroll && this.scroll.refresh();
        },
        //封装刷新完成的方法
        finishPullUp(){
            this.scroll.finishPullUp();
    },
        getScrollY(){
            return this.scroll ? this.scroll.y : 0;
        }
    },
    watch: {
        data() {
            setTimeout(this.refresh, 20)
    }
  }
}
</script>

<style scoped>

 </style>
<template>
    <transition name="move">
         <div v-show="showFlag" class="food" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image">
                    <div class="back" @click="hide">
                        <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <span class="sell-count">月售{{food.sellCount}}份</span>
                    <span class="rating">好评率{{food.rating}}%</span>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                    </div>
                <div class="buy" @click.stop.prevent="addFirst"
                 v-show="!food.count || food.count===0">加入购物车
                </div>
                </div>
                <split v-show="food.info"></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect :only-content="onlyContent"
                     :desc="desc" :ratings="food.ratings"></ratingselect>
                     <div class="rating-wrapper">
                         <ul v-show="food.ratings && food.ratings.length">
                             <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
                                 <div class="user">
                                     <span class="name">{{rating.username}}</span>
                                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                                 </div>
                                 <div class="time">{{rating.rateTime | formatDate}}</div>
                                 <p class="text">
                                     <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>
                                     {{rating.text}}
                                 </p>
                             </li>
                         </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div> 
                        
                     </div>

                </div>
            </div>
         </div>
    </transition>
  
</template>
<script>
    import BScroll from 'better-scroll';
    import Vue from 'vue';
    import {formatDate} from 'common/js/date';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import split from 'components/split/split';
    import ratingselect from 'components/ratingselect/ratingselect';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlag: false,
                selectType:1,
                onlyContent: true, //一打开页面就展示
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            };
        },
        methods: {
            show() {
                this.showFlag = true;
                //进行初始化
                this.selectType = 1;
                this.onlyContent = false;
                this.$nextTick(() => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food, {
                            click: true
                        });
                    } else {
                        this.scroll.refresh();
                    }
                });
            },
            hide() {
                this.showFlag = false;
            },
            addFirst(event) {
                if (!event._constructed) {
                    return;
                }
                Vue.set(this.food, 'count', 1);
            },
            needShow(type,text){
                if(this.onlyContent && !text){
                    return false;
                }
                if(this.selectType===1){
                    return true;
                }else{
                    return type === this.selectType;
                }
            }
        },
        events:{
            'ratingtype.select'(type){
                this.selectType=type;
                this.$nextTick(()=>{
                    this.scroll.refresh();
                });
            },
            'content.toggle'(onlyContent){
                this.onlyContent=onlyContent;
                this.$nextTick(()=>{
                    this.scroll.refresh();
                });
            }, 
        },
         filters:{
                formatDate(time){
                    let date = new Date(time);
                    return formatDate(date,'yyyy-MM-dd hh:mm');
                }
            },
        components: {
            cartcontrol,
            split,
            ratingselect
        }
    };
</script>
<style lang="">
    .food {
        position: fixed;
        left: 0;
        top: 0;
        bottom: 48px;
        z-index: 30px;
        width: 100%;
        background: #fff;
        transition: all 1s linear;
    }
    
    .move-transition {
        transform: translate3d(0, 0, 0);
    }
    
    .move-enter-active,
    .move-leave-active {
        transform: translate3d(100%, 0, 0);
    }
    
    .image-header {
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
    }
    
    .food-content .image-header img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .food-content .back {
        position: absolute;
        top: 10px;
        left: 0;
    }
    
    .icon-arrow_lift {
        display: block;
        padding: 10px;
        font-size: 20px;
        color: #fff;
    }
    
    .food-content .content {
        position: relative;
        padding: 18px;
    }
    
    .food-content .content .title {
        font-size: 14px;
        line-height: 14px;
        margin-bottom: 8px;
        font-weight: 700;
        color: rgb(7, 17, 27);
    }
    
    .food-content .content .detail {
        margin-bottom: 18px;
        line-height: 10px;
        font-size: 0;
    }
    
    .food-content .content .sell-count {
        font-size: 10px;
        color: rgb(147, 153, 159);
        margin-left: 12px;
    }
    
    .food-content .content .rating {
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    
    .food-content .price {
        font-weight: 700;
        line-height: 24px;
    }
    
    .food-content .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
    }
    
    .food-content .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    
    .food-content .cartcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 15px;
        z-index: 8;
    }
    
    .food-list .cartcontrol-wrapper {
        position: absolute;
        right: 12px;
        bottom: 12px;
    }
    
    .food-content .buy {
        position: absolute;
        right: 18px;
        bottom: 20px;
        z-index: 10;
        height: 24px;
        line-height: 24px;
        padding: 0 12px;
        box-sizing: border-box;
        font-size: 10px;
        border-radius: 10px;
        color: #fff;
        background: rgb(0, 160, 220);
    }
    
    .food-content .info {
        padding: 18px;
    }
    
    .food-content .info .title {
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(77, 85, 93);
    }
    
    .food-content .info .text {
        line-height: 24px;
        font-size: 12px;
        padding: 0 8px;
        color: #4d555d;
    }
    
    .food-content .rating {
        padding: 18px;
    }
    
    .food-content .rating .title {
        line-height: 14px;
        margin-bottom: 6px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }
     .food-content .rating-wrapper{
         padding: 0 18px;
     }
     .food-content .rating-wrapper .rating-item{
         position:relative;
         padding: 16px 0;
         border-bottom:1px solid rgba(7, 17, 27, 0.1);
     }
     .food-content .rating-wrapper .rating-item .user{
         position:absolute;
         right: 0;
         top:16px;
         line-height: 12px;
         font-size: 0;
     }
     .food-content .rating-wrapper .rating-item .user .name{
         display: inline-block;
         margin-right: 6px;
         vertical-align: top;
         font-size: 10px;
         color: rgb(147,153,159); 
     }
     .food-content .rating-wrapper .rating-item .user .avatar{
         border-radius:50%;
     }
     .food-content .rating-wrapper .rating-item .time{
         line-height: 12px;
         margin-bottom: 6px;
         font-size: 10px;
         color: rgb(147,153,159);
     }
     .food-content .rating-wrapper .rating-item .text{
         line-height: 16px;
         font-size: 12px;
         color: rgb(7, 17, 27);
     }
     .food-content .rating-wrapper .rating-item .text .icon-thumb_up, .icon-thumb_dowm{
         margin-right: 4px;
         line-height: 24px;
         font-size: 12px;
     }
     .food-content .rating-wrapper .rating-item .text .icon-thumb_up{
         color: rgb(0,160,220);
     }
      .food-content .rating-wrapper .rating-item .text .icon-thumb_dowm{
          color: rgb(147,153,159);
      }
      .no-rating{
          padding: 16px 0;
          font-size: 12px;
          color:rgb(147,153,159);   
      }
</style>
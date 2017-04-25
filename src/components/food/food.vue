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
                    <span class="rating"> 好评率{{food.rating}}%</span>
                    <div class="price">
                        <span class="now">￥{{food.price}}</span>
                        <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                    </div>
                </div>
                <div class="cartcontrol-wrapper">
                    <cartcontrol :food="food"></cartcontrol>
                </div>
                <div class="buy" @click="addFirst(food,$event)" v-show="!food.count || food.count===0">加入购物车</div>
            </div>
         </div>
    </transition>
   
</template>
<script>
    import BScroll from 'better-scroll';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    export default {
        props: {
            food: {
                type: Object
            }
        },
        data() {
            return {
                showFlag: false
            };
        },
        methods: {
            show() {
                this.showFlag = true;
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
            }
        },
        components: {
            cartcontrol
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
        bottom: 12px;
    }
    
    .food-content .buy {
        position: absolute;
        right: 18px;
        bottom: 18px;
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
</style>
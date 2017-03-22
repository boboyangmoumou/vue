<template>
    <div class="shopcart">
        <div class="content">
            <div class="content-left">
                <div class="logo-wrapper">
                    <div class="logo" :class="{'highlight':totalCount>0}">
                        <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}">购</i>
                    </div>
                    <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                </div>
                <div class="price" :class="{'highlight':totalCount>0}">￥{{totalPrice}}</div>
                <div class="desc">另需配送费 ￥{{deliveryPrice}}元</div>
            </div>
            <div class="content-right">
                <div class="pay">还需 ￥{{minPrice}}元起送</div>
            </div>
        </div>  
    </div>
</template>
<script>
    export default {
        props: {
            selectFoods: {
                type: Array,
                default () {
                    return [{
                        price: 10,
                        count: 1
                    }];
                }
            },
            deliveryPrice: {
                type: Number,
                default: 0
            },
            minPrice: {
                type: Number,
                default: 0
            }
        },
        computed: {
            totalPrice() {
                let total = 0;
                this.selectFoods.forEach((food) => {
                    total += food.price * food.count; //进行累加
                });
                return total;
            },
            totalCount() {
                let count = 0;
                this.selectFoods.forEach((food) => {
                    count += food.count;
                });
                return count;
            }
        }
    };
</script>
<style lang="">
    .shopcart {
        position: fixed;
        left: 0;
        bottom: 0;
        z-index: 100;
        width: 100%;
        height: 48px;
    }
    
    .shopcart .content {
        display: flex;
        background: #141d27;
        font-size: 0;
    }
    
    .shopcart .content .logo-wrapper {
        display: inline-block;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        vertical-align: top;
        border-radius: 50%;
        background: #141d27;
        position: relative;
    }
    
    .shopcart .content .logo {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        text-align: center;
        background: #2b343c;
    }
    
    .shopcart .content .logo .highlight {
        background: rgb(0, 160, 220);
    }
    
    .shopcart .content .logo .icon-shopping_cart {
        line-height: 44px;
        font-size: 24px;
        color: #80858a;
    }
    
    .icon-shopping_cart .highlight {
        color: #fff;
    }
    
    .shopcart .content .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        padding-right: 12px;
        line-height: 24px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 700;
        color: rgba(255, 255, 255, 0.4);
    }
    
    .price .highlight {
        color: #fff;
    }
    
    .shopcart .content .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        color: rgba(255, 255, 255, 0.4);
        font-size: 10px;
        font-weight: 700;
    }
    
    .shopcart .content-left {
        flex: 1;
    }
    
    .shopcart .content-right {
        flex: 0 0 105px;
        width: 105px;
        background-color: #2b333b;
    }
    
    .shopcart .content-right .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        color: #808387;
        font-size: 12px;
        font-weight: 700;
    }
    
    .shopcart .num {
        position: absolute;
        top: 0;
        right: 0;
        width: 24px;
        height: 16px;
        line-height: 16px;
        text-align: center;
        border-radius: 16px;
        font-size: 9px;
        font-weight: 700;
        color: #fff;
        background: rgb(240, 20, 20);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
    }
</style>
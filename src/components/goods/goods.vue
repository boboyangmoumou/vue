<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul>
                <li v-for="item in goods" class="menu-item">
                    <span class="text">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper">
            <ul>
                <li v-for="item in goods" class="food-list">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                        <li v-for="food in item.foods" class="food-item">
                            <div class="icon">
                                <img :src="food.icon" alt="">
                            </div>
                            <div class="content">
                                <h2 class="name">{{food.name}}</h2>
                                <p class="desc">{{food.description}}</p>
                                <div class="extra">
                                    <span>月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span>￥{{food.price}}</span>
                                    <span v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
    const ERR_OK = 0;
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: []
            };
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            this.$http.get('api/goods').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                }
            });
        },
    }
</script>
<style lang="">
    .goods {
        display: flex;
        position: absolute;
        top: 175px;
        bottom: 46px;
        width: 100%;
        overflow: hidden;
    }
    
    .menu-wrapper {
        flex: 0 0 80px;
        width: 80px;
        background: #eee;
    }
    
    .foods-wrapper {
        flex: 1;
    }
    
    .menu-item {
        display: table;
        height: 54px;
        width: 56px;
        line-height: 14px;
        padding: 0 10px;
    }
    
    .menu-wrapper .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
    }
    
    .decrease {
        background-image: url(decrease_3@2x.png);
    }
    
    .discount {
        background-image: url(discount_3@2x.png);
    }
    
    .guarantee {
        background-image: url(guarantee_3@2x.png);
    }
    
    .invoice {
        background-image: url(invoice_3@2x.png);
    }
    
    .special {
        background-image: url(special_3@2x.png);
    }
    
    .menu-wrapper .text {
        display: table-cell;
        width: 60px;
        vertical-align: middle;
        font-size: 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        color: #000;
    }
    
    .foods-wrapper .title {
        padding-left: 14px;
        height: 26px;
        line-height: 26px;
        border-left: 2px solid #d9dde1;
        font-size: 12px;
        color: rgb(147, 153, 159);
        background: #f3f5f7;
    }
    
    .foods-wrapper .food-item {
        display: flex;
        margin: 18px;
        padding-bottom: 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    
    .foods-wrapper .food-item:last-child {
        border-bottom: none;
        margin-bottom: 0;
    }
    
    .foods-wrapper .food-item .icon {
        flex: 0 0 57px;
        margin-right: 10px;
    }
    
    .foods-wrapper .food-item .content {
        margin: 0;
        flex: 1;
    }
</style>
<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuWrapper">
            <ul>
                <li v-for="(item,$index,event) in goods" class="menu-item" :class="{'current' :currentIndex===$index}"
                 @click="selectMenu($index,event)">
                    <span class="text">
                        <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>
                        {{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref="foodsWrapper">
            <ul>
                <li v-for="item in goods" class="food-list food-list-hook">
                    <h1 class="title">{{item.name}}</h1>
                    <ul> 
                        <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
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
                                    <span class="now">￥{{food.price}}</span>
                                    <span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shopcart>
        <food :food="selectedFood" ref="food"></food>
    </div>
    
</template>
<script>
    import BScroll from 'better-scroll';
    import shopcart from 'components/shopcart/shopcart';
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import food from 'components/food/food';
    const ERR_OK = 0;
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: [],
                listHeight: [], //进行定义
                scrollY: 0, //定义变量进行跟踪
                selectedFood: {},
            };
        },
        created() {
            this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
            this.$http.get('api/goods').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.goods = response.data;
                    this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeight();
                    });
                }
            });
        },
        computed: {
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i]; //当前一个
                    let height2 = this.listHeight[i + 1]; //下一个
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            selectFoods() {
                let foods = [];
                this.goods.forEach((good) => {
                    good.foods.forEach((food) => {

                        if (food.count) {
                            foods.push(food);
                        }
                    });
                });
                return foods;
            }
        },
        methods: {
            selectMenu(index) {
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let el = foodList[index];
                this.foodScroll.scrollToElement(el, 300);
            },
            selectFood(food, event) {
                if (!event._constructed) {
                    return;
                }
                this.selectedFood = food;
                this.$refs.food.show();
            },
            _initScroll() {
                this.meunScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                });
                this.foodScroll = new BScroll(this.$refs.foodsWrapper, {
                    click: true,
                    probeType: 3 //实现位置监听
                });
                this.foodScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                });
            },
            _calculateHeight() {
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook');
                let height = 0;
                this.listHeight.push(height); //把第一个高度push进去
                for (let i = 0; i < foodList.length; i++) {
                    let item = foodList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            }
        },
        components: {
            shopcart,
            cartcontrol,
            food
        },
        events: {
            'cart.add' (target) {
                this._drop(target);
            }
        }
    };
</script>
<style lang="">
    @import "../../common/style.css";
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
        width: 58px;
        line-height: 14px;
        padding: 0 10px;
    }
    
    .current {
        position: relative;
        z-index: 10;
        /*margin: 10px;*/
        background: #fff;
        font-weight: 700;
        border: none;
    }
    
    .menu-item .current .text {
        border: none;
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
        padding-bottom: 2px;
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
    
    .foods-wrapper .food-item .icon img {
        width: 67px;
    }
    
    .foods-wrapper .food-item .content {
        margin: 0;
        flex: 1;
        position: relative;
    }
    
    .foods-wrapper .food-item .content .name {
        margin: 2px 0 13px 0;
        height: 14px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7, 17, 27);
    }
    
    .foods-wrapper .food-item .content .desc {
        margin-bottom: 8px;
        line-height: 14px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    
    .foods-wrapper .food-item .content .extra {
        margin-bottom: 10px;
        line-height: 10px;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    
    .foods-wrapper .food-item .content .price {
        font-weight: 700;
        line-height: 24px;
    }
    
    .foods-wrapper .food-item .content .price .now {
        margin-right: 8px;
        font-size: 14px;
        color: rgb(240, 20, 20);
    }
    
    .foods-wrapper .food-item .content .price .old {
        text-decoration: line-through;
        font-size: 10px;
        color: rgb(147, 153, 159);
    }
    
    .content .cartcontrol-wrapper {
        position: absolute;
        right: 0;
        bottom: -4px;
        z-index: 40;
    }
</style>
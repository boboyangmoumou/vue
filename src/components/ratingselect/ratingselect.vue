<template>
    <div class="ratingselect">
        <div class="rating-type">
            <span class="block positive" :class="{'active':selectType===2}">{{desc.all}}
                <span class="count">47</span>
            </span>
            <span class="block positive" :class="{'active':selectType===0}">{{desc.positive}}
                <span class="count">37</span>
            </span>
            <span class="block negative" :class="{'active':selectType===1}">{{desc.negative}}
                <span class="count">7</span>
            </span>
        </div>
        <div class="switch">
            <span class="icon-check_circle"></span>
            <span class="text">只看有内容的评价</span>
        </div>
    </div>
</template>
<script>
    const POSITIVE=0;
    const NEGATIVE=1;
    const ALL=2;
    export default{
        props:{
            ratings:{
                type:Array,
                default(){
                    return [];
                }
            },
            selectType:{
                type:Number,
                default:ALL
            },
            onlyContent:{
                type:Boolean,
                default:false
            },
            desc:{
                type:Object,
                    default(){
                    return{
                        all:'全部',
                        positive:'满意',
                        negative:'不满意'

                    }
                }
            }
        }
    };
</script>
<style>
    .ratingselect .rating-type{
        padding:18px 0;
        margin:0 18px;
        border-bottom:1px solid rgba(7,17,27,0.1);
    }

    .ratingselect .block{
        display:inline-block;
        padding:8px 12px;
        margin-left:8px;
        border-radius:1px;
        font-size:12px;
        color:rgb(77,85,93);
    }

    .ratingselect  .count{
        margin-left:2px;
    }

    .ratingselect .positive{
        background:rgba(0,160,220,0.2);
    }

  .ratingselect  .active{
        background:rgb(0,160,220);
        color:#fff;
    }
    
  .ratingselect  .negative{
        background:rgba(77,85,93,0.2);
    }
   
</style>
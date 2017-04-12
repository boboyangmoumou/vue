<template>
  <!--<div>-->
    <!--<img src="./assets/logo.png">-->
    <!--<router-view></router-view>-->
    <div id="app">
      <v-header :seller="seller"></v-header>
      <div class="tab">
        <div class="tab-item">
          <!--<a v-link="{path:'/goods'}"></a>-->
          <router-link to="/goods">商品</router-link>
          </div>
        <div class="tab-item">
          <!--<a v-link="{path:'/ratings'}">评论</a>-->
          <router-link to="/ratings">评论</router-link>
          </div>
        <div class="tab-item">
          <!--<a v-link="{path:'/seller'}">商家</a>-->
          <router-link to="/seller">商家</router-link>
          </div>
      </div>
      <router-view :seller="seller"></router-view>
    </div>
</template>

<script>
    import header from './components/header/header.vue';
    const ERR_OK = 0;
    export default {
        data() {
            return {
                seller: {}
            };
        },
        created() {
            this.$http.get('/api/seller').then((response) => {
                response = response.body;
                if (response.errno === ERR_OK) {
                    this.seller = response.data;
                    // console.log(this.seller);
                }
            });
        },
        components: {
            'v-header': header
        }
    };
</script>

<style>
    * {
        margin: 0;
        padding: 0;
        list-style: none;
        font-weight: 200;
        /*line-height: 1;*/
        font-family: "微软雅黑";
    }
    
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
    }
    
    .tab {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    }
    
    .tab-item {
        flex: 1;
        text-align: center;
    }
    
    .tab-item a {
        text-decoration: none;
        display: block;
        color: #000;
        font-size: 14px;
        line-height: 40px;
    }
    
    .tab-item a.active {
        color: rgb(240, 20, 20);
    }
</style>
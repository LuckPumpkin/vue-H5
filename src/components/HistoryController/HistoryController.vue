<!--
 * @Descripttion: 
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2020-11-26 16:10:13
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2021-03-04 14:26:46
-->
<template>
    <div class="controller">
        <i :class="leftArrow" @click="onGoBack"></i>
        <i :class="rightArrow" @click="onForward"></i>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from 'vue-property-decorator'
    import { Route } from 'vue-router';
    @Component
    export default class HistoryController extends Vue{
        public leftArrow: string = "icon iconfont applicationicon-shangyiyebukedi active"
        public rightArrow: string = "icon iconfont applicationicon-xiayiyebukedian disabled"
        public history: Array<Route> = []
        public predict: Array<Route> = []

        @Watch("$route")
        onRouteChange(newVal: Route, oldVal: Route){
            let routeIndex: number = this.history.findIndex((ele: Route)=>{
                return  ele.name == newVal.name
            })
            if(routeIndex == -1){
                this.history.push(newVal)
                this.predict = []
                this.leftArrow = "icon iconfont applicationicon-shangyiyebukedi active"
                this.rightArrow = "icon iconfont applicationicon-xiayiyebukedian disabled"
            }else{
                this.predict = this.history.slice(routeIndex + 1)
                this.history = this.history.slice(0, routeIndex + 1)
                if(this.history.length > 0){
                    this.leftArrow = "icon iconfont applicationicon-shangyiyebukedi active"
                }else{
                    this.leftArrow = "icon iconfont applicationicon-shangyiyebukedi disabled"
                }
                if(this.predict.length > 0){
                    this.rightArrow = "icon iconfont applicationicon-xiayiyebukedian active"
                }else{
                    this.rightArrow = "icon iconfont applicationicon-xiayiyebukedian disabled"
                }
            }
            
        }

        onGoBack(){
            let from = this.$route.query.from
            this.$router.push({
                path: from? from : (this.history.length > 1? this.history[this.history.length-2].fullPath : this.$route.meta.backUrl)
            })
        }

        onForward(){
            if(this.predict.length > 0)
            this.$router.push({
                path: this.predict.length > 0? this.predict[0].fullPath :""
            })
        }
    }
</script>

<style scoped lang="less">
    .controller{
        height: 49px;
        padding-top: 1px;
        position: relative;
        background: #FAFAFC;
        display: flex;
        justify-content: center;
        align-items: center;
        &>i{
            font-size: 17px;
            margin: 0 30px;
            &.active{
                color: #060608;
            }
            &.disabled{
                color: #B0B0B2;
            }
        }
        &::after{
            content: "";
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            border-top: 1px solid #ECECED;
            transform: scaleY(0.5)
        }
    }
</style>
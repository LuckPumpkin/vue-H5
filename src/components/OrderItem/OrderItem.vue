<template>
    <div class="order-item">
        <div class="order-amount">
            <span class="order-amount__amount">{{orderInfo.limit}}万</span>
            <span class="order-amount__label">申请额度</span>
        </div>
        <div class="order-item-content">
            <div class="order-item__customer-name">
                客户名称：{{orderInfo.orderCustName}}
            </div>
            <div class="order-item__order-info">
                <span class="order-item_productName">{{orderInfo.productName}}</span>
                <span class="order-item_limited">{{orderInfo.dateSlip}}个月</span>
            </div>
        </div>
        <div class="order-item-operation">
            <van-button class="grab-btn" @click="onGrab" plain type="info">抢单</van-button>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Prop, Emit} from "vue-property-decorator"
    
    @Component
    export default class OrderList extends Vue {
     
        @Prop() orderInfo!: any

        @Emit("grab")
        onGrab(){
            return this.orderInfo
        }
    }
</script>

<style scoped lang="less">
    .order-item{
        display: flex;
        position: relative;
        padding: 15px 15px 15px 5px;
        background: #fff;
        .order-amount{
            width: 100px;
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            .order-amount__amount{
                font-size: 20px;
                line-height: 28px;
                color: #FA5D5D;
            }
            .order-amount__label{
                font-size: 12px;
                line-height: 17px;
                color: #999999;
            }
            &::after{
                content: "";
                position: absolute;
                width: 1px;
                top: 0;
                bottom: 0;
                right: 0;
                border-right: 1px solid #E1E1E1;
                transform: scaleX(0.5)
            }
        }
        .order-item-content{
            padding:5px 5px;
            display: flex;
            flex-direction: column;
            flex: 1;
            justify-content: center;
            align-items: flex-start;
            .order-item__customer-name{
                font-size: 14px;
                line-height: 20px;
                color: #333;
            }
            .order-item__order-info{
                margin-top: 9px;
                display: flex;
                justify-content: flex-start;
                .order-item_productName{
                    line-height: 18px;
                    font-size: 12px;
                    border-radius: 9px;
                    padding: 0 6px;
                    background-color: rgba(12, 142, 233, 0.1);
                    color: #0C8EE9;
                    margin-right: 10px;
                }
                .order-item_limited{
                    color: #999999;
                    font-size: 12px;
                    line-height: 18px;
                }
            }
        }
        .order-item-operation{
            width: 68px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 14px;
            width:60px;
            .grab-btn{
                height: 24px;
                line-height: 24px;
            }
        }

        &:not(:last-child)::after{
            content: "";
            display: block;
            position: absolute;
            bottom: 0;
            left: 0px;
            right: 0;
            border-bottom:1px solid #e5e5e5;
            transform: scaleY(0.5)
        }
    }
</style>
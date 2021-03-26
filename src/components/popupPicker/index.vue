<!--
 * @Descripttion: 
 * @version: 
 * @Author: yanan.zhao
 * @Date: 2020-05-26 11:15:32
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2021-01-06 18:15:35
--> 
<template>
    <van-popup v-model="show" position="bottom" :close-on-click-overlay="false">
        <div>
            <van-picker :default-index="selected" :show-toolbar="true" @confirm="onConfirmPopup" @cancel="onCancelPopup" :columns="columns" @change="onPickerChange"  ref='picker'/>
        </div>
    </van-popup>
</template>

<script lang="ts">
    import {Component, Vue, Prop, Emit, Watch} from "vue-property-decorator"
    @Component
    export default class PopupPicker extends Vue {

        @Prop() show!: boolean
        @Prop() columns!: Array<any>
        @Prop() columnsLength!: number
        @Prop() selected!: number
        
        public pickerResult: Array<string> = [this.columns[0].values[0]]

        @Emit("onCancel")
        onCancelPopup(){}

        @Emit("onConfirm")
        onConfirmPopup(values: any, index: any){
            return   !values[0] ? '' : values
        }

        @Emit("onPickerChange")
        onPickerChange(picker: any, values: any, index: any){
            this.pickerResult[index] = picker.getColumnValue(index)
            // console.log(this.$refs['picker'].setValues,values)
            return { values, index }
        }

        @Watch("columnsLength")
        onDataChange(newVal: number, old: number){
            if(newVal > old){
                this.pickerResult.push(this.columns[newVal - 1].values[0])
            }
        }
        // @Watch("show")
        // onSelectedChange(newVal: any, old: any){
        //     if(!this.selected){
            
        //         this.$refs.[picker].setValues(this.selected)
        //         // this.pickerResult = this.selected
        //     }

        // }
        created() {
            
        }
        
    }
</script>

<style scoped lang="less">
    .popup-header{
        padding:15px;
        border: 1px solid #e5e5e5;/*no*/
    }
</style>
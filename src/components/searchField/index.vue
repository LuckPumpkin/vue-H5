<template>
    <van-cell :title="label" title-class="search-field-title"  :required="required" value-class="search-field-value" class="search-filed-cell" ref="search-field">
        <van-field :placeholder="placeholder" class="search-field" :input-align="$attrs['input-align']" v-on="{..._events}" @input="onInput" autosize rows="1" type="textarea" ref="field" :value="value" @focus="onFocus">
            <template #button v-if='showButton'>
                <van-button  plain hairline icon="search" type="default" size="mini" @click='handleButton'/>
            </template>
        </van-field>
        <div :class="['van-field__error-message', getTextAlign(this.$attrs['error-message-align'])]" v-show="!!errorMessage">{{errorMessage}}</div>
        <ol class="action-panel" v-show="$attrs['show-actionlist'] && actionlist && actionlist.length > 0" ref="action-list">
            <li v-for="(item,index) in actionlist" :key="index" @click="onClickItem(item)" >{{item}}</li>  
        </ol>
    </van-cell>
</template>

<script lang="ts">
    import { Component, Vue, Prop, Emit, Watch, } from 'vue-property-decorator'
    @Component
    export default class SearchField extends Vue{
        @Prop() label?: string
        @Prop() placeholder?: string
        @Prop() actionlist?: Array<string>
        @Prop() value?: string
        @Prop() showButton?: string
        @Prop() required?: {
            type: boolean,
            default: false
        }
        public errorMessage: string = ''

        @Emit("input")
        onInput(value: string){
            this.errorMessage = ""
            return value
        }

        @Emit("select")
        onClickItem(name: string){
            this.onInput(name)
            return name
        }

        @Emit("required")
        onRequired(){
            return
        }

        @Watch("$attrs",{deep: true})
        onAttrsChange(newVal: any, old: any){
            if(newVal["error-message"] != old["error-message"]){
                this.errorMessage = newVal["error-message"]
            }
        }
        
        @Emit("focus")
        onFocus(){
            if(this.$attrs["required-value"] === "" || this.$attrs["required-value"] === null){
                let field: any = this.$refs["field"]
                field.blur()
                this.onRequired()
            }
        }
        @Emit("handleButton")
        handleButton() {
            return
        }


        getTextAlign(align: string): string{
            let propTextAlign = align || "left"
            let classify: any = {
                left: "text-left",
                right: "text-right",
                center: "text-center"
            }
            return classify[propTextAlign]
        }
    }
</script>

<style scoped lang="less">
    .search-filed-cell{
        overflow: visible;
    }
    .search-field-title{
        max-width: 90px;
    }
    .search-field{
        padding:0;
        .van-field__label{
			max-width: 110px;
		}
    }
    .search-field-value{
        position: relative;
        overflow: visible;
        .action-panel{
            position: absolute;
            top: 24px;
            left: 0;
            right: 0;
            padding: 5px 0;
            border: 1px solid #e5e5e5;/*no*/
            z-index: 1000;
            background-color: #fff;
            box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
            max-height: 190px;
            overflow-y: auto;
            li{
                line-height: 36px;
                padding:0 10px;
                text-align: left;
            }
        }
        .van-cell:not(:last-child)::after{
            border-bottom: none;
        }
    }
    
</style>
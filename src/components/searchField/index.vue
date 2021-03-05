<!--
 * @Descripttion:
 * @version:
 * @Author: yanan.zhao
 * @Date: 2021-03-05 10:27:58
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2021-03-05 11:44:35
-->
<template>
  <div class='search-field-value'>
    <van-field :placeholder="placeholder" :label="$attrs['label']" class="search-field" input-align="right" v-on="{..._events}" @input="onInput" autosize rows="1" type="textarea" ref="field" v-model="value" @focus="onFocus" @blur="onBlur" :rules="rules">
      <template #button v-if='showButton'>
          <van-button  plain hairline icon="search" type="default" size="mini" @click='handleButton'/>
      </template>
    </van-field>
    <ol class='action-panel' v-if='showActionlist && activeList && activeList.length > 0'>
      <li v-for='(item,index) in activeList' :key='index' @click='onClickItem(item)'>{{item}}</li>
    </ol>
  </div>
</template>

<script>
import utilsTools from '@/utils/utils.js';
export default {
  props: ['placeholder', 'value', 'rules', 'activeList', 'showButton', 'showActionlist'],
  data() {
    return {
      errorMessage: ''
    }
  },
  watch: {
    $attrs: {
      handler(n, o) {
        if (n.errorMessage != o.errorMessage) {
          this.errorMessage = n.errorMessage;
        }
      },
      deep: true,
    },
  },
  methods:{
    onFocus() {
      if(this.$attrs["required-value"] === "" || this.$attrs["required-value"] === null){
        this.$refs["field"].blur()
        this.onRequired()
      }
      this.$emit('focus')
    },
    onInput(value) {
      this.errorMessage = ""
      return value
    },
    handleButton() {
      this.$emit('handleButton')
    },
    onRequired(){
      this.$emit('required')
    },
    onClickItem(value){
      this.onInput(value)
      this.$emit('select')
    },
    onBlur(e) {
      if (this.rule && this.rule.length > 0) {
        let result = utilsTools.validRule(this.value, this.rule);
        this.errorMessage = result || '';
      }
      return e;
    },
  }

}
</script>


<style lang="less" scoped>
.search-field-value{
    position: relative;
    overflow: visible;
    .action-panel{
        position: absolute;
        top: 43px;
        left: 0;
        right: 0;
        padding: 5px 0;
        border: 1px solid #e5e5e5;/*no*/
        z-index: 1000;
        background-color: #fff;
        box-shadow: 0 3px 5px rgba(0, 0, 0, 0.1);
        max-height: 190px;
        overflow-y: auto;
        margin-left: 140px;
        margin-right: 10px;
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

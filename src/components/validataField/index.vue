<!--
 * @Descripttion:
 * @version:
 * @Author: yanan.zhao
 * @Date: 2021-03-04 20:00:23
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2021-03-05 11:20:28
-->
<template>
  <van-field
    :rules="rules"
    :label="label"
    :error-message="errorMessage"
    :placeholder="placeholder"
    input-align="right"
    error-message-align="right"
    v-on="{ input: onInput, blur: onBlur, focus: onFocus }"
  >
    <template slot="label">
      <slot name="label"></slot>
    </template>
    <template slot="left-icon">
      <slot name="left-icon"></slot>
    </template>
    <template slot="right-icon">
      <slot name="right-icon"></slot>
    </template>
    <template slot="button">
      <slot name="button"></slot>
    </template>
  </van-field>
</template>

<script>
import utilsTools from '@/utils/utils.js';
export default {
  props: ['value', 'readonly', 'placeholder', 'rules', 'label'],
  data() {
    return {
      errorMessage: '',
    };
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
  methods: {
    onBlur(e) {
      if (this.rule && this.rule.length > 0) {
        let result = utilsTools.validRule(this.value, this.rule);
        this.errorMessage = result || '';
      }
      return e;
    },
    onFocus(e) {
      if (this.errorMessage) {
        this.errorMessage = '';
      }
      return e;
    },
    onInput(v) {
      return v;
    }
  },
};
</script>

<style lang="less"></style>

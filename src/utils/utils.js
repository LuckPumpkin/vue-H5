/*
 * @Descripttion:
 * @version:
 * @Author: yanan.zhao
 * @Date: 2021-03-04 20:21:21
 * @LastEditors: yanan.zhao
 * @LastEditTime: 2021-03-04 21:09:09
 */

// 校验单个字段的所有rule
const validRule = (value, rules) => {
  for (let i in rules) {
    if (rules[i].hasOwnProperty('required')) {
      console.log(value);
      if (!value) {
        return rules[i].message;
      }
    }
    if (rules[i].hasOwnProperty('min')) {
      if (!isNaN(value)) {
        return '请输入数字';
      }
      if (parseFloat(value) < rules[i].min) {
        return rules[i].message;
      }
    }
    if (rules[i].hasOwnProperty('max')) {
      if (isNaN(value)) {
        return '请输入数字';
      }
      if (parseFloat(value) > rules[i].max) {
        return rules[i].message;
      }
    }
    if (rules[i].hasOwnProperty('pattern')) {
      if (!rules[i].pattern.test(value)) {
        return rules[i].message;
      }
    }
    if (rules[i].hasOwnProperty('function')) {
      if (!rules[i].function(value)) {
        return rules[i].message;
      }
    }
  }
  return false;
};

// 校验所有字段的所有rule
const validRuleAll = (values, rules) => {
  let vaildResult = [];
  for (let i in values) {
    vaildResult.push({
      key: i,
      message: validRule(values[i], rules[i]),
    });
  }
  let filtered = vaildResult.filter(v => v.message);
  return filtered.length > 0 ? filtered : false;
};

export default {
  validRule,
  validRuleAll,
};

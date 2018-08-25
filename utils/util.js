// 封装策略对象
var strategys = {
  'isNotEmpty': function (value, errorMsg) {
    if (value == '') return errorMsg;
  },
  'minLength': function (value, len, errorMsg) {
    if (value.length < len) return errorMsg;
  },
  'mobileFormat': function (value, errorMsg) {
    if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) return errorMsg;
  }
}
var Validator = function () {
  this.cache = [];
}
Validator.prototype.add = function (value, rule, errorMsg) {
  //只有一个校验规则的时候
  var str = rule.split(':');//把minLength:6分割
  this.cache.push(function () {
    var strategy = str.shift();//删掉数组第一个元素，并返回被删除的元素
    str.unshift(value);//添加元素至数组第一位
    str.push(errorMsg);
    return strategys[strategy].apply(null, str)//把不定参传进校验函数
  })
}
Validator.prototype.start = function () {
  var validatorFunc = this.cache;
  var result = [];
  for (var i = 0; i < validatorFunc.length; i++) {
    var msg = validatorFunc[i]();//执行校验函数
    if (msg) result[i] = msg;
  }
  return result;
}

module.exports = {
  Validator: Validator
}

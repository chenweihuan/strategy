## 使用策略模式进行表单效验
#### 实习做微信小程序项目的时候曾经做过表单验证，多个页面共用一套校验规则，当时不会封装，最近看了设计模式，就写了这个。

### 第一步：封装策略对象
```
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
```
### 第二步：声明验证函数Validator
```
var Validator = function () {
  this.cache = [];
}
```
### 第三步：给Validator函数添加add和start方法。
```
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
```
### 第四步：添加数据到校验规则，开始校验。
```
  var validator = new util.Validator(); // 创建一个Validator对象
  /* 添加一些效验规则 */
  validator.add(this.data.username, 'isNotEmpty', '用户名不能为空');
  validator.add(this.data.password, 'minLength:6', '密码长度不能小于6位');
  validator.add(this.data.telephone, 'mobileFormat', '手机号码格式不正确');
  var errorMsg = validator.start(); // 获得效验结果
  this.setData({ errorMsg: errorMsg})
  if(errorMsg.length == 0)console.log("验证通过，ajax提交数据")
```

#### 参考链接：https://www.cnblogs.com/tugenhua0707/p/5198407.html#_labe7
> 如有不当或需改进之处，请君指出，感谢万分！！！

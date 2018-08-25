const app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    username:'',
    password:'',
    telephone:''
  },
  bindKeyInput: function (e) {
    let inputName = e.currentTarget.dataset.inputname;
    this.setData({
      [inputName]: e.detail.value
    })
  },
  submit(){
    var validator = new util.Validator(); // 创建一个Validator对象
    /* 添加一些效验规则 */
    validator.add(this.data.username, 'isNotEmpty', '用户名不能为空');
    validator.add(this.data.password, 'minLength:6', '密码长度不能小于6位');
    validator.add(this.data.telephone, 'mobileFormat', '手机号码格式不正确');
    var errorMsg = validator.start(); // 获得效验结果
    this.setData({ errorMsg: errorMsg})
    if(errorMsg.length == 0)console.log("验证通过，ajax提交数据")
  }
})

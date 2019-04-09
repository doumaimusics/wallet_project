
export default class Http {
  get (methods, param, callback) {
  }

  post (_this,methods, data , callback) {
    var url = global.ajaxUrl + methods
    //检测是否有token
    global.inspectCookin(_this,2)
    if (!global.inspectCookin(_this,2)){
      return
    }
    data.token = _this.getCookie('token');
    data.mobileType = 4;
    _this.$http.post(url, data).then(
      function (data) {
        if(data.data.resCode == -1){
          _this.delCookie('userName')
          _this.delCookie('token')
          global.inspectCookin(_this,2)
        }
        callback(data)
      }
    )
  }

  // 不传token，但是判断有没有token
  post_ (_this,methods, data , callback) {
    var url = global.ajaxUrl + methods
    if (_this.getCookie('token')) {
        data.token = _this.getCookie('token');
        data.mobileType = 4;
        _this.$http.post(url, data).then(function (data) {
          if(data.data.resCode == -1){
            _this.delCookie('userName')
            _this.delCookie('token')
            global.inspectCookin(_this,2)
          }
          callback(data)
        })
    }
  }

  // 不传token，也不判断token
  _post (_this,methods, data , callback) {
    var url = global.ajaxUrl + methods;
    data.mobileType = 4;
    _this.$http.post(url, data).then(callback)
  }

  // 有token就传 没有就不传
  investPost (_this,methods, data , callback) {
    if (_this.getCookie('token')) {
      data.token = _this.getCookie('token')
    }
    var url = global.ajaxUrl + methods;
    data.mobileType = 4;
    _this.$http.post(url, data).then(callback)
  }


  patch (methods, data, callback) {
  }

  put (methods, data, callback) {
  }

  delete (methods, data, callback) {
  }

  headers () {
    let header = {
      'Content-Type': 'application/json'
    }
    header.Authorization = global.user.token
    return header
  }
}

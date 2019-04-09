  global.inspectCookin = function(_this,val) {
    // val = 1为直接出登录弹框  其他值为提示后出现登录框
    if(!_this.getCookie('token')){
      _this.getOne = val
      val == 1?_this.$emit('sigeinfo',true,'second'):global.prompt(_this);
      return false;
    } else {
      _this.token = _this.getCookie('token')
      return true
    }
  }

// 发送请求的时候验证登录信息是否失效
  global.prompt=function(_this) {
    _this.$confirm('对不起！由于登录信息丢失，请重新登录', '温馨提示', {
      confirmButtonText: '确定',
      showCancelButton:false,
      type: 'warning'
    }).then(() => {
      _this.$emit('sigeinfo',true,'second');
      _this.login = false;
    }).catch(() => {
      _this.$router.push('/home')
    });
    return;
  }

  // 判断新浪浙商
  global.checkBank = function (_this) {
    global.http.post_(_this,"/account/basic",{},data => {
      if (data.data.resCode == 1) {
        let info  = data.data.resData.basicModel
        let isRealName = info.realNameStatus
        let isBindCard
        info.sinaBankCardCount==0? isBindCard = false :isBindCard = true
        sessionStorage.setItem("isRealName", isRealName);
        sessionStorage.setItem("isBindCard", isBindCard);
        // 判断开通存管
        if (info.bankOpenStatus == 1) {  // 只开通了新浪
          sessionStorage.setItem("sina", true);
          sessionStorage.setItem("zs", false);
        }else if (info.bankOpenStatus == 2) {  // 只开通了浙商
          sessionStorage.setItem("sina", false);
          sessionStorage.setItem("zs", true);
        }else if (info.bankOpenStatus == 3) {  // 都开通
          this.isZheshang = true
          sessionStorage.setItem("sina", true);
          sessionStorage.setItem("zs", true);
        } else if (info.bankOpenStatus == 0) {  // 都没开通
          sessionStorage.setItem("sina", false);
          sessionStorage.setItem("zs", false);
        }
      }
    })
  }
  

  
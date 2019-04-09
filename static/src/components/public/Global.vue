<script type="text/javascript">
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
import $ from 'jquery'

var SYSTEM_URL;
var host = window.location.host;

if(host == 'ywww.edspay.com' || host == 'www.edspay.com'){
  SYSTEM_URL = {
    rest_url:'https://rest.edspay.com',
    sso_url:'https://sso.edspay.com',
    tzj_url:'https://3rdpart.edspay.com', 
    host_url:'https://www.edspay.com/#/',
    xhzt_url:'https://3rdpart.edspay.com',
    loan_url:'https://eca.51fanbei.com'
  }
}else if(host == 'test1static.edspay.com'){
  SYSTEM_URL = {
    rest_url:'https://test1rest.edspay.com',
    sso_url:'https://test1sso.edspay.com',
    tzj_url:'https://test33rdpart.edspay.com',
    host_url:'https://test1static.edspay.com/#/',
    xhzt_url:'https://test33rdpart.edspay.com',
    loan_url:'http://testeca.91ala.com:1112'
  }
}else if(host == 'test2static.edspay.com'){
  SYSTEM_URL = {
    rest_url:'https://test2rest.edspay.com',
    sso_url:'https://test2sso.edspay.com',
    tzj_url:'https://test33rdpart.edspay.com',
    host_url:'https://test2static.edspay.com/#/',
    xhzt_url:'https://test33rdpart.edspay.com',
    loan_url:'https://yeca.51fanbei.com/'    // 预发环境
  }
}else if(host == 'test3static.edspay.com'){
  SYSTEM_URL = {
    rest_url:'https://test3rest.edspay.com',
    sso_url:'https://test3sso.edspay.com',
    tzj_url:'https://test33rdpart.edspay.com',
    host_url:'https://test3static.edspay.com/#/',
    xhzt_url:'https://test33rdpart.edspay.com',
    loan_url:'http://testeca.91ala.com:1112'
  }
}else if(host == 'test4static.edspay.com'){
  SYSTEM_URL = {
    rest_url:'https://test4rest.edspay.com',
    sso_url:'https://test4sso.edspay.com',
    tzj_url:'https://test3rdpart.edspay.com',
    host_url:'https://test2static.edspay.com/#/',
    xhzt_url:'https://test33rdpart.edspay.com',
    loan_url:'http://testeca.91ala.com:1112'
  }
}else{
  SYSTEM_URL = {
    rest_url:'https://test2rest.edspay.com',
    sso_url:'https://test2sso.edspay.com',
    tzj_url:'https://test33rdpart.edspay.com',
    host_url:'https://test2static.edspay.com/#/',
    xhzt_url:'https://test33rdpart.edspay.com',
    loan_url:'http://testeca.91ala.com:1112'
  }
}


function getUrl (num) {
  if(num == 1){                  // rest接口服务器 
    return SYSTEM_URL.rest_url
  }else if(num == 2){            //  sso登录信息服务器
    return SYSTEM_URL.sso_url
  }else if(num == 3){            //  投之家对接服务器
    return SYSTEM_URL.tzj_url
  }else if(num == 4){            //  官网当前域名获取
    return SYSTEM_URL.host_url
  }else if(num == 5){            //  心火对接服务器（同投之家）
    return SYSTEM_URL.xhzt_url
  }else if(num == 6){            //  借吧接口服务器
    return SYSTEM_URL.loan_url
  }
}

export default
{
  getUrl,
}
</script>
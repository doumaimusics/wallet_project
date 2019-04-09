import Vue from 'vue'

// 自定义指令
Vue.directive('btn',{
  inserted: function(el,binding){
    el.style.backgroundColor = '#ff5b4c';
    el.style.backgroundImage = 'linear-gradient(45deg,#FF6554,#FF3E38)';
    el.style.height = '1.066667rem';
    el.style.width = '8.773333rem';
    el.style.color = '#fff';
    el.style.margin = ' 0 auto';
    el.style.borderRadius = '0.106667rem';
    el.style.lineHeight = '1.066667rem';
    el.style.textAlign = 'center';
    el.style.fontSize = '0.426667rem';
  }
})

//全屏浮动div
Vue.directive('layer',{
  inserted: function(el,binding){
    el.style.backgroundColor = 'rgba(0,0,0,.5)';
    el.style.height = '100%';
    el.style.width = '100%';
    el.style.position = 'fixed';
    el.style.top = 0;
    el.style.left = 0;
    el.style.zIndex = 888;
  }
})


// 网站title
Vue.directive('title', {
  inserted: function (el, binding) {
    document.title = el.innerText
    el.style.display = 'none'    // 兼容IE
    el.remove()
  }
})


// 网站描述
Vue.directive('description', {
  inserted: function (el, binding) {
    let metaList = document.getElementsByTagName("meta");
    for (let i = 0; i < metaList.length; i++) {
      if (metaList[i].getAttribute("name") == "description") {
        metaList[i].content = el.innerText;
      }
    }
    el.style.display = 'none'    // 兼容IE
    el.remove()
  }
})


// 网站关键词
Vue.directive('keywords', {
  inserted: function (el, binding) {
    let metaList = document.getElementsByTagName("meta");
    for (let i = 0; i < metaList.length; i++) {
      if (metaList[i].getAttribute("name") == "keywords") {
        metaList[i].content = el.innerText;
      }
    }
    el.style.display = 'none'    // 兼容IE
    el.remove()
  }
})
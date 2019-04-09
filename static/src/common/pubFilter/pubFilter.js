import Vue from 'vue'

// number类型保留两位小数
Vue.filter('returnFloat',function(value,n){
    // value ? value:0
    var value=Math.round(parseFloat(value)*100)/100;
    var xsd=value.toString().split(".");

    if ( n==1 ) {
        if(xsd.length==1){
            value=value.toString()+".0";
            return value;
        }
        if(xsd.length>1){
            if(xsd[1].length<2){
               return value;
            } else {
                value = parseInt(value*10)/10
            }
        return value;
        }
    } else {
        if(xsd.length==1){
            value=value.toString()+".00";
            return value;
        }
        if(xsd.length>1){
            if(xsd[1].length<2){
               value=value.toString()+"0";
            }
        return value;
        }
    }
    
});



// number类型保留一位小数
Vue.filter('returnFloat1',function(value){
    var value=Math.round(parseFloat(value)*100)/100;
    var xsd=value.toString().split(".");
    if(xsd.length==1){
        value=value.toString()+".0";
    } else if(xsd.length>1){
        if(xsd[1].length>1){
           value=xsd[0]+"."+xsd[1][0]
        }
    }
    return value;
});

//金额添加两位小数，加逗号
Vue.filter('moneyFormat',function(money,num){ // num = 1 1000转换成1,000
    money ? money : '0'
    if(num == 1){
        if(money == 0){
            return money;
        }else{
            var n = 2;
            money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = money.split(".")[0].split("").reverse(), r = money.split(".")[1];
            var t = "";
            for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return  t.split("").reverse().join("");
        }
    }else{
      if(money == 0){
            return "0.00";
        } else if (money<0){
            money  = Number(money.toString().substr(1))
            var n = 2;
            money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = money.split(".")[0].split("").reverse(), r = money.split(".")[1];
            var t = "";
            for (var i = 0; i < l.length; i++) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return  '-'+t.split("").reverse().join("") + "." + r;
        } else{
            var n = 2;
            money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
            var l = money.split(".")[0].split("").reverse(), r = money.split(".")[1];
            var t = "";
            for (var i = 0; i < l.length; i++) {
            t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
            }
            return  t.split("").reverse().join("") + "." + r;
        }
    }

});

//毫秒转换成时间戳 2014-09-04 15:25:58
Vue.filter('transFormatDate',function(value,num){
    function formatDate(now) {
        var year=now.getFullYear();
        var month=((now.getMonth()+1)<10?'0':'')+(now.getMonth()+1);
        var day=(now.getDate()<10?'0':'')+now.getDate();
        var hour=now.getHours();
        var minute=(now.getMinutes()<10?'0':'')+now.getMinutes();
        var second=(now.getSeconds()<10?'0':'')+now.getSeconds();

        if(num == 1){
            return year+"-"+month+"-"+day;
        }else if(num == 2){
            return year+"年"+month+"月"+day+"日";
        }else if(num == 3){
             return year+"."+month+"."+day+" "+hour+":"+minute+":"+second;
        }else if(num == 4){
            return year+"-"+month+"-"+day+" "+hour+":"+minute;
        }else{
            return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
        }
    }
    if(value==null ||value==''){
        return '-';
    }
    var val = Number(value)
    var d = new Date(val);
    return formatDate(d);
})

//后台返回2017—07—05 12:37:28 转换成 2017—07—05
Vue.filter('divisionTime',function(time,num){
    time ? time : '0'
    var time1 = time.split(" ")[0];
    if(num == 1){
        return time1.substr(-5)
    }else{
        return time1
    }
})

// 手机号码中间四位加密
Vue.filter('phoneNumber',function(phone){
    let myTel = phone.substring(0,3)+"****"+phone.substring(7,11)
    return myTel
})

// 手机号码只留前后一位 中间加密
Vue.filter('appPhoneNum',function(phone){
    let myTel = phone.substring(0,1)+"****"+phone.substring(10,11)
    return myTel
})

//截取字符串前九位
Vue.filter('strNum',function(stri) {
    let strLg = stri.substring(0,9)
    return strLg
});

// 隐藏银行卡 只保留后四位尾号
Vue.filter('hideBankNo',function(no,num){
  no = no + '';
  let myNo = "*** *** *** "+no.substr(-4)
  if(num == 1){
    myNo = no.substring(0,4)+'*********'+no.substr(-4)
  }else if(num == 2){
    myNo = no.substring(0,3)+'*********'+no.substr(-4)
  }
  return myNo
})


// 计算红包剩余时间
Vue.filter('getRestTime',function(curTime,endTime){
  let cur = new Date(curTime.split(" ")[0])
  let end = new Date(endTime.split(" ")[0])
  let time = end.getTime() - cur.getTime();
  let day = Math.floor(time/86400000);
  return day
})

// 数字转换成万
Vue.filter('changeWan',function(num){
  num ? num : num = 0
  let result
  if (num.toString().length >= 5) {
    if (num%10000 == 0) {
        result=num/10000
    } else {
        result=(num/10000).toFixed(2);
    }
    result=result+"万";
  } else {
    result = num
  }
  return result
})

// 数字转换成单位
Vue.filter('changeBillion',function(num){
    num ? num : num = 0
    let result
    if (parseInt(num).toString().length >= 9) {
        let bill = parseInt(num/100000000)+"<span>亿</span>";
        let mill = num.substr(-8,4) + "<span>万</span>"
        let thou =  num.substr(-4,4)
        result = bill + mill + thou
    } else if (parseInt(num).toString().length >= 5 && parseInt(num).toString().length < 9){
        let mill = parseInt(num / 10000) + "<span>万</span>"
        let thou = num.toString().substr(-4,4)
        result = mill + thou
    } else if (parseInt(num).toString().length < 5) {
        result=num/1000;
        result=Math.round((num /1000) * 100) / 100+"<span>千</span>";
    } else {
        result = num
    }
    return result
  })

//取字符串后四位
Vue.filter('lastFour',(num) => {
    var str = num;
    str = str.toString();
    str = str.substring(str.length-4,str.length);
    return str
})

// 计算平台加息和vip加息总和
Vue.filter('allApr',(item) => {
    let sum = item.addApr + item.vipUprateApr	
    var value=Math.round(parseFloat(sum)*100)/100;
    var xsd=value.toString().split(".");
    if(xsd.length==1){
        value=value.toString()+".0";
    } else if(xsd.length>1){
        if(xsd[1].length>1){
           value=xsd[0]+"."+xsd[1][0]
        }
    }
    return value;
})

//金额以‘万’为单位输出且保留两位小数，足1万按加逗号规则输出
Vue.filter('moneyWan',function(money){
    var changeMoney = money.toString();
    if(money == 0){
        changeMoney =  "0.00";
    }else if(changeMoney.length >= 5){
        var strLenght = changeMoney.length-4;
        changeMoney = changeMoney.slice(0,strLenght)+'.'+changeMoney.slice(strLenght,(strLenght+4));
        changeMoney = changeMoney.slice(0, changeMoney.length-2) + '万';
    }else{
        var n = 2;
        money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
        var l = money.split(".")[0].split("").reverse(), r = money.split(".")[1];
        var t = "";
        for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
        }
        changeMoney =  t.split("").reverse().join("") + "." + r;
    }
    return changeMoney
})

Vue.filter('moneyTwo',function(money){
    money =  Math.floor(money * 100) / 100 

    var n = 2;
    money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    var l = money.split(".")[0].split("").reverse(), r = money.split(".")[1];
    var t = "";
    for (var i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return  t.split("").reverse().join("") + "." + r; 
})

// 绝对地址截取域名 www.edspay.com/#/wxInvestIn/wxZsInvestResult 转换成 /wxInvestIn/wxZsInvestResult
Vue.filter('delHost',function(link){
    let i=link.indexOf("#")+1
    let tolink=link.substring(i,link.length)
    return  tolink 
})

Vue.filter('countDownTime',function(interval,type){

    function formate(time) {
        if(time>=10){
            return time
        }else{
            return `0${time}`
        }
    }

    let leftTime = interval;
    let d = parseInt(leftTime/(24*60*60))
    let h = formate(parseInt(leftTime/(60*60)))
    let m = formate(parseInt(leftTime/60%60))
    let s = formate(parseInt(leftTime%60))
    if(type == 1){
        return `${h}:${m}:${s}`
    }else{
        return `${h}小时${m}分${s}秒`
    }
})

// 计算积分折扣 四舍五入，取整
Vue.filter('discountCount' ,function(num1,num2,n){
    return Math.round(num1*(num2 / n))
})
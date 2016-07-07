
tingfeng.timeUtils={
		/**从毫秒转换为时间的字符串,第一个参数-->代表时间的毫秒数,wayToget--->返回的字符串方式
		 * @param item 当前毫秒数
		 * @param wayToget 返回的显示时间的方式,0表示年-月-日;其它如1,表示月/日/年
		 * @returns
		 */
		getTime:function(item,wayToget){
			if(typeof item=='undefind'||!item)
				return "无";
			if(typeof item!='number')
				return item;
			//console.info("当前wayToget的值是--->"+wayToget);
			if(typeof wayToget=='undefined'||!wayToget)
				wayToget=0;
			var newTime = new Date(item); //就得到普通的时间了
			if(newTime!=0&&!newTime)
			{   //alert('newTime');
				return item;
			}
			var fullYear = newTime.getFullYear();
			var month = newTime.getMonth() + 1;
			var day = newTime.getDate();
			var hours = newTime.getHours();
			var minutes = newTime.getMinutes();
			var second = newTime.getSeconds();
			var wayString=null;
			if(wayToget==0)
			wayString=(fullYear + "-" + month + '-' + day + '  ' + hours + ':'
					+ minutes + ':' + second);
			else
			wayString=(month + '/' + day +'/'+fullYear+ '  ' + hours + ':'
					+ minutes + ':' + second);
			console.info("getTime当前返回的字符串是-->"+wayString);
			return wayString.toString();
		},
	 /**对Date的扩展，将 Date 转化为指定格式的String * 月(m)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(w)、季度(q)
		可以用 1-2 个占位符 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) * eg: * (new
		formate(date,"yyyy-mm-dd hh:mm:ss.S")==> 2006-07-02 08:09:04.423      
	 * formate(date,"yyyy-mm-dd w HH:mm:ss") ==> 2009-03-10 二 20:09:04      
	 * formate(date,"yyyy-mm-dd ww hh:mm:ss") ==> 2009-03-10 周二 08:09:04      
	 * formate(date,"yyyy-mm-dd www hh:mm:ss") ==> 2009-03-10 星期二 08:09:04      
	 * formate(date,"yyyy-m-d h:m:s.S") ==> 2006-7-2 8:9:4.18
	 *@param date一个时间对象
	  @param fmt 一个格式化字符串
	 */        
	formate:function(date,fmt) {         
		var o = {         
		"m+" : date.getMonth()+1, //月份         
		"d+" : date.getDate(), //日         
		"h+" : date.getHours()%12 == 0 ? 12 : date.getHours()%12, //小时
		"H+" : date.getHours(), //小时         
		"m+" : date.getMinutes(), //分         
		"s+" : date.getSeconds(), //秒         
		"q+" : Math.floor((date.getMonth()+3)/3), //季度         
		"S" : date.getMilliseconds() //毫秒         
		};         
		var week = {         
		"0" : "/u65e5",         
		"1" : "/u4e00",         
		"2" : "/u4e8c",         
		"3" : "/u4e09",         
		"4" : "/u56db",         
		"5" : "/u4e94",         
		"6" : "/u516d"        
		};         
		if(/(y+)/.test(fmt)){         
			fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));         
		}         
		if(/(w+)/.test(fmt)){         
			fmt=fmt.replace(RegExp.$1, ((RegExp.$1.length>1) ? (RegExp.$1.length>2 ? "/u661f/u671f" : "/u5468") : "")+week[date.getDay()+""]);         
		}         
		for(var k in o){         
			if(new RegExp("("+ k +")").test(fmt)){         
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));         
			}         
		}         
		return fmt;         
	} , 
		/**
		 * 
		 * @param callBack
		 * @param intervalTime
		 * @returns Timer对象，定时器作用
		 */
		getTimer:function(callBack,intervalTime){
			var ti=new tingfeng.commonObj.Timer(intervalTime,callBack);
			return ti;
		},
		/**
		 *一个定时器
		 *@param call 一个回调函数
		 *@param time 在time时间之后回调call函数，单位毫秒
		 */
		setTimeout:function(call,time){
			var call_back=function(){
				call();
			};
			setTimeout(call_back(),time);
		}

		

}


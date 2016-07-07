/*the next version 1.2
	   1.增加字母/数字/中文/字符等校验方式;
	   2.增加javascript注入检测;
	   3.remote校验方式;
	*还可以增加中文字符,字母,字母数字,标点符号,javascript注入的校验;
	*
	*/
			/*'remote':{
			   url:,
			   dataType:,
			   data:,
			   type:,
			   callBack:function(value,data){
				return "";
			   }					
			}*/
/*
*@params 表示当前传入的参数
*@msgs 是错误提示信息
*/
tingfeng.domObj.formValidate=function(params,msgs){	
      //错误的时候才显示的信息,只能校验32位以内的数字;
    var self=this;  
    self.tingfeng_validateMsg={
           "required":"必输字段", 
           "remote":"",//实际上此验证方式将会调用ajax然后回调一个用户指定的函数,由用户返回一个true或者一个包含错误信息的字符串;
           "mobile":"请输入正确的手机号",
           "email":"请输入正确格式的电子邮件",
           "url":"请输入正确格式的网址",
           "date":"请输入正确格式的日期,如1991-7-25",//YYYY-MM-DD格式
           "dateTime":"请输入正确格式的日期和时间,如1991-7-25 12:20:34",//YYYY-MM-DD HH:MM:ss格式
           "number":"请输入合法的数字",
           "digits":"请输入整数",
           "equalTo":"两次输入的值不一样",
           "length":"请输入长度介于{0}和{1}之间的字符串",//参数按照{X}占位符的方式依次替换;
           "max":"输入值不能大于{0}",
           "min":" 输入值不能小于{0}",
           "dataType":"",//dataType为自定义校验方式,实际上传入一个正则表达式/sss/i,并返回匹配的结果;
           "extend":"",//扩展方法,传入选中的值,反对一个true,或者一个包含错误信息的字符串;
           "msg":"",//如果用户定义了msg,那么将会替换默认的msg信息;
      };
	  self.formValidate_params={
					  "justValidate":false,//只是验证,不修改和增加错误信息
					  "isRightMsg":false,//在input的右边显示错误信息,默认为false,默认在input的下边显示错误信息!
					  "rules":{},
					  "ids":{},//用来记录生存错误信息的id的编号,
					  "validateWhenInit":true,//在初始化之后是否自动校验;
					  //"errorMsgCount":0,//当前显示错误信息的编号,方便节点的创建和取消
					  "validatedWhenFocus":false,//当获取焦点的时候是否进行校验;
					  "validatedWhenBlur":true,//当失去焦点的时候是否进行校验;
					  "validatedWhenChange":true,//当输入值改变的时候是否进行校验;
					  "version":1.1,
					  "author":'wg huitoukest',//此版本的remote校验方式尚未测速,不推荐使用;
					  "isTrim":true,//校验内容的时候是否默认去掉首尾空格,仅对required和length两个属性生效
				};
		self.init:function(param){
				     if(typeof param!='undefined')
					 for(var p in param)
					{
					 self.params[p]=param[p];	
					}
				  var pp=self.params;
				  var count=0;
				  for(var p in pp.rules)
				  {//产生其浏览次序的编号
				     count++;
					 pp.ids[p]=count;
				  }
				  var va={
				    formValidate_params:pp,
                    validWithMsg:function(){//返回校验结果,并显示错误信息;
					self.formValidate_params.justValidate=false;
					return tingfeng_rules_validateAll(self.formValidate_params);
					},
					valid:self.validWithOutMsg,
					validWithOutMsg:function(){//返回校验结果,不显示错误信息;
						self.formValidate_params.justValidate=true;
					return tingfeng_rules_validateAll(self.formValidate_params);
					},
					clearAllMsg:function(){
						tingfeng_clearAllValidateErrorMsg(self.formValidate_params);
					},//清除所有错误信息,方法				  
				    };
					tingfeng_validate_init(va.formValidate_params);				
				  return tingfeng_common_clone(va);
		};			
	self.tingfeng_common_trim=function(v)
	{   return tingfeng.stringUtils.trim(v);
	};
	//对象深度复制
	self.tingfeng_common_clone=function(target) {   
			return tingfeng.objectUtils.clone(target);
    };
    
	self.tingfeng_validate_init=function(formValidate_params){
	  var r=formValidate_params.rules;
	  if(formValidate_params.validatedWhenFocus){
		for(var p in r)
		{	$(p).focus(function(){
				tingfeng_rules_validateAll(formValidate_params);
			});
		}
	  }
	  if(formValidate_params.validatedWhenBlur){
		for(var p in r)
		{	$(p).blur(function(){
				tingfeng_rules_validateAll(formValidate_params);
			});
		}
	  }
	 if(formValidate_params.validatedWhenChange){
		for(var p in r)
		{	$(p).on('input',function(e){
				tingfeng_rules_validateAll(formValidate_params);
			});
		}
	  }
	};	
 	//返回校验所有的结果
	self.tingfeng_rules_validateAll=function(formValidate_params)
	{ 	if(typeof r=='undefined')
	    r={};
		r=formValidate_params.rules;
		tingfeng_clearAllValidateErrorMsg(formValidate_params);
	  if(typeof r=='undefined'||!r) return true;
      var ok=true;
	  for(var p in r){       
		   if(!tingfeng_rules_validateOne(p,r[p],formValidate_params)){
		    ok=false;
		   }
	  }	  
	  return ok;
	};
	
	self.tingfeng_rules_validateOne=function(selectorString,r,formValidate_params){
	 if(typeof r=='undefined')
	   r={};
	   	  //p就是选择器的内容
	  var value=$(selectorString).val();
	      if(typeof value==='undefined')
			value='';
	  var ok=true;
	  var ruleValue='';
	  var ruleP='';
	  var selectorString2='';
	  var isRequired=r['required'];
	      if(typeof isRequired==='undefined')
			isRequired=false;
 	      for(var p in r){//pp这里是每一个
		     //具体规则的校验
			ruleValue=r[p];
			ruleP=p;
			if(p==='equalTo'){//是要是比较相同的,不管是否必须,都必须相同
			       var v2=$(ruleValue).val();
				   if(typeof v2==='undefined')
				   v2="";
			      if(v2.length!=value.length||v2!==value)
				  { selectorString2=ruleValue;
					ok=false;
					break;
				  }
			   }else if(value.length>0){//输入了内容就校验
				   if(p==='remote'){
				    tingfeng_remoteValidate(ruleValue.callBack,selectorString,value,ruleValue.url,ruleValue.dataType,ruleValue.data,ruleValue.type);
				   }else if(p==='email'&&ruleValue){
				   if(!tingfeng_emailCheck(value)){
							ok=false;
							break;
					 }
				   }else if(p==='mobile'&&ruleValue){
				   if(!tingfeng_validatemobile(value)){
							ok=false;
							break;
					 }
				   }else if(p==='url'&&ruleValue){
				   if(!tingfeng_checkURL(value)){
							ok=false;
							break;
					 }
				   }else if(p==='date'&&ruleValue){
				   if(!tingfeng_IsDate(value)){
							ok=false;
							break;
					 }
				   }else if(p==='dateTime'&&ruleValue){
				   if(!tingfeng_CheckDateTime(value)){
							ok=false;
							break;
					 }
				   }else if(p==='number'&&ruleValue){
				     if(isNaN(value)||value.indexOf(".")==0||value.indexOf(".")==(value.length-1)){
							ok=false;
							break;
					 }
				   }else if(p==='digits'&&ruleValue){
				         if(isNaN(value)||value.indexOf(".")>=0)
						 {//如果不是整数
							ok=false;
							break;
						 }
				   }else if(p==='length'&&Object.prototype.toString.call(ruleValue) === '[object Array]'&&ruleValue.length>=2){
					   	if(formValidate_params.isTrim)
						{
							value=tingfeng_common_trim(value);
						}
					     if(value.length<ruleValue[0]||value.length>ruleValue[1])
						 {
							ok=false;
							break;
						 }
				   }else if(p==='max'&&ruleValue<value){
						ok=false;
						break;
				   }else if(p==='min'&&ruleValue>value){
				     ok=false;
					 break;
				   }else if(p==='dataType'){
				     var reg=eval(ruleValue);
					 if(!reg.test(value)){
						ok=false;
						break;
					 }
				   }else if(p==='extend'){
					   var v='';
					   try{
					    v=ruleValue(value);
					   }catch(e)
					   {
						console.info("extend代表的应该是一个函数对象!");
					   }
					   if(v!==true){
						ok=false;
						r.msg=v;
						break;
					   }
				   }				 
			   }else if(isRequired)
				    {//未输入内容,但是却要求输入内容
						if(formValidate_params.isTrim)
						{
							value=tingfeng_common_trim(value);
						}
						if(value.length<1)
				          { ok=false;
						    break;
				          }
					}
			}		  		  
	 if(!ok&&!formValidate_params.justValidate){
		tingfeng_showError(formValidate_params,selectorString,r.msg,ruleP,ruleValue,selectorString2);
	 }else if(ok&&!formValidate_params.justValidate){
	    tingfeng_clear_errorMsg(selectorString,selectorString2);
	 }
		return ok;	 
	};
	
	self.tingfeng_checkURL=function(URL){
		return tingfeng.stringUtils.isUrl(URL);
	}; 
	
	self.tingfeng_emailCheck=function(s){  
		return tingfeng.stringUtils.isEmail(s);  
	};
	
	/**  
	判断输入框中输入的日期格式为yyyy-mm-dd和正确的日期  
	*/  
	self.tingfeng_IsDate=function(mystring) {  
	    return tingfeng.stringUtils.isDate(mystring);
	}; 
	
	//函数名：CheckDateTime  
	//功能介绍：检查是否为日期时间  
	self.tingfeng_CheckDateTime=function(str){  
		return tingfeng.stringUtils.isDateTime(str);
	};  
	//选择器,错误信息,当前校验规则的名称,用户输入的校验规则,当使用equlesTo的时候,使用的第二个选择器
	self.tingfeng_showError=function(formValidate_params,selectorString,msg,name,value,selectorString2){
		if(typeof msg==='undefined')
	      msg=tingfeng_validateMsg[name];
		if(Object.prototype.toString.call(value) === '[object Array]'){
		//如果对线是数组
		 for(var i=0;i<=value.length;i++){
		    msg=msg.replace("{"+i+"}",value[i]);
		  }
		}else if(!isNaN(value)){
		msg=msg.replace("{0}",value);
		}	
		//alert(msg);
   		//错误信息以id区分
	var id=formValidate_params.ids[selectorString];
	var node='<label id="_'+id+'_error_label" style="color:red" >*'+msg+'</label>';	
		if(!formValidate_params.isRightMsg)
		{
		 node='<br id="_'+id+'_error_br" />'+node;
		}
	var oldNode=$("#_"+id+'_error_label');
        //console.info(oldNode);	
		if(oldNode.length==0){//如果原有的节点没有创建,那么才创建;
			$(selectorString).after($(node));
			if(selectorString2)
			{  id=formValidate_params.ids[selectorString2];
			   oldNode=$("#_"+id+"_error_label");
			   if(oldNode.length==0)
                 {
					node='<label id="_'+id+'_error_label" style="color:red" >*'+msg+'</label>';	
					if(!formValidate_params.isRightMsg)
					{
					 node='<br id="_'+id+'_error_br" />'+node;
					}
				   $(selectorString2).after($(node));							 
				 }			  			  
		    }
		}
	};
	
	self.tingfeng_clear_errorMsg=function(formValidate_params,selectorString,selectorString2){
	     if(!selectorString){
			return;
		}
		var id=formValidate_params.ids[selectorString];
	 var s1=$("#_"+id+'_error_label');    	 
	        if(s1.length>0){//如果原有的节点存在,那么清除;
			  s1.remove();
			 }
		 s1=$("#_"+id+'_error_br');    	 
	        if(s1.length>0){//如果原有的节点存在,那么清除;
			  s1.remove();
			 }	 
			 
	 if(!selectorString2){
	  return;
	 }
	 var id2=formValidate_params.ids[selectorString2];
	var s2=$("#_"+id2+'_error_label');
            	if(s2.length>0){//如果原有的节点存在,那么清除;
			  s2.remove();
			 }
			 
		s2=$("#_"+id2+'_error_br');
            	if(s2.length>0){//如果原有的节点存在,那么清除;
			  s2.remove();
			 }	 
	};
	
	self.tingfeng_clearAllValidateErrorMsg=function(params){
	 for(var p in params.rules){
	  tingfeng_clear_errorMsg(params,p);
	 }
   },	
	self.tingfeng_validatemobile=function(mobile)
    {
        return tingfeng.stringUtils.isMobileNumber(mobile);
    };
	
	self.tingfeng_remoteValidate=function(callBack,selectorString,value,url,dataType,data,type){
	 if(typeof dataType=='undefined')
	 dataType='text';
	 if(typeof data=='undefined')
	 data={};
	 if(typeof type=='undefined')
	 type='post';
	 jQuery.ajax({ 
              url: url,   //提交的action 
              dataType:dataType, 
              timeout:50000, //加载时间
              type:type,
			  data:data, 
              beforeSend:function(XMLHttpRequest){     
              }, 
              success: function(data) {
			          var ok=callBack(value,data);//value是用户输入的值,data是服务器返回的值
					  if(ok===true){
					  
					  }else if(ok.length>0){
					    tingfeng_showError(selectorString,ok,remote,ruleValue);					  
					  }
              }, 
              error: function(XMLHttpRequest, textStatus, errorThrown) {
              } 
        }); 
	};	
    return self;
}
tingfeng.webUtils={
	/**
	 * 得到一个webSocket的通信对象,浏览器不支持时返回null
	 * @param params 初始化webSocket的各种参数；
	 * params={
	 * 		 url:String,
			  onOpen:function(evt)
			  onMessage:function(evt)
			  onClose:function(evt);
			  }
	 */
	getWebSocket:function(params){
		var getOrElse=tingfeng.objectUtils.getOrElse;
		if(typeof params=='undefined'||params==null)
			params={};
		var func=function(evt){};
		var p={
			  url:getOrElse(params.url,''),
			  onOpen:getOrElse(params.onOpen,func),
			  onMessage:getOrElse(params.onMessage,func),
			  onClose:getOrElse(params.onClose,func),  
		};
		var ws = null;		
		try{
			if ('WebSocket' in window)
	             ws = new WebSocket(p.url);
	         else if ('MozWebSocket' in window)
	             ws = new MozWebSocket(p.url);
	         else
	         	{
	        	 console.error("not support WebSocket!");
	        	 return null;
	         	}
		}catch(e){
				console.error(e);
				return null;
		};
		 ws.onopen = p.onOpen;
		 ws.onmessage =p.onMessage;
         ws.onclose =p.onClose;
         return ws;
	},
	/**
	 * return 当前浏览器是否支持webSocket功能
	 */
	isSupportWebSocket:function(){
		var bb=false;
		if ('WebSocket' in window)
            bb=true;
        else if ('MozWebSocket' in window)
           bb=true;
		return bb;
	},
	/**
	 * 动态载入css或者js文件;
	 * @param url
	 * @param timeout
	 */
	dynamicLoading:tingfeng.dynamicLoading,
	
	
}


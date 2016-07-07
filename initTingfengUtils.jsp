<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%
String tingfengPath = request.getContextPath();
String tingfengBasePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+tingfengPath+"/";
String tingfengJsUrl=tingfengBasePath+"js/tingfengUtils/";
%>
<!-- 导入相关css -->

<!-- 导入相关js -->
<script type="text/javascript">
var tingfeng={
		/**
		 * 动态载入css或者js文件;
		 * @param url
		 * @param timeout
		 */
		dynamicLoading:function(url,timeout){
			if(typeof timeout=='undefined'||!timeout)
				timeout=20000;
			jQuery.ajax({
				url:url,
				type:'get',
				contentType:"application/x-www-form-urlencoded;charset=UTF-8",
				cache:'false',
				async:false,
				timeout:timeout,//20秒钟
				success:function(){
					console.info("import "+src+"-ok");
				},
				error:function(){
					var inf='js/css 文件加载缓慢,网页界面和功能可能受到限制！';
						console.info(inf);
				}
			});
			var reg=new RegExp('[.]js$');
				if(reg.test(url)){
					//写在head中是为了方便调试
				var oHead = document.getElementsByTagName('HEAD').item(0); 
			    var oScript= document.createElement("script"); 
			    oScript.type = "text/javascript"; 
			    oScript.src=url; 
			    oHead.appendChild(oScript);
				}else{
					var style = document.createElement(’link’);
					style.href = url;
					style.rel = ’stylesheet’;
					style.type = ‘text/css’;
					document.getElementsByTagName(’HEAD’).item(0).appendChild(style);
				}				
		}		
	};
</script>

<link type="text/css" href="<%=tingfengJsUrl%>tingfengObjects/pagenation/tingfengPagenationWhite.css" rel="stylesheet" />


<script src="<%=tingfengJsUrl%>tingfengObjects/tingfengDataStructuresObj.js" type="text/javascript" charset="utf-8"></script>
<script src="<%=tingfengJsUrl%>tingfengObjects/tingfengCommonObj.js" type="text/javascript" charset="utf-8"></script>
<script src="<%=tingfengJsUrl%>tingfengObjects/tingfengDomObj.js" type="text/javascript" charset="utf-8"></script>


<script src="<%=tingfengJsUrl%>plugins/tingfengStringUtils.js" type="text/javascript" charset="utf-8"></script>
<script src="<%=tingfengJsUrl%>plugins/tingfengTransUtils.js" type="text/javascript" charset="utf-8"></script>
<script src="<%=tingfengJsUrl%>plugins/tingfengTimeUtils.js" type="text/javascript" charset="utf-8"></script>
<script src="<%=tingfengJsUrl%>plugins/tingfengFileUtils.js" type="text/javascript" charset="utf-8"></script>
<script src="<%=tingfengJsUrl%>plugins/tingfengArrayUtils.js" type="text/javascript" charset="utf-8"></script>
<script src="<%=tingfengJsUrl%>plugins/tingfengObjects/tingfengObjectUtils.js" type="text/javascript" charset="utf-8"></script>
<script src="<%=tingfengJsUrl%>plugins/tingfengObjects/tingfengDomUtils.js" type="text/javascript" charset="utf-8"></script>
<script src="<%=tingfengJsUrl%>plugins/tingfengObjects/tingfengWebUtils.js" type="text/javascript" charset="utf-8"></script>

<script src="<%=tingfengJsUrl%>plugins/tingfengListToTree1.1.1.js" type="text/javascript" charset="utf-8"></script>
<script src="<%=tingfengJsUrl%>plugins/tingfengObjects/pagenation/tingfengPagenation.js" type="text/javascript" charset="utf-8"></script>


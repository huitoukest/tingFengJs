/**
 * 处理和html节点/元素相关
 * @date 2016-05-23
 */
tingfengF.prototype.domUtilsF=function(){
		var self2=this;
		/**
		 * @author 孙宇
		 * 
		 * @requires jQuery
		 * @param form 表单的Jquery对象
		 * 将form表单元素的值序列化成json对象
		 * @returns object
		 */
		self2.serializeObjectByFormObj=function(form) {
			var o = {};
			$.each(form.serializeArray(), function(index) {
				if (o[this['name']]) {
					o[this['name']] = o[this['name']] + "," + this['value'];
				} else {
					o[this['name']] = this['value'];
				}
			});
			return o;
		};
		/**调用此方法时候，请确保此图片已经加载完毕，即可以在onload中调用此方法;
		 * 返回一个Img对象的原始属性{width:50,height:60}，
		 * 传入一个img的Jquery对象;
		 */
		self2.getImgOriginalSize=function(imgObj){
			    var _img=$(imgObj);
				    var theImage = new Image();
				    	theImage.src = _img.attr("src");
				    var imageWidth = theImage.width;
				    var imageHeight = theImage.height;
		     return {
		    	 		width:imageWidth,
		    	 		height:imageHeight
		     		}   
			  
		};
		/**在确保图片载入后调用此方法onload之后
		 * @param container 一个容器的Jquery对象，比如div;
		 * @param imgObj 一个在此容器中的图象Jquery对象;
		 * @return 返回适应后的图片的宽高信息，如{width:50,height:60}
		 */
		self2=getImgSizeByAdaptToContainer=function(container,imgObj){
			container=$(container);		
			return tingfeng.domUtils.getImgSizeByCustom(container.width(),container.height(),imgObj)
		};
		/**
		 * @param width 指定的长度width;
		 * @param height 指定的高度height
		 * @param imgObj 一个在此容器中的图象Jquery对象;
		 * @return 返回适应后的图片的宽高信息，如{width:50,height:60}
		 */
		self2.getImgSizeByCustom=function(width,height,imgObj){
			imgObj=$(imgObj);		
			var cw=width;
			var ch=height;
				var imgInf=tingfeng.domUtils.getImgOriginalSize(imgObj);
			var iw=imgInf.width;
			var ih=imgInf.height;
			if(cw<=0||ch<=0) {
				return {width:0,height:0};
			}
			if(iw/ih<cw/ch){//如果图片比例比容器窄
				return {
					width:iw*(ch/ih),
					height:ch
				}	
			}else{
				return {
					width:cw,
					height:ih*(cw/iw)
				}
			}		
		};
		/**通常用于加载大图片的时候，使用此方法替换用来占位置的loading图片；
		 * 示例：
		 * <img src='loading.gif' onload='onImgLoad()'/>;
		 * function onImgLoad(){
		 * 	tingfeng.domUtils.loadImg(this,'myurl.jpg',function(){
		 * 		alert('load ok!');
		 * 	});
		 * }
		 * @param thisImg 传入一个图片对象
		 * @param url 传入此图片对象的url
		 * @param callback 此url中图片加载后回调的方法;
		 */
		self2.loadImg=function(thisImg,url,callback){
			    var img =new Image();
			    img.onload =function(){
			        img.onload =null;
			        thisImg.onload=null;
			        callback();
			    };
			    img.src = url;
			};
		/**
		 * 
		 * @param domObj一个dom的对象
		 * @param callBack 一个回调函数
		 */
		self2.onReSize=function(domObj,callBack){
			$(domObj).on('resize',function(){
				var thisCallBack=callBack;
				setTimeout("thisCallBack()",50); 
			});
		};

		/**
		 * 得到的是当前屏幕显示区域大小信息
		 * 在浏览器放大缩小的时候，无法得到实际body区域高宽。
		 * @param minWidth 可省略
		 * @param minHeight 可省略
		 * @returns {
				width:screenWidth,
				height:screenHeight
			};
		 */
		self2.getScreenInfo=function(minWidth,minHeight){
			if(tingfeng.objectUtils.isEmpty(minWidth))
				minWidth=0;
			if(tingfeng.objectUtils.isEmpty(minHeight)){
				minHeight=0;
			}
			var screenHeight=document.documentElement.clientHeight;
			var screenWidth=document.documentElement.clientWidth;
			if(screenHeight<minHeight)
				screenHeight=minHeight;
			if(screenWidth<minWidth)
				screenWidth=minWidth;
			var re={
					width:screenWidth,
					height:screenHeight
				};
			return re; 
		};
		/**
		 * 得到的是当前屏幕显示html 100%元素的实际高宽,
		 * 可以得到浏览器放大缩小后的渲染高宽
		 * @param minWidth 可省略
		 * @param minHeight 可省略
		 * @returns {
				width:X,
				height:Y
			};
		 */
		self2.getHtmlSizeInfo=function(minWidth,minHeight){
			if(tingfeng.objectUtils.isEmpty(minWidth))
				minWidth=0;
			if(tingfeng.objectUtils.isEmpty(minHeight)){
				minHeight=0;
			}
			var ht=$('html');
				ht.css({
					'height':'100%',
					'width':'100%'
				});
			var screenHeight=ht.height();
			var screenWidth=ht.width();
			if(screenHeight<minHeight)
				screenHeight=minHeight;
			if(screenWidth<minWidth)
				screenWidth=minWidth;
			var re={
					width:screenWidth,
					height:screenHeight
				};
			return re; 
			
		};

		self2.fromToJsonById=function(obj){
			var select=$(obj);
			var serializeObj={};
			var array=select.serializeArray();
			var str=select.serialize();
			$(array).each(function(){
				if(serializeObj[this.name]){
					if($.isArray(serializeObj[this.name])){
						serializeObj[this.name].push(this.value);
						}else{
							serializeObj[this.name]=[serializeObj[this.name],this.value];
						}
				}else{
					serializeObj[this.name]=this.value;
				}
			});
			return serializeObj;
		}
		
		
};
tingfengF.prototype.domUtils=new tingfeng.domUtilsF();
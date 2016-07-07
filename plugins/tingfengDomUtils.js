/**
 * 处理和html节点/元素相关
 * @date 2016-05-23
 */
tingfeng.domUtils={
		
		/**返回一个轮播的对象，具备轮播中基本的一些方法调用
		*采用ajax的方法后台自动加载图片； 
		* @param params 参数见Carousel	Object
		* @return a Carousel Object	{
			//1表示用户初始化需要必须输入的参数，2表示可选参数，3表示用户调用的属性/方法
			2	autoPlay:true,//是否自动播放
			1	imgObj:null,//一个图片Jquery对象,用来加载相关的图片
			1	loadingImgObj:null,//一个图片Jquery对象，载入轮播图片前，先播放loading图片；
			2	current:0,//当前播放的索引,默认从0开始
			2	datas:[],//传入的数据
			3.	imgDownArr:{},//保存图片url以及下载的结果，以图片url为key，以其是否下载完毕为value；
			2.	animateTime:300,//默认动画播放时间0.3秒
			2.	intervalTime:3000,//默认播放频率,3秒一个
			3.	setDatas:function(datas){//重新传入datas数据},
			3.	addData:function(data){},
			3.	removeData:function(index){//传入index，remove一个数据},
			3.	removeDataByData:function(data){},//传入一个Data，通过计算得到其index，然后移出
			3.	getIndexByData:function(data){},//传入一个data，返回其index，如果没有，返回null
			1.	getImgUrls:function(data){return null;},//传入一个数组数据中的item，使用此函数得到图片的url
			3.	showPrevious:function(){},//播放上一个图片
			3.	showNext:function(){//播放下一个图片},
			3.	beforeShow:function(){return true;},//返回false会阻止图片的切换
			 //在图片url已经改变之后，在图片切换动画之前调用此函数，
			 //方便调式图片的css等属性，传入此图片对象
			2	whileShow:function(imgObj){},
			//refresh表示是否刷新，即是否重复载入当前图片
			//
			3.	show:function(index,refresh){},
			//传入一个data，函数自动取得其图片url，通过url算出索引，然后展示该图片如果此图片不存在，那么自动加入到图片轮播组中；
			3.	showBydata:function(data){},
			2.	afterShow:function(data){},
			3.	stop:function(){},
			3.	pause:function(){},
			3.	play:function(){},
			3.	setIntervalTime:function(intervalTime){},//设置播放间隔，长整型，毫秒数
		* }
		*/
		getCarousel:function(params){		
			var ca=new tingfeng.domObj.Carousel(params);		
			return ca;
		},
		/**
		 * @author 孙宇
		 * 
		 * @requires jQuery
		 * @param form 表单的Jquery对象
		 * 将form表单元素的值序列化成json对象
		 * @returns object
		 */
		serializeObjectByFormObj:function(form) {
			var o = {};
			$.each(form.serializeArray(), function(index) {
				if (o[this['name']]) {
					o[this['name']] = o[this['name']] + "," + this['value'];
				} else {
					o[this['name']] = this['value'];
				}
			});
			return o;
		},
		/**调用此方法时候，请确保此图片已经加载完毕，即可以在onload中调用此方法;
		 * 返回一个Img对象的原始属性{width:50,height:60}，
		 * 传入一个img的Jquery对象;
		 */
		getImgOriginalSize:function(imgObj){
			    var _img=$(imgObj);
				    var theImage = new Image();
				    	theImage.src = _img.attr("src");
				    var imageWidth = theImage.width;
				    var imageHeight = theImage.height;
		     return {
		    	 		width:imageWidth,
		    	 		height:imageHeight
		     		}   
			  
		},
		/**在确保图片载入后调用此方法onload之后
		 * @param container 一个容器的Jquery对象，比如div;
		 * @param imgObj 一个在此容器中的图象Jquery对象;
		 * @return 返回适应后的图片的宽高信息，如{width:50,height:60}
		 */
		getImgSizeByAdaptToContainer:function(container,imgObj){
			container=$(container);		
			return tingfeng.domUtils.getImgSizeByCustom(container.width(),container.height(),imgObj)
		},
		/**
		 * @param width 指定的长度width;
		 * @param height 指定的高度height
		 * @param imgObj 一个在此容器中的图象Jquery对象;
		 * @return 返回适应后的图片的宽高信息，如{width:50,height:60}
		 */
		getImgSizeByCustom:function(width,height,imgObj){
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
		},
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
		loadImg:function(thisImg,url,callback){
			    var img =new Image();
			    img.onload =function(){
			        img.onload =null;
			        thisImg.onload=null;
			        callback();
			    };
			    img.src = url;
			},
		/**
		 * 
		 * @param domObj一个dom的对象
		 * @param callBack 一个回调函数
		 */
		onReSize:function(domObj,callBack){
			$(domObj).on('resize',function(){
				var thisCallBack=callBack;
				setTimeout("thisCallBack()",50); 
			});
		},
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
		getScreenInfo:function(minWidth,minHeight){
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
		},
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
		getHtmlSizeInfo:function(minWidth,minHeight){
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
			
		}，
		fromToJsonById:function(obj){
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
		
		
}
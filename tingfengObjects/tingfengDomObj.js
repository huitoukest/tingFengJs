/**
 *保存一些数据结构中常用的对象
 */
tingfengF.prototype.domObjF=function(){
	var self2=this;           
           self2.ShadeLoadingDialog=function(){
                this.timeNumber=new Date().getTime;
                this.markId='mark_'+this.timeNumber;
                this.divId='divDialog_'+this.timeNumber;
                this.spanId='spanInfo_'+this.timeNumber;
                var  parentF=this;
                /***
                *显示蒙灰层
                **/
                this.ShowMark=function(){
                    var xp_mark = document.getElementById(parentF.markId);  
                    if (xp_mark != null) {  
                        //设置DIV  
                        xp_mark.style.left = 0 + "px";  
                        xp_mark.style.top = 0 + "px";  
                        xp_mark.style.position = "absolute";  
                        xp_mark.style.backgroundColor = "#000";  
                        xp_mark.style.zIndex = "1";  
                        if (document.all) {  
                            xp_mark.style.filter = "alpha(opacity=50)";  
                            var Ie_ver = navigator["appVersion"].substr(22, 1);  
                            if (Ie_ver == 6 || Ie_ver == 5) { hideSelectBoxes(); }  
                        }  
                        else { xp_mark.style.opacity = "0.5"; }  
                        xp_mark.style.width = "100%";  
                        xp_mark.style.height = "100%";  
                        xp_mark.style.display = "block";  
                    }  
                    else {  
                        //页面添加div explainDiv,注意必须是紧跟body 内的第一个元素.否则IE6不正常.  
                        $("body").prepend("<div id="+parentF.markId+" style='display:none;'></div>");  
                        ShowMark(); //继续回调自己  
                    }  
                };
                 /***
                *影藏蒙灰层
                **/
                this.HideMark=function () {  	
                    var xp_mark = document.getElementById(parentF.markId);  
                    xp_mark.style.display = "none";  
                    var Ie_ver = navigator["appVersion"].substr(22, 1);  
                    if (Ie_ver == 6 || Ie_ver == 5) { showSelectBoxes();
                    }
                    $(parentF).remove();
                };  
                /**显示对话框
                 *@param imageWidth  loading图片的宽度
                 *@param imageHeight loading图片的高度
                 *@param text loading显示的文字；
                 *@param imgSrc loading图片的src
                 *@param outTime outTime毫秒之后，自动关闭对话框
                 */
                this.showLoad=function (imgSrc,text,imageWidth,imageHeight,outTime){  
                        var iWidth=0;     //弹出窗口的宽度;  
                        var iHeight=0;    //弹出窗口的高度;  
                        var scrolltop = 0;  
                        var scrollleft = 0;  
                        var cheight=document.body.clientHeight;  
                        var cwidth=document.body.clientWidth;  
                        var imageW=imageWidth;
                        var imageH=imageHeight;
                        var eTip = document.getElementById(parentF.divId);  
                        if(eTip!=null){
                            eTip = document.createElement('div'); 
                            eTip.setAttribute('id', parentF.divId);  
                            eTip.style.position = 'absolute';  
                            eTip.style.display = 'none';  
                            eTip.style.border = 'solid 0px #D1D1D1';  
                            eTip.style.padding = '2px 6px';
                        }                                              
                                                                      
                        if(tingfeng.objectUtils.isEmpty(imageH)||tingfeng.objectUtils.isEmpty(imageW)){
                            imageW=cwidth*0.15;
                            imageH=cwidth*0.15;

                            if(imageW>150){
                                imageW=150;
                                imageH=150;
                            }
                        }
                        iWidth=imageW+18;
                        iHeight = eTip.offsetHeight;
                        
                        var v_left=(cwidth-iWidth)/2; //  
                        var v_top=(cheight-iHeight)/2+ scrolltop;  
                        eTip.style.left = v_left + 'px';  
                        eTip.style.top = v_top + 'px';  

                        eTip.innerHTML = '<img src=\''+imgSrc+'\' style=\'float:left;width:'+imageW+'px;height:'+imageH+'px;\' /> <br/> <span style=\'font-size:13px;color:#OOOOOO; id="'+parentF.spanId+'" \'>' + tipInfo + '</span>';  
                        try { 
                            document.body.appendChild(eTip);  
                        } catch (e) { }  
                        $(parentF.divId).css("float", "center");  
                        $(parentF.divId).css("z-index", "999");  
                        $(parentF.divId).show();  
                        ShowMark();
                    if(!tingfeng.objectUtils.isEmpty(outTime)){
                        window.setTimeout(parentF.closeLoad(),outTime);
                    }
                };
                /***
                *设置对话框的文字
                **/
                this.setText=function(text){
                    $(parentF.spanId).html(text);
                };
                /***
                *关闭显示对话框
                **/
                this.closeLoad=function () {  
                    $(parentF.divId).hide();
                    $(parentF.divId).remove();
                    HideMark();  
                }
                
            };
			/**
			 * 通过队列池的形式来下载图片,并回调结果
			 * @param urls 图片的url数组
			 * @param callback 图片下载完毕后的回调函数,将会传入图片url,下载失败不会调用
			 * @param poolSize 下载图片的并发数量
			 * 可能存在的隐患:网速过慢,图片一直在加载;
			 */
			self2.imgsDownF=function(urls,callBack,poolMaxSize){
				var self3=this;
				var local=function(){
					this.urls=[];
					this.urlQueue=[];//当前等待的url下载链接
					this.callBack=function(url){};
					this.poolMaxSize=4;
					this.poolSize=0;//当前下载池的大小
					this.imgsDownResult={};
					return this;
				}();
				if(tingfeng.objectUtils.isNotEmpty(urls)){
					local.urls=urls;
					for(var i=0;i<urls.length;i++){
						local.urlQueue.push(urls[i]);
					};
				}
				if(tingfeng.objectUtils.isNotEmpty(callBack)){
					local.callBack=callBack;
				}
				if(tingfeng.objectUtils.isNotEmpty(poolMaxSize)){
					if(poolMaxSize<1)
						poolMaxSize=1;
					local.poolMaxSize=poolMaxSize;
				}
				/**
				 * @return 返回一个以url为key,以下载是否成功的布尔值为value的json对象;
				 * 如
				 * {
				 * 	 'xxxxx.jpg':true,
				 * 	 'xxxAA.jpg':false	
				 * }
				 */
				self2.getImgsDownResult=function(){
					return local.getImgsDownResult;
				};
				self2.downImg=function(imgUrl){
						//如果已经在下载,则返回
						if(typeof local.imgsDownResult[imgUrl]!='undefined'&&local.imgsDownResult[imgUrl]!=null)
							return;
						if(local.poolSize>=local.poolMaxSize){
							//如果当前下载池满了,那么加入下载队列中;
							local.urls.push(imgUrl);
							local.urlQueue.push(imgUrl);
							return;
						};
						var index=tingfeng.arrayUtils.getIndexByFunction(local.urlQueue,function(item){
							if(item==imgUrl)
								return true;
							return false;
						});
						if(index!=null){
							tingfeng.arrayUtils.deleteItemByIndex(index,local.urlQueue);
						}
						local.poolSize=local.poolSize+1;
						local.imgsDownResult[imgUrl]=false;
						var img =new Image();
					    img.onload =function(){//如果图片下载完毕
					        img.onload =null;
							local.poolSize=local.poolSize-1;
					        local.imgsDownResult[imgUrl]=true;					      					        
							if(local.urlQueue.length>0)
								{
									self2.downImg(local.urlQueue[0]);
								};
							local.callBack(imgUrl);

					    };
						img.onerror=function(){
							local.poolSize=local.poolSize-1;
							local.imgsDownResult[imgUrl]=false;
							if(local.urlQueue.length>0)
								{
									self2.downImg(local.urlQueue[0]);
								};
						};
					    img.src = imgUrl;
				};

			};
			/**
			 * 返回一个轮播的对象，具备轮播中基本的一些方法调用
			 *采用ajax的方法后台自动加载图片； 
			 * @param params 参数见Carousel	Object
			* @return a Carousel Object	
				Carousel Params {
			//1表示用户初始化需要必须输入的参数，2表示可选参数，3表示用户调用的属性/方法
			2	autoPlay:true,//是否自动播放
			1	imgObj:null,//一个图片Jquery对象,用来加载相关的图片
			1	loadingImgObj:null,//一个图片Jquery对象，载入轮播图片前，先播放loading图片；
			2	current:0,//当前播放的索引,默认从0开始
			2	datas:[],//传入的数据
			2.	animateTime:300,//默认动画播放时间0.3秒
			2.	intervalTime:3000,//默认播放频率,3秒一个
			1.	getImgUrls:function(data){return null;},//传入一个数组数据中的item，使用此函数得到图片的url
			3.	beforeShow:function(){return true;},//返回false会阻止图片的切换
			 //在图片url已经改变之后，在图片切换动画之前调用此函数，
			 //方便调式图片的css等属性，传入此图片对象
			2	whileShow:function(imgObj){},
			//refresh表示是否刷新，即是否重复载入当前图片
			2.	afterShow:function(data){},
		* }
		*/ self2.Carousel=function(params){
				var carousel=this;
				var local=function(){
					this.timer=null;//timer对象
					this.aotoPlay=true;
					this.imgObj=null;//一个图片Jquery对象,用来加载相关的图片
					this.loadingImgObj=null;//一个图片Jquery对象，载入轮播图片前，先播放loading图片；
					this.current=null;//当前播放的索引,默认从0开始
					this.datas=[];//传入的数据
					this.imgDownArr={};//保存图片url以及下载的结果，以图片url为key，以其是否下载完毕为value；
					this.isPlaying=false;
					this.animateTime=300;//默认动画播放时间0.3秒
					this.intervalTime=3000;//默认播放频率,3秒一个
					this.getImgUrls=function(data){
						return null;
					};//传入一个数组数据中的item，使用此函数得到图片的url
					this.beforeShow=function(){
						return true;
					};//返回false会阻止图片的切换
					/**
					 * 在图片url已经改变之后，在图片切换动画之前调用此函数，
					 * 方便调式图片的css等属性，传入此图片对象
					 */
					this.whileShow=function(imgObj){
						return true;
					};
					//传入当前展示图片所在的data
					this.afterShow=function(data){
						return true;
					};
					return this;					
				}();
				carousel.params=params;
				carousel.getIsPlaying=function(){
					return local.isPlaying;
				};
				carousel.setDatas=function(datas){//重新传入datas数据
						if(typeof datas=='undefined')
							datas=[];
						local.datas=datas;//传入带有和图片url属性相关的对象数组;
						  //开始下载图片,以后可以优化成为队列下载的方式
						  for(var p in local.datas){
							  var data=local.datas[p];
							  var imgUrl=local.getImgUrls(data);
							  carousel.downImg(imgUrl);
						  }
					};
				carousel.addData=function(data){
						local.datas.push(data);
						var imgUrl=local.getImgUrls(data);
						  carousel.downImg(imgUrl);
				};
				carousel.getDatas=function(){
					  return datas;
				};
				carousel.removeData=function(index){//传入index，remove一个数据
						local.datas.slice(index,index);
				};
				/**
				 *传入一个Data，通过计算得到其index，然后移出
				 */
				carousel.removeDataByData=function(data){
						var index=carousel.getIndexByData(data);
						if(index!=null)
						carousel.removeData(index);
				};
					/**
					 *传入一个data，返回其index，如果没有，返回null
					 	*/
				carousel.getIndexByData=function(data){
						var imgs=local.datas;					
						var url=local.getImgUrls(data);
						if(url==null) return null;
						var i=0;
						for(var i=0;i<imgs.length;i++){						
							var tmpURl=local.getImgUrls(imgs[i]);
							if(tmpURl==url) return i;
						}
						return null;
				};				
				carousel.showPrevious=function(){
						carousel.show(local.current-1);
				};
				carousel.showNext=function(){
						carousel.show(local.current+1);
				};				
				//refresh表示是否刷新，即是否重复载入当前图片
				carousel.show=function(index,refresh){
						index=carousel.initIndex(index);
						var data=local.datas[index];
						carousel.showBydata(data,refresh);
				},
						/**传入一个data，函数自动取得其图片url，通过url算出索引，然后展示该图片
					 	*如果此图片不存在，那么自动加入到图片轮播组中；
					 	*refresh表示是否刷新，即是否重复载入当前图片
				 		*/
				carousel.showBydata=function(data,refresh){
						if(typeof refresh=='undefined')
							refresh=true;
						if(tingfeng.objectUtils.isEmpty(data)){
							return;
						}
						//1.如果图片加载完毕，显示图片，否则显示loading
						if(local.beforeShow()!='undefined'&&!local.beforeShow()){
							return;
						}						
						if(local.datas.length<=0)
							local.datas=[];
						var isStop=!local.isPlaying;
						carousel.stop();
						var index=carousel.getIndexByData(data);
						if(index==null)
						{
							carousel.addData(data);
							index=local.datas.length-1;
							//carousel.show(local.datas.length-1);
						}
						index=carousel.initIndex(index);
						if(index-local.current!=0||refresh)
						{	//var data=local.datas[index];
							var imgUrl=local.getImgUrls(data);
							if(typeof local.imgDownArr[imgUrl]!='undefined'&&local.imgDownArr[imgUrl]!=null&&local.imgDownArr[imgUrl])
							{	
								carousel.changeImgUrl(imgUrl);
							}else{
								$(local.loadingImgObj).css('display','block');
								$(local.imgObj).css('display','none');															
							}
						}
						local.current=index;
						local.afterShow(local.datas[local.current]);
						if(!isStop)
							carousel.play();
				};
					/**
					 * 传入一个图片的Url，并切换,仅供show调用
					 */
				carousel.changeImgUrl=function(imgUrl){
						$(local.loadingImgObj).css('display','none');
						$(local.imgObj).css('display','block');
						var src=local.imgObj.attr("src");
						//如果初始图片url不可用，则直接切换url，否则播放切换动画
						if(typeof src=='undefined'||src==null||src==''){							
							local.imgObj.attr("src",imgUrl);
							local.whileShow(local.imgObj);
						}else{
							local.imgObj.animate({opacity:'toggle'},local.animateTime,null,function(){
							local.imgObj.attr("src",imgUrl);
							local.whileShow(local.imgObj);
							local.imgObj.animate({opacity:'toggle'},local.animateTime);
							});
						}
				};
				carousel.downImg=function(imgUrl,callBack){
						//如果已经在下载,采用ajax方式可能会下载失败！所以采用原始方式
						if(typeof local.imgDownArr[imgUrl]!='undefined'&&local.imgDownArr[imgUrl]!=null)
							return;
						local.imgDownArr[imgUrl]=false;
						var img =new Image();  
					    img.onload =function(){
					        img.onload =null;
					        local.imgDownArr[imgUrl]=true;
					        //如果当前显示的图片正好下载完毕，那么直接加载；
							 var item=local.datas[local.current];
							 var itemImgUrl=local.getImgUrls(item);
							 if(itemImgUrl==imgUrl){
								 carousel.show(local.current,true);
							 }
					        if(typeof callBack!='undefined'&&!callBack){
			        			callBack();      			
			        		}
					    };
					    img.src = imgUrl;
				};
				carousel.initIndex=function(index){					
						if(local.datas.length==0)
							return 0;
						var ind=0;
						//规范化index数据
						ind=index%local.datas.length;
						if(ind<0){
							ind=ind+local.datas.length;
						}
						return ind;
				};				
				carousel.stop=function(){
						if(local.timer!=null) 
							local.timer.pause();
						local.isPlaying=false;
				};
				carousel.pause=function(){
						if(local.timer!=null) 
							{
								local.timer.pause();						
							}
						local.isPlaying=false;
				}
				carousel.play=function(){
						if(local.timer!=null)
							{
								local.timer.play();
								local.isPlaying=true;
							}
				}
				carousel.setIntervalTime=function(intervalTime){
						local.intervalTime=intervalTime;
						local.timer.intervalTime=local.intervalTime;
				}
				carousel.isNotEmpty=tingfeng.objectUtils.isNotEmpty;
				carousel.initParams=function(){
					for(var p in carousel.params){
						var a=carousel.isNotEmpty(local[p]);
						var b=carousel.isNotEmpty(carousel.params[p]);
						if(a&&b){
							local[p]=carousel.params[p];
						}
					}
				};
				carousel.init=function(){//初始化定时器，并利用ajax下载相关图片
						//1.初始化各种基础参数
						carousel.initParams();

						$(local.loadingImgObj).css('display','block');
						$(local.imgObj).css('display','none');		 
						//2.开始下载图片,以后可以优化成为队列下载的方式，这样使用setData方法的时候，不会下载原来丢弃的url
						  for(var p in carousel.getDatas()){
							  var data=carousel.getDatas()[p];
							  var imgUrl=local.getImgUrls(data);
							  carousel.downImg(imgUrl,function(){

							  });
						  }
						//3.初始化定时器
						carousel.show(local.current);						
						local.timer=tingfeng.timeUtils.getTimer(carousel.showNext,local.intervalTime);
						if(!carousel.autoPlay)
							{
							  local.timer.pause();
							  carousel.show(0);
							}
						else{
							local.isPlaying=true;
						}
				};
				carousel.init();
				return carousel;
            };
        /**
        *包含当前dom节点的绝对位置对象，包含方法调用，可以获得top，left，width，height信息
        *返回的均是数值
        *@param objId
        */
        self2.domSizeLocationInfo=function(objId){
            this.objectId=objId;
            this.getAbsoluteLeft=function() {
                var o = document.getElementById(objectId);
                var oLeft = o.offsetLeft;            
                    while(o.offsetParent!=null) {
                    var oParent = o.offsetParent;    
                        oLeft += oParent.offsetLeft ;
                        o = oParent;
                }
                oLeft=tingfeng.stringUtils.getNumberByString(""+oLeft);
                return oLeft;
            };
          this.getAbsoluteTop=function(){
            var o = document.getElementById(objectId);
            var oTop = o.offsetTop;
                while(o.offsetParent!=null)
                {  
                    var oParent = o.offsetParent 
                    oTop += oParent.offsetTop  // Add parent top position
                    o = oParent
                }
                oTop=tingfeng.stringUtils.getNumberByString(""+oTop);
                return oTop
            };
          this.getElementWidth=function(){
              var x = document.getElementById(objectId);
              var xx=tingfeng.stringUtils.getNumberByString(""+x.offsetWidth);
              return xx;
            };
          this.getElementHeight=function(){
              var x = document.getElementById(objectId);
              var xx=tingfeng.stringUtils.getNumberByString(""+x.offsetHeight);
              return xx;
            };
         /**
         *@param typeString 如，'margin-top'，那么方法会返回margin-top的像素的数值信息
         *传入
         */
          this.getMarginOrPadding=function(typeString){
              var ma=jQuery(objectId).css(typeString);
              ma=tingfeng.stringUtils.getNumberByString(""+ma);
              return ma;
          };
        }
};
tingfengF.prototype.domObj=new tingfeng.domObjF();

/**
 *保存一些数据结构中常用的对象
 */
tingfeng.domObj={           
            ShadeLoadingDialog:function(){
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
                
            },
			Carousel:function(params){
                var carousel={
					timer:null,//timer对象
					autoPlay:true,
					imgObj:null,//一个图片Jquery对象,用来加载相关的图片
					loadingImgObj:null,//一个图片Jquery对象，载入轮播图片前，先播放loading图片；
					current:0,//当前播放的索引,默认从0开始
					datas:[],//传入的数据
					imgDownArr:{},//保存图片url以及下载的结果，以图片url为key，以其是否下载完毕为value；
					isPlaying:false,
					animateTime:300,//默认动画播放时间0.3秒
					intervalTime:3000,//默认播放频率,3秒一个
					setDatas:function(datas){//重新传入datas数据
						if(typeof datas=='undefined')
							datas=[];
						carousel.datas=datas;//传入带有和图片url属性相关的对象数组;
						  //开始下载图片,以后可以优化成为队列下载的方式
						  for(var p in carousel.datas){
							  var data=carousel.datas[p];
							  var imgUrl=carousel.getImgUrls(data);
							  carousel.downImg(imgUrl);
						  }
					},
					addData:function(data){
						carousel.datas.push(data);
						var imgUrl=carousel.getImgUrls(data);
						  carousel.downImg(imgUrl);
					},
					removeData:function(index){//传入index，remove一个数据
						carousel.datas.slice(index,index);
					},/**
					 *传入一个Data，通过计算得到其index，然后移出
					 */
					removeDataByData:function(data){
						var index=carousel.getIndexByData(data);
						if(index!=null)
						carousel.removeData(index);
					},/**
					 *传入一个data，返回其index，如果没有，返回null
					 	*/
					getIndexByData:function(data){
						var imgs=carousel.datas;					
						var url=carousel.getImgUrls(data);
						if(url==null) return null;
						var i=0;
						for(var i=0;i<imgs.length;i++){						
							var tmpURl=carousel.getImgUrls(imgs[i]);
							if(tmpURl==url) return i;
						}
						return null;
					},
					getImgUrls:function(data){return null;},//传入一个数组数据中的item，使用此函数得到图片的url
					showPrevious:function(){
						carousel.show(carousel.current-1);
					},
					showNext:function(){
						carousel.show(carousel.current+1);
					},
					beforeShow:function(){return true;},//返回false会阻止图片的切换
					/**
					 * 在图片url已经改变之后，在图片切换动画之前调用此函数，
					 * 方便调式图片的css等属性，传入此图片对象
					 */
					whileShow:function(imgObj){
						
					},//refresh表示是否刷新，即是否重复载入当前图片
					show:function(index,refresh){
						index=carousel.initIndex(index);
						var data=carousel.datas[index];
						carousel.showBydata(data,refresh);
					},/**传入一个data，函数自动取得其图片url，通过url算出索引，然后展示该图片
					 	*如果此图片不存在，那么自动加入到图片轮播组中；
					 	*refresh表示是否刷新，即是否重复载入当前图片
				 		*/
					showBydata:function(data,refresh){
						if(typeof refresh=='undefined')
							refresh=true;
						if(tingfeng.objectUtils.isEmpty(data)){
							return;
						}
						//1.如果图片加载完毕，显示图片，否则显示loading
						if(carousel.beforeShow()!='undefined'&&!carousel.beforeShow()){
							return;
						}						
						if(carousel.datas.length<=0)
							carousel.datas=[];
						var isStop=!carousel.isPlaying;
						carousel.stop();
						var index=carousel.getIndexByData(data);
						if(index==null)
						{
							carousel.addData(data);
							index=carousel.datas.length-1;
							//carousel.show(carousel.datas.length-1);
						}
						index=carousel.initIndex(index);
						if(index-carousel.current!=0||refresh)
						{	//var data=carousel.datas[index];
							var imgUrl=carousel.getImgUrls(data);
							if(typeof carousel.imgDownArr[imgUrl]!='undefined'&&carousel.imgDownArr[imgUrl]!=null&&carousel.imgDownArr[imgUrl])
							{	
								carousel.changeImgUrl(imgUrl);
							}else{
								$(carousel.loadingImgObj).css('display','block');
								$(carousel.imgObj).css('display','none');															
							}
						}
						carousel.current=index;
						carousel.afterShow(carousel.datas[carousel.current]);
						if(!isStop)
							carousel.play();
					},
					/**
					 * 传入一个图片的Url，并切换,仅供show调用
					 */
					changeImgUrl:function(imgUrl){
						$(carousel.loadingImgObj).css('display','none');
						$(carousel.imgObj).css('display','block');
						var src=carousel.imgObj.attr("src");
						//如果初始图片url不可用，则直接切换url，否则播放切换动画
						if(typeof src=='undefined'||src==null||src==''){							
							carousel.imgObj.attr("src",imgUrl);
							carousel.whileShow(carousel.imgObj);
						}else{
							carousel.imgObj.animate({opacity:'toggle'},carousel.animateTime,null,function(){
							carousel.imgObj.attr("src",imgUrl);
							carousel.whileShow(carousel.imgObj);
							carousel.imgObj.animate({opacity:'toggle'},carousel.animateTime);
							});
						}
					},
					downImg:function(imgUrl,callBack){
						//如果已经在下载,采用ajax方式可能会下载失败！所以采用原始方式
						if(typeof carousel.imgDownArr[imgUrl]!='undefined'&&carousel.imgDownArr[imgUrl]!=null)
							return;
						carousel.imgDownArr[imgUrl]=false;
						var img =new Image();  
					    img.onload =function(){
					        img.onload =null;
					        carousel.imgDownArr[imgUrl]=true;
					        //如果当前显示的图片正好下载完毕，那么直接加载；
							 var item=carousel.datas[carousel.current];
							 var itemImgUrl=carousel.getImgUrls(item);
							 if(itemImgUrl==imgUrl){
								 carousel.show(carousel.current,true);
							 }
					        if(typeof callBack!='undefined'&&!callBack){
			        			callBack();       			
			        		}
					    };
					    img.src = imgUrl;
					},
					initIndex:function(index){					
						if(carousel.datas.length==0)
							return 0;
						var ind=0;
						//规范化index数据
						ind=index%carousel.datas.length;
						if(ind<0){
							ind=ind+carousel.datas.length;
						}
						return ind;
					},//传入当前展示图片所在的data
					afterShow:function(data){},
					stop:function(){
						if(carousel.timer!=null) 
							carousel.timer.pause();
						carousel.isPlaying=false;
					},
					pause:function(){
						if(carousel.timer!=null) 
							{
								carousel.timer.pause();						
							}
						carousel.isPlaying=false;
					},
					play:function(){
						if(carousel.timer!=null)
							{
								carousel.timer.play();
								carousel.isPlaying=true;
							}
					},
					setIntervalTime:function(intervalTime){
						carousel.intervalTime=intervalTime;
						carousel.timer.intervalTime=carousel.intervalTime;
					},
					init:function(){//初始化定时器，并利用ajax下载相关图片
						if(typeof carousel.datas=='undefined')
							carousel.datas=[];
						$(carousel.loadingImgObj).css('display','block');
						$(carousel.imgObj).css('display','none');		 
						//1.开始下载图片,以后可以优化成为队列下载的方式，这样使用setData方法的时候，不会下载原来丢弃的url
						  for(var p in carousel.datas){
							  var data=carousel.datas[p];
							  var imgUrl=carousel.getImgUrls(data);
						  }
						//2.初始化定时器
						carousel.show(carousel.current);						
						carousel.timer=tingfeng.timeUtils.getTimer(carousel.showNext,carousel.intervalTime);
						if(!carousel.autoPlay)
							{
							  carousel.timer.pause();
							  carousel.show(0);
							}
						else{
							carousel.isPlaying=true;
						}
					}
				 
			};
			//初始化参数
			for(var p in params){
				carousel[p]=params[p];
			}
			carousel.init();
                return carousel;
            },
        /**
        *包含当前dom节点的绝对位置对象，包含方法调用，可以获得top，left，width，height信息
        *返回的均是数值
        *@param objId
        */
        domSizeLocationInfo:function(objId){
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
}
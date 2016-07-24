/**
**传入Param参数和css，返回操作的对象；
*/
tingfeng.domObjF.prototype.pagenationF=function(params,css){
		var tingfeng_pageParam={//分页的一些参数的设定,所有实现,均用div+css的方式(除开输入inpu外)
	          	//分页数据
				//以下是字符串变量参数
				isServerPagenation:true,//默认是服务器端分页
                content:"Pagination",//指定一个div的id,来初始化分页内容
				orderBy:null,//升序还是降序排列
				sort:null,//排序的字段
				row_name:'row',//row参数传回与接收的时候显示的参数名称
				page_name:'page',//page参数传回与接收的时候显示的参数名称
				count_name:'count',//count参数传回与接收的时候显示的参数名称
				orderBy_name:'orderBy',//orderBy参数传回与接收的时候显示的参数名称
				sort_name:'sort',//sort参数传回与接收的时候显示的参数名称
				url:'#',//分页数据url,默认跳转到当前页面
				prev_text: '上一页',       //上一页按钮里text
                next_text: '下一页',       //下一页按钮里text
				goTo_text:'跳转',//跳转按钮显示文字
				first_page_text:'首页',//首页按钮显示的文字
				end_page_text:'尾页',////尾页按钮显示的文字								
				ellipse_text:'......',//左右两边连续页数中间,省略的页数用什么文字表示
                dataType:'text',//同ajax中dataType 
				createTime:'2016-06-07',
				author:'huitoukest',//标识作用
				version:'1.2',
								
				//以下是数字变量参数
				row:10,//每页多少行数据
				page:1,//当前页面
			    count:0,//后台返回的总记录数量
				totalPage:1,//总的页数,用户无需指定,通过前台可以自己核算出来
				num_display_left:5,//左边显示的连续页数显示按钮
				num_display_right:3,//右边显示的连续页数显示按钮
				timeout:50000, //加载时间,同ajax中timeout;
				
				//以下是布尔变量参数
				prev_show_always:true,//是否显示“前一页”分页按钮布尔型，可选参数，
                next_show_always:true,//默认为true，即显示“下一页”按钮
                first_show_always:true,//是否显示首页
				end_show_always:true,//是否显示尾页
				showTotalPageInfo:true,//是否显示总页数信息
				async:true,//同ajax中async
                cache:false,//同ajax中cache
				
				//以下是函数function变量参数
				onclick:function(data){},//点击按钮之后的回调的函数,而传回的这个data就是button的页码数值,或者用户输入的input的值
				success:function(data){ return tingfeng_pageParam.count},//成功接收服务器数据之后的回调函数,data是服务器发送的数据,同ajax
				error:function(XMLHttpRequest, textStatus, errorThrown){},//连接服务器失败的回调函数,同ajax
				beforeSend:function(XMLHttpRequest,pageNo){},//同ajax中的beforeSend,返回false可以阻止向服务器发送数据
				beforeRender:function(pagenationParam){return true;},//渲染分页之前调用的回调函数,返回false或者无返回值将阻止渲染,传入的参数就是系统分页对象		
				totalPageInfoFunction:function(page,totalPage){
				             return '页码:'+page+"/"+totalPage+"页";
							},//渲染页数信息的函数,要求返回一个可包含html代码的字符串,传入当前页号,和总页数
				params:function(){return{};},//返回分页数据需要传递的参数,除开分页信息外的参数
                				
	     };
      var tingfeng_pageCss={
	         //此对象内css的值对应相应div中,class="XXX",其中style="XX"用来指定位置信息,class=""用来指定显示的样式;
	         num_display_css:'tingfeng_num_display_css',//中间连续分页的按钮的css
			 num_currentPage_css:'tingfeng_num_currentPage_css',//中间当前页码的显示css
			 totalPageInfo_css:'tingfeng_totalPageInfo_css',//显示总页数的div的css
			 ellipse_text_css:'tingfeng_ellipse_text_css',//省略页数的符号的css
			 first_show_css:'tingfeng_first_show_css',//首页按钮css
			 end_show_css:'tingfeng_end_show_css',//尾页按钮的css
			 first_show_disable_css:'tingfeng_first_disable_css',//首页按钮css,首页被禁用的css
			 end_show_disable_css:'tingfeng_end_disable_css',//尾页按钮的css,尾页被禁用的css
			 prev_css:'tingfeng_prev_css',//上一页按钮的css
			 next_css:'tingfeng_next_css',//下一页按钮的css
			 prev_disable_css:'tingfeng_prev_disable_css',//上一页按钮的css,上一页被禁用的css
			 next_disable_css:'tingfeng_next_disable_css',//下一页按钮的css,下一页被禁用的css
			 gotoPage_css:'tingfeng_gotoPage_css',//跳转按钮的css样式
             gotoPageInput_css:'tingfeng_gotoPageInput_css',//输入页码的input的样式			 
	  };
    if(typeof params!='undefined')
	  for(var p in params){//属性拷贝
	      tingfeng_pageParam[p]=params[p];
	  }   
	 if(typeof css!='undefined')
	  for(var p in css){//css拷贝
	      tingfeng_pageCss[p]=css[p];
	  }	 

     var tingfeng_pageFunction=this;   
        //跳转到指定的页面,主要用于后台调用
        tingfeng_pageFunction.gotoPage=function(page){
	        if(typeof page!='undefined')
				{tingfeng_pageParam.page=page;}
				else{
				 page=tingfeng_pageParam.page;
				}			
				tingfeng_pageFunction.getPager();
            tingfeng_pageParam.onclick(page);
        };
	   tingfeng_pageFunction.reLoadCurrentPage=function(){
			tingfeng_pageFunction.getPager();
		};
       tingfeng_pageFunction.gotoNextPage=function (){
			if(tingfeng_pageParam.page<tingfeng_pageParam.totalPage)
				tingfeng_pageFunction.gotoPage(tingfeng_pageParam.page+1);
			};
       tingfeng_pageFunction.gotoPrePage=function (){
         if(tingfeng_pageParam.page>1)
         	tingfeng_pageFunction.gotoPage(tingfeng_pageParam.page-1);
        };
       tingfeng_pageFunction.gotoLastPage=function(){
        	if(tingfeng_pageParam.page!=tingfeng_pageParam.totalPage)
			tingfeng_pageFunction.gotoPage(tingfeng_pageParam.totalPage);
        };
	   tingfeng_pageFunction.gotoFirstPage=function(){
	       tingfeng_pageFunction.gotoPage(1);
	   };
	   tingfeng_pageFunction.gotoCustomPage=function(){
	    //跳转到用户指定的页面
	    var p=$("#tingfeng_inputPage").val();		   	    
		 p=new Number(p);
		 if(p.length<1||p<=0)
		 return;
		 if(p>tingfeng_pageParam.totalPage)
		 return;
		 tingfeng_pageFunction.gotoPage(p);
	   };
       var onclickObj={};
       tingfeng_pageFunction.addOnclickListener=function(id,fun){
         $('#'+id).on('click',fun);
           onclickObj[""+id]=fun;
       };
      tingfeng_pageFunction.setOnclickListener=function(){
         for(id in onclickObj){
             var fun=onclickObj[id];             
             $('#'+id).on('click',fun);
         }                     
       };
	   tingfeng_pageFunction.setPager=function(){
        onclickObj={};
		var pageDiv=$("#"+tingfeng_pageParam.content);
	       pageDiv.html('');
		var w = pageDiv.offsetWidth;  //宽度,高度无效,可以获取此div的宽度
	     //计算控件的宽度;//目前定义的页码显示20px;页码省略45px;首页尾页40px;上一页下一页60px;页码信息:80px;输入页码;60px;跳转:55px;
	   var realWidth=0;
	    //设置分页信息
		if(tingfeng_pageParam.count<=0){
		      tingfeng_pageParam.count=0;
			  tingfeng_pageParam.page=0;
			  tingfeng_pageParam.totalPage=0;
		   }
		   if(tingfeng_pageParam.page<=0){
		     tingfeng_pageParam.page=0;
		   }
		   if(tingfeng_pageParam.row<=0){
		     tingfeng_pageParam.row=1;
		   }
	   var a=(tingfeng_pageParam.count-tingfeng_pageParam.count%tingfeng_pageParam.row)/tingfeng_pageParam.row;
	   var b=tingfeng_pageParam.count%tingfeng_pageParam.row>0?1:0;
	   tingfeng_pageParam.totalPage=a+b;	       
	   var isShowAllItem=false;//此时能够显示多少是多少
       var maxItem=(tingfeng_pageParam.num_display_left+tingfeng_pageParam.num_display_right+tingfeng_pageParam.page);
           //alert(maxItem);	   
		 if(tingfeng_pageParam.totalPage<maxItem)
		 {
		  isShowAllItem=true;
		 }
		// alert(isShowAllItem);
       var addWidth=0;//页码的显示以个位数的显示为基准,页码数量越大,占用宽度越宽,此变量求的是其增量宽度
	       for(var i=1;i<tingfeng_pageParam.page;i=i*10){
		          addWidth+=7;       
		   }
	   var addWidth_totlaPage=0;//页码信息的显示以个位数的显示为基准,页码数量越大,占用宽度越宽,此变量求的是其增量宽度
	       for(var i=1;i<tingfeng_pageParam.totalPage;i=i*10){
		          addWidth_totlaPage+=7;       
		   }
		   addWidth_totlaPage=addWidth_totlaPage;
	   //开始渲染		
	   var s='<table id="tingfeng_pageNationTable" style="" class="tingfeng_pageTdDivHover"><tr style="text-align:center;">';
			if(tingfeng_pageParam.first_show_always){//首页
			  var id=new Date().getTime()+"tingfengPageNation1";
              var onclickFun=function(){
                    tingfeng_pageFunction.gotoFirstPage();
              }
              tingfeng_pageFunction.addOnclickListener(id,onclickFun);
			  s=s+'<td style="" id='+id+'><div class="';
			  if(tingfeng_pageParam.page>1){  
				s=s+tingfeng_pageCss.first_show_css;
			  }else{
			    s=s+tingfeng_pageCss.first_show_disable_css;
			  }
			  s=s+'">'+tingfeng_pageParam.first_page_text+'</div></td>';
			realWidth+=40;
			realWidth+=4;
			}
			if(tingfeng_pageParam.prev_show_always){
              var id=new Date().getTime()+"tingfengPageNation2";
              var onclickFun=function(){
                    tingfeng_pageFunction.gotoPrePage();
              }
              tingfeng_pageFunction.addOnclickListener(id,onclickFun);
			  s=s+'<td style="" id='+id+'><div class="';
			  if(tingfeng_pageParam.page>1){  
				s=s+tingfeng_pageCss.prev_css;
			  }else{
			    s=s+tingfeng_pageCss.prev_disable_css;
			  }
			 s+='">&laquo;'+tingfeng_pageParam.prev_text+'</div></td>';
			 realWidth+=75;
			  realWidth+=4;
			}
			if(isShowAllItem){//当可以显示全部分页item的时候
			   var count=1;
			   if(tingfeng_pageParam.totalPage<=(tingfeng_pageParam.num_display_left+tingfeng_pageParam.num_display_right))
			   { count=1;}
			   else{
			     count=1+tingfeng_pageParam.totalPage-(tingfeng_pageParam.num_display_left+tingfeng_pageParam.num_display_right);
			   }
			   for(;count<=tingfeng_pageParam.totalPage;count++)
			       { 
				    var id=new Date().getTime()+"tingfengPageNation3"+"_"+count;
                    var onclickFun=function(){
                        var pageN=this.id.split("_")[1];
                        pageN=new Number(pageN);
                        tingfeng_pageFunction.gotoPage(pageN);
                   }
                   tingfeng_pageFunction.addOnclickListener(id,onclickFun);
                    s=s+'<td style="" id='+id+'><div class="';
				    if(count==tingfeng_pageParam.page){
					  s+=tingfeng_pageCss.num_currentPage_css;
					 }
					else{
					s=s+tingfeng_pageCss.num_display_css;			  
					}
					s+='" >'+(count)+'</div></td>'
					realWidth+=20+addWidth;
					realWidth+=4;
				   }
			
			}
			if(tingfeng_pageParam.num_display_left>0&&!isShowAllItem)
			{//左边连续分页页码显示
			  for(var i=0;i<=(tingfeng_pageParam.totalPage-tingfeng_pageParam.page)&&i<tingfeng_pageParam.num_display_left;i++){
			   
               var id=new Date().getTime()+"tingfengPageNation4"+"_"+(tingfeng_pageParam.page+i);
               var onclickFun=function(){
                        var pageN=this.id.split("_")[1];
                        pageN=new Number(pageN); 
                        tingfeng_pageFunction.gotoPage(pageN);
                  }
               tingfeng_pageFunction.addOnclickListener(id,onclickFun);                              
               s=s+'<td id='+id+'><div class="';
			   if((tingfeng_pageParam.page+i)==tingfeng_pageParam.page){
						s=s+tingfeng_pageCss.num_currentPage_css;			  			  
					 }
					else{		  
						s=s+tingfeng_pageCss.num_display_css;			  			  
					}
               s+='">'+(tingfeng_pageParam.page+i)+'</div></td>';					
			  realWidth+=20+addWidth;
			  realWidth+=4;
			  }
			}
			if(tingfeng_pageParam.ellipse_text.length>0&&!isShowAllItem){
			  var ep=tingfeng_pageParam.totalPage-tingfeng_pageParam.page;
			  if(tingfeng_pageParam.num_display_left>0)
			  {
			    ep=ep-tingfeng_pageParam.num_display_left;
			  }
			  if(tingfeng_pageParam.num_display_right>0){
			    ep=ep-tingfeng_pageParam.num_display_right;
			  }
			  if(ep>=0)
			   {
			   	s=s+'<td style=""><span class="'+tingfeng_pageCss.ellipse_text_css+'">......</span></td>';			
			   	realWidth+=50;
				realWidth+=4;
			   }
			}
			
			if(tingfeng_pageParam.num_display_right>0&&!isShowAllItem)
			{//右边连续分页页码显示
			  var right=tingfeng_pageParam.totalPage-tingfeng_pageParam.page-tingfeng_pageParam.num_display_left;
			  if(right>0){
			    for(var i=0;i<=right&&i<tingfeng_pageParam.num_display_right;i++){
			       var pp;
				   if(right>=tingfeng_pageParam.num_display_right)
				   {
				   	pp=tingfeng_pageParam.totalPage-tingfeng_pageParam.num_display_right+i+1;
				   }else{
				    pp=tingfeng_pageParam.page+tingfeng_pageParam.num_display_left+i;
				   }                                                 
				   var id=new Date().getTime()+"tingfengPageNation5"+"_"+pp;
                   var onclickFun=function(){
                    var pageN=this.id.split("_")[1];
                        pageN=new Number(pageN);
                    tingfeng_pageFunction.gotoPage(pageN);
                  }
                   tingfeng_pageFunction.addOnclickListener(id,onclickFun);
				   s=s+'<td style="" id='+id+'><div  class="';
                   if(pp==tingfeng_pageParam.page){
						s=s+tingfeng_pageCss.num_currentPage_css;	
						}else{		  
						s=s+tingfeng_pageCss.num_display_css;				  
						} 
                   s+='" >'+(pp)+'</div></td>';
				   realWidth+=20+addWidth_totlaPage;
				   realWidth+=4;
			   } //end for;	
			  }//end if
			}
						
			if(tingfeng_pageParam.next_show_always){
                var id=new Date().getTime()+"tingfengPageNation6";
                 var onclickFun=function(){
                    tingfeng_pageFunction.gotoNextPage();
                  }
                   tingfeng_pageFunction.addOnclickListener(id,onclickFun);
				s=s+'<td style="" id='+id+'><div class="';
			    if(tingfeng_pageParam.page<tingfeng_pageParam.totalPage){ //下一页
					s=s+tingfeng_pageCss.next_css;
				}else{
					s=s+tingfeng_pageCss.next_disable_css;
				}
				realWidth+=75;
				realWidth+=4;
				s+='">'+tingfeng_pageParam.next_text+'&raquo;</div></td>';
			}
			if(tingfeng_pageParam.end_show_always){
                var id=new Date().getTime()+"tingfengPageNation7";
                   var onclickFun=function(){
                    tingfeng_pageFunction.gotoLastPage();
                  }
                tingfeng_pageFunction.addOnclickListener(id,onclickFun);
                
				s=s+'<td style="" id='+id+'><div class="';
			     if(tingfeng_pageParam.page<tingfeng_pageParam.totalPage){  
					s=s+tingfeng_pageCss.end_show_css
				}else{
					s=s+tingfeng_pageCss.end_show_disable_css;
			    }
				s+='">'+tingfeng_pageParam.end_page_text+'</div></td>';
				realWidth+=40;
				realWidth+=4;
			}
			if(tingfeng_pageParam.showTotalPageInfo){
				var pp;;
				pp=tingfeng_pageParam.totalPageInfoFunction(tingfeng_pageParam.page,tingfeng_pageParam.totalPage);
				s=s+'<td style="" >';
				s=s+'<div class="'+tingfeng_pageCss.totalPageInfo_css+'" id="pageInfoLabel">';
				s=s+pp+'</div></td>';
				realWidth+=90+addWidth_totlaPage+addWidth;
				realWidth+=4;
			}
			s=s+'<td style="text-align:right;">	';
			s=s+'<input class="'+tingfeng_pageCss.gotoPageInput_css+'" id="tingfeng_inputPage" type="text"  value=""/></td>';
			realWidth+=55;
			realWidth+=4;
			
             var id=new Date().getTime()+"tingfengPageNation8";
                   var onclickFun=function(){
                    tingfeng_pageFunction.gotoCustomPage();
                  }
                tingfeng_pageFunction.addOnclickListener(id,onclickFun);
           
			s=s+'<td id='+id+'><div class="'+tingfeng_pageCss.gotoPage_css+'">'+tingfeng_pageParam.goTo_text+'</div></td>';
			realWidth+=45;
			realWidth+=4;//每个空间+4是调节鼠标hover的时候的宽度		
			s=s+'</tr></table>';
	    $("#"+tingfeng_pageParam.content).html(s);
		
		 //$("#tingfeng_pageNationTable").css('width',realWidth+'px');	
         tingfeng_pageFunction.setOnclickListener();
	   };
	   tingfeng_pageFunction.getPager=function(){
	   //真正与后台交互的函数
	        var pa=tingfeng_pageParam.params();
			    pa[tingfeng_pageParam.row_name]=tingfeng_pageParam.row;
				pa[tingfeng_pageParam.page_name]=tingfeng_pageParam.page;
				pa[tingfeng_pageParam.count_name]=tingfeng_pageParam.count;
				pa[tingfeng_pageParam.orderBy_name]=tingfeng_pageParam.orderBy;
				pa[tingfeng_pageParam.sort_name]=tingfeng_pageParam.sort;
           if(!tingfeng_pageParam.isServerPagenation){//如果是前端分页
                if(tingfeng_pageParam.beforeRender(tingfeng_pageParam)){
                                tingfeng_pageFunction.setPager();
                                $("#tingfeng_inputPage").val('');				
                }
           }else{//如果是服务器端分页
               var isSend=tingfeng_pageParam.beforeSend(XMLHttpRequest,tingfeng_pageParam.page);
               if(typeof isSend!='undefined'&&isSend!=null&&false===isSend)
               return;
               jQuery.ajax({ 
                  url: tingfeng_pageParam.url,   //提交的action 
                  dataType: tingfeng_pageParam.dataType, 
                  timeout:tingfeng_pageParam.timeout, //加载时间 
                  data:pa,
                  cache:tingfeng_pageParam.cache,
                  async:tingfeng_pageParam.async,
                  beforeSend:function(XMLHttpRequest){ 			                              			  
                  }, 
                  success: function(data) {
                             tingfeng_pageParam.count=tingfeng_pageParam.success(data);
                             if(tingfeng_pageParam.beforeRender(tingfeng_pageParam)){
                                tingfeng_pageFunction.setPager();
                                $("#tingfeng_inputPage").val('');				
                          }                    
                  }, 
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                    tingfeng_pageParam.error(XMLHttpRequest, textStatus, errorThrown);
                  }
                }); 
            }
	    };	
  tingfeng_pageFunction.gotoPage(1);
  return this;
};
tingfeng.domObjF.prototype.pagenation=new tingfeng.domObj.pagenationF();

	

    	
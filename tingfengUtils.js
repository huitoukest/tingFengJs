/**
 * 命名中尽量不包含下划线;
 * 以tingfeng.XXX为包名称，使用的时候，可以将相关函数以引用方式赋予短的名称；
 * 包内部采用引用的方法引用外部函数，点号可以使用逗号来替代；

 *如var listToView =tingfeng.listToView;
 */
function tingfengF(){
			var tingfengLoadJs=[	
                     'tingfengTransUtils.js',
                     'tingfengStringUtils.js',
                     'tingfengTimeUtils.js',
                     'tingfengFileUtils.js',
                     'tingfengArrayUtils.js',
                     'tingfengObjectUtils.js',
                     'tingfengDomUtils.js',
                     'tingfengWebUtils.js'
                    ];
//比较大的功能函数作为独立的文件依附于tingfengLoadJs而导入;
var tingfengLoadBigFunction=[
                             'tingfengListToTree1.1.1.js',                           
                             ];

var tingfengObjects=[
                     'tingfengCommonObj.js',
                     'tingfengDataStructuresObj.js',
                     'tingfengDomObj.js',
					 '/pagenation/tingfengPagenation.js',
					 '/pagenation/tingfengPagenationWhite.css',
                     ];
			var self=this;
			self.clone=function(){
				var obj=this;
				var myClone=function(sObj){
					if(typeof sObj!=="object")
						return sObj;			
						var s={};			
						if(sObj.constructor==Array){
						s=[]; 
						}			
						for(var i in sObj){
							s[i]=myClone(sObj[i]);
						}
						return s;
				};			
				return myClone(obj);
		};
		self.extendObjects=function(parentFnArrays){
			var subObj=this; 
			var self3=this;
			 	 self3.subFn=subObj.constructor;             	
			 var pa=parentFnArrays;
			 for(var p in pa){
                 var start=self3.subFn.prototype.length;
                 var end=start+pa[p].prototype.length;
                 for(var i=start;i<end;i++){
                     var j=i-pa[p].prototype.length;
                     self3.subFn.prototype[i]=pa[p].prototype[j];
                 }
                 pa[p].call(subObj);
             }
            return self3.subFn;
		};
			/**
			 * 动态载入css或者js文件;
			 * @param url
			 * @param timeout
			 */
		self.dynamicLoading=function(url,timeout){
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
			};	
		  /**
			 * 
			 * @param arr 名称的数组
			 * @param path 路径的前缀
			 */
			var addTingFengModel=function(arr,path){
				/**
				 * 用来得到tingfengUtils的路径
				 * @returns
				 */
				var getTingfengUtilsJsPath=function(){
					var js=document.scripts;
					var jsPath;
					for(var i=js.length;i>0;i--){
					if(js[i-1].src.indexOf("tingfengUtils.js")>-1){
					jsPath=js[i-1].src.substring(0,js[i-1].src.lastIndexOf("/")+1);
					}
					}
					return jsPath;
				};
				for(var i=0;i<arr.length;i++){
					var src=getTingfengUtilsJsPath()+path+arr[i];
					tingfeng.dynamicLoading(src);
				}
			};
			addTingFengModel(tingfengObjects,"tingfengObjects/");
			addTingFengModel(tingfengLoadJs,"plugins/");
			addTingFengModel(tingfengLoadBigFunction,"plugins/");
	};
var tingfeng=tingfengF();
	window.tingfeng=self;

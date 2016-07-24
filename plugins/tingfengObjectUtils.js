tingfengF.prototype.objectUtilsF=function(){
		var self2=this;
		/**
		 * 深度拷贝一个对象,实际上就是将基础属性一次拷贝
		 * @param obj 传入的对象;
		 * @returns 返回拷贝后的对象
		 */
		self2.clone=function(obj){
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
		/**
		 * @param object 需要取值的对象
		 * @param defaultValue 当Object是undefined或者null或者空字符串的时候的默认值
		 */
		self2.getOrElse=function(object,defaultValue){
				if(object=='undefined'||object==null||object.length<1){
					return defaultValue;
				}
				return object;
		};
		/**
		 * 如果一个对象是未定义，或者null，或者是个空白空字符串，则返回true
		 * 否则返回false；
		 * @param object
		 * @returns {Boolean}
		 */
		self2.isEmpty=function(object){
			if(object=='undefined'||object==null){
				return true;
			}
			var len=tingfeng.stringUtils.trim(object.toString());
			if(len.length<1)
				return true;
			return false;
		};
        /**使subObj继承指定的父functions，同名方法，会被后面的父function覆盖；
		 * @subObj当前子对象的this;
         * @parentFnArrays 一个父function的数组
		 * @param subFn 一个子function 可以省略
		 * @returns 子函数本身;
		 * eg:	var c=function (){		
					extendObjects([a,b],this);
					this.get2=function(){
						alert(3);
					}
				}
		 */
        self2.extendObjects=function(subObj,parentFnArrays,subFn){
			 var self3=this;
			 	 self3.subFn=subObj.constructor;
             	if(self2.isEmpty(subFn)){
					 self3.subFn=subFn;
				 }
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
         *返回一个继承指定父Functions的子function
         * @parentFnArrays 一个父function的数组
		 * @returns 
		 */
        self2.getSubFunByParentFuns=function(parentFnArrays){
            var self3=this;
			 	self3.tmp=new function(){};
                tingfeng.objectUtils.extendObjects(self3.tmp,parentFnArrays);
            return self3.tmp;
        }
		
};
tingfengF.prototype.objectUtils=new tingfeng.objectUtilsF();


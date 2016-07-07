tingfeng.objectUtils={
		/**
		 * 深度拷贝一个对象,实际上就是将基础属性一次拷贝
		 * @param obj 传入的对象;
		 * @returns 返回拷贝后的对象
		 */
		clone:function(obj){
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
		},	
		/**
		 * @param object 需要取值的对象
		 * @param defaultValue 当Object是undefined或者null或者空字符串的时候的默认值
		 */
		getOrElse:function(object,defaultValue){
				if(object=='undefined'||object==null||object.length<1){
					return defaultValue;
				}
				return object;
		},
		/**
		 * 如果一个对象是未定义，或者null，或者是个空白空字符串，则返回true
		 * 否则返回false；
		 * @param object
		 * @returns {Boolean}
		 */
		isEmpty:function(object){
			var len=tingfeng.stringUtils.trim(object.toString());
			if(object=='undefined'||object==null||len.length<1){
				return true;
			}
			return false;
		},
        /**使subFn继承指定的父functions，同名方法，会被后面的父function覆盖；
		 * @param subFn 一个子function
         * @parentFnArrays 一个父function的数组
		 * @returns subFn;
		 */
        extendObjects:function(subFn,parentFnArrays){
             var pa=parentFnArrays;
             for(var p in pa){
                 var start=subFn.prototype.length;
                 var end=start+pa[p].prototype.length;
                 for(var i=start;i<end;i++){
                     var j=i-pa[p].prototype.length;
                     subFn.prototype[i]=pa[p].prototype[j];
                 }
                 pa[p].call(subFn);
             }
            return subFn;
        },
         /**
         *返回一个继承指定父Functions的子function
         * @parentFnArrays 一个父function的数组
		 * @returns 
		 */
        getSubFunByParentFuns:function(parentFnArrays){
            var tmp=function(){};
                tingfeng.objectUtils.extendObjects(tmp,parentFnArrays);
            return tmp;
        }
		
}


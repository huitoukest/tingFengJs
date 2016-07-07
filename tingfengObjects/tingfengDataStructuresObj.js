/**
 *保存一些和操作普通/常用的数据结构的对象
 */
tingfeng.dataStructuresObj={
		/**
		 * 可以简单理解为集合对象，包含一些基础的常用的方法
		 */
		Collection:function(){
            var self = this;
			// 列表的元素个数
		    this.listSize = 0;
		    // 列表的当前位置 是第几个
		    this.pos = 0;
		    // 初始化一个空数组来保存列表元素
		    this.dataStore = [];           
		    // 给列表末尾添加元素
		    this.add=function(element){
		        self.dataStore[sef.listSize++] = element;
		    };
		    // 从列表中删除元素
		    this.remove=function(element){		        
		        var curIndex = self.find(element);
		        if(curIndex > -1) {
		            sef.removeByIndex(curIndex);
		            --self.listSize;
		            return true;
		        }
		        return false;
		    };
            this.removeByIndex=function(index){
                self.dataStore.splice(index,1);
            };
		    // 查找列表中的元素 返回索引
		    this.find=function(element) {	        
		        for(var i = 0,dataLen = self.dataStore.length; i < dataLen; i++) {
		            if(self.dataStore[i] == element) {
		                return i;
		            }
		        }
		        return -1;
		    };
            /**
            *@param index 返回此索引所在的值
            */
            this.get=function(index){
                return self.dataStore[index];
            };
		    
		    // 返回列表中元素的个数
		    this.length=function() {
		        return self.dataStore.length;
		    };
            this.isEmpty=function(){
                return self.dataStore.length<=0;
            }
		    // 显示列表中的元素
		    this.toString=function(){
		        return self.dataStore.join(',');
		    };
		    /**
		     * 在指定元素后面插入一个元素
		     * @param element 当前的元素
		     * @param elementAfter 把当前的元素插入到此元素后面
		     */
		    this.insert=function(element,elementAfter){
		        var insertPos = self.find(elementAfter);
		        if(insertPos > -1) {
		            self.dataStore.splice(insertPos+1,0,element);
		            ++self.listSize;
		            return true;
		        }
		        return false;
		    };
            this.insertByIndex=function(item,index){
                self.dataStore.splice(index+1,0,item);
            };
		    // 清空列表中的所有元素
		    this.clear=function() {
		        delete this.dataStore;
		        this.dataStore = [];
		        this.listSize = this.pos = 0;
		    };
		    // 判断给定的元素是否在列表中
		    this.contains=function(element) {
		        for(var i = 0,ilen = self.dataStore.length; i < ilen; i++) {
		            if(self.dataStore[i] == element) {
		                return true;
		            }
		        }
		        return false;
		    };
		    // 将列表中的当前元素移动到第一个位置
		    this.front=function(){
		        this.pos = 0;
		    };
		    // 将列表中当前的元素移动到最后一个位置
		    this.end=function(){
		        this.pos = this.listSize - 1;
		    };
		    // 将当前位置 后移一位
		    this.prev=function(){
		        if(this.pos > 0) {
		            --this.pos;
		        }
		    };
		    // 将当前位置 前移一位
		    this.next=function(){
		        if(self.pos < self.listSize - 1) {
		            ++sef.pos;
		        }
		    };
		    // 返回列表的当前位置
		    this.curPos=function(){
		        return this.pos;
		    };
		    // 将当前位置移动到指定位置
		    this.moveTo=function(n) {
		        self.pos = n;
		    };
		    // 返回当前位置的元素
		    this.getElement=function(){
		        return self.dataStore[self.pos];
		    };
            this.reverse=function(){
                self.dataStore=tingfeng.arrayUtils.reverse(sef.dataStore);
            };
            this.getArray=function(){
               return self.dataStore;  
            };
            /*
            *@param compare （可选） Function(pre,next) 比较数组中两个item大小，
                    返回1表示pre>next;返回-1表示pre<next;返回0表示pre==next
            */
            this.sort=function(compare){
                sef.dataStore=tingfeng.arrayUtils.sort(sef.dataStore,compare);
            },
            this.addAllArray=function(array){
                for(var p in array){
                    self.add(array[p]);
                }
            },
            this.addAllConnection=function(conllections){
                self.addAllArray(conllections.getdataStore);
            }
		},
		List:function(){
		   tingfeng.objectUtils.extendObjects(this,tingfeng.dataStructuresObj.Collection);
		},
        Set:function(){
            var self=this;
            tingfeng.objectUtils.extendObjects(this,tingfeng.dataStructuresObj.Collection);
            this.add=function(item){
                if(!self.contains(item))
                self.dataStore[sef.listSize++] = item;
            }
        },
       Map:function(){
                var Entry = function(key, value){
                    this.key = key;
                    this.value = value;
                };
                this.entries = new Array();
                this.put = function(key, value){
                    for (var i = 0; i < this.entries.length; i++) {
                        if (this.entries[i].key === key) {
                            return false;
                        }
                    }
                    this.entries.push(new Entry(key, value));
                    return true;
                };
                this.get = function(key){
                    for (var i = 0; i < this.entries.length; i++) {
                        if (this.entries[i].key === key) {
                            return this.entries[i].value;
                        }
                    }
                    return null;
                };
                this.remove = function(key) {
                    var index = this.indexOf(key);
                    if(index != -1) {
                        this.entries.splice(index,1);
                    }
                };
                /**
                *callBack(key,value);
                */
                this.foreach=function(callBack){
                    for(var i=0;i<this.entries.length;i++){
                        var key=this.entries[i].key;
                        var value=this.entries[i].value;
                        callBack(key,value);
                    }
                };
                this.getEntry = function(index) {
                    if(index >= 0 && index < this.size()) {
                        return this.entries[index];
                    }
                    return null;
                };
                this.size = function(){
                    return this.entries.length;
                };
                this.isEmpty = function(){
                    return this.entries.length <= 0;
                };
                this.clear = function() {
                    this.entries = [];
                };
                this.indexOf = function(key) {
                    var index = -1;
                    for(var i=0; i<this.size(); i++) {
                        if(key == this.entries[i].key) {
                            index = i;
                            break;
                        }
                    }
                    return index;
                };
                this.toString = function() {
                    var str = '[';
                    for(var i=0; i<this.size(); i++) {
                        str += (this.entries[i].key + '=' 
                            + this.entries[i].value + ',')
                    }
                    str = str.substr(0, str.length-1);
                    str += ']';
                    return str;
                };
            },      		
}
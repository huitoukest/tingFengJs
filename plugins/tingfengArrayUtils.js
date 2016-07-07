/**
 * @date 20160520
 */
tingfeng.arrayUtils={

		/**通过指定函数取出数组中的对象
		 * @param arr 传入的数组
		 * @param eqFunction 传入数组中的对象作为参数，如果此函数返回true，则返回此对象,不存在则返回null;
		 */
		getObjectByFunction:function (arr,eqFunction){
			var index= tingfeng.arrayUtils.getIndexByFunction(arr, eqFunction);
			if(index==null) return null;
			return arr[index];
		},
		getLengthOfArr:function(arr){
			if(typeof arr=='undefined'||arr==null)
				return 0;
			return arr.length;
		},
		/**
		 * 
		 * @param arr 传入的数组
		 * @param eqFunction 传入数组中的对象作为参数，如果此函数返回数据所在的索引,不存在则返回null;
		 */
		getIndexByFunction:function(arr,eqFunction){
			if(typeof eqFunction=='undefined'||eqFunction==null) return eqFunction;
			try{
				var length=arr.length;
				for(var i=0;i<length;i++){
					var obj=arr[i];
					if(eqFunction(arr[i]))
						return i;
				}
			}catch(e){
				return null;
			}
		},
		/**
		 * 如果存在，则更新数据，不存在则保持数据到arrry
		 * @param arr 原本的数组
		 * @param item 传入的数组数据
		 * @param eqFunction 传入数组中的对象作为参数，判断两个item是否相等
		 * @param saveIndex 如果要保存数据，保存的索引位置；
		 * @return  while save return 1，while save return 0，else return true；
		 */
		saveOrUpdateArray:function(arr,item,eqFunction,saveIndex){
			var index= tingfeng.arrayUtils.getIndexByFunction(arr, eqFunction);
				if(index==null){
					//保存的位置如果小于数组长度，那么需要进行数据移动，以方便数据插入
					if(typeof saveIndex=='undefined'||saveIndex==null||saveIndex>arr.length)
						{
							saveIndex=arr.length;
						}
					tingfeng.arrayUtils.insertToArray(0, arr,item);
					return 1;
				}else{					
					arr[index]=item;
					return 0;
				}
				return true;
		},
		/**
		 * 向一个数组中插入输入
		 * @param index 插入的索引
		 * @param arry 数组
		 * @param data 数据
		 */
		insertToArray:function(index,array,data){
			if(index>array.length){
				index=array.legnth;
			}else if(index<0){
				index=0;
			}
			for(var i=array.length;i>index;i--){
				array[i]=array[i-1];
			}
			array[index]=data;
		},
		/**
		 * 删除array总index所在项，返回删除后的数组；
		 * @param index
		 * @param array
		 * @returns Array：[]
		 */
		deleteItemByIndex:function(index,array){
			if(index>array.length||index<0){
				return array;
			}
			array.splice(index);
		},
		/**
		 * 对数组排序，会改变数组内容，默认升序排列，不传compare表示使用原生排序
		 * @param array 数组
		 * @param compare （可选） Function(pre,next) 比较数组中两个item大小，返回1表示pre>next;返回-1表示pre<next;返回0表示pre==next
		 * @returns
		 */
		sort:function(array,compare){
			if(tingfeng.objectUtils.isEmpty(compare)){
				return array.sort();
			}
			for(var i=0;i<array.length;i++){
				for(var j=i+1;j<array.length;j++){
					var pre=array[i];
					var next=array[j];
					var result=compare(pre,next);
					if(result>0){
						var tmp=pre;
						pre=next;
						next=pre;
					}
				}
			}
			return array;
		},
		/**
		 * 对数组反序，会改变数组内容
		 * @param array
		 */
		reverse:function(array){
			for(var j=0;j<array.length/2;j++){
				var pre=array[j];
				var next=array[array.length-j-1];
					var tmp=pre;
					pre=next;
					next=pre;			
			}
			return array;
		}
}


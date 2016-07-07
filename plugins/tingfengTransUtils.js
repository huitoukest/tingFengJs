/**
 * 处理基础数据转换类别：
 * 使用getCByA来，通过转换A得到C类型；
 */
tingfeng.transUtils={
		/**
		 * 转换为Int，int表示最大32位；
		 * @param d 输入的Number
		 * @returns int数值
		 */
		getIntByDecimal:function(d){
			var integer= ~~decimal;
			return integer;
		},
		getIntByString:function(s){
			return String.parseInt(s);
		},
		getIntByObj:function(){
			return getIntByString(s+"");
		},
		
		
		
		/**
		 * 转换为Long类型；最大64位；
		 * @param decimal 一个小数
		 * @returns Long数值
		 */
		getLongByDecimal:function(decimal){
			//利用向上与向下取整
			return decimal >= 0 ? Math.floor(decimal) : Math.ceil(decimal);
		},
    
        
        /**
        *转换为Decimal类型,
        *返回至多length位小数的值
        *@param number
        *@param length
        */
        getDecimalByFixedlength:function(number,length){
         var k=new Number(number);
         return (new Number(k.toFixed(length)))*1;
        }
}


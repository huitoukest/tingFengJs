/**
 * list是后台传来的数据,inp是需要输入的参数的对象,outP是需要输出的对象的参数;
 * 先排序,再输出,所以sorWay参数应该是和outParams中的参数对应
 */
tingfeng.arrayUtils.listToTree=function(pp){

var list=pp.list,inP=pp.inParams,outP=pp.outParams,sort=pp.sort;
var aa=[];
var version=1.1;
var author="wg huitoukest";
var time="20150824";
var treeList=clone(list);
var inParams={
               id:'id',
               pid:'pid',
               rootId:-1,              		   
			 };
var outParams={
                id:'id',
				pid:'pid',
				children:"children",
              };
var sortWay={
		orderBy:["pid","id"],//排序字段数组,通过字段来排序,默认id升序;不传入参数,或者传入null可以不排序;
	    sort:"asc",//asc表示升序,其它表示降序;	
 };
if(typeof inP!='undefined'&&inP!=null)
{
   for(var p in inP ){
    inParams[p]=inP[p];
   }
}
if(typeof outP!='undefined'&&outP!=null)
{
   for(var p in outP ){
    outParams[p]=outP[p];
   }
}
function ListSort(a){
	if(typeof a=='undefined')
	return;
	 //对子节点排序
	for(var i=0;i<a.length;i++)
	{
	  if(typeof a[i][outParams.children]!='undefined')
	  a[i][outParams.children]=ListSort(a[i][outParams.children]);	
	}
	if(a.length<2)
	{ 
	   return a;
	}else{	    
		for(var i=0;i<a.length;i++){	
		for(var j=i+1;j<a.length;j++){
			var b={};
			for(var k=0;k<sortWay.orderBy.length;k++){
				var t1=a[i][sortWay.orderBy[k]];
				var t2=a[j][sortWay.orderBy[k]];				 		 		
				if(sortWay.sort=='asc'){
				   if(t2<t1){
					  b=a[i];
					  a[i]=a[j];
					  a[j]=b;
					  break;				  
				   }else if(t1==t2){
					continue;
				   }else{
					 break;
					 }
				}else {
				 if(t2>t1){
					  b=a[i];
					  a[i]=a[j];
					  a[j]=b;
					  break;				  
				   }else if(t1==t2){
					continue;
				   }else{
					 break;
					 }			
				}
			}
		}
	 }//排序主体
	return a;
	}	
}

transList();
//console.info(aa);
toTree();
if(typeof sort!='undefined'&&sort!=null){
  if(typeof sort.orderBy!='undefined')
		sortWay.orderBy=sort.orderBy;
  if(typeof sort.sort!='undefined')
		sortWay.sort=sort.sort;
  aa=ListSort(aa);
}

function  transList(){
	//转换为输出数组
	for(var i=0;i<treeList.length;i++){
	var b={};
	for(var w in treeList[i])
	 {  var isOk=true;
		for(var p in outParams)
		 {
		   if(p==w){
			   b[outParams[p]]=treeList[i][w];
			   isOk=false;
			   break;
		   }
		}
		if(isOk){
			b[w]=treeList[i][w];
		 }		
	}
	b[outParams.id]=treeList[i][inParams.id];
	b[outParams.pid]=treeList[i][inParams.pid];
	 
	 treeList[i]=b;
   }
	//console.info(treeList);
}

function  toTree(){
     //限制死循环,防止有些错误id发生的时候的状况;
	 var last;
	 while((treeList.length)>0){
		 last=treeList.length;
		 for(var i=0;i<treeList.length;i++){
			getSub(aa,treeList[i],i);
			}
			if(treeList.length>=last){
				break;
			}
		 } // return aa;
	}

//a是新的数组;arr是每次得到的子树;
function getSub(a,arr,i){
   if(typeof a=="undefined")
	 { 
	 a=[];
     return a;
	 }
   if(typeof arr[outParams.pid]=='undefined')
	   arr[outParams.pid]=null;
   if(arr[outParams.id]=='undefined')
	   arr[outParams.id]=null;
   if(inParams.rootId==arr[outParams.pid]||arr[outParams.pid]==arr[outParams.id]){
	   a.push(arr);
	   treeList.splice(i,1);
	   return a;
   }else if(a.length>0){   
            for(var p=0;p<a.length;p++) 
			{//遍历生成的tree,将子节点加入父tree中;
			  if(arr.pid==a[p][outParams.id])
			   {    // console.info(a[p]);
					if(typeof a[p][outParams.children]=="undefined")
					a[p][outParams.children]=[];
					a[p][outParams.children].push(arr);
					treeList.splice(i,1);
					return a;
				}//如果没有就在子节点中查找
			    else{
			      if(typeof a[p][outParams.children]!="undefined")
					 { 
				    	var t=getSub(a[p][outParams.children],arr,i);
					    a[p][outParams.children]=t;
					 }
				 }
			}
        return a;
   }else {
   return [];
   }
}
    //对象深度复制
	function clone(target) {   
			var buf;   
			if (target instanceof Array) {   
				buf = [];  //创建一个空的数组 
				var i = target.length;   
				while (i-->0) {   
					buf[i] = clone(target[i]);   
				}   
				return buf;
			}else if (target instanceof Object){   
				buf = {};  //创建一个空对象 
				for (var k in target) {  //为这个对象添加新的属性 
					buf[k] = clone(target[k]);   
				}   
				return buf;   
			}else{   
				return target;   
			}   
		}  
 return aa;
}


tingfeng.fileUtils={
		/**
		 * 如果有扩展名，返回；没有返回"",若传入路径undefined或者null，则返回原值
		 * 扩展名不包含小点
		 */
		getExtentionName:function(path){
			try{
			var index1=path.lastIndexOf(".");  
			if(index1<=0)
				return "";
			var index2=path.length; 
			var postf=path.substring(index1+1,index2);//后缀名  
				return postf;
			}catch(e){
				return path;
			}
		},
		/**
		 * 通过一个路径来得到一个文件名，包含扩展名，如果路径不可用则直接返回原值
		 * @param path
		 */
		getFileName:function(path){
			 if(tingfeng.stringUtils.isEmpty(path))
				 return path;
			path=tingfeng.stringUtils.trim(path, true).replace("\\", "/");
			var index1=path.lastIndexOf("/");
			var fileName='';
			try{
				fileName=path.substring(index1+1,path.length);  
			}catch(e){}
	        return fileName;
		},
		/**
		 * 通过一个路径来得到一个文件名，不包含扩展名，如果路径不可用则直接返回原值
		 * @param path
		 */
		getFileNameNoExtentionName:function(path){
			 if(tingfeng.stringUtils.isEmpty(path))
				 return path;
			path=tingfeng.stringUtils.trim(path, true).replace("\\", "/");
			var index1=path.lastIndexOf("/");
			var index2=path.lastIndexOf(".");
			var fileName='';
			try{
				fileName=path.substring(index1+1,index2);  
			}catch(e){}
	        return fileName;
		}
}


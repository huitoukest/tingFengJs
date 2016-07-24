/**
 *保存一些普通的，基础的工具对象
 */
tingfengF.prototype.commonObjF=function(){
		var self2=this;
		/**
		 * 
		 * @param intervalTime 每隔intervalTime的时间运行一次定时器
		 * @param callBack 指定的回调函数
		 * @param exeCount 执行的最大次数
		 * @returns Timer Object
		 */
		self2.Timer=function(intervalTime,callBack,exeCount){
			var timer={	 
			/**是否是存活/播放状态
				   * */
				  isAlive:false,
				  /**
				   * 每隔intervalTime的时间运行一次，0表示只执行一次；单位毫秒
				   */
				  intervalTime:0,
				  /**
				   * 循环执行的次数，默认为-1次,负数表示无限次
				   */
				  exeCount:-1,
				  /**
				   * 当前已经执行的次数
				   */
				  hasExcuteCount:0,
				  /**
				   * 定时器的对象
				   */
				  intervalObj:null,
				  /**
				   * 回调函数
				   */
				  callBack:null,
				  /**
				   * 此对象自己的回调函数,主要用于包装callBack,次数到达之后会自动清除定时器
				   */
				  timerCall:function(){
					  if(timer.hasExcuteCount>timer.exeCount)
						  {
						  	timer.clearInterval();	
						  	return;
						  }
					  if(timer.callBack!=null)
					  { 
						  if(timer.isAlive==false)
							  return;
						  timer.callBack();
						  timer.hasExcuteCount++;
					  }
				  },
				  /**
				  * 初始化函数,主要用来初始化数据
				  */
				  init:function(callBack,intervalTime){
					  timer.intervalTime=intervalTime;
					  timer.callBack=callBack;
					  
					  if(timer.intervalTime<=0){
						  timer.intervalTime=9007199254740992;
					  }
					  if(typeof timer.exeCount=='undefined'||timer.exeCount==null||timer.exeCount<0)
						  timer.exeCount=9007199254740992;
				  },
				  /**
				   * 设置定时器，请确保回调函数is not null
				   */
				  setInterval:function(){				  
					  if(timer.intervalObj==null){
						  timer.intervalObj=window.setInterval(timer.timerCall,timer.intervalTime);
					  }
					  timer.isAlive=true;
				  },
				  /**
				   * 清除定时器
				   */
				  clearInterval:function(){				 
					  if(timer.intervalObj!=null){
						  window.clearInterval(timer.intervalObj);
						  timer.intervalObj=null;
					  }
					  timer.isAlive=false;
				  },
				  /**
				   * 定时器暂停
				   */
				  pause:function(){
					  timer.clearInterval();
				  },
				  /**
				   * 定时器运行
				   */
				  play:function(){
					  timer.setInterval();
				  },
				  stop:function(){
					  timer.clearInterval();
				  }			 
				};
			timer.init(callBack, intervalTime);
			timer.exeCount=exeCount;
			return timer;
		};			
};
tingfengF.prototype.commonObj=new tingfeng.commonObjF();
//One:鼠标悬停时立刻切换，若要点击时切换，可将绑定的事件由onmouseover改为onclick
/*function $(id){
	return typeof id === 'string'?document.getElementById(id):id;
}

window.onload = function(){
	//获取所有标签和所有内容块
	var tits = $('tit').getElementsByTagName('li'),
		mains = $('cont').getElementsByTagName('div');
	//若标签个数和内容块个数不相等，什么都不做
	if(tits.length != mains.length){
		return;
	}
	//否则，改变标签样式
	else{
		//遍历标签，并给标签添加id，同时给标签绑定事件
		for(var i=0; i<tits.length; i++){
			tits[i].id = i;
			tits[i].onmouseover = function(){
				for(var j=0; j<tits.length; j++){
					tits[j].className = '';
					mains[j].style.display = 'none';
				}
				//为当前鼠标悬浮的标签添加类名，用于改变其样式
				this.className = 'select';
				//将内容块显示在对应的标签下，利用标签的id来找到对应的内容块
				mains[this.id].style.display = 'block';
			}
		}

	}
}*/

/*--------------------------------华丽的分割线---------------------------------*/

/*Two:以下为延迟切换，即鼠标悬停后间隔一段时间再进行标签页的切换
即在鼠标悬停时立刻切换的基础上加一个定时器即可，以下为实现代码部分
*/
/*function $(id){
	return typeof id === 'string'?document.getElementById(id):id;
}
window.onload = function(){
	//首先定义一个指向空对象的定时器
	var timer = null;

	//获取所有标签和所有内容块
	var tits = $('tit'). getElementsByTagName('li'),
		mains = $('cont'). getElementsByTagName('div');
	//若标签个数和内容块个数不相等，什么都不做
	if(tits.length != mains.length){
			return;
	}
	else{
		for(var i=0; i<tits.length; i++){
			tits[i].id = i;
			tits[i].onmouseover = function(){
				//获取当前的对象，以便在setInterval中能够正确的引用到当前鼠标悬停的对象
				var	that = this;
				//如果有即将要触发的定时器，但在该标签上鼠标的停留时间还没有达到定时器规定的时间，就移到了另一个标签上去，这时就应该清除该定时器。
				if(timer){
					clearTimeout(timer);
					timer = null;
				}
				//设置定时器，让鼠标在标签上悬停半秒后再切换
				else{
					timer = setTimeout(function(){
						//更改与标签对应的内容块，原理与立刻切换相同
						for(var j=0; j<tits.length; j++){
							tits[j].className = '';
							mains[j].style.display = 'none';
						}
						that.className = 'select';
						mains[that.id].style.display = 'block';
					}, 500)
				}
			}
		}
	}
}
*/
/*Three-------------------------------华丽的分割线----------------------------------*/
/*以下为每隔两秒钟就自动切换效果的代码实现，使用间歇调用setInterval()*/
/*function $(id){
	return typeof id === 'string'? document.getElementById(id): id;
}

window.onload = function(){
	//定义一个暂时指向空对象的定时器
	var timer = null,
		//定义一个变量用于存储所有标签的角标
		index;
	var tits = $('tit').getElementsByTagName('li'),
		mains = $('cont').getElementsByTagName('div');
	timer = setInterval(function(){
		index++;

		//当标签角标数增加超过了标签总数，就从零开始，即从第一个标签继续
		if(index >= tits.length){
			index = 0;
		}
		for(var i=0; i<tits.length; i++){
			tits[i].className = '';
			mains[i].style.display = 'none';
		}
		tits[index].className = 'select';
		mains[index].style.display = 'block';

		//我想用这段代码替换上面自动切换标签的代码，但为什么标签2s后自动从第一个标签直接切换到了最后一个标签？
		//是因为循环结束后i变成了4，然后index中直接保存了i最终的值么？那也不对啊，最外层循环结束后i的值不是5么？
		//何解....
		//是因为在2s中之内，index值变化为0,1,2,3,4，在2s之内，index的值早已增加到了4，而index的值永远也不可能>=tits.length，
		//所以if条件永远也不可能执行，即标签再也不会再进行切换...吗？
		//for(var i=0; i<tits.length; i++){
			//index = i;
			//if(index >= tits.length){
				//index = 0;
			//}
			//for(var j=0; j<tits.length; j++){
				//tits[j].className = '';
				//mains[j].style.display = 'none';
			//}
			//tits[index].className = 'select';
			//mains[index].style.display = 'block';
		//}
		//
	},2000)
}*/

/*Four------------------------------华丽分割线----------------------------------*/
/*以下代码实现标签自动切换，切鼠标悬停在其中一个标签上时也可以进行切换。
综合了鼠标悬停切换和自动切换*/
/*function $(id){
	return typeof id === 'string'? document.getElementById(id): id;
}
window.onload = function(){
	//定义一个暂时指向空对象的定时器
	var timer = null,
		//定义一个变量用于存储所有标签的角标
		index = 0;
	var tits = $('tit').getElementsByTagName('li'),
		mains = $('cont').getElementsByTagName('div');
	
	for(var i=0; i<tits.length; i++){
		tits[i].id = i;
		tits[i].onmouseover = function(){
			clearInterval(timer);
			for(var j=0; j<tits.length; j++){
				tits[j].className = '';
				mains[j].style.display = 'none';
			}
			//为当前鼠标悬浮的标签添加类名，用于改变其样式
			this.className = 'select';
			//将内容块显示在对应的标签下，利用标签的id来找到对应的内容块
			mains[this.id].style.display = 'block';
		}
		tits[i].onmouseout = function(){
			timer = setInterval(function(){
			index++;

			//当标签角标数增加超过了标签总数，就从零开始，即从第一个标签继续
			if(index >= tits.length){
				index = 0;
			}
			for(var i=0; i<tits.length; i++){
				tits[i].className = '';
				mains[i].style.display = 'none';
			}
			tits[index].className = 'select';
			mains[index].style.display = 'block';
			},2000)
		}
	}

	timer = setInterval(function(){
		index++;

		//当标签角标数增加超过了标签总数，就从零开始，即从第一个标签继续
		if(index >= tits.length){
			index = 0;
		}
		for(var i=0; i<tits.length; i++){
			tits[i].className = '';
			mains[i].style.display = 'none';
		}
		tits[index].className = 'select';
		mains[index].style.display = 'block';
	},2000)
}*/


/*---------------------华丽分割线-------------------*/
/*代码优化：将for(var i=0; i<tits.length; i++){
				tits[i].className = '';
				mains[i].style.display = 'none';
			}
			tits[index].className = 'select';
			mains[index].style.display = 'block';
			和定时器内的匿名函数代码：
				function(){
					index++;

					//当标签角标数增加超过了标签总数，就从零开始，即从第一个标签继续
					if(index >= tits.length){
						index = 0;
					}
					for(var i=0; i<tits.length; i++){
						tits[i].className = '';
						mains[i].style.display = 'none';
					}
					tits[index].className = 'select';
					mains[index].style.display = 'block';
				}
			都分别封装到一个函数里面
*/
function $(id){
	return typeof id === 'string'? document.getElementById(id): id;
}
window.onload = function(){
	//定义一个暂时指向空对象的定时器
	var timer = null,
		//定义一个变量用于存储所有标签的角标
		index = 0;
	var tits = $('tit').getElementsByTagName('li'),
		mains = $('cont').getElementsByTagName('div');
	
	for(var i=0; i<tits.length; i++){
		tits[i].id = i;
		tits[i].onmouseover = function(){
			clearInterval(timer);
			changeOption(this.id);
		}
		tits[i].onmouseout = function(){
			timer = setInterval(autoPlay,2000)
		}
	}
	if(timer){
		clearInterval(timer);
		timer = null;
	}
	timer = setInterval(autoPlay,2000)

	//封装
	function changeOption(curIndex){
		for(var j=0; j<tits.length; j++){
			tits[j].className = '';
			mains[j].style.display = 'none';
		}
		//为当前鼠标悬浮的标签添加类名，用于改变其样式
		tits[curIndex].className = 'select';
		//将内容块显示在对应的标签下，利用标签的id来找到对应的内容块
		mains[curIndex].style.display = 'block';
		index = curIndex;
	}

	function autoPlay(){
		index++;
		//当标签角标数增加超过了标签总数，就从零开始，即从第一个标签继续
		if(index >= tits.length){
			index = 0;
		}
		changeOption(index);
	}
}
window.addEventListener('load', function() {
	// 1.获取元素
	var arrow_l = document.querySelector('.arrow-l');
	var arrow_r = document.querySelector('.arrow-r');
	var focus = document.querySelector('.focus');
	var focusWidth = focus.offsetWidth;
	
	// 2.鼠标经过focus就显示隐藏左右按钮
	focus.addEventListener('mouseenter', function() {
		arrow_l.style.display = 'block';
		arrow_r.style.display = 'block';
		clearInterval(timer);
		timer = null;  //清除机遇时器变量
	})
	focus.addEventListener('mouseleave', function() {
		arrow_l.style.display = 'none';
		arrow_r.style.display = 'none';
	})
	
	// 3.动态生成小圆圈 有几张图片 就生成几个小圆圈
	var ul = focus.querySelector('ul');
	var ol = focus.querySelector('.circle');
	
	for (var i = 0; i < ul.children.length; i++) {
		// 创建一个小li
		var li = document.querySelector('li');
		// 记录当前小圆圈的索引号 通过自定义属性来做
		li.setAttribute('index', i);
		// 把小li插入到ol里面
		ol.appendChild(li);
		// 4.小圆圈的排他思想
		 li.addEventListener('click', function() {
			 // 清除所有li的类名
			 for (var i = 0; i < ol.children.length; i++) {
				 ol.children[i].className = '';
			 }
			 // 给当前li设置类名
			 this.className = 'current';
			 // 5.点击小圆圈 移动图片 移动的是ul
			 // ul的移动距离 小圆圈的索引号 乘以图片的宽度 注意是负值
			 // 点击那个li 就拿到那个li的索引号
			 var index = this.getAttribute('index');
			 // 当点击了某个小li 就拿到当前的li的索引号
			 var index = this.getAttribute('index');
			 // 当点击了某个小li 就把索引给num
			 num = index;
			 // 当点击了某个小li 就把索引给circle
			 circle = index;
			 console.log(focusWidth);
			 console.log(index);
			 
			 animate(ul, -index * focusWidth, callback);
		 });
	}
	// 把ol的第一个li设置类名为current
	ol.children[0].className = 'current';
	// 6.克隆第一张图片(li)放到ul最后面
	var first = ul.children[0].cloneNode(true);
	ul.appendChild(first);
	// 7.点击右侧按钮 图片滚动一张
	var num = 0;
	// circle 控制小圆圈的播放
	var circle = 0;
	// flag 节流阀
	var flag = true;
	arrow_r.addEventListener('click', function() {
		// 如果走到了最后复制的一张照片 ul 快速复原left改为 0
		if (num == 4) {
			ul.style.left = 0;
			num = 0;
		}
		num++;
		animate(ul, -num * focusWidth);
		// 8.点击右侧按钮 小圆圈跟随一起变化 可以再次声明一个变量控制小圆圈的播放
		circle++;
		// 如果circle == 4 说明走到最后一张图片了 我们就复原
		if (circle == ol.children.length) {
			circle = 0;
		}
		circleChange();
	});
	
	// 9.左侧按钮做法
	arrow_l.addEventListener('click', function() {
		// 如果走到了最后复制的一张照片 ul 快速复原left改为 0
		if (num == 0) {
			num = ul.children.length - 1;
			ul.style.left = -num * focusWidth + 'px';
			
		}
		num--;
		animate(ul, -num * focusWidth);
		// 8.点击右侧按钮 小圆圈跟随一起变化 可以再次声明一个变量控制小圆圈的播放
		circle--;
		// 如果circle == 4 说明走到最后一张图片了 我们就复原
		if (circle < 0) {
			circle = ol.children.length - 1;
		}
		circleChange();
	});
	function circleChange() {
		// 先清除其余小圆圈的current类名
		for (var i = 0; i <　ol.children.length; i++) {
			ol.children[i].className = '';
		}
		
		// 留下当前的小圆圈的current类名
		ol.children[circle].className = 'current';
	}
	// 10. 自动播放轮播图
	var timer = setInterval(function() {
		// 手动调用点击事件
		arrow_r.click();
	}, 2000);
})
// 1.获取元素
var sliderbar = document.querySelector('.slider-bar');
var banner = document.querySelector('.banner');

// 被卷去的头部大小
var bannerTop = banner.offsetTop

// 2.页面滚动事件
document.addEventListener('scroll', function() {
	// console.log(11);
	// Window.pageYOffest 页面被卷去的头部
	console.log(Window.pageYOffest);
	
	// 当超过头部盒子,侧面就改为固定定位
	if (window.pageYOffset >= bannerTop) {
		sliderbar.style.position = 'fixed';
	} else {
		sliderbar.style.position = 'absolute';
	}
})
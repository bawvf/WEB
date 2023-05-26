var that;
class Tab {
    constructor(id) {
        // 获取元素
        that = this;
        this.main = document.querySelector(id);
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.add = this.main.querySelector('.tabadd');
        // li的父元素
        this.ul = this.main.querySelector('.fisrstnav ul:first-child');
        // section 父元素
        this.fsection = this.main.querySelector('.tabscon');
        this.init();
    }
    init() {
        this.updateNode();
        // 初始化操作让相关元素绑定事件
        this.add.onclick = this.addTab;

        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }

    // 获取所有小li和section
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll('.icon-guanbi');
        this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child');
    }

    // 1.切换功能
    toggleTab() {
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }

    clearClass() {
        // 清除所有li和section的类
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }

    // 2.添加功能
    addTab() {
        that.clearClass();
        // 1.创建li元素和section元素
        var random = Math.random();
        var li = '<li class="liactive"><span>新选项卡</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">测试 ' + random + '</section>';
        // 2.把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();
    }

    // 3.删除功能
    removeTab(e) {
        e.stopPropagation();  //阻止冒泡 防止li的切换点击事件
        var index = this.parentNode.index;
        console.log(index);

        that.lis[index].remove();
        that.sections[index].remove();
        that.init();

        if (document.querySelector('.liactive')) return;

        index--;
        that.lis[index] &&    that.lis[index].click();
    }

    // 4.修改功能
    editTab() {
        var str = this.innerHTML;
        //双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

        this.innerHTML = '<input type="text" />';
        var input = this.children[0];
        input.value = str;
        input.select();
        input.onblur = function () {
            this.parentNode.innerHTML =  this.value;
        };

        // 按下回车也可以把文本框的值给span
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        }
    }

}

new Tab('#tab');
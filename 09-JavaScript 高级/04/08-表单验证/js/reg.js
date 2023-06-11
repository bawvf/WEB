window.onload = function () {
    var regtel = /^1[3|4|5|7|8]\d{9}$/;  //手机号码的正则表达式
    var regqq = /^[1-9]\d{4,}$/;
    var regnc = /^[\u4e00-\u9fa5]{2,8}$/;
    var regmsg = /^\d{6}$/;
    var regpwd = /^[a-zA-Z0-9_-]{6,16}$/;

    var tel = document.querySelector('#tel');
    var qq = document.querySelector('#qq');
    var nc = document.querySelector('#nc');
    var msg = document.querySelector('#msg');
    var pwd = document.querySelector('#pwd');
    var surepwd = document.querySelector('#surepwd');

    regexp(tel, regtel);  //手机号验证
    regexp(qq, regqq);  //qq号验证
    regexp(nc, regnc);
    regexp(msg, regmsg);
    regexp(pwd, regpwd);

    // 验证表单的函数
    function regexp(ele, reg) {
        ele.onblur = function () {
            if (reg.test(this.value)) {
                // console.log('正确的');
                this.nextElementSibling.className = 'success';
                this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜输入正确';
            } else {
                // console.log('不正确');
                this.nextElementSibling.className = 'error';
                this.nextElementSibling.innerHTML = '<i class="error_icon"></i>手机号码格式不正确，请重新输入';
            }
        }
    };
    surepwd.onblur = function () {
        if (this.value == pwd.value) {
            this.nextElementSibling.className = 'success';
            this.nextElementSibling.innerHTML = '<i class="success_icon"></i>恭喜输入正确';
        } else {
            this.nextElementSibling.className = 'error';
            this.nextElementSibling.innerHTML = '<i class="error_icon"></i>两次输出不正确';
        }
    }
}
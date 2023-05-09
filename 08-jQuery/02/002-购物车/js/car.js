$(function () {
    // 1.全选全不选功能
    // 全选状态(checkall)赋值给三个状态(j-checkbox)
    // 事件可以用change
    $(".checkall").change(function () {
        $(".j-checkbox .checkall").prop("checked", $(this).prop("checked"));
        if ($(this).prop("checked")) {
            // 让所有商品添加 check-cart-item 类名
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
    })

    // 2.小复选框全选则全选按钮也选择
    $(".j-checkbox").change(function () {
        if ($(".j-checkbox:checked").length === $(".j-checkbox").length ) {
            $(".checkall").prop("checked", true);
        } else {
            $(".checkall").prop("checked", false);
        }
        if ($(this).prop("checked")) {
            // 让所有商品添加 check-cart-item 类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });

    // 3.增减商品数量模块 申明一个变量 当点击+号 值++ 赋值给文本框
    $(".increment").click(function () {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);

        // 3.计算下计模块 根据文本框的值 乘以 当前商品价格 商品小计
        var p = $(this).parent().parent().siblings(".p-price").html();
        p = p .substr(1);
        var price = (p * n).toFixed(2);

        $(this).parent().parent().siblings(".p-sum").html("￥" + price);
        getSum();
    });

    $(".decrement").click(function () {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings(".itxt").val(n);

        // 3.计算下计模块 根据文本框的值 乘以 当前商品价格 商品小计
        var p = $(this).parent().parent().siblings(".p-price").html();
        p = p .substr(1);

        $(this).parent().parent().siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });

    // 4.用户修改文本框的值 计算
    $(".itxt").change(function () {
        var n = $(this).val();
        var p = $(this).parent().parent().siblings(".p-price").html();
        p = p.substr(1);
        $(this).parent().parent().siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    })

    // 5.计算总计和总额模块
    function getSum() {
        var count = 0; //计算总件数
        var money = 0;  //计算总价钱
        $(".itxt").each(function (i, ele) {
            count += parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);

        $(".p-sum").each(function (i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $(".price-sum em").text("￥" + money.toFixed(2));
    }

    // 6.删除商品模块
    // (1) 商品后面的删除按钮
    $(".p-action a").click(function () {
        // 删除的是当前的商品
        $(this).parents(".cart-item").remove();
    });
    // (2) 删除选中的商品
    $(".remove-batch").click(function () {
       // 删除的是复选框选中的商品
       $(".j-checkbox:checked").parents(".cart-item").remove();
    });
    // (3) 清空购物车 删除全部商品
    $(".clear-all").click(function () {
        $(".cart-item").remove();
    })

})
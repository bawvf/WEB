$(function () {
    // 1.按下回车 把完整数据 存储到本地存储里面
    // 存储的数据格式 var todolist = [{title: "xxx", done: false}]
    load();
    $("#title").on("keydown", function (event) {
        if (event.keyCode === 13) {
            if ($(this).val() === "") {
                alert("请输入您要的操作");
            } else {
                // 先读取本地存储的数据
                var local = getDate();
                // 把local数组进行更新数据 把最新的数据追加给loacl数组
                local.push({title: $(this).val(), done: false});
                // 把数组local 存储给本地存储
                saveDate(local);
                // 2.toDoList 本地存储数据渲染加载到页面
                load();
                $(this).val("");
            }
        }
    });
    // 3.toDoList 删除操作
    $("ol, ul").on("click", "a", function () {
        // 先获取本地存储
        var data = getDate();
        console.log(data);
        // 修改数据
        var index = $(this).attr("id");
        data.splice(index, 1);
        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    });
    // 4. toDolist 正在进行和已完成选项操作
    $("ol, ul").on("click", "input", function () {
        // 先获取本地存储页面
        var data = getDate();
        // 修改数据
        var index = $(this).siblings("a").attr("id");
        data[index].done = $(this).prop("checked");
        // 保存到本地存储
        saveDate(data);
        // 重新渲染页面
        load();
    })

    // 读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem("todolist");
        if (data != null) {
            // 本地存储是字符串格式 需要转换对象格式
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // 保存本地存储
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    // 渲染加载数据
    function load() {
        // 读取本地存储的数据
        var data = getDate();
        // 遍历之前要清空ol里面的元素内容
        $("ol, ul").empty();
        // 正在进行的个数
        var todoCount = 0;
        // 已经完成的个数
        var doneCount = 0;

        // 遍历这个数据
        $.each(data, function (i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'> <p>" + n.title + "</p> <a href='javascript:;' id="+ i +"></a></li>");
                doneCount++;
            } else {
                $("ol").prepend("<li><input type='checkbox'> <p>" + n.title + "</p> <a href='javascript:;' id="+ i +"></a></li>");
                todoCount++;
            }
        });
        $("#todocount").text(todoCount);
        $("#donecount").text(doneCount);
    }
})
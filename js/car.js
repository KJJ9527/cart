$(function() {
    // 全选 全不选
    $(".checkall").change(function() {
        $(".j-checkbox, .checkall").prop("checked",$(this).prop("checked"));
        if($(this).prop("checked")) {
            $(".cart-item").addClass("check-cart-item");
        } else {
            $(".cart-item").removeClass("check-cart-item");
        }
    })
    // 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选
    $(".j-checkbox").change(function() {
        if($(".j-checkbox:checked").length === $(".j-checkbox").length) {
            $(".checkall").prop("checked",true);
        } else {
            $(".checkall").prop("checked",false);
        }
        if($(this).prop("checked")) {
            $(this).parents(".cart-item").addClass("check-cart-item");
        } else {
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    });
    getSum();
    $(".increment").click(function() {
        // 得到当前兄弟的值
        var n = $(this).siblings(".itxt").val();
        n++;
        $(this).siblings(".itxt").val(n);
        // 每次点击+号或者-号，根据文本框的值 乘以 当前商品的价格  就是 商品的小计
        var p = $(this).parents().siblings(".p-price").text().substr(1);
        var price = (n * p).toFixed(2);
        $(this).parents().siblings(".p-sum").text("￥" + price);
        getSum();
    });
    $(".decrement").click(function() {
        // 得到当前兄弟的值
        var n = $(this).siblings(".itxt").val();
        if(n == 1) {
            $(this).prop("disabled",true)
        } else {
            n--;
            $(this).siblings(".itxt").val(n);
            // 每次点击+号或者-号，根据文本框的值 乘以 当前商品的价格  就是 商品的小计
            var p = $(this).parents().siblings(".p-price").text().substr(1);
            var price = (n * p).toFixed(2);
            $(this).parents().siblings(".p-sum").text("￥" + price);
        }
        getSum();
    });
    // 用户修改文本框的值 计算 小计模块
    $(".itxt").change(function() {
        // 先得到文本框的里面的值 乘以 当前商品的单价
        var n = $(this).val();
        var p = $(this).parents().siblings(".p-price").text().substr(1);
        var price = (n * p).toFixed(2);
        $(this).parents().siblings(".p-sum").text("￥" + price);
        getSum();
    })
    // 计算总计和总额
    function getSum() {
        var sum = 0;    //计算总件数
        var money = 0;  //计算总额
        $(".itxt").each(function(i,domEle) {
            sum += parseInt($(domEle).val());
        })
        $(".amount-sum em").text(sum);

        $(".p-sum").each(function(i,domEle) {
            money += parseFloat($(domEle).text().substr(1));
        })
        $(".price-sum em").text("￥" + money.toFixed(2));
    }
    // 删除 
    $(".p-action a").click(function() {
        $(this).parents(".cart-item-list").remove();
        getSum();
    })
    $(".remove-batch").click(function() {
        $(".j-checkbox:checked").parents(".cart-item-list").remove();
        getSum();
    })
    $(".clear-all").click(function() {
        $(".cart-item-list").remove();
        getSum();
    })
})
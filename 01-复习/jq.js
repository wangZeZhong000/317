/**
 *
 * Created by ChengXiancheng on 2017/3/17.
 */


(function(window){
    var arr=[];
    var splice=arr.splice;
    var slice=arr.slice;
    var push=arr.push;

    //1、选择器函数
    var Sizzle=function(selector){
        return document.querySelectorAll(selector);
    };
    //2、入口函数
    var jQuery=function(selector){

        //返回一个F的实例
        return new jQuery.fn.F(selector);
    };
    jQuery.fn=jQuery.prototype={
        constructor:jQuery,
        F:function(selector){
            //清空之前的DOM元素
            splice.apply(this,[0,this.length]);
            //获取DOM元素
            var eles=Sizzle(selector);//{0:div,1:div,length:2}
            //将eles中的每一个DOM元素遍历添加到this中
            push.apply(this,eles);
            //返回this
            return this;

        }
    };

    jQuery.extend=jQuery.fn.extend=function(){
        //0、参数个数为0
        if(arguments.length===0) return this;

        var arg0=arguments[0];

        if(arguments.length===1){
            //1、参数个数为1：将第一个参数(arg0)中的属性和方法拷贝到this中
            for (var key in arg0) {
                //arg0[key]

                this[key]=arg0[key];
            }
            return this;

        }else{
            //2、参数个数>1-->数据源对象就是从第二个参数及其后面的所有实参，我们要将这些参数中的属性和方法拷贝到第一个参数(arg0)中
            for (var i = 1; i < arguments.length; i++) {
                var arg = arguments[i];
                for (var key in arg) {
                    arg0[key]=arg[key];
                }
            }
            return arg0;

        }



    }

    jQuery.fn.F.prototype=jQuery.fn;

    window.$=window.jQuery=jQuery;


})(window)
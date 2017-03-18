/**
 *
 * Created by ChengXiancheng on 2017/3/17.
 */


(function (window) {
    var arr = [];
    var splice = arr.splice;
    var slice = arr.slice;
    var push = arr.push;

    var types = "Number String Boolean Array RegExp Function Math Date Object".split(" ");
    var class2type = {};//{ "[object Xxxx]":"xxxx" }
    for (var i = 0; i < types.length; i++) {
        var type = types[i];//type是大写的类型名称
        class2type["[object " + type + "]"] = type.toLowerCase();//class2type["[object Number]"]="number"
    }

    //1、选择器函数
    var Sizzle = function (selector) {
        return document.querySelectorAll(selector);
    };
    //2、入口函数
    var jQuery = function (selector) {

        //返回一个F的实例
        return new jQuery.fn.F(selector);
    };
    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        F: function (selector) {
            //清空之前的DOM元素
            splice.apply(this, [0, this.length]);
            //获取DOM元素
            var eles = Sizzle(selector);//{0:div,1:div,length:2}
            //将eles中的每一个DOM元素遍历添加到this中
            push.apply(this, eles);
            //返回this
            return this;

        }
    };

    jQuery.extend = jQuery.fn.extend = function () {
        //0、参数个数为0
        if (arguments.length === 0) return this;

        var arg0 = arguments[0];

        if (arguments.length === 1) {
            //1、参数个数为1：将第一个参数(arg0)中的属性和方法拷贝到this中
            for (var key in arg0) {
                //arg0[key]

                this[key] = arg0[key];
            }
            return this;

        } else {
            //2、参数个数>1-->数据源对象就是从第二个参数及其后面的所有实参，我们要将这些参数中的属性和方法拷贝到第一个参数(arg0)中
            for (var i = 1; i < arguments.length; i++) {
                var arg = arguments[i];
                for (var key in arg) {
                    arg0[key] = arg[key];
                }
            }
            return arg0;

        }


    }

    jQuery.fn.F.prototype = jQuery.fn;

    function isLikeArray(array) {
        var len = array.length;
        return typeof len === "number" && len >= 0 && len - 1 in array;
    }


    //工具类方法：
    jQuery.extend({
        each: function (array, callback) {
            //2个功能：数组、伪数组--->for循环；其他对象--->for...in循环

            var i, len = array.length;

            if (isLikeArray(array)) {//判断array是否是一个数组/伪数组
                for (i = 0; i < len;) {
                    if (callback.call(array[i], i, array[i++]) === false) break;
                }
            } else {
                for (i in array) {
                    if (callback.call(array[i], i, array[i]) === false) break;
                }
            }


        },

        isString: function (str) {
            return typeof str == "string";
        },

        isFunction: function (fn) {
            return typeof fn === "function";
        },

        //因为浏览器已经在ES5中原生支持了Array.isArray方法，在ES5之前没有该方法(Array.isArray值为undefined)
        isArray: Array.isArray || function (array) {
            return jQuery.type(array) === "array";
        },
        /**
         *
         * @param data
         * return 字符串的值，是该数据的数据类型的名称的小写格式
         */
        type: function (data) {
//            //null==undefined
//            if (data == null) {
//                return String(data);
//            }
//
//            //简化后：
//            return class2type[Object.prototype.toString.call(data)];


            return data == null ?
                String(data) :
                class2type[Object.prototype.toString.call(data)];
        },

        /**
         * 合并2个数组/伪数组
         * @param target 数组/伪数组
         * @param source 数组/伪数组
         * @returns {*} 返回追加完成之后的target
         */
        merge: function (target, source) {
            //将source中的每一元素追击到target末尾

            var len = target.length;
            for (var i = 0; i < source.length; i++) {
                //需要将source[i]追加到target的末尾

                target[len] = source[i];
                len++;
            }

            target.length = len;

            return target;

        },

        /**
         * 将参数转换为数组
         * //1、参数是数组 or 伪数组-->直接转换为数组
         * //2、其他情况——>将参数当成一个整体放到一个数组中
         * @param data
         * @returns {*[]}
         */
        makeArray: function (data) {

            //简化后：
            return isLikeArray(data) ?
                jQuery.merge([], data) :
                [data];
        },
        /**
         * 去除字符串的首尾空格
         * @param str
         * @returns {void|string|XML} 返回一个去除首尾空格之后的字符串
         */
        trim:function(str){
            return str.replace(/^\s+|\s+$/g,"");
        }
    });


    jQuery.fn.extend({
        //方便jquery对象中DOM元素的遍历
        each: function (callback) {
            //要遍历的对象：this
            jQuery.each(this, callback);
        }
    })

    window.$ = window.jQuery = jQuery;


})(window)
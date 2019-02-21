/*

string
number
boolean
object
function
array
undefined

null

Date
RegExp
Error
*/

function typeHint(value, acceptTypes) {
    var argumentsLength = arguments.length;
    if (argumentsLength < 2) {
        console.log('請至少輸入兩個參數: 第一個為欲被檢查的值，第二個為可接受的型態');
        return;
    }
}
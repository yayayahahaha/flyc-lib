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

    var acceptTypesArray = [];

    if (typeof acceptTypes === 'string') {
        switch (acceptTypes) {
            case 'string':
            case 'number':
            case 'boolean':
            case 'function':
            case 'undefined':
                if (typeof value !== acceptTypes) {
                    console.warn('型別錯誤: 想要的型別為 ' + acceptTypes + ' , 傳入的值的型別為' + typeof value);
                    console.warn('沒有設定預設值，將回傳false');
                    return false;
                }
                break;
            case 'object':
                break;
            case 'array':
                break;
            default:
                break;
        }
    }
}

var result = typeHint(undefined);
console.log(result);
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

    var typeList = ['string',
            'number',
            'boolean',
            'function',
            'undefined',
            'null',
            'object',
            'array'
        ],
        acceptTypesArray = [],
        objectErrorMessage = '',
        showType = typeof value;

    if (typeof acceptTypes === 'string') {
        // 如果傳入的acceptTypes 是字串的話，代表使用者只想判斷型別
        switch (acceptTypes) {
            case 'string':
            case 'number':
            case 'boolean':
            case 'function':
            case 'undefined':
                if (typeof value !== acceptTypes) {
                    console.warn(_create_errorMessage(acceptTypes, typeof value));
                    console.warn('沒有設定預設值，將回傳false');
                    return false;
                }
                break;

            case 'null':
            case 'object':
            case 'array':
                if (typeof value !== 'object') {
                    objectErrorMessage = _create_errorMessage(acceptTypes, showType);
                } else {
                    switch (acceptTypes) {
                        case 'null':
                            if (value) {
                                showType = value instanceof Array ? 'array' : 'object';
                                objectErrorMessage = _create_errorMessage(acceptTypes, showType);
                            }
                            break;
                        case 'object':
                            if (!value) {
                                showType = 'null';
                                objectErrorMessage = _create_errorMessage(acceptTypes, showType);
                            } else if (value instanceof Array) {
                                showType = 'array';
                                objectErrorMessage = _create_errorMessage(acceptTypes, showType);
                            }
                            break;
                        case 'array':
                            if (!value) {
                                showType = 'null';
                                objectErrorMessage = _create_errorMessage(acceptTypes, showType);
                            } else if (!(value instanceof Array)) {
                                showType = 'object';
                                objectErrorMessage = _create_errorMessage(acceptTypes, showType);
                            }
                            break;
                    }
                }

                if (objectErrorMessage) {
                    objectErrorMessage += '\n沒有設定預設值，將回傳false';
                    console.log(objectErrorMessage);
                    return false;
                }
                break;
            default:
                console.warn('第二個參數 acceptTypes 如果是字串，值僅可為' + typeList.join(', ') + ', 目前的值為' + acceptTypes + ', 將回傳false');
                return false;
        }
        return value;

    } else if (typeof acceptTypes === 'object' && acceptTypes) {
        // 如果acceptType 是陣列或物件的話，代表使用者的這個值可接受複數的型態、或想額外設定其他的參數
        /*
                {
                    value: '',
                    type: '',

                    required: false,
                    errorMessage: ''
                }
        */
        var isArray = acceptTypes instanceof Array;
        if (isArray) {

        } else {
            // _optionsObjectDetect(acceptTypes);
            _objectKeysDetect({
                hello: 'hello'
            }, ['hello', {
                keyName: '',
                type: 123
            }]);
        }

        function _objectKeysDetect(object, limitKeys) {
            limitKeys = (function() {
                if (typeof limitKeys === 'object' && limitKeys instanceof Array) {
                    return limitKeys;
                } else {
                    console.log('第二個參數limitKeys 只能是陣列, 將使用空陣列');
                    return [];
                }
            })();

            limitKeys.forEach(function(limitKey) {
                var limitKeyType = typeof limitKey;
                switch (limitKeyType) {
                    case 'string':
                        // 當作key 全是required 的
                        if (/^\d+$/.test(limitKey)) {
                            console.log('limitKey 避免使用數字字串作為key 值: ' + limitKey);
                        } else if (limitKey === '') {
                            console.log('limitKey 避免使用空字串作為key 值: ' + limitKey);
                        } else if (!(limitKey in object)) {
                            console.log('缺少key: ' + limitKey);
                        }

                        break;
                    case 'object':
                        // keyName 是required 的
                        if (!('keyName' in limitKey)) {
                            console.log('物件limitKey 缺少keyName');
                        } else if (typeof limitKey.keyName !== 'string') {
                            console.log('物件limitKey 的keyName 僅能為字串格式: ' + typeof limitKey.keyName);
                        } else if (/^\d+$/.test(limitKey.keyName)) {
                            console.log('避免使用數字字串作為物件limitKey 的keyName: ' + limitKey.keyName);
                        } else if (limitKey.keyName === '') {
                            console.log('避免使用空字串作為物件limitKey 的keyName: ' + limitKey.keyName);
                        }

                        if ('type' in limitKey) {
                            switch (limitKey.type) {
                                case 'string':
                                case 'number':
                                case 'boolean':
                                case 'function':
                                case 'undefined':
                                case 'null':
                                case 'object':
                                case 'array':
                                    break;
                                default:
                                    console.log('物件limitKey 的type 僅可為' + typeList.join(', ') + ', 將不使用: ' + limitKey.type);
                                    delete limitKey.type;
                                    break;
                            }
                        }

                        break;
                    default:
                        console.log('limitKey 型別只能為string 或 { value, required } 的物件');
                        break;
                }
            })
        }

        function _optionsObjectDetect(option) {
            var keys = Object.keys(option),
                keysNeeded = ['value', 'type'],
                keysOptional = ['required', 'errorMessage'],
                allKeys = keysNeeded.concat(keysOptional),
                lackRequiredKeys = _findLackRequiredKeys(option, keysNeeded);
            redundantKeys = _findRedundantKeys(option, allKeys);


            // 缺少的必要key
            if (lackRequiredKeys.length !== 0) {
                console.log('缺少的必填key: ' + lackRequiredKeys.join(', '));
            }

            // 多餘的key
            if (redundantKeys.length !== 0) {
                console.log('無法識別的key: ' + redundantKeys.join(', '));
            }
        }

        function _findLackRequiredKeys(object, keys) {
            return keys.filter(function(key) {
                return !(key in object);
            });
        }

        function _findRedundantKeys(object, keys) {
            return Object.keys(object).filter(function(key) {
                return keys.indexOf(key) === -1;
            });
        }

    } else {
        if (acceptTypes === null) {
            showType = 'null';
        } else {
            showType = typeof acceptTypes;
        }
        console.warn('第二個參數 acceptTypes 的型別僅可為字串、物件或陣列, 傳入的值為' + showType);
        return;
    }

    function _create_errorMessage(acceptTypes, showType) {
        return '型別錯誤: 想要的型別為 ' + acceptTypes + ' , 傳入的值的型別為' + showType;
    }
}

var result = typeHint('[]', {
    // value: 123,
    // type: 123,
    required: 123,
    errorMessage: 'hello',
    hello: 123,
    ttt: 123
});
console.log(result);
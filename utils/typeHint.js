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

var typeList = ['string',
        'number',
        'boolean',
        'function',
        'undefined',
        'null',
        'object',
        'array'
    ],
    typeListString = typeList.join(', '),
    numberRegex = /^\d+$/;

function typeDetectWithDefaultValue(value, types) {
    var typesType = typeofValue(types),
        typesDetect = multipleTypeMap(types, ['array', 'string', 'object']).status;

    if (!typesDetect) {
        console.log('參數錯誤: 第二個參數types 的格式僅接受字串, 陣列或物件');
        return;
    }
    // 不論是陣列還是字串還是物件，都整理成格式正確的物件陣列後再繼續執行
    switch (typesType) {
        case 'string':
            // 代表沒有設定回傳值、所以直接用singleTypeMap 就好
            return singleTypeMap(value, types);
        case 'object':
            var objectTypePass = objectKeyDetect(types, { required: ['type'], optional: ['default'] });
            console.log(objectTypePass);
            break;
        case 'array':
            break;
    }
}

// object 的物件key 值檢測
function objectKeyDetect(object, setting) {
    setting = singleTypeMap(setting, 'object').status ? setting : {};
    object = singleTypeMap(object, 'object').status ? object : {};

    var objectKeys = Object.keys(object),
        requiredArray = singleTypeMap(setting.required, 'array').status ? setting.required : [],
        optionalArray = singleTypeMap(setting.optional, 'array').status ? setting.optional : [],
        allNeededArray = [].concat(requiredArray).concat(optionalArray),

        // 用來檢查物件的基本使用方式
        alertArray = allNeededArray.reduce(function(alertArray, key) {
            if (typeof key !== 'string') {
                alertArray.push('請使用字串作為物件的key, 當前的型別為' + typeofValue(key));
            } else if (numberRegex.test(key)) {
                alertArray.push('避免使用數字字串作為物件的key, 當前的值為' + key);
            } else if (key === '') {
                alertArray.push('避免使用空字串作為物件的key, 當前的值為' + key);
            }
            return alertArray;
        }, []),

        // 用來檢查是否有多餘的key
        redundantArray = allNeededArray.reduce(function(leftKeys, keyNeeded) {
            var keyNeededIndex = leftKeys.indexOf(keyNeeded);
            if (keyNeededIndex !== -1) {
                leftKeys.splice(keyNeededIndex, 1);
            }
            return leftKeys;
        }, objectKeys.slice()),

        // 用來檢查是否有缺乏什麼required
        lackArray = objectKeys.reduce(function(requiredArray, key) {
            var requiredKeyIndex = requiredArray.indexOf(key);
            if (key !== -1) {
                requiredArray.splice(requiredKeyIndex, 1);
            }
            return requiredArray;
        }, requiredArray.slice());

    var noAlert = alertArray.length === 0,
        noRedundant = redundantArray.length === 0,
        noLack = lackArray.length === 0,
        status = noAlert && noRedundant && noLack;

    return {
        status: status,
        alert: alertArray,
        redundant: redundantArray,
        lack: lackArray,
        message: status ? 'success' : '請檢查alert, redundant 和lack 查閱相關訊息'
    };
}

// 傳入的參數可接受多種type
function multipleTypeMap(value, types) {
    if (!(types instanceof Array)) {
        console.log('參數錯誤: 第二個參數types 僅可接受陣列格式');
        return;
    }

    var status = 0,
        message = '',
        showType = typeofValue(value),
        match = types.reduce(function(resultsArray, type) {
        resultsArray.push(singleTypeMap(value, type))
        return resultsArray;
    }, []).reduce(function(match, result) {
        return match || !!result.status;
    }, false);

    status = match ? 1 : 0;
    message = match ? 'success' : '格式錯誤，希望的格式是 ' + types.join(', ') + ', 傳進來的是: ' + showType;
    return {
        status: status,
        message: message,
        meta: {
            value: value,
            types: types
        }
    };
}

// 傳入的參數僅可接受一種type
function singleTypeMap(value, type) {
    var showType = '',
        errorMessage = '';
    if (typeof type !== 'string') {
        return {
            status: 0,
            message: 'type 僅能接受字串格式: ' + typeof type,
            meta: {}
        };
    }
    switch (type) {
        case 'string':
        case 'number':
        case 'boolean':
        case 'function':
        case 'undefined':
            if (typeof value !== type) {
                // 錯誤訊息
                showType = typeof value;

                if (showType === 'object') {
                    showType = !value
                        ? 'null'
                        : value instanceof Array
                            ? 'array'
                            : 'object';
                }

                errorMessage = _createErrorMessage(type, showType);
                return {
                    status: 0,
                    message: errorMessage,
                    meta: {
                        value: value,
                        type: type
                    }
                };
            }
            break;

        case 'null':
        case 'object':
        case 'array':
            if (typeof value !== 'object') {
                // 錯誤訊息
                showType = typeof value;
                errorMessage = _createErrorMessage(type, showType);
            } else {
                showType = typeofValue(value);
                if (showType !== type) {
                    errorMessage = _createErrorMessage(type, showType);
                }
            }

            if (errorMessage) {
                return {
                    status: 0,
                    message: errorMessage,
                    meta: {
                        value: value,
                        type: type
                    }
                };
            }
            break;
        default:
            return {
                status: 0,
                message: '第二個參數 type 值僅可為' + typeList.join(', ') + ', 目前的值為' + type + ', 將回傳失敗訊息',
                meta: {
                    value: value,
                    type: type
                }
            };
    }

    return {
        status: 1,
        message: 'success',
        meta: {
            value: value,
            type: type
        }
    }
    function _createErrorMessage(acceptType, getType) {
        return '格式錯誤，希望的格式是' + acceptType + ', 傳入的是' + getType;
    }
}

// 主要用來區分null, array 和object
function typeofValue(value) {
    switch (typeof value) {
        case 'object':
            if (!value) {
                return 'null';
            } else if (value instanceof Array) {
                return 'array';
            } else {
                return 'object';
            }
        default:
        // case 'string':
        // case 'number':
        // case 'boolean':
        // case 'function':
        // case 'undefined':
            return typeof value;
    }
}



var result = typeDetectWithDefaultValue('hello', {setting: 'key'});

console.log(result);
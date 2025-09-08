'use strict'

/**
 * Рекурсивно преобразует все примитивные значения в объекте с помощью функции преобразования
 * @template T
 * @param {T} obj - Объект для преобразования
 * @param {function(*): *} transformFn - Функция преобразования
 * 
 * @example
 * // returns { a: 2, b: { c: 3, d: 4 }, e: 5 }
 * transform({ a: 1, b: { c: 2, d: 3 }, e: 4 }, (value) => value + 1);
 * 
 * @returns {T}
 */
const transform = (obj, transformFn) => {
    if (typeof transformFn !== 'function') {
        throw new TypeError('transformFn must be a function')
    }

    if (typeof obj !== 'object' || obj === null) {
        return transformFn(obj)
    }

    let res = Array.isArray(obj) ? [] : {}

    for (const key in obj) {
        let value = obj[key]

        if (typeof value === 'object' && value !== null) {
            res[key] = transform(value, transformFn)
        } else {
            res[key] = transformFn(value)
        }
    }

    return res
}


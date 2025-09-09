/* eslint-disable require-jsdoc */

'use strict';

QUnit.module('Тестируем функцию transform', () => {
    QUnit.test('Работает правильно с простыми объектами', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };
        const transformFunction = (value) => value * 2;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: 4, c: 6 }, 'Значения должны быть умножены на 2');
    });

    QUnit.test('Работает правильно с вложенными объектами', (assert) => {
        const originalObject = { a: 1, b: { c: 2, d: 3 }, e: 4 };
        const transformFunction = (value) => value + 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: 2, b: { c: 3, d: 4 }, e: 5 }, 'Значения должны быть увеличены на 1');
    });

    QUnit.test('Работает правильно с массивами', (assert) => {
        const originalObject = { a: [1, 2, 3], b: 4 };
        const transformFunction = (value) => value * 3;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: [3, 6, 9], b: 12 }, 'Элементы массива должны быть умножены на 3');
    });

    QUnit.test('Работает с пустыми объектами и массивами', (assert) => {
        const originalObject = { a: {}, b: [], c: 5 };
        const transformFunction = (value) => value / 2;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, { a: {}, b: [], c: 2.5 }, 
            'Пустые объекты и массивы должны остаться пустыми, обычные значения преобразованы');
    });

    QUnit.test('Работает с глубоко вложенными структурами', (assert) => {
        const originalObject = {
            a: {
                b: {
                    c: {
                        d: 10,
                        e: [1, 2, { f: 3 }]
                    }
                },
                g: 5
            },
            h: 2
        };
        const transformFunction = (value) => value - 1;
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, {
            a: {
                b: {
                    c: {
                        d: 9,
                        e: [0, 1, { f: 2 }]
                    }
                },
                g: 4
            },
            h: 1
        }, 'Должны преобразоваться все вложенные объекты');
    });

    QUnit.test('Работает с разными типами данных', (assert) => {
        const originalObject = {
            a: 10,
            b: "hello",
            c: true,
            d: null,
            e: undefined
        };
        const transformFunction = (value) => {
            if (typeof value === 'number') return value * 2;
            if (typeof value === 'string') return value.toUpperCase();
            if (typeof value === 'boolean') return !value;
            return value;
        };
        const result = transform(originalObject, transformFunction);

        assert.deepEqual(result, {
            a: 20,
            b: "HELLO",
            c: false,
            d: null,
            e: undefined
        }, 'Все значения должны быть правильно обработаны в зависимости от их типа');
    });

    QUnit.test('Выбрасывает ошибку когда transformFn не функция', (assert) => {
        const originalObject = { a: 1, b: 2, c: 3 };

        assert.throws(
            () => transform(originalObject, null),
            'Должна быть ошибка при transformFn = null'
        );

        assert.throws(
            () => transform(originalObject, 'blablabla'),
            'Должна быть ошибка при transformFn = string'
        );

        assert.throws(
            () => transform(originalObject, {}),
            'Должна быть ошибка при transformFn = object'
        );

        assert.throws(
            () => transform(originalObject),
            'Должна быть ошибка при отсутствии transformFn'
        );
    });
});


const ast = {
    type: "File",
    start: 0,
    end: 64,
    program: {
        type: "Program",
        start: 0,
        end: 64,
        sourceType: "script",
        interpreter: null,
        body: [
            {
                type: "ExpressionStatement",
                start: 0,
                end: 31,
                expression: {
                    type: "CallExpression",
                    start: 0,
                    end: 30,
                    callee: {
                        type: "MemberExpression",
                        start: 0,
                        end: 28,
                        object: {
                            type: "NewExpression",
                            start: 1,
                            end: 15,
                            callee: {
                                type: "Identifier",
                                start: 5,
                                end: 6,
                                name: "M",
                            },
                            arguments: [
                                {
                                    type: "ObjectExpression",
                                    start: 7,
                                    end: 14,
                                    properties: [
                                        {
                                            type: "ObjectProperty",
                                            start: 8,
                                            end: 13,
                                            method: false,
                                            key: {
                                                type: "Identifier",
                                                start: 8,
                                                end: 9,
                                                name: "x",
                                            },
                                            computed: false,
                                            shorthand: false,
                                            value: {
                                                type: "StringLiteral",
                                                start: 11,
                                                end: 13,
                                                extra: {
                                                    rawValue: "",
                                                    raw: "''",
                                                },
                                                value: "",
                                            },
                                        },
                                    ],
                                },
                            ],
                            extra: {
                                parenthesized: true,
                                parenStart: 0,
                            },
                        },
                        property: {
                            type: "Identifier",
                            start: 27,
                            end: 28,
                            name: "y",
                        },
                        computed: false,
                    },
                    arguments: [],
                },
            },
            {
                type: "ExpressionStatement",
                start: 33,
                end: 64,
                expression: {
                    type: "CallExpression",
                    start: 33,
                    end: 63,
                    callee: {
                        type: "MemberExpression",
                        start: 33,
                        end: 61,
                        object: {
                            type: "NewExpression",
                            start: 34,
                            end: 48,
                            callee: {
                                type: "Identifier",
                                start: 38,
                                end: 39,
                                name: "M",
                            },
                            arguments: [
                                {
                                    type: "ObjectExpression",
                                    start: 40,
                                    end: 47,
                                    properties: [
                                        {
                                            type: "ObjectProperty",
                                            start: 41,
                                            end: 46,
                                            method: false,
                                            key: {
                                                type: "Identifier",
                                                start: 41,
                                                end: 42,
                                                name: "x",
                                            },
                                            computed: false,
                                            shorthand: false,
                                            value: {
                                                type: "StringLiteral",
                                                start: 44,
                                                end: 46,
                                                extra: {
                                                    rawValue: "",
                                                    raw: "''",
                                                },
                                                value: "",
                                            },
                                        },
                                    ],
                                },
                            ],
                            extra: {
                                parenthesized: true,
                                parenStart: 33,
                            },
                        },
                        property: {
                            type: "Identifier",
                            start: 60,
                            end: 61,
                            name: "x",
                        },
                        computed: false,
                    },
                    arguments: [],
                },
            },
        ],
        directives: [],
    },
};

// const code = "var a = 10;"
// const parser = require("@babel/parser");
// const ast = parser.parse(code);

// console.log(ast);

/**
 * Функция обхода дерева. Выполняет обход дерева в глубину,
 * передаваяв callback-функции onNodeEnter (до посещения потомков)
 * и onNodeLeave (после посещения потомков) каждый узел дерева
 * и текущую область видимости (смотри определение Scope ниже)
 *
 * @param      {object}    ast                              Исходное ast
 * @param      {Function}  [onNodeEnter=(node, scope)=>{}]  Вызывается для каждого узла до посещения потомков
 * @param      {Function}  [onNodeLeave=(node, scope)=>{}]  Вызывается для каждого узла после посещения потомков
 */
function traverse(
    ast,
    onNodeEnter: Function = (node, scope) => {},
    onNodeLeave: Function = (node, scope) => {}
) {
    const rootScope = new Scope(ast);

    _inner(ast, rootScope);

    /**
     * Определение области видимости узла.
     * Может либо вернуть текущий scope, либо создать новый
     *
     * @param      {object}  astNode       ast-узел
     * @param      {Scope}   currentScope  текущая область видимости
     * @return     {Scope}   область видимости для внутренних узлов astNode
     */
    function resolveScope(astNode, currentScope) {
        let isFunctionExpression = ast.type === "FunctionExpression",
            isFunctionDeclaration = ast.type === "FunctionDeclaration";

        if (!isFunctionExpression && !isFunctionDeclaration) {
            // Новые области видимости порждают только функции
            return currentScope;
        }

        // каждая функция порождает новую область видимости
        const newScope = new Scope(ast, currentScope);

        ast.params.forEach((param) => {
            // параметры функции доступны внутри функции
            newScope.add(param.name);
        });

        if (isFunctionDeclaration) {
            // имя функции при декларации доступно снаружи функции
            currentScope.add(ast.id.name);
        } else {
            // имя функции-выражения доступно только внутри неё
            newScope.add(ast.id.name);
        }

        return newScope;
    }

    /**
     * Рекурсивная функция обхода ast
     *
     * @param      {object}  astNode  Текущий ast-узел
     * @param      {Scope}  scope     Область видимости для текущего ast-узла
     */
    function _inner(astNode, scope) {
        if (Array.isArray(astNode)) {
            astNode.forEach((node) => {
                /* Рекурсивный обход элементов списков.
                 * Списками являются, например, параметры функций
                 */
                _inner(node, scope);
            });
        } else if (astNode && typeof astNode === "object") {
            onNodeEnter(astNode, scope);

            const innerScope = resolveScope(astNode, scope),
                keys = Object.keys(astNode).filter((key) => {
                    // loc - служебное свойство, а не ast-узел
                    return (
                        key !== "loc" &&
                        astNode[key] &&
                        typeof astNode[key] === "object"
                    );
                });

            keys.forEach((key) => {
                // Обход всех потомков
                _inner(astNode[key], innerScope);
            });

            onNodeLeave(astNode, scope);
        }
    }
}

/**
 * Представление области видимости
 *
 * @class      Scope (name)
 * @param      {object}  astNode      ast-узел, породивший эту область видимости
 * @param      {object}  parentScope  Родительская область видимости
 */
function Scope(astNode, parentScope = undefined) {
    this._node = astNode;
    this._parent = parentScope;
    this._vars = new Set();
}

Scope.prototype = {
    /**
     * Добавление имени переменной в область видимости
     *
     * @param      {string}  name    имя переменной
     */
    add(name) {
        this._vars.add(name);
    },
    /**
     * Была ли определена переменная с таким именем.
     *
     * @param      {string}   name    имя переменной
     * @return     {boolean}  Встречалась ли переменная с таким именем в доступных областях видимости
     */
    isDefined(name) {
        return (
            this._vars.has(name) ||
            (this._parent && this._parent.isDefined(name))
        );
    },
};
function solution(ast): [] {
    // console.log(ast);

    return [];
}
console.log(ast.program.body);
module.exports = solution;

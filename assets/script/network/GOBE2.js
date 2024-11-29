(function(root) {
    var exports = undefined
      , module = undefined
      , require = undefined;
    var define = undefined;
    var self = root
      , window = root
      , global = root
      , globalThis = root;
    (function() {
        /*gobe_v13.6.2*/
        !function(e, t) {
            "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = "undefined" != typeof globalThis ? globalThis : e || self).GOBE = {});
        }(this, function(exports) {
            "use strict";
            var commonjsGlobal = "undefined" != typeof globalThis ? globalThis : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {}
              , check = function(e) {
                return e && e.Math == Math && e;
            }
              , global$b = check("object" == typeof globalThis && globalThis) || check("object" == typeof window && window) || check("object" == typeof self && self) || check("object" == typeof commonjsGlobal && commonjsGlobal) || function() {
                return this;
            }() || Function("return this")()
              , objectGetOwnPropertyDescriptor = {}
              , fails$a = function(e) {
                try {
                    return !!e();
                } catch (e) {
                    return !0;
                }
            }
              , fails$9 = fails$a
              , descriptors = !fails$9(function() {
                return 7 != Object.defineProperty({}, 1, {
                    get: function() {
                        return 7;
                    }
                })[1];
            })
              , fails$8 = fails$a
              , functionBindNative = !fails$8(function() {
                var e = function() {}
                .bind();
                return "function" != typeof e || e.hasOwnProperty("prototype");
            })
              , NATIVE_BIND$1 = functionBindNative
              , call$4 = Function.prototype.call
              , functionCall = NATIVE_BIND$1 ? call$4.bind(call$4) : function() {
                return call$4.apply(call$4, arguments);
            }
              , objectPropertyIsEnumerable = {}
              , $propertyIsEnumerable$1 = {}.propertyIsEnumerable
              , getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor
              , NASHORN_BUG = getOwnPropertyDescriptor$1 && !$propertyIsEnumerable$1.call({
                1: 2
            }, 1);
            objectPropertyIsEnumerable.f = NASHORN_BUG ? function(e) {
                var t = getOwnPropertyDescriptor$1(this, e);
                return !!t && t.enumerable;
            }
            : $propertyIsEnumerable$1;
            var createPropertyDescriptor$2 = function(e, t) {
                return {
                    enumerable: !(1 & e),
                    configurable: !(2 & e),
                    writable: !(4 & e),
                    value: t
                };
            }, NATIVE_BIND = functionBindNative, FunctionPrototype$1 = Function.prototype, bind = FunctionPrototype$1.bind, call$3 = FunctionPrototype$1.call, uncurryThis$b = NATIVE_BIND && bind.bind(call$3, call$3), functionUncurryThis = NATIVE_BIND ? function(e) {
                return e && uncurryThis$b(e);
            }
            : function(e) {
                return e && function() {
                    return call$3.apply(e, arguments);
                }
                ;
            }
            , uncurryThis$a = functionUncurryThis, toString$1 = uncurryThis$a({}.toString), stringSlice = uncurryThis$a("".slice), classofRaw$1 = function(e) {
                return stringSlice(toString$1(e), 8, -1);
            }, uncurryThis$9 = functionUncurryThis, fails$7 = fails$a, classof$2 = classofRaw$1, $Object$3 = Object, split = uncurryThis$9("".split), indexedObject = fails$7(function() {
                return !$Object$3("z").propertyIsEnumerable(0);
            }) ? function(e) {
                return "String" == classof$2(e) ? split(e, "") : $Object$3(e);
            }
            : $Object$3, $TypeError$6 = TypeError, requireObjectCoercible$2 = function(e) {
                if (null == e)
                    throw $TypeError$6("Can't call method on " + e);
                return e;
            }, IndexedObject = indexedObject, requireObjectCoercible$1 = requireObjectCoercible$2, toIndexedObject$4 = function(e) {
                return IndexedObject(requireObjectCoercible$1(e));
            }, isCallable$d = function(e) {
                return "function" == typeof e;
            }, isCallable$c = isCallable$d, isObject$6 = function(e) {
                return "object" == typeof e ? null !== e : isCallable$c(e);
            }, global$a = global$b, isCallable$b = isCallable$d, aFunction = function(e) {
                return isCallable$b(e) ? e : void 0;
            }, getBuiltIn$5 = function(e, t) {
                return arguments.length < 2 ? aFunction(global$a[e]) : global$a[e] && global$a[e][t];
            }, uncurryThis$8 = functionUncurryThis, objectIsPrototypeOf = uncurryThis$8({}.isPrototypeOf), getBuiltIn$4 = getBuiltIn$5, engineUserAgent = getBuiltIn$4("navigator", "userAgent") || "", global$9 = global$b, userAgent = engineUserAgent, process = global$9.process, Deno = global$9.Deno, versions = process && process.versions || Deno && Deno.version, v8 = versions && versions.v8, match, version;
            v8 && (match = v8.split("."),
            version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1])),
            !version && userAgent && (match = userAgent.match(/Edge\/(\d+)/),
            (!match || match[1] >= 74) && (match = userAgent.match(/Chrome\/(\d+)/),
            match && (version = +match[1])));
            var engineV8Version = version
              , V8_VERSION = engineV8Version
              , fails$6 = fails$a
              , nativeSymbol = !!Object.getOwnPropertySymbols && !fails$6(function() {
                var e = Symbol();
                return !String(e) || !(Object(e)instanceof Symbol) || !Symbol.sham && V8_VERSION && V8_VERSION < 41;
            })
              , NATIVE_SYMBOL$1 = nativeSymbol
              , useSymbolAsUid = NATIVE_SYMBOL$1 && !Symbol.sham && "symbol" == typeof Symbol.iterator
              , getBuiltIn$3 = getBuiltIn$5
              , isCallable$a = isCallable$d
              , isPrototypeOf = objectIsPrototypeOf
              , USE_SYMBOL_AS_UID$1 = useSymbolAsUid
              , $Object$2 = Object
              , isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function(e) {
                return "symbol" == typeof e;
            }
            : function(e) {
                var t = getBuiltIn$3("Symbol");
                return isCallable$a(t) && isPrototypeOf(t.prototype, $Object$2(e));
            }
              , $String$1 = String
              , tryToString$2 = function(e) {
                try {
                    return $String$1(e);
                } catch (e) {
                    return "Object";
                }
            }
              , isCallable$9 = isCallable$d
              , tryToString$1 = tryToString$2
              , $TypeError$5 = TypeError
              , aCallable$2 = function(e) {
                if (isCallable$9(e))
                    return e;
                throw $TypeError$5(tryToString$1(e) + " is not a function");
            }
              , aCallable$1 = aCallable$2
              , getMethod$1 = function(e, t) {
                var r = e[t];
                return null == r ? void 0 : aCallable$1(r);
            }
              , call$2 = functionCall
              , isCallable$8 = isCallable$d
              , isObject$5 = isObject$6
              , $TypeError$4 = TypeError
              , ordinaryToPrimitive$1 = function(e, t) {
                var r, o;
                if ("string" === t && isCallable$8(r = e.toString) && !isObject$5(o = call$2(r, e)))
                    return o;
                if (isCallable$8(r = e.valueOf) && !isObject$5(o = call$2(r, e)))
                    return o;
                if ("string" !== t && isCallable$8(r = e.toString) && !isObject$5(o = call$2(r, e)))
                    return o;
                throw $TypeError$4("Can't convert object to primitive value");
            }
              , shared$3 = {
                exports: {}
            }
              , global$8 = global$b
              , defineProperty$1 = Object.defineProperty
              , defineGlobalProperty$3 = function(e, t) {
                try {
                    defineProperty$1(global$8, e, {
                        value: t,
                        configurable: !0,
                        writable: !0
                    });
                } catch (r) {
                    global$8[e] = t;
                }
                return t;
            }
              , global$7 = global$b
              , defineGlobalProperty$2 = defineGlobalProperty$3
              , SHARED = "__core-js_shared__"
              , store$4 = global$7[SHARED] || defineGlobalProperty$2(SHARED, {})
              , sharedStore = store$4
              , store$3 = sharedStore;
            (shared$3.exports = function(e, t) {
                return store$3[e] || (store$3[e] = void 0 !== t ? t : {});
            }
            )("versions", []).push({
                version: "3.23.5",
                mode: "global",
                copyright: "© 2014-2022 Denis Pushkarev (zloirock.ru)",
                license: "https://github.com/zloirock/core-js/blob/v3.23.5/LICENSE",
                source: "https://github.com/zloirock/core-js"
            });
            var requireObjectCoercible = requireObjectCoercible$2
              , $Object$1 = Object
              , toObject$1 = function(e) {
                return $Object$1(requireObjectCoercible(e));
            }
              , uncurryThis$7 = functionUncurryThis
              , toObject = toObject$1
              , hasOwnProperty = uncurryThis$7({}.hasOwnProperty)
              , hasOwnProperty_1 = Object.hasOwn || function(e, t) {
                return hasOwnProperty(toObject(e), t);
            }
              , uncurryThis$6 = functionUncurryThis
              , id = 0
              , postfix = Math.random()
              , toString = uncurryThis$6(1..toString)
              , uid$2 = function(e) {
                return "Symbol(" + (void 0 === e ? "" : e) + ")_" + toString(++id + postfix, 36);
            }
              , global$6 = global$b
              , shared$2 = shared$3.exports
              , hasOwn$6 = hasOwnProperty_1
              , uid$1 = uid$2
              , NATIVE_SYMBOL = nativeSymbol
              , USE_SYMBOL_AS_UID = useSymbolAsUid
              , WellKnownSymbolsStore = shared$2("wks")
              , Symbol$1 = global$6.Symbol
              , symbolFor = Symbol$1 && Symbol$1.for
              , createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1
              , wellKnownSymbol$4 = function(e) {
                if (!hasOwn$6(WellKnownSymbolsStore, e) || !NATIVE_SYMBOL && "string" != typeof WellKnownSymbolsStore[e]) {
                    var t = "Symbol." + e;
                    NATIVE_SYMBOL && hasOwn$6(Symbol$1, e) ? WellKnownSymbolsStore[e] = Symbol$1[e] : WellKnownSymbolsStore[e] = USE_SYMBOL_AS_UID && symbolFor ? symbolFor(t) : createWellKnownSymbol(t);
                }
                return WellKnownSymbolsStore[e];
            }
              , call$1 = functionCall
              , isObject$4 = isObject$6
              , isSymbol$1 = isSymbol$2
              , getMethod = getMethod$1
              , ordinaryToPrimitive = ordinaryToPrimitive$1
              , wellKnownSymbol$3 = wellKnownSymbol$4
              , $TypeError$3 = TypeError
              , TO_PRIMITIVE = wellKnownSymbol$3("toPrimitive")
              , toPrimitive$1 = function(e, t) {
                if (!isObject$4(e) || isSymbol$1(e))
                    return e;
                var r, o = getMethod(e, TO_PRIMITIVE);
                if (o) {
                    if (void 0 === t && (t = "default"),
                    r = call$1(o, e, t),
                    !isObject$4(r) || isSymbol$1(r))
                        return r;
                    throw $TypeError$3("Can't convert object to primitive value");
                }
                return void 0 === t && (t = "number"),
                ordinaryToPrimitive(e, t);
            }
              , toPrimitive = toPrimitive$1
              , isSymbol = isSymbol$2
              , toPropertyKey$2 = function(e) {
                var t = toPrimitive(e, "string");
                return isSymbol(t) ? t : t + "";
            }
              , global$5 = global$b
              , isObject$3 = isObject$6
              , document = global$5.document
              , EXISTS$1 = isObject$3(document) && isObject$3(document.createElement)
              , documentCreateElement = function(e) {
                return EXISTS$1 ? document.createElement(e) : {};
            }
              , DESCRIPTORS$7 = descriptors
              , fails$5 = fails$a
              , createElement = documentCreateElement
              , ie8DomDefine = !DESCRIPTORS$7 && !fails$5(function() {
                return 7 != Object.defineProperty(createElement("div"), "a", {
                    get: function() {
                        return 7;
                    }
                }).a;
            })
              , DESCRIPTORS$6 = descriptors
              , call = functionCall
              , propertyIsEnumerableModule = objectPropertyIsEnumerable
              , createPropertyDescriptor$1 = createPropertyDescriptor$2
              , toIndexedObject$3 = toIndexedObject$4
              , toPropertyKey$1 = toPropertyKey$2
              , hasOwn$5 = hasOwnProperty_1
              , IE8_DOM_DEFINE$1 = ie8DomDefine
              , $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
            objectGetOwnPropertyDescriptor.f = DESCRIPTORS$6 ? $getOwnPropertyDescriptor$1 : function(e, t) {
                if (e = toIndexedObject$3(e),
                t = toPropertyKey$1(t),
                IE8_DOM_DEFINE$1)
                    try {
                        return $getOwnPropertyDescriptor$1(e, t);
                    } catch (e) {}
                if (hasOwn$5(e, t))
                    return createPropertyDescriptor$1(!call(propertyIsEnumerableModule.f, e, t), e[t]);
            }
            ;
            var objectDefineProperty = {}
              , DESCRIPTORS$5 = descriptors
              , fails$4 = fails$a
              , v8PrototypeDefineBug = DESCRIPTORS$5 && fails$4(function() {
                return 42 != Object.defineProperty(function() {}, "prototype", {
                    value: 42,
                    writable: !1
                }).prototype;
            })
              , isObject$2 = isObject$6
              , $String = String
              , $TypeError$2 = TypeError
              , anObject$4 = function(e) {
                if (isObject$2(e))
                    return e;
                throw $TypeError$2($String(e) + " is not an object");
            }
              , DESCRIPTORS$4 = descriptors
              , IE8_DOM_DEFINE = ie8DomDefine
              , V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug
              , anObject$3 = anObject$4
              , toPropertyKey = toPropertyKey$2
              , $TypeError$1 = TypeError
              , $defineProperty = Object.defineProperty
              , $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor
              , ENUMERABLE = "enumerable"
              , CONFIGURABLE$1 = "configurable"
              , WRITABLE = "writable";
            objectDefineProperty.f = DESCRIPTORS$4 ? V8_PROTOTYPE_DEFINE_BUG ? function(e, t, r) {
                if (anObject$3(e),
                t = toPropertyKey(t),
                anObject$3(r),
                "function" == typeof e && "prototype" === t && "value"in r && WRITABLE in r && !r[WRITABLE]) {
                    var o = $getOwnPropertyDescriptor(e, t);
                    o && o[WRITABLE] && (e[t] = r.value,
                    r = {
                        configurable: CONFIGURABLE$1 in r ? r[CONFIGURABLE$1] : o[CONFIGURABLE$1],
                        enumerable: ENUMERABLE in r ? r[ENUMERABLE] : o[ENUMERABLE],
                        writable: !1
                    });
                }
                return $defineProperty(e, t, r);
            }
            : $defineProperty : function(e, t, r) {
                if (anObject$3(e),
                t = toPropertyKey(t),
                anObject$3(r),
                IE8_DOM_DEFINE)
                    try {
                        return $defineProperty(e, t, r);
                    } catch (e) {}
                if ("get"in r || "set"in r)
                    throw $TypeError$1("Accessors not supported");
                return "value"in r && (e[t] = r.value),
                e;
            }
            ;
            var DESCRIPTORS$3 = descriptors
              , definePropertyModule$2 = objectDefineProperty
              , createPropertyDescriptor = createPropertyDescriptor$2
              , createNonEnumerableProperty$2 = DESCRIPTORS$3 ? function(e, t, r) {
                return definePropertyModule$2.f(e, t, createPropertyDescriptor(1, r));
            }
            : function(e, t, r) {
                return e[t] = r,
                e;
            }
              , makeBuiltIn$2 = {
                exports: {}
            }
              , DESCRIPTORS$2 = descriptors
              , hasOwn$4 = hasOwnProperty_1
              , FunctionPrototype = Function.prototype
              , getDescriptor = DESCRIPTORS$2 && Object.getOwnPropertyDescriptor
              , EXISTS = hasOwn$4(FunctionPrototype, "name")
              , PROPER = EXISTS && "something" === function() {}
            .name
              , CONFIGURABLE = EXISTS && (!DESCRIPTORS$2 || DESCRIPTORS$2 && getDescriptor(FunctionPrototype, "name").configurable)
              , functionName = {
                EXISTS: EXISTS,
                PROPER: PROPER,
                CONFIGURABLE: CONFIGURABLE
            }
              , uncurryThis$5 = functionUncurryThis
              , isCallable$7 = isCallable$d
              , store$2 = sharedStore
              , functionToString = uncurryThis$5(Function.toString);
            isCallable$7(store$2.inspectSource) || (store$2.inspectSource = function(e) {
                return functionToString(e);
            }
            );
            var inspectSource$3 = store$2.inspectSource, global$4 = global$b, isCallable$6 = isCallable$d, inspectSource$2 = inspectSource$3, WeakMap$1 = global$4.WeakMap, nativeWeakMap = isCallable$6(WeakMap$1) && /native code/.test(inspectSource$2(WeakMap$1)), shared$1 = shared$3.exports, uid = uid$2, keys = shared$1("keys"), sharedKey$1 = function(e) {
                return keys[e] || (keys[e] = uid(e));
            }, hiddenKeys$3 = {}, NATIVE_WEAK_MAP = nativeWeakMap, global$3 = global$b, uncurryThis$4 = functionUncurryThis, isObject$1 = isObject$6, createNonEnumerableProperty$1 = createNonEnumerableProperty$2, hasOwn$3 = hasOwnProperty_1, shared = sharedStore, sharedKey = sharedKey$1, hiddenKeys$2 = hiddenKeys$3, OBJECT_ALREADY_INITIALIZED = "Object already initialized", TypeError$1 = global$3.TypeError, WeakMap = global$3.WeakMap, set, get, has, enforce = function(e) {
                return has(e) ? get(e) : set(e, {});
            }, getterFor = function(e) {
                return function(t) {
                    var r;
                    if (!isObject$1(t) || (r = get(t)).type !== e)
                        throw TypeError$1("Incompatible receiver, " + e + " required");
                    return r;
                }
                ;
            };
            if (NATIVE_WEAK_MAP || shared.state) {
                var store$1 = shared.state || (shared.state = new WeakMap())
                  , wmget = uncurryThis$4(store$1.get)
                  , wmhas = uncurryThis$4(store$1.has)
                  , wmset = uncurryThis$4(store$1.set);
                set = function(e, t) {
                    if (wmhas(store$1, e))
                        throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
                    return t.facade = e,
                    wmset(store$1, e, t),
                    t;
                }
                ,
                get = function(e) {
                    return wmget(store$1, e) || {};
                }
                ,
                has = function(e) {
                    return wmhas(store$1, e);
                }
                ;
            } else {
                var STATE = sharedKey("state");
                hiddenKeys$2[STATE] = !0,
                set = function(e, t) {
                    if (hasOwn$3(e, STATE))
                        throw new TypeError$1(OBJECT_ALREADY_INITIALIZED);
                    return t.facade = e,
                    createNonEnumerableProperty$1(e, STATE, t),
                    t;
                }
                ,
                get = function(e) {
                    return hasOwn$3(e, STATE) ? e[STATE] : {};
                }
                ,
                has = function(e) {
                    return hasOwn$3(e, STATE);
                }
                ;
            }
            var internalState = {
                set: set,
                get: get,
                has: has,
                enforce: enforce,
                getterFor: getterFor
            }
              , fails$3 = fails$a
              , isCallable$5 = isCallable$d
              , hasOwn$2 = hasOwnProperty_1
              , DESCRIPTORS$1 = descriptors
              , CONFIGURABLE_FUNCTION_NAME = functionName.CONFIGURABLE
              , inspectSource$1 = inspectSource$3
              , InternalStateModule = internalState
              , enforceInternalState = InternalStateModule.enforce
              , getInternalState = InternalStateModule.get
              , defineProperty = Object.defineProperty
              , CONFIGURABLE_LENGTH = DESCRIPTORS$1 && !fails$3(function() {
                return 8 !== defineProperty(function() {}, "length", {
                    value: 8
                }).length;
            })
              , TEMPLATE = String(String).split("String")
              , makeBuiltIn$1 = makeBuiltIn$2.exports = function(e, t, r) {
                "Symbol(" === String(t).slice(0, 7) && (t = "[" + String(t).replace(/^Symbol\(([^)]*)\)/, "$1") + "]"),
                r && r.getter && (t = "get " + t),
                r && r.setter && (t = "set " + t),
                (!hasOwn$2(e, "name") || CONFIGURABLE_FUNCTION_NAME && e.name !== t) && (DESCRIPTORS$1 ? defineProperty(e, "name", {
                    value: t,
                    configurable: !0
                }) : e.name = t),
                CONFIGURABLE_LENGTH && r && hasOwn$2(r, "arity") && e.length !== r.arity && defineProperty(e, "length", {
                    value: r.arity
                });
                try {
                    r && hasOwn$2(r, "constructor") && r.constructor ? DESCRIPTORS$1 && defineProperty(e, "prototype", {
                        writable: !1
                    }) : e.prototype && (e.prototype = void 0);
                } catch (e) {}
                var o = enforceInternalState(e);
                return hasOwn$2(o, "source") || (o.source = TEMPLATE.join("string" == typeof t ? t : "")),
                e;
            }
            ;
            Function.prototype.toString = makeBuiltIn$1(function() {
                return isCallable$5(this) && getInternalState(this).source || inspectSource$1(this);
            }, "toString");
            var isCallable$4 = isCallable$d
              , definePropertyModule$1 = objectDefineProperty
              , makeBuiltIn = makeBuiltIn$2.exports
              , defineGlobalProperty$1 = defineGlobalProperty$3
              , defineBuiltIn$2 = function(e, t, r, o) {
                o || (o = {});
                var n = o.enumerable
                  , s = void 0 !== o.name ? o.name : t;
                if (isCallable$4(r) && makeBuiltIn(r, s, o),
                o.global)
                    n ? e[t] = r : defineGlobalProperty$1(t, r);
                else {
                    try {
                        o.unsafe ? e[t] && (n = !0) : delete e[t];
                    } catch (e) {}
                    n ? e[t] = r : definePropertyModule$1.f(e, t, {
                        value: r,
                        enumerable: !1,
                        configurable: !o.nonConfigurable,
                        writable: !o.nonWritable
                    });
                }
                return e;
            }
              , objectGetOwnPropertyNames = {}
              , ceil = Math.ceil
              , floor = Math.floor
              , mathTrunc = Math.trunc || function(e) {
                var t = +e;
                return (t > 0 ? floor : ceil)(t);
            }
              , trunc = mathTrunc
              , toIntegerOrInfinity$2 = function(e) {
                var t = +e;
                return t != t || 0 === t ? 0 : trunc(t);
            }
              , toIntegerOrInfinity$1 = toIntegerOrInfinity$2
              , max = Math.max
              , min$1 = Math.min
              , toAbsoluteIndex$1 = function(e, t) {
                var r = toIntegerOrInfinity$1(e);
                return r < 0 ? max(r + t, 0) : min$1(r, t);
            }
              , toIntegerOrInfinity = toIntegerOrInfinity$2
              , min = Math.min
              , toLength$1 = function(e) {
                return e > 0 ? min(toIntegerOrInfinity(e), 9007199254740991) : 0;
            }
              , toLength = toLength$1
              , lengthOfArrayLike$1 = function(e) {
                return toLength(e.length);
            }
              , toIndexedObject$2 = toIndexedObject$4
              , toAbsoluteIndex = toAbsoluteIndex$1
              , lengthOfArrayLike = lengthOfArrayLike$1
              , createMethod$1 = function(e) {
                return function(t, r, o) {
                    var n, s = toIndexedObject$2(t), i = lengthOfArrayLike(s), a = toAbsoluteIndex(o, i);
                    if (e && r != r) {
                        for (; i > a; )
                            if ((n = s[a++]) != n)
                                return !0;
                    } else
                        for (; i > a; a++)
                            if ((e || a in s) && s[a] === r)
                                return e || a || 0;
                    return !e && -1;
                }
                ;
            }
              , arrayIncludes = {
                includes: createMethod$1(!0),
                indexOf: createMethod$1(!1)
            }
              , uncurryThis$3 = functionUncurryThis
              , hasOwn$1 = hasOwnProperty_1
              , toIndexedObject$1 = toIndexedObject$4
              , indexOf = arrayIncludes.indexOf
              , hiddenKeys$1 = hiddenKeys$3
              , push$1 = uncurryThis$3([].push)
              , objectKeysInternal = function(e, t) {
                var r, o = toIndexedObject$1(e), n = 0, s = [];
                for (r in o)
                    !hasOwn$1(hiddenKeys$1, r) && hasOwn$1(o, r) && push$1(s, r);
                for (; t.length > n; )
                    hasOwn$1(o, r = t[n++]) && (~indexOf(s, r) || push$1(s, r));
                return s;
            }
              , enumBugKeys$2 = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"]
              , internalObjectKeys$1 = objectKeysInternal
              , enumBugKeys$1 = enumBugKeys$2
              , hiddenKeys = enumBugKeys$1.concat("length", "prototype");
            objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function(e) {
                return internalObjectKeys$1(e, hiddenKeys);
            }
            ;
            var objectGetOwnPropertySymbols = {};
            objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
            var getBuiltIn$2 = getBuiltIn$5
              , uncurryThis$2 = functionUncurryThis
              , getOwnPropertyNamesModule = objectGetOwnPropertyNames
              , getOwnPropertySymbolsModule = objectGetOwnPropertySymbols
              , anObject$2 = anObject$4
              , concat = uncurryThis$2([].concat)
              , ownKeys$1 = getBuiltIn$2("Reflect", "ownKeys") || function(e) {
                var t = getOwnPropertyNamesModule.f(anObject$2(e))
                  , r = getOwnPropertySymbolsModule.f;
                return r ? concat(t, r(e)) : t;
            }
              , hasOwn = hasOwnProperty_1
              , ownKeys = ownKeys$1
              , getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor
              , definePropertyModule = objectDefineProperty
              , copyConstructorProperties$1 = function(e, t, r) {
                for (var o = ownKeys(t), n = definePropertyModule.f, s = getOwnPropertyDescriptorModule.f, i = 0; i < o.length; i++) {
                    var a = o[i];
                    hasOwn(e, a) || r && hasOwn(r, a) || n(e, a, s(t, a));
                }
            }
              , fails$2 = fails$a
              , isCallable$3 = isCallable$d
              , replacement = /#|\.prototype\./
              , isForced$1 = function(e, t) {
                var r = data[normalize(e)];
                return r == POLYFILL || r != NATIVE && (isCallable$3(t) ? fails$2(t) : !!t);
            }
              , normalize = isForced$1.normalize = function(e) {
                return String(e).replace(replacement, ".").toLowerCase();
            }
              , data = isForced$1.data = {}
              , NATIVE = isForced$1.NATIVE = "N"
              , POLYFILL = isForced$1.POLYFILL = "P"
              , isForced_1 = isForced$1
              , global$2 = global$b
              , getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f
              , createNonEnumerableProperty = createNonEnumerableProperty$2
              , defineBuiltIn$1 = defineBuiltIn$2
              , defineGlobalProperty = defineGlobalProperty$3
              , copyConstructorProperties = copyConstructorProperties$1
              , isForced = isForced_1
              , _export = function(e, t) {
                var r, o, n, s, i, a = e.target, l = e.global, c = e.stat;
                if (r = l ? global$2 : c ? global$2[a] || defineGlobalProperty(a, {}) : (global$2[a] || {}).prototype)
                    for (o in t) {
                        if (s = t[o],
                        n = e.dontCallGetSet ? (i = getOwnPropertyDescriptor(r, o)) && i.value : r[o],
                        !isForced(l ? o : a + (c ? "." : "#") + o, e.forced) && void 0 !== n) {
                            if (typeof s == typeof n)
                                continue;
                            copyConstructorProperties(s, n);
                        }
                        (e.sham || n && n.sham) && createNonEnumerableProperty(s, "sham", !0),
                        defineBuiltIn$1(r, o, s, e);
                    }
            }
              , global$1 = global$b
              , promiseNativeConstructor = global$1.Promise
              , wellKnownSymbol$2 = wellKnownSymbol$4
              , TO_STRING_TAG$1 = wellKnownSymbol$2("toStringTag")
              , test = {};
            test[TO_STRING_TAG$1] = "z";
            var toStringTagSupport = "[object z]" === String(test)
              , TO_STRING_TAG_SUPPORT = toStringTagSupport
              , isCallable$2 = isCallable$d
              , classofRaw = classofRaw$1
              , wellKnownSymbol$1 = wellKnownSymbol$4
              , TO_STRING_TAG = wellKnownSymbol$1("toStringTag")
              , $Object = Object
              , CORRECT_ARGUMENTS = "Arguments" == classofRaw(function() {
                return arguments;
            }())
              , tryGet = function(e, t) {
                try {
                    return e[t];
                } catch (e) {}
            }
              , classof$1 = TO_STRING_TAG_SUPPORT ? classofRaw : function(e) {
                var t, r, o;
                return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof (r = tryGet(t = $Object(e), TO_STRING_TAG)) ? r : CORRECT_ARGUMENTS ? classofRaw(t) : "Object" == (o = classofRaw(t)) && isCallable$2(t.callee) ? "Arguments" : o;
            }
              , uncurryThis$1 = functionUncurryThis
              , fails$1 = fails$a
              , isCallable$1 = isCallable$d
              , classof = classof$1
              , getBuiltIn$1 = getBuiltIn$5
              , inspectSource = inspectSource$3
              , noop = function() {}
              , empty = []
              , construct = getBuiltIn$1("Reflect", "construct")
              , constructorRegExp = /^\s*(?:class|function)\b/
              , exec = uncurryThis$1(constructorRegExp.exec)
              , INCORRECT_TO_STRING = !constructorRegExp.exec(noop)
              , isConstructorModern = function(e) {
                if (!isCallable$1(e))
                    return !1;
                try {
                    return construct(noop, empty, e),
                    !0;
                } catch (e) {
                    return !1;
                }
            }
              , isConstructorLegacy = function(e) {
                if (!isCallable$1(e))
                    return !1;
                switch (classof(e)) {
                case "AsyncFunction":
                case "GeneratorFunction":
                case "AsyncGeneratorFunction":
                    return !1;
                }
                try {
                    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(e));
                } catch (e) {
                    return !0;
                }
            };
            isConstructorLegacy.sham = !0;
            var isConstructor$1 = !construct || fails$1(function() {
                var e;
                return isConstructorModern(isConstructorModern.call) || !isConstructorModern(Object) || !isConstructorModern(function() {
                    e = !0;
                }) || e;
            }) ? isConstructorLegacy : isConstructorModern
              , isConstructor = isConstructor$1
              , tryToString = tryToString$2
              , $TypeError = TypeError
              , aConstructor$1 = function(e) {
                if (isConstructor(e))
                    return e;
                throw $TypeError(tryToString(e) + " is not a constructor");
            }
              , anObject$1 = anObject$4
              , aConstructor = aConstructor$1
              , wellKnownSymbol = wellKnownSymbol$4
              , SPECIES = wellKnownSymbol("species")
              , speciesConstructor$1 = function(e, t) {
                var r, o = anObject$1(e).constructor;
                return void 0 === o || null == (r = anObject$1(o)[SPECIES]) ? t : aConstructor(r);
            }
              , newPromiseCapability$1 = {}
              , aCallable = aCallable$2
              , PromiseCapability = function(e) {
                var t, r;
                this.promise = new e(function(e, o) {
                    if (void 0 !== t || void 0 !== r)
                        throw TypeError("Bad Promise constructor");
                    t = e,
                    r = o;
                }
                ),
                this.resolve = aCallable(t),
                this.reject = aCallable(r);
            };
            newPromiseCapability$1.f = function(e) {
                return new PromiseCapability(e);
            }
            ;
            var anObject = anObject$4
              , isObject = isObject$6
              , newPromiseCapability = newPromiseCapability$1
              , promiseResolve$1 = function(e, t) {
                if (anObject(e),
                isObject(t) && t.constructor === e)
                    return t;
                var r = newPromiseCapability.f(e);
                return (0,
                r.resolve)(t),
                r.promise;
            }
              , $$1 = _export
              , NativePromiseConstructor = promiseNativeConstructor
              , fails = fails$a
              , getBuiltIn = getBuiltIn$5
              , isCallable = isCallable$d
              , speciesConstructor = speciesConstructor$1
              , promiseResolve = promiseResolve$1
              , defineBuiltIn = defineBuiltIn$2
              , NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype
              , NON_GENERIC = !!NativePromiseConstructor && fails(function() {
                NativePromisePrototype.finally.call({
                    then: function() {}
                }, function() {});
            });
            if ($$1({
                target: "Promise",
                proto: !0,
                real: !0,
                forced: NON_GENERIC
            }, {
                finally: function(e) {
                    var t = speciesConstructor(this, getBuiltIn("Promise"))
                      , r = isCallable(e);
                    return this.then(r ? function(r) {
                        return promiseResolve(t, e()).then(function() {
                            return r;
                        });
                    }
                    : e, r ? function(r) {
                        return promiseResolve(t, e()).then(function() {
                            throw r;
                        });
                    }
                    : e);
                }
            }),
            isCallable(NativePromiseConstructor)) {
                var method = getBuiltIn("Promise").prototype.finally;
                NativePromisePrototype.finally !== method && defineBuiltIn(NativePromisePrototype, "finally", method, {
                    unsafe: !0
                });
            }
            var internalObjectKeys = objectKeysInternal
              , enumBugKeys = enumBugKeys$2
              , objectKeys$1 = Object.keys || function(e) {
                return internalObjectKeys(e, enumBugKeys);
            }
              , DESCRIPTORS = descriptors
              , uncurryThis = functionUncurryThis
              , objectKeys = objectKeys$1
              , toIndexedObject = toIndexedObject$4
              , $propertyIsEnumerable = objectPropertyIsEnumerable.f
              , propertyIsEnumerable = uncurryThis($propertyIsEnumerable)
              , push = uncurryThis([].push)
              , createMethod = function(e) {
                return function(t) {
                    for (var r, o = toIndexedObject(t), n = objectKeys(o), s = n.length, i = 0, a = []; s > i; )
                        r = n[i++],
                        DESCRIPTORS && !propertyIsEnumerable(o, r) || push(a, e ? [r, o[r]] : o[r]);
                    return a;
                }
                ;
            }
              , objectToArray = {
                entries: createMethod(!0),
                values: createMethod(!1)
            }
              , $ = _export
              , $entries = objectToArray.entries;
            function __awaiter(e, t, r, o) {
                return new (r || (r = Promise))(function(n, s) {
                    function i(e) {
                        try {
                            l(o.next(e));
                        } catch (e) {
                            s(e);
                        }
                    }
                    function a(e) {
                        try {
                            l(o.throw(e));
                        } catch (e) {
                            s(e);
                        }
                    }
                    function l(e) {
                        var t;
                        e.done ? n(e.value) : (t = e.value,
                        t instanceof r ? t : new r(function(e) {
                            e(t);
                        }
                        )).then(i, a);
                    }
                    l((o = o.apply(e, t || [])).next());
                }
                );
            }
            $({
                target: "Object",
                stat: !0
            }, {
                entries: function(e) {
                    return $entries(e);
                }
            }),
            "function" == typeof SuppressedError && SuppressedError;
            class EventEmitter {
                constructor() {
                    this.handlers = [];
                }
                on(e) {
                    return this.handlers.push(e),
                    this;
                }
                emit(...e) {
                    this.handlers.forEach(t => t.apply(this, e));
                }
                off(e) {
                    const t = this.handlers.indexOf(e);
                    -1 !== t && (this.handlers[t] = this.handlers[this.handlers.length - 1],
                    this.handlers.pop());
                }
                handlerLength() {
                    return this.handlers.length;
                }
                clear() {
                    this.handlers = [];
                }
            }
            function createSignal() {
                const e = new EventEmitter();
                function t(t) {
                    return e.on(t);
                }
                return t.emit = (...t) => e.emit(...t),
                t.off = t => e.off(t),
                t.clear = () => e.clear(),
                t.handlerLength = () => e.handlerLength(),
                t;
            }
            class Store {
                constructor() {
                    this.eventEmitter = new EventEmitter(),
                    this.stateEmitter = new EventEmitter(),
                    this._state = {
                        state: 0,
                        openId: "",
                        appId: "",
                        appVersion: "",
                        serviceToken: "",
                        playerId: "",
                        lastRoomId: "",
                        roomId: "",
                        groupId: "",
                        lastGroupId: ""
                    };
                }
                get state() {
                    return this._state.state;
                }
                get appId() {
                    return this._state.appId;
                }
                get appVersion() {
                    return this._state.appVersion;
                }
                get serviceToken() {
                    return this._state.serviceToken;
                }
                get playerId() {
                    return this._state.playerId;
                }
                get lastRoomId() {
                    return this._state.lastRoomId;
                }
                get roomId() {
                    return this._state.roomId;
                }
                get groupId() {
                    return this._state.groupId;
                }
                get lastGroupId() {
                    return this._state.lastGroupId;
                }
                get openId() {
                    return this._state.openId;
                }
                setStateAction(e) {
                    const t = this._state.state;
                    this._state.state = e,
                    this.stateEmitter.emit(e, t);
                }
                setAppIdAction(e) {
                    this._state.appId = e;
                }
                setAppVersionAction(e) {
                    this._state.appVersion = e;
                }
                setOpenIdAction(e) {
                    this._state.openId = e;
                }
                setServiceTokenAction(e) {
                    this._state.serviceToken = e;
                }
                setPlayerIdAction(e) {
                    this._state.playerId = e;
                }
                setLastRoomIdAction(e) {
                    this._state.lastRoomId = e;
                }
                setRoomIdAction(e) {
                    this._state.roomId = e;
                }
                setGroupIdAction(e) {
                    this._state.groupId = e;
                }
                setLastGroupIdAction(e) {
                    this._state.lastGroupId = e;
                }
                addStateListener(e) {
                    this.stateEmitter.on(e);
                }
                setEventAction(e) {
                    this.eventEmitter.emit(e);
                }
                addEventListener(e) {
                    this.eventEmitter.on(e);
                }
            }
            var store = new Store();
            function e(e, t, r, o) {
                return new (r || (r = Promise))(function(n, s) {
                    function i(e) {
                        try {
                            l(o.next(e));
                        } catch (e) {
                            s(e);
                        }
                    }
                    function a(e) {
                        try {
                            l(o.throw(e));
                        } catch (e) {
                            s(e);
                        }
                    }
                    function l(e) {
                        e.done ? n(e.value) : new r(function(t) {
                            t(e.value);
                        }
                        ).then(i, a);
                    }
                    l((o = o.apply(e, t || [])).next());
                }
                );
            }
            var t, s, i, n = {
                mapToObject: function(e) {
                    let t = {};
                    for (let[r,o] of e)
                        t[r] = o;
                    return t;
                },
                mapFromObject: function(e) {
                    let t = e
                      , r = new Map();
                    for (let e in t)
                        r.set(e, t[e]);
                    return r;
                }
            };
            class r {
                static init() {
                    return e(this, void 0, void 0, function*() {
                        return !0;
                    });
                }
                getSdkName() {
                    return "HiAnalytic Game SDK";
                }
                getSdkVersion() {
                    return "1.0.0.101";
                }
                getCompressMode() {
                    return !1;
                }
                setServiceTag(e) {
                    r.serviceTag = e;
                }
                setUrls(e) {
                    r.url = e[0];
                }
                setInstanceUUID(e, t) {
                    let o = e + "-instanceUUID";
                    r.uuidMap.set(o, t);
                }
                getInstanceUUID(e) {
                    let t = e + "-instanceUUID";
                    return r.uuidMap.get(t) || "";
                }
                setAppid(e, t) {
                    let o = e + "-appid";
                    r.appIdMap.set(o, t);
                }
                getAppid(e) {
                    let t = e + "-appid";
                    return r.appIdMap.get(t) || "";
                }
                setAppVer(e, t) {
                    let o = e + "-appVer";
                    r.appVerMap.set(o, t);
                }
                getAppVer(e) {
                    let t = e + "-appVer";
                    return r.appVerMap.get(t) || "";
                }
                setUpid(e, t) {
                    let o = e.serviceTag + "-" + e.dataType + "-upid";
                    r.upidMap.set(o, t),
                    r.dataType = e.dataType;
                }
                getUpid(e) {
                    let t = e.serviceTag + "-" + e.dataType + "-upid";
                    return r.upidMap.get(t) || "";
                }
                setCustomHttpHeader(e, t) {
                    let o = n.mapToObject(t)
                      , s = e.serviceTag + "-" + e.dataType + "-customHttpHeader";
                    r.httpHeaderMap.set(s, JSON.stringify(o)),
                    r.dataType = e.dataType;
                }
                getCustomHttpHeader(e) {
                    let t = e.serviceTag + "-" + e.dataType + "-customHttpHeader"
                      , o = r.httpHeaderMap.get(t);
                    return o ? JSON.parse(o) : {};
                }
                setCustomUserProfile(e, t, o) {
                    let n = this.getCustomUserProfiles(e);
                    n[t] = o;
                    let s = e.serviceTag + "-" + e.dataType + "-customUserProfile";
                    r.userProfilesMap.set(s, JSON.stringify(n));
                }
                getCustomUserProfiles(e) {
                    let t = e.serviceTag + "-" + e.dataType + "-customUserProfile"
                      , o = r.userProfilesMap.get(t);
                    return o ? JSON.parse(o) : {};
                }
                setEnableUUID(e, t) {
                    r.enableUUIDMap.set(e, t);
                }
                getEnableUUID(e) {
                    return !!r.enableUUIDMap.has(e) && r.enableUUIDMap.get(e);
                }
                setEnableUDID(e, t) {
                    r.enableUDIDMap.set(e, t);
                }
                getEnableUDID(e) {
                    return !!r.enableUDIDMap.has(e) && r.enableUDIDMap.get(e);
                }
                setEnableSN(e, t) {
                    r.enableSNMap.set(e, t);
                }
                getEnableSN(e) {
                    return !!r.enableSNMap.has(e) && r.enableSNMap.get(e);
                }
                setEnableMccMnc(e, t) {
                    r.enableMccMncMap.set(e, t);
                }
                getEnableMccMnc(e) {
                    return !!r.enableMccMncMap.has(e) && r.enableMccMncMap.get(e);
                }
                setIsOaidTracking(e, t) {
                    r.enableOAIDMap.set(e, t);
                }
                getIsOaidTracking(e) {
                    return !!r.enableOAIDMap.has(e) && r.enableOAIDMap.get(e);
                }
                setMainConf(e, t) {
                    r.mainConfMap.set(e, t),
                    console.log("setMainConf success.");
                }
                setOperConf(e, t) {
                    r.operConfMap.set(e, t),
                    console.log("setOperConf success.");
                }
                getMainConf(e) {
                    return r.mainConfMap.has(e) ? r.mainConfMap.get(e) : void 0;
                }
                getOperConf(e) {
                    return r.operConfMap.has(e) ? r.operConfMap.get(e) : void 0;
                }
            }
            function a(e) {
                switch (e) {
                case t.INT_MAINT:
                    return s.STRING_MAINT;
                case t.INT_PREINS:
                    return s.STRING_PREINS;
                case t.INT_DIFFPRIVACY:
                    return s.STRING_DIFFPRIVACY;
                default:
                    return s.STRING_OPER;
                }
            }
            r.dataType = 0,
            r.serviceTag = "",
            r.url = "",
            r.appIdMap = new Map(),
            r.appVerMap = new Map(),
            r.uuidMap = new Map(),
            r.upidMap = new Map(),
            r.userProfilesMap = new Map(),
            r.httpHeaderMap = new Map(),
            r.enableUUIDMap = new Map(),
            r.enableUDIDMap = new Map(),
            r.enableSNMap = new Map(),
            r.enableMccMncMap = new Map(),
            r.enableOAIDMap = new Map(),
            r.mainConfMap = new Map(),
            r.operConfMap = new Map(),
            function(e) {
                e[e.INT_OPER = 0] = "INT_OPER",
                e[e.INT_MAINT = 1] = "INT_MAINT",
                e[e.INT_PREINS = 2] = "INT_PREINS",
                e[e.INT_DIFFPRIVACY = 3] = "INT_DIFFPRIVACY";
            }(t || (t = {})),
            function(e) {
                e.STRING_OPER = "oper",
                e.STRING_MAINT = "maint",
                e.STRING_PREINS = "preins",
                e.STRING_DIFFPRIVACY = "diffprivacy";
            }(s || (s = {})),
            function(e) {
                e.OPER_DATA_UPLOAD_URL = "{url}/webv2",
                e.MAINT_DATA_UPLOAD_URL = "{url}/webv4",
                e.PREINS_DATA_UPLOAD_URL = "{url}/common/hmshioperbatch",
                e.DIFFPRC_DATA_UPLOAD_URL = "{url}/common/common2";
            }(i || (i = {}));
            class o {
                constructor() {
                    this.globalConfig = new r();
                }
                buildHttpHeader(e, t) {
                    let r = new Map()
                      , o = this.globalConfig.getAppid(e.serviceTag)
                      , n = this.globalConfig.getAppVer(e.serviceTag);
                    r.set("App-Id", o),
                    r.set("App-Ver", n),
                    r.set("Sdk-Name", this.globalConfig.getSdkName()),
                    r.set("Device-Type", ""),
                    r.set("servicetag", e.serviceTag),
                    r.set("Package-Name", o),
                    r.set("Request-Id", t),
                    r.set("Content-type", "application/x-www-form-urlencoded;charset=utf-8");
                    let s = this.globalConfig.getCustomHttpHeader(e);
                    for (let e in s)
                        r.set(e, s[e]);
                    return r;
                }
                each(e, t, r) {
                    const o = Array.prototype.forEach;
                    if (o && e.forEach === o)
                        e.forEach(t, r);
                    else if ((n = e) && "object" == typeof n && isFinite(n.length) && n.length >= 0 && n.length === Math.floor(n.length) && n.length < Math.pow(2, 32))
                        for (let o = 0, n = e.length; o < n; o++)
                            o in e && t.call(r, e[o], o, e);
                    else
                        for (const o in e)
                            Object.hasOwnProperty.call(e, o) && t.call(r, e[o], o, e);
                    var n;
                }
                parseObjectToString(e) {
                    const t = [];
                    return this.each(e, (e, r) => {
                        Array.isArray(e) ? this.each(e, (o, n) => {
                            t.push(r + "=" + e[n]);
                        }
                        ) : t.push(r + "=" + e);
                    }
                    ),
                    t.join("&");
                }
                buildHttpBody(t, r, o) {
                    return e(this, void 0, void 0, function*() {
                        let e = this.buildHttpBodyHeader(t, r)
                          , s = yield this.buildHttpBodyEvent(t, o);
                        const i = {
                            header: n.mapToObject(e),
                            event: JSON.parse(s)
                        }
                          , a = new Date()
                          , l = {
                            action_name: t.serviceTag,
                            idsite: this.globalConfig.getAppid(t.serviceTag),
                            rec: 1,
                            r: 886244,
                            h: a.getHours(),
                            m: a.getMinutes(),
                            s: a.getSeconds(),
                            url: "unknow",
                            _id: "unknow",
                            _idts: 0,
                            _idvc: 0,
                            _idn: "unknow",
                            urlref: "unknow",
                            _refts: 0,
                            _viewts: 0,
                            scd: 24,
                            vpr: "unknow",
                            data: JSON.stringify(i)
                        };
                        return this.parseObjectToString(l);
                    });
                }
                buildHttpBodyHeader(e, t) {
                    let r = new Map()
                      , o = this.globalConfig.getAppid(e.serviceTag);
                    return r.set("protocol_version", "0"),
                    r.set("chifer", ""),
                    r.set("requestid", t),
                    r.set("appid", o),
                    r.set("hmac", ""),
                    r.set("servicetag", e.serviceTag),
                    r.set("compress_mode", this.globalConfig.getCompressMode() ? "1" : "0"),
                    r.set("serviceid", "hmshi" + a(e.dataType) + "qrt"),
                    r.set("timestamp", new Date().getTime().toString()),
                    r;
                }
                buildHttpBodyEvent(t, r) {
                    return e(this, void 0, void 0, function*() {
                        let e = {
                            events_common: yield this.buildEventsCommon(t),
                            events: this.buildEvents(r)
                        };
                        return JSON.stringify(e);
                    });
                }
                uint8ArrayToShowStr(e) {
                    return Array.prototype.map.call(e, e => ("00" + e.toString(16)).slice(-2)).join("");
                }
                buildEventsCommon(t) {
                    return e(this, void 0, void 0, function*() {
                        let e = {
                            _package_name: this.globalConfig.getAppid(t.serviceTag),
                            _app_ver: this.globalConfig.getAppVer(t.serviceTag),
                            _lib_name: this.globalConfig.getSdkName(),
                            _lib_ver: this.globalConfig.getSdkVersion(),
                            _oaid_tracking_flag: !1
                        };
                        return {
                            uuid: this.globalConfig.getEnableUUID(t.serviceTag) ? this.globalConfig.getInstanceUUID(t.serviceTag) : "",
                            properties: e,
                            events_global_properties: this.globalConfig.getCustomUserProfiles(t)
                        };
                    });
                }
                buildEvent(e) {
                    return {
                        type: a(e.type),
                        event: e.name,
                        eventtime: e.eventTime,
                        event_session_name: e.session.name,
                        first_session_event: e.session.firstEvent.toString(),
                        properties: e.properties
                    };
                }
                buildEvents(e) {
                    let t = [];
                    for (let r of e)
                        t.push(this.buildEvent(r));
                    return t;
                }
            }
            class l {
                constructor(e, t, r, o) {
                    this.name = e,
                    this.time = t,
                    this.lastTimestamp = r,
                    this.firstEvent = o;
                }
                static toJson(e) {
                    let t = {
                        name: e.name,
                        time: e.time,
                        lastTimestamp: e.lastTimestamp,
                        firstEvent: e.firstEvent
                    };
                    return JSON.stringify(t);
                }
                static fromJson(e) {
                    let t = JSON.parse(e);
                    return new l(t.name,t.time,t.lastTimestamp,t.firstEvent);
                }
            }
            class p {
                constructor(e, t, r, o, s) {
                    this.type = e,
                    this.name = t,
                    this.eventTime = r,
                    this.properties = n.mapToObject(o),
                    this.session = s;
                }
                static toJson(e) {
                    let t = {
                        type: e.type,
                        name: e.name,
                        eventTime: e.eventTime,
                        properties: JSON.stringify(e.properties),
                        session: l.toJson(e.session)
                    };
                    return JSON.stringify(t);
                }
                static fromJson(e) {
                    let t = JSON.parse(e)
                      , r = l.fromJson(t.session)
                      , o = JSON.parse(t.properties);
                    return new p(t.type,t.name,t.eventTime,n.mapFromObject(o),r);
                }
            }
            var c = new class {
                constructor() {
                    this.eventsMap = new Map();
                }
                toJson(e) {
                    let t = [];
                    for (let r of e)
                        t.push(p.toJson(r));
                    return JSON.stringify(t);
                }
                saveEvent(e, t) {
                    let r = e.serviceTag + "-" + e.dataType + "-events"
                      , o = this.eventsMap.get(r);
                    o ? o.push(t) : o = [t],
                    this.eventsMap.set(r, o);
                    let n = new Object();
                    return n.eventsStr = this.toJson(o),
                    n;
                }
                saveEvents(e, t) {
                    let r = e.serviceTag + "-" + e.dataType + "-events"
                      , o = this.eventsMap.get(r)
                      , n = o;
                    n = o ? o.concat(t) : t,
                    this.eventsMap.set(r, n);
                    let s = new Object();
                    return s.eventsStr = this.toJson(n),
                    s;
                }
                getEvents(e) {
                    let t = e.serviceTag + "-" + e.dataType + "-events";
                    return this.eventsMap.get(t) || null;
                }
                getSize(e) {
                    let t = e.serviceTag + "-" + e.dataType + "-events"
                      , r = this.eventsMap.get(t);
                    return r ? this.toJson(r).length / 1024 : 0;
                }
                clearEvents(e) {
                    let t = e.serviceTag + "-" + e.dataType + "-events";
                    this.eventsMap.delete(t);
                }
                clearAll() {
                    this.eventsMap.clear();
                }
            }
            ();
            class g {
                handleHttpResponse(e, t) {
                    console.info("requestId: " + t.requestId + ", resultCode: " + e),
                    200 !== e && c.saveEvents(t.context, t.events);
                }
            }
            var d = {
                validateServiceTag: e => !!e.match("^[a-zA-Z0-9][a-zA-Z0-9_]{0,255}$"),
                validateAppid: e => !!e.match("^[a-zA-Z0-9_][a-zA-Z0-9. _-]{0,255}$"),
                validateAppVersion: e => !!e.match("^[a-zA-Z0-9_][a-zA-Z0-9. _-]{0,255}$"),
                validateUpid: e => !(e.length > 4096),
                validateUrl: e => !(!e || e.length < 6 || e.length > 256) || (console.log("the length of url is invalid"),
                !1),
                validateDataType: e => !(e < 0 || e > 1) || (console.log("dataType is invalid"),
                !1),
                validateHttpHeader: e => function(e, t, r, o, n) {
                    if (0 === e.size)
                        return console.log("map is empty"),
                        null;
                    if (e.size > 50)
                        return console.log("map size is too big"),
                        null;
                    let s = new Map();
                    for (let[t,r] of e)
                        0 === t.length || t.length > 1024 ? console.log("the length of key is invalid: " + t) : t.startsWith(n) ? 0 === r.length || r.length > 1024 ? console.log("the length of value is invalid: " + r) : s.set(t, r) : console.log("the format of key is invalid: " + t);
                    return 0 === s.size ? null : s;
                }(e, 0, 0, 0, "x-hasdk"),
                validateCustomUserProfile: (e, t) => 0 === e.length || e.length > 128 ? (console.log("the length of name is invalid"),
                !1) : 0 === t.length || t.length > 512 ? (console.log("the length of value is invalid"),
                !1) : !!e.match("^[A-Za-z][A-Za-z0-9_]{0,128}$") || (console.log("user profile name is invalid"),
                !1),
                validateEvent: (e, t) => 0 === e.length || e.length > 256 ? (console.log("the length of event name is invalid"),
                !1) : 0 === t.size ? (console.log("properties is empty"),
                !1) : !(t.size > 2048 || JSON.stringify(n.mapToObject(t)).length > 204800) || (console.log("properties is too big"),
                !1)
            };
            class u {
                constructor(e, r) {
                    this.serviceTag = e,
                    r !== t.INT_MAINT && r !== t.INT_PREINS && r !== t.INT_DIFFPRIVACY ? this.dataType = t.INT_OPER : this.dataType = r;
                }
            }
            class h {
                constructor(e, t) {
                    this.globalConfig = new r(),
                    this.httpClient = e,
                    this.httpDelegate = t;
                }
                route(t, r, o, n, s) {
                    return e(this, void 0, void 0, function*() {
                        let e = -1;
                        if (!r)
                            return console.error("there is no available url"),
                            void this.httpDelegate.handleHttpResponse(-1, s);
                        e = yield this.post(t, r, o, n),
                        this.httpDelegate.handleHttpResponse(e, s);
                    });
                }
                post(r, o, n, s) {
                    return e(this, void 0, void 0, function*() {
                        const e = this.globalConfig.getAppid(r.serviceTag);
                        let a = function(e, r, o) {
                            let n;
                            switch (e) {
                            case t.INT_MAINT:
                                n = i.MAINT_DATA_UPLOAD_URL + "?idsite=" + o;
                                break;
                            case t.INT_PREINS:
                                n = i.PREINS_DATA_UPLOAD_URL;
                                break;
                            case t.INT_DIFFPRIVACY:
                                n = i.DIFFPRC_DATA_UPLOAD_URL;
                                break;
                            default:
                                n = i.OPER_DATA_UPLOAD_URL + "?idsite=" + o;
                            }
                            return n = n.replace("{url}", r),
                            n.startsWith("https://") || (n = "https://" + n),
                            n;
                        }(r.dataType, o, e);
                        return yield this.httpClient.post(a, n, s);
                    });
                }
            }
            class v {
                constructor(e, t) {
                    this.lastTimestampMap = new Map(),
                    this.timeInterval = e,
                    this.limitSize = t;
                }
                makeDecision(t, r) {
                    return e(this, void 0, void 0, function*() {
                        let e = new Date().getTime();
                        return this.lastTimestampMap.has(t.dataType) ? e - (this.lastTimestampMap.get(t.dataType) || e) >= this.timeInterval ? (this.lastTimestampMap.set(t.dataType, e),
                        !0) : r && r.eventsStr ? r.eventsStr.length / 1024 > this.limitSize : c.getSize(t) > this.limitSize : (this.lastTimestampMap.set(t.dataType, e),
                        !1);
                    });
                }
            }
            function f() {
                return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, e => {
                    const t = 16 * Math.random() | 0;
                    return ("x" === e ? t : 3 & t | 8).toString(16);
                }
                );
            }
            var m = {
                generateUuidWithoutDelinmeter: function() {
                    var e, t;
                    let r = null;
                    if ("undefined" != typeof globalThis)
                        r = globalThis;
                    else if ("undefined" != typeof global)
                        r = global;
                    else {
                        if ("undefined" == typeof self)
                            return f();
                        r = self;
                    }
                    return "function" == typeof (null === (e = r.crypto) || void 0 === e ? void 0 : e.randomUUID) ? r.crypto.randomUUID().replace(/-/g, "") : "function" == typeof (null === (t = r.crypto) || void 0 === t ? void 0 : t.getRandomValues) ? "10000000100040008000100000000000".replace(/[018]/g, e => {
                        const t = Number(e);
                        return (t ^ r.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> t / 4).toString(16);
                    }
                    ) : f();
                }
            }, T = new class {
                constructor() {
                    this.sessionMap = new Map();
                }
                refresh(e) {
                    let t = this.sessionMap.get(e);
                    return null == t || this.crossDay(t.lastTimestamp) || this.expired(t.lastTimestamp) ? t = this.reset() : (t.firstEvent = !1,
                    t.time = new Date().getTime()),
                    this.sessionMap.set(e, t),
                    new l(t.name,t.time,t.lastTimestamp,t.firstEvent);
                }
                reset() {
                    let e = new Date().getTime()
                      , t = m.generateUuidWithoutDelinmeter() + "_" + e;
                    return new l(t,e,e,!0);
                }
                expired(e) {
                    return new Date().getTime() - e >= 18e5;
                }
                crossDay(e) {
                    var t = new Date()
                      , r = new Date(e);
                    return t.getFullYear() !== r.getFullYear() || t.getMonth() !== r.getMonth() || t.getDay() !== r.getDay();
                }
            }
            (), PlatformType, LogLevel;
            class y {
                constructor(e, t) {
                    this.events = [[], [], [], []],
                    this.lock = [!1, !1, !1, !1],
                    this.globalConfig = new r(),
                    this.router = t,
                    this.httpBuilder = e;
                }
                onEvent(t, r, o, n) {
                    return e(this, void 0, void 0, function*() {
                        let e = T.refresh(t.serviceTag)
                          , s = new p(t.dataType,r,new Date().getTime(),o,e);
                        if (this.lock[t.dataType])
                            return void this.events[t.dataType].push(s);
                        this.lock[t.dataType] = !0;
                        let i = c.saveEvent(t, s);
                        0 != this.events[t.dataType].length && (i = c.saveEvents(t, this.events[t.dataType]),
                        this.events[t.dataType] = []),
                        (yield n.makeDecision(t, i)) && (yield this.onReport(t, i.eventsStr)),
                        this.lock[t.dataType] = !1;
                    });
                }
                sendData(t, r, o, n) {
                    return e(this, void 0, void 0, function*() {
                        let e = T.refresh(t.serviceTag)
                          , n = new p(t.dataType,r,new Date().getTime(),o,e)
                          , s = new Object()
                          , i = [n];
                        s.eventsStr = c.toJson(i),
                        yield this.onReport(t, s.eventsStr);
                    });
                }
                onReport(t, r) {
                    return e(this, void 0, void 0, function*() {
                        let e = this.getCollectUrlByDateType(t);
                        if (!e)
                            throw new Error("report events failed, collectUrl is not found.");
                        let o = [];
                        if (r) {
                            let e = JSON.parse(r);
                            if (e instanceof Array)
                                for (let t of e)
                                    o.push(p.fromJson(t));
                        } else
                            o = c.getEvents(t);
                        if (null == o || 0 == o.length)
                            return void console.info("there is no event data");
                        c.clearEvents(t);
                        let n = m.generateUuidWithoutDelinmeter()
                          , s = this.httpBuilder.buildHttpHeader(t, n)
                          , i = yield this.httpBuilder.buildHttpBody(t, n, o)
                          , a = {
                            context: t,
                            requestId: n,
                            events: o
                        };
                        yield this.router.route(t, e, s, i, a);
                    });
                }
                getCollectUrlByDateType(e) {
                    let r, o;
                    switch (e.dataType) {
                    case t.INT_MAINT:
                        o = this.globalConfig.getMainConf(e.serviceTag),
                        r = this.getUrlFromHAConfig(o);
                        break;
                    case t.INT_OPER:
                    default:
                        o = this.globalConfig.getOperConf(e.serviceTag),
                        r = this.getUrlFromHAConfig(o);
                    }
                    return r;
                }
                getUrlFromHAConfig(e) {
                    return e && null != e ? e.getUrl() : (console.log("url in HAConfig is empty"),
                    "");
                }
            }
            class M {
                post(t, r, o) {
                    return e(this, void 0, void 0, function*() {
                        return new Promise(function(e, n) {
                            const s = new XMLHttpRequest();
                            s.open("POST", t, !0),
                            r.forEach( (e, t) => {
                                s.setRequestHeader(t, e);
                            }
                            ),
                            s.onload = function() {
                                200 == s.status ? e(s.status) : (console.log("HttpClient post failed, code: " + s.status + ", message: " + s.response),
                                e(-2));
                            }
                            ,
                            s.send(o);
                        }
                        );
                    });
                }
            }
            class b {
                constructor(e, t) {
                    this.url = e,
                    this.dataType = t;
                }
                getUrl() {
                    return this.url;
                }
                setUrl(e) {
                    this.url = e;
                }
                getDataType() {
                    return this.dataType;
                }
                setDataType(e) {
                    this.dataType = e;
                }
            }
            class I {
                makeDecision(t, r) {
                    return e(this, void 0, void 0, function*() {
                        return !0;
                    });
                }
            }
            class A {
                constructor(e, t) {
                    this.serviceTag = e,
                    this.reportPolicy = null == t ? new v(3e4,10) : t,
                    this.globalConfig = new r(),
                    this.globalConfig.setServiceTag(e);
                    let n = new o()
                      , s = new h(new M(),new g());
                    this.eventService = new y(n,s);
                }
                newInstanceUUID() {
                    try {
                        "" === this.globalConfig.getInstanceUUID(this.serviceTag) && this.globalConfig.setInstanceUUID(this.serviceTag, m.generateUuidWithoutDelinmeter());
                    } catch (e) {
                        console.error("newInstanceUUID failed, error message:", this.getErrorMsg(e));
                    }
                }
                setAppid(e) {
                    try {
                        if ("string" != typeof e)
                            return void console.error("FormalAnalytics parameter type is invalid");
                        if (!d.validateAppid(e))
                            return void console.error("FormalAnalytics appid is invalid");
                        this.globalConfig.setAppid(this.serviceTag, e);
                    } catch (e) {
                        console.error("setAppid failed, error message:", this.getErrorMsg(e));
                    }
                }
                setAppVersion(e) {
                    try {
                        if ("string" != typeof e)
                            return void console.error("FormalAnalytics parameter type is invalid");
                        if (!d.validateAppVersion(e))
                            return void console.error("FormalAnalytics appVersion is invalid");
                        this.globalConfig.setAppVer(this.serviceTag, e);
                    } catch (e) {
                        console.error("setAppVersion failed, error message:", this.getErrorMsg(e));
                    }
                }
                setHAConfig(e, r) {
                    try {
                        if ("string" != typeof e || "number" != typeof r)
                            return void console.error("FormalAnalytics parameter type is invalid");
                        if (!d.validateUrl(e) || !d.validateDataType(r))
                            return void console.error("setHAConfig failed, config parameter is invalid");
                        let o = new b(e,r);
                        switch (o.getDataType()) {
                        case t.INT_MAINT:
                            this.globalConfig.setMainConf(this.serviceTag, o);
                            break;
                        case t.INT_OPER:
                        default:
                            this.globalConfig.setOperConf(this.serviceTag, o);
                        }
                    } catch (e) {
                        console.error("setHAConfig failed, error message:", this.getErrorMsg(e));
                    }
                }
                setCustomHttpHeader(e, t) {
                    try {
                        if ("number" != typeof e || !(t instanceof Map))
                            return void console.error("FormalAnalytics parameter type is invalid");
                        let r = d.validateHttpHeader(t);
                        if (null == r)
                            return void console.error("FormalAnalytics httpHeader is invalid");
                        let o = new u(this.serviceTag,e);
                        this.globalConfig.setCustomHttpHeader(o, r);
                    } catch (e) {
                        console.error("setCustomHttpHeader failed, error message:", this.getErrorMsg(e));
                    }
                }
                setCustomUserProfile(e, t, r) {
                    try {
                        if ("number" != typeof e || "string" != typeof t || "string" != typeof r)
                            return void console.log("FormalAnalytics parameter type is invalid");
                        if (!d.validateCustomUserProfile(t, r))
                            return void console.log("FormalAnalytics user profile is invalid");
                        let o = new u(this.serviceTag,e);
                        this.globalConfig.setCustomUserProfile(o, t, r);
                    } catch (e) {
                        console.error("setCustomUserProfile failed, error message:", this.getErrorMsg(e));
                    }
                }
                onEvent(t, r, o) {
                    return e(this, void 0, void 0, function*() {
                        try {
                            if (console.log("onEvent start"),
                            "number" != typeof t || "string" != typeof r || !(o instanceof Map))
                                return void console.log("FormalAnalytics parameter type is invalid");
                            if (!d.validateEvent(r, o))
                                return void console.log("FormalAnalytics event parameter is invalid");
                            let e = new u(this.serviceTag,t);
                            yield this.eventService.onEvent(e, r, o, this.reportPolicy),
                            console.log("onEvent success.");
                        } catch (e) {
                            console.error("onEvent failed, error message:", this.getErrorMsg(e));
                        }
                    });
                }
                sendData(t, r, o) {
                    return e(this, void 0, void 0, function*() {
                        try {
                            if (console.log("sendData start"),
                            "number" != typeof t || "string" != typeof r || !(o instanceof Map))
                                return void console.log("FormalAnalytics parameter type is invalid");
                            if (!d.validateEvent(r, o))
                                return void console.log("FormalAnalytics event parameter is invalid");
                            let e = new u(this.serviceTag,t)
                              , n = new I();
                            yield this.eventService.sendData(e, r, o, n),
                            console.log("sendData success.");
                        } catch (e) {
                            console.error("sendData failed, error message:", this.getErrorMsg(e));
                        }
                    });
                }
                onReport(t) {
                    return e(this, void 0, void 0, function*() {
                        try {
                            if (console.log("onReport start"),
                            "number" != typeof t)
                                return void console.log("FormalAnalytics parameter type is invalid");
                            let e = new u(this.serviceTag,t);
                            yield this.eventService.onReport(e),
                            console.log("onReport success.");
                        } catch (e) {
                            console.error("onReport failed, error message:", this.getErrorMsg(e));
                        }
                    });
                }
                setEnableUUID(e) {
                    "boolean" == typeof e ? this.globalConfig.setEnableUUID(this.serviceTag, e) : console.log("FormalAnalytics isReportUUID invalid");
                }
                getErrorMsg(e) {
                    let t;
                    return t = e instanceof Error ? e.message : String(e),
                    t;
                }
            }
            class D {
                static getInstance(e, t) {
                    if (D.instanceMap.has(e))
                        return D.instanceMap.get(e);
                    if ("string" != typeof e)
                        return void console.log("HAService parameter type is invalid");
                    if (!d.validateServiceTag(e))
                        return void console.log("HAService serviceTag is invalid");
                    if (D.instanceMap.size > 50)
                        return void console.log("HAService serviceTag's number exceeds the limit!");
                    let r = new A(e,t);
                    return D.instanceMap.set(e, r),
                    D.initialized = !0,
                    r;
                }
                static clearCachedData() {
                    D.initialized ? c.clearAll() : console.log("HAService is not initialized");
                }
            }
            D.initialized = !1,
            D.instanceMap = new Map(),
            exports.PlatformType = void 0,
            PlatformType = exports.PlatformType || (exports.PlatformType = {}),
            PlatformType[PlatformType.WEB = 0] = "WEB",
            PlatformType[PlatformType.ANDROID = 1] = "ANDROID",
            PlatformType[PlatformType.IOS = 2] = "IOS",
            PlatformType[PlatformType.webGL = 3] = "webGL",
            PlatformType[PlatformType.WINDOWS = 4] = "WINDOWS",
            PlatformType[PlatformType.MACOS = 5] = "MACOS",
            PlatformType[PlatformType.HUAWEI_QG_GAME = 6] = "HUAWEI_QG_GAME",
            PlatformType[PlatformType.OTHERS = 7] = "OTHERS",
            PlatformType[PlatformType.EDITOR = 8] = "EDITOR",
            PlatformType[PlatformType.OHOS = 9] = "OHOS";
            class Platform {
                static isHuaweiQuickGame() {
                    return "object" == typeof qg && "function" == typeof qg.getProvider && "huawei" === qg.getProvider();
                }
            }
            Platform.platform = exports.PlatformType.WEB,
            Platform.cerPath = "",
            exports.LogLevel = void 0,
            LogLevel = exports.LogLevel || (exports.LogLevel = {}),
            LogLevel[LogLevel.DEBUG = 1] = "DEBUG",
            LogLevel[LogLevel.INFO = 2] = "INFO",
            LogLevel[LogLevel.ERROR = 3] = "ERROR",
            LogLevel[LogLevel.OFF = 4] = "OFF";
            class Logger {
                static debug(e) {
                    Logger.level === exports.LogLevel.DEBUG && console.debug("[GOBE DEBUG]:", JSON.stringify(Object.assign(Object.assign({}, e), {
                        timestamp: Date.now()
                    })));
                }
                static info(e) {
                    Logger.level !== exports.LogLevel.DEBUG && Logger.level !== exports.LogLevel.INFO || console.info("[GOBE INFO]:", JSON.stringify(Object.assign(Object.assign({}, e), {
                        timestamp: Date.now()
                    })));
                }
                static error(e) {
                    Logger.level != exports.LogLevel.OFF && console.error("[GOBE ERROR]:", JSON.stringify(Object.assign(Object.assign({}, e), {
                        timestamp: Date.now()
                    })));
                }
            }
            Logger.level = exports.LogLevel.OFF;
            class HaStore {
                constructor() {
                    this._reportLogLevel = 2,
                    this._serviceTag = "GameOBESDK",
                    this._haInstance = D.getInstance(this._serviceTag),
                    this._reportUrl = "",
                    this._appId = "com.huawei.gamecenter.obesdk",
                    this._isInit = !1,
                    this._cacheList = [],
                    this._autoReportTask = null,
                    this._autoReportTime = 3e4;
                }
                cacheEvent(e) {
                    1 == e.dataType && e.data.set("networkType", " "),
                    this._cacheList.push(e);
                }
                setReportUrl(e) {
                    this._reportUrl = e;
                }
                setReportLogLevel(e) {
                    this._reportLogLevel = e;
                }
                get reportLogLevel() {
                    return this._reportLogLevel;
                }
                init() {
                    try {
                        return this._haInstance || (this._haInstance = D.getInstance(this._serviceTag)),
                        this._haInstance.setHAConfig(this._reportUrl, 0),
                        this._haInstance.setHAConfig(this._reportUrl, 1),
                        this._haInstance.setAppid(this._appId),
                        this._haInstance.setAppVersion("130602300"),
                        this._haInstance.setCustomUserProfile(0, "cpAppId", store.appId),
                        this._haInstance.setCustomUserProfile(0, "sdkType", "js"),
                        this._haInstance.setCustomUserProfile(0, "sdkVersionCode", "130602300"),
                        this._haInstance.setCustomUserProfile(0, "platform", Platform.platform.toString()),
                        this._haInstance.setCustomUserProfile(0, "playerId", 0 == store.playerId.length ? " " : store.playerId),
                        this._haInstance.setCustomUserProfile(1, "cpAppId", store.appId),
                        this._haInstance.setCustomUserProfile(1, "sdkType", "js"),
                        this._haInstance.setCustomUserProfile(1, "sdkVersionCode", "130602300"),
                        this._haInstance.setCustomUserProfile(1, "platform", Platform.platform.toString()),
                        this._haInstance.setCustomUserProfile(1, "playerId", 0 == store.playerId.length ? " " : store.playerId),
                        this._autoReportTask && clearInterval(this._autoReportTask),
                        this._autoReportTask = setInterval( () => this.report(), this._autoReportTime),
                        this._isInit = !0,
                        this._isInit;
                    } catch (e) {
                        return Logger.error({
                            eventType: "init_ha_error"
                        }),
                        !1;
                    }
                }
                delayReport(e, t, r) {
                    this._reportLogLevel < 4 && this._isInit && (1 == e && r.set("networkType", " "),
                    this._haInstance.onEvent(e, t, r));
                }
                report() {
                    this._reportLogLevel < 4 && this._isInit && (this._cacheList.forEach(e => {
                        this._haInstance.onEvent(e.dataType, e.eventId, e.data);
                    }
                    ),
                    this._cacheList = [],
                    this._haInstance.onReport(0),
                    this._haInstance.onReport(1));
                }
                stopAutoReport() {
                    clearInterval(this._autoReportTask);
                }
            }
            var haStore = new HaStore();
            class WebSocketTransport {
                constructor(e) {
                    this.events = e,
                    this.ws = null;
                }
                connect(e) {
                    var t, r, o, n;
                    Platform.platform === exports.PlatformType.ANDROID || Platform.platform === exports.PlatformType.OHOS ? this.ws = new WebSocket(e,this.protocols,Platform.cerPath) : this.ws = new WebSocket(e,this.protocols),
                    this.ws.binaryType = "arraybuffer",
                    this.ws.onopen = null !== (t = this.events.onopen) && void 0 !== t ? t : null,
                    this.ws.onmessage = null !== (r = this.events.onmessage) && void 0 !== r ? r : null,
                    this.ws.onclose = null !== (o = this.events.onclose) && void 0 !== o ? o : null,
                    this.ws.onerror = null !== (n = this.events.onerror) && void 0 !== n ? n : null;
                }
                isOpen() {
                    var e;
                    return (null === (e = this.ws) || void 0 === e ? void 0 : e.readyState) === WebSocket.OPEN;
                }
                isConnecting() {
                    var e;
                    return (null === (e = this.ws) || void 0 === e ? void 0 : e.readyState) === WebSocket.CONNECTING;
                }
                isClosing() {
                    var e;
                    return (null === (e = this.ws) || void 0 === e ? void 0 : e.readyState) === WebSocket.CLOSING;
                }
                isClosed() {
                    var e;
                    return (null === (e = this.ws) || void 0 === e ? void 0 : e.readyState) === WebSocket.CLOSED;
                }
                send(e) {
                    var t, r;
                    e instanceof Array ? null === (t = this.ws) || void 0 === t || t.send(new Uint8Array(e).buffer) : null === (r = this.ws) || void 0 === r || r.send(e);
                }
                close(e, t) {
                    var r, o;
                    Platform.platform === exports.PlatformType.ANDROID ? null === (r = this.ws) || void 0 === r || r.close(e = 1e3, t = "Bye") : null === (o = this.ws) || void 0 === o || o.close(e, t);
                }
                onError(e) {
                    var t, r;
                    null === (r = null === (t = this.events) || void 0 === t ? void 0 : t.onerror) || void 0 === r || r.call(this.ws, new Event(e));
                }
                removeAllListeners() {
                    this.ws && (this.ws.onopen = null,
                    this.ws.onmessage = null,
                    this.ws.onclose = null,
                    this.ws.onerror = null);
                }
            }
            var protobuf = {
                exports: {}
            };
            (function(module) {
                (function(undefined$1) {
                    !function(e, t, r) {
                        var o = function r(o) {
                            var n = t[o];
                            return n || e[o][0].call(n = t[o] = {
                                exports: {}
                            }, r, n, n.exports),
                            n.exports;
                        }(r[0]);
                        o.util.global.protobuf = o,
                        "function" == typeof undefined$1 && undefined$1.amd && undefined$1(["long"], function(e) {
                            return e && e.isLong && (o.util.Long = e,
                            o.configure()),
                            o;
                        }),
                        module && module.exports && (module.exports = o);
                    }({
                        1: [function(e, t, r) {
                            t.exports = function(e, t) {
                                var r = new Array(arguments.length - 1)
                                  , o = 0
                                  , n = 2
                                  , s = !0;
                                for (; n < arguments.length; )
                                    r[o++] = arguments[n++];
                                return new Promise(function(n, i) {
                                    r[o] = function(e) {
                                        if (s)
                                            if (s = !1,
                                            e)
                                                i(e);
                                            else {
                                                for (var t = new Array(arguments.length - 1), r = 0; r < t.length; )
                                                    t[r++] = arguments[r];
                                                n.apply(null, t);
                                            }
                                    }
                                    ;
                                    try {
                                        e.apply(t || null, r);
                                    } catch (e) {
                                        s && (s = !1,
                                        i(e));
                                    }
                                }
                                );
                            }
                            ;
                        }
                        , {}],
                        2: [function(e, t, r) {
                            var o = r;
                            o.length = function(e) {
                                var t = e.length;
                                if (!t)
                                    return 0;
                                for (var r = 0; --t % 4 > 1 && "=" === e.charAt(t); )
                                    ++r;
                                return Math.ceil(3 * e.length) / 4 - r;
                            }
                            ;
                            for (var n = new Array(64), s = new Array(123), i = 0; i < 64; )
                                s[n[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
                            o.encode = function(e, t, r) {
                                for (var o, s = null, i = [], a = 0, l = 0; t < r; ) {
                                    var c = e[t++];
                                    switch (l) {
                                    case 0:
                                        i[a++] = n[c >> 2],
                                        o = (3 & c) << 4,
                                        l = 1;
                                        break;
                                    case 1:
                                        i[a++] = n[o | c >> 4],
                                        o = (15 & c) << 2,
                                        l = 2;
                                        break;
                                    case 2:
                                        i[a++] = n[o | c >> 6],
                                        i[a++] = n[63 & c],
                                        l = 0;
                                    }
                                    a > 8191 && ((s || (s = [])).push(String.fromCharCode.apply(String, i)),
                                    a = 0);
                                }
                                return l && (i[a++] = n[o],
                                i[a++] = 61,
                                1 === l && (i[a++] = 61)),
                                s ? (a && s.push(String.fromCharCode.apply(String, i.slice(0, a))),
                                s.join("")) : String.fromCharCode.apply(String, i.slice(0, a));
                            }
                            ;
                            var a = "invalid encoding";
                            o.decode = function(e, t, r) {
                                for (var o, n = r, i = 0, l = 0; l < e.length; ) {
                                    var c = e.charCodeAt(l++);
                                    if (61 === c && i > 1)
                                        break;
                                    if ((c = s[c]) === undefined$1)
                                        throw Error(a);
                                    switch (i) {
                                    case 0:
                                        o = c,
                                        i = 1;
                                        break;
                                    case 1:
                                        t[r++] = o << 2 | (48 & c) >> 4,
                                        o = c,
                                        i = 2;
                                        break;
                                    case 2:
                                        t[r++] = (15 & o) << 4 | (60 & c) >> 2,
                                        o = c,
                                        i = 3;
                                        break;
                                    case 3:
                                        t[r++] = (3 & o) << 6 | c,
                                        i = 0;
                                    }
                                }
                                if (1 === i)
                                    throw Error(a);
                                return r - n;
                            }
                            ,
                            o.test = function(e) {
                                return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(e);
                            }
                            ;
                        }
                        , {}],
                        3: [function(e, t, r) {
                            function o() {
                                this._listeners = {};
                            }
                            t.exports = o,
                            o.prototype.on = function(e, t, r) {
                                return (this._listeners[e] || (this._listeners[e] = [])).push({
                                    fn: t,
                                    ctx: r || this
                                }),
                                this;
                            }
                            ,
                            o.prototype.off = function(e, t) {
                                if (e === undefined$1)
                                    this._listeners = {};
                                else if (t === undefined$1)
                                    this._listeners[e] = [];
                                else
                                    for (var r = this._listeners[e], o = 0; o < r.length; )
                                        r[o].fn === t ? r.splice(o, 1) : ++o;
                                return this;
                            }
                            ,
                            o.prototype.emit = function(e) {
                                var t = this._listeners[e];
                                if (t) {
                                    for (var r = [], o = 1; o < arguments.length; )
                                        r.push(arguments[o++]);
                                    for (o = 0; o < t.length; )
                                        t[o].fn.apply(t[o++].ctx, r);
                                }
                                return this;
                            }
                            ;
                        }
                        , {}],
                        4: [function(e, t, r) {
                            function o(e) {
                                return "undefined" != typeof Float32Array ? function() {
                                    var t = new Float32Array([-0])
                                      , r = new Uint8Array(t.buffer)
                                      , o = 128 === r[3];
                                    function n(e, o, n) {
                                        t[0] = e,
                                        o[n] = r[0],
                                        o[n + 1] = r[1],
                                        o[n + 2] = r[2],
                                        o[n + 3] = r[3];
                                    }
                                    function s(e, o, n) {
                                        t[0] = e,
                                        o[n] = r[3],
                                        o[n + 1] = r[2],
                                        o[n + 2] = r[1],
                                        o[n + 3] = r[0];
                                    }
                                    function i(e, o) {
                                        return r[0] = e[o],
                                        r[1] = e[o + 1],
                                        r[2] = e[o + 2],
                                        r[3] = e[o + 3],
                                        t[0];
                                    }
                                    function a(e, o) {
                                        return r[3] = e[o],
                                        r[2] = e[o + 1],
                                        r[1] = e[o + 2],
                                        r[0] = e[o + 3],
                                        t[0];
                                    }
                                    e.writeFloatLE = o ? n : s,
                                    e.writeFloatBE = o ? s : n,
                                    e.readFloatLE = o ? i : a,
                                    e.readFloatBE = o ? a : i;
                                }() : function() {
                                    function t(e, t, r, o) {
                                        var n = t < 0 ? 1 : 0;
                                        if (n && (t = -t),
                                        0 === t)
                                            e(1 / t > 0 ? 0 : 2147483648, r, o);
                                        else if (isNaN(t))
                                            e(2143289344, r, o);
                                        else if (t > 34028234663852886e22)
                                            e((n << 31 | 2139095040) >>> 0, r, o);
                                        else if (t < 11754943508222875e-54)
                                            e((n << 31 | Math.round(t / 1401298464324817e-60)) >>> 0, r, o);
                                        else {
                                            var s = Math.floor(Math.log(t) / Math.LN2);
                                            e((n << 31 | s + 127 << 23 | 8388607 & Math.round(t * Math.pow(2, -s) * 8388608)) >>> 0, r, o);
                                        }
                                    }
                                    function r(e, t, r) {
                                        var o = e(t, r)
                                          , n = 2 * (o >> 31) + 1
                                          , s = o >>> 23 & 255
                                          , i = 8388607 & o;
                                        return 255 === s ? i ? NaN : n * (1 / 0) : 0 === s ? 1401298464324817e-60 * n * i : n * Math.pow(2, s - 150) * (i + 8388608);
                                    }
                                    e.writeFloatLE = t.bind(null, n),
                                    e.writeFloatBE = t.bind(null, s),
                                    e.readFloatLE = r.bind(null, i),
                                    e.readFloatBE = r.bind(null, a);
                                }(),
                                "undefined" != typeof Float64Array ? function() {
                                    var t = new Float64Array([-0])
                                      , r = new Uint8Array(t.buffer)
                                      , o = 128 === r[7];
                                    function n(e, o, n) {
                                        t[0] = e,
                                        o[n] = r[0],
                                        o[n + 1] = r[1],
                                        o[n + 2] = r[2],
                                        o[n + 3] = r[3],
                                        o[n + 4] = r[4],
                                        o[n + 5] = r[5],
                                        o[n + 6] = r[6],
                                        o[n + 7] = r[7];
                                    }
                                    function s(e, o, n) {
                                        t[0] = e,
                                        o[n] = r[7],
                                        o[n + 1] = r[6],
                                        o[n + 2] = r[5],
                                        o[n + 3] = r[4],
                                        o[n + 4] = r[3],
                                        o[n + 5] = r[2],
                                        o[n + 6] = r[1],
                                        o[n + 7] = r[0];
                                    }
                                    function i(e, o) {
                                        return r[0] = e[o],
                                        r[1] = e[o + 1],
                                        r[2] = e[o + 2],
                                        r[3] = e[o + 3],
                                        r[4] = e[o + 4],
                                        r[5] = e[o + 5],
                                        r[6] = e[o + 6],
                                        r[7] = e[o + 7],
                                        t[0];
                                    }
                                    function a(e, o) {
                                        return r[7] = e[o],
                                        r[6] = e[o + 1],
                                        r[5] = e[o + 2],
                                        r[4] = e[o + 3],
                                        r[3] = e[o + 4],
                                        r[2] = e[o + 5],
                                        r[1] = e[o + 6],
                                        r[0] = e[o + 7],
                                        t[0];
                                    }
                                    e.writeDoubleLE = o ? n : s,
                                    e.writeDoubleBE = o ? s : n,
                                    e.readDoubleLE = o ? i : a,
                                    e.readDoubleBE = o ? a : i;
                                }() : function() {
                                    function t(e, t, r, o, n, s) {
                                        var i = o < 0 ? 1 : 0;
                                        if (i && (o = -o),
                                        0 === o)
                                            e(0, n, s + t),
                                            e(1 / o > 0 ? 0 : 2147483648, n, s + r);
                                        else if (isNaN(o))
                                            e(0, n, s + t),
                                            e(2146959360, n, s + r);
                                        else if (o > 17976931348623157e292)
                                            e(0, n, s + t),
                                            e((i << 31 | 2146435072) >>> 0, n, s + r);
                                        else {
                                            var a;
                                            if (o < 22250738585072014e-324)
                                                e((a = o / 5e-324) >>> 0, n, s + t),
                                                e((i << 31 | a / 4294967296) >>> 0, n, s + r);
                                            else {
                                                var l = Math.floor(Math.log(o) / Math.LN2);
                                                1024 === l && (l = 1023),
                                                e(4503599627370496 * (a = o * Math.pow(2, -l)) >>> 0, n, s + t),
                                                e((i << 31 | l + 1023 << 20 | 1048576 * a & 1048575) >>> 0, n, s + r);
                                            }
                                        }
                                    }
                                    function r(e, t, r, o, n) {
                                        var s = e(o, n + t)
                                          , i = e(o, n + r)
                                          , a = 2 * (i >> 31) + 1
                                          , l = i >>> 20 & 2047
                                          , c = 4294967296 * (1048575 & i) + s;
                                        return 2047 === l ? c ? NaN : a * (1 / 0) : 0 === l ? 5e-324 * a * c : a * Math.pow(2, l - 1075) * (c + 4503599627370496);
                                    }
                                    e.writeDoubleLE = t.bind(null, n, 0, 4),
                                    e.writeDoubleBE = t.bind(null, s, 4, 0),
                                    e.readDoubleLE = r.bind(null, i, 0, 4),
                                    e.readDoubleBE = r.bind(null, a, 4, 0);
                                }(),
                                e;
                            }
                            function n(e, t, r) {
                                t[r] = 255 & e,
                                t[r + 1] = e >>> 8 & 255,
                                t[r + 2] = e >>> 16 & 255,
                                t[r + 3] = e >>> 24;
                            }
                            function s(e, t, r) {
                                t[r] = e >>> 24,
                                t[r + 1] = e >>> 16 & 255,
                                t[r + 2] = e >>> 8 & 255,
                                t[r + 3] = 255 & e;
                            }
                            function i(e, t) {
                                return (e[t] | e[t + 1] << 8 | e[t + 2] << 16 | e[t + 3] << 24) >>> 0;
                            }
                            function a(e, t) {
                                return (e[t] << 24 | e[t + 1] << 16 | e[t + 2] << 8 | e[t + 3]) >>> 0;
                            }
                            t.exports = o(o);
                        }
                        , {}],
                        5: [function(require, module, exports) {
                            function inquire(moduleName) {
                                try {
                                    var mod = eval("quire".replace(/^/, "re"))(moduleName);
                                    if (mod && (mod.length || Object.keys(mod).length))
                                        return mod;
                                } catch (e) {}
                                return null;
                            }
                            module.exports = inquire;
                        }
                        , {}],
                        6: [function(e, t, r) {
                            t.exports = function(e, t, r) {
                                var o = r || 8192
                                  , n = o >>> 1
                                  , s = null
                                  , i = o;
                                return function(r) {
                                    if (r < 1 || r > n)
                                        return e(r);
                                    i + r > o && (s = e(o),
                                    i = 0);
                                    var a = t.call(s, i, i += r);
                                    return 7 & i && (i = 1 + (7 | i)),
                                    a;
                                }
                                ;
                            }
                            ;
                        }
                        , {}],
                        7: [function(e, t, r) {
                            var o = r;
                            o.length = function(e) {
                                for (var t = 0, r = 0, o = 0; o < e.length; ++o)
                                    (r = e.charCodeAt(o)) < 128 ? t += 1 : r < 2048 ? t += 2 : 55296 == (64512 & r) && 56320 == (64512 & e.charCodeAt(o + 1)) ? (++o,
                                    t += 4) : t += 3;
                                return t;
                            }
                            ,
                            o.read = function(e, t, r) {
                                if (r - t < 1)
                                    return "";
                                for (var o, n = null, s = [], i = 0; t < r; )
                                    (o = e[t++]) < 128 ? s[i++] = o : o > 191 && o < 224 ? s[i++] = (31 & o) << 6 | 63 & e[t++] : o > 239 && o < 365 ? (o = ((7 & o) << 18 | (63 & e[t++]) << 12 | (63 & e[t++]) << 6 | 63 & e[t++]) - 65536,
                                    s[i++] = 55296 + (o >> 10),
                                    s[i++] = 56320 + (1023 & o)) : s[i++] = (15 & o) << 12 | (63 & e[t++]) << 6 | 63 & e[t++],
                                    i > 8191 && ((n || (n = [])).push(String.fromCharCode.apply(String, s)),
                                    i = 0);
                                return n ? (i && n.push(String.fromCharCode.apply(String, s.slice(0, i))),
                                n.join("")) : String.fromCharCode.apply(String, s.slice(0, i));
                            }
                            ,
                            o.write = function(e, t, r) {
                                for (var o, n, s = r, i = 0; i < e.length; ++i)
                                    (o = e.charCodeAt(i)) < 128 ? t[r++] = o : o < 2048 ? (t[r++] = o >> 6 | 192,
                                    t[r++] = 63 & o | 128) : 55296 == (64512 & o) && 56320 == (64512 & (n = e.charCodeAt(i + 1))) ? (o = 65536 + ((1023 & o) << 10) + (1023 & n),
                                    ++i,
                                    t[r++] = o >> 18 | 240,
                                    t[r++] = o >> 12 & 63 | 128,
                                    t[r++] = o >> 6 & 63 | 128,
                                    t[r++] = 63 & o | 128) : (t[r++] = o >> 12 | 224,
                                    t[r++] = o >> 6 & 63 | 128,
                                    t[r++] = 63 & o | 128);
                                return r - s;
                            }
                            ;
                        }
                        , {}],
                        8: [function(e, t, r) {
                            var o = r;
                            function n() {
                                o.util._configure(),
                                o.Writer._configure(o.BufferWriter),
                                o.Reader._configure(o.BufferReader);
                            }
                            o.build = "minimal",
                            o.Writer = e(16),
                            o.BufferWriter = e(17),
                            o.Reader = e(9),
                            o.BufferReader = e(10),
                            o.util = e(15),
                            o.rpc = e(12),
                            o.roots = e(11),
                            o.configure = n,
                            n();
                        }
                        , {
                            10: 10,
                            11: 11,
                            12: 12,
                            15: 15,
                            16: 16,
                            17: 17,
                            9: 9
                        }],
                        9: [function(e, t, r) {
                            t.exports = l;
                            var o, n = e(15), s = n.LongBits, i = n.utf8;
                            function a(e, t) {
                                return RangeError("index out of range: " + e.pos + " + " + (t || 1) + " > " + e.len);
                            }
                            function l(e) {
                                this.buf = e,
                                this.pos = 0,
                                this.len = e.length;
                            }
                            var c, u = "undefined" != typeof Uint8Array ? function(e) {
                                if (e instanceof Uint8Array || Array.isArray(e))
                                    return new l(e);
                                throw Error("illegal buffer");
                            }
                            : function(e) {
                                if (Array.isArray(e))
                                    return new l(e);
                                throw Error("illegal buffer");
                            }
                            , d = function() {
                                return n.Buffer ? function(e) {
                                    return (l.create = function(e) {
                                        return n.Buffer.isBuffer(e) ? new o(e) : u(e);
                                    }
                                    )(e);
                                }
                                : u;
                            };
                            function p() {
                                var e = new s(0,0)
                                  , t = 0;
                                if (!(this.len - this.pos > 4)) {
                                    for (; t < 3; ++t) {
                                        if (this.pos >= this.len)
                                            throw a(this);
                                        if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0,
                                        this.buf[this.pos++] < 128)
                                            return e;
                                    }
                                    return e.lo = (e.lo | (127 & this.buf[this.pos++]) << 7 * t) >>> 0,
                                    e;
                                }
                                for (; t < 4; ++t)
                                    if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 7 * t) >>> 0,
                                    this.buf[this.pos++] < 128)
                                        return e;
                                if (e.lo = (e.lo | (127 & this.buf[this.pos]) << 28) >>> 0,
                                e.hi = (e.hi | (127 & this.buf[this.pos]) >> 4) >>> 0,
                                this.buf[this.pos++] < 128)
                                    return e;
                                if (t = 0,
                                this.len - this.pos > 4) {
                                    for (; t < 5; ++t)
                                        if (e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0,
                                        this.buf[this.pos++] < 128)
                                            return e;
                                } else
                                    for (; t < 5; ++t) {
                                        if (this.pos >= this.len)
                                            throw a(this);
                                        if (e.hi = (e.hi | (127 & this.buf[this.pos]) << 7 * t + 3) >>> 0,
                                        this.buf[this.pos++] < 128)
                                            return e;
                                    }
                                throw Error("invalid varint encoding");
                            }
                            function m(e, t) {
                                return (e[t - 4] | e[t - 3] << 8 | e[t - 2] << 16 | e[t - 1] << 24) >>> 0;
                            }
                            function h() {
                                if (this.pos + 8 > this.len)
                                    throw a(this, 8);
                                return new s(m(this.buf, this.pos += 4),m(this.buf, this.pos += 4));
                            }
                            l.create = d(),
                            l.prototype._slice = n.Array.prototype.subarray || n.Array.prototype.slice,
                            l.prototype.uint32 = (c = 4294967295,
                            function() {
                                if (c = (127 & this.buf[this.pos]) >>> 0,
                                this.buf[this.pos++] < 128)
                                    return c;
                                if (c = (c | (127 & this.buf[this.pos]) << 7) >>> 0,
                                this.buf[this.pos++] < 128)
                                    return c;
                                if (c = (c | (127 & this.buf[this.pos]) << 14) >>> 0,
                                this.buf[this.pos++] < 128)
                                    return c;
                                if (c = (c | (127 & this.buf[this.pos]) << 21) >>> 0,
                                this.buf[this.pos++] < 128)
                                    return c;
                                if (c = (c | (15 & this.buf[this.pos]) << 28) >>> 0,
                                this.buf[this.pos++] < 128)
                                    return c;
                                if ((this.pos += 5) > this.len)
                                    throw this.pos = this.len,
                                    a(this, 10);
                                return c;
                            }
                            ),
                            l.prototype.int32 = function() {
                                return 0 | this.uint32();
                            }
                            ,
                            l.prototype.sint32 = function() {
                                var e = this.uint32();
                                return e >>> 1 ^ -(1 & e) | 0;
                            }
                            ,
                            l.prototype.bool = function() {
                                return 0 !== this.uint32();
                            }
                            ,
                            l.prototype.fixed32 = function() {
                                if (this.pos + 4 > this.len)
                                    throw a(this, 4);
                                return m(this.buf, this.pos += 4);
                            }
                            ,
                            l.prototype.sfixed32 = function() {
                                if (this.pos + 4 > this.len)
                                    throw a(this, 4);
                                return 0 | m(this.buf, this.pos += 4);
                            }
                            ,
                            l.prototype.float = function() {
                                if (this.pos + 4 > this.len)
                                    throw a(this, 4);
                                var e = n.float.readFloatLE(this.buf, this.pos);
                                return this.pos += 4,
                                e;
                            }
                            ,
                            l.prototype.double = function() {
                                if (this.pos + 8 > this.len)
                                    throw a(this, 4);
                                var e = n.float.readDoubleLE(this.buf, this.pos);
                                return this.pos += 8,
                                e;
                            }
                            ,
                            l.prototype.bytes = function() {
                                var e = this.uint32()
                                  , t = this.pos
                                  , r = this.pos + e;
                                if (r > this.len)
                                    throw a(this, e);
                                return this.pos += e,
                                Array.isArray(this.buf) ? this.buf.slice(t, r) : t === r ? new this.buf.constructor(0) : this._slice.call(this.buf, t, r);
                            }
                            ,
                            l.prototype.string = function() {
                                var e = this.bytes();
                                return i.read(e, 0, e.length);
                            }
                            ,
                            l.prototype.skip = function(e) {
                                if ("number" == typeof e) {
                                    if (this.pos + e > this.len)
                                        throw a(this, e);
                                    this.pos += e;
                                } else
                                    do {
                                        if (this.pos >= this.len)
                                            throw a(this);
                                    } while (128 & this.buf[this.pos++]);
                                return this;
                            }
                            ,
                            l.prototype.skipType = function(e) {
                                switch (e) {
                                case 0:
                                    this.skip();
                                    break;
                                case 1:
                                    this.skip(8);
                                    break;
                                case 2:
                                    this.skip(this.uint32());
                                    break;
                                case 3:
                                    for (; 4 != (e = 7 & this.uint32()); )
                                        this.skipType(e);
                                    break;
                                case 5:
                                    this.skip(4);
                                    break;
                                default:
                                    throw Error("invalid wire type " + e + " at offset " + this.pos);
                                }
                                return this;
                            }
                            ,
                            l._configure = function(e) {
                                o = e,
                                l.create = d(),
                                o._configure();
                                var t = n.Long ? "toLong" : "toNumber";
                                n.merge(l.prototype, {
                                    int64: function() {
                                        return p.call(this)[t](!1);
                                    },
                                    uint64: function() {
                                        return p.call(this)[t](!0);
                                    },
                                    sint64: function() {
                                        return p.call(this).zzDecode()[t](!1);
                                    },
                                    fixed64: function() {
                                        return h.call(this)[t](!0);
                                    },
                                    sfixed64: function() {
                                        return h.call(this)[t](!1);
                                    }
                                });
                            }
                            ;
                        }
                        , {
                            15: 15
                        }],
                        10: [function(e, t, r) {
                            t.exports = s;
                            var o = e(9);
                            (s.prototype = Object.create(o.prototype)).constructor = s;
                            var n = e(15);
                            function s(e) {
                                o.call(this, e);
                            }
                            s._configure = function() {
                                n.Buffer && (s.prototype._slice = n.Buffer.prototype.slice);
                            }
                            ,
                            s.prototype.string = function() {
                                var e = this.uint32();
                                return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + e, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + e, this.len));
                            }
                            ,
                            s._configure();
                        }
                        , {
                            15: 15,
                            9: 9
                        }],
                        11: [function(e, t, r) {
                            t.exports = {};
                        }
                        , {}],
                        12: [function(e, t, r) {
                            r.Service = e(13);
                        }
                        , {
                            13: 13
                        }],
                        13: [function(e, t, r) {
                            t.exports = n;
                            var o = e(15);
                            function n(e, t, r) {
                                if ("function" != typeof e)
                                    throw TypeError("rpcImpl must be a function");
                                o.EventEmitter.call(this),
                                this.rpcImpl = e,
                                this.requestDelimited = Boolean(t),
                                this.responseDelimited = Boolean(r);
                            }
                            (n.prototype = Object.create(o.EventEmitter.prototype)).constructor = n,
                            n.prototype.rpcCall = function e(t, r, n, s, i) {
                                if (!s)
                                    throw TypeError("request must be specified");
                                var a = this;
                                if (!i)
                                    return o.asPromise(e, a, t, r, n, s);
                                if (!a.rpcImpl)
                                    return setTimeout(function() {
                                        i(Error("already ended"));
                                    }, 0),
                                    undefined$1;
                                try {
                                    return a.rpcImpl(t, r[a.requestDelimited ? "encodeDelimited" : "encode"](s).finish(), function(e, r) {
                                        if (e)
                                            return a.emit("error", e, t),
                                            i(e);
                                        if (null === r)
                                            return a.end(!0),
                                            undefined$1;
                                        if (!(r instanceof n))
                                            try {
                                                r = n[a.responseDelimited ? "decodeDelimited" : "decode"](r);
                                            } catch (e) {
                                                return a.emit("error", e, t),
                                                i(e);
                                            }
                                        return a.emit("data", r, t),
                                        i(null, r);
                                    });
                                } catch (e) {
                                    return a.emit("error", e, t),
                                    setTimeout(function() {
                                        i(e);
                                    }, 0),
                                    undefined$1;
                                }
                            }
                            ,
                            n.prototype.end = function(e) {
                                return this.rpcImpl && (e || this.rpcImpl(null, null, null),
                                this.rpcImpl = null,
                                this.emit("end").off()),
                                this;
                            }
                            ;
                        }
                        , {
                            15: 15
                        }],
                        14: [function(e, t, r) {
                            t.exports = n;
                            var o = e(15);
                            function n(e, t) {
                                this.lo = e >>> 0,
                                this.hi = t >>> 0;
                            }
                            var s = n.zero = new n(0,0);
                            s.toNumber = function() {
                                return 0;
                            }
                            ,
                            s.zzEncode = s.zzDecode = function() {
                                return this;
                            }
                            ,
                            s.length = function() {
                                return 1;
                            }
                            ;
                            var i = n.zeroHash = "\0\0\0\0\0\0\0\0";
                            n.fromNumber = function(e) {
                                if (0 === e)
                                    return s;
                                var t = e < 0;
                                t && (e = -e);
                                var r = e >>> 0
                                  , o = (e - r) / 4294967296 >>> 0;
                                return t && (o = ~o >>> 0,
                                r = ~r >>> 0,
                                ++r > 4294967295 && (r = 0,
                                ++o > 4294967295 && (o = 0))),
                                new n(r,o);
                            }
                            ,
                            n.from = function(e) {
                                if ("number" == typeof e)
                                    return n.fromNumber(e);
                                if (o.isString(e)) {
                                    if (!o.Long)
                                        return n.fromNumber(parseInt(e, 10));
                                    e = o.Long.fromString(e);
                                }
                                return e.low || e.high ? new n(e.low >>> 0,e.high >>> 0) : s;
                            }
                            ,
                            n.prototype.toNumber = function(e) {
                                if (!e && this.hi >>> 31) {
                                    var t = 1 + ~this.lo >>> 0
                                      , r = ~this.hi >>> 0;
                                    return t || (r = r + 1 >>> 0),
                                    -(t + 4294967296 * r);
                                }
                                return this.lo + 4294967296 * this.hi;
                            }
                            ,
                            n.prototype.toLong = function(e) {
                                return o.Long ? new o.Long(0 | this.lo,0 | this.hi,Boolean(e)) : {
                                    low: 0 | this.lo,
                                    high: 0 | this.hi,
                                    unsigned: Boolean(e)
                                };
                            }
                            ;
                            var a = String.prototype.charCodeAt;
                            n.fromHash = function(e) {
                                return e === i ? s : new n((a.call(e, 0) | a.call(e, 1) << 8 | a.call(e, 2) << 16 | a.call(e, 3) << 24) >>> 0,(a.call(e, 4) | a.call(e, 5) << 8 | a.call(e, 6) << 16 | a.call(e, 7) << 24) >>> 0);
                            }
                            ,
                            n.prototype.toHash = function() {
                                return String.fromCharCode(255 & this.lo, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, 255 & this.hi, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
                            }
                            ,
                            n.prototype.zzEncode = function() {
                                var e = this.hi >> 31;
                                return this.hi = ((this.hi << 1 | this.lo >>> 31) ^ e) >>> 0,
                                this.lo = (this.lo << 1 ^ e) >>> 0,
                                this;
                            }
                            ,
                            n.prototype.zzDecode = function() {
                                var e = -(1 & this.lo);
                                return this.lo = ((this.lo >>> 1 | this.hi << 31) ^ e) >>> 0,
                                this.hi = (this.hi >>> 1 ^ e) >>> 0,
                                this;
                            }
                            ,
                            n.prototype.length = function() {
                                var e = this.lo
                                  , t = (this.lo >>> 28 | this.hi << 4) >>> 0
                                  , r = this.hi >>> 24;
                                return 0 === r ? 0 === t ? e < 16384 ? e < 128 ? 1 : 2 : e < 2097152 ? 3 : 4 : t < 16384 ? t < 128 ? 5 : 6 : t < 2097152 ? 7 : 8 : r < 128 ? 9 : 10;
                            }
                            ;
                        }
                        , {
                            15: 15
                        }],
                        15: [function(e, t, r) {
                            var o = r;
                            function n(e, t, r) {
                                for (var o = Object.keys(t), n = 0; n < o.length; ++n)
                                    e[o[n]] !== undefined$1 && r || (e[o[n]] = t[o[n]]);
                                return e;
                            }
                            function s(e) {
                                function t(e, r) {
                                    if (!(this instanceof t))
                                        return new t(e,r);
                                    Object.defineProperty(this, "message", {
                                        get: function() {
                                            return e;
                                        }
                                    }),
                                    Error.captureStackTrace ? Error.captureStackTrace(this, t) : Object.defineProperty(this, "stack", {
                                        value: new Error().stack || ""
                                    }),
                                    r && n(this, r);
                                }
                                return t.prototype = Object.create(Error.prototype, {
                                    constructor: {
                                        value: t,
                                        writable: !0,
                                        enumerable: !1,
                                        configurable: !0
                                    },
                                    name: {
                                        get: () => e,
                                        set: undefined$1,
                                        enumerable: !1,
                                        configurable: !0
                                    },
                                    toString: {
                                        value() {
                                            return this.name + ": " + this.message;
                                        },
                                        writable: !0,
                                        enumerable: !1,
                                        configurable: !0
                                    }
                                }),
                                t;
                            }
                            o.asPromise = e(1),
                            o.base64 = e(2),
                            o.EventEmitter = e(3),
                            o.float = e(4),
                            o.inquire = e(5),
                            o.utf8 = e(7),
                            o.pool = e(6),
                            o.LongBits = e(14),
                            o.isNode = Boolean(void 0 !== commonjsGlobal && commonjsGlobal && commonjsGlobal.process && commonjsGlobal.process.versions && commonjsGlobal.process.versions.node),
                            o.global = o.isNode && commonjsGlobal || "undefined" != typeof window && window || "undefined" != typeof self && self || this,
                            o.emptyArray = Object.freeze ? Object.freeze([]) : [],
                            o.emptyObject = Object.freeze ? Object.freeze({}) : {},
                            o.isInteger = Number.isInteger || function(e) {
                                return "number" == typeof e && isFinite(e) && Math.floor(e) === e;
                            }
                            ,
                            o.isString = function(e) {
                                return "string" == typeof e || e instanceof String;
                            }
                            ,
                            o.isObject = function(e) {
                                return e && "object" == typeof e;
                            }
                            ,
                            o.isset = o.isSet = function(e, t) {
                                var r = e[t];
                                return !(null == r || !e.hasOwnProperty(t)) && ("object" != typeof r || (Array.isArray(r) ? r.length : Object.keys(r).length) > 0);
                            }
                            ,
                            o.Buffer = function() {
                                try {
                                    var e = o.inquire("buffer").Buffer;
                                    return e.prototype.utf8Write ? e : null;
                                } catch (e) {
                                    return null;
                                }
                            }(),
                            o._Buffer_from = null,
                            o._Buffer_allocUnsafe = null,
                            o.newBuffer = function(e) {
                                return "number" == typeof e ? o.Buffer ? o._Buffer_allocUnsafe(e) : new o.Array(e) : o.Buffer ? o._Buffer_from(e) : "undefined" == typeof Uint8Array ? e : new Uint8Array(e);
                            }
                            ,
                            o.Array = "undefined" != typeof Uint8Array ? Uint8Array : Array,
                            o.Long = o.global.dcodeIO && o.global.dcodeIO.Long || o.global.Long || o.inquire("long"),
                            o.key2Re = /^true|false|0|1$/,
                            o.key32Re = /^-?(?:0|[1-9][0-9]*)$/,
                            o.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/,
                            o.longToHash = function(e) {
                                return e ? o.LongBits.from(e).toHash() : o.LongBits.zeroHash;
                            }
                            ,
                            o.longFromHash = function(e, t) {
                                var r = o.LongBits.fromHash(e);
                                return o.Long ? o.Long.fromBits(r.lo, r.hi, t) : r.toNumber(Boolean(t));
                            }
                            ,
                            o.merge = n,
                            o.lcFirst = function(e) {
                                return e.charAt(0).toLowerCase() + e.substring(1);
                            }
                            ,
                            o.newError = s,
                            o.ProtocolError = s("ProtocolError"),
                            o.oneOfGetter = function(e) {
                                for (var t = {}, r = 0; r < e.length; ++r)
                                    t[e[r]] = 1;
                                return function() {
                                    for (var e = Object.keys(this), r = e.length - 1; r > -1; --r)
                                        if (1 === t[e[r]] && this[e[r]] !== undefined$1 && null !== this[e[r]])
                                            return e[r];
                                }
                                ;
                            }
                            ,
                            o.oneOfSetter = function(e) {
                                return function(t) {
                                    for (var r = 0; r < e.length; ++r)
                                        e[r] !== t && delete this[e[r]];
                                }
                                ;
                            }
                            ,
                            o.toJSONOptions = {
                                longs: String,
                                enums: String,
                                bytes: String,
                                json: !0
                            },
                            o._configure = function() {
                                var e = o.Buffer;
                                e ? (o._Buffer_from = e.from !== Uint8Array.from && e.from || function(t, r) {
                                    return new e(t,r);
                                }
                                ,
                                o._Buffer_allocUnsafe = e.allocUnsafe || function(t) {
                                    return new e(t);
                                }
                                ) : o._Buffer_from = o._Buffer_allocUnsafe = null;
                            }
                            ;
                        }
                        , {
                            1: 1,
                            14: 14,
                            2: 2,
                            3: 3,
                            4: 4,
                            5: 5,
                            6: 6,
                            7: 7
                        }],
                        16: [function(e, t, r) {
                            t.exports = d;
                            var o, n = e(15), s = n.LongBits, i = n.base64, a = n.utf8;
                            function l(e, t, r) {
                                this.fn = e,
                                this.len = t,
                                this.next = undefined$1,
                                this.val = r;
                            }
                            function c() {}
                            function u(e) {
                                this.head = e.head,
                                this.tail = e.tail,
                                this.len = e.len,
                                this.next = e.states;
                            }
                            function d() {
                                this.len = 0,
                                this.head = new l(c,0,0),
                                this.tail = this.head,
                                this.states = null;
                            }
                            var p = function() {
                                return n.Buffer ? function() {
                                    return (d.create = function() {
                                        return new o();
                                    }
                                    )();
                                }
                                : function() {
                                    return new d();
                                }
                                ;
                            };
                            function m(e, t, r) {
                                t[r] = 255 & e;
                            }
                            function h(e, t) {
                                this.len = e,
                                this.next = undefined$1,
                                this.val = t;
                            }
                            function g(e, t, r) {
                                for (; e.hi; )
                                    t[r++] = 127 & e.lo | 128,
                                    e.lo = (e.lo >>> 7 | e.hi << 25) >>> 0,
                                    e.hi >>>= 7;
                                for (; e.lo > 127; )
                                    t[r++] = 127 & e.lo | 128,
                                    e.lo = e.lo >>> 7;
                                t[r++] = e.lo;
                            }
                            function f(e, t, r) {
                                t[r] = 255 & e,
                                t[r + 1] = e >>> 8 & 255,
                                t[r + 2] = e >>> 16 & 255,
                                t[r + 3] = e >>> 24;
                            }
                            d.create = p(),
                            d.alloc = function(e) {
                                return new n.Array(e);
                            }
                            ,
                            n.Array !== Array && (d.alloc = n.pool(d.alloc, n.Array.prototype.subarray)),
                            d.prototype._push = function(e, t, r) {
                                return this.tail = this.tail.next = new l(e,t,r),
                                this.len += t,
                                this;
                            }
                            ,
                            h.prototype = Object.create(l.prototype),
                            h.prototype.fn = function(e, t, r) {
                                for (; e > 127; )
                                    t[r++] = 127 & e | 128,
                                    e >>>= 7;
                                t[r] = e;
                            }
                            ,
                            d.prototype.uint32 = function(e) {
                                return this.len += (this.tail = this.tail.next = new h((e >>>= 0) < 128 ? 1 : e < 16384 ? 2 : e < 2097152 ? 3 : e < 268435456 ? 4 : 5,e)).len,
                                this;
                            }
                            ,
                            d.prototype.int32 = function(e) {
                                return e < 0 ? this._push(g, 10, s.fromNumber(e)) : this.uint32(e);
                            }
                            ,
                            d.prototype.sint32 = function(e) {
                                return this.uint32((e << 1 ^ e >> 31) >>> 0);
                            }
                            ,
                            d.prototype.uint64 = function(e) {
                                var t = s.from(e);
                                return this._push(g, t.length(), t);
                            }
                            ,
                            d.prototype.int64 = d.prototype.uint64,
                            d.prototype.sint64 = function(e) {
                                var t = s.from(e).zzEncode();
                                return this._push(g, t.length(), t);
                            }
                            ,
                            d.prototype.bool = function(e) {
                                return this._push(m, 1, e ? 1 : 0);
                            }
                            ,
                            d.prototype.fixed32 = function(e) {
                                return this._push(f, 4, e >>> 0);
                            }
                            ,
                            d.prototype.sfixed32 = d.prototype.fixed32,
                            d.prototype.fixed64 = function(e) {
                                var t = s.from(e);
                                return this._push(f, 4, t.lo)._push(f, 4, t.hi);
                            }
                            ,
                            d.prototype.sfixed64 = d.prototype.fixed64,
                            d.prototype.float = function(e) {
                                return this._push(n.float.writeFloatLE, 4, e);
                            }
                            ,
                            d.prototype.double = function(e) {
                                return this._push(n.float.writeDoubleLE, 8, e);
                            }
                            ;
                            var y = n.Array.prototype.set ? function(e, t, r) {
                                t.set(e, r);
                            }
                            : function(e, t, r) {
                                for (var o = 0; o < e.length; ++o)
                                    t[r + o] = e[o];
                            }
                            ;
                            d.prototype.bytes = function(e) {
                                var t = e.length >>> 0;
                                if (!t)
                                    return this._push(m, 1, 0);
                                if (n.isString(e)) {
                                    var r = d.alloc(t = i.length(e));
                                    i.decode(e, r, 0),
                                    e = r;
                                }
                                return this.uint32(t)._push(y, t, e);
                            }
                            ,
                            d.prototype.string = function(e) {
                                var t = a.length(e);
                                return t ? this.uint32(t)._push(a.write, t, e) : this._push(m, 1, 0);
                            }
                            ,
                            d.prototype.fork = function() {
                                return this.states = new u(this),
                                this.head = this.tail = new l(c,0,0),
                                this.len = 0,
                                this;
                            }
                            ,
                            d.prototype.reset = function() {
                                return this.states ? (this.head = this.states.head,
                                this.tail = this.states.tail,
                                this.len = this.states.len,
                                this.states = this.states.next) : (this.head = this.tail = new l(c,0,0),
                                this.len = 0),
                                this;
                            }
                            ,
                            d.prototype.ldelim = function() {
                                var e = this.head
                                  , t = this.tail
                                  , r = this.len;
                                return this.reset().uint32(r),
                                r && (this.tail.next = e.next,
                                this.tail = t,
                                this.len += r),
                                this;
                            }
                            ,
                            d.prototype.finish = function() {
                                for (var e = this.head.next, t = this.constructor.alloc(this.len), r = 0; e; )
                                    e.fn(e.val, t, r),
                                    r += e.len,
                                    e = e.next;
                                return t;
                            }
                            ,
                            d._configure = function(e) {
                                o = e,
                                d.create = p(),
                                o._configure();
                            }
                            ;
                        }
                        , {
                            15: 15
                        }],
                        17: [function(e, t, r) {
                            t.exports = s;
                            var o = e(16);
                            (s.prototype = Object.create(o.prototype)).constructor = s;
                            var n = e(15);
                            function s() {
                                o.call(this);
                            }
                            function i(e, t, r) {
                                e.length < 40 ? n.utf8.write(e, t, r) : t.utf8Write ? t.utf8Write(e, r) : t.write(e, r);
                            }
                            s._configure = function() {
                                s.alloc = n._Buffer_allocUnsafe,
                                s.writeBytesBuffer = n.Buffer && n.Buffer.prototype instanceof Uint8Array && "set" === n.Buffer.prototype.set.name ? function(e, t, r) {
                                    t.set(e, r);
                                }
                                : function(e, t, r) {
                                    if (e.copy)
                                        e.copy(t, r, 0, e.length);
                                    else
                                        for (var o = 0; o < e.length; )
                                            t[r++] = e[o++];
                                }
                                ;
                            }
                            ,
                            s.prototype.bytes = function(e) {
                                n.isString(e) && (e = n._Buffer_from(e, "base64"));
                                var t = e.length >>> 0;
                                return this.uint32(t),
                                t && this._push(s.writeBytesBuffer, t, e),
                                this;
                            }
                            ,
                            s.prototype.string = function(e) {
                                var t = n.Buffer.byteLength(e);
                                return this.uint32(t),
                                t && this._push(i, t, e),
                                this;
                            }
                            ,
                            s._configure();
                        }
                        , {
                            15: 15,
                            16: 16
                        }]
                    }, {}, [8]);
                }
                )();
            }
            )(protobuf);
            var $protobuf = protobuf.exports, $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util, $root = $protobuf.roots.default || ($protobuf.roots.default = {}), valuesById, values, constant, contant, common, grpc, gobes, game;
            $root.game = (game = {},
            game.gobes = ((gobes = {}).grpc = ((grpc = {}).common = ((common = {}).dto = function() {
                var e = {};
                return e.AckMessage = function() {
                    function e(e) {
                        if (e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.rtnCode = 0,
                    e.prototype.msg = "",
                    e.prototype.seq = "",
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        return t || (t = $Writer.create()),
                        null != e.rtnCode && Object.hasOwnProperty.call(e, "rtnCode") && t.uint32(8).int32(e.rtnCode),
                        null != e.msg && Object.hasOwnProperty.call(e, "msg") && t.uint32(18).string(e.msg),
                        null != e.seq && Object.hasOwnProperty.call(e, "seq") && t.uint32(26).string(e.seq),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.AckMessage(); e.pos < r; ) {
                            var n = e.uint32();
                            switch (n >>> 3) {
                            case 1:
                                o.rtnCode = e.int32();
                                break;
                            case 2:
                                o.msg = e.string();
                                break;
                            case 3:
                                o.seq = e.string();
                                break;
                            default:
                                e.skipType(7 & n);
                            }
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        return "object" != typeof e || null === e ? "object expected" : null != e.rtnCode && e.hasOwnProperty("rtnCode") && !$util.isInteger(e.rtnCode) ? "rtnCode: integer expected" : null != e.msg && e.hasOwnProperty("msg") && !$util.isString(e.msg) ? "msg: string expected" : null != e.seq && e.hasOwnProperty("seq") && !$util.isString(e.seq) ? "seq: string expected" : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.AckMessage)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.AckMessage();
                        return null != e.rtnCode && (t.rtnCode = 0 | e.rtnCode),
                        null != e.msg && (t.msg = String(e.msg)),
                        null != e.seq && (t.seq = String(e.seq)),
                        t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        return t.defaults && (r.rtnCode = 0,
                        r.msg = "",
                        r.seq = ""),
                        null != e.rtnCode && e.hasOwnProperty("rtnCode") && (r.rtnCode = e.rtnCode),
                        null != e.msg && e.hasOwnProperty("msg") && (r.msg = e.msg),
                        null != e.seq && e.hasOwnProperty("seq") && (r.seq = e.seq),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.ClientFrame = function() {
                    function e(e) {
                        if (this.data = [],
                        e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.currentFrameId = 0,
                    e.prototype.data = $util.emptyArray,
                    e.prototype.timestamp = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0,
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        if (t || (t = $Writer.create()),
                        null != e.currentFrameId && Object.hasOwnProperty.call(e, "currentFrameId") && t.uint32(8).int32(e.currentFrameId),
                        null != e.data && e.data.length)
                            for (var r = 0; r < e.data.length; ++r)
                                t.uint32(18).string(e.data[r]);
                        return null != e.timestamp && Object.hasOwnProperty.call(e, "timestamp") && t.uint32(24).int64(e.timestamp),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.ClientFrame(); e.pos < r; ) {
                            var n = e.uint32();
                            switch (n >>> 3) {
                            case 1:
                                o.currentFrameId = e.int32();
                                break;
                            case 2:
                                o.data && o.data.length || (o.data = []),
                                o.data.push(e.string());
                                break;
                            case 3:
                                o.timestamp = e.int64();
                                break;
                            default:
                                e.skipType(7 & n);
                            }
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        if ("object" != typeof e || null === e)
                            return "object expected";
                        if (null != e.currentFrameId && e.hasOwnProperty("currentFrameId") && !$util.isInteger(e.currentFrameId))
                            return "currentFrameId: integer expected";
                        if (null != e.data && e.hasOwnProperty("data")) {
                            if (!Array.isArray(e.data))
                                return "data: array expected";
                            for (var t = 0; t < e.data.length; ++t)
                                if (!$util.isString(e.data[t]))
                                    return "data: string[] expected";
                        }
                        return null != e.timestamp && e.hasOwnProperty("timestamp") && !($util.isInteger(e.timestamp) || e.timestamp && $util.isInteger(e.timestamp.low) && $util.isInteger(e.timestamp.high)) ? "timestamp: integer|Long expected" : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.ClientFrame)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.ClientFrame();
                        if (null != e.currentFrameId && (t.currentFrameId = 0 | e.currentFrameId),
                        e.data) {
                            if (!Array.isArray(e.data))
                                throw TypeError(".game.gobes.grpc.common.dto.ClientFrame.data: array expected");
                            t.data = [];
                            for (var r = 0; r < e.data.length; ++r)
                                t.data[r] = String(e.data[r]);
                        }
                        return null != e.timestamp && ($util.Long ? (t.timestamp = $util.Long.fromValue(e.timestamp)).unsigned = !1 : "string" == typeof e.timestamp ? t.timestamp = parseInt(e.timestamp, 10) : "number" == typeof e.timestamp ? t.timestamp = e.timestamp : "object" == typeof e.timestamp && (t.timestamp = new $util.LongBits(e.timestamp.low >>> 0,e.timestamp.high >>> 0).toNumber())),
                        t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        if ((t.arrays || t.defaults) && (r.data = []),
                        t.defaults)
                            if (r.currentFrameId = 0,
                            $util.Long) {
                                var o = new $util.Long(0,0,!1);
                                r.timestamp = t.longs === String ? o.toString() : t.longs === Number ? o.toNumber() : o;
                            } else
                                r.timestamp = t.longs === String ? "0" : 0;
                        if (null != e.currentFrameId && e.hasOwnProperty("currentFrameId") && (r.currentFrameId = e.currentFrameId),
                        e.data && e.data.length) {
                            r.data = [];
                            for (var n = 0; n < e.data.length; ++n)
                                r.data[n] = e.data[n];
                        }
                        return null != e.timestamp && e.hasOwnProperty("timestamp") && ("number" == typeof e.timestamp ? r.timestamp = t.longs === String ? String(e.timestamp) : e.timestamp : r.timestamp = t.longs === String ? $util.Long.prototype.toString.call(e.timestamp) : t.longs === Number ? new $util.LongBits(e.timestamp.low >>> 0,e.timestamp.high >>> 0).toNumber() : e.timestamp),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.ClientMessage = function() {
                    function e(e) {
                        if (e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.code = 0,
                    e.prototype.seq = "",
                    e.prototype.timestamp = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0,
                    e.prototype.msg = $util.newBuffer([]),
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        return t || (t = $Writer.create()),
                        null != e.code && Object.hasOwnProperty.call(e, "code") && t.uint32(8).int32(e.code),
                        null != e.seq && Object.hasOwnProperty.call(e, "seq") && t.uint32(18).string(e.seq),
                        null != e.timestamp && Object.hasOwnProperty.call(e, "timestamp") && t.uint32(24).int64(e.timestamp),
                        null != e.msg && Object.hasOwnProperty.call(e, "msg") && t.uint32(34).bytes(e.msg),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.ClientMessage(); e.pos < r; ) {
                            var n = e.uint32();
                            switch (n >>> 3) {
                            case 1:
                                o.code = e.int32();
                                break;
                            case 2:
                                o.seq = e.string();
                                break;
                            case 3:
                                o.timestamp = e.int64();
                                break;
                            case 4:
                                o.msg = e.bytes();
                                break;
                            default:
                                e.skipType(7 & n);
                            }
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        return "object" != typeof e || null === e ? "object expected" : null != e.code && e.hasOwnProperty("code") && !$util.isInteger(e.code) ? "code: integer expected" : null != e.seq && e.hasOwnProperty("seq") && !$util.isString(e.seq) ? "seq: string expected" : null != e.timestamp && e.hasOwnProperty("timestamp") && !($util.isInteger(e.timestamp) || e.timestamp && $util.isInteger(e.timestamp.low) && $util.isInteger(e.timestamp.high)) ? "timestamp: integer|Long expected" : null != e.msg && e.hasOwnProperty("msg") && !(e.msg && "number" == typeof e.msg.length || $util.isString(e.msg)) ? "msg: buffer expected" : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.ClientMessage)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.ClientMessage();
                        return null != e.code && (t.code = 0 | e.code),
                        null != e.seq && (t.seq = String(e.seq)),
                        null != e.timestamp && ($util.Long ? (t.timestamp = $util.Long.fromValue(e.timestamp)).unsigned = !1 : "string" == typeof e.timestamp ? t.timestamp = parseInt(e.timestamp, 10) : "number" == typeof e.timestamp ? t.timestamp = e.timestamp : "object" == typeof e.timestamp && (t.timestamp = new $util.LongBits(e.timestamp.low >>> 0,e.timestamp.high >>> 0).toNumber())),
                        null != e.msg && ("string" == typeof e.msg ? $util.base64.decode(e.msg, t.msg = $util.newBuffer($util.base64.length(e.msg)), 0) : e.msg.length >= 0 && (t.msg = e.msg)),
                        t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        if (t.defaults) {
                            if (r.code = 0,
                            r.seq = "",
                            $util.Long) {
                                var o = new $util.Long(0,0,!1);
                                r.timestamp = t.longs === String ? o.toString() : t.longs === Number ? o.toNumber() : o;
                            } else
                                r.timestamp = t.longs === String ? "0" : 0;
                            t.bytes === String ? r.msg = "" : (r.msg = [],
                            t.bytes !== Array && (r.msg = $util.newBuffer(r.msg)));
                        }
                        return null != e.code && e.hasOwnProperty("code") && (r.code = e.code),
                        null != e.seq && e.hasOwnProperty("seq") && (r.seq = e.seq),
                        null != e.timestamp && e.hasOwnProperty("timestamp") && ("number" == typeof e.timestamp ? r.timestamp = t.longs === String ? String(e.timestamp) : e.timestamp : r.timestamp = t.longs === String ? $util.Long.prototype.toString.call(e.timestamp) : t.longs === Number ? new $util.LongBits(e.timestamp.low >>> 0,e.timestamp.high >>> 0).toNumber() : e.timestamp),
                        null != e.msg && e.hasOwnProperty("msg") && (r.msg = t.bytes === String ? $util.base64.encode(e.msg, 0, e.msg.length) : t.bytes === Array ? Array.prototype.slice.call(e.msg) : e.msg),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.CommonMessage = function() {
                    function e(e) {
                        if (e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.msg = "",
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        return t || (t = $Writer.create()),
                        null != e.msg && Object.hasOwnProperty.call(e, "msg") && t.uint32(10).string(e.msg),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.CommonMessage(); e.pos < r; ) {
                            var n = e.uint32();
                            n >>> 3 == 1 ? o.msg = e.string() : e.skipType(7 & n);
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        return "object" != typeof e || null === e ? "object expected" : null != e.msg && e.hasOwnProperty("msg") && !$util.isString(e.msg) ? "msg: string expected" : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.CommonMessage)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.CommonMessage();
                        return null != e.msg && (t.msg = String(e.msg)),
                        t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        return t.defaults && (r.msg = ""),
                        null != e.msg && e.hasOwnProperty("msg") && (r.msg = e.msg),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.FrameExtInfo = function() {
                    function e(e) {
                        if (e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.seed = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0,
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        return t || (t = $Writer.create()),
                        null != e.seed && Object.hasOwnProperty.call(e, "seed") && t.uint32(8).int64(e.seed),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.FrameExtInfo(); e.pos < r; ) {
                            var n = e.uint32();
                            n >>> 3 == 1 ? o.seed = e.int64() : e.skipType(7 & n);
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        return "object" != typeof e || null === e ? "object expected" : null != e.seed && e.hasOwnProperty("seed") && !($util.isInteger(e.seed) || e.seed && $util.isInteger(e.seed.low) && $util.isInteger(e.seed.high)) ? "seed: integer|Long expected" : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.FrameExtInfo)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.FrameExtInfo();
                        return null != e.seed && ($util.Long ? (t.seed = $util.Long.fromValue(e.seed)).unsigned = !1 : "string" == typeof e.seed ? t.seed = parseInt(e.seed, 10) : "number" == typeof e.seed ? t.seed = e.seed : "object" == typeof e.seed && (t.seed = new $util.LongBits(e.seed.low >>> 0,e.seed.high >>> 0).toNumber())),
                        t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        if (t.defaults)
                            if ($util.Long) {
                                var o = new $util.Long(0,0,!1);
                                r.seed = t.longs === String ? o.toString() : t.longs === Number ? o.toNumber() : o;
                            } else
                                r.seed = t.longs === String ? "0" : 0;
                        return null != e.seed && e.hasOwnProperty("seed") && ("number" == typeof e.seed ? r.seed = t.longs === String ? String(e.seed) : e.seed : r.seed = t.longs === String ? $util.Long.prototype.toString.call(e.seed) : t.longs === Number ? new $util.LongBits(e.seed.low >>> 0,e.seed.high >>> 0).toNumber() : e.seed),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.FrameInfo = function() {
                    function e(e) {
                        if (this.data = [],
                        e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.playerId = "",
                    e.prototype.data = $util.emptyArray,
                    e.prototype.timestamp = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0,
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        if (t || (t = $Writer.create()),
                        null != e.playerId && Object.hasOwnProperty.call(e, "playerId") && t.uint32(10).string(e.playerId),
                        null != e.data && e.data.length)
                            for (var r = 0; r < e.data.length; ++r)
                                t.uint32(18).string(e.data[r]);
                        return null != e.timestamp && Object.hasOwnProperty.call(e, "timestamp") && t.uint32(24).int64(e.timestamp),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.FrameInfo(); e.pos < r; ) {
                            var n = e.uint32();
                            switch (n >>> 3) {
                            case 1:
                                o.playerId = e.string();
                                break;
                            case 2:
                                o.data && o.data.length || (o.data = []),
                                o.data.push(e.string());
                                break;
                            case 3:
                                o.timestamp = e.int64();
                                break;
                            default:
                                e.skipType(7 & n);
                            }
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        if ("object" != typeof e || null === e)
                            return "object expected";
                        if (null != e.playerId && e.hasOwnProperty("playerId") && !$util.isString(e.playerId))
                            return "playerId: string expected";
                        if (null != e.data && e.hasOwnProperty("data")) {
                            if (!Array.isArray(e.data))
                                return "data: array expected";
                            for (var t = 0; t < e.data.length; ++t)
                                if (!$util.isString(e.data[t]))
                                    return "data: string[] expected";
                        }
                        return null != e.timestamp && e.hasOwnProperty("timestamp") && !($util.isInteger(e.timestamp) || e.timestamp && $util.isInteger(e.timestamp.low) && $util.isInteger(e.timestamp.high)) ? "timestamp: integer|Long expected" : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.FrameInfo)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.FrameInfo();
                        if (null != e.playerId && (t.playerId = String(e.playerId)),
                        e.data) {
                            if (!Array.isArray(e.data))
                                throw TypeError(".game.gobes.grpc.common.dto.FrameInfo.data: array expected");
                            t.data = [];
                            for (var r = 0; r < e.data.length; ++r)
                                t.data[r] = String(e.data[r]);
                        }
                        return null != e.timestamp && ($util.Long ? (t.timestamp = $util.Long.fromValue(e.timestamp)).unsigned = !1 : "string" == typeof e.timestamp ? t.timestamp = parseInt(e.timestamp, 10) : "number" == typeof e.timestamp ? t.timestamp = e.timestamp : "object" == typeof e.timestamp && (t.timestamp = new $util.LongBits(e.timestamp.low >>> 0,e.timestamp.high >>> 0).toNumber())),
                        t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        if ((t.arrays || t.defaults) && (r.data = []),
                        t.defaults)
                            if (r.playerId = "",
                            $util.Long) {
                                var o = new $util.Long(0,0,!1);
                                r.timestamp = t.longs === String ? o.toString() : t.longs === Number ? o.toNumber() : o;
                            } else
                                r.timestamp = t.longs === String ? "0" : 0;
                        if (null != e.playerId && e.hasOwnProperty("playerId") && (r.playerId = e.playerId),
                        e.data && e.data.length) {
                            r.data = [];
                            for (var n = 0; n < e.data.length; ++n)
                                r.data[n] = e.data[n];
                        }
                        return null != e.timestamp && e.hasOwnProperty("timestamp") && ("number" == typeof e.timestamp ? r.timestamp = t.longs === String ? String(e.timestamp) : e.timestamp : r.timestamp = t.longs === String ? $util.Long.prototype.toString.call(e.timestamp) : t.longs === Number ? new $util.LongBits(e.timestamp.low >>> 0,e.timestamp.high >>> 0).toNumber() : e.timestamp),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.GroupInfo = function() {
                    function e(e) {
                        if (e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.groupId = "",
                    e.prototype.customGroupProperties = "",
                    e.prototype.groupName = "",
                    e.prototype.isLock = !1,
                    e.prototype.ownerId = "",
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        return t || (t = $Writer.create()),
                        null != e.groupId && Object.hasOwnProperty.call(e, "groupId") && t.uint32(10).string(e.groupId),
                        null != e.customGroupProperties && Object.hasOwnProperty.call(e, "customGroupProperties") && t.uint32(18).string(e.customGroupProperties),
                        null != e.groupName && Object.hasOwnProperty.call(e, "groupName") && t.uint32(26).string(e.groupName),
                        null != e.isLock && Object.hasOwnProperty.call(e, "isLock") && t.uint32(32).bool(e.isLock),
                        null != e.ownerId && Object.hasOwnProperty.call(e, "ownerId") && t.uint32(42).string(e.ownerId),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.GroupInfo(); e.pos < r; ) {
                            var n = e.uint32();
                            switch (n >>> 3) {
                            case 1:
                                o.groupId = e.string();
                                break;
                            case 2:
                                o.customGroupProperties = e.string();
                                break;
                            case 3:
                                o.groupName = e.string();
                                break;
                            case 4:
                                o.isLock = e.bool();
                                break;
                            case 5:
                                o.ownerId = e.string();
                                break;
                            default:
                                e.skipType(7 & n);
                            }
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        return "object" != typeof e || null === e ? "object expected" : null != e.groupId && e.hasOwnProperty("groupId") && !$util.isString(e.groupId) ? "groupId: string expected" : null != e.customGroupProperties && e.hasOwnProperty("customGroupProperties") && !$util.isString(e.customGroupProperties) ? "customGroupProperties: string expected" : null != e.groupName && e.hasOwnProperty("groupName") && !$util.isString(e.groupName) ? "groupName: string expected" : null != e.isLock && e.hasOwnProperty("isLock") && "boolean" != typeof e.isLock ? "isLock: boolean expected" : null != e.ownerId && e.hasOwnProperty("ownerId") && !$util.isString(e.ownerId) ? "ownerId: string expected" : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.GroupInfo)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.GroupInfo();
                        return null != e.groupId && (t.groupId = String(e.groupId)),
                        null != e.customGroupProperties && (t.customGroupProperties = String(e.customGroupProperties)),
                        null != e.groupName && (t.groupName = String(e.groupName)),
                        null != e.isLock && (t.isLock = Boolean(e.isLock)),
                        null != e.ownerId && (t.ownerId = String(e.ownerId)),
                        t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        return t.defaults && (r.groupId = "",
                        r.customGroupProperties = "",
                        r.groupName = "",
                        r.isLock = !1,
                        r.ownerId = ""),
                        null != e.groupId && e.hasOwnProperty("groupId") && (r.groupId = e.groupId),
                        null != e.customGroupProperties && e.hasOwnProperty("customGroupProperties") && (r.customGroupProperties = e.customGroupProperties),
                        null != e.groupName && e.hasOwnProperty("groupName") && (r.groupName = e.groupName),
                        null != e.isLock && e.hasOwnProperty("isLock") && (r.isLock = e.isLock),
                        null != e.ownerId && e.hasOwnProperty("ownerId") && (r.ownerId = e.ownerId),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.GroupNotify = function() {
                    function e(e) {
                        if (this.players = [],
                        e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.groupId = "",
                    e.prototype.ownerId = "",
                    e.prototype.players = $util.emptyArray,
                    e.prototype.group = null,
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        if (t || (t = $Writer.create()),
                        null != e.groupId && Object.hasOwnProperty.call(e, "groupId") && t.uint32(10).string(e.groupId),
                        null != e.ownerId && Object.hasOwnProperty.call(e, "ownerId") && t.uint32(18).string(e.ownerId),
                        null != e.players && e.players.length)
                            for (var r = 0; r < e.players.length; ++r)
                                $root.game.gobes.grpc.common.dto.PlayerInfo.encode(e.players[r], t.uint32(26).fork()).ldelim();
                        return null != e.group && Object.hasOwnProperty.call(e, "group") && $root.game.gobes.grpc.common.dto.GroupInfo.encode(e.group, t.uint32(34).fork()).ldelim(),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.GroupNotify(); e.pos < r; ) {
                            var n = e.uint32();
                            switch (n >>> 3) {
                            case 1:
                                o.groupId = e.string();
                                break;
                            case 2:
                                o.ownerId = e.string();
                                break;
                            case 3:
                                o.players && o.players.length || (o.players = []),
                                o.players.push($root.game.gobes.grpc.common.dto.PlayerInfo.decode(e, e.uint32()));
                                break;
                            case 4:
                                o.group = $root.game.gobes.grpc.common.dto.GroupInfo.decode(e, e.uint32());
                                break;
                            default:
                                e.skipType(7 & n);
                            }
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        if ("object" != typeof e || null === e)
                            return "object expected";
                        if (null != e.groupId && e.hasOwnProperty("groupId") && !$util.isString(e.groupId))
                            return "groupId: string expected";
                        if (null != e.ownerId && e.hasOwnProperty("ownerId") && !$util.isString(e.ownerId))
                            return "ownerId: string expected";
                        if (null != e.players && e.hasOwnProperty("players")) {
                            if (!Array.isArray(e.players))
                                return "players: array expected";
                            for (var t = 0; t < e.players.length; ++t)
                                if (r = $root.game.gobes.grpc.common.dto.PlayerInfo.verify(e.players[t]))
                                    return "players." + r;
                        }
                        var r;
                        return null != e.group && e.hasOwnProperty("group") && (r = $root.game.gobes.grpc.common.dto.GroupInfo.verify(e.group)) ? "group." + r : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.GroupNotify)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.GroupNotify();
                        if (null != e.groupId && (t.groupId = String(e.groupId)),
                        null != e.ownerId && (t.ownerId = String(e.ownerId)),
                        e.players) {
                            if (!Array.isArray(e.players))
                                throw TypeError(".game.gobes.grpc.common.dto.GroupNotify.players: array expected");
                            t.players = [];
                            for (var r = 0; r < e.players.length; ++r) {
                                if ("object" != typeof e.players[r])
                                    throw TypeError(".game.gobes.grpc.common.dto.GroupNotify.players: object expected");
                                t.players[r] = $root.game.gobes.grpc.common.dto.PlayerInfo.fromObject(e.players[r]);
                            }
                        }
                        if (null != e.group) {
                            if ("object" != typeof e.group)
                                throw TypeError(".game.gobes.grpc.common.dto.GroupNotify.group: object expected");
                            t.group = $root.game.gobes.grpc.common.dto.GroupInfo.fromObject(e.group);
                        }
                        return t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        if ((t.arrays || t.defaults) && (r.players = []),
                        t.defaults && (r.groupId = "",
                        r.ownerId = "",
                        r.group = null),
                        null != e.groupId && e.hasOwnProperty("groupId") && (r.groupId = e.groupId),
                        null != e.ownerId && e.hasOwnProperty("ownerId") && (r.ownerId = e.ownerId),
                        e.players && e.players.length) {
                            r.players = [];
                            for (var o = 0; o < e.players.length; ++o)
                                r.players[o] = $root.game.gobes.grpc.common.dto.PlayerInfo.toObject(e.players[o], t);
                        }
                        return null != e.group && e.hasOwnProperty("group") && (r.group = $root.game.gobes.grpc.common.dto.GroupInfo.toObject(e.group, t)),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.InstantMessage = function() {
                    function e(e) {
                        if (this.dstPlayers = [],
                        e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.imType = 0,
                    e.prototype.dstPlayers = $util.emptyArray,
                    e.prototype.srcPlayer = "",
                    e.prototype.msg = "",
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        if (t || (t = $Writer.create()),
                        null != e.imType && Object.hasOwnProperty.call(e, "imType") && t.uint32(8).int32(e.imType),
                        null != e.dstPlayers && e.dstPlayers.length)
                            for (var r = 0; r < e.dstPlayers.length; ++r)
                                t.uint32(18).string(e.dstPlayers[r]);
                        return null != e.srcPlayer && Object.hasOwnProperty.call(e, "srcPlayer") && t.uint32(26).string(e.srcPlayer),
                        null != e.msg && Object.hasOwnProperty.call(e, "msg") && t.uint32(34).string(e.msg),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.InstantMessage(); e.pos < r; ) {
                            var n = e.uint32();
                            switch (n >>> 3) {
                            case 1:
                                o.imType = e.int32();
                                break;
                            case 2:
                                o.dstPlayers && o.dstPlayers.length || (o.dstPlayers = []),
                                o.dstPlayers.push(e.string());
                                break;
                            case 3:
                                o.srcPlayer = e.string();
                                break;
                            case 4:
                                o.msg = e.string();
                                break;
                            default:
                                e.skipType(7 & n);
                            }
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        if ("object" != typeof e || null === e)
                            return "object expected";
                        if (null != e.imType && e.hasOwnProperty("imType"))
                            switch (e.imType) {
                            default:
                                return "imType: enum value expected";
                            case 0:
                            case 1:
                            case 2:
                            }
                        if (null != e.dstPlayers && e.hasOwnProperty("dstPlayers")) {
                            if (!Array.isArray(e.dstPlayers))
                                return "dstPlayers: array expected";
                            for (var t = 0; t < e.dstPlayers.length; ++t)
                                if (!$util.isString(e.dstPlayers[t]))
                                    return "dstPlayers: string[] expected";
                        }
                        return null != e.srcPlayer && e.hasOwnProperty("srcPlayer") && !$util.isString(e.srcPlayer) ? "srcPlayer: string expected" : null != e.msg && e.hasOwnProperty("msg") && !$util.isString(e.msg) ? "msg: string expected" : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.InstantMessage)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.InstantMessage();
                        switch (e.imType) {
                        default:
                            if ("number" == typeof e.imType) {
                                t.imType = e.imType;
                                break;
                            }
                            break;
                        case "ROOM":
                        case 0:
                            t.imType = 0;
                            break;
                        case "ROOM_EXCEPT_SENDER":
                        case 1:
                            t.imType = 1;
                            break;
                        case "PLAYERS":
                        case 2:
                            t.imType = 2;
                        }
                        if (e.dstPlayers) {
                            if (!Array.isArray(e.dstPlayers))
                                throw TypeError(".game.gobes.grpc.common.dto.InstantMessage.dstPlayers: array expected");
                            t.dstPlayers = [];
                            for (var r = 0; r < e.dstPlayers.length; ++r)
                                t.dstPlayers[r] = String(e.dstPlayers[r]);
                        }
                        return null != e.srcPlayer && (t.srcPlayer = String(e.srcPlayer)),
                        null != e.msg && (t.msg = String(e.msg)),
                        t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        if ((t.arrays || t.defaults) && (r.dstPlayers = []),
                        t.defaults && (r.imType = t.enums === String ? "ROOM" : 0,
                        r.srcPlayer = "",
                        r.msg = ""),
                        null != e.imType && e.hasOwnProperty("imType") && (r.imType = t.enums === String ? void 0 === $root.game.gobes.grpc.common.constant.InstantMessageType[e.imType] ? e.imType : $root.game.gobes.grpc.common.constant.InstantMessageType[e.imType] : e.imType),
                        e.dstPlayers && e.dstPlayers.length) {
                            r.dstPlayers = [];
                            for (var o = 0; o < e.dstPlayers.length; ++o)
                                r.dstPlayers[o] = e.dstPlayers[o];
                        }
                        return null != e.srcPlayer && e.hasOwnProperty("srcPlayer") && (r.srcPlayer = e.srcPlayer),
                        null != e.msg && e.hasOwnProperty("msg") && (r.msg = e.msg),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.JoinNotify = function() {
                    function e(e) {
                        if (e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.playerToken = "",
                    e.prototype.relayAddr = "",
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        return t || (t = $Writer.create()),
                        null != e.playerToken && Object.hasOwnProperty.call(e, "playerToken") && t.uint32(10).string(e.playerToken),
                        null != e.relayAddr && Object.hasOwnProperty.call(e, "relayAddr") && t.uint32(18).string(e.relayAddr),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.JoinNotify(); e.pos < r; ) {
                            var n = e.uint32();
                            switch (n >>> 3) {
                            case 1:
                                o.playerToken = e.string();
                                break;
                            case 2:
                                o.relayAddr = e.string();
                                break;
                            default:
                                e.skipType(7 & n);
                            }
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        return "object" != typeof e || null === e ? "object expected" : null != e.playerToken && e.hasOwnProperty("playerToken") && !$util.isString(e.playerToken) ? "playerToken: string expected" : null != e.relayAddr && e.hasOwnProperty("relayAddr") && !$util.isString(e.relayAddr) ? "relayAddr: string expected" : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.JoinNotify)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.JoinNotify();
                        return null != e.playerToken && (t.playerToken = String(e.playerToken)),
                        null != e.relayAddr && (t.relayAddr = String(e.relayAddr)),
                        t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        return t.defaults && (r.playerToken = "",
                        r.relayAddr = ""),
                        null != e.playerToken && e.hasOwnProperty("playerToken") && (r.playerToken = e.playerToken),
                        null != e.relayAddr && e.hasOwnProperty("relayAddr") && (r.relayAddr = e.relayAddr),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.PlayerInfo = function() {
                    function e(e) {
                        if (e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.playerId = "",
                    e.prototype.customState = 0,
                    e.prototype.extraInfo = "",
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        return t || (t = $Writer.create()),
                        null != e.playerId && Object.hasOwnProperty.call(e, "playerId") && t.uint32(10).string(e.playerId),
                        null != e.customState && Object.hasOwnProperty.call(e, "customState") && t.uint32(16).int32(e.customState),
                        null != e.extraInfo && Object.hasOwnProperty.call(e, "extraInfo") && t.uint32(26).string(e.extraInfo),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.PlayerInfo(); e.pos < r; ) {
                            var n = e.uint32();
                            switch (n >>> 3) {
                            case 1:
                                o.playerId = e.string();
                                break;
                            case 2:
                                o.customState = e.int32();
                                break;
                            case 3:
                                o.extraInfo = e.string();
                                break;
                            default:
                                e.skipType(7 & n);
                            }
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        return "object" != typeof e || null === e ? "object expected" : null != e.playerId && e.hasOwnProperty("playerId") && !$util.isString(e.playerId) ? "playerId: string expected" : null != e.customState && e.hasOwnProperty("customState") && !$util.isInteger(e.customState) ? "customState: integer expected" : null != e.extraInfo && e.hasOwnProperty("extraInfo") && !$util.isString(e.extraInfo) ? "extraInfo: string expected" : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.PlayerInfo)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.PlayerInfo();
                        return null != e.playerId && (t.playerId = String(e.playerId)),
                        null != e.customState && (t.customState = 0 | e.customState),
                        null != e.extraInfo && (t.extraInfo = String(e.extraInfo)),
                        t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        return t.defaults && (r.playerId = "",
                        r.customState = 0,
                        r.extraInfo = ""),
                        null != e.playerId && e.hasOwnProperty("playerId") && (r.playerId = e.playerId),
                        null != e.customState && e.hasOwnProperty("customState") && (r.customState = e.customState),
                        null != e.extraInfo && e.hasOwnProperty("extraInfo") && (r.extraInfo = e.extraInfo),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.PlayerProp = function() {
                    function e(e) {
                        if (e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.playerId = "",
                    e.prototype.customProp = "",
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        return t || (t = $Writer.create()),
                        null != e.playerId && Object.hasOwnProperty.call(e, "playerId") && t.uint32(10).string(e.playerId),
                        null != e.customProp && Object.hasOwnProperty.call(e, "customProp") && t.uint32(18).string(e.customProp),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.PlayerProp(); e.pos < r; ) {
                            var n = e.uint32();
                            switch (n >>> 3) {
                            case 1:
                                o.playerId = e.string();
                                break;
                            case 2:
                                o.customProp = e.string();
                                break;
                            default:
                                e.skipType(7 & n);
                            }
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        return "object" != typeof e || null === e ? "object expected" : null != e.playerId && e.hasOwnProperty("playerId") && !$util.isString(e.playerId) ? "playerId: string expected" : null != e.customProp && e.hasOwnProperty("customProp") && !$util.isString(e.customProp) ? "customProp: string expected" : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.PlayerProp)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.PlayerProp();
                        return null != e.playerId && (t.playerId = String(e.playerId)),
                        null != e.customProp && (t.customProp = String(e.customProp)),
                        t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        return t.defaults && (r.playerId = "",
                        r.customProp = ""),
                        null != e.playerId && e.hasOwnProperty("playerId") && (r.playerId = e.playerId),
                        null != e.customProp && e.hasOwnProperty("customProp") && (r.customProp = e.customProp),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.QueryFrameResult = function() {
                    function e(e) {
                        if (this.relayFrameInfos = [],
                        e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.relayFrameInfos = $util.emptyArray,
                    e.prototype.playerId = "",
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        if (t || (t = $Writer.create()),
                        null != e.relayFrameInfos && e.relayFrameInfos.length)
                            for (var r = 0; r < e.relayFrameInfos.length; ++r)
                                $root.game.gobes.grpc.common.dto.RelayFrameInfo.encode(e.relayFrameInfos[r], t.uint32(10).fork()).ldelim();
                        return null != e.playerId && Object.hasOwnProperty.call(e, "playerId") && t.uint32(18).string(e.playerId),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.QueryFrameResult(); e.pos < r; ) {
                            var n = e.uint32();
                            switch (n >>> 3) {
                            case 1:
                                o.relayFrameInfos && o.relayFrameInfos.length || (o.relayFrameInfos = []),
                                o.relayFrameInfos.push($root.game.gobes.grpc.common.dto.RelayFrameInfo.decode(e, e.uint32()));
                                break;
                            case 2:
                                o.playerId = e.string();
                                break;
                            default:
                                e.skipType(7 & n);
                            }
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        if ("object" != typeof e || null === e)
                            return "object expected";
                        if (null != e.relayFrameInfos && e.hasOwnProperty("relayFrameInfos")) {
                            if (!Array.isArray(e.relayFrameInfos))
                                return "relayFrameInfos: array expected";
                            for (var t = 0; t < e.relayFrameInfos.length; ++t) {
                                var r = $root.game.gobes.grpc.common.dto.RelayFrameInfo.verify(e.relayFrameInfos[t]);
                                if (r)
                                    return "relayFrameInfos." + r;
                            }
                        }
                        return null != e.playerId && e.hasOwnProperty("playerId") && !$util.isString(e.playerId) ? "playerId: string expected" : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.QueryFrameResult)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.QueryFrameResult();
                        if (e.relayFrameInfos) {
                            if (!Array.isArray(e.relayFrameInfos))
                                throw TypeError(".game.gobes.grpc.common.dto.QueryFrameResult.relayFrameInfos: array expected");
                            t.relayFrameInfos = [];
                            for (var r = 0; r < e.relayFrameInfos.length; ++r) {
                                if ("object" != typeof e.relayFrameInfos[r])
                                    throw TypeError(".game.gobes.grpc.common.dto.QueryFrameResult.relayFrameInfos: object expected");
                                t.relayFrameInfos[r] = $root.game.gobes.grpc.common.dto.RelayFrameInfo.fromObject(e.relayFrameInfos[r]);
                            }
                        }
                        return null != e.playerId && (t.playerId = String(e.playerId)),
                        t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        if ((t.arrays || t.defaults) && (r.relayFrameInfos = []),
                        t.defaults && (r.playerId = ""),
                        e.relayFrameInfos && e.relayFrameInfos.length) {
                            r.relayFrameInfos = [];
                            for (var o = 0; o < e.relayFrameInfos.length; ++o)
                                r.relayFrameInfos[o] = $root.game.gobes.grpc.common.dto.RelayFrameInfo.toObject(e.relayFrameInfos[o], t);
                        }
                        return null != e.playerId && e.hasOwnProperty("playerId") && (r.playerId = e.playerId),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.QueryFrame = function() {
                    function e(e) {
                        if (e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.currentFrameId = 0,
                    e.prototype.size = 0,
                    e.prototype.mode = 0,
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        return t || (t = $Writer.create()),
                        null != e.currentFrameId && Object.hasOwnProperty.call(e, "currentFrameId") && t.uint32(8).int32(e.currentFrameId),
                        null != e.size && Object.hasOwnProperty.call(e, "size") && t.uint32(16).int32(e.size),
                        null != e.mode && Object.hasOwnProperty.call(e, "mode") && t.uint32(24).int32(e.mode),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.QueryFrame(); e.pos < r; ) {
                            var n = e.uint32();
                            switch (n >>> 3) {
                            case 1:
                                o.currentFrameId = e.int32();
                                break;
                            case 2:
                                o.size = e.int32();
                                break;
                            case 3:
                                o.mode = e.int32();
                                break;
                            default:
                                e.skipType(7 & n);
                            }
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        return "object" != typeof e || null === e ? "object expected" : null != e.currentFrameId && e.hasOwnProperty("currentFrameId") && !$util.isInteger(e.currentFrameId) ? "currentFrameId: integer expected" : null != e.size && e.hasOwnProperty("size") && !$util.isInteger(e.size) ? "size: integer expected" : null != e.mode && e.hasOwnProperty("mode") && !$util.isInteger(e.mode) ? "mode: integer expected" : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.QueryFrame)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.QueryFrame();
                        return null != e.currentFrameId && (t.currentFrameId = 0 | e.currentFrameId),
                        null != e.size && (t.size = 0 | e.size),
                        null != e.mode && (t.mode = 0 | e.mode),
                        t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        return t.defaults && (r.currentFrameId = 0,
                        r.size = 0,
                        r.mode = 0),
                        null != e.currentFrameId && e.hasOwnProperty("currentFrameId") && (r.currentFrameId = e.currentFrameId),
                        null != e.size && e.hasOwnProperty("size") && (r.size = e.size),
                        null != e.mode && e.hasOwnProperty("mode") && (r.mode = e.mode),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.RealtimeMessage = function() {
                    function e(e) {
                        if (e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.msg = "",
                    e.prototype.srcPlayer = "",
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        return t || (t = $Writer.create()),
                        null != e.msg && Object.hasOwnProperty.call(e, "msg") && t.uint32(10).string(e.msg),
                        null != e.srcPlayer && Object.hasOwnProperty.call(e, "srcPlayer") && t.uint32(18).string(e.srcPlayer),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.RealtimeMessage(); e.pos < r; ) {
                            var n = e.uint32();
                            switch (n >>> 3) {
                            case 1:
                                o.msg = e.string();
                                break;
                            case 2:
                                o.srcPlayer = e.string();
                                break;
                            default:
                                e.skipType(7 & n);
                            }
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        return "object" != typeof e || null === e ? "object expected" : null != e.msg && e.hasOwnProperty("msg") && !$util.isString(e.msg) ? "msg: string expected" : null != e.srcPlayer && e.hasOwnProperty("srcPlayer") && !$util.isString(e.srcPlayer) ? "srcPlayer: string expected" : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.RealtimeMessage)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.RealtimeMessage();
                        return null != e.msg && (t.msg = String(e.msg)),
                        null != e.srcPlayer && (t.srcPlayer = String(e.srcPlayer)),
                        t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        return t.defaults && (r.msg = "",
                        r.srcPlayer = ""),
                        null != e.msg && e.hasOwnProperty("msg") && (r.msg = e.msg),
                        null != e.srcPlayer && e.hasOwnProperty("srcPlayer") && (r.srcPlayer = e.srcPlayer),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.RelayFrameInfo = function() {
                    function e(e) {
                        if (this.frameInfo = [],
                        e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.currentRoomFrameId = 0,
                    e.prototype.frameInfo = $util.emptyArray,
                    e.prototype.ext = null,
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        if (t || (t = $Writer.create()),
                        null != e.currentRoomFrameId && Object.hasOwnProperty.call(e, "currentRoomFrameId") && t.uint32(8).int32(e.currentRoomFrameId),
                        null != e.frameInfo && e.frameInfo.length)
                            for (var r = 0; r < e.frameInfo.length; ++r)
                                $root.game.gobes.grpc.common.dto.FrameInfo.encode(e.frameInfo[r], t.uint32(18).fork()).ldelim();
                        return null != e.ext && Object.hasOwnProperty.call(e, "ext") && $root.game.gobes.grpc.common.dto.FrameExtInfo.encode(e.ext, t.uint32(26).fork()).ldelim(),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.RelayFrameInfo(); e.pos < r; ) {
                            var n = e.uint32();
                            switch (n >>> 3) {
                            case 1:
                                o.currentRoomFrameId = e.int32();
                                break;
                            case 2:
                                o.frameInfo && o.frameInfo.length || (o.frameInfo = []),
                                o.frameInfo.push($root.game.gobes.grpc.common.dto.FrameInfo.decode(e, e.uint32()));
                                break;
                            case 3:
                                o.ext = $root.game.gobes.grpc.common.dto.FrameExtInfo.decode(e, e.uint32());
                                break;
                            default:
                                e.skipType(7 & n);
                            }
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        if ("object" != typeof e || null === e)
                            return "object expected";
                        if (null != e.currentRoomFrameId && e.hasOwnProperty("currentRoomFrameId") && !$util.isInteger(e.currentRoomFrameId))
                            return "currentRoomFrameId: integer expected";
                        if (null != e.frameInfo && e.hasOwnProperty("frameInfo")) {
                            if (!Array.isArray(e.frameInfo))
                                return "frameInfo: array expected";
                            for (var t = 0; t < e.frameInfo.length; ++t)
                                if (r = $root.game.gobes.grpc.common.dto.FrameInfo.verify(e.frameInfo[t]))
                                    return "frameInfo." + r;
                        }
                        var r;
                        return null != e.ext && e.hasOwnProperty("ext") && (r = $root.game.gobes.grpc.common.dto.FrameExtInfo.verify(e.ext)) ? "ext." + r : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.RelayFrameInfo)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.RelayFrameInfo();
                        if (null != e.currentRoomFrameId && (t.currentRoomFrameId = 0 | e.currentRoomFrameId),
                        e.frameInfo) {
                            if (!Array.isArray(e.frameInfo))
                                throw TypeError(".game.gobes.grpc.common.dto.RelayFrameInfo.frameInfo: array expected");
                            t.frameInfo = [];
                            for (var r = 0; r < e.frameInfo.length; ++r) {
                                if ("object" != typeof e.frameInfo[r])
                                    throw TypeError(".game.gobes.grpc.common.dto.RelayFrameInfo.frameInfo: object expected");
                                t.frameInfo[r] = $root.game.gobes.grpc.common.dto.FrameInfo.fromObject(e.frameInfo[r]);
                            }
                        }
                        if (null != e.ext) {
                            if ("object" != typeof e.ext)
                                throw TypeError(".game.gobes.grpc.common.dto.RelayFrameInfo.ext: object expected");
                            t.ext = $root.game.gobes.grpc.common.dto.FrameExtInfo.fromObject(e.ext);
                        }
                        return t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        if ((t.arrays || t.defaults) && (r.frameInfo = []),
                        t.defaults && (r.currentRoomFrameId = 0,
                        r.ext = null),
                        null != e.currentRoomFrameId && e.hasOwnProperty("currentRoomFrameId") && (r.currentRoomFrameId = e.currentRoomFrameId),
                        e.frameInfo && e.frameInfo.length) {
                            r.frameInfo = [];
                            for (var o = 0; o < e.frameInfo.length; ++o)
                                r.frameInfo[o] = $root.game.gobes.grpc.common.dto.FrameInfo.toObject(e.frameInfo[o], t);
                        }
                        return null != e.ext && e.hasOwnProperty("ext") && (r.ext = $root.game.gobes.grpc.common.dto.FrameExtInfo.toObject(e.ext, t)),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.RoomInfo = function() {
                    function e(e) {
                        if (e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.roomId = "",
                    e.prototype.roomName = "",
                    e.prototype.roomOwner = "",
                    e.prototype.customProp = "",
                    e.prototype.isPrivate = !1,
                    e.prototype.fullData = "",
                    e.prototype.isLock = !1,
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        return t || (t = $Writer.create()),
                        null != e.roomId && Object.hasOwnProperty.call(e, "roomId") && t.uint32(10).string(e.roomId),
                        null != e.roomName && Object.hasOwnProperty.call(e, "roomName") && t.uint32(18).string(e.roomName),
                        null != e.roomOwner && Object.hasOwnProperty.call(e, "roomOwner") && t.uint32(26).string(e.roomOwner),
                        null != e.customProp && Object.hasOwnProperty.call(e, "customProp") && t.uint32(34).string(e.customProp),
                        null != e.isPrivate && Object.hasOwnProperty.call(e, "isPrivate") && t.uint32(40).bool(e.isPrivate),
                        null != e.fullData && Object.hasOwnProperty.call(e, "fullData") && t.uint32(50).string(e.fullData),
                        null != e.isLock && Object.hasOwnProperty.call(e, "isLock") && t.uint32(56).bool(e.isLock),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.RoomInfo(); e.pos < r; ) {
                            var n = e.uint32();
                            switch (n >>> 3) {
                            case 1:
                                o.roomId = e.string();
                                break;
                            case 2:
                                o.roomName = e.string();
                                break;
                            case 3:
                                o.roomOwner = e.string();
                                break;
                            case 4:
                                o.customProp = e.string();
                                break;
                            case 5:
                                o.isPrivate = e.bool();
                                break;
                            case 6:
                                o.fullData = e.string();
                                break;
                            case 7:
                                o.isLock = e.bool();
                                break;
                            default:
                                e.skipType(7 & n);
                            }
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        return "object" != typeof e || null === e ? "object expected" : null != e.roomId && e.hasOwnProperty("roomId") && !$util.isString(e.roomId) ? "roomId: string expected" : null != e.roomName && e.hasOwnProperty("roomName") && !$util.isString(e.roomName) ? "roomName: string expected" : null != e.roomOwner && e.hasOwnProperty("roomOwner") && !$util.isString(e.roomOwner) ? "roomOwner: string expected" : null != e.customProp && e.hasOwnProperty("customProp") && !$util.isString(e.customProp) ? "customProp: string expected" : null != e.isPrivate && e.hasOwnProperty("isPrivate") && "boolean" != typeof e.isPrivate ? "isPrivate: boolean expected" : null != e.fullData && e.hasOwnProperty("fullData") && !$util.isString(e.fullData) ? "fullData: string expected" : null != e.isLock && e.hasOwnProperty("isLock") && "boolean" != typeof e.isLock ? "isLock: boolean expected" : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.RoomInfo)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.RoomInfo();
                        return null != e.roomId && (t.roomId = String(e.roomId)),
                        null != e.roomName && (t.roomName = String(e.roomName)),
                        null != e.roomOwner && (t.roomOwner = String(e.roomOwner)),
                        null != e.customProp && (t.customProp = String(e.customProp)),
                        null != e.isPrivate && (t.isPrivate = Boolean(e.isPrivate)),
                        null != e.fullData && (t.fullData = String(e.fullData)),
                        null != e.isLock && (t.isLock = Boolean(e.isLock)),
                        t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        return t.defaults && (r.roomId = "",
                        r.roomName = "",
                        r.roomOwner = "",
                        r.customProp = "",
                        r.isPrivate = !1,
                        r.fullData = "",
                        r.isLock = !1),
                        null != e.roomId && e.hasOwnProperty("roomId") && (r.roomId = e.roomId),
                        null != e.roomName && e.hasOwnProperty("roomName") && (r.roomName = e.roomName),
                        null != e.roomOwner && e.hasOwnProperty("roomOwner") && (r.roomOwner = e.roomOwner),
                        null != e.customProp && e.hasOwnProperty("customProp") && (r.customProp = e.customProp),
                        null != e.isPrivate && e.hasOwnProperty("isPrivate") && (r.isPrivate = e.isPrivate),
                        null != e.fullData && e.hasOwnProperty("fullData") && (r.fullData = e.fullData),
                        null != e.isLock && e.hasOwnProperty("isLock") && (r.isLock = e.isLock),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e.ServerMessage = function() {
                    function e(e) {
                        if (e)
                            for (var t = Object.keys(e), r = 0; r < t.length; ++r)
                                null != e[t[r]] && (this[t[r]] = e[t[r]]);
                    }
                    return e.prototype.code = 0,
                    e.prototype.seq = "",
                    e.prototype.timestamp = $util.Long ? $util.Long.fromBits(0, 0, !1) : 0,
                    e.prototype.msg = $util.newBuffer([]),
                    e.create = function(t) {
                        return new e(t);
                    }
                    ,
                    e.encode = function(e, t) {
                        return t || (t = $Writer.create()),
                        null != e.code && Object.hasOwnProperty.call(e, "code") && t.uint32(8).int32(e.code),
                        null != e.seq && Object.hasOwnProperty.call(e, "seq") && t.uint32(18).string(e.seq),
                        null != e.timestamp && Object.hasOwnProperty.call(e, "timestamp") && t.uint32(24).int64(e.timestamp),
                        null != e.msg && Object.hasOwnProperty.call(e, "msg") && t.uint32(34).bytes(e.msg),
                        t;
                    }
                    ,
                    e.encodeDelimited = function(e, t) {
                        return this.encode(e, t).ldelim();
                    }
                    ,
                    e.decode = function(e, t) {
                        e instanceof $Reader || (e = $Reader.create(e));
                        for (var r = void 0 === t ? e.len : e.pos + t, o = new $root.game.gobes.grpc.common.dto.ServerMessage(); e.pos < r; ) {
                            var n = e.uint32();
                            switch (n >>> 3) {
                            case 1:
                                o.code = e.int32();
                                break;
                            case 2:
                                o.seq = e.string();
                                break;
                            case 3:
                                o.timestamp = e.int64();
                                break;
                            case 4:
                                o.msg = e.bytes();
                                break;
                            default:
                                e.skipType(7 & n);
                            }
                        }
                        return o;
                    }
                    ,
                    e.decodeDelimited = function(e) {
                        return e instanceof $Reader || (e = new $Reader(e)),
                        this.decode(e, e.uint32());
                    }
                    ,
                    e.verify = function(e) {
                        return "object" != typeof e || null === e ? "object expected" : null != e.code && e.hasOwnProperty("code") && !$util.isInteger(e.code) ? "code: integer expected" : null != e.seq && e.hasOwnProperty("seq") && !$util.isString(e.seq) ? "seq: string expected" : null != e.timestamp && e.hasOwnProperty("timestamp") && !($util.isInteger(e.timestamp) || e.timestamp && $util.isInteger(e.timestamp.low) && $util.isInteger(e.timestamp.high)) ? "timestamp: integer|Long expected" : null != e.msg && e.hasOwnProperty("msg") && !(e.msg && "number" == typeof e.msg.length || $util.isString(e.msg)) ? "msg: buffer expected" : null;
                    }
                    ,
                    e.fromObject = function(e) {
                        if (e instanceof $root.game.gobes.grpc.common.dto.ServerMessage)
                            return e;
                        var t = new $root.game.gobes.grpc.common.dto.ServerMessage();
                        return null != e.code && (t.code = 0 | e.code),
                        null != e.seq && (t.seq = String(e.seq)),
                        null != e.timestamp && ($util.Long ? (t.timestamp = $util.Long.fromValue(e.timestamp)).unsigned = !1 : "string" == typeof e.timestamp ? t.timestamp = parseInt(e.timestamp, 10) : "number" == typeof e.timestamp ? t.timestamp = e.timestamp : "object" == typeof e.timestamp && (t.timestamp = new $util.LongBits(e.timestamp.low >>> 0,e.timestamp.high >>> 0).toNumber())),
                        null != e.msg && ("string" == typeof e.msg ? $util.base64.decode(e.msg, t.msg = $util.newBuffer($util.base64.length(e.msg)), 0) : e.msg.length >= 0 && (t.msg = e.msg)),
                        t;
                    }
                    ,
                    e.toObject = function(e, t) {
                        t || (t = {});
                        var r = {};
                        if (t.defaults) {
                            if (r.code = 0,
                            r.seq = "",
                            $util.Long) {
                                var o = new $util.Long(0,0,!1);
                                r.timestamp = t.longs === String ? o.toString() : t.longs === Number ? o.toNumber() : o;
                            } else
                                r.timestamp = t.longs === String ? "0" : 0;
                            t.bytes === String ? r.msg = "" : (r.msg = [],
                            t.bytes !== Array && (r.msg = $util.newBuffer(r.msg)));
                        }
                        return null != e.code && e.hasOwnProperty("code") && (r.code = e.code),
                        null != e.seq && e.hasOwnProperty("seq") && (r.seq = e.seq),
                        null != e.timestamp && e.hasOwnProperty("timestamp") && ("number" == typeof e.timestamp ? r.timestamp = t.longs === String ? String(e.timestamp) : e.timestamp : r.timestamp = t.longs === String ? $util.Long.prototype.toString.call(e.timestamp) : t.longs === Number ? new $util.LongBits(e.timestamp.low >>> 0,e.timestamp.high >>> 0).toNumber() : e.timestamp),
                        null != e.msg && e.hasOwnProperty("msg") && (r.msg = t.bytes === String ? $util.base64.encode(e.msg, 0, e.msg.length) : t.bytes === Array ? Array.prototype.slice.call(e.msg) : e.msg),
                        r;
                    }
                    ,
                    e.prototype.toJSON = function() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    }
                    ,
                    e;
                }(),
                e;
            }(),
            common.constant = ((constant = {}).InstantMessageType = (valuesById = {},
            (values = Object.create(valuesById))[valuesById[0] = "ROOM"] = 0,
            values[valuesById[1] = "ROOM_EXCEPT_SENDER"] = 1,
            values[valuesById[2] = "PLAYERS"] = 2,
            values),
            constant),
            common.contant = ((contant = {}).PlayerStatus = function() {
                var e = {}
                  , t = Object.create(e);
                return t[e[0] = "DISCONNECT"] = 0,
                t[e[1] = "CONNECT"] = 1,
                t;
            }(),
            contant),
            common),
            grpc),
            gobes),
            game);
            var compiled = $root;
            const {dto: dto} = compiled.game.gobes.grpc.common
              , {ClientMessage: ClientMessage$3} = dto;
            class Connection {
                constructor(e=WebSocketTransport) {
                    this.events = {},
                    this.heartbeatTimer = null,
                    this.heartBeatCount = 0,
                    this.EXPIRE_HEARTBEAT_COUNT = 3,
                    this.transport = new e(this.events);
                }
                connect(e) {
                    this.transport.connect(e);
                }
                send(e) {
                    this.transport.send(e);
                }
                close(e, t) {
                    this.removeAllListeners(),
                    this.transport.close(e, t);
                }
                isOpen() {
                    return this.transport.isOpen();
                }
                isConnecting() {
                    return this.transport.isConnecting();
                }
                isClosing() {
                    return this.transport.isClosing();
                }
                isClosed() {
                    return this.transport.isClosed();
                }
                removeAllListeners() {
                    this.transport.removeAllListeners();
                }
                startHeartbeat() {
                    null === this.heartbeatTimer && (this.heartbeatTimer = setInterval( () => {
                        if (!this.transport.isOpen())
                            return this.stopHeartbeat();
                        if (this.heartBeatCount > this.EXPIRE_HEARTBEAT_COUNT)
                            return Logger.error({
                                eventType: "not received heartbeat ack in " + this.EXPIRE_HEARTBEAT_COUNT + " heartBeats"
                            }),
                            this.transport.onError("unexpected closed"),
                            void this.stopHeartbeat();
                        this.heartBeatCount++;
                        const e = ClientMessage$3.create({
                            code: 2,
                            seq: "Heartbeat",
                            timestamp: Date.now()
                        });
                        this.send(ClientMessage$3.encode(e).finish());
                    }
                    , Connection.heartbeatCycle));
                }
                stopHeartbeat() {
                    clearInterval(this.heartbeatTimer),
                    this.heartBeatCount = 0,
                    this.heartbeatTimer = null;
                }
            }
            Connection.heartbeatCycle = 1e3;
            class EventHandler {
                constructor() {
                    this._eventMap = new Map();
                }
                set(e, t) {
                    return this._eventMap.set(e, t),
                    this;
                }
                get(e) {
                    return this._eventMap.get(e);
                }
                delete(e) {
                    this._eventMap.delete(e);
                }
                clear() {
                    this._eventMap.clear();
                }
            }
            class ConnectionStore {
                constructor() {
                    this._connection = new Connection(),
                    this._evHandles = new EventHandler(),
                    this._isReconnectStatus = !1,
                    this._reconnectIntervalSeconds = 1e3;
                }
                get connection() {
                    return this._connection;
                }
                get evHandles() {
                    return this._evHandles;
                }
                get isReconnectStatus() {
                    return this._isReconnectStatus;
                }
                setReconnectStatus(e) {
                    this._isReconnectStatus = e;
                }
                get reconnectIntervalSeconds() {
                    return this._reconnectIntervalSeconds;
                }
            }
            var connectionStore = new ConnectionStore(), ErrorCode;
            exports.ErrorCode = void 0,
            ErrorCode = exports.ErrorCode || (exports.ErrorCode = {}),
            ErrorCode[ErrorCode.COMMON_OK = 0] = "COMMON_OK",
            ErrorCode[ErrorCode.COMMON_ERR = -1] = "COMMON_ERR",
            ErrorCode[ErrorCode.CLIENT_COMMON_ERR = -2] = "CLIENT_COMMON_ERR",
            ErrorCode[ErrorCode.NETWORK_ERR = -3] = "NETWORK_ERR",
            ErrorCode[ErrorCode.AUTHENTICATION_FAILED = 2] = "AUTHENTICATION_FAILED",
            ErrorCode[ErrorCode.COMMON_REQUEST_PARAM_ERR = 1001] = "COMMON_REQUEST_PARAM_ERR",
            ErrorCode[ErrorCode.REPEAT_REQUEST = 1002] = "REPEAT_REQUEST",
            ErrorCode[ErrorCode.SDK_AUTO_REQUEST_FRAME_FAILED = 10002] = "SDK_AUTO_REQUEST_FRAME_FAILED",
            ErrorCode[ErrorCode.SDK_FRAME_ID_RANGE_ERR = 10003] = "SDK_FRAME_ID_RANGE_ERR",
            ErrorCode[ErrorCode.SDK_NOT_IN_ROOM = 90002] = "SDK_NOT_IN_ROOM",
            ErrorCode[ErrorCode.SDK_MATCHING = 90008] = "SDK_MATCHING",
            ErrorCode[ErrorCode.SDK_REQUESTING = 90010] = "SDK_REQUESTING",
            ErrorCode[ErrorCode.SDK_GROUP_MEMBERS_ERR = 90011] = "SDK_GROUP_MEMBERS_ERR",
            ErrorCode[ErrorCode.GET_ACCESS_TOKEN_ERR = 95001] = "GET_ACCESS_TOKEN_ERR",
            ErrorCode[ErrorCode.TOKEN_INVALID = 100105] = "TOKEN_INVALID",
            ErrorCode[ErrorCode.ROOM_PLAYER_NOT_IN_ROOM = 101101] = "ROOM_PLAYER_NOT_IN_ROOM",
            ErrorCode[ErrorCode.ROOM_INFO_NOT_EXIST = 101103] = "ROOM_INFO_NOT_EXIST",
            ErrorCode[ErrorCode.PLAYER_NOT_IN_CURRENT_ROOM = 101105] = "PLAYER_NOT_IN_CURRENT_ROOM",
            ErrorCode[ErrorCode.PLAYER_ALREADY_IN_ANOTHER_ROOM = 101106] = "PLAYER_ALREADY_IN_ANOTHER_ROOM",
            ErrorCode[ErrorCode.PLAYERS_EXCEED_ROOM_MAX = 101107] = "PLAYERS_EXCEED_ROOM_MAX",
            ErrorCode[ErrorCode.ROOM_OWNER_AND_PLAYER_MISMATCH = 101109] = "ROOM_OWNER_AND_PLAYER_MISMATCH",
            ErrorCode[ErrorCode.MAX_PLAYERS_TOO_LARGE_OR_NEGATIVE = 101113] = "MAX_PLAYERS_TOO_LARGE_OR_NEGATIVE",
            ErrorCode[ErrorCode.ROOM_STARTED_FRAME_SYNC = 101114] = "ROOM_STARTED_FRAME_SYNC",
            ErrorCode[ErrorCode.ROOM_STOPPED_FRAME_SYNC = 101115] = "ROOM_STOPPED_FRAME_SYNC",
            ErrorCode[ErrorCode.INVALID_ROOM = 101117] = "INVALID_ROOM",
            ErrorCode[ErrorCode.INVALID_ROOM_STATUS = 101120] = "INVALID_ROOM_STATUS",
            ErrorCode[ErrorCode.REMOVE_SELF = 101121] = "REMOVE_SELF",
            ErrorCode[ErrorCode.TOO_MANY_MATCHING_PARAMETERS = 101123] = "TOO_MANY_MATCHING_PARAMETERS",
            ErrorCode[ErrorCode.TARGET_OWNER_NOT_IN_ROOM = 101132] = "TARGET_OWNER_NOT_IN_ROOM",
            ErrorCode[ErrorCode.ONLINE_USERS_EXCEED_MAX = 101135] = "ONLINE_USERS_EXCEED_MAX",
            ErrorCode[ErrorCode.ROOM_IS_LOCK = 101142] = "ROOM_IS_LOCK",
            ErrorCode[ErrorCode.PLAYER_NOT_IN_CURRENT_GROUP = 101201] = "PLAYER_NOT_IN_CURRENT_GROUP",
            ErrorCode[ErrorCode.GROUP_NOT_EXIST = 101202] = "GROUP_NOT_EXIST",
            ErrorCode[ErrorCode.ROOM_NOT_START_FRAME_SYNC = 102003] = "ROOM_NOT_START_FRAME_SYNC",
            ErrorCode[ErrorCode.OWNER_NOT_MATCH_GROUP = 101204] = "OWNER_NOT_MATCH_GROUP",
            ErrorCode[ErrorCode.GROUP_IS_LOCK = 101205] = "GROUP_IS_LOCK",
            ErrorCode[ErrorCode.GROUP_IS_FULL = 101206] = "GROUP_IS_FULL",
            ErrorCode[ErrorCode.NEW_LEADER_NOT_IN_GROUP = 101208] = "NEW_LEADER_NOT_IN_GROUP",
            ErrorCode[ErrorCode.PLAYER_NOT_IN_ROOM = 102005] = "PLAYER_NOT_IN_ROOM",
            ErrorCode[ErrorCode.ROOM_NOT_EXIST = 102008] = "ROOM_NOT_EXIST",
            ErrorCode[ErrorCode.REQUEST_FRAME_NUMBER_OVERRUN = 102014] = "REQUEST_FRAME_NUMBER_OVERRUN",
            ErrorCode[ErrorCode.INVALID_MESSAGE = 102016] = "INVALID_MESSAGE",
            ErrorCode[ErrorCode.NO_VALID_TARGET_PLAYER = 102017] = "NO_VALID_TARGET_PLAYER",
            ErrorCode[ErrorCode.INVALID_MESSAGE_LENGTH = 102018] = "INVALID_MESSAGE_LENGTH",
            ErrorCode[ErrorCode.LOGIN_BUSY = 103001] = "LOGIN_BUSY",
            ErrorCode[ErrorCode.CLIENT_TRAFFIC_CONTROL = 103003] = "CLIENT_TRAFFIC_CONTROL",
            ErrorCode[ErrorCode.CONNECTIONS_EXCEED_MAX = 103006] = "CONNECTIONS_EXCEED_MAX",
            ErrorCode[ErrorCode.ROOM_MATCH_FAILED = 104101] = "ROOM_MATCH_FAILED",
            ErrorCode[ErrorCode.ROOM_MATCHING = 104102] = "ROOM_MATCHING",
            ErrorCode[ErrorCode.ROOM_MATCH_TIMEOUT = 104103] = "ROOM_MATCH_TIMEOUT",
            ErrorCode[ErrorCode.PLAYER_MATCH_FAILED = 104201] = "PLAYER_MATCH_FAILED",
            ErrorCode[ErrorCode.PLAYER_MATCHING = 104202] = "PLAYER_MATCHING",
            ErrorCode[ErrorCode.PLAYER_MATCH_TIMEOUT = 104203] = "PLAYER_MATCH_TIMEOUT",
            ErrorCode[ErrorCode.PLAYER_MATCH_CANCEL_NO_PERMISSION = 104204] = "PLAYER_MATCH_CANCEL_NO_PERMISSION",
            ErrorCode[ErrorCode.PLAYER_MATCH_CANCELED = 104205] = "PLAYER_MATCH_CANCELED",
            ErrorCode[ErrorCode.PLAYER_MATCH_CANCEL_WHEN_SUCCESS = 104206] = "PLAYER_MATCH_CANCEL_WHEN_SUCCESS",
            ErrorCode[ErrorCode.PLAYER_MATCH_ROOM_NULL = 104208] = "PLAYER_MATCH_ROOM_NULL",
            ErrorCode[ErrorCode.PLAYER_MATCH_INVALID_TEAM = 104209] = "PLAYER_MATCH_INVALID_TEAM",
            ErrorCode[ErrorCode.PLAYER_NOT_IN_MATCH = 104211] = "PLAYER_NOT_IN_MATCH",
            ErrorCode[ErrorCode.INVOKE_WISE_FUNCTION_FAILED = 105004] = "INVOKE_WISE_FUNCTION_FAILED",
            ErrorCode[ErrorCode.JOIN_OR_CREATE_ROOM_FAILED = 91001] = "JOIN_OR_CREATE_ROOM_FAILED";
            class GOBEError extends Error {
                constructor(e, t="") {
                    super(`${e} ${t}`),
                    this.code = e,
                    this.name = "GOBE Error",
                    Object.setPrototypeOf(this, new.target.prototype);
                }
            }
            class GOBEErrorBuilder {
                static buildGOBEError(e, t="") {
                    Logger.error({
                        eventType: "error_occur",
                        playerId: store.playerId,
                        message: t,
                        errorCode: e
                    }),
                    e in exports.ErrorCode || (e = exports.ErrorCode.COMMON_ERR);
                    const r = new Map();
                    return r.set("code", e.toString()),
                    r.set("msg", t),
                    r.set("networkType", " "),
                    haStore.delayReport(0, "10101001", r),
                    new GOBEError(e,t);
                }
            }
            function getRandoomUuid() {
                let e = new Date().getTime()
                  , t = "undefined" != typeof performance && performance.now && 1e3 * performance.now() || 0;
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, r => {
                    let o = 16 * Math.random();
                    return e > 0 ? (o = (e + o) % 16 | 0,
                    e = Math.floor(e / 16)) : (o = (t + o) % 16 | 0,
                    t = Math.floor(t / 16)),
                    ("x" === r ? o : 3 & o | 8).toString(16);
                }
                );
            }
            const generateRequestUuid = () => {
                let e = null;
                if ("undefined" != typeof globalThis)
                    e = globalThis;
                else if ("undefined" != typeof global)
                    e = global;
                else {
                    if ("undefined" == typeof self)
                        return getRandoomUuid();
                    e = self;
                }
                if ("object" == typeof e.crypto) {
                    if ("function" == typeof e.crypto.randomUUID)
                        return e.crypto.randomUUID();
                    if ("function" == typeof e.crypto.getRandomValues && "function" == typeof Uint8Array)
                        return ("" + [1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, t => {
                            const r = Number(t);
                            return (r ^ e.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> r / 4).toString(16);
                        }
                        );
                }
                return getRandoomUuid();
            }
            ;
            class Request {
                static post(e, t, r, o=!0) {
                    const n = /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e) ? e : "https://gobe-drcn.game.dbankcloud.cn" + e;
                    return new Promise( (s, i) => {
                        const a = new XMLHttpRequest();
                        a.open("POST", n, !0),
                        a.setRequestHeader("Content-Type", "application/json;charset=UTF-8"),
                        a.timeout = Request.timeout;
                        e.includes("gamex-edge-service") && (a.setRequestHeader("serviceName", "gameOBEService"),
                        a.setRequestHeader("sdkType", "js"),
                        a.setRequestHeader("sdkVersionCode", "130602300"),
                        store.serviceToken && a.setRequestHeader("serviceToken", store.serviceToken),
                        a.setRequestHeader("appId", store.appId),
                        a.setRequestHeader("platform", exports.PlatformType[Platform.platform]),
                        a.setRequestHeader("requestId", generateRequestUuid())),
                        r && Object.entries(r).forEach( ([e,t]) => a.setRequestHeader(e, t)),
                        a.send(JSON.stringify(t)),
                        a.onerror = function(t) {
                            var r;
                            const o = new Map();
                            o.set("url", e),
                            o.set("roomId", null !== (r = store.roomId) && void 0 !== r ? r : ""),
                            o.set("code", exports.ErrorCode.NETWORK_ERR.toString()),
                            o.set("msg", "http onerror"),
                            haStore.delayReport(1, "20130001", o),
                            i(GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.NETWORK_ERR, "http onerror"));
                        }
                        ,
                        a.ontimeout = function(t) {
                            var r;
                            const o = new Map();
                            o.set("url", e),
                            o.set("roomId", null !== (r = store.roomId) && void 0 !== r ? r : ""),
                            o.set("code", exports.ErrorCode.NETWORK_ERR.toString()),
                            o.set("msg", "http request timeout"),
                            haStore.delayReport(1, "20130001", o),
                            i(GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.NETWORK_ERR, "http request timeout"));
                        }
                        ,
                        a.onreadystatechange = function() {
                            var t;
                            if (4 == a.readyState)
                                if (200 == a.status) {
                                    const e = JSON.parse(a.responseText);
                                    o && e.rtnCode != exports.ErrorCode.COMMON_OK && i(GOBEErrorBuilder.buildGOBEError(e.rtnCode, e.msg)),
                                    s(e);
                                } else {
                                    const r = new Map();
                                    r.set("url", e),
                                    r.set("roomId", null !== (t = store.roomId) && void 0 !== t ? t : ""),
                                    r.set("code", exports.ErrorCode.NETWORK_ERR.toString()),
                                    r.set("msg", `http request failed, status is ${a.status}`),
                                    haStore.delayReport(1, "20130001", r),
                                    i(GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.NETWORK_ERR, `http request failed, status is ${a.status}`));
                                }
                        }
                        ;
                    }
                    );
                }
            }
            Request.timeout = 5e3;
            class Common {
                static createChannel() {
                    return Request.post(Common.obeUrl, {
                        method: "client.gobe.channel.create"
                    }, {}, !1);
                }
                static requestGameConfig() {
                    return Request.post(Common.obeUrl, {
                        method: "client.gobe.config.param"
                    }, {}, !1);
                }
                static buildEndpoint(e, t, r) {
                    return `wss://${e}/hw-game-obe/endpoint/rtm?sdkVersion=130602300&ticket=${t}&playerId=${r}`;
                }
                static sleep(e) {
                    return new Promise(t => setTimeout(t, e));
                }
            }
            Common.obeUrl = "/gamex-edge-service/v1/gameXClientApi";
            const {ServerMessage: ServerMessage$4} = dto;
            class Base {
                haInit() {
                    haStore.init();
                }
                get state() {
                    return store.state;
                }
                get appId() {
                    return store.appId;
                }
                get appVersion() {
                    return store.appVersion;
                }
                get openId() {
                    return store.openId;
                }
                get serviceToken() {
                    return store.serviceToken;
                }
                get playerId() {
                    return store.playerId;
                }
                get lastRoomId() {
                    return store.lastRoomId;
                }
                get roomId() {
                    return store.roomId;
                }
                get groupId() {
                    return store.groupId;
                }
                get lastGroupId() {
                    return store.lastGroupId;
                }
                constructor() {
                    store.addStateListener( (...e) => this.onStateChange(...e)),
                    store.addEventListener( (...e) => this.onEventNotify(...e));
                }
                setState(e) {
                    store.setStateAction(e);
                }
                setEvent(e) {
                    store.setEventAction(e);
                }
                setAppId(e) {
                    store.setAppIdAction(e);
                }
                setAppVersion(e) {
                    store.setAppVersionAction(e);
                }
                setOpenId(e) {
                    store.setOpenIdAction(e);
                }
                setServiceToken(e) {
                    store.setServiceTokenAction(e);
                }
                setPlayerId(e) {
                    store.setPlayerIdAction(e);
                }
                setLastRoomId(e) {
                    store.setLastRoomIdAction(e);
                }
                setRoomId(e) {
                    store.setRoomIdAction(e);
                }
                setGroupId(e) {
                    store.setGroupIdAction(e);
                }
                setLastGroupId(e) {
                    store.setLastGroupIdAction(e);
                }
                onStateChange(e, t) {}
                onEventNotify(e) {}
                get connection() {
                    return connectionStore.connection;
                }
                addListener(e, t) {
                    connectionStore.evHandles.set(e, t);
                }
                removeListener(e) {
                    connectionStore.evHandles.delete(e);
                }
                get isReconnectStatus() {
                    return connectionStore.isReconnectStatus;
                }
                setReconnectStatus(e) {
                    connectionStore.setReconnectStatus(e);
                }
                get reconnectIntervalSeconds() {
                    return connectionStore.reconnectIntervalSeconds;
                }
                onMessage(e) {
                    var t;
                    const r = ServerMessage$4.decode(new Uint8Array(e.data))
                      , {code: o} = r.toJSON();
                    null === (t = connectionStore.evHandles.get(o)) || void 0 === t || t.onWsMessage(e);
                }
                wsConnect(e, t) {
                    this.connection.events.onopen = e => {
                        Logger.info({
                            eventType: "WebSocket Open",
                            event: e
                        });
                    }
                    ,
                    this.connection.events.onmessage = this.onMessage.bind(this),
                    this.connection.events.onclose = this.onSocketClose.bind(this),
                    this.connection.events.onerror = this.onSocketError.bind(this),
                    this.connection.connect(Common.buildEndpoint(e, t, this.playerId));
                }
                onSocketClose(e) {
                    this.onWsClose(e),
                    this.connectionBreakHandle();
                }
                onSocketError(e) {
                    this.onWsClose("socket error eventPhase=" + e.eventPhase),
                    this.connectionBreakHandle();
                }
                connectionBreakHandle() {
                    this.connection.stopHeartbeat(),
                    this.connection.removeAllListeners();
                }
                connect(e, t=!1) {
                    var r;
                    return __awaiter(this, void 0, void 0, function*() {
                        if (1 != e) {
                            const e = new Map();
                            throw e.set("code", exports.ErrorCode.COMMON_ERR.toString()),
                            e.set("msg", "sdk not support the protocol type"),
                            haStore.delayReport(1, "20102003", e),
                            GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.COMMON_ERR, "sdk not support the protocol type");
                        }
                        {
                            const e = yield Common.createChannel();
                            if (e.rtnCode != exports.ErrorCode.COMMON_OK) {
                                const t = new Map();
                                throw t.set("code", e.rtnCode.toString()),
                                t.set("msg", null !== (r = e.msg) && void 0 !== r ? r : ""),
                                haStore.delayReport(1, "20102003", t),
                                GOBEErrorBuilder.buildGOBEError(e.rtnCode, e.msg);
                            }
                            const {routerAddr: o, ticket: n} = e;
                            t && this.connection.removeAllListeners(),
                            this.wsConnect(o, n);
                        }
                    });
                }
                onWsMessage(e) {}
                onWsClose(e) {}
            }
            const {ClientMessage: ClientMessage$2, ServerMessage: ServerMessage$3, AckMessage: AckMessage$2, PlayerInfo: PlayerInfo, PlayerProp: PlayerProp} = dto;
            class Player extends Base {
                constructor(e, t) {
                    super(),
                    this.onCustomStatusChangeSuccess = createSignal(),
                    this.onCustomStatusChangeFailed = createSignal(),
                    this.onCustomPropertiesChangeSuccess = createSignal(),
                    this.onCustomPropertiesChangeFailed = createSignal(),
                    this.customStatus = e,
                    this.customProperties = t,
                    this.addListener(29, this),
                    this.addListener(31, this);
                }
                updateCustomStatus(e) {
                    const t = PlayerInfo.create({
                        playerId: this.playerId,
                        customState: e,
                        extraInfo: ""
                    })
                      , r = ClientMessage$2.create({
                        timestamp: Date.now(),
                        seq: this.updateCustomStatus.name,
                        code: 28,
                        msg: PlayerInfo.encode(t).finish()
                    });
                    this.connection.send(ClientMessage$2.encode(r).finish());
                }
                updateCustomProperties(e) {
                    const t = PlayerProp.create({
                        playerId: this.playerId,
                        customProp: e
                    })
                      , r = ClientMessage$2.create({
                        timestamp: Date.now(),
                        seq: this.updateCustomProperties.name,
                        code: 30,
                        msg: PlayerProp.encode(t).finish()
                    });
                    this.connection.send(ClientMessage$2.encode(r).finish());
                }
                onWsMessage(e) {
                    const t = ServerMessage$3.decode(new Uint8Array(e.data))
                      , {code: r} = t.toJSON()
                      , {msg: o} = t;
                    switch (r) {
                    case 29:
                        {
                            Logger.info({
                                eventType: "wsMsg updatePlayerStatusAck"
                            });
                            const e = AckMessage$2.decode(o).toJSON();
                            e.rtnCode && e.rtnCode != exports.ErrorCode.COMMON_OK ? this.onCustomStatusChangeFailed.emit(GOBEErrorBuilder.buildGOBEError(e.rtnCode, e.msg)) : this.onCustomStatusChangeSuccess.emit();
                            break;
                        }
                    case 31:
                        {
                            Logger.info({
                                eventType: "wsMsg updatePlayerPropertiesAck"
                            });
                            const e = AckMessage$2.decode(o).toJSON();
                            e.rtnCode && e.rtnCode != exports.ErrorCode.COMMON_OK ? this.onCustomPropertiesChangeFailed.emit(GOBEErrorBuilder.buildGOBEError(e.rtnCode, e.msg)) : this.onCustomPropertiesChangeSuccess.emit();
                            break;
                        }
                    }
                }
                onWsClose(e) {
                    this.removeAllListener();
                }
                removeAllListener() {
                    this.removeListener(29),
                    this.removeListener(31);
                }
            }
            class DelayCollector {
                constructor(e, t, r) {
                    this.minValue = 0,
                    this.maxValue = 0,
                    this.name = "",
                    this.count = 0,
                    this.minValue = e,
                    this.maxValue = t,
                    this.name = r;
                }
                test(e) {
                    return e > this.minValue && e <= this.maxValue;
                }
                apply() {
                    this.count++;
                }
                reportData(e, t) {
                    if (0 == this.count)
                        return;
                    const r = new Map();
                    r.set("name", this.name),
                    r.set("count", this.count.toString()),
                    r.set("startTime", e),
                    r.set("endTime", t),
                    haStore.delayReport(0, "10103001", r),
                    this.count = 0;
                }
            }
            const ONE_SECOND = 1e3;
            class DelayCollectAnalyzer {
                constructor(e) {
                    this.sendFrameSet = new Set(),
                    this.concurrentQueue = [],
                    this.delayCalculateTaskSwitch = !1,
                    this.delayCalculateTask = null,
                    this.delayCollectorMap = new Map(),
                    this.playerId = e,
                    this.delayCollectorMap.set(0, new DelayCollector(0,110,"0-110ms")),
                    this.delayCollectorMap.set(1, new DelayCollector(110,150,"110-150ms")),
                    this.delayCollectorMap.set(2, new DelayCollector(150,200,"150-200ms")),
                    this.delayCollectorMap.set(3, new DelayCollector(200,300,"200-300ms")),
                    this.delayCollectorMap.set(4, new DelayCollector(300,1e3,"300-1000ms")),
                    this.delayCollectorMap.set(5, new DelayCollector(1e3,1e4,"big1000ms"));
                }
                recordUpstreamFrame(e) {
                    this.sendFrameSet.add(e);
                }
                recordDownstreamFrame(e) {
                    if (!e || 0 == e.length)
                        return;
                    const t = Date.now()
                      , r = e.filter(e => e.playerId == this.playerId);
                    r.sort( (e, t) => e.timestamp - t.timestamp);
                    for (let e = 0; e < r.length; e++) {
                        const o = {
                            sendTimeStamp: r[e].timestamp,
                            receiveTimeStamp: t
                        };
                        this.sendFrameSet.delete(r[e].timestamp),
                        this.concurrentQueue.push(o);
                    }
                }
                startCalculateDelayTask() {
                    this.delayCalculateTaskSwitch || (this.delayCalculateTaskSwitch = !0,
                    this.delayCalculateTask = setInterval(this.executeTask.bind(this), ONE_SECOND));
                }
                stopCalculateDelayTask() {
                    this.delayCalculateTaskSwitch && (this.delayCalculateTaskSwitch = !1,
                    this.sendFrameSet.clear(),
                    this.concurrentQueue = [],
                    clearInterval(this.delayCalculateTask));
                }
                executeTask() {
                    try {
                        if (!this.delayCalculateTaskSwitch)
                            return;
                        const e = this.concurrentQueue.length;
                        if (0 == e)
                            return;
                        const t = this.concurrentQueue[0].sendTimeStamp
                          , r = this.concurrentQueue[e - 1].receiveTimeStamp;
                        for (let t = 0; t < e; t++) {
                            const e = this.concurrentQueue.shift();
                            if (!e)
                                continue;
                            const t = e.receiveTimeStamp - e.sendTimeStamp;
                            for (const e of this.delayCollectorMap.values())
                                e.test(t) && e.apply();
                        }
                        for (const e of this.sendFrameSet)
                            this.delayCollectorMap.get(5).test(r - e) && (this.delayCollectorMap.get(5).apply(),
                            this.sendFrameSet.delete(e));
                        for (const e of this.delayCollectorMap.values())
                            e.reportData(t.toString(), r.toString());
                    } catch (e) {
                        Logger.error({
                            eventType: "error_occur",
                            playerId: this.playerId,
                            message: "calculate delay task error"
                        });
                    }
                }
            }
            const {ServerMessage: ServerMessage$2, ClientMessage: ClientMessage$1, AckMessage: AckMessage$1, ClientFrame: ClientFrame, QueryFrame: QueryFrame, RelayFrameInfo: RelayFrameInfo, QueryFrameResult: QueryFrameResult, InstantMessage: InstantMessage, RealtimeMessage: RealtimeMessage, CommonMessage: CommonMessage$1} = dto
              , PlayerInfoFrame = dto.PlayerInfo
              , PlayerPropFrame = dto.PlayerProp
              , RoomInfoFrame = dto.RoomInfo;
            class Room extends Base {
                get id() {
                    return this.config.roomId;
                }
                get roomType() {
                    return this.config.roomType;
                }
                get roomName() {
                    return this.config.roomName;
                }
                get roomCode() {
                    return this.config.roomCode;
                }
                get customRoomProperties() {
                    return this.config.customRoomProperties;
                }
                get ownerId() {
                    return this.config.ownerId;
                }
                get maxPlayers() {
                    return this.config.maxPlayers;
                }
                get players() {
                    return this.config.players;
                }
                get router() {
                    return this.config.router;
                }
                get isPrivate() {
                    return this.config.isPrivate;
                }
                get isLock() {
                    return this.config.isLock;
                }
                get createTime() {
                    return this.config.createTime;
                }
                get isSyncing() {
                    return 1 == this.config.roomStatus;
                }
                get player() {
                    return this._player;
                }
                constructor(e, t) {
                    super(),
                    this.onConnect = createSignal(),
                    this.onJoin = createSignal(),
                    this.onJoinFailed = createSignal(),
                    this.onLeave = createSignal(),
                    this.onDismiss = createSignal(),
                    this.onDisconnect = createSignal(),
                    this.onStartFrameSync = createSignal(),
                    this.onStopFrameSync = createSignal(),
                    this.onRecvFrame = createSignal(),
                    this.onRequestFrameError = createSignal(),
                    this.onUpdateCustomStatus = createSignal(),
                    this.onUpdateCustomProperties = createSignal(),
                    this.onRoomPropertiesChange = createSignal(),
                    this.onRecvFromClient = createSignal(),
                    this.onRecvFromServer = createSignal(),
                    this.onSendToClientFailed = createSignal(),
                    this.onSendToServerFailed = createSignal(),
                    this.onRoomPropertiesChangeFailed = createSignal(),
                    this.frameId = 0,
                    this.frameRequestMaxSize = 1e3,
                    this.frameRequesting = !1,
                    this.frameRequestSize = 0,
                    this.frameRequestTimes = 0,
                    this.frameRequestList = [],
                    this.autoFrameRequesting = !1,
                    this.autoRequestFrameFailed = !1,
                    this.isConnected = !1,
                    this.autoFrameRequestCacheList = [],
                    this.initiativeLeaveRoomFlag = !1,
                    this.currentServerFrameId = 1,
                    this.config = t,
                    this._client = e,
                    this._player = new Player(),
                    this.setState(1 === t.roomStatus ? 3 : 2),
                    this.addAllListener(),
                    this.delayCollectAnalyzer = new DelayCollectAnalyzer(this.playerId);
                }
                sendFrame(e) {
                    Logger.debug({
                        eventType: "sendFrame_start",
                        playerId: this.playerId,
                        curServerFrameId: this.currentServerFrameId
                    });
                    const t = Date.now()
                      , r = ClientFrame.create({
                        currentFrameId: this.currentServerFrameId,
                        timestamp: t,
                        data: "string" == typeof e ? [e] : e
                    });
                    this.delayCollectAnalyzer.recordUpstreamFrame(t);
                    const o = ClientMessage$1.create({
                        timestamp: Date.now(),
                        seq: this.sendFrame.name,
                        code: 4,
                        msg: ClientFrame.encode(r).finish()
                    });
                    this.connection.send(ClientMessage$1.encode(o).finish()),
                    Logger.debug({
                        eventType: "sendFrame_end",
                        playerId: this.playerId
                    });
                }
                requestFrame(e, t) {
                    if (this.frameRequesting) {
                        const e = new Map();
                        throw e.set("roomId", this.roomId),
                        e.set("code", exports.ErrorCode.SDK_REQUESTING.toString()),
                        e.set("msg", "sdk in requesting!"),
                        haStore.delayReport(1, "20106003", e),
                        GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.SDK_REQUESTING, "sdk in requesting!");
                    }
                    Logger.info({
                        eventType: "requestFrame_start",
                        playerId: this.playerId,
                        beginFrameId: e,
                        size: t
                    }),
                    this.frameRequesting = !0,
                    this.frameRequestSize = t;
                    const r = Math.ceil(t / this.frameRequestMaxSize);
                    let o = 0;
                    for (; o < r; ) {
                        const r = e + this.frameRequestMaxSize * o
                          , n = Math.min(this.frameRequestMaxSize, t - o * this.frameRequestMaxSize)
                          , s = QueryFrame.create({
                            mode: 1,
                            currentFrameId: r,
                            size: n
                        })
                          , i = ClientMessage$1.create({
                            timestamp: Date.now(),
                            seq: this.requestFrame.name,
                            code: 6,
                            msg: QueryFrame.encode(s).finish()
                        });
                        this.connection.send(ClientMessage$1.encode(i).finish()),
                        ++o,
                        Logger.debug({
                            eventType: "requestFrame_times_" + o,
                            playerId: this.playerId,
                            beginFrameId: r,
                            size: n
                        });
                    }
                }
                resetRoomFrameId(e) {
                    if (e < 0) {
                        const e = new Map();
                        throw e.set("roomId", this.roomId),
                        e.set("code", exports.ErrorCode.SDK_FRAME_ID_RANGE_ERR.toString()),
                        e.set("msg", "frameId invalid: need >= 0"),
                        haStore.delayReport(1, "20106003", e),
                        GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.SDK_FRAME_ID_RANGE_ERR, "frameId invalid: need >= 0");
                    }
                    this.frameId = Math.floor(e),
                    this.clearRequestFrame();
                }
                removeAllListeners() {
                    [this.onJoin, this.onJoinFailed, this.onConnect, this.onLeave, this.onDismiss, this.onDisconnect, this.onStartFrameSync, this.onStopFrameSync, this.onRecvFrame, this.onUpdateCustomStatus, this.onUpdateCustomProperties, this.onRoomPropertiesChange, this.onRoomPropertiesChangeFailed, this.onRecvFromClient, this.onRecvFromServer, this.onSendToClientFailed, this.onSendToServerFailed, this.onRequestFrameError, this.player.onCustomStatusChangeSuccess, this.player.onCustomStatusChangeFailed, this.player.onCustomPropertiesChangeSuccess, this.player.onCustomPropertiesChangeFailed].forEach(e => e.clear());
                }
                reconnect(e) {
                    var t;
                    return __awaiter(this, void 0, void 0, function*() {
                        if (Logger.info({
                            eventType: "reconnect_start",
                            playerId: this.playerId
                        }),
                        !this.lastRoomId) {
                            const e = new Map();
                            throw e.set("roomId", ""),
                            e.set("code", exports.ErrorCode.SDK_NOT_IN_ROOM.toString()),
                            e.set("msg", "sdk not in room!"),
                            haStore.delayReport(1, "20120001", e),
                            GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.SDK_NOT_IN_ROOM, "sdk not in room!");
                        }
                        if (!this.connection.isOpen()) {
                            const e = new Map();
                            throw e.set("roomId", this.lastRoomId),
                            e.set("code", exports.ErrorCode.JOIN_OR_CREATE_ROOM_FAILED.toString()),
                            e.set("msg", "webSocket is connecting , please retry"),
                            haStore.delayReport(1, "20120001", e),
                            GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.JOIN_OR_CREATE_ROOM_FAILED, "webSocket is connecting , please retry");
                        }
                        const r = yield Request.post(Common.obeUrl, Object.assign({
                            method: "client.gobe.room.join",
                            roomId: this.config.roomId
                        }, e), {}, !1);
                        if (r.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const e = new Map();
                            throw e.set("roomId", this.lastRoomId),
                            e.set("code", r.rtnCode.toString()),
                            e.set("msg", null !== (t = r.msg) && void 0 !== t ? t : ""),
                            haStore.delayReport(1, "20120001", e),
                            GOBEErrorBuilder.buildGOBEError(r.rtnCode, r.msg);
                        }
                        const {roomInfo: o, ticket: n} = r
                          , s = o.players.find(e => e.playerId === this.playerId);
                        this.player.customStatus = null == s ? void 0 : s.customPlayerStatus,
                        this.player.customProperties = null == s ? void 0 : s.customPlayerProperties,
                        this.config = o,
                        this.setRoomId(o.roomId),
                        this.setState(1 === o.roomStatus ? 3 : 2);
                        const i = CommonMessage$1.create({
                            msg: n
                        })
                          , a = ClientMessage$1.create({
                            timestamp: Date.now(),
                            seq: this.reconnect.name,
                            code: 36,
                            msg: CommonMessage$1.encode(i).finish()
                        });
                        this.connection.send(ClientMessage$1.encode(a).finish()),
                        Logger.info({
                            eventType: "reconnect_end",
                            playerId: this.playerId
                        });
                    });
                }
                startFrameSync() {
                    var e;
                    return __awaiter(this, void 0, void 0, function*() {
                        Logger.info({
                            eventType: "startFrameSync_start",
                            roomId: this.id
                        });
                        const t = yield Request.post(Common.obeUrl, {
                            method: "client.gobe.frame.sync.begin",
                            roomId: this.id
                        }, {}, !1);
                        if (t.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const r = new Map();
                            throw r.set("roomId", this.roomId),
                            r.set("code", t.rtnCode.toString()),
                            r.set("msg", null !== (e = t.msg) && void 0 !== e ? e : ""),
                            haStore.delayReport(1, "20106001", r),
                            GOBEErrorBuilder.buildGOBEError(t.rtnCode, t.msg);
                        }
                        Logger.info({
                            eventType: "startFrameSync_end",
                            roomId: this.id
                        });
                    });
                }
                stopFrameSync() {
                    var e;
                    return __awaiter(this, void 0, void 0, function*() {
                        Logger.info({
                            eventType: "stopFrameSync_start",
                            roomId: this.id
                        });
                        const t = yield Request.post(Common.obeUrl, {
                            method: "client.gobe.frame.sync.stop",
                            roomId: this.id
                        }, {}, !1);
                        if (t.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const r = new Map();
                            throw r.set("roomId", this.roomId),
                            r.set("code", t.rtnCode.toString()),
                            r.set("msg", null !== (e = t.msg) && void 0 !== e ? e : ""),
                            haStore.delayReport(1, "20106002", r),
                            GOBEErrorBuilder.buildGOBEError(t.rtnCode, t.msg);
                        }
                        Logger.info({
                            eventType: "stopFrameSync_end",
                            roomId: this.id
                        });
                    });
                }
                update() {
                    var e;
                    return __awaiter(this, void 0, void 0, function*() {
                        Logger.info({
                            eventType: "update_start",
                            roomId: this.id
                        });
                        const t = yield Request.post(Common.obeUrl, {
                            method: "client.gobe.room.detail",
                            roomId: this.id
                        }, {}, !1);
                        if (t.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const r = new Map();
                            throw r.set("roomId", this.roomId),
                            r.set("code", t.rtnCode.toString()),
                            r.set("msg", null !== (e = t.msg) && void 0 !== e ? e : ""),
                            haStore.delayReport(1, "20103010", r),
                            GOBEErrorBuilder.buildGOBEError(t.rtnCode, t.msg);
                        }
                        const {roomInfo: r} = t;
                        return Object.assign(this.config, r),
                        Logger.info({
                            eventType: "update_end",
                            roomId: this.id
                        }),
                        this;
                    });
                }
                updateRoomProperties(e) {
                    var t, r, o, n, s;
                    Logger.info({
                        eventType: "updateRoomProperties_start",
                        roomId: this.id
                    });
                    const i = RoomInfoFrame.create({
                        roomId: this.id,
                        roomName: null !== (t = e.roomName) && void 0 !== t ? t : this.config.roomName,
                        roomOwner: null !== (r = e.ownerId) && void 0 !== r ? r : this.config.ownerId,
                        isPrivate: 1 == (null !== (o = e.isPrivate) && void 0 !== o ? o : this.config.isPrivate),
                        isLock: 1 == (null !== (n = e.isLock) && void 0 !== n ? n : this.config.isLock),
                        customProp: null !== (s = e.customRoomProperties) && void 0 !== s ? s : this.config.customRoomProperties
                    })
                      , a = ClientMessage$1.create({
                        timestamp: Date.now(),
                        seq: this.updateRoomProperties.name,
                        code: 32,
                        msg: RoomInfoFrame.encode(i).finish()
                    });
                    this.connection.send(ClientMessage$1.encode(a).finish()),
                    Logger.info({
                        eventType: "updateRoomProperties_end",
                        roomId: this.id
                    });
                }
                leave() {
                    var e;
                    return __awaiter(this, void 0, void 0, function*() {
                        this.initiativeLeaveRoomFlag = !0;
                        const t = yield Request.post(Common.obeUrl, {
                            method: "client.gobe.room.leave",
                            roomId: this.id
                        }, {}, !1).finally( () => {
                            this.initiativeLeaveRoomFlag = !1;
                        }
                        );
                        if (t.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const r = new Map();
                            throw r.set("roomId", this.roomId),
                            r.set("code", t.rtnCode.toString()),
                            r.set("msg", null !== (e = t.msg) && void 0 !== e ? e : ""),
                            haStore.delayReport(1, "20103008", r),
                            haStore.report(),
                            GOBEErrorBuilder.buildGOBEError(t.rtnCode, t.msg);
                        }
                        this.removeAllListener(),
                        this.removeAllListeners(),
                        this.setRoomId(""),
                        this.setLastRoomId(""),
                        haStore.report(),
                        this.setState(1);
                    });
                }
                dismiss() {
                    var e;
                    return __awaiter(this, void 0, void 0, function*() {
                        this.initiativeLeaveRoomFlag = !0;
                        const t = yield Request.post(Common.obeUrl, {
                            method: "client.gobe.room.dismiss",
                            roomId: this.id
                        }, {}, !1).finally( () => {
                            this.initiativeLeaveRoomFlag = !1;
                        }
                        );
                        if (t.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const r = new Map();
                            throw r.set("roomId", this.roomId),
                            r.set("code", t.rtnCode.toString()),
                            r.set("msg", null !== (e = t.msg) && void 0 !== e ? e : ""),
                            haStore.delayReport(1, "20103009", r),
                            haStore.report(),
                            GOBEErrorBuilder.buildGOBEError(t.rtnCode, t.msg);
                        }
                        this.removeAllListener(),
                        this.removeAllListeners(),
                        this.setRoomId(""),
                        this.setLastRoomId(""),
                        haStore.report(),
                        this.setState(1);
                    });
                }
                removePlayer(e) {
                    var t;
                    return __awaiter(this, void 0, void 0, function*() {
                        Logger.info({
                            eventType: "removePlayer_start",
                            roomId: this.id,
                            removePlayerId: e
                        });
                        const r = yield Request.post(Common.obeUrl, {
                            method: "client.gobe.room.remove",
                            roomId: this.id,
                            playerId: e
                        }, {}, !1);
                        if (r.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const o = new Map();
                            throw o.set("roomId", this.roomId),
                            o.set("removedPlayerId", e),
                            o.set("code", r.rtnCode.toString()),
                            o.set("msg", null !== (t = r.msg) && void 0 !== t ? t : ""),
                            haStore.delayReport(1, "20103007", o),
                            GOBEErrorBuilder.buildGOBEError(r.rtnCode, r.msg);
                        }
                        Logger.info({
                            eventType: "removePlayer_end",
                            roomId: this.id,
                            removePlayerId: e
                        });
                    });
                }
                sendToClient(e) {
                    const t = InstantMessage.create({
                        imType: e.type,
                        dstPlayers: e.recvPlayerIdList,
                        srcPlayer: this.playerId,
                        msg: e.msg
                    })
                      , r = ClientMessage$1.create({
                        timestamp: Date.now(),
                        seq: this.sendToClient.name,
                        code: 22,
                        msg: InstantMessage.encode(t).finish()
                    });
                    this.connection.send(ClientMessage$1.encode(r).finish()),
                    Logger.info({
                        eventType: "sendToClient",
                        roomId: this.id,
                        sendToClientInfo: e
                    });
                }
                sendToServer(e) {
                    const t = RealtimeMessage.create({
                        msg: e
                    })
                      , r = ClientMessage$1.create({
                        timestamp: Date.now(),
                        seq: this.sendToServer.name,
                        code: 24,
                        msg: RealtimeMessage.encode(t).finish()
                    });
                    this.connection.send(ClientMessage$1.encode(r).finish()),
                    Logger.info({
                        eventType: "sendToServer",
                        roomId: this.id,
                        sendToServerInfo: e
                    });
                }
                clearRequestFrame() {
                    this.frameRequesting = !1,
                    this.frameRequestSize = 0,
                    this.frameRequestList = [],
                    this.autoFrameRequesting = !1,
                    this.autoFrameRequestCacheList = [],
                    this.frameRequestTimes = 0,
                    this.autoRequestFrameFailed = !1;
                }
                onWsClose(e) {
                    return __awaiter(this, void 0, void 0, function*() {
                        Logger.info({
                            eventType: "ws close in room",
                            roomId: this.id
                        }),
                        this.isConnected = !1,
                        this.onDisconnect.emit({
                            playerId: this.playerId
                        }, e);
                    });
                }
                onWsMessage(e) {
                    const t = ServerMessage$2.decode(new Uint8Array(e.data))
                      , {code: r} = t.toJSON()
                      , {msg: o} = t;
                    switch (r) {
                    case 14:
                        {
                            const e = PlayerInfoFrame.decode(o).toJSON();
                            this.connectedMsgHandle(e);
                            break;
                        }
                    case 8:
                        this.frameSyncStartHandle();
                        break;
                    case 10:
                        {
                            const e = RelayFrameInfo.decode(o).toJSON();
                            this.currentServerFrameId = e.currentRoomFrameId,
                            this.broadcastFrameDataHandle(e);
                            break;
                        }
                    case 9:
                        this.frameSyncStopHandle();
                        break;
                    case 7:
                        {
                            const e = AckMessage$1.decode(o).toJSON();
                            this.queryFrameDataAckHandle(e);
                            break;
                        }
                    case 17:
                        {
                            const e = QueryFrameResult.decode(o).toJSON().relayFrameInfos;
                            this.queryFrameDataHandle(e);
                            break;
                        }
                    case 12:
                        {
                            const e = PlayerInfoFrame.decode(o).toJSON();
                            this.joinRoomMsgHandle(e);
                            break;
                        }
                    case 13:
                        {
                            const e = PlayerInfoFrame.decode(o).toJSON();
                            this.leaveRoomMsgHandle(e);
                            break;
                        }
                    case 15:
                        {
                            const e = PlayerInfoFrame.decode(o).toJSON();
                            this.disconnectMsgHandle(e);
                            break;
                        }
                    case 16:
                        this.dismissRoomMsgHandle();
                        break;
                    case 18:
                        {
                            const e = PlayerInfoFrame.decode(o).toJSON();
                            this.updatePlayerStatusHandle(e);
                            break;
                        }
                    case 19:
                        {
                            const e = PlayerPropFrame.decode(o).toJSON();
                            this.updatePlayerPropertiesHandle(e);
                            break;
                        }
                    case 20:
                        {
                            const e = RoomInfoFrame.decode(o).toJSON();
                            this.updateRoomPropertiesHandle(e);
                            break;
                        }
                    case 22:
                        {
                            const e = InstantMessage.decode(o).toJSON();
                            this.instantMessageHandle(e);
                            break;
                        }
                    case 23:
                        {
                            const e = AckMessage$1.decode(o).toJSON();
                            this.instantMsgACKHandle(e);
                            break;
                        }
                    case 25:
                        {
                            const e = AckMessage$1.decode(o).toJSON();
                            this.realtimeMsgACKHandle(e);
                            break;
                        }
                    case 26:
                        this.onRecvFromServer.emit({
                            roomId: this.id,
                            msg: RealtimeMessage.decode(o).toJSON().msg
                        });
                        break;
                    case 33:
                        {
                            const e = AckMessage$1.decode(o).toJSON();
                            this.updateRoomPropAckHandle(e);
                            break;
                        }
                    }
                }
                updateRoomPropertiesHandle(e) {
                    var t, r;
                    this.config.roomName = null !== (t = e.roomName) && void 0 !== t ? t : "",
                    this.config.ownerId = e.roomOwner,
                    this.config.customRoomProperties = null !== (r = e.customProp) && void 0 !== r ? r : "",
                    this.config.isPrivate = e.isPrivate ? 1 : 0,
                    this.config.isLock = e.isLock ? 1 : 0,
                    Logger.info({
                        eventType: "wsMsg updateRoomProperties",
                        roomProperties: this.config.customRoomProperties,
                        roomId: this.id
                    }),
                    this.onRoomPropertiesChange.emit(this.config);
                }
                updateRoomPropAckHandle(e) {
                    Logger.info({
                        eventType: "wsMsg updatePlayerStatusAck"
                    }),
                    e.rtnCode && e.rtnCode != exports.ErrorCode.COMMON_OK && this.onRoomPropertiesChangeFailed.emit(GOBEErrorBuilder.buildGOBEError(e.rtnCode, e.msg));
                }
                frameSyncStartHandle() {
                    this.setState(3),
                    this.frameId = 0,
                    this.config.roomStatus = 1,
                    this.onStartFrameSync.emit(),
                    this.delayCollectAnalyzer.startCalculateDelayTask();
                    const e = new Map();
                    e.set("roomId", this.roomId),
                    e.set("code", exports.ErrorCode.COMMON_OK.toString()),
                    e.set("msg", "receive startFrameSync message success."),
                    haStore.delayReport(1, "20107002", e),
                    Logger.info({
                        eventType: "wsMsg frameSyncStarted",
                        roomId: this.id
                    });
                }
                frameSyncStopHandle() {
                    this.setState(2),
                    this.config.roomStatus = 0,
                    this.delayCollectAnalyzer.stopCalculateDelayTask(),
                    this.onStopFrameSync.emit();
                    const e = new Map();
                    e.set("roomId", this.roomId),
                    e.set("code", exports.ErrorCode.COMMON_OK.toString()),
                    e.set("msg", "receive stopFrameSync message success."),
                    haStore.delayReport(1, "20107003", e),
                    Logger.info({
                        eventType: "wsMsg frameSyncStopped",
                        roomId: this.id
                    });
                }
                preCheckBroadcastFrame() {
                    return !(this.currentServerFrameId <= this.frameId || this.autoRequestFrameFailed) && this.isConnected;
                }
                broadcastFrameDataHandle(e) {
                    if (!this.preCheckBroadcastFrame())
                        return;
                    const t = Object.assign(e, {
                        isReplay: !1,
                        time: Date.now()
                    });
                    this.autoRequestFrameFailed || (this.autoFrameRequesting ? this.autoFrameRequestCacheList.push(t) : e.currentRoomFrameId - this.frameId > 1 && 1 === Room.autoFrame ? (this.autoFrameRequesting = !0,
                    this.autoFrameRequestCacheList.push(t),
                    this.requestFrame(this.frameId + 1, e.currentRoomFrameId - this.frameId - 1)) : e.currentRoomFrameId > this.frameId && (this.frameId = e.currentRoomFrameId,
                    this.delayCollectAnalyzer.recordDownstreamFrame(e.frameInfo),
                    Logger.debug({
                        eventType: "broadcastFrame",
                        frameId: this.frameId
                    }),
                    this.onRecvFrame.emit(t)));
                }
                queryFrameDataHandle(e) {
                    const t = [];
                    if (this.frameRequestTimes++,
                    null == e || e.forEach(e => {
                        t.push({
                            currentRoomFrameId: e.currentRoomFrameId,
                            frameInfo: e.frameInfo,
                            ext: e.ext,
                            isReplay: !0,
                            time: Date.now()
                        });
                    }
                    ),
                    e && this.frameRequestList.push(...t),
                    this.frameRequestTimes === Math.ceil(this.frameRequestSize / this.frameRequestMaxSize))
                        if (this.frameRequestList.length === this.frameRequestSize) {
                            const e = this.autoFrameRequestCacheList
                              , t = this.frameRequestList;
                            t.sort( (e, t) => e.currentRoomFrameId - t.currentRoomFrameId),
                            this.autoFrameRequesting && 1 === Room.autoFrame ? (this.clearRequestFrame(),
                            this.frameId = e[e.length - 1].currentRoomFrameId,
                            Logger.debug({
                                eventType: "requestFrame_res",
                                frameStartId: t[0].currentRoomFrameId,
                                frameEndId: t[t.length - 1].currentRoomFrameId,
                                autoFrameStartId: e[0].currentRoomFrameId,
                                autoFrameEndId: this.frameId,
                                totalFrameCount: t.length + e.length
                            }),
                            this.onRecvFrame.emit([...t, ...e])) : (this.clearRequestFrame(),
                            Logger.debug({
                                eventType: "requestFrame_res",
                                frameStartId: t[0].currentRoomFrameId,
                                frameEndId: t[t.length - 1].currentRoomFrameId,
                                totalFrameCount: t.length
                            }),
                            this.onRecvFrame.emit(t));
                        } else {
                            this.autoRequestFrameFailed = !0;
                            const e = "auto request frame failed, please reset frameId.";
                            this.onRequestFrameError.emit(GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.SDK_AUTO_REQUEST_FRAME_FAILED, e));
                        }
                }
                connectedMsgHandle(e) {
                    e.playerId === this.playerId && (this.isConnected = !0,
                    this.clearRequestFrame(),
                    this.setRoomId(this.id)),
                    this.onConnect.emit({
                        playerId: e.playerId
                    }),
                    Logger.info({
                        eventType: "wsMsg connected",
                        playerId: e.playerId,
                        roomId: this.id
                    });
                }
                leaveRoomMsgHandle(e) {
                    if (Logger.info({
                        eventType: "wsMsg leaveRoom",
                        playerId: e.playerId,
                        roomId: this.id
                    }),
                    e.playerId !== this.playerId || this.initiativeLeaveRoomFlag) {
                        if (e.playerId !== this.playerId) {
                            const t = this.config.players.findIndex(t => t.playerId === e.playerId);
                            -1 !== t && this.config.players.splice(t, 1),
                            this.onLeave.emit({
                                playerId: e.playerId
                            });
                        }
                    } else
                        this.setLastRoomId(""),
                        this.setRoomId(""),
                        this.removeAllListener(),
                        this.setState(1),
                        this.onLeave.emit({
                            playerId: e.playerId
                        }),
                        this.removeAllListeners();
                }
                joinRoomMsgHandle(e) {
                    let t = null;
                    e.extraInfo && (t = JSON.parse(e.extraInfo));
                    const r = this.config.players.findIndex(t => t.playerId === e.playerId);
                    -1 === r ? this.config.players.push(t) : this.config.players[r] = t;
                    const o = new Map();
                    o.set("joinPlayerId", e.playerId),
                    o.set("roomId", this.roomId),
                    o.set("code", exports.ErrorCode.COMMON_OK.toString()),
                    o.set("msg", `receive ${e.playerId} onJoin message success.`),
                    haStore.delayReport(1, "20107001", o),
                    Logger.info({
                        eventType: "wsMsg joinRoom",
                        playerId: e.playerId,
                        roomId: this.id
                    }),
                    this.onJoin.emit({
                        playerId: e.playerId
                    });
                }
                disconnectMsgHandle(e) {
                    const t = this.config.players.findIndex(t => t.playerId === e.playerId);
                    -1 !== t && (this.config.players[t].status = 0),
                    Logger.info({
                        eventType: "wsMsg disconnected",
                        playerId: e.playerId,
                        roomId: this.id
                    }),
                    this.onDisconnect.emit({
                        playerId: e.playerId
                    });
                }
                dismissRoomMsgHandle() {
                    this.initiativeLeaveRoomFlag || (this.setLastRoomId(""),
                    this.setRoomId(""),
                    this.removeAllListener(),
                    this.setState(1),
                    this.onDismiss.emit(),
                    this.removeAllListeners(),
                    Logger.info({
                        eventType: "wsMsg dismissRoom",
                        roomId: this.id
                    }));
                }
                updatePlayerStatusHandle(e) {
                    var t;
                    const r = null !== (t = e.customState) && void 0 !== t ? t : 0;
                    for (let t = 0; t < this.config.players.length; t++)
                        if (this.config.players[t].playerId === e.playerId) {
                            this.config.players[t].customPlayerStatus = r;
                            break;
                        }
                    this.onUpdateCustomStatus.emit({
                        playerId: e.playerId,
                        customStatus: r
                    }),
                    Logger.info({
                        eventType: "wsMsg updateCustomStatus",
                        playerId: e.playerId,
                        roomId: this.id
                    });
                }
                updatePlayerPropertiesHandle(e) {
                    for (let t = 0; t < this.config.players.length; t++)
                        if (this.config.players[t].playerId === e.playerId) {
                            this.config.players[t].customPlayerProperties = e.customProp;
                            break;
                        }
                    this.onUpdateCustomProperties.emit({
                        playerId: e.playerId,
                        customProperties: e.customProp
                    }),
                    Logger.info({
                        eventType: "wsMsg updateCustomProperties",
                        playerId: e.playerId,
                        roomId: this.id
                    });
                }
                instantMessageHandle(e) {
                    const t = {
                        roomId: this.id,
                        sendPlayerId: e.srcPlayer,
                        msg: e.msg
                    };
                    this.onRecvFromClient.emit(t);
                }
                instantMsgACKHandle(e) {
                    e.rtnCode && 0 !== e.rtnCode && this.onSendToClientFailed.emit(GOBEErrorBuilder.buildGOBEError(e.rtnCode, e.msg));
                }
                realtimeMsgACKHandle(e) {
                    e.rtnCode && 0 !== e.rtnCode && this.onSendToServerFailed.emit(GOBEErrorBuilder.buildGOBEError(e.rtnCode, e.msg));
                }
                queryFrameDataAckHandle(e) {
                    if (e.rtnCode && 0 !== e.rtnCode) {
                        const t = new Map();
                        t.set("roomId", this.roomId),
                        t.set("code", e.rtnCode.toString()),
                        t.set("msg", e.msg),
                        haStore.delayReport(1, "20106003", t),
                        this.clearRequestFrame(),
                        this.onRequestFrameError.emit(GOBEErrorBuilder.buildGOBEError(e.rtnCode, e.msg));
                    }
                }
                removeAllListener() {
                    this.removeListener(14),
                    this.removeListener(8),
                    this.removeListener(10),
                    this.removeListener(9),
                    this.removeListener(7),
                    this.removeListener(17),
                    this.removeListener(12),
                    this.removeListener(13),
                    this.removeListener(15),
                    this.removeListener(16),
                    this.removeListener(18),
                    this.removeListener(19),
                    this.removeListener(20),
                    this.removeListener(22),
                    this.removeListener(23),
                    this.removeListener(25),
                    this.removeListener(26),
                    this.removeListener(33);
                }
                addAllListener() {
                    this.addListener(14, this),
                    this.addListener(8, this),
                    this.addListener(10, this),
                    this.addListener(9, this),
                    this.addListener(7, this),
                    this.addListener(17, this),
                    this.addListener(12, this),
                    this.addListener(13, this),
                    this.addListener(15, this),
                    this.addListener(16, this),
                    this.addListener(18, this),
                    this.addListener(19, this),
                    this.addListener(20, this),
                    this.addListener(22, this),
                    this.addListener(23, this),
                    this.addListener(25, this),
                    this.addListener(26, this),
                    this.addListener(33, this);
                }
            }
            Room.autoFrame = 0;
            class Auth extends Base {
                constructor(e, t, r, o) {
                    super(),
                    this.clientId = e,
                    this.clientSecret = t,
                    this.createSignature = r,
                    this.accessToken = o;
                }
                requestAccessToken() {
                    return __awaiter(this, void 0, void 0, function*() {
                        const e = yield Request.post("https://connect-drcn.hispace.dbankcloud.cn/agc/apigw/oauth2/v1/token", {
                            grant_type: "client_credentials",
                            client_id: this.clientId,
                            client_secret: this.clientSecret,
                            useJwt: 0
                        }, {
                            app_id: this.appId
                        }, !1);
                        if ("ret"in e) {
                            const t = new Map();
                            throw t.set("code", exports.ErrorCode.GET_ACCESS_TOKEN_ERR.toString()),
                            t.set("msg", e.ret.msg),
                            haStore.cacheEvent({
                                dataType: 0,
                                eventId: "10102001",
                                data: t
                            }),
                            haStore.cacheEvent({
                                dataType: 1,
                                eventId: "20102001",
                                data: t
                            }),
                            GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.GET_ACCESS_TOKEN_ERR, e.ret.msg);
                        }
                        return e.access_token;
                    });
                }
                requestServiceToken(e, t) {
                    var r;
                    return __awaiter(this, void 0, void 0, function*() {
                        const o = yield Request.post(Common.obeUrl, Object.assign({
                            method: "client.gobe.player.login",
                            cpAccessToken: e,
                            clientId: this.clientId,
                            openId: this.openId,
                            appVersion: this.appVersion
                        }, t), {}, !1);
                        if (o.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const e = new Map();
                            throw e.set("code", o.rtnCode.toString()),
                            e.set("msg", null !== (r = o.msg) && void 0 !== r ? r : ""),
                            haStore.cacheEvent({
                                dataType: 0,
                                eventId: "10102001",
                                data: e
                            }),
                            haStore.cacheEvent({
                                dataType: 1,
                                eventId: "20102001",
                                data: e
                            }),
                            GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.AUTHENTICATION_FAILED, o.msg);
                        }
                        return o;
                    });
                }
                login() {
                    var e;
                    return __awaiter(this, void 0, void 0, function*() {
                        const t = this.accessToken ? this.accessToken : yield this.requestAccessToken()
                          , r = this.createSignature ? yield this.createSignature() : void 0
                          , o = yield this.requestServiceToken(t, r)
                          , n = new Map();
                        n.set("code", exports.ErrorCode.COMMON_OK.toString()),
                        n.set("msg", "login success");
                        const s = {
                            dataType: 0,
                            eventId: "10102001",
                            data: n
                        };
                        haStore.cacheEvent(s);
                        const {serviceToken: i, playerId: a, lastRoomId: l, lastGroupId: c, timeStamp: u} = o;
                        this.setState(1),
                        this.setServiceToken(i),
                        this.setPlayerId(a),
                        this.setLastGroupId(c),
                        this.setLastRoomId(l);
                        const d = yield Common.requestGameConfig();
                        if (d.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const t = new Map();
                            throw t.set("code", d.rtnCode.toString()),
                            t.set("msg", null !== (e = d.msg) && void 0 !== e ? e : ""),
                            haStore.cacheEvent({
                                dataType: 1,
                                eventId: "20102002",
                                data: t
                            }),
                            GOBEErrorBuilder.buildGOBEError(d.rtnCode, d.msg);
                        }
                        const {configParam: p} = d;
                        return p.httpTimeout && (Request.timeout = p.httpTimeout),
                        p.wsHeartBeatCycle && (Connection.heartbeatCycle = p.wsHeartBeatCycle),
                        p.autoFrame && (Room.autoFrame = p.autoFrame),
                        p.logLevel && (Logger.level = Logger.level !== exports.LogLevel.OFF ? Logger.level : p.logLevel),
                        p.collectURL && haStore.setReportUrl(p.collectURL),
                        p.reportLogLevel && haStore.setReportLogLevel(p.reportLogLevel),
                        haStore.init() && haStore.report(),
                        {
                            protocol: p.protocol,
                            pollInterval: p.pollInterval,
                            timeStamp: u
                        };
                    });
                }
            }
            const {ServerMessage: ServerMessage$1, GroupNotify: GroupNotify} = dto;
            class Group extends Base {
                get id() {
                    return this.config.groupId;
                }
                get groupName() {
                    return this.config.groupName;
                }
                get maxPlayers() {
                    return this.config.maxPlayers;
                }
                get ownerId() {
                    return this.config.ownerId;
                }
                get customGroupProperties() {
                    return this.config.customGroupProperties;
                }
                get isLock() {
                    return this.config.isLock;
                }
                get isPersistent() {
                    return this.config.isPersistent;
                }
                get players() {
                    return this.config.players;
                }
                get player() {
                    return this._player;
                }
                constructor(e) {
                    super(),
                    this.onJoin = createSignal(),
                    this.onLeave = createSignal(),
                    this.onDismiss = createSignal(),
                    this.onUpdate = createSignal(),
                    this.onMatchStart = createSignal(),
                    this.initiativeLeaveGroupFlag = !1,
                    this.config = e,
                    this._player = new Player(),
                    this.addAllListener();
                }
                addAllListener() {
                    this.addListener(38, this),
                    this.addListener(39, this),
                    this.addListener(40, this),
                    this.addListener(41, this),
                    this.addListener(42, this);
                }
                query() {
                    var e;
                    return __awaiter(this, void 0, void 0, function*() {
                        const t = yield Request.post(Common.obeUrl, {
                            method: "client.gobe.group.detail",
                            groupId: this.id
                        }, {}, !1);
                        if (t.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const r = new Map();
                            throw r.set("groupId", this.groupId),
                            r.set("code", t.rtnCode.toString()),
                            r.set("msg", null !== (e = t.msg) && void 0 !== e ? e : ""),
                            haStore.delayReport(1, "20105008", r),
                            GOBEErrorBuilder.buildGOBEError(t.rtnCode, t.msg);
                        }
                        const {groupInfo: r} = t;
                        return Object.assign(this.config, r),
                        this;
                    });
                }
                leave() {
                    var e;
                    return __awaiter(this, void 0, void 0, function*() {
                        this.initiativeLeaveGroupFlag = !0;
                        const t = yield Request.post(Common.obeUrl, {
                            method: "client.gobe.group.leave",
                            groupId: this.id
                        }, {}, !1).finally( () => {
                            this.initiativeLeaveGroupFlag = !1;
                        }
                        );
                        if (t.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const r = new Map();
                            throw r.set("groupId", this.groupId),
                            r.set("code", t.rtnCode.toString()),
                            r.set("msg", null !== (e = t.msg) && void 0 !== e ? e : ""),
                            haStore.delayReport(1, "20105005", r),
                            GOBEErrorBuilder.buildGOBEError(t.rtnCode, t.msg);
                        }
                        this.setLastGroupId(""),
                        this.setGroupId(""),
                        this.removeAllListener(),
                        this.removeAllListeners(),
                        this.setEvent(0);
                    });
                }
                dismiss() {
                    var e;
                    return __awaiter(this, void 0, void 0, function*() {
                        this.initiativeLeaveGroupFlag = !0;
                        const t = yield Request.post(Common.obeUrl, {
                            method: "client.gobe.group.dismiss",
                            groupId: this.id
                        }, {}, !1).finally( () => {
                            this.initiativeLeaveGroupFlag = !1;
                        }
                        );
                        if (t.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const r = new Map();
                            throw r.set("groupId", this.groupId),
                            r.set("code", t.rtnCode.toString()),
                            r.set("msg", null !== (e = t.msg) && void 0 !== e ? e : ""),
                            haStore.delayReport(1, "20105006", r),
                            GOBEErrorBuilder.buildGOBEError(t.rtnCode, t.msg);
                        }
                        this.setLastGroupId(""),
                        this.setGroupId(""),
                        this.removeAllListener(),
                        this.removeAllListeners(),
                        this.setEvent(1);
                    });
                }
                updateGroup(e) {
                    var t;
                    return __awaiter(this, void 0, void 0, function*() {
                        const r = yield Request.post(Common.obeUrl, Object.assign({
                            method: "client.gobe.group.change",
                            groupId: this.id
                        }, e), {}, !1);
                        if (r.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const e = new Map();
                            throw e.set("groupId", this.groupId),
                            e.set("code", r.rtnCode.toString()),
                            e.set("msg", null !== (t = r.msg) && void 0 !== t ? t : ""),
                            haStore.delayReport(1, "20105003", e),
                            GOBEErrorBuilder.buildGOBEError(r.rtnCode, r.msg);
                        }
                    });
                }
                removePlayer(e) {
                    var t;
                    return __awaiter(this, void 0, void 0, function*() {
                        const r = yield Request.post(Common.obeUrl, {
                            method: "client.gobe.group.player.remove",
                            groupId: this.id,
                            playerId: e
                        }, {}, !1);
                        if (r.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const e = new Map();
                            throw e.set("groupId", this.groupId),
                            e.set("code", r.rtnCode.toString()),
                            e.set("msg", null !== (t = r.msg) && void 0 !== t ? t : ""),
                            haStore.delayReport(1, "20105004", e),
                            GOBEErrorBuilder.buildGOBEError(r.rtnCode, r.msg);
                        }
                    });
                }
                removeAllListeners() {
                    [this.onJoin, this.onLeave, this.onDismiss, this.onUpdate, this.onMatchStart].forEach(e => e.clear());
                }
                onWsMessage(e) {
                    const t = ServerMessage$1.decode(new Uint8Array(e.data))
                      , {code: r} = t.toJSON()
                      , {msg: o} = t
                      , n = GroupNotify.decode(o).toJSON();
                    switch (r) {
                    case 38:
                        this.joinGroupMsgHandle(n);
                        break;
                    case 40:
                        this.leaveGroupMsgHandle(n);
                        break;
                    case 41:
                        this.dismissGroupMsgHandle(n);
                        break;
                    case 39:
                        this.updateGroupMsgHandle(n);
                        break;
                    case 42:
                        this.onMatchStart.emit(),
                        Logger.info({
                            eventType: "wsMsg groupStartMatchNotify",
                            groupId: n.groupId
                        });
                    }
                }
                joinGroupMsgHandle(e) {
                    if (e.players.length) {
                        const t = JSON.parse(e.players[0].extraInfo)
                          , r = Object.assign({
                            playerId: e.players[0].playerId
                        }, t)
                          , o = this.config.players.findIndex(e => e.playerId === r.playerId);
                        -1 === o ? this.config.players.push(r) : this.config.players[o] = r;
                        const n = new Map();
                        n.set("joinPlayerId", r.playerId),
                        n.set("groupId", this.groupId),
                        n.set("code", exports.ErrorCode.COMMON_OK.toString()),
                        n.set("msg", `Group receive ${r.playerId} onJoin message success.`),
                        haStore.delayReport(1, "20107001", n),
                        Logger.info({
                            eventType: "wsMsg joinGroupNotify",
                            groupId: e.groupId,
                            playerId: r.playerId
                        }),
                        this.onJoin.emit({
                            playerId: r.playerId
                        });
                    } else
                        Logger.error({
                            eventType: "joinGroup error",
                            reason: "GroupNotifyMessage not exist a player"
                        });
                }
                leaveGroupMsgHandle(e) {
                    if (e.players.length) {
                        const t = {
                            playerId: e.players[0].playerId
                        };
                        if (t.playerId !== this.playerId || this.initiativeLeaveGroupFlag) {
                            if (t.playerId !== this.playerId) {
                                const e = this.config.players.findIndex(e => e.playerId === t.playerId);
                                -1 !== e && this.config.players.splice(e, 1),
                                this.onLeave.emit({
                                    playerId: t.playerId
                                });
                            }
                        } else
                            this.setLastGroupId(""),
                            this.setGroupId(""),
                            this.removeAllListener(),
                            this.setEvent(0),
                            this.onLeave.emit({
                                playerId: t.playerId
                            }),
                            this.removeAllListeners();
                        Logger.info({
                            eventType: "wsMsg leaveGroupNotify",
                            groupId: e.groupId,
                            playerId: t.playerId
                        });
                    } else
                        Logger.error({
                            eventType: "leaveGroup error",
                            reason: "GroupNotifyMessage not exist a player"
                        });
                }
                dismissGroupMsgHandle(e) {
                    this.initiativeLeaveGroupFlag || (this.setGroupId(""),
                    this.setLastGroupId(""),
                    this.removeAllListener(),
                    this.setEvent(1),
                    this.onDismiss.emit(),
                    this.removeAllListeners()),
                    Logger.info({
                        eventType: "wsMsg dismissGroupNotify",
                        groupId: e.groupId
                    });
                }
                updateGroupMsgHandle(e) {
                    var t, r, o, n;
                    this.config.groupName = null !== (t = null == e ? void 0 : e.group.groupName) && void 0 !== t ? t : this.config.groupName,
                    this.config.ownerId = null !== (r = null == e ? void 0 : e.group.ownerId) && void 0 !== r ? r : this.config.ownerId,
                    this.config.customGroupProperties = null !== (o = null == e ? void 0 : e.group.customGroupProperties) && void 0 !== o ? o : this.config.customGroupProperties,
                    this.config.isLock = null !== (n = null == e ? void 0 : e.group.isLock) && void 0 !== n ? n : this.config.isLock,
                    this.onUpdate.emit(this.config),
                    Logger.info({
                        eventType: "wsMsg updateGroupNotify",
                        groupId: e.groupId,
                        playerId: e.players[0].playerId
                    });
                }
                onWsClose(e) {
                    this.removeAllListener();
                }
                removeAllListener() {
                    this.removeListener(38),
                    this.removeListener(39),
                    this.removeListener(40),
                    this.removeListener(41),
                    this.removeListener(42);
                }
            }
            const {ServerMessage: ServerMessage, CommonMessage: CommonMessage, ClientMessage: ClientMessage, AckMessage: AckMessage} = dto;
            class Client extends Base {
                get room() {
                    return this._room;
                }
                get group() {
                    return this._group;
                }
                get loginTimestamp() {
                    return this._loginTimestamp;
                }
                constructor(e) {
                    var t, r;
                    super(),
                    this._room = null,
                    this._group = null,
                    this._pollInterval = 2e3,
                    this._isMatching = !1,
                    this._loginTimestamp = 0,
                    this._initStatus = !1,
                    this.onMatch = createSignal(),
                    this.onInitResult = createSignal(),
                    this.onJoinRoomFailed = createSignal(),
                    this.setAppId(e.appId),
                    this.setOpenId(e.openId),
                    this.setPlatform(e.platform),
                    Platform.cerPath = null !== (t = e.cerPath) && void 0 !== t ? t : "",
                    this.setAppVersion(null !== (r = e.appVersion) && void 0 !== r ? r : ""),
                    this._auth = new Auth(e.clientId,e.clientSecret,e.createSignature,e.accessToken),
                    this.addListener(1, this),
                    this.addListener(3, this),
                    this.addListener(37, this),
                    this.addListener(1e3, this);
                }
                init() {
                    return __awaiter(this, void 0, void 0, function*() {
                        if (0 !== this.state)
                            return this;
                        this._initStatus = !0;
                        const {protocol: e, pollInterval: t, timeStamp: r} = yield this._auth.login();
                        return yield this.connect(e),
                        t && (this._pollInterval = t),
                        r && (this._loginTimestamp = r),
                        Logger.info({
                            eventType: "gobe_inited",
                            playerId: this.playerId
                        }),
                        this;
                    });
                }
                createRoom(e, t) {
                    var r, o;
                    return __awaiter(this, void 0, void 0, function*() {
                        if (Logger.info({
                            eventType: "createRoom_start",
                            playerId: this.playerId
                        }),
                        !this.connection.isOpen())
                            throw GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.JOIN_OR_CREATE_ROOM_FAILED, "createRoom failed");
                        const n = yield Request.post(Common.obeUrl, Object.assign(Object.assign({
                            method: "client.gobe.room.create",
                            isPrivate: 0,
                            isLock: 0
                        }, e), t), {}, !1);
                        if (n.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const e = new Map();
                            throw e.set("roomId", null === (r = null == n ? void 0 : n.roomInfo) || void 0 === r ? void 0 : r.roomId),
                            e.set("code", n.rtnCode.toString()),
                            e.set("msg", null !== (o = n.msg) && void 0 !== o ? o : ""),
                            haStore.delayReport(1, "20103001", e),
                            GOBEErrorBuilder.buildGOBEError(n.rtnCode, n.msg);
                        }
                        const {roomInfo: s, ticket: i} = n
                          , a = s.players.find(e => e.playerId === this.playerId);
                        this.setRoomId(s.roomId),
                        this.setLastRoomId(s.roomId),
                        this._room = new Room(this,s),
                        this._room.player.customStatus = null == a ? void 0 : a.customPlayerStatus,
                        this._room.player.customProperties = null == a ? void 0 : a.customPlayerProperties;
                        const l = CommonMessage.create({
                            msg: i
                        })
                          , c = ClientMessage.create({
                            timestamp: Date.now(),
                            seq: this.createRoom.name,
                            code: 36,
                            msg: CommonMessage.encode(l).finish()
                        });
                        return this.connection.send(ClientMessage.encode(c).finish()),
                        Logger.info({
                            eventType: "createRoom_end",
                            playerId: this.playerId,
                            roomId: s.roomId
                        }),
                        this._room;
                    });
                }
                createGroup(e, t) {
                    var r, o;
                    return __awaiter(this, void 0, void 0, function*() {
                        Logger.info({
                            eventType: "createGroup_start",
                            playerId: this.playerId
                        });
                        const n = yield Request.post(Common.obeUrl, Object.assign(Object.assign({
                            method: "client.gobe.group.create"
                        }, e), t), {}, !1);
                        if (n.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const e = new Map();
                            throw e.set("roomId", null === (r = null == n ? void 0 : n.groupInfo) || void 0 === r ? void 0 : r.groupId),
                            e.set("code", n.rtnCode.toString()),
                            e.set("msg", null !== (o = n.msg) && void 0 !== o ? o : ""),
                            haStore.delayReport(1, "20105001", e),
                            GOBEErrorBuilder.buildGOBEError(n.rtnCode, n.msg);
                        }
                        const {groupInfo: s} = n
                          , i = s.players.find(e => e.playerId === this.playerId);
                        return this.setGroupId(s.groupId),
                        this.setLastGroupId(s.groupId),
                        this._group = new Group(s),
                        this._group.player.customStatus = null == i ? void 0 : i.customPlayerStatus,
                        this._group.player.customProperties = null == i ? void 0 : i.customPlayerProperties,
                        Logger.info({
                            eventType: "createGroup_end",
                            playerId: this.playerId,
                            groupId: s.groupId
                        }),
                        this._group;
                    });
                }
                joinRoom(e, t) {
                    var r, o;
                    return __awaiter(this, void 0, void 0, function*() {
                        if (Logger.info({
                            eventType: "joinRoom_start",
                            playerId: this.playerId,
                            roomIdentity: e
                        }),
                        !this.connection.isOpen())
                            throw GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.JOIN_OR_CREATE_ROOM_FAILED, "joinRoom failed");
                        const n = yield Request.post(Common.obeUrl, Object.assign({
                            method: "client.gobe.room.join",
                            roomCode: e
                        }, t), {}, !1);
                        if (n.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const e = new Map();
                            throw e.set("roomId", null === (r = null == n ? void 0 : n.roomInfo) || void 0 === r ? void 0 : r.roomId),
                            e.set("code", n.rtnCode.toString()),
                            e.set("msg", null !== (o = n.msg) && void 0 !== o ? o : ""),
                            haStore.delayReport(1, "20103002", e),
                            GOBEErrorBuilder.buildGOBEError(n.rtnCode, n.msg);
                        }
                        const {roomInfo: s, ticket: i} = n
                          , a = s.players.find(e => e.playerId === this.playerId);
                        this.setRoomId(s.roomId),
                        this.setLastRoomId(s.roomId),
                        this._room = new Room(this,s),
                        this._room.player.customStatus = null == a ? void 0 : a.customPlayerStatus,
                        this._room.player.customProperties = null == a ? void 0 : a.customPlayerProperties;
                        const l = CommonMessage.create({
                            msg: i
                        })
                          , c = ClientMessage.create({
                            timestamp: Date.now(),
                            seq: this.joinRoom.name,
                            code: 36,
                            msg: CommonMessage.encode(l).finish()
                        });
                        return this.connection.send(ClientMessage.encode(c).finish()),
                        Logger.info({
                            eventType: "joinRoom_end",
                            playerId: this.playerId,
                            roomId: s.roomId
                        }),
                        this._room;
                    });
                }
                joinGroup(e, t) {
                    var r, o;
                    return __awaiter(this, void 0, void 0, function*() {
                        Logger.info({
                            eventType: "joinGroup_start",
                            playerId: this.playerId,
                            groupId: e
                        });
                        const n = yield Request.post(Common.obeUrl, Object.assign({
                            method: "client.gobe.group.join",
                            groupId: e
                        }, t), {}, !1);
                        if (n.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const e = new Map();
                            throw e.set("roomId", null === (r = null == n ? void 0 : n.groupInfo) || void 0 === r ? void 0 : r.groupId),
                            e.set("code", n.rtnCode.toString()),
                            e.set("msg", null !== (o = n.msg) && void 0 !== o ? o : ""),
                            haStore.delayReport(1, "20105002", e),
                            GOBEErrorBuilder.buildGOBEError(n.rtnCode, n.msg);
                        }
                        const {groupInfo: s} = n
                          , i = s.players.find(e => e.playerId === this.playerId);
                        return this.setGroupId(s.groupId),
                        this.setLastGroupId(s.groupId),
                        this._group = new Group(s),
                        this._group.player.customStatus = null == i ? void 0 : i.customPlayerStatus,
                        this._group.player.customProperties = null == i ? void 0 : i.customPlayerProperties,
                        Logger.info({
                            eventType: "joinGroup_end",
                            playerId: this.playerId,
                            groupId: this.groupId
                        }),
                        this._group;
                    });
                }
                leaveRoom() {
                    var e;
                    return __awaiter(this, void 0, void 0, function*() {
                        if (Logger.info({
                            eventType: "leaveRoom_start",
                            playerId: this.playerId
                        }),
                        this._room) {
                            const e = this._room.id;
                            yield this._room.leave(),
                            Logger.info({
                                eventType: "leaveRoom_end",
                                playerId: this.playerId,
                                roomId: e,
                                leaveType: "byRoomId"
                            });
                        } else if (this.lastRoomId) {
                            const t = yield Request.post(Common.obeUrl, {
                                method: "client.gobe.room.leave",
                                roomId: this.lastRoomId
                            }, {}, !1);
                            if (t.rtnCode != exports.ErrorCode.COMMON_OK) {
                                const r = new Map();
                                throw r.set("roomId", this.lastRoomId),
                                r.set("code", t.rtnCode.toString()),
                                r.set("msg", null !== (e = t.msg) && void 0 !== e ? e : ""),
                                haStore.delayReport(1, "20103008", r),
                                haStore.report(),
                                GOBEErrorBuilder.buildGOBEError(t.rtnCode, t.msg);
                            }
                            this.setLastRoomId(""),
                            this.setRoomId(""),
                            haStore.report(),
                            Logger.info({
                                eventType: "leaveRoom_end",
                                playerId: this.playerId,
                                roomId: this.lastRoomId,
                                leaveType: "byLastRoomId"
                            });
                        }
                        return this;
                    });
                }
                dismissRoom() {
                    var e, t;
                    return __awaiter(this, void 0, void 0, function*() {
                        return Logger.info({
                            eventType: "dismissRoom_start",
                            playerId: this.playerId,
                            roomId: null === (e = this._room) || void 0 === e ? void 0 : e.id
                        }),
                        yield null === (t = this._room) || void 0 === t ? void 0 : t.dismiss(),
                        Logger.info({
                            eventType: "dismissRoom_end",
                            playerId: this.playerId
                        }),
                        this;
                    });
                }
                leaveGroup() {
                    var e, t;
                    return __awaiter(this, void 0, void 0, function*() {
                        return Logger.info({
                            eventType: "leaveGroup_start",
                            playerId: this.playerId,
                            groupId: null === (e = this._group) || void 0 === e ? void 0 : e.id
                        }),
                        yield null === (t = this._group) || void 0 === t ? void 0 : t.leave(),
                        Logger.info({
                            eventType: "leaveGroup_end",
                            playerId: this.playerId
                        }),
                        this;
                    });
                }
                dismissGroup() {
                    var e, t;
                    return __awaiter(this, void 0, void 0, function*() {
                        return Logger.info({
                            eventType: "dismissGroup_start",
                            playerId: this.playerId,
                            groupId: null === (e = this._group) || void 0 === e ? void 0 : e.id
                        }),
                        yield null === (t = this._group) || void 0 === t ? void 0 : t.dismiss(),
                        Logger.info({
                            eventType: "dismissGroup_end",
                            playerId: this.playerId
                        }),
                        this;
                    });
                }
                resetRoomFrameId(e) {
                    var t;
                    return __awaiter(this, void 0, void 0, function*() {
                        return null === (t = this._room) || void 0 === t || t.resetRoomFrameId(e),
                        this;
                    });
                }
                queryRecordList(e=0, t=20) {
                    var r;
                    return __awaiter(this, void 0, void 0, function*() {
                        Logger.info({
                            eventType: "queryRecordList",
                            playerId: this.playerId,
                            offset: e,
                            limit: t
                        });
                        const o = yield Request.post(Common.obeUrl, {
                            method: "client.gdpcs.player.recordList.get",
                            limit: t,
                            offset: e
                        });
                        if (o.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const e = new Map();
                            e.set("code", o.rtnCode.toString()),
                            e.set("msg", null !== (r = o.msg) && void 0 !== r ? r : "queryRecordList error"),
                            haStore.delayReport(1, "20200001", e),
                            haStore.delayReport(0, "20200001", e);
                        }
                        return o;
                    });
                }
                queryRecordById(e) {
                    var t;
                    return __awaiter(this, void 0, void 0, function*() {
                        Logger.info({
                            eventType: "queryRecordById",
                            playerId: this.playerId,
                            recordId: e
                        });
                        const r = yield Request.post(Common.obeUrl, {
                            method: "client.gdpcs.record.get",
                            recordId: e
                        });
                        if (r.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const e = new Map();
                            e.set("code", r.rtnCode.toString()),
                            e.set("msg", null !== (t = r.msg) && void 0 !== t ? t : "queryRecordById error"),
                            haStore.delayReport(1, "20200002", e),
                            haStore.delayReport(0, "20200002", e);
                        }
                        return r;
                    });
                }
                getAvailableRooms(e) {
                    return __awaiter(this, void 0, void 0, function*() {
                        Logger.info({
                            eventType: "getAvailableRooms_start",
                            playerId: this.playerId
                        });
                        const {rooms: t, count: r, offset: o, hasNext: n} = yield Request.post(Common.obeUrl, Object.assign({
                            method: "client.gobe.room.list.query"
                        }, e));
                        return Logger.info({
                            eventType: "getAvailableRooms_end",
                            playerId: this.playerId,
                            count: r
                        }),
                        {
                            rooms: t,
                            count: r,
                            offset: o,
                            hasNext: n
                        };
                    });
                }
                matchRoom(e, t) {
                    return __awaiter(this, void 0, void 0, function*() {
                        Logger.info({
                            eventType: "matchRoom_start",
                            playerId: this.playerId
                        }),
                        this.checkMatching(),
                        this._isMatching = !0;
                        const r = this._pollInterval
                          , o = Date.now()
                          , n = () => new Promise( (t, s) => {
                            Request.post(Common.obeUrl, Object.assign({
                                method: "client.gobe.room.match"
                            }, e)).then(e => {
                                this._isMatching = !1,
                                t(e.roomId);
                            }
                            ).catch(e => {
                                var i, a, l;
                                if ((null == e ? void 0 : e.code) == exports.ErrorCode.ROOM_MATCHING)
                                    setTimeout( () => {
                                        t(n());
                                    }
                                    , r);
                                else if (Date.now() - o >= 3e5) {
                                    this._isMatching = !1;
                                    const t = new Map();
                                    t.set("code", exports.ErrorCode.ROOM_MATCH_TIMEOUT.toString()),
                                    t.set("msg", null !== (i = null == e ? void 0 : e.msg) && void 0 !== i ? i : "match room timeout"),
                                    haStore.delayReport(1, "20104001", t),
                                    s(GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.ROOM_MATCH_TIMEOUT, "match timeout"));
                                } else {
                                    this._isMatching = !1;
                                    const t = new Map();
                                    t.set("code", null === (a = null == e ? void 0 : e.code) || void 0 === a ? void 0 : a.toString()),
                                    t.set("msg", null !== (l = null == e ? void 0 : e.msg) && void 0 !== l ? l : "match room err"),
                                    haStore.delayReport(1, "20104001", t),
                                    s(e);
                                }
                            }
                            );
                        }
                        )
                          , s = yield n();
                        return Logger.info({
                            eventType: "matchRoom_end",
                            playerId: this.playerId,
                            roomId: s
                        }),
                        this.joinRoom(s, t);
                    });
                }
                matchPlayer(e, t) {
                    return __awaiter(this, void 0, void 0, function*() {
                        Logger.info({
                            eventType: "matchPlayer_start",
                            playerId: this.playerId
                        }),
                        this.checkMatching(),
                        this._isMatching = !0;
                        return this.matchStart( () => Request.post(Common.obeUrl, Object.assign({
                            method: "client.gobe.online.match"
                        }, e), void 0, !1), "matchPlayer", t);
                    });
                }
                matchGroup(e, t) {
                    var r, o;
                    return __awaiter(this, void 0, void 0, function*() {
                        if (Logger.info({
                            eventType: "matchGroup_start",
                            playerId: this.playerId
                        }),
                        this.checkMatching(),
                        this._isMatching = !0,
                        (null === (r = this._group) || void 0 === r ? void 0 : r.ownerId) == this.playerId) {
                            const t = yield Request.post(Common.obeUrl, {
                                method: "client.gobe.group.change",
                                groupId: this.groupId,
                                isLock: 1
                            }, {}, !1);
                            if (t.rtnCode != exports.ErrorCode.COMMON_OK) {
                                const e = new Map();
                                throw e.set("code", t.rtnCode.toString()),
                                e.set("msg", null !== (o = t.msg) && void 0 !== o ? o : ""),
                                haStore.delayReport(1, "20105007", e),
                                GOBEErrorBuilder.buildGOBEError(t.rtnCode, t.msg);
                            }
                            const {players: r} = t.groupInfo;
                            if (r.length != e.playerInfos.length) {
                                this._isMatching = !1;
                                const e = new Map();
                                throw e.set("code", exports.ErrorCode.SDK_GROUP_MEMBERS_ERR.toString()),
                                e.set("msg", "Group members error!"),
                                haStore.delayReport(1, "20105007", e),
                                GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.SDK_GROUP_MEMBERS_ERR, "Group members error!");
                            }
                            const n = r.map(e => e.playerId)
                              , s = new Set(n);
                            for (const {playerId: t} of e.playerInfos)
                                if (!s.has(t)) {
                                    this._isMatching = !1;
                                    const e = new Map();
                                    throw e.set("code", exports.ErrorCode.SDK_GROUP_MEMBERS_ERR.toString()),
                                    e.set("msg", "Group members error!"),
                                    haStore.delayReport(1, "20105007", e),
                                    GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.SDK_GROUP_MEMBERS_ERR, "Group members error!");
                                }
                        }
                        return this.matchStart( () => Request.post(Common.obeUrl, Object.assign({
                            method: "client.gobe.group.match"
                        }, e), void 0, !1), "matchGroup", t);
                    });
                }
                matchStart(e, t, r) {
                    return new Promise( (o, n) => {
                        e().then(e => __awaiter(this, void 0, void 0, function*() {
                            var s;
                            if (e.rtnCode == exports.ErrorCode.PLAYER_MATCHING)
                                this.matchQuery(r),
                                e.rtnCode = exports.ErrorCode.COMMON_OK,
                                o(e);
                            else if (e.rtnCode == exports.ErrorCode.COMMON_OK) {
                                o(e);
                                const t = yield this.matchResponseHandler(e, r);
                                this.onMatch.emit(t),
                                this._isMatching = !1;
                            } else {
                                this._isMatching = !1;
                                const r = new Map();
                                r.set("code", e.rtnCode.toString()),
                                r.set("msg", null !== (s = e.msg) && void 0 !== s ? s : ""),
                                haStore.delayReport(1, "matchPlayer" == t ? "20104002" : "20104003", r),
                                n(e);
                            }
                        })).catch(e => {
                            var r, o;
                            this._isMatching = !1;
                            const s = new Map();
                            s.set("code", null === (r = null == e ? void 0 : e.rtnCode) || void 0 === r ? void 0 : r.toString()),
                            s.set("msg", null !== (o = null == e ? void 0 : e.msg) && void 0 !== o ? o : ""),
                            haStore.delayReport(1, "matchPlayer" == t ? "20104002" : "20104003", s),
                            n(e);
                        }
                        ).finally( () => {
                            Logger.info({
                                eventType: `${t}_end`,
                                playerId: this.playerId
                            });
                        }
                        );
                    }
                    );
                }
                matchQuery(e) {
                    Logger.info({
                        eventType: "onMatch_start",
                        playerId: this.playerId
                    }),
                    this._isMatching = !0;
                    const t = this._pollInterval
                      , r = () => {
                        Request.post(Common.obeUrl, {
                            method: "client.gobe.match.query"
                        }, void 0, !1).then(o => __awaiter(this, void 0, void 0, function*() {
                            const n = yield this.matchResponseHandler(o, e);
                            n.rtnCode === exports.ErrorCode.PLAYER_MATCHING ? setTimeout( () => r(), t) : (this._isMatching = !1,
                            this.onMatch.emit(n),
                            Logger.info({
                                eventType: "onMatch_end",
                                playerId: this.playerId
                            }));
                        })).catch(e => {
                            this._isMatching = !1;
                            const t = Object.assign({
                                rtnCode: exports.ErrorCode.CLIENT_COMMON_ERR,
                                msg: `http request error ${e.status}`
                            }, e)
                              , r = new Map();
                            r.set("code", t.rtnCode.toString()),
                            r.set("msg", t.msg),
                            haStore.delayReport(1, "20104005", r),
                            this.onMatch.emit(t),
                            Logger.info({
                                eventType: "onMatch_end",
                                playerId: this.playerId
                            });
                        }
                        );
                    }
                    ;
                    r();
                }
                matchResponseHandler(e, t) {
                    return __awaiter(this, void 0, void 0, function*() {
                        const r = {
                            rtnCode: e.rtnCode,
                            msg: e.msg
                        };
                        if (e.rtnCode == exports.ErrorCode.COMMON_OK)
                            if (e.roomId)
                                try {
                                    r.room = yield this.joinRoom(e.roomId, t);
                                } catch (e) {
                                    r.rtnCode = e.code,
                                    r.msg = e.message;
                                }
                            else
                                r.rtnCode = exports.ErrorCode.PLAYER_MATCH_ROOM_NULL,
                                r.msg = "roomId is null";
                        return r;
                    });
                }
                cancelMatch() {
                    var e;
                    return __awaiter(this, void 0, void 0, function*() {
                        Logger.info({
                            eventType: "cancelMatch_start",
                            playerId: this.playerId
                        });
                        const t = yield Request.post(Common.obeUrl, {
                            method: "client.gobe.match.cancel"
                        }, {}, !1);
                        if (t.rtnCode != exports.ErrorCode.COMMON_OK) {
                            const r = new Map();
                            throw r.set("code", t.rtnCode.toString()),
                            r.set("msg", null !== (e = t.msg) && void 0 !== e ? e : ""),
                            haStore.delayReport(1, "20104006", r),
                            GOBEErrorBuilder.buildGOBEError(t.rtnCode, t.msg);
                        }
                        return Logger.info({
                            eventType: "cancelMatch_end",
                            playerId: this.playerId
                        }),
                        t;
                    });
                }
                removeAllListeners() {
                    [this.onMatch, this.onInitResult, this.onJoinRoomFailed].forEach(e => e.clear());
                }
                destroy() {
                    var e, t;
                    return __awaiter(this, void 0, void 0, function*() {
                        null === (e = this._room) || void 0 === e || e.removeAllListeners(),
                        this._room = null,
                        null === (t = this._group) || void 0 === t || t.removeAllListeners(),
                        this._group = null,
                        this._isMatching = !1,
                        this._loginTimestamp = 0,
                        this.setRoomId(""),
                        this.setGroupId(""),
                        this.setLastRoomId(""),
                        this.setLastGroupId(""),
                        this.setPlayerId(""),
                        this.setServiceToken(""),
                        this.setState(0),
                        this.connection.close(),
                        this.removeAllListener(),
                        haStore.report(),
                        haStore.stopAutoReport();
                    });
                }
                onStateChange(e) {
                    return __awaiter(this, void 0, void 0, function*() {
                        1 == e && (this.setRoomId(""),
                        this._room = null);
                    });
                }
                onEventNotify(e) {
                    return __awaiter(this, void 0, void 0, function*() {
                        switch (e) {
                        case 0:
                        case 1:
                            this.setGroupId(""),
                            this._group = null;
                        }
                    });
                }
                checkMatching() {
                    if (this._isMatching) {
                        const e = new Map();
                        throw e.set("code", exports.ErrorCode.SDK_MATCHING.toString()),
                        e.set("msg", "You are already in matching!"),
                        haStore.delayReport(1, "20104005", e),
                        GOBEErrorBuilder.buildGOBEError(exports.ErrorCode.SDK_MATCHING, "You are already in matching!");
                    }
                    return !0;
                }
                setPlatform(e) {
                    Platform.isHuaweiQuickGame() ? Platform.platform = exports.PlatformType.HUAWEI_QG_GAME : Platform.platform = null != e ? e : exports.PlatformType.OTHERS;
                }
                onWsMessage(e) {
                    var t, r;
                    const o = ServerMessage.decode(new Uint8Array(e.data))
                      , {code: n} = o.toJSON()
                      , {msg: s} = o;
                    switch (n) {
                    case 1:
                        {
                            Logger.info({
                                eventType: "wsMsg loginAck"
                            });
                            const e = null !== (t = AckMessage.decode(s).toJSON().rtnCode) && void 0 !== t ? t : exports.ErrorCode.COMMON_OK;
                            if (e == exports.ErrorCode.COMMON_OK)
                                this.connection.startHeartbeat();
                            else {
                                const t = new Map();
                                t.set("code", e.toString()),
                                t.set("msg", "sdk init failed!"),
                                haStore.delayReport(1, "20101001", t);
                            }
                            this._initStatus && (this._initStatus = !1,
                            this.onInitResult.emit(e));
                            break;
                        }
                    case 3:
                        {
                            const e = null !== (r = AckMessage.decode(s).toJSON().rtnCode) && void 0 !== r ? r : exports.ErrorCode.COMMON_OK;
                            Logger.debug({
                                eventType: "wsMsg heartbeatAck rtnCode=" + e
                            }),
                            this.connection.heartBeatCount = 0;
                            break;
                        }
                    case 37:
                        this.joinRoomACKHandle(AckMessage.decode(s).toJSON());
                    }
                }
                onWsClose(e) {
                    var t;
                    return __awaiter(this, void 0, void 0, function*() {
                        null === (t = this._room) || void 0 === t || t.onWsClose(e),
                        this.isReconnectStatus || (this.setReconnectStatus(!0),
                        yield this.autoReconnect());
                    });
                }
                autoReconnect() {
                    return __awaiter(this, void 0, void 0, function*() {
                        try {
                            Logger.info({
                                eventType: "ws autoReconnect"
                            });
                            const {configParam: e} = yield Common.requestGameConfig();
                            for (yield this.connect(e.protocol); !this.connection.isOpen(); ) {
                                if (0 == this.state)
                                    return;
                                if (this.connection.isConnecting() && (yield Common.sleep(this.reconnectIntervalSeconds)),
                                this.connection.isClosing() || this.connection.isClosed()) {
                                    const {configParam: e} = yield Common.requestGameConfig();
                                    yield this.connect(e.protocol);
                                }
                            }
                            this.setReconnectStatus(!1);
                        } catch (e) {
                            "GOBE Error" == e.name && e.code != exports.ErrorCode.COMMON_ERR && e.code != exports.ErrorCode.NETWORK_ERR && e.code == exports.ErrorCode.TOKEN_INVALID || (yield Common.sleep(this.reconnectIntervalSeconds),
                            yield this.autoReconnect());
                        }
                    });
                }
                joinRoomACKHandle(e) {
                    var t, r;
                    if (Logger.info({
                        eventType: "wsMsg joinRoomAck"
                    }),
                    e.rtnCode && e.rtnCode != exports.ErrorCode.COMMON_OK) {
                        const o = new Map();
                        o.set("roomId", this.roomId),
                        o.set("code", e.rtnCode.toString()),
                        o.set("msg", null !== (t = e.msg) && void 0 !== t ? t : ""),
                        haStore.delayReport(1, "20103002", o),
                        this.onJoinRoomFailed.handlerLength() > 0 ? this.onJoinRoomFailed.emit(GOBEErrorBuilder.buildGOBEError(e.rtnCode, e.msg)) : this._room && (null === (r = this._room.onJoinFailed) || void 0 === r || r.emit(GOBEErrorBuilder.buildGOBEError(e.rtnCode, e.msg)));
                    }
                }
                removeAllListener() {
                    this.removeListener(1),
                    this.removeListener(3),
                    this.removeListener(37),
                    this.removeListener(1e3);
                }
            }
            class Random {
                constructor(e) {
                    if (this.mask = 123459876,
                    this.m = 2147483647,
                    this.a = 16807,
                    "number" != typeof e || e != e || e % 1 != 0 || e < 1)
                        throw new TypeError("Seed must be a positive integer.");
                    this.seed = e % 1e8;
                }
                getNumber() {
                    this.seed = this.seed ^ this.mask,
                    this.seed = this.a * this.seed % this.m;
                    const e = this.seed / this.m;
                    return this.seed = this.seed ^ this.mask,
                    e;
                }
            }
            exports.Base = Base,
            exports.Client = Client,
            exports.EventEmitter = EventEmitter,
            exports.GOBEError = GOBEError,
            exports.Group = Group,
            exports.Logger = Logger,
            exports.Player = Player,
            exports.RandomUtils = Random,
            exports.Room = Room,
            Object.defineProperty(exports, "__esModule", {
                value: !0
            });
        });
    }
    ).call(root);
}
)(// The environment-specific global.
function() {
    if (typeof globalThis !== 'undefined')
        return globalThis;
    if (typeof self !== 'undefined')
        return self;
    if (typeof window !== 'undefined')
        return window;
    if (typeof global !== 'undefined')
        return global;
    if (typeof this !== 'undefined')
        return this;
    return {};
}
.call(this));

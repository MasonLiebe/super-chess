(async ()=>{
    (function() {
        const u = document.createElement("link").relList;
        if (u && u.supports && u.supports("modulepreload")) return;
        for (const d of document.querySelectorAll('link[rel="modulepreload"]'))r(d);
        new MutationObserver((d)=>{
            for (const m of d)if (m.type === "childList") for (const p of m.addedNodes)p.tagName === "LINK" && p.rel === "modulepreload" && r(p);
        }).observe(document, {
            childList: !0,
            subtree: !0
        });
        function o(d) {
            const m = {};
            return d.integrity && (m.integrity = d.integrity), d.referrerPolicy && (m.referrerPolicy = d.referrerPolicy), d.crossOrigin === "use-credentials" ? m.credentials = "include" : d.crossOrigin === "anonymous" ? m.credentials = "omit" : m.credentials = "same-origin", m;
        }
        function r(d) {
            if (d.ep) return;
            d.ep = !0;
            const m = o(d);
            fetch(d.href, m);
        }
    })();
    function ry(s) {
        return s && s.__esModule && Object.prototype.hasOwnProperty.call(s, "default") ? s.default : s;
    }
    var ur = {
        exports: {}
    }, ti = {};
    var qh;
    function oy() {
        if (qh) return ti;
        qh = 1;
        var s = Symbol.for("react.transitional.element"), u = Symbol.for("react.fragment");
        function o(r, d, m) {
            var p = null;
            if (m !== void 0 && (p = "" + m), d.key !== void 0 && (p = "" + d.key), "key" in d) {
                m = {};
                for(var b in d)b !== "key" && (m[b] = d[b]);
            } else m = d;
            return d = m.ref, {
                $$typeof: s,
                type: r,
                key: p,
                ref: d !== void 0 ? d : null,
                props: m
            };
        }
        return ti.Fragment = u, ti.jsx = o, ti.jsxs = o, ti;
    }
    var Gh;
    function fy() {
        return Gh || (Gh = 1, ur.exports = oy()), ur.exports;
    }
    var c = fy(), rr = {
        exports: {}
    }, he = {};
    var Yh;
    function dy() {
        if (Yh) return he;
        Yh = 1;
        var s = Symbol.for("react.transitional.element"), u = Symbol.for("react.portal"), o = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), d = Symbol.for("react.profiler"), m = Symbol.for("react.consumer"), p = Symbol.for("react.context"), b = Symbol.for("react.forward_ref"), v = Symbol.for("react.suspense"), y = Symbol.for("react.memo"), N = Symbol.for("react.lazy"), w = Symbol.for("react.activity"), O = Symbol.iterator;
        function V(T) {
            return T === null || typeof T != "object" ? null : (T = O && T[O] || T["@@iterator"], typeof T == "function" ? T : null);
        }
        var L = {
            isMounted: function() {
                return !1;
            },
            enqueueForceUpdate: function() {},
            enqueueReplaceState: function() {},
            enqueueSetState: function() {}
        }, M = Object.assign, R = {};
        function X(T, k, Z) {
            this.props = T, this.context = k, this.refs = R, this.updater = Z || L;
        }
        X.prototype.isReactComponent = {}, X.prototype.setState = function(T, k) {
            if (typeof T != "object" && typeof T != "function" && T != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
            this.updater.enqueueSetState(this, T, k, "setState");
        }, X.prototype.forceUpdate = function(T) {
            this.updater.enqueueForceUpdate(this, T, "forceUpdate");
        };
        function H() {}
        H.prototype = X.prototype;
        function Y(T, k, Z) {
            this.props = T, this.context = k, this.refs = R, this.updater = Z || L;
        }
        var J = Y.prototype = new H;
        J.constructor = Y, M(J, X.prototype), J.isPureReactComponent = !0;
        var W = Array.isArray;
        function ae() {}
        var P = {
            H: null,
            A: null,
            T: null,
            S: null
        }, be = Object.prototype.hasOwnProperty;
        function Q(T, k, Z) {
            var $ = Z.ref;
            return {
                $$typeof: s,
                type: T,
                key: k,
                ref: $ !== void 0 ? $ : null,
                props: Z
            };
        }
        function ee(T, k) {
            return Q(T.type, k, T.props);
        }
        function te(T) {
            return typeof T == "object" && T !== null && T.$$typeof === s;
        }
        function ne(T) {
            var k = {
                "=": "=0",
                ":": "=2"
            };
            return "$" + T.replace(/[=:]/g, function(Z) {
                return k[Z];
            });
        }
        var re = /\/+/g;
        function xe(T, k) {
            return typeof T == "object" && T !== null && T.key != null ? ne("" + T.key) : k.toString(36);
        }
        function de(T) {
            switch(T.status){
                case "fulfilled":
                    return T.value;
                case "rejected":
                    throw T.reason;
                default:
                    switch(typeof T.status == "string" ? T.then(ae, ae) : (T.status = "pending", T.then(function(k) {
                        T.status === "pending" && (T.status = "fulfilled", T.value = k);
                    }, function(k) {
                        T.status === "pending" && (T.status = "rejected", T.reason = k);
                    })), T.status){
                        case "fulfilled":
                            return T.value;
                        case "rejected":
                            throw T.reason;
                    }
            }
            throw T;
        }
        function S(T, k, Z, $, se) {
            var fe = typeof T;
            (fe === "undefined" || fe === "boolean") && (T = null);
            var Ne = !1;
            if (T === null) Ne = !0;
            else switch(fe){
                case "bigint":
                case "string":
                case "number":
                    Ne = !0;
                    break;
                case "object":
                    switch(T.$$typeof){
                        case s:
                        case u:
                            Ne = !0;
                            break;
                        case N:
                            return Ne = T._init, S(Ne(T._payload), k, Z, $, se);
                    }
            }
            if (Ne) return se = se(T), Ne = $ === "" ? "." + xe(T, 0) : $, W(se) ? (Z = "", Ne != null && (Z = Ne.replace(re, "$&/") + "/"), S(se, k, Z, "", function(ll) {
                return ll;
            })) : se != null && (te(se) && (se = ee(se, Z + (se.key == null || T && T.key === se.key ? "" : ("" + se.key).replace(re, "$&/") + "/") + Ne)), k.push(se)), 1;
            Ne = 0;
            var Pe = $ === "" ? "." : $ + ":";
            if (W(T)) for(var He = 0; He < T.length; He++)$ = T[He], fe = Pe + xe($, He), Ne += S($, k, Z, fe, se);
            else if (He = V(T), typeof He == "function") for(T = He.call(T), He = 0; !($ = T.next()).done;)$ = $.value, fe = Pe + xe($, He++), Ne += S($, k, Z, fe, se);
            else if (fe === "object") {
                if (typeof T.then == "function") return S(de(T), k, Z, $, se);
                throw k = String(T), Error("Objects are not valid as a React child (found: " + (k === "[object Object]" ? "object with keys {" + Object.keys(T).join(", ") + "}" : k) + "). If you meant to render a collection of children, use an array instead.");
            }
            return Ne;
        }
        function z(T, k, Z) {
            if (T == null) return T;
            var $ = [], se = 0;
            return S(T, $, "", "", function(fe) {
                return k.call(Z, fe, se++);
            }), $;
        }
        function B(T) {
            if (T._status === -1) {
                var k = T._result;
                k = k(), k.then(function(Z) {
                    (T._status === 0 || T._status === -1) && (T._status = 1, T._result = Z);
                }, function(Z) {
                    (T._status === 0 || T._status === -1) && (T._status = 2, T._result = Z);
                }), T._status === -1 && (T._status = 0, T._result = k);
            }
            if (T._status === 1) return T._result.default;
            throw T._result;
        }
        var K = typeof reportError == "function" ? reportError : function(T) {
            if (typeof window == "object" && typeof window.ErrorEvent == "function") {
                var k = new window.ErrorEvent("error", {
                    bubbles: !0,
                    cancelable: !0,
                    message: typeof T == "object" && T !== null && typeof T.message == "string" ? String(T.message) : String(T),
                    error: T
                });
                if (!window.dispatchEvent(k)) return;
            } else if (typeof process == "object" && typeof process.emit == "function") {
                process.emit("uncaughtException", T);
                return;
            }
            console.error(T);
        }, ie = {
            map: z,
            forEach: function(T, k, Z) {
                z(T, function() {
                    k.apply(this, arguments);
                }, Z);
            },
            count: function(T) {
                var k = 0;
                return z(T, function() {
                    k++;
                }), k;
            },
            toArray: function(T) {
                return z(T, function(k) {
                    return k;
                }) || [];
            },
            only: function(T) {
                if (!te(T)) throw Error("React.Children.only expected to receive a single React element child.");
                return T;
            }
        };
        return he.Activity = w, he.Children = ie, he.Component = X, he.Fragment = o, he.Profiler = d, he.PureComponent = Y, he.StrictMode = r, he.Suspense = v, he.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = P, he.__COMPILER_RUNTIME = {
            __proto__: null,
            c: function(T) {
                return P.H.useMemoCache(T);
            }
        }, he.cache = function(T) {
            return function() {
                return T.apply(null, arguments);
            };
        }, he.cacheSignal = function() {
            return null;
        }, he.cloneElement = function(T, k, Z) {
            if (T == null) throw Error("The argument must be a React element, but you passed " + T + ".");
            var $ = M({}, T.props), se = T.key;
            if (k != null) for(fe in k.key !== void 0 && (se = "" + k.key), k)!be.call(k, fe) || fe === "key" || fe === "__self" || fe === "__source" || fe === "ref" && k.ref === void 0 || ($[fe] = k[fe]);
            var fe = arguments.length - 2;
            if (fe === 1) $.children = Z;
            else if (1 < fe) {
                for(var Ne = Array(fe), Pe = 0; Pe < fe; Pe++)Ne[Pe] = arguments[Pe + 2];
                $.children = Ne;
            }
            return Q(T.type, se, $);
        }, he.createContext = function(T) {
            return T = {
                $$typeof: p,
                _currentValue: T,
                _currentValue2: T,
                _threadCount: 0,
                Provider: null,
                Consumer: null
            }, T.Provider = T, T.Consumer = {
                $$typeof: m,
                _context: T
            }, T;
        }, he.createElement = function(T, k, Z) {
            var $, se = {}, fe = null;
            if (k != null) for($ in k.key !== void 0 && (fe = "" + k.key), k)be.call(k, $) && $ !== "key" && $ !== "__self" && $ !== "__source" && (se[$] = k[$]);
            var Ne = arguments.length - 2;
            if (Ne === 1) se.children = Z;
            else if (1 < Ne) {
                for(var Pe = Array(Ne), He = 0; He < Ne; He++)Pe[He] = arguments[He + 2];
                se.children = Pe;
            }
            if (T && T.defaultProps) for($ in Ne = T.defaultProps, Ne)se[$] === void 0 && (se[$] = Ne[$]);
            return Q(T, fe, se);
        }, he.createRef = function() {
            return {
                current: null
            };
        }, he.forwardRef = function(T) {
            return {
                $$typeof: b,
                render: T
            };
        }, he.isValidElement = te, he.lazy = function(T) {
            return {
                $$typeof: N,
                _payload: {
                    _status: -1,
                    _result: T
                },
                _init: B
            };
        }, he.memo = function(T, k) {
            return {
                $$typeof: y,
                type: T,
                compare: k === void 0 ? null : k
            };
        }, he.startTransition = function(T) {
            var k = P.T, Z = {};
            P.T = Z;
            try {
                var $ = T(), se = P.S;
                se !== null && se(Z, $), typeof $ == "object" && $ !== null && typeof $.then == "function" && $.then(ae, K);
            } catch (fe) {
                K(fe);
            } finally{
                k !== null && Z.types !== null && (k.types = Z.types), P.T = k;
            }
        }, he.unstable_useCacheRefresh = function() {
            return P.H.useCacheRefresh();
        }, he.use = function(T) {
            return P.H.use(T);
        }, he.useActionState = function(T, k, Z) {
            return P.H.useActionState(T, k, Z);
        }, he.useCallback = function(T, k) {
            return P.H.useCallback(T, k);
        }, he.useContext = function(T) {
            return P.H.useContext(T);
        }, he.useDebugValue = function() {}, he.useDeferredValue = function(T, k) {
            return P.H.useDeferredValue(T, k);
        }, he.useEffect = function(T, k) {
            return P.H.useEffect(T, k);
        }, he.useEffectEvent = function(T) {
            return P.H.useEffectEvent(T);
        }, he.useId = function() {
            return P.H.useId();
        }, he.useImperativeHandle = function(T, k, Z) {
            return P.H.useImperativeHandle(T, k, Z);
        }, he.useInsertionEffect = function(T, k) {
            return P.H.useInsertionEffect(T, k);
        }, he.useLayoutEffect = function(T, k) {
            return P.H.useLayoutEffect(T, k);
        }, he.useMemo = function(T, k) {
            return P.H.useMemo(T, k);
        }, he.useOptimistic = function(T, k) {
            return P.H.useOptimistic(T, k);
        }, he.useReducer = function(T, k, Z) {
            return P.H.useReducer(T, k, Z);
        }, he.useRef = function(T) {
            return P.H.useRef(T);
        }, he.useState = function(T) {
            return P.H.useState(T);
        }, he.useSyncExternalStore = function(T, k, Z) {
            return P.H.useSyncExternalStore(T, k, Z);
        }, he.useTransition = function() {
            return P.H.useTransition();
        }, he.version = "19.2.3", he;
    }
    var Vh;
    function Ar() {
        return Vh || (Vh = 1, rr.exports = dy()), rr.exports;
    }
    var x = Ar();
    const Ms = ry(x);
    var or = {
        exports: {}
    }, li = {}, fr = {
        exports: {}
    }, dr = {};
    var Xh;
    function hy() {
        return Xh || (Xh = 1, (function(s) {
            function u(S, z) {
                var B = S.length;
                S.push(z);
                e: for(; 0 < B;){
                    var K = B - 1 >>> 1, ie = S[K];
                    if (0 < d(ie, z)) S[K] = z, S[B] = ie, B = K;
                    else break e;
                }
            }
            function o(S) {
                return S.length === 0 ? null : S[0];
            }
            function r(S) {
                if (S.length === 0) return null;
                var z = S[0], B = S.pop();
                if (B !== z) {
                    S[0] = B;
                    e: for(var K = 0, ie = S.length, T = ie >>> 1; K < T;){
                        var k = 2 * (K + 1) - 1, Z = S[k], $ = k + 1, se = S[$];
                        if (0 > d(Z, B)) $ < ie && 0 > d(se, Z) ? (S[K] = se, S[$] = B, K = $) : (S[K] = Z, S[k] = B, K = k);
                        else if ($ < ie && 0 > d(se, B)) S[K] = se, S[$] = B, K = $;
                        else break e;
                    }
                }
                return z;
            }
            function d(S, z) {
                var B = S.sortIndex - z.sortIndex;
                return B !== 0 ? B : S.id - z.id;
            }
            if (s.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
                var m = performance;
                s.unstable_now = function() {
                    return m.now();
                };
            } else {
                var p = Date, b = p.now();
                s.unstable_now = function() {
                    return p.now() - b;
                };
            }
            var v = [], y = [], N = 1, w = null, O = 3, V = !1, L = !1, M = !1, R = !1, X = typeof setTimeout == "function" ? setTimeout : null, H = typeof clearTimeout == "function" ? clearTimeout : null, Y = typeof setImmediate < "u" ? setImmediate : null;
            function J(S) {
                for(var z = o(y); z !== null;){
                    if (z.callback === null) r(y);
                    else if (z.startTime <= S) r(y), z.sortIndex = z.expirationTime, u(v, z);
                    else break;
                    z = o(y);
                }
            }
            function W(S) {
                if (M = !1, J(S), !L) if (o(v) !== null) L = !0, ae || (ae = !0, ne());
                else {
                    var z = o(y);
                    z !== null && de(W, z.startTime - S);
                }
            }
            var ae = !1, P = -1, be = 5, Q = -1;
            function ee() {
                return R ? !0 : !(s.unstable_now() - Q < be);
            }
            function te() {
                if (R = !1, ae) {
                    var S = s.unstable_now();
                    Q = S;
                    var z = !0;
                    try {
                        e: {
                            L = !1, M && (M = !1, H(P), P = -1), V = !0;
                            var B = O;
                            try {
                                t: {
                                    for(J(S), w = o(v); w !== null && !(w.expirationTime > S && ee());){
                                        var K = w.callback;
                                        if (typeof K == "function") {
                                            w.callback = null, O = w.priorityLevel;
                                            var ie = K(w.expirationTime <= S);
                                            if (S = s.unstable_now(), typeof ie == "function") {
                                                w.callback = ie, J(S), z = !0;
                                                break t;
                                            }
                                            w === o(v) && r(v), J(S);
                                        } else r(v);
                                        w = o(v);
                                    }
                                    if (w !== null) z = !0;
                                    else {
                                        var T = o(y);
                                        T !== null && de(W, T.startTime - S), z = !1;
                                    }
                                }
                                break e;
                            } finally{
                                w = null, O = B, V = !1;
                            }
                            z = void 0;
                        }
                    } finally{
                        z ? ne() : ae = !1;
                    }
                }
            }
            var ne;
            if (typeof Y == "function") ne = function() {
                Y(te);
            };
            else if (typeof MessageChannel < "u") {
                var re = new MessageChannel, xe = re.port2;
                re.port1.onmessage = te, ne = function() {
                    xe.postMessage(null);
                };
            } else ne = function() {
                X(te, 0);
            };
            function de(S, z) {
                P = X(function() {
                    S(s.unstable_now());
                }, z);
            }
            s.unstable_IdlePriority = 5, s.unstable_ImmediatePriority = 1, s.unstable_LowPriority = 4, s.unstable_NormalPriority = 3, s.unstable_Profiling = null, s.unstable_UserBlockingPriority = 2, s.unstable_cancelCallback = function(S) {
                S.callback = null;
            }, s.unstable_forceFrameRate = function(S) {
                0 > S || 125 < S ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : be = 0 < S ? Math.floor(1e3 / S) : 5;
            }, s.unstable_getCurrentPriorityLevel = function() {
                return O;
            }, s.unstable_next = function(S) {
                switch(O){
                    case 1:
                    case 2:
                    case 3:
                        var z = 3;
                        break;
                    default:
                        z = O;
                }
                var B = O;
                O = z;
                try {
                    return S();
                } finally{
                    O = B;
                }
            }, s.unstable_requestPaint = function() {
                R = !0;
            }, s.unstable_runWithPriority = function(S, z) {
                switch(S){
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                    case 5:
                        break;
                    default:
                        S = 3;
                }
                var B = O;
                O = S;
                try {
                    return z();
                } finally{
                    O = B;
                }
            }, s.unstable_scheduleCallback = function(S, z, B) {
                var K = s.unstable_now();
                switch(typeof B == "object" && B !== null ? (B = B.delay, B = typeof B == "number" && 0 < B ? K + B : K) : B = K, S){
                    case 1:
                        var ie = -1;
                        break;
                    case 2:
                        ie = 250;
                        break;
                    case 5:
                        ie = 1073741823;
                        break;
                    case 4:
                        ie = 1e4;
                        break;
                    default:
                        ie = 5e3;
                }
                return ie = B + ie, S = {
                    id: N++,
                    callback: z,
                    priorityLevel: S,
                    startTime: B,
                    expirationTime: ie,
                    sortIndex: -1
                }, B > K ? (S.sortIndex = B, u(y, S), o(v) === null && S === o(y) && (M ? (H(P), P = -1) : M = !0, de(W, B - K))) : (S.sortIndex = ie, u(v, S), L || V || (L = !0, ae || (ae = !0, ne()))), S;
            }, s.unstable_shouldYield = ee, s.unstable_wrapCallback = function(S) {
                var z = O;
                return function() {
                    var B = O;
                    O = z;
                    try {
                        return S.apply(this, arguments);
                    } finally{
                        O = B;
                    }
                };
            };
        })(dr)), dr;
    }
    var Qh;
    function my() {
        return Qh || (Qh = 1, fr.exports = hy()), fr.exports;
    }
    var hr = {
        exports: {}
    }, dt = {};
    var Zh;
    function py() {
        if (Zh) return dt;
        Zh = 1;
        var s = Ar();
        function u(v) {
            var y = "https://react.dev/errors/" + v;
            if (1 < arguments.length) {
                y += "?args[]=" + encodeURIComponent(arguments[1]);
                for(var N = 2; N < arguments.length; N++)y += "&args[]=" + encodeURIComponent(arguments[N]);
            }
            return "Minified React error #" + v + "; visit " + y + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
        }
        function o() {}
        var r = {
            d: {
                f: o,
                r: function() {
                    throw Error(u(522));
                },
                D: o,
                C: o,
                L: o,
                m: o,
                X: o,
                S: o,
                M: o
            },
            p: 0,
            findDOMNode: null
        }, d = Symbol.for("react.portal");
        function m(v, y, N) {
            var w = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
            return {
                $$typeof: d,
                key: w == null ? null : "" + w,
                children: v,
                containerInfo: y,
                implementation: N
            };
        }
        var p = s.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
        function b(v, y) {
            if (v === "font") return "";
            if (typeof y == "string") return y === "use-credentials" ? y : "";
        }
        return dt.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = r, dt.createPortal = function(v, y) {
            var N = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
            if (!y || y.nodeType !== 1 && y.nodeType !== 9 && y.nodeType !== 11) throw Error(u(299));
            return m(v, y, null, N);
        }, dt.flushSync = function(v) {
            var y = p.T, N = r.p;
            try {
                if (p.T = null, r.p = 2, v) return v();
            } finally{
                p.T = y, r.p = N, r.d.f();
            }
        }, dt.preconnect = function(v, y) {
            typeof v == "string" && (y ? (y = y.crossOrigin, y = typeof y == "string" ? y === "use-credentials" ? y : "" : void 0) : y = null, r.d.C(v, y));
        }, dt.prefetchDNS = function(v) {
            typeof v == "string" && r.d.D(v);
        }, dt.preinit = function(v, y) {
            if (typeof v == "string" && y && typeof y.as == "string") {
                var N = y.as, w = b(N, y.crossOrigin), O = typeof y.integrity == "string" ? y.integrity : void 0, V = typeof y.fetchPriority == "string" ? y.fetchPriority : void 0;
                N === "style" ? r.d.S(v, typeof y.precedence == "string" ? y.precedence : void 0, {
                    crossOrigin: w,
                    integrity: O,
                    fetchPriority: V
                }) : N === "script" && r.d.X(v, {
                    crossOrigin: w,
                    integrity: O,
                    fetchPriority: V,
                    nonce: typeof y.nonce == "string" ? y.nonce : void 0
                });
            }
        }, dt.preinitModule = function(v, y) {
            if (typeof v == "string") if (typeof y == "object" && y !== null) {
                if (y.as == null || y.as === "script") {
                    var N = b(y.as, y.crossOrigin);
                    r.d.M(v, {
                        crossOrigin: N,
                        integrity: typeof y.integrity == "string" ? y.integrity : void 0,
                        nonce: typeof y.nonce == "string" ? y.nonce : void 0
                    });
                }
            } else y == null && r.d.M(v);
        }, dt.preload = function(v, y) {
            if (typeof v == "string" && typeof y == "object" && y !== null && typeof y.as == "string") {
                var N = y.as, w = b(N, y.crossOrigin);
                r.d.L(v, N, {
                    crossOrigin: w,
                    integrity: typeof y.integrity == "string" ? y.integrity : void 0,
                    nonce: typeof y.nonce == "string" ? y.nonce : void 0,
                    type: typeof y.type == "string" ? y.type : void 0,
                    fetchPriority: typeof y.fetchPriority == "string" ? y.fetchPriority : void 0,
                    referrerPolicy: typeof y.referrerPolicy == "string" ? y.referrerPolicy : void 0,
                    imageSrcSet: typeof y.imageSrcSet == "string" ? y.imageSrcSet : void 0,
                    imageSizes: typeof y.imageSizes == "string" ? y.imageSizes : void 0,
                    media: typeof y.media == "string" ? y.media : void 0
                });
            }
        }, dt.preloadModule = function(v, y) {
            if (typeof v == "string") if (y) {
                var N = b(y.as, y.crossOrigin);
                r.d.m(v, {
                    as: typeof y.as == "string" && y.as !== "script" ? y.as : void 0,
                    crossOrigin: N,
                    integrity: typeof y.integrity == "string" ? y.integrity : void 0
                });
            } else r.d.m(v);
        }, dt.requestFormReset = function(v) {
            r.d.r(v);
        }, dt.unstable_batchedUpdates = function(v, y) {
            return v(y);
        }, dt.useFormState = function(v, y, N) {
            return p.H.useFormState(v, y, N);
        }, dt.useFormStatus = function() {
            return p.H.useHostTransitionStatus();
        }, dt.version = "19.2.3", dt;
    }
    var Kh;
    function xy() {
        if (Kh) return hr.exports;
        Kh = 1;
        function s() {
            if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
            } catch (u) {
                console.error(u);
            }
        }
        return s(), hr.exports = py(), hr.exports;
    }
    var Jh;
    function yy() {
        if (Jh) return li;
        Jh = 1;
        var s = my(), u = Ar(), o = xy();
        function r(e) {
            var t = "https://react.dev/errors/" + e;
            if (1 < arguments.length) {
                t += "?args[]=" + encodeURIComponent(arguments[1]);
                for(var l = 2; l < arguments.length; l++)t += "&args[]=" + encodeURIComponent(arguments[l]);
            }
            return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
        }
        function d(e) {
            return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
        }
        function m(e) {
            var t = e, l = e;
            if (e.alternate) for(; t.return;)t = t.return;
            else {
                e = t;
                do t = e, (t.flags & 4098) !== 0 && (l = t.return), e = t.return;
                while (e);
            }
            return t.tag === 3 ? l : null;
        }
        function p(e) {
            if (e.tag === 13) {
                var t = e.memoizedState;
                if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
            }
            return null;
        }
        function b(e) {
            if (e.tag === 31) {
                var t = e.memoizedState;
                if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
            }
            return null;
        }
        function v(e) {
            if (m(e) !== e) throw Error(r(188));
        }
        function y(e) {
            var t = e.alternate;
            if (!t) {
                if (t = m(e), t === null) throw Error(r(188));
                return t !== e ? null : e;
            }
            for(var l = e, a = t;;){
                var n = l.return;
                if (n === null) break;
                var i = n.alternate;
                if (i === null) {
                    if (a = n.return, a !== null) {
                        l = a;
                        continue;
                    }
                    break;
                }
                if (n.child === i.child) {
                    for(i = n.child; i;){
                        if (i === l) return v(n), e;
                        if (i === a) return v(n), t;
                        i = i.sibling;
                    }
                    throw Error(r(188));
                }
                if (l.return !== a.return) l = n, a = i;
                else {
                    for(var f = !1, h = n.child; h;){
                        if (h === l) {
                            f = !0, l = n, a = i;
                            break;
                        }
                        if (h === a) {
                            f = !0, a = n, l = i;
                            break;
                        }
                        h = h.sibling;
                    }
                    if (!f) {
                        for(h = i.child; h;){
                            if (h === l) {
                                f = !0, l = i, a = n;
                                break;
                            }
                            if (h === a) {
                                f = !0, a = i, l = n;
                                break;
                            }
                            h = h.sibling;
                        }
                        if (!f) throw Error(r(189));
                    }
                }
                if (l.alternate !== a) throw Error(r(190));
            }
            if (l.tag !== 3) throw Error(r(188));
            return l.stateNode.current === l ? e : t;
        }
        function N(e) {
            var t = e.tag;
            if (t === 5 || t === 26 || t === 27 || t === 6) return e;
            for(e = e.child; e !== null;){
                if (t = N(e), t !== null) return t;
                e = e.sibling;
            }
            return null;
        }
        var w = Object.assign, O = Symbol.for("react.element"), V = Symbol.for("react.transitional.element"), L = Symbol.for("react.portal"), M = Symbol.for("react.fragment"), R = Symbol.for("react.strict_mode"), X = Symbol.for("react.profiler"), H = Symbol.for("react.consumer"), Y = Symbol.for("react.context"), J = Symbol.for("react.forward_ref"), W = Symbol.for("react.suspense"), ae = Symbol.for("react.suspense_list"), P = Symbol.for("react.memo"), be = Symbol.for("react.lazy"), Q = Symbol.for("react.activity"), ee = Symbol.for("react.memo_cache_sentinel"), te = Symbol.iterator;
        function ne(e) {
            return e === null || typeof e != "object" ? null : (e = te && e[te] || e["@@iterator"], typeof e == "function" ? e : null);
        }
        var re = Symbol.for("react.client.reference");
        function xe(e) {
            if (e == null) return null;
            if (typeof e == "function") return e.$$typeof === re ? null : e.displayName || e.name || null;
            if (typeof e == "string") return e;
            switch(e){
                case M:
                    return "Fragment";
                case X:
                    return "Profiler";
                case R:
                    return "StrictMode";
                case W:
                    return "Suspense";
                case ae:
                    return "SuspenseList";
                case Q:
                    return "Activity";
            }
            if (typeof e == "object") switch(e.$$typeof){
                case L:
                    return "Portal";
                case Y:
                    return e.displayName || "Context";
                case H:
                    return (e._context.displayName || "Context") + ".Consumer";
                case J:
                    var t = e.render;
                    return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
                case P:
                    return t = e.displayName || null, t !== null ? t : xe(e.type) || "Memo";
                case be:
                    t = e._payload, e = e._init;
                    try {
                        return xe(e(t));
                    } catch  {}
            }
            return null;
        }
        var de = Array.isArray, S = u.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, z = o.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, B = {
            pending: !1,
            data: null,
            method: null,
            action: null
        }, K = [], ie = -1;
        function T(e) {
            return {
                current: e
            };
        }
        function k(e) {
            0 > ie || (e.current = K[ie], K[ie] = null, ie--);
        }
        function Z(e, t) {
            ie++, K[ie] = e.current, e.current = t;
        }
        var $ = T(null), se = T(null), fe = T(null), Ne = T(null);
        function Pe(e, t) {
            switch(Z(fe, t), Z(se, e), Z($, null), t.nodeType){
                case 9:
                case 11:
                    e = (e = t.documentElement) && (e = e.namespaceURI) ? rh(e) : 0;
                    break;
                default:
                    if (e = t.tagName, t = t.namespaceURI) t = rh(t), e = oh(t, e);
                    else switch(e){
                        case "svg":
                            e = 1;
                            break;
                        case "math":
                            e = 2;
                            break;
                        default:
                            e = 0;
                    }
            }
            k($), Z($, e);
        }
        function He() {
            k($), k(se), k(fe);
        }
        function ll(e) {
            e.memoizedState !== null && Z(Ne, e);
            var t = $.current, l = oh(t, e.type);
            t !== l && (Z(se, e), Z($, l));
        }
        function ue(e) {
            se.current === e && (k($), k(se)), Ne.current === e && (k(Ne), Fn._currentValue = B);
        }
        var je, ot;
        function Wt(e) {
            if (je === void 0) try {
                throw Error();
            } catch (l) {
                var t = l.stack.trim().match(/\n( *(at )?)/);
                je = t && t[1] || "", ot = -1 < l.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < l.stack.indexOf("@") ? "@unknown:0:0" : "";
            }
            return `
` + je + e + ot;
        }
        var Nl = !1;
        function F(e, t) {
            if (!e || Nl) return "";
            Nl = !0;
            var l = Error.prepareStackTrace;
            Error.prepareStackTrace = void 0;
            try {
                var a = {
                    DetermineComponentFrameRoot: function() {
                        try {
                            if (t) {
                                var G = function() {
                                    throw Error();
                                };
                                if (Object.defineProperty(G.prototype, "props", {
                                    set: function() {
                                        throw Error();
                                    }
                                }), typeof Reflect == "object" && Reflect.construct) {
                                    try {
                                        Reflect.construct(G, []);
                                    } catch (D) {
                                        var A = D;
                                    }
                                    Reflect.construct(e, [], G);
                                } else {
                                    try {
                                        G.call();
                                    } catch (D) {
                                        A = D;
                                    }
                                    e.call(G.prototype);
                                }
                            } else {
                                try {
                                    throw Error();
                                } catch (D) {
                                    A = D;
                                }
                                (G = e()) && typeof G.catch == "function" && G.catch(function() {});
                            }
                        } catch (D) {
                            if (D && A && typeof D.stack == "string") return [
                                D.stack,
                                A.stack
                            ];
                        }
                        return [
                            null,
                            null
                        ];
                    }
                };
                a.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
                var n = Object.getOwnPropertyDescriptor(a.DetermineComponentFrameRoot, "name");
                n && n.configurable && Object.defineProperty(a.DetermineComponentFrameRoot, "name", {
                    value: "DetermineComponentFrameRoot"
                });
                var i = a.DetermineComponentFrameRoot(), f = i[0], h = i[1];
                if (f && h) {
                    var g = f.split(`
`), C = h.split(`
`);
                    for(n = a = 0; a < g.length && !g[a].includes("DetermineComponentFrameRoot");)a++;
                    for(; n < C.length && !C[n].includes("DetermineComponentFrameRoot");)n++;
                    if (a === g.length || n === C.length) for(a = g.length - 1, n = C.length - 1; 1 <= a && 0 <= n && g[a] !== C[n];)n--;
                    for(; 1 <= a && 0 <= n; a--, n--)if (g[a] !== C[n]) {
                        if (a !== 1 || n !== 1) do if (a--, n--, 0 > n || g[a] !== C[n]) {
                            var U = `
` + g[a].replace(" at new ", " at ");
                            return e.displayName && U.includes("<anonymous>") && (U = U.replace("<anonymous>", e.displayName)), U;
                        }
                        while (1 <= a && 0 <= n);
                        break;
                    }
                }
            } finally{
                Nl = !1, Error.prepareStackTrace = l;
            }
            return (l = e ? e.displayName || e.name : "") ? Wt(l) : "";
        }
        function ke(e, t) {
            switch(e.tag){
                case 26:
                case 27:
                case 5:
                    return Wt(e.type);
                case 16:
                    return Wt("Lazy");
                case 13:
                    return e.child !== t && t !== null ? Wt("Suspense Fallback") : Wt("Suspense");
                case 19:
                    return Wt("SuspenseList");
                case 0:
                case 15:
                    return F(e.type, !1);
                case 11:
                    return F(e.type.render, !1);
                case 1:
                    return F(e.type, !0);
                case 31:
                    return Wt("Activity");
                default:
                    return "";
            }
        }
        function ye(e) {
            try {
                var t = "", l = null;
                do t += ke(e, l), l = e, e = e.return;
                while (e);
                return t;
            } catch (a) {
                return `
Error generating stack: ` + a.message + `
` + a.stack;
            }
        }
        var Xt = Object.prototype.hasOwnProperty, Qe = s.unstable_scheduleCallback, ft = s.unstable_cancelCallback, Qt = s.unstable_shouldYield, Il = s.unstable_requestPaint, tt = s.unstable_now, Vm = s.unstable_getCurrentPriorityLevel, Br = s.unstable_ImmediatePriority, qr = s.unstable_UserBlockingPriority, mi = s.unstable_NormalPriority, Xm = s.unstable_LowPriority, Gr = s.unstable_IdlePriority, Qm = s.log, Zm = s.unstable_setDisableYieldValue, rn = null, Tt = null;
        function jl(e) {
            if (typeof Qm == "function" && Zm(e), Tt && typeof Tt.setStrictMode == "function") try {
                Tt.setStrictMode(rn, e);
            } catch  {}
        }
        var St = Math.clz32 ? Math.clz32 : $m, Km = Math.log, Jm = Math.LN2;
        function $m(e) {
            return e >>>= 0, e === 0 ? 32 : 31 - (Km(e) / Jm | 0) | 0;
        }
        var pi = 256, xi = 262144, yi = 4194304;
        function Pl(e) {
            var t = e & 42;
            if (t !== 0) return t;
            switch(e & -e){
                case 1:
                    return 1;
                case 2:
                    return 2;
                case 4:
                    return 4;
                case 8:
                    return 8;
                case 16:
                    return 16;
                case 32:
                    return 32;
                case 64:
                    return 64;
                case 128:
                    return 128;
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                    return e & 261888;
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                    return e & 3932160;
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                    return e & 62914560;
                case 67108864:
                    return 67108864;
                case 134217728:
                    return 134217728;
                case 268435456:
                    return 268435456;
                case 536870912:
                    return 536870912;
                case 1073741824:
                    return 0;
                default:
                    return e;
            }
        }
        function bi(e, t, l) {
            var a = e.pendingLanes;
            if (a === 0) return 0;
            var n = 0, i = e.suspendedLanes, f = e.pingedLanes;
            e = e.warmLanes;
            var h = a & 134217727;
            return h !== 0 ? (a = h & ~i, a !== 0 ? n = Pl(a) : (f &= h, f !== 0 ? n = Pl(f) : l || (l = h & ~e, l !== 0 && (n = Pl(l))))) : (h = a & ~i, h !== 0 ? n = Pl(h) : f !== 0 ? n = Pl(f) : l || (l = a & ~e, l !== 0 && (n = Pl(l)))), n === 0 ? 0 : t !== 0 && t !== n && (t & i) === 0 && (i = n & -n, l = t & -t, i >= l || i === 32 && (l & 4194048) !== 0) ? t : n;
        }
        function on(e, t) {
            return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
        }
        function Wm(e, t) {
            switch(e){
                case 1:
                case 2:
                case 4:
                case 8:
                case 64:
                    return t + 250;
                case 16:
                case 32:
                case 128:
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                    return t + 5e3;
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                    return -1;
                case 67108864:
                case 134217728:
                case 268435456:
                case 536870912:
                case 1073741824:
                    return -1;
                default:
                    return -1;
            }
        }
        function Yr() {
            var e = yi;
            return yi <<= 1, (yi & 62914560) === 0 && (yi = 4194304), e;
        }
        function Ws(e) {
            for(var t = [], l = 0; 31 > l; l++)t.push(e);
            return t;
        }
        function fn(e, t) {
            e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
        }
        function Fm(e, t, l, a, n, i) {
            var f = e.pendingLanes;
            e.pendingLanes = l, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= l, e.entangledLanes &= l, e.errorRecoveryDisabledLanes &= l, e.shellSuspendCounter = 0;
            var h = e.entanglements, g = e.expirationTimes, C = e.hiddenUpdates;
            for(l = f & ~l; 0 < l;){
                var U = 31 - St(l), G = 1 << U;
                h[U] = 0, g[U] = -1;
                var A = C[U];
                if (A !== null) for(C[U] = null, U = 0; U < A.length; U++){
                    var D = A[U];
                    D !== null && (D.lane &= -536870913);
                }
                l &= ~G;
            }
            a !== 0 && Vr(e, a, 0), i !== 0 && n === 0 && e.tag !== 0 && (e.suspendedLanes |= i & ~(f & ~t));
        }
        function Vr(e, t, l) {
            e.pendingLanes |= t, e.suspendedLanes &= ~t;
            var a = 31 - St(t);
            e.entangledLanes |= t, e.entanglements[a] = e.entanglements[a] | 1073741824 | l & 261930;
        }
        function Xr(e, t) {
            var l = e.entangledLanes |= t;
            for(e = e.entanglements; l;){
                var a = 31 - St(l), n = 1 << a;
                n & t | e[a] & t && (e[a] |= t), l &= ~n;
            }
        }
        function Qr(e, t) {
            var l = t & -t;
            return l = (l & 42) !== 0 ? 1 : Fs(l), (l & (e.suspendedLanes | t)) !== 0 ? 0 : l;
        }
        function Fs(e) {
            switch(e){
                case 2:
                    e = 1;
                    break;
                case 8:
                    e = 4;
                    break;
                case 32:
                    e = 16;
                    break;
                case 256:
                case 512:
                case 1024:
                case 2048:
                case 4096:
                case 8192:
                case 16384:
                case 32768:
                case 65536:
                case 131072:
                case 262144:
                case 524288:
                case 1048576:
                case 2097152:
                case 4194304:
                case 8388608:
                case 16777216:
                case 33554432:
                    e = 128;
                    break;
                case 268435456:
                    e = 134217728;
                    break;
                default:
                    e = 0;
            }
            return e;
        }
        function Is(e) {
            return e &= -e, 2 < e ? 8 < e ? (e & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
        }
        function Zr() {
            var e = z.p;
            return e !== 0 ? e : (e = window.event, e === void 0 ? 32 : Dh(e.type));
        }
        function Kr(e, t) {
            var l = z.p;
            try {
                return z.p = e, t();
            } finally{
                z.p = l;
            }
        }
        var El = Math.random().toString(36).slice(2), it = "__reactFiber$" + El, pt = "__reactProps$" + El, ba = "__reactContainer$" + El, Ps = "__reactEvents$" + El, Im = "__reactListeners$" + El, Pm = "__reactHandles$" + El, Jr = "__reactResources$" + El, dn = "__reactMarker$" + El;
        function ec(e) {
            delete e[it], delete e[pt], delete e[Ps], delete e[Im], delete e[Pm];
        }
        function va(e) {
            var t = e[it];
            if (t) return t;
            for(var l = e.parentNode; l;){
                if (t = l[ba] || l[it]) {
                    if (l = t.alternate, t.child !== null || l !== null && l.child !== null) for(e = yh(e); e !== null;){
                        if (l = e[it]) return l;
                        e = yh(e);
                    }
                    return t;
                }
                e = l, l = e.parentNode;
            }
            return null;
        }
        function ga(e) {
            if (e = e[it] || e[ba]) {
                var t = e.tag;
                if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
            }
            return null;
        }
        function hn(e) {
            var t = e.tag;
            if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
            throw Error(r(33));
        }
        function wa(e) {
            var t = e[Jr];
            return t || (t = e[Jr] = {
                hoistableStyles: new Map,
                hoistableScripts: new Map
            }), t;
        }
        function lt(e) {
            e[dn] = !0;
        }
        var $r = new Set, Wr = {};
        function ea(e, t) {
            Ta(e, t), Ta(e + "Capture", t);
        }
        function Ta(e, t) {
            for(Wr[e] = t, e = 0; e < t.length; e++)$r.add(t[e]);
        }
        var ep = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Fr = {}, Ir = {};
        function tp(e) {
            return Xt.call(Ir, e) ? !0 : Xt.call(Fr, e) ? !1 : ep.test(e) ? Ir[e] = !0 : (Fr[e] = !0, !1);
        }
        function vi(e, t, l) {
            if (tp(t)) if (l === null) e.removeAttribute(t);
            else {
                switch(typeof l){
                    case "undefined":
                    case "function":
                    case "symbol":
                        e.removeAttribute(t);
                        return;
                    case "boolean":
                        var a = t.toLowerCase().slice(0, 5);
                        if (a !== "data-" && a !== "aria-") {
                            e.removeAttribute(t);
                            return;
                        }
                }
                e.setAttribute(t, "" + l);
            }
        }
        function gi(e, t, l) {
            if (l === null) e.removeAttribute(t);
            else {
                switch(typeof l){
                    case "undefined":
                    case "function":
                    case "symbol":
                    case "boolean":
                        e.removeAttribute(t);
                        return;
                }
                e.setAttribute(t, "" + l);
            }
        }
        function al(e, t, l, a) {
            if (a === null) e.removeAttribute(l);
            else {
                switch(typeof a){
                    case "undefined":
                    case "function":
                    case "symbol":
                    case "boolean":
                        e.removeAttribute(l);
                        return;
                }
                e.setAttributeNS(t, l, "" + a);
            }
        }
        function Dt(e) {
            switch(typeof e){
                case "bigint":
                case "boolean":
                case "number":
                case "string":
                case "undefined":
                    return e;
                case "object":
                    return e;
                default:
                    return "";
            }
        }
        function Pr(e) {
            var t = e.type;
            return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
        }
        function lp(e, t, l) {
            var a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
            if (!e.hasOwnProperty(t) && typeof a < "u" && typeof a.get == "function" && typeof a.set == "function") {
                var n = a.get, i = a.set;
                return Object.defineProperty(e, t, {
                    configurable: !0,
                    get: function() {
                        return n.call(this);
                    },
                    set: function(f) {
                        l = "" + f, i.call(this, f);
                    }
                }), Object.defineProperty(e, t, {
                    enumerable: a.enumerable
                }), {
                    getValue: function() {
                        return l;
                    },
                    setValue: function(f) {
                        l = "" + f;
                    },
                    stopTracking: function() {
                        e._valueTracker = null, delete e[t];
                    }
                };
            }
        }
        function tc(e) {
            if (!e._valueTracker) {
                var t = Pr(e) ? "checked" : "value";
                e._valueTracker = lp(e, t, "" + e[t]);
            }
        }
        function eo(e) {
            if (!e) return !1;
            var t = e._valueTracker;
            if (!t) return !0;
            var l = t.getValue(), a = "";
            return e && (a = Pr(e) ? e.checked ? "true" : "false" : e.value), e = a, e !== l ? (t.setValue(e), !0) : !1;
        }
        function wi(e) {
            if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
            try {
                return e.activeElement || e.body;
            } catch  {
                return e.body;
            }
        }
        var ap = /[\n"\\]/g;
        function zt(e) {
            return e.replace(ap, function(t) {
                return "\\" + t.charCodeAt(0).toString(16) + " ";
            });
        }
        function lc(e, t, l, a, n, i, f, h) {
            e.name = "", f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" ? e.type = f : e.removeAttribute("type"), t != null ? f === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Dt(t)) : e.value !== "" + Dt(t) && (e.value = "" + Dt(t)) : f !== "submit" && f !== "reset" || e.removeAttribute("value"), t != null ? ac(e, f, Dt(t)) : l != null ? ac(e, f, Dt(l)) : a != null && e.removeAttribute("value"), n == null && i != null && (e.defaultChecked = !!i), n != null && (e.checked = n && typeof n != "function" && typeof n != "symbol"), h != null && typeof h != "function" && typeof h != "symbol" && typeof h != "boolean" ? e.name = "" + Dt(h) : e.removeAttribute("name");
        }
        function to(e, t, l, a, n, i, f, h) {
            if (i != null && typeof i != "function" && typeof i != "symbol" && typeof i != "boolean" && (e.type = i), t != null || l != null) {
                if (!(i !== "submit" && i !== "reset" || t != null)) {
                    tc(e);
                    return;
                }
                l = l != null ? "" + Dt(l) : "", t = t != null ? "" + Dt(t) : l, h || t === e.value || (e.value = t), e.defaultValue = t;
            }
            a = a ?? n, a = typeof a != "function" && typeof a != "symbol" && !!a, e.checked = h ? e.checked : !!a, e.defaultChecked = !!a, f != null && typeof f != "function" && typeof f != "symbol" && typeof f != "boolean" && (e.name = f), tc(e);
        }
        function ac(e, t, l) {
            t === "number" && wi(e.ownerDocument) === e || e.defaultValue === "" + l || (e.defaultValue = "" + l);
        }
        function Sa(e, t, l, a) {
            if (e = e.options, t) {
                t = {};
                for(var n = 0; n < l.length; n++)t["$" + l[n]] = !0;
                for(l = 0; l < e.length; l++)n = t.hasOwnProperty("$" + e[l].value), e[l].selected !== n && (e[l].selected = n), n && a && (e[l].defaultSelected = !0);
            } else {
                for(l = "" + Dt(l), t = null, n = 0; n < e.length; n++){
                    if (e[n].value === l) {
                        e[n].selected = !0, a && (e[n].defaultSelected = !0);
                        return;
                    }
                    t !== null || e[n].disabled || (t = e[n]);
                }
                t !== null && (t.selected = !0);
            }
        }
        function lo(e, t, l) {
            if (t != null && (t = "" + Dt(t), t !== e.value && (e.value = t), l == null)) {
                e.defaultValue !== t && (e.defaultValue = t);
                return;
            }
            e.defaultValue = l != null ? "" + Dt(l) : "";
        }
        function ao(e, t, l, a) {
            if (t == null) {
                if (a != null) {
                    if (l != null) throw Error(r(92));
                    if (de(a)) {
                        if (1 < a.length) throw Error(r(93));
                        a = a[0];
                    }
                    l = a;
                }
                l == null && (l = ""), t = l;
            }
            l = Dt(t), e.defaultValue = l, a = e.textContent, a === l && a !== "" && a !== null && (e.value = a), tc(e);
        }
        function _a(e, t) {
            if (t) {
                var l = e.firstChild;
                if (l && l === e.lastChild && l.nodeType === 3) {
                    l.nodeValue = t;
                    return;
                }
            }
            e.textContent = t;
        }
        var np = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
        function no(e, t, l) {
            var a = t.indexOf("--") === 0;
            l == null || typeof l == "boolean" || l === "" ? a ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : a ? e.setProperty(t, l) : typeof l != "number" || l === 0 || np.has(t) ? t === "float" ? e.cssFloat = l : e[t] = ("" + l).trim() : e[t] = l + "px";
        }
        function io(e, t, l) {
            if (t != null && typeof t != "object") throw Error(r(62));
            if (e = e.style, l != null) {
                for(var a in l)!l.hasOwnProperty(a) || t != null && t.hasOwnProperty(a) || (a.indexOf("--") === 0 ? e.setProperty(a, "") : a === "float" ? e.cssFloat = "" : e[a] = "");
                for(var n in t)a = t[n], t.hasOwnProperty(n) && l[n] !== a && no(e, n, a);
            } else for(var i in t)t.hasOwnProperty(i) && no(e, i, t[i]);
        }
        function nc(e) {
            if (e.indexOf("-") === -1) return !1;
            switch(e){
                case "annotation-xml":
                case "color-profile":
                case "font-face":
                case "font-face-src":
                case "font-face-uri":
                case "font-face-format":
                case "font-face-name":
                case "missing-glyph":
                    return !1;
                default:
                    return !0;
            }
        }
        var ip = new Map([
            [
                "acceptCharset",
                "accept-charset"
            ],
            [
                "htmlFor",
                "for"
            ],
            [
                "httpEquiv",
                "http-equiv"
            ],
            [
                "crossOrigin",
                "crossorigin"
            ],
            [
                "accentHeight",
                "accent-height"
            ],
            [
                "alignmentBaseline",
                "alignment-baseline"
            ],
            [
                "arabicForm",
                "arabic-form"
            ],
            [
                "baselineShift",
                "baseline-shift"
            ],
            [
                "capHeight",
                "cap-height"
            ],
            [
                "clipPath",
                "clip-path"
            ],
            [
                "clipRule",
                "clip-rule"
            ],
            [
                "colorInterpolation",
                "color-interpolation"
            ],
            [
                "colorInterpolationFilters",
                "color-interpolation-filters"
            ],
            [
                "colorProfile",
                "color-profile"
            ],
            [
                "colorRendering",
                "color-rendering"
            ],
            [
                "dominantBaseline",
                "dominant-baseline"
            ],
            [
                "enableBackground",
                "enable-background"
            ],
            [
                "fillOpacity",
                "fill-opacity"
            ],
            [
                "fillRule",
                "fill-rule"
            ],
            [
                "floodColor",
                "flood-color"
            ],
            [
                "floodOpacity",
                "flood-opacity"
            ],
            [
                "fontFamily",
                "font-family"
            ],
            [
                "fontSize",
                "font-size"
            ],
            [
                "fontSizeAdjust",
                "font-size-adjust"
            ],
            [
                "fontStretch",
                "font-stretch"
            ],
            [
                "fontStyle",
                "font-style"
            ],
            [
                "fontVariant",
                "font-variant"
            ],
            [
                "fontWeight",
                "font-weight"
            ],
            [
                "glyphName",
                "glyph-name"
            ],
            [
                "glyphOrientationHorizontal",
                "glyph-orientation-horizontal"
            ],
            [
                "glyphOrientationVertical",
                "glyph-orientation-vertical"
            ],
            [
                "horizAdvX",
                "horiz-adv-x"
            ],
            [
                "horizOriginX",
                "horiz-origin-x"
            ],
            [
                "imageRendering",
                "image-rendering"
            ],
            [
                "letterSpacing",
                "letter-spacing"
            ],
            [
                "lightingColor",
                "lighting-color"
            ],
            [
                "markerEnd",
                "marker-end"
            ],
            [
                "markerMid",
                "marker-mid"
            ],
            [
                "markerStart",
                "marker-start"
            ],
            [
                "overlinePosition",
                "overline-position"
            ],
            [
                "overlineThickness",
                "overline-thickness"
            ],
            [
                "paintOrder",
                "paint-order"
            ],
            [
                "panose-1",
                "panose-1"
            ],
            [
                "pointerEvents",
                "pointer-events"
            ],
            [
                "renderingIntent",
                "rendering-intent"
            ],
            [
                "shapeRendering",
                "shape-rendering"
            ],
            [
                "stopColor",
                "stop-color"
            ],
            [
                "stopOpacity",
                "stop-opacity"
            ],
            [
                "strikethroughPosition",
                "strikethrough-position"
            ],
            [
                "strikethroughThickness",
                "strikethrough-thickness"
            ],
            [
                "strokeDasharray",
                "stroke-dasharray"
            ],
            [
                "strokeDashoffset",
                "stroke-dashoffset"
            ],
            [
                "strokeLinecap",
                "stroke-linecap"
            ],
            [
                "strokeLinejoin",
                "stroke-linejoin"
            ],
            [
                "strokeMiterlimit",
                "stroke-miterlimit"
            ],
            [
                "strokeOpacity",
                "stroke-opacity"
            ],
            [
                "strokeWidth",
                "stroke-width"
            ],
            [
                "textAnchor",
                "text-anchor"
            ],
            [
                "textDecoration",
                "text-decoration"
            ],
            [
                "textRendering",
                "text-rendering"
            ],
            [
                "transformOrigin",
                "transform-origin"
            ],
            [
                "underlinePosition",
                "underline-position"
            ],
            [
                "underlineThickness",
                "underline-thickness"
            ],
            [
                "unicodeBidi",
                "unicode-bidi"
            ],
            [
                "unicodeRange",
                "unicode-range"
            ],
            [
                "unitsPerEm",
                "units-per-em"
            ],
            [
                "vAlphabetic",
                "v-alphabetic"
            ],
            [
                "vHanging",
                "v-hanging"
            ],
            [
                "vIdeographic",
                "v-ideographic"
            ],
            [
                "vMathematical",
                "v-mathematical"
            ],
            [
                "vectorEffect",
                "vector-effect"
            ],
            [
                "vertAdvY",
                "vert-adv-y"
            ],
            [
                "vertOriginX",
                "vert-origin-x"
            ],
            [
                "vertOriginY",
                "vert-origin-y"
            ],
            [
                "wordSpacing",
                "word-spacing"
            ],
            [
                "writingMode",
                "writing-mode"
            ],
            [
                "xmlnsXlink",
                "xmlns:xlink"
            ],
            [
                "xHeight",
                "x-height"
            ]
        ]), sp = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
        function Ti(e) {
            return sp.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
        }
        function nl() {}
        var ic = null;
        function sc(e) {
            return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
        }
        var Na = null, ja = null;
        function so(e) {
            var t = ga(e);
            if (t && (e = t.stateNode)) {
                var l = e[pt] || null;
                e: switch(e = t.stateNode, t.type){
                    case "input":
                        if (lc(e, l.value, l.defaultValue, l.defaultValue, l.checked, l.defaultChecked, l.type, l.name), t = l.name, l.type === "radio" && t != null) {
                            for(l = e; l.parentNode;)l = l.parentNode;
                            for(l = l.querySelectorAll('input[name="' + zt("" + t) + '"][type="radio"]'), t = 0; t < l.length; t++){
                                var a = l[t];
                                if (a !== e && a.form === e.form) {
                                    var n = a[pt] || null;
                                    if (!n) throw Error(r(90));
                                    lc(a, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name);
                                }
                            }
                            for(t = 0; t < l.length; t++)a = l[t], a.form === e.form && eo(a);
                        }
                        break e;
                    case "textarea":
                        lo(e, l.value, l.defaultValue);
                        break e;
                    case "select":
                        t = l.value, t != null && Sa(e, !!l.multiple, t, !1);
                }
            }
        }
        var cc = !1;
        function co(e, t, l) {
            if (cc) return e(t, l);
            cc = !0;
            try {
                var a = e(t);
                return a;
            } finally{
                if (cc = !1, (Na !== null || ja !== null) && (rs(), Na && (t = Na, e = ja, ja = Na = null, so(t), e))) for(t = 0; t < e.length; t++)so(e[t]);
            }
        }
        function mn(e, t) {
            var l = e.stateNode;
            if (l === null) return null;
            var a = l[pt] || null;
            if (a === null) return null;
            l = a[t];
            e: switch(t){
                case "onClick":
                case "onClickCapture":
                case "onDoubleClick":
                case "onDoubleClickCapture":
                case "onMouseDown":
                case "onMouseDownCapture":
                case "onMouseMove":
                case "onMouseMoveCapture":
                case "onMouseUp":
                case "onMouseUpCapture":
                case "onMouseEnter":
                    (a = !a.disabled) || (e = e.type, a = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !a;
                    break e;
                default:
                    e = !1;
            }
            if (e) return null;
            if (l && typeof l != "function") throw Error(r(231, t, typeof l));
            return l;
        }
        var il = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), uc = !1;
        if (il) try {
            var pn = {};
            Object.defineProperty(pn, "passive", {
                get: function() {
                    uc = !0;
                }
            }), window.addEventListener("test", pn, pn), window.removeEventListener("test", pn, pn);
        } catch  {
            uc = !1;
        }
        var Cl = null, rc = null, Si = null;
        function uo() {
            if (Si) return Si;
            var e, t = rc, l = t.length, a, n = "value" in Cl ? Cl.value : Cl.textContent, i = n.length;
            for(e = 0; e < l && t[e] === n[e]; e++);
            var f = l - e;
            for(a = 1; a <= f && t[l - a] === n[i - a]; a++);
            return Si = n.slice(e, 1 < a ? 1 - a : void 0);
        }
        function _i(e) {
            var t = e.keyCode;
            return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
        }
        function Ni() {
            return !0;
        }
        function ro() {
            return !1;
        }
        function xt(e) {
            function t(l, a, n, i, f) {
                this._reactName = l, this._targetInst = n, this.type = a, this.nativeEvent = i, this.target = f, this.currentTarget = null;
                for(var h in e)e.hasOwnProperty(h) && (l = e[h], this[h] = l ? l(i) : i[h]);
                return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Ni : ro, this.isPropagationStopped = ro, this;
            }
            return w(t.prototype, {
                preventDefault: function() {
                    this.defaultPrevented = !0;
                    var l = this.nativeEvent;
                    l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = Ni);
                },
                stopPropagation: function() {
                    var l = this.nativeEvent;
                    l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = Ni);
                },
                persist: function() {},
                isPersistent: Ni
            }), t;
        }
        var ta = {
            eventPhase: 0,
            bubbles: 0,
            cancelable: 0,
            timeStamp: function(e) {
                return e.timeStamp || Date.now();
            },
            defaultPrevented: 0,
            isTrusted: 0
        }, ji = xt(ta), xn = w({}, ta, {
            view: 0,
            detail: 0
        }), cp = xt(xn), oc, fc, yn, Ei = w({}, xn, {
            screenX: 0,
            screenY: 0,
            clientX: 0,
            clientY: 0,
            pageX: 0,
            pageY: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            getModifierState: hc,
            button: 0,
            buttons: 0,
            relatedTarget: function(e) {
                return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
            },
            movementX: function(e) {
                return "movementX" in e ? e.movementX : (e !== yn && (yn && e.type === "mousemove" ? (oc = e.screenX - yn.screenX, fc = e.screenY - yn.screenY) : fc = oc = 0, yn = e), oc);
            },
            movementY: function(e) {
                return "movementY" in e ? e.movementY : fc;
            }
        }), oo = xt(Ei), up = w({}, Ei, {
            dataTransfer: 0
        }), rp = xt(up), op = w({}, xn, {
            relatedTarget: 0
        }), dc = xt(op), fp = w({}, ta, {
            animationName: 0,
            elapsedTime: 0,
            pseudoElement: 0
        }), dp = xt(fp), hp = w({}, ta, {
            clipboardData: function(e) {
                return "clipboardData" in e ? e.clipboardData : window.clipboardData;
            }
        }), mp = xt(hp), pp = w({}, ta, {
            data: 0
        }), fo = xt(pp), xp = {
            Esc: "Escape",
            Spacebar: " ",
            Left: "ArrowLeft",
            Up: "ArrowUp",
            Right: "ArrowRight",
            Down: "ArrowDown",
            Del: "Delete",
            Win: "OS",
            Menu: "ContextMenu",
            Apps: "ContextMenu",
            Scroll: "ScrollLock",
            MozPrintableKey: "Unidentified"
        }, yp = {
            8: "Backspace",
            9: "Tab",
            12: "Clear",
            13: "Enter",
            16: "Shift",
            17: "Control",
            18: "Alt",
            19: "Pause",
            20: "CapsLock",
            27: "Escape",
            32: " ",
            33: "PageUp",
            34: "PageDown",
            35: "End",
            36: "Home",
            37: "ArrowLeft",
            38: "ArrowUp",
            39: "ArrowRight",
            40: "ArrowDown",
            45: "Insert",
            46: "Delete",
            112: "F1",
            113: "F2",
            114: "F3",
            115: "F4",
            116: "F5",
            117: "F6",
            118: "F7",
            119: "F8",
            120: "F9",
            121: "F10",
            122: "F11",
            123: "F12",
            144: "NumLock",
            145: "ScrollLock",
            224: "Meta"
        }, bp = {
            Alt: "altKey",
            Control: "ctrlKey",
            Meta: "metaKey",
            Shift: "shiftKey"
        };
        function vp(e) {
            var t = this.nativeEvent;
            return t.getModifierState ? t.getModifierState(e) : (e = bp[e]) ? !!t[e] : !1;
        }
        function hc() {
            return vp;
        }
        var gp = w({}, xn, {
            key: function(e) {
                if (e.key) {
                    var t = xp[e.key] || e.key;
                    if (t !== "Unidentified") return t;
                }
                return e.type === "keypress" ? (e = _i(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? yp[e.keyCode] || "Unidentified" : "";
            },
            code: 0,
            location: 0,
            ctrlKey: 0,
            shiftKey: 0,
            altKey: 0,
            metaKey: 0,
            repeat: 0,
            locale: 0,
            getModifierState: hc,
            charCode: function(e) {
                return e.type === "keypress" ? _i(e) : 0;
            },
            keyCode: function(e) {
                return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
            },
            which: function(e) {
                return e.type === "keypress" ? _i(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
            }
        }), wp = xt(gp), Tp = w({}, Ei, {
            pointerId: 0,
            width: 0,
            height: 0,
            pressure: 0,
            tangentialPressure: 0,
            tiltX: 0,
            tiltY: 0,
            twist: 0,
            pointerType: 0,
            isPrimary: 0
        }), ho = xt(Tp), Sp = w({}, xn, {
            touches: 0,
            targetTouches: 0,
            changedTouches: 0,
            altKey: 0,
            metaKey: 0,
            ctrlKey: 0,
            shiftKey: 0,
            getModifierState: hc
        }), _p = xt(Sp), Np = w({}, ta, {
            propertyName: 0,
            elapsedTime: 0,
            pseudoElement: 0
        }), jp = xt(Np), Ep = w({}, Ei, {
            deltaX: function(e) {
                return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
            },
            deltaY: function(e) {
                return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
            },
            deltaZ: 0,
            deltaMode: 0
        }), Cp = xt(Ep), Ap = w({}, ta, {
            newState: 0,
            oldState: 0
        }), Rp = xt(Ap), Mp = [
            9,
            13,
            27,
            32
        ], mc = il && "CompositionEvent" in window, bn = null;
        il && "documentMode" in document && (bn = document.documentMode);
        var Op = il && "TextEvent" in window && !bn, mo = il && (!mc || bn && 8 < bn && 11 >= bn), po = " ", xo = !1;
        function yo(e, t) {
            switch(e){
                case "keyup":
                    return Mp.indexOf(t.keyCode) !== -1;
                case "keydown":
                    return t.keyCode !== 229;
                case "keypress":
                case "mousedown":
                case "focusout":
                    return !0;
                default:
                    return !1;
            }
        }
        function bo(e) {
            return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
        }
        var Ea = !1;
        function Dp(e, t) {
            switch(e){
                case "compositionend":
                    return bo(t);
                case "keypress":
                    return t.which !== 32 ? null : (xo = !0, po);
                case "textInput":
                    return e = t.data, e === po && xo ? null : e;
                default:
                    return null;
            }
        }
        function zp(e, t) {
            if (Ea) return e === "compositionend" || !mc && yo(e, t) ? (e = uo(), Si = rc = Cl = null, Ea = !1, e) : null;
            switch(e){
                case "paste":
                    return null;
                case "keypress":
                    if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
                        if (t.char && 1 < t.char.length) return t.char;
                        if (t.which) return String.fromCharCode(t.which);
                    }
                    return null;
                case "compositionend":
                    return mo && t.locale !== "ko" ? null : t.data;
                default:
                    return null;
            }
        }
        var Up = {
            color: !0,
            date: !0,
            datetime: !0,
            "datetime-local": !0,
            email: !0,
            month: !0,
            number: !0,
            password: !0,
            range: !0,
            search: !0,
            tel: !0,
            text: !0,
            time: !0,
            url: !0,
            week: !0
        };
        function vo(e) {
            var t = e && e.nodeName && e.nodeName.toLowerCase();
            return t === "input" ? !!Up[e.type] : t === "textarea";
        }
        function go(e, t, l, a) {
            Na ? ja ? ja.push(a) : ja = [
                a
            ] : Na = a, t = xs(t, "onChange"), 0 < t.length && (l = new ji("onChange", "change", null, l, a), e.push({
                event: l,
                listeners: t
            }));
        }
        var vn = null, gn = null;
        function Lp(e) {
            ah(e, 0);
        }
        function Ci(e) {
            var t = hn(e);
            if (eo(t)) return e;
        }
        function wo(e, t) {
            if (e === "change") return t;
        }
        var To = !1;
        if (il) {
            var pc;
            if (il) {
                var xc = "oninput" in document;
                if (!xc) {
                    var So = document.createElement("div");
                    So.setAttribute("oninput", "return;"), xc = typeof So.oninput == "function";
                }
                pc = xc;
            } else pc = !1;
            To = pc && (!document.documentMode || 9 < document.documentMode);
        }
        function _o() {
            vn && (vn.detachEvent("onpropertychange", No), gn = vn = null);
        }
        function No(e) {
            if (e.propertyName === "value" && Ci(gn)) {
                var t = [];
                go(t, gn, e, sc(e)), co(Lp, t);
            }
        }
        function Hp(e, t, l) {
            e === "focusin" ? (_o(), vn = t, gn = l, vn.attachEvent("onpropertychange", No)) : e === "focusout" && _o();
        }
        function kp(e) {
            if (e === "selectionchange" || e === "keyup" || e === "keydown") return Ci(gn);
        }
        function Bp(e, t) {
            if (e === "click") return Ci(t);
        }
        function qp(e, t) {
            if (e === "input" || e === "change") return Ci(t);
        }
        function Gp(e, t) {
            return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
        }
        var _t = typeof Object.is == "function" ? Object.is : Gp;
        function wn(e, t) {
            if (_t(e, t)) return !0;
            if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
            var l = Object.keys(e), a = Object.keys(t);
            if (l.length !== a.length) return !1;
            for(a = 0; a < l.length; a++){
                var n = l[a];
                if (!Xt.call(t, n) || !_t(e[n], t[n])) return !1;
            }
            return !0;
        }
        function jo(e) {
            for(; e && e.firstChild;)e = e.firstChild;
            return e;
        }
        function Eo(e, t) {
            var l = jo(e);
            e = 0;
            for(var a; l;){
                if (l.nodeType === 3) {
                    if (a = e + l.textContent.length, e <= t && a >= t) return {
                        node: l,
                        offset: t - e
                    };
                    e = a;
                }
                e: {
                    for(; l;){
                        if (l.nextSibling) {
                            l = l.nextSibling;
                            break e;
                        }
                        l = l.parentNode;
                    }
                    l = void 0;
                }
                l = jo(l);
            }
        }
        function Co(e, t) {
            return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Co(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
        }
        function Ao(e) {
            e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
            for(var t = wi(e.document); t instanceof e.HTMLIFrameElement;){
                try {
                    var l = typeof t.contentWindow.location.href == "string";
                } catch  {
                    l = !1;
                }
                if (l) e = t.contentWindow;
                else break;
                t = wi(e.document);
            }
            return t;
        }
        function yc(e) {
            var t = e && e.nodeName && e.nodeName.toLowerCase();
            return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
        }
        var Yp = il && "documentMode" in document && 11 >= document.documentMode, Ca = null, bc = null, Tn = null, vc = !1;
        function Ro(e, t, l) {
            var a = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
            vc || Ca == null || Ca !== wi(a) || (a = Ca, "selectionStart" in a && yc(a) ? a = {
                start: a.selectionStart,
                end: a.selectionEnd
            } : (a = (a.ownerDocument && a.ownerDocument.defaultView || window).getSelection(), a = {
                anchorNode: a.anchorNode,
                anchorOffset: a.anchorOffset,
                focusNode: a.focusNode,
                focusOffset: a.focusOffset
            }), Tn && wn(Tn, a) || (Tn = a, a = xs(bc, "onSelect"), 0 < a.length && (t = new ji("onSelect", "select", null, t, l), e.push({
                event: t,
                listeners: a
            }), t.target = Ca)));
        }
        function la(e, t) {
            var l = {};
            return l[e.toLowerCase()] = t.toLowerCase(), l["Webkit" + e] = "webkit" + t, l["Moz" + e] = "moz" + t, l;
        }
        var Aa = {
            animationend: la("Animation", "AnimationEnd"),
            animationiteration: la("Animation", "AnimationIteration"),
            animationstart: la("Animation", "AnimationStart"),
            transitionrun: la("Transition", "TransitionRun"),
            transitionstart: la("Transition", "TransitionStart"),
            transitioncancel: la("Transition", "TransitionCancel"),
            transitionend: la("Transition", "TransitionEnd")
        }, gc = {}, Mo = {};
        il && (Mo = document.createElement("div").style, "AnimationEvent" in window || (delete Aa.animationend.animation, delete Aa.animationiteration.animation, delete Aa.animationstart.animation), "TransitionEvent" in window || delete Aa.transitionend.transition);
        function aa(e) {
            if (gc[e]) return gc[e];
            if (!Aa[e]) return e;
            var t = Aa[e], l;
            for(l in t)if (t.hasOwnProperty(l) && l in Mo) return gc[e] = t[l];
            return e;
        }
        var Oo = aa("animationend"), Do = aa("animationiteration"), zo = aa("animationstart"), Vp = aa("transitionrun"), Xp = aa("transitionstart"), Qp = aa("transitioncancel"), Uo = aa("transitionend"), Lo = new Map, wc = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
        wc.push("scrollEnd");
        function Zt(e, t) {
            Lo.set(e, t), ea(t, [
                e
            ]);
        }
        var Ai = typeof reportError == "function" ? reportError : function(e) {
            if (typeof window == "object" && typeof window.ErrorEvent == "function") {
                var t = new window.ErrorEvent("error", {
                    bubbles: !0,
                    cancelable: !0,
                    message: typeof e == "object" && e !== null && typeof e.message == "string" ? String(e.message) : String(e),
                    error: e
                });
                if (!window.dispatchEvent(t)) return;
            } else if (typeof process == "object" && typeof process.emit == "function") {
                process.emit("uncaughtException", e);
                return;
            }
            console.error(e);
        }, Ut = [], Ra = 0, Tc = 0;
        function Ri() {
            for(var e = Ra, t = Tc = Ra = 0; t < e;){
                var l = Ut[t];
                Ut[t++] = null;
                var a = Ut[t];
                Ut[t++] = null;
                var n = Ut[t];
                Ut[t++] = null;
                var i = Ut[t];
                if (Ut[t++] = null, a !== null && n !== null) {
                    var f = a.pending;
                    f === null ? n.next = n : (n.next = f.next, f.next = n), a.pending = n;
                }
                i !== 0 && Ho(l, n, i);
            }
        }
        function Mi(e, t, l, a) {
            Ut[Ra++] = e, Ut[Ra++] = t, Ut[Ra++] = l, Ut[Ra++] = a, Tc |= a, e.lanes |= a, e = e.alternate, e !== null && (e.lanes |= a);
        }
        function Sc(e, t, l, a) {
            return Mi(e, t, l, a), Oi(e);
        }
        function na(e, t) {
            return Mi(e, null, null, t), Oi(e);
        }
        function Ho(e, t, l) {
            e.lanes |= l;
            var a = e.alternate;
            a !== null && (a.lanes |= l);
            for(var n = !1, i = e.return; i !== null;)i.childLanes |= l, a = i.alternate, a !== null && (a.childLanes |= l), i.tag === 22 && (e = i.stateNode, e === null || e._visibility & 1 || (n = !0)), e = i, i = i.return;
            return e.tag === 3 ? (i = e.stateNode, n && t !== null && (n = 31 - St(l), e = i.hiddenUpdates, a = e[n], a === null ? e[n] = [
                t
            ] : a.push(t), t.lane = l | 536870912), i) : null;
        }
        function Oi(e) {
            if (50 < Xn) throw Xn = 0, Ou = null, Error(r(185));
            for(var t = e.return; t !== null;)e = t, t = e.return;
            return e.tag === 3 ? e.stateNode : null;
        }
        var Ma = {};
        function Zp(e, t, l, a) {
            this.tag = e, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = a, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
        }
        function Nt(e, t, l, a) {
            return new Zp(e, t, l, a);
        }
        function _c(e) {
            return e = e.prototype, !(!e || !e.isReactComponent);
        }
        function sl(e, t) {
            var l = e.alternate;
            return l === null ? (l = Nt(e.tag, t, e.key, e.mode), l.elementType = e.elementType, l.type = e.type, l.stateNode = e.stateNode, l.alternate = e, e.alternate = l) : (l.pendingProps = t, l.type = e.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = e.flags & 65011712, l.childLanes = e.childLanes, l.lanes = e.lanes, l.child = e.child, l.memoizedProps = e.memoizedProps, l.memoizedState = e.memoizedState, l.updateQueue = e.updateQueue, t = e.dependencies, l.dependencies = t === null ? null : {
                lanes: t.lanes,
                firstContext: t.firstContext
            }, l.sibling = e.sibling, l.index = e.index, l.ref = e.ref, l.refCleanup = e.refCleanup, l;
        }
        function ko(e, t) {
            e.flags &= 65011714;
            var l = e.alternate;
            return l === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = l.childLanes, e.lanes = l.lanes, e.child = l.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = l.memoizedProps, e.memoizedState = l.memoizedState, e.updateQueue = l.updateQueue, e.type = l.type, t = l.dependencies, e.dependencies = t === null ? null : {
                lanes: t.lanes,
                firstContext: t.firstContext
            }), e;
        }
        function Di(e, t, l, a, n, i) {
            var f = 0;
            if (a = e, typeof e == "function") _c(e) && (f = 1);
            else if (typeof e == "string") f = Fx(e, l, $.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
            else e: switch(e){
                case Q:
                    return e = Nt(31, l, t, n), e.elementType = Q, e.lanes = i, e;
                case M:
                    return ia(l.children, n, i, t);
                case R:
                    f = 8, n |= 24;
                    break;
                case X:
                    return e = Nt(12, l, t, n | 2), e.elementType = X, e.lanes = i, e;
                case W:
                    return e = Nt(13, l, t, n), e.elementType = W, e.lanes = i, e;
                case ae:
                    return e = Nt(19, l, t, n), e.elementType = ae, e.lanes = i, e;
                default:
                    if (typeof e == "object" && e !== null) switch(e.$$typeof){
                        case Y:
                            f = 10;
                            break e;
                        case H:
                            f = 9;
                            break e;
                        case J:
                            f = 11;
                            break e;
                        case P:
                            f = 14;
                            break e;
                        case be:
                            f = 16, a = null;
                            break e;
                    }
                    f = 29, l = Error(r(130, e === null ? "null" : typeof e, "")), a = null;
            }
            return t = Nt(f, l, t, n), t.elementType = e, t.type = a, t.lanes = i, t;
        }
        function ia(e, t, l, a) {
            return e = Nt(7, e, a, t), e.lanes = l, e;
        }
        function Nc(e, t, l) {
            return e = Nt(6, e, null, t), e.lanes = l, e;
        }
        function Bo(e) {
            var t = Nt(18, null, null, 0);
            return t.stateNode = e, t;
        }
        function jc(e, t, l) {
            return t = Nt(4, e.children !== null ? e.children : [], e.key, t), t.lanes = l, t.stateNode = {
                containerInfo: e.containerInfo,
                pendingChildren: null,
                implementation: e.implementation
            }, t;
        }
        var qo = new WeakMap;
        function Lt(e, t) {
            if (typeof e == "object" && e !== null) {
                var l = qo.get(e);
                return l !== void 0 ? l : (t = {
                    value: e,
                    source: t,
                    stack: ye(t)
                }, qo.set(e, t), t);
            }
            return {
                value: e,
                source: t,
                stack: ye(t)
            };
        }
        var Oa = [], Da = 0, zi = null, Sn = 0, Ht = [], kt = 0, Al = null, Ft = 1, It = "";
        function cl(e, t) {
            Oa[Da++] = Sn, Oa[Da++] = zi, zi = e, Sn = t;
        }
        function Go(e, t, l) {
            Ht[kt++] = Ft, Ht[kt++] = It, Ht[kt++] = Al, Al = e;
            var a = Ft;
            e = It;
            var n = 32 - St(a) - 1;
            a &= ~(1 << n), l += 1;
            var i = 32 - St(t) + n;
            if (30 < i) {
                var f = n - n % 5;
                i = (a & (1 << f) - 1).toString(32), a >>= f, n -= f, Ft = 1 << 32 - St(t) + n | l << n | a, It = i + e;
            } else Ft = 1 << i | l << n | a, It = e;
        }
        function Ec(e) {
            e.return !== null && (cl(e, 1), Go(e, 1, 0));
        }
        function Cc(e) {
            for(; e === zi;)zi = Oa[--Da], Oa[Da] = null, Sn = Oa[--Da], Oa[Da] = null;
            for(; e === Al;)Al = Ht[--kt], Ht[kt] = null, It = Ht[--kt], Ht[kt] = null, Ft = Ht[--kt], Ht[kt] = null;
        }
        function Yo(e, t) {
            Ht[kt++] = Ft, Ht[kt++] = It, Ht[kt++] = Al, Ft = t.id, It = t.overflow, Al = e;
        }
        var st = null, Be = null, _e = !1, Rl = null, Bt = !1, Ac = Error(r(519));
        function Ml(e) {
            var t = Error(r(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", ""));
            throw _n(Lt(t, e)), Ac;
        }
        function Vo(e) {
            var t = e.stateNode, l = e.type, a = e.memoizedProps;
            switch(t[it] = e, t[pt] = a, l){
                case "dialog":
                    ge("cancel", t), ge("close", t);
                    break;
                case "iframe":
                case "object":
                case "embed":
                    ge("load", t);
                    break;
                case "video":
                case "audio":
                    for(l = 0; l < Zn.length; l++)ge(Zn[l], t);
                    break;
                case "source":
                    ge("error", t);
                    break;
                case "img":
                case "image":
                case "link":
                    ge("error", t), ge("load", t);
                    break;
                case "details":
                    ge("toggle", t);
                    break;
                case "input":
                    ge("invalid", t), to(t, a.value, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name, !0);
                    break;
                case "select":
                    ge("invalid", t);
                    break;
                case "textarea":
                    ge("invalid", t), ao(t, a.value, a.defaultValue, a.children);
            }
            l = a.children, typeof l != "string" && typeof l != "number" && typeof l != "bigint" || t.textContent === "" + l || a.suppressHydrationWarning === !0 || ch(t.textContent, l) ? (a.popover != null && (ge("beforetoggle", t), ge("toggle", t)), a.onScroll != null && ge("scroll", t), a.onScrollEnd != null && ge("scrollend", t), a.onClick != null && (t.onclick = nl), t = !0) : t = !1, t || Ml(e, !0);
        }
        function Xo(e) {
            for(st = e.return; st;)switch(st.tag){
                case 5:
                case 31:
                case 13:
                    Bt = !1;
                    return;
                case 27:
                case 3:
                    Bt = !0;
                    return;
                default:
                    st = st.return;
            }
        }
        function za(e) {
            if (e !== st) return !1;
            if (!_e) return Xo(e), _e = !0, !1;
            var t = e.tag, l;
            if ((l = t !== 3 && t !== 27) && ((l = t === 5) && (l = e.type, l = !(l !== "form" && l !== "button") || Ku(e.type, e.memoizedProps)), l = !l), l && Be && Ml(e), Xo(e), t === 13) {
                if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
                Be = xh(e);
            } else if (t === 31) {
                if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(317));
                Be = xh(e);
            } else t === 27 ? (t = Be, Ql(e.type) ? (e = Iu, Iu = null, Be = e) : Be = t) : Be = st ? Gt(e.stateNode.nextSibling) : null;
            return !0;
        }
        function sa() {
            Be = st = null, _e = !1;
        }
        function Rc() {
            var e = Rl;
            return e !== null && (gt === null ? gt = e : gt.push.apply(gt, e), Rl = null), e;
        }
        function _n(e) {
            Rl === null ? Rl = [
                e
            ] : Rl.push(e);
        }
        var Mc = T(null), ca = null, ul = null;
        function Ol(e, t, l) {
            Z(Mc, t._currentValue), t._currentValue = l;
        }
        function rl(e) {
            e._currentValue = Mc.current, k(Mc);
        }
        function Oc(e, t, l) {
            for(; e !== null;){
                var a = e.alternate;
                if ((e.childLanes & t) !== t ? (e.childLanes |= t, a !== null && (a.childLanes |= t)) : a !== null && (a.childLanes & t) !== t && (a.childLanes |= t), e === l) break;
                e = e.return;
            }
        }
        function Dc(e, t, l, a) {
            var n = e.child;
            for(n !== null && (n.return = e); n !== null;){
                var i = n.dependencies;
                if (i !== null) {
                    var f = n.child;
                    i = i.firstContext;
                    e: for(; i !== null;){
                        var h = i;
                        i = n;
                        for(var g = 0; g < t.length; g++)if (h.context === t[g]) {
                            i.lanes |= l, h = i.alternate, h !== null && (h.lanes |= l), Oc(i.return, l, e), a || (f = null);
                            break e;
                        }
                        i = h.next;
                    }
                } else if (n.tag === 18) {
                    if (f = n.return, f === null) throw Error(r(341));
                    f.lanes |= l, i = f.alternate, i !== null && (i.lanes |= l), Oc(f, l, e), f = null;
                } else f = n.child;
                if (f !== null) f.return = n;
                else for(f = n; f !== null;){
                    if (f === e) {
                        f = null;
                        break;
                    }
                    if (n = f.sibling, n !== null) {
                        n.return = f.return, f = n;
                        break;
                    }
                    f = f.return;
                }
                n = f;
            }
        }
        function Ua(e, t, l, a) {
            e = null;
            for(var n = t, i = !1; n !== null;){
                if (!i) {
                    if ((n.flags & 524288) !== 0) i = !0;
                    else if ((n.flags & 262144) !== 0) break;
                }
                if (n.tag === 10) {
                    var f = n.alternate;
                    if (f === null) throw Error(r(387));
                    if (f = f.memoizedProps, f !== null) {
                        var h = n.type;
                        _t(n.pendingProps.value, f.value) || (e !== null ? e.push(h) : e = [
                            h
                        ]);
                    }
                } else if (n === Ne.current) {
                    if (f = n.alternate, f === null) throw Error(r(387));
                    f.memoizedState.memoizedState !== n.memoizedState.memoizedState && (e !== null ? e.push(Fn) : e = [
                        Fn
                    ]);
                }
                n = n.return;
            }
            e !== null && Dc(t, e, l, a), t.flags |= 262144;
        }
        function Ui(e) {
            for(e = e.firstContext; e !== null;){
                if (!_t(e.context._currentValue, e.memoizedValue)) return !0;
                e = e.next;
            }
            return !1;
        }
        function ua(e) {
            ca = e, ul = null, e = e.dependencies, e !== null && (e.firstContext = null);
        }
        function ct(e) {
            return Qo(ca, e);
        }
        function Li(e, t) {
            return ca === null && ua(e), Qo(e, t);
        }
        function Qo(e, t) {
            var l = t._currentValue;
            if (t = {
                context: t,
                memoizedValue: l,
                next: null
            }, ul === null) {
                if (e === null) throw Error(r(308));
                ul = t, e.dependencies = {
                    lanes: 0,
                    firstContext: t
                }, e.flags |= 524288;
            } else ul = ul.next = t;
            return l;
        }
        var Kp = typeof AbortController < "u" ? AbortController : function() {
            var e = [], t = this.signal = {
                aborted: !1,
                addEventListener: function(l, a) {
                    e.push(a);
                }
            };
            this.abort = function() {
                t.aborted = !0, e.forEach(function(l) {
                    return l();
                });
            };
        }, Jp = s.unstable_scheduleCallback, $p = s.unstable_NormalPriority, Je = {
            $$typeof: Y,
            Consumer: null,
            Provider: null,
            _currentValue: null,
            _currentValue2: null,
            _threadCount: 0
        };
        function zc() {
            return {
                controller: new Kp,
                data: new Map,
                refCount: 0
            };
        }
        function Nn(e) {
            e.refCount--, e.refCount === 0 && Jp($p, function() {
                e.controller.abort();
            });
        }
        var jn = null, Uc = 0, La = 0, Ha = null;
        function Wp(e, t) {
            if (jn === null) {
                var l = jn = [];
                Uc = 0, La = ku(), Ha = {
                    status: "pending",
                    value: void 0,
                    then: function(a) {
                        l.push(a);
                    }
                };
            }
            return Uc++, t.then(Zo, Zo), t;
        }
        function Zo() {
            if (--Uc === 0 && jn !== null) {
                Ha !== null && (Ha.status = "fulfilled");
                var e = jn;
                jn = null, La = 0, Ha = null;
                for(var t = 0; t < e.length; t++)(0, e[t])();
            }
        }
        function Fp(e, t) {
            var l = [], a = {
                status: "pending",
                value: null,
                reason: null,
                then: function(n) {
                    l.push(n);
                }
            };
            return e.then(function() {
                a.status = "fulfilled", a.value = t;
                for(var n = 0; n < l.length; n++)(0, l[n])(t);
            }, function(n) {
                for(a.status = "rejected", a.reason = n, n = 0; n < l.length; n++)(0, l[n])(void 0);
            }), a;
        }
        var Ko = S.S;
        S.S = function(e, t) {
            Md = tt(), typeof t == "object" && t !== null && typeof t.then == "function" && Wp(e, t), Ko !== null && Ko(e, t);
        };
        var ra = T(null);
        function Lc() {
            var e = ra.current;
            return e !== null ? e : Le.pooledCache;
        }
        function Hi(e, t) {
            t === null ? Z(ra, ra.current) : Z(ra, t.pool);
        }
        function Jo() {
            var e = Lc();
            return e === null ? null : {
                parent: Je._currentValue,
                pool: e
            };
        }
        var ka = Error(r(460)), Hc = Error(r(474)), ki = Error(r(542)), Bi = {
            then: function() {}
        };
        function $o(e) {
            return e = e.status, e === "fulfilled" || e === "rejected";
        }
        function Wo(e, t, l) {
            switch(l = e[l], l === void 0 ? e.push(t) : l !== t && (t.then(nl, nl), t = l), t.status){
                case "fulfilled":
                    return t.value;
                case "rejected":
                    throw e = t.reason, Io(e), e;
                default:
                    if (typeof t.status == "string") t.then(nl, nl);
                    else {
                        if (e = Le, e !== null && 100 < e.shellSuspendCounter) throw Error(r(482));
                        e = t, e.status = "pending", e.then(function(a) {
                            if (t.status === "pending") {
                                var n = t;
                                n.status = "fulfilled", n.value = a;
                            }
                        }, function(a) {
                            if (t.status === "pending") {
                                var n = t;
                                n.status = "rejected", n.reason = a;
                            }
                        });
                    }
                    switch(t.status){
                        case "fulfilled":
                            return t.value;
                        case "rejected":
                            throw e = t.reason, Io(e), e;
                    }
                    throw fa = t, ka;
            }
        }
        function oa(e) {
            try {
                var t = e._init;
                return t(e._payload);
            } catch (l) {
                throw l !== null && typeof l == "object" && typeof l.then == "function" ? (fa = l, ka) : l;
            }
        }
        var fa = null;
        function Fo() {
            if (fa === null) throw Error(r(459));
            var e = fa;
            return fa = null, e;
        }
        function Io(e) {
            if (e === ka || e === ki) throw Error(r(483));
        }
        var Ba = null, En = 0;
        function qi(e) {
            var t = En;
            return En += 1, Ba === null && (Ba = []), Wo(Ba, e, t);
        }
        function Cn(e, t) {
            t = t.props.ref, e.ref = t !== void 0 ? t : null;
        }
        function Gi(e, t) {
            throw t.$$typeof === O ? Error(r(525)) : (e = Object.prototype.toString.call(t), Error(r(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
        }
        function Po(e) {
            function t(j, _) {
                if (e) {
                    var E = j.deletions;
                    E === null ? (j.deletions = [
                        _
                    ], j.flags |= 16) : E.push(_);
                }
            }
            function l(j, _) {
                if (!e) return null;
                for(; _ !== null;)t(j, _), _ = _.sibling;
                return null;
            }
            function a(j) {
                for(var _ = new Map; j !== null;)j.key !== null ? _.set(j.key, j) : _.set(j.index, j), j = j.sibling;
                return _;
            }
            function n(j, _) {
                return j = sl(j, _), j.index = 0, j.sibling = null, j;
            }
            function i(j, _, E) {
                return j.index = E, e ? (E = j.alternate, E !== null ? (E = E.index, E < _ ? (j.flags |= 67108866, _) : E) : (j.flags |= 67108866, _)) : (j.flags |= 1048576, _);
            }
            function f(j) {
                return e && j.alternate === null && (j.flags |= 67108866), j;
            }
            function h(j, _, E, q) {
                return _ === null || _.tag !== 6 ? (_ = Nc(E, j.mode, q), _.return = j, _) : (_ = n(_, E), _.return = j, _);
            }
            function g(j, _, E, q) {
                var ce = E.type;
                return ce === M ? U(j, _, E.props.children, q, E.key) : _ !== null && (_.elementType === ce || typeof ce == "object" && ce !== null && ce.$$typeof === be && oa(ce) === _.type) ? (_ = n(_, E.props), Cn(_, E), _.return = j, _) : (_ = Di(E.type, E.key, E.props, null, j.mode, q), Cn(_, E), _.return = j, _);
            }
            function C(j, _, E, q) {
                return _ === null || _.tag !== 4 || _.stateNode.containerInfo !== E.containerInfo || _.stateNode.implementation !== E.implementation ? (_ = jc(E, j.mode, q), _.return = j, _) : (_ = n(_, E.children || []), _.return = j, _);
            }
            function U(j, _, E, q, ce) {
                return _ === null || _.tag !== 7 ? (_ = ia(E, j.mode, q, ce), _.return = j, _) : (_ = n(_, E), _.return = j, _);
            }
            function G(j, _, E) {
                if (typeof _ == "string" && _ !== "" || typeof _ == "number" || typeof _ == "bigint") return _ = Nc("" + _, j.mode, E), _.return = j, _;
                if (typeof _ == "object" && _ !== null) {
                    switch(_.$$typeof){
                        case V:
                            return E = Di(_.type, _.key, _.props, null, j.mode, E), Cn(E, _), E.return = j, E;
                        case L:
                            return _ = jc(_, j.mode, E), _.return = j, _;
                        case be:
                            return _ = oa(_), G(j, _, E);
                    }
                    if (de(_) || ne(_)) return _ = ia(_, j.mode, E, null), _.return = j, _;
                    if (typeof _.then == "function") return G(j, qi(_), E);
                    if (_.$$typeof === Y) return G(j, Li(j, _), E);
                    Gi(j, _);
                }
                return null;
            }
            function A(j, _, E, q) {
                var ce = _ !== null ? _.key : null;
                if (typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint") return ce !== null ? null : h(j, _, "" + E, q);
                if (typeof E == "object" && E !== null) {
                    switch(E.$$typeof){
                        case V:
                            return E.key === ce ? g(j, _, E, q) : null;
                        case L:
                            return E.key === ce ? C(j, _, E, q) : null;
                        case be:
                            return E = oa(E), A(j, _, E, q);
                    }
                    if (de(E) || ne(E)) return ce !== null ? null : U(j, _, E, q, null);
                    if (typeof E.then == "function") return A(j, _, qi(E), q);
                    if (E.$$typeof === Y) return A(j, _, Li(j, E), q);
                    Gi(j, E);
                }
                return null;
            }
            function D(j, _, E, q, ce) {
                if (typeof q == "string" && q !== "" || typeof q == "number" || typeof q == "bigint") return j = j.get(E) || null, h(_, j, "" + q, ce);
                if (typeof q == "object" && q !== null) {
                    switch(q.$$typeof){
                        case V:
                            return j = j.get(q.key === null ? E : q.key) || null, g(_, j, q, ce);
                        case L:
                            return j = j.get(q.key === null ? E : q.key) || null, C(_, j, q, ce);
                        case be:
                            return q = oa(q), D(j, _, E, q, ce);
                    }
                    if (de(q) || ne(q)) return j = j.get(E) || null, U(_, j, q, ce, null);
                    if (typeof q.then == "function") return D(j, _, E, qi(q), ce);
                    if (q.$$typeof === Y) return D(j, _, E, Li(_, q), ce);
                    Gi(_, q);
                }
                return null;
            }
            function I(j, _, E, q) {
                for(var ce = null, Ee = null, le = _, pe = _ = 0, Se = null; le !== null && pe < E.length; pe++){
                    le.index > pe ? (Se = le, le = null) : Se = le.sibling;
                    var Ce = A(j, le, E[pe], q);
                    if (Ce === null) {
                        le === null && (le = Se);
                        break;
                    }
                    e && le && Ce.alternate === null && t(j, le), _ = i(Ce, _, pe), Ee === null ? ce = Ce : Ee.sibling = Ce, Ee = Ce, le = Se;
                }
                if (pe === E.length) return l(j, le), _e && cl(j, pe), ce;
                if (le === null) {
                    for(; pe < E.length; pe++)le = G(j, E[pe], q), le !== null && (_ = i(le, _, pe), Ee === null ? ce = le : Ee.sibling = le, Ee = le);
                    return _e && cl(j, pe), ce;
                }
                for(le = a(le); pe < E.length; pe++)Se = D(le, j, pe, E[pe], q), Se !== null && (e && Se.alternate !== null && le.delete(Se.key === null ? pe : Se.key), _ = i(Se, _, pe), Ee === null ? ce = Se : Ee.sibling = Se, Ee = Se);
                return e && le.forEach(function(Wl) {
                    return t(j, Wl);
                }), _e && cl(j, pe), ce;
            }
            function oe(j, _, E, q) {
                if (E == null) throw Error(r(151));
                for(var ce = null, Ee = null, le = _, pe = _ = 0, Se = null, Ce = E.next(); le !== null && !Ce.done; pe++, Ce = E.next()){
                    le.index > pe ? (Se = le, le = null) : Se = le.sibling;
                    var Wl = A(j, le, Ce.value, q);
                    if (Wl === null) {
                        le === null && (le = Se);
                        break;
                    }
                    e && le && Wl.alternate === null && t(j, le), _ = i(Wl, _, pe), Ee === null ? ce = Wl : Ee.sibling = Wl, Ee = Wl, le = Se;
                }
                if (Ce.done) return l(j, le), _e && cl(j, pe), ce;
                if (le === null) {
                    for(; !Ce.done; pe++, Ce = E.next())Ce = G(j, Ce.value, q), Ce !== null && (_ = i(Ce, _, pe), Ee === null ? ce = Ce : Ee.sibling = Ce, Ee = Ce);
                    return _e && cl(j, pe), ce;
                }
                for(le = a(le); !Ce.done; pe++, Ce = E.next())Ce = D(le, j, pe, Ce.value, q), Ce !== null && (e && Ce.alternate !== null && le.delete(Ce.key === null ? pe : Ce.key), _ = i(Ce, _, pe), Ee === null ? ce = Ce : Ee.sibling = Ce, Ee = Ce);
                return e && le.forEach(function(uy) {
                    return t(j, uy);
                }), _e && cl(j, pe), ce;
            }
            function Ue(j, _, E, q) {
                if (typeof E == "object" && E !== null && E.type === M && E.key === null && (E = E.props.children), typeof E == "object" && E !== null) {
                    switch(E.$$typeof){
                        case V:
                            e: {
                                for(var ce = E.key; _ !== null;){
                                    if (_.key === ce) {
                                        if (ce = E.type, ce === M) {
                                            if (_.tag === 7) {
                                                l(j, _.sibling), q = n(_, E.props.children), q.return = j, j = q;
                                                break e;
                                            }
                                        } else if (_.elementType === ce || typeof ce == "object" && ce !== null && ce.$$typeof === be && oa(ce) === _.type) {
                                            l(j, _.sibling), q = n(_, E.props), Cn(q, E), q.return = j, j = q;
                                            break e;
                                        }
                                        l(j, _);
                                        break;
                                    } else t(j, _);
                                    _ = _.sibling;
                                }
                                E.type === M ? (q = ia(E.props.children, j.mode, q, E.key), q.return = j, j = q) : (q = Di(E.type, E.key, E.props, null, j.mode, q), Cn(q, E), q.return = j, j = q);
                            }
                            return f(j);
                        case L:
                            e: {
                                for(ce = E.key; _ !== null;){
                                    if (_.key === ce) if (_.tag === 4 && _.stateNode.containerInfo === E.containerInfo && _.stateNode.implementation === E.implementation) {
                                        l(j, _.sibling), q = n(_, E.children || []), q.return = j, j = q;
                                        break e;
                                    } else {
                                        l(j, _);
                                        break;
                                    }
                                    else t(j, _);
                                    _ = _.sibling;
                                }
                                q = jc(E, j.mode, q), q.return = j, j = q;
                            }
                            return f(j);
                        case be:
                            return E = oa(E), Ue(j, _, E, q);
                    }
                    if (de(E)) return I(j, _, E, q);
                    if (ne(E)) {
                        if (ce = ne(E), typeof ce != "function") throw Error(r(150));
                        return E = ce.call(E), oe(j, _, E, q);
                    }
                    if (typeof E.then == "function") return Ue(j, _, qi(E), q);
                    if (E.$$typeof === Y) return Ue(j, _, Li(j, E), q);
                    Gi(j, E);
                }
                return typeof E == "string" && E !== "" || typeof E == "number" || typeof E == "bigint" ? (E = "" + E, _ !== null && _.tag === 6 ? (l(j, _.sibling), q = n(_, E), q.return = j, j = q) : (l(j, _), q = Nc(E, j.mode, q), q.return = j, j = q), f(j)) : l(j, _);
            }
            return function(j, _, E, q) {
                try {
                    En = 0;
                    var ce = Ue(j, _, E, q);
                    return Ba = null, ce;
                } catch (le) {
                    if (le === ka || le === ki) throw le;
                    var Ee = Nt(29, le, null, j.mode);
                    return Ee.lanes = q, Ee.return = j, Ee;
                }
            };
        }
        var da = Po(!0), ef = Po(!1), Dl = !1;
        function kc(e) {
            e.updateQueue = {
                baseState: e.memoizedState,
                firstBaseUpdate: null,
                lastBaseUpdate: null,
                shared: {
                    pending: null,
                    lanes: 0,
                    hiddenCallbacks: null
                },
                callbacks: null
            };
        }
        function Bc(e, t) {
            e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
                baseState: e.baseState,
                firstBaseUpdate: e.firstBaseUpdate,
                lastBaseUpdate: e.lastBaseUpdate,
                shared: e.shared,
                callbacks: null
            });
        }
        function zl(e) {
            return {
                lane: e,
                tag: 0,
                payload: null,
                callback: null,
                next: null
            };
        }
        function Ul(e, t, l) {
            var a = e.updateQueue;
            if (a === null) return null;
            if (a = a.shared, (Ae & 2) !== 0) {
                var n = a.pending;
                return n === null ? t.next = t : (t.next = n.next, n.next = t), a.pending = t, t = Oi(e), Ho(e, null, l), t;
            }
            return Mi(e, a, t, l), Oi(e);
        }
        function An(e, t, l) {
            if (t = t.updateQueue, t !== null && (t = t.shared, (l & 4194048) !== 0)) {
                var a = t.lanes;
                a &= e.pendingLanes, l |= a, t.lanes = l, Xr(e, l);
            }
        }
        function qc(e, t) {
            var l = e.updateQueue, a = e.alternate;
            if (a !== null && (a = a.updateQueue, l === a)) {
                var n = null, i = null;
                if (l = l.firstBaseUpdate, l !== null) {
                    do {
                        var f = {
                            lane: l.lane,
                            tag: l.tag,
                            payload: l.payload,
                            callback: null,
                            next: null
                        };
                        i === null ? n = i = f : i = i.next = f, l = l.next;
                    }while (l !== null);
                    i === null ? n = i = t : i = i.next = t;
                } else n = i = t;
                l = {
                    baseState: a.baseState,
                    firstBaseUpdate: n,
                    lastBaseUpdate: i,
                    shared: a.shared,
                    callbacks: a.callbacks
                }, e.updateQueue = l;
                return;
            }
            e = l.lastBaseUpdate, e === null ? l.firstBaseUpdate = t : e.next = t, l.lastBaseUpdate = t;
        }
        var Gc = !1;
        function Rn() {
            if (Gc) {
                var e = Ha;
                if (e !== null) throw e;
            }
        }
        function Mn(e, t, l, a) {
            Gc = !1;
            var n = e.updateQueue;
            Dl = !1;
            var i = n.firstBaseUpdate, f = n.lastBaseUpdate, h = n.shared.pending;
            if (h !== null) {
                n.shared.pending = null;
                var g = h, C = g.next;
                g.next = null, f === null ? i = C : f.next = C, f = g;
                var U = e.alternate;
                U !== null && (U = U.updateQueue, h = U.lastBaseUpdate, h !== f && (h === null ? U.firstBaseUpdate = C : h.next = C, U.lastBaseUpdate = g));
            }
            if (i !== null) {
                var G = n.baseState;
                f = 0, U = C = g = null, h = i;
                do {
                    var A = h.lane & -536870913, D = A !== h.lane;
                    if (D ? (Te & A) === A : (a & A) === A) {
                        A !== 0 && A === La && (Gc = !0), U !== null && (U = U.next = {
                            lane: 0,
                            tag: h.tag,
                            payload: h.payload,
                            callback: null,
                            next: null
                        });
                        e: {
                            var I = e, oe = h;
                            A = t;
                            var Ue = l;
                            switch(oe.tag){
                                case 1:
                                    if (I = oe.payload, typeof I == "function") {
                                        G = I.call(Ue, G, A);
                                        break e;
                                    }
                                    G = I;
                                    break e;
                                case 3:
                                    I.flags = I.flags & -65537 | 128;
                                case 0:
                                    if (I = oe.payload, A = typeof I == "function" ? I.call(Ue, G, A) : I, A == null) break e;
                                    G = w({}, G, A);
                                    break e;
                                case 2:
                                    Dl = !0;
                            }
                        }
                        A = h.callback, A !== null && (e.flags |= 64, D && (e.flags |= 8192), D = n.callbacks, D === null ? n.callbacks = [
                            A
                        ] : D.push(A));
                    } else D = {
                        lane: A,
                        tag: h.tag,
                        payload: h.payload,
                        callback: h.callback,
                        next: null
                    }, U === null ? (C = U = D, g = G) : U = U.next = D, f |= A;
                    if (h = h.next, h === null) {
                        if (h = n.shared.pending, h === null) break;
                        D = h, h = D.next, D.next = null, n.lastBaseUpdate = D, n.shared.pending = null;
                    }
                }while (!0);
                U === null && (g = G), n.baseState = g, n.firstBaseUpdate = C, n.lastBaseUpdate = U, i === null && (n.shared.lanes = 0), ql |= f, e.lanes = f, e.memoizedState = G;
            }
        }
        function tf(e, t) {
            if (typeof e != "function") throw Error(r(191, e));
            e.call(t);
        }
        function lf(e, t) {
            var l = e.callbacks;
            if (l !== null) for(e.callbacks = null, e = 0; e < l.length; e++)tf(l[e], t);
        }
        var qa = T(null), Yi = T(0);
        function af(e, t) {
            e = bl, Z(Yi, e), Z(qa, t), bl = e | t.baseLanes;
        }
        function Yc() {
            Z(Yi, bl), Z(qa, qa.current);
        }
        function Vc() {
            bl = Yi.current, k(qa), k(Yi);
        }
        var jt = T(null), qt = null;
        function Ll(e) {
            var t = e.alternate;
            Z(Ze, Ze.current & 1), Z(jt, e), qt === null && (t === null || qa.current !== null || t.memoizedState !== null) && (qt = e);
        }
        function Xc(e) {
            Z(Ze, Ze.current), Z(jt, e), qt === null && (qt = e);
        }
        function nf(e) {
            e.tag === 22 ? (Z(Ze, Ze.current), Z(jt, e), qt === null && (qt = e)) : Hl();
        }
        function Hl() {
            Z(Ze, Ze.current), Z(jt, jt.current);
        }
        function Et(e) {
            k(jt), qt === e && (qt = null), k(Ze);
        }
        var Ze = T(0);
        function Vi(e) {
            for(var t = e; t !== null;){
                if (t.tag === 13) {
                    var l = t.memoizedState;
                    if (l !== null && (l = l.dehydrated, l === null || Wu(l) || Fu(l))) return t;
                } else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
                    if ((t.flags & 128) !== 0) return t;
                } else if (t.child !== null) {
                    t.child.return = t, t = t.child;
                    continue;
                }
                if (t === e) break;
                for(; t.sibling === null;){
                    if (t.return === null || t.return === e) return null;
                    t = t.return;
                }
                t.sibling.return = t.return, t = t.sibling;
            }
            return null;
        }
        var ol = 0, me = null, De = null, $e = null, Xi = !1, Ga = !1, ha = !1, Qi = 0, On = 0, Ya = null, Ip = 0;
        function Ve() {
            throw Error(r(321));
        }
        function Qc(e, t) {
            if (t === null) return !1;
            for(var l = 0; l < t.length && l < e.length; l++)if (!_t(e[l], t[l])) return !1;
            return !0;
        }
        function Zc(e, t, l, a, n, i) {
            return ol = i, me = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, S.H = e === null || e.memoizedState === null ? Yf : cu, ha = !1, i = l(a, n), ha = !1, Ga && (i = cf(t, l, a, n)), sf(e), i;
        }
        function sf(e) {
            S.H = Un;
            var t = De !== null && De.next !== null;
            if (ol = 0, $e = De = me = null, Xi = !1, On = 0, Ya = null, t) throw Error(r(300));
            e === null || We || (e = e.dependencies, e !== null && Ui(e) && (We = !0));
        }
        function cf(e, t, l, a) {
            me = e;
            var n = 0;
            do {
                if (Ga && (Ya = null), On = 0, Ga = !1, 25 <= n) throw Error(r(301));
                if (n += 1, $e = De = null, e.updateQueue != null) {
                    var i = e.updateQueue;
                    i.lastEffect = null, i.events = null, i.stores = null, i.memoCache != null && (i.memoCache.index = 0);
                }
                S.H = Vf, i = t(l, a);
            }while (Ga);
            return i;
        }
        function Pp() {
            var e = S.H, t = e.useState()[0];
            return t = typeof t.then == "function" ? Dn(t) : t, e = e.useState()[0], (De !== null ? De.memoizedState : null) !== e && (me.flags |= 1024), t;
        }
        function Kc() {
            var e = Qi !== 0;
            return Qi = 0, e;
        }
        function Jc(e, t, l) {
            t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l;
        }
        function $c(e) {
            if (Xi) {
                for(e = e.memoizedState; e !== null;){
                    var t = e.queue;
                    t !== null && (t.pending = null), e = e.next;
                }
                Xi = !1;
            }
            ol = 0, $e = De = me = null, Ga = !1, On = Qi = 0, Ya = null;
        }
        function ht() {
            var e = {
                memoizedState: null,
                baseState: null,
                baseQueue: null,
                queue: null,
                next: null
            };
            return $e === null ? me.memoizedState = $e = e : $e = $e.next = e, $e;
        }
        function Ke() {
            if (De === null) {
                var e = me.alternate;
                e = e !== null ? e.memoizedState : null;
            } else e = De.next;
            var t = $e === null ? me.memoizedState : $e.next;
            if (t !== null) $e = t, De = e;
            else {
                if (e === null) throw me.alternate === null ? Error(r(467)) : Error(r(310));
                De = e, e = {
                    memoizedState: De.memoizedState,
                    baseState: De.baseState,
                    baseQueue: De.baseQueue,
                    queue: De.queue,
                    next: null
                }, $e === null ? me.memoizedState = $e = e : $e = $e.next = e;
            }
            return $e;
        }
        function Zi() {
            return {
                lastEffect: null,
                events: null,
                stores: null,
                memoCache: null
            };
        }
        function Dn(e) {
            var t = On;
            return On += 1, Ya === null && (Ya = []), e = Wo(Ya, e, t), t = me, ($e === null ? t.memoizedState : $e.next) === null && (t = t.alternate, S.H = t === null || t.memoizedState === null ? Yf : cu), e;
        }
        function Ki(e) {
            if (e !== null && typeof e == "object") {
                if (typeof e.then == "function") return Dn(e);
                if (e.$$typeof === Y) return ct(e);
            }
            throw Error(r(438, String(e)));
        }
        function Wc(e) {
            var t = null, l = me.updateQueue;
            if (l !== null && (t = l.memoCache), t == null) {
                var a = me.alternate;
                a !== null && (a = a.updateQueue, a !== null && (a = a.memoCache, a != null && (t = {
                    data: a.data.map(function(n) {
                        return n.slice();
                    }),
                    index: 0
                })));
            }
            if (t == null && (t = {
                data: [],
                index: 0
            }), l === null && (l = Zi(), me.updateQueue = l), l.memoCache = t, l = t.data[t.index], l === void 0) for(l = t.data[t.index] = Array(e), a = 0; a < e; a++)l[a] = ee;
            return t.index++, l;
        }
        function fl(e, t) {
            return typeof t == "function" ? t(e) : t;
        }
        function Ji(e) {
            var t = Ke();
            return Fc(t, De, e);
        }
        function Fc(e, t, l) {
            var a = e.queue;
            if (a === null) throw Error(r(311));
            a.lastRenderedReducer = l;
            var n = e.baseQueue, i = a.pending;
            if (i !== null) {
                if (n !== null) {
                    var f = n.next;
                    n.next = i.next, i.next = f;
                }
                t.baseQueue = n = i, a.pending = null;
            }
            if (i = e.baseState, n === null) e.memoizedState = i;
            else {
                t = n.next;
                var h = f = null, g = null, C = t, U = !1;
                do {
                    var G = C.lane & -536870913;
                    if (G !== C.lane ? (Te & G) === G : (ol & G) === G) {
                        var A = C.revertLane;
                        if (A === 0) g !== null && (g = g.next = {
                            lane: 0,
                            revertLane: 0,
                            gesture: null,
                            action: C.action,
                            hasEagerState: C.hasEagerState,
                            eagerState: C.eagerState,
                            next: null
                        }), G === La && (U = !0);
                        else if ((ol & A) === A) {
                            C = C.next, A === La && (U = !0);
                            continue;
                        } else G = {
                            lane: 0,
                            revertLane: C.revertLane,
                            gesture: null,
                            action: C.action,
                            hasEagerState: C.hasEagerState,
                            eagerState: C.eagerState,
                            next: null
                        }, g === null ? (h = g = G, f = i) : g = g.next = G, me.lanes |= A, ql |= A;
                        G = C.action, ha && l(i, G), i = C.hasEagerState ? C.eagerState : l(i, G);
                    } else A = {
                        lane: G,
                        revertLane: C.revertLane,
                        gesture: C.gesture,
                        action: C.action,
                        hasEagerState: C.hasEagerState,
                        eagerState: C.eagerState,
                        next: null
                    }, g === null ? (h = g = A, f = i) : g = g.next = A, me.lanes |= G, ql |= G;
                    C = C.next;
                }while (C !== null && C !== t);
                if (g === null ? f = i : g.next = h, !_t(i, e.memoizedState) && (We = !0, U && (l = Ha, l !== null))) throw l;
                e.memoizedState = i, e.baseState = f, e.baseQueue = g, a.lastRenderedState = i;
            }
            return n === null && (a.lanes = 0), [
                e.memoizedState,
                a.dispatch
            ];
        }
        function Ic(e) {
            var t = Ke(), l = t.queue;
            if (l === null) throw Error(r(311));
            l.lastRenderedReducer = e;
            var a = l.dispatch, n = l.pending, i = t.memoizedState;
            if (n !== null) {
                l.pending = null;
                var f = n = n.next;
                do i = e(i, f.action), f = f.next;
                while (f !== n);
                _t(i, t.memoizedState) || (We = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), l.lastRenderedState = i;
            }
            return [
                i,
                a
            ];
        }
        function uf(e, t, l) {
            var a = me, n = Ke(), i = _e;
            if (i) {
                if (l === void 0) throw Error(r(407));
                l = l();
            } else l = t();
            var f = !_t((De || n).memoizedState, l);
            if (f && (n.memoizedState = l, We = !0), n = n.queue, tu(ff.bind(null, a, n, e), [
                e
            ]), n.getSnapshot !== t || f || $e !== null && $e.memoizedState.tag & 1) {
                if (a.flags |= 2048, Va(9, {
                    destroy: void 0
                }, of.bind(null, a, n, l, t), null), Le === null) throw Error(r(349));
                i || (ol & 127) !== 0 || rf(a, t, l);
            }
            return l;
        }
        function rf(e, t, l) {
            e.flags |= 16384, e = {
                getSnapshot: t,
                value: l
            }, t = me.updateQueue, t === null ? (t = Zi(), me.updateQueue = t, t.stores = [
                e
            ]) : (l = t.stores, l === null ? t.stores = [
                e
            ] : l.push(e));
        }
        function of(e, t, l, a) {
            t.value = l, t.getSnapshot = a, df(t) && hf(e);
        }
        function ff(e, t, l) {
            return l(function() {
                df(t) && hf(e);
            });
        }
        function df(e) {
            var t = e.getSnapshot;
            e = e.value;
            try {
                var l = t();
                return !_t(e, l);
            } catch  {
                return !0;
            }
        }
        function hf(e) {
            var t = na(e, 2);
            t !== null && wt(t, e, 2);
        }
        function Pc(e) {
            var t = ht();
            if (typeof e == "function") {
                var l = e;
                if (e = l(), ha) {
                    jl(!0);
                    try {
                        l();
                    } finally{
                        jl(!1);
                    }
                }
            }
            return t.memoizedState = t.baseState = e, t.queue = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: fl,
                lastRenderedState: e
            }, t;
        }
        function mf(e, t, l, a) {
            return e.baseState = l, Fc(e, De, typeof a == "function" ? a : fl);
        }
        function ex(e, t, l, a, n) {
            if (Fi(e)) throw Error(r(485));
            if (e = t.action, e !== null) {
                var i = {
                    payload: n,
                    action: e,
                    next: null,
                    isTransition: !0,
                    status: "pending",
                    value: null,
                    reason: null,
                    listeners: [],
                    then: function(f) {
                        i.listeners.push(f);
                    }
                };
                S.T !== null ? l(!0) : i.isTransition = !1, a(i), l = t.pending, l === null ? (i.next = t.pending = i, pf(t, i)) : (i.next = l.next, t.pending = l.next = i);
            }
        }
        function pf(e, t) {
            var l = t.action, a = t.payload, n = e.state;
            if (t.isTransition) {
                var i = S.T, f = {};
                S.T = f;
                try {
                    var h = l(n, a), g = S.S;
                    g !== null && g(f, h), xf(e, t, h);
                } catch (C) {
                    eu(e, t, C);
                } finally{
                    i !== null && f.types !== null && (i.types = f.types), S.T = i;
                }
            } else try {
                i = l(n, a), xf(e, t, i);
            } catch (C) {
                eu(e, t, C);
            }
        }
        function xf(e, t, l) {
            l !== null && typeof l == "object" && typeof l.then == "function" ? l.then(function(a) {
                yf(e, t, a);
            }, function(a) {
                return eu(e, t, a);
            }) : yf(e, t, l);
        }
        function yf(e, t, l) {
            t.status = "fulfilled", t.value = l, bf(t), e.state = l, t = e.pending, t !== null && (l = t.next, l === t ? e.pending = null : (l = l.next, t.next = l, pf(e, l)));
        }
        function eu(e, t, l) {
            var a = e.pending;
            if (e.pending = null, a !== null) {
                a = a.next;
                do t.status = "rejected", t.reason = l, bf(t), t = t.next;
                while (t !== a);
            }
            e.action = null;
        }
        function bf(e) {
            e = e.listeners;
            for(var t = 0; t < e.length; t++)(0, e[t])();
        }
        function vf(e, t) {
            return t;
        }
        function gf(e, t) {
            if (_e) {
                var l = Le.formState;
                if (l !== null) {
                    e: {
                        var a = me;
                        if (_e) {
                            if (Be) {
                                t: {
                                    for(var n = Be, i = Bt; n.nodeType !== 8;){
                                        if (!i) {
                                            n = null;
                                            break t;
                                        }
                                        if (n = Gt(n.nextSibling), n === null) {
                                            n = null;
                                            break t;
                                        }
                                    }
                                    i = n.data, n = i === "F!" || i === "F" ? n : null;
                                }
                                if (n) {
                                    Be = Gt(n.nextSibling), a = n.data === "F!";
                                    break e;
                                }
                            }
                            Ml(a);
                        }
                        a = !1;
                    }
                    a && (t = l[0]);
                }
            }
            return l = ht(), l.memoizedState = l.baseState = t, a = {
                pending: null,
                lanes: 0,
                dispatch: null,
                lastRenderedReducer: vf,
                lastRenderedState: t
            }, l.queue = a, l = Bf.bind(null, me, a), a.dispatch = l, a = Pc(!1), i = su.bind(null, me, !1, a.queue), a = ht(), n = {
                state: t,
                dispatch: null,
                action: e,
                pending: null
            }, a.queue = n, l = ex.bind(null, me, n, i, l), n.dispatch = l, a.memoizedState = e, [
                t,
                l,
                !1
            ];
        }
        function wf(e) {
            var t = Ke();
            return Tf(t, De, e);
        }
        function Tf(e, t, l) {
            if (t = Fc(e, t, vf)[0], e = Ji(fl)[0], typeof t == "object" && t !== null && typeof t.then == "function") try {
                var a = Dn(t);
            } catch (f) {
                throw f === ka ? ki : f;
            }
            else a = t;
            t = Ke();
            var n = t.queue, i = n.dispatch;
            return l !== t.memoizedState && (me.flags |= 2048, Va(9, {
                destroy: void 0
            }, tx.bind(null, n, l), null)), [
                a,
                i,
                e
            ];
        }
        function tx(e, t) {
            e.action = t;
        }
        function Sf(e) {
            var t = Ke(), l = De;
            if (l !== null) return Tf(t, l, e);
            Ke(), t = t.memoizedState, l = Ke();
            var a = l.queue.dispatch;
            return l.memoizedState = e, [
                t,
                a,
                !1
            ];
        }
        function Va(e, t, l, a) {
            return e = {
                tag: e,
                create: l,
                deps: a,
                inst: t,
                next: null
            }, t = me.updateQueue, t === null && (t = Zi(), me.updateQueue = t), l = t.lastEffect, l === null ? t.lastEffect = e.next = e : (a = l.next, l.next = e, e.next = a, t.lastEffect = e), e;
        }
        function _f() {
            return Ke().memoizedState;
        }
        function $i(e, t, l, a) {
            var n = ht();
            me.flags |= e, n.memoizedState = Va(1 | t, {
                destroy: void 0
            }, l, a === void 0 ? null : a);
        }
        function Wi(e, t, l, a) {
            var n = Ke();
            a = a === void 0 ? null : a;
            var i = n.memoizedState.inst;
            De !== null && a !== null && Qc(a, De.memoizedState.deps) ? n.memoizedState = Va(t, i, l, a) : (me.flags |= e, n.memoizedState = Va(1 | t, i, l, a));
        }
        function Nf(e, t) {
            $i(8390656, 8, e, t);
        }
        function tu(e, t) {
            Wi(2048, 8, e, t);
        }
        function lx(e) {
            me.flags |= 4;
            var t = me.updateQueue;
            if (t === null) t = Zi(), me.updateQueue = t, t.events = [
                e
            ];
            else {
                var l = t.events;
                l === null ? t.events = [
                    e
                ] : l.push(e);
            }
        }
        function jf(e) {
            var t = Ke().memoizedState;
            return lx({
                ref: t,
                nextImpl: e
            }), function() {
                if ((Ae & 2) !== 0) throw Error(r(440));
                return t.impl.apply(void 0, arguments);
            };
        }
        function Ef(e, t) {
            return Wi(4, 2, e, t);
        }
        function Cf(e, t) {
            return Wi(4, 4, e, t);
        }
        function Af(e, t) {
            if (typeof t == "function") {
                e = e();
                var l = t(e);
                return function() {
                    typeof l == "function" ? l() : t(null);
                };
            }
            if (t != null) return e = e(), t.current = e, function() {
                t.current = null;
            };
        }
        function Rf(e, t, l) {
            l = l != null ? l.concat([
                e
            ]) : null, Wi(4, 4, Af.bind(null, t, e), l);
        }
        function lu() {}
        function Mf(e, t) {
            var l = Ke();
            t = t === void 0 ? null : t;
            var a = l.memoizedState;
            return t !== null && Qc(t, a[1]) ? a[0] : (l.memoizedState = [
                e,
                t
            ], e);
        }
        function Of(e, t) {
            var l = Ke();
            t = t === void 0 ? null : t;
            var a = l.memoizedState;
            if (t !== null && Qc(t, a[1])) return a[0];
            if (a = e(), ha) {
                jl(!0);
                try {
                    e();
                } finally{
                    jl(!1);
                }
            }
            return l.memoizedState = [
                a,
                t
            ], a;
        }
        function au(e, t, l) {
            return l === void 0 || (ol & 1073741824) !== 0 && (Te & 261930) === 0 ? e.memoizedState = t : (e.memoizedState = l, e = Dd(), me.lanes |= e, ql |= e, l);
        }
        function Df(e, t, l, a) {
            return _t(l, t) ? l : qa.current !== null ? (e = au(e, l, a), _t(e, t) || (We = !0), e) : (ol & 42) === 0 || (ol & 1073741824) !== 0 && (Te & 261930) === 0 ? (We = !0, e.memoizedState = l) : (e = Dd(), me.lanes |= e, ql |= e, t);
        }
        function zf(e, t, l, a, n) {
            var i = z.p;
            z.p = i !== 0 && 8 > i ? i : 8;
            var f = S.T, h = {};
            S.T = h, su(e, !1, t, l);
            try {
                var g = n(), C = S.S;
                if (C !== null && C(h, g), g !== null && typeof g == "object" && typeof g.then == "function") {
                    var U = Fp(g, a);
                    zn(e, t, U, Rt(e));
                } else zn(e, t, a, Rt(e));
            } catch (G) {
                zn(e, t, {
                    then: function() {},
                    status: "rejected",
                    reason: G
                }, Rt());
            } finally{
                z.p = i, f !== null && h.types !== null && (f.types = h.types), S.T = f;
            }
        }
        function ax() {}
        function nu(e, t, l, a) {
            if (e.tag !== 5) throw Error(r(476));
            var n = Uf(e).queue;
            zf(e, n, t, B, l === null ? ax : function() {
                return Lf(e), l(a);
            });
        }
        function Uf(e) {
            var t = e.memoizedState;
            if (t !== null) return t;
            t = {
                memoizedState: B,
                baseState: B,
                baseQueue: null,
                queue: {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: fl,
                    lastRenderedState: B
                },
                next: null
            };
            var l = {};
            return t.next = {
                memoizedState: l,
                baseState: l,
                baseQueue: null,
                queue: {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: fl,
                    lastRenderedState: l
                },
                next: null
            }, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
        }
        function Lf(e) {
            var t = Uf(e);
            t.next === null && (t = e.alternate.memoizedState), zn(e, t.next.queue, {}, Rt());
        }
        function iu() {
            return ct(Fn);
        }
        function Hf() {
            return Ke().memoizedState;
        }
        function kf() {
            return Ke().memoizedState;
        }
        function nx(e) {
            for(var t = e.return; t !== null;){
                switch(t.tag){
                    case 24:
                    case 3:
                        var l = Rt();
                        e = zl(l);
                        var a = Ul(t, e, l);
                        a !== null && (wt(a, t, l), An(a, t, l)), t = {
                            cache: zc()
                        }, e.payload = t;
                        return;
                }
                t = t.return;
            }
        }
        function ix(e, t, l) {
            var a = Rt();
            l = {
                lane: a,
                revertLane: 0,
                gesture: null,
                action: l,
                hasEagerState: !1,
                eagerState: null,
                next: null
            }, Fi(e) ? qf(t, l) : (l = Sc(e, t, l, a), l !== null && (wt(l, e, a), Gf(l, t, a)));
        }
        function Bf(e, t, l) {
            var a = Rt();
            zn(e, t, l, a);
        }
        function zn(e, t, l, a) {
            var n = {
                lane: a,
                revertLane: 0,
                gesture: null,
                action: l,
                hasEagerState: !1,
                eagerState: null,
                next: null
            };
            if (Fi(e)) qf(t, n);
            else {
                var i = e.alternate;
                if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
                    var f = t.lastRenderedState, h = i(f, l);
                    if (n.hasEagerState = !0, n.eagerState = h, _t(h, f)) return Mi(e, t, n, 0), Le === null && Ri(), !1;
                } catch  {}
                if (l = Sc(e, t, n, a), l !== null) return wt(l, e, a), Gf(l, t, a), !0;
            }
            return !1;
        }
        function su(e, t, l, a) {
            if (a = {
                lane: 2,
                revertLane: ku(),
                gesture: null,
                action: a,
                hasEagerState: !1,
                eagerState: null,
                next: null
            }, Fi(e)) {
                if (t) throw Error(r(479));
            } else t = Sc(e, l, a, 2), t !== null && wt(t, e, 2);
        }
        function Fi(e) {
            var t = e.alternate;
            return e === me || t !== null && t === me;
        }
        function qf(e, t) {
            Ga = Xi = !0;
            var l = e.pending;
            l === null ? t.next = t : (t.next = l.next, l.next = t), e.pending = t;
        }
        function Gf(e, t, l) {
            if ((l & 4194048) !== 0) {
                var a = t.lanes;
                a &= e.pendingLanes, l |= a, t.lanes = l, Xr(e, l);
            }
        }
        var Un = {
            readContext: ct,
            use: Ki,
            useCallback: Ve,
            useContext: Ve,
            useEffect: Ve,
            useImperativeHandle: Ve,
            useLayoutEffect: Ve,
            useInsertionEffect: Ve,
            useMemo: Ve,
            useReducer: Ve,
            useRef: Ve,
            useState: Ve,
            useDebugValue: Ve,
            useDeferredValue: Ve,
            useTransition: Ve,
            useSyncExternalStore: Ve,
            useId: Ve,
            useHostTransitionStatus: Ve,
            useFormState: Ve,
            useActionState: Ve,
            useOptimistic: Ve,
            useMemoCache: Ve,
            useCacheRefresh: Ve
        };
        Un.useEffectEvent = Ve;
        var Yf = {
            readContext: ct,
            use: Ki,
            useCallback: function(e, t) {
                return ht().memoizedState = [
                    e,
                    t === void 0 ? null : t
                ], e;
            },
            useContext: ct,
            useEffect: Nf,
            useImperativeHandle: function(e, t, l) {
                l = l != null ? l.concat([
                    e
                ]) : null, $i(4194308, 4, Af.bind(null, t, e), l);
            },
            useLayoutEffect: function(e, t) {
                return $i(4194308, 4, e, t);
            },
            useInsertionEffect: function(e, t) {
                $i(4, 2, e, t);
            },
            useMemo: function(e, t) {
                var l = ht();
                t = t === void 0 ? null : t;
                var a = e();
                if (ha) {
                    jl(!0);
                    try {
                        e();
                    } finally{
                        jl(!1);
                    }
                }
                return l.memoizedState = [
                    a,
                    t
                ], a;
            },
            useReducer: function(e, t, l) {
                var a = ht();
                if (l !== void 0) {
                    var n = l(t);
                    if (ha) {
                        jl(!0);
                        try {
                            l(t);
                        } finally{
                            jl(!1);
                        }
                    }
                } else n = t;
                return a.memoizedState = a.baseState = n, e = {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: e,
                    lastRenderedState: n
                }, a.queue = e, e = e.dispatch = ix.bind(null, me, e), [
                    a.memoizedState,
                    e
                ];
            },
            useRef: function(e) {
                var t = ht();
                return e = {
                    current: e
                }, t.memoizedState = e;
            },
            useState: function(e) {
                e = Pc(e);
                var t = e.queue, l = Bf.bind(null, me, t);
                return t.dispatch = l, [
                    e.memoizedState,
                    l
                ];
            },
            useDebugValue: lu,
            useDeferredValue: function(e, t) {
                var l = ht();
                return au(l, e, t);
            },
            useTransition: function() {
                var e = Pc(!1);
                return e = zf.bind(null, me, e.queue, !0, !1), ht().memoizedState = e, [
                    !1,
                    e
                ];
            },
            useSyncExternalStore: function(e, t, l) {
                var a = me, n = ht();
                if (_e) {
                    if (l === void 0) throw Error(r(407));
                    l = l();
                } else {
                    if (l = t(), Le === null) throw Error(r(349));
                    (Te & 127) !== 0 || rf(a, t, l);
                }
                n.memoizedState = l;
                var i = {
                    value: l,
                    getSnapshot: t
                };
                return n.queue = i, Nf(ff.bind(null, a, i, e), [
                    e
                ]), a.flags |= 2048, Va(9, {
                    destroy: void 0
                }, of.bind(null, a, i, l, t), null), l;
            },
            useId: function() {
                var e = ht(), t = Le.identifierPrefix;
                if (_e) {
                    var l = It, a = Ft;
                    l = (a & ~(1 << 32 - St(a) - 1)).toString(32) + l, t = "_" + t + "R_" + l, l = Qi++, 0 < l && (t += "H" + l.toString(32)), t += "_";
                } else l = Ip++, t = "_" + t + "r_" + l.toString(32) + "_";
                return e.memoizedState = t;
            },
            useHostTransitionStatus: iu,
            useFormState: gf,
            useActionState: gf,
            useOptimistic: function(e) {
                var t = ht();
                t.memoizedState = t.baseState = e;
                var l = {
                    pending: null,
                    lanes: 0,
                    dispatch: null,
                    lastRenderedReducer: null,
                    lastRenderedState: null
                };
                return t.queue = l, t = su.bind(null, me, !0, l), l.dispatch = t, [
                    e,
                    t
                ];
            },
            useMemoCache: Wc,
            useCacheRefresh: function() {
                return ht().memoizedState = nx.bind(null, me);
            },
            useEffectEvent: function(e) {
                var t = ht(), l = {
                    impl: e
                };
                return t.memoizedState = l, function() {
                    if ((Ae & 2) !== 0) throw Error(r(440));
                    return l.impl.apply(void 0, arguments);
                };
            }
        }, cu = {
            readContext: ct,
            use: Ki,
            useCallback: Mf,
            useContext: ct,
            useEffect: tu,
            useImperativeHandle: Rf,
            useInsertionEffect: Ef,
            useLayoutEffect: Cf,
            useMemo: Of,
            useReducer: Ji,
            useRef: _f,
            useState: function() {
                return Ji(fl);
            },
            useDebugValue: lu,
            useDeferredValue: function(e, t) {
                var l = Ke();
                return Df(l, De.memoizedState, e, t);
            },
            useTransition: function() {
                var e = Ji(fl)[0], t = Ke().memoizedState;
                return [
                    typeof e == "boolean" ? e : Dn(e),
                    t
                ];
            },
            useSyncExternalStore: uf,
            useId: Hf,
            useHostTransitionStatus: iu,
            useFormState: wf,
            useActionState: wf,
            useOptimistic: function(e, t) {
                var l = Ke();
                return mf(l, De, e, t);
            },
            useMemoCache: Wc,
            useCacheRefresh: kf
        };
        cu.useEffectEvent = jf;
        var Vf = {
            readContext: ct,
            use: Ki,
            useCallback: Mf,
            useContext: ct,
            useEffect: tu,
            useImperativeHandle: Rf,
            useInsertionEffect: Ef,
            useLayoutEffect: Cf,
            useMemo: Of,
            useReducer: Ic,
            useRef: _f,
            useState: function() {
                return Ic(fl);
            },
            useDebugValue: lu,
            useDeferredValue: function(e, t) {
                var l = Ke();
                return De === null ? au(l, e, t) : Df(l, De.memoizedState, e, t);
            },
            useTransition: function() {
                var e = Ic(fl)[0], t = Ke().memoizedState;
                return [
                    typeof e == "boolean" ? e : Dn(e),
                    t
                ];
            },
            useSyncExternalStore: uf,
            useId: Hf,
            useHostTransitionStatus: iu,
            useFormState: Sf,
            useActionState: Sf,
            useOptimistic: function(e, t) {
                var l = Ke();
                return De !== null ? mf(l, De, e, t) : (l.baseState = e, [
                    e,
                    l.queue.dispatch
                ]);
            },
            useMemoCache: Wc,
            useCacheRefresh: kf
        };
        Vf.useEffectEvent = jf;
        function uu(e, t, l, a) {
            t = e.memoizedState, l = l(a, t), l = l == null ? t : w({}, t, l), e.memoizedState = l, e.lanes === 0 && (e.updateQueue.baseState = l);
        }
        var ru = {
            enqueueSetState: function(e, t, l) {
                e = e._reactInternals;
                var a = Rt(), n = zl(a);
                n.payload = t, l != null && (n.callback = l), t = Ul(e, n, a), t !== null && (wt(t, e, a), An(t, e, a));
            },
            enqueueReplaceState: function(e, t, l) {
                e = e._reactInternals;
                var a = Rt(), n = zl(a);
                n.tag = 1, n.payload = t, l != null && (n.callback = l), t = Ul(e, n, a), t !== null && (wt(t, e, a), An(t, e, a));
            },
            enqueueForceUpdate: function(e, t) {
                e = e._reactInternals;
                var l = Rt(), a = zl(l);
                a.tag = 2, t != null && (a.callback = t), t = Ul(e, a, l), t !== null && (wt(t, e, l), An(t, e, l));
            }
        };
        function Xf(e, t, l, a, n, i, f) {
            return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(a, i, f) : t.prototype && t.prototype.isPureReactComponent ? !wn(l, a) || !wn(n, i) : !0;
        }
        function Qf(e, t, l, a) {
            e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(l, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(l, a), t.state !== e && ru.enqueueReplaceState(t, t.state, null);
        }
        function ma(e, t) {
            var l = t;
            if ("ref" in t) {
                l = {};
                for(var a in t)a !== "ref" && (l[a] = t[a]);
            }
            if (e = e.defaultProps) {
                l === t && (l = w({}, l));
                for(var n in e)l[n] === void 0 && (l[n] = e[n]);
            }
            return l;
        }
        function Zf(e) {
            Ai(e);
        }
        function Kf(e) {
            console.error(e);
        }
        function Jf(e) {
            Ai(e);
        }
        function Ii(e, t) {
            try {
                var l = e.onUncaughtError;
                l(t.value, {
                    componentStack: t.stack
                });
            } catch (a) {
                setTimeout(function() {
                    throw a;
                });
            }
        }
        function $f(e, t, l) {
            try {
                var a = e.onCaughtError;
                a(l.value, {
                    componentStack: l.stack,
                    errorBoundary: t.tag === 1 ? t.stateNode : null
                });
            } catch (n) {
                setTimeout(function() {
                    throw n;
                });
            }
        }
        function ou(e, t, l) {
            return l = zl(l), l.tag = 3, l.payload = {
                element: null
            }, l.callback = function() {
                Ii(e, t);
            }, l;
        }
        function Wf(e) {
            return e = zl(e), e.tag = 3, e;
        }
        function Ff(e, t, l, a) {
            var n = l.type.getDerivedStateFromError;
            if (typeof n == "function") {
                var i = a.value;
                e.payload = function() {
                    return n(i);
                }, e.callback = function() {
                    $f(t, l, a);
                };
            }
            var f = l.stateNode;
            f !== null && typeof f.componentDidCatch == "function" && (e.callback = function() {
                $f(t, l, a), typeof n != "function" && (Gl === null ? Gl = new Set([
                    this
                ]) : Gl.add(this));
                var h = a.stack;
                this.componentDidCatch(a.value, {
                    componentStack: h !== null ? h : ""
                });
            });
        }
        function sx(e, t, l, a, n) {
            if (l.flags |= 32768, a !== null && typeof a == "object" && typeof a.then == "function") {
                if (t = l.alternate, t !== null && Ua(t, l, n, !0), l = jt.current, l !== null) {
                    switch(l.tag){
                        case 31:
                        case 13:
                            return qt === null ? os() : l.alternate === null && Xe === 0 && (Xe = 3), l.flags &= -257, l.flags |= 65536, l.lanes = n, a === Bi ? l.flags |= 16384 : (t = l.updateQueue, t === null ? l.updateQueue = new Set([
                                a
                            ]) : t.add(a), Uu(e, a, n)), !1;
                        case 22:
                            return l.flags |= 65536, a === Bi ? l.flags |= 16384 : (t = l.updateQueue, t === null ? (t = {
                                transitions: null,
                                markerInstances: null,
                                retryQueue: new Set([
                                    a
                                ])
                            }, l.updateQueue = t) : (l = t.retryQueue, l === null ? t.retryQueue = new Set([
                                a
                            ]) : l.add(a)), Uu(e, a, n)), !1;
                    }
                    throw Error(r(435, l.tag));
                }
                return Uu(e, a, n), os(), !1;
            }
            if (_e) return t = jt.current, t !== null ? ((t.flags & 65536) === 0 && (t.flags |= 256), t.flags |= 65536, t.lanes = n, a !== Ac && (e = Error(r(422), {
                cause: a
            }), _n(Lt(e, l)))) : (a !== Ac && (t = Error(r(423), {
                cause: a
            }), _n(Lt(t, l))), e = e.current.alternate, e.flags |= 65536, n &= -n, e.lanes |= n, a = Lt(a, l), n = ou(e.stateNode, a, n), qc(e, n), Xe !== 4 && (Xe = 2)), !1;
            var i = Error(r(520), {
                cause: a
            });
            if (i = Lt(i, l), Vn === null ? Vn = [
                i
            ] : Vn.push(i), Xe !== 4 && (Xe = 2), t === null) return !0;
            a = Lt(a, l), l = t;
            do {
                switch(l.tag){
                    case 3:
                        return l.flags |= 65536, e = n & -n, l.lanes |= e, e = ou(l.stateNode, a, e), qc(l, e), !1;
                    case 1:
                        if (t = l.type, i = l.stateNode, (l.flags & 128) === 0 && (typeof t.getDerivedStateFromError == "function" || i !== null && typeof i.componentDidCatch == "function" && (Gl === null || !Gl.has(i)))) return l.flags |= 65536, n &= -n, l.lanes |= n, n = Wf(n), Ff(n, e, l, a), qc(l, n), !1;
                }
                l = l.return;
            }while (l !== null);
            return !1;
        }
        var fu = Error(r(461)), We = !1;
        function ut(e, t, l, a) {
            t.child = e === null ? ef(t, null, l, a) : da(t, e.child, l, a);
        }
        function If(e, t, l, a, n) {
            l = l.render;
            var i = t.ref;
            if ("ref" in a) {
                var f = {};
                for(var h in a)h !== "ref" && (f[h] = a[h]);
            } else f = a;
            return ua(t), a = Zc(e, t, l, f, i, n), h = Kc(), e !== null && !We ? (Jc(e, t, n), dl(e, t, n)) : (_e && h && Ec(t), t.flags |= 1, ut(e, t, a, n), t.child);
        }
        function Pf(e, t, l, a, n) {
            if (e === null) {
                var i = l.type;
                return typeof i == "function" && !_c(i) && i.defaultProps === void 0 && l.compare === null ? (t.tag = 15, t.type = i, ed(e, t, i, a, n)) : (e = Di(l.type, null, a, t, t.mode, n), e.ref = t.ref, e.return = t, t.child = e);
            }
            if (i = e.child, !vu(e, n)) {
                var f = i.memoizedProps;
                if (l = l.compare, l = l !== null ? l : wn, l(f, a) && e.ref === t.ref) return dl(e, t, n);
            }
            return t.flags |= 1, e = sl(i, a), e.ref = t.ref, e.return = t, t.child = e;
        }
        function ed(e, t, l, a, n) {
            if (e !== null) {
                var i = e.memoizedProps;
                if (wn(i, a) && e.ref === t.ref) if (We = !1, t.pendingProps = a = i, vu(e, n)) (e.flags & 131072) !== 0 && (We = !0);
                else return t.lanes = e.lanes, dl(e, t, n);
            }
            return du(e, t, l, a, n);
        }
        function td(e, t, l, a) {
            var n = a.children, i = e !== null ? e.memoizedState : null;
            if (e === null && t.stateNode === null && (t.stateNode = {
                _visibility: 1,
                _pendingMarkers: null,
                _retryCache: null,
                _transitions: null
            }), a.mode === "hidden") {
                if ((t.flags & 128) !== 0) {
                    if (i = i !== null ? i.baseLanes | l : l, e !== null) {
                        for(a = t.child = e.child, n = 0; a !== null;)n = n | a.lanes | a.childLanes, a = a.sibling;
                        a = n & ~i;
                    } else a = 0, t.child = null;
                    return ld(e, t, i, l, a);
                }
                if ((l & 536870912) !== 0) t.memoizedState = {
                    baseLanes: 0,
                    cachePool: null
                }, e !== null && Hi(t, i !== null ? i.cachePool : null), i !== null ? af(t, i) : Yc(), nf(t);
                else return a = t.lanes = 536870912, ld(e, t, i !== null ? i.baseLanes | l : l, l, a);
            } else i !== null ? (Hi(t, i.cachePool), af(t, i), Hl(), t.memoizedState = null) : (e !== null && Hi(t, null), Yc(), Hl());
            return ut(e, t, n, l), t.child;
        }
        function Ln(e, t) {
            return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
                _visibility: 1,
                _pendingMarkers: null,
                _retryCache: null,
                _transitions: null
            }), t.sibling;
        }
        function ld(e, t, l, a, n) {
            var i = Lc();
            return i = i === null ? null : {
                parent: Je._currentValue,
                pool: i
            }, t.memoizedState = {
                baseLanes: l,
                cachePool: i
            }, e !== null && Hi(t, null), Yc(), nf(t), e !== null && Ua(e, t, a, !0), t.childLanes = n, null;
        }
        function Pi(e, t) {
            return t = ts({
                mode: t.mode,
                children: t.children
            }, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
        }
        function ad(e, t, l) {
            return da(t, e.child, null, l), e = Pi(t, t.pendingProps), e.flags |= 2, Et(t), t.memoizedState = null, e;
        }
        function cx(e, t, l) {
            var a = t.pendingProps, n = (t.flags & 128) !== 0;
            if (t.flags &= -129, e === null) {
                if (_e) {
                    if (a.mode === "hidden") return e = Pi(t, a), t.lanes = 536870912, Ln(null, e);
                    if (Xc(t), (e = Be) ? (e = ph(e, Bt), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
                        dehydrated: e,
                        treeContext: Al !== null ? {
                            id: Ft,
                            overflow: It
                        } : null,
                        retryLane: 536870912,
                        hydrationErrors: null
                    }, l = Bo(e), l.return = t, t.child = l, st = t, Be = null)) : e = null, e === null) throw Ml(t);
                    return t.lanes = 536870912, null;
                }
                return Pi(t, a);
            }
            var i = e.memoizedState;
            if (i !== null) {
                var f = i.dehydrated;
                if (Xc(t), n) if (t.flags & 256) t.flags &= -257, t = ad(e, t, l);
                else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
                else throw Error(r(558));
                else if (We || Ua(e, t, l, !1), n = (l & e.childLanes) !== 0, We || n) {
                    if (a = Le, a !== null && (f = Qr(a, l), f !== 0 && f !== i.retryLane)) throw i.retryLane = f, na(e, f), wt(a, e, f), fu;
                    os(), t = ad(e, t, l);
                } else e = i.treeContext, Be = Gt(f.nextSibling), st = t, _e = !0, Rl = null, Bt = !1, e !== null && Yo(t, e), t = Pi(t, a), t.flags |= 4096;
                return t;
            }
            return e = sl(e.child, {
                mode: a.mode,
                children: a.children
            }), e.ref = t.ref, t.child = e, e.return = t, e;
        }
        function es(e, t) {
            var l = t.ref;
            if (l === null) e !== null && e.ref !== null && (t.flags |= 4194816);
            else {
                if (typeof l != "function" && typeof l != "object") throw Error(r(284));
                (e === null || e.ref !== l) && (t.flags |= 4194816);
            }
        }
        function du(e, t, l, a, n) {
            return ua(t), l = Zc(e, t, l, a, void 0, n), a = Kc(), e !== null && !We ? (Jc(e, t, n), dl(e, t, n)) : (_e && a && Ec(t), t.flags |= 1, ut(e, t, l, n), t.child);
        }
        function nd(e, t, l, a, n, i) {
            return ua(t), t.updateQueue = null, l = cf(t, a, l, n), sf(e), a = Kc(), e !== null && !We ? (Jc(e, t, i), dl(e, t, i)) : (_e && a && Ec(t), t.flags |= 1, ut(e, t, l, i), t.child);
        }
        function id(e, t, l, a, n) {
            if (ua(t), t.stateNode === null) {
                var i = Ma, f = l.contextType;
                typeof f == "object" && f !== null && (i = ct(f)), i = new l(a, i), t.memoizedState = i.state !== null && i.state !== void 0 ? i.state : null, i.updater = ru, t.stateNode = i, i._reactInternals = t, i = t.stateNode, i.props = a, i.state = t.memoizedState, i.refs = {}, kc(t), f = l.contextType, i.context = typeof f == "object" && f !== null ? ct(f) : Ma, i.state = t.memoizedState, f = l.getDerivedStateFromProps, typeof f == "function" && (uu(t, l, f, a), i.state = t.memoizedState), typeof l.getDerivedStateFromProps == "function" || typeof i.getSnapshotBeforeUpdate == "function" || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (f = i.state, typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount(), f !== i.state && ru.enqueueReplaceState(i, i.state, null), Mn(t, a, i, n), Rn(), i.state = t.memoizedState), typeof i.componentDidMount == "function" && (t.flags |= 4194308), a = !0;
            } else if (e === null) {
                i = t.stateNode;
                var h = t.memoizedProps, g = ma(l, h);
                i.props = g;
                var C = i.context, U = l.contextType;
                f = Ma, typeof U == "object" && U !== null && (f = ct(U));
                var G = l.getDerivedStateFromProps;
                U = typeof G == "function" || typeof i.getSnapshotBeforeUpdate == "function", h = t.pendingProps !== h, U || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (h || C !== f) && Qf(t, i, a, f), Dl = !1;
                var A = t.memoizedState;
                i.state = A, Mn(t, a, i, n), Rn(), C = t.memoizedState, h || A !== C || Dl ? (typeof G == "function" && (uu(t, l, G, a), C = t.memoizedState), (g = Dl || Xf(t, l, g, a, A, C, f)) ? (U || typeof i.UNSAFE_componentWillMount != "function" && typeof i.componentWillMount != "function" || (typeof i.componentWillMount == "function" && i.componentWillMount(), typeof i.UNSAFE_componentWillMount == "function" && i.UNSAFE_componentWillMount()), typeof i.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = a, t.memoizedState = C), i.props = a, i.state = C, i.context = f, a = g) : (typeof i.componentDidMount == "function" && (t.flags |= 4194308), a = !1);
            } else {
                i = t.stateNode, Bc(e, t), f = t.memoizedProps, U = ma(l, f), i.props = U, G = t.pendingProps, A = i.context, C = l.contextType, g = Ma, typeof C == "object" && C !== null && (g = ct(C)), h = l.getDerivedStateFromProps, (C = typeof h == "function" || typeof i.getSnapshotBeforeUpdate == "function") || typeof i.UNSAFE_componentWillReceiveProps != "function" && typeof i.componentWillReceiveProps != "function" || (f !== G || A !== g) && Qf(t, i, a, g), Dl = !1, A = t.memoizedState, i.state = A, Mn(t, a, i, n), Rn();
                var D = t.memoizedState;
                f !== G || A !== D || Dl || e !== null && e.dependencies !== null && Ui(e.dependencies) ? (typeof h == "function" && (uu(t, l, h, a), D = t.memoizedState), (U = Dl || Xf(t, l, U, a, A, D, g) || e !== null && e.dependencies !== null && Ui(e.dependencies)) ? (C || typeof i.UNSAFE_componentWillUpdate != "function" && typeof i.componentWillUpdate != "function" || (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, D, g), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, D, g)), typeof i.componentDidUpdate == "function" && (t.flags |= 4), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof i.componentDidUpdate != "function" || f === e.memoizedProps && A === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && A === e.memoizedState || (t.flags |= 1024), t.memoizedProps = a, t.memoizedState = D), i.props = a, i.state = D, i.context = g, a = U) : (typeof i.componentDidUpdate != "function" || f === e.memoizedProps && A === e.memoizedState || (t.flags |= 4), typeof i.getSnapshotBeforeUpdate != "function" || f === e.memoizedProps && A === e.memoizedState || (t.flags |= 1024), a = !1);
            }
            return i = a, es(e, t), a = (t.flags & 128) !== 0, i || a ? (i = t.stateNode, l = a && typeof l.getDerivedStateFromError != "function" ? null : i.render(), t.flags |= 1, e !== null && a ? (t.child = da(t, e.child, null, n), t.child = da(t, null, l, n)) : ut(e, t, l, n), t.memoizedState = i.state, e = t.child) : e = dl(e, t, n), e;
        }
        function sd(e, t, l, a) {
            return sa(), t.flags |= 256, ut(e, t, l, a), t.child;
        }
        var hu = {
            dehydrated: null,
            treeContext: null,
            retryLane: 0,
            hydrationErrors: null
        };
        function mu(e) {
            return {
                baseLanes: e,
                cachePool: Jo()
            };
        }
        function pu(e, t, l) {
            return e = e !== null ? e.childLanes & ~l : 0, t && (e |= At), e;
        }
        function cd(e, t, l) {
            var a = t.pendingProps, n = !1, i = (t.flags & 128) !== 0, f;
            if ((f = i) || (f = e !== null && e.memoizedState === null ? !1 : (Ze.current & 2) !== 0), f && (n = !0, t.flags &= -129), f = (t.flags & 32) !== 0, t.flags &= -33, e === null) {
                if (_e) {
                    if (n ? Ll(t) : Hl(), (e = Be) ? (e = ph(e, Bt), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
                        dehydrated: e,
                        treeContext: Al !== null ? {
                            id: Ft,
                            overflow: It
                        } : null,
                        retryLane: 536870912,
                        hydrationErrors: null
                    }, l = Bo(e), l.return = t, t.child = l, st = t, Be = null)) : e = null, e === null) throw Ml(t);
                    return Fu(e) ? t.lanes = 32 : t.lanes = 536870912, null;
                }
                var h = a.children;
                return a = a.fallback, n ? (Hl(), n = t.mode, h = ts({
                    mode: "hidden",
                    children: h
                }, n), a = ia(a, n, l, null), h.return = t, a.return = t, h.sibling = a, t.child = h, a = t.child, a.memoizedState = mu(l), a.childLanes = pu(e, f, l), t.memoizedState = hu, Ln(null, a)) : (Ll(t), xu(t, h));
            }
            var g = e.memoizedState;
            if (g !== null && (h = g.dehydrated, h !== null)) {
                if (i) t.flags & 256 ? (Ll(t), t.flags &= -257, t = yu(e, t, l)) : t.memoizedState !== null ? (Hl(), t.child = e.child, t.flags |= 128, t = null) : (Hl(), h = a.fallback, n = t.mode, a = ts({
                    mode: "visible",
                    children: a.children
                }, n), h = ia(h, n, l, null), h.flags |= 2, a.return = t, h.return = t, a.sibling = h, t.child = a, da(t, e.child, null, l), a = t.child, a.memoizedState = mu(l), a.childLanes = pu(e, f, l), t.memoizedState = hu, t = Ln(null, a));
                else if (Ll(t), Fu(h)) {
                    if (f = h.nextSibling && h.nextSibling.dataset, f) var C = f.dgst;
                    f = C, a = Error(r(419)), a.stack = "", a.digest = f, _n({
                        value: a,
                        source: null,
                        stack: null
                    }), t = yu(e, t, l);
                } else if (We || Ua(e, t, l, !1), f = (l & e.childLanes) !== 0, We || f) {
                    if (f = Le, f !== null && (a = Qr(f, l), a !== 0 && a !== g.retryLane)) throw g.retryLane = a, na(e, a), wt(f, e, a), fu;
                    Wu(h) || os(), t = yu(e, t, l);
                } else Wu(h) ? (t.flags |= 192, t.child = e.child, t = null) : (e = g.treeContext, Be = Gt(h.nextSibling), st = t, _e = !0, Rl = null, Bt = !1, e !== null && Yo(t, e), t = xu(t, a.children), t.flags |= 4096);
                return t;
            }
            return n ? (Hl(), h = a.fallback, n = t.mode, g = e.child, C = g.sibling, a = sl(g, {
                mode: "hidden",
                children: a.children
            }), a.subtreeFlags = g.subtreeFlags & 65011712, C !== null ? h = sl(C, h) : (h = ia(h, n, l, null), h.flags |= 2), h.return = t, a.return = t, a.sibling = h, t.child = a, Ln(null, a), a = t.child, h = e.child.memoizedState, h === null ? h = mu(l) : (n = h.cachePool, n !== null ? (g = Je._currentValue, n = n.parent !== g ? {
                parent: g,
                pool: g
            } : n) : n = Jo(), h = {
                baseLanes: h.baseLanes | l,
                cachePool: n
            }), a.memoizedState = h, a.childLanes = pu(e, f, l), t.memoizedState = hu, Ln(e.child, a)) : (Ll(t), l = e.child, e = l.sibling, l = sl(l, {
                mode: "visible",
                children: a.children
            }), l.return = t, l.sibling = null, e !== null && (f = t.deletions, f === null ? (t.deletions = [
                e
            ], t.flags |= 16) : f.push(e)), t.child = l, t.memoizedState = null, l);
        }
        function xu(e, t) {
            return t = ts({
                mode: "visible",
                children: t
            }, e.mode), t.return = e, e.child = t;
        }
        function ts(e, t) {
            return e = Nt(22, e, null, t), e.lanes = 0, e;
        }
        function yu(e, t, l) {
            return da(t, e.child, null, l), e = xu(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
        }
        function ud(e, t, l) {
            e.lanes |= t;
            var a = e.alternate;
            a !== null && (a.lanes |= t), Oc(e.return, t, l);
        }
        function bu(e, t, l, a, n, i) {
            var f = e.memoizedState;
            f === null ? e.memoizedState = {
                isBackwards: t,
                rendering: null,
                renderingStartTime: 0,
                last: a,
                tail: l,
                tailMode: n,
                treeForkCount: i
            } : (f.isBackwards = t, f.rendering = null, f.renderingStartTime = 0, f.last = a, f.tail = l, f.tailMode = n, f.treeForkCount = i);
        }
        function rd(e, t, l) {
            var a = t.pendingProps, n = a.revealOrder, i = a.tail;
            a = a.children;
            var f = Ze.current, h = (f & 2) !== 0;
            if (h ? (f = f & 1 | 2, t.flags |= 128) : f &= 1, Z(Ze, f), ut(e, t, a, l), a = _e ? Sn : 0, !h && e !== null && (e.flags & 128) !== 0) e: for(e = t.child; e !== null;){
                if (e.tag === 13) e.memoizedState !== null && ud(e, l, t);
                else if (e.tag === 19) ud(e, l, t);
                else if (e.child !== null) {
                    e.child.return = e, e = e.child;
                    continue;
                }
                if (e === t) break e;
                for(; e.sibling === null;){
                    if (e.return === null || e.return === t) break e;
                    e = e.return;
                }
                e.sibling.return = e.return, e = e.sibling;
            }
            switch(n){
                case "forwards":
                    for(l = t.child, n = null; l !== null;)e = l.alternate, e !== null && Vi(e) === null && (n = l), l = l.sibling;
                    l = n, l === null ? (n = t.child, t.child = null) : (n = l.sibling, l.sibling = null), bu(t, !1, n, l, i, a);
                    break;
                case "backwards":
                case "unstable_legacy-backwards":
                    for(l = null, n = t.child, t.child = null; n !== null;){
                        if (e = n.alternate, e !== null && Vi(e) === null) {
                            t.child = n;
                            break;
                        }
                        e = n.sibling, n.sibling = l, l = n, n = e;
                    }
                    bu(t, !0, l, null, i, a);
                    break;
                case "together":
                    bu(t, !1, null, null, void 0, a);
                    break;
                default:
                    t.memoizedState = null;
            }
            return t.child;
        }
        function dl(e, t, l) {
            if (e !== null && (t.dependencies = e.dependencies), ql |= t.lanes, (l & t.childLanes) === 0) if (e !== null) {
                if (Ua(e, t, l, !1), (l & t.childLanes) === 0) return null;
            } else return null;
            if (e !== null && t.child !== e.child) throw Error(r(153));
            if (t.child !== null) {
                for(e = t.child, l = sl(e, e.pendingProps), t.child = l, l.return = t; e.sibling !== null;)e = e.sibling, l = l.sibling = sl(e, e.pendingProps), l.return = t;
                l.sibling = null;
            }
            return t.child;
        }
        function vu(e, t) {
            return (e.lanes & t) !== 0 ? !0 : (e = e.dependencies, !!(e !== null && Ui(e)));
        }
        function ux(e, t, l) {
            switch(t.tag){
                case 3:
                    Pe(t, t.stateNode.containerInfo), Ol(t, Je, e.memoizedState.cache), sa();
                    break;
                case 27:
                case 5:
                    ll(t);
                    break;
                case 4:
                    Pe(t, t.stateNode.containerInfo);
                    break;
                case 10:
                    Ol(t, t.type, t.memoizedProps.value);
                    break;
                case 31:
                    if (t.memoizedState !== null) return t.flags |= 128, Xc(t), null;
                    break;
                case 13:
                    var a = t.memoizedState;
                    if (a !== null) return a.dehydrated !== null ? (Ll(t), t.flags |= 128, null) : (l & t.child.childLanes) !== 0 ? cd(e, t, l) : (Ll(t), e = dl(e, t, l), e !== null ? e.sibling : null);
                    Ll(t);
                    break;
                case 19:
                    var n = (e.flags & 128) !== 0;
                    if (a = (l & t.childLanes) !== 0, a || (Ua(e, t, l, !1), a = (l & t.childLanes) !== 0), n) {
                        if (a) return rd(e, t, l);
                        t.flags |= 128;
                    }
                    if (n = t.memoizedState, n !== null && (n.rendering = null, n.tail = null, n.lastEffect = null), Z(Ze, Ze.current), a) break;
                    return null;
                case 22:
                    return t.lanes = 0, td(e, t, l, t.pendingProps);
                case 24:
                    Ol(t, Je, e.memoizedState.cache);
            }
            return dl(e, t, l);
        }
        function od(e, t, l) {
            if (e !== null) if (e.memoizedProps !== t.pendingProps) We = !0;
            else {
                if (!vu(e, l) && (t.flags & 128) === 0) return We = !1, ux(e, t, l);
                We = (e.flags & 131072) !== 0;
            }
            else We = !1, _e && (t.flags & 1048576) !== 0 && Go(t, Sn, t.index);
            switch(t.lanes = 0, t.tag){
                case 16:
                    e: {
                        var a = t.pendingProps;
                        if (e = oa(t.elementType), t.type = e, typeof e == "function") _c(e) ? (a = ma(e, a), t.tag = 1, t = id(null, t, e, a, l)) : (t.tag = 0, t = du(null, t, e, a, l));
                        else {
                            if (e != null) {
                                var n = e.$$typeof;
                                if (n === J) {
                                    t.tag = 11, t = If(null, t, e, a, l);
                                    break e;
                                } else if (n === P) {
                                    t.tag = 14, t = Pf(null, t, e, a, l);
                                    break e;
                                }
                            }
                            throw t = xe(e) || e, Error(r(306, t, ""));
                        }
                    }
                    return t;
                case 0:
                    return du(e, t, t.type, t.pendingProps, l);
                case 1:
                    return a = t.type, n = ma(a, t.pendingProps), id(e, t, a, n, l);
                case 3:
                    e: {
                        if (Pe(t, t.stateNode.containerInfo), e === null) throw Error(r(387));
                        a = t.pendingProps;
                        var i = t.memoizedState;
                        n = i.element, Bc(e, t), Mn(t, a, null, l);
                        var f = t.memoizedState;
                        if (a = f.cache, Ol(t, Je, a), a !== i.cache && Dc(t, [
                            Je
                        ], l, !0), Rn(), a = f.element, i.isDehydrated) if (i = {
                            element: a,
                            isDehydrated: !1,
                            cache: f.cache
                        }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
                            t = sd(e, t, a, l);
                            break e;
                        } else if (a !== n) {
                            n = Lt(Error(r(424)), t), _n(n), t = sd(e, t, a, l);
                            break e;
                        } else for(e = t.stateNode.containerInfo, e.nodeType === 9 ? e = e.body : e = e.nodeName === "HTML" ? e.ownerDocument.body : e, Be = Gt(e.firstChild), st = t, _e = !0, Rl = null, Bt = !0, l = ef(t, null, a, l), t.child = l; l;)l.flags = l.flags & -3 | 4096, l = l.sibling;
                        else {
                            if (sa(), a === n) {
                                t = dl(e, t, l);
                                break e;
                            }
                            ut(e, t, a, l);
                        }
                        t = t.child;
                    }
                    return t;
                case 26:
                    return es(e, t), e === null ? (l = wh(t.type, null, t.pendingProps, null)) ? t.memoizedState = l : _e || (l = t.type, e = t.pendingProps, a = ys(fe.current).createElement(l), a[it] = t, a[pt] = e, rt(a, l, e), lt(a), t.stateNode = a) : t.memoizedState = wh(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
                case 27:
                    return ll(t), e === null && _e && (a = t.stateNode = bh(t.type, t.pendingProps, fe.current), st = t, Bt = !0, n = Be, Ql(t.type) ? (Iu = n, Be = Gt(a.firstChild)) : Be = n), ut(e, t, t.pendingProps.children, l), es(e, t), e === null && (t.flags |= 4194304), t.child;
                case 5:
                    return e === null && _e && ((n = a = Be) && (a = kx(a, t.type, t.pendingProps, Bt), a !== null ? (t.stateNode = a, st = t, Be = Gt(a.firstChild), Bt = !1, n = !0) : n = !1), n || Ml(t)), ll(t), n = t.type, i = t.pendingProps, f = e !== null ? e.memoizedProps : null, a = i.children, Ku(n, i) ? a = null : f !== null && Ku(n, f) && (t.flags |= 32), t.memoizedState !== null && (n = Zc(e, t, Pp, null, null, l), Fn._currentValue = n), es(e, t), ut(e, t, a, l), t.child;
                case 6:
                    return e === null && _e && ((e = l = Be) && (l = Bx(l, t.pendingProps, Bt), l !== null ? (t.stateNode = l, st = t, Be = null, e = !0) : e = !1), e || Ml(t)), null;
                case 13:
                    return cd(e, t, l);
                case 4:
                    return Pe(t, t.stateNode.containerInfo), a = t.pendingProps, e === null ? t.child = da(t, null, a, l) : ut(e, t, a, l), t.child;
                case 11:
                    return If(e, t, t.type, t.pendingProps, l);
                case 7:
                    return ut(e, t, t.pendingProps, l), t.child;
                case 8:
                    return ut(e, t, t.pendingProps.children, l), t.child;
                case 12:
                    return ut(e, t, t.pendingProps.children, l), t.child;
                case 10:
                    return a = t.pendingProps, Ol(t, t.type, a.value), ut(e, t, a.children, l), t.child;
                case 9:
                    return n = t.type._context, a = t.pendingProps.children, ua(t), n = ct(n), a = a(n), t.flags |= 1, ut(e, t, a, l), t.child;
                case 14:
                    return Pf(e, t, t.type, t.pendingProps, l);
                case 15:
                    return ed(e, t, t.type, t.pendingProps, l);
                case 19:
                    return rd(e, t, l);
                case 31:
                    return cx(e, t, l);
                case 22:
                    return td(e, t, l, t.pendingProps);
                case 24:
                    return ua(t), a = ct(Je), e === null ? (n = Lc(), n === null && (n = Le, i = zc(), n.pooledCache = i, i.refCount++, i !== null && (n.pooledCacheLanes |= l), n = i), t.memoizedState = {
                        parent: a,
                        cache: n
                    }, kc(t), Ol(t, Je, n)) : ((e.lanes & l) !== 0 && (Bc(e, t), Mn(t, null, null, l), Rn()), n = e.memoizedState, i = t.memoizedState, n.parent !== a ? (n = {
                        parent: a,
                        cache: a
                    }, t.memoizedState = n, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = n), Ol(t, Je, a)) : (a = i.cache, Ol(t, Je, a), a !== n.cache && Dc(t, [
                        Je
                    ], l, !0))), ut(e, t, t.pendingProps.children, l), t.child;
                case 29:
                    throw t.pendingProps;
            }
            throw Error(r(156, t.tag));
        }
        function hl(e) {
            e.flags |= 4;
        }
        function gu(e, t, l, a, n) {
            if ((t = (e.mode & 32) !== 0) && (t = !1), t) {
                if (e.flags |= 16777216, (n & 335544128) === n) if (e.stateNode.complete) e.flags |= 8192;
                else if (Hd()) e.flags |= 8192;
                else throw fa = Bi, Hc;
            } else e.flags &= -16777217;
        }
        function fd(e, t) {
            if (t.type !== "stylesheet" || (t.state.loading & 4) !== 0) e.flags &= -16777217;
            else if (e.flags |= 16777216, !jh(t)) if (Hd()) e.flags |= 8192;
            else throw fa = Bi, Hc;
        }
        function ls(e, t) {
            t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag !== 22 ? Yr() : 536870912, e.lanes |= t, Ka |= t);
        }
        function Hn(e, t) {
            if (!_e) switch(e.tailMode){
                case "hidden":
                    t = e.tail;
                    for(var l = null; t !== null;)t.alternate !== null && (l = t), t = t.sibling;
                    l === null ? e.tail = null : l.sibling = null;
                    break;
                case "collapsed":
                    l = e.tail;
                    for(var a = null; l !== null;)l.alternate !== null && (a = l), l = l.sibling;
                    a === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : a.sibling = null;
            }
        }
        function qe(e) {
            var t = e.alternate !== null && e.alternate.child === e.child, l = 0, a = 0;
            if (t) for(var n = e.child; n !== null;)l |= n.lanes | n.childLanes, a |= n.subtreeFlags & 65011712, a |= n.flags & 65011712, n.return = e, n = n.sibling;
            else for(n = e.child; n !== null;)l |= n.lanes | n.childLanes, a |= n.subtreeFlags, a |= n.flags, n.return = e, n = n.sibling;
            return e.subtreeFlags |= a, e.childLanes = l, t;
        }
        function rx(e, t, l) {
            var a = t.pendingProps;
            switch(Cc(t), t.tag){
                case 16:
                case 15:
                case 0:
                case 11:
                case 7:
                case 8:
                case 12:
                case 9:
                case 14:
                    return qe(t), null;
                case 1:
                    return qe(t), null;
                case 3:
                    return l = t.stateNode, a = null, e !== null && (a = e.memoizedState.cache), t.memoizedState.cache !== a && (t.flags |= 2048), rl(Je), He(), l.pendingContext && (l.context = l.pendingContext, l.pendingContext = null), (e === null || e.child === null) && (za(t) ? hl(t) : e === null || e.memoizedState.isDehydrated && (t.flags & 256) === 0 || (t.flags |= 1024, Rc())), qe(t), null;
                case 26:
                    var n = t.type, i = t.memoizedState;
                    return e === null ? (hl(t), i !== null ? (qe(t), fd(t, i)) : (qe(t), gu(t, n, null, a, l))) : i ? i !== e.memoizedState ? (hl(t), qe(t), fd(t, i)) : (qe(t), t.flags &= -16777217) : (e = e.memoizedProps, e !== a && hl(t), qe(t), gu(t, n, e, a, l)), null;
                case 27:
                    if (ue(t), l = fe.current, n = t.type, e !== null && t.stateNode != null) e.memoizedProps !== a && hl(t);
                    else {
                        if (!a) {
                            if (t.stateNode === null) throw Error(r(166));
                            return qe(t), null;
                        }
                        e = $.current, za(t) ? Vo(t) : (e = bh(n, a, l), t.stateNode = e, hl(t));
                    }
                    return qe(t), null;
                case 5:
                    if (ue(t), n = t.type, e !== null && t.stateNode != null) e.memoizedProps !== a && hl(t);
                    else {
                        if (!a) {
                            if (t.stateNode === null) throw Error(r(166));
                            return qe(t), null;
                        }
                        if (i = $.current, za(t)) Vo(t);
                        else {
                            var f = ys(fe.current);
                            switch(i){
                                case 1:
                                    i = f.createElementNS("http://www.w3.org/2000/svg", n);
                                    break;
                                case 2:
                                    i = f.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                                    break;
                                default:
                                    switch(n){
                                        case "svg":
                                            i = f.createElementNS("http://www.w3.org/2000/svg", n);
                                            break;
                                        case "math":
                                            i = f.createElementNS("http://www.w3.org/1998/Math/MathML", n);
                                            break;
                                        case "script":
                                            i = f.createElement("div"), i.innerHTML = "<script><\/script>", i = i.removeChild(i.firstChild);
                                            break;
                                        case "select":
                                            i = typeof a.is == "string" ? f.createElement("select", {
                                                is: a.is
                                            }) : f.createElement("select"), a.multiple ? i.multiple = !0 : a.size && (i.size = a.size);
                                            break;
                                        default:
                                            i = typeof a.is == "string" ? f.createElement(n, {
                                                is: a.is
                                            }) : f.createElement(n);
                                    }
                            }
                            i[it] = t, i[pt] = a;
                            e: for(f = t.child; f !== null;){
                                if (f.tag === 5 || f.tag === 6) i.appendChild(f.stateNode);
                                else if (f.tag !== 4 && f.tag !== 27 && f.child !== null) {
                                    f.child.return = f, f = f.child;
                                    continue;
                                }
                                if (f === t) break e;
                                for(; f.sibling === null;){
                                    if (f.return === null || f.return === t) break e;
                                    f = f.return;
                                }
                                f.sibling.return = f.return, f = f.sibling;
                            }
                            t.stateNode = i;
                            e: switch(rt(i, n, a), n){
                                case "button":
                                case "input":
                                case "select":
                                case "textarea":
                                    a = !!a.autoFocus;
                                    break e;
                                case "img":
                                    a = !0;
                                    break e;
                                default:
                                    a = !1;
                            }
                            a && hl(t);
                        }
                    }
                    return qe(t), gu(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, l), null;
                case 6:
                    if (e && t.stateNode != null) e.memoizedProps !== a && hl(t);
                    else {
                        if (typeof a != "string" && t.stateNode === null) throw Error(r(166));
                        if (e = fe.current, za(t)) {
                            if (e = t.stateNode, l = t.memoizedProps, a = null, n = st, n !== null) switch(n.tag){
                                case 27:
                                case 5:
                                    a = n.memoizedProps;
                            }
                            e[it] = t, e = !!(e.nodeValue === l || a !== null && a.suppressHydrationWarning === !0 || ch(e.nodeValue, l)), e || Ml(t, !0);
                        } else e = ys(e).createTextNode(a), e[it] = t, t.stateNode = e;
                    }
                    return qe(t), null;
                case 31:
                    if (l = t.memoizedState, e === null || e.memoizedState !== null) {
                        if (a = za(t), l !== null) {
                            if (e === null) {
                                if (!a) throw Error(r(318));
                                if (e = t.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(r(557));
                                e[it] = t;
                            } else sa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
                            qe(t), e = !1;
                        } else l = Rc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = l), e = !0;
                        if (!e) return t.flags & 256 ? (Et(t), t) : (Et(t), null);
                        if ((t.flags & 128) !== 0) throw Error(r(558));
                    }
                    return qe(t), null;
                case 13:
                    if (a = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
                        if (n = za(t), a !== null && a.dehydrated !== null) {
                            if (e === null) {
                                if (!n) throw Error(r(318));
                                if (n = t.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(r(317));
                                n[it] = t;
                            } else sa(), (t.flags & 128) === 0 && (t.memoizedState = null), t.flags |= 4;
                            qe(t), n = !1;
                        } else n = Rc(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), n = !0;
                        if (!n) return t.flags & 256 ? (Et(t), t) : (Et(t), null);
                    }
                    return Et(t), (t.flags & 128) !== 0 ? (t.lanes = l, t) : (l = a !== null, e = e !== null && e.memoizedState !== null, l && (a = t.child, n = null, a.alternate !== null && a.alternate.memoizedState !== null && a.alternate.memoizedState.cachePool !== null && (n = a.alternate.memoizedState.cachePool.pool), i = null, a.memoizedState !== null && a.memoizedState.cachePool !== null && (i = a.memoizedState.cachePool.pool), i !== n && (a.flags |= 2048)), l !== e && l && (t.child.flags |= 8192), ls(t, t.updateQueue), qe(t), null);
                case 4:
                    return He(), e === null && Yu(t.stateNode.containerInfo), qe(t), null;
                case 10:
                    return rl(t.type), qe(t), null;
                case 19:
                    if (k(Ze), a = t.memoizedState, a === null) return qe(t), null;
                    if (n = (t.flags & 128) !== 0, i = a.rendering, i === null) if (n) Hn(a, !1);
                    else {
                        if (Xe !== 0 || e !== null && (e.flags & 128) !== 0) for(e = t.child; e !== null;){
                            if (i = Vi(e), i !== null) {
                                for(t.flags |= 128, Hn(a, !1), e = i.updateQueue, t.updateQueue = e, ls(t, e), t.subtreeFlags = 0, e = l, l = t.child; l !== null;)ko(l, e), l = l.sibling;
                                return Z(Ze, Ze.current & 1 | 2), _e && cl(t, a.treeForkCount), t.child;
                            }
                            e = e.sibling;
                        }
                        a.tail !== null && tt() > cs && (t.flags |= 128, n = !0, Hn(a, !1), t.lanes = 4194304);
                    }
                    else {
                        if (!n) if (e = Vi(i), e !== null) {
                            if (t.flags |= 128, n = !0, e = e.updateQueue, t.updateQueue = e, ls(t, e), Hn(a, !0), a.tail === null && a.tailMode === "hidden" && !i.alternate && !_e) return qe(t), null;
                        } else 2 * tt() - a.renderingStartTime > cs && l !== 536870912 && (t.flags |= 128, n = !0, Hn(a, !1), t.lanes = 4194304);
                        a.isBackwards ? (i.sibling = t.child, t.child = i) : (e = a.last, e !== null ? e.sibling = i : t.child = i, a.last = i);
                    }
                    return a.tail !== null ? (e = a.tail, a.rendering = e, a.tail = e.sibling, a.renderingStartTime = tt(), e.sibling = null, l = Ze.current, Z(Ze, n ? l & 1 | 2 : l & 1), _e && cl(t, a.treeForkCount), e) : (qe(t), null);
                case 22:
                case 23:
                    return Et(t), Vc(), a = t.memoizedState !== null, e !== null ? e.memoizedState !== null !== a && (t.flags |= 8192) : a && (t.flags |= 8192), a ? (l & 536870912) !== 0 && (t.flags & 128) === 0 && (qe(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : qe(t), l = t.updateQueue, l !== null && ls(t, l.retryQueue), l = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), a = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (a = t.memoizedState.cachePool.pool), a !== l && (t.flags |= 2048), e !== null && k(ra), null;
                case 24:
                    return l = null, e !== null && (l = e.memoizedState.cache), t.memoizedState.cache !== l && (t.flags |= 2048), rl(Je), qe(t), null;
                case 25:
                    return null;
                case 30:
                    return null;
            }
            throw Error(r(156, t.tag));
        }
        function ox(e, t) {
            switch(Cc(t), t.tag){
                case 1:
                    return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
                case 3:
                    return rl(Je), He(), e = t.flags, (e & 65536) !== 0 && (e & 128) === 0 ? (t.flags = e & -65537 | 128, t) : null;
                case 26:
                case 27:
                case 5:
                    return ue(t), null;
                case 31:
                    if (t.memoizedState !== null) {
                        if (Et(t), t.alternate === null) throw Error(r(340));
                        sa();
                    }
                    return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
                case 13:
                    if (Et(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
                        if (t.alternate === null) throw Error(r(340));
                        sa();
                    }
                    return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
                case 19:
                    return k(Ze), null;
                case 4:
                    return He(), null;
                case 10:
                    return rl(t.type), null;
                case 22:
                case 23:
                    return Et(t), Vc(), e !== null && k(ra), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
                case 24:
                    return rl(Je), null;
                case 25:
                    return null;
                default:
                    return null;
            }
        }
        function dd(e, t) {
            switch(Cc(t), t.tag){
                case 3:
                    rl(Je), He();
                    break;
                case 26:
                case 27:
                case 5:
                    ue(t);
                    break;
                case 4:
                    He();
                    break;
                case 31:
                    t.memoizedState !== null && Et(t);
                    break;
                case 13:
                    Et(t);
                    break;
                case 19:
                    k(Ze);
                    break;
                case 10:
                    rl(t.type);
                    break;
                case 22:
                case 23:
                    Et(t), Vc(), e !== null && k(ra);
                    break;
                case 24:
                    rl(Je);
            }
        }
        function kn(e, t) {
            try {
                var l = t.updateQueue, a = l !== null ? l.lastEffect : null;
                if (a !== null) {
                    var n = a.next;
                    l = n;
                    do {
                        if ((l.tag & e) === e) {
                            a = void 0;
                            var i = l.create, f = l.inst;
                            a = i(), f.destroy = a;
                        }
                        l = l.next;
                    }while (l !== n);
                }
            } catch (h) {
                Oe(t, t.return, h);
            }
        }
        function kl(e, t, l) {
            try {
                var a = t.updateQueue, n = a !== null ? a.lastEffect : null;
                if (n !== null) {
                    var i = n.next;
                    a = i;
                    do {
                        if ((a.tag & e) === e) {
                            var f = a.inst, h = f.destroy;
                            if (h !== void 0) {
                                f.destroy = void 0, n = t;
                                var g = l, C = h;
                                try {
                                    C();
                                } catch (U) {
                                    Oe(n, g, U);
                                }
                            }
                        }
                        a = a.next;
                    }while (a !== i);
                }
            } catch (U) {
                Oe(t, t.return, U);
            }
        }
        function hd(e) {
            var t = e.updateQueue;
            if (t !== null) {
                var l = e.stateNode;
                try {
                    lf(t, l);
                } catch (a) {
                    Oe(e, e.return, a);
                }
            }
        }
        function md(e, t, l) {
            l.props = ma(e.type, e.memoizedProps), l.state = e.memoizedState;
            try {
                l.componentWillUnmount();
            } catch (a) {
                Oe(e, t, a);
            }
        }
        function Bn(e, t) {
            try {
                var l = e.ref;
                if (l !== null) {
                    switch(e.tag){
                        case 26:
                        case 27:
                        case 5:
                            var a = e.stateNode;
                            break;
                        case 30:
                            a = e.stateNode;
                            break;
                        default:
                            a = e.stateNode;
                    }
                    typeof l == "function" ? e.refCleanup = l(a) : l.current = a;
                }
            } catch (n) {
                Oe(e, t, n);
            }
        }
        function Pt(e, t) {
            var l = e.ref, a = e.refCleanup;
            if (l !== null) if (typeof a == "function") try {
                a();
            } catch (n) {
                Oe(e, t, n);
            } finally{
                e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
            }
            else if (typeof l == "function") try {
                l(null);
            } catch (n) {
                Oe(e, t, n);
            }
            else l.current = null;
        }
        function pd(e) {
            var t = e.type, l = e.memoizedProps, a = e.stateNode;
            try {
                e: switch(t){
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                        l.autoFocus && a.focus();
                        break e;
                    case "img":
                        l.src ? a.src = l.src : l.srcSet && (a.srcset = l.srcSet);
                }
            } catch (n) {
                Oe(e, e.return, n);
            }
        }
        function wu(e, t, l) {
            try {
                var a = e.stateNode;
                Ox(a, e.type, l, t), a[pt] = t;
            } catch (n) {
                Oe(e, e.return, n);
            }
        }
        function xd(e) {
            return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Ql(e.type) || e.tag === 4;
        }
        function Tu(e) {
            e: for(;;){
                for(; e.sibling === null;){
                    if (e.return === null || xd(e.return)) return null;
                    e = e.return;
                }
                for(e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;){
                    if (e.tag === 27 && Ql(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue e;
                    e.child.return = e, e = e.child;
                }
                if (!(e.flags & 2)) return e.stateNode;
            }
        }
        function Su(e, t, l) {
            var a = e.tag;
            if (a === 5 || a === 6) e = e.stateNode, t ? (l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l).insertBefore(e, t) : (t = l.nodeType === 9 ? l.body : l.nodeName === "HTML" ? l.ownerDocument.body : l, t.appendChild(e), l = l._reactRootContainer, l != null || t.onclick !== null || (t.onclick = nl));
            else if (a !== 4 && (a === 27 && Ql(e.type) && (l = e.stateNode, t = null), e = e.child, e !== null)) for(Su(e, t, l), e = e.sibling; e !== null;)Su(e, t, l), e = e.sibling;
        }
        function as(e, t, l) {
            var a = e.tag;
            if (a === 5 || a === 6) e = e.stateNode, t ? l.insertBefore(e, t) : l.appendChild(e);
            else if (a !== 4 && (a === 27 && Ql(e.type) && (l = e.stateNode), e = e.child, e !== null)) for(as(e, t, l), e = e.sibling; e !== null;)as(e, t, l), e = e.sibling;
        }
        function yd(e) {
            var t = e.stateNode, l = e.memoizedProps;
            try {
                for(var a = e.type, n = t.attributes; n.length;)t.removeAttributeNode(n[0]);
                rt(t, a, l), t[it] = e, t[pt] = l;
            } catch (i) {
                Oe(e, e.return, i);
            }
        }
        var ml = !1, Fe = !1, _u = !1, bd = typeof WeakSet == "function" ? WeakSet : Set, at = null;
        function fx(e, t) {
            if (e = e.containerInfo, Qu = _s, e = Ao(e), yc(e)) {
                if ("selectionStart" in e) var l = {
                    start: e.selectionStart,
                    end: e.selectionEnd
                };
                else e: {
                    l = (l = e.ownerDocument) && l.defaultView || window;
                    var a = l.getSelection && l.getSelection();
                    if (a && a.rangeCount !== 0) {
                        l = a.anchorNode;
                        var n = a.anchorOffset, i = a.focusNode;
                        a = a.focusOffset;
                        try {
                            l.nodeType, i.nodeType;
                        } catch  {
                            l = null;
                            break e;
                        }
                        var f = 0, h = -1, g = -1, C = 0, U = 0, G = e, A = null;
                        t: for(;;){
                            for(var D; G !== l || n !== 0 && G.nodeType !== 3 || (h = f + n), G !== i || a !== 0 && G.nodeType !== 3 || (g = f + a), G.nodeType === 3 && (f += G.nodeValue.length), (D = G.firstChild) !== null;)A = G, G = D;
                            for(;;){
                                if (G === e) break t;
                                if (A === l && ++C === n && (h = f), A === i && ++U === a && (g = f), (D = G.nextSibling) !== null) break;
                                G = A, A = G.parentNode;
                            }
                            G = D;
                        }
                        l = h === -1 || g === -1 ? null : {
                            start: h,
                            end: g
                        };
                    } else l = null;
                }
                l = l || {
                    start: 0,
                    end: 0
                };
            } else l = null;
            for(Zu = {
                focusedElem: e,
                selectionRange: l
            }, _s = !1, at = t; at !== null;)if (t = at, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, at = e;
            else for(; at !== null;){
                switch(t = at, i = t.alternate, e = t.flags, t.tag){
                    case 0:
                        if ((e & 4) !== 0 && (e = t.updateQueue, e = e !== null ? e.events : null, e !== null)) for(l = 0; l < e.length; l++)n = e[l], n.ref.impl = n.nextImpl;
                        break;
                    case 11:
                    case 15:
                        break;
                    case 1:
                        if ((e & 1024) !== 0 && i !== null) {
                            e = void 0, l = t, n = i.memoizedProps, i = i.memoizedState, a = l.stateNode;
                            try {
                                var I = ma(l.type, n);
                                e = a.getSnapshotBeforeUpdate(I, i), a.__reactInternalSnapshotBeforeUpdate = e;
                            } catch (oe) {
                                Oe(l, l.return, oe);
                            }
                        }
                        break;
                    case 3:
                        if ((e & 1024) !== 0) {
                            if (e = t.stateNode.containerInfo, l = e.nodeType, l === 9) $u(e);
                            else if (l === 1) switch(e.nodeName){
                                case "HEAD":
                                case "HTML":
                                case "BODY":
                                    $u(e);
                                    break;
                                default:
                                    e.textContent = "";
                            }
                        }
                        break;
                    case 5:
                    case 26:
                    case 27:
                    case 6:
                    case 4:
                    case 17:
                        break;
                    default:
                        if ((e & 1024) !== 0) throw Error(r(163));
                }
                if (e = t.sibling, e !== null) {
                    e.return = t.return, at = e;
                    break;
                }
                at = t.return;
            }
        }
        function vd(e, t, l) {
            var a = l.flags;
            switch(l.tag){
                case 0:
                case 11:
                case 15:
                    xl(e, l), a & 4 && kn(5, l);
                    break;
                case 1:
                    if (xl(e, l), a & 4) if (e = l.stateNode, t === null) try {
                        e.componentDidMount();
                    } catch (f) {
                        Oe(l, l.return, f);
                    }
                    else {
                        var n = ma(l.type, t.memoizedProps);
                        t = t.memoizedState;
                        try {
                            e.componentDidUpdate(n, t, e.__reactInternalSnapshotBeforeUpdate);
                        } catch (f) {
                            Oe(l, l.return, f);
                        }
                    }
                    a & 64 && hd(l), a & 512 && Bn(l, l.return);
                    break;
                case 3:
                    if (xl(e, l), a & 64 && (e = l.updateQueue, e !== null)) {
                        if (t = null, l.child !== null) switch(l.child.tag){
                            case 27:
                            case 5:
                                t = l.child.stateNode;
                                break;
                            case 1:
                                t = l.child.stateNode;
                        }
                        try {
                            lf(e, t);
                        } catch (f) {
                            Oe(l, l.return, f);
                        }
                    }
                    break;
                case 27:
                    t === null && a & 4 && yd(l);
                case 26:
                case 5:
                    xl(e, l), t === null && a & 4 && pd(l), a & 512 && Bn(l, l.return);
                    break;
                case 12:
                    xl(e, l);
                    break;
                case 31:
                    xl(e, l), a & 4 && Td(e, l);
                    break;
                case 13:
                    xl(e, l), a & 4 && Sd(e, l), a & 64 && (e = l.memoizedState, e !== null && (e = e.dehydrated, e !== null && (l = gx.bind(null, l), qx(e, l))));
                    break;
                case 22:
                    if (a = l.memoizedState !== null || ml, !a) {
                        t = t !== null && t.memoizedState !== null || Fe, n = ml;
                        var i = Fe;
                        ml = a, (Fe = t) && !i ? yl(e, l, (l.subtreeFlags & 8772) !== 0) : xl(e, l), ml = n, Fe = i;
                    }
                    break;
                case 30:
                    break;
                default:
                    xl(e, l);
            }
        }
        function gd(e) {
            var t = e.alternate;
            t !== null && (e.alternate = null, gd(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ec(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
        }
        var Ge = null, yt = !1;
        function pl(e, t, l) {
            for(l = l.child; l !== null;)wd(e, t, l), l = l.sibling;
        }
        function wd(e, t, l) {
            if (Tt && typeof Tt.onCommitFiberUnmount == "function") try {
                Tt.onCommitFiberUnmount(rn, l);
            } catch  {}
            switch(l.tag){
                case 26:
                    Fe || Pt(l, t), pl(e, t, l), l.memoizedState ? l.memoizedState.count-- : l.stateNode && (l = l.stateNode, l.parentNode.removeChild(l));
                    break;
                case 27:
                    Fe || Pt(l, t);
                    var a = Ge, n = yt;
                    Ql(l.type) && (Ge = l.stateNode, yt = !1), pl(e, t, l), Jn(l.stateNode), Ge = a, yt = n;
                    break;
                case 5:
                    Fe || Pt(l, t);
                case 6:
                    if (a = Ge, n = yt, Ge = null, pl(e, t, l), Ge = a, yt = n, Ge !== null) if (yt) try {
                        (Ge.nodeType === 9 ? Ge.body : Ge.nodeName === "HTML" ? Ge.ownerDocument.body : Ge).removeChild(l.stateNode);
                    } catch (i) {
                        Oe(l, t, i);
                    }
                    else try {
                        Ge.removeChild(l.stateNode);
                    } catch (i) {
                        Oe(l, t, i);
                    }
                    break;
                case 18:
                    Ge !== null && (yt ? (e = Ge, hh(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, l.stateNode), tn(e)) : hh(Ge, l.stateNode));
                    break;
                case 4:
                    a = Ge, n = yt, Ge = l.stateNode.containerInfo, yt = !0, pl(e, t, l), Ge = a, yt = n;
                    break;
                case 0:
                case 11:
                case 14:
                case 15:
                    kl(2, l, t), Fe || kl(4, l, t), pl(e, t, l);
                    break;
                case 1:
                    Fe || (Pt(l, t), a = l.stateNode, typeof a.componentWillUnmount == "function" && md(l, t, a)), pl(e, t, l);
                    break;
                case 21:
                    pl(e, t, l);
                    break;
                case 22:
                    Fe = (a = Fe) || l.memoizedState !== null, pl(e, t, l), Fe = a;
                    break;
                default:
                    pl(e, t, l);
            }
        }
        function Td(e, t) {
            if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
                e = e.dehydrated;
                try {
                    tn(e);
                } catch (l) {
                    Oe(t, t.return, l);
                }
            }
        }
        function Sd(e, t) {
            if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
                tn(e);
            } catch (l) {
                Oe(t, t.return, l);
            }
        }
        function dx(e) {
            switch(e.tag){
                case 31:
                case 13:
                case 19:
                    var t = e.stateNode;
                    return t === null && (t = e.stateNode = new bd), t;
                case 22:
                    return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new bd), t;
                default:
                    throw Error(r(435, e.tag));
            }
        }
        function ns(e, t) {
            var l = dx(e);
            t.forEach(function(a) {
                if (!l.has(a)) {
                    l.add(a);
                    var n = wx.bind(null, e, a);
                    a.then(n, n);
                }
            });
        }
        function bt(e, t) {
            var l = t.deletions;
            if (l !== null) for(var a = 0; a < l.length; a++){
                var n = l[a], i = e, f = t, h = f;
                e: for(; h !== null;){
                    switch(h.tag){
                        case 27:
                            if (Ql(h.type)) {
                                Ge = h.stateNode, yt = !1;
                                break e;
                            }
                            break;
                        case 5:
                            Ge = h.stateNode, yt = !1;
                            break e;
                        case 3:
                        case 4:
                            Ge = h.stateNode.containerInfo, yt = !0;
                            break e;
                    }
                    h = h.return;
                }
                if (Ge === null) throw Error(r(160));
                wd(i, f, n), Ge = null, yt = !1, i = n.alternate, i !== null && (i.return = null), n.return = null;
            }
            if (t.subtreeFlags & 13886) for(t = t.child; t !== null;)_d(t, e), t = t.sibling;
        }
        var Kt = null;
        function _d(e, t) {
            var l = e.alternate, a = e.flags;
            switch(e.tag){
                case 0:
                case 11:
                case 14:
                case 15:
                    bt(t, e), vt(e), a & 4 && (kl(3, e, e.return), kn(3, e), kl(5, e, e.return));
                    break;
                case 1:
                    bt(t, e), vt(e), a & 512 && (Fe || l === null || Pt(l, l.return)), a & 64 && ml && (e = e.updateQueue, e !== null && (a = e.callbacks, a !== null && (l = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = l === null ? a : l.concat(a))));
                    break;
                case 26:
                    var n = Kt;
                    if (bt(t, e), vt(e), a & 512 && (Fe || l === null || Pt(l, l.return)), a & 4) {
                        var i = l !== null ? l.memoizedState : null;
                        if (a = e.memoizedState, l === null) if (a === null) if (e.stateNode === null) {
                            e: {
                                a = e.type, l = e.memoizedProps, n = n.ownerDocument || n;
                                t: switch(a){
                                    case "title":
                                        i = n.getElementsByTagName("title")[0], (!i || i[dn] || i[it] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = n.createElement(a), n.head.insertBefore(i, n.querySelector("head > title"))), rt(i, a, l), i[it] = e, lt(i), a = i;
                                        break e;
                                    case "link":
                                        var f = _h("link", "href", n).get(a + (l.href || ""));
                                        if (f) {
                                            for(var h = 0; h < f.length; h++)if (i = f[h], i.getAttribute("href") === (l.href == null || l.href === "" ? null : l.href) && i.getAttribute("rel") === (l.rel == null ? null : l.rel) && i.getAttribute("title") === (l.title == null ? null : l.title) && i.getAttribute("crossorigin") === (l.crossOrigin == null ? null : l.crossOrigin)) {
                                                f.splice(h, 1);
                                                break t;
                                            }
                                        }
                                        i = n.createElement(a), rt(i, a, l), n.head.appendChild(i);
                                        break;
                                    case "meta":
                                        if (f = _h("meta", "content", n).get(a + (l.content || ""))) {
                                            for(h = 0; h < f.length; h++)if (i = f[h], i.getAttribute("content") === (l.content == null ? null : "" + l.content) && i.getAttribute("name") === (l.name == null ? null : l.name) && i.getAttribute("property") === (l.property == null ? null : l.property) && i.getAttribute("http-equiv") === (l.httpEquiv == null ? null : l.httpEquiv) && i.getAttribute("charset") === (l.charSet == null ? null : l.charSet)) {
                                                f.splice(h, 1);
                                                break t;
                                            }
                                        }
                                        i = n.createElement(a), rt(i, a, l), n.head.appendChild(i);
                                        break;
                                    default:
                                        throw Error(r(468, a));
                                }
                                i[it] = e, lt(i), a = i;
                            }
                            e.stateNode = a;
                        } else Nh(n, e.type, e.stateNode);
                        else e.stateNode = Sh(n, a, e.memoizedProps);
                        else i !== a ? (i === null ? l.stateNode !== null && (l = l.stateNode, l.parentNode.removeChild(l)) : i.count--, a === null ? Nh(n, e.type, e.stateNode) : Sh(n, a, e.memoizedProps)) : a === null && e.stateNode !== null && wu(e, e.memoizedProps, l.memoizedProps);
                    }
                    break;
                case 27:
                    bt(t, e), vt(e), a & 512 && (Fe || l === null || Pt(l, l.return)), l !== null && a & 4 && wu(e, e.memoizedProps, l.memoizedProps);
                    break;
                case 5:
                    if (bt(t, e), vt(e), a & 512 && (Fe || l === null || Pt(l, l.return)), e.flags & 32) {
                        n = e.stateNode;
                        try {
                            _a(n, "");
                        } catch (I) {
                            Oe(e, e.return, I);
                        }
                    }
                    a & 4 && e.stateNode != null && (n = e.memoizedProps, wu(e, n, l !== null ? l.memoizedProps : n)), a & 1024 && (_u = !0);
                    break;
                case 6:
                    if (bt(t, e), vt(e), a & 4) {
                        if (e.stateNode === null) throw Error(r(162));
                        a = e.memoizedProps, l = e.stateNode;
                        try {
                            l.nodeValue = a;
                        } catch (I) {
                            Oe(e, e.return, I);
                        }
                    }
                    break;
                case 3:
                    if (gs = null, n = Kt, Kt = bs(t.containerInfo), bt(t, e), Kt = n, vt(e), a & 4 && l !== null && l.memoizedState.isDehydrated) try {
                        tn(t.containerInfo);
                    } catch (I) {
                        Oe(e, e.return, I);
                    }
                    _u && (_u = !1, Nd(e));
                    break;
                case 4:
                    a = Kt, Kt = bs(e.stateNode.containerInfo), bt(t, e), vt(e), Kt = a;
                    break;
                case 12:
                    bt(t, e), vt(e);
                    break;
                case 31:
                    bt(t, e), vt(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, ns(e, a)));
                    break;
                case 13:
                    bt(t, e), vt(e), e.child.flags & 8192 && e.memoizedState !== null != (l !== null && l.memoizedState !== null) && (ss = tt()), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, ns(e, a)));
                    break;
                case 22:
                    n = e.memoizedState !== null;
                    var g = l !== null && l.memoizedState !== null, C = ml, U = Fe;
                    if (ml = C || n, Fe = U || g, bt(t, e), Fe = U, ml = C, vt(e), a & 8192) e: for(t = e.stateNode, t._visibility = n ? t._visibility & -2 : t._visibility | 1, n && (l === null || g || ml || Fe || pa(e)), l = null, t = e;;){
                        if (t.tag === 5 || t.tag === 26) {
                            if (l === null) {
                                g = l = t;
                                try {
                                    if (i = g.stateNode, n) f = i.style, typeof f.setProperty == "function" ? f.setProperty("display", "none", "important") : f.display = "none";
                                    else {
                                        h = g.stateNode;
                                        var G = g.memoizedProps.style, A = G != null && G.hasOwnProperty("display") ? G.display : null;
                                        h.style.display = A == null || typeof A == "boolean" ? "" : ("" + A).trim();
                                    }
                                } catch (I) {
                                    Oe(g, g.return, I);
                                }
                            }
                        } else if (t.tag === 6) {
                            if (l === null) {
                                g = t;
                                try {
                                    g.stateNode.nodeValue = n ? "" : g.memoizedProps;
                                } catch (I) {
                                    Oe(g, g.return, I);
                                }
                            }
                        } else if (t.tag === 18) {
                            if (l === null) {
                                g = t;
                                try {
                                    var D = g.stateNode;
                                    n ? mh(D, !0) : mh(g.stateNode, !1);
                                } catch (I) {
                                    Oe(g, g.return, I);
                                }
                            }
                        } else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
                            t.child.return = t, t = t.child;
                            continue;
                        }
                        if (t === e) break e;
                        for(; t.sibling === null;){
                            if (t.return === null || t.return === e) break e;
                            l === t && (l = null), t = t.return;
                        }
                        l === t && (l = null), t.sibling.return = t.return, t = t.sibling;
                    }
                    a & 4 && (a = e.updateQueue, a !== null && (l = a.retryQueue, l !== null && (a.retryQueue = null, ns(e, l))));
                    break;
                case 19:
                    bt(t, e), vt(e), a & 4 && (a = e.updateQueue, a !== null && (e.updateQueue = null, ns(e, a)));
                    break;
                case 30:
                    break;
                case 21:
                    break;
                default:
                    bt(t, e), vt(e);
            }
        }
        function vt(e) {
            var t = e.flags;
            if (t & 2) {
                try {
                    for(var l, a = e.return; a !== null;){
                        if (xd(a)) {
                            l = a;
                            break;
                        }
                        a = a.return;
                    }
                    if (l == null) throw Error(r(160));
                    switch(l.tag){
                        case 27:
                            var n = l.stateNode, i = Tu(e);
                            as(e, i, n);
                            break;
                        case 5:
                            var f = l.stateNode;
                            l.flags & 32 && (_a(f, ""), l.flags &= -33);
                            var h = Tu(e);
                            as(e, h, f);
                            break;
                        case 3:
                        case 4:
                            var g = l.stateNode.containerInfo, C = Tu(e);
                            Su(e, C, g);
                            break;
                        default:
                            throw Error(r(161));
                    }
                } catch (U) {
                    Oe(e, e.return, U);
                }
                e.flags &= -3;
            }
            t & 4096 && (e.flags &= -4097);
        }
        function Nd(e) {
            if (e.subtreeFlags & 1024) for(e = e.child; e !== null;){
                var t = e;
                Nd(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
            }
        }
        function xl(e, t) {
            if (t.subtreeFlags & 8772) for(t = t.child; t !== null;)vd(e, t.alternate, t), t = t.sibling;
        }
        function pa(e) {
            for(e = e.child; e !== null;){
                var t = e;
                switch(t.tag){
                    case 0:
                    case 11:
                    case 14:
                    case 15:
                        kl(4, t, t.return), pa(t);
                        break;
                    case 1:
                        Pt(t, t.return);
                        var l = t.stateNode;
                        typeof l.componentWillUnmount == "function" && md(t, t.return, l), pa(t);
                        break;
                    case 27:
                        Jn(t.stateNode);
                    case 26:
                    case 5:
                        Pt(t, t.return), pa(t);
                        break;
                    case 22:
                        t.memoizedState === null && pa(t);
                        break;
                    case 30:
                        pa(t);
                        break;
                    default:
                        pa(t);
                }
                e = e.sibling;
            }
        }
        function yl(e, t, l) {
            for(l = l && (t.subtreeFlags & 8772) !== 0, t = t.child; t !== null;){
                var a = t.alternate, n = e, i = t, f = i.flags;
                switch(i.tag){
                    case 0:
                    case 11:
                    case 15:
                        yl(n, i, l), kn(4, i);
                        break;
                    case 1:
                        if (yl(n, i, l), a = i, n = a.stateNode, typeof n.componentDidMount == "function") try {
                            n.componentDidMount();
                        } catch (C) {
                            Oe(a, a.return, C);
                        }
                        if (a = i, n = a.updateQueue, n !== null) {
                            var h = a.stateNode;
                            try {
                                var g = n.shared.hiddenCallbacks;
                                if (g !== null) for(n.shared.hiddenCallbacks = null, n = 0; n < g.length; n++)tf(g[n], h);
                            } catch (C) {
                                Oe(a, a.return, C);
                            }
                        }
                        l && f & 64 && hd(i), Bn(i, i.return);
                        break;
                    case 27:
                        yd(i);
                    case 26:
                    case 5:
                        yl(n, i, l), l && a === null && f & 4 && pd(i), Bn(i, i.return);
                        break;
                    case 12:
                        yl(n, i, l);
                        break;
                    case 31:
                        yl(n, i, l), l && f & 4 && Td(n, i);
                        break;
                    case 13:
                        yl(n, i, l), l && f & 4 && Sd(n, i);
                        break;
                    case 22:
                        i.memoizedState === null && yl(n, i, l), Bn(i, i.return);
                        break;
                    case 30:
                        break;
                    default:
                        yl(n, i, l);
                }
                t = t.sibling;
            }
        }
        function Nu(e, t) {
            var l = null;
            e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== l && (e != null && e.refCount++, l != null && Nn(l));
        }
        function ju(e, t) {
            e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Nn(e));
        }
        function Jt(e, t, l, a) {
            if (t.subtreeFlags & 10256) for(t = t.child; t !== null;)jd(e, t, l, a), t = t.sibling;
        }
        function jd(e, t, l, a) {
            var n = t.flags;
            switch(t.tag){
                case 0:
                case 11:
                case 15:
                    Jt(e, t, l, a), n & 2048 && kn(9, t);
                    break;
                case 1:
                    Jt(e, t, l, a);
                    break;
                case 3:
                    Jt(e, t, l, a), n & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && Nn(e)));
                    break;
                case 12:
                    if (n & 2048) {
                        Jt(e, t, l, a), e = t.stateNode;
                        try {
                            var i = t.memoizedProps, f = i.id, h = i.onPostCommit;
                            typeof h == "function" && h(f, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
                        } catch (g) {
                            Oe(t, t.return, g);
                        }
                    } else Jt(e, t, l, a);
                    break;
                case 31:
                    Jt(e, t, l, a);
                    break;
                case 13:
                    Jt(e, t, l, a);
                    break;
                case 23:
                    break;
                case 22:
                    i = t.stateNode, f = t.alternate, t.memoizedState !== null ? i._visibility & 2 ? Jt(e, t, l, a) : qn(e, t) : i._visibility & 2 ? Jt(e, t, l, a) : (i._visibility |= 2, Xa(e, t, l, a, (t.subtreeFlags & 10256) !== 0 || !1)), n & 2048 && Nu(f, t);
                    break;
                case 24:
                    Jt(e, t, l, a), n & 2048 && ju(t.alternate, t);
                    break;
                default:
                    Jt(e, t, l, a);
            }
        }
        function Xa(e, t, l, a, n) {
            for(n = n && ((t.subtreeFlags & 10256) !== 0 || !1), t = t.child; t !== null;){
                var i = e, f = t, h = l, g = a, C = f.flags;
                switch(f.tag){
                    case 0:
                    case 11:
                    case 15:
                        Xa(i, f, h, g, n), kn(8, f);
                        break;
                    case 23:
                        break;
                    case 22:
                        var U = f.stateNode;
                        f.memoizedState !== null ? U._visibility & 2 ? Xa(i, f, h, g, n) : qn(i, f) : (U._visibility |= 2, Xa(i, f, h, g, n)), n && C & 2048 && Nu(f.alternate, f);
                        break;
                    case 24:
                        Xa(i, f, h, g, n), n && C & 2048 && ju(f.alternate, f);
                        break;
                    default:
                        Xa(i, f, h, g, n);
                }
                t = t.sibling;
            }
        }
        function qn(e, t) {
            if (t.subtreeFlags & 10256) for(t = t.child; t !== null;){
                var l = e, a = t, n = a.flags;
                switch(a.tag){
                    case 22:
                        qn(l, a), n & 2048 && Nu(a.alternate, a);
                        break;
                    case 24:
                        qn(l, a), n & 2048 && ju(a.alternate, a);
                        break;
                    default:
                        qn(l, a);
                }
                t = t.sibling;
            }
        }
        var Gn = 8192;
        function Qa(e, t, l) {
            if (e.subtreeFlags & Gn) for(e = e.child; e !== null;)Ed(e, t, l), e = e.sibling;
        }
        function Ed(e, t, l) {
            switch(e.tag){
                case 26:
                    Qa(e, t, l), e.flags & Gn && e.memoizedState !== null && Ix(l, Kt, e.memoizedState, e.memoizedProps);
                    break;
                case 5:
                    Qa(e, t, l);
                    break;
                case 3:
                case 4:
                    var a = Kt;
                    Kt = bs(e.stateNode.containerInfo), Qa(e, t, l), Kt = a;
                    break;
                case 22:
                    e.memoizedState === null && (a = e.alternate, a !== null && a.memoizedState !== null ? (a = Gn, Gn = 16777216, Qa(e, t, l), Gn = a) : Qa(e, t, l));
                    break;
                default:
                    Qa(e, t, l);
            }
        }
        function Cd(e) {
            var t = e.alternate;
            if (t !== null && (e = t.child, e !== null)) {
                t.child = null;
                do t = e.sibling, e.sibling = null, e = t;
                while (e !== null);
            }
        }
        function Yn(e) {
            var t = e.deletions;
            if ((e.flags & 16) !== 0) {
                if (t !== null) for(var l = 0; l < t.length; l++){
                    var a = t[l];
                    at = a, Rd(a, e);
                }
                Cd(e);
            }
            if (e.subtreeFlags & 10256) for(e = e.child; e !== null;)Ad(e), e = e.sibling;
        }
        function Ad(e) {
            switch(e.tag){
                case 0:
                case 11:
                case 15:
                    Yn(e), e.flags & 2048 && kl(9, e, e.return);
                    break;
                case 3:
                    Yn(e);
                    break;
                case 12:
                    Yn(e);
                    break;
                case 22:
                    var t = e.stateNode;
                    e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, is(e)) : Yn(e);
                    break;
                default:
                    Yn(e);
            }
        }
        function is(e) {
            var t = e.deletions;
            if ((e.flags & 16) !== 0) {
                if (t !== null) for(var l = 0; l < t.length; l++){
                    var a = t[l];
                    at = a, Rd(a, e);
                }
                Cd(e);
            }
            for(e = e.child; e !== null;){
                switch(t = e, t.tag){
                    case 0:
                    case 11:
                    case 15:
                        kl(8, t, t.return), is(t);
                        break;
                    case 22:
                        l = t.stateNode, l._visibility & 2 && (l._visibility &= -3, is(t));
                        break;
                    default:
                        is(t);
                }
                e = e.sibling;
            }
        }
        function Rd(e, t) {
            for(; at !== null;){
                var l = at;
                switch(l.tag){
                    case 0:
                    case 11:
                    case 15:
                        kl(8, l, t);
                        break;
                    case 23:
                    case 22:
                        if (l.memoizedState !== null && l.memoizedState.cachePool !== null) {
                            var a = l.memoizedState.cachePool.pool;
                            a != null && a.refCount++;
                        }
                        break;
                    case 24:
                        Nn(l.memoizedState.cache);
                }
                if (a = l.child, a !== null) a.return = l, at = a;
                else e: for(l = e; at !== null;){
                    a = at;
                    var n = a.sibling, i = a.return;
                    if (gd(a), a === l) {
                        at = null;
                        break e;
                    }
                    if (n !== null) {
                        n.return = i, at = n;
                        break e;
                    }
                    at = i;
                }
            }
        }
        var hx = {
            getCacheForType: function(e) {
                var t = ct(Je), l = t.data.get(e);
                return l === void 0 && (l = e(), t.data.set(e, l)), l;
            },
            cacheSignal: function() {
                return ct(Je).controller.signal;
            }
        }, mx = typeof WeakMap == "function" ? WeakMap : Map, Ae = 0, Le = null, ve = null, Te = 0, Me = 0, Ct = null, Bl = !1, Za = !1, Eu = !1, bl = 0, Xe = 0, ql = 0, xa = 0, Cu = 0, At = 0, Ka = 0, Vn = null, gt = null, Au = !1, ss = 0, Md = 0, cs = 1 / 0, us = null, Gl = null, et = 0, Yl = null, Ja = null, vl = 0, Ru = 0, Mu = null, Od = null, Xn = 0, Ou = null;
        function Rt() {
            return (Ae & 2) !== 0 && Te !== 0 ? Te & -Te : S.T !== null ? ku() : Zr();
        }
        function Dd() {
            if (At === 0) if ((Te & 536870912) === 0 || _e) {
                var e = xi;
                xi <<= 1, (xi & 3932160) === 0 && (xi = 262144), At = e;
            } else At = 536870912;
            return e = jt.current, e !== null && (e.flags |= 32), At;
        }
        function wt(e, t, l) {
            (e === Le && (Me === 2 || Me === 9) || e.cancelPendingCommit !== null) && ($a(e, 0), Vl(e, Te, At, !1)), fn(e, l), ((Ae & 2) === 0 || e !== Le) && (e === Le && ((Ae & 2) === 0 && (xa |= l), Xe === 4 && Vl(e, Te, At, !1)), el(e));
        }
        function zd(e, t, l) {
            if ((Ae & 6) !== 0) throw Error(r(327));
            var a = !l && (t & 127) === 0 && (t & e.expiredLanes) === 0 || on(e, t), n = a ? yx(e, t) : zu(e, t, !0), i = a;
            do {
                if (n === 0) {
                    Za && !a && Vl(e, t, 0, !1);
                    break;
                } else {
                    if (l = e.current.alternate, i && !px(l)) {
                        n = zu(e, t, !1), i = !1;
                        continue;
                    }
                    if (n === 2) {
                        if (i = t, e.errorRecoveryDisabledLanes & i) var f = 0;
                        else f = e.pendingLanes & -536870913, f = f !== 0 ? f : f & 536870912 ? 536870912 : 0;
                        if (f !== 0) {
                            t = f;
                            e: {
                                var h = e;
                                n = Vn;
                                var g = h.current.memoizedState.isDehydrated;
                                if (g && ($a(h, f).flags |= 256), f = zu(h, f, !1), f !== 2) {
                                    if (Eu && !g) {
                                        h.errorRecoveryDisabledLanes |= i, xa |= i, n = 4;
                                        break e;
                                    }
                                    i = gt, gt = n, i !== null && (gt === null ? gt = i : gt.push.apply(gt, i));
                                }
                                n = f;
                            }
                            if (i = !1, n !== 2) continue;
                        }
                    }
                    if (n === 1) {
                        $a(e, 0), Vl(e, t, 0, !0);
                        break;
                    }
                    e: {
                        switch(a = e, i = n, i){
                            case 0:
                            case 1:
                                throw Error(r(345));
                            case 4:
                                if ((t & 4194048) !== t) break;
                            case 6:
                                Vl(a, t, At, !Bl);
                                break e;
                            case 2:
                                gt = null;
                                break;
                            case 3:
                            case 5:
                                break;
                            default:
                                throw Error(r(329));
                        }
                        if ((t & 62914560) === t && (n = ss + 300 - tt(), 10 < n)) {
                            if (Vl(a, t, At, !Bl), bi(a, 0, !0) !== 0) break e;
                            vl = t, a.timeoutHandle = fh(Ud.bind(null, a, l, gt, us, Au, t, At, xa, Ka, Bl, i, "Throttled", -0, 0), n);
                            break e;
                        }
                        Ud(a, l, gt, us, Au, t, At, xa, Ka, Bl, i, null, -0, 0);
                    }
                }
                break;
            }while (!0);
            el(e);
        }
        function Ud(e, t, l, a, n, i, f, h, g, C, U, G, A, D) {
            if (e.timeoutHandle = -1, G = t.subtreeFlags, G & 8192 || (G & 16785408) === 16785408) {
                G = {
                    stylesheets: null,
                    count: 0,
                    imgCount: 0,
                    imgBytes: 0,
                    suspenseyImages: [],
                    waitingForImages: !0,
                    waitingForViewTransition: !1,
                    unsuspend: nl
                }, Ed(t, i, G);
                var I = (i & 62914560) === i ? ss - tt() : (i & 4194048) === i ? Md - tt() : 0;
                if (I = Px(G, I), I !== null) {
                    vl = i, e.cancelPendingCommit = I(Vd.bind(null, e, t, i, l, a, n, f, h, g, U, G, null, A, D)), Vl(e, i, f, !C);
                    return;
                }
            }
            Vd(e, t, i, l, a, n, f, h, g);
        }
        function px(e) {
            for(var t = e;;){
                var l = t.tag;
                if ((l === 0 || l === 11 || l === 15) && t.flags & 16384 && (l = t.updateQueue, l !== null && (l = l.stores, l !== null))) for(var a = 0; a < l.length; a++){
                    var n = l[a], i = n.getSnapshot;
                    n = n.value;
                    try {
                        if (!_t(i(), n)) return !1;
                    } catch  {
                        return !1;
                    }
                }
                if (l = t.child, t.subtreeFlags & 16384 && l !== null) l.return = t, t = l;
                else {
                    if (t === e) break;
                    for(; t.sibling === null;){
                        if (t.return === null || t.return === e) return !0;
                        t = t.return;
                    }
                    t.sibling.return = t.return, t = t.sibling;
                }
            }
            return !0;
        }
        function Vl(e, t, l, a) {
            t &= ~Cu, t &= ~xa, e.suspendedLanes |= t, e.pingedLanes &= ~t, a && (e.warmLanes |= t), a = e.expirationTimes;
            for(var n = t; 0 < n;){
                var i = 31 - St(n), f = 1 << i;
                a[i] = -1, n &= ~f;
            }
            l !== 0 && Vr(e, l, t);
        }
        function rs() {
            return (Ae & 6) === 0 ? (Qn(0), !1) : !0;
        }
        function Du() {
            if (ve !== null) {
                if (Me === 0) var e = ve.return;
                else e = ve, ul = ca = null, $c(e), Ba = null, En = 0, e = ve;
                for(; e !== null;)dd(e.alternate, e), e = e.return;
                ve = null;
            }
        }
        function $a(e, t) {
            var l = e.timeoutHandle;
            l !== -1 && (e.timeoutHandle = -1, Ux(l)), l = e.cancelPendingCommit, l !== null && (e.cancelPendingCommit = null, l()), vl = 0, Du(), Le = e, ve = l = sl(e.current, null), Te = t, Me = 0, Ct = null, Bl = !1, Za = on(e, t), Eu = !1, Ka = At = Cu = xa = ql = Xe = 0, gt = Vn = null, Au = !1, (t & 8) !== 0 && (t |= t & 32);
            var a = e.entangledLanes;
            if (a !== 0) for(e = e.entanglements, a &= t; 0 < a;){
                var n = 31 - St(a), i = 1 << n;
                t |= e[n], a &= ~i;
            }
            return bl = t, Ri(), l;
        }
        function Ld(e, t) {
            me = null, S.H = Un, t === ka || t === ki ? (t = Fo(), Me = 3) : t === Hc ? (t = Fo(), Me = 4) : Me = t === fu ? 8 : t !== null && typeof t == "object" && typeof t.then == "function" ? 6 : 1, Ct = t, ve === null && (Xe = 1, Ii(e, Lt(t, e.current)));
        }
        function Hd() {
            var e = jt.current;
            return e === null ? !0 : (Te & 4194048) === Te ? qt === null : (Te & 62914560) === Te || (Te & 536870912) !== 0 ? e === qt : !1;
        }
        function kd() {
            var e = S.H;
            return S.H = Un, e === null ? Un : e;
        }
        function Bd() {
            var e = S.A;
            return S.A = hx, e;
        }
        function os() {
            Xe = 4, Bl || (Te & 4194048) !== Te && jt.current !== null || (Za = !0), (ql & 134217727) === 0 && (xa & 134217727) === 0 || Le === null || Vl(Le, Te, At, !1);
        }
        function zu(e, t, l) {
            var a = Ae;
            Ae |= 2;
            var n = kd(), i = Bd();
            (Le !== e || Te !== t) && (us = null, $a(e, t)), t = !1;
            var f = Xe;
            e: do try {
                if (Me !== 0 && ve !== null) {
                    var h = ve, g = Ct;
                    switch(Me){
                        case 8:
                            Du(), f = 6;
                            break e;
                        case 3:
                        case 2:
                        case 9:
                        case 6:
                            jt.current === null && (t = !0);
                            var C = Me;
                            if (Me = 0, Ct = null, Wa(e, h, g, C), l && Za) {
                                f = 0;
                                break e;
                            }
                            break;
                        default:
                            C = Me, Me = 0, Ct = null, Wa(e, h, g, C);
                    }
                }
                xx(), f = Xe;
                break;
            } catch (U) {
                Ld(e, U);
            }
            while (!0);
            return t && e.shellSuspendCounter++, ul = ca = null, Ae = a, S.H = n, S.A = i, ve === null && (Le = null, Te = 0, Ri()), f;
        }
        function xx() {
            for(; ve !== null;)qd(ve);
        }
        function yx(e, t) {
            var l = Ae;
            Ae |= 2;
            var a = kd(), n = Bd();
            Le !== e || Te !== t ? (us = null, cs = tt() + 500, $a(e, t)) : Za = on(e, t);
            e: do try {
                if (Me !== 0 && ve !== null) {
                    t = ve;
                    var i = Ct;
                    t: switch(Me){
                        case 1:
                            Me = 0, Ct = null, Wa(e, t, i, 1);
                            break;
                        case 2:
                        case 9:
                            if ($o(i)) {
                                Me = 0, Ct = null, Gd(t);
                                break;
                            }
                            t = function() {
                                Me !== 2 && Me !== 9 || Le !== e || (Me = 7), el(e);
                            }, i.then(t, t);
                            break e;
                        case 3:
                            Me = 7;
                            break e;
                        case 4:
                            Me = 5;
                            break e;
                        case 7:
                            $o(i) ? (Me = 0, Ct = null, Gd(t)) : (Me = 0, Ct = null, Wa(e, t, i, 7));
                            break;
                        case 5:
                            var f = null;
                            switch(ve.tag){
                                case 26:
                                    f = ve.memoizedState;
                                case 5:
                                case 27:
                                    var h = ve;
                                    if (f ? jh(f) : h.stateNode.complete) {
                                        Me = 0, Ct = null;
                                        var g = h.sibling;
                                        if (g !== null) ve = g;
                                        else {
                                            var C = h.return;
                                            C !== null ? (ve = C, fs(C)) : ve = null;
                                        }
                                        break t;
                                    }
                            }
                            Me = 0, Ct = null, Wa(e, t, i, 5);
                            break;
                        case 6:
                            Me = 0, Ct = null, Wa(e, t, i, 6);
                            break;
                        case 8:
                            Du(), Xe = 6;
                            break e;
                        default:
                            throw Error(r(462));
                    }
                }
                bx();
                break;
            } catch (U) {
                Ld(e, U);
            }
            while (!0);
            return ul = ca = null, S.H = a, S.A = n, Ae = l, ve !== null ? 0 : (Le = null, Te = 0, Ri(), Xe);
        }
        function bx() {
            for(; ve !== null && !Qt();)qd(ve);
        }
        function qd(e) {
            var t = od(e.alternate, e, bl);
            e.memoizedProps = e.pendingProps, t === null ? fs(e) : ve = t;
        }
        function Gd(e) {
            var t = e, l = t.alternate;
            switch(t.tag){
                case 15:
                case 0:
                    t = nd(l, t, t.pendingProps, t.type, void 0, Te);
                    break;
                case 11:
                    t = nd(l, t, t.pendingProps, t.type.render, t.ref, Te);
                    break;
                case 5:
                    $c(t);
                default:
                    dd(l, t), t = ve = ko(t, bl), t = od(l, t, bl);
            }
            e.memoizedProps = e.pendingProps, t === null ? fs(e) : ve = t;
        }
        function Wa(e, t, l, a) {
            ul = ca = null, $c(t), Ba = null, En = 0;
            var n = t.return;
            try {
                if (sx(e, n, t, l, Te)) {
                    Xe = 1, Ii(e, Lt(l, e.current)), ve = null;
                    return;
                }
            } catch (i) {
                if (n !== null) throw ve = n, i;
                Xe = 1, Ii(e, Lt(l, e.current)), ve = null;
                return;
            }
            t.flags & 32768 ? (_e || a === 1 ? e = !0 : Za || (Te & 536870912) !== 0 ? e = !1 : (Bl = e = !0, (a === 2 || a === 9 || a === 3 || a === 6) && (a = jt.current, a !== null && a.tag === 13 && (a.flags |= 16384))), Yd(t, e)) : fs(t);
        }
        function fs(e) {
            var t = e;
            do {
                if ((t.flags & 32768) !== 0) {
                    Yd(t, Bl);
                    return;
                }
                e = t.return;
                var l = rx(t.alternate, t, bl);
                if (l !== null) {
                    ve = l;
                    return;
                }
                if (t = t.sibling, t !== null) {
                    ve = t;
                    return;
                }
                ve = t = e;
            }while (t !== null);
            Xe === 0 && (Xe = 5);
        }
        function Yd(e, t) {
            do {
                var l = ox(e.alternate, e);
                if (l !== null) {
                    l.flags &= 32767, ve = l;
                    return;
                }
                if (l = e.return, l !== null && (l.flags |= 32768, l.subtreeFlags = 0, l.deletions = null), !t && (e = e.sibling, e !== null)) {
                    ve = e;
                    return;
                }
                ve = e = l;
            }while (e !== null);
            Xe = 6, ve = null;
        }
        function Vd(e, t, l, a, n, i, f, h, g) {
            e.cancelPendingCommit = null;
            do ds();
            while (et !== 0);
            if ((Ae & 6) !== 0) throw Error(r(327));
            if (t !== null) {
                if (t === e.current) throw Error(r(177));
                if (i = t.lanes | t.childLanes, i |= Tc, Fm(e, l, i, f, h, g), e === Le && (ve = Le = null, Te = 0), Ja = t, Yl = e, vl = l, Ru = i, Mu = n, Od = a, (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? (e.callbackNode = null, e.callbackPriority = 0, Tx(mi, function() {
                    return Jd(), null;
                })) : (e.callbackNode = null, e.callbackPriority = 0), a = (t.flags & 13878) !== 0, (t.subtreeFlags & 13878) !== 0 || a) {
                    a = S.T, S.T = null, n = z.p, z.p = 2, f = Ae, Ae |= 4;
                    try {
                        fx(e, t, l);
                    } finally{
                        Ae = f, z.p = n, S.T = a;
                    }
                }
                et = 1, Xd(), Qd(), Zd();
            }
        }
        function Xd() {
            if (et === 1) {
                et = 0;
                var e = Yl, t = Ja, l = (t.flags & 13878) !== 0;
                if ((t.subtreeFlags & 13878) !== 0 || l) {
                    l = S.T, S.T = null;
                    var a = z.p;
                    z.p = 2;
                    var n = Ae;
                    Ae |= 4;
                    try {
                        _d(t, e);
                        var i = Zu, f = Ao(e.containerInfo), h = i.focusedElem, g = i.selectionRange;
                        if (f !== h && h && h.ownerDocument && Co(h.ownerDocument.documentElement, h)) {
                            if (g !== null && yc(h)) {
                                var C = g.start, U = g.end;
                                if (U === void 0 && (U = C), "selectionStart" in h) h.selectionStart = C, h.selectionEnd = Math.min(U, h.value.length);
                                else {
                                    var G = h.ownerDocument || document, A = G && G.defaultView || window;
                                    if (A.getSelection) {
                                        var D = A.getSelection(), I = h.textContent.length, oe = Math.min(g.start, I), Ue = g.end === void 0 ? oe : Math.min(g.end, I);
                                        !D.extend && oe > Ue && (f = Ue, Ue = oe, oe = f);
                                        var j = Eo(h, oe), _ = Eo(h, Ue);
                                        if (j && _ && (D.rangeCount !== 1 || D.anchorNode !== j.node || D.anchorOffset !== j.offset || D.focusNode !== _.node || D.focusOffset !== _.offset)) {
                                            var E = G.createRange();
                                            E.setStart(j.node, j.offset), D.removeAllRanges(), oe > Ue ? (D.addRange(E), D.extend(_.node, _.offset)) : (E.setEnd(_.node, _.offset), D.addRange(E));
                                        }
                                    }
                                }
                            }
                            for(G = [], D = h; D = D.parentNode;)D.nodeType === 1 && G.push({
                                element: D,
                                left: D.scrollLeft,
                                top: D.scrollTop
                            });
                            for(typeof h.focus == "function" && h.focus(), h = 0; h < G.length; h++){
                                var q = G[h];
                                q.element.scrollLeft = q.left, q.element.scrollTop = q.top;
                            }
                        }
                        _s = !!Qu, Zu = Qu = null;
                    } finally{
                        Ae = n, z.p = a, S.T = l;
                    }
                }
                e.current = t, et = 2;
            }
        }
        function Qd() {
            if (et === 2) {
                et = 0;
                var e = Yl, t = Ja, l = (t.flags & 8772) !== 0;
                if ((t.subtreeFlags & 8772) !== 0 || l) {
                    l = S.T, S.T = null;
                    var a = z.p;
                    z.p = 2;
                    var n = Ae;
                    Ae |= 4;
                    try {
                        vd(e, t.alternate, t);
                    } finally{
                        Ae = n, z.p = a, S.T = l;
                    }
                }
                et = 3;
            }
        }
        function Zd() {
            if (et === 4 || et === 3) {
                et = 0, Il();
                var e = Yl, t = Ja, l = vl, a = Od;
                (t.subtreeFlags & 10256) !== 0 || (t.flags & 10256) !== 0 ? et = 5 : (et = 0, Ja = Yl = null, Kd(e, e.pendingLanes));
                var n = e.pendingLanes;
                if (n === 0 && (Gl = null), Is(l), t = t.stateNode, Tt && typeof Tt.onCommitFiberRoot == "function") try {
                    Tt.onCommitFiberRoot(rn, t, void 0, (t.current.flags & 128) === 128);
                } catch  {}
                if (a !== null) {
                    t = S.T, n = z.p, z.p = 2, S.T = null;
                    try {
                        for(var i = e.onRecoverableError, f = 0; f < a.length; f++){
                            var h = a[f];
                            i(h.value, {
                                componentStack: h.stack
                            });
                        }
                    } finally{
                        S.T = t, z.p = n;
                    }
                }
                (vl & 3) !== 0 && ds(), el(e), n = e.pendingLanes, (l & 261930) !== 0 && (n & 42) !== 0 ? e === Ou ? Xn++ : (Xn = 0, Ou = e) : Xn = 0, Qn(0);
            }
        }
        function Kd(e, t) {
            (e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, Nn(t)));
        }
        function ds() {
            return Xd(), Qd(), Zd(), Jd();
        }
        function Jd() {
            if (et !== 5) return !1;
            var e = Yl, t = Ru;
            Ru = 0;
            var l = Is(vl), a = S.T, n = z.p;
            try {
                z.p = 32 > l ? 32 : l, S.T = null, l = Mu, Mu = null;
                var i = Yl, f = vl;
                if (et = 0, Ja = Yl = null, vl = 0, (Ae & 6) !== 0) throw Error(r(331));
                var h = Ae;
                if (Ae |= 4, Ad(i.current), jd(i, i.current, f, l), Ae = h, Qn(0, !1), Tt && typeof Tt.onPostCommitFiberRoot == "function") try {
                    Tt.onPostCommitFiberRoot(rn, i);
                } catch  {}
                return !0;
            } finally{
                z.p = n, S.T = a, Kd(e, t);
            }
        }
        function $d(e, t, l) {
            t = Lt(l, t), t = ou(e.stateNode, t, 2), e = Ul(e, t, 2), e !== null && (fn(e, 2), el(e));
        }
        function Oe(e, t, l) {
            if (e.tag === 3) $d(e, e, l);
            else for(; t !== null;){
                if (t.tag === 3) {
                    $d(t, e, l);
                    break;
                } else if (t.tag === 1) {
                    var a = t.stateNode;
                    if (typeof t.type.getDerivedStateFromError == "function" || typeof a.componentDidCatch == "function" && (Gl === null || !Gl.has(a))) {
                        e = Lt(l, e), l = Wf(2), a = Ul(t, l, 2), a !== null && (Ff(l, a, t, e), fn(a, 2), el(a));
                        break;
                    }
                }
                t = t.return;
            }
        }
        function Uu(e, t, l) {
            var a = e.pingCache;
            if (a === null) {
                a = e.pingCache = new mx;
                var n = new Set;
                a.set(t, n);
            } else n = a.get(t), n === void 0 && (n = new Set, a.set(t, n));
            n.has(l) || (Eu = !0, n.add(l), e = vx.bind(null, e, t, l), t.then(e, e));
        }
        function vx(e, t, l) {
            var a = e.pingCache;
            a !== null && a.delete(t), e.pingedLanes |= e.suspendedLanes & l, e.warmLanes &= ~l, Le === e && (Te & l) === l && (Xe === 4 || Xe === 3 && (Te & 62914560) === Te && 300 > tt() - ss ? (Ae & 2) === 0 && $a(e, 0) : Cu |= l, Ka === Te && (Ka = 0)), el(e);
        }
        function Wd(e, t) {
            t === 0 && (t = Yr()), e = na(e, t), e !== null && (fn(e, t), el(e));
        }
        function gx(e) {
            var t = e.memoizedState, l = 0;
            t !== null && (l = t.retryLane), Wd(e, l);
        }
        function wx(e, t) {
            var l = 0;
            switch(e.tag){
                case 31:
                case 13:
                    var a = e.stateNode, n = e.memoizedState;
                    n !== null && (l = n.retryLane);
                    break;
                case 19:
                    a = e.stateNode;
                    break;
                case 22:
                    a = e.stateNode._retryCache;
                    break;
                default:
                    throw Error(r(314));
            }
            a !== null && a.delete(t), Wd(e, l);
        }
        function Tx(e, t) {
            return Qe(e, t);
        }
        var hs = null, Fa = null, Lu = !1, ms = !1, Hu = !1, Xl = 0;
        function el(e) {
            e !== Fa && e.next === null && (Fa === null ? hs = Fa = e : Fa = Fa.next = e), ms = !0, Lu || (Lu = !0, _x());
        }
        function Qn(e, t) {
            if (!Hu && ms) {
                Hu = !0;
                do for(var l = !1, a = hs; a !== null;){
                    if (e !== 0) {
                        var n = a.pendingLanes;
                        if (n === 0) var i = 0;
                        else {
                            var f = a.suspendedLanes, h = a.pingedLanes;
                            i = (1 << 31 - St(42 | e) + 1) - 1, i &= n & ~(f & ~h), i = i & 201326741 ? i & 201326741 | 1 : i ? i | 2 : 0;
                        }
                        i !== 0 && (l = !0, eh(a, i));
                    } else i = Te, i = bi(a, a === Le ? i : 0, a.cancelPendingCommit !== null || a.timeoutHandle !== -1), (i & 3) === 0 || on(a, i) || (l = !0, eh(a, i));
                    a = a.next;
                }
                while (l);
                Hu = !1;
            }
        }
        function Sx() {
            Fd();
        }
        function Fd() {
            ms = Lu = !1;
            var e = 0;
            Xl !== 0 && zx() && (e = Xl);
            for(var t = tt(), l = null, a = hs; a !== null;){
                var n = a.next, i = Id(a, t);
                i === 0 ? (a.next = null, l === null ? hs = n : l.next = n, n === null && (Fa = l)) : (l = a, (e !== 0 || (i & 3) !== 0) && (ms = !0)), a = n;
            }
            et !== 0 && et !== 5 || Qn(e), Xl !== 0 && (Xl = 0);
        }
        function Id(e, t) {
            for(var l = e.suspendedLanes, a = e.pingedLanes, n = e.expirationTimes, i = e.pendingLanes & -62914561; 0 < i;){
                var f = 31 - St(i), h = 1 << f, g = n[f];
                g === -1 ? ((h & l) === 0 || (h & a) !== 0) && (n[f] = Wm(h, t)) : g <= t && (e.expiredLanes |= h), i &= ~h;
            }
            if (t = Le, l = Te, l = bi(e, e === t ? l : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), a = e.callbackNode, l === 0 || e === t && (Me === 2 || Me === 9) || e.cancelPendingCommit !== null) return a !== null && a !== null && ft(a), e.callbackNode = null, e.callbackPriority = 0;
            if ((l & 3) === 0 || on(e, l)) {
                if (t = l & -l, t === e.callbackPriority) return t;
                switch(a !== null && ft(a), Is(l)){
                    case 2:
                    case 8:
                        l = qr;
                        break;
                    case 32:
                        l = mi;
                        break;
                    case 268435456:
                        l = Gr;
                        break;
                    default:
                        l = mi;
                }
                return a = Pd.bind(null, e), l = Qe(l, a), e.callbackPriority = t, e.callbackNode = l, t;
            }
            return a !== null && a !== null && ft(a), e.callbackPriority = 2, e.callbackNode = null, 2;
        }
        function Pd(e, t) {
            if (et !== 0 && et !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
            var l = e.callbackNode;
            if (ds() && e.callbackNode !== l) return null;
            var a = Te;
            return a = bi(e, e === Le ? a : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), a === 0 ? null : (zd(e, a, t), Id(e, tt()), e.callbackNode != null && e.callbackNode === l ? Pd.bind(null, e) : null);
        }
        function eh(e, t) {
            if (ds()) return null;
            zd(e, t, !0);
        }
        function _x() {
            Lx(function() {
                (Ae & 6) !== 0 ? Qe(Br, Sx) : Fd();
            });
        }
        function ku() {
            if (Xl === 0) {
                var e = La;
                e === 0 && (e = pi, pi <<= 1, (pi & 261888) === 0 && (pi = 256)), Xl = e;
            }
            return Xl;
        }
        function th(e) {
            return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Ti("" + e);
        }
        function lh(e, t) {
            var l = t.ownerDocument.createElement("input");
            return l.name = t.name, l.value = t.value, e.id && l.setAttribute("form", e.id), t.parentNode.insertBefore(l, t), e = new FormData(e), l.parentNode.removeChild(l), e;
        }
        function Nx(e, t, l, a, n) {
            if (t === "submit" && l && l.stateNode === n) {
                var i = th((n[pt] || null).action), f = a.submitter;
                f && (t = (t = f[pt] || null) ? th(t.formAction) : f.getAttribute("formAction"), t !== null && (i = t, f = null));
                var h = new ji("action", "action", null, a, n);
                e.push({
                    event: h,
                    listeners: [
                        {
                            instance: null,
                            listener: function() {
                                if (a.defaultPrevented) {
                                    if (Xl !== 0) {
                                        var g = f ? lh(n, f) : new FormData(n);
                                        nu(l, {
                                            pending: !0,
                                            data: g,
                                            method: n.method,
                                            action: i
                                        }, null, g);
                                    }
                                } else typeof i == "function" && (h.preventDefault(), g = f ? lh(n, f) : new FormData(n), nu(l, {
                                    pending: !0,
                                    data: g,
                                    method: n.method,
                                    action: i
                                }, i, g));
                            },
                            currentTarget: n
                        }
                    ]
                });
            }
        }
        for(var Bu = 0; Bu < wc.length; Bu++){
            var qu = wc[Bu], jx = qu.toLowerCase(), Ex = qu[0].toUpperCase() + qu.slice(1);
            Zt(jx, "on" + Ex);
        }
        Zt(Oo, "onAnimationEnd"), Zt(Do, "onAnimationIteration"), Zt(zo, "onAnimationStart"), Zt("dblclick", "onDoubleClick"), Zt("focusin", "onFocus"), Zt("focusout", "onBlur"), Zt(Vp, "onTransitionRun"), Zt(Xp, "onTransitionStart"), Zt(Qp, "onTransitionCancel"), Zt(Uo, "onTransitionEnd"), Ta("onMouseEnter", [
            "mouseout",
            "mouseover"
        ]), Ta("onMouseLeave", [
            "mouseout",
            "mouseover"
        ]), Ta("onPointerEnter", [
            "pointerout",
            "pointerover"
        ]), Ta("onPointerLeave", [
            "pointerout",
            "pointerover"
        ]), ea("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), ea("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), ea("onBeforeInput", [
            "compositionend",
            "keypress",
            "textInput",
            "paste"
        ]), ea("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), ea("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), ea("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
        var Zn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Cx = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Zn));
        function ah(e, t) {
            t = (t & 4) !== 0;
            for(var l = 0; l < e.length; l++){
                var a = e[l], n = a.event;
                a = a.listeners;
                e: {
                    var i = void 0;
                    if (t) for(var f = a.length - 1; 0 <= f; f--){
                        var h = a[f], g = h.instance, C = h.currentTarget;
                        if (h = h.listener, g !== i && n.isPropagationStopped()) break e;
                        i = h, n.currentTarget = C;
                        try {
                            i(n);
                        } catch (U) {
                            Ai(U);
                        }
                        n.currentTarget = null, i = g;
                    }
                    else for(f = 0; f < a.length; f++){
                        if (h = a[f], g = h.instance, C = h.currentTarget, h = h.listener, g !== i && n.isPropagationStopped()) break e;
                        i = h, n.currentTarget = C;
                        try {
                            i(n);
                        } catch (U) {
                            Ai(U);
                        }
                        n.currentTarget = null, i = g;
                    }
                }
            }
        }
        function ge(e, t) {
            var l = t[Ps];
            l === void 0 && (l = t[Ps] = new Set);
            var a = e + "__bubble";
            l.has(a) || (nh(t, e, 2, !1), l.add(a));
        }
        function Gu(e, t, l) {
            var a = 0;
            t && (a |= 4), nh(l, e, a, t);
        }
        var ps = "_reactListening" + Math.random().toString(36).slice(2);
        function Yu(e) {
            if (!e[ps]) {
                e[ps] = !0, $r.forEach(function(l) {
                    l !== "selectionchange" && (Cx.has(l) || Gu(l, !1, e), Gu(l, !0, e));
                });
                var t = e.nodeType === 9 ? e : e.ownerDocument;
                t === null || t[ps] || (t[ps] = !0, Gu("selectionchange", !1, t));
            }
        }
        function nh(e, t, l, a) {
            switch(Dh(t)){
                case 2:
                    var n = ly;
                    break;
                case 8:
                    n = ay;
                    break;
                default:
                    n = ar;
            }
            l = n.bind(null, t, l, e), n = void 0, !uc || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (n = !0), a ? n !== void 0 ? e.addEventListener(t, l, {
                capture: !0,
                passive: n
            }) : e.addEventListener(t, l, !0) : n !== void 0 ? e.addEventListener(t, l, {
                passive: n
            }) : e.addEventListener(t, l, !1);
        }
        function Vu(e, t, l, a, n) {
            var i = a;
            if ((t & 1) === 0 && (t & 2) === 0 && a !== null) e: for(;;){
                if (a === null) return;
                var f = a.tag;
                if (f === 3 || f === 4) {
                    var h = a.stateNode.containerInfo;
                    if (h === n) break;
                    if (f === 4) for(f = a.return; f !== null;){
                        var g = f.tag;
                        if ((g === 3 || g === 4) && f.stateNode.containerInfo === n) return;
                        f = f.return;
                    }
                    for(; h !== null;){
                        if (f = va(h), f === null) return;
                        if (g = f.tag, g === 5 || g === 6 || g === 26 || g === 27) {
                            a = i = f;
                            continue e;
                        }
                        h = h.parentNode;
                    }
                }
                a = a.return;
            }
            co(function() {
                var C = i, U = sc(l), G = [];
                e: {
                    var A = Lo.get(e);
                    if (A !== void 0) {
                        var D = ji, I = e;
                        switch(e){
                            case "keypress":
                                if (_i(l) === 0) break e;
                            case "keydown":
                            case "keyup":
                                D = wp;
                                break;
                            case "focusin":
                                I = "focus", D = dc;
                                break;
                            case "focusout":
                                I = "blur", D = dc;
                                break;
                            case "beforeblur":
                            case "afterblur":
                                D = dc;
                                break;
                            case "click":
                                if (l.button === 2) break e;
                            case "auxclick":
                            case "dblclick":
                            case "mousedown":
                            case "mousemove":
                            case "mouseup":
                            case "mouseout":
                            case "mouseover":
                            case "contextmenu":
                                D = oo;
                                break;
                            case "drag":
                            case "dragend":
                            case "dragenter":
                            case "dragexit":
                            case "dragleave":
                            case "dragover":
                            case "dragstart":
                            case "drop":
                                D = rp;
                                break;
                            case "touchcancel":
                            case "touchend":
                            case "touchmove":
                            case "touchstart":
                                D = _p;
                                break;
                            case Oo:
                            case Do:
                            case zo:
                                D = dp;
                                break;
                            case Uo:
                                D = jp;
                                break;
                            case "scroll":
                            case "scrollend":
                                D = cp;
                                break;
                            case "wheel":
                                D = Cp;
                                break;
                            case "copy":
                            case "cut":
                            case "paste":
                                D = mp;
                                break;
                            case "gotpointercapture":
                            case "lostpointercapture":
                            case "pointercancel":
                            case "pointerdown":
                            case "pointermove":
                            case "pointerout":
                            case "pointerover":
                            case "pointerup":
                                D = ho;
                                break;
                            case "toggle":
                            case "beforetoggle":
                                D = Rp;
                        }
                        var oe = (t & 4) !== 0, Ue = !oe && (e === "scroll" || e === "scrollend"), j = oe ? A !== null ? A + "Capture" : null : A;
                        oe = [];
                        for(var _ = C, E; _ !== null;){
                            var q = _;
                            if (E = q.stateNode, q = q.tag, q !== 5 && q !== 26 && q !== 27 || E === null || j === null || (q = mn(_, j), q != null && oe.push(Kn(_, q, E))), Ue) break;
                            _ = _.return;
                        }
                        0 < oe.length && (A = new D(A, I, null, l, U), G.push({
                            event: A,
                            listeners: oe
                        }));
                    }
                }
                if ((t & 7) === 0) {
                    e: {
                        if (A = e === "mouseover" || e === "pointerover", D = e === "mouseout" || e === "pointerout", A && l !== ic && (I = l.relatedTarget || l.fromElement) && (va(I) || I[ba])) break e;
                        if ((D || A) && (A = U.window === U ? U : (A = U.ownerDocument) ? A.defaultView || A.parentWindow : window, D ? (I = l.relatedTarget || l.toElement, D = C, I = I ? va(I) : null, I !== null && (Ue = m(I), oe = I.tag, I !== Ue || oe !== 5 && oe !== 27 && oe !== 6) && (I = null)) : (D = null, I = C), D !== I)) {
                            if (oe = oo, q = "onMouseLeave", j = "onMouseEnter", _ = "mouse", (e === "pointerout" || e === "pointerover") && (oe = ho, q = "onPointerLeave", j = "onPointerEnter", _ = "pointer"), Ue = D == null ? A : hn(D), E = I == null ? A : hn(I), A = new oe(q, _ + "leave", D, l, U), A.target = Ue, A.relatedTarget = E, q = null, va(U) === C && (oe = new oe(j, _ + "enter", I, l, U), oe.target = E, oe.relatedTarget = Ue, q = oe), Ue = q, D && I) t: {
                                for(oe = Ax, j = D, _ = I, E = 0, q = j; q; q = oe(q))E++;
                                q = 0;
                                for(var ce = _; ce; ce = oe(ce))q++;
                                for(; 0 < E - q;)j = oe(j), E--;
                                for(; 0 < q - E;)_ = oe(_), q--;
                                for(; E--;){
                                    if (j === _ || _ !== null && j === _.alternate) {
                                        oe = j;
                                        break t;
                                    }
                                    j = oe(j), _ = oe(_);
                                }
                                oe = null;
                            }
                            else oe = null;
                            D !== null && ih(G, A, D, oe, !1), I !== null && Ue !== null && ih(G, Ue, I, oe, !0);
                        }
                    }
                    e: {
                        if (A = C ? hn(C) : window, D = A.nodeName && A.nodeName.toLowerCase(), D === "select" || D === "input" && A.type === "file") var Ee = wo;
                        else if (vo(A)) if (To) Ee = qp;
                        else {
                            Ee = kp;
                            var le = Hp;
                        }
                        else D = A.nodeName, !D || D.toLowerCase() !== "input" || A.type !== "checkbox" && A.type !== "radio" ? C && nc(C.elementType) && (Ee = wo) : Ee = Bp;
                        if (Ee && (Ee = Ee(e, C))) {
                            go(G, Ee, l, U);
                            break e;
                        }
                        le && le(e, A, C), e === "focusout" && C && A.type === "number" && C.memoizedProps.value != null && ac(A, "number", A.value);
                    }
                    switch(le = C ? hn(C) : window, e){
                        case "focusin":
                            (vo(le) || le.contentEditable === "true") && (Ca = le, bc = C, Tn = null);
                            break;
                        case "focusout":
                            Tn = bc = Ca = null;
                            break;
                        case "mousedown":
                            vc = !0;
                            break;
                        case "contextmenu":
                        case "mouseup":
                        case "dragend":
                            vc = !1, Ro(G, l, U);
                            break;
                        case "selectionchange":
                            if (Yp) break;
                        case "keydown":
                        case "keyup":
                            Ro(G, l, U);
                    }
                    var pe;
                    if (mc) e: {
                        switch(e){
                            case "compositionstart":
                                var Se = "onCompositionStart";
                                break e;
                            case "compositionend":
                                Se = "onCompositionEnd";
                                break e;
                            case "compositionupdate":
                                Se = "onCompositionUpdate";
                                break e;
                        }
                        Se = void 0;
                    }
                    else Ea ? yo(e, l) && (Se = "onCompositionEnd") : e === "keydown" && l.keyCode === 229 && (Se = "onCompositionStart");
                    Se && (mo && l.locale !== "ko" && (Ea || Se !== "onCompositionStart" ? Se === "onCompositionEnd" && Ea && (pe = uo()) : (Cl = U, rc = "value" in Cl ? Cl.value : Cl.textContent, Ea = !0)), le = xs(C, Se), 0 < le.length && (Se = new fo(Se, e, null, l, U), G.push({
                        event: Se,
                        listeners: le
                    }), pe ? Se.data = pe : (pe = bo(l), pe !== null && (Se.data = pe)))), (pe = Op ? Dp(e, l) : zp(e, l)) && (Se = xs(C, "onBeforeInput"), 0 < Se.length && (le = new fo("onBeforeInput", "beforeinput", null, l, U), G.push({
                        event: le,
                        listeners: Se
                    }), le.data = pe)), Nx(G, e, C, l, U);
                }
                ah(G, t);
            });
        }
        function Kn(e, t, l) {
            return {
                instance: e,
                listener: t,
                currentTarget: l
            };
        }
        function xs(e, t) {
            for(var l = t + "Capture", a = []; e !== null;){
                var n = e, i = n.stateNode;
                if (n = n.tag, n !== 5 && n !== 26 && n !== 27 || i === null || (n = mn(e, l), n != null && a.unshift(Kn(e, n, i)), n = mn(e, t), n != null && a.push(Kn(e, n, i))), e.tag === 3) return a;
                e = e.return;
            }
            return [];
        }
        function Ax(e) {
            if (e === null) return null;
            do e = e.return;
            while (e && e.tag !== 5 && e.tag !== 27);
            return e || null;
        }
        function ih(e, t, l, a, n) {
            for(var i = t._reactName, f = []; l !== null && l !== a;){
                var h = l, g = h.alternate, C = h.stateNode;
                if (h = h.tag, g !== null && g === a) break;
                h !== 5 && h !== 26 && h !== 27 || C === null || (g = C, n ? (C = mn(l, i), C != null && f.unshift(Kn(l, C, g))) : n || (C = mn(l, i), C != null && f.push(Kn(l, C, g)))), l = l.return;
            }
            f.length !== 0 && e.push({
                event: t,
                listeners: f
            });
        }
        var Rx = /\r\n?/g, Mx = /\u0000|\uFFFD/g;
        function sh(e) {
            return (typeof e == "string" ? e : "" + e).replace(Rx, `
`).replace(Mx, "");
        }
        function ch(e, t) {
            return t = sh(t), sh(e) === t;
        }
        function ze(e, t, l, a, n, i) {
            switch(l){
                case "children":
                    typeof a == "string" ? t === "body" || t === "textarea" && a === "" || _a(e, a) : (typeof a == "number" || typeof a == "bigint") && t !== "body" && _a(e, "" + a);
                    break;
                case "className":
                    gi(e, "class", a);
                    break;
                case "tabIndex":
                    gi(e, "tabindex", a);
                    break;
                case "dir":
                case "role":
                case "viewBox":
                case "width":
                case "height":
                    gi(e, l, a);
                    break;
                case "style":
                    io(e, a, i);
                    break;
                case "data":
                    if (t !== "object") {
                        gi(e, "data", a);
                        break;
                    }
                case "src":
                case "href":
                    if (a === "" && (t !== "a" || l !== "href")) {
                        e.removeAttribute(l);
                        break;
                    }
                    if (a == null || typeof a == "function" || typeof a == "symbol" || typeof a == "boolean") {
                        e.removeAttribute(l);
                        break;
                    }
                    a = Ti("" + a), e.setAttribute(l, a);
                    break;
                case "action":
                case "formAction":
                    if (typeof a == "function") {
                        e.setAttribute(l, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
                        break;
                    } else typeof i == "function" && (l === "formAction" ? (t !== "input" && ze(e, t, "name", n.name, n, null), ze(e, t, "formEncType", n.formEncType, n, null), ze(e, t, "formMethod", n.formMethod, n, null), ze(e, t, "formTarget", n.formTarget, n, null)) : (ze(e, t, "encType", n.encType, n, null), ze(e, t, "method", n.method, n, null), ze(e, t, "target", n.target, n, null)));
                    if (a == null || typeof a == "symbol" || typeof a == "boolean") {
                        e.removeAttribute(l);
                        break;
                    }
                    a = Ti("" + a), e.setAttribute(l, a);
                    break;
                case "onClick":
                    a != null && (e.onclick = nl);
                    break;
                case "onScroll":
                    a != null && ge("scroll", e);
                    break;
                case "onScrollEnd":
                    a != null && ge("scrollend", e);
                    break;
                case "dangerouslySetInnerHTML":
                    if (a != null) {
                        if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
                        if (l = a.__html, l != null) {
                            if (n.children != null) throw Error(r(60));
                            e.innerHTML = l;
                        }
                    }
                    break;
                case "multiple":
                    e.multiple = a && typeof a != "function" && typeof a != "symbol";
                    break;
                case "muted":
                    e.muted = a && typeof a != "function" && typeof a != "symbol";
                    break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "defaultValue":
                case "defaultChecked":
                case "innerHTML":
                case "ref":
                    break;
                case "autoFocus":
                    break;
                case "xlinkHref":
                    if (a == null || typeof a == "function" || typeof a == "boolean" || typeof a == "symbol") {
                        e.removeAttribute("xlink:href");
                        break;
                    }
                    l = Ti("" + a), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", l);
                    break;
                case "contentEditable":
                case "spellCheck":
                case "draggable":
                case "value":
                case "autoReverse":
                case "externalResourcesRequired":
                case "focusable":
                case "preserveAlpha":
                    a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "" + a) : e.removeAttribute(l);
                    break;
                case "inert":
                case "allowFullScreen":
                case "async":
                case "autoPlay":
                case "controls":
                case "default":
                case "defer":
                case "disabled":
                case "disablePictureInPicture":
                case "disableRemotePlayback":
                case "formNoValidate":
                case "hidden":
                case "loop":
                case "noModule":
                case "noValidate":
                case "open":
                case "playsInline":
                case "readOnly":
                case "required":
                case "reversed":
                case "scoped":
                case "seamless":
                case "itemScope":
                    a && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, "") : e.removeAttribute(l);
                    break;
                case "capture":
                case "download":
                    a === !0 ? e.setAttribute(l, "") : a !== !1 && a != null && typeof a != "function" && typeof a != "symbol" ? e.setAttribute(l, a) : e.removeAttribute(l);
                    break;
                case "cols":
                case "rows":
                case "size":
                case "span":
                    a != null && typeof a != "function" && typeof a != "symbol" && !isNaN(a) && 1 <= a ? e.setAttribute(l, a) : e.removeAttribute(l);
                    break;
                case "rowSpan":
                case "start":
                    a == null || typeof a == "function" || typeof a == "symbol" || isNaN(a) ? e.removeAttribute(l) : e.setAttribute(l, a);
                    break;
                case "popover":
                    ge("beforetoggle", e), ge("toggle", e), vi(e, "popover", a);
                    break;
                case "xlinkActuate":
                    al(e, "http://www.w3.org/1999/xlink", "xlink:actuate", a);
                    break;
                case "xlinkArcrole":
                    al(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", a);
                    break;
                case "xlinkRole":
                    al(e, "http://www.w3.org/1999/xlink", "xlink:role", a);
                    break;
                case "xlinkShow":
                    al(e, "http://www.w3.org/1999/xlink", "xlink:show", a);
                    break;
                case "xlinkTitle":
                    al(e, "http://www.w3.org/1999/xlink", "xlink:title", a);
                    break;
                case "xlinkType":
                    al(e, "http://www.w3.org/1999/xlink", "xlink:type", a);
                    break;
                case "xmlBase":
                    al(e, "http://www.w3.org/XML/1998/namespace", "xml:base", a);
                    break;
                case "xmlLang":
                    al(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", a);
                    break;
                case "xmlSpace":
                    al(e, "http://www.w3.org/XML/1998/namespace", "xml:space", a);
                    break;
                case "is":
                    vi(e, "is", a);
                    break;
                case "innerText":
                case "textContent":
                    break;
                default:
                    (!(2 < l.length) || l[0] !== "o" && l[0] !== "O" || l[1] !== "n" && l[1] !== "N") && (l = ip.get(l) || l, vi(e, l, a));
            }
        }
        function Xu(e, t, l, a, n, i) {
            switch(l){
                case "style":
                    io(e, a, i);
                    break;
                case "dangerouslySetInnerHTML":
                    if (a != null) {
                        if (typeof a != "object" || !("__html" in a)) throw Error(r(61));
                        if (l = a.__html, l != null) {
                            if (n.children != null) throw Error(r(60));
                            e.innerHTML = l;
                        }
                    }
                    break;
                case "children":
                    typeof a == "string" ? _a(e, a) : (typeof a == "number" || typeof a == "bigint") && _a(e, "" + a);
                    break;
                case "onScroll":
                    a != null && ge("scroll", e);
                    break;
                case "onScrollEnd":
                    a != null && ge("scrollend", e);
                    break;
                case "onClick":
                    a != null && (e.onclick = nl);
                    break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                case "innerHTML":
                case "ref":
                    break;
                case "innerText":
                case "textContent":
                    break;
                default:
                    if (!Wr.hasOwnProperty(l)) e: {
                        if (l[0] === "o" && l[1] === "n" && (n = l.endsWith("Capture"), t = l.slice(2, n ? l.length - 7 : void 0), i = e[pt] || null, i = i != null ? i[l] : null, typeof i == "function" && e.removeEventListener(t, i, n), typeof a == "function")) {
                            typeof i != "function" && i !== null && (l in e ? e[l] = null : e.hasAttribute(l) && e.removeAttribute(l)), e.addEventListener(t, a, n);
                            break e;
                        }
                        l in e ? e[l] = a : a === !0 ? e.setAttribute(l, "") : vi(e, l, a);
                    }
            }
        }
        function rt(e, t, l) {
            switch(t){
                case "div":
                case "span":
                case "svg":
                case "path":
                case "a":
                case "g":
                case "p":
                case "li":
                    break;
                case "img":
                    ge("error", e), ge("load", e);
                    var a = !1, n = !1, i;
                    for(i in l)if (l.hasOwnProperty(i)) {
                        var f = l[i];
                        if (f != null) switch(i){
                            case "src":
                                a = !0;
                                break;
                            case "srcSet":
                                n = !0;
                                break;
                            case "children":
                            case "dangerouslySetInnerHTML":
                                throw Error(r(137, t));
                            default:
                                ze(e, t, i, f, l, null);
                        }
                    }
                    n && ze(e, t, "srcSet", l.srcSet, l, null), a && ze(e, t, "src", l.src, l, null);
                    return;
                case "input":
                    ge("invalid", e);
                    var h = i = f = n = null, g = null, C = null;
                    for(a in l)if (l.hasOwnProperty(a)) {
                        var U = l[a];
                        if (U != null) switch(a){
                            case "name":
                                n = U;
                                break;
                            case "type":
                                f = U;
                                break;
                            case "checked":
                                g = U;
                                break;
                            case "defaultChecked":
                                C = U;
                                break;
                            case "value":
                                i = U;
                                break;
                            case "defaultValue":
                                h = U;
                                break;
                            case "children":
                            case "dangerouslySetInnerHTML":
                                if (U != null) throw Error(r(137, t));
                                break;
                            default:
                                ze(e, t, a, U, l, null);
                        }
                    }
                    to(e, i, h, g, C, f, n, !1);
                    return;
                case "select":
                    ge("invalid", e), a = f = i = null;
                    for(n in l)if (l.hasOwnProperty(n) && (h = l[n], h != null)) switch(n){
                        case "value":
                            i = h;
                            break;
                        case "defaultValue":
                            f = h;
                            break;
                        case "multiple":
                            a = h;
                        default:
                            ze(e, t, n, h, l, null);
                    }
                    t = i, l = f, e.multiple = !!a, t != null ? Sa(e, !!a, t, !1) : l != null && Sa(e, !!a, l, !0);
                    return;
                case "textarea":
                    ge("invalid", e), i = n = a = null;
                    for(f in l)if (l.hasOwnProperty(f) && (h = l[f], h != null)) switch(f){
                        case "value":
                            a = h;
                            break;
                        case "defaultValue":
                            n = h;
                            break;
                        case "children":
                            i = h;
                            break;
                        case "dangerouslySetInnerHTML":
                            if (h != null) throw Error(r(91));
                            break;
                        default:
                            ze(e, t, f, h, l, null);
                    }
                    ao(e, a, n, i);
                    return;
                case "option":
                    for(g in l)l.hasOwnProperty(g) && (a = l[g], a != null) && (g === "selected" ? e.selected = a && typeof a != "function" && typeof a != "symbol" : ze(e, t, g, a, l, null));
                    return;
                case "dialog":
                    ge("beforetoggle", e), ge("toggle", e), ge("cancel", e), ge("close", e);
                    break;
                case "iframe":
                case "object":
                    ge("load", e);
                    break;
                case "video":
                case "audio":
                    for(a = 0; a < Zn.length; a++)ge(Zn[a], e);
                    break;
                case "image":
                    ge("error", e), ge("load", e);
                    break;
                case "details":
                    ge("toggle", e);
                    break;
                case "embed":
                case "source":
                case "link":
                    ge("error", e), ge("load", e);
                case "area":
                case "base":
                case "br":
                case "col":
                case "hr":
                case "keygen":
                case "meta":
                case "param":
                case "track":
                case "wbr":
                case "menuitem":
                    for(C in l)if (l.hasOwnProperty(C) && (a = l[C], a != null)) switch(C){
                        case "children":
                        case "dangerouslySetInnerHTML":
                            throw Error(r(137, t));
                        default:
                            ze(e, t, C, a, l, null);
                    }
                    return;
                default:
                    if (nc(t)) {
                        for(U in l)l.hasOwnProperty(U) && (a = l[U], a !== void 0 && Xu(e, t, U, a, l, void 0));
                        return;
                    }
            }
            for(h in l)l.hasOwnProperty(h) && (a = l[h], a != null && ze(e, t, h, a, l, null));
        }
        function Ox(e, t, l, a) {
            switch(t){
                case "div":
                case "span":
                case "svg":
                case "path":
                case "a":
                case "g":
                case "p":
                case "li":
                    break;
                case "input":
                    var n = null, i = null, f = null, h = null, g = null, C = null, U = null;
                    for(D in l){
                        var G = l[D];
                        if (l.hasOwnProperty(D) && G != null) switch(D){
                            case "checked":
                                break;
                            case "value":
                                break;
                            case "defaultValue":
                                g = G;
                            default:
                                a.hasOwnProperty(D) || ze(e, t, D, null, a, G);
                        }
                    }
                    for(var A in a){
                        var D = a[A];
                        if (G = l[A], a.hasOwnProperty(A) && (D != null || G != null)) switch(A){
                            case "type":
                                i = D;
                                break;
                            case "name":
                                n = D;
                                break;
                            case "checked":
                                C = D;
                                break;
                            case "defaultChecked":
                                U = D;
                                break;
                            case "value":
                                f = D;
                                break;
                            case "defaultValue":
                                h = D;
                                break;
                            case "children":
                            case "dangerouslySetInnerHTML":
                                if (D != null) throw Error(r(137, t));
                                break;
                            default:
                                D !== G && ze(e, t, A, D, a, G);
                        }
                    }
                    lc(e, f, h, g, C, U, i, n);
                    return;
                case "select":
                    D = f = h = A = null;
                    for(i in l)if (g = l[i], l.hasOwnProperty(i) && g != null) switch(i){
                        case "value":
                            break;
                        case "multiple":
                            D = g;
                        default:
                            a.hasOwnProperty(i) || ze(e, t, i, null, a, g);
                    }
                    for(n in a)if (i = a[n], g = l[n], a.hasOwnProperty(n) && (i != null || g != null)) switch(n){
                        case "value":
                            A = i;
                            break;
                        case "defaultValue":
                            h = i;
                            break;
                        case "multiple":
                            f = i;
                        default:
                            i !== g && ze(e, t, n, i, a, g);
                    }
                    t = h, l = f, a = D, A != null ? Sa(e, !!l, A, !1) : !!a != !!l && (t != null ? Sa(e, !!l, t, !0) : Sa(e, !!l, l ? [] : "", !1));
                    return;
                case "textarea":
                    D = A = null;
                    for(h in l)if (n = l[h], l.hasOwnProperty(h) && n != null && !a.hasOwnProperty(h)) switch(h){
                        case "value":
                            break;
                        case "children":
                            break;
                        default:
                            ze(e, t, h, null, a, n);
                    }
                    for(f in a)if (n = a[f], i = l[f], a.hasOwnProperty(f) && (n != null || i != null)) switch(f){
                        case "value":
                            A = n;
                            break;
                        case "defaultValue":
                            D = n;
                            break;
                        case "children":
                            break;
                        case "dangerouslySetInnerHTML":
                            if (n != null) throw Error(r(91));
                            break;
                        default:
                            n !== i && ze(e, t, f, n, a, i);
                    }
                    lo(e, A, D);
                    return;
                case "option":
                    for(var I in l)A = l[I], l.hasOwnProperty(I) && A != null && !a.hasOwnProperty(I) && (I === "selected" ? e.selected = !1 : ze(e, t, I, null, a, A));
                    for(g in a)A = a[g], D = l[g], a.hasOwnProperty(g) && A !== D && (A != null || D != null) && (g === "selected" ? e.selected = A && typeof A != "function" && typeof A != "symbol" : ze(e, t, g, A, a, D));
                    return;
                case "img":
                case "link":
                case "area":
                case "base":
                case "br":
                case "col":
                case "embed":
                case "hr":
                case "keygen":
                case "meta":
                case "param":
                case "source":
                case "track":
                case "wbr":
                case "menuitem":
                    for(var oe in l)A = l[oe], l.hasOwnProperty(oe) && A != null && !a.hasOwnProperty(oe) && ze(e, t, oe, null, a, A);
                    for(C in a)if (A = a[C], D = l[C], a.hasOwnProperty(C) && A !== D && (A != null || D != null)) switch(C){
                        case "children":
                        case "dangerouslySetInnerHTML":
                            if (A != null) throw Error(r(137, t));
                            break;
                        default:
                            ze(e, t, C, A, a, D);
                    }
                    return;
                default:
                    if (nc(t)) {
                        for(var Ue in l)A = l[Ue], l.hasOwnProperty(Ue) && A !== void 0 && !a.hasOwnProperty(Ue) && Xu(e, t, Ue, void 0, a, A);
                        for(U in a)A = a[U], D = l[U], !a.hasOwnProperty(U) || A === D || A === void 0 && D === void 0 || Xu(e, t, U, A, a, D);
                        return;
                    }
            }
            for(var j in l)A = l[j], l.hasOwnProperty(j) && A != null && !a.hasOwnProperty(j) && ze(e, t, j, null, a, A);
            for(G in a)A = a[G], D = l[G], !a.hasOwnProperty(G) || A === D || A == null && D == null || ze(e, t, G, A, a, D);
        }
        function uh(e) {
            switch(e){
                case "css":
                case "script":
                case "font":
                case "img":
                case "image":
                case "input":
                case "link":
                    return !0;
                default:
                    return !1;
            }
        }
        function Dx() {
            if (typeof performance.getEntriesByType == "function") {
                for(var e = 0, t = 0, l = performance.getEntriesByType("resource"), a = 0; a < l.length; a++){
                    var n = l[a], i = n.transferSize, f = n.initiatorType, h = n.duration;
                    if (i && h && uh(f)) {
                        for(f = 0, h = n.responseEnd, a += 1; a < l.length; a++){
                            var g = l[a], C = g.startTime;
                            if (C > h) break;
                            var U = g.transferSize, G = g.initiatorType;
                            U && uh(G) && (g = g.responseEnd, f += U * (g < h ? 1 : (h - C) / (g - C)));
                        }
                        if (--a, t += 8 * (i + f) / (n.duration / 1e3), e++, 10 < e) break;
                    }
                }
                if (0 < e) return t / e / 1e6;
            }
            return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
        }
        var Qu = null, Zu = null;
        function ys(e) {
            return e.nodeType === 9 ? e : e.ownerDocument;
        }
        function rh(e) {
            switch(e){
                case "http://www.w3.org/2000/svg":
                    return 1;
                case "http://www.w3.org/1998/Math/MathML":
                    return 2;
                default:
                    return 0;
            }
        }
        function oh(e, t) {
            if (e === 0) switch(t){
                case "svg":
                    return 1;
                case "math":
                    return 2;
                default:
                    return 0;
            }
            return e === 1 && t === "foreignObject" ? 0 : e;
        }
        function Ku(e, t) {
            return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
        }
        var Ju = null;
        function zx() {
            var e = window.event;
            return e && e.type === "popstate" ? e === Ju ? !1 : (Ju = e, !0) : (Ju = null, !1);
        }
        var fh = typeof setTimeout == "function" ? setTimeout : void 0, Ux = typeof clearTimeout == "function" ? clearTimeout : void 0, dh = typeof Promise == "function" ? Promise : void 0, Lx = typeof queueMicrotask == "function" ? queueMicrotask : typeof dh < "u" ? function(e) {
            return dh.resolve(null).then(e).catch(Hx);
        } : fh;
        function Hx(e) {
            setTimeout(function() {
                throw e;
            });
        }
        function Ql(e) {
            return e === "head";
        }
        function hh(e, t) {
            var l = t, a = 0;
            do {
                var n = l.nextSibling;
                if (e.removeChild(l), n && n.nodeType === 8) if (l = n.data, l === "/$" || l === "/&") {
                    if (a === 0) {
                        e.removeChild(n), tn(t);
                        return;
                    }
                    a--;
                } else if (l === "$" || l === "$?" || l === "$~" || l === "$!" || l === "&") a++;
                else if (l === "html") Jn(e.ownerDocument.documentElement);
                else if (l === "head") {
                    l = e.ownerDocument.head, Jn(l);
                    for(var i = l.firstChild; i;){
                        var f = i.nextSibling, h = i.nodeName;
                        i[dn] || h === "SCRIPT" || h === "STYLE" || h === "LINK" && i.rel.toLowerCase() === "stylesheet" || l.removeChild(i), i = f;
                    }
                } else l === "body" && Jn(e.ownerDocument.body);
                l = n;
            }while (l);
            tn(t);
        }
        function mh(e, t) {
            var l = e;
            e = 0;
            do {
                var a = l.nextSibling;
                if (l.nodeType === 1 ? t ? (l._stashedDisplay = l.style.display, l.style.display = "none") : (l.style.display = l._stashedDisplay || "", l.getAttribute("style") === "" && l.removeAttribute("style")) : l.nodeType === 3 && (t ? (l._stashedText = l.nodeValue, l.nodeValue = "") : l.nodeValue = l._stashedText || ""), a && a.nodeType === 8) if (l = a.data, l === "/$") {
                    if (e === 0) break;
                    e--;
                } else l !== "$" && l !== "$?" && l !== "$~" && l !== "$!" || e++;
                l = a;
            }while (l);
        }
        function $u(e) {
            var t = e.firstChild;
            for(t && t.nodeType === 10 && (t = t.nextSibling); t;){
                var l = t;
                switch(t = t.nextSibling, l.nodeName){
                    case "HTML":
                    case "HEAD":
                    case "BODY":
                        $u(l), ec(l);
                        continue;
                    case "SCRIPT":
                    case "STYLE":
                        continue;
                    case "LINK":
                        if (l.rel.toLowerCase() === "stylesheet") continue;
                }
                e.removeChild(l);
            }
        }
        function kx(e, t, l, a) {
            for(; e.nodeType === 1;){
                var n = l;
                if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
                    if (!a && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
                } else if (a) {
                    if (!e[dn]) switch(t){
                        case "meta":
                            if (!e.hasAttribute("itemprop")) break;
                            return e;
                        case "link":
                            if (i = e.getAttribute("rel"), i === "stylesheet" && e.hasAttribute("data-precedence")) break;
                            if (i !== n.rel || e.getAttribute("href") !== (n.href == null || n.href === "" ? null : n.href) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin) || e.getAttribute("title") !== (n.title == null ? null : n.title)) break;
                            return e;
                        case "style":
                            if (e.hasAttribute("data-precedence")) break;
                            return e;
                        case "script":
                            if (i = e.getAttribute("src"), (i !== (n.src == null ? null : n.src) || e.getAttribute("type") !== (n.type == null ? null : n.type) || e.getAttribute("crossorigin") !== (n.crossOrigin == null ? null : n.crossOrigin)) && i && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
                            return e;
                        default:
                            return e;
                    }
                } else if (t === "input" && e.type === "hidden") {
                    var i = n.name == null ? null : "" + n.name;
                    if (n.type === "hidden" && e.getAttribute("name") === i) return e;
                } else return e;
                if (e = Gt(e.nextSibling), e === null) break;
            }
            return null;
        }
        function Bx(e, t, l) {
            if (t === "") return null;
            for(; e.nodeType !== 3;)if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !l || (e = Gt(e.nextSibling), e === null)) return null;
            return e;
        }
        function ph(e, t) {
            for(; e.nodeType !== 8;)if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = Gt(e.nextSibling), e === null)) return null;
            return e;
        }
        function Wu(e) {
            return e.data === "$?" || e.data === "$~";
        }
        function Fu(e) {
            return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
        }
        function qx(e, t) {
            var l = e.ownerDocument;
            if (e.data === "$~") e._reactRetry = t;
            else if (e.data !== "$?" || l.readyState !== "loading") t();
            else {
                var a = function() {
                    t(), l.removeEventListener("DOMContentLoaded", a);
                };
                l.addEventListener("DOMContentLoaded", a), e._reactRetry = a;
            }
        }
        function Gt(e) {
            for(; e != null; e = e.nextSibling){
                var t = e.nodeType;
                if (t === 1 || t === 3) break;
                if (t === 8) {
                    if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
                    if (t === "/$" || t === "/&") return null;
                }
            }
            return e;
        }
        var Iu = null;
        function xh(e) {
            e = e.nextSibling;
            for(var t = 0; e;){
                if (e.nodeType === 8) {
                    var l = e.data;
                    if (l === "/$" || l === "/&") {
                        if (t === 0) return Gt(e.nextSibling);
                        t--;
                    } else l !== "$" && l !== "$!" && l !== "$?" && l !== "$~" && l !== "&" || t++;
                }
                e = e.nextSibling;
            }
            return null;
        }
        function yh(e) {
            e = e.previousSibling;
            for(var t = 0; e;){
                if (e.nodeType === 8) {
                    var l = e.data;
                    if (l === "$" || l === "$!" || l === "$?" || l === "$~" || l === "&") {
                        if (t === 0) return e;
                        t--;
                    } else l !== "/$" && l !== "/&" || t++;
                }
                e = e.previousSibling;
            }
            return null;
        }
        function bh(e, t, l) {
            switch(t = ys(l), e){
                case "html":
                    if (e = t.documentElement, !e) throw Error(r(452));
                    return e;
                case "head":
                    if (e = t.head, !e) throw Error(r(453));
                    return e;
                case "body":
                    if (e = t.body, !e) throw Error(r(454));
                    return e;
                default:
                    throw Error(r(451));
            }
        }
        function Jn(e) {
            for(var t = e.attributes; t.length;)e.removeAttributeNode(t[0]);
            ec(e);
        }
        var Yt = new Map, vh = new Set;
        function bs(e) {
            return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
        }
        var gl = z.d;
        z.d = {
            f: Gx,
            r: Yx,
            D: Vx,
            C: Xx,
            L: Qx,
            m: Zx,
            X: Jx,
            S: Kx,
            M: $x
        };
        function Gx() {
            var e = gl.f(), t = rs();
            return e || t;
        }
        function Yx(e) {
            var t = ga(e);
            t !== null && t.tag === 5 && t.type === "form" ? Lf(t) : gl.r(e);
        }
        var Ia = typeof document > "u" ? null : document;
        function gh(e, t, l) {
            var a = Ia;
            if (a && typeof t == "string" && t) {
                var n = zt(t);
                n = 'link[rel="' + e + '"][href="' + n + '"]', typeof l == "string" && (n += '[crossorigin="' + l + '"]'), vh.has(n) || (vh.add(n), e = {
                    rel: e,
                    crossOrigin: l,
                    href: t
                }, a.querySelector(n) === null && (t = a.createElement("link"), rt(t, "link", e), lt(t), a.head.appendChild(t)));
            }
        }
        function Vx(e) {
            gl.D(e), gh("dns-prefetch", e, null);
        }
        function Xx(e, t) {
            gl.C(e, t), gh("preconnect", e, t);
        }
        function Qx(e, t, l) {
            gl.L(e, t, l);
            var a = Ia;
            if (a && e && t) {
                var n = 'link[rel="preload"][as="' + zt(t) + '"]';
                t === "image" && l && l.imageSrcSet ? (n += '[imagesrcset="' + zt(l.imageSrcSet) + '"]', typeof l.imageSizes == "string" && (n += '[imagesizes="' + zt(l.imageSizes) + '"]')) : n += '[href="' + zt(e) + '"]';
                var i = n;
                switch(t){
                    case "style":
                        i = Pa(e);
                        break;
                    case "script":
                        i = en(e);
                }
                Yt.has(i) || (e = w({
                    rel: "preload",
                    href: t === "image" && l && l.imageSrcSet ? void 0 : e,
                    as: t
                }, l), Yt.set(i, e), a.querySelector(n) !== null || t === "style" && a.querySelector($n(i)) || t === "script" && a.querySelector(Wn(i)) || (t = a.createElement("link"), rt(t, "link", e), lt(t), a.head.appendChild(t)));
            }
        }
        function Zx(e, t) {
            gl.m(e, t);
            var l = Ia;
            if (l && e) {
                var a = t && typeof t.as == "string" ? t.as : "script", n = 'link[rel="modulepreload"][as="' + zt(a) + '"][href="' + zt(e) + '"]', i = n;
                switch(a){
                    case "audioworklet":
                    case "paintworklet":
                    case "serviceworker":
                    case "sharedworker":
                    case "worker":
                    case "script":
                        i = en(e);
                }
                if (!Yt.has(i) && (e = w({
                    rel: "modulepreload",
                    href: e
                }, t), Yt.set(i, e), l.querySelector(n) === null)) {
                    switch(a){
                        case "audioworklet":
                        case "paintworklet":
                        case "serviceworker":
                        case "sharedworker":
                        case "worker":
                        case "script":
                            if (l.querySelector(Wn(i))) return;
                    }
                    a = l.createElement("link"), rt(a, "link", e), lt(a), l.head.appendChild(a);
                }
            }
        }
        function Kx(e, t, l) {
            gl.S(e, t, l);
            var a = Ia;
            if (a && e) {
                var n = wa(a).hoistableStyles, i = Pa(e);
                t = t || "default";
                var f = n.get(i);
                if (!f) {
                    var h = {
                        loading: 0,
                        preload: null
                    };
                    if (f = a.querySelector($n(i))) h.loading = 5;
                    else {
                        e = w({
                            rel: "stylesheet",
                            href: e,
                            "data-precedence": t
                        }, l), (l = Yt.get(i)) && Pu(e, l);
                        var g = f = a.createElement("link");
                        lt(g), rt(g, "link", e), g._p = new Promise(function(C, U) {
                            g.onload = C, g.onerror = U;
                        }), g.addEventListener("load", function() {
                            h.loading |= 1;
                        }), g.addEventListener("error", function() {
                            h.loading |= 2;
                        }), h.loading |= 4, vs(f, t, a);
                    }
                    f = {
                        type: "stylesheet",
                        instance: f,
                        count: 1,
                        state: h
                    }, n.set(i, f);
                }
            }
        }
        function Jx(e, t) {
            gl.X(e, t);
            var l = Ia;
            if (l && e) {
                var a = wa(l).hoistableScripts, n = en(e), i = a.get(n);
                i || (i = l.querySelector(Wn(n)), i || (e = w({
                    src: e,
                    async: !0
                }, t), (t = Yt.get(n)) && er(e, t), i = l.createElement("script"), lt(i), rt(i, "link", e), l.head.appendChild(i)), i = {
                    type: "script",
                    instance: i,
                    count: 1,
                    state: null
                }, a.set(n, i));
            }
        }
        function $x(e, t) {
            gl.M(e, t);
            var l = Ia;
            if (l && e) {
                var a = wa(l).hoistableScripts, n = en(e), i = a.get(n);
                i || (i = l.querySelector(Wn(n)), i || (e = w({
                    src: e,
                    async: !0,
                    type: "module"
                }, t), (t = Yt.get(n)) && er(e, t), i = l.createElement("script"), lt(i), rt(i, "link", e), l.head.appendChild(i)), i = {
                    type: "script",
                    instance: i,
                    count: 1,
                    state: null
                }, a.set(n, i));
            }
        }
        function wh(e, t, l, a) {
            var n = (n = fe.current) ? bs(n) : null;
            if (!n) throw Error(r(446));
            switch(e){
                case "meta":
                case "title":
                    return null;
                case "style":
                    return typeof l.precedence == "string" && typeof l.href == "string" ? (t = Pa(l.href), l = wa(n).hoistableStyles, a = l.get(t), a || (a = {
                        type: "style",
                        instance: null,
                        count: 0,
                        state: null
                    }, l.set(t, a)), a) : {
                        type: "void",
                        instance: null,
                        count: 0,
                        state: null
                    };
                case "link":
                    if (l.rel === "stylesheet" && typeof l.href == "string" && typeof l.precedence == "string") {
                        e = Pa(l.href);
                        var i = wa(n).hoistableStyles, f = i.get(e);
                        if (f || (n = n.ownerDocument || n, f = {
                            type: "stylesheet",
                            instance: null,
                            count: 0,
                            state: {
                                loading: 0,
                                preload: null
                            }
                        }, i.set(e, f), (i = n.querySelector($n(e))) && !i._p && (f.instance = i, f.state.loading = 5), Yt.has(e) || (l = {
                            rel: "preload",
                            as: "style",
                            href: l.href,
                            crossOrigin: l.crossOrigin,
                            integrity: l.integrity,
                            media: l.media,
                            hrefLang: l.hrefLang,
                            referrerPolicy: l.referrerPolicy
                        }, Yt.set(e, l), i || Wx(n, e, l, f.state))), t && a === null) throw Error(r(528, ""));
                        return f;
                    }
                    if (t && a !== null) throw Error(r(529, ""));
                    return null;
                case "script":
                    return t = l.async, l = l.src, typeof l == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = en(l), l = wa(n).hoistableScripts, a = l.get(t), a || (a = {
                        type: "script",
                        instance: null,
                        count: 0,
                        state: null
                    }, l.set(t, a)), a) : {
                        type: "void",
                        instance: null,
                        count: 0,
                        state: null
                    };
                default:
                    throw Error(r(444, e));
            }
        }
        function Pa(e) {
            return 'href="' + zt(e) + '"';
        }
        function $n(e) {
            return 'link[rel="stylesheet"][' + e + "]";
        }
        function Th(e) {
            return w({}, e, {
                "data-precedence": e.precedence,
                precedence: null
            });
        }
        function Wx(e, t, l, a) {
            e.querySelector('link[rel="preload"][as="style"][' + t + "]") ? a.loading = 1 : (t = e.createElement("link"), a.preload = t, t.addEventListener("load", function() {
                return a.loading |= 1;
            }), t.addEventListener("error", function() {
                return a.loading |= 2;
            }), rt(t, "link", l), lt(t), e.head.appendChild(t));
        }
        function en(e) {
            return '[src="' + zt(e) + '"]';
        }
        function Wn(e) {
            return "script[async]" + e;
        }
        function Sh(e, t, l) {
            if (t.count++, t.instance === null) switch(t.type){
                case "style":
                    var a = e.querySelector('style[data-href~="' + zt(l.href) + '"]');
                    if (a) return t.instance = a, lt(a), a;
                    var n = w({}, l, {
                        "data-href": l.href,
                        "data-precedence": l.precedence,
                        href: null,
                        precedence: null
                    });
                    return a = (e.ownerDocument || e).createElement("style"), lt(a), rt(a, "style", n), vs(a, l.precedence, e), t.instance = a;
                case "stylesheet":
                    n = Pa(l.href);
                    var i = e.querySelector($n(n));
                    if (i) return t.state.loading |= 4, t.instance = i, lt(i), i;
                    a = Th(l), (n = Yt.get(n)) && Pu(a, n), i = (e.ownerDocument || e).createElement("link"), lt(i);
                    var f = i;
                    return f._p = new Promise(function(h, g) {
                        f.onload = h, f.onerror = g;
                    }), rt(i, "link", a), t.state.loading |= 4, vs(i, l.precedence, e), t.instance = i;
                case "script":
                    return i = en(l.src), (n = e.querySelector(Wn(i))) ? (t.instance = n, lt(n), n) : (a = l, (n = Yt.get(i)) && (a = w({}, l), er(a, n)), e = e.ownerDocument || e, n = e.createElement("script"), lt(n), rt(n, "link", a), e.head.appendChild(n), t.instance = n);
                case "void":
                    return null;
                default:
                    throw Error(r(443, t.type));
            }
            else t.type === "stylesheet" && (t.state.loading & 4) === 0 && (a = t.instance, t.state.loading |= 4, vs(a, l.precedence, e));
            return t.instance;
        }
        function vs(e, t, l) {
            for(var a = l.querySelectorAll('link[rel="stylesheet"][data-precedence],style[data-precedence]'), n = a.length ? a[a.length - 1] : null, i = n, f = 0; f < a.length; f++){
                var h = a[f];
                if (h.dataset.precedence === t) i = h;
                else if (i !== n) break;
            }
            i ? i.parentNode.insertBefore(e, i.nextSibling) : (t = l.nodeType === 9 ? l.head : l, t.insertBefore(e, t.firstChild));
        }
        function Pu(e, t) {
            e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.title == null && (e.title = t.title);
        }
        function er(e, t) {
            e.crossOrigin == null && (e.crossOrigin = t.crossOrigin), e.referrerPolicy == null && (e.referrerPolicy = t.referrerPolicy), e.integrity == null && (e.integrity = t.integrity);
        }
        var gs = null;
        function _h(e, t, l) {
            if (gs === null) {
                var a = new Map, n = gs = new Map;
                n.set(l, a);
            } else n = gs, a = n.get(l), a || (a = new Map, n.set(l, a));
            if (a.has(e)) return a;
            for(a.set(e, null), l = l.getElementsByTagName(e), n = 0; n < l.length; n++){
                var i = l[n];
                if (!(i[dn] || i[it] || e === "link" && i.getAttribute("rel") === "stylesheet") && i.namespaceURI !== "http://www.w3.org/2000/svg") {
                    var f = i.getAttribute(t) || "";
                    f = e + f;
                    var h = a.get(f);
                    h ? h.push(i) : a.set(f, [
                        i
                    ]);
                }
            }
            return a;
        }
        function Nh(e, t, l) {
            e = e.ownerDocument || e, e.head.insertBefore(l, t === "title" ? e.querySelector("head > title") : null);
        }
        function Fx(e, t, l) {
            if (l === 1 || t.itemProp != null) return !1;
            switch(e){
                case "meta":
                case "title":
                    return !0;
                case "style":
                    if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
                    return !0;
                case "link":
                    if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
                    return t.rel === "stylesheet" ? (e = t.disabled, typeof t.precedence == "string" && e == null) : !0;
                case "script":
                    if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
            }
            return !1;
        }
        function jh(e) {
            return !(e.type === "stylesheet" && (e.state.loading & 3) === 0);
        }
        function Ix(e, t, l, a) {
            if (l.type === "stylesheet" && (typeof a.media != "string" || matchMedia(a.media).matches !== !1) && (l.state.loading & 4) === 0) {
                if (l.instance === null) {
                    var n = Pa(a.href), i = t.querySelector($n(n));
                    if (i) {
                        t = i._p, t !== null && typeof t == "object" && typeof t.then == "function" && (e.count++, e = ws.bind(e), t.then(e, e)), l.state.loading |= 4, l.instance = i, lt(i);
                        return;
                    }
                    i = t.ownerDocument || t, a = Th(a), (n = Yt.get(n)) && Pu(a, n), i = i.createElement("link"), lt(i);
                    var f = i;
                    f._p = new Promise(function(h, g) {
                        f.onload = h, f.onerror = g;
                    }), rt(i, "link", a), l.instance = i;
                }
                e.stylesheets === null && (e.stylesheets = new Map), e.stylesheets.set(l, t), (t = l.state.preload) && (l.state.loading & 3) === 0 && (e.count++, l = ws.bind(e), t.addEventListener("load", l), t.addEventListener("error", l));
            }
        }
        var tr = 0;
        function Px(e, t) {
            return e.stylesheets && e.count === 0 && Ss(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(l) {
                var a = setTimeout(function() {
                    if (e.stylesheets && Ss(e, e.stylesheets), e.unsuspend) {
                        var i = e.unsuspend;
                        e.unsuspend = null, i();
                    }
                }, 6e4 + t);
                0 < e.imgBytes && tr === 0 && (tr = 62500 * Dx());
                var n = setTimeout(function() {
                    if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Ss(e, e.stylesheets), e.unsuspend)) {
                        var i = e.unsuspend;
                        e.unsuspend = null, i();
                    }
                }, (e.imgBytes > tr ? 50 : 800) + t);
                return e.unsuspend = l, function() {
                    e.unsuspend = null, clearTimeout(a), clearTimeout(n);
                };
            } : null;
        }
        function ws() {
            if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
                if (this.stylesheets) Ss(this, this.stylesheets);
                else if (this.unsuspend) {
                    var e = this.unsuspend;
                    this.unsuspend = null, e();
                }
            }
        }
        var Ts = null;
        function Ss(e, t) {
            e.stylesheets = null, e.unsuspend !== null && (e.count++, Ts = new Map, t.forEach(ey, e), Ts = null, ws.call(e));
        }
        function ey(e, t) {
            if (!(t.state.loading & 4)) {
                var l = Ts.get(e);
                if (l) var a = l.get(null);
                else {
                    l = new Map, Ts.set(e, l);
                    for(var n = e.querySelectorAll("link[data-precedence],style[data-precedence]"), i = 0; i < n.length; i++){
                        var f = n[i];
                        (f.nodeName === "LINK" || f.getAttribute("media") !== "not all") && (l.set(f.dataset.precedence, f), a = f);
                    }
                    a && l.set(null, a);
                }
                n = t.instance, f = n.getAttribute("data-precedence"), i = l.get(f) || a, i === a && l.set(null, n), l.set(f, n), this.count++, a = ws.bind(this), n.addEventListener("load", a), n.addEventListener("error", a), i ? i.parentNode.insertBefore(n, i.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(n, e.firstChild)), t.state.loading |= 4;
            }
        }
        var Fn = {
            $$typeof: Y,
            Provider: null,
            Consumer: null,
            _currentValue: B,
            _currentValue2: B,
            _threadCount: 0
        };
        function ty(e, t, l, a, n, i, f, h, g) {
            this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ws(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ws(0), this.hiddenUpdates = Ws(null), this.identifierPrefix = a, this.onUncaughtError = n, this.onCaughtError = i, this.onRecoverableError = f, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = g, this.incompleteTransitions = new Map;
        }
        function Eh(e, t, l, a, n, i, f, h, g, C, U, G) {
            return e = new ty(e, t, l, f, g, C, U, G, h), t = 1, i === !0 && (t |= 24), i = Nt(3, null, null, t), e.current = i, i.stateNode = e, t = zc(), t.refCount++, e.pooledCache = t, t.refCount++, i.memoizedState = {
                element: a,
                isDehydrated: l,
                cache: t
            }, kc(i), e;
        }
        function Ch(e) {
            return e ? (e = Ma, e) : Ma;
        }
        function Ah(e, t, l, a, n, i) {
            n = Ch(n), a.context === null ? a.context = n : a.pendingContext = n, a = zl(t), a.payload = {
                element: l
            }, i = i === void 0 ? null : i, i !== null && (a.callback = i), l = Ul(e, a, t), l !== null && (wt(l, e, t), An(l, e, t));
        }
        function Rh(e, t) {
            if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
                var l = e.retryLane;
                e.retryLane = l !== 0 && l < t ? l : t;
            }
        }
        function lr(e, t) {
            Rh(e, t), (e = e.alternate) && Rh(e, t);
        }
        function Mh(e) {
            if (e.tag === 13 || e.tag === 31) {
                var t = na(e, 67108864);
                t !== null && wt(t, e, 67108864), lr(e, 67108864);
            }
        }
        function Oh(e) {
            if (e.tag === 13 || e.tag === 31) {
                var t = Rt();
                t = Fs(t);
                var l = na(e, t);
                l !== null && wt(l, e, t), lr(e, t);
            }
        }
        var _s = !0;
        function ly(e, t, l, a) {
            var n = S.T;
            S.T = null;
            var i = z.p;
            try {
                z.p = 2, ar(e, t, l, a);
            } finally{
                z.p = i, S.T = n;
            }
        }
        function ay(e, t, l, a) {
            var n = S.T;
            S.T = null;
            var i = z.p;
            try {
                z.p = 8, ar(e, t, l, a);
            } finally{
                z.p = i, S.T = n;
            }
        }
        function ar(e, t, l, a) {
            if (_s) {
                var n = nr(a);
                if (n === null) Vu(e, t, a, Ns, l), zh(e, a);
                else if (iy(n, e, t, l, a)) a.stopPropagation();
                else if (zh(e, a), t & 4 && -1 < ny.indexOf(e)) {
                    for(; n !== null;){
                        var i = ga(n);
                        if (i !== null) switch(i.tag){
                            case 3:
                                if (i = i.stateNode, i.current.memoizedState.isDehydrated) {
                                    var f = Pl(i.pendingLanes);
                                    if (f !== 0) {
                                        var h = i;
                                        for(h.pendingLanes |= 2, h.entangledLanes |= 2; f;){
                                            var g = 1 << 31 - St(f);
                                            h.entanglements[1] |= g, f &= ~g;
                                        }
                                        el(i), (Ae & 6) === 0 && (cs = tt() + 500, Qn(0));
                                    }
                                }
                                break;
                            case 31:
                            case 13:
                                h = na(i, 2), h !== null && wt(h, i, 2), rs(), lr(i, 2);
                        }
                        if (i = nr(a), i === null && Vu(e, t, a, Ns, l), i === n) break;
                        n = i;
                    }
                    n !== null && a.stopPropagation();
                } else Vu(e, t, a, null, l);
            }
        }
        function nr(e) {
            return e = sc(e), ir(e);
        }
        var Ns = null;
        function ir(e) {
            if (Ns = null, e = va(e), e !== null) {
                var t = m(e);
                if (t === null) e = null;
                else {
                    var l = t.tag;
                    if (l === 13) {
                        if (e = p(t), e !== null) return e;
                        e = null;
                    } else if (l === 31) {
                        if (e = b(t), e !== null) return e;
                        e = null;
                    } else if (l === 3) {
                        if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
                        e = null;
                    } else t !== e && (e = null);
                }
            }
            return Ns = e, null;
        }
        function Dh(e) {
            switch(e){
                case "beforetoggle":
                case "cancel":
                case "click":
                case "close":
                case "contextmenu":
                case "copy":
                case "cut":
                case "auxclick":
                case "dblclick":
                case "dragend":
                case "dragstart":
                case "drop":
                case "focusin":
                case "focusout":
                case "input":
                case "invalid":
                case "keydown":
                case "keypress":
                case "keyup":
                case "mousedown":
                case "mouseup":
                case "paste":
                case "pause":
                case "play":
                case "pointercancel":
                case "pointerdown":
                case "pointerup":
                case "ratechange":
                case "reset":
                case "resize":
                case "seeked":
                case "submit":
                case "toggle":
                case "touchcancel":
                case "touchend":
                case "touchstart":
                case "volumechange":
                case "change":
                case "selectionchange":
                case "textInput":
                case "compositionstart":
                case "compositionend":
                case "compositionupdate":
                case "beforeblur":
                case "afterblur":
                case "beforeinput":
                case "blur":
                case "fullscreenchange":
                case "focus":
                case "hashchange":
                case "popstate":
                case "select":
                case "selectstart":
                    return 2;
                case "drag":
                case "dragenter":
                case "dragexit":
                case "dragleave":
                case "dragover":
                case "mousemove":
                case "mouseout":
                case "mouseover":
                case "pointermove":
                case "pointerout":
                case "pointerover":
                case "scroll":
                case "touchmove":
                case "wheel":
                case "mouseenter":
                case "mouseleave":
                case "pointerenter":
                case "pointerleave":
                    return 8;
                case "message":
                    switch(Vm()){
                        case Br:
                            return 2;
                        case qr:
                            return 8;
                        case mi:
                        case Xm:
                            return 32;
                        case Gr:
                            return 268435456;
                        default:
                            return 32;
                    }
                default:
                    return 32;
            }
        }
        var sr = !1, Zl = null, Kl = null, Jl = null, In = new Map, Pn = new Map, $l = [], ny = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
        function zh(e, t) {
            switch(e){
                case "focusin":
                case "focusout":
                    Zl = null;
                    break;
                case "dragenter":
                case "dragleave":
                    Kl = null;
                    break;
                case "mouseover":
                case "mouseout":
                    Jl = null;
                    break;
                case "pointerover":
                case "pointerout":
                    In.delete(t.pointerId);
                    break;
                case "gotpointercapture":
                case "lostpointercapture":
                    Pn.delete(t.pointerId);
            }
        }
        function ei(e, t, l, a, n, i) {
            return e === null || e.nativeEvent !== i ? (e = {
                blockedOn: t,
                domEventName: l,
                eventSystemFlags: a,
                nativeEvent: i,
                targetContainers: [
                    n
                ]
            }, t !== null && (t = ga(t), t !== null && Mh(t)), e) : (e.eventSystemFlags |= a, t = e.targetContainers, n !== null && t.indexOf(n) === -1 && t.push(n), e);
        }
        function iy(e, t, l, a, n) {
            switch(t){
                case "focusin":
                    return Zl = ei(Zl, e, t, l, a, n), !0;
                case "dragenter":
                    return Kl = ei(Kl, e, t, l, a, n), !0;
                case "mouseover":
                    return Jl = ei(Jl, e, t, l, a, n), !0;
                case "pointerover":
                    var i = n.pointerId;
                    return In.set(i, ei(In.get(i) || null, e, t, l, a, n)), !0;
                case "gotpointercapture":
                    return i = n.pointerId, Pn.set(i, ei(Pn.get(i) || null, e, t, l, a, n)), !0;
            }
            return !1;
        }
        function Uh(e) {
            var t = va(e.target);
            if (t !== null) {
                var l = m(t);
                if (l !== null) {
                    if (t = l.tag, t === 13) {
                        if (t = p(l), t !== null) {
                            e.blockedOn = t, Kr(e.priority, function() {
                                Oh(l);
                            });
                            return;
                        }
                    } else if (t === 31) {
                        if (t = b(l), t !== null) {
                            e.blockedOn = t, Kr(e.priority, function() {
                                Oh(l);
                            });
                            return;
                        }
                    } else if (t === 3 && l.stateNode.current.memoizedState.isDehydrated) {
                        e.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
                        return;
                    }
                }
            }
            e.blockedOn = null;
        }
        function js(e) {
            if (e.blockedOn !== null) return !1;
            for(var t = e.targetContainers; 0 < t.length;){
                var l = nr(e.nativeEvent);
                if (l === null) {
                    l = e.nativeEvent;
                    var a = new l.constructor(l.type, l);
                    ic = a, l.target.dispatchEvent(a), ic = null;
                } else return t = ga(l), t !== null && Mh(t), e.blockedOn = l, !1;
                t.shift();
            }
            return !0;
        }
        function Lh(e, t, l) {
            js(e) && l.delete(t);
        }
        function sy() {
            sr = !1, Zl !== null && js(Zl) && (Zl = null), Kl !== null && js(Kl) && (Kl = null), Jl !== null && js(Jl) && (Jl = null), In.forEach(Lh), Pn.forEach(Lh);
        }
        function Es(e, t) {
            e.blockedOn === t && (e.blockedOn = null, sr || (sr = !0, s.unstable_scheduleCallback(s.unstable_NormalPriority, sy)));
        }
        var Cs = null;
        function Hh(e) {
            Cs !== e && (Cs = e, s.unstable_scheduleCallback(s.unstable_NormalPriority, function() {
                Cs === e && (Cs = null);
                for(var t = 0; t < e.length; t += 3){
                    var l = e[t], a = e[t + 1], n = e[t + 2];
                    if (typeof a != "function") {
                        if (ir(a || l) === null) continue;
                        break;
                    }
                    var i = ga(l);
                    i !== null && (e.splice(t, 3), t -= 3, nu(i, {
                        pending: !0,
                        data: n,
                        method: l.method,
                        action: a
                    }, a, n));
                }
            }));
        }
        function tn(e) {
            function t(g) {
                return Es(g, e);
            }
            Zl !== null && Es(Zl, e), Kl !== null && Es(Kl, e), Jl !== null && Es(Jl, e), In.forEach(t), Pn.forEach(t);
            for(var l = 0; l < $l.length; l++){
                var a = $l[l];
                a.blockedOn === e && (a.blockedOn = null);
            }
            for(; 0 < $l.length && (l = $l[0], l.blockedOn === null);)Uh(l), l.blockedOn === null && $l.shift();
            if (l = (e.ownerDocument || e).$$reactFormReplay, l != null) for(a = 0; a < l.length; a += 3){
                var n = l[a], i = l[a + 1], f = n[pt] || null;
                if (typeof i == "function") f || Hh(l);
                else if (f) {
                    var h = null;
                    if (i && i.hasAttribute("formAction")) {
                        if (n = i, f = i[pt] || null) h = f.formAction;
                        else if (ir(n) !== null) continue;
                    } else h = f.action;
                    typeof h == "function" ? l[a + 1] = h : (l.splice(a, 3), a -= 3), Hh(l);
                }
            }
        }
        function kh() {
            function e(i) {
                i.canIntercept && i.info === "react-transition" && i.intercept({
                    handler: function() {
                        return new Promise(function(f) {
                            return n = f;
                        });
                    },
                    focusReset: "manual",
                    scroll: "manual"
                });
            }
            function t() {
                n !== null && (n(), n = null), a || setTimeout(l, 20);
            }
            function l() {
                if (!a && !navigation.transition) {
                    var i = navigation.currentEntry;
                    i && i.url != null && navigation.navigate(i.url, {
                        state: i.getState(),
                        info: "react-transition",
                        history: "replace"
                    });
                }
            }
            if (typeof navigation == "object") {
                var a = !1, n = null;
                return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(l, 100), function() {
                    a = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), n !== null && (n(), n = null);
                };
            }
        }
        function cr(e) {
            this._internalRoot = e;
        }
        As.prototype.render = cr.prototype.render = function(e) {
            var t = this._internalRoot;
            if (t === null) throw Error(r(409));
            var l = t.current, a = Rt();
            Ah(l, a, e, t, null, null);
        }, As.prototype.unmount = cr.prototype.unmount = function() {
            var e = this._internalRoot;
            if (e !== null) {
                this._internalRoot = null;
                var t = e.containerInfo;
                Ah(e.current, 2, null, e, null, null), rs(), t[ba] = null;
            }
        };
        function As(e) {
            this._internalRoot = e;
        }
        As.prototype.unstable_scheduleHydration = function(e) {
            if (e) {
                var t = Zr();
                e = {
                    blockedOn: null,
                    target: e,
                    priority: t
                };
                for(var l = 0; l < $l.length && t !== 0 && t < $l[l].priority; l++);
                $l.splice(l, 0, e), l === 0 && Uh(e);
            }
        };
        var Bh = u.version;
        if (Bh !== "19.2.3") throw Error(r(527, Bh, "19.2.3"));
        z.findDOMNode = function(e) {
            var t = e._reactInternals;
            if (t === void 0) throw typeof e.render == "function" ? Error(r(188)) : (e = Object.keys(e).join(","), Error(r(268, e)));
            return e = y(t), e = e !== null ? N(e) : null, e = e === null ? null : e.stateNode, e;
        };
        var cy = {
            bundleType: 0,
            version: "19.2.3",
            rendererPackageName: "react-dom",
            currentDispatcherRef: S,
            reconcilerVersion: "19.2.3"
        };
        if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
            var Rs = __REACT_DEVTOOLS_GLOBAL_HOOK__;
            if (!Rs.isDisabled && Rs.supportsFiber) try {
                rn = Rs.inject(cy), Tt = Rs;
            } catch  {}
        }
        return li.createRoot = function(e, t) {
            if (!d(e)) throw Error(r(299));
            var l = !1, a = "", n = Zf, i = Kf, f = Jf;
            return t != null && (t.unstable_strictMode === !0 && (l = !0), t.identifierPrefix !== void 0 && (a = t.identifierPrefix), t.onUncaughtError !== void 0 && (n = t.onUncaughtError), t.onCaughtError !== void 0 && (i = t.onCaughtError), t.onRecoverableError !== void 0 && (f = t.onRecoverableError)), t = Eh(e, 1, !1, null, null, l, a, null, n, i, f, kh), e[ba] = t.current, Yu(e), new cr(t);
        }, li.hydrateRoot = function(e, t, l) {
            if (!d(e)) throw Error(r(299));
            var a = !1, n = "", i = Zf, f = Kf, h = Jf, g = null;
            return l != null && (l.unstable_strictMode === !0 && (a = !0), l.identifierPrefix !== void 0 && (n = l.identifierPrefix), l.onUncaughtError !== void 0 && (i = l.onUncaughtError), l.onCaughtError !== void 0 && (f = l.onCaughtError), l.onRecoverableError !== void 0 && (h = l.onRecoverableError), l.formState !== void 0 && (g = l.formState)), t = Eh(e, 1, !0, t, l ?? null, a, n, g, i, f, h, kh), t.context = Ch(null), l = t.current, a = Rt(), a = Fs(a), n = zl(a), n.callback = null, Ul(l, n, a), l = a, t.current.lanes = l, fn(t, l), el(t), e[ba] = t.current, Yu(e), new As(t);
        }, li.version = "19.2.3", li;
    }
    var $h;
    function by() {
        if ($h) return or.exports;
        $h = 1;
        function s() {
            if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
                __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(s);
            } catch (u) {
                console.error(u);
            }
        }
        return s(), or.exports = yy(), or.exports;
    }
    var vy = by();
    var Wh = "popstate";
    function gy(s = {}) {
        function u(r, d) {
            let { pathname: m, search: p, hash: b } = r.location;
            return wr("", {
                pathname: m,
                search: p,
                hash: b
            }, d.state && d.state.usr || null, d.state && d.state.key || "default");
        }
        function o(r, d) {
            return typeof d == "string" ? d : ui(d);
        }
        return Ty(u, o, null, s);
    }
    function Ye(s, u) {
        if (s === !1 || s === null || typeof s > "u") throw new Error(u);
    }
    function $t(s, u) {
        if (!s) {
            typeof console < "u" && console.warn(u);
            try {
                throw new Error(u);
            } catch  {}
        }
    }
    function wy() {
        return Math.random().toString(36).substring(2, 10);
    }
    function Fh(s, u) {
        return {
            usr: s.state,
            key: s.key,
            idx: u
        };
    }
    function wr(s, u, o = null, r) {
        return {
            pathname: typeof s == "string" ? s : s.pathname,
            search: "",
            hash: "",
            ...typeof u == "string" ? nn(u) : u,
            state: o,
            key: u && u.key || r || wy()
        };
    }
    function ui({ pathname: s = "/", search: u = "", hash: o = "" }) {
        return u && u !== "?" && (s += u.charAt(0) === "?" ? u : "?" + u), o && o !== "#" && (s += o.charAt(0) === "#" ? o : "#" + o), s;
    }
    function nn(s) {
        let u = {};
        if (s) {
            let o = s.indexOf("#");
            o >= 0 && (u.hash = s.substring(o), s = s.substring(0, o));
            let r = s.indexOf("?");
            r >= 0 && (u.search = s.substring(r), s = s.substring(0, r)), s && (u.pathname = s);
        }
        return u;
    }
    function Ty(s, u, o, r = {}) {
        let { window: d = document.defaultView, v5Compat: m = !1 } = r, p = d.history, b = "POP", v = null, y = N();
        y == null && (y = 0, p.replaceState({
            ...p.state,
            idx: y
        }, ""));
        function N() {
            return (p.state || {
                idx: null
            }).idx;
        }
        function w() {
            b = "POP";
            let R = N(), X = R == null ? null : R - y;
            y = R, v && v({
                action: b,
                location: M.location,
                delta: X
            });
        }
        function O(R, X) {
            b = "PUSH";
            let H = wr(M.location, R, X);
            y = N() + 1;
            let Y = Fh(H, y), J = M.createHref(H);
            try {
                p.pushState(Y, "", J);
            } catch (W) {
                if (W instanceof DOMException && W.name === "DataCloneError") throw W;
                d.location.assign(J);
            }
            m && v && v({
                action: b,
                location: M.location,
                delta: 1
            });
        }
        function V(R, X) {
            b = "REPLACE";
            let H = wr(M.location, R, X);
            y = N();
            let Y = Fh(H, y), J = M.createHref(H);
            p.replaceState(Y, "", J), m && v && v({
                action: b,
                location: M.location,
                delta: 0
            });
        }
        function L(R) {
            return Sy(R);
        }
        let M = {
            get action () {
                return b;
            },
            get location () {
                return s(d, p);
            },
            listen (R) {
                if (v) throw new Error("A history only accepts one active listener");
                return d.addEventListener(Wh, w), v = R, ()=>{
                    d.removeEventListener(Wh, w), v = null;
                };
            },
            createHref (R) {
                return u(d, R);
            },
            createURL: L,
            encodeLocation (R) {
                let X = L(R);
                return {
                    pathname: X.pathname,
                    search: X.search,
                    hash: X.hash
                };
            },
            push: O,
            replace: V,
            go (R) {
                return p.go(R);
            }
        };
        return M;
    }
    function Sy(s, u = !1) {
        let o = "http://localhost";
        typeof window < "u" && (o = window.location.origin !== "null" ? window.location.origin : window.location.href), Ye(o, "No window.location.(origin|href) available to create URL");
        let r = typeof s == "string" ? s : ui(s);
        return r = r.replace(/ $/, "%20"), !u && r.startsWith("//") && (r = o + r), new URL(r, o);
    }
    function pm(s, u, o = "/") {
        return _y(s, u, o, !1);
    }
    function _y(s, u, o, r) {
        let d = typeof u == "string" ? nn(u) : u, m = Tl(d.pathname || "/", o);
        if (m == null) return null;
        let p = xm(s);
        Ny(p);
        let b = null;
        for(let v = 0; b == null && v < p.length; ++v){
            let y = Ly(m);
            b = zy(p[v], y, r);
        }
        return b;
    }
    function xm(s, u = [], o = [], r = "", d = !1) {
        let m = (p, b, v = d, y)=>{
            let N = {
                relativePath: y === void 0 ? p.path || "" : y,
                caseSensitive: p.caseSensitive === !0,
                childrenIndex: b,
                route: p
            };
            if (N.relativePath.startsWith("/")) {
                if (!N.relativePath.startsWith(r) && v) return;
                Ye(N.relativePath.startsWith(r), `Absolute route path "${N.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`), N.relativePath = N.relativePath.slice(r.length);
            }
            let w = wl([
                r,
                N.relativePath
            ]), O = o.concat(N);
            p.children && p.children.length > 0 && (Ye(p.index !== !0, `Index routes must not have child routes. Please remove all child routes from route path "${w}".`), xm(p.children, u, O, w, v)), !(p.path == null && !p.index) && u.push({
                path: w,
                score: Oy(w, p.index),
                routesMeta: O
            });
        };
        return s.forEach((p, b)=>{
            if (p.path === "" || !p.path?.includes("?")) m(p, b);
            else for (let v of ym(p.path))m(p, b, !0, v);
        }), u;
    }
    function ym(s) {
        let u = s.split("/");
        if (u.length === 0) return [];
        let [o, ...r] = u, d = o.endsWith("?"), m = o.replace(/\?$/, "");
        if (r.length === 0) return d ? [
            m,
            ""
        ] : [
            m
        ];
        let p = ym(r.join("/")), b = [];
        return b.push(...p.map((v)=>v === "" ? m : [
                m,
                v
            ].join("/"))), d && b.push(...p), b.map((v)=>s.startsWith("/") && v === "" ? "/" : v);
    }
    function Ny(s) {
        s.sort((u, o)=>u.score !== o.score ? o.score - u.score : Dy(u.routesMeta.map((r)=>r.childrenIndex), o.routesMeta.map((r)=>r.childrenIndex)));
    }
    var jy = /^:[\w-]+$/, Ey = 3, Cy = 2, Ay = 1, Ry = 10, My = -2, Ih = (s)=>s === "*";
    function Oy(s, u) {
        let o = s.split("/"), r = o.length;
        return o.some(Ih) && (r += My), u && (r += Cy), o.filter((d)=>!Ih(d)).reduce((d, m)=>d + (jy.test(m) ? Ey : m === "" ? Ay : Ry), r);
    }
    function Dy(s, u) {
        return s.length === u.length && s.slice(0, -1).every((r, d)=>r === u[d]) ? s[s.length - 1] - u[u.length - 1] : 0;
    }
    function zy(s, u, o = !1) {
        let { routesMeta: r } = s, d = {}, m = "/", p = [];
        for(let b = 0; b < r.length; ++b){
            let v = r[b], y = b === r.length - 1, N = m === "/" ? u : u.slice(m.length) || "/", w = Vs({
                path: v.relativePath,
                caseSensitive: v.caseSensitive,
                end: y
            }, N), O = v.route;
            if (!w && y && o && !r[r.length - 1].route.index && (w = Vs({
                path: v.relativePath,
                caseSensitive: v.caseSensitive,
                end: !1
            }, N)), !w) return null;
            Object.assign(d, w.params), p.push({
                params: d,
                pathname: wl([
                    m,
                    w.pathname
                ]),
                pathnameBase: qy(wl([
                    m,
                    w.pathnameBase
                ])),
                route: O
            }), w.pathnameBase !== "/" && (m = wl([
                m,
                w.pathnameBase
            ]));
        }
        return p;
    }
    function Vs(s, u) {
        typeof s == "string" && (s = {
            path: s,
            caseSensitive: !1,
            end: !0
        });
        let [o, r] = Uy(s.path, s.caseSensitive, s.end), d = u.match(o);
        if (!d) return null;
        let m = d[0], p = m.replace(/(.)\/+$/, "$1"), b = d.slice(1);
        return {
            params: r.reduce((y, { paramName: N, isOptional: w }, O)=>{
                if (N === "*") {
                    let L = b[O] || "";
                    p = m.slice(0, m.length - L.length).replace(/(.)\/+$/, "$1");
                }
                const V = b[O];
                return w && !V ? y[N] = void 0 : y[N] = (V || "").replace(/%2F/g, "/"), y;
            }, {}),
            pathname: m,
            pathnameBase: p,
            pattern: s
        };
    }
    function Uy(s, u = !1, o = !0) {
        $t(s === "*" || !s.endsWith("*") || s.endsWith("/*"), `Route path "${s}" will be treated as if it were "${s.replace(/\*$/, "/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${s.replace(/\*$/, "/*")}".`);
        let r = [], d = "^" + s.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (p, b, v)=>(r.push({
                paramName: b,
                isOptional: v != null
            }), v ? "/?([^\\/]+)?" : "/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g, "(/$1)?$2");
        return s.endsWith("*") ? (r.push({
            paramName: "*"
        }), d += s === "*" || s === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : o ? d += "\\/*$" : s !== "" && s !== "/" && (d += "(?:(?=\\/|$))"), [
            new RegExp(d, u ? void 0 : "i"),
            r
        ];
    }
    function Ly(s) {
        try {
            return s.split("/").map((u)=>decodeURIComponent(u).replace(/\//g, "%2F")).join("/");
        } catch (u) {
            return $t(!1, `The URL path "${s}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${u}).`), s;
        }
    }
    function Tl(s, u) {
        if (u === "/") return s;
        if (!s.toLowerCase().startsWith(u.toLowerCase())) return null;
        let o = u.endsWith("/") ? u.length - 1 : u.length, r = s.charAt(o);
        return r && r !== "/" ? null : s.slice(o) || "/";
    }
    var Hy = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;
    function ky(s, u = "/") {
        let { pathname: o, search: r = "", hash: d = "" } = typeof s == "string" ? nn(s) : s, m;
        return o ? (o = o.replace(/\/\/+/g, "/"), o.startsWith("/") ? m = Ph(o.substring(1), "/") : m = Ph(o, u)) : m = u, {
            pathname: m,
            search: Gy(r),
            hash: Yy(d)
        };
    }
    function Ph(s, u) {
        let o = u.replace(/\/+$/, "").split("/");
        return s.split("/").forEach((d)=>{
            d === ".." ? o.length > 1 && o.pop() : d !== "." && o.push(d);
        }), o.length > 1 ? o.join("/") : "/";
    }
    function mr(s, u, o, r) {
        return `Cannot include a '${s}' character in a manually specified \`to.${u}\` field [${JSON.stringify(r)}].  Please separate it out to the \`to.${o}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
    }
    function By(s) {
        return s.filter((u, o)=>o === 0 || u.route.path && u.route.path.length > 0);
    }
    function bm(s) {
        let u = By(s);
        return u.map((o, r)=>r === u.length - 1 ? o.pathname : o.pathnameBase);
    }
    function vm(s, u, o, r = !1) {
        let d;
        typeof s == "string" ? d = nn(s) : (d = {
            ...s
        }, Ye(!d.pathname || !d.pathname.includes("?"), mr("?", "pathname", "search", d)), Ye(!d.pathname || !d.pathname.includes("#"), mr("#", "pathname", "hash", d)), Ye(!d.search || !d.search.includes("#"), mr("#", "search", "hash", d)));
        let m = s === "" || d.pathname === "", p = m ? "/" : d.pathname, b;
        if (p == null) b = o;
        else {
            let w = u.length - 1;
            if (!r && p.startsWith("..")) {
                let O = p.split("/");
                for(; O[0] === "..";)O.shift(), w -= 1;
                d.pathname = O.join("/");
            }
            b = w >= 0 ? u[w] : "/";
        }
        let v = ky(d, b), y = p && p !== "/" && p.endsWith("/"), N = (m || p === ".") && o.endsWith("/");
        return !v.pathname.endsWith("/") && (y || N) && (v.pathname += "/"), v;
    }
    var wl = (s)=>s.join("/").replace(/\/\/+/g, "/"), qy = (s)=>s.replace(/\/+$/, "").replace(/^\/*/, "/"), Gy = (s)=>!s || s === "?" ? "" : s.startsWith("?") ? s : "?" + s, Yy = (s)=>!s || s === "#" ? "" : s.startsWith("#") ? s : "#" + s, Vy = class {
        constructor(s, u, o, r = !1){
            this.status = s, this.statusText = u || "", this.internal = r, o instanceof Error ? (this.data = o.toString(), this.error = o) : this.data = o;
        }
    };
    function Xy(s) {
        return s != null && typeof s.status == "number" && typeof s.statusText == "string" && typeof s.internal == "boolean" && "data" in s;
    }
    function Qy(s) {
        return s.map((u)=>u.route.path).filter(Boolean).join("/").replace(/\/\/*/g, "/") || "/";
    }
    var gm = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
    function wm(s, u) {
        let o = s;
        if (typeof o != "string" || !Hy.test(o)) return {
            absoluteURL: void 0,
            isExternal: !1,
            to: o
        };
        let r = o, d = !1;
        if (gm) try {
            let m = new URL(window.location.href), p = o.startsWith("//") ? new URL(m.protocol + o) : new URL(o), b = Tl(p.pathname, u);
            p.origin === m.origin && b != null ? o = b + p.search + p.hash : d = !0;
        } catch  {
            $t(!1, `<Link to="${o}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`);
        }
        return {
            absoluteURL: r,
            isExternal: d,
            to: o
        };
    }
    Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
    var Tm = [
        "POST",
        "PUT",
        "PATCH",
        "DELETE"
    ];
    new Set(Tm);
    var Zy = [
        "GET",
        ...Tm
    ];
    new Set(Zy);
    var sn = x.createContext(null);
    sn.displayName = "DataRouter";
    var Ks = x.createContext(null);
    Ks.displayName = "DataRouterState";
    var Ky = x.createContext(!1), Sm = x.createContext({
        isTransitioning: !1
    });
    Sm.displayName = "ViewTransition";
    var Jy = x.createContext(new Map);
    Jy.displayName = "Fetchers";
    var $y = x.createContext(null);
    $y.displayName = "Await";
    var Vt = x.createContext(null);
    Vt.displayName = "Navigation";
    var fi = x.createContext(null);
    fi.displayName = "Location";
    var tl = x.createContext({
        outlet: null,
        matches: [],
        isDataRoute: !1
    });
    tl.displayName = "Route";
    var Rr = x.createContext(null);
    Rr.displayName = "RouteError";
    var _m = "REACT_ROUTER_ERROR", Wy = "REDIRECT", Fy = "ROUTE_ERROR_RESPONSE";
    function Iy(s) {
        if (s.startsWith(`${_m}:${Wy}:{`)) try {
            let u = JSON.parse(s.slice(28));
            if (typeof u == "object" && u && typeof u.status == "number" && typeof u.statusText == "string" && typeof u.location == "string" && typeof u.reloadDocument == "boolean" && typeof u.replace == "boolean") return u;
        } catch  {}
    }
    function Py(s) {
        if (s.startsWith(`${_m}:${Fy}:{`)) try {
            let u = JSON.parse(s.slice(40));
            if (typeof u == "object" && u && typeof u.status == "number" && typeof u.statusText == "string") return new Vy(u.status, u.statusText, u.data);
        } catch  {}
    }
    function eb(s, { relative: u } = {}) {
        Ye(di(), "useHref() may be used only in the context of a <Router> component.");
        let { basename: o, navigator: r } = x.useContext(Vt), { hash: d, pathname: m, search: p } = hi(s, {
            relative: u
        }), b = m;
        return o !== "/" && (b = m === "/" ? o : wl([
            o,
            m
        ])), r.createHref({
            pathname: b,
            search: p,
            hash: d
        });
    }
    function di() {
        return x.useContext(fi) != null;
    }
    function Sl() {
        return Ye(di(), "useLocation() may be used only in the context of a <Router> component."), x.useContext(fi).location;
    }
    var Nm = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
    function jm(s) {
        x.useContext(Vt).static || x.useLayoutEffect(s);
    }
    function Ot() {
        let { isDataRoute: s } = x.useContext(tl);
        return s ? hb() : tb();
    }
    function tb() {
        Ye(di(), "useNavigate() may be used only in the context of a <Router> component.");
        let s = x.useContext(sn), { basename: u, navigator: o } = x.useContext(Vt), { matches: r } = x.useContext(tl), { pathname: d } = Sl(), m = JSON.stringify(bm(r)), p = x.useRef(!1);
        return jm(()=>{
            p.current = !0;
        }), x.useCallback((v, y = {})=>{
            if ($t(p.current, Nm), !p.current) return;
            if (typeof v == "number") {
                o.go(v);
                return;
            }
            let N = vm(v, JSON.parse(m), d, y.relative === "path");
            s == null && u !== "/" && (N.pathname = N.pathname === "/" ? u : wl([
                u,
                N.pathname
            ])), (y.replace ? o.replace : o.push)(N, y.state, y);
        }, [
            u,
            o,
            m,
            d,
            s
        ]);
    }
    x.createContext(null);
    function Em() {
        let { matches: s } = x.useContext(tl), u = s[s.length - 1];
        return u ? u.params : {};
    }
    function hi(s, { relative: u } = {}) {
        let { matches: o } = x.useContext(tl), { pathname: r } = Sl(), d = JSON.stringify(bm(o));
        return x.useMemo(()=>vm(s, JSON.parse(d), r, u === "path"), [
            s,
            d,
            r,
            u
        ]);
    }
    function lb(s, u) {
        return Cm(s, u);
    }
    function Cm(s, u, o, r, d) {
        Ye(di(), "useRoutes() may be used only in the context of a <Router> component.");
        let { navigator: m } = x.useContext(Vt), { matches: p } = x.useContext(tl), b = p[p.length - 1], v = b ? b.params : {}, y = b ? b.pathname : "/", N = b ? b.pathnameBase : "/", w = b && b.route;
        {
            let H = w && w.path || "";
            Rm(y, !w || H.endsWith("*") || H.endsWith("*?"), `You rendered descendant <Routes> (or called \`useRoutes()\`) at "${y}" (under <Route path="${H}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${H}"> to <Route path="${H === "/" ? "*" : `${H}/*`}">.`);
        }
        let O = Sl(), V;
        if (u) {
            let H = typeof u == "string" ? nn(u) : u;
            Ye(N === "/" || H.pathname?.startsWith(N), `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${N}" but pathname "${H.pathname}" was given in the \`location\` prop.`), V = H;
        } else V = O;
        let L = V.pathname || "/", M = L;
        if (N !== "/") {
            let H = N.replace(/^\//, "").split("/");
            M = "/" + L.replace(/^\//, "").split("/").slice(H.length).join("/");
        }
        let R = pm(s, {
            pathname: M
        });
        $t(w || R != null, `No routes matched location "${V.pathname}${V.search}${V.hash}" `), $t(R == null || R[R.length - 1].route.element !== void 0 || R[R.length - 1].route.Component !== void 0 || R[R.length - 1].route.lazy !== void 0, `Matched leaf route at location "${V.pathname}${V.search}${V.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);
        let X = cb(R && R.map((H)=>Object.assign({}, H, {
                params: Object.assign({}, v, H.params),
                pathname: wl([
                    N,
                    m.encodeLocation ? m.encodeLocation(H.pathname.replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : H.pathname
                ]),
                pathnameBase: H.pathnameBase === "/" ? N : wl([
                    N,
                    m.encodeLocation ? m.encodeLocation(H.pathnameBase.replace(/\?/g, "%3F").replace(/#/g, "%23")).pathname : H.pathnameBase
                ])
            })), p, o, r, d);
        return u && X ? x.createElement(fi.Provider, {
            value: {
                location: {
                    pathname: "/",
                    search: "",
                    hash: "",
                    state: null,
                    key: "default",
                    ...V
                },
                navigationType: "POP"
            }
        }, X) : X;
    }
    function ab() {
        let s = db(), u = Xy(s) ? `${s.status} ${s.statusText}` : s instanceof Error ? s.message : JSON.stringify(s), o = s instanceof Error ? s.stack : null, r = "rgba(200,200,200, 0.5)", d = {
            padding: "0.5rem",
            backgroundColor: r
        }, m = {
            padding: "2px 4px",
            backgroundColor: r
        }, p = null;
        return console.error("Error handled by React Router default ErrorBoundary:", s), p = x.createElement(x.Fragment, null, x.createElement("p", null, "💿 Hey developer 👋"), x.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", x.createElement("code", {
            style: m
        }, "ErrorBoundary"), " or", " ", x.createElement("code", {
            style: m
        }, "errorElement"), " prop on your route.")), x.createElement(x.Fragment, null, x.createElement("h2", null, "Unexpected Application Error!"), x.createElement("h3", {
            style: {
                fontStyle: "italic"
            }
        }, u), o ? x.createElement("pre", {
            style: d
        }, o) : null, p);
    }
    var nb = x.createElement(ab, null), Am = class extends x.Component {
        constructor(s){
            super(s), this.state = {
                location: s.location,
                revalidation: s.revalidation,
                error: s.error
            };
        }
        static getDerivedStateFromError(s) {
            return {
                error: s
            };
        }
        static getDerivedStateFromProps(s, u) {
            return u.location !== s.location || u.revalidation !== "idle" && s.revalidation === "idle" ? {
                error: s.error,
                location: s.location,
                revalidation: s.revalidation
            } : {
                error: s.error !== void 0 ? s.error : u.error,
                location: u.location,
                revalidation: s.revalidation || u.revalidation
            };
        }
        componentDidCatch(s, u) {
            this.props.onError ? this.props.onError(s, u) : console.error("React Router caught the following error during render", s);
        }
        render() {
            let s = this.state.error;
            if (this.context && typeof s == "object" && s && "digest" in s && typeof s.digest == "string") {
                const o = Py(s.digest);
                o && (s = o);
            }
            let u = s !== void 0 ? x.createElement(tl.Provider, {
                value: this.props.routeContext
            }, x.createElement(Rr.Provider, {
                value: s,
                children: this.props.component
            })) : this.props.children;
            return this.context ? x.createElement(ib, {
                error: s
            }, u) : u;
        }
    };
    Am.contextType = Ky;
    var pr = new WeakMap;
    function ib({ children: s, error: u }) {
        let { basename: o } = x.useContext(Vt);
        if (typeof u == "object" && u && "digest" in u && typeof u.digest == "string") {
            let r = Iy(u.digest);
            if (r) {
                let d = pr.get(u);
                if (d) throw d;
                let m = wm(r.location, o);
                if (gm && !pr.get(u)) if (m.isExternal || r.reloadDocument) window.location.href = m.absoluteURL || m.to;
                else {
                    const p = Promise.resolve().then(()=>window.__reactRouterDataRouter.navigate(m.to, {
                            replace: r.replace
                        }));
                    throw pr.set(u, p), p;
                }
                return x.createElement("meta", {
                    httpEquiv: "refresh",
                    content: `0;url=${m.absoluteURL || m.to}`
                });
            }
        }
        return s;
    }
    function sb({ routeContext: s, match: u, children: o }) {
        let r = x.useContext(sn);
        return r && r.static && r.staticContext && (u.route.errorElement || u.route.ErrorBoundary) && (r.staticContext._deepestRenderedBoundaryId = u.route.id), x.createElement(tl.Provider, {
            value: s
        }, o);
    }
    function cb(s, u = [], o = null, r = null, d = null) {
        if (s == null) {
            if (!o) return null;
            if (o.errors) s = o.matches;
            else if (u.length === 0 && !o.initialized && o.matches.length > 0) s = o.matches;
            else return null;
        }
        let m = s, p = o?.errors;
        if (p != null) {
            let N = m.findIndex((w)=>w.route.id && p?.[w.route.id] !== void 0);
            Ye(N >= 0, `Could not find a matching route for errors on route IDs: ${Object.keys(p).join(",")}`), m = m.slice(0, Math.min(m.length, N + 1));
        }
        let b = !1, v = -1;
        if (o) for(let N = 0; N < m.length; N++){
            let w = m[N];
            if ((w.route.HydrateFallback || w.route.hydrateFallbackElement) && (v = N), w.route.id) {
                let { loaderData: O, errors: V } = o, L = w.route.loader && !O.hasOwnProperty(w.route.id) && (!V || V[w.route.id] === void 0);
                if (w.route.lazy || L) {
                    b = !0, v >= 0 ? m = m.slice(0, v + 1) : m = [
                        m[0]
                    ];
                    break;
                }
            }
        }
        let y = o && r ? (N, w)=>{
            r(N, {
                location: o.location,
                params: o.matches?.[0]?.params ?? {},
                unstable_pattern: Qy(o.matches),
                errorInfo: w
            });
        } : void 0;
        return m.reduceRight((N, w, O)=>{
            let V, L = !1, M = null, R = null;
            o && (V = p && w.route.id ? p[w.route.id] : void 0, M = w.route.errorElement || nb, b && (v < 0 && O === 0 ? (Rm("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), L = !0, R = null) : v === O && (L = !0, R = w.route.hydrateFallbackElement || null)));
            let X = u.concat(m.slice(0, O + 1)), H = ()=>{
                let Y;
                return V ? Y = M : L ? Y = R : w.route.Component ? Y = x.createElement(w.route.Component, null) : w.route.element ? Y = w.route.element : Y = N, x.createElement(sb, {
                    match: w,
                    routeContext: {
                        outlet: N,
                        matches: X,
                        isDataRoute: o != null
                    },
                    children: Y
                });
            };
            return o && (w.route.ErrorBoundary || w.route.errorElement || O === 0) ? x.createElement(Am, {
                location: o.location,
                revalidation: o.revalidation,
                component: M,
                error: V,
                children: H(),
                routeContext: {
                    outlet: null,
                    matches: X,
                    isDataRoute: !0
                },
                onError: y
            }) : H();
        }, null);
    }
    function Mr(s) {
        return `${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
    }
    function ub(s) {
        let u = x.useContext(sn);
        return Ye(u, Mr(s)), u;
    }
    function rb(s) {
        let u = x.useContext(Ks);
        return Ye(u, Mr(s)), u;
    }
    function ob(s) {
        let u = x.useContext(tl);
        return Ye(u, Mr(s)), u;
    }
    function Or(s) {
        let u = ob(s), o = u.matches[u.matches.length - 1];
        return Ye(o.route.id, `${s} can only be used on routes that contain a unique "id"`), o.route.id;
    }
    function fb() {
        return Or("useRouteId");
    }
    function db() {
        let s = x.useContext(Rr), u = rb("useRouteError"), o = Or("useRouteError");
        return s !== void 0 ? s : u.errors?.[o];
    }
    function hb() {
        let { router: s } = ub("useNavigate"), u = Or("useNavigate"), o = x.useRef(!1);
        return jm(()=>{
            o.current = !0;
        }), x.useCallback(async (d, m = {})=>{
            $t(o.current, Nm), o.current && (typeof d == "number" ? await s.navigate(d) : await s.navigate(d, {
                fromRouteId: u,
                ...m
            }));
        }, [
            s,
            u
        ]);
    }
    var em = {};
    function Rm(s, u, o) {
        !u && !em[s] && (em[s] = !0, $t(!1, o));
    }
    x.memo(mb);
    function mb({ routes: s, future: u, state: o, onError: r }) {
        return Cm(s, void 0, o, r, u);
    }
    function mt(s) {
        Ye(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
    }
    function pb({ basename: s = "/", children: u = null, location: o, navigationType: r = "POP", navigator: d, static: m = !1, unstable_useTransitions: p }) {
        Ye(!di(), "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
        let b = s.replace(/^\/*/, "/"), v = x.useMemo(()=>({
                basename: b,
                navigator: d,
                static: m,
                unstable_useTransitions: p,
                future: {}
            }), [
            b,
            d,
            m,
            p
        ]);
        typeof o == "string" && (o = nn(o));
        let { pathname: y = "/", search: N = "", hash: w = "", state: O = null, key: V = "default" } = o, L = x.useMemo(()=>{
            let M = Tl(y, b);
            return M == null ? null : {
                location: {
                    pathname: M,
                    search: N,
                    hash: w,
                    state: O,
                    key: V
                },
                navigationType: r
            };
        }, [
            b,
            y,
            N,
            w,
            O,
            V,
            r
        ]);
        return $t(L != null, `<Router basename="${b}"> is not able to match the URL "${y}${N}${w}" because it does not start with the basename, so the <Router> won't render anything.`), L == null ? null : x.createElement(Vt.Provider, {
            value: v
        }, x.createElement(fi.Provider, {
            children: u,
            value: L
        }));
    }
    function xb({ children: s, location: u }) {
        return lb(Tr(s), u);
    }
    function Tr(s, u = []) {
        let o = [];
        return x.Children.forEach(s, (r, d)=>{
            if (!x.isValidElement(r)) return;
            let m = [
                ...u,
                d
            ];
            if (r.type === x.Fragment) {
                o.push.apply(o, Tr(r.props.children, m));
                return;
            }
            Ye(r.type === mt, `[${typeof r.type == "string" ? r.type : r.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`), Ye(!r.props.index || !r.props.children, "An index route cannot have child routes.");
            let p = {
                id: r.props.id || m.join("-"),
                caseSensitive: r.props.caseSensitive,
                element: r.props.element,
                Component: r.props.Component,
                index: r.props.index,
                path: r.props.path,
                middleware: r.props.middleware,
                loader: r.props.loader,
                action: r.props.action,
                hydrateFallbackElement: r.props.hydrateFallbackElement,
                HydrateFallback: r.props.HydrateFallback,
                errorElement: r.props.errorElement,
                ErrorBoundary: r.props.ErrorBoundary,
                hasErrorBoundary: r.props.hasErrorBoundary === !0 || r.props.ErrorBoundary != null || r.props.errorElement != null,
                shouldRevalidate: r.props.shouldRevalidate,
                handle: r.props.handle,
                lazy: r.props.lazy
            };
            r.props.children && (p.children = Tr(r.props.children, m)), o.push(p);
        }), o;
    }
    var Hs = "get", ks = "application/x-www-form-urlencoded";
    function Js(s) {
        return typeof HTMLElement < "u" && s instanceof HTMLElement;
    }
    function yb(s) {
        return Js(s) && s.tagName.toLowerCase() === "button";
    }
    function bb(s) {
        return Js(s) && s.tagName.toLowerCase() === "form";
    }
    function vb(s) {
        return Js(s) && s.tagName.toLowerCase() === "input";
    }
    function gb(s) {
        return !!(s.metaKey || s.altKey || s.ctrlKey || s.shiftKey);
    }
    function wb(s, u) {
        return s.button === 0 && (!u || u === "_self") && !gb(s);
    }
    function Sr(s = "") {
        return new URLSearchParams(typeof s == "string" || Array.isArray(s) || s instanceof URLSearchParams ? s : Object.keys(s).reduce((u, o)=>{
            let r = s[o];
            return u.concat(Array.isArray(r) ? r.map((d)=>[
                    o,
                    d
                ]) : [
                [
                    o,
                    r
                ]
            ]);
        }, []));
    }
    function Tb(s, u) {
        let o = Sr(s);
        return u && u.forEach((r, d)=>{
            o.has(d) || u.getAll(d).forEach((m)=>{
                o.append(d, m);
            });
        }), o;
    }
    var Os = null;
    function Sb() {
        if (Os === null) try {
            new FormData(document.createElement("form"), 0), Os = !1;
        } catch  {
            Os = !0;
        }
        return Os;
    }
    var _b = new Set([
        "application/x-www-form-urlencoded",
        "multipart/form-data",
        "text/plain"
    ]);
    function xr(s) {
        return s != null && !_b.has(s) ? ($t(!1, `"${s}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${ks}"`), null) : s;
    }
    function Nb(s, u) {
        let o, r, d, m, p;
        if (bb(s)) {
            let b = s.getAttribute("action");
            r = b ? Tl(b, u) : null, o = s.getAttribute("method") || Hs, d = xr(s.getAttribute("enctype")) || ks, m = new FormData(s);
        } else if (yb(s) || vb(s) && (s.type === "submit" || s.type === "image")) {
            let b = s.form;
            if (b == null) throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
            let v = s.getAttribute("formaction") || b.getAttribute("action");
            if (r = v ? Tl(v, u) : null, o = s.getAttribute("formmethod") || b.getAttribute("method") || Hs, d = xr(s.getAttribute("formenctype")) || xr(b.getAttribute("enctype")) || ks, m = new FormData(b, s), !Sb()) {
                let { name: y, type: N, value: w } = s;
                if (N === "image") {
                    let O = y ? `${y}.` : "";
                    m.append(`${O}x`, "0"), m.append(`${O}y`, "0");
                } else y && m.append(y, w);
            }
        } else {
            if (Js(s)) throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
            o = Hs, r = null, d = ks, p = s;
        }
        return m && d === "text/plain" && (p = m, m = void 0), {
            action: r,
            method: o.toLowerCase(),
            encType: d,
            formData: m,
            body: p
        };
    }
    Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
    function Dr(s, u) {
        if (s === !1 || s === null || typeof s > "u") throw new Error(u);
    }
    function jb(s, u, o, r) {
        let d = typeof s == "string" ? new URL(s, typeof window > "u" ? "server://singlefetch/" : window.location.origin) : s;
        return o ? d.pathname.endsWith("/") ? d.pathname = `${d.pathname}_.${r}` : d.pathname = `${d.pathname}.${r}` : d.pathname === "/" ? d.pathname = `_root.${r}` : u && Tl(d.pathname, u) === "/" ? d.pathname = `${u.replace(/\/$/, "")}/_root.${r}` : d.pathname = `${d.pathname.replace(/\/$/, "")}.${r}`, d;
    }
    async function Eb(s, u) {
        if (s.id in u) return u[s.id];
        try {
            let o = await import(s.module).then(async (m)=>{
                await m.__tla;
                return m;
            });
            return u[s.id] = o, o;
        } catch (o) {
            return console.error(`Error loading route module \`${s.module}\`, reloading page...`), console.error(o), window.__reactRouterContext && window.__reactRouterContext.isSpaMode, window.location.reload(), new Promise(()=>{});
        }
    }
    function Cb(s) {
        return s == null ? !1 : s.href == null ? s.rel === "preload" && typeof s.imageSrcSet == "string" && typeof s.imageSizes == "string" : typeof s.rel == "string" && typeof s.href == "string";
    }
    async function Ab(s, u, o) {
        let r = await Promise.all(s.map(async (d)=>{
            let m = u.routes[d.route.id];
            if (m) {
                let p = await Eb(m, o);
                return p.links ? p.links() : [];
            }
            return [];
        }));
        return Db(r.flat(1).filter(Cb).filter((d)=>d.rel === "stylesheet" || d.rel === "preload").map((d)=>d.rel === "stylesheet" ? {
                ...d,
                rel: "prefetch",
                as: "style"
            } : {
                ...d,
                rel: "prefetch"
            }));
    }
    function tm(s, u, o, r, d, m) {
        let p = (v, y)=>o[y] ? v.route.id !== o[y].route.id : !0, b = (v, y)=>o[y].pathname !== v.pathname || o[y].route.path?.endsWith("*") && o[y].params["*"] !== v.params["*"];
        return m === "assets" ? u.filter((v, y)=>p(v, y) || b(v, y)) : m === "data" ? u.filter((v, y)=>{
            let N = r.routes[v.route.id];
            if (!N || !N.hasLoader) return !1;
            if (p(v, y) || b(v, y)) return !0;
            if (v.route.shouldRevalidate) {
                let w = v.route.shouldRevalidate({
                    currentUrl: new URL(d.pathname + d.search + d.hash, window.origin),
                    currentParams: o[0]?.params || {},
                    nextUrl: new URL(s, window.origin),
                    nextParams: v.params,
                    defaultShouldRevalidate: !0
                });
                if (typeof w == "boolean") return w;
            }
            return !0;
        }) : [];
    }
    function Rb(s, u, { includeHydrateFallback: o } = {}) {
        return Mb(s.map((r)=>{
            let d = u.routes[r.route.id];
            if (!d) return [];
            let m = [
                d.module
            ];
            return d.clientActionModule && (m = m.concat(d.clientActionModule)), d.clientLoaderModule && (m = m.concat(d.clientLoaderModule)), o && d.hydrateFallbackModule && (m = m.concat(d.hydrateFallbackModule)), d.imports && (m = m.concat(d.imports)), m;
        }).flat(1));
    }
    function Mb(s) {
        return [
            ...new Set(s)
        ];
    }
    function Ob(s) {
        let u = {}, o = Object.keys(s).sort();
        for (let r of o)u[r] = s[r];
        return u;
    }
    function Db(s, u) {
        let o = new Set;
        return new Set(u), s.reduce((r, d)=>{
            let m = JSON.stringify(Ob(d));
            return o.has(m) || (o.add(m), r.push({
                key: m,
                link: d
            })), r;
        }, []);
    }
    function Mm() {
        let s = x.useContext(sn);
        return Dr(s, "You must render this element inside a <DataRouterContext.Provider> element"), s;
    }
    function zb() {
        let s = x.useContext(Ks);
        return Dr(s, "You must render this element inside a <DataRouterStateContext.Provider> element"), s;
    }
    var zr = x.createContext(void 0);
    zr.displayName = "FrameworkContext";
    function Om() {
        let s = x.useContext(zr);
        return Dr(s, "You must render this element inside a <HydratedRouter> element"), s;
    }
    function Ub(s, u) {
        let o = x.useContext(zr), [r, d] = x.useState(!1), [m, p] = x.useState(!1), { onFocus: b, onBlur: v, onMouseEnter: y, onMouseLeave: N, onTouchStart: w } = u, O = x.useRef(null);
        x.useEffect(()=>{
            if (s === "render" && p(!0), s === "viewport") {
                let M = (X)=>{
                    X.forEach((H)=>{
                        p(H.isIntersecting);
                    });
                }, R = new IntersectionObserver(M, {
                    threshold: .5
                });
                return O.current && R.observe(O.current), ()=>{
                    R.disconnect();
                };
            }
        }, [
            s
        ]), x.useEffect(()=>{
            if (r) {
                let M = setTimeout(()=>{
                    p(!0);
                }, 100);
                return ()=>{
                    clearTimeout(M);
                };
            }
        }, [
            r
        ]);
        let V = ()=>{
            d(!0);
        }, L = ()=>{
            d(!1), p(!1);
        };
        return o ? s !== "intent" ? [
            m,
            O,
            {}
        ] : [
            m,
            O,
            {
                onFocus: ai(b, V),
                onBlur: ai(v, L),
                onMouseEnter: ai(y, V),
                onMouseLeave: ai(N, L),
                onTouchStart: ai(w, V)
            }
        ] : [
            !1,
            O,
            {}
        ];
    }
    function ai(s, u) {
        return (o)=>{
            s && s(o), o.defaultPrevented || u(o);
        };
    }
    function Lb({ page: s, ...u }) {
        let { router: o } = Mm(), r = x.useMemo(()=>pm(o.routes, s, o.basename), [
            o.routes,
            s,
            o.basename
        ]);
        return r ? x.createElement(kb, {
            page: s,
            matches: r,
            ...u
        }) : null;
    }
    function Hb(s) {
        let { manifest: u, routeModules: o } = Om(), [r, d] = x.useState([]);
        return x.useEffect(()=>{
            let m = !1;
            return Ab(s, u, o).then((p)=>{
                m || d(p);
            }), ()=>{
                m = !0;
            };
        }, [
            s,
            u,
            o
        ]), r;
    }
    function kb({ page: s, matches: u, ...o }) {
        let r = Sl(), { future: d, manifest: m, routeModules: p } = Om(), { basename: b } = Mm(), { loaderData: v, matches: y } = zb(), N = x.useMemo(()=>tm(s, u, y, m, r, "data"), [
            s,
            u,
            y,
            m,
            r
        ]), w = x.useMemo(()=>tm(s, u, y, m, r, "assets"), [
            s,
            u,
            y,
            m,
            r
        ]), O = x.useMemo(()=>{
            if (s === r.pathname + r.search + r.hash) return [];
            let M = new Set, R = !1;
            if (u.forEach((H)=>{
                let Y = m.routes[H.route.id];
                !Y || !Y.hasLoader || (!N.some((J)=>J.route.id === H.route.id) && H.route.id in v && p[H.route.id]?.shouldRevalidate || Y.hasClientLoader ? R = !0 : M.add(H.route.id));
            }), M.size === 0) return [];
            let X = jb(s, b, d.unstable_trailingSlashAwareDataRequests, "data");
            return R && M.size > 0 && X.searchParams.set("_routes", u.filter((H)=>M.has(H.route.id)).map((H)=>H.route.id).join(",")), [
                X.pathname + X.search
            ];
        }, [
            b,
            d.unstable_trailingSlashAwareDataRequests,
            v,
            r,
            m,
            N,
            u,
            s,
            p
        ]), V = x.useMemo(()=>Rb(w, m), [
            w,
            m
        ]), L = Hb(w);
        return x.createElement(x.Fragment, null, O.map((M)=>x.createElement("link", {
                key: M,
                rel: "prefetch",
                as: "fetch",
                href: M,
                ...o
            })), V.map((M)=>x.createElement("link", {
                key: M,
                rel: "modulepreload",
                href: M,
                ...o
            })), L.map(({ key: M, link: R })=>x.createElement("link", {
                key: M,
                nonce: o.nonce,
                ...R,
                crossOrigin: R.crossOrigin ?? o.crossOrigin
            })));
    }
    function Bb(...s) {
        return (u)=>{
            s.forEach((o)=>{
                typeof o == "function" ? o(u) : o != null && (o.current = u);
            });
        };
    }
    var qb = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u";
    try {
        qb && (window.__reactRouterVersion = "7.13.0");
    } catch  {}
    function Gb({ basename: s, children: u, unstable_useTransitions: o, window: r }) {
        let d = x.useRef();
        d.current == null && (d.current = gy({
            window: r,
            v5Compat: !0
        }));
        let m = d.current, [p, b] = x.useState({
            action: m.action,
            location: m.location
        }), v = x.useCallback((y)=>{
            o === !1 ? b(y) : x.startTransition(()=>b(y));
        }, [
            o
        ]);
        return x.useLayoutEffect(()=>m.listen(v), [
            m,
            v
        ]), x.createElement(pb, {
            basename: s,
            children: u,
            location: p.location,
            navigationType: p.action,
            navigator: m,
            unstable_useTransitions: o
        });
    }
    var Dm = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, we = x.forwardRef(function({ onClick: u, discover: o = "render", prefetch: r = "none", relative: d, reloadDocument: m, replace: p, state: b, target: v, to: y, preventScrollReset: N, viewTransition: w, unstable_defaultShouldRevalidate: O, ...V }, L) {
        let { basename: M, unstable_useTransitions: R } = x.useContext(Vt), X = typeof y == "string" && Dm.test(y), H = wm(y, M);
        y = H.to;
        let Y = eb(y, {
            relative: d
        }), [J, W, ae] = Ub(r, V), P = Qb(y, {
            replace: p,
            state: b,
            target: v,
            preventScrollReset: N,
            relative: d,
            viewTransition: w,
            unstable_defaultShouldRevalidate: O,
            unstable_useTransitions: R
        });
        function be(ee) {
            u && u(ee), ee.defaultPrevented || P(ee);
        }
        let Q = x.createElement("a", {
            ...V,
            ...ae,
            href: H.absoluteURL || Y,
            onClick: H.isExternal || m ? u : be,
            ref: Bb(L, W),
            target: v,
            "data-discover": !X && o === "render" ? "true" : void 0
        });
        return J && !X ? x.createElement(x.Fragment, null, Q, x.createElement(Lb, {
            page: Y
        })) : Q;
    });
    we.displayName = "Link";
    var Yb = x.forwardRef(function({ "aria-current": u = "page", caseSensitive: o = !1, className: r = "", end: d = !1, style: m, to: p, viewTransition: b, children: v, ...y }, N) {
        let w = hi(p, {
            relative: y.relative
        }), O = Sl(), V = x.useContext(Ks), { navigator: L, basename: M } = x.useContext(Vt), R = V != null && Wb(w) && b === !0, X = L.encodeLocation ? L.encodeLocation(w).pathname : w.pathname, H = O.pathname, Y = V && V.navigation && V.navigation.location ? V.navigation.location.pathname : null;
        o || (H = H.toLowerCase(), Y = Y ? Y.toLowerCase() : null, X = X.toLowerCase()), Y && M && (Y = Tl(Y, M) || Y);
        const J = X !== "/" && X.endsWith("/") ? X.length - 1 : X.length;
        let W = H === X || !d && H.startsWith(X) && H.charAt(J) === "/", ae = Y != null && (Y === X || !d && Y.startsWith(X) && Y.charAt(X.length) === "/"), P = {
            isActive: W,
            isPending: ae,
            isTransitioning: R
        }, be = W ? u : void 0, Q;
        typeof r == "function" ? Q = r(P) : Q = [
            r,
            W ? "active" : null,
            ae ? "pending" : null,
            R ? "transitioning" : null
        ].filter(Boolean).join(" ");
        let ee = typeof m == "function" ? m(P) : m;
        return x.createElement(we, {
            ...y,
            "aria-current": be,
            className: Q,
            ref: N,
            style: ee,
            to: p,
            viewTransition: b
        }, typeof v == "function" ? v(P) : v);
    });
    Yb.displayName = "NavLink";
    var Vb = x.forwardRef(({ discover: s = "render", fetcherKey: u, navigate: o, reloadDocument: r, replace: d, state: m, method: p = Hs, action: b, onSubmit: v, relative: y, preventScrollReset: N, viewTransition: w, unstable_defaultShouldRevalidate: O, ...V }, L)=>{
        let { unstable_useTransitions: M } = x.useContext(Vt), R = Jb(), X = $b(b, {
            relative: y
        }), H = p.toLowerCase() === "get" ? "get" : "post", Y = typeof b == "string" && Dm.test(b), J = (W)=>{
            if (v && v(W), W.defaultPrevented) return;
            W.preventDefault();
            let ae = W.nativeEvent.submitter, P = ae?.getAttribute("formmethod") || p, be = ()=>R(ae || W.currentTarget, {
                    fetcherKey: u,
                    method: P,
                    navigate: o,
                    replace: d,
                    state: m,
                    relative: y,
                    preventScrollReset: N,
                    viewTransition: w,
                    unstable_defaultShouldRevalidate: O
                });
            M && o !== !1 ? x.startTransition(()=>be()) : be();
        };
        return x.createElement("form", {
            ref: L,
            method: H,
            action: X,
            onSubmit: r ? v : J,
            ...V,
            "data-discover": !Y && s === "render" ? "true" : void 0
        });
    });
    Vb.displayName = "Form";
    function Xb(s) {
        return `${s} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
    }
    function zm(s) {
        let u = x.useContext(sn);
        return Ye(u, Xb(s)), u;
    }
    function Qb(s, { target: u, replace: o, state: r, preventScrollReset: d, relative: m, viewTransition: p, unstable_defaultShouldRevalidate: b, unstable_useTransitions: v } = {}) {
        let y = Ot(), N = Sl(), w = hi(s, {
            relative: m
        });
        return x.useCallback((O)=>{
            if (wb(O, u)) {
                O.preventDefault();
                let V = o !== void 0 ? o : ui(N) === ui(w), L = ()=>y(s, {
                        replace: V,
                        state: r,
                        preventScrollReset: d,
                        relative: m,
                        viewTransition: p,
                        unstable_defaultShouldRevalidate: b
                    });
                v ? x.startTransition(()=>L()) : L();
            }
        }, [
            N,
            y,
            w,
            o,
            r,
            u,
            s,
            d,
            m,
            p,
            b,
            v
        ]);
    }
    function cn(s) {
        $t(typeof URLSearchParams < "u", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");
        let u = x.useRef(Sr(s)), o = x.useRef(!1), r = Sl(), d = x.useMemo(()=>Tb(r.search, o.current ? null : u.current), [
            r.search
        ]), m = Ot(), p = x.useCallback((b, v)=>{
            const y = Sr(typeof b == "function" ? b(new URLSearchParams(d)) : b);
            o.current = !0, m("?" + y, v);
        }, [
            m,
            d
        ]);
        return [
            d,
            p
        ];
    }
    var Zb = 0, Kb = ()=>`__${String(++Zb)}__`;
    function Jb() {
        let { router: s } = zm("useSubmit"), { basename: u } = x.useContext(Vt), o = fb(), r = s.fetch, d = s.navigate;
        return x.useCallback(async (m, p = {})=>{
            let { action: b, method: v, encType: y, formData: N, body: w } = Nb(m, u);
            if (p.navigate === !1) {
                let O = p.fetcherKey || Kb();
                await r(O, o, p.action || b, {
                    unstable_defaultShouldRevalidate: p.unstable_defaultShouldRevalidate,
                    preventScrollReset: p.preventScrollReset,
                    formData: N,
                    body: w,
                    formMethod: p.method || v,
                    formEncType: p.encType || y,
                    flushSync: p.flushSync
                });
            } else await d(p.action || b, {
                unstable_defaultShouldRevalidate: p.unstable_defaultShouldRevalidate,
                preventScrollReset: p.preventScrollReset,
                formData: N,
                body: w,
                formMethod: p.method || v,
                formEncType: p.encType || y,
                replace: p.replace,
                state: p.state,
                fromRouteId: o,
                flushSync: p.flushSync,
                viewTransition: p.viewTransition
            });
        }, [
            r,
            d,
            u,
            o
        ]);
    }
    function $b(s, { relative: u } = {}) {
        let { basename: o } = x.useContext(Vt), r = x.useContext(tl);
        Ye(r, "useFormAction must be used inside a RouteContext");
        let [d] = r.matches.slice(-1), m = {
            ...hi(s || ".", {
                relative: u
            })
        }, p = Sl();
        if (s == null) {
            m.search = p.search;
            let b = new URLSearchParams(m.search), v = b.getAll("index");
            if (v.some((N)=>N === "")) {
                b.delete("index"), v.filter((w)=>w).forEach((w)=>b.append("index", w));
                let N = b.toString();
                m.search = N ? `?${N}` : "";
            }
        }
        return (!s || s === ".") && d.route.index && (m.search = m.search ? m.search.replace(/^\?/, "?index&") : "?index"), o !== "/" && (m.pathname = m.pathname === "/" ? o : wl([
            o,
            m.pathname
        ])), ui(m);
    }
    function Wb(s, { relative: u } = {}) {
        let o = x.useContext(Sm);
        Ye(o != null, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
        let { basename: r } = zm("useViewTransitionState"), d = hi(s, {
            relative: u
        });
        if (!o.isTransitioning) return !1;
        let m = Tl(o.currentLocation.pathname, r) || o.currentLocation.pathname, p = Tl(o.nextLocation.pathname, r) || o.nextLocation.pathname;
        return Vs(d.pathname, p) != null || Vs(d.pathname, m) != null;
    }
    const lm = (s)=>{
        let u;
        const o = new Set, r = (y, N)=>{
            const w = typeof y == "function" ? y(u) : y;
            if (!Object.is(w, u)) {
                const O = u;
                u = N ?? (typeof w != "object" || w === null) ? w : Object.assign({}, u, w), o.forEach((V)=>V(u, O));
            }
        }, d = ()=>u, b = {
            setState: r,
            getState: d,
            getInitialState: ()=>v,
            subscribe: (y)=>(o.add(y), ()=>o.delete(y))
        }, v = u = s(r, d, b);
        return b;
    }, Fb = ((s)=>s ? lm(s) : lm), Ib = (s)=>s;
    function Pb(s, u = Ib) {
        const o = Ms.useSyncExternalStore(s.subscribe, Ms.useCallback(()=>u(s.getState()), [
            s,
            u
        ]), Ms.useCallback(()=>u(s.getInitialState()), [
            s,
            u
        ]));
        return Ms.useDebugValue(o), o;
    }
    const am = (s)=>{
        const u = Fb(s), o = (r)=>Pb(u, r);
        return Object.assign(o, u), o;
    }, Ur = ((s)=>s ? am(s) : am), un = Ur((s)=>({
            connected: !1,
            setConnected: (u)=>s({
                    connected: u
                }),
            currentRoom: null,
            setCurrentRoom: (u)=>s({
                    currentRoom: u
                }),
            roomList: [],
            setRoomList: (u)=>s({
                    roomList: u
                }),
            gameInfo: null,
            setGameInfo: (u)=>s({
                    gameInfo: u
                }),
            playerList: null,
            setPlayerList: (u)=>s({
                    playerList: u
                }),
            movesFrom: null,
            setMovesFrom: (u)=>s({
                    movesFrom: u
                }),
            selectedSquare: null,
            setSelectedSquare: (u)=>s({
                    selectedSquare: u
                }),
            chatMessages: [],
            addChatMessage: (u)=>s((o)=>({
                        chatMessages: [
                            ...o.chatMessages,
                            u
                        ].slice(-100)
                    })),
            clearChat: ()=>s({
                    chatMessages: []
                }),
            reset: ()=>s({
                    currentRoom: null,
                    gameInfo: null,
                    playerList: null,
                    movesFrom: null,
                    selectedSquare: null,
                    chatMessages: []
                })
        })), _r = "protochess_auth";
    function e3() {
        try {
            const s = localStorage.getItem(_r);
            if (s) {
                const u = JSON.parse(s);
                return {
                    token: u.token || null,
                    user: u.user || null
                };
            }
        } catch  {}
        return {
            token: null,
            user: null
        };
    }
    function nm(s, u) {
        s && u ? localStorage.setItem(_r, JSON.stringify({
            token: s,
            user: u
        })) : localStorage.removeItem(_r);
    }
    const im = e3(), _l = Ur((s, u)=>({
            token: im.token,
            user: im.user,
            setAuth: (o, r)=>{
                nm(o, r), s({
                    token: o,
                    user: r
                });
            },
            logout: ()=>{
                nm(null, null), s({
                    token: null,
                    user: null
                });
            },
            isAuthenticated: ()=>u().token !== null && u().user !== null
        }));
    function t3(s) {
        return {
            width: s.width,
            height: s.height,
            to_move: s.toMove,
            tiles: s.tiles.map((u)=>({
                    x: u.x,
                    y: u.y,
                    tile_type: u.tileType
                })),
            pieces: s.pieces.map((u)=>({
                    owner: u.owner,
                    x: u.x,
                    y: u.y,
                    piece_type: u.pieceType
                })),
            movement_patterns: s.movementPatterns
        };
    }
    function l3(s) {
        return {
            promote_to: s.promoteTo,
            from: s.from,
            to: s.to
        };
    }
    function Um(s) {
        return {
            width: s.width,
            height: s.height,
            toMove: s.to_move,
            tiles: s.tiles.map((u)=>({
                    x: u.x,
                    y: u.y,
                    tileType: u.tile_type
                })),
            pieces: s.pieces.map((u)=>({
                    owner: u.owner,
                    x: u.x,
                    y: u.y,
                    pieceType: u.piece_type
                })),
            movementPatterns: s.movement_patterns
        };
    }
    function a3(s) {
        return {
            owner: s.owner,
            x: s.x,
            y: s.y,
            pieceType: s.piece_type
        };
    }
    function n3(s) {
        return s ? {
            promoteTo: s.promote_to,
            from: s.from,
            to: s.to
        } : null;
    }
    function i3(s) {
        return {
            winner: s.winner,
            to_move_in_check: s.to_move_in_check,
            in_check_kings: s.in_check_kings?.map(a3) ?? null,
            last_turn: n3(s.last_turn),
            state: Um(s.state)
        };
    }
    function s3(s) {
        return {
            from: s.from,
            to: s.to
        };
    }
    const c3 = window.location.protocol === "https:", sm = `${c3 ? "wss" : "ws"}://${window.location.host}/ws`, Lm = x.createContext(null);
    function u3({ children: s }) {
        const u = x.useRef(null), o = x.useRef([]), r = x.useRef(null), { setConnected: d, setRoomList: m, setGameInfo: p, setPlayerList: b, setMovesFrom: v, setCurrentRoom: y, addChatMessage: N, reset: w } = un(), O = x.useCallback((M)=>{
            switch(M.type){
                case "RoomList":
                    m(M.content);
                    break;
                case "RoomCreateSuccess":
                    y(M.content);
                    break;
                case "RemovedFromRoom":
                    w();
                    break;
                case "GameInfo":
                    p(i3(M.content));
                    break;
                case "PlayerList":
                    b(M.content);
                    break;
                case "MovesFrom":
                    v(s3(M.content));
                    break;
                case "ChatMessage":
                    N(M.content);
                    break;
                case "NoRoomFound":
                    console.warn("Room not found");
                    break;
                case "CannotOverwriteRoom":
                    console.warn("Cannot overwrite existing room");
                    break;
            }
        }, [
            m,
            y,
            p,
            b,
            v,
            N,
            w
        ]), V = x.useCallback(()=>{
            if (u.current?.readyState === WebSocket.OPEN) return;
            const M = _l.getState().token, R = M ? `${sm}?token=${encodeURIComponent(M)}` : sm, X = new WebSocket(R);
            u.current = X, X.onopen = ()=>{
                for(console.log("WebSocket connected"), d(!0); o.current.length > 0;){
                    const H = o.current.shift();
                    H && X.send(H);
                }
            }, X.onclose = (H)=>{
                console.log("WebSocket disconnected - code:", H.code, "reason:", H.reason, "wasClean:", H.wasClean), d(!1), r.current && clearTimeout(r.current), r.current = window.setTimeout(()=>{
                    console.log("Attempting to reconnect..."), V();
                }, 2e3);
            }, X.onerror = (H)=>{
                console.error("WebSocket error:", H);
            }, X.onmessage = (H)=>{
                try {
                    console.log("Received WebSocket message:", H.data);
                    const Y = JSON.parse(H.data);
                    O(Y);
                } catch (Y) {
                    console.error("Failed to parse message:", Y);
                }
            };
        }, [
            d,
            O
        ]), L = x.useCallback((M)=>{
            const R = JSON.stringify(M);
            console.log("Sending WebSocket message:", R), u.current?.readyState === WebSocket.OPEN ? u.current.send(R) : (console.log("WebSocket not open, queueing message"), o.current.push(R));
        }, []);
        return x.useEffect(()=>(V(), ()=>{
                r.current && clearTimeout(r.current);
            }), [
            V
        ]), c.jsx(Lm.Provider, {
            value: {
                sendMessage: L
            },
            children: s
        });
    }
    function Lr() {
        const s = x.useContext(Lm);
        if (!s) throw new Error("useWebSocket must be used within a WebSocketProvider");
        return s;
    }
    function r3() {
        const [s, u] = x.useState(!1);
        return c.jsxs("div", {
            className: "min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4",
            children: [
                c.jsxs("div", {
                    className: "max-w-md w-full",
                    children: [
                        c.jsxs("div", {
                            className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8",
                            children: [
                                c.jsx("h1", {
                                    className: "text-4xl font-black text-[#2d3436] mb-2 text-center",
                                    children: "CUSTOMCHESS"
                                }),
                                c.jsx("p", {
                                    className: "text-[#2d3436] text-center mb-8 font-medium",
                                    children: "A customizable chess game   engine"
                                }),
                                c.jsxs("div", {
                                    className: "space-y-4",
                                    children: [
                                        c.jsx(we, {
                                            to: "/singleplayer",
                                            className: "block w-full bg-[#ff6b6b] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 text-center font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                            children: "PLAY VS AI"
                                        }),
                                        c.jsx(we, {
                                            to: "/multiplayer",
                                            className: "block w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 text-center font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                            children: "PLAY ONLINE"
                                        }),
                                        c.jsx(we, {
                                            to: "/editor",
                                            className: "block w-full bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 text-center font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                            children: "BOARD EDITOR"
                                        }),
                                        c.jsx(we, {
                                            to: "/browse",
                                            className: "block w-full bg-[#a29bfe] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 text-center font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                            children: "BROWSE VARIANTS"
                                        }),
                                        c.jsx("button", {
                                            onClick: ()=>u(!0),
                                            className: "block w-full bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 text-center font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                            children: "ABOUT THIS SITE"
                                        })
                                    ]
                                })
                            ]
                        }),
                        c.jsx("p", {
                            className: "text-center text-sm text-[#636e72] mt-4",
                            children: "Built by Mason Liebe"
                        })
                    ]
                }),
                s && c.jsx("div", {
                    className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
                    children: c.jsxs("div", {
                        className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] max-w-md w-full max-h-[90vh] overflow-y-auto",
                        children: [
                            c.jsxs("div", {
                                className: "flex items-center justify-between p-4 border-b-4 border-[#2d3436]",
                                children: [
                                    c.jsx("h2", {
                                        className: "text-xl font-black text-[#2d3436]",
                                        children: "ABOUT THIS SITE"
                                    }),
                                    c.jsx("button", {
                                        onClick: ()=>u(!1),
                                        className: "w-10 h-10 bg-[#ff6b6b] border-2 border-[#2d3436] font-bold text-xl hover:bg-red-400 transition-colors",
                                        children: "×"
                                    })
                                ]
                            }),
                            c.jsxs("div", {
                                className: "p-4 space-y-4 text-[#2d3436]",
                                children: [
                                    c.jsx("p", {
                                        className: "font-medium",
                                        children: "CustomChess is a chess variant engine supporting arbitrary board dimensions (up to 16x16), custom piece movement patterns, and configurable tile layouts with disableable squares."
                                    }),
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("h3", {
                                                className: "font-black text-sm mb-1",
                                                children: "CHESS ENGINE (RUST / WASM)"
                                            }),
                                            c.jsx("p", {
                                                className: "text-sm text-[#636e72]",
                                                children: "The core engine is written in Rust and compiled to WebAssembly via wasm-bindgen, running entirely in the browser. Board state is represented using 256-bit bitboards (via numext-fixed-uint U256) to support up to 16x16 grids. The AI uses negamax search with alpha-beta pruning, iterative deepening, and principal variation search (PVS). Pruning is accelerated by null move pruning (R=3), late move reductions, and a 1.5M-entry transposition table with 4-way clustering and Zobrist hashing. Move ordering uses killer moves (2 per ply), history heuristic tables, and static exchange evaluation (SEE) for captures. Quiescence search prevents horizon-effect blunders. Positional evaluation uses dynamically generated piece-square tables based on mobility, with endgame-aware king centralization."
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("h3", {
                                                className: "font-black text-sm mb-1",
                                                children: "FRONTEND"
                                            }),
                                            c.jsx("p", {
                                                className: "text-sm text-[#636e72]",
                                                children: "Built with React 19 and TypeScript, bundled with Vite 7 using vite-plugin-wasm and vite-plugin-top-level-await for async WASM initialization. The board is rendered as absolutely-positioned DOM elements with SVG piece images, supporting both click-to-move and HTML5 drag-and-drop interactions. State management uses Zustand stores for game state and editor state. Styled with Tailwind CSS 4 in a neobrutalist design system."
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("h3", {
                                                className: "font-black text-sm mb-1",
                                                children: "MULTIPLAYER"
                                            }),
                                            c.jsx("p", {
                                                className: "text-sm text-[#636e72]",
                                                children: "The backend is an async Rust server built on Axum 0.7 with Tokio, serving WebSocket connections at /ws. Rooms are managed as independent Tokio tasks communicating via mpsc channels, with JSON-serialized tagged-union messages (serde) for the client-server protocol. Room IDs are generated using adjective-adjective-animal naming. The client auto-reconnects on disconnect with a 2-second retry and buffers outbound messages while disconnected. Deployed via a multi-stage Docker build (node:20-alpine for the frontend, rust:1.75-alpine for the server, alpine:latest for runtime)."
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("h3", {
                                                className: "font-black text-sm mb-1",
                                                children: "BOARD EDITOR"
                                            }),
                                            c.jsx("p", {
                                                className: "text-sm text-[#636e72]",
                                                children: "The editor supports custom board dimensions (4x4 to 16x16), per-tile enable/disable toggling, and up to 9 custom piece types with fully configurable movement patterns. Movement patterns define independent attack and translate capabilities across 8 sliding directions plus arbitrary jump deltas on a configurable grid. Board configurations are serializable as JSON GameState objects and can be exported/imported or used to create multiplayer rooms. Includes 6 prebuilt variants: Standard, Mini (6x6), Micro (4x5), Big (10x10), Holy (with disabled tiles), and Pawn Storm."
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        });
    }
    const Mt = {
        SQUARE_DARK: "#a97d5d",
        SQUARE_LIGHT: "#f7dcb4",
        HIGHLIGHT_FROM: "rgba(92, 147, 94, 0.7)",
        HIGHLIGHT_TO: "rgba(153, 186, 130, 0.7)",
        HIGHLIGHT_POSSIBLE_TO: "rgba(217, 191, 119, 0.6)",
        HIGHLIGHT_CHECK: "rgba(255, 0, 0, 0.5)",
        DISABLED: "rgb(87, 87, 87)"
    }, Ie = {
        MIN: 4,
        MAX: 16,
        DEFAULT: 8
    };
    function o3(s, u) {
        const o = [];
        for(let r = 0; r < u; r++)for(let d = 0; d < s; d++)o.push({
            x: d,
            y: r,
            tileType: (d + r) % 2 === 0 ? "w" : "b"
        });
        return o;
    }
    function f3(s, u) {
        const o = [], r = [
            "r",
            "n",
            "b",
            "q",
            "k",
            "b",
            "n",
            "r"
        ], d = Math.min(s, 8), m = Math.floor((s - d) / 2);
        let p = [];
        if (d >= 8) p = r;
        else if (d >= 5) {
            const b = Math.floor(d / 2);
            p = new Array(d).fill("p"), p[b] = "k", d >= 6 && (p[0] = "r", p[d - 1] = "r"), d >= 7 && (p[1] = "n", p[d - 2] = "n"), d >= 5 && b > 0 && (p[b - 1] = "q");
        } else p = new Array(d).fill("p"), p[Math.floor(d / 2)] = "k", d >= 3 && (p[0] = "r");
        for(let b = 0; b < d; b++)o.push({
            owner: 0,
            x: m + b,
            y: 0,
            pieceType: p[b]
        });
        {
            const b = Math.min(s, d);
            for(let v = 0; v < b; v++)o.push({
                owner: 0,
                x: m + v,
                y: 1,
                pieceType: "p"
            });
        }
        for(let b = 0; b < d; b++)o.push({
            owner: 1,
            x: m + b,
            y: u - 1,
            pieceType: p[b]
        });
        {
            const b = Math.min(s, d);
            for(let v = 0; v < b; v++)o.push({
                owner: 1,
                x: m + v,
                y: u - 2,
                pieceType: "p"
            });
        }
        return o;
    }
    function d3(s, u) {
        return {
            width: Math.max(Ie.MIN, Math.min(Ie.MAX, s)),
            height: Math.max(Ie.MIN, Math.min(Ie.MAX, u)),
            toMove: 0,
            tiles: o3(s, u),
            pieces: f3(s, u),
            movementPatterns: {}
        };
    }
    d3(8, 8);
    const yr = 560;
    function ri({ gameState: s, playerNum: u = 0, flipped: o = !1, lastTurn: r, inCheckKings: d, onTileClick: m, onMove: p, onRequestMoves: b, disabled: v = !1 }) {
        const { movesFrom: y, selectedSquare: N, setSelectedSquare: w, setMovesFrom: O } = un(), [V, L] = x.useState(!1), [M, R] = x.useState(null), { width: X, height: H } = s, Y = Math.max(X, H), J = Math.floor(yr / Y), W = J * X, ae = J * H, P = x.useCallback((S, z)=>{
            if (v) return;
            if (m?.(S, z), y && N && y.to.some(([ie, T])=>ie === S && T === z)) {
                p?.(N, [
                    S,
                    z
                ]), w(null), O(null);
                return;
            }
            s.pieces.find((K)=>K.x === S && K.y === z && K.owner === u) && s.toMove === u ? (w([
                S,
                z
            ]), b?.(S, z)) : (w(null), O(null));
        }, [
            v,
            y,
            N,
            s.pieces,
            s.toMove,
            u,
            m,
            p,
            b,
            w,
            O
        ]), be = x.useCallback((S, z)=>{
            if (v || z.owner !== u || s.toMove !== u) {
                S.preventDefault();
                return;
            }
            S.dataTransfer.setData("text/plain", JSON.stringify({
                x: z.x,
                y: z.y
            })), S.dataTransfer.effectAllowed = "move";
            const B = S.currentTarget.querySelector("img");
            if (B) {
                const K = B.cloneNode(!0);
                K.style.position = "absolute", K.style.top = "-9999px", K.style.left = "-9999px", K.style.width = `${J * .85}px`, K.style.height = `${J * .85}px`, document.body.appendChild(K), S.dataTransfer.setDragImage(K, J * .425, J * .425), requestAnimationFrame(()=>document.body.removeChild(K));
            }
            w([
                z.x,
                z.y
            ]), R([
                z.x,
                z.y
            ]), L(!0), b?.(z.x, z.y);
        }, [
            v,
            u,
            s.toMove,
            J,
            w,
            b
        ]), Q = x.useCallback(()=>{
            L(!1), R(null);
        }, []), ee = x.useCallback((S)=>{
            S.preventDefault(), S.dataTransfer.dropEffect = "move";
        }, []), te = x.useCallback((S, z, B)=>{
            S.preventDefault(), L(!1), R(null), !v && (y && N && y.to.some(([ie, T])=>ie === z && T === B) && p?.(N, [
                z,
                B
            ]), w(null), O(null));
        }, [
            v,
            y,
            N,
            p,
            w,
            O
        ]), ne = (S, z)=>!!(r && r.from[0] === S && r.from[1] === z || N && N[0] === S && N[1] === z || M && M[0] === S && M[1] === z), re = (S, z)=>!!(r && r.to[0] === S && r.to[1] === z), xe = (S, z)=>y ? y.to.some(([B, K])=>B === S && K === z) : !1, de = (S, z)=>d ? d.some((B)=>B.x === S && B.y === z) : !1;
        return c.jsx("div", {
            className: "flex items-center justify-center",
            style: {
                width: yr,
                height: yr
            },
            children: c.jsx("div", {
                className: "border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436]",
                children: c.jsxs("div", {
                    className: "relative",
                    style: {
                        width: W,
                        height: ae
                    },
                    children: [
                        s.tiles.map((S)=>{
                            const z = o ? X - 1 - S.x : S.x, B = o ? S.y : H - 1 - S.y;
                            let ie = (S.x + S.y) % 2 === 1 ? Mt.SQUARE_LIGHT : Mt.SQUARE_DARK;
                            return S.tileType === "x" ? ie = Mt.DISABLED : de(S.x, S.y) ? ie = Mt.HIGHLIGHT_CHECK : ne(S.x, S.y) ? ie = Mt.HIGHLIGHT_FROM : re(S.x, S.y) && (ie = Mt.HIGHLIGHT_TO), c.jsx("div", {
                                className: "absolute cursor-pointer transition-colors hover:brightness-110",
                                style: {
                                    left: z * J,
                                    top: B * J,
                                    width: J,
                                    height: J,
                                    backgroundColor: ie
                                },
                                onClick: ()=>P(S.x, S.y),
                                onDragOver: ee,
                                onDrop: (T)=>te(T, S.x, S.y),
                                children: xe(S.x, S.y) && c.jsx("div", {
                                    className: "absolute inset-0 flex items-center justify-center",
                                    children: c.jsx("div", {
                                        className: "w-1/3 h-1/3 rounded-full opacity-60",
                                        style: {
                                            backgroundColor: Mt.HIGHLIGHT_POSSIBLE_TO
                                        }
                                    })
                                })
                            }, `${S.x}-${S.y}`);
                        }),
                        s.pieces.map((S, z)=>{
                            const B = o ? X - 1 - S.x : S.x, K = o ? S.y : H - 1 - S.y, ie = S.owner === 0 ? "white" : "black", T = !v && S.owner === u && s.toMove === u, k = V && M && M[0] === S.x && M[1] === S.y;
                            return c.jsx("div", {
                                className: `absolute flex items-center justify-center ${T ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"} ${k ? "opacity-50" : ""}`,
                                style: {
                                    left: B * J,
                                    top: K * J,
                                    width: J,
                                    height: J
                                },
                                draggable: T,
                                onDragStart: (Z)=>be(Z, S),
                                onDragEnd: Q,
                                onClick: ()=>P(S.x, S.y),
                                children: c.jsx("img", {
                                    src: `/images/chess_pieces/${ie}/${S.pieceType.toLowerCase()}.svg`,
                                    alt: `${ie} ${S.pieceType}`,
                                    className: "w-[85%] h-[85%] object-contain drop-shadow-md",
                                    draggable: !1
                                })
                            }, `piece-${z}-${S.x}-${S.y}`);
                        })
                    ]
                })
            })
        });
    }
    class Xs {
        __destroy_into_raw() {
            const u = this.__wbg_ptr;
            return this.__wbg_ptr = 0, cm.unregister(this), u;
        }
        free() {
            const u = this.__destroy_into_raw();
            Re.__wbg_protochess_free(u, 0);
        }
        get_best_move_timeout(u) {
            return Re.protochess_get_best_move_timeout(this.__wbg_ptr, u);
        }
        get_state() {
            return Re.protochess_get_state(this.__wbg_ptr);
        }
        make_move(u, o, r, d) {
            return Re.protochess_make_move(this.__wbg_ptr, u, o, r, d) !== 0;
        }
        moves_from(u, o) {
            return Re.protochess_moves_from(this.__wbg_ptr, u, o);
        }
        constructor(){
            const u = Re.protochess_new();
            return this.__wbg_ptr = u >>> 0, cm.register(this, this.__wbg_ptr, this), this;
        }
        play_best_move(u) {
            return Re.protochess_play_best_move(this.__wbg_ptr, u) !== 0;
        }
        play_best_move_timeout(u) {
            return Re.protochess_play_best_move_timeout(this.__wbg_ptr, u);
        }
        set_state(u) {
            return Re.protochess_set_state(this.__wbg_ptr, u) !== 0;
        }
        to_move_in_check() {
            return Re.protochess_to_move_in_check(this.__wbg_ptr) !== 0;
        }
        to_string() {
            let u, o;
            try {
                const r = Re.protochess_to_string(this.__wbg_ptr);
                return u = r[0], o = r[1], an(r[0], r[1]);
            } finally{
                Re.__wbindgen_free(u, o, 1);
            }
        }
    }
    Symbol.dispose && (Xs.prototype[Symbol.dispose] = Xs.prototype.free);
    function h3() {
        return {
            __proto__: null,
            "./protochess_engine_wasm_bg.js": {
                __proto__: null,
                __wbg___wbindgen_debug_string_0bc8482c6e3508ae: function(u, o) {
                    const r = Nr(o), d = rm(r, Re.__wbindgen_malloc, Re.__wbindgen_realloc), m = Qs;
                    Ds().setInt32(u + 4, m, !0), Ds().setInt32(u + 0, d, !0);
                },
                __wbg___wbindgen_is_undefined_9e4d92534c42d778: function(u) {
                    return u === void 0;
                },
                __wbg___wbindgen_throw_be289d5034ed271b: function(u, o) {
                    throw new Error(an(u, o));
                },
                __wbg_alert_ef3403c3a1c247c2: function(u, o) {
                    alert(an(u, o));
                },
                __wbg_call_389efe28435a9388: function() {
                    return um(function(u, o) {
                        return u.call(o);
                    }, arguments);
                },
                __wbg_get_b3ed3ad4be2bc8ac: function() {
                    return um(function(u, o) {
                        return Reflect.get(u, o);
                    }, arguments);
                },
                __wbg_new_no_args_1c7c842f08d00ebb: function(u, o) {
                    return new Function(an(u, o));
                },
                __wbg_now_ebffdf7e580f210d: function(u) {
                    return u.now();
                },
                __wbg_parse_9e3ea228dba1cc2a: function(u, o) {
                    let r, d;
                    try {
                        return r = u, d = o, JSON.parse(an(u, o));
                    } finally{
                        Re.__wbindgen_free(r, d, 1);
                    }
                },
                __wbg_static_accessor_GLOBAL_12837167ad935116: function() {
                    const u = typeof global > "u" ? null : global;
                    return ni(u) ? 0 : ii(u);
                },
                __wbg_static_accessor_GLOBAL_THIS_e628e89ab3b1c95f: function() {
                    const u = typeof globalThis > "u" ? null : globalThis;
                    return ni(u) ? 0 : ii(u);
                },
                __wbg_static_accessor_SELF_a621d3dfbb60d0ce: function() {
                    const u = typeof self > "u" ? null : self;
                    return ni(u) ? 0 : ii(u);
                },
                __wbg_static_accessor_WINDOW_f8727f0cf888e0bd: function() {
                    const u = typeof window > "u" ? null : window;
                    return ni(u) ? 0 : ii(u);
                },
                __wbg_stringify_e4a940b133e6b7d8: function(u, o) {
                    const r = JSON.stringify(o);
                    var d = ni(r) ? 0 : rm(r, Re.__wbindgen_malloc, Re.__wbindgen_realloc), m = Qs;
                    Ds().setInt32(u + 4, m, !0), Ds().setInt32(u + 0, d, !0);
                },
                __wbindgen_cast_0000000000000001: function(u, o) {
                    return an(u, o);
                },
                __wbindgen_init_externref_table: function() {
                    const u = Re.__wbindgen_externrefs, o = u.grow(4);
                    u.set(0, void 0), u.set(o + 0, void 0), u.set(o + 1, null), u.set(o + 2, !0), u.set(o + 3, !1);
                }
            }
        };
    }
    const cm = typeof FinalizationRegistry > "u" ? {
        register: ()=>{},
        unregister: ()=>{}
    } : new FinalizationRegistry((s)=>Re.__wbg_protochess_free(s >>> 0, 1));
    function ii(s) {
        const u = Re.__externref_table_alloc();
        return Re.__wbindgen_externrefs.set(u, s), u;
    }
    function Nr(s) {
        const u = typeof s;
        if (u == "number" || u == "boolean" || s == null) return `${s}`;
        if (u == "string") return `"${s}"`;
        if (u == "symbol") {
            const d = s.description;
            return d == null ? "Symbol" : `Symbol(${d})`;
        }
        if (u == "function") {
            const d = s.name;
            return typeof d == "string" && d.length > 0 ? `Function(${d})` : "Function";
        }
        if (Array.isArray(s)) {
            const d = s.length;
            let m = "[";
            d > 0 && (m += Nr(s[0]));
            for(let p = 1; p < d; p++)m += ", " + Nr(s[p]);
            return m += "]", m;
        }
        const o = /\[object ([^\]]+)\]/.exec(toString.call(s));
        let r;
        if (o && o.length > 1) r = o[1];
        else return toString.call(s);
        if (r == "Object") try {
            return "Object(" + JSON.stringify(s) + ")";
        } catch  {
            return "Object";
        }
        return s instanceof Error ? `${s.name}: ${s.message}
${s.stack}` : r;
    }
    let ya = null;
    function Ds() {
        return (ya === null || ya.buffer.detached === !0 || ya.buffer.detached === void 0 && ya.buffer !== Re.memory.buffer) && (ya = new DataView(Re.memory.buffer)), ya;
    }
    function an(s, u) {
        return s = s >>> 0, p3(s, u);
    }
    let si = null;
    function Bs() {
        return (si === null || si.byteLength === 0) && (si = new Uint8Array(Re.memory.buffer)), si;
    }
    function um(s, u) {
        try {
            return s.apply(this, u);
        } catch (o) {
            const r = ii(o);
            Re.__wbindgen_exn_store(r);
        }
    }
    function ni(s) {
        return s == null;
    }
    function rm(s, u, o) {
        if (o === void 0) {
            const b = ci.encode(s), v = u(b.length, 1) >>> 0;
            return Bs().subarray(v, v + b.length).set(b), Qs = b.length, v;
        }
        let r = s.length, d = u(r, 1) >>> 0;
        const m = Bs();
        let p = 0;
        for(; p < r; p++){
            const b = s.charCodeAt(p);
            if (b > 127) break;
            m[d + p] = b;
        }
        if (p !== r) {
            p !== 0 && (s = s.slice(p)), d = o(d, r, r = p + s.length * 3, 1) >>> 0;
            const b = Bs().subarray(d + p, d + r), v = ci.encodeInto(s, b);
            p += v.written, d = o(d, r, p, 1) >>> 0;
        }
        return Qs = p, d;
    }
    let qs = new TextDecoder("utf-8", {
        ignoreBOM: !0,
        fatal: !0
    });
    qs.decode();
    const m3 = 2146435072;
    let br = 0;
    function p3(s, u) {
        return br += u, br >= m3 && (qs = new TextDecoder("utf-8", {
            ignoreBOM: !0,
            fatal: !0
        }), qs.decode(), br = u), qs.decode(Bs().subarray(s, s + u));
    }
    const ci = new TextEncoder;
    "encodeInto" in ci || (ci.encodeInto = function(s, u) {
        const o = ci.encode(s);
        return u.set(o), {
            read: s.length,
            written: o.length
        };
    });
    let Qs = 0, Re;
    function x3(s, u) {
        return Re = s.exports, ya = null, si = null, Re.__wbindgen_start(), Re;
    }
    async function y3(s, u) {
        if (typeof Response == "function" && s instanceof Response) {
            if (typeof WebAssembly.instantiateStreaming == "function") try {
                return await WebAssembly.instantiateStreaming(s, u);
            } catch (d) {
                if (s.ok && o(s.type) && s.headers.get("Content-Type") !== "application/wasm") console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", d);
                else throw d;
            }
            const r = await s.arrayBuffer();
            return await WebAssembly.instantiate(r, u);
        } else {
            const r = await WebAssembly.instantiate(s, u);
            return r instanceof WebAssembly.Instance ? {
                instance: r,
                module: s
            } : r;
        }
        function o(r) {
            switch(r){
                case "basic":
                case "cors":
                case "default":
                    return !0;
            }
            return !1;
        }
    }
    async function b3(s) {
        if (Re !== void 0) return Re;
        s !== void 0 && (Object.getPrototypeOf(s) === Object.prototype ? { module_or_path: s } = s : console.warn("using deprecated parameters for the initialization function; pass a single object instead")), s === void 0 && (s = new URL("/assets/protochess_engine_wasm_bg-BXwp8cx1.wasm", import.meta.url));
        const u = h3();
        (typeof s == "string" || typeof Request == "function" && s instanceof Request || typeof URL == "function" && s instanceof URL) && (s = fetch(s));
        const { instance: o, module: r } = await y3(await s, u);
        return x3(o);
    }
    function v3(s) {
        return {
            width: s.width,
            height: s.height,
            to_move: s.toMove,
            tiles: s.tiles.map((u)=>({
                    x: u.x,
                    y: u.y,
                    tile_type: u.tileType
                })),
            pieces: s.pieces.map((u)=>({
                    owner: u.owner,
                    x: u.x,
                    y: u.y,
                    piece_type: u.pieceType
                })),
            movement_patterns: s.movementPatterns
        };
    }
    function g3(s) {
        return {
            width: s.width,
            height: s.height,
            toMove: s.to_move,
            tiles: s.tiles.map((u)=>({
                    x: u.x,
                    y: u.y,
                    tileType: u.tile_type
                })),
            pieces: s.pieces.map((u)=>({
                    owner: u.owner,
                    x: u.x,
                    y: u.y,
                    pieceType: u.piece_type
                })),
            movementPatterns: s.movement_patterns
        };
    }
    function w3() {
        const [s, u] = x.useState(null), [o, r] = x.useState(!1), [d, m] = x.useState(null), p = x.useRef(!1);
        x.useEffect(()=>{
            if (p.current) return;
            p.current = !0, (async ()=>{
                try {
                    await b3({
                        module_or_path: "/protochess_engine_wasm_bg.wasm"
                    });
                    const M = new Xs;
                    u(M), r(!0);
                } catch (M) {
                    console.error("Failed to initialize chess engine:", M), m(M instanceof Error ? M : new Error("Failed to initialize engine"));
                }
            })();
        }, []);
        const b = x.useCallback(()=>{
            if (!s) return null;
            try {
                const L = s.get_state();
                return g3(L);
            } catch  {
                return null;
            }
        }, [
            s
        ]), v = x.useCallback((L, M, R, X)=>{
            if (!s) return !1;
            try {
                return s.make_move(L, M, R, X);
            } catch  {
                return !1;
            }
        }, [
            s
        ]), y = x.useCallback((L, M)=>{
            if (!s) return [];
            try {
                const R = s.moves_from(L, M);
                return Array.isArray(R) ? R : [];
            } catch  {
                return [];
            }
        }, [
            s
        ]), N = x.useCallback(async (L = 5)=>s ? new Promise((M)=>{
                setTimeout(()=>{
                    try {
                        const R = s.play_best_move(L);
                        M(R);
                    } catch  {
                        M(!1);
                    }
                }, 10);
            }) : !1, [
            s
        ]), w = x.useCallback(()=>{
            if (!s) return !1;
            try {
                return s.to_move_in_check();
            } catch  {
                return !1;
            }
        }, [
            s
        ]), O = x.useCallback((L)=>{
            if (!s) return !1;
            try {
                const M = v3(L);
                return s.set_state(M);
            } catch (M) {
                return console.error("Failed to set state:", M), !1;
            }
        }, [
            s
        ]), V = x.useCallback(()=>{
            s && s.free();
            try {
                const L = new Xs;
                u(L);
            } catch (L) {
                console.error("Failed to reset engine:", L);
            }
        }, [
            s
        ]);
        return {
            engine: s,
            isReady: o,
            error: d,
            getState: b,
            makeMove: v,
            getMovesFrom: y,
            playAiMove: N,
            isInCheck: w,
            setState: O,
            reset: V
        };
    }
    const Gs = [
        "k",
        "q",
        "r",
        "b",
        "n",
        "p"
    ], Hm = [
        "a",
        "c",
        "d",
        "e",
        "f",
        "g",
        "u",
        "y",
        "z"
    ], om = ()=>({
            north: !1,
            east: !1,
            south: !1,
            west: !1,
            northeast: !1,
            northwest: !1,
            southeast: !1,
            southwest: !1
        }), fm = ()=>({
            attackSlides: om(),
            translateSlides: om(),
            attackJumps: [],
            translateJumps: [],
            attackSlideDeltas: [],
            translateSlideDeltas: []
        });
    function zs(s, u) {
        const o = [];
        for(let r = 0; r < u; r++)for(let d = 0; d < s; d++)o.push({
            x: d,
            y: r,
            tileType: (d + r) % 2 === 0 ? "w" : "b"
        });
        return o;
    }
    const Fl = Ur((s, u)=>({
            width: Ie.DEFAULT,
            height: Ie.DEFAULT,
            setWidth: (o)=>{
                const r = Math.max(Ie.MIN, Math.min(Ie.MAX, o));
                s((d)=>{
                    const m = zs(r, d.height), p = d.pieces.filter((b)=>b.x < r);
                    return {
                        width: r,
                        tiles: m,
                        pieces: p
                    };
                });
            },
            setHeight: (o)=>{
                const r = Math.max(Ie.MIN, Math.min(Ie.MAX, o));
                s((d)=>{
                    const m = zs(d.width, r), p = d.pieces.filter((b)=>b.y < r);
                    return {
                        height: r,
                        tiles: m,
                        pieces: p
                    };
                });
            },
            tiles: zs(Ie.DEFAULT, Ie.DEFAULT),
            pieces: [],
            movementPatterns: {},
            currentTool: "placePiece",
            setCurrentTool: (o)=>s({
                    currentTool: o
                }),
            selectedPieceType: "p",
            setSelectedPieceType: (o)=>s({
                    selectedPieceType: o
                }),
            selectedOwner: 0,
            setSelectedOwner: (o)=>s({
                    selectedOwner: o
                }),
            editingPiece: null,
            setEditingPiece: (o)=>s({
                    editingPiece: o
                }),
            toggleTile: (o, r)=>{
                s((d)=>{
                    const m = d.tiles.map((b)=>{
                        if (b.x === o && b.y === r) {
                            const v = b.tileType === "x" ? (o + r) % 2 === 0 ? "w" : "b" : "x";
                            return {
                                ...b,
                                tileType: v
                            };
                        }
                        return b;
                    }), p = m.find((b)=>b.x === o && b.y === r)?.tileType === "x" ? d.pieces.filter((b)=>!(b.x === o && b.y === r)) : d.pieces;
                    return {
                        tiles: m,
                        pieces: p
                    };
                });
            },
            placePiece: (o, r)=>{
                s((d)=>{
                    if (d.tiles.find((y)=>y.x === o && y.y === r)?.tileType === "x") return d;
                    const p = d.pieces.find((y)=>y.x === o && y.y === r);
                    if (p && p.pieceType === d.selectedPieceType && p.owner === d.selectedOwner) return {
                        pieces: d.pieces.filter((y)=>!(y.x === o && y.y === r))
                    };
                    const b = d.pieces.filter((y)=>!(y.x === o && y.y === r)), v = {
                        owner: d.selectedOwner,
                        x: o,
                        y: r,
                        pieceType: d.selectedPieceType
                    };
                    return {
                        pieces: [
                            ...b,
                            v
                        ]
                    };
                });
            },
            removePiece: (o, r)=>{
                s((d)=>({
                        pieces: d.pieces.filter((m)=>!(m.x === o && m.y === r))
                    }));
            },
            setMovementPattern: (o, r)=>{
                s((d)=>({
                        movementPatterns: {
                            ...d.movementPatterns,
                            [o]: r
                        }
                    }));
            },
            removeMovementPattern: (o)=>{
                s((r)=>{
                    const { [o]: d, ...m } = r.movementPatterns;
                    return {
                        movementPatterns: m
                    };
                });
            },
            getGameState: ()=>{
                const o = u();
                return {
                    width: o.width,
                    height: o.height,
                    toMove: 0,
                    tiles: o.tiles,
                    pieces: o.pieces,
                    movementPatterns: o.movementPatterns
                };
            },
            resetBoard: ()=>{
                s({
                    width: Ie.DEFAULT,
                    height: Ie.DEFAULT,
                    tiles: zs(Ie.DEFAULT, Ie.DEFAULT),
                    pieces: [],
                    movementPatterns: {}
                });
            },
            loadGameState: (o)=>{
                s({
                    width: o.width,
                    height: o.height,
                    tiles: o.tiles,
                    pieces: o.pieces,
                    movementPatterns: o.movementPatterns
                });
            },
            hasMovementPattern: (o)=>o in u().movementPatterns
        })), T3 = 8, S3 = 8, _3 = 0, N3 = [
        {
            x: 0,
            y: 0,
            tileType: "w"
        },
        {
            x: 1,
            y: 0,
            tileType: "b"
        },
        {
            x: 2,
            y: 0,
            tileType: "w"
        },
        {
            x: 3,
            y: 0,
            tileType: "b"
        },
        {
            x: 4,
            y: 0,
            tileType: "w"
        },
        {
            x: 5,
            y: 0,
            tileType: "b"
        },
        {
            x: 6,
            y: 0,
            tileType: "w"
        },
        {
            x: 7,
            y: 0,
            tileType: "b"
        },
        {
            x: 0,
            y: 1,
            tileType: "b"
        },
        {
            x: 1,
            y: 1,
            tileType: "w"
        },
        {
            x: 2,
            y: 1,
            tileType: "b"
        },
        {
            x: 3,
            y: 1,
            tileType: "w"
        },
        {
            x: 4,
            y: 1,
            tileType: "b"
        },
        {
            x: 5,
            y: 1,
            tileType: "w"
        },
        {
            x: 6,
            y: 1,
            tileType: "b"
        },
        {
            x: 7,
            y: 1,
            tileType: "w"
        },
        {
            x: 0,
            y: 2,
            tileType: "w"
        },
        {
            x: 1,
            y: 2,
            tileType: "b"
        },
        {
            x: 2,
            y: 2,
            tileType: "w"
        },
        {
            x: 3,
            y: 2,
            tileType: "b"
        },
        {
            x: 4,
            y: 2,
            tileType: "w"
        },
        {
            x: 5,
            y: 2,
            tileType: "b"
        },
        {
            x: 6,
            y: 2,
            tileType: "w"
        },
        {
            x: 7,
            y: 2,
            tileType: "b"
        },
        {
            x: 0,
            y: 3,
            tileType: "b"
        },
        {
            x: 1,
            y: 3,
            tileType: "w"
        },
        {
            x: 2,
            y: 3,
            tileType: "b"
        },
        {
            x: 3,
            y: 3,
            tileType: "w"
        },
        {
            x: 4,
            y: 3,
            tileType: "b"
        },
        {
            x: 5,
            y: 3,
            tileType: "w"
        },
        {
            x: 6,
            y: 3,
            tileType: "b"
        },
        {
            x: 7,
            y: 3,
            tileType: "w"
        },
        {
            x: 0,
            y: 4,
            tileType: "w"
        },
        {
            x: 1,
            y: 4,
            tileType: "b"
        },
        {
            x: 2,
            y: 4,
            tileType: "w"
        },
        {
            x: 3,
            y: 4,
            tileType: "b"
        },
        {
            x: 4,
            y: 4,
            tileType: "w"
        },
        {
            x: 5,
            y: 4,
            tileType: "b"
        },
        {
            x: 6,
            y: 4,
            tileType: "w"
        },
        {
            x: 7,
            y: 4,
            tileType: "b"
        },
        {
            x: 0,
            y: 5,
            tileType: "b"
        },
        {
            x: 1,
            y: 5,
            tileType: "w"
        },
        {
            x: 2,
            y: 5,
            tileType: "b"
        },
        {
            x: 3,
            y: 5,
            tileType: "w"
        },
        {
            x: 4,
            y: 5,
            tileType: "b"
        },
        {
            x: 5,
            y: 5,
            tileType: "w"
        },
        {
            x: 6,
            y: 5,
            tileType: "b"
        },
        {
            x: 7,
            y: 5,
            tileType: "w"
        },
        {
            x: 0,
            y: 6,
            tileType: "w"
        },
        {
            x: 1,
            y: 6,
            tileType: "b"
        },
        {
            x: 2,
            y: 6,
            tileType: "w"
        },
        {
            x: 3,
            y: 6,
            tileType: "b"
        },
        {
            x: 4,
            y: 6,
            tileType: "w"
        },
        {
            x: 5,
            y: 6,
            tileType: "b"
        },
        {
            x: 6,
            y: 6,
            tileType: "w"
        },
        {
            x: 7,
            y: 6,
            tileType: "b"
        },
        {
            x: 0,
            y: 7,
            tileType: "b"
        },
        {
            x: 1,
            y: 7,
            tileType: "w"
        },
        {
            x: 2,
            y: 7,
            tileType: "b"
        },
        {
            x: 3,
            y: 7,
            tileType: "w"
        },
        {
            x: 4,
            y: 7,
            tileType: "b"
        },
        {
            x: 5,
            y: 7,
            tileType: "w"
        },
        {
            x: 6,
            y: 7,
            tileType: "b"
        },
        {
            x: 7,
            y: 7,
            tileType: "w"
        }
    ], j3 = [
        {
            owner: 0,
            x: 4,
            y: 0,
            pieceType: "k"
        },
        {
            owner: 1,
            x: 4,
            y: 7,
            pieceType: "k"
        },
        {
            owner: 1,
            x: 0,
            y: 7,
            pieceType: "r"
        },
        {
            owner: 1,
            x: 7,
            y: 7,
            pieceType: "r"
        },
        {
            owner: 0,
            x: 7,
            y: 0,
            pieceType: "r"
        },
        {
            owner: 0,
            x: 0,
            y: 0,
            pieceType: "r"
        },
        {
            owner: 0,
            x: 7,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 6,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 5,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 4,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 3,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 2,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 1,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 0,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 7,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 6,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 5,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 4,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 3,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 2,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 1,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 0,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 3,
            y: 7,
            pieceType: "q"
        },
        {
            owner: 1,
            x: 6,
            y: 7,
            pieceType: "n"
        },
        {
            owner: 1,
            x: 1,
            y: 7,
            pieceType: "n"
        },
        {
            owner: 0,
            x: 1,
            y: 0,
            pieceType: "n"
        },
        {
            owner: 0,
            x: 6,
            y: 0,
            pieceType: "n"
        },
        {
            owner: 0,
            x: 2,
            y: 0,
            pieceType: "b"
        },
        {
            owner: 0,
            x: 5,
            y: 0,
            pieceType: "b"
        },
        {
            owner: 1,
            x: 5,
            y: 7,
            pieceType: "b"
        },
        {
            owner: 1,
            x: 2,
            y: 7,
            pieceType: "b"
        },
        {
            owner: 0,
            x: 3,
            y: 0,
            pieceType: "q"
        }
    ], E3 = {}, C3 = {
        width: T3,
        height: S3,
        toMove: _3,
        tiles: N3,
        pieces: j3,
        movementPatterns: E3
    }, A3 = 5, R3 = 6, M3 = 0, O3 = [
        {
            x: 0,
            y: 0,
            tileType: "w"
        },
        {
            x: 1,
            y: 0,
            tileType: "b"
        },
        {
            x: 2,
            y: 0,
            tileType: "w"
        },
        {
            x: 3,
            y: 0,
            tileType: "b"
        },
        {
            x: 4,
            y: 0,
            tileType: "w"
        },
        {
            x: 0,
            y: 1,
            tileType: "b"
        },
        {
            x: 1,
            y: 1,
            tileType: "w"
        },
        {
            x: 2,
            y: 1,
            tileType: "b"
        },
        {
            x: 3,
            y: 1,
            tileType: "w"
        },
        {
            x: 4,
            y: 1,
            tileType: "b"
        },
        {
            x: 0,
            y: 2,
            tileType: "w"
        },
        {
            x: 1,
            y: 2,
            tileType: "b"
        },
        {
            x: 2,
            y: 2,
            tileType: "w"
        },
        {
            x: 3,
            y: 2,
            tileType: "b"
        },
        {
            x: 4,
            y: 2,
            tileType: "w"
        },
        {
            x: 0,
            y: 3,
            tileType: "b"
        },
        {
            x: 1,
            y: 3,
            tileType: "w"
        },
        {
            x: 2,
            y: 3,
            tileType: "b"
        },
        {
            x: 3,
            y: 3,
            tileType: "w"
        },
        {
            x: 4,
            y: 3,
            tileType: "b"
        },
        {
            x: 0,
            y: 4,
            tileType: "w"
        },
        {
            x: 1,
            y: 4,
            tileType: "b"
        },
        {
            x: 2,
            y: 4,
            tileType: "w"
        },
        {
            x: 3,
            y: 4,
            tileType: "b"
        },
        {
            x: 4,
            y: 4,
            tileType: "w"
        },
        {
            x: 0,
            y: 5,
            tileType: "b"
        },
        {
            x: 1,
            y: 5,
            tileType: "w"
        },
        {
            x: 2,
            y: 5,
            tileType: "b"
        },
        {
            x: 3,
            y: 5,
            tileType: "w"
        },
        {
            x: 4,
            y: 5,
            tileType: "b"
        }
    ], D3 = [
        {
            owner: 0,
            x: 0,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 1,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 2,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 3,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 4,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 2,
            y: 0,
            pieceType: "k"
        },
        {
            owner: 0,
            x: 1,
            y: 0,
            pieceType: "b"
        },
        {
            owner: 0,
            x: 3,
            y: 0,
            pieceType: "n"
        },
        {
            owner: 0,
            x: 4,
            y: 0,
            pieceType: "r"
        },
        {
            owner: 0,
            x: 0,
            y: 0,
            pieceType: "r"
        },
        {
            owner: 1,
            x: 0,
            y: 5,
            pieceType: "r"
        },
        {
            owner: 1,
            x: 4,
            y: 5,
            pieceType: "r"
        },
        {
            owner: 1,
            x: 3,
            y: 5,
            pieceType: "b"
        },
        {
            owner: 1,
            x: 1,
            y: 5,
            pieceType: "n"
        },
        {
            owner: 1,
            x: 2,
            y: 5,
            pieceType: "k"
        },
        {
            owner: 1,
            x: 4,
            y: 4,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 3,
            y: 4,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 1,
            y: 4,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 0,
            y: 4,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 2,
            y: 4,
            pieceType: "p"
        }
    ], z3 = {}, U3 = {
        width: A3,
        height: R3,
        toMove: M3,
        tiles: O3,
        pieces: D3,
        movementPatterns: z3
    }, L3 = 4, H3 = 5, k3 = 0, B3 = [
        {
            x: 0,
            y: 0,
            tileType: "w"
        },
        {
            x: 1,
            y: 0,
            tileType: "b"
        },
        {
            x: 2,
            y: 0,
            tileType: "w"
        },
        {
            x: 3,
            y: 0,
            tileType: "b"
        },
        {
            x: 0,
            y: 1,
            tileType: "b"
        },
        {
            x: 1,
            y: 1,
            tileType: "w"
        },
        {
            x: 2,
            y: 1,
            tileType: "b"
        },
        {
            x: 3,
            y: 1,
            tileType: "w"
        },
        {
            x: 0,
            y: 2,
            tileType: "w"
        },
        {
            x: 1,
            y: 2,
            tileType: "b"
        },
        {
            x: 2,
            y: 2,
            tileType: "w"
        },
        {
            x: 3,
            y: 2,
            tileType: "b"
        },
        {
            x: 0,
            y: 3,
            tileType: "b"
        },
        {
            x: 1,
            y: 3,
            tileType: "w"
        },
        {
            x: 2,
            y: 3,
            tileType: "b"
        },
        {
            x: 3,
            y: 3,
            tileType: "w"
        },
        {
            x: 0,
            y: 4,
            tileType: "w"
        },
        {
            x: 1,
            y: 4,
            tileType: "b"
        },
        {
            x: 2,
            y: 4,
            tileType: "w"
        },
        {
            x: 3,
            y: 4,
            tileType: "b"
        }
    ], q3 = [
        {
            owner: 0,
            x: 0,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 1,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 2,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 3,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 1,
            y: 0,
            pieceType: "b"
        },
        {
            owner: 0,
            x: 0,
            y: 0,
            pieceType: "r"
        },
        {
            owner: 1,
            x: 0,
            y: 3,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 1,
            y: 3,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 2,
            y: 3,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 3,
            y: 3,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 0,
            y: 4,
            pieceType: "k"
        },
        {
            owner: 1,
            x: 1,
            y: 4,
            pieceType: "n"
        },
        {
            owner: 1,
            x: 2,
            y: 4,
            pieceType: "b"
        },
        {
            owner: 1,
            x: 3,
            y: 4,
            pieceType: "r"
        },
        {
            owner: 0,
            x: 2,
            y: 0,
            pieceType: "n"
        },
        {
            owner: 0,
            x: 3,
            y: 0,
            pieceType: "k"
        }
    ], G3 = {}, Y3 = {
        width: L3,
        height: H3,
        toMove: k3,
        tiles: B3,
        pieces: q3,
        movementPatterns: G3
    }, V3 = 9, X3 = 9, Q3 = 0, Z3 = [
        {
            x: 0,
            y: 0,
            tileType: "w"
        },
        {
            x: 1,
            y: 0,
            tileType: "b"
        },
        {
            x: 2,
            y: 0,
            tileType: "w"
        },
        {
            x: 3,
            y: 0,
            tileType: "b"
        },
        {
            x: 4,
            y: 0,
            tileType: "w"
        },
        {
            x: 5,
            y: 0,
            tileType: "b"
        },
        {
            x: 6,
            y: 0,
            tileType: "w"
        },
        {
            x: 7,
            y: 0,
            tileType: "b"
        },
        {
            x: 8,
            y: 0,
            tileType: "w"
        },
        {
            x: 0,
            y: 1,
            tileType: "b"
        },
        {
            x: 1,
            y: 1,
            tileType: "w"
        },
        {
            x: 2,
            y: 1,
            tileType: "b"
        },
        {
            x: 3,
            y: 1,
            tileType: "w"
        },
        {
            x: 4,
            y: 1,
            tileType: "b"
        },
        {
            x: 5,
            y: 1,
            tileType: "w"
        },
        {
            x: 6,
            y: 1,
            tileType: "b"
        },
        {
            x: 7,
            y: 1,
            tileType: "w"
        },
        {
            x: 8,
            y: 1,
            tileType: "b"
        },
        {
            x: 0,
            y: 2,
            tileType: "w"
        },
        {
            x: 1,
            y: 2,
            tileType: "b"
        },
        {
            x: 2,
            y: 2,
            tileType: "w"
        },
        {
            x: 3,
            y: 2,
            tileType: "b"
        },
        {
            x: 4,
            y: 2,
            tileType: "w"
        },
        {
            x: 5,
            y: 2,
            tileType: "b"
        },
        {
            x: 6,
            y: 2,
            tileType: "w"
        },
        {
            x: 7,
            y: 2,
            tileType: "b"
        },
        {
            x: 8,
            y: 2,
            tileType: "w"
        },
        {
            x: 0,
            y: 3,
            tileType: "b"
        },
        {
            x: 1,
            y: 3,
            tileType: "w"
        },
        {
            x: 2,
            y: 3,
            tileType: "b"
        },
        {
            x: 3,
            y: 3,
            tileType: "w"
        },
        {
            x: 4,
            y: 3,
            tileType: "b"
        },
        {
            x: 5,
            y: 3,
            tileType: "w"
        },
        {
            x: 6,
            y: 3,
            tileType: "b"
        },
        {
            x: 7,
            y: 3,
            tileType: "w"
        },
        {
            x: 8,
            y: 3,
            tileType: "b"
        },
        {
            x: 0,
            y: 4,
            tileType: "w"
        },
        {
            x: 1,
            y: 4,
            tileType: "b"
        },
        {
            x: 2,
            y: 4,
            tileType: "w"
        },
        {
            x: 3,
            y: 4,
            tileType: "b"
        },
        {
            x: 4,
            y: 4,
            tileType: "w"
        },
        {
            x: 5,
            y: 4,
            tileType: "b"
        },
        {
            x: 6,
            y: 4,
            tileType: "w"
        },
        {
            x: 7,
            y: 4,
            tileType: "b"
        },
        {
            x: 8,
            y: 4,
            tileType: "w"
        },
        {
            x: 0,
            y: 5,
            tileType: "b"
        },
        {
            x: 1,
            y: 5,
            tileType: "w"
        },
        {
            x: 2,
            y: 5,
            tileType: "b"
        },
        {
            x: 3,
            y: 5,
            tileType: "w"
        },
        {
            x: 4,
            y: 5,
            tileType: "b"
        },
        {
            x: 5,
            y: 5,
            tileType: "w"
        },
        {
            x: 6,
            y: 5,
            tileType: "b"
        },
        {
            x: 7,
            y: 5,
            tileType: "w"
        },
        {
            x: 8,
            y: 5,
            tileType: "b"
        },
        {
            x: 0,
            y: 6,
            tileType: "w"
        },
        {
            x: 1,
            y: 6,
            tileType: "b"
        },
        {
            x: 2,
            y: 6,
            tileType: "w"
        },
        {
            x: 3,
            y: 6,
            tileType: "b"
        },
        {
            x: 4,
            y: 6,
            tileType: "w"
        },
        {
            x: 5,
            y: 6,
            tileType: "b"
        },
        {
            x: 6,
            y: 6,
            tileType: "w"
        },
        {
            x: 7,
            y: 6,
            tileType: "b"
        },
        {
            x: 8,
            y: 6,
            tileType: "w"
        },
        {
            x: 0,
            y: 7,
            tileType: "b"
        },
        {
            x: 1,
            y: 7,
            tileType: "w"
        },
        {
            x: 2,
            y: 7,
            tileType: "b"
        },
        {
            x: 3,
            y: 7,
            tileType: "w"
        },
        {
            x: 4,
            y: 7,
            tileType: "b"
        },
        {
            x: 5,
            y: 7,
            tileType: "w"
        },
        {
            x: 6,
            y: 7,
            tileType: "b"
        },
        {
            x: 7,
            y: 7,
            tileType: "w"
        },
        {
            x: 8,
            y: 7,
            tileType: "b"
        },
        {
            x: 0,
            y: 8,
            tileType: "w"
        },
        {
            x: 1,
            y: 8,
            tileType: "b"
        },
        {
            x: 2,
            y: 8,
            tileType: "w"
        },
        {
            x: 3,
            y: 8,
            tileType: "b"
        },
        {
            x: 4,
            y: 8,
            tileType: "w"
        },
        {
            x: 5,
            y: 8,
            tileType: "b"
        },
        {
            x: 6,
            y: 8,
            tileType: "w"
        },
        {
            x: 7,
            y: 8,
            tileType: "b"
        },
        {
            x: 8,
            y: 8,
            tileType: "w"
        }
    ], K3 = [
        {
            owner: 0,
            x: 0,
            y: 0,
            pieceType: "r"
        },
        {
            owner: 0,
            x: 8,
            y: 0,
            pieceType: "r"
        },
        {
            owner: 0,
            x: 2,
            y: 0,
            pieceType: "b"
        },
        {
            owner: 0,
            x: 7,
            y: 0,
            pieceType: "b"
        },
        {
            owner: 0,
            x: 6,
            y: 0,
            pieceType: "n"
        },
        {
            owner: 0,
            x: 1,
            y: 0,
            pieceType: "n"
        },
        {
            owner: 0,
            x: 5,
            y: 0,
            pieceType: "q"
        },
        {
            owner: 0,
            x: 3,
            y: 0,
            pieceType: "q"
        },
        {
            owner: 0,
            x: 4,
            y: 0,
            pieceType: "k"
        },
        {
            owner: 1,
            x: 4,
            y: 8,
            pieceType: "k"
        },
        {
            owner: 1,
            x: 3,
            y: 8,
            pieceType: "q"
        },
        {
            owner: 1,
            x: 5,
            y: 8,
            pieceType: "q"
        },
        {
            owner: 1,
            x: 6,
            y: 8,
            pieceType: "n"
        },
        {
            owner: 1,
            x: 8,
            y: 7,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 7,
            y: 7,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 6,
            y: 7,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 5,
            y: 7,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 4,
            y: 7,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 3,
            y: 7,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 2,
            y: 7,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 1,
            y: 7,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 0,
            y: 7,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 8,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 7,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 6,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 5,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 4,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 3,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 2,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 1,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 0,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 7,
            y: 8,
            pieceType: "b"
        },
        {
            owner: 1,
            x: 2,
            y: 8,
            pieceType: "b"
        },
        {
            owner: 1,
            x: 1,
            y: 8,
            pieceType: "n"
        },
        {
            owner: 1,
            x: 8,
            y: 8,
            pieceType: "r"
        },
        {
            owner: 1,
            x: 0,
            y: 8,
            pieceType: "r"
        }
    ], J3 = {}, $3 = {
        width: V3,
        height: X3,
        toMove: Q3,
        tiles: Z3,
        pieces: K3,
        movementPatterns: J3
    }, W3 = 8, F3 = 8, I3 = 0, P3 = [
        {
            x: 0,
            y: 0,
            tileType: "w"
        },
        {
            x: 1,
            y: 0,
            tileType: "b"
        },
        {
            x: 2,
            y: 0,
            tileType: "w"
        },
        {
            x: 3,
            y: 0,
            tileType: "b"
        },
        {
            x: 4,
            y: 0,
            tileType: "w"
        },
        {
            x: 5,
            y: 0,
            tileType: "b"
        },
        {
            x: 6,
            y: 0,
            tileType: "w"
        },
        {
            x: 7,
            y: 0,
            tileType: "b"
        },
        {
            x: 0,
            y: 1,
            tileType: "b"
        },
        {
            x: 1,
            y: 1,
            tileType: "w"
        },
        {
            x: 2,
            y: 1,
            tileType: "b"
        },
        {
            x: 3,
            y: 1,
            tileType: "w"
        },
        {
            x: 4,
            y: 1,
            tileType: "b"
        },
        {
            x: 5,
            y: 1,
            tileType: "w"
        },
        {
            x: 6,
            y: 1,
            tileType: "b"
        },
        {
            x: 7,
            y: 1,
            tileType: "w"
        },
        {
            x: 0,
            y: 2,
            tileType: "w"
        },
        {
            x: 1,
            y: 2,
            tileType: "b"
        },
        {
            x: 2,
            y: 2,
            tileType: "w"
        },
        {
            x: 3,
            y: 2,
            tileType: "b"
        },
        {
            x: 4,
            y: 2,
            tileType: "w"
        },
        {
            x: 5,
            y: 2,
            tileType: "b"
        },
        {
            x: 6,
            y: 2,
            tileType: "w"
        },
        {
            x: 7,
            y: 2,
            tileType: "b"
        },
        {
            x: 0,
            y: 3,
            tileType: "b"
        },
        {
            x: 1,
            y: 3,
            tileType: "w"
        },
        {
            x: 2,
            y: 3,
            tileType: "x"
        },
        {
            x: 3,
            y: 3,
            tileType: "w"
        },
        {
            x: 4,
            y: 3,
            tileType: "b"
        },
        {
            x: 5,
            y: 3,
            tileType: "x"
        },
        {
            x: 6,
            y: 3,
            tileType: "b"
        },
        {
            x: 7,
            y: 3,
            tileType: "w"
        },
        {
            x: 0,
            y: 4,
            tileType: "w"
        },
        {
            x: 1,
            y: 4,
            tileType: "b"
        },
        {
            x: 2,
            y: 4,
            tileType: "x"
        },
        {
            x: 3,
            y: 4,
            tileType: "b"
        },
        {
            x: 4,
            y: 4,
            tileType: "w"
        },
        {
            x: 5,
            y: 4,
            tileType: "x"
        },
        {
            x: 6,
            y: 4,
            tileType: "w"
        },
        {
            x: 7,
            y: 4,
            tileType: "b"
        },
        {
            x: 0,
            y: 5,
            tileType: "b"
        },
        {
            x: 1,
            y: 5,
            tileType: "w"
        },
        {
            x: 2,
            y: 5,
            tileType: "b"
        },
        {
            x: 3,
            y: 5,
            tileType: "w"
        },
        {
            x: 4,
            y: 5,
            tileType: "b"
        },
        {
            x: 5,
            y: 5,
            tileType: "w"
        },
        {
            x: 6,
            y: 5,
            tileType: "b"
        },
        {
            x: 7,
            y: 5,
            tileType: "w"
        },
        {
            x: 0,
            y: 6,
            tileType: "w"
        },
        {
            x: 1,
            y: 6,
            tileType: "b"
        },
        {
            x: 2,
            y: 6,
            tileType: "w"
        },
        {
            x: 3,
            y: 6,
            tileType: "b"
        },
        {
            x: 4,
            y: 6,
            tileType: "w"
        },
        {
            x: 5,
            y: 6,
            tileType: "b"
        },
        {
            x: 6,
            y: 6,
            tileType: "w"
        },
        {
            x: 7,
            y: 6,
            tileType: "b"
        },
        {
            x: 0,
            y: 7,
            tileType: "b"
        },
        {
            x: 1,
            y: 7,
            tileType: "w"
        },
        {
            x: 2,
            y: 7,
            tileType: "b"
        },
        {
            x: 3,
            y: 7,
            tileType: "w"
        },
        {
            x: 4,
            y: 7,
            tileType: "b"
        },
        {
            x: 5,
            y: 7,
            tileType: "w"
        },
        {
            x: 6,
            y: 7,
            tileType: "b"
        },
        {
            x: 7,
            y: 7,
            tileType: "w"
        }
    ], ev = [
        {
            owner: 0,
            x: 4,
            y: 0,
            pieceType: "k"
        },
        {
            owner: 1,
            x: 4,
            y: 7,
            pieceType: "k"
        },
        {
            owner: 1,
            x: 0,
            y: 7,
            pieceType: "r"
        },
        {
            owner: 1,
            x: 7,
            y: 7,
            pieceType: "r"
        },
        {
            owner: 0,
            x: 7,
            y: 0,
            pieceType: "r"
        },
        {
            owner: 0,
            x: 0,
            y: 0,
            pieceType: "r"
        },
        {
            owner: 0,
            x: 7,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 6,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 5,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 4,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 3,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 2,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 1,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 0,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 7,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 6,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 5,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 4,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 3,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 2,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 1,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 0,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 3,
            y: 7,
            pieceType: "q"
        },
        {
            owner: 1,
            x: 6,
            y: 7,
            pieceType: "n"
        },
        {
            owner: 1,
            x: 1,
            y: 7,
            pieceType: "n"
        },
        {
            owner: 0,
            x: 1,
            y: 0,
            pieceType: "n"
        },
        {
            owner: 0,
            x: 6,
            y: 0,
            pieceType: "n"
        },
        {
            owner: 0,
            x: 2,
            y: 0,
            pieceType: "b"
        },
        {
            owner: 0,
            x: 5,
            y: 0,
            pieceType: "b"
        },
        {
            owner: 1,
            x: 5,
            y: 7,
            pieceType: "b"
        },
        {
            owner: 1,
            x: 2,
            y: 7,
            pieceType: "b"
        },
        {
            owner: 0,
            x: 3,
            y: 0,
            pieceType: "q"
        }
    ], tv = {}, lv = {
        width: W3,
        height: F3,
        toMove: I3,
        tiles: P3,
        pieces: ev,
        movementPatterns: tv
    }, av = 8, nv = 8, iv = 0, sv = [
        {
            x: 0,
            y: 0,
            tileType: "w"
        },
        {
            x: 1,
            y: 0,
            tileType: "b"
        },
        {
            x: 2,
            y: 0,
            tileType: "w"
        },
        {
            x: 3,
            y: 0,
            tileType: "b"
        },
        {
            x: 4,
            y: 0,
            tileType: "w"
        },
        {
            x: 5,
            y: 0,
            tileType: "b"
        },
        {
            x: 6,
            y: 0,
            tileType: "w"
        },
        {
            x: 7,
            y: 0,
            tileType: "b"
        },
        {
            x: 0,
            y: 1,
            tileType: "b"
        },
        {
            x: 1,
            y: 1,
            tileType: "w"
        },
        {
            x: 2,
            y: 1,
            tileType: "b"
        },
        {
            x: 3,
            y: 1,
            tileType: "w"
        },
        {
            x: 4,
            y: 1,
            tileType: "b"
        },
        {
            x: 5,
            y: 1,
            tileType: "w"
        },
        {
            x: 6,
            y: 1,
            tileType: "b"
        },
        {
            x: 7,
            y: 1,
            tileType: "w"
        },
        {
            x: 0,
            y: 2,
            tileType: "w"
        },
        {
            x: 1,
            y: 2,
            tileType: "b"
        },
        {
            x: 2,
            y: 2,
            tileType: "w"
        },
        {
            x: 3,
            y: 2,
            tileType: "b"
        },
        {
            x: 4,
            y: 2,
            tileType: "w"
        },
        {
            x: 5,
            y: 2,
            tileType: "b"
        },
        {
            x: 6,
            y: 2,
            tileType: "w"
        },
        {
            x: 7,
            y: 2,
            tileType: "b"
        },
        {
            x: 0,
            y: 3,
            tileType: "b"
        },
        {
            x: 1,
            y: 3,
            tileType: "w"
        },
        {
            x: 2,
            y: 3,
            tileType: "b"
        },
        {
            x: 3,
            y: 3,
            tileType: "w"
        },
        {
            x: 4,
            y: 3,
            tileType: "b"
        },
        {
            x: 5,
            y: 3,
            tileType: "w"
        },
        {
            x: 6,
            y: 3,
            tileType: "b"
        },
        {
            x: 7,
            y: 3,
            tileType: "w"
        },
        {
            x: 0,
            y: 4,
            tileType: "w"
        },
        {
            x: 1,
            y: 4,
            tileType: "b"
        },
        {
            x: 2,
            y: 4,
            tileType: "w"
        },
        {
            x: 3,
            y: 4,
            tileType: "b"
        },
        {
            x: 4,
            y: 4,
            tileType: "w"
        },
        {
            x: 5,
            y: 4,
            tileType: "b"
        },
        {
            x: 6,
            y: 4,
            tileType: "w"
        },
        {
            x: 7,
            y: 4,
            tileType: "b"
        },
        {
            x: 0,
            y: 5,
            tileType: "b"
        },
        {
            x: 1,
            y: 5,
            tileType: "w"
        },
        {
            x: 2,
            y: 5,
            tileType: "b"
        },
        {
            x: 3,
            y: 5,
            tileType: "w"
        },
        {
            x: 4,
            y: 5,
            tileType: "b"
        },
        {
            x: 5,
            y: 5,
            tileType: "w"
        },
        {
            x: 6,
            y: 5,
            tileType: "b"
        },
        {
            x: 7,
            y: 5,
            tileType: "w"
        },
        {
            x: 0,
            y: 6,
            tileType: "w"
        },
        {
            x: 1,
            y: 6,
            tileType: "b"
        },
        {
            x: 2,
            y: 6,
            tileType: "w"
        },
        {
            x: 3,
            y: 6,
            tileType: "b"
        },
        {
            x: 4,
            y: 6,
            tileType: "w"
        },
        {
            x: 5,
            y: 6,
            tileType: "b"
        },
        {
            x: 6,
            y: 6,
            tileType: "w"
        },
        {
            x: 7,
            y: 6,
            tileType: "b"
        },
        {
            x: 0,
            y: 7,
            tileType: "b"
        },
        {
            x: 1,
            y: 7,
            tileType: "w"
        },
        {
            x: 2,
            y: 7,
            tileType: "b"
        },
        {
            x: 3,
            y: 7,
            tileType: "w"
        },
        {
            x: 4,
            y: 7,
            tileType: "b"
        },
        {
            x: 5,
            y: 7,
            tileType: "w"
        },
        {
            x: 6,
            y: 7,
            tileType: "b"
        },
        {
            x: 7,
            y: 7,
            tileType: "w"
        }
    ], cv = [
        {
            owner: 1,
            x: 2,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 3,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 4,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 7,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 6,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 5,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 1,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 0,
            y: 6,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 0,
            y: 5,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 1,
            y: 5,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 2,
            y: 5,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 3,
            y: 5,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 4,
            y: 5,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 5,
            y: 5,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 6,
            y: 5,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 7,
            y: 5,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 7,
            y: 4,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 6,
            y: 4,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 5,
            y: 4,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 4,
            y: 4,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 3,
            y: 4,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 2,
            y: 4,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 1,
            y: 4,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 0,
            y: 4,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 4,
            y: 7,
            pieceType: "k"
        },
        {
            owner: 1,
            x: 4,
            y: 3,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 3,
            y: 3,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 3,
            y: 7,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 2,
            y: 7,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 1,
            y: 7,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 0,
            y: 7,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 5,
            y: 7,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 6,
            y: 7,
            pieceType: "p"
        },
        {
            owner: 1,
            x: 7,
            y: 7,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 7,
            y: 0,
            pieceType: "q"
        },
        {
            owner: 0,
            x: 6,
            y: 0,
            pieceType: "q"
        },
        {
            owner: 0,
            x: 5,
            y: 0,
            pieceType: "q"
        },
        {
            owner: 0,
            x: 2,
            y: 0,
            pieceType: "q"
        },
        {
            owner: 0,
            x: 1,
            y: 0,
            pieceType: "q"
        },
        {
            owner: 0,
            x: 0,
            y: 0,
            pieceType: "q"
        },
        {
            owner: 0,
            x: 3,
            y: 0,
            pieceType: "q"
        },
        {
            owner: 0,
            x: 4,
            y: 0,
            pieceType: "k"
        },
        {
            owner: 0,
            x: 7,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 5,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 4,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 3,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 2,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 0,
            y: 1,
            pieceType: "p"
        },
        {
            owner: 0,
            x: 1,
            y: 1,
            pieceType: "q"
        },
        {
            owner: 0,
            x: 6,
            y: 1,
            pieceType: "q"
        },
        {
            owner: 0,
            x: 7,
            y: 2,
            pieceType: "q"
        },
        {
            owner: 0,
            x: 0,
            y: 2,
            pieceType: "q"
        }
    ], uv = {}, rv = {
        width: av,
        height: nv,
        toMove: iv,
        tiles: sv,
        pieces: cv,
        movementPatterns: uv
    }, oi = [
        {
            id: "standard",
            name: "Standard Chess",
            description: "Classic 8x8 chess with all standard pieces",
            state: C3
        },
        {
            id: "mini",
            name: "Mini Chess",
            description: "A smaller 6x6 variant for quicker games",
            state: U3
        },
        {
            id: "micro",
            name: "Micro Chess",
            description: "Tiny 4x5 board for fast-paced play",
            state: Y3
        },
        {
            id: "big",
            name: "Big Chess",
            description: "Expanded 10x10 board with extra pieces",
            state: $3
        },
        {
            id: "holy",
            name: "Holy Chess",
            description: "Standard chess with holes in the board",
            state: lv
        },
        {
            id: "pawn_storm",
            name: "Pawn Storm",
            description: "All pawns, no other pieces except kings",
            state: rv
        }
    ], Zs = oi[0];
    let vr = null;
    function ov() {
        return vr || (vr = new AudioContext), vr;
    }
    async function $s() {
        const s = ov();
        return s.state === "suspended" && await s.resume(), s;
    }
    async function jr() {
        try {
            const s = await $s(), u = s.currentTime, o = s.createOscillator(), r = s.createGain();
            o.connect(r), r.connect(s.destination), o.type = "sine", o.frequency.setValueAtTime(800, u), o.frequency.exponentialRampToValueAtTime(300, u + .05), r.gain.setValueAtTime(.3, u), r.gain.exponentialRampToValueAtTime(.01, u + .08), o.start(u), o.stop(u + .1);
        } catch (s) {
            console.debug("Audio not available:", s);
        }
    }
    async function Er() {
        try {
            const s = await $s(), u = s.currentTime, o = s.createOscillator(), r = s.createGain();
            o.connect(r), r.connect(s.destination), o.type = "sine", o.frequency.setValueAtTime(600, u), o.frequency.exponentialRampToValueAtTime(150, u + .08), r.gain.setValueAtTime(.35, u), r.gain.exponentialRampToValueAtTime(.01, u + .12), o.start(u), o.stop(u + .15);
        } catch (s) {
            console.debug("Audio not available:", s);
        }
    }
    async function km() {
        try {
            const s = await $s(), u = s.currentTime;
            for(let o = 0; o < 2; o++){
                const r = s.createOscillator(), d = s.createGain();
                r.connect(d), d.connect(s.destination), r.type = "sine", r.frequency.setValueAtTime(880, u + o * .1), d.gain.setValueAtTime(.2, u + o * .1), d.gain.exponentialRampToValueAtTime(.01, u + o * .1 + .05), r.start(u + o * .1), r.stop(u + o * .1 + .08);
            }
        } catch (s) {
            console.debug("Audio not available:", s);
        }
    }
    async function Cr(s) {
        try {
            const u = await $s(), o = u.currentTime;
            (s ? [
                523,
                659,
                784,
                1047
            ] : [
                400,
                350,
                300,
                250
            ]).forEach((d, m)=>{
                const p = u.createOscillator(), b = u.createGain();
                p.connect(b), b.connect(u.destination), p.type = "sine", p.frequency.setValueAtTime(d, o + m * .15), b.gain.setValueAtTime(.2, o + m * .15), b.gain.exponentialRampToValueAtTime(.01, o + m * .15 + .12), p.start(o + m * .15), p.stop(o + m * .15 + .15);
            });
        } catch (u) {
            console.debug("Audio not available:", u);
        }
    }
    const fv = "/api";
    async function nt(s, u = {}) {
        const o = _l.getState().token, r = {
            ...u.headers || {}
        };
        o && (r.Authorization = `Bearer ${o}`), u.body && typeof u.body == "string" && (r["Content-Type"] = "application/json");
        const d = await fetch(`${fv}${s}`, {
            ...u,
            headers: r
        });
        if (!d.ok) {
            const m = await d.text();
            throw new Error(m || `API error: ${d.status}`);
        }
        return d;
    }
    function Hr(s) {
        const u = s.game_state;
        return {
            id: s.id,
            name: s.name,
            description: s.description,
            author: s.author,
            boardWidth: s.board_width,
            boardHeight: s.board_height,
            pieceCount: s.piece_count,
            likeCount: s.like_count,
            commentCount: s.comment_count,
            liked: s.liked,
            gameState: Um(u),
            createdAt: s.created_at,
            updatedAt: s.updated_at
        };
    }
    function Bm(s) {
        return {
            id: s.id,
            author: s.author,
            content: s.content,
            createdAt: s.created_at
        };
    }
    async function dv(s, u, o) {
        const r = {
            username: s,
            password: u
        };
        return o && (r.email = o), (await nt("/auth/register", {
            method: "POST",
            body: JSON.stringify(r)
        })).json();
    }
    async function hv(s, u) {
        return (await nt("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                username: s,
                password: u
            })
        })).json();
    }
    async function mv() {
        return (await nt("/auth/me")).json();
    }
    async function pv(s = {}) {
        const u = new URLSearchParams;
        for (const [m, p] of Object.entries(s))p != null && p !== "" && u.set(m, String(p));
        const o = u.toString(), d = await (await nt(`/variants${o ? `?${o}` : ""}`)).json();
        return {
            variants: d.variants.map(Hr),
            nextCursor: d.next_cursor
        };
    }
    async function kr(s) {
        const o = await (await nt(`/variants/${s}`)).json();
        return Hr(o);
    }
    async function xv(s, u, o) {
        const r = {
            width: o.width,
            height: o.height,
            to_move: o.toMove,
            tiles: o.tiles.map((p)=>({
                    x: p.x,
                    y: p.y,
                    tile_type: p.tileType
                })),
            pieces: o.pieces.map((p)=>({
                    owner: p.owner,
                    x: p.x,
                    y: p.y,
                    piece_type: p.pieceType
                })),
            movement_patterns: o.movementPatterns
        }, m = await (await nt("/variants", {
            method: "POST",
            body: JSON.stringify({
                name: s,
                description: u,
                game_state: r
            })
        })).json();
        return Hr(m);
    }
    async function yv(s, u) {
        await nt(`/variants/${s}`, {
            method: "PUT",
            body: JSON.stringify(u)
        });
    }
    async function bv(s) {
        await nt(`/variants/${s}`, {
            method: "DELETE"
        });
    }
    async function qm(s) {
        const o = await (await nt(`/variants/${s}/like`, {
            method: "POST"
        })).json();
        return {
            likeCount: o.like_count,
            liked: o.liked
        };
    }
    async function Gm(s) {
        const o = await (await nt(`/variants/${s}/like`, {
            method: "DELETE"
        })).json();
        return {
            likeCount: o.like_count,
            liked: o.liked
        };
    }
    async function dm(s, u = {}) {
        const o = new URLSearchParams;
        u.cursor && o.set("cursor", u.cursor), u.limit && o.set("limit", String(u.limit));
        const r = o.toString(), m = await (await nt(`/variants/${s}/comments${r ? `?${r}` : ""}`)).json();
        return {
            comments: m.comments.map(Bm),
            nextCursor: m.next_cursor
        };
    }
    async function vv(s, u) {
        const r = await (await nt(`/variants/${s}/comments`, {
            method: "POST",
            body: JSON.stringify({
                content: u
            })
        })).json();
        return Bm(r);
    }
    async function gv(s) {
        await nt(`/comments/${s}`, {
            method: "DELETE"
        });
    }
    async function wv(s) {
        return (await nt("/auth/set-email", {
            method: "POST",
            body: JSON.stringify({
                email: s
            })
        })).json();
    }
    async function Tv(s) {
        return (await nt("/auth/verify-email", {
            method: "POST",
            body: JSON.stringify({
                token: s
            })
        })).json();
    }
    async function Sv() {
        return (await nt("/auth/resend-verification", {
            method: "POST",
            body: JSON.stringify({})
        })).json();
    }
    async function _v(s) {
        return (await nt("/auth/forgot-password", {
            method: "POST",
            body: JSON.stringify({
                identifier: s
            })
        })).json();
    }
    async function Nv(s, u) {
        return (await nt("/auth/reset-password", {
            method: "POST",
            body: JSON.stringify({
                token: s,
                password: u
            })
        })).json();
    }
    const ln = [
        {
            id: "easy",
            name: "Easy",
            depth: 2,
            color: "#4ecdc4",
            description: "Quick moves, beginner friendly"
        },
        {
            id: "medium",
            name: "Medium",
            depth: 4,
            color: "#ffe66d",
            description: "Balanced gameplay"
        },
        {
            id: "hard",
            name: "Hard",
            depth: 6,
            color: "#ff9f43",
            description: "Challenging opponent"
        },
        {
            id: "max",
            name: "Max",
            depth: 8,
            color: "#ff6b6b",
            description: "Maximum strength"
        }
    ];
    function jv() {
        const s = Ot(), [u] = cn(), { isReady: o, error: r, getState: d, makeMove: m, getMovesFrom: p, playAiMove: b, isInCheck: v, setState: y } = w3(), { setMovesFrom: N, setSelectedSquare: w } = un(), O = Fl(), [V, L] = x.useState(null), [M, R] = x.useState(Zs.state), [X, H] = x.useState(Zs.id), [Y, J] = x.useState("Loading engine..."), [W, ae] = x.useState(null), [P, be] = x.useState(null), [Q, ee] = x.useState(!1), [te, ne] = x.useState(null), [re, xe] = x.useState(!1), [de, S] = x.useState(!1), [z, B] = x.useState("medium"), [K, ie] = x.useState(!1), [T, k] = x.useState(!1), Z = x.useRef(null);
        x.useEffect(()=>{
            const ue = u.get("from");
            if (ue === "editor") {
                const je = O.getGameState();
                je.pieces.length > 0 && (R(je), H("custom"), S(!0));
            } else if (ue === "variant") {
                const je = u.get("id");
                je && kr(Number(je)).then((ot)=>{
                    R(ot.gameState), H("custom"), S(!0);
                }).catch(()=>{});
            }
        }, [
            u,
            O
        ]), x.useEffect(()=>{
            o && !re && J("Select a game variant and click Start Game");
        }, [
            o,
            re
        ]), x.useEffect(()=>{
            r && J(`Error: ${r.message}`);
        }, [
            r
        ]), x.useEffect(()=>{
            const ue = (je)=>{
                Z.current && !Z.current.contains(je.target) && ie(!1);
            };
            return document.addEventListener("mousedown", ue), ()=>document.removeEventListener("mousedown", ue);
        }, []);
        const $ = x.useCallback((ue)=>{
            if (ue === "custom") return;
            const je = oi.find((ot)=>ot.id === ue);
            je && (H(ue), R(je.state), S(!1));
        }, []), se = x.useCallback(()=>{
            if (!o) return;
            if (y(M)) {
                const je = d();
                je && (L(je), xe(!0), J("Your turn (White)"), ne(null), ae(null), be(null));
            } else J("Failed to start game. Please try a different variant.");
        }, [
            o,
            M,
            y,
            d
        ]), fe = x.useCallback(()=>{
            const ue = d();
            if (ue) if (L(ue), v()) {
                const je = ue.pieces.filter((ot)=>ot.pieceType === "k" && ot.owner === ue.toMove);
                be(je);
            } else be(null);
        }, [
            d,
            v
        ]), Ne = x.useCallback((ue, je)=>{
            if (Q || te || !re) return;
            const ot = p(ue, je);
            ot.length > 0 ? (w([
                ue,
                je
            ]), N({
                from: [
                    ue,
                    je
                ],
                to: ot
            })) : (w(null), N(null));
        }, [
            p,
            w,
            N,
            Q,
            te,
            re
        ]), Pe = x.useCallback(async (ue, je)=>{
            if (Q || te || !re || !V) return;
            const ot = V.pieces.some((ye)=>ye.x === je[0] && ye.y === je[1]);
            if (!m(ue[0], ue[1], je[0], je[1])) {
                w(null), N(null);
                return;
            }
            ot ? Er() : jr(), ae({
                from: ue,
                to: je,
                promoteTo: null
            }), w(null), N(null), fe(), v() && J("Checking for checkmate...");
            const Nl = ln.find((ye)=>ye.id === z);
            J(`AI thinking... (${Nl.name})`), ee(!0);
            const F = d();
            if (await b(Nl.depth)) {
                fe();
                const ye = d();
                if (F && ye) {
                    for (const Qe of F.pieces.filter((ft)=>ft.owner === 1))if (!ye.pieces.some((Qt)=>Qt.owner === 1 && Qt.x === Qe.x && Qt.y === Qe.y && Qt.pieceType === Qe.pieceType)) {
                        const Qt = ye.pieces.find((Il)=>Il.owner === 1 && Il.pieceType === Qe.pieceType && !F.pieces.some((tt)=>tt.owner === 1 && tt.x === Il.x && tt.y === Il.y && tt.pieceType === Il.pieceType));
                        if (Qt) {
                            ae({
                                from: [
                                    Qe.x,
                                    Qe.y
                                ],
                                to: [
                                    Qt.x,
                                    Qt.y
                                ],
                                promoteTo: null
                            });
                            break;
                        }
                    }
                }
                const Xt = F;
                if (Xt && ye && Xt.pieces.length > ye.pieces.length ? Er() : jr(), ye && v()) {
                    let Qe = !1;
                    for (const ft of ye.pieces)if (ft.owner === 0 && p(ft.x, ft.y).length > 0) {
                        Qe = !0;
                        break;
                    }
                    if (!Qe) {
                        ne("AI"), J("Checkmate! AI wins."), Cr(!1), ee(!1);
                        return;
                    }
                    km(), J("Check! Your turn.");
                } else J("Your turn");
            } else ne("Player"), J("Checkmate! You win!"), Cr(!0);
            ee(!1);
        }, [
            m,
            b,
            d,
            p,
            v,
            fe,
            w,
            N,
            Q,
            te,
            re,
            V,
            z
        ]), He = x.useCallback(()=>{
            xe(!1), ne(null), ae(null), be(null), L(null), w(null), N(null), J("Select a game variant and click Start Game");
        }, [
            w,
            N
        ]), ll = x.useCallback(()=>{
            O.loadGameState(M), s("/editor");
        }, [
            O,
            M,
            s
        ]);
        return c.jsxs("div", {
            className: "min-h-screen bg-[#f8f9fa] p-4",
            children: [
                c.jsxs("div", {
                    className: "max-w-5xl mx-auto",
                    children: [
                        c.jsxs("div", {
                            className: "flex items-center justify-between mb-6",
                            children: [
                                c.jsx(we, {
                                    to: "/",
                                    className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                    children: "BACK"
                                }),
                                c.jsx("h1", {
                                    className: "text-2xl font-black text-[#2d3436]",
                                    children: "VS AI"
                                }),
                                re ? c.jsxs("div", {
                                    className: "flex gap-2",
                                    children: [
                                        c.jsx("button", {
                                            onClick: ()=>k(!0),
                                            className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-3 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                            title: "How to play",
                                            children: "?"
                                        }),
                                        c.jsx("button", {
                                            onClick: He,
                                            className: "bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                            children: "NEW"
                                        })
                                    ]
                                }) : c.jsx("div", {
                                    className: "w-24"
                                })
                            ]
                        }),
                        c.jsxs("div", {
                            className: "flex flex-col lg:flex-row gap-6 items-start justify-center",
                            children: [
                                c.jsx("div", {
                                    className: "flex-shrink-0",
                                    children: o ? re && V ? c.jsx(ri, {
                                        gameState: V,
                                        playerNum: 0,
                                        flipped: !1,
                                        lastTurn: W,
                                        inCheckKings: P,
                                        onRequestMoves: Ne,
                                        onMove: Pe,
                                        disabled: Q || !!te || V.toMove !== 0
                                    }) : c.jsx(ri, {
                                        gameState: M,
                                        playerNum: 0,
                                        flipped: !1,
                                        disabled: !0
                                    }) : c.jsx("div", {
                                        className: "w-[560px] h-[560px] bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] flex items-center justify-center",
                                        children: c.jsxs("div", {
                                            className: "text-center",
                                            children: [
                                                c.jsx("div", {
                                                    className: "animate-spin w-8 h-8 border-4 border-[#2d3436] border-t-transparent rounded-full mx-auto mb-4"
                                                }),
                                                c.jsx("p", {
                                                    className: "font-bold text-[#636e72]",
                                                    children: "Loading engine..."
                                                })
                                            ]
                                        })
                                    })
                                }),
                                c.jsx("div", {
                                    className: "w-full lg:w-72 space-y-4",
                                    children: re ? c.jsxs(c.Fragment, {
                                        children: [
                                            c.jsxs("div", {
                                                className: `p-4 border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] ${te ? te === "Player" ? "bg-[#4ecdc4]" : "bg-[#ff6b6b]" : Q ? "bg-[#ffe66d]" : P ? "bg-[#ff6b6b]" : "bg-white"}`,
                                                children: [
                                                    c.jsx("h2", {
                                                        className: "font-bold text-[#2d3436] mb-1",
                                                        children: "STATUS"
                                                    }),
                                                    c.jsx("p", {
                                                        className: "text-[#2d3436]",
                                                        children: Y
                                                    }),
                                                    Q && c.jsxs("div", {
                                                        className: "mt-2 flex items-center gap-2",
                                                        children: [
                                                            c.jsx("div", {
                                                                className: "animate-spin w-4 h-4 border-2 border-[#2d3436] border-t-transparent rounded-full"
                                                            }),
                                                            c.jsx("span", {
                                                                className: "text-sm",
                                                                children: "Calculating..."
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            (()=>{
                                                const ue = ln.find((je)=>je.id === z);
                                                return c.jsxs("div", {
                                                    className: "border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                                    style: {
                                                        backgroundColor: ue.color
                                                    },
                                                    children: [
                                                        c.jsx("h2", {
                                                            className: "font-bold text-[#2d3436] mb-1",
                                                            children: "DIFFICULTY"
                                                        }),
                                                        c.jsx("p", {
                                                            className: "text-[#2d3436] font-medium",
                                                            children: ue.name
                                                        }),
                                                        c.jsx("p", {
                                                            className: "text-xs text-[#2d3436] opacity-75",
                                                            children: ue.description
                                                        })
                                                    ]
                                                });
                                            })()
                                        ]
                                    }) : c.jsxs(c.Fragment, {
                                        children: [
                                            c.jsxs("div", {
                                                className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                                children: [
                                                    c.jsx("h2", {
                                                        className: "font-bold text-[#2d3436] mb-4",
                                                        children: "SELECT GAME"
                                                    }),
                                                    c.jsxs("div", {
                                                        className: "space-y-2 max-h-48 overflow-y-auto pr-1",
                                                        children: [
                                                            oi.map((ue)=>c.jsxs("button", {
                                                                    onClick: ()=>$(ue.id),
                                                                    className: `w-full p-2 text-left border-2 border-[#2d3436] transition-colors ${X === ue.id ? "bg-[#4ecdc4]" : "bg-white hover:bg-[#f8f9fa]"}`,
                                                                    children: [
                                                                        c.jsx("div", {
                                                                            className: "font-bold text-sm",
                                                                            children: ue.name
                                                                        }),
                                                                        c.jsxs("div", {
                                                                            className: "text-xs text-[#636e72]",
                                                                            children: [
                                                                                ue.state.width,
                                                                                "×",
                                                                                ue.state.height
                                                                            ]
                                                                        })
                                                                    ]
                                                                }, ue.id)),
                                                            de && c.jsxs("button", {
                                                                onClick: ()=>$("custom"),
                                                                className: `w-full p-2 text-left border-2 border-[#2d3436] transition-colors ${X === "custom" ? "bg-[#ffe66d]" : "bg-white hover:bg-[#f8f9fa]"}`,
                                                                children: [
                                                                    c.jsx("div", {
                                                                        className: "font-bold text-sm",
                                                                        children: "Custom Game"
                                                                    }),
                                                                    c.jsxs("div", {
                                                                        className: "text-xs text-[#636e72]",
                                                                        children: [
                                                                            M.width,
                                                                            "×",
                                                                            M.height,
                                                                            " (from editor)"
                                                                        ]
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            de && X === "custom" && c.jsxs("div", {
                                                className: "bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                                children: [
                                                    c.jsx("h3", {
                                                        className: "font-bold text-[#2d3436] mb-2",
                                                        children: "Custom Game"
                                                    }),
                                                    c.jsxs("p", {
                                                        className: "text-sm text-[#2d3436]",
                                                        children: [
                                                            "Board created in the editor with ",
                                                            M.pieces.length,
                                                            " pieces."
                                                        ]
                                                    })
                                                ]
                                            }),
                                            c.jsxs("div", {
                                                className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                                children: [
                                                    c.jsx("span", {
                                                        className: "font-bold text-[#2d3436] block mb-2",
                                                        children: "AI DIFFICULTY"
                                                    }),
                                                    c.jsxs("div", {
                                                        ref: Z,
                                                        className: "relative",
                                                        children: [
                                                            c.jsxs("button", {
                                                                onClick: ()=>ie(!K),
                                                                className: "w-full p-3 border-3 border-[#2d3436] bg-white font-bold text-[#2d3436] cursor-pointer flex items-center justify-between transition-all hover:bg-[#f8f9fa]",
                                                                style: {
                                                                    backgroundColor: ln.find((ue)=>ue.id === z)?.color
                                                                },
                                                                children: [
                                                                    c.jsxs("span", {
                                                                        children: [
                                                                            ln.find((ue)=>ue.id === z)?.name,
                                                                            c.jsxs("span", {
                                                                                className: "font-normal text-sm ml-2 opacity-75",
                                                                                children: [
                                                                                    "(Depth ",
                                                                                    ln.find((ue)=>ue.id === z)?.depth,
                                                                                    ")"
                                                                                ]
                                                                            })
                                                                        ]
                                                                    }),
                                                                    c.jsx("svg", {
                                                                        className: `w-5 h-5 transition-transform ${K ? "rotate-180" : ""}`,
                                                                        fill: "none",
                                                                        stroke: "currentColor",
                                                                        strokeWidth: "3",
                                                                        viewBox: "0 0 24 24",
                                                                        children: c.jsx("polyline", {
                                                                            points: "6 9 12 15 18 9"
                                                                        })
                                                                    })
                                                                ]
                                                            }),
                                                            K && c.jsx("div", {
                                                                className: "absolute top-full left-0 right-0 mt-1 border-3 border-[#2d3436] bg-white shadow-[4px_4px_0px_#2d3436] z-10",
                                                                children: ln.map((ue)=>c.jsxs("button", {
                                                                        onClick: ()=>{
                                                                            B(ue.id), ie(!1);
                                                                        },
                                                                        className: `w-full p-3 text-left font-bold text-[#2d3436] flex items-center justify-between transition-colors hover:brightness-95 ${z === ue.id ? "border-l-4 border-l-[#2d3436]" : ""}`,
                                                                        style: {
                                                                            backgroundColor: ue.color
                                                                        },
                                                                        children: [
                                                                            c.jsx("span", {
                                                                                children: ue.name
                                                                            }),
                                                                            c.jsxs("span", {
                                                                                className: "font-normal text-sm opacity-75",
                                                                                children: [
                                                                                    "Depth ",
                                                                                    ue.depth
                                                                                ]
                                                                            })
                                                                        ]
                                                                    }, ue.id))
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            c.jsx("button", {
                                                onClick: se,
                                                disabled: !o,
                                                className: "w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                                children: "START GAME"
                                            }),
                                            c.jsx("button", {
                                                onClick: ll,
                                                className: "w-full bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                                children: "CREATE CUSTOM GAME"
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    ]
                }),
                T && c.jsx("div", {
                    className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
                    children: c.jsxs("div", {
                        className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-6 max-w-sm w-full mx-4",
                        children: [
                            c.jsx("h2", {
                                className: "font-bold text-[#2d3436] text-xl mb-4 text-center",
                                children: "HOW TO PLAY"
                            }),
                            c.jsxs("ul", {
                                className: "text-[#636e72] space-y-2 mb-4",
                                children: [
                                    c.jsxs("li", {
                                        className: "flex items-start gap-2",
                                        children: [
                                            c.jsx("span", {
                                                className: "text-[#2d3436]",
                                                children: "•"
                                            }),
                                            c.jsx("span", {
                                                children: "Click a piece to see available moves"
                                            })
                                        ]
                                    }),
                                    c.jsxs("li", {
                                        className: "flex items-start gap-2",
                                        children: [
                                            c.jsx("span", {
                                                className: "text-[#2d3436]",
                                                children: "•"
                                            }),
                                            c.jsx("span", {
                                                children: "Click a highlighted square to move"
                                            })
                                        ]
                                    }),
                                    c.jsxs("li", {
                                        className: "flex items-start gap-2",
                                        children: [
                                            c.jsx("span", {
                                                className: "text-[#2d3436]",
                                                children: "•"
                                            }),
                                            c.jsx("span", {
                                                children: "You play as White, AI plays as Black"
                                            })
                                        ]
                                    }),
                                    c.jsxs("li", {
                                        className: "flex items-start gap-2",
                                        children: [
                                            c.jsx("span", {
                                                className: "text-[#2d3436]",
                                                children: "•"
                                            }),
                                            c.jsx("span", {
                                                children: "Drag and drop also works"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            c.jsx("button", {
                                onClick: ()=>k(!1),
                                className: "w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                children: "GOT IT"
                            })
                        ]
                    })
                })
            ]
        });
    }
    function Ev() {
        const s = Ot(), { sendMessage: u } = Lr(), { connected: o, roomList: r } = un();
        x.useEffect(()=>{
            o && u({
                type: "ListRooms"
            });
        }, [
            o,
            u
        ]);
        const d = (m)=>{
            s(`/room/${m}`);
        };
        return c.jsx("div", {
            className: "min-h-screen bg-[#f8f9fa] p-4",
            children: c.jsxs("div", {
                className: "max-w-2xl mx-auto",
                children: [
                    c.jsxs("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [
                            c.jsx(we, {
                                to: "/",
                                className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                children: "BACK"
                            }),
                            c.jsx("h1", {
                                className: "text-2xl font-black text-[#2d3436]",
                                children: "ONLINE PLAY"
                            }),
                            c.jsx("div", {
                                className: "w-20"
                            })
                        ]
                    }),
                    c.jsx("div", {
                        className: `mb-6 p-3 border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] font-bold ${o ? "bg-[#4ecdc4]" : "bg-[#ff6b6b]"}`,
                        children: o ? "CONNECTED" : "CONNECTING..."
                    }),
                    c.jsx(we, {
                        to: "/create-room",
                        className: `block w-full mb-6 bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] text-center hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all ${o ? "" : "opacity-50 pointer-events-none"}`,
                        children: "CREATE NEW ROOM"
                    }),
                    c.jsxs("div", {
                        className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436]",
                        children: [
                            c.jsx("div", {
                                className: "p-4 border-b-4 border-[#2d3436]",
                                children: c.jsx("h2", {
                                    className: "font-bold text-[#2d3436]",
                                    children: "PUBLIC ROOMS"
                                })
                            }),
                            r.length === 0 ? c.jsx("div", {
                                className: "p-8 text-center text-[#636e72]",
                                children: "No public rooms available. Create one!"
                            }) : c.jsx("div", {
                                className: "divide-y-4 divide-[#2d3436]",
                                children: r.map((m)=>c.jsxs("div", {
                                        className: "p-4 flex items-center justify-between hover:bg-[#f8f9fa] transition-colors",
                                        children: [
                                            c.jsxs("div", {
                                                children: [
                                                    c.jsx("p", {
                                                        className: "font-bold text-[#2d3436]",
                                                        children: m.room_id
                                                    }),
                                                    c.jsxs("div", {
                                                        className: "flex items-center gap-3 text-sm",
                                                        children: [
                                                            c.jsxs("span", {
                                                                className: "text-[#636e72]",
                                                                children: [
                                                                    m.num_clients,
                                                                    " player",
                                                                    m.num_clients !== 1 ? "s" : ""
                                                                ]
                                                            }),
                                                            c.jsxs("span", {
                                                                className: "flex items-center gap-1",
                                                                children: [
                                                                    c.jsx("span", {
                                                                        className: `inline-block w-3 h-3 rounded-full border border-[#2d3436] ${m.white_taken ? "bg-[#ff6b6b]" : "bg-white"}`,
                                                                        title: m.white_taken ? "White taken" : "White available"
                                                                    }),
                                                                    c.jsx("span", {
                                                                        className: `inline-block w-3 h-3 rounded-full border border-[#2d3436] ${m.black_taken ? "bg-[#ff6b6b]" : "bg-[#2d3436]"}`,
                                                                        title: m.black_taken ? "Black taken" : "Black available"
                                                                    })
                                                                ]
                                                            }),
                                                            !m.white_taken && !m.black_taken && c.jsx("span", {
                                                                className: "text-[#4ecdc4] font-medium",
                                                                children: "Both seats open!"
                                                            }),
                                                            m.white_taken && !m.black_taken && c.jsx("span", {
                                                                className: "text-[#636e72]",
                                                                children: "Black open"
                                                            }),
                                                            !m.white_taken && m.black_taken && c.jsx("span", {
                                                                className: "text-[#636e72]",
                                                                children: "White open"
                                                            }),
                                                            m.white_taken && m.black_taken && c.jsx("span", {
                                                                className: "text-[#636e72]",
                                                                children: "Spectate only"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            c.jsx("button", {
                                                onClick: ()=>d(m.room_id),
                                                className: "bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                                children: "JOIN"
                                            })
                                        ]
                                    }, m.room_id))
                            })
                        ]
                    })
                ]
            })
        });
    }
    function Cv() {
        const s = Ot(), [u] = cn(), { sendMessage: o } = Lr(), { connected: r, currentRoom: d } = un(), m = Fl(), [p, b] = x.useState(Zs.state), [v, y] = x.useState(Zs.id), [N, w] = x.useState(!1), [O, V] = x.useState(""), [L, M] = x.useState(!0), [R, X] = x.useState(!1);
        x.useEffect(()=>{
            const W = u.get("from");
            if (W === "editor") {
                const ae = m.getGameState();
                ae.pieces.length > 0 && (b(ae), y("custom"), w(!0));
            } else if (W === "variant") {
                const ae = u.get("id");
                ae && kr(Number(ae)).then((P)=>{
                    b(P.gameState), y("custom"), w(!0);
                }).catch(()=>{});
            }
        }, [
            u,
            m
        ]), x.useEffect(()=>{
            d && s(`/room/${d}`);
        }, [
            d,
            s
        ]);
        const H = x.useCallback((W)=>{
            if (W === "custom") return;
            const ae = oi.find((P)=>P.id === W);
            ae && (y(W), b(ae.state), w(!1));
        }, []), Y = x.useCallback((W)=>{
            r && (o({
                type: "CreateRoom",
                content: {
                    room_name: O.trim() || null,
                    is_public: L,
                    init_game_state: t3(p),
                    seat: W
                }
            }), X(!1));
        }, [
            r,
            o,
            p,
            L,
            O
        ]), J = x.useCallback(()=>{
            m.loadGameState(p), s("/editor?returnTo=create-room");
        }, [
            m,
            p,
            s
        ]);
        return c.jsxs("div", {
            className: "min-h-screen bg-[#f8f9fa] p-4",
            children: [
                c.jsxs("div", {
                    className: "max-w-5xl mx-auto",
                    children: [
                        c.jsxs("div", {
                            className: "flex items-center justify-between mb-6",
                            children: [
                                c.jsx(we, {
                                    to: "/multiplayer",
                                    className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                    children: "BACK"
                                }),
                                c.jsx("h1", {
                                    className: "text-2xl font-black text-[#2d3436]",
                                    children: "CREATE ROOM"
                                }),
                                c.jsx("div", {
                                    className: "w-20"
                                })
                            ]
                        }),
                        !r && c.jsx("div", {
                            className: "mb-6 p-3 border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] font-bold bg-[#ff6b6b]",
                            children: "CONNECTING TO SERVER..."
                        }),
                        c.jsxs("div", {
                            className: "flex flex-col lg:flex-row gap-6 items-start justify-center",
                            children: [
                                c.jsx("div", {
                                    className: "flex-shrink-0",
                                    children: c.jsx(ri, {
                                        gameState: p,
                                        playerNum: 0,
                                        flipped: !1,
                                        disabled: !0
                                    })
                                }),
                                c.jsxs("div", {
                                    className: "w-full lg:w-72 space-y-4",
                                    children: [
                                        c.jsxs("div", {
                                            className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                            children: [
                                                c.jsx("label", {
                                                    className: "font-bold text-[#2d3436] block mb-2",
                                                    children: "ROOM NAME (OPTIONAL)"
                                                }),
                                                c.jsx("input", {
                                                    type: "text",
                                                    value: O,
                                                    onChange: (W)=>V(W.target.value),
                                                    placeholder: "Auto-generated if empty",
                                                    className: "w-full p-2 border-2 border-[#2d3436] font-medium text-[#2d3436] placeholder:text-[#b2bec3] mb-3"
                                                }),
                                                c.jsxs("label", {
                                                    className: "flex items-center gap-3 cursor-pointer",
                                                    children: [
                                                        c.jsx("div", {
                                                            className: `w-10 h-5 border-2 border-[#2d3436] relative transition-colors ${L ? "bg-[#4ecdc4]" : "bg-[#dfe6e9]"}`,
                                                            onClick: ()=>M(!L),
                                                            children: c.jsx("div", {
                                                                className: `absolute top-0 w-3.5 h-3.5 bg-white border-2 border-[#2d3436] transition-all ${L ? "left-5" : "left-0.5"}`
                                                            })
                                                        }),
                                                        c.jsx("span", {
                                                            className: "text-sm text-[#636e72]",
                                                            children: L ? "Public room" : "Private room"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        c.jsxs("div", {
                                            className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                            children: [
                                                c.jsx("h2", {
                                                    className: "font-bold text-[#2d3436] mb-4",
                                                    children: "SELECT GAME"
                                                }),
                                                c.jsxs("div", {
                                                    className: "space-y-2 max-h-48 overflow-y-auto pr-1",
                                                    children: [
                                                        oi.map((W)=>c.jsxs("button", {
                                                                onClick: ()=>H(W.id),
                                                                className: `w-full p-2 text-left border-2 border-[#2d3436] transition-colors ${v === W.id ? "bg-[#4ecdc4]" : "bg-white hover:bg-[#f8f9fa]"}`,
                                                                children: [
                                                                    c.jsx("div", {
                                                                        className: "font-bold text-sm",
                                                                        children: W.name
                                                                    }),
                                                                    c.jsxs("div", {
                                                                        className: "text-xs text-[#636e72]",
                                                                        children: [
                                                                            W.state.width,
                                                                            "x",
                                                                            W.state.height
                                                                        ]
                                                                    })
                                                                ]
                                                            }, W.id)),
                                                        N && c.jsxs("button", {
                                                            onClick: ()=>H("custom"),
                                                            className: `w-full p-2 text-left border-2 border-[#2d3436] transition-colors ${v === "custom" ? "bg-[#ffe66d]" : "bg-white hover:bg-[#f8f9fa]"}`,
                                                            children: [
                                                                c.jsx("div", {
                                                                    className: "font-bold text-sm",
                                                                    children: "Custom Game"
                                                                }),
                                                                c.jsxs("div", {
                                                                    className: "text-xs text-[#636e72]",
                                                                    children: [
                                                                        p.width,
                                                                        "x",
                                                                        p.height,
                                                                        " (from editor)"
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        N && v === "custom" && c.jsxs("div", {
                                            className: "bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                            children: [
                                                c.jsx("h3", {
                                                    className: "font-bold text-[#2d3436] mb-2",
                                                    children: "Custom Game"
                                                }),
                                                c.jsxs("p", {
                                                    className: "text-sm text-[#2d3436]",
                                                    children: [
                                                        "Board created in the editor with ",
                                                        p.pieces.length,
                                                        " pieces."
                                                    ]
                                                })
                                            ]
                                        }),
                                        c.jsx("button", {
                                            onClick: ()=>X(!0),
                                            disabled: !r,
                                            className: "w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                            children: "CREATE ROOM"
                                        }),
                                        c.jsx("button", {
                                            onClick: J,
                                            className: "w-full bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                            children: "CREATE CUSTOM GAME"
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                R && c.jsx("div", {
                    className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50",
                    children: c.jsxs("div", {
                        className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-6 max-w-sm w-full mx-4",
                        children: [
                            c.jsx("h2", {
                                className: "font-bold text-[#2d3436] text-xl mb-4 text-center",
                                children: "SELECT YOUR SEAT"
                            }),
                            c.jsxs("div", {
                                className: "space-y-3",
                                children: [
                                    c.jsxs("button", {
                                        onClick: ()=>Y("white"),
                                        className: "w-full p-3 border-2 border-[#2d3436] font-bold text-[#2d3436] bg-white hover:bg-[#f8f9fa] transition-colors flex items-center gap-3",
                                        children: [
                                            c.jsx("span", {
                                                className: "w-6 h-6 rounded-full bg-white border-2 border-[#2d3436]"
                                            }),
                                            "Play as White"
                                        ]
                                    }),
                                    c.jsxs("button", {
                                        onClick: ()=>Y("black"),
                                        className: "w-full p-3 border-2 border-[#2d3436] font-bold text-white bg-[#2d3436] hover:bg-[#636e72] transition-colors flex items-center gap-3",
                                        children: [
                                            c.jsx("span", {
                                                className: "w-6 h-6 rounded-full bg-[#2d3436] border-2 border-white"
                                            }),
                                            "Play as Black"
                                        ]
                                    }),
                                    c.jsxs("button", {
                                        onClick: ()=>Y("spectator"),
                                        className: "w-full p-3 border-2 border-[#2d3436] font-bold text-[#2d3436] bg-[#dfe6e9] hover:bg-[#b2bec3] transition-colors flex items-center gap-3",
                                        children: [
                                            c.jsxs("svg", {
                                                className: "w-6 h-6",
                                                viewBox: "0 0 24 24",
                                                fill: "none",
                                                stroke: "currentColor",
                                                strokeWidth: "2",
                                                children: [
                                                    c.jsx("path", {
                                                        d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                                    }),
                                                    c.jsx("circle", {
                                                        cx: "12",
                                                        cy: "12",
                                                        r: "3"
                                                    })
                                                ]
                                            }),
                                            "Watch as Spectator"
                                        ]
                                    })
                                ]
                            }),
                            c.jsx("button", {
                                onClick: ()=>X(!1),
                                className: "w-full mt-4 p-2 border-2 border-[#2d3436] font-bold text-[#636e72] hover:bg-[#f8f9fa] transition-colors",
                                children: "Cancel"
                            })
                        ]
                    })
                })
            ]
        });
    }
    function Av() {
        const { roomId: s } = Em(), u = Ot(), { sendMessage: o } = Lr(), { gameInfo: r, playerList: d, currentRoom: m, reset: p } = un(), b = x.useRef(null), [v, y] = x.useState(!1);
        x.useEffect(()=>{
            s && !m && o({
                type: "JoinRoom",
                content: {
                    room_id: s,
                    seat: "spectator"
                }
            });
        }, [
            s,
            m,
            o
        ]);
        const N = x.useCallback((R)=>{
            o({
                type: "SelectSeat",
                content: R
            });
        }, [
            o
        ]);
        x.useEffect(()=>{
            if (!r) return;
            const R = b.current;
            if (R && R.state.toMove !== r.state.toMove) if (r.winner) {
                const X = d && r.winner === d.you;
                Cr(X ?? !1);
            } else if (r.to_move_in_check) km();
            else {
                const X = R.state.pieces.length;
                r.state.pieces.length < X ? Er() : jr();
            }
            b.current = r;
        }, [
            r,
            d
        ]);
        const w = x.useCallback(()=>{
            o({
                type: "LeaveRoom"
            }), p(), u("/multiplayer");
        }, [
            o,
            p,
            u
        ]), O = x.useCallback((R, X)=>{
            o({
                type: "MovesFrom",
                content: [
                    R,
                    X
                ]
            });
        }, [
            o
        ]), V = x.useCallback((R, X)=>{
            o({
                type: "TakeTurn",
                content: l3({
                    from: R,
                    to: X,
                    promoteTo: null
                })
            });
        }, [
            o
        ]), L = r && d && (d.your_seat === "white" && r.state.toMove === 0 || d.your_seat === "black" && r.state.toMove === 1), M = d?.your_seat === "black";
        return c.jsx("div", {
            className: "min-h-screen bg-[#f8f9fa] p-4",
            children: c.jsxs("div", {
                className: "max-w-5xl mx-auto",
                children: [
                    c.jsxs("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [
                            c.jsx("button", {
                                onClick: w,
                                className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                children: "LEAVE"
                            }),
                            c.jsx("h1", {
                                className: "text-xl font-black text-[#2d3436] truncate max-w-[200px]",
                                children: s || "Loading..."
                            }),
                            c.jsx("div", {
                                className: "w-20"
                            })
                        ]
                    }),
                    c.jsxs("div", {
                        className: "flex flex-col lg:flex-row gap-6 items-start justify-center",
                        children: [
                            c.jsx("div", {
                                className: "flex-shrink-0",
                                children: r ? c.jsx(ri, {
                                    gameState: r.state,
                                    playerNum: d?.your_seat === "black" ? 1 : 0,
                                    flipped: M,
                                    lastTurn: r.last_turn,
                                    inCheckKings: r.in_check_kings,
                                    onRequestMoves: O,
                                    onMove: V,
                                    disabled: !L
                                }) : c.jsx("div", {
                                    className: "w-[600px] h-[600px] bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] flex items-center justify-center",
                                    children: c.jsx("p", {
                                        className: "font-bold text-[#636e72]",
                                        children: "Loading game..."
                                    })
                                })
                            }),
                            c.jsxs("div", {
                                className: "w-full lg:w-72 space-y-4",
                                children: [
                                    c.jsxs("div", {
                                        className: `p-4 border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] ${r?.winner ? "bg-[#ffe66d]" : L ? "bg-[#4ecdc4]" : "bg-white"}`,
                                        children: [
                                            c.jsx("h2", {
                                                className: "font-bold text-[#2d3436] mb-1",
                                                children: "STATUS"
                                            }),
                                            r?.winner ? c.jsxs("p", {
                                                className: "text-[#2d3436]",
                                                children: [
                                                    c.jsx("span", {
                                                        className: "font-bold",
                                                        children: r.winner
                                                    }),
                                                    " wins!"
                                                ]
                                            }) : r?.to_move_in_check ? c.jsx("p", {
                                                className: "text-[#ff6b6b] font-bold",
                                                children: "CHECK!"
                                            }) : L ? c.jsx("p", {
                                                className: "text-[#2d3436] font-bold",
                                                children: "Your turn"
                                            }) : c.jsx("p", {
                                                className: "text-[#636e72]",
                                                children: "Waiting for opponent..."
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                        children: [
                                            c.jsx("h2", {
                                                className: "font-bold text-[#2d3436] mb-3",
                                                children: "YOUR SEAT"
                                            }),
                                            d ? c.jsx("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    "white",
                                                    "black",
                                                    "spectator"
                                                ].map((R)=>{
                                                    const X = d.your_seat === R, H = R !== "spectator" && d.players.some((Y)=>Y.seat === R && Y.name !== d.you);
                                                    return c.jsxs("button", {
                                                        onClick: ()=>!H && N(R),
                                                        disabled: H,
                                                        className: `flex-1 p-2 border-2 border-[#2d3436] font-bold text-xs transition-colors ${X ? R === "white" ? "bg-white text-[#2d3436] ring-2 ring-[#4ecdc4]" : R === "black" ? "bg-[#2d3436] text-white ring-2 ring-[#4ecdc4]" : "bg-[#4ecdc4] text-[#2d3436]" : H ? "bg-[#ff6b6b] text-white cursor-not-allowed opacity-60" : "bg-[#dfe6e9] text-[#636e72] hover:bg-[#b2bec3]"}`,
                                                        children: [
                                                            c.jsx("span", {
                                                                className: "flex justify-center mb-1",
                                                                children: R === "white" ? c.jsx("span", {
                                                                    className: "w-4 h-4 rounded-full bg-white border-2 border-[#2d3436]"
                                                                }) : R === "black" ? c.jsx("span", {
                                                                    className: "w-4 h-4 rounded-full bg-[#2d3436]"
                                                                }) : c.jsxs("svg", {
                                                                    className: "w-4 h-4",
                                                                    viewBox: "0 0 24 24",
                                                                    fill: "none",
                                                                    stroke: "currentColor",
                                                                    strokeWidth: "2",
                                                                    children: [
                                                                        c.jsx("path", {
                                                                            d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                                                        }),
                                                                        c.jsx("circle", {
                                                                            cx: "12",
                                                                            cy: "12",
                                                                            r: "3"
                                                                        })
                                                                    ]
                                                                })
                                                            }),
                                                            R.toUpperCase()
                                                        ]
                                                    }, R);
                                                })
                                            }) : c.jsx("p", {
                                                className: "text-[#636e72]",
                                                children: "Loading..."
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                        children: [
                                            c.jsx("h2", {
                                                className: "font-bold text-[#2d3436] mb-2",
                                                children: "PLAYERS"
                                            }),
                                            d ? c.jsx("ul", {
                                                className: "space-y-2",
                                                children: d.players.map((R)=>c.jsxs("li", {
                                                        className: `flex items-center gap-2 ${R.name === d.you ? "font-bold" : ""}`,
                                                        children: [
                                                            R.seat === "spectator" ? c.jsxs("svg", {
                                                                className: "w-3 h-3 text-[#636e72]",
                                                                viewBox: "0 0 24 24",
                                                                fill: "none",
                                                                stroke: "currentColor",
                                                                strokeWidth: "2",
                                                                children: [
                                                                    c.jsx("path", {
                                                                        d: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"
                                                                    }),
                                                                    c.jsx("circle", {
                                                                        cx: "12",
                                                                        cy: "12",
                                                                        r: "3"
                                                                    })
                                                                ]
                                                            }) : c.jsx("span", {
                                                                className: `w-3 h-3 rounded-full ${R.seat === "white" ? "bg-white border-2 border-[#2d3436]" : "bg-[#2d3436]"}`
                                                            }),
                                                            c.jsxs("span", {
                                                                className: "truncate flex-1",
                                                                children: [
                                                                    R.name,
                                                                    R.name === d.you && " (you)"
                                                                ]
                                                            })
                                                        ]
                                                    }, R.name))
                                            }) : c.jsx("p", {
                                                className: "text-[#636e72]",
                                                children: "Loading..."
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        className: "bg-[#f8f9fa] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                        children: [
                                            c.jsx("h2", {
                                                className: "font-bold text-[#2d3436] mb-2",
                                                children: "SHARE"
                                            }),
                                            c.jsxs("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    c.jsx("input", {
                                                        type: "text",
                                                        readOnly: !0,
                                                        value: window.location.href,
                                                        className: "flex-1 min-w-0 p-2 text-sm text-[#636e72] bg-white border-2 border-[#2d3436] truncate",
                                                        onClick: (R)=>R.target.select()
                                                    }),
                                                    c.jsx("button", {
                                                        onClick: ()=>{
                                                            navigator.clipboard.writeText(window.location.href), y(!0), setTimeout(()=>y(!1), 2e3);
                                                        },
                                                        className: "px-3 py-2 bg-[#4ecdc4] border-2 border-[#2d3436] font-bold text-sm text-[#2d3436] hover:bg-[#45b7aa] transition-colors whitespace-nowrap",
                                                        children: v ? "COPIED!" : "COPY"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        });
    }
    const gr = 560;
    function Rv() {
        const { width: s, height: u, tiles: o, pieces: r, currentTool: d, toggleTile: m, placePiece: p, removePiece: b } = Fl(), [v, y] = x.useState(!1), [N, w] = x.useState(new Set), O = x.useRef(null), V = x.useCallback((Q)=>{
            Q.preventDefault();
        }, []), L = Math.max(s, u), M = Math.floor(gr / L), R = M * s, X = M * u, H = x.useCallback((Q, ee)=>{
            if (!O.current) return null;
            const te = O.current.getBoundingClientRect(), ne = Math.floor((Q - te.left) / M), re = u - 1 - Math.floor((ee - te.top) / M);
            return ne < 0 || ne >= s || re < 0 || re >= u ? null : {
                x: ne,
                y: re
            };
        }, [
            M,
            s,
            u
        ]), Y = x.useCallback((Q, ee, te)=>{
            if (te.button === 0) {
                if (d === "toggleTile") {
                    m(Q, ee), y(!0), w(new Set([
                        `${Q},${ee}`
                    ]));
                    return;
                }
                p(Q, ee), y(!0), w(new Set([
                    `${Q},${ee}`
                ]));
            }
        }, [
            d,
            p,
            m
        ]), J = x.useCallback((Q)=>{
            if (!v) return;
            const ee = H(Q.clientX, Q.clientY);
            if (!ee) return;
            const te = `${ee.x},${ee.y}`;
            N.has(te) || (d === "toggleTile" ? m(ee.x, ee.y) : p(ee.x, ee.y), w((ne)=>new Set(ne).add(te)));
        }, [
            v,
            d,
            H,
            p,
            m,
            N
        ]), W = x.useCallback(()=>{
            y(!1), w(new Set);
        }, []), ae = x.useCallback(()=>{
            y(!1), w(new Set);
        }, []), P = x.useCallback((Q)=>{
            Q.preventDefault(), Q.dataTransfer.dropEffect = "copy";
        }, []), be = x.useCallback((Q)=>{
            Q.preventDefault();
            const ee = Q.dataTransfer.getData("application/json");
            if (ee) try {
                const { pieceType: te, owner: ne } = JSON.parse(ee), re = H(Q.clientX, Q.clientY);
                if (!re) return;
                const xe = Fl.getState(), de = xe.selectedPieceType, S = xe.selectedOwner;
                xe.setSelectedPieceType(te), xe.setSelectedOwner(ne), xe.placePiece(re.x, re.y), xe.setSelectedPieceType(de), xe.setSelectedOwner(S);
            } catch  {}
        }, [
            H
        ]);
        return c.jsx("div", {
            className: "flex items-center justify-center",
            style: {
                width: gr,
                height: gr
            },
            onContextMenu: V,
            onMouseMove: J,
            onMouseUp: W,
            onMouseLeave: ae,
            children: c.jsx("div", {
                className: "border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436]",
                children: c.jsxs("div", {
                    ref: O,
                    className: "relative select-none",
                    style: {
                        width: R,
                        height: X
                    },
                    onDragOver: P,
                    onDrop: be,
                    children: [
                        o.map((Q)=>{
                            const ee = Q.x, te = u - 1 - Q.y, ne = (Q.x + Q.y) % 2 === 1;
                            let re;
                            return Q.tileType === "x" ? re = Mt.DISABLED : re = ne ? Mt.SQUARE_LIGHT : Mt.SQUARE_DARK, c.jsxs("div", {
                                className: "absolute cursor-pointer transition-colors hover:brightness-110",
                                style: {
                                    left: ee * M,
                                    top: te * M,
                                    width: M,
                                    height: M,
                                    backgroundColor: re
                                },
                                onMouseDown: (xe)=>Y(Q.x, Q.y, xe),
                                onContextMenu: (xe)=>{
                                    xe.preventDefault(), b(Q.x, Q.y);
                                },
                                children: [
                                    Q.y === 0 && c.jsx("span", {
                                        className: "absolute bottom-1 right-1 text-[10px] font-bold opacity-50 pointer-events-none",
                                        children: String.fromCharCode(97 + Q.x)
                                    }),
                                    Q.x === 0 && c.jsx("span", {
                                        className: "absolute top-1 left-1 text-[10px] font-bold opacity-50 pointer-events-none",
                                        children: Q.y + 1
                                    })
                                ]
                            }, `${Q.x}-${Q.y}`);
                        }),
                        r.map((Q, ee)=>{
                            const te = Q.x, ne = u - 1 - Q.y, re = Q.owner === 0 ? "white" : "black";
                            return c.jsx("div", {
                                className: "absolute pointer-events-none flex items-center justify-center",
                                style: {
                                    left: te * M,
                                    top: ne * M,
                                    width: M,
                                    height: M
                                },
                                children: c.jsx("img", {
                                    src: `/images/chess_pieces/${re}/${Q.pieceType.toLowerCase()}.svg`,
                                    alt: `${re} ${Q.pieceType}`,
                                    className: "w-[85%] h-[85%] object-contain drop-shadow-md",
                                    draggable: !1
                                })
                            }, `piece-${ee}-${Q.x}-${Q.y}`);
                        }),
                        r.length === 0 && c.jsx("div", {
                            className: "absolute inset-0 flex items-center justify-center pointer-events-none",
                            children: c.jsx("div", {
                                className: "bg-white/90 px-4 py-2 border-2 border-[#2d3436]",
                                children: c.jsx("p", {
                                    className: "text-[#636e72] font-medium",
                                    children: "Click to place pieces"
                                })
                            })
                        })
                    ]
                })
            })
        });
    }
    const Ym = x.memo(function({ gameState: u, size: o = 150 }) {
        const { width: r, height: d } = u, m = Math.max(r, d), p = Math.floor(o / m), b = p * r, v = p * d;
        return c.jsx("div", {
            className: "flex items-center justify-center",
            style: {
                width: o,
                height: o
            },
            children: c.jsx("div", {
                className: "border-2 border-[#2d3436]",
                children: c.jsxs("div", {
                    className: "relative",
                    style: {
                        width: b,
                        height: v
                    },
                    children: [
                        u.tiles.map((y)=>{
                            const N = y.x, w = d - 1 - y.y;
                            let V = (y.x + y.y) % 2 === 1 ? Mt.SQUARE_LIGHT : Mt.SQUARE_DARK;
                            return y.tileType === "x" && (V = Mt.DISABLED), c.jsx("div", {
                                className: "absolute",
                                style: {
                                    left: N * p,
                                    top: w * p,
                                    width: p,
                                    height: p,
                                    backgroundColor: V
                                }
                            }, `${y.x}-${y.y}`);
                        }),
                        u.pieces.map((y, N)=>{
                            const w = y.x, O = d - 1 - y.y, V = y.owner === 0 ? "white" : "black";
                            return c.jsx("div", {
                                className: "absolute flex items-center justify-center",
                                style: {
                                    left: w * p,
                                    top: O * p,
                                    width: p,
                                    height: p
                                },
                                children: c.jsx("img", {
                                    src: `/images/chess_pieces/${V}/${y.pieceType.toLowerCase()}.svg`,
                                    alt: "",
                                    className: "w-[85%] h-[85%] object-contain",
                                    draggable: !1
                                })
                            }, `piece-${N}`);
                        })
                    ]
                })
            })
        });
    }), hm = {
        k: "King",
        q: "Queen",
        r: "Rook",
        b: "Bishop",
        n: "Knight",
        p: "Pawn"
    };
    function Mv({ pieces: s, selectedPiece: u, onSelect: o, owner: r }) {
        const d = r === 0 ? "white" : "black", m = x.useRef(new Map), p = x.useCallback((b, v)=>{
            b.dataTransfer.setData("application/json", JSON.stringify({
                pieceType: v,
                owner: r
            })), b.dataTransfer.effectAllowed = "copy";
            const y = m.current.get(v);
            y && b.dataTransfer.setDragImage(y, 25, 25);
        }, [
            r
        ]);
        return c.jsx("div", {
            className: "grid grid-cols-3 gap-2",
            children: s.map((b)=>c.jsx("button", {
                    onClick: ()=>o(b),
                    draggable: !0,
                    onDragStart: (v)=>p(v, b),
                    className: `aspect-square border-2 border-[#2d3436] p-1 flex flex-col items-center justify-center cursor-grab active:cursor-grabbing ${u === b ? "bg-[#4ecdc4]" : "bg-white hover:bg-[#f8f9fa]"}`,
                    title: `${hm[b] || b.toUpperCase()} - Drag to board`,
                    children: c.jsx("img", {
                        ref: (v)=>{
                            v && m.current.set(b, v);
                        },
                        src: `/images/chess_pieces/${d}/${b}.svg`,
                        alt: hm[b] || b,
                        className: "w-full h-full object-contain pointer-events-none"
                    })
                }, b))
        });
    }
    const Ov = [
        {
            key: "north",
            label: "N",
            dx: 0,
            dy: 1
        },
        {
            key: "south",
            label: "S",
            dx: 0,
            dy: -1
        },
        {
            key: "east",
            label: "E",
            dx: 1,
            dy: 0
        },
        {
            key: "west",
            label: "W",
            dx: -1,
            dy: 0
        },
        {
            key: "northeast",
            label: "NE",
            dx: 1,
            dy: 1
        },
        {
            key: "northwest",
            label: "NW",
            dx: -1,
            dy: 1
        },
        {
            key: "southeast",
            label: "SE",
            dx: 1,
            dy: -1
        },
        {
            key: "southwest",
            label: "SW",
            dx: -1,
            dy: -1
        }
    ], Us = {
        north: c.jsx("svg", {
            viewBox: "0 0 24 24",
            className: "w-6 h-6",
            fill: "currentColor",
            children: c.jsx("path", {
                d: "M12 4l-8 8h5v8h6v-8h5z"
            })
        }),
        south: c.jsx("svg", {
            viewBox: "0 0 24 24",
            className: "w-6 h-6",
            fill: "currentColor",
            children: c.jsx("path", {
                d: "M12 20l8-8h-5V4H9v8H4z"
            })
        }),
        east: c.jsx("svg", {
            viewBox: "0 0 24 24",
            className: "w-6 h-6",
            fill: "currentColor",
            children: c.jsx("path", {
                d: "M20 12l-8-8v5H4v6h8v5z"
            })
        }),
        west: c.jsx("svg", {
            viewBox: "0 0 24 24",
            className: "w-6 h-6",
            fill: "currentColor",
            children: c.jsx("path", {
                d: "M4 12l8 8v-5h8V9h-8V4z"
            })
        }),
        northeast: c.jsx("svg", {
            viewBox: "0 0 24 24",
            className: "w-6 h-6",
            fill: "currentColor",
            children: c.jsx("path", {
                d: "M6 18L18 6M18 6v10M18 6H8",
                strokeWidth: "3",
                stroke: "currentColor",
                fill: "none",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            })
        }),
        northwest: c.jsx("svg", {
            viewBox: "0 0 24 24",
            className: "w-6 h-6",
            fill: "currentColor",
            children: c.jsx("path", {
                d: "M18 18L6 6M6 6v10M6 6h10",
                strokeWidth: "3",
                stroke: "currentColor",
                fill: "none",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            })
        }),
        southeast: c.jsx("svg", {
            viewBox: "0 0 24 24",
            className: "w-6 h-6",
            fill: "currentColor",
            children: c.jsx("path", {
                d: "M6 6l12 12M18 18V8M18 18H8",
                strokeWidth: "3",
                stroke: "currentColor",
                fill: "none",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            })
        }),
        southwest: c.jsx("svg", {
            viewBox: "0 0 24 24",
            className: "w-6 h-6",
            fill: "currentColor",
            children: c.jsx("path", {
                d: "M18 6L6 18M6 18V8M6 18h10",
                strokeWidth: "3",
                stroke: "currentColor",
                fill: "none",
                strokeLinecap: "round",
                strokeLinejoin: "round"
            })
        })
    };
    function Ls(s) {
        switch(s){
            case 0:
                return "bg-white text-[#2d3436]";
            case 1:
                return "bg-red-400 text-white";
            case 2:
                return "bg-green-500 text-white";
            case 3:
                return "bg-purple-500 text-white";
        }
    }
    function Dv({ pieceType: s, onClose: u }) {
        const { movementPatterns: o, setMovementPattern: r } = Fl(), d = Gs.includes(s), m = o[s], [p, b] = x.useState(m || fm()), [v, y] = x.useState(!0), [N, w] = x.useState(!1), [O, V] = x.useState(9), L = Math.floor(O / 2), M = x.useCallback((Q, ee)=>{
            const te = Q - L, ne = L - ee;
            te === 0 && ne === 0 || !v && !N || b((re)=>{
                const xe = {
                    ...re
                };
                if (v) {
                    const de = [
                        ...re.attackJumps
                    ], S = de.findIndex(([z, B])=>z === te && B === ne);
                    S >= 0 ? de.splice(S, 1) : de.push([
                        te,
                        ne
                    ]), xe.attackJumps = de;
                }
                if (N) {
                    const de = [
                        ...re.translateJumps
                    ], S = de.findIndex(([z, B])=>z === te && B === ne);
                    S >= 0 ? de.splice(S, 1) : de.push([
                        te,
                        ne
                    ]), xe.translateJumps = de;
                }
                return xe;
            });
        }, [
            v,
            N,
            L
        ]), R = x.useCallback((Q)=>{
            const ee = p.attackSlides[Q], te = p.translateSlides[Q];
            return ee && te ? 3 : ee ? 1 : te ? 2 : 0;
        }, [
            p.attackSlides,
            p.translateSlides
        ]), X = x.useCallback((Q)=>{
            b((ee)=>{
                const ne = (R(Q) + 1) % 4;
                return {
                    ...ee,
                    attackSlides: {
                        ...ee.attackSlides,
                        [Q]: ne === 1 || ne === 3
                    },
                    translateSlides: {
                        ...ee.translateSlides,
                        [Q]: ne === 2 || ne === 3
                    }
                };
            });
        }, [
            R
        ]), H = x.useCallback(()=>{
            r(s, p), u();
        }, [
            s,
            p,
            r,
            u
        ]), Y = x.useCallback(()=>{
            b(fm());
        }, []), J = (Q, ee)=>p.attackJumps.some(([te, ne])=>te === Q && ne === ee), W = (Q, ee)=>p.translateJumps.some(([te, ne])=>te === Q && ne === ee), ae = (Q)=>{
            const ee = Q ? p.attackSlides : p.translateSlides, te = [];
            return Ov.forEach(({ key: ne, dx: re, dy: xe })=>{
                if (ee[ne]) for(let de = 1; de < L + 1; de++)te.push([
                    L + re * de,
                    L - xe * de
                ]);
            }), te;
        }, P = ae(!0), be = ae(!1);
        return c.jsx("div", {
            className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
            children: c.jsxs("div", {
                className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] max-w-4xl w-full max-h-[90vh] overflow-y-auto",
                children: [
                    c.jsxs("div", {
                        className: "flex items-center justify-between p-4 border-b-4 border-[#2d3436]",
                        children: [
                            c.jsxs("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    c.jsx("img", {
                                        src: `/images/chess_pieces/white/${s}.svg`,
                                        alt: s,
                                        className: "w-12 h-12"
                                    }),
                                    c.jsx("h2", {
                                        className: "text-xl font-black text-[#2d3436]",
                                        children: d ? `Edit ${s.toUpperCase()} (Standard)` : `Custom Piece: ${s.toUpperCase()}`
                                    })
                                ]
                            }),
                            c.jsx("button", {
                                onClick: u,
                                className: "w-10 h-10 bg-[#ff6b6b] border-2 border-[#2d3436] font-bold text-xl hover:bg-red-400",
                                children: "×"
                            })
                        ]
                    }),
                    c.jsx("div", {
                        className: "p-4 flex flex-col items-center",
                        children: c.jsx("div", {
                            className: "w-fit",
                            children: c.jsxs("div", {
                                className: "flex flex-col lg:flex-row gap-6",
                                children: [
                                    c.jsxs("div", {
                                        className: "flex-shrink-0",
                                        style: {
                                            width: 360
                                        },
                                        children: [
                                            c.jsxs("div", {
                                                className: "mb-3 flex items-center gap-3 w-full",
                                                children: [
                                                    c.jsxs("label", {
                                                        className: "text-sm font-medium text-[#636e72] whitespace-nowrap",
                                                        children: [
                                                            "Grid: ",
                                                            O,
                                                            "×",
                                                            O
                                                        ]
                                                    }),
                                                    c.jsx("input", {
                                                        type: "range",
                                                        min: 5,
                                                        max: 15,
                                                        step: 2,
                                                        value: O,
                                                        onChange: (Q)=>V(Number(Q.target.value)),
                                                        className: "flex-1 accent-[#4ecdc4]"
                                                    })
                                                ]
                                            }),
                                            c.jsx("div", {
                                                className: "grid bg-[#2d3436]",
                                                style: {
                                                    gridTemplateColumns: `repeat(${O}, 1fr)`,
                                                    gridTemplateRows: `repeat(${O}, 1fr)`,
                                                    gap: 2,
                                                    padding: 2,
                                                    width: 360,
                                                    height: 360
                                                },
                                                children: Array.from({
                                                    length: O * O
                                                }).map((Q, ee)=>{
                                                    const te = ee % O, ne = Math.floor(ee / O), re = te - L, xe = L - ne, de = re === 0 && xe === 0, S = J(re, xe), z = W(re, xe), B = P.some(([T, k])=>T === te && k === ne), K = be.some(([T, k])=>T === te && k === ne);
                                                    let ie = "bg-white";
                                                    return de ? ie = "bg-[#ffe66d]" : S && z ? ie = "bg-purple-400" : S ? ie = "bg-red-400" : z ? ie = "bg-green-400" : B && K ? ie = "bg-purple-200" : B ? ie = "bg-red-200" : K && (ie = "bg-green-200"), c.jsx("button", {
                                                        onClick: ()=>M(te, ne),
                                                        disabled: de,
                                                        className: `${ie} ${de ? "cursor-default" : "hover:brightness-90 cursor-pointer"} flex items-center justify-center text-xs font-bold`,
                                                        children: de && c.jsx("img", {
                                                            src: `/images/chess_pieces/white/${s}.svg`,
                                                            alt: s,
                                                            className: "w-full h-full p-0.5"
                                                        })
                                                    }, ee);
                                                })
                                            }),
                                            c.jsxs("div", {
                                                className: "mt-3 flex flex-wrap justify-center gap-3 text-xs",
                                                children: [
                                                    c.jsxs("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            c.jsx("div", {
                                                                className: "w-3 h-3 bg-red-400 border border-[#2d3436]"
                                                            }),
                                                            c.jsx("span", {
                                                                children: "Attack"
                                                            })
                                                        ]
                                                    }),
                                                    c.jsxs("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            c.jsx("div", {
                                                                className: "w-3 h-3 bg-green-400 border border-[#2d3436]"
                                                            }),
                                                            c.jsx("span", {
                                                                children: "Move"
                                                            })
                                                        ]
                                                    }),
                                                    c.jsxs("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            c.jsx("div", {
                                                                className: "w-3 h-3 bg-purple-400 border border-[#2d3436]"
                                                            }),
                                                            c.jsx("span", {
                                                                children: "Both"
                                                            })
                                                        ]
                                                    }),
                                                    c.jsxs("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            c.jsx("div", {
                                                                className: "w-3 h-3 bg-red-200 border border-[#2d3436]"
                                                            }),
                                                            c.jsx("span", {
                                                                children: "Slide (A)"
                                                            })
                                                        ]
                                                    }),
                                                    c.jsxs("div", {
                                                        className: "flex items-center gap-1",
                                                        children: [
                                                            c.jsx("div", {
                                                                className: "w-3 h-3 bg-green-200 border border-[#2d3436]"
                                                            }),
                                                            c.jsx("span", {
                                                                children: "Slide (M)"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            c.jsxs("div", {
                                                className: "mt-4 flex gap-3 items-stretch",
                                                children: [
                                                    c.jsx("div", {
                                                        className: "flex-1 bg-[#ffe66d] border-2 border-[#2d3436] shadow-[3px_3px_0px_#2d3436] px-3 py-2",
                                                        children: c.jsxs("p", {
                                                            className: "text-xs text-[#2d3436]",
                                                            children: [
                                                                c.jsx("span", {
                                                                    className: "font-bold",
                                                                    children: "Jump"
                                                                }),
                                                                " = Jump to a square (Knight Move)",
                                                                c.jsx("br", {}),
                                                                c.jsx("span", {
                                                                    className: "font-bold",
                                                                    children: "Slide"
                                                                }),
                                                                " = Slide along a line until blocked",
                                                                c.jsx("br", {}),
                                                                c.jsx("span", {
                                                                    className: "font-bold",
                                                                    children: "Attack"
                                                                }),
                                                                " = Capture a piece at a square",
                                                                c.jsx("br", {}),
                                                                c.jsx("span", {
                                                                    className: "font-bold",
                                                                    children: "Move"
                                                                }),
                                                                " = Move to an empty square"
                                                            ]
                                                        })
                                                    }),
                                                    c.jsxs("div", {
                                                        className: "flex flex-col gap-2",
                                                        children: [
                                                            c.jsx("button", {
                                                                onClick: H,
                                                                className: `px-4 py-2 font-bold text-sm border-2 border-[#2d3436] bg-[#4ecdc4] shadow-[3px_3px_0px_#2d3436]
                        transition-all duration-100 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none
                        hover:brightness-105`,
                                                                children: "SAVE"
                                                            }),
                                                            c.jsx("button", {
                                                                onClick: Y,
                                                                className: `px-4 py-2 font-bold text-sm border-2 border-[#2d3436] bg-white shadow-[3px_3px_0px_#2d3436]
                        transition-all duration-100 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none
                        hover:bg-[#f8f9fa]`,
                                                                children: "RESET"
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        className: "w-56 space-y-4",
                                        children: [
                                            c.jsxs("div", {
                                                className: "bg-[#f8f9fa] border-2 border-[#2d3436] p-4",
                                                children: [
                                                    c.jsx("h3", {
                                                        className: "font-bold text-[#2d3436] mb-1 text-center",
                                                        children: "JUMP MOVES"
                                                    }),
                                                    c.jsx("p", {
                                                        className: "text-xs text-[#636e72] text-center mb-3",
                                                        children: "Toggle modes, then click squares on the grid"
                                                    }),
                                                    c.jsxs("div", {
                                                        className: "space-y-2",
                                                        children: [
                                                            c.jsxs("button", {
                                                                onClick: ()=>y(!v),
                                                                className: `w-full p-2 text-center text-sm font-medium border-2 border-[#2d3436] transition-colors ${v && N ? "bg-purple-500 text-white" : v ? "bg-red-400 text-white" : "bg-white"}`,
                                                                children: [
                                                                    "Attack ",
                                                                    v ? "✓" : ""
                                                                ]
                                                            }),
                                                            c.jsxs("button", {
                                                                onClick: ()=>w(!N),
                                                                className: `w-full p-2 text-center text-sm font-medium border-2 border-[#2d3436] transition-colors ${v && N ? "bg-purple-500 text-white" : N ? "bg-green-500 text-white" : "bg-white"}`,
                                                                children: [
                                                                    "Move ",
                                                                    N ? "✓" : ""
                                                                ]
                                                            })
                                                        ]
                                                    }),
                                                    !v && !N && c.jsx("p", {
                                                        className: "text-xs text-red-500 text-center mt-2",
                                                        children: "Enable at least one mode"
                                                    })
                                                ]
                                            }),
                                            c.jsxs("div", {
                                                className: "bg-[#f8f9fa] border-2 border-[#2d3436] p-4",
                                                children: [
                                                    c.jsx("h3", {
                                                        className: "font-bold text-[#2d3436] mb-1 text-center",
                                                        children: "SLIDE DIRECTIONS"
                                                    }),
                                                    c.jsx("p", {
                                                        className: "text-xs text-[#636e72] text-center mb-3",
                                                        children: "Click arrows to cycle modes"
                                                    }),
                                                    c.jsxs("div", {
                                                        className: "grid grid-cols-3 gap-1.5 mx-auto",
                                                        style: {
                                                            width: "fit-content"
                                                        },
                                                        children: [
                                                            [
                                                                "northwest",
                                                                "north",
                                                                "northeast"
                                                            ].map((Q)=>c.jsx("button", {
                                                                    onClick: ()=>X(Q),
                                                                    className: `w-11 h-11 border-2 border-[#2d3436] shadow-[2px_2px_0px_#2d3436]
                          flex items-center justify-center transition-all duration-100
                          active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                          ${Ls(R(Q))}`,
                                                                    title: `${Q}: Click to cycle (Off → Attack → Move → Both)`,
                                                                    children: Us[Q]
                                                                }, Q)),
                                                            c.jsx("button", {
                                                                onClick: ()=>X("west"),
                                                                className: `w-11 h-11 border-2 border-[#2d3436] shadow-[2px_2px_0px_#2d3436]
                        flex items-center justify-center transition-all duration-100
                        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                        ${Ls(R("west"))}`,
                                                                title: "west: Click to cycle (Off → Attack → Move → Both)",
                                                                children: Us.west
                                                            }),
                                                            c.jsx("div", {
                                                                className: "w-11 h-11 border-2 border-[#2d3436] bg-[#ffe66d] flex items-center justify-center",
                                                                children: c.jsx("img", {
                                                                    src: `/images/chess_pieces/white/${s}.svg`,
                                                                    alt: s,
                                                                    className: "w-7 h-7"
                                                                })
                                                            }),
                                                            c.jsx("button", {
                                                                onClick: ()=>X("east"),
                                                                className: `w-11 h-11 border-2 border-[#2d3436] shadow-[2px_2px_0px_#2d3436]
                        flex items-center justify-center transition-all duration-100
                        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                        ${Ls(R("east"))}`,
                                                                title: "east: Click to cycle (Off → Attack → Move → Both)",
                                                                children: Us.east
                                                            }),
                                                            [
                                                                "southwest",
                                                                "south",
                                                                "southeast"
                                                            ].map((Q)=>c.jsx("button", {
                                                                    onClick: ()=>X(Q),
                                                                    className: `w-11 h-11 border-2 border-[#2d3436] shadow-[2px_2px_0px_#2d3436]
                          flex items-center justify-center transition-all duration-100
                          active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
                          ${Ls(R(Q))}`,
                                                                    title: `${Q}: Click to cycle (Off → Attack → Move → Both)`,
                                                                    children: Us[Q]
                                                                }, Q))
                                                        ]
                                                    }),
                                                    c.jsxs("div", {
                                                        className: "mt-3 flex flex-wrap justify-center gap-3 text-xs",
                                                        children: [
                                                            c.jsxs("div", {
                                                                className: "flex items-center gap-1",
                                                                children: [
                                                                    c.jsx("div", {
                                                                        className: "w-3 h-3 bg-white border border-[#2d3436]"
                                                                    }),
                                                                    c.jsx("span", {
                                                                        children: "Off"
                                                                    })
                                                                ]
                                                            }),
                                                            c.jsxs("div", {
                                                                className: "flex items-center gap-1",
                                                                children: [
                                                                    c.jsx("div", {
                                                                        className: "w-3 h-3 bg-red-400 border border-[#2d3436]"
                                                                    }),
                                                                    c.jsx("span", {
                                                                        children: "Attack"
                                                                    })
                                                                ]
                                                            }),
                                                            c.jsxs("div", {
                                                                className: "flex items-center gap-1",
                                                                children: [
                                                                    c.jsx("div", {
                                                                        className: "w-3 h-3 bg-green-500 border border-[#2d3436]"
                                                                    }),
                                                                    c.jsx("span", {
                                                                        children: "Move"
                                                                    })
                                                                ]
                                                            }),
                                                            c.jsxs("div", {
                                                                className: "flex items-center gap-1",
                                                                children: [
                                                                    c.jsx("div", {
                                                                        className: "w-3 h-3 bg-purple-500 border border-[#2d3436]"
                                                                    }),
                                                                    c.jsx("span", {
                                                                        children: "Both"
                                                                    })
                                                                ]
                                                            })
                                                        ]
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    })
                ]
            })
        });
    }
    const Ys = Hm.length, mm = {
        a: "Archbishop",
        c: "Chancellor",
        d: "Dragon",
        e: "Eagle",
        f: "Falcon",
        g: "Guard",
        u: "Unicorn",
        y: "Yawn",
        z: "Amazon"
    };
    function zv({ usedIcons: s, onSelect: u, onClose: o }) {
        const r = Hm.filter((d)=>!s.includes(d));
        return c.jsx("div", {
            className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
            children: c.jsxs("div", {
                className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] max-w-sm w-full",
                children: [
                    c.jsxs("div", {
                        className: "flex items-center justify-between p-4 border-b-4 border-[#2d3436]",
                        children: [
                            c.jsx("h2", {
                                className: "text-xl font-black text-[#2d3436]",
                                children: "Select Piece Icon"
                            }),
                            c.jsx("button", {
                                onClick: o,
                                className: "w-10 h-10 bg-[#ff6b6b] border-2 border-[#2d3436] font-bold text-xl hover:bg-red-400",
                                children: "×"
                            })
                        ]
                    }),
                    c.jsx("div", {
                        className: "p-4",
                        children: r.length === 0 ? c.jsxs("div", {
                            className: "text-center py-8",
                            children: [
                                c.jsxs("p", {
                                    className: "text-[#636e72] font-medium",
                                    children: [
                                        "All custom pieces are in use (",
                                        Ys,
                                        ")"
                                    ]
                                }),
                                c.jsx("p", {
                                    className: "text-sm text-[#636e72] mt-2",
                                    children: "Delete an existing piece to create a new one."
                                })
                            ]
                        }) : c.jsxs(c.Fragment, {
                            children: [
                                c.jsx("p", {
                                    className: "text-sm text-[#636e72] mb-4 text-center",
                                    children: "Choose an icon for your custom piece!"
                                }),
                                c.jsx("div", {
                                    className: "grid grid-cols-3 gap-3 justify-items-center",
                                    children: r.map((d)=>c.jsx("button", {
                                            onClick: ()=>u(d),
                                            className: "w-16 h-16 border-2 border-[#2d3436] bg-white hover:bg-[#4ecdc4] transition-colors p-2 shadow-[2px_2px_0px_#2d3436] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex flex-col items-center justify-center",
                                            title: mm[d] || d.toUpperCase(),
                                            children: c.jsx("img", {
                                                src: `/images/chess_pieces/white/${d}.svg`,
                                                alt: mm[d] || d,
                                                className: "w-10 h-10 object-contain"
                                            })
                                        }, d))
                                })
                            ]
                        })
                    })
                ]
            })
        });
    }
    function Uv() {
        const s = Ot(), { width: u, height: o, setWidth: r, setHeight: d, currentTool: m, setCurrentTool: p, selectedPieceType: b, setSelectedPieceType: v, selectedOwner: y, setSelectedOwner: N, pieces: w, movementPatterns: O, editingPiece: V, setEditingPiece: L, resetBoard: M, getGameState: R, removeMovementPattern: X, loadGameState: H } = Fl(), { user: Y } = _l(), [J, W] = x.useState(!1), [ae, P] = x.useState("my-chess-variant"), [be, Q] = x.useState(!1), [ee, te] = x.useState(!1), [ne, re] = x.useState(!1), [xe, de] = x.useState(!1), [S, z] = x.useState(""), [B, K] = x.useState(""), [ie, T] = x.useState(!1), k = x.useRef(new Map), Z = x.useRef(null), $ = [
            ...new Set(w.map((F)=>F.pieceType.toLowerCase()).filter((F)=>!Gs.includes(F)))
        ], se = Object.keys(O).filter((F)=>!Gs.includes(F)), fe = $.filter((F)=>!se.includes(F)), Ne = x.useCallback((F)=>{
            Q(!1), L(F);
        }, [
            L
        ]), Pe = x.useCallback((F)=>{
            confirm(`Delete custom piece "${F.toUpperCase()}"? This will remove it from the board too.`) && (X(F), Fl.setState((ke)=>({
                    pieces: ke.pieces.filter((ye)=>ye.pieceType !== F)
                })), b === F && v("p"));
        }, [
            X,
            b,
            v
        ]), He = x.useCallback(()=>{
            const F = R(), ke = JSON.stringify(F, null, 2), ye = new Blob([
                ke
            ], {
                type: "application/json"
            }), Xt = URL.createObjectURL(ye), Qe = document.createElement("a");
            Qe.href = Xt, Qe.download = `${ae}.json`, document.body.appendChild(Qe), Qe.click(), document.body.removeChild(Qe), URL.revokeObjectURL(Xt), W(!1);
        }, [
            R,
            ae
        ]), ll = x.useCallback((F)=>{
            const ke = F.target.files?.[0];
            if (!ke) return;
            const ye = new FileReader;
            ye.onload = (Xt)=>{
                try {
                    const Qe = Xt.target?.result, ft = JSON.parse(Qe);
                    if (!ft.width || !ft.height || !ft.tiles || !ft.pieces) {
                        alert("Invalid game state file: missing required fields");
                        return;
                    }
                    H(ft);
                } catch  {
                    alert("Failed to parse JSON file. Please check the file format.");
                }
            }, ye.readAsText(ke), F.target.value = "";
        }, [
            H
        ]), ue = x.useCallback(()=>{
            if (fe.length > 0) {
                alert(`Please define movement patterns for: ${fe.join(", ")}`);
                return;
            }
            const F = w.find((ye)=>ye.owner === 0 && ye.pieceType === "k"), ke = w.find((ye)=>ye.owner === 1 && ye.pieceType === "k");
            if (!F || !ke) {
                alert("Both players need a King (k) piece!");
                return;
            }
            re(!0);
        }, [
            w,
            fe
        ]), je = x.useCallback(()=>{
            re(!1), s("/singleplayer?from=editor");
        }, [
            s
        ]), ot = x.useCallback(()=>{
            re(!1), s("/create-room?from=editor");
        }, [
            s
        ]), Wt = x.useCallback(()=>{
            if (!Y) {
                s("/login?redirect=/editor&action=publish");
                return;
            }
            if (fe.length > 0) {
                alert(`Please define movement patterns for: ${fe.join(", ")}`);
                return;
            }
            const F = w.find((ye)=>ye.owner === 0 && ye.pieceType === "k"), ke = w.find((ye)=>ye.owner === 1 && ye.pieceType === "k");
            if (!F || !ke) {
                alert("Both players need a King (k) piece!");
                return;
            }
            z(""), K(""), de(!0);
        }, [
            Y,
            s,
            w,
            fe
        ]), Nl = x.useCallback(async ()=>{
            if (S.trim()) {
                T(!0);
                try {
                    const F = R(), ke = await xv(S.trim(), B.trim(), F);
                    de(!1), s(`/variants/${ke.id}`);
                } catch (F) {
                    alert(F instanceof Error ? F.message : "Failed to publish");
                } finally{
                    T(!1);
                }
            }
        }, [
            S,
            B,
            R,
            s
        ]);
        return c.jsxs("div", {
            className: "min-h-screen bg-[#f8f9fa] p-4",
            children: [
                c.jsxs("div", {
                    className: "max-w-7xl mx-auto",
                    children: [
                        c.jsxs("div", {
                            className: "flex items-center justify-between mb-6",
                            children: [
                                c.jsx(we, {
                                    to: "/",
                                    className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                    children: "BACK"
                                }),
                                c.jsx("h1", {
                                    className: "text-2xl font-black text-[#2d3436]",
                                    children: "BOARD EDITOR"
                                }),
                                c.jsxs("div", {
                                    className: "flex gap-2",
                                    children: [
                                        c.jsx("button", {
                                            onClick: ()=>te(!0),
                                            className: "bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                            children: "HELP"
                                        }),
                                        c.jsx("button", {
                                            onClick: M,
                                            className: "bg-[#ff6b6b] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                            children: "RESET"
                                        })
                                    ]
                                })
                            ]
                        }),
                        c.jsxs("div", {
                            className: "flex flex-col lg:flex-row gap-6",
                            children: [
                                c.jsxs("div", {
                                    className: "w-full lg:w-64 space-y-4",
                                    children: [
                                        c.jsxs("div", {
                                            className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                            children: [
                                                c.jsx("h2", {
                                                    className: "font-bold text-[#2d3436] mb-4",
                                                    children: "BOARD SIZE"
                                                }),
                                                c.jsxs("div", {
                                                    className: "space-y-4",
                                                    children: [
                                                        c.jsxs("div", {
                                                            children: [
                                                                c.jsxs("label", {
                                                                    className: "block text-sm font-medium text-[#636e72] mb-1",
                                                                    children: [
                                                                        "Width: ",
                                                                        u
                                                                    ]
                                                                }),
                                                                c.jsx("input", {
                                                                    type: "range",
                                                                    min: Ie.MIN,
                                                                    max: Ie.MAX,
                                                                    value: u,
                                                                    onChange: (F)=>r(Number(F.target.value)),
                                                                    className: "w-full h-2 bg-[#ddd] rounded-lg appearance-none cursor-pointer accent-[#4ecdc4]"
                                                                })
                                                            ]
                                                        }),
                                                        c.jsxs("div", {
                                                            children: [
                                                                c.jsxs("label", {
                                                                    className: "block text-sm font-medium text-[#636e72] mb-1",
                                                                    children: [
                                                                        "Height: ",
                                                                        o
                                                                    ]
                                                                }),
                                                                c.jsx("input", {
                                                                    type: "range",
                                                                    min: Ie.MIN,
                                                                    max: Ie.MAX,
                                                                    value: o,
                                                                    onChange: (F)=>d(Number(F.target.value)),
                                                                    className: "w-full h-2 bg-[#ddd] rounded-lg appearance-none cursor-pointer accent-[#4ecdc4]"
                                                                })
                                                            ]
                                                        }),
                                                        c.jsx("div", {
                                                            className: "flex flex-wrap gap-2",
                                                            children: [
                                                                {
                                                                    w: 8,
                                                                    h: 8,
                                                                    label: "8×8"
                                                                },
                                                                {
                                                                    w: 10,
                                                                    h: 8,
                                                                    label: "10×8"
                                                                },
                                                                {
                                                                    w: 10,
                                                                    h: 10,
                                                                    label: "10×10"
                                                                }
                                                            ].map(({ w: F, h: ke, label: ye })=>c.jsx("button", {
                                                                    onClick: ()=>{
                                                                        r(F), d(ke);
                                                                    },
                                                                    className: `px-3 py-1 text-sm font-bold border-2 border-[#2d3436] ${u === F && o === ke ? "bg-[#4ecdc4]" : "bg-white hover:bg-[#f8f9fa]"}`,
                                                                    children: ye
                                                                }, ye))
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        c.jsxs("div", {
                                            className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                            children: [
                                                c.jsx("h2", {
                                                    className: "font-bold text-[#2d3436] mb-4",
                                                    children: "TOOLS"
                                                }),
                                                c.jsxs("div", {
                                                    className: "space-y-2",
                                                    children: [
                                                        c.jsx("button", {
                                                            onClick: ()=>p("placePiece"),
                                                            className: `w-full p-2 text-center font-medium border-2 border-[#2d3436] ${m === "placePiece" ? "bg-[#4ecdc4]" : "bg-white hover:bg-[#f8f9fa]"}`,
                                                            children: "Place Piece"
                                                        }),
                                                        c.jsx("button", {
                                                            onClick: ()=>p("toggleTile"),
                                                            className: `w-full p-2 text-center font-medium border-2 border-[#2d3436] ${m === "toggleTile" ? "bg-[#4ecdc4]" : "bg-white hover:bg-[#f8f9fa]"}`,
                                                            children: "Disable Tiles"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        c.jsxs("div", {
                                            className: "space-y-2",
                                            children: [
                                                c.jsx("input", {
                                                    ref: Z,
                                                    type: "file",
                                                    accept: ".json",
                                                    onChange: ll,
                                                    className: "hidden"
                                                }),
                                                c.jsx("button", {
                                                    onClick: ()=>Z.current?.click(),
                                                    className: "w-full bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                                    children: "LOAD JSON"
                                                }),
                                                c.jsx("button", {
                                                    onClick: ()=>W(!0),
                                                    className: "w-full bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                                    children: "EXPORT JSON"
                                                }),
                                                c.jsx("button", {
                                                    onClick: ue,
                                                    className: "w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                                    children: "START GAME"
                                                }),
                                                c.jsx("button", {
                                                    onClick: Wt,
                                                    className: "w-full bg-[#a29bfe] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                                    children: "PUBLISH"
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                c.jsx("div", {
                                    className: "flex-1 flex justify-center",
                                    children: c.jsx(Rv, {})
                                }),
                                c.jsxs("div", {
                                    className: "w-full lg:w-72 space-y-4",
                                    children: [
                                        c.jsxs("div", {
                                            className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                            children: [
                                                c.jsx("h2", {
                                                    className: "font-bold text-[#2d3436] mb-4",
                                                    children: "PLAYER"
                                                }),
                                                c.jsxs("div", {
                                                    className: "flex gap-2",
                                                    children: [
                                                        c.jsxs("button", {
                                                            onClick: ()=>N(0),
                                                            className: `flex-1 p-2 font-bold border-2 border-[#2d3436] flex items-center justify-center gap-2 ${y === 0 ? "bg-[#4ecdc4]" : "bg-white hover:bg-[#f8f9fa]"}`,
                                                            children: [
                                                                c.jsx("div", {
                                                                    className: "w-4 h-4 rounded-full bg-white border-2 border-[#2d3436]"
                                                                }),
                                                                "White"
                                                            ]
                                                        }),
                                                        c.jsxs("button", {
                                                            onClick: ()=>N(1),
                                                            className: `flex-1 p-2 font-bold border-2 border-[#2d3436] flex items-center justify-center gap-2 ${y === 1 ? "bg-[#4ecdc4]" : "bg-white hover:bg-[#f8f9fa]"}`,
                                                            children: [
                                                                c.jsx("div", {
                                                                    className: "w-4 h-4 rounded-full bg-[#2d3436] border-2 border-[#2d3436]"
                                                                }),
                                                                "Black"
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        c.jsxs("div", {
                                            className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                            children: [
                                                c.jsx("h2", {
                                                    className: "font-bold text-[#2d3436] mb-4",
                                                    children: "STANDARD PIECES"
                                                }),
                                                c.jsx(Mv, {
                                                    pieces: [
                                                        ...Gs
                                                    ],
                                                    selectedPiece: b,
                                                    onSelect: v,
                                                    owner: y
                                                })
                                            ]
                                        }),
                                        c.jsxs("div", {
                                            className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                            children: [
                                                c.jsxs("div", {
                                                    className: "flex items-center justify-between mb-4",
                                                    children: [
                                                        c.jsx("h2", {
                                                            className: "font-bold text-[#2d3436]",
                                                            children: "CUSTOM PIECES"
                                                        }),
                                                        c.jsxs("span", {
                                                            className: "text-xs text-[#636e72]",
                                                            children: [
                                                                se.length,
                                                                "/",
                                                                Ys
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                se.length > 0 ? c.jsxs("div", {
                                                    className: "mb-4",
                                                    children: [
                                                        c.jsx("div", {
                                                            className: "grid grid-cols-3 gap-2",
                                                            children: se.map((F)=>c.jsx("button", {
                                                                    onClick: ()=>v(F),
                                                                    draggable: !0,
                                                                    onDragStart: (ke)=>{
                                                                        ke.dataTransfer.setData("application/json", JSON.stringify({
                                                                            pieceType: F,
                                                                            owner: y
                                                                        })), ke.dataTransfer.effectAllowed = "copy";
                                                                        const ye = k.current.get(F);
                                                                        ye && ke.dataTransfer.setDragImage(ye, 25, 25);
                                                                    },
                                                                    className: `aspect-square border-2 border-[#2d3436] flex items-center justify-center p-1 cursor-grab active:cursor-grabbing ${b === F ? "bg-[#4ecdc4]" : "bg-white hover:bg-[#f8f9fa]"}`,
                                                                    title: `${F.toUpperCase()} - Drag to board`,
                                                                    children: c.jsx("img", {
                                                                        ref: (ke)=>{
                                                                            ke && k.current.set(F, ke);
                                                                        },
                                                                        src: `/images/chess_pieces/${y === 0 ? "white" : "black"}/${F}.svg`,
                                                                        alt: F,
                                                                        className: "w-full h-full object-contain pointer-events-none"
                                                                    })
                                                                }, F))
                                                        }),
                                                        c.jsxs("div", {
                                                            className: "flex gap-2 mt-3",
                                                            children: [
                                                                c.jsx("button", {
                                                                    onClick: ()=>se.includes(b) && L(b),
                                                                    disabled: !se.includes(b),
                                                                    className: `flex-1 p-2 text-sm font-bold border-2 border-[#2d3436] transition-colors ${se.includes(b) ? "bg-[#4ecdc4] hover:bg-[#45b7aa] text-[#2d3436]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`,
                                                                    children: "✎ EDIT"
                                                                }),
                                                                c.jsx("button", {
                                                                    onClick: ()=>se.includes(b) && Pe(b),
                                                                    disabled: !se.includes(b),
                                                                    className: `flex-1 p-2 text-sm font-bold border-2 border-[#2d3436] transition-colors ${se.includes(b) ? "bg-[#ff6b6b] hover:bg-red-400 text-[#2d3436]" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`,
                                                                    children: "× DELETE"
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }) : c.jsx("p", {
                                                    className: "text-sm text-[#636e72] mb-4 text-center py-4",
                                                    children: "No custom pieces yet"
                                                }),
                                                fe.length > 0 && c.jsxs("div", {
                                                    className: "mb-4 p-2 bg-red-100 border-2 border-red-400",
                                                    children: [
                                                        c.jsx("p", {
                                                            className: "text-xs text-red-700 mb-1",
                                                            children: "Needs movement pattern:"
                                                        }),
                                                        c.jsx("div", {
                                                            className: "flex flex-wrap gap-2",
                                                            children: fe.map((F)=>c.jsx("button", {
                                                                    onClick: ()=>L(F),
                                                                    className: "w-10 h-10 border-2 border-red-400 bg-red-50 flex items-center justify-center hover:bg-red-100",
                                                                    children: c.jsx("img", {
                                                                        src: `/images/chess_pieces/${y === 0 ? "white" : "black"}/${F}.svg`,
                                                                        alt: F,
                                                                        className: "w-8 h-8"
                                                                    })
                                                                }, F))
                                                        })
                                                    ]
                                                }),
                                                c.jsx("button", {
                                                    onClick: ()=>Q(!0),
                                                    disabled: se.length >= Ys,
                                                    className: `w-full p-3 font-bold border-2 border-[#2d3436] shadow-[3px_3px_0px_#2d3436]
                  transition-all active:translate-x-[3px] active:translate-y-[3px] active:shadow-none
                  ${se.length >= Ys ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-[#ffe66d] hover:brightness-105"}`,
                                                    children: "+ CREATE NEW PIECE"
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                be && c.jsx(zv, {
                    usedIcons: se,
                    onSelect: Ne,
                    onClose: ()=>Q(!1)
                }),
                V && c.jsx(Dv, {
                    pieceType: V,
                    onClose: ()=>L(null)
                }),
                ee && c.jsx("div", {
                    className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
                    children: c.jsxs("div", {
                        className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] max-w-md w-full",
                        children: [
                            c.jsxs("div", {
                                className: "flex items-center justify-between p-4 border-b-4 border-[#2d3436]",
                                children: [
                                    c.jsx("h2", {
                                        className: "text-xl font-black text-[#2d3436]",
                                        children: "HOW TO USE"
                                    }),
                                    c.jsx("button", {
                                        onClick: ()=>te(!1),
                                        className: "w-10 h-10 bg-[#ff6b6b] border-2 border-[#2d3436] font-bold text-xl hover:bg-red-400",
                                        children: "×"
                                    })
                                ]
                            }),
                            c.jsxs("div", {
                                className: "p-4 space-y-4",
                                children: [
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("h3", {
                                                className: "font-bold text-[#2d3436] mb-2",
                                                children: "Placing Pieces"
                                            }),
                                            c.jsxs("ul", {
                                                className: "text-sm text-[#636e72] space-y-1",
                                                children: [
                                                    c.jsx("li", {
                                                        children: "• Select a piece from the right panel"
                                                    }),
                                                    c.jsx("li", {
                                                        children: "• Click on the board to place it"
                                                    }),
                                                    c.jsx("li", {
                                                        children: "• Right-click to remove a piece"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("h3", {
                                                className: "font-bold text-[#2d3436] mb-2",
                                                children: "Board Setup"
                                            }),
                                            c.jsxs("ul", {
                                                className: "text-sm text-[#636e72] space-y-1",
                                                children: [
                                                    c.jsx("li", {
                                                        children: "• Use sliders to adjust board size"
                                                    }),
                                                    c.jsx("li", {
                                                        children: "• Toggle Tiles tool to disable squares"
                                                    }),
                                                    c.jsx("li", {
                                                        children: "• Both players need a King to start"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("h3", {
                                                className: "font-bold text-[#2d3436] mb-2",
                                                children: "Custom Pieces"
                                            }),
                                            c.jsxs("ul", {
                                                className: "text-sm text-[#636e72] space-y-1",
                                                children: [
                                                    c.jsx("li", {
                                                        children: '• Click "Create New Piece" to add custom pieces'
                                                    }),
                                                    c.jsx("li", {
                                                        children: "• Define movement patterns in the editor"
                                                    }),
                                                    c.jsx("li", {
                                                        children: "• Custom pieces must have patterns before starting"
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                }),
                ne && c.jsx("div", {
                    className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
                    children: c.jsxs("div", {
                        className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] max-w-sm w-full",
                        children: [
                            c.jsxs("div", {
                                className: "flex items-center justify-between p-4 border-b-4 border-[#2d3436]",
                                children: [
                                    c.jsx("h2", {
                                        className: "text-xl font-black text-[#2d3436]",
                                        children: "START GAME"
                                    }),
                                    c.jsx("button", {
                                        onClick: ()=>re(!1),
                                        className: "w-10 h-10 bg-[#ff6b6b] border-2 border-[#2d3436] font-bold text-xl hover:bg-red-400",
                                        children: "×"
                                    })
                                ]
                            }),
                            c.jsxs("div", {
                                className: "p-4 space-y-3",
                                children: [
                                    c.jsx("button", {
                                        onClick: je,
                                        className: "w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                        children: "PLAY VS AI"
                                    }),
                                    c.jsx("button", {
                                        onClick: ot,
                                        className: "w-full bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                        children: "CREATE MULTIPLAYER ROOM"
                                    })
                                ]
                            })
                        ]
                    })
                }),
                xe && c.jsx("div", {
                    className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
                    children: c.jsxs("div", {
                        className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] max-w-md w-full",
                        children: [
                            c.jsxs("div", {
                                className: "flex items-center justify-between p-4 border-b-4 border-[#2d3436]",
                                children: [
                                    c.jsx("h2", {
                                        className: "text-xl font-black text-[#2d3436]",
                                        children: "PUBLISH VARIANT"
                                    }),
                                    c.jsx("button", {
                                        onClick: ()=>de(!1),
                                        className: "w-10 h-10 bg-[#ff6b6b] border-2 border-[#2d3436] font-bold text-xl hover:bg-red-400",
                                        children: "x"
                                    })
                                ]
                            }),
                            c.jsxs("div", {
                                className: "p-4 space-y-4",
                                children: [
                                    c.jsx("div", {
                                        className: "flex justify-center",
                                        children: c.jsx(Ym, {
                                            gameState: R(),
                                            size: 150
                                        })
                                    }),
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("label", {
                                                className: "block font-bold text-[#2d3436] mb-1",
                                                children: "NAME"
                                            }),
                                            c.jsx("input", {
                                                type: "text",
                                                value: S,
                                                onChange: (F)=>z(F.target.value),
                                                placeholder: "My Chess Variant",
                                                maxLength: 100,
                                                className: "w-full p-2 border-2 border-[#2d3436] font-medium text-[#2d3436] placeholder:text-[#b2bec3]"
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("label", {
                                                className: "block font-bold text-[#2d3436] mb-1",
                                                children: "DESCRIPTION (OPTIONAL)"
                                            }),
                                            c.jsx("textarea", {
                                                value: B,
                                                onChange: (F)=>K(F.target.value),
                                                placeholder: "Describe your variant...",
                                                rows: 3,
                                                maxLength: 2e3,
                                                className: "w-full p-2 border-2 border-[#2d3436] font-medium text-[#2d3436] placeholder:text-[#b2bec3] resize-none"
                                            })
                                        ]
                                    }),
                                    c.jsx("button", {
                                        onClick: Nl,
                                        disabled: !S.trim() || ie,
                                        className: "w-full bg-[#a29bfe] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                        children: ie ? "PUBLISHING..." : "PUBLISH"
                                    })
                                ]
                            })
                        ]
                    })
                }),
                J && c.jsx("div", {
                    className: "fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4",
                    children: c.jsxs("div", {
                        className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] max-w-sm w-full",
                        children: [
                            c.jsxs("div", {
                                className: "flex items-center justify-between p-4 border-b-4 border-[#2d3436]",
                                children: [
                                    c.jsx("h2", {
                                        className: "text-xl font-black text-[#2d3436]",
                                        children: "EXPORT"
                                    }),
                                    c.jsx("button", {
                                        onClick: ()=>W(!1),
                                        className: "w-10 h-10 bg-[#ff6b6b] border-2 border-[#2d3436] font-bold text-xl hover:bg-red-400",
                                        children: "×"
                                    })
                                ]
                            }),
                            c.jsxs("div", {
                                className: "p-4 space-y-4",
                                children: [
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("label", {
                                                className: "block font-bold text-[#2d3436] mb-2",
                                                children: "FILE NAME"
                                            }),
                                            c.jsxs("div", {
                                                className: "flex items-center gap-2",
                                                children: [
                                                    c.jsx("input", {
                                                        type: "text",
                                                        value: ae,
                                                        onChange: (F)=>P(F.target.value.replace(/[^a-zA-Z0-9-_]/g, "")),
                                                        placeholder: "my-chess-variant",
                                                        className: "flex-1 p-2 border-2 border-[#2d3436] font-medium text-[#2d3436]"
                                                    }),
                                                    c.jsx("span", {
                                                        className: "text-[#636e72] font-medium",
                                                        children: ".json"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    c.jsx("button", {
                                        onClick: He,
                                        disabled: !ae.trim(),
                                        className: "w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                                        children: "DOWNLOAD"
                                    })
                                ]
                            })
                        ]
                    })
                })
            ]
        });
    }
    function Lv() {
        const s = Ot(), [u] = cn(), { setAuth: o } = _l(), [r, d] = x.useState(""), [m, p] = x.useState(""), [b, v] = x.useState(""), [y, N] = x.useState(!1), w = u.get("redirect") || "/", O = async (V)=>{
            V.preventDefault(), v(""), N(!0);
            try {
                const L = await hv(r, m);
                o(L.token, L.user), s(w);
            } catch (L) {
                v(L instanceof Error ? L.message : "Login failed");
            } finally{
                N(!1);
            }
        };
        return c.jsx("div", {
            className: "min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4",
            children: c.jsxs("div", {
                className: "max-w-sm w-full",
                children: [
                    c.jsxs("div", {
                        className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8",
                        children: [
                            c.jsx("h1", {
                                className: "text-3xl font-black text-[#2d3436] mb-6 text-center",
                                children: "LOG IN"
                            }),
                            c.jsxs("form", {
                                onSubmit: O,
                                className: "space-y-4",
                                children: [
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("label", {
                                                className: "block font-bold text-[#2d3436] mb-1",
                                                children: "USERNAME"
                                            }),
                                            c.jsx("input", {
                                                type: "text",
                                                value: r,
                                                onChange: (V)=>d(V.target.value),
                                                className: "w-full p-3 border-3 border-[#2d3436] font-medium text-[#2d3436]",
                                                required: !0
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("label", {
                                                className: "block font-bold text-[#2d3436] mb-1",
                                                children: "PASSWORD"
                                            }),
                                            c.jsx("input", {
                                                type: "password",
                                                value: m,
                                                onChange: (V)=>p(V.target.value),
                                                className: "w-full p-3 border-3 border-[#2d3436] font-medium text-[#2d3436]",
                                                required: !0
                                            })
                                        ]
                                    }),
                                    b && c.jsx("div", {
                                        className: "p-3 bg-[#ff6b6b] border-2 border-[#2d3436] text-[#2d3436] font-medium text-sm",
                                        children: b
                                    }),
                                    c.jsx("button", {
                                        type: "submit",
                                        disabled: y,
                                        className: "w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50",
                                        children: y ? "LOGGING IN..." : "LOG IN"
                                    })
                                ]
                            }),
                            c.jsx("p", {
                                className: "text-center text-[#636e72] mt-4 text-sm",
                                children: c.jsx(we, {
                                    to: "/forgot-password",
                                    className: "text-[#636e72] underline hover:text-[#2d3436]",
                                    children: "Forgot password?"
                                })
                            }),
                            c.jsxs("p", {
                                className: "text-center text-[#636e72] mt-2 text-sm",
                                children: [
                                    "Don't have an account?",
                                    " ",
                                    c.jsx(we, {
                                        to: `/register${w !== "/" ? `?redirect=${encodeURIComponent(w)}` : ""}`,
                                        className: "text-[#2d3436] font-bold underline",
                                        children: "Register"
                                    })
                                ]
                            })
                        ]
                    }),
                    c.jsx("div", {
                        className: "text-center mt-4",
                        children: c.jsx(we, {
                            to: "/",
                            className: "text-[#636e72] font-medium text-sm hover:text-[#2d3436]",
                            children: "Back to Home"
                        })
                    })
                ]
            })
        });
    }
    function Hv() {
        const s = Ot(), [u] = cn(), { setAuth: o } = _l(), [r, d] = x.useState(""), [m, p] = x.useState(""), [b, v] = x.useState(""), [y, N] = x.useState(""), [w, O] = x.useState(""), [V, L] = x.useState(!1), M = u.get("redirect") || "/", R = async (X)=>{
            if (X.preventDefault(), O(""), r.length < 3 || r.length > 30) {
                O("Username must be 3-30 characters");
                return;
            }
            if (!/^[a-zA-Z0-9_]+$/.test(r)) {
                O("Username must be alphanumeric with underscores only");
                return;
            }
            if (b.length < 8) {
                O("Password must be at least 8 characters");
                return;
            }
            if (b !== y) {
                O("Passwords do not match");
                return;
            }
            L(!0);
            try {
                const H = await dv(r, b, m || void 0);
                o(H.token, H.user), s(M);
            } catch (H) {
                O(H instanceof Error ? H.message : "Registration failed");
            } finally{
                L(!1);
            }
        };
        return c.jsx("div", {
            className: "min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4",
            children: c.jsxs("div", {
                className: "max-w-sm w-full",
                children: [
                    c.jsxs("div", {
                        className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8",
                        children: [
                            c.jsx("h1", {
                                className: "text-3xl font-black text-[#2d3436] mb-6 text-center",
                                children: "REGISTER"
                            }),
                            c.jsxs("form", {
                                onSubmit: R,
                                className: "space-y-4",
                                children: [
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("label", {
                                                className: "block font-bold text-[#2d3436] mb-1",
                                                children: "USERNAME"
                                            }),
                                            c.jsx("input", {
                                                type: "text",
                                                value: r,
                                                onChange: (X)=>d(X.target.value),
                                                placeholder: "3-30 chars, alphanumeric",
                                                className: "w-full p-3 border-3 border-[#2d3436] font-medium text-[#2d3436] placeholder:text-[#b2bec3]",
                                                required: !0
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("label", {
                                                className: "block font-bold text-[#2d3436] mb-1",
                                                children: "EMAIL (OPTIONAL)"
                                            }),
                                            c.jsx("input", {
                                                type: "email",
                                                value: m,
                                                onChange: (X)=>p(X.target.value),
                                                placeholder: "For password recovery",
                                                className: "w-full p-3 border-3 border-[#2d3436] font-medium text-[#2d3436] placeholder:text-[#b2bec3]"
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("label", {
                                                className: "block font-bold text-[#2d3436] mb-1",
                                                children: "PASSWORD"
                                            }),
                                            c.jsx("input", {
                                                type: "password",
                                                value: b,
                                                onChange: (X)=>v(X.target.value),
                                                placeholder: "8+ characters",
                                                className: "w-full p-3 border-3 border-[#2d3436] font-medium text-[#2d3436] placeholder:text-[#b2bec3]",
                                                required: !0
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("label", {
                                                className: "block font-bold text-[#2d3436] mb-1",
                                                children: "CONFIRM PASSWORD"
                                            }),
                                            c.jsx("input", {
                                                type: "password",
                                                value: y,
                                                onChange: (X)=>N(X.target.value),
                                                className: "w-full p-3 border-3 border-[#2d3436] font-medium text-[#2d3436]",
                                                required: !0
                                            })
                                        ]
                                    }),
                                    w && c.jsx("div", {
                                        className: "p-3 bg-[#ff6b6b] border-2 border-[#2d3436] text-[#2d3436] font-medium text-sm",
                                        children: w
                                    }),
                                    c.jsx("button", {
                                        type: "submit",
                                        disabled: V,
                                        className: "w-full bg-[#a29bfe] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50",
                                        children: V ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"
                                    })
                                ]
                            }),
                            c.jsxs("p", {
                                className: "text-center text-[#636e72] mt-4 text-sm",
                                children: [
                                    "Already have an account?",
                                    " ",
                                    c.jsx(we, {
                                        to: `/login${M !== "/" ? `?redirect=${encodeURIComponent(M)}` : ""}`,
                                        className: "text-[#2d3436] font-bold underline",
                                        children: "Log in"
                                    })
                                ]
                            })
                        ]
                    }),
                    c.jsx("div", {
                        className: "text-center mt-4",
                        children: c.jsx(we, {
                            to: "/",
                            className: "text-[#636e72] font-medium text-sm hover:text-[#2d3436]",
                            children: "Back to Home"
                        })
                    })
                ]
            })
        });
    }
    const kv = [
        {
            value: "newest",
            label: "Newest"
        },
        {
            value: "popular",
            label: "Most Popular"
        },
        {
            value: "most_commented",
            label: "Most Discussed"
        }
    ];
    function Bv() {
        const s = Ot(), { user: u } = _l(), [o, r] = x.useState([]), [d, m] = x.useState(null), [p, b] = x.useState(!0), [v, y] = x.useState(!1), [N, w] = x.useState(""), [O, V] = x.useState("newest"), [L, M] = x.useState(""), R = x.useCallback(async (Y)=>{
            try {
                const J = !!Y;
                J ? y(!0) : b(!0);
                const W = await pv({
                    q: N || void 0,
                    sort: O,
                    cursor: Y,
                    limit: 20
                });
                r(J ? (ae)=>[
                        ...ae,
                        ...W.variants
                    ] : W.variants), m(W.nextCursor), M("");
            } catch (J) {
                M(J instanceof Error ? J.message : "Failed to load variants");
            } finally{
                b(!1), y(!1);
            }
        }, [
            N,
            O
        ]);
        x.useEffect(()=>{
            R();
        }, [
            R
        ]);
        const X = x.useCallback(async (Y)=>{
            if (!u) {
                s("/login?redirect=/browse");
                return;
            }
            try {
                const J = Y.liked ? await Gm(Y.id) : await qm(Y.id);
                r((W)=>W.map((ae)=>ae.id === Y.id ? {
                            ...ae,
                            likeCount: J.likeCount,
                            liked: J.liked
                        } : ae));
            } catch  {}
        }, [
            u,
            s
        ]), H = x.useCallback((Y)=>{
            Y.preventDefault(), R();
        }, [
            R
        ]);
        return c.jsx("div", {
            className: "min-h-screen bg-[#f8f9fa] p-4",
            children: c.jsxs("div", {
                className: "max-w-6xl mx-auto",
                children: [
                    c.jsxs("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [
                            c.jsx(we, {
                                to: "/",
                                className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                children: "BACK"
                            }),
                            c.jsx("h1", {
                                className: "text-2xl font-black text-[#2d3436]",
                                children: "BROWSE VARIANTS"
                            }),
                            c.jsx("div", {
                                className: "w-20"
                            })
                        ]
                    }),
                    c.jsx("div", {
                        className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4 mb-6",
                        children: c.jsxs("div", {
                            className: "flex flex-col sm:flex-row gap-3",
                            children: [
                                c.jsxs("form", {
                                    onSubmit: H,
                                    className: "flex-1 flex gap-2",
                                    children: [
                                        c.jsx("input", {
                                            type: "text",
                                            value: N,
                                            onChange: (Y)=>w(Y.target.value),
                                            placeholder: "Search variants...",
                                            className: "flex-1 p-2 border-2 border-[#2d3436] font-medium text-[#2d3436] placeholder:text-[#b2bec3]"
                                        }),
                                        c.jsx("button", {
                                            type: "submit",
                                            className: "bg-[#4ecdc4] border-2 border-[#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:brightness-95 transition-all",
                                            children: "SEARCH"
                                        })
                                    ]
                                }),
                                c.jsx("div", {
                                    className: "flex gap-1",
                                    children: kv.map((Y)=>c.jsx("button", {
                                            onClick: ()=>V(Y.value),
                                            className: `px-3 py-2 text-sm font-bold border-2 border-[#2d3436] transition-colors ${O === Y.value ? "bg-[#a29bfe] text-[#2d3436]" : "bg-white text-[#636e72] hover:bg-[#f8f9fa]"}`,
                                            children: Y.label
                                        }, Y.value))
                                })
                            ]
                        })
                    }),
                    L && c.jsx("div", {
                        className: "p-4 bg-[#ff6b6b] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] mb-6 font-bold text-[#2d3436]",
                        children: L
                    }),
                    p ? c.jsx("div", {
                        className: "flex items-center justify-center py-20",
                        children: c.jsxs("div", {
                            className: "text-center",
                            children: [
                                c.jsx("div", {
                                    className: "animate-spin w-8 h-8 border-4 border-[#2d3436] border-t-transparent rounded-full mx-auto mb-4"
                                }),
                                c.jsx("p", {
                                    className: "font-bold text-[#636e72]",
                                    children: "Loading variants..."
                                })
                            ]
                        })
                    }) : o.length === 0 ? c.jsxs("div", {
                        className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-12 text-center",
                        children: [
                            c.jsx("p", {
                                className: "text-xl font-bold text-[#636e72] mb-2",
                                children: "No variants found"
                            }),
                            c.jsx("p", {
                                className: "text-[#b2bec3] mb-4",
                                children: "Be the first to publish one!"
                            }),
                            c.jsx(we, {
                                to: "/editor",
                                className: "inline-block bg-[#a29bfe] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-6 py-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                children: "OPEN EDITOR"
                            })
                        ]
                    }) : c.jsxs(c.Fragment, {
                        children: [
                            c.jsx("div", {
                                className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
                                children: o.map((Y)=>c.jsx("div", {
                                        className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all cursor-pointer",
                                        onClick: ()=>s(`/variants/${Y.id}`),
                                        children: c.jsxs("div", {
                                            className: "p-4",
                                            children: [
                                                c.jsxs("div", {
                                                    className: "flex items-start gap-3",
                                                    children: [
                                                        c.jsx(Ym, {
                                                            gameState: Y.gameState,
                                                            size: 120
                                                        }),
                                                        c.jsxs("div", {
                                                            className: "flex-1 min-w-0",
                                                            children: [
                                                                c.jsx("h3", {
                                                                    className: "font-black text-[#2d3436] truncate",
                                                                    children: Y.name
                                                                }),
                                                                c.jsxs("p", {
                                                                    className: "text-sm text-[#636e72]",
                                                                    children: [
                                                                        "by ",
                                                                        Y.author.username
                                                                    ]
                                                                }),
                                                                c.jsxs("div", {
                                                                    className: "flex items-center gap-2 mt-2 text-xs text-[#636e72]",
                                                                    children: [
                                                                        c.jsxs("span", {
                                                                            className: "px-2 py-0.5 bg-[#f8f9fa] border border-[#dfe6e9] font-medium",
                                                                            children: [
                                                                                Y.boardWidth,
                                                                                "x",
                                                                                Y.boardHeight
                                                                            ]
                                                                        }),
                                                                        c.jsxs("span", {
                                                                            children: [
                                                                                Y.pieceCount,
                                                                                " pieces"
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                                                Y.description && c.jsx("p", {
                                                                    className: "text-xs text-[#636e72] mt-2 line-clamp-2",
                                                                    children: Y.description
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                c.jsxs("div", {
                                                    className: "flex items-center justify-between mt-3 pt-3 border-t-2 border-[#f8f9fa]",
                                                    children: [
                                                        c.jsxs("div", {
                                                            className: "flex items-center gap-3 text-sm",
                                                            children: [
                                                                c.jsxs("button", {
                                                                    onClick: (J)=>{
                                                                        J.stopPropagation(), X(Y);
                                                                    },
                                                                    className: `flex items-center gap-1 font-bold transition-colors ${Y.liked ? "text-[#ff6b6b]" : "text-[#636e72] hover:text-[#ff6b6b]"}`,
                                                                    children: [
                                                                        c.jsx("span", {
                                                                            children: Y.liked ? "♥" : "♡"
                                                                        }),
                                                                        c.jsx("span", {
                                                                            children: Y.likeCount
                                                                        })
                                                                    ]
                                                                }),
                                                                c.jsxs("span", {
                                                                    className: "flex items-center gap-1 text-[#636e72]",
                                                                    children: [
                                                                        c.jsx("svg", {
                                                                            className: "w-4 h-4",
                                                                            viewBox: "0 0 24 24",
                                                                            fill: "none",
                                                                            stroke: "currentColor",
                                                                            strokeWidth: "2",
                                                                            children: c.jsx("path", {
                                                                                d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
                                                                            })
                                                                        }),
                                                                        Y.commentCount
                                                                    ]
                                                                })
                                                            ]
                                                        }),
                                                        c.jsx("span", {
                                                            className: "text-xs text-[#b2bec3]",
                                                            children: new Date(Y.createdAt).toLocaleDateString()
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    }, Y.id))
                            }),
                            d && c.jsx("div", {
                                className: "text-center mt-6",
                                children: c.jsx("button", {
                                    onClick: ()=>R(d),
                                    disabled: v,
                                    className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-8 py-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50",
                                    children: v ? "LOADING..." : "LOAD MORE"
                                })
                            })
                        ]
                    })
                ]
            })
        });
    }
    function qv() {
        const { id: s } = Em(), u = Ot(), { user: o } = _l(), r = Fl(), [d, m] = x.useState(null), [p, b] = x.useState(!0), [v, y] = x.useState(""), [N, w] = x.useState([]), [O, V] = x.useState(null), [L, M] = x.useState(!1), [R, X] = x.useState(""), [H, Y] = x.useState(!1), [J, W] = x.useState(!1), [ae, P] = x.useState(""), [be, Q] = x.useState("");
        x.useEffect(()=>{
            s && (b(!0), kr(Number(s)).then((B)=>{
                m(B), P(B.name), Q(B.description);
            }).catch((B)=>y(B.message)).finally(()=>b(!1)));
        }, [
            s
        ]), x.useEffect(()=>{
            s && (M(!0), dm(Number(s)).then((B)=>{
                w(B.comments), V(B.nextCursor);
            }).finally(()=>M(!1)));
        }, [
            s
        ]);
        const ee = x.useCallback(async ()=>{
            if (!(!O || !s)) {
                M(!0);
                try {
                    const B = await dm(Number(s), {
                        cursor: O
                    });
                    w((K)=>[
                            ...K,
                            ...B.comments
                        ]), V(B.nextCursor);
                } finally{
                    M(!1);
                }
            }
        }, [
            O,
            s
        ]), te = x.useCallback(async ()=>{
            if (d) {
                if (!o) {
                    u(`/login?redirect=/variants/${d.id}`);
                    return;
                }
                try {
                    const B = d.liked ? await Gm(d.id) : await qm(d.id);
                    m((K)=>K && {
                            ...K,
                            likeCount: B.likeCount,
                            liked: B.liked
                        });
                } catch  {}
            }
        }, [
            d,
            o,
            u
        ]), ne = x.useCallback(async ()=>{
            if (!(!d || !R.trim())) {
                if (!o) {
                    u(`/login?redirect=/variants/${d.id}`);
                    return;
                }
                Y(!0);
                try {
                    const B = await vv(d.id, R.trim());
                    w((K)=>[
                            B,
                            ...K
                        ]), m((K)=>K && {
                            ...K,
                            commentCount: K.commentCount + 1
                        }), X("");
                } catch  {} finally{
                    Y(!1);
                }
            }
        }, [
            d,
            R,
            o,
            u
        ]), re = x.useCallback(async (B)=>{
            if (confirm("Delete this comment?")) try {
                await gv(B), w((K)=>K.filter((ie)=>ie.id !== B)), m((K)=>K && {
                        ...K,
                        commentCount: Math.max(0, K.commentCount - 1)
                    });
            } catch  {}
        }, []), xe = x.useCallback(async ()=>{
            if (d && confirm(`Delete variant "${d.name}"? This cannot be undone.`)) try {
                await bv(d.id), u("/browse");
            } catch (B) {
                alert(B instanceof Error ? B.message : "Failed to delete");
            }
        }, [
            d,
            u
        ]), de = x.useCallback(async ()=>{
            if (d) try {
                await yv(d.id, {
                    name: ae.trim(),
                    description: be.trim()
                }), m((B)=>B && {
                        ...B,
                        name: ae.trim(),
                        description: be.trim()
                    }), W(!1);
            } catch (B) {
                alert(B instanceof Error ? B.message : "Failed to update");
            }
        }, [
            d,
            ae,
            be
        ]), S = x.useCallback(()=>{
            d && (r.loadGameState(d.gameState), u("/editor"));
        }, [
            d,
            r,
            u
        ]), z = o && d && o.id === d.author.id;
        return p ? c.jsx("div", {
            className: "min-h-screen bg-[#f8f9fa] flex items-center justify-center",
            children: c.jsxs("div", {
                className: "text-center",
                children: [
                    c.jsx("div", {
                        className: "animate-spin w-8 h-8 border-4 border-[#2d3436] border-t-transparent rounded-full mx-auto mb-4"
                    }),
                    c.jsx("p", {
                        className: "font-bold text-[#636e72]",
                        children: "Loading variant..."
                    })
                ]
            })
        }) : v || !d ? c.jsx("div", {
            className: "min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4",
            children: c.jsxs("div", {
                className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8 text-center max-w-sm",
                children: [
                    c.jsx("p", {
                        className: "text-xl font-bold text-[#2d3436] mb-2",
                        children: "Variant not found"
                    }),
                    c.jsx("p", {
                        className: "text-[#636e72] mb-4",
                        children: v || "This variant may have been deleted."
                    }),
                    c.jsx(we, {
                        to: "/browse",
                        className: "inline-block bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-6 py-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                        children: "BROWSE VARIANTS"
                    })
                ]
            })
        }) : c.jsx("div", {
            className: "min-h-screen bg-[#f8f9fa] p-4",
            children: c.jsxs("div", {
                className: "max-w-5xl mx-auto",
                children: [
                    c.jsxs("div", {
                        className: "flex items-center justify-between mb-6",
                        children: [
                            c.jsx(we, {
                                to: "/browse",
                                className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] px-4 py-2 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                children: "BACK"
                            }),
                            c.jsx("h1", {
                                className: "text-2xl font-black text-[#2d3436] truncate mx-4",
                                children: d.name
                            }),
                            c.jsx("div", {
                                className: "w-20"
                            })
                        ]
                    }),
                    c.jsxs("div", {
                        className: "flex flex-col lg:flex-row gap-6 items-start",
                        children: [
                            c.jsx("div", {
                                className: "flex-shrink-0",
                                children: c.jsx(ri, {
                                    gameState: d.gameState,
                                    playerNum: 0,
                                    flipped: !1,
                                    disabled: !0
                                })
                            }),
                            c.jsxs("div", {
                                className: "w-full lg:w-80 space-y-4",
                                children: [
                                    c.jsx("div", {
                                        className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                        children: J ? c.jsxs("div", {
                                            className: "space-y-3",
                                            children: [
                                                c.jsxs("div", {
                                                    children: [
                                                        c.jsx("label", {
                                                            className: "block font-bold text-[#2d3436] mb-1",
                                                            children: "NAME"
                                                        }),
                                                        c.jsx("input", {
                                                            type: "text",
                                                            value: ae,
                                                            onChange: (B)=>P(B.target.value),
                                                            className: "w-full p-2 border-2 border-[#2d3436] font-medium"
                                                        })
                                                    ]
                                                }),
                                                c.jsxs("div", {
                                                    children: [
                                                        c.jsx("label", {
                                                            className: "block font-bold text-[#2d3436] mb-1",
                                                            children: "DESCRIPTION"
                                                        }),
                                                        c.jsx("textarea", {
                                                            value: be,
                                                            onChange: (B)=>Q(B.target.value),
                                                            rows: 4,
                                                            className: "w-full p-2 border-2 border-[#2d3436] font-medium resize-none"
                                                        })
                                                    ]
                                                }),
                                                c.jsxs("div", {
                                                    className: "flex gap-2",
                                                    children: [
                                                        c.jsx("button", {
                                                            onClick: de,
                                                            className: "flex-1 bg-[#4ecdc4] border-2 border-[#2d3436] p-2 font-bold text-sm",
                                                            children: "SAVE"
                                                        }),
                                                        c.jsx("button", {
                                                            onClick: ()=>{
                                                                W(!1), P(d.name), Q(d.description);
                                                            },
                                                            className: "flex-1 bg-white border-2 border-[#2d3436] p-2 font-bold text-sm text-[#636e72]",
                                                            children: "CANCEL"
                                                        })
                                                    ]
                                                })
                                            ]
                                        }) : c.jsxs(c.Fragment, {
                                            children: [
                                                c.jsx("h2", {
                                                    className: "text-xl font-black text-[#2d3436] mb-1",
                                                    children: d.name
                                                }),
                                                c.jsxs("p", {
                                                    className: "text-sm text-[#636e72] mb-2",
                                                    children: [
                                                        "by ",
                                                        c.jsx("span", {
                                                            className: "font-bold",
                                                            children: d.author.username
                                                        })
                                                    ]
                                                }),
                                                c.jsxs("div", {
                                                    className: "flex items-center gap-2 mb-3 text-xs text-[#636e72]",
                                                    children: [
                                                        c.jsxs("span", {
                                                            className: "px-2 py-0.5 bg-[#f8f9fa] border border-[#dfe6e9] font-medium",
                                                            children: [
                                                                d.boardWidth,
                                                                "x",
                                                                d.boardHeight
                                                            ]
                                                        }),
                                                        c.jsxs("span", {
                                                            children: [
                                                                d.pieceCount,
                                                                " pieces"
                                                            ]
                                                        }),
                                                        c.jsx("span", {
                                                            children: new Date(d.createdAt).toLocaleDateString()
                                                        })
                                                    ]
                                                }),
                                                d.description && c.jsx("p", {
                                                    className: "text-sm text-[#2d3436] whitespace-pre-wrap",
                                                    children: d.description
                                                })
                                            ]
                                        })
                                    }),
                                    c.jsxs("div", {
                                        className: "space-y-2",
                                        children: [
                                            c.jsx("div", {
                                                className: "flex gap-2",
                                                children: c.jsxs("button", {
                                                    onClick: te,
                                                    className: `flex-1 border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all ${d.liked ? "bg-[#ff6b6b]" : "bg-white"}`,
                                                    children: [
                                                        d.liked ? "♥" : "♡",
                                                        " ",
                                                        d.likeCount
                                                    ]
                                                })
                                            }),
                                            c.jsx(we, {
                                                to: `/singleplayer?from=variant&id=${d.id}`,
                                                className: "block w-full bg-[#ff6b6b] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 text-center font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                                children: "PLAY VS AI"
                                            }),
                                            c.jsx(we, {
                                                to: `/create-room?from=variant&id=${d.id}`,
                                                className: "block w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 text-center font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                                children: "CREATE ROOM"
                                            }),
                                            c.jsx("button", {
                                                onClick: S,
                                                className: "w-full bg-[#ffe66d] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                                children: "EDIT IN EDITOR"
                                            }),
                                            z && c.jsxs("div", {
                                                className: "flex gap-2",
                                                children: [
                                                    c.jsx("button", {
                                                        onClick: ()=>W(!0),
                                                        className: "flex-1 bg-[#a29bfe] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                                        children: "EDIT"
                                                    }),
                                                    c.jsx("button", {
                                                        onClick: xe,
                                                        className: "flex-1 bg-[#ff6b6b] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all",
                                                        children: "DELETE"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        className: "bg-white border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-4",
                                        children: [
                                            c.jsxs("h3", {
                                                className: "font-bold text-[#2d3436] mb-3",
                                                children: [
                                                    "COMMENTS (",
                                                    d.commentCount,
                                                    ")"
                                                ]
                                            }),
                                            o ? c.jsxs("div", {
                                                className: "mb-4",
                                                children: [
                                                    c.jsx("textarea", {
                                                        value: R,
                                                        onChange: (B)=>X(B.target.value),
                                                        placeholder: "Add a comment...",
                                                        rows: 2,
                                                        maxLength: 1e3,
                                                        className: "w-full p-2 border-2 border-[#2d3436] font-medium text-sm text-[#2d3436] placeholder:text-[#b2bec3] resize-none mb-2"
                                                    }),
                                                    c.jsx("button", {
                                                        onClick: ne,
                                                        disabled: !R.trim() || H,
                                                        className: "bg-[#4ecdc4] border-2 border-[#2d3436] px-4 py-1.5 font-bold text-sm text-[#2d3436] disabled:opacity-50 hover:brightness-95 transition-all",
                                                        children: H ? "POSTING..." : "POST"
                                                    })
                                                ]
                                            }) : c.jsxs("p", {
                                                className: "text-sm text-[#636e72] mb-4",
                                                children: [
                                                    c.jsx(we, {
                                                        to: `/login?redirect=/variants/${d.id}`,
                                                        className: "text-[#2d3436] font-bold underline",
                                                        children: "Log in"
                                                    }),
                                                    " ",
                                                    "to comment"
                                                ]
                                            }),
                                            c.jsx("div", {
                                                className: "space-y-3",
                                                children: L && N.length === 0 ? c.jsx("p", {
                                                    className: "text-sm text-[#636e72] text-center py-4",
                                                    children: "Loading comments..."
                                                }) : N.length === 0 ? c.jsx("p", {
                                                    className: "text-sm text-[#636e72] text-center py-4",
                                                    children: "No comments yet"
                                                }) : N.map((B)=>c.jsxs("div", {
                                                        className: "border-t border-[#f8f9fa] pt-3",
                                                        children: [
                                                            c.jsxs("div", {
                                                                className: "flex items-center justify-between mb-1",
                                                                children: [
                                                                    c.jsx("span", {
                                                                        className: "text-sm font-bold text-[#2d3436]",
                                                                        children: B.author.username
                                                                    }),
                                                                    c.jsxs("div", {
                                                                        className: "flex items-center gap-2",
                                                                        children: [
                                                                            c.jsx("span", {
                                                                                className: "text-xs text-[#b2bec3]",
                                                                                children: new Date(B.createdAt).toLocaleDateString()
                                                                            }),
                                                                            o && o.id === B.author.id && c.jsx("button", {
                                                                                onClick: ()=>re(B.id),
                                                                                className: "text-xs text-[#ff6b6b] font-bold hover:underline",
                                                                                children: "DELETE"
                                                                            })
                                                                        ]
                                                                    })
                                                                ]
                                                            }),
                                                            c.jsx("p", {
                                                                className: "text-sm text-[#2d3436] whitespace-pre-wrap",
                                                                children: B.content
                                                            })
                                                        ]
                                                    }, B.id))
                                            }),
                                            O && c.jsx("button", {
                                                onClick: ee,
                                                disabled: L,
                                                className: "w-full mt-3 p-2 border-2 border-[#2d3436] font-bold text-sm text-[#636e72] hover:bg-[#f8f9fa] disabled:opacity-50",
                                                children: L ? "LOADING..." : "LOAD MORE COMMENTS"
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        });
    }
    function Gv() {
        const s = Ot(), { user: u } = _l(), [o, r] = x.useState(null), [d, m] = x.useState(!1), [p, b] = x.useState(""), [v, y] = x.useState(""), [N, w] = x.useState(""), [O, V] = x.useState(!1), [L, M] = x.useState(!0);
        x.useEffect(()=>{
            if (!u) {
                s("/login?redirect=/account");
                return;
            }
            mv().then((H)=>{
                r(H.email ?? null), m(H.email_verified ?? !1);
            }).catch(()=>w("Failed to load account info")).finally(()=>M(!1));
        }, [
            u,
            s
        ]);
        const R = async (H)=>{
            H.preventDefault(), w(""), y(""), V(!0);
            try {
                const Y = await wv(p);
                y(Y.message), r(p), m(!1), b("");
            } catch (Y) {
                w(Y instanceof Error ? Y.message : "Failed to set email");
            } finally{
                V(!1);
            }
        }, X = async ()=>{
            w(""), y(""), V(!0);
            try {
                const H = await Sv();
                y(H.message);
            } catch (H) {
                w(H instanceof Error ? H.message : "Failed to resend");
            } finally{
                V(!1);
            }
        };
        return u ? c.jsx("div", {
            className: "min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4",
            children: c.jsxs("div", {
                className: "max-w-md w-full",
                children: [
                    c.jsxs("div", {
                        className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8",
                        children: [
                            c.jsx("h1", {
                                className: "text-3xl font-black text-[#2d3436] mb-6 text-center",
                                children: "ACCOUNT"
                            }),
                            L ? c.jsx("p", {
                                className: "text-center text-[#636e72]",
                                children: "Loading..."
                            }) : c.jsxs("div", {
                                className: "space-y-6",
                                children: [
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("label", {
                                                className: "block font-bold text-[#2d3436] mb-1",
                                                children: "USERNAME"
                                            }),
                                            c.jsx("div", {
                                                className: "w-full p-3 border-3 border-[#dfe6e9] bg-[#f8f9fa] font-medium text-[#636e72]",
                                                children: u.username
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("label", {
                                                className: "block font-bold text-[#2d3436] mb-1",
                                                children: "EMAIL"
                                            }),
                                            o ? c.jsxs("div", {
                                                className: "space-y-2",
                                                children: [
                                                    c.jsxs("div", {
                                                        className: "flex items-center gap-2",
                                                        children: [
                                                            c.jsx("span", {
                                                                className: "font-medium text-[#2d3436]",
                                                                children: o
                                                            }),
                                                            d ? c.jsx("span", {
                                                                className: "text-xs font-bold bg-[#00b894] text-white px-2 py-0.5 border border-[#2d3436]",
                                                                children: "VERIFIED"
                                                            }) : c.jsx("span", {
                                                                className: "text-xs font-bold bg-[#fdcb6e] text-[#2d3436] px-2 py-0.5 border border-[#2d3436]",
                                                                children: "UNVERIFIED"
                                                            })
                                                        ]
                                                    }),
                                                    !d && c.jsx("button", {
                                                        onClick: X,
                                                        disabled: O,
                                                        className: "text-sm font-bold text-[#2d3436] bg-[#4ecdc4] border-2 border-[#2d3436] shadow-[2px_2px_0px_#2d3436] px-3 py-1 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#2d3436] transition-all disabled:opacity-50",
                                                        children: "RESEND VERIFICATION"
                                                    })
                                                ]
                                            }) : c.jsx("p", {
                                                className: "text-sm text-[#636e72] mb-2",
                                                children: "No email set. Add one for password recovery."
                                            })
                                        ]
                                    }),
                                    c.jsxs("form", {
                                        onSubmit: R,
                                        className: "space-y-3",
                                        children: [
                                            c.jsxs("div", {
                                                children: [
                                                    c.jsx("label", {
                                                        className: "block font-bold text-[#2d3436] mb-1 text-sm",
                                                        children: o ? "CHANGE EMAIL" : "ADD EMAIL"
                                                    }),
                                                    c.jsx("input", {
                                                        type: "email",
                                                        value: p,
                                                        onChange: (H)=>b(H.target.value),
                                                        placeholder: "you@example.com",
                                                        className: "w-full p-3 border-3 border-[#2d3436] font-medium text-[#2d3436] placeholder:text-[#b2bec3]",
                                                        required: !0
                                                    })
                                                ]
                                            }),
                                            c.jsx("button", {
                                                type: "submit",
                                                disabled: O,
                                                className: "w-full bg-[#a29bfe] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50",
                                                children: O ? "SAVING..." : o ? "UPDATE EMAIL" : "ADD EMAIL"
                                            })
                                        ]
                                    }),
                                    v && c.jsx("div", {
                                        className: "p-3 bg-[#00b894] border-2 border-[#2d3436] text-[#2d3436] font-medium text-sm",
                                        children: v
                                    }),
                                    N && c.jsx("div", {
                                        className: "p-3 bg-[#ff6b6b] border-2 border-[#2d3436] text-[#2d3436] font-medium text-sm",
                                        children: N
                                    })
                                ]
                            })
                        ]
                    }),
                    c.jsx("div", {
                        className: "text-center mt-4",
                        children: c.jsx(we, {
                            to: "/",
                            className: "text-[#636e72] font-medium text-sm hover:text-[#2d3436]",
                            children: "Back to Home"
                        })
                    })
                ]
            })
        }) : null;
    }
    function Yv() {
        const [s, u] = x.useState(""), [o, r] = x.useState(""), [d, m] = x.useState(""), [p, b] = x.useState(!1), v = async (y)=>{
            y.preventDefault(), m(""), r(""), b(!0);
            try {
                const N = await _v(s);
                r(N.message);
            } catch (N) {
                m(N instanceof Error ? N.message : "Something went wrong");
            } finally{
                b(!1);
            }
        };
        return c.jsx("div", {
            className: "min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4",
            children: c.jsxs("div", {
                className: "max-w-sm w-full",
                children: [
                    c.jsxs("div", {
                        className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8",
                        children: [
                            c.jsx("h1", {
                                className: "text-3xl font-black text-[#2d3436] mb-2 text-center",
                                children: "FORGOT PASSWORD"
                            }),
                            c.jsx("p", {
                                className: "text-center text-[#636e72] text-sm mb-6",
                                children: "Enter your username or email to receive a reset link."
                            }),
                            c.jsxs("form", {
                                onSubmit: v,
                                className: "space-y-4",
                                children: [
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("label", {
                                                className: "block font-bold text-[#2d3436] mb-1",
                                                children: "USERNAME OR EMAIL"
                                            }),
                                            c.jsx("input", {
                                                type: "text",
                                                value: s,
                                                onChange: (y)=>u(y.target.value),
                                                className: "w-full p-3 border-3 border-[#2d3436] font-medium text-[#2d3436]",
                                                required: !0
                                            })
                                        ]
                                    }),
                                    o && c.jsx("div", {
                                        className: "p-3 bg-[#00b894] border-2 border-[#2d3436] text-[#2d3436] font-medium text-sm",
                                        children: o
                                    }),
                                    d && c.jsx("div", {
                                        className: "p-3 bg-[#ff6b6b] border-2 border-[#2d3436] text-[#2d3436] font-medium text-sm",
                                        children: d
                                    }),
                                    c.jsx("button", {
                                        type: "submit",
                                        disabled: p,
                                        className: "w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50",
                                        children: p ? "SENDING..." : "SEND RESET LINK"
                                    })
                                ]
                            }),
                            c.jsx("p", {
                                className: "text-center text-[#636e72] mt-4 text-sm",
                                children: c.jsx(we, {
                                    to: "/login",
                                    className: "text-[#2d3436] font-bold underline",
                                    children: "Back to Login"
                                })
                            })
                        ]
                    }),
                    c.jsx("div", {
                        className: "text-center mt-4",
                        children: c.jsx(we, {
                            to: "/",
                            className: "text-[#636e72] font-medium text-sm hover:text-[#2d3436]",
                            children: "Back to Home"
                        })
                    })
                ]
            })
        });
    }
    function Vv() {
        const [s] = cn(), u = Ot(), o = s.get("token") || "", [r, d] = x.useState(""), [m, p] = x.useState(""), [b, v] = x.useState(""), [y, N] = x.useState(!1), [w, O] = x.useState(!1), V = async (L)=>{
            if (L.preventDefault(), v(""), r.length < 8) {
                v("Password must be at least 8 characters");
                return;
            }
            if (r !== m) {
                v("Passwords do not match");
                return;
            }
            O(!0);
            try {
                await Nv(o, r), N(!0), setTimeout(()=>u("/login"), 3e3);
            } catch (M) {
                v(M instanceof Error ? M.message : "Failed to reset password");
            } finally{
                O(!1);
            }
        };
        return o ? y ? c.jsx("div", {
            className: "min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4",
            children: c.jsx("div", {
                className: "max-w-sm w-full",
                children: c.jsxs("div", {
                    className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8 text-center",
                    children: [
                        c.jsx("h1", {
                            className: "text-3xl font-black text-[#2d3436] mb-4",
                            children: "PASSWORD RESET"
                        }),
                        c.jsx("div", {
                            className: "p-3 bg-[#00b894] border-2 border-[#2d3436] text-[#2d3436] font-medium text-sm mb-4",
                            children: "Password reset successful! Redirecting to login..."
                        }),
                        c.jsx(we, {
                            to: "/login",
                            className: "text-[#2d3436] font-bold underline",
                            children: "Go to Login"
                        })
                    ]
                })
            })
        }) : c.jsx("div", {
            className: "min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4",
            children: c.jsxs("div", {
                className: "max-w-sm w-full",
                children: [
                    c.jsxs("div", {
                        className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8",
                        children: [
                            c.jsx("h1", {
                                className: "text-3xl font-black text-[#2d3436] mb-6 text-center",
                                children: "RESET PASSWORD"
                            }),
                            c.jsxs("form", {
                                onSubmit: V,
                                className: "space-y-4",
                                children: [
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("label", {
                                                className: "block font-bold text-[#2d3436] mb-1",
                                                children: "NEW PASSWORD"
                                            }),
                                            c.jsx("input", {
                                                type: "password",
                                                value: r,
                                                onChange: (L)=>d(L.target.value),
                                                placeholder: "8+ characters",
                                                className: "w-full p-3 border-3 border-[#2d3436] font-medium text-[#2d3436] placeholder:text-[#b2bec3]",
                                                required: !0
                                            })
                                        ]
                                    }),
                                    c.jsxs("div", {
                                        children: [
                                            c.jsx("label", {
                                                className: "block font-bold text-[#2d3436] mb-1",
                                                children: "CONFIRM PASSWORD"
                                            }),
                                            c.jsx("input", {
                                                type: "password",
                                                value: m,
                                                onChange: (L)=>p(L.target.value),
                                                className: "w-full p-3 border-3 border-[#2d3436] font-medium text-[#2d3436]",
                                                required: !0
                                            })
                                        ]
                                    }),
                                    b && c.jsx("div", {
                                        className: "p-3 bg-[#ff6b6b] border-2 border-[#2d3436] text-[#2d3436] font-medium text-sm",
                                        children: b
                                    }),
                                    c.jsx("button", {
                                        type: "submit",
                                        disabled: w,
                                        className: "w-full bg-[#4ecdc4] border-4 border-[#2d3436] shadow-[4px_4px_0px_#2d3436] p-3 font-bold text-[#2d3436] hover:translate-x-1 hover:translate-y-1 hover:shadow-[2px_2px_0px_#2d3436] transition-all disabled:opacity-50",
                                        children: w ? "RESETTING..." : "RESET PASSWORD"
                                    })
                                ]
                            }),
                            c.jsx("p", {
                                className: "text-center text-[#636e72] mt-4 text-sm",
                                children: c.jsx(we, {
                                    to: "/forgot-password",
                                    className: "text-[#2d3436] font-bold underline",
                                    children: "Request a new link"
                                })
                            })
                        ]
                    }),
                    c.jsx("div", {
                        className: "text-center mt-4",
                        children: c.jsx(we, {
                            to: "/",
                            className: "text-[#636e72] font-medium text-sm hover:text-[#2d3436]",
                            children: "Back to Home"
                        })
                    })
                ]
            })
        }) : c.jsx("div", {
            className: "min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4",
            children: c.jsx("div", {
                className: "max-w-sm w-full",
                children: c.jsxs("div", {
                    className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8 text-center",
                    children: [
                        c.jsx("h1", {
                            className: "text-3xl font-black text-[#2d3436] mb-4",
                            children: "INVALID LINK"
                        }),
                        c.jsx("p", {
                            className: "text-[#636e72] mb-4",
                            children: "This reset link is missing a token."
                        }),
                        c.jsx(we, {
                            to: "/forgot-password",
                            className: "text-[#2d3436] font-bold underline",
                            children: "Request a new reset link"
                        })
                    ]
                })
            })
        });
    }
    function Xv() {
        const [s] = cn(), u = s.get("token") || "", [o, r] = x.useState("loading"), [d, m] = x.useState("");
        return x.useEffect(()=>{
            if (!u) {
                r("error"), m("Missing verification token.");
                return;
            }
            Tv(u).then((p)=>{
                r("success"), m(p.message);
            }).catch((p)=>{
                r("error"), m(p instanceof Error ? p.message : "Verification failed");
            });
        }, [
            u
        ]), c.jsx("div", {
            className: "min-h-screen bg-[#f8f9fa] flex items-center justify-center p-4",
            children: c.jsxs("div", {
                className: "max-w-sm w-full",
                children: [
                    c.jsxs("div", {
                        className: "bg-white border-4 border-[#2d3436] shadow-[8px_8px_0px_#2d3436] p-8 text-center",
                        children: [
                            c.jsx("h1", {
                                className: "text-3xl font-black text-[#2d3436] mb-4",
                                children: "EMAIL VERIFICATION"
                            }),
                            o === "loading" && c.jsx("p", {
                                className: "text-[#636e72] font-medium",
                                children: "Verifying your email..."
                            }),
                            o === "success" && c.jsxs("div", {
                                className: "space-y-4",
                                children: [
                                    c.jsx("div", {
                                        className: "p-3 bg-[#00b894] border-2 border-[#2d3436] text-[#2d3436] font-medium text-sm",
                                        children: d
                                    }),
                                    c.jsxs("div", {
                                        className: "flex gap-2 justify-center",
                                        children: [
                                            c.jsx(we, {
                                                to: "/account",
                                                className: "text-sm font-bold text-[#2d3436] bg-[#a29bfe] border-2 border-[#2d3436] shadow-[2px_2px_0px_#2d3436] px-4 py-2 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#2d3436] transition-all",
                                                children: "ACCOUNT"
                                            }),
                                            c.jsx(we, {
                                                to: "/",
                                                className: "text-sm font-bold text-[#2d3436] bg-[#4ecdc4] border-2 border-[#2d3436] shadow-[2px_2px_0px_#2d3436] px-4 py-2 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#2d3436] transition-all",
                                                children: "HOME"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            o === "error" && c.jsxs("div", {
                                className: "space-y-4",
                                children: [
                                    c.jsx("div", {
                                        className: "p-3 bg-[#ff6b6b] border-2 border-[#2d3436] text-[#2d3436] font-medium text-sm",
                                        children: d
                                    }),
                                    c.jsx(we, {
                                        to: "/account",
                                        className: "inline-block text-sm font-bold text-[#2d3436] bg-[#a29bfe] border-2 border-[#2d3436] shadow-[2px_2px_0px_#2d3436] px-4 py-2 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[1px_1px_0px_#2d3436] transition-all",
                                        children: "ACCOUNT SETTINGS"
                                    })
                                ]
                            })
                        ]
                    }),
                    c.jsx("div", {
                        className: "text-center mt-4",
                        children: c.jsx(we, {
                            to: "/",
                            className: "text-[#636e72] font-medium text-sm hover:text-[#2d3436]",
                            children: "Back to Home"
                        })
                    })
                ]
            })
        });
    }
    function Qv() {
        const { user: s, logout: u } = _l(), o = Sl();
        return o.pathname === "/login" || o.pathname === "/register" ? null : c.jsx("div", {
            className: "fixed top-0 right-0 z-40 p-2",
            children: s ? c.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                    c.jsx(we, {
                        to: "/account",
                        className: "text-xs font-bold text-[#2d3436] bg-white/90 px-2 py-1 border border-[#2d3436] hover:bg-[#dfe6e9] transition-colors",
                        children: s.username
                    }),
                    c.jsx("button", {
                        onClick: u,
                        className: "text-xs font-bold text-[#636e72] bg-white/90 px-2 py-1 border border-[#2d3436] hover:bg-[#ff6b6b] hover:text-[#2d3436] transition-colors",
                        children: "LOGOUT"
                    })
                ]
            }) : c.jsxs("div", {
                className: "flex items-center gap-1",
                children: [
                    c.jsx(we, {
                        to: `/login?redirect=${encodeURIComponent(o.pathname)}`,
                        className: "text-xs font-bold text-[#2d3436] bg-white/90 px-2 py-1 border border-[#2d3436] hover:bg-[#4ecdc4] transition-colors",
                        children: "LOG IN"
                    }),
                    c.jsx(we, {
                        to: `/register?redirect=${encodeURIComponent(o.pathname)}`,
                        className: "text-xs font-bold text-[#2d3436] bg-[#a29bfe]/90 px-2 py-1 border border-[#2d3436] hover:brightness-95 transition-colors",
                        children: "REGISTER"
                    })
                ]
            })
        });
    }
    function Zv() {
        return c.jsx(u3, {
            children: c.jsxs(Gb, {
                children: [
                    c.jsx(Qv, {}),
                    c.jsxs(xb, {
                        children: [
                            c.jsx(mt, {
                                path: "/",
                                element: c.jsx(r3, {})
                            }),
                            c.jsx(mt, {
                                path: "/singleplayer",
                                element: c.jsx(jv, {})
                            }),
                            c.jsx(mt, {
                                path: "/multiplayer",
                                element: c.jsx(Ev, {})
                            }),
                            c.jsx(mt, {
                                path: "/create-room",
                                element: c.jsx(Cv, {})
                            }),
                            c.jsx(mt, {
                                path: "/room/:roomId",
                                element: c.jsx(Av, {})
                            }),
                            c.jsx(mt, {
                                path: "/editor",
                                element: c.jsx(Uv, {})
                            }),
                            c.jsx(mt, {
                                path: "/login",
                                element: c.jsx(Lv, {})
                            }),
                            c.jsx(mt, {
                                path: "/register",
                                element: c.jsx(Hv, {})
                            }),
                            c.jsx(mt, {
                                path: "/browse",
                                element: c.jsx(Bv, {})
                            }),
                            c.jsx(mt, {
                                path: "/variants/:id",
                                element: c.jsx(qv, {})
                            }),
                            c.jsx(mt, {
                                path: "/account",
                                element: c.jsx(Gv, {})
                            }),
                            c.jsx(mt, {
                                path: "/forgot-password",
                                element: c.jsx(Yv, {})
                            }),
                            c.jsx(mt, {
                                path: "/reset-password",
                                element: c.jsx(Vv, {})
                            }),
                            c.jsx(mt, {
                                path: "/verify-email",
                                element: c.jsx(Xv, {})
                            })
                        ]
                    })
                ]
            })
        });
    }
    vy.createRoot(document.getElementById("root")).render(c.jsx(x.StrictMode, {
        children: c.jsx(Zv, {})
    }));
})();

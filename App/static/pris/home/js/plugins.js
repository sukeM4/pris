/* Modernizr 2.7.1 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-backgroundsize-borderradius-boxshadow-flexbox-rgba-cssanimations-csstransforms-csstransforms3d-csstransitions-canvas-audio-video-svg-shiv-cssclasses-prefixed-teststyles-testprop-testallprops-prefixes-domprefixes-load
 */
;
window.Modernizr = function(a, b, c) {
        function A(a) { j.cssText = a }

        function B(a, b) { return A(m.join(a + ";") + (b || "")) }

        function C(a, b) { return typeof a === b }

        function D(a, b) { return !!~("" + a).indexOf(b) }

        function E(a, b) { for (var d in a) { var e = a[d]; if (!D(e, "-") && j[e] !== c) return b == "pfx" ? e : !0 } return !1 }

        function F(a, b, d) { for (var e in a) { var f = b[a[e]]; if (f !== c) return d === !1 ? a[e] : C(f, "function") ? f.bind(d || b) : f } return !1 }

        function G(a, b, c) {
            var d = a.charAt(0).toUpperCase() + a.slice(1),
                e = (a + " " + o.join(d + " ") + d).split(" ");
            return C(b, "string") || C(b, "undefined") ? E(e, b) : (e = (a + " " + p.join(d + " ") + d).split(" "), F(e, b, c))
        }
        var d = "2.7.1",
            e = {},
            f = !0,
            g = b.documentElement,
            h = "modernizr",
            i = b.createElement(h),
            j = i.style,
            k, l = {}.toString,
            m = " -webkit- -moz- -o- -ms- ".split(" "),
            n = "Webkit Moz O ms",
            o = n.split(" "),
            p = n.toLowerCase().split(" "),
            q = { svg: "http://www.w3.org/2000/svg" },
            r = {},
            s = {},
            t = {},
            u = [],
            v = u.slice,
            w, x = function(a, c, d, e) {
                var f, i, j, k, l = b.createElement("div"),
                    m = b.body,
                    n = m || b.createElement("body");
                if (parseInt(d, 10))
                    while (d--) j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
                return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i
            },
            y = {}.hasOwnProperty,
            z;
        !C(y, "undefined") && !C(y.call, "undefined") ? z = function(a, b) { return y.call(a, b) } : z = function(a, b) { return b in a && C(a.constructor.prototype[b], "undefined") }, Function.prototype.bind || (Function.prototype.bind = function(b) {
            var c = this;
            if (typeof c != "function") throw new TypeError;
            var d = v.call(arguments, 1),
                e = function() {
                    if (this instanceof e) {
                        var a = function() {};
                        a.prototype = c.prototype;
                        var f = new a,
                            g = c.apply(f, d.concat(v.call(arguments)));
                        return Object(g) === g ? g : f
                    }
                    return c.apply(b, d.concat(v.call(arguments)))
                };
            return e
        }), r.flexbox = function() { return G("flexWrap") }, r.canvas = function() { var a = b.createElement("canvas"); return !!a.getContext && !!a.getContext("2d") }, r.rgba = function() { return A("background-color:rgba(150,255,150,.5)"), D(j.backgroundColor, "rgba") }, r.backgroundsize = function() { return G("backgroundSize") }, r.borderradius = function() { return G("borderRadius") }, r.boxshadow = function() { return G("boxShadow") }, r.cssanimations = function() { return G("animationName") }, r.csstransforms = function() { return !!G("transform") }, r.csstransforms3d = function() { var a = !!G("perspective"); return a && "webkitPerspective" in g.style && x("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(b, c) { a = b.offsetLeft === 9 && b.offsetHeight === 3 }), a }, r.csstransitions = function() { return G("transition") }, r.video = function() {
            var a = b.createElement("video"),
                c = !1;
            try { if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), c.h264 = a.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), c.webm = a.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, "") } catch (d) {}
            return c
        }, r.audio = function() {
            var a = b.createElement("audio"),
                c = !1;
            try { if (c = !!a.canPlayType) c = new Boolean(c), c.ogg = a.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), c.mp3 = a.canPlayType("audio/mpeg;").replace(/^no$/, ""), c.wav = a.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), c.m4a = (a.canPlayType("audio/x-m4a;") || a.canPlayType("audio/aac;")).replace(/^no$/, "") } catch (d) {}
            return c
        }, r.svg = function() { return !!b.createElementNS && !!b.createElementNS(q.svg, "svg").createSVGRect };
        for (var H in r) z(r, H) && (w = H.toLowerCase(), e[w] = r[H](), u.push((e[w] ? "" : "no-") + w));
        return e.addTest = function(a, b) {
                if (typeof a == "object")
                    for (var d in a) z(a, d) && e.addTest(d, a[d]);
                else {
                    a = a.toLowerCase();
                    if (e[a] !== c) return e;
                    b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
                }
                return e
            }, A(""), i = k = null,
            function(a, b) {
                function l(a, b) {
                    var c = a.createElement("p"),
                        d = a.getElementsByTagName("head")[0] || a.documentElement;
                    return c.innerHTML = "x<style>" + b + "</style>", d.insertBefore(c.lastChild, d.firstChild)
                }

                function m() { var a = s.elements; return typeof a == "string" ? a.split(" ") : a }

                function n(a) { var b = j[a[h]]; return b || (b = {}, i++, a[h] = i, j[i] = b), b }

                function o(a, c, d) {
                    c || (c = b);
                    if (k) return c.createElement(a);
                    d || (d = n(c));
                    var g;
                    return d.cache[a] ? g = d.cache[a].cloneNode() : f.test(a) ? g = (d.cache[a] = d.createElem(a)).cloneNode() : g = d.createElem(a), g.canHaveChildren && !e.test(a) && !g.tagUrn ? d.frag.appendChild(g) : g
                }

                function p(a, c) {
                    a || (a = b);
                    if (k) return a.createDocumentFragment();
                    c = c || n(a);
                    var d = c.frag.cloneNode(),
                        e = 0,
                        f = m(),
                        g = f.length;
                    for (; e < g; e++) d.createElement(f[e]);
                    return d
                }

                function q(a, b) { b.cache || (b.cache = {}, b.createElem = a.createElement, b.createFrag = a.createDocumentFragment, b.frag = b.createFrag()), a.createElement = function(c) { return s.shivMethods ? o(c, a, b) : b.createElem(c) }, a.createDocumentFragment = Function("h,f", "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" + m().join().replace(/[\w\-]+/g, function(a) { return b.createElem(a), b.frag.createElement(a), 'c("' + a + '")' }) + ");return n}")(s, b.frag) }

                function r(a) { a || (a = b); var c = n(a); return s.shivCSS && !g && !c.hasCSS && (c.hasCSS = !!l(a, "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")), k || q(a, c), a }
                var c = "3.7.0",
                    d = a.html5 || {},
                    e = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
                    f = /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
                    g, h = "_html5shiv",
                    i = 0,
                    j = {},
                    k;
                (function() {
                    try {
                        var a = b.createElement("a");
                        a.innerHTML = "<xyz></xyz>", g = "hidden" in a, k = a.childNodes.length == 1 || function() { b.createElement("a"); var a = b.createDocumentFragment(); return typeof a.cloneNode == "undefined" || typeof a.createDocumentFragment == "undefined" || typeof a.createElement == "undefined" }()
                    } catch (c) { g = !0, k = !0 }
                })();
                var s = { elements: d.elements || "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video", version: c, shivCSS: d.shivCSS !== !1, supportsUnknownElements: k, shivMethods: d.shivMethods !== !1, type: "default", shivDocument: r, createElement: o, createDocumentFragment: p };
                a.html5 = s, r(b)
            }(this, b), e._version = d, e._prefixes = m, e._domPrefixes = p, e._cssomPrefixes = o, e.testProp = function(a) { return E([a]) }, e.testAllProps = G, e.testStyles = x, e.prefixed = function(a, b, c) { return b ? G(a, b, c) : G(a, "pfx") }, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + u.join(" ") : ""), e
    }(this, this.document),
    function(a, b, c) {
        function d(a) { return "[object Function]" == o.call(a) }

        function e(a) { return "string" == typeof a }

        function f() {}

        function g(a) { return !a || "loaded" == a || "complete" == a || "uninitialized" == a }

        function h() {
            var a = p.shift();
            q = 1, a ? a.t ? m(function() {
                ("c" == a.t ? B.injectCss : B.injectJs)(a.s, 0, a.a, a.x, a.e, 1)
            }, 0) : (a(), h()) : q = 0
        }

        function i(a, c, d, e, f, i, j) {
            function k(b) { if (!o && g(l.readyState) && (u.r = o = 1, !q && h(), l.onload = l.onreadystatechange = null, b)) { "img" != a && m(function() { t.removeChild(l) }, 50); for (var d in y[c]) y[c].hasOwnProperty(d) && y[c][d].onload() } }
            var j = j || B.errorTimeout,
                l = b.createElement(a),
                o = 0,
                r = 0,
                u = { t: d, s: c, e: f, a: i, x: j };
            1 === y[c] && (r = 1, y[c] = []), "object" == a ? l.data = c : (l.src = c, l.type = a), l.width = l.height = "0", l.onerror = l.onload = l.onreadystatechange = function() { k.call(this, r) }, p.splice(e, 0, u), "img" != a && (r || 2 === y[c] ? (t.insertBefore(l, s ? null : n), m(k, j)) : y[c].push(l))
        }

        function j(a, b, c, d, f) { return q = 0, b = b || "j", e(a) ? i("c" == b ? v : u, a, b, this.i++, c, d, f) : (p.splice(this.i++, 0, a), 1 == p.length && h()), this }

        function k() { var a = B; return a.loader = { load: j, i: 0 }, a }
        var l = b.documentElement,
            m = a.setTimeout,
            n = b.getElementsByTagName("script")[0],
            o = {}.toString,
            p = [],
            q = 0,
            r = "MozAppearance" in l.style,
            s = r && !!b.createRange().compareNode,
            t = s ? l : n.parentNode,
            l = a.opera && "[object Opera]" == o.call(a.opera),
            l = !!b.attachEvent && !l,
            u = r ? "object" : l ? "script" : "img",
            v = l ? "script" : u,
            w = Array.isArray || function(a) { return "[object Array]" == o.call(a) },
            x = [],
            y = {},
            z = { timeout: function(a, b) { return b.length && (a.timeout = b[0]), a } },
            A, B;
        B = function(a) {
            function b(a) {
                var a = a.split("!"),
                    b = x.length,
                    c = a.pop(),
                    d = a.length,
                    c = { url: c, origUrl: c, prefixes: a },
                    e, f, g;
                for (f = 0; f < d; f++) g = a[f].split("="), (e = z[g.shift()]) && (c = e(c, g));
                for (f = 0; f < b; f++) c = x[f](c);
                return c
            }

            function g(a, e, f, g, h) {
                var i = b(a),
                    j = i.autoCallback;
                i.url.split(".").pop().split("?").shift(), i.bypass || (e && (e = d(e) ? e : e[a] || e[g] || e[a.split("/").pop().split("?")[0]]), i.instead ? i.instead(a, e, f, g, h) : (y[i.url] ? i.noexec = !0 : y[i.url] = 1, f.load(i.url, i.forceCSS || !i.forceJS && "css" == i.url.split(".").pop().split("?").shift() ? "c" : c, i.noexec, i.attrs, i.timeout), (d(e) || d(j)) && f.load(function() { k(), e && e(i.origUrl, h, g), j && j(i.origUrl, h, g), y[i.url] = 2 })))
            }

            function h(a, b) {
                function c(a, c) {
                    if (a) {
                        if (e(a)) c || (j = function() {
                            var a = [].slice.call(arguments);
                            k.apply(this, a), l()
                        }), g(a, j, b, 0, h);
                        else if (Object(a) === a)
                            for (n in m = function() {
                                    var b = 0,
                                        c;
                                    for (c in a) a.hasOwnProperty(c) && b++;
                                    return b
                                }(), a) a.hasOwnProperty(n) && (!c && !--m && (d(j) ? j = function() {
                                var a = [].slice.call(arguments);
                                k.apply(this, a), l()
                            } : j[n] = function(a) {
                                return function() {
                                    var b = [].slice.call(arguments);
                                    a && a.apply(this, b), l()
                                }
                            }(k[n])), g(a[n], j, b, n, h))
                    } else !c && l()
                }
                var h = !!a.test,
                    i = a.load || a.both,
                    j = a.callback || f,
                    k = j,
                    l = a.complete || f,
                    m, n;
                c(h ? a.yep : a.nope, !!i), i && c(i)
            }
            var i, j, l = this.yepnope.loader;
            if (e(a)) g(a, 0, l, 0);
            else if (w(a))
                for (i = 0; i < a.length; i++) j = a[i], e(j) ? g(j, 0, l, 0) : w(j) ? B(j) : Object(j) === j && h(j, l);
            else Object(a) === a && h(a, l)
        }, B.addPrefix = function(a, b) { z[a] = b }, B.addFilter = function(a) { x.push(a) }, B.errorTimeout = 1e4, null == b.readyState && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", A = function() { b.removeEventListener("DOMContentLoaded", A, 0), b.readyState = "complete" }, 0)), a.yepnope = k(), a.yepnope.executeStack = h, a.yepnope.injectJs = function(a, c, d, e, i, j) {
            var k = b.createElement("script"),
                l, o, e = e || B.errorTimeout;
            k.src = a;
            for (o in d) k.setAttribute(o, d[o]);
            c = j ? h : c || f, k.onreadystatechange = k.onload = function() {!l && g(k.readyState) && (l = 1, c(), k.onload = k.onreadystatechange = null) }, m(function() { l || (l = 1, c(1)) }, e), i ? k.onload() : n.parentNode.insertBefore(k, n)
        }, a.yepnope.injectCss = function(a, c, d, e, g, i) {
            var e = b.createElement("link"),
                j, c = i ? h : c || f;
            e.href = a, e.rel = "stylesheet", e.type = "text/css";
            for (j in d) e.setAttribute(j, d[j]);
            g || (n.parentNode.insertBefore(e, n), m(c, 0))
        }
    }(this, document), Modernizr.load = function() { yepnope.apply(window, [].slice.call(arguments, 0)) };

/*! waitForImages jQuery Plugin 2013-07-20 https://github.com/alexanderdickson/waitForImages */
! function(a) {
    var b = "waitForImages";
    a.waitForImages = { hasImageProperties: ["backgroundImage", "listStyleImage", "borderImage", "borderCornerImage", "cursor"] }, a.expr[":"].uncached = function(b) { if (!a(b).is('img[src!=""]')) return !1; var c = new Image; return c.src = b.src, !c.complete }, a.fn.waitForImages = function(c, d, e) {
        var f = 0,
            g = 0;
        if (a.isPlainObject(arguments[0]) && (e = arguments[0].waitForAll, d = arguments[0].each, c = arguments[0].finished), c = c || a.noop, d = d || a.noop, e = !!e, !a.isFunction(c) || !a.isFunction(d)) throw new TypeError("An invalid callback was supplied.");
        return this.each(function() {
            var h = a(this),
                i = [],
                j = a.waitForImages.hasImageProperties || [],
                k = /url\(\s*(['"]?)(.*?)\1\s*\)/g;
            e ? h.find("*").addBack().each(function() {
                var b = a(this);
                b.is("img:uncached") && i.push({ src: b.attr("src"), element: b[0] }), a.each(j, function(a, c) { var d, e = b.css(c); if (!e) return !0; for (; d = k.exec(e);) i.push({ src: d[2], element: b[0] }) })
            }) : h.find("img:uncached").each(function() { i.push({ src: this.src, element: this }) }), f = i.length, g = 0, 0 === f && c.call(h[0]), a.each(i, function(e, i) {
                var j = new Image;
                a(j).on("load." + b + " error." + b, function(a) { return g++, d.call(i.element, g, f, "load" == a.type), g == f ? (c.call(h[0]), !1) : void 0 }), j.src = i.src
            })
        })
    }
}(jQuery);

/*! skrollr 0.6.21 (2014-01-06) | Alexander Prinzhorn - https://github.com/Prinzhorn/skrollr | Free to use under terms of MIT license */
(function(e, t, r) {
    "use strict";

    function n(r) {
        if (o = t.documentElement, a = t.body, K(), it = this, r = r || {}, ut = r.constants || {}, r.easing)
            for (var n in r.easing) U[n] = r.easing[n];
        yt = r.edgeStrategy || "set", ct = { beforerender: r.beforerender, render: r.render }, ft = r.forceHeight !== !1, ft && (zt = r.scale || 1), pt = r.mobileDeceleration || E, gt = r.smoothScrolling !== !1, vt = r.smoothScrollingDuration || x, dt = { targetTop: it.getScrollTop() }, _t = (r.mobileCheck || function() { return /Android|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent || navigator.vendor || e.opera) })(), _t ? (st = t.getElementById("skrollr-body"), st && at(), X(), Ct(o, [y, S], [T])) : Ct(o, [y, b], [T]), it.refresh(), St(e, "resize orientationchange", function() {
            var e = o.clientWidth,
                t = o.clientHeight;
            (t !== $t || e !== Lt) && ($t = t, Lt = e, Mt = !0)
        });
        var i = Y();
        return function l() { Z(), bt = i(l) }(), it
    }
    var o, a, i = e.skrollr = { get: function() { return it }, init: function(e) { return it || new n(e) }, VERSION: "0.6.21" },
        l = Object.prototype.hasOwnProperty,
        s = e.Math,
        c = e.getComputedStyle,
        f = "touchstart",
        u = "touchmove",
        p = "touchcancel",
        m = "touchend",
        g = "skrollable",
        v = g + "-before",
        d = g + "-between",
        h = g + "-after",
        y = "skrollr",
        T = "no-" + y,
        b = y + "-desktop",
        S = y + "-mobile",
        w = "linear",
        k = 1e3,
        E = .004,
        x = 200,
        A = "start",
        F = "end",
        C = "center",
        D = "bottom",
        H = "___skrollable_id",
        N = /^(?:input|textarea|button|select)$/i,
        P = /^\s+|\s+$/g,
        V = /^data(?:-(_\w+))?(?:-?(-?\d*\.?\d+p?))?(?:-?(start|end|top|center|bottom))?(?:-?(top|center|bottom))?$/,
        z = /\s*([\w\-\[\]]+)\s*:\s*(.+?)\s*(?:;|$)/gi,
        O = /^([a-z\-]+)\[(\w+)\]$/,
        q = /-([a-z])/g,
        I = function(e, t) { return t.toUpperCase() },
        L = /[\-+]?[\d]*\.?[\d]+/g,
        $ = /\{\?\}/g,
        M = /rgba?\(\s*-?\d+\s*,\s*-?\d+\s*,\s*-?\d+/g,
        B = /[a-z\-]+-gradient/g,
        _ = "",
        G = "",
        K = function() {
            var e = /^(?:O|Moz|webkit|ms)|(?:-(?:o|moz|webkit|ms)-)/;
            if (c) {
                var t = c(a, null);
                for (var n in t)
                    if (_ = n.match(e) || +n == n && t[n].match(e)) break;
                if (!_) return _ = G = "", r;
                _ = _[0], "-" === _.slice(0, 1) ? (G = _, _ = { "-webkit-": "webkit", "-moz-": "Moz", "-ms-": "ms", "-o-": "O" }[_]) : G = "-" + _.toLowerCase() + "-"
            }
        },
        Y = function() {
            var t = e.requestAnimationFrame || e[_.toLowerCase() + "RequestAnimationFrame"],
                r = Nt();
            return (_t || !t) && (t = function(t) {
                var n = Nt() - r,
                    o = s.max(0, 1e3 / 60 - n);
                return e.setTimeout(function() { r = Nt(), t() }, o)
            }), t
        },
        R = function() { var t = e.cancelAnimationFrame || e[_.toLowerCase() + "CancelAnimationFrame"]; return (_t || !t) && (t = function(t) { return e.clearTimeout(t) }), t },
        U = {
            begin: function() { return 0 },
            end: function() { return 1 },
            linear: function(e) { return e },
            quadratic: function(e) { return e * e },
            cubic: function(e) { return e * e * e },
            swing: function(e) { return -s.cos(e * s.PI) / 2 + .5 },
            sqrt: function(e) { return s.sqrt(e) },
            outCubic: function(e) { return s.pow(e - 1, 3) + 1 },
            bounce: function(e) {
                var t;
                if (.5083 >= e) t = 3;
                else if (.8489 >= e) t = 9;
                else if (.96208 >= e) t = 27;
                else {
                    if (!(.99981 >= e)) return 1;
                    t = 91
                }
                return 1 - s.abs(3 * s.cos(1.028 * e * t) / t)
            }
        };
    n.prototype.refresh = function(e) {
        var n, o, a = !1;
        for (e === r ? (a = !0, lt = [], Bt = 0, e = t.getElementsByTagName("*")) : e = [].concat(e), n = 0, o = e.length; o > n; n++) {
            var i = e[n],
                l = i,
                s = [],
                c = gt,
                f = yt;
            if (i.attributes) {
                for (var u = 0, p = i.attributes.length; p > u; u++) {
                    var m = i.attributes[u];
                    if ("data-anchor-target" !== m.name)
                        if ("data-smooth-scrolling" !== m.name)
                            if ("data-edge-strategy" !== m.name) {
                                var v = m.name.match(V);
                                if (null !== v) {
                                    var d = { props: m.value, element: i };
                                    s.push(d);
                                    var h = v[1];
                                    h && (d.constant = h.substr(1));
                                    var y = v[2];
                                    /p$/.test(y) ? (d.isPercentage = !0, d.offset = (0 | y.slice(0, -1)) / 100) : d.offset = 0 | y;
                                    var T = v[3],
                                        b = v[4] || T;
                                    T && T !== A && T !== F ? (d.mode = "relative", d.anchors = [T, b]) : (d.mode = "absolute", T === F ? d.isEnd = !0 : d.isPercentage || (d.offset = d.offset * zt))
                                }
                            } else f = m.value;
                    else c = "off" !== m.value;
                    else if (l = t.querySelector(m.value), null === l) throw 'Unable to find anchor target "' + m.value + '"'
                }
                if (s.length) { var S, w, k;!a && H in i ? (k = i[H], S = lt[k].styleAttr, w = lt[k].classAttr) : (k = i[H] = Bt++, S = i.style.cssText, w = Ft(i)), lt[k] = { element: i, styleAttr: S, classAttr: w, anchorTarget: l, keyFrames: s, smoothScrolling: c, edgeStrategy: f }, Ct(i, [g], []) }
            }
        }
        for (Et(), n = 0, o = e.length; o > n; n++) {
            var E = lt[e[n][H]];
            E !== r && (J(E), et(E))
        }
        return it
    }, n.prototype.relativeToAbsolute = function(e, t, r) {
        var n = o.clientHeight,
            a = e.getBoundingClientRect(),
            i = a.top,
            l = a.bottom - a.top;
        return t === D ? i -= n : t === C && (i -= n / 2), r === D ? i += l : r === C && (i += l / 2), i += it.getScrollTop(), 0 | i + .5
    }, n.prototype.animateTo = function(e, t) {
        t = t || {};
        var n = Nt(),
            o = it.getScrollTop();
        return mt = { startTop: o, topDiff: e - o, targetTop: e, duration: t.duration || k, startTime: n, endTime: n + (t.duration || k), easing: U[t.easing || w], done: t.done }, mt.topDiff || (mt.done && mt.done.call(it, !1), mt = r), it
    }, n.prototype.stopAnimateTo = function() { mt && mt.done && mt.done.call(it, !0), mt = r }, n.prototype.isAnimatingTo = function() { return !!mt }, n.prototype.setScrollTop = function(t, r) { return ht = r === !0, _t ? Gt = s.min(s.max(t, 0), Vt) : e.scrollTo(0, t), it }, n.prototype.getScrollTop = function() { return _t ? Gt : e.pageYOffset || o.scrollTop || a.scrollTop || 0 }, n.prototype.getMaxScrollTop = function() { return Vt }, n.prototype.on = function(e, t) { return ct[e] = t, it }, n.prototype.off = function(e) { return delete ct[e], it }, n.prototype.destroy = function() {
        var e = R();
        e(bt), kt(), Ct(o, [T], [y, b, S]);
        for (var t = 0, n = lt.length; n > t; t++) ot(lt[t].element);
        o.style.overflow = a.style.overflow = "auto", o.style.height = a.style.height = "auto", st && i.setStyle(st, "transform", "none"), it = r, st = r, ct = r, ft = r, Vt = 0, zt = 1, ut = r, pt = r, Ot = "down", qt = -1, Lt = 0, $t = 0, Mt = !1, mt = r, gt = r, vt = r, dt = r, ht = r, Bt = 0, yt = r, _t = !1, Gt = 0, Tt = r
    };
    var X = function() {
            var n, i, l, c, g, v, d, h, y, T, b, S;
            St(o, [f, u, p, m].join(" "), function(e) {
                var o = e.changedTouches[0];
                for (c = e.target; 3 === c.nodeType;) c = c.parentNode;
                switch (g = o.clientY, v = o.clientX, T = e.timeStamp, N.test(c.tagName) || e.preventDefault(), e.type) {
                    case f:
                        n && n.blur(), it.stopAnimateTo(), n = c, i = d = g, l = v, y = T;
                        break;
                    case u:
                        N.test(c.tagName) && t.activeElement !== c && e.preventDefault(), h = g - d, S = T - b, it.setScrollTop(Gt - h, !0), d = g, b = T;
                        break;
                    default:
                    case p:
                    case m:
                        var a = i - g,
                            w = l - v,
                            k = w * w + a * a;
                        if (49 > k) {
                            if (!N.test(n.tagName)) {
                                n.focus();
                                var E = t.createEvent("MouseEvents");
                                E.initMouseEvent("click", !0, !0, e.view, 1, o.screenX, o.screenY, o.clientX, o.clientY, e.ctrlKey, e.altKey, e.shiftKey, e.metaKey, 0, null), n.dispatchEvent(E)
                            }
                            return
                        }
                        n = r;
                        var x = h / S;
                        x = s.max(s.min(x, 3), -3);
                        var A = s.abs(x / pt),
                            F = x * A + .5 * pt * A * A,
                            C = it.getScrollTop() - F,
                            D = 0;
                        C > Vt ? (D = (Vt - C) / F, C = Vt) : 0 > C && (D = -C / F, C = 0), A *= 1 - D, it.animateTo(0 | C + .5, { easing: "outCubic", duration: A })
                }
            }), e.scrollTo(0, 0), o.style.overflow = a.style.overflow = "hidden"
        },
        j = function() {
            var e, t, r, n, a, i, l, c, f, u, p, m = o.clientHeight,
                g = xt();
            for (c = 0, f = lt.length; f > c; c++)
                for (e = lt[c], t = e.element, r = e.anchorTarget, n = e.keyFrames, a = 0, i = n.length; i > a; a++) l = n[a], u = l.offset, p = g[l.constant] || 0, l.frame = u, l.isPercentage && (u *= m, l.frame = u), "relative" === l.mode && (ot(t), l.frame = it.relativeToAbsolute(r, l.anchors[0], l.anchors[1]) - u, ot(t, !0)), l.frame += p, ft && !l.isEnd && l.frame > Vt && (Vt = l.frame);
            for (Vt = s.max(Vt, At()), c = 0, f = lt.length; f > c; c++) {
                for (e = lt[c], n = e.keyFrames, a = 0, i = n.length; i > a; a++) l = n[a], p = g[l.constant] || 0, l.isEnd && (l.frame = Vt - l.offset + p);
                e.keyFrames.sort(Pt)
            }
        },
        W = function(e, t) {
            for (var r = 0, n = lt.length; n > r; r++) {
                var o, a, s = lt[r],
                    c = s.element,
                    f = s.smoothScrolling ? e : t,
                    u = s.keyFrames,
                    p = u[0].frame,
                    m = u[u.length - 1].frame,
                    y = p > f,
                    T = f > m,
                    b = u[y ? 0 : u.length - 1];
                if (y || T) {
                    if (y && -1 === s.edge || T && 1 === s.edge) continue;
                    switch (Ct(c, [y ? v : h], [v, d, h]), s.edge = y ? -1 : 1, s.edgeStrategy) {
                        case "reset":
                            ot(c);
                            continue;
                        case "ease":
                            f = b.frame;
                            break;
                        default:
                        case "set":
                            var S = b.props;
                            for (o in S) l.call(S, o) && (a = nt(S[o].value), i.setStyle(c, o, a));
                            continue
                    }
                } else 0 !== s.edge && (Ct(c, [g, d], [v, h]), s.edge = 0);
                for (var w = 0, k = u.length - 1; k > w; w++)
                    if (f >= u[w].frame && u[w + 1].frame >= f) {
                        var E = u[w],
                            x = u[w + 1];
                        for (o in E.props)
                            if (l.call(E.props, o)) {
                                var A = (f - E.frame) / (x.frame - E.frame);
                                A = E.props[o].easing(A), a = rt(E.props[o].value, x.props[o].value, A), a = nt(a), i.setStyle(c, o, a)
                            }
                        break
                    }
            }
        },
        Z = function() {
            Mt && (Mt = !1, Et());
            var e, t, n = it.getScrollTop(),
                o = Nt();
            if (mt) o >= mt.endTime ? (n = mt.targetTop, e = mt.done, mt = r) : (t = mt.easing((o - mt.startTime) / mt.duration), n = 0 | mt.startTop + t * mt.topDiff), it.setScrollTop(n, !0);
            else if (!ht) {
                var a = dt.targetTop - n;
                a && (dt = { startTop: qt, topDiff: n - qt, targetTop: n, startTime: It, endTime: It + vt }), dt.endTime >= o && (t = U.sqrt((o - dt.startTime) / vt), n = 0 | dt.startTop + t * dt.topDiff)
            }
            if (_t && st && i.setStyle(st, "transform", "translate(0, " + -Gt + "px) " + Tt), ht || qt !== n) {
                Ot = n > qt ? "down" : qt > n ? "up" : Ot, ht = !1;
                var l = { curTop: n, lastTop: qt, maxTop: Vt, direction: Ot },
                    s = ct.beforerender && ct.beforerender.call(it, l);
                s !== !1 && (W(n, it.getScrollTop()), qt = n, ct.render && ct.render.call(it, l)), e && e.call(it, !1)
            }
            It = o
        },
        J = function(e) {
            for (var t = 0, r = e.keyFrames.length; r > t; t++) {
                for (var n, o, a, i, l = e.keyFrames[t], s = {}; null !== (i = z.exec(l.props));) a = i[1], o = i[2], n = a.match(O), null !== n ? (a = n[1], n = n[2]) : n = w, o = o.indexOf("!") ? Q(o) : [o.slice(1)], s[a] = { value: o, easing: U[n] };
                l.props = s
            }
        },
        Q = function(e) { var t = []; return M.lastIndex = 0, e = e.replace(M, function(e) { return e.replace(L, function(e) { return 100 * (e / 255) + "%" }) }), G && (B.lastIndex = 0, e = e.replace(B, function(e) { return G + e })), e = e.replace(L, function(e) { return t.push(+e), "{?}" }), t.unshift(e), t },
        et = function(e) { var t, r, n = {}; for (t = 0, r = e.keyFrames.length; r > t; t++) tt(e.keyFrames[t], n); for (n = {}, t = e.keyFrames.length - 1; t >= 0; t--) tt(e.keyFrames[t], n) },
        tt = function(e, t) { var r; for (r in t) l.call(e.props, r) || (e.props[r] = t[r]); for (r in e.props) t[r] = e.props[r] },
        rt = function(e, t, r) { var n, o = e.length; if (o !== t.length) throw "Can't interpolate between \"" + e[0] + '" and "' + t[0] + '"'; var a = [e[0]]; for (n = 1; o > n; n++) a[n] = e[n] + (t[n] - e[n]) * r; return a },
        nt = function(e) { var t = 1; return $.lastIndex = 0, e[0].replace($, function() { return e[t++] }) },
        ot = function(e, t) { e = [].concat(e); for (var r, n, o = 0, a = e.length; a > o; o++) n = e[o], r = lt[n[H]], r && (t ? (n.style.cssText = r.dirtyStyleAttr, Ct(n, r.dirtyClassAttr)) : (r.dirtyStyleAttr = n.style.cssText, r.dirtyClassAttr = Ft(n), n.style.cssText = r.styleAttr, Ct(n, r.classAttr))) },
        at = function() {
            Tt = "translateZ(0)", i.setStyle(st, "transform", Tt);
            var e = c(st),
                t = e.getPropertyValue("transform"),
                r = e.getPropertyValue(G + "transform"),
                n = t && "none" !== t || r && "none" !== r;
            n || (Tt = "")
        };
    i.setStyle = function(e, t, r) {
        var n = e.style;
        if (t = t.replace(q, I).replace("-", ""), "zIndex" === t) n[t] = isNaN(r) ? r : "" + (0 | r);
        else if ("float" === t) n.styleFloat = n.cssFloat = r;
        else try { _ && (n[_ + t.slice(0, 1).toUpperCase() + t.slice(1)] = r), n[t] = r } catch (o) {}
    };
    var it, lt, st, ct, ft, ut, pt, mt, gt, vt, dt, ht, yt, Tt, bt, St = i.addEvent = function(t, r, n) {
            var o = function(t) { return t = t || e.event, t.target || (t.target = t.srcElement), t.preventDefault || (t.preventDefault = function() { t.returnValue = !1 }), n.call(this, t) };
            r = r.split(" ");
            for (var a, i = 0, l = r.length; l > i; i++) a = r[i], t.addEventListener ? t.addEventListener(a, n, !1) : t.attachEvent("on" + a, o), Kt.push({ element: t, name: a, listener: n })
        },
        wt = i.removeEvent = function(e, t, r) { t = t.split(" "); for (var n = 0, o = t.length; o > n; n++) e.removeEventListener ? e.removeEventListener(t[n], r, !1) : e.detachEvent("on" + t[n], r) },
        kt = function() {
            for (var e, t = 0, r = Kt.length; r > t; t++) e = Kt[t], wt(e.element, e.name, e.listener);
            Kt = []
        },
        Et = function() {
            var e = it.getScrollTop();
            Vt = 0, ft && !_t && (a.style.height = "auto"), j(), ft && !_t && (a.style.height = Vt + o.clientHeight + "px"), _t ? it.setScrollTop(s.min(it.getScrollTop(), Vt)) : it.setScrollTop(e, !0), ht = !0
        },
        xt = function() {
            var e, t, r = o.clientHeight,
                n = {};
            for (e in ut) t = ut[e], "function" == typeof t ? t = t.call(it) : /p$/.test(t) && (t = t.slice(0, -1) / 100 * r), n[e] = t;
            return n
        },
        At = function() {
            var e = st && st.offsetHeight || 0,
                t = s.max(e, a.scrollHeight, a.offsetHeight, o.scrollHeight, o.offsetHeight, o.clientHeight);
            return t - o.clientHeight
        },
        Ft = function(t) { var r = "className"; return e.SVGElement && t instanceof e.SVGElement && (t = t[r], r = "baseVal"), t[r] },
        Ct = function(t, n, o) {
            var a = "className";
            if (e.SVGElement && t instanceof e.SVGElement && (t = t[a], a = "baseVal"), o === r) return t[a] = n, r;
            for (var i = t[a], l = 0, s = o.length; s > l; l++) i = Ht(i).replace(Ht(o[l]), " ");
            i = Dt(i);
            for (var c = 0, f = n.length; f > c; c++) - 1 === Ht(i).indexOf(Ht(n[c])) && (i += " " + n[c]);
            t[a] = Dt(i)
        },
        Dt = function(e) { return e.replace(P, "") },
        Ht = function(e) { return " " + e + " " },
        Nt = Date.now || function() { return +new Date },
        Pt = function(e, t) { return e.frame - t.frame },
        Vt = 0,
        zt = 1,
        Ot = "down",
        qt = -1,
        It = Nt(),
        Lt = 0,
        $t = 0,
        Mt = !1,
        Bt = 0,
        _t = !1,
        Gt = 0,
        Kt = []
})(window, document);

/*
 *  jQuery OwlCarousel v1.3.2 - Hacked for Beetle
 *
 *  Copyright (c) 2013 Bartosz Wojciechowski
 *  http://www.owlgraphic.com/owlcarousel/
 *
 *  Licensed under MIT
 *
 */

/*JS Lint helpers: */
/*global dragMove: false, dragEnd: false, $, jQuery, alert, window, document */
/*jslint nomen: true, continue:true */
if (typeof Object.create !== "function") {
    Object.create = function(e) {
        function t() {}
        t.prototype = e;
        return new t
    }
}(function(e, t, n) {
    var r = {
        init: function(t, n) {
            var r = this;
            r.$elem = e(n);
            r.options = e.extend({}, e.fn.owlCarousel.options, r.$elem.data(), t);
            r.userOptions = t;
            r.loadContent()
        },
        loadContent: function() {
            function r(e) {
                var n, r = "";
                if (typeof t.options.jsonSuccess === "function") { t.options.jsonSuccess.apply(this, [e]) } else {
                    for (n in e.owl) { if (e.owl.hasOwnProperty(n)) { r += e.owl[n].item } }
                    t.$elem.html(r)
                }
                t.logIn()
            }
            var t = this,
                n;
            if (typeof t.options.beforeInit === "function") { t.options.beforeInit.apply(this, [t.$elem]) }
            if (typeof t.options.jsonPath === "string") {
                n = t.options.jsonPath;
                e.getJSON(n, r)
            } else { t.logIn() }
        },
        logIn: function() {
            var e = this;
            e.$elem.data("owl-originalStyles", e.$elem.attr("style")).data("owl-originalClasses", e.$elem.attr("class"));
            e.$elem.css({ opacity: 0 });
            e.orignalItems = e.options.items;
            e.checkBrowser();
            e.wrapperWidth = 0;
            e.checkVisible = null;
            e.setVars()
        },
        setVars: function() {
            var e = this;
            if (e.$elem.children().length === 0) { return false }
            e.baseClass();
            e.eventTypes();
            e.$userItems = e.$elem.children();
            e.itemsAmount = e.$userItems.length;
            e.wrapItems();
            e.$owlItems = e.$elem.find(".owl-item");
            e.$owlWrapper = e.$elem.find(".owl-wrapper");
            e.playDirection = "next";
            e.prevItem = 0;
            e.prevArr = [0];
            e.currentItem = 0;
            e.customEvents();
            e.onStartup()
        },
        onStartup: function() {
            var e = this;
            e.updateItems();
            e.calculateAll();
            e.buildControls();
            e.updateControls();
            e.response();
            e.moveEvents();
            e.stopOnHover();
            e.owlStatus();
            if (e.options.transitionStyle !== false) { e.transitionTypes(e.options.transitionStyle) }
            if (e.options.autoPlay === true) { e.options.autoPlay = 5e3 }
            e.play();
            e.$elem.find(".owl-wrapper").css("display", "block");
            if (!e.$elem.is(":visible")) { e.watchVisibility() } else { e.$elem.css("opacity", 1) }
            e.onstartup = false;
            e.eachMoveUpdate();
            if (typeof e.options.afterInit === "function") { e.options.afterInit.apply(this, [e.$elem]) }
        },
        eachMoveUpdate: function() {
            var e = this;
            if (e.options.lazyLoad === true) { e.lazyLoad() }
            if (e.options.autoHeight === true) { e.autoHeight() }
            e.onVisibleItems();
            if (typeof e.options.afterAction === "function") { e.options.afterAction.apply(this, [e.$elem]) }
        },
        updateVars: function() {
            var e = this;
            if (typeof e.options.beforeUpdate === "function") { e.options.beforeUpdate.apply(this, [e.$elem]) }
            e.watchVisibility();
            e.updateItems();
            e.calculateAll();
            e.updatePosition();
            e.updateControls();
            e.eachMoveUpdate();
            if (typeof e.options.afterUpdate === "function") { e.options.afterUpdate.apply(this, [e.$elem]) }
        },
        reload: function() {
            var e = this;
            t.setTimeout(function() { e.updateVars() }, 0)
        },
        watchVisibility: function() {
            var e = this;
            if (e.$elem.is(":visible") === false) {
                e.$elem.css({ opacity: 0 });
                t.clearInterval(e.autoPlayInterval);
                t.clearInterval(e.checkVisible)
            } else { return false }
            e.checkVisible = t.setInterval(function() {
                if (e.$elem.is(":visible")) {
                    e.reload();
                    e.$elem.animate({ opacity: 1 }, 200);
                    t.clearInterval(e.checkVisible)
                }
            }, 500)
        },
        wrapItems: function() {
            var e = this;
            e.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"></div>');
            e.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');
            e.wrapperOuter = e.$elem.find(".owl-wrapper-outer");
            e.$elem.css("display", "block")
        },
        baseClass: function() {
            var e = this,
                t = e.$elem.hasClass(e.options.baseClass),
                n = e.$elem.hasClass(e.options.theme);
            if (!t) { e.$elem.addClass(e.options.baseClass) }
            if (!n) { e.$elem.addClass(e.options.theme) }
        },
        updateItems: function() {
            var t = this,
                n, r;
            if (t.options.responsive === false) { return false }
            if (t.options.singleItem === true) {
                t.options.items = t.orignalItems = 1;
                t.options.itemsCustom = false;
                t.options.itemsDesktop = false;
                t.options.itemsDesktopSmall = false;
                t.options.itemsTablet = false;
                t.options.itemsTabletSmall = false;
                t.options.itemsMobile = false;
                return false
            }
            n = e(t.options.responsiveBaseWidth).width();
            if (n > (t.options.itemsDesktop[0] || t.orignalItems)) { t.options.items = t.orignalItems }
            if (t.options.itemsCustom !== false) { t.options.itemsCustom.sort(function(e, t) { return e[0] - t[0] }); for (r = 0; r < t.options.itemsCustom.length; r += 1) { if (t.options.itemsCustom[r][0] <= n) { t.options.items = t.options.itemsCustom[r][1] } } } else { if (n <= t.options.itemsDesktop[0] && t.options.itemsDesktop !== false) { t.options.items = t.options.itemsDesktop[1] } if (n <= t.options.itemsDesktopSmall[0] && t.options.itemsDesktopSmall !== false) { t.options.items = t.options.itemsDesktopSmall[1] } if (n <= t.options.itemsTablet[0] && t.options.itemsTablet !== false) { t.options.items = t.options.itemsTablet[1] } if (n <= t.options.itemsTabletSmall[0] && t.options.itemsTabletSmall !== false) { t.options.items = t.options.itemsTabletSmall[1] } if (n <= t.options.itemsMobile[0] && t.options.itemsMobile !== false) { t.options.items = t.options.itemsMobile[1] } }
            if (t.options.items > t.itemsAmount && t.options.itemsScaleUp === true) { t.options.items = t.itemsAmount }
        },
        response: function() {
            var n = this,
                r, i;
            if (n.options.responsive !== true) { return false }
            i = e(t).width();
            n.resizer = function() {
                if (e(t).width() !== i) {
                    if (n.options.autoPlay !== false) { t.clearInterval(n.autoPlayInterval) }
                    t.clearTimeout(r);
                    r = t.setTimeout(function() {
                        i = e(t).width();
                        n.updateVars()
                    }, n.options.responsiveRefreshRate)
                }
            };
            e(t).resize(n.resizer)
        },
        updatePosition: function() {
            var e = this;
            e.jumpTo(e.currentItem);
            if (e.options.autoPlay !== false) { e.checkAp() }
        },
        appendItemsSizes: function() {
            var t = this,
                n = 0,
                r = t.itemsAmount - t.options.items;
            t.$owlItems.each(function(i) {
                var s = e(this);
                s.css({ width: t.itemWidth }).data("owl-item", Number(i));
                if (i % t.options.items === 0 || i === r) { if (!(i > r)) { n += 1 } }
                s.data("owl-roundPages", n)
            })
        },
        appendWrapperSizes: function() {
            var e = this,
                t = e.$owlItems.length * e.itemWidth;
            e.$owlWrapper.css({ width: t * 2, left: 0 });
            e.appendItemsSizes()
        },
        calculateAll: function() {
            var e = this;
            e.calculateWidth();
            e.appendWrapperSizes();
            e.loops();
            e.max()
        },
        calculateWidth: function() {
            var e = this;
            e.itemWidth = Math.round(e.$elem.width() / e.options.items)
        },
        max: function() {
            var e = this,
                t = (e.itemsAmount * e.itemWidth - e.options.items * e.itemWidth) * -1;
            if (e.options.items > e.itemsAmount) {
                e.maximumItem = 0;
                t = 0;
                e.maximumPixels = 0
            } else {
                e.maximumItem = e.itemsAmount - e.options.items;
                e.maximumPixels = t
            }
            return t
        },
        min: function() { return 0 },
        loops: function() {
            var t = this,
                n = 0,
                r = 0,
                i, s, o;
            t.positionsInArray = [0];
            t.pagesInArray = [];
            for (i = 0; i < t.itemsAmount; i += 1) {
                r += t.itemWidth;
                t.positionsInArray.push(-r);
                if (t.options.scrollPerPage === true) {
                    s = e(t.$owlItems[i]);
                    o = s.data("owl-roundPages");
                    if (o !== n) {
                        t.pagesInArray[n] = t.positionsInArray[i];
                        n = o
                    }
                }
            }
        },
        buildControls: function() { var t = this; if (t.options.navigation === true || t.options.pagination === true) { t.owlControls = e('<div class="owl-controls"/>').toggleClass("clickable", !t.browser.isTouch).appendTo(t.$elem) } if (t.options.pagination === true) { t.buildPagination() } if (t.options.navigation === true) { t.buildButtons() } },
        buildButtons: function() {
            var t = this,
                n = e('<div class="owl-buttons"/>');
            t.owlControls.append(n);
            t.buttonPrev = e("<div/>", { "class": "owl-prev", html: t.options.navigationText[0] || "" });
            t.buttonNext = e("<div/>", { "class": "owl-next", html: t.options.navigationText[1] || "" });
            n.append(t.buttonPrev).append(t.buttonNext);
            n.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function(e) { e.preventDefault() });
            n.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function(n) { n.preventDefault(); if (e(this).hasClass("owl-next")) { t.next() } else { t.prev() } })
        },
        buildPagination: function() {
            var t = this;
            t.paginationWrapper = e('<div class="owl-pagination"/>');
            t.owlControls.append(t.paginationWrapper);
            t.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function(n) { n.preventDefault(); if (Number(e(this).data("owl-page")) !== t.currentItem) { t.goTo(Number(e(this).data("owl-page")), true) } })
        },
        updatePagination: function() {
            var t = this,
                n, r, i, s, o, u;
            if (t.options.pagination === false) { return false }
            t.paginationWrapper.html("");
            n = 0;
            r = t.itemsAmount - t.itemsAmount % t.options.items;
            for (s = 0; s < t.itemsAmount; s += 1) {
                if (s % t.options.items === 0) {
                    n += 1;
                    if (r === s) { i = t.itemsAmount - t.options.items }
                    o = e("<div/>", { "class": "owl-page" });
                    u = e("<span></span>", { text: t.options.paginationNumbers === true ? n : "", "class": t.options.paginationNumbers === true ? "owl-numbers" : "" });
                    o.append(u);
                    o.data("owl-page", r === s ? i : s);
                    o.data("owl-roundPages", n);
                    t.paginationWrapper.append(o)
                }
            }
            t.checkPagination()
        },
        checkPagination: function() {
            var t = this;
            if (t.options.pagination === false) { return false }
            t.paginationWrapper.find(".owl-page").each(function() {
                if (e(this).data("owl-roundPages") === e(t.$owlItems[t.currentItem]).data("owl-roundPages")) {
                    t.paginationWrapper.find(".owl-page").removeClass("active");
                    e(this).addClass("active")
                }
            })
        },
        checkNavigation: function() {
            var e = this;
            if (e.options.navigation === false) { return false }
            if (e.options.rewindNav === false) {
                if (e.currentItem === 0 && e.maximumItem === 0) {
                    e.buttonPrev.addClass("disabled");
                    e.buttonNext.addClass("disabled")
                } else if (e.currentItem === 0 && e.maximumItem !== 0) {
                    e.buttonPrev.addClass("disabled");
                    e.buttonNext.removeClass("disabled")
                } else if (e.currentItem === e.maximumItem) {
                    e.buttonPrev.removeClass("disabled");
                    e.buttonNext.addClass("disabled")
                } else if (e.currentItem !== 0 && e.currentItem !== e.maximumItem) {
                    e.buttonPrev.removeClass("disabled");
                    e.buttonNext.removeClass("disabled")
                }
            }
        },
        updateControls: function() {
            var e = this;
            e.updatePagination();
            e.checkNavigation();
            if (e.owlControls) { if (e.options.items >= e.itemsAmount) { e.owlControls.hide() } else { e.owlControls.show() } }
        },
        destroyControls: function() { var e = this; if (e.owlControls) { e.owlControls.remove() } },
        next: function(e) {
            var t = this;
            if (t.isTransition) { return false }
            t.currentItem += t.options.scrollPerPage === true ? t.options.items : 1;
            if (t.currentItem > t.maximumItem + (t.options.scrollPerPage === true ? t.options.items - 1 : 0)) {
                if (t.options.rewindNav === true) {
                    t.currentItem = 0;
                    e = "rewind"
                } else { t.currentItem = t.maximumItem; return false }
            }
            t.goTo(t.currentItem, e)
        },
        prev: function(e) {
            var t = this;
            if (t.isTransition) { return false }
            if (t.options.scrollPerPage === true && t.currentItem > 0 && t.currentItem < t.options.items) { t.currentItem = 0 } else { t.currentItem -= t.options.scrollPerPage === true ? t.options.items : 1 }
            if (t.currentItem < 0) {
                if (t.options.rewindNav === true) {
                    t.currentItem = t.maximumItem;
                    e = "rewind"
                } else { t.currentItem = 0; return false }
            }
            t.goTo(t.currentItem, e)
        },
        goTo: function(e, n, r) {
            var i = this,
                s;
            if (i.isTransition) { return false }
            if (typeof i.options.beforeMove === "function") { i.options.beforeMove.apply(this, [i.$elem]) }
            if (e >= i.maximumItem) { e = i.maximumItem } else if (e <= 0) { e = 0 }
            i.currentItem = i.owl.currentItem = e;
            if (i.options.transitionStyle !== false && r !== "drag" && i.options.items === 1 && i.browser.support3d === true) {
                i.swapSpeed(0);
                if (i.browser.support3d === true) { i.transition3d(i.positionsInArray[e]) } else { i.css2fade(i.positionsInArray[e], 1) }
                i.afterGo();
                i.singleItemTransition();
                return false
            }
            s = i.positionsInArray[e];
            if (i.browser.support3d === true) {
                i.isCss3Finish = false;
                if (n === true) {
                    i.swapSpeed("paginationSpeed");
                    t.setTimeout(function() { i.isCss3Finish = true }, i.options.paginationSpeed)
                } else if (n === "rewind") {
                    i.swapSpeed(i.options.rewindSpeed);
                    t.setTimeout(function() { i.isCss3Finish = true }, i.options.rewindSpeed)
                } else {
                    i.swapSpeed("slideSpeed");
                    t.setTimeout(function() { i.isCss3Finish = true }, i.options.slideSpeed)
                }
                i.transition3d(s)
            } else { if (n === true) { i.css2fade(s, i.options.paginationSpeed) } else if (n === "rewind") { i.css2fade(s, i.options.rewindSpeed) } else { i.css2fade(s, i.options.slideSpeed) } }
            i.afterGo()
        },
        jumpTo: function(e) {
            var t = this;
            if (typeof t.options.beforeMove === "function") { t.options.beforeMove.apply(this, [t.$elem]) }
            if (e >= t.maximumItem || e === -1) { e = t.maximumItem } else if (e <= 0) { e = 0 }
            t.swapSpeed(0);
            if (t.browser.support3d === true) { t.transition3d(t.positionsInArray[e]) } else { t.css2fade(t.positionsInArray[e], 1) }
            t.currentItem = t.owl.currentItem = e;
            t.afterGo()
        },
        afterGo: function() {
            var e = this;
            e.prevArr.push(e.currentItem);
            e.prevItem = e.owl.prevItem = e.prevArr[e.prevArr.length - 2];
            e.prevArr.shift(0);
            if (e.prevItem !== e.currentItem) {
                e.checkPagination();
                e.checkNavigation();
                e.eachMoveUpdate();
                if (e.options.autoPlay !== false) { e.checkAp() }
            }
            if (typeof e.options.afterMove === "function" && e.prevItem !== e.currentItem) { e.options.afterMove.apply(this, [e.$elem]) }
        },
        stop: function() {
            var e = this;
            e.apStatus = "stop";
            t.clearInterval(e.autoPlayInterval)
        },
        checkAp: function() { var e = this; if (e.apStatus !== "stop") { e.play() } },
        play: function() {
            var e = this;
            e.apStatus = "play";
            if (e.options.autoPlay === false) { return false }
            t.clearInterval(e.autoPlayInterval);
            e.autoPlayInterval = t.setInterval(function() { e.next(true) }, e.options.autoPlay)
        },
        swapSpeed: function(e) { var t = this; if (e === "slideSpeed") { t.$owlWrapper.css(t.addCssSpeed(t.options.slideSpeed)) } else if (e === "paginationSpeed") { t.$owlWrapper.css(t.addCssSpeed(t.options.paginationSpeed)) } else if (typeof e !== "string") { t.$owlWrapper.css(t.addCssSpeed(e)) } },
        addCssSpeed: function(e) { return { "-webkit-transition": "all " + e + "ms ease", "-moz-transition": "all " + e + "ms ease", "-o-transition": "all " + e + "ms ease", transition: "all " + e + "ms ease" } },
        removeTransition: function() { return { "-webkit-transition": "", "-moz-transition": "", "-o-transition": "", transition: "" } },
        doTranslate: function(e) { return { "-webkit-transform": "translate3d(" + e + "px, 0px, 0px)", "-moz-transform": "translate3d(" + e + "px, 0px, 0px)", "-o-transform": "translate3d(" + e + "px, 0px, 0px)", "-ms-transform": "translate3d(" + e + "px, 0px, 0px)", transform: "translate3d(" + e + "px, 0px,0px)" } },
        transition3d: function(e) {
            var t = this;
            t.$owlWrapper.css(t.doTranslate(e))
        },
        css2move: function(e) {
            var t = this;
            t.$owlWrapper.css({ left: e })
        },
        css2slide: function(e, t) {
            var n = this;
            n.isCssFinish = false;
            n.$owlWrapper.stop(true, true).animate({ left: e }, { duration: t || n.options.slideSpeed, complete: function() { n.isCssFinish = true } })
        },
        css2fade: function() {
            var e = this;
            $currentItem = e.$owlItems.eq(e.currentItem);
            e.isCssFinish = false;
            e.$owlWrapper.stop(true, true);
            e.$owlItems.hide();
            $currentItem.fadeIn(400)
        },
        checkBrowser: function() {
            var e = this,
                r = "translate3d(0px, 0px, 0px)",
                i = n.createElement("div"),
                s, o, u, a;
            i.style.cssText = "  -moz-transform:" + r + "; -ms-transform:" + r + "; -o-transform:" + r + "; -webkit-transform:" + r + "; transform:" + r;
            s = /translate3d\(0px, 0px, 0px\)/g;
            o = i.style.cssText.match(s);
            u = Modernizr.csstransforms3d;
            a = "ontouchstart" in t || t.navigator.msMaxTouchPoints;
            e.browser = { support3d: u, isTouch: a }
        },
        moveEvents: function() {
            var e = this;
            if (e.options.mouseDrag !== false || e.options.touchDrag !== false) {
                e.gestures();
                e.disabledEvents()
            }
        },
        eventTypes: function() {
            var e = this,
                t = ["s", "e", "x"];
            e.ev_types = {};
            if (e.options.mouseDrag === true && e.options.touchDrag === true) { t = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] } else if (e.options.mouseDrag === false && e.options.touchDrag === true) { t = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] } else if (e.options.mouseDrag === true && e.options.touchDrag === false) { t = ["mousedown.owl", "mousemove.owl", "mouseup.owl"] }
            e.ev_types.start = t[0];
            e.ev_types.move = t[1];
            e.ev_types.end = t[2]
        },
        disabledEvents: function() {
            var t = this;
            t.$elem.on("dragstart.owl", function(e) { e.preventDefault() });
            t.$elem.on("mousedown.disableTextSelect", function(t) { return e(t.target).is("input, textarea, select, option") })
        },
        gestures: function() {
            function s(e) { if (e.touches !== undefined) { return { x: e.touches[0].pageX, y: e.touches[0].pageY } } if (e.touches === undefined) { if (e.pageX !== undefined) { return { x: e.pageX, y: e.pageY } } if (e.pageX === undefined) { return { x: e.clientX, y: e.clientY } } } }

            function o(t) {
                if (t === "on") {
                    e(n).on(r.ev_types.move, a);
                    e(n).on(r.ev_types.end, f)
                } else if (t === "off") {
                    e(n).off(r.ev_types.move);
                    e(n).off(r.ev_types.end)
                }
            }

            function u(n) {
                var u = n.originalEvent || n || t.event,
                    a;
                if (u.which === 3) { return false }
                if (r.itemsAmount <= r.options.items) { return }
                if (r.isCssFinish === false && !r.options.dragBeforeAnimFinish) { return false }
                if (r.isCss3Finish === false && !r.options.dragBeforeAnimFinish) { return false }
                if (r.options.autoPlay !== false) { t.clearInterval(r.autoPlayInterval) }
                if (r.browser.isTouch !== true && !r.$owlWrapper.hasClass("grabbing")) { r.$owlWrapper.addClass("grabbing") }
                r.newPosX = 0;
                r.newRelativeX = 0;
                e(this).css(r.removeTransition());
                a = e(this).position();
                i.relativePos = a.left;
                i.offsetX = s(u).x - a.left;
                i.offsetY = s(u).y - a.top;
                o("on");
                i.sliding = false;
                i.targetElement = u.target || u.srcElement
            }

            function a(o) {
                var u = o.originalEvent || o || t.event,
                    a, f;
                r.newPosX = s(u).x - i.offsetX;
                r.newPosY = s(u).y - i.offsetY;
                r.newRelativeX = r.newPosX - i.relativePos;
                if (typeof r.options.startDragging === "function" && i.dragging !== true && r.newRelativeX !== 0) {
                    i.dragging = true;
                    r.options.startDragging.apply(r, [r.$elem])
                }
                if ((r.newRelativeX > 8 || r.newRelativeX < -8) && r.browser.isTouch === true) {
                    if (u.preventDefault !== undefined) { u.preventDefault() } else { u.returnValue = false }
                    i.sliding = true
                }
                if ((r.newPosY > 10 || r.newPosY < -10) && i.sliding === false) { e(n).off("touchmove.owl") }
                a = function() { return r.newRelativeX / 5 };
                f = function() { return r.maximumPixels + r.newRelativeX / 5 };
                r.newPosX = Math.max(Math.min(r.newPosX, a()), f());
                if (r.browser.support3d === true) { r.transition3d(r.newPosX) } else { r.css2move(r.newPosX) }
            }

            function f(n) {
                var s = n.originalEvent || n || t.event,
                    u, a, f;
                s.target = s.target || s.srcElement;
                i.dragging = false;
                if (r.browser.isTouch !== true) { r.$owlWrapper.removeClass("grabbing") }
                if (r.newRelativeX < 0) { r.dragDirection = r.owl.dragDirection = "left" } else { r.dragDirection = r.owl.dragDirection = "right" }
                if (r.newRelativeX !== 0) {
                    u = r.getNewPosition();
                    r.goTo(u, false, "drag");
                    if (i.targetElement === s.target && r.browser.isTouch !== true) {
                        e(s.target).on("click.disable", function(t) {
                            t.stopImmediatePropagation();
                            t.stopPropagation();
                            t.preventDefault();
                            e(t.target).off("click.disable")
                        });
                        a = e._data(s.target, "events").click;
                        f = a.pop();
                        a.splice(0, 0, f)
                    }
                }
                o("off")
            }
            var r = this,
                i = { offsetX: 0, offsetY: 0, baseElWidth: 0, relativePos: 0, position: null, minSwipe: null, maxSwipe: null, sliding: null, dargging: null, targetElement: null };
            r.isCssFinish = true;
            r.$elem.on(r.ev_types.start, ".owl-wrapper", u)
        },
        getNewPosition: function() {
            var e = this,
                t = e.closestItem();
            if (t > e.maximumItem) {
                e.currentItem = e.maximumItem;
                t = e.maximumItem
            } else if (e.newPosX >= 0) {
                t = 0;
                e.currentItem = 0
            }
            return t
        },
        closestItem: function() {
            var t = this,
                n = t.options.scrollPerPage === true ? t.pagesInArray : t.positionsInArray,
                r = t.newPosX,
                i = null;
            e.each(n, function(s, o) {
                if (r - t.itemWidth / 20 > n[s + 1] && r - t.itemWidth / 20 < o && t.moveDirection() === "left") { i = o; if (t.options.scrollPerPage === true) { t.currentItem = e.inArray(i, t.positionsInArray) } else { t.currentItem = s } } else if (r + t.itemWidth / 20 < o && r + t.itemWidth / 20 > (n[s + 1] || n[s] - t.itemWidth) && t.moveDirection() === "right") {
                    if (t.options.scrollPerPage === true) {
                        i = n[s + 1] || n[n.length - 1];
                        t.currentItem = e.inArray(i, t.positionsInArray)
                    } else {
                        i = n[s + 1];
                        t.currentItem = s + 1
                    }
                }
            });
            return t.currentItem
        },
        moveDirection: function() {
            var e = this,
                t;
            if (e.newRelativeX < 0) {
                t = "right";
                e.playDirection = "next"
            } else {
                t = "left";
                e.playDirection = "prev"
            }
            return t
        },
        customEvents: function() {
            var e = this;
            e.$elem.on("owl.next", function() { e.next() });
            e.$elem.on("owl.prev", function() { e.prev() });
            e.$elem.on("owl.play", function(t, n) {
                e.options.autoPlay = n;
                e.play();
                e.hoverStatus = "play"
            });
            e.$elem.on("owl.stop", function() {
                e.stop();
                e.hoverStatus = "stop"
            });
            e.$elem.on("owl.goTo", function(t, n) { e.goTo(n) });
            e.$elem.on("owl.jumpTo", function(t, n) { e.jumpTo(n) })
        },
        stopOnHover: function() {
            var e = this;
            if (e.options.stopOnHover === true && e.browser.isTouch !== true && e.options.autoPlay !== false) {
                e.$elem.on("mouseover", function() { e.stop() });
                e.$elem.on("mouseout", function() { if (e.hoverStatus !== "stop") { e.play() } })
            }
        },
        lazyLoad: function() {
            var t = this,
                n, r, i, s, o;
            if (t.options.lazyLoad === false) { return false }
            for (n = 0; n < t.itemsAmount; n += 1) {
                r = e(t.$owlItems[n]);
                if (r.data("owl-loaded") === "loaded") { continue }
                i = r.data("owl-item");
                s = r.find(".lazyOwl");
                if (typeof s.data("src") !== "string") { r.data("owl-loaded", "loaded"); continue }
                if (r.data("owl-loaded") === undefined) {
                    s.hide();
                    r.addClass("loading").data("owl-loaded", "checked")
                }
                if (t.options.lazyFollow === true) { o = i >= t.currentItem } else { o = true }
                if (o && i < t.currentItem + t.options.items && s.length) { t.lazyPreload(r, s) }
            }
        },
        lazyPreload: function(e, n) {
            function o() {
                e.data("owl-loaded", "loaded").removeClass("loading");
                n.removeAttr("data-src");
                if (r.options.lazyEffect === "fade") { n.fadeIn(400) } else { n.show() }
                if (typeof r.options.afterLazyLoad === "function") { r.options.afterLazyLoad.apply(this, [r.$elem]) }
            }

            function u() { i += 1; if (r.completeImg(n.get(0)) || s === true) { o() } else if (i <= 100) { t.setTimeout(u, 100) } else { o() } }
            var r = this,
                i = 0,
                s;
            if (n.prop("tagName") === "DIV") {
                n.css("background-image", "url(" + n.data("src") + ")");
                s = true
            } else { n[0].src = n.data("src") }
            u()
        },
        autoHeight: function() {
            function s() {
                var r = e(n.$owlItems[n.currentItem]).height();
                n.wrapperOuter.css("height", r + "px");
                if (!n.wrapperOuter.hasClass("autoHeight")) { t.setTimeout(function() { n.wrapperOuter.addClass("autoHeight") }, 0) }
            }

            function o() { i += 1; if (n.completeImg(r.get(0))) { s() } else if (i <= 100) { t.setTimeout(o, 100) } else { n.wrapperOuter.css("height", "") } }
            var n = this,
                r = e(n.$owlItems[n.currentItem]).find("img"),
                i;
            if (r.get(0) !== undefined) {
                i = 0;
                o()
            } else { s() }
        },
        completeImg: function(e) {
            var t;
            if (!e.complete) { return false }
            t = typeof e.naturalWidth;
            if (t !== "undefined" && e.naturalWidth === 0) { return false }
            return true
        },
        onVisibleItems: function() {
            var t = this,
                n;
            if (t.options.addClassActive === true) { t.$owlItems.removeClass("active") }
            t.visibleItems = [];
            for (n = t.currentItem; n < t.currentItem + t.options.items; n += 1) { t.visibleItems.push(n); if (t.options.addClassActive === true) { e(t.$owlItems[n]).addClass("active") } }
            t.owl.visibleItems = t.visibleItems
        },
        transitionTypes: function(e) {
            var t = this;
            t.outClass = "owl-" + e + "-out";
            t.inClass = "owl-" + e + "-in"
        },
        singleItemTransition: function() {
            function a(e) { return { position: "relative", left: e + "px" } }
            var e = this,
                t = e.outClass,
                n = e.inClass,
                r = e.$owlItems.eq(e.currentItem),
                i = e.$owlItems.eq(e.prevItem),
                s = Math.abs(e.positionsInArray[e.currentItem]) + e.positionsInArray[e.prevItem],
                o = Math.abs(e.positionsInArray[e.currentItem]) + e.itemWidth / 2,
                u = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
            e.isTransition = true;
            e.$owlWrapper.addClass("owl-origin").css({ "-webkit-transform-origin": o + "px", "-moz-perspective-origin": o + "px", "perspective-origin": o + "px" });
            i.css(a(s, 10)).addClass(t).on(u, function() {
                e.endPrev = true;
                i.off(u);
                e.clearTransStyle(i, t)
            });
            r.addClass(n).on(u, function() {
                e.endCurrent = true;
                r.off(u);
                e.clearTransStyle(r, n)
            })
        },
        clearTransStyle: function(e, t) {
            var n = this;
            e.css({ position: "", left: "" }).removeClass(t);
            if (n.endPrev && n.endCurrent) {
                n.$owlWrapper.removeClass("owl-origin");
                n.endPrev = false;
                n.endCurrent = false;
                n.isTransition = false
            }
        },
        owlStatus: function() {
            var e = this;
            e.owl = { userOptions: e.userOptions, baseElement: e.$elem, userItems: e.$userItems, owlItems: e.$owlItems, currentItem: e.currentItem, prevItem: e.prevItem, visibleItems: e.visibleItems, isTouch: e.browser.isTouch, browser: e.browser, dragDirection: e.dragDirection }
        },
        clearEvents: function() {
            var r = this;
            r.$elem.off(".owl owl mousedown.disableTextSelect");
            e(n).off(".owl owl");
            e(t).off("resize", r.resizer)
        },
        unWrap: function() {
            var e = this;
            if (e.$elem.children().length !== 0) {
                e.$owlWrapper.unwrap();
                e.$userItems.unwrap().unwrap();
                if (e.owlControls) { e.owlControls.remove() }
            }
            e.clearEvents();
            e.$elem.attr("style", e.$elem.data("owl-originalStyles") || "").attr("class", e.$elem.data("owl-originalClasses"))
        },
        destroy: function() {
            var e = this;
            e.stop();
            t.clearInterval(e.checkVisible);
            e.unWrap();
            e.$elem.removeData()
        },
        reinit: function(t) {
            var n = this,
                r = e.extend({}, n.userOptions, t);
            n.unWrap();
            n.init(r, n.$elem)
        },
        addItem: function(e, t) {
            var n = this,
                r;
            if (!e) { return false }
            if (n.$elem.children().length === 0) {
                n.$elem.append(e);
                n.setVars();
                return false
            }
            n.unWrap();
            if (t === undefined || t === -1) { r = -1 } else { r = t }
            if (r >= n.$userItems.length || r === -1) { n.$userItems.eq(-1).after(e) } else { n.$userItems.eq(r).before(e) }
            n.setVars()
        },
        removeItem: function(e) {
            var t = this,
                n;
            if (t.$elem.children().length === 0) { return false }
            if (e === undefined || e === -1) { n = -1 } else { n = e }
            t.unWrap();
            t.$userItems.eq(n).remove();
            t.setVars()
        }
    };
    e.fn.owlCarousel = function(t) {
        return this.each(function() {
            if (e(this).data("owl-init") === true) { return false }
            e(this).data("owl-init", true);
            var n = Object.create(r);
            n.init(t, this);
            e.data(this, "owlCarousel", n)
        })
    };
    e.fn.owlCarousel.options = { items: 5, itemsCustom: false, itemsDesktop: [1199, 4], itemsDesktopSmall: [979, 3], itemsTablet: [768, 2], itemsTabletSmall: false, itemsMobile: [479, 1], singleItem: false, itemsScaleUp: false, slideSpeed: 200, paginationSpeed: 800, rewindSpeed: 1e3, autoPlay: false, stopOnHover: false, navigation: false, navigationText: ["prev", "next"], rewindNav: true, scrollPerPage: false, pagination: true, paginationNumbers: false, responsive: true, responsiveRefreshRate: 200, responsiveBaseWidth: t, baseClass: "owl-carousel", theme: "owl-theme", lazyLoad: false, lazyFollow: true, lazyEffect: "fade", autoHeight: false, jsonPath: false, jsonSuccess: false, dragBeforeAnimFinish: true, mouseDrag: true, touchDrag: true, addClassActive: false, transitionStyle: false, beforeUpdate: false, afterUpdate: false, beforeInit: false, afterInit: false, beforeMove: false, afterMove: false, afterAction: false, startDragging: false, afterLazyLoad: false }
})(jQuery, window, document);

/**!
 * easyPieChart
 * Lightweight plugin to render simple, animated and retina optimized pie charts
 *
 * @license Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 * @author Robert Fleischmann <rendro87@gmail.com> (http://robert-fleischmann.de)
 * @version 2.1.3
 **/
! function(a, b) { "object" == typeof exports ? module.exports = b(require("jquery")) : "function" == typeof define && define.amd ? define("EasyPieChart", ["jquery"], b) : b(a.jQuery) }(this, function(a) {
    var b = function(a, b) {
            var c, d = document.createElement("canvas");
            "undefined" != typeof G_vmlCanvasManager && G_vmlCanvasManager.initElement(d);
            var e = d.getContext("2d");
            d.width = d.height = b.size, a.appendChild(d);
            var f = 1;
            window.devicePixelRatio > 1 && (f = window.devicePixelRatio, d.style.width = d.style.height = [b.size, "px"].join(""), d.width = d.height = b.size * f, e.scale(f, f)), e.translate(b.size / 2, b.size / 2), e.rotate((-0.5 + b.rotate / 180) * Math.PI);
            var g = (b.size - b.lineWidth) / 2;
            b.scaleColor && b.scaleLength && (g -= b.scaleLength + 2), Date.now = Date.now || function() { return +new Date };
            var h = function(a, b, c) {
                    c = Math.min(Math.max(-1, c || 0), 1);
                    var d = 0 >= c ? !0 : !1;
                    e.beginPath(), e.arc(0, 0, g, 0, 2 * Math.PI * c, d), e.strokeStyle = a, e.lineWidth = b, e.stroke()
                },
                i = function() {
                    var a, c, d = 24;
                    e.lineWidth = 1, e.fillStyle = b.scaleColor, e.save();
                    for (var d = 24; d > 0; --d) 0 === d % 6 ? (c = b.scaleLength, a = 0) : (c = .6 * b.scaleLength, a = b.scaleLength - c), e.fillRect(-b.size / 2 + a, 0, c, 1), e.rotate(Math.PI / 12);
                    e.restore()
                },
                j = function() { return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(a) { window.setTimeout(a, 1e3 / 60) } }(),
                k = function() { b.scaleColor && i(), b.trackColor && h(b.trackColor, b.lineWidth, 1) };
            this.clear = function() { e.clearRect(b.size / -2, b.size / -2, b.size, b.size) }, this.draw = function(a) {
                b.scaleColor || b.trackColor ? e.getImageData && e.putImageData ? c ? e.putImageData(c, 0, 0) : (k(), c = e.getImageData(0, 0, b.size * f, b.size * f)) : (this.clear(), k()) : this.clear(), e.lineCap = b.lineCap;
                var d;
                d = "function" == typeof b.barColor ? b.barColor(a) : b.barColor, h(d, b.lineWidth, a / 100)
            }.bind(this), this.animate = function(a, c) {
                var d = Date.now();
                b.onStart(a, c);
                var e = function() {
                    var f = Math.min(Date.now() - d, b.animate),
                        g = b.easing(this, f, a, c - a, b.animate);
                    this.draw(g), b.onStep(a, c, g), f >= b.animate ? b.onStop(a, c) : j(e)
                }.bind(this);
                j(e)
            }.bind(this)
        },
        c = function(a, c) {
            var d = { barColor: "#ef1e25", trackColor: "#f9f9f9", scaleColor: "#dfe0e0", scaleLength: 5, lineCap: "round", lineWidth: 3, size: 110, rotate: 0, animate: 1e3, easing: function(a, b, c, d, e) { return b /= e / 2, 1 > b ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c }, onStart: function() {}, onStep: function() {}, onStop: function() {} };
            if ("undefined" != typeof b) d.renderer = b;
            else {
                if ("undefined" == typeof SVGRenderer) throw new Error("Please load either the SVG- or the CanvasRenderer");
                d.renderer = SVGRenderer
            }
            var e = {},
                f = 0,
                g = function() {
                    this.el = a, this.options = e;
                    for (var b in d) d.hasOwnProperty(b) && (e[b] = c && "undefined" != typeof c[b] ? c[b] : d[b], "function" == typeof e[b] && (e[b] = e[b].bind(this)));
                    e.easing = "string" == typeof e.easing && "undefined" != typeof jQuery && jQuery.isFunction(jQuery.easing[e.easing]) ? jQuery.easing[e.easing] : d.easing, this.renderer = new e.renderer(a, e), this.renderer.draw(f), a.dataset && a.dataset.percent ? this.update(parseFloat(a.dataset.percent)) : a.getAttribute && a.getAttribute("data-percent") && this.update(parseFloat(a.getAttribute("data-percent")))
                }.bind(this);
            this.update = function(a) { return a = parseFloat(a), e.animate ? this.renderer.animate(f, a) : this.renderer.draw(a), f = a, this }.bind(this), g()
        };
    a.fn.easyPieChart = function(b) {
        return this.each(function() {
            var d;
            a.data(this, "easyPieChart") || (d = a.extend({}, b, a(this).data()), a.data(this, "easyPieChart", new c(this, d)))
        })
    }
});

/* onScreen https://github.com/silvestreh/onScreen */
(function(e) {
    e.fn.onScreen = function(t) {
        var n = e.extend({ container: window, direction: "vertical", toggleClass: null, doIn: null, doOut: null, tolerance: 0, throttle: null, lazyAttr: null, lazyPlaceholder: "data:image/gif;base64,R0lGODlhEAAFAIAAAP///////yH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCQAAACwAAAAAEAAFAAACCIyPqcvtD00BACH5BAkJAAIALAAAAAAQAAUAgfT29Pz6/P///wAAAAIQTGCiywKPmjxUNhjtMlWrAgAh+QQJCQAFACwAAAAAEAAFAIK8urzc2tzEwsS8vrzc3tz///8AAAAAAAADFEiyUf6wCEBHvLPemIHdTzCMDegkACH5BAkJAAYALAAAAAAQAAUAgoSChLS2tIyKjLy+vIyOjMTCxP///wAAAAMUWCQ09jAaAiqQmFosdeXRUAkBCCUAIfkECQkACAAsAAAAABAABQCDvLq83N7c3Nrc9Pb0xMLE/P78vL68/Pr8////AAAAAAAAAAAAAAAAAAAAAAAAAAAABCEwkCnKGbegvQn4RjGMx8F1HxBi5Il4oEiap2DcVYlpZwQAIfkECQkACAAsAAAAABAABQCDvLq85OLkxMLE9Pb0vL685ObkxMbE/Pr8////AAAAAAAAAAAAAAAAAAAAAAAAAAAABCDwnCGHEcIMxPn4VAGMQNBx0zQEZHkiYNiap5RaBKG9EQAh+QQJCQAJACwAAAAAEAAFAIOEgoTMysyMjozs6uyUlpSMiozMzsyUkpTs7uz///8AAAAAAAAAAAAAAAAAAAAAAAAEGTBJiYgoBM09DfhAwHEeKI4dGKLTIHzCwEUAIfkECQkACAAsAAAAABAABQCDvLq85OLkxMLE9Pb0vL685ObkxMbE/Pr8////AAAAAAAAAAAAAAAAAAAAAAAAAAAABCAQSTmMEGaco8+UBSACwWBqHxKOJYd+q1iaXFoRRMbtEQAh+QQJCQAIACwAAAAAEAAFAIO8urzc3tzc2tz09vTEwsT8/vy8vrz8+vz///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAEIhBJWc6wJZAtJh3gcRBAaXiIZV2kiRbgNZbA6VXiUAhGL0QAIfkECQkABgAsAAAAABAABQCChIKEtLa0jIqMvL68jI6MxMLE////AAAAAxRoumxFgoxGCbiANos145e3DJcQJAAh+QQJCQAFACwAAAAAEAAFAIK8urzc2tzEwsS8vrzc3tz///8AAAAAAAADFFi6XCQwtCmAHbPVm9kGWKcEQxkkACH5BAkJAAIALAAAAAAQAAUAgfT29Pz6/P///wAAAAIRlI8SAZsPYnuJMUCRnNksWwAAOw==", debug: false }, t);
        return this.each(function() {
            function m() { if (v) { return p < f - n.tolerance && r < p + c - n.tolerance } else { return p < u - n.tolerance && p > -c + n.tolerance } }

            function g() { if (v) { return p + (c - n.tolerance) < r || p > f - n.tolerance } else { return p > u - n.tolerance || -c + n.tolerance > p } }

            function y() { if (v) { return d < l - n.tolerance && i < d + h - n.tolerance } else { return d < a - n.tolerance && d > -h + n.tolerance } }

            function b() { if (v) { return d + (h - n.tolerance) < i || d > l - n.tolerance } else { return d > a - n.tolerance || -h + n.tolerance > d } }

            function w() { if (t) { return false } if (n.direction === "horizontal") { return y() } else { return m() } }

            function E() { if (!t) { return false } if (n.direction === "horizontal") { return b() } else { return g() } }

            function S(e, t, n) {
                var r, i, s;
                return function() {
                    i = arguments;
                    s = true;
                    n = n || this;
                    if (!r) {
                        (function() {
                            if (s) {
                                e.apply(n, i);
                                s = false;
                                r = setTimeout(arguments.callee, t)
                            } else { r = null }
                        })()
                    }
                }
            }
            var t = false;
            var r;
            var i;
            var s = e(this);
            var o;
            var u;
            var a;
            var f;
            var l;
            var c;
            var h;
            var p;
            var d;
            var v = e.isWindow(n.container);
            var x = function() {
                if (!v && e(n.container).css("position") === "static") { e(n.container).css("position", "relative") }
                o = e(n.container);
                u = o.height();
                a = o.width();
                f = o.scrollTop() + u;
                l = o.scrollLeft() + a;
                c = s.outerHeight(true);
                h = s.outerWidth(true);
                if (v) {
                    var m = s.offset();
                    p = m.top;
                    d = m.left
                } else {
                    var g = s.position();
                    p = g.top;
                    d = g.left
                }
                r = o.scrollTop();
                i = o.scrollLeft();
                if (n.debug) {
                    console.log("Container: " + n.container + "\n" + "Width: " + u + "\n" + "Height: " + a + "\n" + "Bottom: " + f + "\n" + "Right: " + l);
                    console.log("Matched element: " + (s.attr("class") !== undefined ? s.prop("tagName").toLowerCase() + "." + s.attr("class") : s.prop("tagName").toLowerCase()) + "\n" + "Left: " + d + "\n" + "Top: " + p + "\n" + "Width: " + h + "\n" + "Height: " + c)
                }
                if (w()) {
                    if (n.toggleClass) { s.addClass(n.toggleClass) }
                    if (e.isFunction(n.doIn)) { n.doIn.call(s[0]) }
                    if (n.lazyAttr && s.prop("tagName") === "IMG") {
                        var y = s.attr(n.lazyAttr);
                        s.css({ background: "url(" + n.lazyPlaceholder + ") 50% 50% no-repeat", minHeight: "5px", minWidth: "16px" });
                        s.prop("src", y)
                    }
                    t = true
                } else if (E()) {
                    if (n.toggleClass) { s.removeClass(n.toggleClass) }
                    if (e.isFunction(n.doOut)) { n.doOut.call(s[0]) }
                    t = false
                }
            };
            if (window.location.hash) { S(x, 50) } else { x() }
            if (n.throttle) { x = S(x, n.throttle) }
            e(n.container).on("scroll resize", x);
            if (typeof module === "object" && module && typeof module.exports === "object") { module.exports = jQuery } else { if (typeof define === "function" && define.amd) { define("jquery-onscreen", [], function() { return jQuery }) } }
        })
    }
})(jQuery);

// Shuffle Doesn't require this shuffle/debounce plugin, but it works better with it.

/**
 * jQuery Shuffle Plugin
 * Uses CSS Transforms to filter down a grid of items.
 * Dependencies: jQuery 1.9+, Modernizr 2.6.2. Optionally throttle/debounce by Ben Alman
 * Inspired by Isotope http://isotope.metafizzy.co/
 * Modified 2013-08-19
 * @license MIT license
 * @author Glen Cheney <cheney.glen@gmail.com>
 * @version 2.0.1
 */
! function(t, e, i) {
    "use strict"
    t.fn.sorted = function(e) {
        var n = t.extend({}, t.fn.sorted.defaults, e),
            s = this.get(),
            r = !1
        return s.length ? n.randomize ? t.fn.sorted.randomize(s) : (n.by !== t.noop && null !== n.by && n.by !== i && s.sort(function(e, s) {
            if (r) return 0
            var o = n.by(t(e)),
                a = n.by(t(s))
            return o === i && a === i ? (r = !0, 0) : "sortFirst" === o || "sortLast" === a ? -1 : "sortLast" === o || "sortFirst" === a ? 1 : a > o ? -1 : o > a ? 1 : 0
        }), r ? this.get() : (n.reverse && s.reverse(), s)) : []
    }, t.fn.sorted.defaults = { reverse: !1, by: null, randomize: !1 }, t.fn.sorted.randomize = function(t) {
        var e, i, n = t.length
        if (!n) return t
        for (; --n;) i = Math.floor(Math.random() * (n + 1)), e = t[i], t[i] = t[n], t[n] = e
        return t
    }
    var n = 0,
        s = function(e, i) {
            var r = this
            t.extend(r, s.options, i, s.settings), r.$container = e, r.$window = t(window), r.unique = "shuffle_" + n++, r._fire("loading"), r._init(), r._fire("done")
        }
    s.prototype = {
        _init: function() {
            var e, i = this,
                n = t.proxy(i._onResize, i),
                s = i.throttle ? i.throttle(i.throttleTime, n) : n,
                r = i.initialSort ? i.initialSort : null
            i._setVars(), i._resetCols(), i._addClasses(), i._initItems(), i.$window.on("resize.shuffle." + i.unique, s), e = i.$container.css(["paddingLeft", "paddingRight", "position", "width"]), "static" === e.position && i.$container.css("position", "relative"), i.offset = { left: parseInt(e.paddingLeft, 10) || 0, top: parseInt(e.paddingTop, 10) || 0 }, i._setColumns(parseInt(e.width, 10)), i.shuffle(i.group, r), i.supported && setTimeout(function() { i._setTransitions(), i.$container[0].style[i.transitionName] = "height " + i.speed + "ms " + i.easing }, 0)
        },
        _addClasses: function() {
            var t = this
            return t.$container.addClass("shuffle"), t.$items.addClass("shuffle-item filtered"), t
        },
        _setVars: function() {
            var e = this
            return e.$items = e._getItems(), e.transitionName = e.prefixed("transition"), e.transitionDelayName = e.prefixed("transitionDelay"), e.transitionDuration = e.prefixed("transitionDuration"), e.transform = e.getPrefixed("transform"), e.transitionend = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd", msTransition: "MSTransitionEnd", transition: "transitionend" }[e.transitionName], e.isFluid = e.columnWidth && "function" == typeof e.columnWidth, 0 === e.columnWidth && null !== e.sizer && (e.columnWidth = e.sizer), "string" == typeof e.columnWidth ? e.$sizer = e.$container.find(e.columnWidth) : e.columnWidth && e.columnWidth.nodeType && 1 === e.columnWidth.nodeType ? e.$sizer = t(e.columnWidth) : e.columnWidth && e.columnWidth.jquery && (e.$sizer = e.columnWidth), e.$sizer && e.$sizer.length && (e.useSizer = !0, e.sizer = e.$sizer[0]), e
        },
        _filter: function(e, n) {
            var s = this,
                r = n !== i,
                o = r ? n : s.$items,
                a = t()
            return e = e || s.lastFilter, s._fire("filter"), t.isFunction(e) ? o.each(function() {
                var i = t(this),
                    n = e.call(i[0], i, s)
                n && (a = a.add(i))
            }) : (s.group = e, "all" !== e ? o.each(function() {
                var i = t(this),
                    n = i.data("groups"),
                    r = s.delimeter && !t.isArray(n) ? n.split(s.delimeter) : n,
                    o = t.inArray(e, r) > -1
                o && (a = a.add(i))
            }) : a = o), s._toggleFilterClasses(o, a), o = null, n = null, a
        },
        _toggleFilterClasses: function(e, i) {
            var n = "concealed",
                s = "filtered"
            e.filter(i).each(function() {
                var e = t(this)
                e.hasClass(n) && e.removeClass(n), e.hasClass(s) || e.addClass(s)
            }), e.not(i).each(function() {
                var e = t(this)
                e.hasClass(n) || e.addClass(n), e.hasClass(s) && e.removeClass(s)
            })
        },
        _initItems: function(t) { return t = t || this.$items, t.css(this.itemCss) },
        _updateItemCount: function() { return this.visibleItems = this.$items.filter(".filtered").length, this },
        _setTransition: function(t) {
            var e = this
            return t.style[e.transitionName] = e.transform + " " + e.speed + "ms " + e.easing + ", opacity " + e.speed + "ms " + e.easing, t
        },
        _setTransitions: function(t) {
            var e = this
            return t = t || e.$items, t.each(function() { e._setTransition(this) }), e
        },
        _setSequentialDelay: function(e) {
            var i = this
            i.supported && t.each(e, function(e) { this.style[i.transitionDelayName] = "0ms," + (e + 1) * i.sequentialFadeDelay + "ms", t(this).one(i.transitionend, function() { this.style[i.transitionDelayName] = "0ms" }) })
        },
        _getItems: function() { return this.$container.children(this.itemSelector) },
        _getPreciseDimension: function(e, i) {
            var n
            return n = window.getComputedStyle ? window.getComputedStyle(e, null)[i] : t(e).css(i), parseFloat(n)
        },
        _setColumns: function(t) {
            var e, i = this,
                n = t || i.$container.width(),
                s = "function" == typeof i.gutterWidth ? i.gutterWidth(n) : i.useSizer ? i._getPreciseDimension(i.sizer, "marginLeft") : i.gutterWidth
            i.colWidth = i.isFluid ? i.columnWidth(n) : i.useSizer ? i._getPreciseDimension(i.sizer, "width") : i.columnWidth || i.$items.outerWidth(!0) || n, i.colWidth = i.colWidth || n, i.colWidth += s, e = (n + s) / i.colWidth, Math.ceil(e) - e < .01 && (e = Math.ceil(e)), i.cols = Math.floor(e), i.cols = Math.max(i.cols, 1), i.containerWidth = n
        },
        _setContainerSize: function() {
            var t = this,
                e = Math.max.apply(Math, t.colYs)
            t.$container.css("height", e + "px")
        },
        _fire: function(t, e) { this.$container.trigger(t + ".shuffle", e && e.length ? e : [this]) },
        _layout: function(e, i, n, s) {
            var r = this
            i = i || r.filterEnd, r.layoutTransitionEnded = !1, t.each(e, function(o) {
                var a = t(e[o]),
                    l = Math.ceil(a.outerWidth(!0) / r.colWidth)
                if (l = Math.min(l, r.cols), 1 === l) r._placeItem(a, r.colYs, i, n, s)
                else {
                    var u, d, c = r.cols + 1 - l,
                        f = []
                    for (d = 0; c > d; d++) u = r.colYs.slice(d, d + l), f[d] = Math.max.apply(Math, u)
                    r._placeItem(a, f, i, n, s)
                }
            }), r._processStyleQueue(), r._setContainerSize()
        },
        _resetCols: function() {
            var t = this.cols
            for (this.colYs = []; t--;) this.colYs.push(0)
        },
        _reLayout: function(t, e) {
            var i = this
            t = t || i.filterEnd, i._resetCols(), i.keepSorted && i.lastSort ? i.sort(i.lastSort, !0, e) : i._layout(i.$items.filter(".filtered").get(), i.filterEnd, e)
        },
        _placeItem: function(t, e, i, n, s) {
            for (var r = this, o = Math.min.apply(Math, e), a = 0, l = 0, u = e.length; u > l; l++)
                if (e[l] >= o - r.buffer && e[l] <= o + r.buffer) {
                    a = l
                    break
                }
            var d = r.colWidth * a,
                c = o
            d = Math.round(d + r.offset.left), c = Math.round(c + r.offset.top), t.data({ x: d, y: c })
            var f = o + t.outerHeight(!0),
                h = r.cols + 1 - u
            for (l = 0; h > l; l++) r.colYs[a + l] = f
            var p = { from: "layout", $this: t, x: d, y: c, scale: 1 }
            n ? p.skipTransition = !0 : (p.opacity = 1, p.callback = i), s && (p.opacity = 0), r.styleQueue.push(p)
        },
        _shrink: function(e, i) {
            var n = this,
                s = e || n.$items.filter(".concealed"),
                r = {},
                o = i || n.shrinkEnd
            s.length && (n._fire("shrink"), n.shrinkTransitionEnded = !1, s.each(function() {
                var e = t(this),
                    i = e.data()
                r = { from: "shrink", $this: e, x: i.x, y: i.y, scale: .001, opacity: 0, callback: o }, n.styleQueue.push(r)
            }))
        },
        _onResize: function() {
            var t, e = this
            e.enabled && !e.destroyed && (t = e.$container.width(), t !== e.containerWidth && e.resized())
        },
        setPrefixedCss: function(t, e, i) { t.css(this.prefixed(e), i) },
        getPrefixed: function(t) {
            var e = this.prefixed(t)
            return e ? e.replace(/([A-Z])/g, function(t, e) { return "-" + e.toLowerCase() }).replace(/^ms-/, "-ms-") : e
        },
        transition: function(e) {
            var n, s = this,
                r = function() { s.layoutTransitionEnded || "layout" !== e.from ? s.shrinkTransitionEnded || "shrink" !== e.from || (e.callback.call(s), s.shrinkTransitionEnded = !0) : (s._fire("layout"), e.callback.call(s), s.layoutTransitionEnded = !0) }
            if (e.callback = e.callback || t.noop, s.supported) e.scale === i && (e.scale = 1), n = s.threeD ? "translate3d(" + e.x + "px, " + e.y + "px, 0) scale3d(" + e.scale + ", " + e.scale + ", 1)" : "translate(" + e.x + "px, " + e.y + "px) scale(" + e.scale + ", " + e.scale + ")", e.x !== i && s.setPrefixedCss(e.$this, "transform", n), e.opacity !== i && e.$this.css("opacity", e.opacity), e.$this.one(s.transitionend, r)
            else {
                var o = { left: e.x, top: e.y, opacity: e.opacity }
                e.$this.stop(!0).animate(o, s.speed, "swing", r)
            }
        },
        _processStyleQueue: function() {
            var e = this,
                i = e.styleQueue
            t.each(i, function(t, i) { i.skipTransition ? e._skipTransition(i.$this[0], function() { e.transition(i) }) : e.transition(i) }), e.styleQueue.length = 0
        },
        shrinkEnd: function() { this._fire("shrunk") },
        filterEnd: function() { this._fire("filtered") },
        sortEnd: function() { this._fire("sorted") },
        _skipTransition: function(e, i, n) {
            var s, r = this,
                o = r.transitionDuration,
                a = e.style[o]
            e.style[o] = "0ms", t.isFunction(i) ? i() : e.style[i] = n, s = e.offsetWidth, e.style[o] = a
        },
        _addItems: function(t, e, n) {
            var s, r, o = this
            o.supported || (e = !1), t.addClass("shuffle-item"), o._initItems(t), o._setTransitions(t), o.$items = o._getItems(), t.css("opacity", 0), s = o._filter(i, t), r = s.get(), o._updateItemCount(), e ? (o._layout(r, null, !0, !0), n && o._setSequentialDelay(s), o._revealAppended(s)) : o._layout(r)
        },
        _revealAppended: function(e) {
            var i = this
            setTimeout(function() { e.each(function(e, n) { i.transition({ from: "reveal", $this: t(n), opacity: 1 }) }) }, i.revealAppendedDelay)
        },
        shuffle: function(t, e) {
            var i = this
            i.enabled && (t || (t = "all"), i._filter(t), i.lastFilter = t, i._updateItemCount(), i._resetCols(), i._shrink(), e && (i.lastSort = e), i._reLayout())
        },
        sort: function(t, e, i) {
            var n = this,
                s = n.$items.filter(".filtered").sorted(t)
            e || n._resetCols(), n._layout(s, function() { e && n.filterEnd(), n.sortEnd() }, i), n.lastSort = t
        },
        resized: function(t) { this.enabled && (t || this._setColumns(), this._reLayout()) },
        layout: function() { this.update(!0) },
        update: function(t) { this.resized(t) },
        appended: function(t, e, i) { e = e === !1 ? !1 : !0, i = i === !1 ? !1 : !0, this._addItems(t, e, i) },
        disable: function() { this.enabled = !1 },
        enable: function(t) { this.enabled = !0, t !== !1 && this.update() },
        remove: function(t) {
            if (t.length && t.jquery) {
                var e = this
                return e._shrink(t, function() {
                    var e = this
                    t.remove(), setTimeout(function() { e.$items = e._getItems(), e.layout(), e._updateItemCount(), e._fire("removed", [t, e]), t = null }, 0)
                }), e._processStyleQueue(), e
            }
        },
        destroy: function() {
            var t = this
            t.$window.off("." + t.unique), t.$container.removeClass("shuffle").removeAttr("style").removeData("shuffle"), t.$items.removeAttr("style").removeClass("concealed filtered shuffle-item"), t.destroyed = !0
        }
    }, s.options = { group: "all", speed: 250, easing: "ease-out", itemSelector: "", sizer: null, gutterWidth: 0, columnWidth: 0, delimeter: null, buffer: 0, initialSort: null, throttle: t.throttle || null, throttleTime: 300, sequentialFadeDelay: 150, supported: e.csstransforms && e.csstransitions }, s.settings = { $sizer: null, useSizer: !1, itemCss: { position: "absolute", top: 0, left: 0 }, offset: { top: 0, left: 0 }, revealAppendedDelay: 300, keepSorted: !0, enabled: !0, destroyed: !1, styleQueue: [], prefixed: e.prefixed, threeD: e.csstransforms3d }, t.fn.shuffle = function(e) {
        var i = Array.prototype.slice.call(arguments, 1)
        return this.each(function() {
            var n = t(this),
                r = n.data("shuffle")
            r || (r = new s(n, e), n.data("shuffle", r)), "string" == typeof e && r[e] && r[e].apply(r, i)
        })
    }
}(jQuery, Modernizr);

/* jQuery Plugin - Jribbble v1.0.1 https://github.com/tylergaw/jribbble */
(function(e) {
    "use strict";
    e.jribbble = {};
    var t = function(t, s) { e.ajax({ type: "GET", url: "http://api.dribbble.com" + t, data: s[1] || {}, dataType: "jsonp", success: function(e) { e === undefined ? s[0]({ error: !0 }) : s[0](e) } }) },
        s = { getShotById: "/shots/$/", getReboundsOfShot: "/shots/$/rebounds/", getShotsByList: "/shots/$/", getShotsByPlayerId: "/players/$/shots/", getShotsThatPlayerFollows: "/players/$/shots/following/", getPlayerById: "/players/$/", getPlayerFollowers: "/players/$/followers/", getPlayerFollowing: "/players/$/following/", getPlayerDraftees: "/players/$/draftees/", getCommentsOfShot: "/shots/$/comments/", getShotsThatPlayerLikes: "/players/$/shots/likes/" },
        o = function(e) {
            return function() {
                var s = [].slice.call(arguments),
                    o = e.replace("$", s.shift());
                t(o, s)
            }
        };
    for (var r in s) e.jribbble[r] = o(s[r])
})(jQuery, window, document);

/*!
 *  FluidVids.js v2.1.0
 *  Responsive and fluid YouTube/Vimeo video embeds.
 *  Project: https://github.com/toddmotto/fluidvids
 *  by Todd Motto: http://toddmotto.com
 *
 *  Copyright 2013 Todd Motto. MIT licensed.
 */
window.Fluidvids = function(a, b) {
    "use strict";
    var c, d, e = b.head || b.getElementsByTagName("head")[0],
        f = ".fluidvids-elem{position:absolute;top:0px;left:0px;width:100%;height:100%;}.fluidvids{width:100%;position:relative;}",
        g = function(a) { return c = new RegExp("^(https?:)?//(?:" + d.join("|") + ").*$", "i"), c.test(a) },
        h = function(a) {
            var c = b.createElement("div"),
                d = a.parentNode,
                e = 100 * (parseInt(a.height ? a.height : a.offsetHeight, 10) / parseInt(a.width ? a.width : a.offsetWidth, 10));
            d.insertBefore(c, a), a.className += " fluidvids-elem", c.className += " fluidvids", c.style.paddingTop = e + "%", c.appendChild(a)
        },
        i = function() {
            var a = b.createElement("div");
            a.innerHTML = "<p>x</p><style>" + f + "</style>", e.appendChild(a.childNodes[1])
        },
        j = function(a) {
            var c = a || {},
                e = c.selector || "iframe";
            d = c.players || ["www.youtube.com", "player.vimeo.com"];
            for (var f = b.querySelectorAll(e), j = 0; j < f.length; j++) {
                var k = f[j];
                g(k.src) && h(k)
            }
            i()
        };
    return { init: j }
}(window, document);

/*
	Image Lightbox, Responsive and Touch‑friendly
	By Osvaldas Valutis, www.osvaldas.info
	http://osvaldas.info/image-lightbox-responsive-touch-friendly
	Available for use under the MIT License
	Note: screenHeight = $( window ).height() has been multiplied by 0.8 instead of 0.9,
*/
;
(function(e, t, n, r) {
    "use strict";
    var i = function() {
            var e = n.body || n.documentElement,
                e = e.style;
            if (e.WebkitTransition == "") return "-webkit-";
            if (e.MozTransition == "") return "-moz-";
            if (e.OTransition == "") return "-o-";
            if (e.transition == "") return "";
            return false
        },
        s = i() === false ? false : true,
        o = function(e, t, n) {
            var r = {},
                s = i();
            r[s + "transform"] = "translateX(" + t + ")";
            r[s + "transition"] = s + "transform " + n + "s linear";
            e.css(r)
        },
        u = "ontouchstart" in t,
        a = t.navigator.pointerEnabled || t.navigator.msPointerEnabled,
        f = function(e) { if (u) return true; if (!a || typeof e === "undefined" || typeof e.pointerType === "undefined") return false; if (typeof e.MSPOINTER_TYPE_MOUSE !== "undefined") { if (e.MSPOINTER_TYPE_MOUSE != e.pointerType) return true } else if (e.pointerType != "mouse") return true; return false };
    e.fn.imageLightbox = function(r) {
        var r = e.extend({ selector: 'id="imagelightbox"', allowedTypes: "png|jpg|jpeg|gif", animationSpeed: 250, preloadNext: true, enableKeyboard: true, quitOnEnd: false, quitOnImgClick: false, quitOnDocClick: true, onStart: false, onEnd: false, onLoadStart: false, onLoadEnd: false }, r),
            i = e([]),
            l = e(),
            c = e(),
            h = 0,
            p = 0,
            d = 0,
            v = false,
            m = function(t) { return e(t).prop("tagName").toLowerCase() == "a" && (new RegExp(".(" + r.allowedTypes + ")$", "i")).test(e(t).attr("href")) },
            g = function() {
                if (!c.length) return false;
                var n = e(t).width() * .8,
                    r = e(t).height() * .8,
                    i = new Image;
                i.src = c.attr("src");
                i.onload = function() {
                    h = i.width;
                    p = i.height;
                    if (h > n || p > r) {
                        var s = h / p > n / r ? h / n : p / r;
                        h /= s;
                        p /= s
                    }
                    c.css({ width: h + "px", height: p + "px", top: (e(t).height() - p) / 2 + "px", left: (e(t).width() - h) / 2 + "px" })
                }
            },
            y = function(t) {
                if (v) return false;
                t = typeof t === "undefined" ? false : t == "left" ? 1 : -1;
                if (c.length) {
                    if (t !== false && (i.length < 2 || r.quitOnEnd === true && (t === -1 && i.index(l) == 0 || t === 1 && i.index(l) == i.length - 1))) { w(); return false }
                    var n = { opacity: 0 };
                    if (s) o(c, 100 * t - d + "px", r.animationSpeed / 1e3);
                    else n.left = parseInt(c.css("left")) + 100 * t + "px";
                    c.animate(n, r.animationSpeed, function() { b() });
                    d = 0
                }
                v = true;
                if (r.onLoadStart !== false) r.onLoadStart();
                setTimeout(function() {
                    c = e("<img " + r.selector + " />").attr("src", l.attr("href")).load(function() {
                        c.appendTo("body");
                        g();
                        var n = { opacity: 1 };
                        c.css("opacity", 0);
                        if (s) {
                            o(c, -100 * t + "px", 0);
                            setTimeout(function() { o(c, 0 + "px", r.animationSpeed / 1e3) }, 50)
                        } else {
                            var u = parseInt(c.css("left"));
                            n.left = u + "px";
                            c.css("left", u - 100 * t + "px")
                        }
                        c.animate(n, r.animationSpeed, function() { v = false; if (r.onLoadEnd !== false) r.onLoadEnd() });
                        if (r.preloadNext) {
                            var a = i.eq(i.index(l) + 1);
                            if (!a.length) a = i.eq(0);
                            e("<img />").attr("src", a.attr("href")).load()
                        }
                    }).error(function() { if (r.onLoadEnd !== false) r.onLoadEnd() });
                    var n = 0,
                        u = 0,
                        p = 0;
                    c.on(a ? "pointerup MSPointerUp" : "click", function(e) {
                        e.preventDefault();
                        if (r.quitOnImgClick) { w(); return false }
                        if (f(e.originalEvent)) return true;
                        var t = (e.pageX || e.originalEvent.pageX) - e.target.offsetLeft;
                        l = i.eq(i.index(l) - (h / 2 > t ? 1 : -1));
                        if (!l.length) l = i.eq(h / 2 > t ? i.length : 0);
                        y(h / 2 > t ? "left" : "right")
                    }).on("touchstart pointerdown MSPointerDown", function(e) {
                        if (!f(e.originalEvent) || r.quitOnImgClick) return true;
                        if (s) p = parseInt(c.css("left"));
                        n = e.originalEvent.pageX || e.originalEvent.touches[0].pageX
                    }).on("touchmove pointermove MSPointerMove", function(e) {
                        if (!f(e.originalEvent) || r.quitOnImgClick) return true;
                        e.preventDefault();
                        u = e.originalEvent.pageX || e.originalEvent.touches[0].pageX;
                        d = n - u;
                        if (s) o(c, -d + "px", 0);
                        else c.css("left", p - d + "px")
                    }).on("touchend touchcancel pointerup MSPointerUp", function(e) {
                        if (!f(e.originalEvent) || r.quitOnImgClick) return true;
                        if (Math.abs(d) > 50) {
                            l = i.eq(i.index(l) - (d < 0 ? 1 : -1));
                            if (!l.length) l = i.eq(d < 0 ? i.length : 0);
                            y(d > 0 ? "right" : "left")
                        } else {
                            if (s) o(c, 0 + "px", r.animationSpeed / 1e3);
                            else c.animate({ left: p + "px" }, r.animationSpeed / 2)
                        }
                    })
                }, r.animationSpeed + 100)
            },
            b = function() {
                if (!c.length) return false;
                c.remove();
                c = e()
            },
            w = function() {
                if (!c.length) return false;
                c.animate({ opacity: 0 }, r.animationSpeed, function() {
                    b();
                    v = false;
                    if (r.onEnd !== false) r.onEnd()
                })
            };
        e(t).on("resize", g);
        if (r.quitOnDocClick) { e(n).on(u ? "touchend" : "click", function(t) { if (c.length && !e(t.target).is(c)) w() }) }
        if (r.enableKeyboard) {
            e(n).on("keyup", function(e) {
                if (!c.length) return true;
                e.preventDefault();
                if (e.keyCode == 27) w();
                if (e.keyCode == 37 || e.keyCode == 39) {
                    l = i.eq(i.index(l) - (e.keyCode == 37 ? 1 : -1));
                    if (!l.length) l = i.eq(e.keyCode == 37 ? i.length : 0);
                    y(e.keyCode == 37 ? "left" : "right")
                }
            })
        }
        e(n).on("click", this.selector, function(t) {
            if (!m(this)) return true;
            t.preventDefault();
            if (v) return false;
            v = false;
            if (r.onStart !== false) r.onStart();
            l = e(this);
            y()
        });
        this.each(function() {
            if (!m(this)) return true;
            i = i.add(e(this))
        });
        this.switchImageLightbox = function(e) {
            var t = i.eq(e);
            if (t.length) {
                var n = i.index(l);
                l = t;
                y(e < n ? "left" : "right")
            }
            return this
        };
        this.quitImageLightbox = function() { w(); return this };
        return this
    }
})(jQuery, window, document);

/* countTo https://github.com/mhuggins/jquery-countTo */
(function(e) {
    function t(e, t) { return e.toFixed(t.decimals) }
    e.fn.countTo = function(t) {
        t = t || {};
        return e(this).each(function() {
            function l() {
                a += i;
                u++;
                c(a);
                if (typeof n.onUpdate == "function") { n.onUpdate.call(s, a) }
                if (u >= r) {
                    o.removeData("countTo");
                    clearInterval(f.interval);
                    a = n.to;
                    if (typeof n.onComplete == "function") { n.onComplete.call(s, a) }
                }
            }

            function c(e) {
                var t = n.formatter.call(s, e, n);
                o.text(t)
            }
            var n = e.extend({}, e.fn.countTo.defaults, { from: e(this).data("from"), to: e(this).data("to"), speed: e(this).data("speed"), refreshInterval: e(this).data("refresh-interval"), decimals: e(this).data("decimals") }, t);
            var r = Math.ceil(n.speed / n.refreshInterval),
                i = (n.to - n.from) / r;
            var s = this,
                o = e(this),
                u = 0,
                a = n.from,
                f = o.data("countTo") || {};
            o.data("countTo", f);
            if (f.interval) { clearInterval(f.interval) }
            f.interval = setInterval(l, n.refreshInterval);
            c(a)
        })
    };
    e.fn.countTo.defaults = { from: 0, to: 0, speed: 1e3, refreshInterval: 100, decimals: 0, formatter: t, onUpdate: null, onComplete: null }
})(jQuery);

/**
 * @name InfoBox
 * @version 1.1.12 [December 11, 2012]
 * @author Gary Little (inspired by proof-of-concept code from Pamela Fox of Google)
 * @copyright Copyright 2010 Gary Little [gary at luxcentral.com]
 * @fileoverview InfoBox extends the Google Maps JavaScript API V3 <tt>OverlayView</tt> class.
 *  <p>
 *  An InfoBox behaves like a <tt>google.maps.InfoWindow</tt>, but it supports several
 *  additional properties for advanced styling. An InfoBox can also be used as a map label.
 *  <p>
 *  An InfoBox also fires the same events as a <tt>google.maps.InfoWindow</tt>.
 */

// More informations about Infobox: http://stackoverflow.com/questions/7616666/google-maps-api-v3-custom-styles-for-infowindow

eval(function(p, a, c, k, e, r) {
    e = function(c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) };
    if (!''.replace(/^/, String)) {
        while (c--) r[e(c)] = k[c] || e(c);
        k = [function(e) { return r[e] }];
        e = function() { return '\\w+' };
        c = 1
    };
    while (c--)
        if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p
}('6 8(a){a=a||{};r.s.1P.2j(2,36);2.M=a.1y||"";2.1z=a.1q||J;2.U=a.1H||0;2.G=a.1B||1g r.s.1Y(0,0);2.E=a.Y||1g r.s.2B(0,0);2.X=a.V||t;2.1p=a.1s||"2g";2.1m=a.F||{};2.1G=a.1E||"39";2.N=a.1j||"34://31.r.2W/2Q/2O/2K/1u.2I";3(a.1j===""){2.N=""}2.19=a.1A||1g r.s.1Y(1,1);3(p a.A==="q"){3(p a.18==="q"){a.A=L}v{a.A=!a.18}}2.w=!a.A;2.17=a.1n||J;2.1I=a.2f||"2d";2.15=a.1l||J;2.4=t;2.z=t;2.14=t;2.T=t;2.B=t;2.R=t}8.9=1g r.s.1P();8.9.24=6(){5 i;5 f;5 a;5 d=2;5 c=6(e){e.20=L;3(e.1i){e.1i()}};5 b=6(e){e.2T=J;3(e.1Z){e.1Z()}3(!d.15){c(e)}};3(!2.4){2.4=16.2N("2M");2.1d();3(p 2.M.1v==="q"){2.4.Q=2.I()+2.M}v{2.4.Q=2.I();2.4.1e(2.M)}2.2F()[2.1I].1e(2.4);2.1t();3(2.4.7.C){2.R=L}v{3(2.U!==0&&2.4.Z>2.U){2.4.7.C=2.U;2.4.7.2A="2x";2.R=L}v{a=2.22();2.4.7.C=(2.4.Z-a.13-a.12)+"11";2.R=J}}2.1r(2.1z);3(!2.15){2.B=[];f=["2q","1N","2p","2o","1M","2n","2m","2l","2k"];1o(i=0;i<f.1L;i++){2.B.1K(r.s.u.1c(2.4,f[i],c))}2.B.1K(r.s.u.1c(2.4,"1N",6(e){2.7.1J="2i"}))}2.T=r.s.u.1c(2.4,"2h",b);r.s.u.S(2,"2e")}};8.9.I=6(){5 a="";3(2.N!==""){a="<2c";a+=" 2b=\'"+2.N+"\'";a+=" 2a=12";a+=" 7=\'";a+=" Y: 29;";a+=" 1J: 28;";a+=" 27: "+2.1G+";";a+="\'>"}K a};8.9.1t=6(){5 a;3(2.N!==""){a=2.4.3f;2.z=r.s.u.1c(a,"1M",2.26())}v{2.z=t}};8.9.26=6(){5 a=2;K 6(e){e.20=L;3(e.1i){e.1i()}r.s.u.S(a,"3e");a.1u()}};8.9.1r=6(d){5 m;5 n;5 e=0,H=0;3(!d){m=2.1F();3(m 3d r.s.3c){3(!m.25().3a(2.E)){m.38(2.E)}n=m.25();5 a=m.37();5 h=a.Z;5 f=a.23;5 k=2.G.C;5 l=2.G.1k;5 g=2.4.Z;5 b=2.4.23;5 i=2.19.C;5 j=2.19.1k;5 o=2.21().35(2.E);3(o.x<(-k+i)){e=o.x+k-i}v 3((o.x+g+k+i)>h){e=o.x+g+k+i-h}3(2.17){3(o.y<(-l+j+b)){H=o.y+l-j-b}v 3((o.y+l+j)>f){H=o.y+l+j-f}}v{3(o.y<(-l+j)){H=o.y+l-j}v 3((o.y+b+l+j)>f){H=o.y+b+l+j-f}}3(!(e===0&&H===0)){5 c=m.33();m.32(e,H)}}}};8.9.1d=6(){5 i,F;3(2.4){2.4.30=2.1p;2.4.7.2Z="";F=2.1m;1o(i 2Y F){3(F.2X(i)){2.4.7[i]=F[i]}}3(p 2.4.7.1f!=="q"&&2.4.7.1f!==""){2.4.7.2V="2S(1f="+(2.4.7.1f*2R)+")"}2.4.7.Y="2P";2.4.7.P=\'1b\';3(2.X!==t){2.4.7.V=2.X}}};8.9.22=6(){5 c;5 a={1a:0,1h:0,13:0,12:0};5 b=2.4;3(16.1w&&16.1w.1X){c=b.2L.1w.1X(b,"");3(c){a.1a=D(c.1W,10)||0;a.1h=D(c.1V,10)||0;a.13=D(c.1U,10)||0;a.12=D(c.1T,10)||0}}v 3(16.2J.O){3(b.O){a.1a=D(b.O.1W,10)||0;a.1h=D(b.O.1V,10)||0;a.13=D(b.O.1U,10)||0;a.12=D(b.O.1T,10)||0}}K a};8.9.2H=6(){3(2.4){2.4.2G.2U(2.4);2.4=t}};8.9.1x=6(){2.24();5 a=2.21().2E(2.E);2.4.7.13=(a.x+2.G.C)+"11";3(2.17){2.4.7.1h=-(a.y+2.G.1k)+"11"}v{2.4.7.1a=(a.y+2.G.1k)+"11"}3(2.w){2.4.7.P=\'1b\'}v{2.4.7.P="A"}};8.9.2D=6(a){3(p a.1s!=="q"){2.1p=a.1s;2.1d()}3(p a.F!=="q"){2.1m=a.F;2.1d()}3(p a.1y!=="q"){2.1S(a.1y)}3(p a.1q!=="q"){2.1z=a.1q}3(p a.1H!=="q"){2.U=a.1H}3(p a.1B!=="q"){2.G=a.1B}3(p a.1n!=="q"){2.17=a.1n}3(p a.Y!=="q"){2.1D(a.Y)}3(p a.V!=="q"){2.1R(a.V)}3(p a.1E!=="q"){2.1G=a.1E}3(p a.1j!=="q"){2.N=a.1j}3(p a.1A!=="q"){2.19=a.1A}3(p a.18!=="q"){2.w=a.18}3(p a.A!=="q"){2.w=!a.A}3(p a.1l!=="q"){2.15=a.1l}3(2.4){2.1x()}};8.9.1S=6(a){2.M=a;3(2.4){3(2.z){r.s.u.W(2.z);2.z=t}3(!2.R){2.4.7.C=""}3(p a.1v==="q"){2.4.Q=2.I()+a}v{2.4.Q=2.I();2.4.1e(a)}3(!2.R){2.4.7.C=2.4.Z+"11";3(p a.1v==="q"){2.4.Q=2.I()+a}v{2.4.Q=2.I();2.4.1e(a)}}2.1t()}r.s.u.S(2,"2C")};8.9.1D=6(a){2.E=a;3(2.4){2.1x()}r.s.u.S(2,"1Q")};8.9.1R=6(a){2.X=a;3(2.4){2.4.7.V=a}r.s.u.S(2,"2z")};8.9.2y=6(a){2.w=!a;3(2.4){2.4.7.P=(2.w?"1b":"A")}};8.9.2w=6(){K 2.M};8.9.1C=6(){K 2.E};8.9.2v=6(){K 2.X};8.9.2u=6(){5 a;3((p 2.1F()==="q")||(2.1F()===t)){a=J}v{a=!2.w}K a};8.9.2t=6(){2.w=J;3(2.4){2.4.7.P="A"}};8.9.3b=6(){2.w=L;3(2.4){2.4.7.P="1b"}};8.9.2s=6(c,b){5 a=2;3(b){2.E=b.1C();2.14=r.s.u.2r(b,"1Q",6(){a.1D(2.1C())})}2.1O(c);3(2.4){2.1r()}};8.9.1u=6(){5 i;3(2.z){r.s.u.W(2.z);2.z=t}3(2.B){1o(i=0;i<2.B.1L;i++){r.s.u.W(2.B[i])}2.B=t}3(2.14){r.s.u.W(2.14);2.14=t}3(2.T){r.s.u.W(2.T);2.T=t}2.1O(t)};', 62, 202, '||this|if|div_|var|function|style|InfoBox|prototype||||||||||||||||typeof|undefined|google|maps|null|event|else|isHidden_|||closeListener_|visible|eventListeners_|width|parseInt|position_|boxStyle|pixelOffset_|yOffset|getCloseBoxImg_|false|return|true|content_|closeBoxURL_|currentStyle|visibility|innerHTML|fixedWidthSet_|trigger|contextListener_|maxWidth_|zIndex|removeListener|zIndex_|position|offsetWidth||px|right|left|moveListener_|enableEventPropagation_|document|alignBottom_|isHidden|infoBoxClearance_|top|hidden|addDomListener|setBoxStyle_|appendChild|opacity|new|bottom|stopPropagation|closeBoxURL|height|enableEventPropagation|boxStyle_|alignBottom|for|boxClass_|disableAutoPan|panBox_|boxClass|addClickHandler_|close|nodeType|defaultView|draw|content|disableAutoPan_|infoBoxClearance|pixelOffset|getPosition|setPosition|closeBoxMargin|getMap|closeBoxMargin_|maxWidth|pane_|cursor|push|length|click|mouseover|setMap|OverlayView|position_changed|setZIndex|setContent|borderRightWidth|borderLeftWidth|borderBottomWidth|borderTopWidth|getComputedStyle|Size|preventDefault|cancelBubble|getProjection|getBoxWidths_|offsetHeight|createInfoBoxDiv_|getBounds|getCloseClickHandler_|margin|pointer|relative|align|src|img|floatPane|domready|pane|infoBox|contextmenu|default|apply|touchmove|touchend|touchstart|dblclick|mouseup|mouseout|mousedown|addListener|open|show|getVisible|getZIndex|getContent|auto|setVisible|zindex_changed|overflow|LatLng|content_changed|setOptions|fromLatLngToDivPixel|getPanes|parentNode|onRemove|gif|documentElement|mapfiles|ownerDocument|div|createElement|en_us|absolute|intl|100|alpha|returnValue|removeChild|filter|com|hasOwnProperty|in|cssText|className|www|panBy|getCenter|http|fromLatLngToContainerPixel|arguments|getDiv|setCenter|2px|contains|hide|Map|instanceof|closeclick|firstChild'.split('|'), 0, {}));
    var __defProp = Object.defineProperty,
    __defProps = Object.defineProperties,
    __getOwnPropDescs = Object.getOwnPropertyDescriptors,
    __getOwnPropSymbols = Object.getOwnPropertySymbols,
    __hasOwnProp = Object.prototype.hasOwnProperty,
    __propIsEnum = Object.prototype.propertyIsEnumerable,
    __defNormalProp = (e, t, i) =>
        t in e
        ? __defProp(e, t, {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: i,
            })
        : (e[t] = i),
    __spreadValues = (e, t) => {
        for (var i in t || (t = {}))
        __hasOwnProp.call(t, i) && __defNormalProp(e, i, t[i]);
        if (__getOwnPropSymbols)
        for (var i of __getOwnPropSymbols(t))
            __propIsEnum.call(t, i) && __defNormalProp(e, i, t[i]);
        return e;
    },
    __spreadProps = (e, t) => __defProps(e, __getOwnPropDescs(t)),
    __publicField = (e, t, i) => (
        __defNormalProp(e, "symbol" != typeof t ? t + "" : t, i), i
    ),
    __async = (e, t, i) =>
        new Promise((n, s) => {
        var r = (e) => {
            try {
                o(i.next(e));
            } catch (t) {
                s(t);
            }
            },
            a = (e) => {
            try {
                o(i.throw(e));
            } catch (t) {
                s(t);
            }
            },
            o = (e) => (e.done ? n(e.value) : Promise.resolve(e.value).then(r, a));
        o((i = i.apply(e, t)).next());
        });
    !(function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
        ? define(t)
        : ((e = "undefined" != typeof globalThis ? globalThis : e || self).Artalk =
            t());
    })(this, function () {
    "use strict";
    class e {
        constructor(e) {
        __publicField(this, "data");
        const t = JSON.parse(window.localStorage.getItem("ArtalkUser") || "{}");
        this.data = {
            nick: t.nick || "",
            email: t.email || "",
            link: t.link || "",
            token: t.token || "",
            isAdmin: t.isAdmin || !1,
        };
        }
        save() {
        window.localStorage.setItem("ArtalkUser", JSON.stringify(this.data));
        }
        checkHasBasicUserInfo() {
        return !!this.data.nick && !!this.data.email;
        }
    }
    class t {
        constructor(t, i) {
        __publicField(this, "cid"),
            __publicField(this, "$root"),
            __publicField(this, "conf"),
            __publicField(this, "user"),
            __publicField(this, "eventList", []),
            __publicField(this, "markedInstance"),
            __publicField(this, "markedReplacers", []),
            (this.cid = +new Date()),
            (this.$root = t),
            (this.conf = i),
            (this.user = new e(this.conf)),
            this.$root.setAttribute("atk-run-id", this.cid.toString());
        }
        on(e, t, i = "internal") {
        this.eventList.push({ name: e, handler: t, scope: i });
        }
        off(e, t, i = "internal") {
        this.eventList = this.eventList.filter((n) =>
            t
            ? !(n.name === e && n.handler === t && n.scope === i)
            : !(n.name === e && n.scope === i)
        );
        }
        trigger(e, t, i) {
        this.eventList
            .filter((t) => t.name === e && (!i || t.scope === i))
            .map((e) => e.handler)
            .forEach((e) => e(t));
        }
    }
    class i {
        constructor(e) {
        __publicField(this, "$el"),
            __publicField(this, "ctx"),
            __publicField(this, "conf"),
            (this.ctx = e),
            (this.conf = e.conf);
        }
    }
    function n() {
        return {
        baseUrl: null,
        breaks: !1,
        extensions: null,
        gfm: !0,
        headerIds: !0,
        headerPrefix: "",
        highlight: null,
        langPrefix: "language-",
        mangle: !0,
        pedantic: !1,
        renderer: null,
        sanitize: !1,
        sanitizer: null,
        silent: !1,
        smartLists: !1,
        smartypants: !1,
        tokenizer: null,
        walkTokens: null,
        xhtml: !1,
        };
    }
    let s = {
        baseUrl: null,
        breaks: !1,
        extensions: null,
        gfm: !0,
        headerIds: !0,
        headerPrefix: "",
        highlight: null,
        langPrefix: "language-",
        mangle: !0,
        pedantic: !1,
        renderer: null,
        sanitize: !1,
        sanitizer: null,
        silent: !1,
        smartLists: !1,
        smartypants: !1,
        tokenizer: null,
        walkTokens: null,
        xhtml: !1,
    };
    const r = /[&<>"']/,
        a = /[&<>"']/g,
        o = /[<>"']|&(?!#?\w+;)/,
        l = /[<>"']|&(?!#?\w+;)/g,
        c = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" },
        h = (e) => c[e];
    function d(e, t) {
        if (t) {
        if (r.test(e)) return e.replace(a, h);
        } else if (o.test(e)) return e.replace(l, h);
        return e;
    }
    const u = /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi;
    function p(e) {
        return e.replace(u, (e, t) =>
        "colon" === (t = t.toLowerCase())
            ? ":"
            : "#" === t.charAt(0)
            ? "x" === t.charAt(1)
            ? String.fromCharCode(parseInt(t.substring(2), 16))
            : String.fromCharCode(+t.substring(1))
            : ""
        );
    }
    const g = /(^|[^\[])\^/g;
    function m(e, t) {
        (e = "string" == typeof e ? e : e.source), (t = t || "");
        const i = {
        replace: (t, n) => (
            (n = (n = n.source || n).replace(g, "$1")), (e = e.replace(t, n)), i
        ),
        getRegex: () => new RegExp(e, t),
        };
        return i;
    }
    const f = /[^\w:]/g,
        k = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
    function y(e, t, i) {
        if (e) {
        let e;
        try {
            e = decodeURIComponent(p(i)).replace(f, "").toLowerCase();
        } catch (n) {
            return null;
        }
        if (
            0 === e.indexOf("javascript:") ||
            0 === e.indexOf("vbscript:") ||
            0 === e.indexOf("data:")
        )
            return null;
        }
        t &&
        !k.test(i) &&
        (i = (function (e, t) {
            b[" " + e] ||
            ($.test(e) ? (b[" " + e] = e + "/") : (b[" " + e] = L(e, "/", !0)));
            const i = -1 === (e = b[" " + e]).indexOf(":");
            return "//" === t.substring(0, 2)
            ? i
                ? t
                : e.replace(x, "$1") + t
            : "/" === t.charAt(0)
            ? i
                ? t
                : e.replace(_, "$1") + t
            : e + t;
        })(t, i));
        try {
        i = encodeURI(i).replace(/%25/g, "%");
        } catch (n) {
        return null;
        }
        return i;
    }
    const b = {},
        $ = /^[^:]+:\/*[^/]*$/,
        x = /^([^:]+:)[\s\S]*$/,
        _ = /^([^:]+:\/*[^/]*)[\s\S]*$/;
    const v = { exec: function () {} };
    function w(e) {
        let t,
        i,
        n = 1;
        for (; n < arguments.length; n++)
        for (i in ((t = arguments[n]), t))
            Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
        return e;
    }
    function S(e, t) {
        const i = e
        .replace(/\|/g, (e, t, i) => {
            let n = !1,
            s = t;
            for (; --s >= 0 && "\\" === i[s]; ) n = !n;
            return n ? "|" : " |";
        })
        .split(/ \|/);
        let n = 0;
        if (
        (i[0].trim() || i.shift(),
        i.length > 0 && !i[i.length - 1].trim() && i.pop(),
        i.length > t)
        )
        i.splice(t);
        else for (; i.length < t; ) i.push("");
        for (; n < i.length; n++) i[n] = i[n].trim().replace(/\\\|/g, "|");
        return i;
    }
    function L(e, t, i) {
        const n = e.length;
        if (0 === n) return "";
        let s = 0;
        for (; s < n; ) {
        const r = e.charAt(n - s - 1);
        if (r !== t || i) {
            if (r === t || !i) break;
            s++;
        } else s++;
        }
        return e.slice(0, n - s);
    }
    function T(e) {
        e &&
        e.sanitize &&
        !e.silent &&
        console.warn(
            "marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options"
        );
    }
    function E(e, t) {
        if (t < 1) return "";
        let i = "";
        for (; t > 1; ) 1 & t && (i += e), (t >>= 1), (e += e);
        return i + e;
    }
    function C(e, t, i, n) {
        const s = t.href,
        r = t.title ? d(t.title) : null,
        a = e[1].replace(/\\([\[\]])/g, "$1");
        if ("!" !== e[0].charAt(0)) {
        n.state.inLink = !0;
        const e = {
            type: "link",
            raw: i,
            href: s,
            title: r,
            text: a,
            tokens: n.inlineTokens(a, []),
        };
        return (n.state.inLink = !1), e;
        }
        return { type: "image", raw: i, href: s, title: r, text: d(a) };
    }
    class A {
        constructor(e) {
        this.options = e || s;
        }
        space(e) {
        const t = this.rules.block.newline.exec(e);
        if (t && t[0].length > 0) return { type: "space", raw: t[0] };
        }
        code(e) {
        const t = this.rules.block.code.exec(e);
        if (t) {
            const e = t[0].replace(/^ {1,4}/gm, "");
            return {
            type: "code",
            raw: t[0],
            codeBlockStyle: "indented",
            text: this.options.pedantic ? e : L(e, "\n"),
            };
        }
        }
        fences(e) {
        const t = this.rules.block.fences.exec(e);
        if (t) {
            const e = t[0],
            i = (function (e, t) {
                const i = e.match(/^(\s+)(?:```)/);
                if (null === i) return t;
                const n = i[1];
                return t
                .split("\n")
                .map((e) => {
                    const t = e.match(/^\s+/);
                    if (null === t) return e;
                    const [i] = t;
                    return i.length >= n.length ? e.slice(n.length) : e;
                })
                .join("\n");
            })(e, t[3] || "");
            return {
            type: "code",
            raw: e,
            lang: t[2] ? t[2].trim() : t[2],
            text: i,
            };
        }
        }
        heading(e) {
        const t = this.rules.block.heading.exec(e);
        if (t) {
            let e = t[2].trim();
            if (/#$/.test(e)) {
            const t = L(e, "#");
            this.options.pedantic
                ? (e = t.trim())
                : (t && !/ $/.test(t)) || (e = t.trim());
            }
            const i = {
            type: "heading",
            raw: t[0],
            depth: t[1].length,
            text: e,
            tokens: [],
            };
            return this.lexer.inline(i.text, i.tokens), i;
        }
        }
        hr(e) {
        const t = this.rules.block.hr.exec(e);
        if (t) return { type: "hr", raw: t[0] };
        }
        blockquote(e) {
        const t = this.rules.block.blockquote.exec(e);
        if (t) {
            const e = t[0].replace(/^ *>[ \t]?/gm, "");
            return {
            type: "blockquote",
            raw: t[0],
            tokens: this.lexer.blockTokens(e, []),
            text: e,
            };
        }
        }
        list(e) {
        let t = this.rules.block.list.exec(e);
        if (t) {
            let i,
            n,
            s,
            r,
            a,
            o,
            l,
            c,
            h,
            d,
            u,
            p,
            g = t[1].trim();
            const m = g.length > 1,
            f = {
                type: "list",
                raw: "",
                ordered: m,
                start: m ? +g.slice(0, -1) : "",
                loose: !1,
                items: [],
            };
            (g = m ? `\\d{1,9}\\${g.slice(-1)}` : `\\${g}`),
            this.options.pedantic && (g = m ? g : "[*+-]");
            const k = new RegExp(`^( {0,3}${g})((?:[\t ][^\\n]*)?(?:\\n|$))`);
            for (
            ;
            e && ((p = !1), (t = k.exec(e))) && !this.rules.block.hr.test(e);

            ) {
            if (
                ((i = t[0]),
                (e = e.substring(i.length)),
                (c = t[2].split("\n", 1)[0]),
                (h = e.split("\n", 1)[0]),
                this.options.pedantic
                ? ((r = 2), (u = c.trimLeft()))
                : ((r = t[2].search(/[^ ]/)),
                    (r = r > 4 ? 1 : r),
                    (u = c.slice(r)),
                    (r += t[1].length)),
                (o = !1),
                !c &&
                /^ *$/.test(h) &&
                ((i += h + "\n"), (e = e.substring(h.length + 1)), (p = !0)),
                !p)
            ) {
                const t = new RegExp(
                `^ {0,${Math.min(3, r - 1)}}(?:[*+-]|\\d{1,9}[.)])`
                );
                for (
                ;
                e &&
                ((d = e.split("\n", 1)[0]),
                (c = d),
                this.options.pedantic &&
                    (c = c.replace(/^ {1,4}(?=( {4})*[^ ])/g, "  ")),
                !t.test(c));

                ) {
                if (c.search(/[^ ]/) >= r || !c.trim()) u += "\n" + c.slice(r);
                else {
                    if (o) break;
                    u += "\n" + c;
                }
                o || c.trim() || (o = !0),
                    (i += d + "\n"),
                    (e = e.substring(d.length + 1));
                }
            }
            f.loose || (l ? (f.loose = !0) : /\n *\n *$/.test(i) && (l = !0)),
                this.options.gfm &&
                ((n = /^\[[ xX]\] /.exec(u)),
                n &&
                    ((s = "[ ] " !== n[0]), (u = u.replace(/^\[[ xX]\] +/, "")))),
                f.items.push({
                type: "list_item",
                raw: i,
                task: !!n,
                checked: s,
                loose: !1,
                text: u,
                }),
                (f.raw += i);
            }
            (f.items[f.items.length - 1].raw = i.trimRight()),
            (f.items[f.items.length - 1].text = u.trimRight()),
            (f.raw = f.raw.trimRight());
            const y = f.items.length;
            for (a = 0; a < y; a++) {
            (this.lexer.state.top = !1),
                (f.items[a].tokens = this.lexer.blockTokens(f.items[a].text, []));
            const e = f.items[a].tokens.filter((e) => "space" === e.type),
                t = e.every((e) => {
                const t = e.raw.split("");
                let i = 0;
                for (const n of t) if (("\n" === n && (i += 1), i > 1)) return !0;
                return !1;
                });
            !f.loose &&
                e.length &&
                t &&
                ((f.loose = !0), (f.items[a].loose = !0));
            }
            return f;
        }
        }
        html(e) {
        const t = this.rules.block.html.exec(e);
        if (t) {
            const e = {
            type: "html",
            raw: t[0],
            pre:
                !this.options.sanitizer &&
                ("pre" === t[1] || "script" === t[1] || "style" === t[1]),
            text: t[0],
            };
            return (
            this.options.sanitize &&
                ((e.type = "paragraph"),
                (e.text = this.options.sanitizer
                ? this.options.sanitizer(t[0])
                : d(t[0])),
                (e.tokens = []),
                this.lexer.inline(e.text, e.tokens)),
            e
            );
        }
        }
        def(e) {
        const t = this.rules.block.def.exec(e);
        if (t) {
            t[3] && (t[3] = t[3].substring(1, t[3].length - 1));
            return {
            type: "def",
            tag: t[1].toLowerCase().replace(/\s+/g, " "),
            raw: t[0],
            href: t[2],
            title: t[3],
            };
        }
        }
        table(e) {
        const t = this.rules.block.table.exec(e);
        if (t) {
            const e = {
            type: "table",
            header: S(t[1]).map((e) => ({ text: e })),
            align: t[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
            rows:
                t[3] && t[3].trim()
                ? t[3].replace(/\n[ \t]*$/, "").split("\n")
                : [],
            };
            if (e.header.length === e.align.length) {
            e.raw = t[0];
            let i,
                n,
                s,
                r,
                a = e.align.length;
            for (i = 0; i < a; i++)
                /^ *-+: *$/.test(e.align[i])
                ? (e.align[i] = "right")
                : /^ *:-+: *$/.test(e.align[i])
                ? (e.align[i] = "center")
                : /^ *:-+ *$/.test(e.align[i])
                ? (e.align[i] = "left")
                : (e.align[i] = null);
            for (a = e.rows.length, i = 0; i < a; i++)
                e.rows[i] = S(e.rows[i], e.header.length).map((e) => ({ text: e }));
            for (a = e.header.length, n = 0; n < a; n++)
                (e.header[n].tokens = []),
                this.lexer.inlineTokens(e.header[n].text, e.header[n].tokens);
            for (a = e.rows.length, n = 0; n < a; n++)
                for (r = e.rows[n], s = 0; s < r.length; s++)
                (r[s].tokens = []),
                    this.lexer.inlineTokens(r[s].text, r[s].tokens);
            return e;
            }
        }
        }
        lheading(e) {
        const t = this.rules.block.lheading.exec(e);
        if (t) {
            const e = {
            type: "heading",
            raw: t[0],
            depth: "=" === t[2].charAt(0) ? 1 : 2,
            text: t[1],
            tokens: [],
            };
            return this.lexer.inline(e.text, e.tokens), e;
        }
        }
        paragraph(e) {
        const t = this.rules.block.paragraph.exec(e);
        if (t) {
            const e = {
            type: "paragraph",
            raw: t[0],
            text:
                "\n" === t[1].charAt(t[1].length - 1) ? t[1].slice(0, -1) : t[1],
            tokens: [],
            };
            return this.lexer.inline(e.text, e.tokens), e;
        }
        }
        text(e) {
        const t = this.rules.block.text.exec(e);
        if (t) {
            const e = { type: "text", raw: t[0], text: t[0], tokens: [] };
            return this.lexer.inline(e.text, e.tokens), e;
        }
        }
        escape(e) {
        const t = this.rules.inline.escape.exec(e);
        if (t) return { type: "escape", raw: t[0], text: d(t[1]) };
        }
        tag(e) {
        const t = this.rules.inline.tag.exec(e);
        if (t)
            return (
            !this.lexer.state.inLink && /^<a /i.test(t[0])
                ? (this.lexer.state.inLink = !0)
                : this.lexer.state.inLink &&
                /^<\/a>/i.test(t[0]) &&
                (this.lexer.state.inLink = !1),
            !this.lexer.state.inRawBlock &&
            /^<(pre|code|kbd|script)(\s|>)/i.test(t[0])
                ? (this.lexer.state.inRawBlock = !0)
                : this.lexer.state.inRawBlock &&
                /^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0]) &&
                (this.lexer.state.inRawBlock = !1),
            {
                type: this.options.sanitize ? "text" : "html",
                raw: t[0],
                inLink: this.lexer.state.inLink,
                inRawBlock: this.lexer.state.inRawBlock,
                text: this.options.sanitize
                ? this.options.sanitizer
                    ? this.options.sanitizer(t[0])
                    : d(t[0])
                : t[0],
            }
            );
        }
        link(e) {
        const t = this.rules.inline.link.exec(e);
        if (t) {
            const e = t[2].trim();
            if (!this.options.pedantic && /^</.test(e)) {
            if (!/>$/.test(e)) return;
            const t = L(e.slice(0, -1), "\\");
            if ((e.length - t.length) % 2 == 0) return;
            } else {
            const e = (function (e, t) {
                if (-1 === e.indexOf(t[1])) return -1;
                const i = e.length;
                let n = 0,
                s = 0;
                for (; s < i; s++)
                if ("\\" === e[s]) s++;
                else if (e[s] === t[0]) n++;
                else if (e[s] === t[1] && (n--, n < 0)) return s;
                return -1;
            })(t[2], "()");
            if (e > -1) {
                const i = (0 === t[0].indexOf("!") ? 5 : 4) + t[1].length + e;
                (t[2] = t[2].substring(0, e)),
                (t[0] = t[0].substring(0, i).trim()),
                (t[3] = "");
            }
            }
            let i = t[2],
            n = "";
            if (this.options.pedantic) {
            const e = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(i);
            e && ((i = e[1]), (n = e[3]));
            } else n = t[3] ? t[3].slice(1, -1) : "";
            return (
            (i = i.trim()),
            /^</.test(i) &&
                (i =
                this.options.pedantic && !/>$/.test(e)
                    ? i.slice(1)
                    : i.slice(1, -1)),
            C(
                t,
                {
                href: i ? i.replace(this.rules.inline._escapes, "$1") : i,
                title: n ? n.replace(this.rules.inline._escapes, "$1") : n,
                },
                t[0],
                this.lexer
            )
            );
        }
        }
        reflink(e, t) {
        let i;
        if (
            (i = this.rules.inline.reflink.exec(e)) ||
            (i = this.rules.inline.nolink.exec(e))
        ) {
            let e = (i[2] || i[1]).replace(/\s+/g, " ");
            if (((e = t[e.toLowerCase()]), !e || !e.href)) {
            const e = i[0].charAt(0);
            return { type: "text", raw: e, text: e };
            }
            return C(i, e, i[0], this.lexer);
        }
        }
        emStrong(e, t, i = "") {
        let n = this.rules.inline.emStrong.lDelim.exec(e);
        if (!n) return;
        if (n[3] && i.match(/[\p{L}\p{N}]/u)) return;
        const s = n[1] || n[2] || "";
        if (!s || (s && ("" === i || this.rules.inline.punctuation.exec(i)))) {
            const i = n[0].length - 1;
            let s,
            r,
            a = i,
            o = 0;
            const l =
            "*" === n[0][0]
                ? this.rules.inline.emStrong.rDelimAst
                : this.rules.inline.emStrong.rDelimUnd;
            for (
            l.lastIndex = 0, t = t.slice(-1 * e.length + i);
            null != (n = l.exec(t));

            ) {
            if (((s = n[1] || n[2] || n[3] || n[4] || n[5] || n[6]), !s))
                continue;
            if (((r = s.length), n[3] || n[4])) {
                a += r;
                continue;
            }
            if ((n[5] || n[6]) && i % 3 && !((i + r) % 3)) {
                o += r;
                continue;
            }
            if (((a -= r), a > 0)) continue;
            if (((r = Math.min(r, r + a + o)), Math.min(i, r) % 2)) {
                const t = e.slice(1, i + n.index + r);
                return {
                type: "em",
                raw: e.slice(0, i + n.index + r + 1),
                text: t,
                tokens: this.lexer.inlineTokens(t, []),
                };
            }
            const t = e.slice(2, i + n.index + r - 1);
            return {
                type: "strong",
                raw: e.slice(0, i + n.index + r + 1),
                text: t,
                tokens: this.lexer.inlineTokens(t, []),
            };
            }
        }
        }
        codespan(e) {
        const t = this.rules.inline.code.exec(e);
        if (t) {
            let e = t[2].replace(/\n/g, " ");
            const i = /[^ ]/.test(e),
            n = /^ /.test(e) && / $/.test(e);
            return (
            i && n && (e = e.substring(1, e.length - 1)),
            (e = d(e, !0)),
            { type: "codespan", raw: t[0], text: e }
            );
        }
        }
        br(e) {
        const t = this.rules.inline.br.exec(e);
        if (t) return { type: "br", raw: t[0] };
        }
        del(e) {
        const t = this.rules.inline.del.exec(e);
        if (t)
            return {
            type: "del",
            raw: t[0],
            text: t[2],
            tokens: this.lexer.inlineTokens(t[2], []),
            };
        }
        autolink(e, t) {
        const i = this.rules.inline.autolink.exec(e);
        if (i) {
            let e, n;
            return (
            "@" === i[2]
                ? ((e = d(this.options.mangle ? t(i[1]) : i[1])),
                (n = "mailto:" + e))
                : ((e = d(i[1])), (n = e)),
            {
                type: "link",
                raw: i[0],
                text: e,
                href: n,
                tokens: [{ type: "text", raw: e, text: e }],
            }
            );
        }
        }
        url(e, t) {
        let i;
        if ((i = this.rules.inline.url.exec(e))) {
            let e, n;
            if ("@" === i[2])
            (e = d(this.options.mangle ? t(i[0]) : i[0])), (n = "mailto:" + e);
            else {
            let t;
            do {
                (t = i[0]), (i[0] = this.rules.inline._backpedal.exec(i[0])[0]);
            } while (t !== i[0]);
            (e = d(i[0])), (n = "www." === i[1] ? "http://" + e : e);
            }
            return {
            type: "link",
            raw: i[0],
            text: e,
            href: n,
            tokens: [{ type: "text", raw: e, text: e }],
            };
        }
        }
        inlineText(e, t) {
        const i = this.rules.inline.text.exec(e);
        if (i) {
            let e;
            return (
            (e = this.lexer.state.inRawBlock
                ? this.options.sanitize
                ? this.options.sanitizer
                    ? this.options.sanitizer(i[0])
                    : d(i[0])
                : i[0]
                : d(this.options.smartypants ? t(i[0]) : i[0])),
            { type: "text", raw: i[0], text: e }
            );
        }
        }
    }
    const F = {
        newline: /^(?: *(?:\n|$))+/,
        code: /^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,
        fences:
        /^ {0,3}(`{3,}(?=[^`\n]*\n)|~{3,})([^\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?=\n|$)|$)/,
        hr: /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,
        heading: /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,
        blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
        list: /^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,
        html: "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",
        def: /^ {0,3}\[(label)\]: *(?:\n *)?<?([^\s>]+)>?(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,
        table: v,
        lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
        _paragraph:
        /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,
        text: /^[^\n]+/,
        _label: /(?!\s*\])(?:\\.|[^\[\]\\])+/,
        _title: /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/,
    };
    (F.def = m(F.def)
        .replace("label", F._label)
        .replace("title", F._title)
        .getRegex()),
        (F.bullet = /(?:[*+-]|\d{1,9}[.)])/),
        (F.listItemStart = m(/^( *)(bull) */)
        .replace("bull", F.bullet)
        .getRegex()),
        (F.list = m(F.list)
        .replace(/bull/g, F.bullet)
        .replace(
            "hr",
            "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))"
        )
        .replace("def", "\\n+(?=" + F.def.source + ")")
        .getRegex()),
        (F._tag =
        "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul"),
        (F._comment = /<!--(?!-?>)[\s\S]*?(?:-->|$)/),
        (F.html = m(F.html, "i")
        .replace("comment", F._comment)
        .replace("tag", F._tag)
        .replace(
            "attribute",
            / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/
        )
        .getRegex()),
        (F.paragraph = m(F._paragraph)
        .replace("hr", F.hr)
        .replace("heading", " {0,3}#{1,6} ")
        .replace("|lheading", "")
        .replace("|table", "")
        .replace("blockquote", " {0,3}>")
        .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
        .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
        .replace(
            "html",
            "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
        )
        .replace("tag", F._tag)
        .getRegex()),
        (F.blockquote = m(F.blockquote)
        .replace("paragraph", F.paragraph)
        .getRegex()),
        (F.normal = w({}, F)),
        (F.gfm = w({}, F.normal, {
        table:
            "^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)",
        })),
        (F.gfm.table = m(F.gfm.table)
        .replace("hr", F.hr)
        .replace("heading", " {0,3}#{1,6} ")
        .replace("blockquote", " {0,3}>")
        .replace("code", " {4}[^\\n]")
        .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
        .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
        .replace(
            "html",
            "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
        )
        .replace("tag", F._tag)
        .getRegex()),
        (F.gfm.paragraph = m(F._paragraph)
        .replace("hr", F.hr)
        .replace("heading", " {0,3}#{1,6} ")
        .replace("|lheading", "")
        .replace("table", F.gfm.table)
        .replace("blockquote", " {0,3}>")
        .replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n")
        .replace("list", " {0,3}(?:[*+-]|1[.)]) ")
        .replace(
            "html",
            "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)"
        )
        .replace("tag", F._tag)
        .getRegex()),
        (F.pedantic = w({}, F.normal, {
        html: m(
            "^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))"
        )
            .replace("comment", F._comment)
            .replace(
            /tag/g,
            "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b"
            )
            .getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^(#{1,6})(.*)(?:\n+|$)/,
        fences: v,
        paragraph: m(F.normal._paragraph)
            .replace("hr", F.hr)
            .replace("heading", " *#{1,6} *[^\n]")
            .replace("lheading", F.lheading)
            .replace("blockquote", " {0,3}>")
            .replace("|fences", "")
            .replace("|list", "")
            .replace("|html", "")
            .getRegex(),
        }));
    const R = {
        escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
        url: v,
        tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
        link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
        reflink: /^!?\[(label)\]\[(ref)\]/,
        nolink: /^!?\[(ref)\](?:\[\])?/,
        reflinkSearch: "reflink|nolink(?!\\()",
        emStrong: {
        lDelim: /^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,
        rDelimAst:
            /^[^_*]*?\_\_[^_*]*?\*[^_*]*?(?=\_\_)|[^*]+(?=[^*])|[punct_](\*+)(?=[\s]|$)|[^punct*_\s](\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|[^punct*_\s](\*+)(?=[^punct*_\s])/,
        rDelimUnd:
            /^[^_*]*?\*\*[^_*]*?\_[^_*]*?(?=\*\*)|[^_]+(?=[^_])|[punct*](\_+)(?=[\s]|$)|[^punct*_\s](\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/,
        },
        code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
        br: /^( {2,}|\\)\n(?!\s*$)/,
        del: v,
        text: /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,
        punctuation: /^([\spunctuation])/,
    };
    function B(e) {
        return e
        .replace(/---/g, "—")
        .replace(/--/g, "–")
        .replace(/(^|[-\u2014/(\[{"\s])'/g, "$1‘")
        .replace(/'/g, "’")
        .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1“")
        .replace(/"/g, "”")
        .replace(/\.{3}/g, "…");
    }
    function O(e) {
        let t,
        i,
        n = "";
        const s = e.length;
        for (t = 0; t < s; t++)
        (i = e.charCodeAt(t)),
            Math.random() > 0.5 && (i = "x" + i.toString(16)),
            (n += "&#" + i + ";");
        return n;
    }
    (R._punctuation = "!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~"),
        (R.punctuation = m(R.punctuation)
        .replace(/punctuation/g, R._punctuation)
        .getRegex()),
        (R.blockSkip = /\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g),
        (R.escapedEmSt = /\\\*|\\_/g),
        (R._comment = m(F._comment).replace("(?:--\x3e|$)", "--\x3e").getRegex()),
        (R.emStrong.lDelim = m(R.emStrong.lDelim)
        .replace(/punct/g, R._punctuation)
        .getRegex()),
        (R.emStrong.rDelimAst = m(R.emStrong.rDelimAst, "g")
        .replace(/punct/g, R._punctuation)
        .getRegex()),
        (R.emStrong.rDelimUnd = m(R.emStrong.rDelimUnd, "g")
        .replace(/punct/g, R._punctuation)
        .getRegex()),
        (R._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g),
        (R._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/),
        (R._email =
        /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/),
        (R.autolink = m(R.autolink)
        .replace("scheme", R._scheme)
        .replace("email", R._email)
        .getRegex()),
        (R._attribute =
        /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/),
        (R.tag = m(R.tag)
        .replace("comment", R._comment)
        .replace("attribute", R._attribute)
        .getRegex()),
        (R._label = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/),
        (R._href = /<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/),
        (R._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/),
        (R.link = m(R.link)
        .replace("label", R._label)
        .replace("href", R._href)
        .replace("title", R._title)
        .getRegex()),
        (R.reflink = m(R.reflink)
        .replace("label", R._label)
        .replace("ref", F._label)
        .getRegex()),
        (R.nolink = m(R.nolink).replace("ref", F._label).getRegex()),
        (R.reflinkSearch = m(R.reflinkSearch, "g")
        .replace("reflink", R.reflink)
        .replace("nolink", R.nolink)
        .getRegex()),
        (R.normal = w({}, R)),
        (R.pedantic = w({}, R.normal, {
        strong: {
            start: /^__|\*\*/,
            middle:
            /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
            endAst: /\*\*(?!\*)/g,
            endUnd: /__(?!_)/g,
        },
        em: {
            start: /^_|\*/,
            middle: /^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,
            endAst: /\*(?!\*)/g,
            endUnd: /_(?!_)/g,
        },
        link: m(/^!?\[(label)\]\((.*?)\)/)
            .replace("label", R._label)
            .getRegex(),
        reflink: m(/^!?\[(label)\]\s*\[([^\]]*)\]/)
            .replace("label", R._label)
            .getRegex(),
        })),
        (R.gfm = w({}, R.normal, {
        escape: m(R.escape).replace("])", "~|])").getRegex(),
        _extended_email:
            /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
        url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
        _backpedal:
            /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
        del: /^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,
        text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/,
        })),
        (R.gfm.url = m(R.gfm.url, "i")
        .replace("email", R.gfm._extended_email)
        .getRegex()),
        (R.breaks = w({}, R.gfm, {
        br: m(R.br).replace("{2,}", "*").getRegex(),
        text: m(R.gfm.text)
            .replace("\\b_", "\\b_| {2,}\\n")
            .replace(/\{2,\}/g, "*")
            .getRegex(),
        }));
    class M {
        constructor(e) {
        (this.tokens = []),
            (this.tokens.links = Object.create(null)),
            (this.options = e || s),
            (this.options.tokenizer = this.options.tokenizer || new A()),
            (this.tokenizer = this.options.tokenizer),
            (this.tokenizer.options = this.options),
            (this.tokenizer.lexer = this),
            (this.inlineQueue = []),
            (this.state = { inLink: !1, inRawBlock: !1, top: !0 });
        const t = { block: F.normal, inline: R.normal };
        this.options.pedantic
            ? ((t.block = F.pedantic), (t.inline = R.pedantic))
            : this.options.gfm &&
            ((t.block = F.gfm),
            this.options.breaks ? (t.inline = R.breaks) : (t.inline = R.gfm)),
            (this.tokenizer.rules = t);
        }
        static get rules() {
        return { block: F, inline: R };
        }
        static lex(e, t) {
        return new M(t).lex(e);
        }
        static lexInline(e, t) {
        return new M(t).inlineTokens(e);
        }
        lex(e) {
        let t;
        for (
            e = e.replace(/\r\n|\r/g, "\n"), this.blockTokens(e, this.tokens);
            (t = this.inlineQueue.shift());

        )
            this.inlineTokens(t.src, t.tokens);
        return this.tokens;
        }
        blockTokens(e, t = []) {
        let i, n, s, r;
        for (
            e = this.options.pedantic
            ? e.replace(/\t/g, "    ").replace(/^ +$/gm, "")
            : e.replace(/^( *)(\t+)/gm, (e, t, i) => t + "    ".repeat(i.length));
            e;

        )
            if (
            !(
                this.options.extensions &&
                this.options.extensions.block &&
                this.options.extensions.block.some(
                (n) =>
                    !!(i = n.call({ lexer: this }, e, t)) &&
                    ((e = e.substring(i.raw.length)), t.push(i), !0)
                )
            )
            )
            if ((i = this.tokenizer.space(e)))
                (e = e.substring(i.raw.length)),
                1 === i.raw.length && t.length > 0
                    ? (t[t.length - 1].raw += "\n")
                    : t.push(i);
            else if ((i = this.tokenizer.code(e)))
                (e = e.substring(i.raw.length)),
                (n = t[t.length - 1]),
                !n || ("paragraph" !== n.type && "text" !== n.type)
                    ? t.push(i)
                    : ((n.raw += "\n" + i.raw),
                    (n.text += "\n" + i.text),
                    (this.inlineQueue[this.inlineQueue.length - 1].src = n.text));
            else if ((i = this.tokenizer.fences(e)))
                (e = e.substring(i.raw.length)), t.push(i);
            else if ((i = this.tokenizer.heading(e)))
                (e = e.substring(i.raw.length)), t.push(i);
            else if ((i = this.tokenizer.hr(e)))
                (e = e.substring(i.raw.length)), t.push(i);
            else if ((i = this.tokenizer.blockquote(e)))
                (e = e.substring(i.raw.length)), t.push(i);
            else if ((i = this.tokenizer.list(e)))
                (e = e.substring(i.raw.length)), t.push(i);
            else if ((i = this.tokenizer.html(e)))
                (e = e.substring(i.raw.length)), t.push(i);
            else if ((i = this.tokenizer.def(e)))
                (e = e.substring(i.raw.length)),
                (n = t[t.length - 1]),
                !n || ("paragraph" !== n.type && "text" !== n.type)
                    ? this.tokens.links[i.tag] ||
                    (this.tokens.links[i.tag] = { href: i.href, title: i.title })
                    : ((n.raw += "\n" + i.raw),
                    (n.text += "\n" + i.raw),
                    (this.inlineQueue[this.inlineQueue.length - 1].src = n.text));
            else if ((i = this.tokenizer.table(e)))
                (e = e.substring(i.raw.length)), t.push(i);
            else if ((i = this.tokenizer.lheading(e)))
                (e = e.substring(i.raw.length)), t.push(i);
            else {
                if (
                ((s = e),
                this.options.extensions && this.options.extensions.startBlock)
                ) {
                let t = 1 / 0;
                const i = e.slice(1);
                let n;
                this.options.extensions.startBlock.forEach(function (e) {
                    (n = e.call({ lexer: this }, i)),
                    "number" == typeof n && n >= 0 && (t = Math.min(t, n));
                }),
                    t < 1 / 0 && t >= 0 && (s = e.substring(0, t + 1));
                }
                if (this.state.top && (i = this.tokenizer.paragraph(s)))
                (n = t[t.length - 1]),
                    r && "paragraph" === n.type
                    ? ((n.raw += "\n" + i.raw),
                        (n.text += "\n" + i.text),
                        this.inlineQueue.pop(),
                        (this.inlineQueue[this.inlineQueue.length - 1].src =
                        n.text))
                    : t.push(i),
                    (r = s.length !== e.length),
                    (e = e.substring(i.raw.length));
                else if ((i = this.tokenizer.text(e)))
                (e = e.substring(i.raw.length)),
                    (n = t[t.length - 1]),
                    n && "text" === n.type
                    ? ((n.raw += "\n" + i.raw),
                        (n.text += "\n" + i.text),
                        this.inlineQueue.pop(),
                        (this.inlineQueue[this.inlineQueue.length - 1].src =
                        n.text))
                    : t.push(i);
                else if (e) {
                const t = "Infinite loop on byte: " + e.charCodeAt(0);
                if (this.options.silent) {
                    console.error(t);
                    break;
                }
                throw new Error(t);
                }
            }
        return (this.state.top = !0), t;
        }
        inline(e, t) {
        this.inlineQueue.push({ src: e, tokens: t });
        }
        inlineTokens(e, t = []) {
        let i,
            n,
            s,
            r,
            a,
            o,
            l = e;
        if (this.tokens.links) {
            const e = Object.keys(this.tokens.links);
            if (e.length > 0)
            for (
                ;
                null != (r = this.tokenizer.rules.inline.reflinkSearch.exec(l));

            )
                e.includes(r[0].slice(r[0].lastIndexOf("[") + 1, -1)) &&
                (l =
                    l.slice(0, r.index) +
                    "[" +
                    E("a", r[0].length - 2) +
                    "]" +
                    l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));
        }
        for (; null != (r = this.tokenizer.rules.inline.blockSkip.exec(l)); )
            l =
            l.slice(0, r.index) +
            "[" +
            E("a", r[0].length - 2) +
            "]" +
            l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
        for (; null != (r = this.tokenizer.rules.inline.escapedEmSt.exec(l)); )
            l =
            l.slice(0, r.index) +
            "++" +
            l.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex);
        for (; e; )
            if (
            (a || (o = ""),
            (a = !1),
            !(
                this.options.extensions &&
                this.options.extensions.inline &&
                this.options.extensions.inline.some(
                (n) =>
                    !!(i = n.call({ lexer: this }, e, t)) &&
                    ((e = e.substring(i.raw.length)), t.push(i), !0)
                )
            ))
            )
            if ((i = this.tokenizer.escape(e)))
                (e = e.substring(i.raw.length)), t.push(i);
            else if ((i = this.tokenizer.tag(e)))
                (e = e.substring(i.raw.length)),
                (n = t[t.length - 1]),
                n && "text" === i.type && "text" === n.type
                    ? ((n.raw += i.raw), (n.text += i.text))
                    : t.push(i);
            else if ((i = this.tokenizer.link(e)))
                (e = e.substring(i.raw.length)), t.push(i);
            else if ((i = this.tokenizer.reflink(e, this.tokens.links)))
                (e = e.substring(i.raw.length)),
                (n = t[t.length - 1]),
                n && "text" === i.type && "text" === n.type
                    ? ((n.raw += i.raw), (n.text += i.text))
                    : t.push(i);
            else if ((i = this.tokenizer.emStrong(e, l, o)))
                (e = e.substring(i.raw.length)), t.push(i);
            else if ((i = this.tokenizer.codespan(e)))
                (e = e.substring(i.raw.length)), t.push(i);
            else if ((i = this.tokenizer.br(e)))
                (e = e.substring(i.raw.length)), t.push(i);
            else if ((i = this.tokenizer.del(e)))
                (e = e.substring(i.raw.length)), t.push(i);
            else if ((i = this.tokenizer.autolink(e, O)))
                (e = e.substring(i.raw.length)), t.push(i);
            else if (this.state.inLink || !(i = this.tokenizer.url(e, O))) {
                if (
                ((s = e),
                this.options.extensions && this.options.extensions.startInline)
                ) {
                let t = 1 / 0;
                const i = e.slice(1);
                let n;
                this.options.extensions.startInline.forEach(function (e) {
                    (n = e.call({ lexer: this }, i)),
                    "number" == typeof n && n >= 0 && (t = Math.min(t, n));
                }),
                    t < 1 / 0 && t >= 0 && (s = e.substring(0, t + 1));
                }
                if ((i = this.tokenizer.inlineText(s, B)))
                (e = e.substring(i.raw.length)),
                    "_" !== i.raw.slice(-1) && (o = i.raw.slice(-1)),
                    (a = !0),
                    (n = t[t.length - 1]),
                    n && "text" === n.type
                    ? ((n.raw += i.raw), (n.text += i.text))
                    : t.push(i);
                else if (e) {
                const t = "Infinite loop on byte: " + e.charCodeAt(0);
                if (this.options.silent) {
                    console.error(t);
                    break;
                }
                throw new Error(t);
                }
            } else (e = e.substring(i.raw.length)), t.push(i);
        return t;
        }
    }
    class I {
        constructor(e) {
        this.options = e || s;
        }
        code(e, t, i) {
        const n = (t || "").match(/\S*/)[0];
        if (this.options.highlight) {
            const t = this.options.highlight(e, n);
            null != t && t !== e && ((i = !0), (e = t));
        }
        return (
            (e = e.replace(/\n$/, "") + "\n"),
            n
            ? '<pre><code class="' +
                this.options.langPrefix +
                d(n, !0) +
                '">' +
                (i ? e : d(e, !0)) +
                "</code></pre>\n"
            : "<pre><code>" + (i ? e : d(e, !0)) + "</code></pre>\n"
        );
        }
        blockquote(e) {
        return `<blockquote>\n${e}</blockquote>\n`;
        }
        html(e) {
        return e;
        }
        heading(e, t, i, n) {
        if (this.options.headerIds) {
            return `<h${t} id="${
            this.options.headerPrefix + n.slug(i)
            }">${e}</h${t}>\n`;
        }
        return `<h${t}>${e}</h${t}>\n`;
        }
        hr() {
        return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
        }
        list(e, t, i) {
        const n = t ? "ol" : "ul";
        return (
            "<" +
            n +
            (t && 1 !== i ? ' start="' + i + '"' : "") +
            ">\n" +
            e +
            "</" +
            n +
            ">\n"
        );
        }
        listitem(e) {
        return `<li>${e}</li>\n`;
        }
        checkbox(e) {
        return (
            "<input " +
            (e ? 'checked="" ' : "") +
            'disabled="" type="checkbox"' +
            (this.options.xhtml ? " /" : "") +
            "> "
        );
        }
        paragraph(e) {
        return `<p>${e}</p>\n`;
        }
        table(e, t) {
        return (
            t && (t = `<tbody>${t}</tbody>`),
            "<table>\n<thead>\n" + e + "</thead>\n" + t + "</table>\n"
        );
        }
        tablerow(e) {
        return `<tr>\n${e}</tr>\n`;
        }
        tablecell(e, t) {
        const i = t.header ? "th" : "td";
        return (
            (t.align ? `<${i} align="${t.align}">` : `<${i}>`) + e + `</${i}>\n`
        );
        }
        strong(e) {
        return `<strong>${e}</strong>`;
        }
        em(e) {
        return `<em>${e}</em>`;
        }
        codespan(e) {
        return `<code>${e}</code>`;
        }
        br() {
        return this.options.xhtml ? "<br/>" : "<br>";
        }
        del(e) {
        return `<del>${e}</del>`;
        }
        link(e, t, i) {
        if (null === (e = y(this.options.sanitize, this.options.baseUrl, e)))
            return i;
        let n = '<a href="' + d(e) + '"';
        return t && (n += ' title="' + t + '"'), (n += ">" + i + "</a>"), n;
        }
        image(e, t, i) {
        if (null === (e = y(this.options.sanitize, this.options.baseUrl, e)))
            return i;
        let n = `<img src="${e}" alt="${i}"`;
        return (
            t && (n += ` title="${t}"`), (n += this.options.xhtml ? "/>" : ">"), n
        );
        }
        text(e) {
        return e;
        }
    }
    class U {
        strong(e) {
        return e;
        }
        em(e) {
        return e;
        }
        codespan(e) {
        return e;
        }
        del(e) {
        return e;
        }
        html(e) {
        return e;
        }
        text(e) {
        return e;
        }
        link(e, t, i) {
        return "" + i;
        }
        image(e, t, i) {
        return "" + i;
        }
        br() {
        return "";
        }
    }
    class P {
        constructor() {
        this.seen = {};
        }
        serialize(e) {
        return e
            .toLowerCase()
            .trim()
            .replace(/<[!\/a-z].*?>/gi, "")
            .replace(
            /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,
            ""
            )
            .replace(/\s/g, "-");
        }
        getNextSafeSlug(e, t) {
        let i = e,
            n = 0;
        if (this.seen.hasOwnProperty(i)) {
            n = this.seen[e];
            do {
            n++, (i = e + "-" + n);
            } while (this.seen.hasOwnProperty(i));
        }
        return t || ((this.seen[e] = n), (this.seen[i] = 0)), i;
        }
        slug(e, t = {}) {
        const i = this.serialize(e);
        return this.getNextSafeSlug(i, t.dryrun);
        }
    }
    class q {
        constructor(e) {
        (this.options = e || s),
            (this.options.renderer = this.options.renderer || new I()),
            (this.renderer = this.options.renderer),
            (this.renderer.options = this.options),
            (this.textRenderer = new U()),
            (this.slugger = new P());
        }
        static parse(e, t) {
        return new q(t).parse(e);
        }
        static parseInline(e, t) {
        return new q(t).parseInline(e);
        }
        parse(e, t = !0) {
        let i,
            n,
            s,
            r,
            a,
            o,
            l,
            c,
            h,
            d,
            u,
            g,
            m,
            f,
            k,
            y,
            b,
            $,
            x,
            _ = "";
        const v = e.length;
        for (i = 0; i < v; i++)
            if (
            ((d = e[i]),
            this.options.extensions &&
                this.options.extensions.renderers &&
                this.options.extensions.renderers[d.type] &&
                ((x = this.options.extensions.renderers[d.type].call(
                { parser: this },
                d
                )),
                !1 !== x ||
                ![
                    "space",
                    "hr",
                    "heading",
                    "code",
                    "table",
                    "blockquote",
                    "list",
                    "html",
                    "paragraph",
                    "text",
                ].includes(d.type)))
            )
            _ += x || "";
            else
            switch (d.type) {
                case "space":
                continue;
                case "hr":
                _ += this.renderer.hr();
                continue;
                case "heading":
                _ += this.renderer.heading(
                    this.parseInline(d.tokens),
                    d.depth,
                    p(this.parseInline(d.tokens, this.textRenderer)),
                    this.slugger
                );
                continue;
                case "code":
                _ += this.renderer.code(d.text, d.lang, d.escaped);
                continue;
                case "table":
                for (c = "", l = "", r = d.header.length, n = 0; n < r; n++)
                    l += this.renderer.tablecell(
                    this.parseInline(d.header[n].tokens),
                    { header: !0, align: d.align[n] }
                    );
                for (
                    c += this.renderer.tablerow(l),
                    h = "",
                    r = d.rows.length,
                    n = 0;
                    n < r;
                    n++
                ) {
                    for (o = d.rows[n], l = "", a = o.length, s = 0; s < a; s++)
                    l += this.renderer.tablecell(this.parseInline(o[s].tokens), {
                        header: !1,
                        align: d.align[s],
                    });
                    h += this.renderer.tablerow(l);
                }
                _ += this.renderer.table(c, h);
                continue;
                case "blockquote":
                (h = this.parse(d.tokens)), (_ += this.renderer.blockquote(h));
                continue;
                case "list":
                for (
                    u = d.ordered,
                    g = d.start,
                    m = d.loose,
                    r = d.items.length,
                    h = "",
                    n = 0;
                    n < r;
                    n++
                )
                    (k = d.items[n]),
                    (y = k.checked),
                    (b = k.task),
                    (f = ""),
                    k.task &&
                        (($ = this.renderer.checkbox(y)),
                        m
                        ? k.tokens.length > 0 && "paragraph" === k.tokens[0].type
                            ? ((k.tokens[0].text = $ + " " + k.tokens[0].text),
                            k.tokens[0].tokens &&
                                k.tokens[0].tokens.length > 0 &&
                                "text" === k.tokens[0].tokens[0].type &&
                                (k.tokens[0].tokens[0].text =
                                $ + " " + k.tokens[0].tokens[0].text))
                            : k.tokens.unshift({ type: "text", text: $ })
                        : (f += $)),
                    (f += this.parse(k.tokens, m)),
                    (h += this.renderer.listitem(f, b, y));
                _ += this.renderer.list(h, u, g);
                continue;
                case "html":
                _ += this.renderer.html(d.text);
                continue;
                case "paragraph":
                _ += this.renderer.paragraph(this.parseInline(d.tokens));
                continue;
                case "text":
                for (
                    h = d.tokens ? this.parseInline(d.tokens) : d.text;
                    i + 1 < v && "text" === e[i + 1].type;

                )
                    (d = e[++i]),
                    (h +=
                        "\n" + (d.tokens ? this.parseInline(d.tokens) : d.text));
                _ += t ? this.renderer.paragraph(h) : h;
                continue;
                default: {
                const e = 'Token with "' + d.type + '" type was not found.';
                if (this.options.silent) return void console.error(e);
                throw new Error(e);
                }
            }
        return _;
        }
        parseInline(e, t) {
        t = t || this.renderer;
        let i,
            n,
            s,
            r = "";
        const a = e.length;
        for (i = 0; i < a; i++)
            if (
            ((n = e[i]),
            this.options.extensions &&
                this.options.extensions.renderers &&
                this.options.extensions.renderers[n.type] &&
                ((s = this.options.extensions.renderers[n.type].call(
                { parser: this },
                n
                )),
                !1 !== s ||
                ![
                    "escape",
                    "html",
                    "link",
                    "image",
                    "strong",
                    "em",
                    "codespan",
                    "br",
                    "del",
                    "text",
                ].includes(n.type)))
            )
            r += s || "";
            else
            switch (n.type) {
                case "escape":
                case "text":
                r += t.text(n.text);
                break;
                case "html":
                r += t.html(n.text);
                break;
                case "link":
                r += t.link(n.href, n.title, this.parseInline(n.tokens, t));
                break;
                case "image":
                r += t.image(n.href, n.title, n.text);
                break;
                case "strong":
                r += t.strong(this.parseInline(n.tokens, t));
                break;
                case "em":
                r += t.em(this.parseInline(n.tokens, t));
                break;
                case "codespan":
                r += t.codespan(n.text);
                break;
                case "br":
                r += t.br();
                break;
                case "del":
                r += t.del(this.parseInline(n.tokens, t));
                break;
                default: {
                const e = 'Token with "' + n.type + '" type was not found.';
                if (this.options.silent) return void console.error(e);
                throw new Error(e);
                }
            }
        return r;
        }
    }
    function D(e, t, i) {
        if (null == e)
        throw new Error("marked(): input parameter is undefined or null");
        if ("string" != typeof e)
        throw new Error(
            "marked(): input parameter is of type " +
            Object.prototype.toString.call(e) +
            ", string expected"
        );
        if (
        ("function" == typeof t && ((i = t), (t = null)),
        T((t = w({}, D.defaults, t || {}))),
        i)
        ) {
        const s = t.highlight;
        let r;
        try {
            r = M.lex(e, t);
        } catch (n) {
            return i(n);
        }
        const a = function (e) {
            let a;
            if (!e)
            try {
                t.walkTokens && D.walkTokens(r, t.walkTokens), (a = q.parse(r, t));
            } catch (n) {
                e = n;
            }
            return (t.highlight = s), e ? i(e) : i(null, a);
        };
        if (!s || s.length < 3) return a();
        if ((delete t.highlight, !r.length)) return a();
        let o = 0;
        return (
            D.walkTokens(r, function (e) {
            "code" === e.type &&
                (o++,
                setTimeout(() => {
                s(e.text, e.lang, function (t, i) {
                    if (t) return a(t);
                    null != i && i !== e.text && ((e.text = i), (e.escaped = !0)),
                    o--,
                    0 === o && a();
                });
                }, 0));
            }),
            void (0 === o && a())
        );
        }
        try {
        const i = M.lex(e, t);
        return t.walkTokens && D.walkTokens(i, t.walkTokens), q.parse(i, t);
        } catch (n) {
        if (
            ((n.message +=
            "\nPlease report this to https://github.com/markedjs/marked."),
            t.silent)
        )
            return (
            "<p>An error occurred:</p><pre>" + d(n.message + "", !0) + "</pre>"
            );
        throw n;
        }
    }
    (D.options = D.setOptions =
        function (e) {
        var t;
        return w(D.defaults, e), (t = D.defaults), (s = t), D;
        }),
        (D.getDefaults = n),
        (D.defaults = s),
        (D.use = function (...e) {
        const t = w({}, ...e),
            i = D.defaults.extensions || { renderers: {}, childTokens: {} };
        let n;
        e.forEach((e) => {
            if (
            (e.extensions &&
                ((n = !0),
                e.extensions.forEach((e) => {
                if (!e.name) throw new Error("extension name required");
                if (e.renderer) {
                    const t = i.renderers ? i.renderers[e.name] : null;
                    i.renderers[e.name] = t
                    ? function (...i) {
                        let n = e.renderer.apply(this, i);
                        return !1 === n && (n = t.apply(this, i)), n;
                        }
                    : e.renderer;
                }
                if (e.tokenizer) {
                    if (!e.level || ("block" !== e.level && "inline" !== e.level))
                    throw new Error(
                        "extension level must be 'block' or 'inline'"
                    );
                    i[e.level]
                    ? i[e.level].unshift(e.tokenizer)
                    : (i[e.level] = [e.tokenizer]),
                    e.start &&
                        ("block" === e.level
                        ? i.startBlock
                            ? i.startBlock.push(e.start)
                            : (i.startBlock = [e.start])
                        : "inline" === e.level &&
                            (i.startInline
                            ? i.startInline.push(e.start)
                            : (i.startInline = [e.start])));
                }
                e.childTokens && (i.childTokens[e.name] = e.childTokens);
                })),
            e.renderer)
            ) {
            const i = D.defaults.renderer || new I();
            for (const t in e.renderer) {
                const n = i[t];
                i[t] = (...s) => {
                let r = e.renderer[t].apply(i, s);
                return !1 === r && (r = n.apply(i, s)), r;
                };
            }
            t.renderer = i;
            }
            if (e.tokenizer) {
            const i = D.defaults.tokenizer || new A();
            for (const t in e.tokenizer) {
                const n = i[t];
                i[t] = (...s) => {
                let r = e.tokenizer[t].apply(i, s);
                return !1 === r && (r = n.apply(i, s)), r;
                };
            }
            t.tokenizer = i;
            }
            if (e.walkTokens) {
            const i = D.defaults.walkTokens;
            t.walkTokens = function (t) {
                e.walkTokens.call(this, t), i && i.call(this, t);
            };
            }
            n && (t.extensions = i), D.setOptions(t);
        });
        }),
        (D.walkTokens = function (e, t) {
        for (const i of e)
            switch ((t.call(D, i), i.type)) {
            case "table":
                for (const e of i.header) D.walkTokens(e.tokens, t);
                for (const e of i.rows)
                for (const i of e) D.walkTokens(i.tokens, t);
                break;
            case "list":
                D.walkTokens(i.items, t);
                break;
            default:
                D.defaults.extensions &&
                D.defaults.extensions.childTokens &&
                D.defaults.extensions.childTokens[i.type]
                ? D.defaults.extensions.childTokens[i.type].forEach(function (e) {
                    D.walkTokens(i[e], t);
                    })
                : i.tokens && D.walkTokens(i.tokens, t);
            }
        }),
        (D.parseInline = function (e, t) {
        if (null == e)
            throw new Error(
            "marked.parseInline(): input parameter is undefined or null"
            );
        if ("string" != typeof e)
            throw new Error(
            "marked.parseInline(): input parameter is of type " +
                Object.prototype.toString.call(e) +
                ", string expected"
            );
        T((t = w({}, D.defaults, t || {})));
        try {
            const i = M.lexInline(e, t);
            return (
            t.walkTokens && D.walkTokens(i, t.walkTokens), q.parseInline(i, t)
            );
        } catch (i) {
            if (
            ((i.message +=
                "\nPlease report this to https://github.com/markedjs/marked."),
            t.silent)
            )
            return (
                "<p>An error occurred:</p><pre>" + d(i.message + "", !0) + "</pre>"
            );
            throw i;
        }
        }),
        (D.Parser = q),
        (D.parser = q.parse),
        (D.Renderer = I),
        (D.TextRenderer = U),
        (D.Lexer = M),
        (D.lexer = M.lex),
        (D.Tokenizer = A),
        (D.Slugger = P),
        (D.parse = D),
        q.parse,
        M.lex;
    var z =
        "undefined" != typeof globalThis
            ? globalThis
            : "undefined" != typeof window
            ? window
            : "undefined" != typeof global
            ? global
            : "undefined" != typeof self
            ? self
            : {},
        N = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" },
        W = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" },
        j = /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
        H = /[&<>"']/g;
    function Q(e) {
        return N[e];
    }
    function V(e) {
        return W[e];
    }
    function Z(e) {
        return null == e ? "" : String(e).replace(H, Q);
    }
    function G(e) {
        return null == e ? "" : String(e).replace(j, V);
    }
    Z.options = G.options = {};
    var K = {
        encode: Z,
        escape: Z,
        decode: G,
        unescape: G,
        version: "1.0.0-browser",
    };
    var Y = function e(t) {
        for (var i, n, s = Array.prototype.slice.call(arguments, 1); s.length; )
            for (n in (i = s.shift()))
            i.hasOwnProperty(n) &&
                ("[object Object]" === Object.prototype.toString.call(t[n])
                ? (t[n] = e(t[n], i[n]))
                : (t[n] = i[n]));
        return t;
        },
        X = function (e) {
        return "string" == typeof e ? e.toLowerCase() : e;
        };
    function J(e, t) {
        return (e[t] = !0), e;
    }
    var ee = function (e) {
        return e.reduce(J, {});
        },
        te = {
        uris: ee([
            "background",
            "base",
            "cite",
            "href",
            "longdesc",
            "src",
            "usemap",
        ]),
        },
        ie = {
        voids: ee([
            "area",
            "br",
            "col",
            "hr",
            "img",
            "wbr",
            "input",
            "base",
            "basefont",
            "link",
            "meta",
        ]),
        },
        ne = K,
        se = X,
        re = ie,
        ae =
        /^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,
        oe = /^<\s*\/\s*([\w:-]+)[^>]*>/,
        le =
        /([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,
        ce = /^</,
        he = /^<\s*\//;
    var de = K,
        ue = X,
        pe = te,
        ge = ie;
    var me = Y,
        fe = function (e, t) {
        for (
            var i,
            n = (function () {
                var e = [];
                return (
                (e.lastItem = function () {
                    return e[e.length - 1];
                }),
                e
                );
            })(),
            s = e;
            e;

        )
            r();
        function r() {
            (i = !0),
            (function () {
                "\x3c!--" === e.substr(0, 4)
                ? (n = e.indexOf("--\x3e")) >= 0 &&
                    (t.comment && t.comment(e.substring(4, n)),
                    (e = e.substring(n + 3)),
                    (i = !1))
                : he.test(e)
                ? a(oe, l)
                : ce.test(e) && a(ae, o);
                var n;
                !(function () {
                if (!i) return;
                var n,
                    s = e.indexOf("<");
                s >= 0
                    ? ((n = e.substring(0, s)), (e = e.substring(s)))
                    : ((n = e), (e = ""));
                t.chars && t.chars(n);
                })();
            })();
            var n = e === s;
            (s = e), n && (e = "");
        }
        function a(t, n) {
            var s = e.match(t);
            s && ((e = e.substring(s[0].length)), s[0].replace(t, n), (i = !1));
        }
        function o(e, i, s, r) {
            var a = {},
            o = se(i),
            l = re.voids[o] || !!r;
            s.replace(le, function (e, t, i, n, s) {
            a[t] =
                void 0 === i && void 0 === n && void 0 === s
                ? void 0
                : ne.decode(i || n || s || "");
            }),
            l || n.push(o),
            t.start && t.start(o, a, l);
        }
        function l(e, i) {
            var s,
            r = 0,
            a = se(i);
            if (a) for (r = n.length - 1; r >= 0 && n[r] !== a; r--);
            if (r >= 0) {
            for (s = n.length - 1; s >= r; s--) t.end && t.end(n[s]);
            n.length = r;
            }
        }
        l();
        },
        ke = function (e, t) {
        var i,
            n = t || {};
        return (
            o(),
            {
            start: function (e, t, a) {
                var o = ue(e);
                if (i.ignoring) return void r(o);
                if (-1 === (n.allowedTags || []).indexOf(o)) return void r(o);
                if (n.filter && !n.filter({ tag: o, attrs: t })) return void r(o);
                s("<"),
                s(o),
                Object.keys(t).forEach(function (e) {
                    var i = t[e],
                    r = (n.allowedClasses || {})[o] || [],
                    a = (n.allowedAttributes || {})[o] || [],
                    l = ue(e);
                    ("class" === l && -1 === a.indexOf(l)
                    ? (i = i
                        .split(" ")
                        .filter(function (e) {
                            return r && -1 !== r.indexOf(e);
                        })
                        .join(" ")
                        .trim()).length
                    : -1 !== a.indexOf(l) &&
                        (!0 !== pe.uris[l] ||
                        (function (e) {
                            var t = e[0];
                            if ("#" === t || "/" === t) return !0;
                            var i = e.indexOf(":");
                            if (-1 === i) return !0;
                            var s = e.indexOf("?");
                            if (-1 !== s && i > s) return !0;
                            var r = e.indexOf("#");
                            return (-1 !== r && i > r) || n.allowedSchemes.some(a);
                            function a(t) {
                            return 0 === e.indexOf(t + ":");
                            }
                        })(i))) &&
                    (s(" "),
                    s(e),
                    "string" == typeof i && (s('="'), s(de.encode(i)), s('"')));
                }),
                s(a ? "/>" : ">");
            },
            end: function (e) {
                var t = ue(e);
                -1 !== (n.allowedTags || []).indexOf(t) && !1 === i.ignoring
                ? (s("</"), s(t), s(">"))
                : a(t);
            },
            chars: function (e) {
                !1 === i.ignoring && s(n.transformText ? n.transformText(e) : e);
            },
            }
        );
        function s(t) {
            e.push(t);
        }
        function r(e) {
            ge.voids[e] ||
            (!1 === i.ignoring
                ? (i = { ignoring: e, depth: 1 })
                : i.ignoring === e && i.depth++);
        }
        function a(e) {
            i.ignoring === e && --i.depth <= 0 && o();
        }
        function o() {
            i = { ignoring: !1, depth: 0 };
        }
        },
        ye = {
        allowedAttributes: {
            a: ["href", "name", "target", "title", "aria-label"],
            iframe: ["allowfullscreen", "frameborder", "src"],
            img: ["src", "alt", "title", "aria-label"],
        },
        allowedClasses: {},
        allowedSchemes: ["http", "https", "mailto"],
        allowedTags: [
            "a",
            "abbr",
            "article",
            "b",
            "blockquote",
            "br",
            "caption",
            "code",
            "del",
            "details",
            "div",
            "em",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "hr",
            "i",
            "img",
            "ins",
            "kbd",
            "li",
            "main",
            "mark",
            "ol",
            "p",
            "pre",
            "section",
            "span",
            "strike",
            "strong",
            "sub",
            "summary",
            "sup",
            "table",
            "tbody",
            "td",
            "th",
            "thead",
            "tr",
            "u",
            "ul",
        ],
        filter: null,
        };
    function be(e, t, i) {
        var n = [],
        s = !0 === i ? t : me({}, ye, t),
        r = ke(n, s);
        return fe(e, r), n.join("");
    }
    be.defaults = ye;
    var $e = be,
        xe = { exports: {} };
    xe.exports = (function () {
        function e(e, t) {
        return e((t = { exports: {} }), t.exports), t.exports;
        }
        var t = e(function (e) {
            var t = (e.exports = function () {
            return new RegExp(
                "(?:" + t.line().source + ")|(?:" + t.block().source + ")",
                "gm"
            );
            });
            (t.line = function () {
            return /(?:^|\s)\/\/(.+?)$/gm;
            }),
            (t.block = function () {
                return /\/\*([\S\s]*?)\*\//gm;
            });
        }),
        i = [
            "23AC69",
            "91C132",
            "F19726",
            "E8552D",
            "1AAB8E",
            "E1147F",
            "2980C1",
            "1BA1E6",
            "9FA0A0",
            "F19726",
            "E30B20",
            "E30B20",
            "A3338B",
        ];
        function n(e) {
        return '<span style="color: slategray">' + e + "</span>";
        }
        return function (e, s) {
        void 0 === s && (s = {});
        var r = s.colors;
        void 0 === r && (r = i);
        var a = 0,
            o = {},
            l = new RegExp(
            "(" +
                /[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/
                .source +
                "|" +
                /</.source +
                ")|(" +
                t().source +
                ")",
            "gmi"
            );
        return e.replace(l, function (e, t, i) {
            if (i) return n(i);
            if ("<" === t) return "&lt;";
            var s;
            o[t] ? (s = o[t]) : ((s = r[a]), (o[t] = s));
            var l = '<span style="color: #' + s + '">' + t + "</span>";
            return (a = ++a % r.length), l;
        });
        };
    })();
    var _e = xe.exports;
    function ve(e = "") {
        const t = document.createElement("div");
        return (t.innerHTML = e.trim()), t.firstElementChild || t;
    }
    function we(e) {
        return parseFloat(getComputedStyle(e, null).height.replace("px", ""));
    }
    function Se(e) {
        const t = RegExp(`[?&]${e}=([^&]*)`).exec(window.location.search);
        return t && decodeURIComponent(t[1].replace(/\+/g, " "));
    }
    function Le(e) {
        const t = e.getBoundingClientRect();
        return { top: t.top + window.scrollY, left: t.left + window.scrollX };
    }
    function Te(e, t) {
        let i = e.toString();
        for (; i.length < t; ) i = `0${i}`;
        return i;
    }
    function Ee(e) {
        try {
        const t = e.getTime(),
            i = new Date().getTime() - t,
            n = Math.floor(i / 864e5);
        if (0 === n) {
            const e = i % 864e5,
            t = Math.floor(e / 36e5);
            if (0 === t) {
            const t = e % 36e5,
                i = Math.floor(t / 6e4);
            if (0 === i) {
                const e = t % 6e4;
                return `${Math.round(e / 1e3)} 秒前`;
            }
            return `${i} 分钟前`;
            }
            return `${t} 小时前`;
        }
        return n < 0
            ? "刚刚"
            : n < 8
            ? `${n} 天前`
            : (function (e) {
                const t = Te(e.getDate(), 2),
                i = Te(e.getMonth() + 1, 2);
                return `${Te(e.getFullYear(), 2)}-${i}-${t}`;
            })(e);
        } catch (t) {
        return console.error(t), " - ";
        }
    }
    function Ce(e, t) {
        if (!e) return;
        const i = e.getElementsByTagName("img");
        if (!i.length) return;
        let n = i.length;
        for (let s = 0; s < i.length; s++)
        i[s].complete
            ? n--
            : i[s].addEventListener("load", () => {
                n--, 0 === n && t();
            }),
            0 === n && t();
    }
    function Ae(e, t) {
        let i = $e(e.markedInstance.parse(t), {
        allowedClasses: {},
        allowedSchemes: ["http", "https", "mailto"],
        allowedTags: [
            "a",
            "abbr",
            "article",
            "b",
            "blockquote",
            "br",
            "caption",
            "code",
            "del",
            "details",
            "div",
            "em",
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "hr",
            "i",
            "img",
            "ins",
            "kbd",
            "li",
            "main",
            "mark",
            "ol",
            "p",
            "pre",
            "section",
            "span",
            "strike",
            "strong",
            "sub",
            "summary",
            "sup",
            "table",
            "tbody",
            "td",
            "th",
            "thead",
            "tr",
            "u",
            "ul",
        ],
        allowedAttributes: {
            "*": ["title", "accesskey"],
            a: ["href", "name", "target", "aria-label", "rel"],
            img: ["src", "alt", "title", "atk-emoticon", "aria-label"],
            code: ["class"],
            span: ["class", "style"],
        },
        filter: (e) => (
            [
            ["code", /^hljs\W+language-(.*)$/],
            ["span", /^(hljs-.*)$/],
            ].forEach(([t, i]) => {
            e.tag === t &&
                e.attrs.class &&
                !i.test(e.attrs.class) &&
                delete e.attrs.class;
            }),
            "span" === e.tag &&
            e.attrs.style &&
            !/^color:(\W+)?#[0-9a-f]{3,6};?$/i.test(e.attrs.style) &&
            delete e.attrs.style,
            !0
        ),
        });
        return (
        e.markedReplacers.forEach((e) => {
            "function" == typeof e && (i = e(i));
        }),
        i
        );
    }
    function Fe() {
        return __async(this, null, function* () {
        const e = navigator.userAgent;
        if (
            !navigator.userAgentData ||
            !navigator.userAgentData.getHighEntropyValues
        )
            return e;
        const t = navigator.userAgentData;
        let i = null;
        try {
            i = yield t.getHighEntropyValues(["platformVersion"]);
        } catch (s) {
            return console.error(s), e;
        }
        const n = Number(i.platformVersion.split(".")[0]);
        return "Windows" === t.platform && n >= 13
            ? e.replace(/Windows NT 10.0/, "Windows NT 11.0")
            : "macOS" === t.platform && n >= 11
            ? e.replace(
                /(Mac OS X \d+_\d+_\d+|Mac OS X)/,
                `Mac OS X ${i.platformVersion.replace(/\./g, "_")}`
            )
            : e;
        });
    }
    function Re(e, t) {
        return (function (e, t) {
        return `${e.replace(/\/$/, "")}/${t.replace(/^\//, "")}`;
        })(e.conf.server, t);
    }
    function Be(e, t) {
        const i = (e) => e && "object" == typeof e;
        return i(e) && i(t)
        ? (Object.keys(t).forEach((n) => {
            const s = e[n],
                r = t[n];
            Array.isArray(s) && Array.isArray(r)
                ? (e[n] = s.concat(r))
                : i(s) && i(r)
                ? (e[n] = Be(__spreadValues({}, s), r))
                : (e[n] = r);
            }),
            e)
        : t;
    }
    function Oe(e, i) {
        e instanceof t && (e = e.$root);
        let n = e.querySelector(".atk-loading");
        n ||
        ((n = ve(
            '<div class="atk-loading atk-fade-in" style="display: none;">\n      <div class="atk-loading-spinner">\n        <svg viewBox="25 25 50 50"><circle cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"></circle></svg>\n      </div>\n    </div>'
        )),
        (null == i ? void 0 : i.transparentBg) &&
            (n.style.background = "transparent"),
        e.appendChild(n)),
        (n.style.display = "");
        const s = n.querySelector(".atk-loading-spinner");
        s &&
        ((s.style.display = "none"),
        window.setTimeout(() => {
            s.style.display = "";
        }, 500));
    }
    function Me(e) {
        e instanceof t && (e = e.$root);
        const i = e.querySelector(".atk-loading");
        i && (i.style.display = "none");
    }
    function Ie(e, t = !0) {
        const i = Le(e).top + we(e) / 2 - document.documentElement.clientHeight / 2;
        t
        ? window.scroll({ top: i > 0 ? i : 0, left: 0 })
        : window.scroll(0, i > 0 ? i : 0);
    }
    function Ue(e, t, i) {
        const n = ve(
        `<div class="atk-notify atk-fade-in" style="background-color: ${
            { s: "#57d59f", e: "#ff6f6c", w: "#ffc721", i: "#2ebcfc" }[i]
        }"><span class="atk-notify-content"></span></div>`
        );
        (n.querySelector(".atk-notify-content").innerHTML = (function (e) {
        const t = document.createElement("div");
        return (t.innerText = e), t.innerHTML;
        })(t).replace("\n", "<br/>")),
        e.appendChild(n);
        const s = () => {
        n.classList.add("atk-fade-out"),
            setTimeout(() => {
            n.remove();
            }, 200);
        };
        let r;
        (r = window.setTimeout(() => {
        s();
        }, 3e3)),
        n.addEventListener("click", () => {
            s(), window.clearTimeout(r);
        });
    }
    function Pe(e, t) {
        !(function (e, t, i = "in") {
        e.classList.add(`atk-fade-${i}`);
        const n = () => {
            e.classList.remove(`atk-fade-${i}`),
            e.removeEventListener("animationend", n),
            t && t();
        };
        e.addEventListener("animationend", n);
        })(e, t, "in");
    }
    function qe(e, i, n = '<span class="atk-error-title">Artalk Error</span>') {
        e instanceof t && (e = e.$root);
        let s = e.querySelector(".atk-error-layer");
        if (null === i) return void (null !== s && s.remove());
        s ||
        ((s = ve(
            `<div class="atk-error-layer">${n}<span class="atk-error-text"></span></div>`
        )),
        e.appendChild(s));
        const r = s.querySelector(".atk-error-text");
        (r.innerHTML = ""),
        null !== i &&
            (i instanceof HTMLElement ? r.appendChild(i) : (r.innerText = i));
    }
    const De = class extends i {
        constructor(e, t, i) {
        super(e),
            __publicField(this, "name"),
            __publicField(this, "$wrap"),
            __publicField(this, "$mask"),
            __publicField(this, "maskClickHideEnable", !0),
            __publicField(this, "afterHide"),
            (this.name = t);
        const { $wrap: n, $mask: s } = Ne(e);
        (this.$wrap = n),
            (this.$mask = s),
            (this.$el = this.$wrap.querySelector(
            `[data-layer-name="${t}"].atk-layer-item`
            )),
            null === this.$el &&
            (i
                ? (this.$el = i)
                : ((this.$el = ve()), this.$el.classList.add("atk-layer-item"))),
            this.$el.setAttribute("data-layer-name", t),
            (this.$el.style.display = "none"),
            this.$wrap.append(this.$el);
        }
        getName() {
        return this.name;
        }
        getWrapEl() {
        return this.$wrap;
        }
        getEl() {
        return this.$el;
        }
        show() {
        this.fireAllActionTimer(),
            (this.$wrap.style.display = "block"),
            (this.$mask.style.display = "block"),
            this.$mask.classList.add("atk-fade-in"),
            (this.$el.style.display = ""),
            (this.$mask.onclick = () => {
            this.maskClickHideEnable && this.hide();
            }),
            this.pageBodyScrollBarHide();
        }
        hide() {
        this.afterHide && this.afterHide(),
            this.$wrap.classList.add("atk-fade-out"),
            (this.$el.style.display = "none"),
            this.pageBodyScrollBarShow(),
            this.newActionTimer(() => {
            (this.$wrap.style.display = "none"), this.checkCleanLayer();
            }, 450),
            this.newActionTimer(() => {
            (this.$wrap.style.display = "none"),
                this.$wrap.classList.remove("atk-fade-out");
            }, 200);
        }
        setMaskClickHide(e) {
        this.maskClickHideEnable = e;
        }
        pageBodyScrollBarHide() {
        document.body.style.overflow = "hidden";
        const e = parseInt(
            window
            .getComputedStyle(document.body, null)
            .getPropertyValue("padding-right"),
            10
        );
        document.body.style.paddingRight = `${
            (function () {
            const e = document.createElement("p");
            (e.style.width = "100%"), (e.style.height = "200px");
            const t = document.createElement("div");
            (t.style.position = "absolute"),
                (t.style.top = "0px"),
                (t.style.left = "0px"),
                (t.style.visibility = "hidden"),
                (t.style.width = "200px"),
                (t.style.height = "150px"),
                (t.style.overflow = "hidden"),
                t.appendChild(e),
                document.body.appendChild(t);
            const i = e.offsetWidth;
            t.style.overflow = "scroll";
            let n = e.offsetWidth;
            return (
                i === n && (n = t.clientWidth), document.body.removeChild(t), i - n
            );
            })() + e || 0
        }px`;
        }
        pageBodyScrollBarShow() {
        (document.body.style.overflow = De.BodyOrgOverflow),
            (document.body.style.paddingRight = De.BodyOrgPaddingRight);
        }
        newActionTimer(e, t) {
        const i = () => {
            e(), (De.actionTimers = De.actionTimers.filter((e) => e.act !== i));
            },
            n = window.setTimeout(() => i(), t);
        De.actionTimers.push({ act: i, tid: n });
        }
        fireAllActionTimer() {
        De.actionTimers.forEach((e) => {
            clearTimeout(e.tid), e.act();
        });
        }
        disposeNow() {
        this.$el.remove(), this.pageBodyScrollBarShow(), this.checkCleanLayer();
        }
        dispose() {
        this.hide(), this.$el.remove(), this.checkCleanLayer();
        }
        checkCleanLayer() {
        0 === this.getWrapEl().querySelectorAll(".atk-layer-item").length &&
            (this.$wrap.style.display = "none");
        }
    };
    let ze = De;
    function Ne(e) {
        let t = document.querySelector(`.atk-layer-wrap#ctx-${e.cid}`);
        t ||
        ((t = ve(
            `<div class="atk-layer-wrap" id="ctx-${e.cid}" style="display: none;"><div class="atk-layer-mask"></div></div>`
        )),
        document.body.appendChild(t));
        const i = t.querySelector(".atk-layer-mask");
        return { $wrap: t, $mask: i };
    }
    __publicField(ze, "BodyOrgOverflow"),
        __publicField(ze, "BodyOrgPaddingRight"),
        __publicField(ze, "actionTimers", []);
    class We {
        constructor(e) {
        return (
            __publicField(this, "$el"),
            __publicField(this, "$content"),
            __publicField(this, "$actions"),
            (this.$el = ve(
            '<div class="atk-layer-dialog-wrap">\n        <div class="atk-layer-dialog">\n          <div class="atk-layer-dialog-content"></div>\n          <div class="atk-layer-dialog-actions"></div>\n        </div>\n      </div>'
            )),
            (this.$actions = this.$el.querySelector(".atk-layer-dialog-actions")),
            (this.$content = this.$el.querySelector(".atk-layer-dialog-content")),
            this.$content.appendChild(e),
            this
        );
        }
        setYes(e) {
        const t = ve('<button data-action="confirm">确定</button>');
        return (
            (t.onclick = this.onBtnClick(e)), this.$actions.appendChild(t), this
        );
        }
        setNo(e) {
        const t = ve('<button data-action="cancel">取消</button>');
        return (
            (t.onclick = this.onBtnClick(e)), this.$actions.appendChild(t), this
        );
        }
        onBtnClick(e) {
        return (t) => {
            const i = e(t.currentTarget, this);
            (void 0 !== i && !0 !== i) || this.$el.remove();
        };
        }
    }
    function je(e, t, i, n) {
        return __async(this, null, function* () {
        var s, r;
        if (e.user.data.token) {
            const t = new Headers(i.headers);
            t.set("Authorization", `Bearer ${e.user.data.token}`), (i.headers = t);
        }
        const a = yield (function (e, t, i) {
            var n;
            const s = new AbortController();
            null == (n = i.signal) ||
                n.addEventListener("abort", () => s.abort());
            let r = fetch(
                e,
                __spreadProps(__spreadValues({}, i), { signal: s.signal })
            );
            if (t > 0) {
                const e = setTimeout(() => s.abort(), t);
                r.finally(() => {
                clearTimeout(e);
                });
            }
            return (
                (r = r.catch((e) => {
                throw "AbortError" === (e || {}).name
                    ? new Error("请求超时或意外终止")
                    : e;
                })),
                r
            );
            })(t, n || e.conf.reqTimeout || 15e3, i),
            o = a.status,
            l = [401, 400].includes(o);
        if (!a.ok && !l) throw new Error(`请求响应 ${o}`);
        let c = yield a.json();
        const h = (n, s) => {
            je(e, t, i)
            .then((e) => {
                n(e);
            })
            .catch((e) => {
                s(e);
            });
        };
        if (
            ((null == (s = c.data) ? void 0 : s.need_captcha)
            ? (c = yield new Promise((t, i) => {
                e.trigger("checker-captcha", {
                    imgData: c.data.img_data,
                    iframe: c.data.iframe,
                    onSuccess: () => {
                    h(t, i);
                    },
                    onCancel: () => {
                    i(c);
                    },
                });
                }))
            : ((null == (r = c.data) ? void 0 : r.need_login) || l) &&
                (c = yield new Promise((t, i) => {
                e.trigger("checker-admin", {
                    onSuccess: () => {
                    h(t, i);
                    },
                    onCancel: () => {
                    i(c);
                    },
                });
                })),
            !c.success)
        )
            throw c;
        return c;
        });
    }
    function He(e, t, i) {
        return __async(this, null, function* () {
        const n = { method: "POST" };
        i && (n.body = Qe(i));
        return (yield je(e, t, n)).data || {};
        });
    }
    function Qe(e) {
        const t = new FormData();
        return Object.keys(e).forEach((i) => t.append(i, String(e[i]))), t;
    }
    !(function () {
        function e(e, t) {
        if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function");
        }
        function t(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            (n.enumerable = n.enumerable || !1),
            (n.configurable = !0),
            "value" in n && (n.writable = !0),
            Object.defineProperty(e, n.key, n);
        }
        }
        function i(e, i, n) {
        return i && t(e.prototype, i), n && t(e, n), e;
        }
        function n(e, t) {
        if ("function" != typeof t && null !== t)
            throw new TypeError(
            "Super expression must either be null or a function"
            );
        (e.prototype = Object.create(t && t.prototype, {
            constructor: { value: e, writable: !0, configurable: !0 },
        })),
            t && r(e, t);
        }
        function s(e) {
        return (s = Object.setPrototypeOf
            ? Object.getPrototypeOf
            : function (e) {
                return e.__proto__ || Object.getPrototypeOf(e);
            })(e);
        }
        function r(e, t) {
        return (r =
            Object.setPrototypeOf ||
            function (e, t) {
            return (e.__proto__ = t), e;
            })(e, t);
        }
        function a() {
        if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
        if (Reflect.construct.sham) return !1;
        if ("function" == typeof Proxy) return !0;
        try {
            return (
            Boolean.prototype.valueOf.call(
                Reflect.construct(Boolean, [], function () {})
            ),
            !0
            );
        } catch (e) {
            return !1;
        }
        }
        function o(e) {
        if (void 0 === e)
            throw new ReferenceError(
            "this hasn't been initialised - super() hasn't been called"
            );
        return e;
        }
        function l(e, t) {
        return !t || ("object" != typeof t && "function" != typeof t) ? o(e) : t;
        }
        function c(e) {
        var t = a();
        return function () {
            var i,
            n = s(e);
            if (t) {
            var r = s(this).constructor;
            i = Reflect.construct(n, arguments, r);
            } else i = n.apply(this, arguments);
            return l(this, i);
        };
        }
        function h(e, t) {
        for (
            ;
            !Object.prototype.hasOwnProperty.call(e, t) && null !== (e = s(e));

        );
        return e;
        }
        function d(e, t, i) {
        return (d =
            "undefined" != typeof Reflect && Reflect.get
            ? Reflect.get
            : function (e, t, i) {
                var n = h(e, t);
                if (n) {
                    var s = Object.getOwnPropertyDescriptor(n, t);
                    return s.get ? s.get.call(i) : s.value;
                }
                })(e, t, i || e);
        }
        var u = (function () {
            function t() {
            e(this, t),
                Object.defineProperty(this, "listeners", {
                value: {},
                writable: !0,
                configurable: !0,
                });
            }
            return (
            i(t, [
                {
                key: "addEventListener",
                value: function (e, t, i) {
                    e in this.listeners || (this.listeners[e] = []),
                    this.listeners[e].push({ callback: t, options: i });
                },
                },
                {
                key: "removeEventListener",
                value: function (e, t) {
                    if (e in this.listeners)
                    for (
                        var i = this.listeners[e], n = 0, s = i.length;
                        n < s;
                        n++
                    )
                        if (i[n].callback === t) return void i.splice(n, 1);
                },
                },
                {
                key: "dispatchEvent",
                value: function (e) {
                    if (e.type in this.listeners) {
                    for (
                        var t = this.listeners[e.type].slice(), i = 0, n = t.length;
                        i < n;
                        i++
                    ) {
                        var s = t[i];
                        try {
                        s.callback.call(this, e);
                        } catch (r) {
                        Promise.resolve().then(function () {
                            throw r;
                        });
                        }
                        s.options &&
                        s.options.once &&
                        this.removeEventListener(e.type, s.callback);
                    }
                    return !e.defaultPrevented;
                    }
                },
                },
            ]),
            t
            );
        })(),
        p = (function (t) {
            n(a, t);
            var r = c(a);
            function a() {
            var t;
            return (
                e(this, a),
                (t = r.call(this)).listeners || u.call(o(t)),
                Object.defineProperty(o(t), "aborted", {
                value: !1,
                writable: !0,
                configurable: !0,
                }),
                Object.defineProperty(o(t), "onabort", {
                value: null,
                writable: !0,
                configurable: !0,
                }),
                t
            );
            }
            return (
            i(a, [
                {
                key: "toString",
                value: function () {
                    return "[object AbortSignal]";
                },
                },
                {
                key: "dispatchEvent",
                value: function (e) {
                    "abort" === e.type &&
                    ((this.aborted = !0),
                    "function" == typeof this.onabort &&
                        this.onabort.call(this, e)),
                    d(s(a.prototype), "dispatchEvent", this).call(this, e);
                },
                },
            ]),
            a
            );
        })(u),
        g = (function () {
            function t() {
            e(this, t),
                Object.defineProperty(this, "signal", {
                value: new p(),
                writable: !0,
                configurable: !0,
                });
            }
            return (
            i(t, [
                {
                key: "abort",
                value: function () {
                    var e;
                    try {
                    e = new Event("abort");
                    } catch (t) {
                    "undefined" != typeof document
                        ? document.createEvent
                        ? (e = document.createEvent("Event")).initEvent(
                            "abort",
                            !1,
                            !1
                            )
                        : ((e = document.createEventObject()).type = "abort")
                        : (e = { type: "abort", bubbles: !1, cancelable: !1 });
                    }
                    this.signal.dispatchEvent(e);
                },
                },
                {
                key: "toString",
                value: function () {
                    return "[object AbortController]";
                },
                },
            ]),
            t
            );
        })();
        function m(e) {
        return e.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL
            ? (console.log(
                "__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL=true is set, will force install polyfill"
            ),
            !0)
            : ("function" == typeof e.Request &&
                !e.Request.prototype.hasOwnProperty("signal")) ||
                !e.AbortController;
        }
        function f(e) {
        "function" == typeof e && (e = { fetch: e });
        var t = e,
            i = t.fetch,
            n = t.Request,
            s = void 0 === n ? i.Request : n,
            r = t.AbortController,
            a = t.__FORCE_INSTALL_ABORTCONTROLLER_POLYFILL,
            o = void 0 !== a && a;
        if (
            !m({
            fetch: i,
            Request: s,
            AbortController: r,
            __FORCE_INSTALL_ABORTCONTROLLER_POLYFILL: o,
            })
        )
            return { fetch: i, Request: l };
        var l = s;
        ((l && !l.prototype.hasOwnProperty("signal")) || o) &&
            ((l = function (e, t) {
            var i;
            t && t.signal && ((i = t.signal), delete t.signal);
            var n = new s(e, t);
            return (
                i &&
                Object.defineProperty(n, "signal", {
                    writable: !1,
                    enumerable: !1,
                    configurable: !0,
                    value: i,
                }),
                n
            );
            }).prototype = s.prototype);
        var c = i;
        return {
            fetch: function (e, t) {
            var i =
                l && l.prototype.isPrototypeOf(e)
                ? e.signal
                : t
                ? t.signal
                : void 0;
            if (i) {
                var n;
                try {
                n = new DOMException("Aborted", "AbortError");
                } catch (r) {
                (n = new Error("Aborted")).name = "AbortError";
                }
                if (i.aborted) return Promise.reject(n);
                var s = new Promise(function (e, t) {
                i.addEventListener(
                    "abort",
                    function () {
                    return t(n);
                    },
                    { once: !0 }
                );
                });
                return t && t.signal && delete t.signal, Promise.race([s, c(e, t)]);
            }
            return c(e, t);
            },
            Request: l,
        };
        }
        "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        ((g.prototype[Symbol.toStringTag] = "AbortController"),
        (p.prototype[Symbol.toStringTag] = "AbortSignal")),
        (function (e) {
            if (m(e))
            if (e.fetch) {
                var t = f(e),
                i = t.fetch,
                n = t.Request;
                (e.fetch = i),
                (e.Request = n),
                Object.defineProperty(e, "AbortController", {
                    writable: !0,
                    enumerable: !1,
                    configurable: !0,
                    value: g,
                }),
                Object.defineProperty(e, "AbortSignal", {
                    writable: !0,
                    enumerable: !1,
                    configurable: !0,
                    value: p,
                });
            } else
                console.warn(
                "fetch() is not available, cannot install abortcontroller-polyfill"
                );
        })("undefined" != typeof self ? self : z);
    })();
    class Ve {
        constructor(e) {
        __publicField(this, "ctx"),
            __publicField(this, "baseURL"),
            (this.ctx = e),
            (this.baseURL = `${e.conf.server}/api`);
        }
        get(e, t, i, n) {
        const s = {
            page_key: this.ctx.conf.pageKey,
            site_name: this.ctx.conf.site || "",
            limit: t,
            offset: e,
        };
        return (
            i && (s.flat_mode = i),
            this.ctx.user.checkHasBasicUserInfo() &&
            ((s.name = this.ctx.user.data.nick),
            (s.email = this.ctx.user.data.email)),
            n && n(s),
            He(this.ctx, `${this.baseURL}/get`, s)
        );
        }
        add(e) {
        return __async(this, null, function* () {
            const t = {
            name: e.nick,
            email: e.email,
            link: e.link,
            content: e.content,
            rid: e.rid,
            page_key: e.page_key,
            ua: yield Fe(),
            };
            e.page_title && (t.page_title = e.page_title),
            e.site_name && (t.site_name = e.site_name);
            return (yield He(this.ctx, `${this.baseURL}/add`, t)).comment;
        });
        }
        commentEdit(e) {
        return __async(this, null, function* () {
            const t = __spreadValues({}, e);
            return (yield He(
            this.ctx,
            `${this.baseURL}/admin/comment-edit`,
            t
            )).comment;
        });
        }
        commentDel(e, t) {
        const i = { id: String(e), site_name: t || "" };
        return He(this.ctx, `${this.baseURL}/admin/comment-del`, i);
        }
        login(e, t, i) {
        return __async(this, null, function* () {
            const n = { name: e, email: t, password: i };
            this.ctx.conf.site && (n.site_name = this.ctx.conf.site);
            return (yield He(this.ctx, `${this.baseURL}/login`, n)).token;
        });
        }
        userGet(e, t) {
        const i = new AbortController(),
            n = { name: e, email: t, site_name: this.ctx.conf.site || "" };
        return {
            req: je(this.ctx, `${this.baseURL}/user-get`, {
            method: "POST",
            body: Qe(n),
            signal: i.signal,
            }).then((e) => ({
            user: e.data.user,
            is_login: e.data.is_login,
            unread: e.data.unread || [],
            unread_count: e.data.unread_count || 0,
            })),
            abort: () => {
            i.abort();
            },
        };
        }
        loginStatus() {
        return __async(this, null, function* () {
            return (
            (yield He(this.ctx, `${this.baseURL}/login-status`, {
                name: this.ctx.user.data.nick,
                email: this.ctx.user.data.email,
            })) || { is_login: !1, is_admin: !1 }
            );
        });
        }
        pageGet(e, t, i) {
        return __async(this, null, function* () {
            const n = { site_name: e || "", offset: t || 0, limit: i || 15 };
            return yield He(this.ctx, `${this.baseURL}/admin/page-get`, n);
        });
        }
        pageEdit(e) {
        return __async(this, null, function* () {
            const t = {
            id: e.id,
            key: e.key,
            title: e.title,
            admin_only: e.admin_only,
            site_name: e.site_name || this.ctx.conf.site,
            };
            return (yield He(this.ctx, `${this.baseURL}/admin/page-edit`, t)).page;
        });
        }
        pageDel(e, t) {
        const i = { key: String(e), site_name: t || "" };
        return He(this.ctx, `${this.baseURL}/admin/page-del`, i);
        }
        pageFetch(e, t, i) {
        return __async(this, null, function* () {
            const n = {};
            e && (n.id = e), t && (n.site_name = t), i && (n.get_status = i);
            return yield He(this.ctx, `${this.baseURL}/admin/page-fetch`, n);
        });
        }
        siteGet() {
        return __async(this, null, function* () {
            return (yield He(this.ctx, `${this.baseURL}/admin/site-get`, {})).sites;
        });
        }
        siteAdd(e, t) {
        return __async(this, null, function* () {
            const i = { name: e, urls: t };
            return (yield He(this.ctx, `${this.baseURL}/admin/site-add`, i)).site;
        });
        }
        siteEdit(e) {
        return __async(this, null, function* () {
            const t = { id: e.id, name: e.name || "", urls: e.urls || "" };
            return (yield He(this.ctx, `${this.baseURL}/admin/site-edit`, t)).site;
        });
        }
        siteDel(e, t = !1) {
        const i = { id: e, del_content: t };
        return He(this.ctx, `${this.baseURL}/admin/site-del`, i);
        }
        export() {
        return __async(this, null, function* () {
            var e;
            return (
            (null ==
            (e = (yield je(
                this.ctx,
                `${this.baseURL}/admin/export`,
                { method: "POST" },
                0
            )).data)
                ? void 0
                : e.data) || ""
            );
        });
        }
        vote(e, t) {
        return __async(this, null, function* () {
            const i = {
            site_name: this.ctx.conf.site || "",
            target_id: e,
            type: t,
            };
            this.ctx.user.checkHasBasicUserInfo() &&
            ((i.name = this.ctx.user.data.nick),
            (i.email = this.ctx.user.data.email));
            return yield He(this.ctx, `${this.baseURL}/vote`, i);
        });
        }
        markRead(e, t = !1) {
        const i = { site_name: this.ctx.conf.site || "", notify_key: e };
        return (
            t &&
            (delete i.notify_key,
            (i.read_all = !0),
            (i.name = this.ctx.user.data.nick),
            (i.email = this.ctx.user.data.email)),
            He(this.ctx, `${this.baseURL}/mark-read`, i)
        );
        }
        pv() {
        return __async(this, null, function* () {
            const e = {
            site_name: this.ctx.conf.site || "",
            page_key: this.ctx.conf.pageKey || "",
            page_title: this.ctx.conf.pageTitle || "",
            };
            return (yield He(this.ctx, `${this.baseURL}/pv`, e)).pv;
        });
        }
        imgUpload(e) {
        return __async(this, null, function* () {
            const t = {
            name: this.ctx.user.data.nick,
            email: this.ctx.user.data.email,
            page_key: this.ctx.conf.pageKey,
            };
            this.ctx.conf.site && (t.site_name = this.ctx.conf.site);
            const i = Qe(t);
            i.set("file", e);
            const n = { method: "POST", body: i };
            return (yield je(this.ctx, `${this.baseURL}/img-upload`, n)).data || {};
        });
        }
        conf() {
        return __async(this, null, function* () {
            const e =
            (yield He(this.ctx, `${this.baseURL}/conf`)).frontend_conf || {};
            return (
            e.emoticons &&
                "string" == typeof e.emoticons &&
                ((e.emoticons = e.emoticons.trim()),
                e.emoticons.startsWith("[") || e.emoticons.startsWith("{")
                ? (e.emoticons = JSON.parse(e.emoticons))
                : "false" === e.emoticons && (e.emoticons = !1)),
            e
            );
        });
        }
        captchaGet() {
        return __async(this, null, function* () {
            return (
            (yield He(this.ctx, `${this.baseURL}/captcha/refresh`)).img_data || ""
            );
        });
        }
        captchaCheck(e) {
        return __async(this, null, function* () {
            return (
            (yield He(this.ctx, `${this.baseURL}/captcha/check`, { value: e }))
                .img_data || ""
            );
        });
        }
        captchaStatus() {
        return __async(this, null, function* () {
            return (
            (yield He(this.ctx, `${this.baseURL}/captcha/status`)) || {
                is_pass: !1,
            }
            );
        });
        }
        cacheFlushAll() {
        return He(this.ctx, `${this.baseURL}/admin/cache-flush`, {
            flush_all: !0,
        });
        }
        cacheWarmUp() {
        return He(this.ctx, `${this.baseURL}/admin/cache-warm`, {});
        }
    }
    const Ze = {
        request: (e, t, i) => new Ve(e.ctx).captchaCheck(i),
        body(e, t) {
            if (e.captchaConf.iframe) {
            const i = ve('<div class="atk-checker-iframe-wrap"></div>'),
                n = ve('<iframe class="atk-fade-in"></iframe>');
            (n.style.display = "none"),
                Oe(i, { transparentBg: !0 }),
                (n.src = `${e.ctx.conf.server}/api/captcha/get?t=${+new Date()}`),
                (n.onload = () => {
                (n.style.display = ""), Me(i);
                }),
                i.append(n);
            const s = ve(
                '<div class="atk-close-btn"><i class="atk-icon atk-icon-close"></i></div>'
            );
            i.append(s), t.hideInteractInput();
            let r = !1;
            const a = (e) =>
                new Promise((t) => {
                window.setTimeout(() => {
                    t(null);
                }, e);
                });
            return (
                (function i() {
                return __async(this, null, function* () {
                    if ((yield a(1e3), r)) return;
                    let n = !1;
                    try {
                    n = (yield new Ve(e.ctx).captchaStatus()).is_pass;
                    } catch (s) {
                    n = !1;
                    }
                    n ? t.triggerSuccess() : i();
                });
                })(),
                (s.onclick = () => {
                (r = !0), t.cancel();
                }),
                i
            );
            }
            const i = ve(
            `<span><img class="atk-captcha-img" src="${
                e.captchaConf.imgData || ""
            }" alt="验证码">敲入验证码继续：</span>`
            );
            return (
            (i.querySelector(".atk-captcha-img").onclick = () => {
                const t = i.querySelector(".atk-captcha-img");
                new Ve(e.ctx)
                .captchaGet()
                .then((e) => {
                    t.setAttribute("src", e);
                })
                .catch((e) => {
                    console.error("验证码获取失败 ", e);
                });
            }),
            i
            );
        },
        onSuccess(e, t, i, n, s) {
            e.captchaConf.val = n;
        },
        onError(e, t, i, n, s) {
            s.querySelector(".atk-captcha-img").click();
        },
        },
        Ge = {
        inputType: "password",
        request(e, t, i) {
            const n = {
            name: e.ctx.user.data.nick,
            email: e.ctx.user.data.email,
            password: i,
            };
            return new Ve(e.ctx).login(n.name, n.email, n.password);
        },
        body: (e, t) => ve("<span>敲入密码来验证管理员身份：</span>"),
        onSuccess(e, t, i, n, s) {
            (e.ctx.user.data.isAdmin = !0),
            (e.ctx.user.data.token = i),
            e.ctx.user.save(),
            e.ctx.trigger("user-changed", e.ctx.user.data),
            e.ctx.trigger("list-reload");
        },
        onError(e, t, i, n, s) {},
        };
    class Ke {
        constructor(e) {
        __publicField(this, "ctx"),
            __publicField(this, "launched", []),
            __publicField(this, "captchaConf", {}),
            (this.ctx = e),
            this.initEventBind();
        }
        initEventBind() {
        this.ctx.on("checker-captcha", (e) => {
            e.imgData && (this.captchaConf.imgData = e.imgData),
            e.iframe && (this.captchaConf.iframe = e.iframe),
            this.fire(Ze, e);
        }),
            this.ctx.on("checker-admin", (e) => {
            this.fire(Ge, e);
            });
        }
        fire(e, t) {
        if (this.launched.includes(e)) return;
        this.launched.push(e);
        const i = new ze(this.ctx, `checker-${new Date().getTime()}`);
        i.setMaskClickHide(!1), i.show();
        let n = !1;
        const s = {
            getLayer: () => i,
            hideInteractInput: () => {
                n = !0;
            },
            triggerSuccess: () => {
                this.close(e, i),
                e.onSuccess && e.onSuccess(this, s, "", "", r),
                t.onSuccess && t.onSuccess("", l.$el);
            },
            cancel: () => {
                this.close(e, i), t.onCancel && t.onCancel();
            },
            },
            r = ve();
        r.appendChild(e.body(this, s));
        const a = ve(
            `<input id="check" type="${
            e.inputType || "text"
            }" autocomplete="off" required placeholder="">`
        );
        let o;
        r.appendChild(a),
            setTimeout(() => a.focus(), 80),
            (a.onkeyup = (e) => {
            ("Enter" !== e.key && 13 !== e.keyCode) ||
                (e.preventDefault(),
                i.getEl().querySelector('button[data-action="confirm"]').click());
            });
        const l = new We(r);
        l.setYes((n) => {
            const c = a.value.trim();
            o || (o = n.innerText);
            const h = () => {
            (n.innerText = o || ""), n.classList.remove("error");
            };
            return (
            (n.innerText = "加载中..."),
            e
                .request(this, s, c)
                .then((n) => {
                this.close(e, i),
                    e.onSuccess && e.onSuccess(this, s, n, c, r),
                    t.onSuccess && t.onSuccess(c, l.$el);
                })
                .catch((t) => {
                var i;
                (i = String(t.msg || String(t))),
                    (n.innerText = i),
                    n.classList.add("error"),
                    e.onError && e.onError(this, s, t, c, r);
                const o = setTimeout(() => h(), 3e3);
                a.onfocus = () => {
                    h(), clearTimeout(o);
                };
                }),
            !1
            );
        }),
            l.setNo(() => (this.close(e, i), t.onCancel && t.onCancel(), !1)),
            n &&
            ((a.style.display = "none"),
            (l.$el.querySelector(".atk-layer-dialog-actions").style.display =
                "none")),
            i.getEl().append(l.$el),
            t.onMount && t.onMount(l.$el);
        }
        close(e, t) {
        t.disposeNow(), (this.launched = this.launched.filter((t) => t !== e));
        }
    }
    class Ye {
        constructor(e) {
        __publicField(this, "editor"),
            __publicField(this, "ctx"),
            (this.editor = e),
            (this.ctx = e.ctx);
        }
    }
    __publicField(Ye, "Name"), __publicField(Ye, "BtnHTML");
    class Xe extends Ye {
        constructor(e) {
        super(e),
            __publicField(this, "$el"),
            __publicField(this, "emoticons", []),
            __publicField(this, "$grpWrap"),
            __publicField(this, "$grpSwitcher"),
            __publicField(this, "loadingTask", null),
            __publicField(this, "isListLoaded", !1),
            __publicField(this, "isImgLoaded", !1),
            (this.editor = e),
            (this.$el = ve('<div class="atk-editor-plug-emoticons"></div>'));
        }
        loadEmoticonsData() {
        return __async(this, null, function* () {
            this.isListLoaded ||
            (null === this.loadingTask
                ? ((this.loadingTask = (() =>
                    __async(this, null, function* () {
                    Oe(this.$el),
                        (this.emoticons = yield this.handleData(
                        this.ctx.conf.emoticons
                        )),
                        Me(this.$el),
                        (this.loadingTask = null),
                        (this.isListLoaded = !0);
                    }))()),
                yield this.loadingTask)
                : yield this.loadingTask);
        });
        }
        handleData(e) {
        return __async(this, null, function* () {
            if (
            (!Array.isArray(e) &&
                ["object", "string"].includes(typeof e) &&
                (e = [e]),
            !Array.isArray(e))
            )
            return (
                qe(this.$el, "表情包数据必须为 Array/Object/String 类型"),
                Me(this.$el),
                []
            );
            const t = (t) => {
                "object" == typeof t &&
                ((t.name && e.find((e) => e.name === t.name)) || e.push(t));
            },
            i = (e) =>
                __async(this, null, function* () {
                yield Promise.all(
                    e.map((e, n) =>
                    __async(this, null, function* () {
                        if ("object" != typeof e || Array.isArray(e)) {
                        if (Array.isArray(e)) yield i(e);
                        else if ("string" == typeof e) {
                            const n = yield this.remoteLoad(e);
                            Array.isArray(n)
                            ? yield i(n)
                            : "object" == typeof n && t(n);
                        }
                        } else t(e);
                    })
                    )
                );
                });
            return (
            yield i(e),
            e.forEach((e) => {
                if (this.isOwOFormat(e)) {
                this.convertOwO(e).forEach((e) => {
                    t(e);
                });
                } else
                Array.isArray(e) &&
                    e.forEach((e) => {
                    t(e);
                    });
            }),
            (e = e.filter(
                (e) => "object" == typeof e && !Array.isArray(e) && !!e && !!e.name
            )),
            this.solveNullKey(e),
            this.solveSameKey(e),
            e
            );
        });
        }
        remoteLoad(e) {
        return __async(this, null, function* () {
            if (!e) return [];
            try {
            const t = yield fetch(e);
            return yield t.json();
            } catch (t) {
            return Me(this.$el), qe(this.$el, `表情加载失败 ${String(t)}`), [];
            }
        });
        }
        solveNullKey(e) {
        e.forEach((e) => {
            e.items.forEach((t, i) => {
            t.key || (t.key = `${e.name} ${i + 1}`);
            });
        });
        }
        solveSameKey(e) {
        const t = {};
        e.forEach((e) => {
            e.items.forEach((e) => {
            e.key &&
                "" !== String(e.key).trim() &&
                (t[e.key] ? t[e.key]++ : (t[e.key] = 1),
                t[e.key] > 1 && (e.key = `${e.key} ${t[e.key]}`));
            });
        });
        }
        isOwOFormat(e) {
        try {
            return (
            "object" == typeof e &&
            !!Object.values(e).length &&
            Array.isArray(Object.keys(Object.values(e)[0].container)) &&
            Object.keys(Object.values(e)[0].container[0]).includes("icon")
            );
        } catch (t) {
            return !1;
        }
        }
        convertOwO(e) {
        const t = [];
        return (
            Object.entries(e).forEach(([e, i]) => {
            const n = { name: e, type: i.type, items: [] };
            i.container.forEach((t, i) => {
                const s = t.icon;
                if (/<(img|IMG)/.test(s)) {
                const e = /src=["'](.*?)["']/.exec(s);
                e && e.length > 1 && (t.icon = e[1]);
                }
                n.items.push({ key: t.text || `${e} ${i + 1}`, val: t.icon });
            }),
                t.push(n);
            }),
            t
        );
        }
        initEmoticonsList() {
        (this.$grpWrap = ve('<div class="atk-grp-wrap"></div>')),
            this.$el.append(this.$grpWrap),
            this.emoticons.forEach((e, t) => {
            const i = ve('<div class="atk-grp" style="display: none;"></div>');
            this.$grpWrap.append(i),
                i.setAttribute("data-index", String(t)),
                i.setAttribute("data-grp-name", e.name),
                i.setAttribute("data-type", e.type),
                e.items.forEach((t) => {
                const n = ve('<span class="atk-item"></span>');
                if (
                    (i.append(n),
                    t.key &&
                    !new RegExp(`^(${e.name})?\\s?[0-9]+$`).test(t.key) &&
                    n.setAttribute("title", t.key),
                    "image" === e.type)
                ) {
                    const e = document.createElement("img");
                    (e.src = t.val), (e.alt = t.key), n.append(e);
                } else n.innerText = t.val;
                n.onclick = () => {
                    "image" === e.type
                    ? this.editor.insertContent(`:[${t.key}]`)
                    : this.editor.insertContent(t.val || "");
                };
                });
            }),
            (this.$grpSwitcher = ve('<div class="atk-grp-switcher"></div>')),
            this.$el.append(this.$grpSwitcher),
            this.emoticons.forEach((e, t) => {
            const i = ve("<span />");
            (i.innerText = e.name),
                i.setAttribute("data-index", String(t)),
                (i.onclick = () => this.openGrp(t)),
                this.$grpSwitcher.append(i);
            }),
            this.emoticons.length > 0 && this.openGrp(0);
        }
        openGrp(e) {
        var t;
        Array.from(this.$grpWrap.children).forEach((t) => {
            const i = t;
            i.getAttribute("data-index") !== String(e)
            ? (i.style.display = "none")
            : (i.style.display = "");
        }),
            this.$grpSwitcher
            .querySelectorAll("span.active")
            .forEach((e) => e.classList.remove("active")),
            null ==
            (t = this.$grpSwitcher.querySelector(`span[data-index="${e}"]`)) ||
            t.classList.add("active"),
            this.changeListHeight();
        }
        getEl() {
        return this.$el;
        }
        changeListHeight() {}
        onShow() {
        (() => {
            __async(this, null, function* () {
            yield this.loadEmoticonsData(),
                this.isImgLoaded ||
                (this.initEmoticonsList(), (this.isImgLoaded = !0)),
                setTimeout(() => {
                this.changeListHeight();
                }, 30);
            });
        })();
        }
        onHide() {
        this.$el.parentElement.style.height = "";
        }
        transEmoticonImageText(e) {
        return this.emoticons && Array.isArray(this.emoticons)
            ? (this.emoticons.forEach((t) => {
                "image" === t.type &&
                Object.entries(t.items).forEach(([t, i]) => {
                    e = e
                    .split(`:[${i.key}]`)
                    .join(`<img src="${i.val}" atk-emoticon="${i.key}">`);
                });
            }),
            e)
            : e;
        }
    }
    __publicField(Xe, "Name", "emoticons"), __publicField(Xe, "BtnHTML", "表情");
    class Je extends Ye {
        constructor(e) {
        super(e),
            __publicField(this, "$el"),
            __publicField(this, "binded", !1),
            this.initEl();
        }
        initEl() {
        (this.$el = ve('<div class="atk-editor-plug-preview"></div>')),
            (this.binded = !1);
        }
        getEl() {
        return this.$el;
        }
        onShow() {
        if ((this.updateContent(), !this.binded)) {
            const e = () => {
            this.updateContent();
            };
            this.editor.$textarea.addEventListener("input", e),
            this.editor.$textarea.addEventListener("change", e),
            (this.binded = !0);
        }
        }
        onHide() {}
        updateContent() {
        "none" !== this.$el.style.display &&
            (this.$el.innerHTML = this.editor.getContentMarked());
        }
    }
    __publicField(Je, "Name", "preview"),
        __publicField(
        Je,
        "BtnHTML",
        '预览 <i title="Markdown is supported"><svg class="markdown" viewBox="0 0 16 16" version="1.1" width="16" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M14.85 3H1.15C.52 3 0 3.52 0 4.15v7.69C0 12.48.52 13 1.15 13h13.69c.64 0 1.15-.52 1.15-1.15v-7.7C16 3.52 15.48 3 14.85 3zM9 11H7V8L5.5 9.92 4 8v3H2V5h2l1.5 2L7 5h2v6zm2.99.5L9.5 8H11V5h2v3h1.5l-2.51 3.5z"></path></svg></i>'
        );
    class et extends i {
        constructor(e) {
        super(e),
            __publicField(this, "LOADABLE_PLUG_LIST", [Xe, Je]),
            __publicField(this, "plugList", {}),
            __publicField(this, "$header"),
            __publicField(this, "$textareaWrap"),
            __publicField(this, "$textarea"),
            __publicField(this, "$plugWrap"),
            __publicField(this, "$bottom"),
            __publicField(this, "$plugBtnWrap"),
            __publicField(this, "$imgUploadBtn"),
            __publicField(this, "$imgUploadInput"),
            __publicField(this, "$submitBtn"),
            __publicField(this, "$notifyWrap"),
            __publicField(this, "replyComment", null),
            __publicField(this, "$sendReply", null),
            __publicField(this, "isTraveling", !1),
            __publicField(this, "queryUserInfo", {
            timeout: null,
            abortFunc: null,
            }),
            __publicField(this, "openedPlugName", null),
            __publicField(this, "allowImgExts", [
            "png",
            "jpg",
            "jpeg",
            "gif",
            "bmp",
            "svg",
            "webp",
            ]),
            (this.$el = ve(
            '<div class="atk-main-editor">\n  <div class="atk-header">\n    <input name="nick" placeholder="昵称" class="atk-nick" type="text" required="required">\n    <input name="email" placeholder="邮箱" class="atk-email" type="email" required="required">\n    <input name="link" placeholder="网址 (https://)" class="atk-link" type="url">\n  </div>\n  <div class="atk-textarea-wrap">\n    <textarea class="atk-textarea" placeholder=""></textarea>\n  </div>\n  <div class="atk-plug-wrap" style="display: none;"></div>\n  <div class="atk-bottom">\n    <div class="atk-item atk-plug-btn-wrap"></div>\n    <div class="atk-item">\n      <button type="button" class="atk-send-btn"></button>\n    </div>\n  </div>\n  <div class="atk-notify-wrap"></div>\n</div>\n'
            )),
            (this.$header = this.$el.querySelector(".atk-header")),
            (this.$textareaWrap = this.$el.querySelector(".atk-textarea-wrap")),
            (this.$textarea = this.$el.querySelector(".atk-textarea")),
            (this.$plugWrap = this.$el.querySelector(".atk-plug-wrap")),
            (this.$bottom = this.$el.querySelector(".atk-bottom")),
            (this.$plugBtnWrap = this.$el.querySelector(".atk-plug-btn-wrap")),
            (this.$submitBtn = this.$el.querySelector(".atk-send-btn")),
            (this.$notifyWrap = this.$el.querySelector(".atk-notify-wrap")),
            this.initLocalStorage(),
            this.initHeader(),
            this.initTextarea(),
            this.initEditorPlug(),
            this.initBottomPart(),
            this.ctx.on("editor-open", () => this.open()),
            this.ctx.on("editor-close", () => this.close()),
            this.ctx.on("editor-reply", (e) =>
            this.setReply(e.data, e.$el, e.scroll)
            ),
            this.ctx.on("editor-reply-cancel", () => this.cancelReply()),
            this.ctx.on("editor-show-loading", () => Oe(this.$el)),
            this.ctx.on("editor-hide-loading", () => Me(this.$el)),
            this.ctx.on("editor-notify", (e) => this.showNotify(e.msg, e.type)),
            this.ctx.on("editor-travel", (e) => this.travel(e)),
            this.ctx.on("editor-travel-back", () => this.travelBack()),
            this.ctx.on("conf-updated", () => this.refreshUploadBtn());
        }
        get user() {
        return this.ctx.user;
        }
        initLocalStorage() {
        const e = window.localStorage.getItem("ArtalkContent") || "";
        "" !== e.trim() &&
            (this.showNotify("已自动恢复", "i"), this.setContent(e)),
            this.$textarea.addEventListener("input", () => {
            this.saveContent();
            });
        }
        initHeader() {
        Object.keys(this.user.data).forEach((e) => {
            const t = this.getInputEl(e);
            t &&
            t instanceof HTMLInputElement &&
            ((t.value = this.user.data[e] || ""),
            t.addEventListener("input", () => this.onHeaderInput(e, t)));
        });
        const e = this.getInputEl("link");
        e &&
            e.addEventListener("change", () => {
            const t = e.value.trim();
            t &&
                !/^(http|https):\/\//.test(t) &&
                ((e.value = `https://${t}`),
                (this.user.data.link = e.value),
                this.saveUser());
            });
        }
        getInputEl(e) {
        return this.$header.querySelector(`[name="${e}"]`);
        }
        onHeaderInput(e, t) {
        (this.user.data[e] = t.value.trim()),
            ("nick" !== e && "email" !== e) ||
            ((this.user.data.token = ""),
            (this.user.data.isAdmin = !1),
            null !== this.queryUserInfo.timeout &&
                window.clearTimeout(this.queryUserInfo.timeout),
            null !== this.queryUserInfo.abortFunc &&
                this.queryUserInfo.abortFunc(),
            (this.queryUserInfo.timeout = window.setTimeout(() => {
                this.queryUserInfo.timeout = null;
                const { req: e, abort: t } = new Ve(this.ctx).userGet(
                this.user.data.nick,
                this.user.data.email
                );
                (this.queryUserInfo.abortFunc = t),
                e
                    .then((e) => {
                    e.is_login ||
                        ((this.user.data.token = ""),
                        (this.user.data.isAdmin = !1)),
                        this.ctx.trigger("unread-update", { notifies: e.unread }),
                        this.user.checkHasBasicUserInfo() &&
                        !e.is_login &&
                        e.user &&
                        e.user.is_admin &&
                        this.showLoginDialog(),
                        e.user &&
                        e.user.link &&
                        ((this.user.data.link = e.user.link),
                        (this.getInputEl("link").value = e.user.link));
                    })
                    .catch(() => {})
                    .finally(() => {
                    this.queryUserInfo.abortFunc = null;
                    });
            }, 400))),
            this.saveUser();
        }
        showLoginDialog() {
        this.ctx.trigger("checker-admin", { onSuccess: () => {} });
        }
        saveUser() {
        this.user.save(), this.ctx.trigger("user-changed", this.ctx.user.data);
        }
        saveContent() {
        window.localStorage.setItem(
            "ArtalkContent",
            this.getContentOriginal().trim()
        );
        }
        initTextarea() {
        (this.$textarea.placeholder = this.ctx.conf.placeholder || ""),
            this.$textarea.addEventListener("keydown", (e) => {
            9 === (e.keyCode || e.which) &&
                (e.preventDefault(), this.insertContent("\t"));
            }),
            this.$textarea.addEventListener("input", (e) => {
            this.adjustTextareaHeight();
            });
        }
        adjustTextareaHeight() {
        const e = this.$textarea.offsetHeight - this.$textarea.clientHeight;
        (this.$textarea.style.height = "0px"),
            (this.$textarea.style.height = `${this.$textarea.scrollHeight + e}px`);
        }
        initEditorPlug() {
        if (
            ((this.plugList = {}),
            (this.$plugWrap.innerHTML = ""),
            (this.$plugWrap.style.display = "none"),
            (this.openedPlugName = null),
            (this.$plugBtnWrap.innerHTML = ""),
            this.LOADABLE_PLUG_LIST.forEach((e) => {
            if ("emoticons" === e.Name && !this.conf.emoticons) return;
            const t = ve(
                `<span class="atk-plug-btn" data-plug-name="${e.Name}">${e.BtnHTML}</span>`
            );
            this.$plugBtnWrap.appendChild(t),
                t.addEventListener("click", () => {
                let i = this.plugList[e.Name];
                if (
                    (i || ((i = new e(this)), (this.plugList[e.Name] = i)),
                    this.$plugBtnWrap
                    .querySelectorAll(".active")
                    .forEach((e) => e.classList.remove("active")),
                    e.Name === this.openedPlugName)
                )
                    return (
                    i.onHide(),
                    (this.$plugWrap.style.display = "none"),
                    void (this.openedPlugName = null)
                    );
                if (
                    null ===
                    this.$plugWrap.querySelector(`[data-plug-name="${e.Name}"]`)
                ) {
                    const t = i.getEl();
                    t.setAttribute("data-plug-name", e.Name),
                    (t.style.display = "none"),
                    this.$plugWrap.appendChild(t);
                }
                Array.from(this.$plugWrap.children).forEach((t) => {
                    const i = t.getAttribute("data-plug-name");
                    i === e.Name
                    ? ((t.style.display = ""), this.plugList[i].onShow())
                    : ((t.style.display = "none"), this.plugList[i].onHide());
                }),
                    (this.$plugWrap.style.display = ""),
                    (this.openedPlugName = e.Name),
                    t.classList.add("active");
                });
            }),
            this.conf.emoticons)
        ) {
            const e = new Xe(this);
            (this.plugList[Xe.Name] = e),
            window.setTimeout(() => {
                e.loadEmoticonsData();
            }, 1e3);
        }
        this.initImgUpload();
        }
        closePlug() {
        (this.$plugWrap.innerHTML = ""),
            (this.$plugWrap.style.display = "none"),
            (this.openedPlugName = null);
        }
        initImgUpload() {
        (this.$imgUploadBtn = ve('<span class="atk-plug-btn">图片</span>')),
            this.$plugBtnWrap
            .querySelector('[data-plug-name="preview"]')
            .before(this.$imgUploadBtn),
            (this.$imgUploadInput = document.createElement("input")),
            (this.$imgUploadInput.type = "file"),
            (this.$imgUploadInput.style.display = "none"),
            (this.$imgUploadInput.accept = this.allowImgExts
            .map((e) => `.${e}`)
            .join(",")),
            this.$imgUploadBtn.after(this.$imgUploadInput),
            (this.$imgUploadBtn.onclick = () => {
            const e = this.$imgUploadInput;
            (e.onchange = () => {
                (() => {
                __async(this, null, function* () {
                    if (!e.files || 0 === e.files.length) return;
                    const t = e.files[0];
                    this.uploadImg(t);
                });
                })();
            }),
                e.click();
            });
        const e = (e) => {
            if (e)
            for (let t = 0; t < e.length; t++) {
                const i = e[t];
                this.uploadImg(i);
            }
        };
        this.$textarea.addEventListener("dragover", (e) => {
            e.stopPropagation(), e.preventDefault();
        }),
            this.$textarea.addEventListener("drop", (t) => {
            var i;
            const n = null == (i = t.dataTransfer) ? void 0 : i.files;
            (null == n ? void 0 : n.length) && (t.preventDefault(), e(n));
            }),
            this.$textarea.addEventListener("paste", (t) => {
            var i;
            const n = null == (i = t.clipboardData) ? void 0 : i.files;
            (null == n ? void 0 : n.length) && (t.preventDefault(), e(n));
            });
        }
        refreshUploadBtn() {
        this.$imgUploadBtn &&
            (this.ctx.conf.imgUpload ||
            (this.$imgUploadBtn.setAttribute("atk-only-admin-show", ""),
            this.ctx.trigger("check-admin-show-el")));
        }
        uploadImg(e) {
        return __async(this, null, function* () {
            const t = /[^.]+$/.exec(e.name);
            if (!t || !this.allowImgExts.includes(t[0])) return;
            if (!this.ctx.user.checkHasBasicUserInfo())
            return void this.showNotify("填入你的名字邮箱才能上传哦", "w");
            let i = "\n";
            "" === this.$textarea.value.trim() && (i = "");
            const n = `${i}![](Uploading ${e.name}...)`;
            let s;
            this.insertContent(n);
            try {
            s = yield new Ve(this.ctx).imgUpload(e);
            } catch (r) {
            console.error(r), this.showNotify(`图片上传失败，${r.msg}`, "e");
            }
            if (s && s.img_url) {
            let e = s.img_url;
            (function (e) {
                let t;
                try {
                t = new URL(e);
                } catch (i) {
                return !1;
                }
                return "http:" === t.protocol || "https:" === t.protocol;
            })(e) || (e = Re(this.ctx, e)),
                this.setContent(this.$textarea.value.replace(n, `${i}![](${e})`));
            } else this.setContent(this.$textarea.value.replace(n, ""));
        });
        }
        insertContent(e) {
        if (document.selection)
            this.$textarea.focus(),
            (document.selection.createRange().text = e),
            this.$textarea.focus();
        else if (
            this.$textarea.selectionStart ||
            0 === this.$textarea.selectionStart
        ) {
            const t = this.$textarea.selectionStart,
            i = this.$textarea.selectionEnd,
            n = this.$textarea.scrollTop;
            this.setContent(
            this.$textarea.value.substring(0, t) +
                e +
                this.$textarea.value.substring(i, this.$textarea.value.length)
            ),
            this.$textarea.focus(),
            (this.$textarea.selectionStart = t + e.length),
            (this.$textarea.selectionEnd = t + e.length),
            (this.$textarea.scrollTop = n);
        } else this.$textarea.focus(), (this.$textarea.value += e);
        }
        setContent(e) {
        (this.$textarea.value = e),
            this.saveContent(),
            this.plugList &&
            this.plugList.preview &&
            this.plugList.preview.updateContent(),
            window.setTimeout(() => {
            this.adjustTextareaHeight();
            }, 80);
        }
        clearEditor() {
        this.setContent(""), this.cancelReply();
        }
        getFinalContent() {
        let e = this.getContentOriginal();
        if (this.plugList && this.plugList.emoticons) {
            e = this.plugList.emoticons.transEmoticonImageText(e);
        }
        return e;
        }
        getContentOriginal() {
        return this.$textarea.value || "";
        }
        getContentMarked() {
        return Ae(this.ctx, this.getFinalContent());
        }
        initBottomPart() {
        this.initReply(), this.initSubmit();
        }
        initReply() {
        (this.replyComment = null), (this.$sendReply = null);
        }
        setReply(e, t, i = !0) {
        null !== this.replyComment && this.cancelReply(),
            null === this.$sendReply &&
            ((this.$sendReply = ve(
                '<div class="atk-send-reply">回复 <span class="atk-text"></span><span class="atk-cancel" title="取消 AT">×</span></div>'
            )),
            (this.$sendReply.querySelector(".atk-text").innerText = `@${e.nick}`),
            this.$sendReply.addEventListener("click", () => {
                this.cancelReply();
            }),
            this.$textareaWrap.append(this.$sendReply)),
            (this.replyComment = e),
            !0 === this.ctx.conf.editorTravel && this.travel(t),
            i && Ie(this.$el),
            this.$textarea.focus();
        }
        cancelReply() {
        null !== this.$sendReply &&
            (this.$sendReply.remove(), (this.$sendReply = null)),
            (this.replyComment = null),
            !0 === this.ctx.conf.editorTravel && this.travelBack();
        }
        initSubmit() {
        (this.$submitBtn.innerText = this.ctx.conf.sendBtn || "Send"),
            this.$submitBtn.addEventListener("click", (e) => {
            e.currentTarget, this.submit();
            });
        }
        submit() {
        return __async(this, null, function* () {
            if ("" !== this.getFinalContent().trim()) {
            this.ctx.trigger("editor-submit"), Oe(this.$el);
            try {
                const e = yield new Ve(this.ctx).add({
                content: this.getFinalContent(),
                nick: this.user.data.nick,
                email: this.user.data.email,
                link: this.user.data.link,
                rid: null === this.replyComment ? 0 : this.replyComment.id,
                page_key:
                    null === this.replyComment
                    ? this.ctx.conf.pageKey
                    : this.replyComment.page_key,
                page_title:
                    null === this.replyComment ? this.ctx.conf.pageTitle : void 0,
                site_name:
                    null === this.replyComment
                    ? this.ctx.conf.site
                    : this.replyComment.site_name,
                });
                null !== this.replyComment &&
                this.replyComment.page_key !== this.ctx.conf.pageKey &&
                window.open(`${this.replyComment.page_url}#atk-comment-${e.id}`),
                this.ctx.trigger("list-insert", e),
                this.clearEditor(),
                this.ctx.trigger("editor-submitted");
            } catch (e) {
                return (
                console.error(e),
                void this.showNotify(`评论失败，${e.msg || String(e)}`, "e")
                );
            } finally {
                Me(this.$el);
            }
            } else this.$textarea.focus();
        });
        }
        showNotify(e, t) {
        Ue(this.$notifyWrap, e, t);
        }
        close() {
        this.$textareaWrap.querySelector(".atk-comment-closed") ||
            this.$textareaWrap.prepend(
            ve('<div class="atk-comment-closed">仅管理员可评论</div>')
            ),
            this.user.data.isAdmin
            ? ((this.$textarea.style.display = ""),
                (this.$bottom.style.display = ""))
            : ((this.$textarea.style.display = "none"),
                this.closePlug(),
                (this.$bottom.style.display = "none"));
        }
        open() {
        var e;
        null == (e = this.$textareaWrap.querySelector(".atk-comment-closed")) ||
            e.remove(),
            (this.$textarea.style.display = ""),
            (this.$bottom.style.display = "");
        }
        travel(e) {
        if (this.isTraveling) return;
        (this.isTraveling = !0),
            this.$el.after(ve('<div class="atk-editor-travel-placeholder"></div>'));
        const t = ve("<div></div>");
        e.after(t),
            t.replaceWith(this.$el),
            this.$el.classList.add("atk-fade-in");
        }
        travelBack() {
        var e;
        this.isTraveling &&
            ((this.isTraveling = !1),
            null ==
            (e = this.ctx.$root.querySelector(
                ".atk-editor-travel-placeholder"
            )) || e.replaceWith(this.$el),
            null !== this.replyComment && this.cancelReply());
        }
        initRemoteEmoticons() {}
    }
    const tt = window || {},
        it = navigator || {};
    function nt(e) {
        const t = String(e || it.userAgent),
        i = {
            os: "",
            osVersion: "",
            engine: "",
            browser: "",
            device: "",
            language: "",
            version: "",
        },
        n = {
            Trident: t.includes("Trident") || t.includes("NET CLR"),
            Presto: t.includes("Presto"),
            WebKit: t.includes("AppleWebKit"),
            Gecko: t.includes("Gecko/"),
        },
        s = {
            Safari: t.includes("Safari"),
            Chrome: t.includes("Chrome") || t.includes("CriOS"),
            IE: t.includes("MSIE") || t.includes("Trident"),
            Edge: t.includes("Edge") || t.includes("Edg"),
            Firefox: t.includes("Firefox") || t.includes("FxiOS"),
            "Firefox Focus": t.includes("Focus"),
            Chromium: t.includes("Chromium"),
            Opera: t.includes("Opera") || t.includes("OPR"),
            Vivaldi: t.includes("Vivaldi"),
            Yandex: t.includes("YaBrowser"),
            Kindle: t.includes("Kindle") || t.includes("Silk/"),
            360: t.includes("360EE") || t.includes("360SE"),
            UC: t.includes("UC") || t.includes(" UBrowser"),
            QQBrowser: t.includes("QQBrowser"),
            QQ: t.includes("QQ/"),
            Baidu: t.includes("Baidu") || t.includes("BIDUBrowser"),
            Maxthon: t.includes("Maxthon"),
            Sogou: t.includes("MetaSr") || t.includes("Sogou"),
            LBBROWSER: t.includes("LBBROWSER"),
            "2345Explorer": t.includes("2345Explorer"),
            TheWorld: t.includes("TheWorld"),
            MIUI: t.includes("MiuiBrowser"),
            Quark: t.includes("Quark"),
            Qiyu: t.includes("Qiyu"),
            Wechat: t.includes("MicroMessenger"),
            Taobao: t.includes("AliApp(TB"),
            Alipay: t.includes("AliApp(AP"),
            Weibo: t.includes("Weibo"),
            Douban: t.includes("com.douban.frodo"),
            Suning: t.includes("SNEBUY-APP"),
            iQiYi: t.includes("IqiyiApp"),
        },
        r = {
            Windows: t.includes("Windows"),
            Linux: t.includes("Linux") || t.includes("X11"),
            macOS: t.includes("Macintosh"),
            Android: t.includes("Android") || t.includes("Adr"),
            Ubuntu: t.includes("Ubuntu"),
            FreeBSD: t.includes("FreeBSD"),
            Debian: t.includes("Debian"),
            "Windows Phone": t.includes("IEMobile") || t.includes("Windows Phone"),
            BlackBerry: t.includes("BlackBerry") || t.includes("RIM"),
            MeeGo: t.includes("MeeGo"),
            Symbian: t.includes("Symbian"),
            iOS: t.includes("like Mac OS X"),
            "Chrome OS": t.includes("CrOS"),
            WebOS: t.includes("hpwOS"),
        },
        a = {
            Mobile: t.includes("Mobi") || t.includes("iPh") || t.includes("480"),
            Tablet:
            t.includes("Tablet") || t.includes("Pad") || t.includes("Nexus 7"),
        };
        a.Mobile
        ? (a.Mobile = !t.includes("iPad"))
        : s.Chrome && t.includes("Edg")
        ? ((s.Chrome = !1), (s.Edge = !0))
        : tt.showModalDialog && tt.chrome && ((s.Chrome = !1), (s[360] = !0)),
        (i.device = "PC"),
        (i.language = (() => {
            const e = (it.browserLanguage || it.language).split("-");
            return e[1] && (e[1] = e[1].toUpperCase()), e.join("_");
        })());
        const o = { engine: n, browser: s, os: r, device: a };
        Object.entries(o).forEach(([e, t]) => {
        Object.entries(t).forEach(([t, n]) => {
            !0 === n && (i[e] = t);
        });
        });
        const l = {
        Windows: () => {
            const e = t.replace(/^.*Windows NT ([\d.]+);.*$/, "$1");
            return (
            {
                6.4: "10",
                6.3: "8.1",
                6.2: "8",
                6.1: "7",
                "6.0": "Vista",
                5.2: "XP",
                5.1: "XP",
                "5.0": "2000",
                "10.0": "10",
                "11.0": "11",
            }[e] || e
            );
        },
        Android: () => t.replace(/^.*Android ([\d.]+);.*$/, "$1"),
        iOS: () => t.replace(/^.*OS ([\d_]+) like.*$/, "$1").replace(/_/g, "."),
        Debian: () => t.replace(/^.*Debian\/([\d.]+).*$/, "$1"),
        "Windows Phone": () =>
            t.replace(/^.*Windows Phone( OS)? ([\d.]+);.*$/, "$2"),
        macOS: () =>
            t.replace(/^.*Mac OS X ([\d_]+).*$/, "$1").replace(/_/g, "."),
        WebOS: () => t.replace(/^.*hpwOS\/([\d.]+);.*$/, "$1"),
        };
        (i.osVersion = ""),
        l[i.os] &&
            ((i.osVersion = l[i.os]()), i.osVersion === t && (i.osVersion = ""));
        const c = {
        Safari: () => t.replace(/^.*Version\/([\d.]+).*$/, "$1"),
        Chrome: () =>
            t
            .replace(/^.*Chrome\/([\d.]+).*$/, "$1")
            .replace(/^.*CriOS\/([\d.]+).*$/, "$1"),
        IE: () =>
            t
            .replace(/^.*MSIE ([\d.]+).*$/, "$1")
            .replace(/^.*rv:([\d.]+).*$/, "$1"),
        Edge: () => t.replace(/^.*(Edge|Edg|Edg[A-Z]{1})\/([\d.]+).*$/, "$2"),
        Firefox: () =>
            t
            .replace(/^.*Firefox\/([\d.]+).*$/, "$1")
            .replace(/^.*FxiOS\/([\d.]+).*$/, "$1"),
        "Firefox Focus": () => t.replace(/^.*Focus\/([\d.]+).*$/, "$1"),
        Chromium: () => t.replace(/^.*Chromium\/([\d.]+).*$/, "$1"),
        Opera: () =>
            t
            .replace(/^.*Opera\/([\d.]+).*$/, "$1")
            .replace(/^.*OPR\/([\d.]+).*$/, "$1"),
        Vivaldi: () => t.replace(/^.*Vivaldi\/([\d.]+).*$/, "$1"),
        Yandex: () => t.replace(/^.*YaBrowser\/([\d.]+).*$/, "$1"),
        Kindle: () => t.replace(/^.*Version\/([\d.]+).*$/, "$1"),
        Maxthon: () => t.replace(/^.*Maxthon\/([\d.]+).*$/, "$1"),
        QQBrowser: () => t.replace(/^.*QQBrowser\/([\d.]+).*$/, "$1"),
        QQ: () => t.replace(/^.*QQ\/([\d.]+).*$/, "$1"),
        Baidu: () => t.replace(/^.*BIDUBrowser[\s/]([\d.]+).*$/, "$1"),
        UC: () => t.replace(/^.*UC?Browser\/([\d.]+).*$/, "$1"),
        Sogou: () =>
            t
            .replace(/^.*SE ([\d.X]+).*$/, "$1")
            .replace(/^.*SogouMobileBrowser\/([\d.]+).*$/, "$1"),
        "2345Explorer": () => t.replace(/^.*2345Explorer\/([\d.]+).*$/, "$1"),
        TheWorld: () => t.replace(/^.*TheWorld ([\d.]+).*$/, "$1"),
        MIUI: () => t.replace(/^.*MiuiBrowser\/([\d.]+).*$/, "$1"),
        Quark: () => t.replace(/^.*Quark\/([\d.]+).*$/, "$1"),
        Qiyu: () => t.replace(/^.*Qiyu\/([\d.]+).*$/, "$1"),
        Wechat: () => t.replace(/^.*MicroMessenger\/([\d.]+).*$/, "$1"),
        Taobao: () => t.replace(/^.*AliApp\(TB\/([\d.]+).*$/, "$1"),
        Alipay: () => t.replace(/^.*AliApp\(AP\/([\d.]+).*$/, "$1"),
        Weibo: () => t.replace(/^.*weibo__([\d.]+).*$/, "$1"),
        Douban: () => t.replace(/^.*com.douban.frodo\/([\d.]+).*$/, "$1"),
        Suning: () => t.replace(/^.*SNEBUY-APP([\d.]+).*$/, "$1"),
        iQiYi: () => t.replace(/^.*IqiyiVersion\/([\d.]+).*$/, "$1"),
        };
        return (
        (i.version = ""),
        c[i.browser] &&
            ((i.version = c[i.browser]()), i.version === t && (i.version = "")),
        i.version.indexOf(".") &&
            (i.version = i.version.substring(0, i.version.indexOf("."))),
        "iOS" === i.os && t.includes("iPad")
            ? (i.os = "iPadOS")
            : "Edge" !== i.browser || t.includes("Edg")
            ? "MIUI" === i.browser
            ? (i.os = "Android")
            : ("Chrome" === i.browser && Number(i.version) > 27) ||
                ("Opera" === i.browser && Number(i.version) > 12) ||
                "Yandex" === i.browser
            ? (i.engine = "Blink")
            : void 0 === i.browser && (i.browser = "Unknow App")
            : (i.engine = "EdgeHTML"),
        i
        );
    }
    class st {
        constructor(e) {
        __publicField(this, "conf"),
            __publicField(this, "$el"),
            __publicField(this, "isLoading", !1),
            __publicField(this, "msgRecTimer"),
            __publicField(this, "msgRecTimerFunc"),
            __publicField(this, "isConfirming", !1),
            __publicField(this, "confirmRecTimer"),
            (this.$el = ve('<span class="atk-common-action-btn"></span>')),
            (this.conf = "object" != typeof e ? { text: e } : e),
            (this.$el.innerText = this.getText()),
            this.conf.adminOnly && this.$el.setAttribute("atk-only-admin-show", "");
        }
        get isMessaging() {
        return !!this.msgRecTimer;
        }
        appendTo(e) {
        return e.append(this.$el), this;
        }
        getText() {
        return "string" == typeof this.conf.text
            ? this.conf.text
            : this.conf.text();
        }
        setClick(e) {
        this.$el.onclick = (t) => {
            if ((t.stopPropagation(), !this.isLoading)) {
            if (this.conf.confirm && !this.isMessaging) {
                const e = () => {
                (this.isConfirming = !1),
                    this.$el.classList.remove("atk-btn-confirm"),
                    (this.$el.innerText = this.getText());
                };
                if (!this.isConfirming)
                return (
                    (this.isConfirming = !0),
                    this.$el.classList.add("atk-btn-confirm"),
                    (this.$el.innerText = this.conf.confirmText || "确认操作"),
                    void (this.confirmRecTimer = window.setTimeout(() => e(), 5e3))
                );
                this.confirmRecTimer && window.clearTimeout(this.confirmRecTimer),
                e();
            }
            if (this.msgRecTimer)
                return this.fireMsgRecTimer(), void this.clearMsgRecTimer();
            e();
            }
        };
        }
        updateText(e) {
        e && (this.conf.text = e),
            this.setLoading(!1),
            (this.$el.innerText = this.getText());
        }
        setLoading(e, t) {
        this.isLoading !== e &&
            ((this.isLoading = e),
            e
            ? (this.$el.classList.add("atk-btn-loading"),
                (this.$el.innerText = t || "加载中..."))
            : (this.$el.classList.remove("atk-btn-loading"),
                (this.$el.innerText = this.getText())));
        }
        setError(e) {
        this.setMsg(e, "atk-btn-error");
        }
        setWarn(e) {
        this.setMsg(e, "atk-btn-warn");
        }
        setSuccess(e) {
        this.setMsg(e, "atk-btn-success");
        }
        setMsg(e, t, i, n) {
        this.setLoading(!1),
            t && this.$el.classList.add(t),
            (this.$el.innerText = e),
            this.setMsgRecTimer(() => {
            (this.$el.innerText = this.getText()),
                t && this.$el.classList.remove(t),
                n && n();
            }, i || 2500);
        }
        setMsgRecTimer(e, t) {
        this.fireMsgRecTimer(),
            this.clearMsgRecTimer(),
            (this.msgRecTimerFunc = e),
            (this.msgRecTimer = window.setTimeout(() => {
            e(), this.clearMsgRecTimer();
            }, t));
        }
        fireMsgRecTimer() {
        this.msgRecTimerFunc && this.msgRecTimerFunc();
        }
        clearMsgRecTimer() {
        this.msgRecTimer && window.clearTimeout(this.msgRecTimer),
            (this.msgRecTimer = void 0),
            (this.msgRecTimerFunc = void 0);
        }
    }
    class rt extends i {
        constructor(e, t) {
        super(e),
            __publicField(this, "data"),
            __publicField(this, "$main"),
            __publicField(this, "$header"),
            __publicField(this, "$headerNick"),
            __publicField(this, "$headerBadge"),
            __publicField(this, "$body"),
            __publicField(this, "$content"),
            __publicField(this, "$children"),
            __publicField(this, "$actions"),
            __publicField(this, "voteBtnUp"),
            __publicField(this, "voteBtnDown"),
            __publicField(this, "parent"),
            __publicField(this, "nestCurt"),
            __publicField(this, "nestMax"),
            __publicField(this, "children", []),
            __publicField(this, "flatMode", !1),
            __publicField(this, "replyTo"),
            __publicField(this, "$replyTo"),
            __publicField(this, "$replyAt"),
            __publicField(this, "afterRender"),
            __publicField(this, "unread", !1),
            __publicField(this, "openable", !1),
            __publicField(this, "openURL"),
            __publicField(this, "openEvt"),
            __publicField(this, "onReplyBtnClick"),
            __publicField(this, "onDelete"),
            (this.nestMax = e.conf.nestMax || 3),
            (this.data = __spreadValues({}, t)),
            (this.data.date = this.data.date.replace(/-/g, "/")),
            (this.parent = null),
            (this.nestCurt = 1);
        }
        render() {
        return (
            (this.$el = ve(
            '<div class="atk-comment-wrap">\n  <div class="atk-comment">\n    <div class="atk-avatar"></div>\n    <div class="atk-main">\n      <div class="atk-header">\n        <span class="atk-item atk-nick"></span>\n        <span class="atk-item atk-badge"></span>\n        <span class="atk-item atk-date"></span>\n      </div>\n      <div class="atk-body">\n        <div class="atk-content"></div>\n      </div>\n      <div class="atk-footer">\n        <div class="atk-actions"></div>\n      </div>\n    </div>\n  </div>\n</div>\n'
            )),
            (this.$main = this.$el.querySelector(".atk-main")),
            (this.$header = this.$el.querySelector(".atk-header")),
            (this.$body = this.$el.querySelector(".atk-body")),
            (this.$content = this.$body.querySelector(".atk-content")),
            (this.$actions = this.$el.querySelector(".atk-actions")),
            (this.$children = null),
            this.$el.setAttribute("data-comment-id", `${this.data.id}`),
            this.renderCheckUnread(),
            this.renderCheckClickable(),
            this.renderAvatar(),
            this.renderHeader(),
            this.renderContent(),
            this.renderReplyAt(),
            this.renderReplyTo(),
            this.renderPending(),
            this.renderActionBtn(),
            this.afterRender && this.afterRender(),
            this.$el
        );
        }
        renderCheckUnread() {
        this.unread
            ? this.$el.classList.add("atk-unread")
            : this.$el.classList.remove("atk-unread");
        }
        renderCheckClickable() {
        this.openable
            ? this.$el.classList.add("atk-openable")
            : this.$el.classList.remove("atk-openable"),
            this.$el.addEventListener("click", (e) => {
            this.openable &&
                this.openURL &&
                (e.preventDefault(), window.open(this.openURL)),
                this.openEvt && this.openEvt();
            });
        }
        renderAvatar() {
        const e = this.$el.querySelector(".atk-avatar"),
            t = ve("<img />");
        if (((t.src = this.getGravatarUrl()), this.data.link)) {
            const i = ve(
            '<a target="_blank" rel="noreferrer noopener nofollow"></a>'
            );
            (i.href = this.data.link), i.append(t), e.append(i);
        } else e.append(t);
        }
        renderHeader() {
        if (
            ((this.$headerNick = this.$el.querySelector(".atk-nick")),
            this.data.link)
        ) {
            const e = ve(
            '<a target="_blank" rel="noreferrer noopener nofollow"></a>'
            );
            (e.innerText = this.data.nick),
            (e.href = this.data.link),
            this.$headerNick.append(e);
        } else this.$headerNick.innerText = this.data.nick;
        if (
            ((this.$headerBadge = this.$el.querySelector(".atk-badge")),
            this.data.badge_name
            ? ((this.$headerBadge.innerText = this.data.badge_name),
                this.data.badge_color &&
                (this.$headerBadge.style.backgroundColor = this.data.badge_color))
            : (this.$headerBadge.remove(), (this.$headerBadge = void 0)),
            this.data.is_pinned)
        ) {
            const e = ve('<span class="atk-item atk-pinned-badge">置顶</span>');
            this.$headerNick.insertAdjacentElement("afterend", e);
        }
        const e = this.$el.querySelector(".atk-date");
        if (
            ((e.innerText = this.getDateFormatted()),
            e.setAttribute(
            "data-atk-comment-date",
            String(+new Date(this.data.date))
            ),
            this.conf.uaBadge)
        ) {
            const e = ve('<span class="atk-ua-wrap"></span>'),
            t = ve('<span class="atk-ua ua-browser"></span>'),
            i = ve('<span class="atk-ua ua-os"></span>');
            (t.innerText = this.getUserUaBrowser()),
            (i.innerText = this.getUserUaOS()),
            e.append(t),
            e.append(i),
            this.$header.append(e);
        }
        }
        renderContent() {
        if (!this.data.is_collapsed)
            return void (this.$content.innerHTML = this.getContentMarked());
        this.$content.classList.add("atk-hide", "atk-type-collapsed");
        const e = ve(
            '\n      <div class="atk-collapsed">\n        <span class="atk-text">该评论已被系统或管理员折叠</span>\n        <span class="atk-show-btn">查看内容</span>\n      </div>'
        );
        this.$body.insertAdjacentElement("beforeend", e);
        const t = e.querySelector(".atk-show-btn");
        t.addEventListener("click", (e) => {
            e.stopPropagation(),
            this.$content.classList.contains("atk-hide")
                ? ((this.$content.innerHTML = this.getContentMarked()),
                this.$content.classList.remove("atk-hide"),
                Pe(this.$content),
                (t.innerHTML = "收起内容"))
                : ((this.$content.innerHTML = ""),
                this.$content.classList.add("atk-hide"),
                (t.innerHTML = "查看内容"));
        });
        }
        renderReplyAt() {
        if (this.flatMode || 0 === this.data.rid) return;
        if (this.$replyAt) return;
        if (!this.replyTo) return;
        (this.$replyAt = ve(
            '<span class="atk-item atk-reply-at"><span class="atk-arrow"></span><span class="atk-nick"></span></span>'
        )),
            (this.$replyAt.querySelector(
            ".atk-nick"
            ).innerText = `${this.replyTo.nick}`),
            (this.$replyAt.onclick = () => {
            this.goToReplyComment();
            });
        (this.$headerBadge || this.$headerNick).insertAdjacentElement(
            "afterend",
            this.$replyAt
        );
        }
        renderReplyTo() {
        if (!this.flatMode) return;
        if (!this.replyTo) return;
        this.$replyTo = ve(
            '\n      <div class="atk-reply-to">\n        <div class="atk-meta">回复 <span class="atk-nick"></span>:</div>\n        <div class="atk-content"></div>\n      </div>'
        );
        const e = this.$replyTo.querySelector(".atk-nick");
        (e.innerText = `@${this.replyTo.nick}`),
            (e.onclick = () => {
            this.goToReplyComment();
            });
        let t = Ae(this.ctx, this.replyTo.content);
        this.replyTo.is_collapsed && (t = "[已折叠]"),
            (this.$replyTo.querySelector(".atk-content").innerHTML = t),
            this.$body.prepend(this.$replyTo);
        }
        goToReplyComment() {
        const e = window.location.hash,
            t = `#atk-comment-${this.data.rid}`;
        (window.location.hash = t),
            t === e && window.dispatchEvent(new Event("hashchange"));
        }
        renderPending() {
        if (!this.data.is_pending) return;
        const e = ve('<div class="atk-pending">审核中，仅本人可见。</div>');
        this.$body.prepend(e);
        }
        renderActionBtn() {
        if (
            (this.ctx.conf.vote &&
            ((this.voteBtnUp = new st(
                () => `赞同 (${this.data.vote_up || 0})`
            ).appendTo(this.$actions)),
            this.voteBtnUp.setClick(() => {
                this.vote("up");
            }),
            this.ctx.conf.voteDown &&
                ((this.voteBtnDown = new st(
                () => `反对 (${this.data.vote_down || 0})`
                ).appendTo(this.$actions)),
                this.voteBtnDown.setClick(() => {
                this.vote("down");
                }))),
            this.data.is_allow_reply)
        ) {
            const e = ve("<span>回复</span>");
            this.$actions.append(e),
            e.addEventListener("click", (e) => {
                e.stopPropagation(),
                this.onReplyBtnClick
                    ? this.onReplyBtnClick()
                    : this.ctx.trigger("editor-reply", {
                        data: this.data,
                        $el: this.$el,
                    });
            });
        }
        const e = new st({
            text: () => (this.data.is_collapsed ? "取消折叠" : "折叠"),
            adminOnly: !0,
        });
        e.appendTo(this.$actions),
            e.setClick(() => {
            this.adminEdit("collapsed", e);
            });
        const t = new st({
            text: () => (this.data.is_pending ? "待审" : "已审"),
            adminOnly: !0,
        });
        t.appendTo(this.$actions),
            t.setClick(() => {
            this.adminEdit("pending", t);
            });
        const i = new st({
            text: "删除",
            confirm: !0,
            confirmText: "确认删除",
            adminOnly: !0,
        });
        i.appendTo(this.$actions),
            i.setClick(() => {
            this.adminDelete(i);
            });
        const n = new st({
            text: () => (this.data.is_pinned ? "取消置顶" : "置顶"),
            adminOnly: !0,
        });
        n.appendTo(this.$actions),
            n.setClick(() => {
            this.adminEdit("pinned", t);
            });
        }
        refreshUI() {
        const e = this.$el,
            t = this.render();
        e.replaceWith(t),
            this.playFadeInAnim(),
            this.eachComment(this.children, (e) => {
            var t;
            null == (t = e.parent) || t.getChildrenEl().appendChild(e.render()),
                e.playFadeInAnim();
            }),
            this.ctx.trigger("comments-loaded");
        }
        eachComment(e, t) {
        0 !== e.length &&
            e.every(
            (i) => !1 !== t(i, e) && (this.eachComment(i.getChildren(), t), !0)
            );
        }
        getIsRoot() {
        return 0 === this.data.rid;
        }
        getChildren() {
        return this.children;
        }
        putChild(e, t = "append") {
        (e.parent = this),
            (e.nestCurt = this.nestCurt + 1),
            this.children.push(e);
        const i = this.getChildrenEl();
        "append" === t
            ? i.append(e.getEl())
            : "prepend" === t && i.prepend(e.getEl()),
            e.playFadeInAnim(),
            e.checkHeightLimitArea("content");
        }
        getChildrenEl() {
        return (
            this.$children ||
            (this.nestCurt < this.nestMax
                ? ((this.$children = ve(
                    '<div class="atk-comment-children"></div>'
                )),
                this.$main.append(this.$children))
                : this.parent && (this.$children = this.parent.getChildrenEl())),
            this.$children
        );
        }
        getParent() {
        return this.parent;
        }
        getParents() {
        const e = [],
            t = (i) => {
            i.parent && (e.push(i.parent), t(i.parent));
            };
        return t(this), e;
        }
        getEl() {
        return this.$el;
        }
        getData() {
        return this.data;
        }
        getGravatarUrl() {
        return (
            (e = this.ctx),
            (t = this.data.email_encrypted),
            `${((null == (i = e.conf.gravatar) ? void 0 : i.mirror) || "").replace(
            /\/$/,
            ""
            )}/${t}?d=${encodeURIComponent(
            (null == (n = e.conf.gravatar) ? void 0 : n.default) || ""
            )}&s=80`
        );
        var e, t, i, n;
        }
        getContentMarked() {
        return Ae(this.ctx, this.data.content);
        }
        getDateFormatted() {
        return Ee(new Date(this.data.date));
        }
        getUserUaBrowser() {
        const e = nt(this.data.ua);
        return `${e.browser} ${e.version}`;
        }
        getUserUaOS() {
        const e = nt(this.data.ua);
        return `${e.os} ${e.osVersion}`;
        }
        playFadeInAnim() {
        Pe(this.$el);
        }
        vote(e) {
        const t = "up" === e ? this.voteBtnUp : this.voteBtnDown;
        new Ve(this.ctx)
            .vote(this.data.id, `comment_${e}`)
            .then((e) => {
            var t, i;
            (this.data.vote_up = e.up),
                (this.data.vote_down = e.down),
                null == (t = this.voteBtnUp) || t.updateText(),
                null == (i = this.voteBtnDown) || i.updateText();
            })
            .catch((e) => {
            null == t || t.setError("投票失败"), console.log(e);
            });
        }
        adminEdit(e, t) {
        if (t.isLoading) return;
        t.setLoading(!0, "修改中...");
        const i = __spreadValues({}, this.data);
        "collapsed" === e
            ? (i.is_collapsed = !i.is_collapsed)
            : "pending" === e
            ? (i.is_pending = !i.is_pending)
            : "pinned" === e && (i.is_pinned = !i.is_pinned),
            new Ve(this.ctx)
            .commentEdit(i)
            .then((e) => {
                t.setLoading(!1),
                (this.data = e),
                this.refreshUI(),
                Pe(this.$body),
                this.ctx.trigger("list-refresh-ui");
            })
            .catch((e) => {
                console.error(e), t.setError("修改失败");
            });
        }
        adminDelete(e) {
        e.isLoading ||
            (e.setLoading(!0, "删除中..."),
            new Ve(this.ctx)
            .commentDel(this.data.id, this.data.site_name)
            .then(() => {
                e.setLoading(!1), this.onDelete && this.onDelete(this);
            })
            .catch((t) => {
                console.error(t), e.setError("删除失败");
            }));
        }
        setUnread(e) {
        (this.unread = e),
            this.unread
            ? this.$el.classList.add("atk-unread")
            : this.$el.classList.remove("atk-unread");
        }
        setOpenURL(e) {
        e || ((this.openable = !1), this.$el.classList.remove("atk-openable")),
            (this.openable = !0),
            (this.openURL = e),
            this.$el.classList.add("atk-openable");
        }
        checkHeightLimit() {
        this.checkHeightLimitArea("content"),
            this.checkHeightLimitArea("children");
        }
        checkHeightLimitArea(e) {
        var t, i;
        const n = null == (t = this.ctx.conf.heightLimit) ? void 0 : t.children,
            s = null == (i = this.ctx.conf.heightLimit) ? void 0 : i.content;
        if ("children" === e && !n) return;
        if ("content" === e && !s) return;
        let r;
        "children" === e && (r = n), "content" === e && (r = s);
        const a = (e) => {
            e && we(e) > r && this.heightLimitAdd(e, r);
        };
        "children" === e
            ? a(this.$children)
            : "content" === e &&
            (a(this.$content),
            a(this.$replyTo),
            Ce(this.$content, () => {
                a(this.$content);
            }),
            this.$replyTo &&
                Ce(this.$replyTo, () => {
                a(this.$replyTo);
                }));
        }
        heightLimitRemove(e) {
        e &&
            e.classList.contains("atk-height-limit") &&
            (e.classList.remove("atk-height-limit"),
            Array.from(e.children).forEach((e) => {
            e.classList.contains("atk-height-limit-btn") && e.remove();
            }),
            (e.style.height = ""),
            (e.style.overflow = ""));
        }
        heightLimitAdd(e, t) {
        if (!e) return;
        if (e.classList.contains("atk-height-limit")) return;
        e.classList.add("atk-height-limit"),
            (e.style.height = `${t}px`),
            (e.style.overflow = "hidden");
        const i = ve('<div class="atk-height-limit-btn">阅读更多</span>');
        (i.onclick = (t) => {
            t.stopPropagation(), this.heightLimitRemove(e);
            const i = this.getChildren();
            1 === i.length && i[0].heightLimitRemove(i[0].$content);
        }),
            e.append(i);
        }
    }
    class at {
        constructor(e, t) {
        __publicField(this, "conf"),
            __publicField(this, "total"),
            __publicField(this, "$el"),
            __publicField(this, "$input"),
            __publicField(this, "inputTimer"),
            __publicField(this, "$prevBtn"),
            __publicField(this, "$nextBtn"),
            __publicField(this, "page", 1),
            (this.total = e),
            (this.conf = t),
            (this.$el = ve(
            '<div class="atk-pagination-wrap">\n        <div class="atk-pagination">\n          <div class="atk-btn atk-btn-prev">Prev</div>\n          <input type="text" class="atk-input" aria-label="Enter the number of page" />\n          <div class="atk-btn atk-btn-next">Next</div>\n        </div>\n      </div>'
            )),
            (this.$input = this.$el.querySelector(".atk-input")),
            (this.$input.value = `${this.page}`),
            (this.$input.oninput = () => this.input()),
            (this.$input.onkeydown = (e) => this.keydown(e)),
            (this.$prevBtn = this.$el.querySelector(".atk-btn-prev")),
            (this.$nextBtn = this.$el.querySelector(".atk-btn-next")),
            (this.$prevBtn.onclick = () => this.prev()),
            (this.$nextBtn.onclick = () => this.next()),
            this.checkDisabled();
        }
        get pageSize() {
        return this.conf.pageSize;
        }
        get offset() {
        return this.pageSize * (this.page - 1);
        }
        get maxPage() {
        return Math.ceil(this.total / this.pageSize);
        }
        update(e, t) {
        (this.page = Math.ceil(e / this.pageSize) + 1),
            (this.total = t),
            this.setInput(this.page),
            this.checkDisabled();
        }
        setInput(e) {
        this.$input.value = `${e}`;
        }
        input(e = !1) {
        window.clearTimeout(this.inputTimer);
        const t = this.$input.value.trim(),
            i = () => {
            if ("" === t) return void this.setInput(this.page);
            let e = Number(t);
            Number.isNaN(e) || e < 1
                ? this.setInput(this.page)
                : (e > this.maxPage &&
                    (this.setInput(this.maxPage), (e = this.maxPage)),
                this.change(e));
            };
        e ? i() : (this.inputTimer = window.setTimeout(() => i(), 800));
        }
        prev() {
        const e = this.page - 1;
        e < 1 || this.change(e);
        }
        next() {
        const e = this.page + 1;
        e > this.maxPage || this.change(e);
        }
        change(e) {
        (this.page = e),
            this.conf.onChange(this.offset),
            this.setInput(e),
            this.checkDisabled();
        }
        checkDisabled() {
        this.page + 1 > this.maxPage
            ? this.$nextBtn.classList.add("atk-disabled")
            : this.$nextBtn.classList.remove("atk-disabled"),
            this.page - 1 < 1
            ? this.$prevBtn.classList.add("atk-disabled")
            : this.$prevBtn.classList.remove("atk-disabled");
        }
        keydown(e) {
        const t = e.keyCode || e.which;
        if (38 === t) {
            const e = Number(this.$input.value) + 1;
            if (e > this.maxPage) return;
            this.setInput(e), this.input();
        } else if (40 === t) {
            const e = Number(this.$input.value) - 1;
            if (e < 1) return;
            this.setInput(e), this.input();
        } else 13 === t && this.input(!0);
        }
        setLoading(e) {
        e ? Oe(this.$el) : Me(this.$el);
        }
    }
    class ot {
        constructor(e) {
        __publicField(this, "conf"),
            __publicField(this, "$el"),
            __publicField(this, "$loading"),
            __publicField(this, "$text"),
            __publicField(this, "offset", 0),
            __publicField(this, "total", 0),
            (this.conf = e),
            (this.$el = ve(
            '<div class="atk-list-read-more" style="display: none;">\n      <div class="atk-list-read-more-inner">\n        <div class="atk-loading-icon" style="display: none;"></div>\n        <span class="atk-text">加载更多</span>\n      </div>\n    </div>'
            )),
            (this.$loading = this.$el.querySelector(".atk-loading-icon")),
            (this.$text = this.$el.querySelector(".atk-text")),
            (this.$el.onclick = () => {
            this.click();
            });
        }
        get hasMore() {
        return this.total > this.offset + this.conf.pageSize;
        }
        click() {
        this.hasMore && this.conf.onClick(this.offset + this.conf.pageSize),
            this.checkDisabled();
        }
        show() {
        this.$el.style.display = "";
        }
        hide() {
        this.$el.style.display = "none";
        }
        setLoading(e) {
        (this.$loading.style.display = e ? "" : "none"),
            (this.$text.style.display = e ? "none" : "");
        }
        showErr(e) {
        this.setLoading(!1),
            (this.$text.innerText = e),
            this.$el.classList.add("atk-err"),
            window.setTimeout(() => {
            (this.$text.innerText = "查看更多"),
                this.$el.classList.remove("atk-err");
            }, 2e3);
        }
        update(e, t) {
        (this.offset = e), (this.total = t), this.checkDisabled();
        }
        checkDisabled() {
        this.hasMore ? this.show() : this.hide();
        }
    }
    class lt extends i {
        constructor(e) {
        super(e),
            __publicField(this, "$commentsWrap"),
            __publicField(this, "commentList", []),
            __publicField(this, "data"),
            __publicField(this, "isLoading", !1),
            __publicField(this, "noCommentText", "无内容"),
            __publicField(this, "flatMode", !1),
            __publicField(this, "nestSortBy"),
            __publicField(this, "pageMode", "pagination"),
            __publicField(this, "pageSize", 20),
            __publicField(this, "scrollListenerAt"),
            __publicField(this, "repositionAt"),
            __publicField(this, "pagination"),
            __publicField(this, "readMoreBtn"),
            __publicField(this, "autoLoadScrollEvent"),
            __publicField(this, "renderComment"),
            __publicField(this, "paramsEditor"),
            __publicField(this, "onAfterLoad"),
            __publicField(this, "unread", []),
            __publicField(this, "unreadHighlight"),
            (this.$el = ve(
            '<div class="atk-list-lite">\n      <div class="atk-list-comments-wrap"></div>\n    </div>'
            )),
            (this.$commentsWrap = this.$el.querySelector(
            ".atk-list-comments-wrap"
            )),
            e.conf.noComment && (this.noCommentText = e.conf.noComment),
            (this.nestSortBy = this.ctx.conf.nestSort || "DATE_ASC"),
            window.setInterval(() => {
            this.$el.querySelectorAll("[data-atk-comment-date]").forEach((e) => {
                const t = e.getAttribute("data-atk-comment-date");
                e.innerText = Ee(new Date(Number(t)));
            });
            }, 3e4),
            this.ctx.on("unread-update", (e) => this.updateUnread(e.notifies));
        }
        get commentDataList() {
        return this.commentList.map((e) => e.data);
        }
        fetchComments(e) {
        return __async(this, null, function* () {
            if (this.isLoading) return;
            const t = () => {
            (this.isLoading = !1),
                0 === e
                ? Me(this.$el)
                : "read-more" === this.pageMode
                ? this.readMoreBtn.setLoading(!1)
                : "pagination" === this.pageMode &&
                    this.pagination.setLoading(!1);
            };
            let i;
            (() => {
            (this.isLoading = !0),
                0 === e
                ? Oe(this.$el)
                : "read-more" === this.pageMode
                ? this.readMoreBtn.setLoading(!0)
                : "pagination" === this.pageMode &&
                    this.pagination.setLoading(!0);
            })(),
            this.ctx.trigger("comments-load"),
            "read-more" === this.pageMode && 0 === e && this.clearAllComments();
            try {
            i = yield new Ve(this.ctx).get(
                e,
                this.pageSize,
                this.flatMode,
                this.paramsEditor
            );
            } catch (n) {
            throw (this.onError(n.msg || String(n), e, n.data), n);
            } finally {
            t();
            }
            qe(this.$el, null);
            try {
            this.onLoad(i, e);
            } catch (n) {
            throw (this.onError(String(n), e), n);
            } finally {
            t();
            }
        });
        }
        onLoad(e, t) {
        var i, n;
        "pagination" === this.pageMode && this.clearAllComments(),
            (this.data = e);
        const s =
            (null == (i = e.api_version) ? void 0 : i.fe_min_version) || "0.0.0";
        (this.ctx.conf.versionCheck && this.versionCheck("前端", s, "2.2.12")) ||
            (this.ctx.conf.versionCheck &&
            this.versionCheck(
                "后端",
                "2.1.6",
                null == (n = e.api_version) ? void 0 : n.version
            )) ||
            (e.conf &&
            "boolean" == typeof e.conf.img_upload &&
            (this.ctx.conf.imgUpload = e.conf.img_upload),
            this.importComments(e.comments),
            this.refreshPagination(t, this.flatMode ? e.total : e.total_roots),
            this.refreshUI(),
            this.ctx.trigger("unread-update", { notifies: e.unread || [] }),
            this.ctx.trigger("comments-loaded"),
            this.ctx.trigger("conf-updated"),
            this.onAfterLoad && this.onAfterLoad(e));
        }
        refreshPagination(e, t) {
        const i = "pagination" === this.pageMode,
            n = "read-more" === this.pageMode;
        (i ? !!this.pagination : !!this.readMoreBtn) || this.initPagination(),
            i && this.pagination.update(e, t),
            n && this.readMoreBtn.update(e, t);
        }
        initPagination() {
        var e;
        if (
            "read-more" === this.pageMode &&
            ((this.readMoreBtn = new ot({
            pageSize: this.pageSize,
            onClick: (e) =>
                __async(this, null, function* () {
                yield this.fetchComments(e);
                }),
            })),
            this.$el.append(this.readMoreBtn.$el),
            null == (e = this.conf.pagination) ? void 0 : e.autoLoad)
        ) {
            const e = this.scrollListenerAt || document;
            this.autoLoadScrollEvent &&
            e.removeEventListener("scroll", this.autoLoadScrollEvent),
            (this.autoLoadScrollEvent = () => {
                if ("read-more" !== this.pageMode) return;
                if (!this.readMoreBtn) return;
                if (!this.readMoreBtn.hasMore) return;
                if (this.isLoading) return;
                const e = this.$el.querySelector(
                ".atk-list-comments-wrap > .atk-comment-wrap:nth-last-child(3)"
                );
                e &&
                (function (e, t = document.documentElement) {
                    const i = t.clientHeight,
                    n = t.scrollTop,
                    s = n + i,
                    r = e.getBoundingClientRect();
                    return r.top + n + r.height <= s;
                })(e, this.scrollListenerAt) &&
                this.readMoreBtn.click();
            }),
            e.addEventListener("scroll", this.autoLoadScrollEvent);
        }
        "pagination" === this.pageMode &&
            ((this.pagination = new at(
            this.flatMode ? this.data.total : this.data.total_roots,
            {
                pageSize: this.pageSize,
                onChange: (e) =>
                __async(this, null, function* () {
                    if (
                    (!0 === this.ctx.conf.editorTravel &&
                        this.ctx.trigger("editor-travel-back"),
                    yield this.fetchComments(e),
                    this.repositionAt)
                    ) {
                    (this.scrollListenerAt || window).scroll({
                        top: this.repositionAt ? Le(this.repositionAt).top : 0,
                        left: 0,
                    });
                    }
                }),
            }
            )),
            this.$el.append(this.pagination.$el));
        }
        onError(e, t, i) {
        var n;
        if (
            ((e = String(e)),
            console.error(e),
            0 !== t && "read-more" === this.pageMode)
        )
            return void (null == (n = this.readMoreBtn) || n.showErr("获取失败"));
        const s = ve(`<span>${e}，无法获取评论列表数据<br/></span>`),
            r = ve('<span style="cursor:pointer;">点击重新获取</span>');
        (r.onclick = () => this.fetchComments(0)), s.appendChild(r);
        const a = ve(
            '<span atk-only-admin-show> | <span style="cursor:pointer;">打开控制台</span></span>'
        );
        s.appendChild(a),
            this.ctx.user.data.isAdmin || a.classList.add("atk-hide");
        let o = "";
        if (null == i ? void 0 : i.err_no_site) {
            const e = {
            create_name: this.ctx.conf.site,
            create_urls: `${window.location.protocol}//${window.location.host}`,
            };
            o = `sites|${JSON.stringify(e)}`;
        }
        (a.onclick = () => this.ctx.trigger("sidebar-show", { view: o })),
            qe(this.$el, s);
        }
        refreshUI() {
        const e = this.commentList.length <= 0;
        let t = this.$commentsWrap.querySelector(".atk-list-no-comment");
        e
            ? t ||
            ((t = ve('<div class="atk-list-no-comment"></div>')),
            (t.innerHTML = this.noCommentText),
            this.$commentsWrap.appendChild(t))
            : null == t || t.remove(),
            this.ctx.trigger("check-admin-show-el");
        }
        createComment(e, t) {
        t || (t = this.commentDataList);
        const i = new rt(this.ctx, e);
        return (
            (i.flatMode = this.flatMode),
            (i.afterRender = () => {
            this.renderComment && this.renderComment(i);
            }),
            (i.onDelete = (e) => {
            this.deleteComment(e), this.refreshUI();
            }),
            (i.replyTo = e.rid ? t.find((t) => t.id === e.rid) : void 0),
            i.render(),
            this.commentList.push(i),
            i
        );
        }
        importComments(e) {
        this.flatMode
            ? e.forEach((t) => {
                this.putCommentFlatMode(t, e, "append");
            })
            : this.importCommentsNest(e);
        }
        importCommentsNest(e) {
        const t = (function (e, t = "DATE_DESC", i = 2) {
            const n = [];
            e.filter((e) => 0 === e.rid).forEach((t) => {
            const s = { id: t.id, comment: t, children: [], level: 1 };
            (s.parent = s),
                n.push(s),
                (function t(n) {
                const s = e.filter((e) => e.rid === n.id);
                0 !== s.length &&
                    (n.level >= i && (n = n.parent),
                    s.forEach((e) => {
                    const i = {
                        id: e.id,
                        comment: e,
                        children: [],
                        parent: n,
                        level: n.level + 1,
                    };
                    n.children.push(i), t(i);
                    }));
                })(s);
            });
            const s = (i, n) => {
            let s = i.id - n.id;
            return (
                "DATE_ASC" === t
                ? (s = +new Date(i.comment.date) - +new Date(n.comment.date))
                : "DATE_DESC" === t
                ? (s = +new Date(n.comment.date) - +new Date(i.comment.date))
                : "SRC_INDEX" === t
                ? (s = e.indexOf(i.comment) - e.indexOf(n.comment))
                : "VOTE_UP_DESC" === t &&
                    (s = n.comment.vote_up - i.comment.vote_up),
                s
            );
            };
            return (
            (function e(t) {
                t.forEach((t) => {
                (t.children = t.children.sort(s)), e(t.children);
                });
            })(n),
            n
            );
        })(e, this.nestSortBy, this.conf.nestMax);
        t.forEach((t) => {
            const i = this.createComment(t.comment, e);
            this.$commentsWrap.appendChild(i.getEl()), i.playFadeInAnim();
            const n = this;
            !(function t(i, s) {
            s.children.forEach((s) => {
                const r = s.comment,
                a = n.createComment(r, e);
                i.putChild(a), t(a, s);
            });
            })(i, t),
            i.checkHeightLimit();
        });
        }
        putCommentFlatMode(e, t, i) {
        e.is_collapsed && (e.is_allow_reply = !1);
        const n = this.createComment(e, t);
        return (
            e.visible &&
            ("append" === i && this.$commentsWrap.append(n.getEl()),
            "prepend" === i && this.$commentsWrap.prepend(n.getEl()),
            n.playFadeInAnim()),
            n.checkHeightLimit(),
            n
        );
        }
        insertComment(e) {
        if (this.flatMode) {
            Ie(this.putCommentFlatMode(e, this.commentDataList, "prepend").getEl());
        } else {
            const t = this.createComment(e);
            if (0 === e.rid) this.$commentsWrap.prepend(t.getEl());
            else {
            const i = this.findComment(e.rid);
            i &&
                (i.putChild(
                t,
                "DATE_ASC" === this.nestSortBy ? "append" : "prepend"
                ),
                t.getParents().forEach((e) => {
                e.$children && e.heightLimitRemove(e.$children);
                }));
            }
            t.checkHeightLimit(), Ie(t.getEl()), t.playFadeInAnim();
        }
        this.data && (this.data.total += 1),
            this.refreshUI(),
            this.ctx.trigger("comments-loaded");
        }
        findComment(e) {
        return this.commentList.find((t) => t.data.id === e);
        }
        deleteComment(e) {
        let t;
        if ("number" == typeof e) {
            const i = this.findComment(e);
            if (!i) throw Error(`未找到评论 ${e}`);
            t = i;
        } else t = e;
        t.getEl().remove(),
            this.commentList.splice(this.commentList.indexOf(t), 1),
            this.data && (this.data.total -= 1),
            this.refreshUI();
        }
        clearAllComments() {
        (this.$commentsWrap.innerHTML = ""),
            (this.data = void 0),
            (this.commentList = []);
        }
        updateUnread(e) {
        (this.unread = e),
            !0 === this.unreadHighlight &&
            this.commentList.forEach((e) => {
                const t = this.unread.find((t) => t.comment_id === e.data.id);
                t
                ? (e.setUnread(!0),
                    e.setOpenURL(t.read_link),
                    (e.openEvt = () => {
                    (this.unread = this.unread.filter(
                        (t) => t.comment_id !== e.data.id
                    )),
                        this.ctx.trigger("unread-update", {
                        notifies: this.unread,
                        });
                    }))
                : e.setUnread(!1);
            });
        }
        versionCheck(e, t, i) {
        const n =
            1 ===
            (function (e, t) {
            const i = e.split("."),
                n = t.split(".");
            for (let s = 0; s < 3; s++) {
                const e = Number(i[s]),
                t = Number(n[s]);
                if (e > t) return 1;
                if (t > e) return -1;
                if (!Number.isNaN(e) && Number.isNaN(t)) return 1;
                if (Number.isNaN(e) && !Number.isNaN(t)) return -1;
            }
            return 0;
            })(t, i);
        if (n) {
            const n = ve(
                `<div>Artalk ${e}版本已过时，请更新以获得完整体验<br/>如果你是管理员，请前往 “<a href="https://artalk.js.org/" target="_blank">官方文档</a>” 获得帮助<br/><br/><span style="color: var(--at-color-meta);">当前${e}版本 ${i}，需求版本 >= ${t}</span><br/><br/></div>`
            ),
            s = ve('<span style="cursor:pointer;">忽略</span>');
            (s.onclick = () => {
            qe(this.$el.parentElement, null),
                (this.ctx.conf.versionCheck = !1),
                this.ctx.trigger("conf-updated"),
                this.fetchComments(0);
            }),
            n.append(s),
            qe(
                this.$el.parentElement,
                n,
                '<span class="atk-warn-title">Artalk Warn</span>'
            );
        }
        return n;
        }
    }
    class ct extends lt {
        constructor(e) {
        var t, i;
        const n = ve(
            '<div class="atk-list">\n  <div class="atk-list-header">\n    <div class="atk-comment-count">\n      <div class="atk-text">\n        <span class="atk-comment-count-num">0</span>\n        条评论\n      </div>\n    </div>\n    <div class="atk-right-action">\n      <span data-action="admin-close-comment" class="atk-hide" atk-only-admin-show>关闭评论</span>\n      <span data-action="open-sidebar" class="atk-hide atk-on">\n        <span class="atk-unread-badge" style="display: none;"></span>\n        <div class="atk-text">通知中心</div>\n      </span>\n    </div>\n  </div>\n  <div class="atk-list-body"></div>\n  <div class="atk-list-footer">\n    <div class="atk-copyright"></div>\n  </div>\n</div>\n'
        );
        super(e),
            __publicField(this, "$closeCommentBtn"),
            __publicField(this, "$openSidebarBtn"),
            __publicField(this, "$unreadBadge"),
            __publicField(this, "$commentCount"),
            __publicField(this, "$dropdownWrap"),
            __publicField(this, "goToCommentFounded", !1),
            __publicField(this, "goToCommentDelay", !0),
            n.querySelector(".atk-list-body").append(this.$el),
            (this.$el = n);
        let s = !1;
        "auto" === this.ctx.conf.flatMode
            ? window.matchMedia("(max-width: 768px)").matches && (s = !0)
            : !0 === this.ctx.conf.flatMode && (s = !0),
            (this.flatMode = s),
            (this.pageMode = (
            null == (t = this.conf.pagination) ? void 0 : t.readMore
            )
            ? "read-more"
            : "pagination"),
            (this.pageSize =
            (null == (i = this.conf.pagination) ? void 0 : i.pageSize) || 20),
            (this.repositionAt = this.$el),
            this.initListActionBtn(),
            (this.$commentCount = this.$el.querySelector(".atk-comment-count")),
            this.ctx.conf.listSort && this.initDropdown(),
            (this.$el.querySelector(".atk-copyright").innerHTML =
            'Powered By <a href="https://artalk.js.org" target="_blank" title="Artalk v2.2.12">Artalk</a>'),
            this.ctx.on("list-reload", () => this.fetchComments(0)),
            this.ctx.on("list-refresh-ui", () => this.refreshUI()),
            this.ctx.on("list-import", (e) => this.importComments(e)),
            this.ctx.on("list-insert", (e) => this.insertComment(e)),
            this.ctx.on("list-delete", (e) => this.deleteComment(e.id)),
            this.ctx.on("list-update", (e) => {
            e(this.data), this.refreshUI();
            }),
            this.ctx.on("unread-update", (e) => {
            var t;
            return this.showUnreadBadge(
                (null == (t = e.notifies) ? void 0 : t.length) || 0
            );
            });
        }
        initListActionBtn() {
        (this.$openSidebarBtn = this.$el.querySelector(
            '[data-action="open-sidebar"]'
        )),
            (this.$closeCommentBtn = this.$el.querySelector(
            '[data-action="admin-close-comment"]'
            )),
            (this.$unreadBadge = this.$el.querySelector(".atk-unread-badge")),
            this.$openSidebarBtn.addEventListener("click", () => {
            this.ctx.trigger("sidebar-show");
            }),
            this.$closeCommentBtn.addEventListener("click", () => {
            this.data &&
                ((this.data.page.admin_only = !this.data.page.admin_only),
                this.adminPageEditSave());
            });
        }
        refreshUI() {
        var e;
        super.refreshUI(),
            (this.$el.querySelector(".atk-comment-count-num").innerText = String(
            Number(null == (e = this.data) ? void 0 : e.total) || 0
            )),
            this.ctx.user.data.nick && this.ctx.user.data.email
            ? this.$openSidebarBtn.classList.remove("atk-hide")
            : this.$openSidebarBtn.classList.add("atk-hide"),
            this.ctx.trigger("check-admin-show-el"),
            (this.$openSidebarBtn.querySelector(".atk-text").innerText = this.ctx
            .user.data.isAdmin
            ? "控制中心"
            : "通知中心"),
            this.data && this.data.page && !0 === this.data.page.admin_only
            ? (this.ctx.trigger("editor-close"),
                (this.$closeCommentBtn.innerHTML = "打开评论"))
            : (this.ctx.trigger("editor-open"),
                (this.$closeCommentBtn.innerHTML = "关闭评论"));
        }
        onLoad(e, t) {
        super.onLoad(e, t),
            this.goToCommentFounded || this.checkGoToCommentByUrlHash(),
            !0 === this.ctx.conf.editorTravel &&
            this.ctx.trigger("editor-travel-back");
        }
        checkGoToCommentByUrlHash() {
        let e = Number(Se("atk_comment"));
        if (!e) {
            const t = window.location.hash.match(/#atk-comment-([0-9]+)/);
            if (!t || !t[1] || Number.isNaN(Number(t[1]))) return;
            e = Number(t[1]);
        }
        if (!e) return;
        const t = this.findComment(e);
        if (!t)
            return void (this.readMoreBtn
            ? this.readMoreBtn.click()
            : this.pagination && this.pagination.next());
        const i = Se("atk_notify_key");
        i &&
            new Ve(this.ctx).markRead(i).then(() => {
            (this.unread = this.unread.filter((t) => t.comment_id !== e)),
                this.ctx.trigger("unread-update", { notifies: this.unread });
            }),
            t.getParents().forEach((e) => {
            e.$children && e.heightLimitRemove(e.$children);
            });
        const n = () => {
            Ie(t.getEl(), !1),
            t.getEl().classList.remove("atk-flash-once"),
            window.setTimeout(() => {
                t.getEl().classList.add("atk-flash-once");
            }, 150);
        };
        this.goToCommentDelay ? window.setTimeout(() => n(), 350) : n(),
            (this.goToCommentFounded = !0);
        }
        adminPageEditSave() {
        this.data &&
            this.data.page &&
            (this.ctx.trigger("editor-show-loading"),
            new Ve(this.ctx)
            .pageEdit(this.data.page)
            .then((e) => {
                this.data && (this.data.page = __spreadValues({}, e)),
                this.refreshUI();
            })
            .catch((e) => {
                this.ctx.trigger("editor-notify", {
                msg: `修改页面数据失败：${e.msg || String(e)}`,
                type: "e",
                });
            })
            .finally(() => {
                this.ctx.trigger("editor-hide-loading");
            }));
        }
        showUnreadBadge(e) {
        e > 0
            ? ((this.$unreadBadge.innerText = `${Number(e || 0)}`),
            (this.$unreadBadge.style.display = "block"))
            : (this.$unreadBadge.style.display = "none");
        }
        initDropdown() {
        (this.$dropdownWrap = this.$commentCount),
            this.$commentCount.classList.add("atk-dropdown-wrap"),
            this.$dropdownWrap.append(
            ve('<span class="atk-arrow-down-icon"></span>')
            );
        const e = (e) => {
            (this.paramsEditor = (t) => {
                e(t);
            }),
                this.fetchComments(0);
            },
            t = [
            [
                "最新",
                () => {
                e((e) => {
                    e.sort_by = "date_desc";
                });
                },
            ],
            [
                "最热",
                () => {
                e((e) => {
                    e.sort_by = "vote";
                });
                },
            ],
            [
                "最早",
                () => {
                e((e) => {
                    e.sort_by = "date_asc";
                });
                },
            ],
            [
                "作者",
                () => {
                e((e) => {
                    e.view_only_admin = !0;
                });
                },
            ],
            ];
        let i = 0;
        const n = ve('<ul class="atk-dropdown atk-fade-in"></ul>');
        t.forEach((e, t) => {
            const s = e[0],
            r = e[1],
            a = ve('<li class="atk-dropdown-item"><span></span></li>'),
            o = a.querySelector("span");
            (o.innerText = s),
            (o.onclick = () => {
                ((e, t, s, r) => {
                r(),
                    (i = e),
                    n.querySelectorAll(".active").forEach((e) => {
                    e.classList.remove("active");
                    }),
                    t.classList.add("active"),
                    (n.style.display = "none"),
                    setTimeout(() => {
                    n.style.display = "";
                    }, 80);
                })(t, a, 0, r);
            }),
            n.append(a),
            t === i && a.classList.add("active");
        }),
            this.$dropdownWrap.append(n);
        }
    }
    class ht extends i {
        constructor(e) {
        super(e),
            __publicField(this, "layer"),
            __publicField(this, "$header"),
            __publicField(this, "$closeBtn"),
            __publicField(this, "$iframeWrap"),
            __publicField(this, "$iframe"),
            __publicField(this, "firstShow", !0),
            __publicField(this, "loadingTimer", null),
            (this.$el = ve(
            '<div class="atk-sidebar-layer">\n  <div class="atk-sidebar-inner">\n    <div class="atk-sidebar-header">\n      <div class="atk-sidebar-close"><i class="atk-icon atk-icon-close"></i></div>\n    </div>\n    <div class="atk-sidebar-iframe-wrap"></div>\n  </div>\n</div>\n'
            )),
            (this.$header = this.$el.querySelector(".atk-sidebar-header")),
            (this.$closeBtn = this.$header.querySelector(".atk-sidebar-close")),
            (this.$iframeWrap = this.$el.querySelector(".atk-sidebar-iframe-wrap")),
            (this.$closeBtn.onclick = () => {
            this.hide();
            }),
            this.ctx.on("sidebar-show", (e) => this.show(e || {})),
            this.ctx.on("sidebar-hide", () => this.hide()),
            this.ctx.on("user-changed", () => {
            this.firstShow = !0;
            });
        }
        show(e) {
        return __async(this, null, function* () {
            if (
            ((this.$el.style.transform = ""),
            null == this.layer &&
                ((this.layer = new ze(this.ctx, "sidebar", this.$el)),
                (this.layer.afterHide = () => {
                !0 === this.ctx.conf.editorTravel &&
                    this.ctx.trigger("editor-travel-back");
                })),
            this.layer.show(),
            setTimeout(() => {
                this.$el.style.transform = "translate(0, 0)";
            }, 20),
            (() => {
                __async(this, null, function* () {
                var t;
                const i = yield new Ve(this.ctx).loginStatus();
                i.is_admin &&
                    !i.is_login &&
                    (null == (t = this.layer) || t.hide(),
                    (this.firstShow = !0),
                    this.ctx.trigger("checker-admin", {
                    onSuccess: () => {
                        setTimeout(() => {
                        this.show(e);
                        }, 500);
                    },
                    onCancel: () => {},
                    }));
                });
            })(),
            this.ctx.trigger("unread-update", { notifies: [] }),
            this.firstShow)
            ) {
            (this.$iframeWrap.innerHTML = ""),
                (this.$iframe = ve("<iframe></iframe>"));
            const t = Re(this.ctx, "/sidebar/"),
                i = {
                pageKey: this.conf.pageKey,
                site: this.conf.site || "",
                user: JSON.stringify(this.ctx.user.data),
                time: +new Date(),
                };
            e.view && (i.view = e.view), this.conf.darkMode && (i.darkMode = "1");
            const n = new URLSearchParams(i);
            this.iframeLoad(`${t}?${n.toString()}`),
                this.$iframeWrap.append(this.$iframe),
                (this.firstShow = !1);
            } else {
            const e = this.$iframe.src.includes("darkMode=1");
            this.conf.darkMode &&
                !e &&
                this.iframeLoad(`${this.$iframe.src}&darkMode=1`),
                !this.conf.darkMode &&
                e &&
                this.iframeLoad(this.$iframe.src.replace("&darkMode=1", ""));
            }
        });
        }
        hide() {
        var e;
        (this.$el.style.transform = ""), null == (e = this.layer) || e.hide();
        }
        iframeLoad(e) {
        this.$iframe &&
            ((this.$iframe.src = e),
            Oe(this.$iframeWrap),
            (this.$iframe.onload = () => {
            Me(this.$iframeWrap);
            }));
        }
        checkReqStatus(e) {
        return __async(this, null, function* () {
            null !== this.loadingTimer && window.clearTimeout(this.loadingTimer),
            (this.loadingTimer = window.setTimeout(
                () =>
                __async(this, null, function* () {
                    try {
                    yield fetch(e);
                    } catch (t) {
                    console.log(t);
                    const i = ve(
                        '<div class="atk-err-alert">  <div class="atk-title">侧边栏似乎打开失败</div>  <div class="atk-text"><span id="AtkReload">重新加载</span> / <span id="AtkCancel">取消</span></div></div>'
                        ),
                        n = i.querySelector("#AtkReload"),
                        s = i.querySelector("#AtkCancel");
                    (n.onclick = () => {
                        this.iframeLoad(e), i.remove();
                    }),
                        (s.onclick = () => {
                        i.remove();
                        }),
                        this.$iframeWrap.append(i);
                    }
                }),
                2e3
            ));
        });
        }
    }
    const dt = class {
        constructor(e) {
        if (
            (__publicField(this, "ctx"),
            __publicField(this, "conf"),
            __publicField(this, "$root"),
            __publicField(this, "checkerLauncher"),
            __publicField(this, "editor"),
            __publicField(this, "list"),
            __publicField(this, "sidebarLayer"),
            (this.conf = Be(dt.defaults, e)),
            (this.conf.server = this.conf.server
            .replace(/\/$/, "")
            .replace(/\/api\/?$/, "")),
            this.conf.pageKey ||
            (this.conf.pageKey = `${window.location.pathname}`),
            this.conf.pageTitle || (this.conf.pageTitle = `${document.title}`),
            this.conf.nestMax &&
            this.conf.nestMax <= 1 &&
            (this.conf.flatMode = !0),
            this.conf.el && this.conf.el instanceof HTMLElement)
        )
            this.$root = this.conf.el;
        else
            try {
            const e = document.querySelector(this.conf.el);
            if (!e)
                throw Error(
                `Sorry, target element "${this.conf.el}" was not found.`
                );
            this.$root = e;
            } catch (i) {
            throw (
                (console.error(i),
                new Error("Please check your Artalk `el` config."))
            );
            }
        if (
            ((this.ctx = new t(this.$root, this.conf)),
            this.$root.classList.add("artalk"),
            (this.$root.innerHTML = ""),
            this.conf.useBackendConf)
        )
            return (() =>
            __async(this, null, function* () {
                return yield this.loadConfRemote(), this.initCore(), this;
            }))();
        this.initCore();
        }
        initCore() {
        this.initLayer(),
            this.initDarkMode(),
            (this.checkerLauncher = new Ke(this.ctx)),
            (function (e) {
            const t = new D.Renderer(),
                i = t.link;
            (t.link = (e, n, s) => {
                const r =
                null == e
                    ? void 0
                    : e.startsWith(
                        `${window.location.protocol}//${window.location.hostname}`
                    );
                return i
                .call(t, e, n, s)
                .replace(
                    /^<a /,
                    `<a target="_blank" ${
                    r ? "" : 'rel="noreferrer noopener nofollow"'
                    } `
                );
            }),
                (t.code = (e, t) => {
                const i = t || "plaintext";
                let n = e;
                return (
                    window.hljs
                    ? i &&
                        window.hljs.getLanguage(i) &&
                        (n = window.hljs.highlight(i, e).value)
                    : (n = _e(e)),
                    `<pre rel="${i}">\n<code class="hljs language-${i}">${n.replace(
                    /&amp;/g,
                    "&"
                    )}</code>\n</pre>`
                );
                });
            const n = D;
            D.setOptions({
                renderer: t,
                pedantic: !1,
                gfm: !0,
                breaks: !0,
                smartLists: !0,
                smartypants: !0,
                xhtml: !1,
                sanitize: !1,
                silent: !0,
            }),
                (e.markedInstance = n);
            })(this.ctx),
            (this.editor = new et(this.ctx)),
            this.$root.appendChild(this.editor.$el),
            (this.list = new ct(this.ctx)),
            this.$root.appendChild(this.list.$el),
            (this.sidebarLayer = new ht(this.ctx)),
            this.$root.appendChild(this.sidebarLayer.$el),
            this.list.fetchComments(0),
            this.initEventBind(),
            this.initPV(),
            dt.Plugins.forEach((e) => {
            "function" == typeof e && e(this.ctx);
            });
        }
        loadConfRemote() {
        return __async(this, null, function* () {
            Oe(this.$root);
            let e = {};
            try {
            e = yield new Ve(this.ctx).conf();
            } catch (t) {
            console.error("配置远程获取失败", t);
            }
            (this.ctx.conf = Be(this.ctx.conf, e)), Me(this.$root);
        });
        }
        initEventBind() {
        window.addEventListener("hashchange", () => {
            (this.list.goToCommentDelay = !1),
            this.list.checkGoToCommentByUrlHash();
        }),
            this.ctx.on("check-admin-show-el", () => {
            const e = [];
            this.$root
                .querySelectorAll("[atk-only-admin-show]")
                .forEach((t) => e.push(t));
            const { $wrap: t } = Ne(this.ctx);
            t &&
                t
                .querySelectorAll("[atk-only-admin-show]")
                .forEach((t) => e.push(t));
            const i = document.querySelector(".atk-sidebar");
            i &&
                i
                .querySelectorAll("[atk-only-admin-show]")
                .forEach((t) => e.push(t)),
                e.forEach((e) => {
                this.ctx.user.data.isAdmin
                    ? e.classList.remove("atk-hide")
                    : e.classList.add("atk-hide");
                });
            }),
            this.ctx.on("user-changed", () => {
            this.ctx.trigger("check-admin-show-el"),
                this.ctx.trigger("list-refresh-ui");
            });
        }
        reload() {
        this.list.fetchComments(0);
        }
        initLayer() {
        (ze.BodyOrgOverflow = document.body.style.overflow),
            (ze.BodyOrgPaddingRight = document.body.style.paddingRight);
        }
        initDarkMode() {
        if ("auto" === this.conf.darkMode) {
            const e = window.matchMedia("(prefers-color-scheme: dark)");
            e.addEventListener("change", (e) => {
            this.setDarkMode(e.matches);
            }),
            this.setDarkMode(e.matches);
        } else this.setDarkMode(this.conf.darkMode || !1);
        }
        setDarkMode(e) {
        const t = "atk-dark-mode";
        (this.ctx.conf.darkMode = e),
            this.ctx.trigger("conf-updated"),
            this.conf.darkMode
            ? this.$root.classList.add(t)
            : this.$root.classList.remove(t);
        const { $wrap: i } = Ne(this.ctx);
        i && (this.conf.darkMode ? i.classList.add(t) : i.classList.remove(t));
        }
        initPV() {
        return __async(this, null, function* () {
            const e = yield new Ve(this.ctx).pv();
            if (Number.isNaN(Number(e))) return;
            if (!this.conf.pvEl || !document.querySelector(this.conf.pvEl)) return;
            document.querySelector(this.conf.pvEl).innerText = String(e);
        });
        }
        on(e, t) {
        this.ctx.on(e, t, "external");
        }
        off(e, t) {
        this.ctx.off(e, t, "external");
        }
        trigger(e, t) {
        this.ctx.trigger(e, t, "external");
        }
        static Use(e) {
        this.Plugins.push(e);
        }
    };
    let ut = dt;
    return (
        __publicField(ut, "defaults", {
        el: "",
        pageKey: "",
        server: "",
        site: "",
        placeholder: "键入内容...",
        noComment: "「此时无声胜有声」",
        sendBtn: "发送评论",
        darkMode: "auto",
        editorTravel: !0,
        flatMode: "auto",
        nestMax: 2,
        nestSort: "DATE_ASC",
        emoticons:
            "https://cdn.jsdelivr.net/gh/ArtalkJS/Emoticons/grps/default.json",
        vote: !0,
        voteDown: !1,
        uaBadge: !0,
        listSort: !0,
        pvEl: "#ArtalkPV",
        gravatar: { default: "mp", mirror: "https://sdn.geekzu.org/avatar/" },
        pagination: { pageSize: 20, readMore: !0, autoLoad: !0 },
        heightLimit: { content: 300, children: 400 },
        imgUpload: !0,
        reqTimeout: 15e3,
        versionCheck: !0,
        useBackendConf: !1,
        }),
        __publicField(ut, "Plugins", []),
        ut
    );
    });
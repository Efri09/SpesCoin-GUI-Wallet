/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * monaco-languages version: 0.7.0(18916e97a4ff0f1b195d68d01d632631cc84d50e)
 * Released under the MIT license
 * https://github.com/Microsoft/monaco-languages/blob/master/LICENSE.md
 *-----------------------------------------------------------------------------*/
define("vs/basic-languages/src/markdown", ["require", "exports"], function (e, t) {
    function s(e) {
        return "tag"
    }

    var n = "keyword", o = "keyword", c = "keyword", a = "meta.separator", d = "comment", m = "keyword", r = "string", i = "variable.source", p = "delimiter.html", l = "attribute.name.html", k = "string.html";
    t.conf = {
        comments: {blockComment: ["<!--", "-->"]},
        brackets: [["{", "}"], ["[", "]"], ["(", ")"], ["<", ">"]],
        autoClosingPairs: []
    }, t.language = {
        defaultToken: "",
        tokenPostfix: ".md",
        control: /[\\`*_\[\]{}()#+\-\.!]/,
        noncontrol: /[^\\`*_\[\]{}()#+\-\.!]/,
        escapes: /\\(?:@control)/,
        jsescapes: /\\(?:[btnfr\\"']|[0-7][0-7]?|[0-3][0-7]{2})/,
        empty: ["area", "base", "basefont", "br", "col", "frame", "hr", "img", "input", "isindex", "link", "meta", "param"],
        tokenizer: {
            root: [[/^(\s{0,3})(#+)((?:[^\\#]|@escapes)+)((?:#+)?)/, ["white", n, o, o]], [/^\s*(=+|\-+)\s*$/, c], [/^\s*((\*[ ]?)+)\s*$/, a], [/^\s*>+/, d], [/^\s*([\*\-+:]|\d+\.)\s/, m], [/^(\t|[ ]{4})[^ ].*$/, r], [/^\s*~~~\s*((?:\w|[\/\-#])+)?\s*$/, {
                token: r,
                next: "@codeblock"
            }], [/^\s*```\s*((?:\w|[\/\-#])+)\s*$/, {
                token: r,
                next: "@codeblockgh",
                nextEmbedded: "$1"
            }], [/^\s*```\s*$/, {token: r, next: "@codeblock"}], {include: "@linecontent"}],
            codeblock: [[/^\s*~~~\s*$/, {token: r, next: "@pop"}], [/^\s*```\s*$/, {
                token: r,
                next: "@pop"
            }], [/.*$/, i]],
            codeblockgh: [[/```\s*$/, {token: i, next: "@pop", nextEmbedded: "@pop"}], [/[^`]+/, i]],
            linecontent: [[/&\w+;/, "string.escape"], [/@escapes/, "escape"], [/\b__([^\\_]|@escapes|_(?!_))+__\b/, "strong"], [/\*\*([^\\*]|@escapes|\*(?!\*))+\*\*/, "strong"], [/\b_[^_]+_\b/, "emphasis"], [/\*([^\\*]|@escapes)+\*/, "emphasis"], [/`([^\\`]|@escapes)+`/, "variable"], [/\{[^}]+\}/, "string.target"], [/(!?\[)((?:[^\]\\]|@escapes)*)(\]\([^\)]+\))/, ["string.link", "", "string.link"]], [/(!?\[)((?:[^\]\\]|@escapes)*)(\])/, "string.link"], {include: "html"}],
            html: [[/<(\w+)\/>/, s("$1")], [/<(\w+)/, {
                cases: {
                    "@empty": {token: s("$1"), next: "@tag.$1"},
                    "@default": {token: s("$1"), next: "@tag.$1"}
                }
            }], [/<\/(\w+)\s*>/, {token: s("$1")}], [/<!--/, "comment", "@comment"]],
            comment: [[/[^<\-]+/, "comment.content"], [/-->/, "comment", "@pop"], [/<!--/, "comment.content.invalid"], [/[<\-]/, "comment.content"]],
            tag: [[/[ \t\r\n]+/, "white"], [/(type)(\s*=\s*)(")([^"]+)(")/, [l, p, k, {
                token: k,
                switchTo: "@tag.$S2.$4"
            }, k]], [/(type)(\s*=\s*)(')([^']+)(')/, [l, p, k, {
                token: k,
                switchTo: "@tag.$S2.$4"
            }, k]], [/(\w+)(\s*=\s*)("[^"]*"|'[^']*')/, [l, p, k]], [/\w+/, l], [/\/>/, s("$S2"), "@pop"], [/>/, {
                cases: {
                    "$S2==style": {
                        token: s("$S2"),
                        switchTo: "embeddedStyle",
                        nextEmbedded: "text/css"
                    },
                    "$S2==script": {
                        cases: {
                            $S3: {token: s("$S2"), switchTo: "embeddedScript", nextEmbedded: "$S3"},
                            "@default": {token: s("$S2"), switchTo: "embeddedScript", nextEmbedded: "text/javascript"}
                        }
                    },
                    "@default": {token: s("$S2"), next: "@pop"}
                }
            }]],
            embeddedStyle: [[/[^<]+/, ""], [/<\/style\s*>/, {
                token: "@rematch",
                next: "@pop",
                nextEmbedded: "@pop"
            }], [/</, ""]],
            embeddedScript: [[/[^<]+/, ""], [/<\/script\s*>/, {
                token: "@rematch",
                next: "@pop",
                nextEmbedded: "@pop"
            }], [/</, ""]]
        }
    }
});
import { jsx as w, Fragment as xt, jsxs as se } from "react/jsx-runtime";
import * as c from "react";
import T, { useState as bs, useMemo as ys, useLayoutEffect as mo, useEffect as go } from "react";
import * as vo from "react-dom";
import ho from "react-dom";
function wo(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var o = e.length;
    for (t = 0; t < o; t++) e[t] && (n = wo(e[t])) && (r && (r += " "), r += n);
  } else for (n in e) e[n] && (r && (r += " "), r += n);
  return r;
}
function xs() {
  for (var e, t, n = 0, r = "", o = arguments.length; n < o; n++) (e = arguments[n]) && (t = wo(e)) && (r && (r += " "), r += t);
  return r;
}
const Kn = "-", Cs = (e) => {
  const t = Es(e), {
    conflictingClassGroups: n,
    conflictingClassGroupModifiers: r
  } = e;
  return {
    getClassGroupId: (i) => {
      const s = i.split(Kn);
      return s[0] === "" && s.length !== 1 && s.shift(), bo(s, t) || Rs(i);
    },
    getConflictingClassGroupIds: (i, s) => {
      const l = n[i] || [];
      return s && r[i] ? [...l, ...r[i]] : l;
    }
  };
}, bo = (e, t) => {
  var i;
  if (e.length === 0)
    return t.classGroupId;
  const n = e[0], r = t.nextPart.get(n), o = r ? bo(e.slice(1), r) : void 0;
  if (o)
    return o;
  if (t.validators.length === 0)
    return;
  const a = e.join(Kn);
  return (i = t.validators.find(({
    validator: s
  }) => s(a))) == null ? void 0 : i.classGroupId;
}, Lr = /^\[(.+)\]$/, Rs = (e) => {
  if (Lr.test(e)) {
    const t = Lr.exec(e)[1], n = t == null ? void 0 : t.substring(0, t.indexOf(":"));
    if (n)
      return "arbitrary.." + n;
  }
}, Es = (e) => {
  const {
    theme: t,
    prefix: n
  } = e, r = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  return Ts(Object.entries(e.classGroups), n).forEach(([a, i]) => {
    Pn(i, r, a, t);
  }), r;
}, Pn = (e, t, n, r) => {
  e.forEach((o) => {
    if (typeof o == "string") {
      const a = o === "" ? t : $r(t, o);
      a.classGroupId = n;
      return;
    }
    if (typeof o == "function") {
      if (Ss(o)) {
        Pn(o(r), t, n, r);
        return;
      }
      t.validators.push({
        validator: o,
        classGroupId: n
      });
      return;
    }
    Object.entries(o).forEach(([a, i]) => {
      Pn(i, $r(t, a), n, r);
    });
  });
}, $r = (e, t) => {
  let n = e;
  return t.split(Kn).forEach((r) => {
    n.nextPart.has(r) || n.nextPart.set(r, {
      nextPart: /* @__PURE__ */ new Map(),
      validators: []
    }), n = n.nextPart.get(r);
  }), n;
}, Ss = (e) => e.isThemeGetter, Ts = (e, t) => t ? e.map(([n, r]) => {
  const o = r.map((a) => typeof a == "string" ? t + a : typeof a == "object" ? Object.fromEntries(Object.entries(a).map(([i, s]) => [t + i, s])) : a);
  return [n, o];
}) : e, Ns = (e) => {
  if (e < 1)
    return {
      get: () => {
      },
      set: () => {
      }
    };
  let t = 0, n = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  const o = (a, i) => {
    n.set(a, i), t++, t > e && (t = 0, r = n, n = /* @__PURE__ */ new Map());
  };
  return {
    get(a) {
      let i = n.get(a);
      if (i !== void 0)
        return i;
      if ((i = r.get(a)) !== void 0)
        return o(a, i), i;
    },
    set(a, i) {
      n.has(a) ? n.set(a, i) : o(a, i);
    }
  };
}, yo = "!", As = (e) => {
  const {
    separator: t,
    experimentalParseClassName: n
  } = e, r = t.length === 1, o = t[0], a = t.length, i = (s) => {
    const l = [];
    let d = 0, u = 0, f;
    for (let b = 0; b < s.length; b++) {
      let h = s[b];
      if (d === 0) {
        if (h === o && (r || s.slice(b, b + a) === t)) {
          l.push(s.slice(u, b)), u = b + a;
          continue;
        }
        if (h === "/") {
          f = b;
          continue;
        }
      }
      h === "[" ? d++ : h === "]" && d--;
    }
    const p = l.length === 0 ? s : s.substring(u), g = p.startsWith(yo), v = g ? p.substring(1) : p, m = f && f > u ? f - u : void 0;
    return {
      modifiers: l,
      hasImportantModifier: g,
      baseClassName: v,
      maybePostfixModifierPosition: m
    };
  };
  return n ? (s) => n({
    className: s,
    parseClassName: i
  }) : i;
}, Ps = (e) => {
  if (e.length <= 1)
    return e;
  const t = [];
  let n = [];
  return e.forEach((r) => {
    r[0] === "[" ? (t.push(...n.sort(), r), n = []) : n.push(r);
  }), t.push(...n.sort()), t;
}, Os = (e) => ({
  cache: Ns(e.cacheSize),
  parseClassName: As(e),
  ...Cs(e)
}), Ms = /\s+/, Ds = (e, t) => {
  const {
    parseClassName: n,
    getClassGroupId: r,
    getConflictingClassGroupIds: o
  } = t, a = [], i = e.trim().split(Ms);
  let s = "";
  for (let l = i.length - 1; l >= 0; l -= 1) {
    const d = i[l], {
      modifiers: u,
      hasImportantModifier: f,
      baseClassName: p,
      maybePostfixModifierPosition: g
    } = n(d);
    let v = !!g, m = r(v ? p.substring(0, g) : p);
    if (!m) {
      if (!v) {
        s = d + (s.length > 0 ? " " + s : s);
        continue;
      }
      if (m = r(p), !m) {
        s = d + (s.length > 0 ? " " + s : s);
        continue;
      }
      v = !1;
    }
    const b = Ps(u).join(":"), h = f ? b + yo : b, x = h + m;
    if (a.includes(x))
      continue;
    a.push(x);
    const C = o(m, v);
    for (let y = 0; y < C.length; ++y) {
      const R = C[y];
      a.push(h + R);
    }
    s = d + (s.length > 0 ? " " + s : s);
  }
  return s;
};
function Is() {
  let e = 0, t, n, r = "";
  for (; e < arguments.length; )
    (t = arguments[e++]) && (n = xo(t)) && (r && (r += " "), r += n);
  return r;
}
const xo = (e) => {
  if (typeof e == "string")
    return e;
  let t, n = "";
  for (let r = 0; r < e.length; r++)
    e[r] && (t = xo(e[r])) && (n && (n += " "), n += t);
  return n;
};
function _s(e, ...t) {
  let n, r, o, a = i;
  function i(l) {
    const d = t.reduce((u, f) => f(u), e());
    return n = Os(d), r = n.cache.get, o = n.cache.set, a = s, s(l);
  }
  function s(l) {
    const d = r(l);
    if (d)
      return d;
    const u = Ds(l, n);
    return o(l, u), u;
  }
  return function() {
    return a(Is.apply(null, arguments));
  };
}
const Y = (e) => {
  const t = (n) => n[e] || [];
  return t.isThemeGetter = !0, t;
}, Co = /^\[(?:([a-z-]+):)?(.+)\]$/i, ks = /^\d+\/\d+$/, Ls = /* @__PURE__ */ new Set(["px", "full", "screen"]), $s = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/, Fs = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/, zs = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/, Bs = /^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/, Ws = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/, Re = (e) => Qe(e) || Ls.has(e) || ks.test(e), _e = (e) => at(e, "length", Xs), Qe = (e) => !!e && !Number.isNaN(Number(e)), mn = (e) => at(e, "number", Qe), ht = (e) => !!e && Number.isInteger(Number(e)), Vs = (e) => e.endsWith("%") && Qe(e.slice(0, -1)), F = (e) => Co.test(e), ke = (e) => $s.test(e), Hs = /* @__PURE__ */ new Set(["length", "size", "percentage"]), Us = (e) => at(e, Hs, Ro), js = (e) => at(e, "position", Ro), Gs = /* @__PURE__ */ new Set(["image", "url"]), Ks = (e) => at(e, Gs, Zs), Ys = (e) => at(e, "", qs), wt = () => !0, at = (e, t, n) => {
  const r = Co.exec(e);
  return r ? r[1] ? typeof t == "string" ? r[1] === t : t.has(r[1]) : n(r[2]) : !1;
}, Xs = (e) => (
  // `colorFunctionRegex` check is necessary because color functions can have percentages in them which which would be incorrectly classified as lengths.
  // For example, `hsl(0 0% 0%)` would be classified as a length without this check.
  // I could also use lookbehind assertion in `lengthUnitRegex` but that isn't supported widely enough.
  Fs.test(e) && !zs.test(e)
), Ro = () => !1, qs = (e) => Bs.test(e), Zs = (e) => Ws.test(e), Qs = () => {
  const e = Y("colors"), t = Y("spacing"), n = Y("blur"), r = Y("brightness"), o = Y("borderColor"), a = Y("borderRadius"), i = Y("borderSpacing"), s = Y("borderWidth"), l = Y("contrast"), d = Y("grayscale"), u = Y("hueRotate"), f = Y("invert"), p = Y("gap"), g = Y("gradientColorStops"), v = Y("gradientColorStopPositions"), m = Y("inset"), b = Y("margin"), h = Y("opacity"), x = Y("padding"), C = Y("saturate"), y = Y("scale"), R = Y("sepia"), A = Y("skew"), E = Y("space"), N = Y("translate"), S = () => ["auto", "contain", "none"], M = () => ["auto", "hidden", "clip", "visible", "scroll"], k = () => ["auto", F, t], O = () => [F, t], P = () => ["", Re, _e], $ = () => ["auto", Qe, F], H = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"], I = () => ["solid", "dashed", "dotted", "double", "none"], W = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity"], _ = () => ["start", "end", "center", "between", "around", "evenly", "stretch"], j = () => ["", "0", F], J = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"], te = () => [Qe, F];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [wt],
      spacing: [Re, _e],
      blur: ["none", "", ke, F],
      brightness: te(),
      borderColor: [e],
      borderRadius: ["none", "", "full", ke, F],
      borderSpacing: O(),
      borderWidth: P(),
      contrast: te(),
      grayscale: j(),
      hueRotate: te(),
      invert: j(),
      gap: O(),
      gradientColorStops: [e],
      gradientColorStopPositions: [Vs, _e],
      inset: k(),
      margin: k(),
      opacity: te(),
      padding: O(),
      saturate: te(),
      scale: te(),
      sepia: j(),
      skew: te(),
      space: O(),
      translate: O()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", F]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [ke]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": J()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": J()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...H(), F]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: M()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": M()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": M()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: S()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": S()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": S()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [m]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [m]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [m]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [m]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [m]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [m]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [m]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [m]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [m]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", ht, F]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: k()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", F]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: j()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: j()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", ht, F]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [wt]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", ht, F]
        }, F]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": $()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": $()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [wt]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [ht, F]
        }, F]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": $()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": $()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", F]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", F]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [p]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [p]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [p]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ..._()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ..._(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [..._(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [x]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [x]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [x]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [x]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [x]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [x]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [x]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [x]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [x]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [b]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [b]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [b]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [b]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [b]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [b]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [b]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [b]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [b]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [E]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [E]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", F, t]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [F, t, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [F, t, "none", "full", "min", "max", "fit", "prose", {
          screen: [ke]
        }, ke]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [F, t, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [F, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [F, t, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [F, t, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", ke, _e]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", mn]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [wt]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", F]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", Qe, mn]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", Re, F]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", F]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", F]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [e]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [h]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [e]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [h]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...I(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", Re, _e]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", Re, F]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [e]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: O()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", F]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", F]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [h]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...H(), js]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", Us]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, Ks]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [e]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [v]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [v]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [v]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [g]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [g]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [g]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [a]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [a]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [a]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [a]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [a]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [a]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [a]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [a]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [a]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [a]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [a]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [a]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [a]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [a]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [a]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [s]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [s]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [s]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [s]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [s]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [s]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [s]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [s]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [s]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [h]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...I(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [s]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [s]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [h]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: I()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [o]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [o]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [o]
      }],
      /**
       * Border Color S
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-s": [{
        "border-s": [o]
      }],
      /**
       * Border Color E
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-e": [{
        "border-e": [o]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [o]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [o]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [o]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [o]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [o]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...I()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [Re, F]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [Re, _e]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [e]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: P()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [e]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [h]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [Re, _e]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [e]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", ke, Ys]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [wt]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [h]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": [...W(), "plus-lighter", "plus-darker"]
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": W()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [n]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [r]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [l]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", ke, F]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [d]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [u]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [f]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [C]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [R]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [n]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [r]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [l]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [d]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [u]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [f]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [h]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [C]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [R]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [i]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [i]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [i]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", F]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: te()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", F]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: te()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", F]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [y]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [y]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [y]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [ht, F]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [N]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [N]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [A]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [A]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", F]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", e]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", F]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [e]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": O()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": O()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": O()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": O()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": O()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": O()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": O()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": O()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": O()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": O()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": O()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": O()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": O()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": O()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": O()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": O()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": O()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": O()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", F]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [e, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [Re, _e, mn]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [e, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-s", "border-color-e", "border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}, Js = /* @__PURE__ */ _s(Qs);
function B(...e) {
  return Js(xs(e));
}
const ec = c.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ w(
    "input",
    {
      type: t,
      className: B(
        "flex w-full font-medium bg-transparent border border-gray-400 rounded-lg py-3 px-4 disabled:bg-gray-100 placeholder:text-gray-400",
        e
      ),
      ref: r,
      ...n
    }
  )
);
ec.displayName = "Input";
function tc(e, t) {
  const n = c.createContext(t), r = (a) => {
    const { children: i, ...s } = a, l = c.useMemo(() => s, Object.values(s));
    return /* @__PURE__ */ w(n.Provider, { value: l, children: i });
  };
  r.displayName = e + "Provider";
  function o(a) {
    const i = c.useContext(n);
    if (i) return i;
    if (t !== void 0) return t;
    throw new Error(`\`${a}\` must be used within \`${e}\``);
  }
  return [r, o];
}
function it(e, t = []) {
  let n = [];
  function r(a, i) {
    const s = c.createContext(i), l = n.length;
    n = [...n, i];
    const d = (f) => {
      var h;
      const { scope: p, children: g, ...v } = f, m = ((h = p == null ? void 0 : p[e]) == null ? void 0 : h[l]) || s, b = c.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ w(m.Provider, { value: b, children: g });
    };
    d.displayName = a + "Provider";
    function u(f, p) {
      var m;
      const g = ((m = p == null ? void 0 : p[e]) == null ? void 0 : m[l]) || s, v = c.useContext(g);
      if (v) return v;
      if (i !== void 0) return i;
      throw new Error(`\`${f}\` must be used within \`${a}\``);
    }
    return [d, u];
  }
  const o = () => {
    const a = n.map((i) => c.createContext(i));
    return function(s) {
      const l = (s == null ? void 0 : s[e]) || a;
      return c.useMemo(
        () => ({ [`__scope${e}`]: { ...s, [e]: l } }),
        [s, l]
      );
    };
  };
  return o.scopeName = e, [r, nc(o, ...t)];
}
function nc(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const i = r.reduce((s, { useScope: l, scopeName: d }) => {
        const f = l(a)[`__scope${d}`];
        return { ...s, ...f };
      }, {});
      return c.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function rc(e, t = []) {
  let n = [];
  function r(a, i) {
    const s = c.createContext(i), l = n.length;
    n = [...n, i];
    function d(f) {
      const { scope: p, children: g, ...v } = f, m = (p == null ? void 0 : p[e][l]) || s, b = c.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ w(m.Provider, { value: b, children: g });
    }
    function u(f, p) {
      const g = (p == null ? void 0 : p[e][l]) || s, v = c.useContext(g);
      if (v) return v;
      if (i !== void 0) return i;
      throw new Error(`\`${f}\` must be used within \`${a}\``);
    }
    return d.displayName = a + "Provider", [d, u];
  }
  const o = () => {
    const a = n.map((i) => c.createContext(i));
    return function(s) {
      const l = (s == null ? void 0 : s[e]) || a;
      return c.useMemo(
        () => ({ [`__scope${e}`]: { ...s, [e]: l } }),
        [s, l]
      );
    };
  };
  return o.scopeName = e, [r, oc(o, ...t)];
}
function oc(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const i = r.reduce((s, { useScope: l, scopeName: d }) => {
        const f = l(a)[`__scope${d}`];
        return { ...s, ...f };
      }, {});
      return c.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function ac(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function Yn(...e) {
  return (t) => e.forEach((n) => ac(n, t));
}
function Z(...e) {
  return c.useCallback(Yn(...e), e);
}
var tt = c.forwardRef((e, t) => {
  const { children: n, ...r } = e, o = c.Children.toArray(n), a = o.find(ic);
  if (a) {
    const i = a.props.children, s = o.map((l) => l === a ? c.Children.count(i) > 1 ? c.Children.only(null) : c.isValidElement(i) ? i.props.children : null : l);
    return /* @__PURE__ */ w(On, { ...r, ref: t, children: c.isValidElement(i) ? c.cloneElement(i, void 0, s) : null });
  }
  return /* @__PURE__ */ w(On, { ...r, ref: t, children: n });
});
tt.displayName = "Slot";
var On = c.forwardRef((e, t) => {
  const { children: n, ...r } = e;
  if (c.isValidElement(n)) {
    const o = cc(n);
    return c.cloneElement(n, {
      ...sc(r, n.props),
      // @ts-ignore
      ref: t ? Yn(t, o) : o
    });
  }
  return c.Children.count(n) > 1 ? c.Children.only(null) : null;
});
On.displayName = "SlotClone";
var Eo = ({ children: e }) => /* @__PURE__ */ w(xt, { children: e });
function ic(e) {
  return c.isValidElement(e) && e.type === Eo;
}
function sc(e, t) {
  const n = { ...t };
  for (const r in t) {
    const o = e[r], a = t[r];
    /^on[A-Z]/.test(r) ? o && a ? n[r] = (...s) => {
      a(...s), o(...s);
    } : o && (n[r] = o) : r === "style" ? n[r] = { ...o, ...a } : r === "className" && (n[r] = [o, a].filter(Boolean).join(" "));
  }
  return { ...e, ...n };
}
function cc(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
function Xt(e) {
  const t = e + "CollectionProvider", [n, r] = rc(t), [o, a] = n(
    t,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), i = (g) => {
    const { scope: v, children: m } = g, b = T.useRef(null), h = T.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ w(o, { scope: v, itemMap: h, collectionRef: b, children: m });
  };
  i.displayName = t;
  const s = e + "CollectionSlot", l = T.forwardRef(
    (g, v) => {
      const { scope: m, children: b } = g, h = a(s, m), x = Z(v, h.collectionRef);
      return /* @__PURE__ */ w(tt, { ref: x, children: b });
    }
  );
  l.displayName = s;
  const d = e + "CollectionItemSlot", u = "data-radix-collection-item", f = T.forwardRef(
    (g, v) => {
      const { scope: m, children: b, ...h } = g, x = T.useRef(null), C = Z(v, x), y = a(d, m);
      return T.useEffect(() => (y.itemMap.set(x, { ref: x, ...h }), () => void y.itemMap.delete(x))), /* @__PURE__ */ w(tt, { [u]: "", ref: C, children: b });
    }
  );
  f.displayName = d;
  function p(g) {
    const v = a(e + "CollectionConsumer", g);
    return T.useCallback(() => {
      const b = v.collectionRef.current;
      if (!b) return [];
      const h = Array.from(b.querySelectorAll(`[${u}]`));
      return Array.from(v.itemMap.values()).sort(
        (y, R) => h.indexOf(y.ref.current) - h.indexOf(R.ref.current)
      );
    }, [v.collectionRef, v.itemMap]);
  }
  return [
    { Provider: i, Slot: l, ItemSlot: f },
    p,
    r
  ];
}
function z(e, t, { checkForDefaultPrevented: n = !0 } = {}) {
  return function(o) {
    if (e == null || e(o), n === !1 || !o.defaultPrevented)
      return t == null ? void 0 : t(o);
  };
}
function ne(e) {
  const t = c.useRef(e);
  return c.useEffect(() => {
    t.current = e;
  }), c.useMemo(() => (...n) => {
    var r;
    return (r = t.current) == null ? void 0 : r.call(t, ...n);
  }, []);
}
function Te({
  prop: e,
  defaultProp: t,
  onChange: n = () => {
  }
}) {
  const [r, o] = lc({ defaultProp: t, onChange: n }), a = e !== void 0, i = a ? e : r, s = ne(n), l = c.useCallback(
    (d) => {
      if (a) {
        const f = typeof d == "function" ? d(e) : d;
        f !== e && s(f);
      } else
        o(d);
    },
    [a, e, o, s]
  );
  return [i, l];
}
function lc({
  defaultProp: e,
  onChange: t
}) {
  const n = c.useState(e), [r] = n, o = c.useRef(r), a = ne(t);
  return c.useEffect(() => {
    o.current !== r && (a(r), o.current = r);
  }, [r, o, a]), n;
}
var uc = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "span",
  "svg",
  "ul"
], V = uc.reduce((e, t) => {
  const n = c.forwardRef((r, o) => {
    const { asChild: a, ...i } = r, s = a ? tt : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ w(s, { ...i, ref: o });
  });
  return n.displayName = `Primitive.${t}`, { ...e, [t]: n };
}, {});
function Mn(e, t) {
  e && vo.flushSync(() => e.dispatchEvent(t));
}
var ue = globalThis != null && globalThis.document ? c.useLayoutEffect : () => {
};
function dc(e, t) {
  return c.useReducer((n, r) => t[n][r] ?? n, e);
}
var pe = (e) => {
  const { present: t, children: n } = e, r = fc(t), o = typeof n == "function" ? n({ present: r.isPresent }) : c.Children.only(n), a = Z(r.ref, pc(o));
  return typeof n == "function" || r.isPresent ? c.cloneElement(o, { ref: a }) : null;
};
pe.displayName = "Presence";
function fc(e) {
  const [t, n] = c.useState(), r = c.useRef({}), o = c.useRef(e), a = c.useRef("none"), i = e ? "mounted" : "unmounted", [s, l] = dc(i, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return c.useEffect(() => {
    const d = Ot(r.current);
    a.current = s === "mounted" ? d : "none";
  }, [s]), ue(() => {
    const d = r.current, u = o.current;
    if (u !== e) {
      const p = a.current, g = Ot(d);
      e ? l("MOUNT") : g === "none" || (d == null ? void 0 : d.display) === "none" ? l("UNMOUNT") : l(u && p !== g ? "ANIMATION_OUT" : "UNMOUNT"), o.current = e;
    }
  }, [e, l]), ue(() => {
    if (t) {
      let d;
      const u = t.ownerDocument.defaultView ?? window, f = (g) => {
        const m = Ot(r.current).includes(g.animationName);
        if (g.target === t && m && (l("ANIMATION_END"), !o.current)) {
          const b = t.style.animationFillMode;
          t.style.animationFillMode = "forwards", d = u.setTimeout(() => {
            t.style.animationFillMode === "forwards" && (t.style.animationFillMode = b);
          });
        }
      }, p = (g) => {
        g.target === t && (a.current = Ot(r.current));
      };
      return t.addEventListener("animationstart", p), t.addEventListener("animationcancel", f), t.addEventListener("animationend", f), () => {
        u.clearTimeout(d), t.removeEventListener("animationstart", p), t.removeEventListener("animationcancel", f), t.removeEventListener("animationend", f);
      };
    } else
      l("ANIMATION_END");
  }, [t, l]), {
    isPresent: ["mounted", "unmountSuspended"].includes(s),
    ref: c.useCallback((d) => {
      d && (r.current = getComputedStyle(d)), n(d);
    }, [])
  };
}
function Ot(e) {
  return (e == null ? void 0 : e.animationName) || "none";
}
function pc(e) {
  var r, o;
  let t = (r = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : r.get, n = t && "isReactWarning" in t && t.isReactWarning;
  return n ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, n = t && "isReactWarning" in t && t.isReactWarning, n ? e.props.ref : e.props.ref || e.ref);
}
var mc = c.useId || (() => {
}), gc = 0;
function we(e) {
  const [t, n] = c.useState(mc());
  return ue(() => {
    n((r) => r ?? String(gc++));
  }, [e]), t ? `radix-${t}` : "";
}
var Xn = "Collapsible", [vc, So] = it(Xn), [hc, qn] = vc(Xn), To = c.forwardRef(
  (e, t) => {
    const {
      __scopeCollapsible: n,
      open: r,
      defaultOpen: o,
      disabled: a,
      onOpenChange: i,
      ...s
    } = e, [l = !1, d] = Te({
      prop: r,
      defaultProp: o,
      onChange: i
    });
    return /* @__PURE__ */ w(
      hc,
      {
        scope: n,
        disabled: a,
        contentId: we(),
        open: l,
        onOpenToggle: c.useCallback(() => d((u) => !u), [d]),
        children: /* @__PURE__ */ w(
          V.div,
          {
            "data-state": Qn(l),
            "data-disabled": a ? "" : void 0,
            ...s,
            ref: t
          }
        )
      }
    );
  }
);
To.displayName = Xn;
var No = "CollapsibleTrigger", Ao = c.forwardRef(
  (e, t) => {
    const { __scopeCollapsible: n, ...r } = e, o = qn(No, n);
    return /* @__PURE__ */ w(
      V.button,
      {
        type: "button",
        "aria-controls": o.contentId,
        "aria-expanded": o.open || !1,
        "data-state": Qn(o.open),
        "data-disabled": o.disabled ? "" : void 0,
        disabled: o.disabled,
        ...r,
        ref: t,
        onClick: z(e.onClick, o.onOpenToggle)
      }
    );
  }
);
Ao.displayName = No;
var Zn = "CollapsibleContent", Po = c.forwardRef(
  (e, t) => {
    const { forceMount: n, ...r } = e, o = qn(Zn, e.__scopeCollapsible);
    return /* @__PURE__ */ w(pe, { present: n || o.open, children: ({ present: a }) => /* @__PURE__ */ w(wc, { ...r, ref: t, present: a }) });
  }
);
Po.displayName = Zn;
var wc = c.forwardRef((e, t) => {
  const { __scopeCollapsible: n, present: r, children: o, ...a } = e, i = qn(Zn, n), [s, l] = c.useState(r), d = c.useRef(null), u = Z(t, d), f = c.useRef(0), p = f.current, g = c.useRef(0), v = g.current, m = i.open || s, b = c.useRef(m), h = c.useRef();
  return c.useEffect(() => {
    const x = requestAnimationFrame(() => b.current = !1);
    return () => cancelAnimationFrame(x);
  }, []), ue(() => {
    const x = d.current;
    if (x) {
      h.current = h.current || {
        transitionDuration: x.style.transitionDuration,
        animationName: x.style.animationName
      }, x.style.transitionDuration = "0s", x.style.animationName = "none";
      const C = x.getBoundingClientRect();
      f.current = C.height, g.current = C.width, b.current || (x.style.transitionDuration = h.current.transitionDuration, x.style.animationName = h.current.animationName), l(r);
    }
  }, [i.open, r]), /* @__PURE__ */ w(
    V.div,
    {
      "data-state": Qn(i.open),
      "data-disabled": i.disabled ? "" : void 0,
      id: i.contentId,
      hidden: !m,
      ...a,
      ref: u,
      style: {
        "--radix-collapsible-content-height": p ? `${p}px` : void 0,
        "--radix-collapsible-content-width": v ? `${v}px` : void 0,
        ...e.style
      },
      children: m && o
    }
  );
});
function Qn(e) {
  return e ? "open" : "closed";
}
var bc = To, yc = Ao, xc = Po, Cc = c.createContext(void 0);
function qt(e) {
  const t = c.useContext(Cc);
  return e || t || "ltr";
}
var Ne = "Accordion", Rc = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [Jn, Ec, Sc] = Xt(Ne), [Zt, Np] = it(Ne, [
  Sc,
  So
]), er = So(), Oo = T.forwardRef(
  (e, t) => {
    const { type: n, ...r } = e, o = r, a = r;
    return /* @__PURE__ */ w(Jn.Provider, { scope: e.__scopeAccordion, children: n === "multiple" ? /* @__PURE__ */ w(Pc, { ...a, ref: t }) : /* @__PURE__ */ w(Ac, { ...o, ref: t }) });
  }
);
Oo.displayName = Ne;
var [Mo, Tc] = Zt(Ne), [Do, Nc] = Zt(
  Ne,
  { collapsible: !1 }
), Ac = T.forwardRef(
  (e, t) => {
    const {
      value: n,
      defaultValue: r,
      onValueChange: o = () => {
      },
      collapsible: a = !1,
      ...i
    } = e, [s, l] = Te({
      prop: n,
      defaultProp: r,
      onChange: o
    });
    return /* @__PURE__ */ w(
      Mo,
      {
        scope: e.__scopeAccordion,
        value: s ? [s] : [],
        onItemOpen: l,
        onItemClose: T.useCallback(() => a && l(""), [a, l]),
        children: /* @__PURE__ */ w(Do, { scope: e.__scopeAccordion, collapsible: a, children: /* @__PURE__ */ w(Io, { ...i, ref: t }) })
      }
    );
  }
), Pc = T.forwardRef((e, t) => {
  const {
    value: n,
    defaultValue: r,
    onValueChange: o = () => {
    },
    ...a
  } = e, [i = [], s] = Te({
    prop: n,
    defaultProp: r,
    onChange: o
  }), l = T.useCallback(
    (u) => s((f = []) => [...f, u]),
    [s]
  ), d = T.useCallback(
    (u) => s((f = []) => f.filter((p) => p !== u)),
    [s]
  );
  return /* @__PURE__ */ w(
    Mo,
    {
      scope: e.__scopeAccordion,
      value: i,
      onItemOpen: l,
      onItemClose: d,
      children: /* @__PURE__ */ w(Do, { scope: e.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ w(Io, { ...a, ref: t }) })
    }
  );
}), [Oc, Qt] = Zt(Ne), Io = T.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, disabled: r, dir: o, orientation: a = "vertical", ...i } = e, s = T.useRef(null), l = Z(s, t), d = Ec(n), f = qt(o) === "ltr", p = z(e.onKeyDown, (g) => {
      var N;
      if (!Rc.includes(g.key)) return;
      const v = g.target, m = d().filter((S) => {
        var M;
        return !((M = S.ref.current) != null && M.disabled);
      }), b = m.findIndex((S) => S.ref.current === v), h = m.length;
      if (b === -1) return;
      g.preventDefault();
      let x = b;
      const C = 0, y = h - 1, R = () => {
        x = b + 1, x > y && (x = C);
      }, A = () => {
        x = b - 1, x < C && (x = y);
      };
      switch (g.key) {
        case "Home":
          x = C;
          break;
        case "End":
          x = y;
          break;
        case "ArrowRight":
          a === "horizontal" && (f ? R() : A());
          break;
        case "ArrowDown":
          a === "vertical" && R();
          break;
        case "ArrowLeft":
          a === "horizontal" && (f ? A() : R());
          break;
        case "ArrowUp":
          a === "vertical" && A();
          break;
      }
      const E = x % h;
      (N = m[E].ref.current) == null || N.focus();
    });
    return /* @__PURE__ */ w(
      Oc,
      {
        scope: n,
        disabled: r,
        direction: o,
        orientation: a,
        children: /* @__PURE__ */ w(Jn.Slot, { scope: n, children: /* @__PURE__ */ w(
          V.div,
          {
            ...i,
            "data-orientation": a,
            ref: l,
            onKeyDown: r ? void 0 : p
          }
        ) })
      }
    );
  }
), Vt = "AccordionItem", [Mc, tr] = Zt(Vt), _o = T.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, value: r, ...o } = e, a = Qt(Vt, n), i = Tc(Vt, n), s = er(n), l = we(), d = r && i.value.includes(r) || !1, u = a.disabled || e.disabled;
    return /* @__PURE__ */ w(
      Mc,
      {
        scope: n,
        open: d,
        disabled: u,
        triggerId: l,
        children: /* @__PURE__ */ w(
          bc,
          {
            "data-orientation": a.orientation,
            "data-state": Bo(d),
            ...s,
            ...o,
            ref: t,
            disabled: u,
            open: d,
            onOpenChange: (f) => {
              f ? i.onItemOpen(r) : i.onItemClose(r);
            }
          }
        )
      }
    );
  }
);
_o.displayName = Vt;
var ko = "AccordionHeader", Lo = T.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Qt(Ne, n), a = tr(ko, n);
    return /* @__PURE__ */ w(
      V.h3,
      {
        "data-orientation": o.orientation,
        "data-state": Bo(a.open),
        "data-disabled": a.disabled ? "" : void 0,
        ...r,
        ref: t
      }
    );
  }
);
Lo.displayName = ko;
var Dn = "AccordionTrigger", $o = T.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Qt(Ne, n), a = tr(Dn, n), i = Nc(Dn, n), s = er(n);
    return /* @__PURE__ */ w(Jn.ItemSlot, { scope: n, children: /* @__PURE__ */ w(
      yc,
      {
        "aria-disabled": a.open && !i.collapsible || void 0,
        "data-orientation": o.orientation,
        id: a.triggerId,
        ...s,
        ...r,
        ref: t
      }
    ) });
  }
);
$o.displayName = Dn;
var Fo = "AccordionContent", zo = T.forwardRef(
  (e, t) => {
    const { __scopeAccordion: n, ...r } = e, o = Qt(Ne, n), a = tr(Fo, n), i = er(n);
    return /* @__PURE__ */ w(
      xc,
      {
        role: "region",
        "aria-labelledby": a.triggerId,
        "data-orientation": o.orientation,
        ...i,
        ...r,
        ref: t,
        style: {
          "--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
          "--radix-accordion-content-width": "var(--radix-collapsible-content-width)",
          ...e.style
        }
      }
    );
  }
);
zo.displayName = Fo;
function Bo(e) {
  return e ? "open" : "closed";
}
var Dc = Oo, Ic = _o, _c = Lo, Wo = $o, Vo = zo;
const Ap = Dc, kc = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(Ic, { ref: n, className: B("", e), ...t }));
kc.displayName = "AccordionItem";
const Lc = c.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ w(_c, { className: "flex", children: /* @__PURE__ */ w(
  Wo,
  {
    ref: r,
    className: B(
      "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
      e
    ),
    ...n,
    children: t
  }
) }));
Lc.displayName = Wo.displayName;
const $c = c.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ w(
  Vo,
  {
    ref: r,
    className: "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
    ...n,
    children: /* @__PURE__ */ w("div", { className: B("", e), children: t })
  }
));
$c.displayName = Vo.displayName;
function Ho(e) {
  var t, n, r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object") if (Array.isArray(e)) for (t = 0; t < e.length; t++) e[t] && (n = Ho(e[t])) && (r && (r += " "), r += n);
  else for (t in e) e[t] && (r && (r += " "), r += t);
  return r;
}
function Fc() {
  for (var e, t, n = 0, r = ""; n < arguments.length; ) (e = arguments[n++]) && (t = Ho(e)) && (r && (r += " "), r += t);
  return r;
}
const Fr = (e) => typeof e == "boolean" ? "".concat(e) : e === 0 ? "0" : e, zr = Fc, nr = (e, t) => (n) => {
  var r;
  if ((t == null ? void 0 : t.variants) == null) return zr(e, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
  const { variants: o, defaultVariants: a } = t, i = Object.keys(o).map((d) => {
    const u = n == null ? void 0 : n[d], f = a == null ? void 0 : a[d];
    if (u === null) return null;
    const p = Fr(u) || Fr(f);
    return o[d][p];
  }), s = n && Object.entries(n).reduce((d, u) => {
    let [f, p] = u;
    return p === void 0 || (d[f] = p), d;
  }, {}), l = t == null || (r = t.compoundVariants) === null || r === void 0 ? void 0 : r.reduce((d, u) => {
    let { class: f, className: p, ...g } = u;
    return Object.entries(g).every((v) => {
      let [m, b] = v;
      return Array.isArray(b) ? b.includes({
        ...a,
        ...s
      }[m]) : {
        ...a,
        ...s
      }[m] === b;
    }) ? [
      ...d,
      f,
      p
    ] : d;
  }, []);
  return zr(e, i, l, n == null ? void 0 : n.class, n == null ? void 0 : n.className);
}, zc = nr(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md font-montserrat font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 border border-transparent disabled:bg-gray-350 disabled:text-gray-150",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "shadow border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        claim: "bg-gradient-to-br from-[#C053AB] to-[#F4E077] disabled:from-gray-700 disabled:to-gray-700 disabled:text-white"
      },
      size: {
        default: "py-3 px-5 rounded-md",
        sm: "rounded-md px-3 py-2 text-sm",
        lg: "rounded-xl py-4 px-6 text-xl",
        icon: "size-12"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Bc = c.forwardRef(
  ({
    className: e,
    variant: t,
    size: n,
    asChild: r = !1,
    component: o = "button",
    ...a
  }, i) => /* @__PURE__ */ w(
    r ? tt : o,
    {
      className: B(zc({ variant: t, size: n, className: e })),
      ref: i,
      ...a
    }
  )
);
Bc.displayName = "Button";
const Wc = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  "div",
  {
    ref: n,
    className: B(
      "border border-gray-250 rounded-2xl bg-card text-card-foreground shadow-sm",
      e
    ),
    ...t
  }
));
Wc.displayName = "Card";
const Vc = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  "div",
  {
    ref: n,
    className: B("flex flex-col space-y-1.5 p-6", e),
    ...t
  }
));
Vc.displayName = "CardHeader";
const Hc = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  "h3",
  {
    ref: n,
    className: B(
      "text-2xl font-semibold leading-none tracking-tight",
      e
    ),
    ...t
  }
));
Hc.displayName = "CardTitle";
const Uc = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  "p",
  {
    ref: n,
    className: B("text-sm text-muted-foreground", e),
    ...t
  }
));
Uc.displayName = "CardDescription";
const jc = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w("div", { ref: n, className: B("px-4 sm:px-6 py-6 space-y-4", e), ...t }));
jc.displayName = "CardContent";
const Gc = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  "div",
  {
    ref: n,
    className: B("flex items-center p-6 pt-0", e),
    ...t
  }
));
Gc.displayName = "CardFooter";
function Kc(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ne(e);
  c.useEffect(() => {
    const r = (o) => {
      o.key === "Escape" && n(o);
    };
    return t.addEventListener("keydown", r, { capture: !0 }), () => t.removeEventListener("keydown", r, { capture: !0 });
  }, [n, t]);
}
var Yc = "DismissableLayer", In = "dismissableLayer.update", Xc = "dismissableLayer.pointerDownOutside", qc = "dismissableLayer.focusOutside", Br, Uo = c.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set()
}), Jt = c.forwardRef(
  (e, t) => {
    const {
      disableOutsidePointerEvents: n = !1,
      onEscapeKeyDown: r,
      onPointerDownOutside: o,
      onFocusOutside: a,
      onInteractOutside: i,
      onDismiss: s,
      ...l
    } = e, d = c.useContext(Uo), [u, f] = c.useState(null), p = (u == null ? void 0 : u.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, g] = c.useState({}), v = Z(t, (E) => f(E)), m = Array.from(d.layers), [b] = [...d.layersWithOutsidePointerEventsDisabled].slice(-1), h = m.indexOf(b), x = u ? m.indexOf(u) : -1, C = d.layersWithOutsidePointerEventsDisabled.size > 0, y = x >= h, R = Jc((E) => {
      const N = E.target, S = [...d.branches].some((M) => M.contains(N));
      !y || S || (o == null || o(E), i == null || i(E), E.defaultPrevented || s == null || s());
    }, p), A = el((E) => {
      const N = E.target;
      [...d.branches].some((M) => M.contains(N)) || (a == null || a(E), i == null || i(E), E.defaultPrevented || s == null || s());
    }, p);
    return Kc((E) => {
      x === d.layers.size - 1 && (r == null || r(E), !E.defaultPrevented && s && (E.preventDefault(), s()));
    }, p), c.useEffect(() => {
      if (u)
        return n && (d.layersWithOutsidePointerEventsDisabled.size === 0 && (Br = p.body.style.pointerEvents, p.body.style.pointerEvents = "none"), d.layersWithOutsidePointerEventsDisabled.add(u)), d.layers.add(u), Wr(), () => {
          n && d.layersWithOutsidePointerEventsDisabled.size === 1 && (p.body.style.pointerEvents = Br);
        };
    }, [u, p, n, d]), c.useEffect(() => () => {
      u && (d.layers.delete(u), d.layersWithOutsidePointerEventsDisabled.delete(u), Wr());
    }, [u, d]), c.useEffect(() => {
      const E = () => g({});
      return document.addEventListener(In, E), () => document.removeEventListener(In, E);
    }, []), /* @__PURE__ */ w(
      V.div,
      {
        ...l,
        ref: v,
        style: {
          pointerEvents: C ? y ? "auto" : "none" : void 0,
          ...e.style
        },
        onFocusCapture: z(e.onFocusCapture, A.onFocusCapture),
        onBlurCapture: z(e.onBlurCapture, A.onBlurCapture),
        onPointerDownCapture: z(
          e.onPointerDownCapture,
          R.onPointerDownCapture
        )
      }
    );
  }
);
Jt.displayName = Yc;
var Zc = "DismissableLayerBranch", Qc = c.forwardRef((e, t) => {
  const n = c.useContext(Uo), r = c.useRef(null), o = Z(t, r);
  return c.useEffect(() => {
    const a = r.current;
    if (a)
      return n.branches.add(a), () => {
        n.branches.delete(a);
      };
  }, [n.branches]), /* @__PURE__ */ w(V.div, { ...e, ref: o });
});
Qc.displayName = Zc;
function Jc(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ne(e), r = c.useRef(!1), o = c.useRef(() => {
  });
  return c.useEffect(() => {
    const a = (s) => {
      if (s.target && !r.current) {
        let l = function() {
          jo(
            Xc,
            n,
            d,
            { discrete: !0 }
          );
        };
        const d = { originalEvent: s };
        s.pointerType === "touch" ? (t.removeEventListener("click", o.current), o.current = l, t.addEventListener("click", o.current, { once: !0 })) : l();
      } else
        t.removeEventListener("click", o.current);
      r.current = !1;
    }, i = window.setTimeout(() => {
      t.addEventListener("pointerdown", a);
    }, 0);
    return () => {
      window.clearTimeout(i), t.removeEventListener("pointerdown", a), t.removeEventListener("click", o.current);
    };
  }, [t, n]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: () => r.current = !0
  };
}
function el(e, t = globalThis == null ? void 0 : globalThis.document) {
  const n = ne(e), r = c.useRef(!1);
  return c.useEffect(() => {
    const o = (a) => {
      a.target && !r.current && jo(qc, n, { originalEvent: a }, {
        discrete: !1
      });
    };
    return t.addEventListener("focusin", o), () => t.removeEventListener("focusin", o);
  }, [t, n]), {
    onFocusCapture: () => r.current = !0,
    onBlurCapture: () => r.current = !1
  };
}
function Wr() {
  const e = new CustomEvent(In);
  document.dispatchEvent(e);
}
function jo(e, t, n, { discrete: r }) {
  const o = n.originalEvent.target, a = new CustomEvent(e, { bubbles: !1, cancelable: !0, detail: n });
  t && o.addEventListener(e, t, { once: !0 }), r ? Mn(o, a) : o.dispatchEvent(a);
}
var gn = "focusScope.autoFocusOnMount", vn = "focusScope.autoFocusOnUnmount", Vr = { bubbles: !1, cancelable: !0 }, tl = "FocusScope", Go = c.forwardRef((e, t) => {
  const {
    loop: n = !1,
    trapped: r = !1,
    onMountAutoFocus: o,
    onUnmountAutoFocus: a,
    ...i
  } = e, [s, l] = c.useState(null), d = ne(o), u = ne(a), f = c.useRef(null), p = Z(t, (m) => l(m)), g = c.useRef({
    paused: !1,
    pause() {
      this.paused = !0;
    },
    resume() {
      this.paused = !1;
    }
  }).current;
  c.useEffect(() => {
    if (r) {
      let m = function(C) {
        if (g.paused || !s) return;
        const y = C.target;
        s.contains(y) ? f.current = y : Le(f.current, { select: !0 });
      }, b = function(C) {
        if (g.paused || !s) return;
        const y = C.relatedTarget;
        y !== null && (s.contains(y) || Le(f.current, { select: !0 }));
      }, h = function(C) {
        if (document.activeElement === document.body)
          for (const R of C)
            R.removedNodes.length > 0 && Le(s);
      };
      document.addEventListener("focusin", m), document.addEventListener("focusout", b);
      const x = new MutationObserver(h);
      return s && x.observe(s, { childList: !0, subtree: !0 }), () => {
        document.removeEventListener("focusin", m), document.removeEventListener("focusout", b), x.disconnect();
      };
    }
  }, [r, s, g.paused]), c.useEffect(() => {
    if (s) {
      Ur.add(g);
      const m = document.activeElement;
      if (!s.contains(m)) {
        const h = new CustomEvent(gn, Vr);
        s.addEventListener(gn, d), s.dispatchEvent(h), h.defaultPrevented || (nl(sl(Ko(s)), { select: !0 }), document.activeElement === m && Le(s));
      }
      return () => {
        s.removeEventListener(gn, d), setTimeout(() => {
          const h = new CustomEvent(vn, Vr);
          s.addEventListener(vn, u), s.dispatchEvent(h), h.defaultPrevented || Le(m ?? document.body, { select: !0 }), s.removeEventListener(vn, u), Ur.remove(g);
        }, 0);
      };
    }
  }, [s, d, u, g]);
  const v = c.useCallback(
    (m) => {
      if (!n && !r || g.paused) return;
      const b = m.key === "Tab" && !m.altKey && !m.ctrlKey && !m.metaKey, h = document.activeElement;
      if (b && h) {
        const x = m.currentTarget, [C, y] = rl(x);
        C && y ? !m.shiftKey && h === y ? (m.preventDefault(), n && Le(C, { select: !0 })) : m.shiftKey && h === C && (m.preventDefault(), n && Le(y, { select: !0 })) : h === x && m.preventDefault();
      }
    },
    [n, r, g.paused]
  );
  return /* @__PURE__ */ w(V.div, { tabIndex: -1, ...i, ref: p, onKeyDown: v });
});
Go.displayName = tl;
function nl(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const r of e)
    if (Le(r, { select: t }), document.activeElement !== n) return;
}
function rl(e) {
  const t = Ko(e), n = Hr(t, e), r = Hr(t.reverse(), e);
  return [n, r];
}
function Ko(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function Hr(e, t) {
  for (const n of e)
    if (!ol(n, { upTo: t })) return n;
}
function ol(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
function al(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
function Le(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && al(e) && t && e.select();
  }
}
var Ur = il();
function il() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = jr(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = jr(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
function jr(e, t) {
  const n = [...e], r = n.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
function sl(e) {
  return e.filter((t) => t.tagName !== "A");
}
var cl = "Portal", Yo = c.forwardRef((e, t) => {
  var s;
  const { container: n, ...r } = e, [o, a] = c.useState(!1);
  ue(() => a(!0), []);
  const i = n || o && ((s = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : s.body);
  return i ? ho.createPortal(/* @__PURE__ */ w(V.div, { ...r, ref: t }), i) : null;
});
Yo.displayName = cl;
var hn = 0;
function ll() {
  c.useEffect(() => {
    const e = document.querySelectorAll("[data-radix-focus-guard]");
    return document.body.insertAdjacentElement("afterbegin", e[0] ?? Gr()), document.body.insertAdjacentElement("beforeend", e[1] ?? Gr()), hn++, () => {
      hn === 1 && document.querySelectorAll("[data-radix-focus-guard]").forEach((t) => t.remove()), hn--;
    };
  }, []);
}
function Gr() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
var he = function() {
  return he = Object.assign || function(t) {
    for (var n, r = 1, o = arguments.length; r < o; r++) {
      n = arguments[r];
      for (var a in n) Object.prototype.hasOwnProperty.call(n, a) && (t[a] = n[a]);
    }
    return t;
  }, he.apply(this, arguments);
};
function Xo(e, t) {
  var n = {};
  for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && typeof Object.getOwnPropertySymbols == "function")
    for (var o = 0, r = Object.getOwnPropertySymbols(e); o < r.length; o++)
      t.indexOf(r[o]) < 0 && Object.prototype.propertyIsEnumerable.call(e, r[o]) && (n[r[o]] = e[r[o]]);
  return n;
}
function ul(e, t, n) {
  if (n || arguments.length === 2) for (var r = 0, o = t.length, a; r < o; r++)
    (a || !(r in t)) && (a || (a = Array.prototype.slice.call(t, 0, r)), a[r] = t[r]);
  return e.concat(a || Array.prototype.slice.call(t));
}
var Ft = "right-scroll-bar-position", zt = "width-before-scroll-bar", dl = "with-scroll-bars-hidden", fl = "--removed-body-scroll-bar-size";
function wn(e, t) {
  return typeof e == "function" ? e(t) : e && (e.current = t), e;
}
function pl(e, t) {
  var n = bs(function() {
    return {
      // value
      value: e,
      // last callback
      callback: t,
      // "memoized" public interface
      facade: {
        get current() {
          return n.value;
        },
        set current(r) {
          var o = n.value;
          o !== r && (n.value = r, n.callback(r, o));
        }
      }
    };
  })[0];
  return n.callback = t, n.facade;
}
var ml = typeof window < "u" ? c.useLayoutEffect : c.useEffect, Kr = /* @__PURE__ */ new WeakMap();
function gl(e, t) {
  var n = pl(null, function(r) {
    return e.forEach(function(o) {
      return wn(o, r);
    });
  });
  return ml(function() {
    var r = Kr.get(n);
    if (r) {
      var o = new Set(r), a = new Set(e), i = n.current;
      o.forEach(function(s) {
        a.has(s) || wn(s, null);
      }), a.forEach(function(s) {
        o.has(s) || wn(s, i);
      });
    }
    Kr.set(n, e);
  }, [e]), n;
}
function vl(e) {
  return e;
}
function hl(e, t) {
  t === void 0 && (t = vl);
  var n = [], r = !1, o = {
    read: function() {
      if (r)
        throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");
      return n.length ? n[n.length - 1] : e;
    },
    useMedium: function(a) {
      var i = t(a, r);
      return n.push(i), function() {
        n = n.filter(function(s) {
          return s !== i;
        });
      };
    },
    assignSyncMedium: function(a) {
      for (r = !0; n.length; ) {
        var i = n;
        n = [], i.forEach(a);
      }
      n = {
        push: function(s) {
          return a(s);
        },
        filter: function() {
          return n;
        }
      };
    },
    assignMedium: function(a) {
      r = !0;
      var i = [];
      if (n.length) {
        var s = n;
        n = [], s.forEach(a), i = n;
      }
      var l = function() {
        var u = i;
        i = [], u.forEach(a);
      }, d = function() {
        return Promise.resolve().then(l);
      };
      d(), n = {
        push: function(u) {
          i.push(u), d();
        },
        filter: function(u) {
          return i = i.filter(u), n;
        }
      };
    }
  };
  return o;
}
function wl(e) {
  e === void 0 && (e = {});
  var t = hl(null);
  return t.options = he({ async: !0, ssr: !1 }, e), t;
}
var qo = function(e) {
  var t = e.sideCar, n = Xo(e, ["sideCar"]);
  if (!t)
    throw new Error("Sidecar: please provide `sideCar` property to import the right car");
  var r = t.read();
  if (!r)
    throw new Error("Sidecar medium not found");
  return c.createElement(r, he({}, n));
};
qo.isSideCarExport = !0;
function bl(e, t) {
  return e.useMedium(t), qo;
}
var Zo = wl(), bn = function() {
}, en = c.forwardRef(function(e, t) {
  var n = c.useRef(null), r = c.useState({
    onScrollCapture: bn,
    onWheelCapture: bn,
    onTouchMoveCapture: bn
  }), o = r[0], a = r[1], i = e.forwardProps, s = e.children, l = e.className, d = e.removeScrollBar, u = e.enabled, f = e.shards, p = e.sideCar, g = e.noIsolation, v = e.inert, m = e.allowPinchZoom, b = e.as, h = b === void 0 ? "div" : b, x = e.gapMode, C = Xo(e, ["forwardProps", "children", "className", "removeScrollBar", "enabled", "shards", "sideCar", "noIsolation", "inert", "allowPinchZoom", "as", "gapMode"]), y = p, R = gl([n, t]), A = he(he({}, C), o);
  return c.createElement(
    c.Fragment,
    null,
    u && c.createElement(y, { sideCar: Zo, removeScrollBar: d, shards: f, noIsolation: g, inert: v, setCallbacks: a, allowPinchZoom: !!m, lockRef: n, gapMode: x }),
    i ? c.cloneElement(c.Children.only(s), he(he({}, A), { ref: R })) : c.createElement(h, he({}, A, { className: l, ref: R }), s)
  );
});
en.defaultProps = {
  enabled: !0,
  removeScrollBar: !0,
  inert: !1
};
en.classNames = {
  fullWidth: zt,
  zeroRight: Ft
};
var yl = function() {
  if (typeof __webpack_nonce__ < "u")
    return __webpack_nonce__;
};
function xl() {
  if (!document)
    return null;
  var e = document.createElement("style");
  e.type = "text/css";
  var t = yl();
  return t && e.setAttribute("nonce", t), e;
}
function Cl(e, t) {
  e.styleSheet ? e.styleSheet.cssText = t : e.appendChild(document.createTextNode(t));
}
function Rl(e) {
  var t = document.head || document.getElementsByTagName("head")[0];
  t.appendChild(e);
}
var El = function() {
  var e = 0, t = null;
  return {
    add: function(n) {
      e == 0 && (t = xl()) && (Cl(t, n), Rl(t)), e++;
    },
    remove: function() {
      e--, !e && t && (t.parentNode && t.parentNode.removeChild(t), t = null);
    }
  };
}, Sl = function() {
  var e = El();
  return function(t, n) {
    c.useEffect(function() {
      return e.add(t), function() {
        e.remove();
      };
    }, [t && n]);
  };
}, Qo = function() {
  var e = Sl(), t = function(n) {
    var r = n.styles, o = n.dynamic;
    return e(r, o), null;
  };
  return t;
}, Tl = {
  left: 0,
  top: 0,
  right: 0,
  gap: 0
}, yn = function(e) {
  return parseInt(e || "", 10) || 0;
}, Nl = function(e) {
  var t = window.getComputedStyle(document.body), n = t[e === "padding" ? "paddingLeft" : "marginLeft"], r = t[e === "padding" ? "paddingTop" : "marginTop"], o = t[e === "padding" ? "paddingRight" : "marginRight"];
  return [yn(n), yn(r), yn(o)];
}, Al = function(e) {
  if (e === void 0 && (e = "margin"), typeof window > "u")
    return Tl;
  var t = Nl(e), n = document.documentElement.clientWidth, r = window.innerWidth;
  return {
    left: t[0],
    top: t[1],
    right: t[2],
    gap: Math.max(0, r - n + t[2] - t[0])
  };
}, Pl = Qo(), Je = "data-scroll-locked", Ol = function(e, t, n, r) {
  var o = e.left, a = e.top, i = e.right, s = e.gap;
  return n === void 0 && (n = "margin"), `
  .`.concat(dl, ` {
   overflow: hidden `).concat(r, `;
   padding-right: `).concat(s, "px ").concat(r, `;
  }
  body[`).concat(Je, `] {
    overflow: hidden `).concat(r, `;
    overscroll-behavior: contain;
    `).concat([
    t && "position: relative ".concat(r, ";"),
    n === "margin" && `
    padding-left: `.concat(o, `px;
    padding-top: `).concat(a, `px;
    padding-right: `).concat(i, `px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(s, "px ").concat(r, `;
    `),
    n === "padding" && "padding-right: ".concat(s, "px ").concat(r, ";")
  ].filter(Boolean).join(""), `
  }
  
  .`).concat(Ft, ` {
    right: `).concat(s, "px ").concat(r, `;
  }
  
  .`).concat(zt, ` {
    margin-right: `).concat(s, "px ").concat(r, `;
  }
  
  .`).concat(Ft, " .").concat(Ft, ` {
    right: 0 `).concat(r, `;
  }
  
  .`).concat(zt, " .").concat(zt, ` {
    margin-right: 0 `).concat(r, `;
  }
  
  body[`).concat(Je, `] {
    `).concat(fl, ": ").concat(s, `px;
  }
`);
}, Yr = function() {
  var e = parseInt(document.body.getAttribute(Je) || "0", 10);
  return isFinite(e) ? e : 0;
}, Ml = function() {
  c.useEffect(function() {
    return document.body.setAttribute(Je, (Yr() + 1).toString()), function() {
      var e = Yr() - 1;
      e <= 0 ? document.body.removeAttribute(Je) : document.body.setAttribute(Je, e.toString());
    };
  }, []);
}, Dl = function(e) {
  var t = e.noRelative, n = e.noImportant, r = e.gapMode, o = r === void 0 ? "margin" : r;
  Ml();
  var a = c.useMemo(function() {
    return Al(o);
  }, [o]);
  return c.createElement(Pl, { styles: Ol(a, !t, o, n ? "" : "!important") });
}, _n = !1;
if (typeof window < "u")
  try {
    var Mt = Object.defineProperty({}, "passive", {
      get: function() {
        return _n = !0, !0;
      }
    });
    window.addEventListener("test", Mt, Mt), window.removeEventListener("test", Mt, Mt);
  } catch {
    _n = !1;
  }
var Xe = _n ? { passive: !1 } : !1, Il = function(e) {
  return e.tagName === "TEXTAREA";
}, Jo = function(e, t) {
  if (!(e instanceof Element))
    return !1;
  var n = window.getComputedStyle(e);
  return (
    // not-not-scrollable
    n[t] !== "hidden" && // contains scroll inside self
    !(n.overflowY === n.overflowX && !Il(e) && n[t] === "visible")
  );
}, _l = function(e) {
  return Jo(e, "overflowY");
}, kl = function(e) {
  return Jo(e, "overflowX");
}, Xr = function(e, t) {
  var n = t.ownerDocument, r = t;
  do {
    typeof ShadowRoot < "u" && r instanceof ShadowRoot && (r = r.host);
    var o = ea(e, r);
    if (o) {
      var a = ta(e, r), i = a[1], s = a[2];
      if (i > s)
        return !0;
    }
    r = r.parentNode;
  } while (r && r !== n.body);
  return !1;
}, Ll = function(e) {
  var t = e.scrollTop, n = e.scrollHeight, r = e.clientHeight;
  return [
    t,
    n,
    r
  ];
}, $l = function(e) {
  var t = e.scrollLeft, n = e.scrollWidth, r = e.clientWidth;
  return [
    t,
    n,
    r
  ];
}, ea = function(e, t) {
  return e === "v" ? _l(t) : kl(t);
}, ta = function(e, t) {
  return e === "v" ? Ll(t) : $l(t);
}, Fl = function(e, t) {
  return e === "h" && t === "rtl" ? -1 : 1;
}, zl = function(e, t, n, r, o) {
  var a = Fl(e, window.getComputedStyle(t).direction), i = a * r, s = n.target, l = t.contains(s), d = !1, u = i > 0, f = 0, p = 0;
  do {
    var g = ta(e, s), v = g[0], m = g[1], b = g[2], h = m - b - a * v;
    (v || h) && ea(e, s) && (f += h, p += v), s instanceof ShadowRoot ? s = s.host : s = s.parentNode;
  } while (
    // portaled content
    !l && s !== document.body || // self content
    l && (t.contains(s) || t === s)
  );
  return (u && (Math.abs(f) < 1 || !o) || !u && (Math.abs(p) < 1 || !o)) && (d = !0), d;
}, Dt = function(e) {
  return "changedTouches" in e ? [e.changedTouches[0].clientX, e.changedTouches[0].clientY] : [0, 0];
}, qr = function(e) {
  return [e.deltaX, e.deltaY];
}, Zr = function(e) {
  return e && "current" in e ? e.current : e;
}, Bl = function(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}, Wl = function(e) {
  return `
  .block-interactivity-`.concat(e, ` {pointer-events: none;}
  .allow-interactivity-`).concat(e, ` {pointer-events: all;}
`);
}, Vl = 0, qe = [];
function Hl(e) {
  var t = c.useRef([]), n = c.useRef([0, 0]), r = c.useRef(), o = c.useState(Vl++)[0], a = c.useState(Qo)[0], i = c.useRef(e);
  c.useEffect(function() {
    i.current = e;
  }, [e]), c.useEffect(function() {
    if (e.inert) {
      document.body.classList.add("block-interactivity-".concat(o));
      var m = ul([e.lockRef.current], (e.shards || []).map(Zr), !0).filter(Boolean);
      return m.forEach(function(b) {
        return b.classList.add("allow-interactivity-".concat(o));
      }), function() {
        document.body.classList.remove("block-interactivity-".concat(o)), m.forEach(function(b) {
          return b.classList.remove("allow-interactivity-".concat(o));
        });
      };
    }
  }, [e.inert, e.lockRef.current, e.shards]);
  var s = c.useCallback(function(m, b) {
    if ("touches" in m && m.touches.length === 2 || m.type === "wheel" && m.ctrlKey)
      return !i.current.allowPinchZoom;
    var h = Dt(m), x = n.current, C = "deltaX" in m ? m.deltaX : x[0] - h[0], y = "deltaY" in m ? m.deltaY : x[1] - h[1], R, A = m.target, E = Math.abs(C) > Math.abs(y) ? "h" : "v";
    if ("touches" in m && E === "h" && A.type === "range")
      return !1;
    var N = Xr(E, A);
    if (!N)
      return !0;
    if (N ? R = E : (R = E === "v" ? "h" : "v", N = Xr(E, A)), !N)
      return !1;
    if (!r.current && "changedTouches" in m && (C || y) && (r.current = R), !R)
      return !0;
    var S = r.current || R;
    return zl(S, b, m, S === "h" ? C : y, !0);
  }, []), l = c.useCallback(function(m) {
    var b = m;
    if (!(!qe.length || qe[qe.length - 1] !== a)) {
      var h = "deltaY" in b ? qr(b) : Dt(b), x = t.current.filter(function(R) {
        return R.name === b.type && (R.target === b.target || b.target === R.shadowParent) && Bl(R.delta, h);
      })[0];
      if (x && x.should) {
        b.cancelable && b.preventDefault();
        return;
      }
      if (!x) {
        var C = (i.current.shards || []).map(Zr).filter(Boolean).filter(function(R) {
          return R.contains(b.target);
        }), y = C.length > 0 ? s(b, C[0]) : !i.current.noIsolation;
        y && b.cancelable && b.preventDefault();
      }
    }
  }, []), d = c.useCallback(function(m, b, h, x) {
    var C = { name: m, delta: b, target: h, should: x, shadowParent: Ul(h) };
    t.current.push(C), setTimeout(function() {
      t.current = t.current.filter(function(y) {
        return y !== C;
      });
    }, 1);
  }, []), u = c.useCallback(function(m) {
    n.current = Dt(m), r.current = void 0;
  }, []), f = c.useCallback(function(m) {
    d(m.type, qr(m), m.target, s(m, e.lockRef.current));
  }, []), p = c.useCallback(function(m) {
    d(m.type, Dt(m), m.target, s(m, e.lockRef.current));
  }, []);
  c.useEffect(function() {
    return qe.push(a), e.setCallbacks({
      onScrollCapture: f,
      onWheelCapture: f,
      onTouchMoveCapture: p
    }), document.addEventListener("wheel", l, Xe), document.addEventListener("touchmove", l, Xe), document.addEventListener("touchstart", u, Xe), function() {
      qe = qe.filter(function(m) {
        return m !== a;
      }), document.removeEventListener("wheel", l, Xe), document.removeEventListener("touchmove", l, Xe), document.removeEventListener("touchstart", u, Xe);
    };
  }, []);
  var g = e.removeScrollBar, v = e.inert;
  return c.createElement(
    c.Fragment,
    null,
    v ? c.createElement(a, { styles: Wl(o) }) : null,
    g ? c.createElement(Dl, { gapMode: e.gapMode }) : null
  );
}
function Ul(e) {
  for (var t = null; e !== null; )
    e instanceof ShadowRoot && (t = e.host, e = e.host), e = e.parentNode;
  return t;
}
const jl = bl(Zo, Hl);
var na = c.forwardRef(function(e, t) {
  return c.createElement(en, he({}, e, { ref: t, sideCar: jl }));
});
na.classNames = en.classNames;
var Gl = function(e) {
  if (typeof document > "u")
    return null;
  var t = Array.isArray(e) ? e[0] : e;
  return t.ownerDocument.body;
}, Ze = /* @__PURE__ */ new WeakMap(), It = /* @__PURE__ */ new WeakMap(), _t = {}, xn = 0, ra = function(e) {
  return e && (e.host || ra(e.parentNode));
}, Kl = function(e, t) {
  return t.map(function(n) {
    if (e.contains(n))
      return n;
    var r = ra(n);
    return r && e.contains(r) ? r : (console.error("aria-hidden", n, "in not contained inside", e, ". Doing nothing"), null);
  }).filter(function(n) {
    return !!n;
  });
}, Yl = function(e, t, n, r) {
  var o = Kl(t, Array.isArray(e) ? e : [e]);
  _t[n] || (_t[n] = /* @__PURE__ */ new WeakMap());
  var a = _t[n], i = [], s = /* @__PURE__ */ new Set(), l = new Set(o), d = function(f) {
    !f || s.has(f) || (s.add(f), d(f.parentNode));
  };
  o.forEach(d);
  var u = function(f) {
    !f || l.has(f) || Array.prototype.forEach.call(f.children, function(p) {
      if (s.has(p))
        u(p);
      else
        try {
          var g = p.getAttribute(r), v = g !== null && g !== "false", m = (Ze.get(p) || 0) + 1, b = (a.get(p) || 0) + 1;
          Ze.set(p, m), a.set(p, b), i.push(p), m === 1 && v && It.set(p, !0), b === 1 && p.setAttribute(n, "true"), v || p.setAttribute(r, "true");
        } catch (h) {
          console.error("aria-hidden: cannot operate on ", p, h);
        }
    });
  };
  return u(t), s.clear(), xn++, function() {
    i.forEach(function(f) {
      var p = Ze.get(f) - 1, g = a.get(f) - 1;
      Ze.set(f, p), a.set(f, g), p || (It.has(f) || f.removeAttribute(r), It.delete(f)), g || f.removeAttribute(n);
    }), xn--, xn || (Ze = /* @__PURE__ */ new WeakMap(), Ze = /* @__PURE__ */ new WeakMap(), It = /* @__PURE__ */ new WeakMap(), _t = {});
  };
}, Xl = function(e, t, n) {
  n === void 0 && (n = "data-aria-hidden");
  var r = Array.from(Array.isArray(e) ? e : [e]), o = Gl(e);
  return o ? (r.push.apply(r, Array.from(o.querySelectorAll("[aria-live]"))), Yl(r, o, n, "aria-hidden")) : function() {
    return null;
  };
}, rr = "Dialog", [oa, Pp] = it(rr), [ql, me] = oa(rr), aa = (e) => {
  const {
    __scopeDialog: t,
    children: n,
    open: r,
    defaultOpen: o,
    onOpenChange: a,
    modal: i = !0
  } = e, s = c.useRef(null), l = c.useRef(null), [d = !1, u] = Te({
    prop: r,
    defaultProp: o,
    onChange: a
  });
  return /* @__PURE__ */ w(
    ql,
    {
      scope: t,
      triggerRef: s,
      contentRef: l,
      contentId: we(),
      titleId: we(),
      descriptionId: we(),
      open: d,
      onOpenChange: u,
      onOpenToggle: c.useCallback(() => u((f) => !f), [u]),
      modal: i,
      children: n
    }
  );
};
aa.displayName = rr;
var ia = "DialogTrigger", sa = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = me(ia, n), a = Z(t, o.triggerRef);
    return /* @__PURE__ */ w(
      V.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": o.open,
        "aria-controls": o.contentId,
        "data-state": ir(o.open),
        ...r,
        ref: a,
        onClick: z(e.onClick, o.onOpenToggle)
      }
    );
  }
);
sa.displayName = ia;
var or = "DialogPortal", [Zl, ca] = oa(or, {
  forceMount: void 0
}), la = (e) => {
  const { __scopeDialog: t, forceMount: n, children: r, container: o } = e, a = me(or, t);
  return /* @__PURE__ */ w(Zl, { scope: t, forceMount: n, children: c.Children.map(r, (i) => /* @__PURE__ */ w(pe, { present: n || a.open, children: /* @__PURE__ */ w(Yo, { asChild: !0, container: o, children: i }) })) });
};
la.displayName = or;
var Ht = "DialogOverlay", ua = c.forwardRef(
  (e, t) => {
    const n = ca(Ht, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = me(Ht, e.__scopeDialog);
    return a.modal ? /* @__PURE__ */ w(pe, { present: r || a.open, children: /* @__PURE__ */ w(Ql, { ...o, ref: t }) }) : null;
  }
);
ua.displayName = Ht;
var Ql = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = me(Ht, n);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ w(na, { as: tt, allowPinchZoom: !0, shards: [o.contentRef], children: /* @__PURE__ */ w(
        V.div,
        {
          "data-state": ir(o.open),
          ...r,
          ref: t,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }
), Ve = "DialogContent", da = c.forwardRef(
  (e, t) => {
    const n = ca(Ve, e.__scopeDialog), { forceMount: r = n.forceMount, ...o } = e, a = me(Ve, e.__scopeDialog);
    return /* @__PURE__ */ w(pe, { present: r || a.open, children: a.modal ? /* @__PURE__ */ w(Jl, { ...o, ref: t }) : /* @__PURE__ */ w(eu, { ...o, ref: t }) });
  }
);
da.displayName = Ve;
var Jl = c.forwardRef(
  (e, t) => {
    const n = me(Ve, e.__scopeDialog), r = c.useRef(null), o = Z(t, n.contentRef, r);
    return c.useEffect(() => {
      const a = r.current;
      if (a) return Xl(a);
    }, []), /* @__PURE__ */ w(
      fa,
      {
        ...e,
        ref: o,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: z(e.onCloseAutoFocus, (a) => {
          var i;
          a.preventDefault(), (i = n.triggerRef.current) == null || i.focus();
        }),
        onPointerDownOutside: z(e.onPointerDownOutside, (a) => {
          const i = a.detail.originalEvent, s = i.button === 0 && i.ctrlKey === !0;
          (i.button === 2 || s) && a.preventDefault();
        }),
        onFocusOutside: z(
          e.onFocusOutside,
          (a) => a.preventDefault()
        )
      }
    );
  }
), eu = c.forwardRef(
  (e, t) => {
    const n = me(Ve, e.__scopeDialog), r = c.useRef(!1), o = c.useRef(!1);
    return /* @__PURE__ */ w(
      fa,
      {
        ...e,
        ref: t,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (a) => {
          var i, s;
          (i = e.onCloseAutoFocus) == null || i.call(e, a), a.defaultPrevented || (r.current || (s = n.triggerRef.current) == null || s.focus(), a.preventDefault()), r.current = !1, o.current = !1;
        },
        onInteractOutside: (a) => {
          var l, d;
          (l = e.onInteractOutside) == null || l.call(e, a), a.defaultPrevented || (r.current = !0, a.detail.originalEvent.type === "pointerdown" && (o.current = !0));
          const i = a.target;
          ((d = n.triggerRef.current) == null ? void 0 : d.contains(i)) && a.preventDefault(), a.detail.originalEvent.type === "focusin" && o.current && a.preventDefault();
        }
      }
    );
  }
), fa = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: o, onCloseAutoFocus: a, ...i } = e, s = me(Ve, n), l = c.useRef(null), d = Z(t, l);
    return ll(), /* @__PURE__ */ se(xt, { children: [
      /* @__PURE__ */ w(
        Go,
        {
          asChild: !0,
          loop: !0,
          trapped: r,
          onMountAutoFocus: o,
          onUnmountAutoFocus: a,
          children: /* @__PURE__ */ w(
            Jt,
            {
              role: "dialog",
              id: s.contentId,
              "aria-describedby": s.descriptionId,
              "aria-labelledby": s.titleId,
              "data-state": ir(s.open),
              ...i,
              ref: d,
              onDismiss: () => s.onOpenChange(!1)
            }
          )
        }
      ),
      /* @__PURE__ */ se(xt, { children: [
        /* @__PURE__ */ w(tu, { titleId: s.titleId }),
        /* @__PURE__ */ w(ru, { contentRef: l, descriptionId: s.descriptionId })
      ] })
    ] });
  }
), ar = "DialogTitle", pa = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = me(ar, n);
    return /* @__PURE__ */ w(V.h2, { id: o.titleId, ...r, ref: t });
  }
);
pa.displayName = ar;
var ma = "DialogDescription", ga = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = me(ma, n);
    return /* @__PURE__ */ w(V.p, { id: o.descriptionId, ...r, ref: t });
  }
);
ga.displayName = ma;
var va = "DialogClose", ha = c.forwardRef(
  (e, t) => {
    const { __scopeDialog: n, ...r } = e, o = me(va, n);
    return /* @__PURE__ */ w(
      V.button,
      {
        type: "button",
        ...r,
        ref: t,
        onClick: z(e.onClick, () => o.onOpenChange(!1))
      }
    );
  }
);
ha.displayName = va;
function ir(e) {
  return e ? "open" : "closed";
}
var wa = "DialogTitleWarning", [Op, ba] = tc(wa, {
  contentName: Ve,
  titleName: ar,
  docsSlug: "dialog"
}), tu = ({ titleId: e }) => {
  const t = ba(wa), n = `\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;
  return c.useEffect(() => {
    e && (document.getElementById(e) || console.error(n));
  }, [n, e]), null;
}, nu = "DialogDescriptionWarning", ru = ({ contentRef: e, descriptionId: t }) => {
  const r = `Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${ba(nu).contentName}}.`;
  return c.useEffect(() => {
    var a;
    const o = (a = e.current) == null ? void 0 : a.getAttribute("aria-describedby");
    t && o && (document.getElementById(t) || console.warn(r));
  }, [r, e, t]), null;
}, ya = aa, xa = sa, Ca = la, sr = ua, cr = da, lr = pa, ur = ga, dr = ha;
const ou = (e) => /* @__PURE__ */ w("svg", { width: e.width || "24", height: e.height || "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ w("path", { d: "M18 6L6 18M6 6L18 18", stroke: "black", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }), Mp = ya, Dp = xa, au = Ca, Ip = dr, Ra = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  sr,
  {
    ref: n,
    className: B(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      e
    ),
    ...t
  }
));
Ra.displayName = sr.displayName;
const iu = c.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ se(au, { children: [
  /* @__PURE__ */ w(Ra, {}),
  /* @__PURE__ */ se(
    cr,
    {
      ref: r,
      className: B(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-8 shadow duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-2xl",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ se(dr, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground", children: [
          /* @__PURE__ */ w(ou, {}),
          /* @__PURE__ */ w("span", { className: "sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
iu.displayName = cr.displayName;
const su = ({
  className: e,
  ...t
}) => /* @__PURE__ */ w(
  "div",
  {
    className: B(
      "flex flex-col space-y-1.5 text-center sm:text-left",
      e
    ),
    ...t
  }
);
su.displayName = "DialogHeader";
const cu = ({
  className: e,
  ...t
}) => /* @__PURE__ */ w(
  "div",
  {
    className: B(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      e
    ),
    ...t
  }
);
cu.displayName = "DialogFooter";
const lu = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  lr,
  {
    ref: n,
    className: B(
      "text-2xl font-bold leading-none tracking-tight font-montserrat",
      e
    ),
    ...t
  }
));
lu.displayName = lr.displayName;
const uu = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  ur,
  {
    ref: n,
    className: B("text-sm text-muted-foreground", e),
    ...t
  }
));
uu.displayName = ur.displayName;
function du(e) {
  if (typeof document > "u") return;
  let t = document.head || document.getElementsByTagName("head")[0], n = document.createElement("style");
  n.type = "text/css", t.appendChild(n), n.styleSheet ? n.styleSheet.cssText = e : n.appendChild(document.createTextNode(e));
}
const Ea = T.createContext({
  drawerRef: {
    current: null
  },
  overlayRef: {
    current: null
  },
  onPress: () => {
  },
  onRelease: () => {
  },
  onDrag: () => {
  },
  onNestedDrag: () => {
  },
  onNestedOpenChange: () => {
  },
  onNestedRelease: () => {
  },
  openProp: void 0,
  dismissible: !1,
  isOpen: !1,
  isDragging: !1,
  keyboardIsOpen: {
    current: !1
  },
  snapPointsOffset: null,
  snapPoints: null,
  handleOnly: !1,
  modal: !1,
  shouldFade: !1,
  activeSnapPoint: null,
  onOpenChange: () => {
  },
  setActiveSnapPoint: () => {
  },
  closeDrawer: () => {
  },
  direction: "bottom",
  shouldAnimate: {
    current: !0
  },
  shouldScaleBackground: !1,
  setBackgroundColorOnScale: !0,
  noBodyStyles: !1,
  container: null,
  autoFocus: !1
}), st = () => {
  const e = T.useContext(Ea);
  if (!e)
    throw new Error("useDrawerContext must be used within a Drawer.Root");
  return e;
};
du(`[data-vaul-drawer]{touch-action:none;will-change:transform;transition:transform .5s cubic-bezier(.32, .72, 0, 1);animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=open]{animation-name:slideFromBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=bottom][data-state=closed]{animation-name:slideToBottom}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=open]{animation-name:slideFromTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=top][data-state=closed]{animation-name:slideToTop}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=open]{animation-name:slideFromLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=left][data-state=closed]{animation-name:slideToLeft}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=open]{animation-name:slideFromRight}[data-vaul-drawer][data-vaul-snap-points=false][data-vaul-drawer-direction=right][data-state=closed]{animation-name:slideToRight}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--initial-transform,100%),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}[data-vaul-drawer][data-vaul-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--initial-transform,100%),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=top]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=bottom]{transform:translate3d(0,var(--snap-point-height,0),0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=left]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-drawer][data-vaul-delayed-snap-points=true][data-vaul-drawer-direction=right]{transform:translate3d(var(--snap-point-height,0),0,0)}[data-vaul-overlay][data-vaul-snap-points=false]{animation-duration:.5s;animation-timing-function:cubic-bezier(0.32,0.72,0,1)}[data-vaul-overlay][data-vaul-snap-points=false][data-state=open]{animation-name:fadeIn}[data-vaul-overlay][data-state=closed]{animation-name:fadeOut}[data-vaul-animate=false]{animation:none!important}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:0;transition:opacity .5s cubic-bezier(.32, .72, 0, 1)}[data-vaul-overlay][data-vaul-snap-points=true]{opacity:1}[data-vaul-drawer]:not([data-vaul-custom-container=true])::after{content:'';position:absolute;background:inherit;background-color:inherit}[data-vaul-drawer][data-vaul-drawer-direction=top]::after{top:initial;bottom:100%;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=bottom]::after{top:100%;bottom:initial;left:0;right:0;height:200%}[data-vaul-drawer][data-vaul-drawer-direction=left]::after{left:initial;right:100%;top:0;bottom:0;width:200%}[data-vaul-drawer][data-vaul-drawer-direction=right]::after{left:100%;right:initial;top:0;bottom:0;width:200%}[data-vaul-overlay][data-vaul-snap-points=true]:not([data-vaul-snap-points-overlay=true]):not(
[data-state=closed]
){opacity:0}[data-vaul-overlay][data-vaul-snap-points-overlay=true]{opacity:1}[data-vaul-handle]{display:block;position:relative;opacity:.7;background:#e2e2e4;margin-left:auto;margin-right:auto;height:5px;width:32px;border-radius:1rem;touch-action:pan-y}[data-vaul-handle]:active,[data-vaul-handle]:hover{opacity:1}[data-vaul-handle-hitarea]{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max(100%,2.75rem);height:max(100%,2.75rem);touch-action:inherit}@media (hover:hover) and (pointer:fine){[data-vaul-drawer]{user-select:none}}@media (pointer:fine){[data-vaul-handle-hitarea]:{width:100%;height:100%}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeOut{to{opacity:0}}@keyframes slideFromBottom{from{transform:translate3d(0,var(--initial-transform,100%),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToBottom{to{transform:translate3d(0,var(--initial-transform,100%),0)}}@keyframes slideFromTop{from{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}to{transform:translate3d(0,0,0)}}@keyframes slideToTop{to{transform:translate3d(0,calc(var(--initial-transform,100%) * -1),0)}}@keyframes slideFromLeft{from{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToLeft{to{transform:translate3d(calc(var(--initial-transform,100%) * -1),0,0)}}@keyframes slideFromRight{from{transform:translate3d(var(--initial-transform,100%),0,0)}to{transform:translate3d(0,0,0)}}@keyframes slideToRight{to{transform:translate3d(var(--initial-transform,100%),0,0)}}`);
function fu() {
  const e = navigator.userAgent;
  return typeof window < "u" && (/Firefox/.test(e) && /Mobile/.test(e) || // Android Firefox
  /FxiOS/.test(e));
}
function pu() {
  return fr(/^Mac/);
}
function mu() {
  return fr(/^iPhone/);
}
function Qr() {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
}
function gu() {
  return fr(/^iPad/) || // iPadOS 13 lies and says it's a Mac, but we can distinguish by detecting touch support.
  pu() && navigator.maxTouchPoints > 1;
}
function Sa() {
  return mu() || gu();
}
function fr(e) {
  return typeof window < "u" && window.navigator != null ? e.test(window.navigator.platform) : void 0;
}
const vu = 24, hu = typeof window < "u" ? mo : go;
function Jr(...e) {
  return (...t) => {
    for (let n of e)
      typeof n == "function" && n(...t);
  };
}
const Cn = typeof document < "u" && window.visualViewport;
function eo(e) {
  let t = window.getComputedStyle(e);
  return /(auto|scroll)/.test(t.overflow + t.overflowX + t.overflowY);
}
function Ta(e) {
  for (eo(e) && (e = e.parentElement); e && !eo(e); )
    e = e.parentElement;
  return e || document.scrollingElement || document.documentElement;
}
const wu = /* @__PURE__ */ new Set([
  "checkbox",
  "radio",
  "range",
  "color",
  "file",
  "image",
  "button",
  "submit",
  "reset"
]);
let kt = 0, Rn;
function bu(e = {}) {
  let { isDisabled: t } = e;
  hu(() => {
    if (!t)
      return kt++, kt === 1 && Sa() && (Rn = yu()), () => {
        kt--, kt === 0 && (Rn == null || Rn());
      };
  }, [
    t
  ]);
}
function yu() {
  let e, t = 0, n = (f) => {
    e = Ta(f.target), !(e === document.documentElement && e === document.body) && (t = f.changedTouches[0].pageY);
  }, r = (f) => {
    if (!e || e === document.documentElement || e === document.body) {
      f.preventDefault();
      return;
    }
    let p = f.changedTouches[0].pageY, g = e.scrollTop, v = e.scrollHeight - e.clientHeight;
    v !== 0 && ((g <= 0 && p > t || g >= v && p < t) && f.preventDefault(), t = p);
  }, o = (f) => {
    let p = f.target;
    kn(p) && p !== document.activeElement && (f.preventDefault(), p.style.transform = "translateY(-2000px)", p.focus(), requestAnimationFrame(() => {
      p.style.transform = "";
    }));
  }, a = (f) => {
    let p = f.target;
    kn(p) && (p.style.transform = "translateY(-2000px)", requestAnimationFrame(() => {
      p.style.transform = "", Cn && (Cn.height < window.innerHeight ? requestAnimationFrame(() => {
        to(p);
      }) : Cn.addEventListener("resize", () => to(p), {
        once: !0
      }));
    }));
  }, i = () => {
    window.scrollTo(0, 0);
  }, s = window.pageXOffset, l = window.pageYOffset, d = Jr(xu(document.documentElement, "paddingRight", `${window.innerWidth - document.documentElement.clientWidth}px`));
  window.scrollTo(0, 0);
  let u = Jr(bt(document, "touchstart", n, {
    passive: !1,
    capture: !0
  }), bt(document, "touchmove", r, {
    passive: !1,
    capture: !0
  }), bt(document, "touchend", o, {
    passive: !1,
    capture: !0
  }), bt(document, "focus", a, !0), bt(window, "scroll", i));
  return () => {
    d(), u(), window.scrollTo(s, l);
  };
}
function xu(e, t, n) {
  let r = e.style[t];
  return e.style[t] = n, () => {
    e.style[t] = r;
  };
}
function bt(e, t, n, r) {
  return e.addEventListener(t, n, r), () => {
    e.removeEventListener(t, n, r);
  };
}
function to(e) {
  let t = document.scrollingElement || document.documentElement;
  for (; e && e !== t; ) {
    let n = Ta(e);
    if (n !== document.documentElement && n !== document.body && n !== e) {
      let r = n.getBoundingClientRect().top, o = e.getBoundingClientRect().top, a = e.getBoundingClientRect().bottom;
      const i = n.getBoundingClientRect().bottom + vu;
      a > i && (n.scrollTop += o - r);
    }
    e = n.parentElement;
  }
}
function kn(e) {
  return e instanceof HTMLInputElement && !wu.has(e.type) || e instanceof HTMLTextAreaElement || e instanceof HTMLElement && e.isContentEditable;
}
function Cu(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function Ru(...e) {
  return (t) => e.forEach((n) => Cu(n, t));
}
function Na(...e) {
  return c.useCallback(Ru(...e), e);
}
const Aa = /* @__PURE__ */ new WeakMap();
function ee(e, t, n = !1) {
  if (!e || !(e instanceof HTMLElement)) return;
  let r = {};
  Object.entries(t).forEach(([o, a]) => {
    if (o.startsWith("--")) {
      e.style.setProperty(o, a);
      return;
    }
    r[o] = e.style[o], e.style[o] = a;
  }), !n && Aa.set(e, r);
}
function Eu(e, t) {
  if (!e || !(e instanceof HTMLElement)) return;
  let n = Aa.get(e);
  n && (e.style[t] = n[t]);
}
const Q = (e) => {
  switch (e) {
    case "top":
    case "bottom":
      return !0;
    case "left":
    case "right":
      return !1;
    default:
      return e;
  }
};
function Lt(e, t) {
  if (!e)
    return null;
  const n = window.getComputedStyle(e), r = (
    // @ts-ignore
    n.transform || n.webkitTransform || n.mozTransform
  );
  let o = r.match(/^matrix3d\((.+)\)$/);
  return o ? parseFloat(o[1].split(", ")[Q(t) ? 13 : 12]) : (o = r.match(/^matrix\((.+)\)$/), o ? parseFloat(o[1].split(", ")[Q(t) ? 5 : 4]) : null);
}
function Su(e) {
  return 8 * (Math.log(e + 1) - 2);
}
function En(e, t) {
  if (!e) return () => {
  };
  const n = e.style.cssText;
  return Object.assign(e.style, t), () => {
    e.style.cssText = n;
  };
}
function Tu(...e) {
  return (...t) => {
    for (const n of e)
      typeof n == "function" && n(...t);
  };
}
const X = {
  DURATION: 0.5,
  EASE: [
    0.32,
    0.72,
    0,
    1
  ]
}, Pa = 0.4, Nu = 0.25, Au = 100, Oa = 8, We = 16, Ln = 26, Sn = "vaul-dragging";
function Ma(e) {
  const t = T.useRef(e);
  return T.useEffect(() => {
    t.current = e;
  }), T.useMemo(() => (...n) => t.current == null ? void 0 : t.current.call(t, ...n), []);
}
function Pu({ defaultProp: e, onChange: t }) {
  const n = T.useState(e), [r] = n, o = T.useRef(r), a = Ma(t);
  return T.useEffect(() => {
    o.current !== r && (a(r), o.current = r);
  }, [
    r,
    o,
    a
  ]), n;
}
function Da({ prop: e, defaultProp: t, onChange: n = () => {
} }) {
  const [r, o] = Pu({
    defaultProp: t,
    onChange: n
  }), a = e !== void 0, i = a ? e : r, s = Ma(n), l = T.useCallback((d) => {
    if (a) {
      const f = typeof d == "function" ? d(e) : d;
      f !== e && s(f);
    } else
      o(d);
  }, [
    a,
    e,
    o,
    s
  ]);
  return [
    i,
    l
  ];
}
function Ou({ activeSnapPointProp: e, setActiveSnapPointProp: t, snapPoints: n, drawerRef: r, overlayRef: o, fadeFromIndex: a, onSnapPointChange: i, direction: s = "bottom", container: l, snapToSequentialPoint: d }) {
  const [u, f] = Da({
    prop: e,
    defaultProp: n == null ? void 0 : n[0],
    onChange: t
  }), [p, g] = T.useState(typeof window < "u" ? {
    innerWidth: window.innerWidth,
    innerHeight: window.innerHeight
  } : void 0);
  T.useEffect(() => {
    function E() {
      g({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
      });
    }
    return window.addEventListener("resize", E), () => window.removeEventListener("resize", E);
  }, []);
  const v = T.useMemo(() => u === (n == null ? void 0 : n[n.length - 1]) || null, [
    n,
    u
  ]), m = T.useMemo(() => {
    var E;
    return (E = n == null ? void 0 : n.findIndex((N) => N === u)) != null ? E : null;
  }, [
    n,
    u
  ]), b = n && n.length > 0 && (a || a === 0) && !Number.isNaN(a) && n[a] === u || !n, h = T.useMemo(() => {
    const E = l ? {
      width: l.getBoundingClientRect().width,
      height: l.getBoundingClientRect().height
    } : typeof window < "u" ? {
      width: window.innerWidth,
      height: window.innerHeight
    } : {
      width: 0,
      height: 0
    };
    var N;
    return (N = n == null ? void 0 : n.map((S) => {
      const M = typeof S == "string";
      let k = 0;
      if (M && (k = parseInt(S, 10)), Q(s)) {
        const P = M ? k : p ? S * E.height : 0;
        return p ? s === "bottom" ? E.height - P : -E.height + P : P;
      }
      const O = M ? k : p ? S * E.width : 0;
      return p ? s === "right" ? E.width - O : -E.width + O : O;
    })) != null ? N : [];
  }, [
    n,
    p,
    l
  ]), x = T.useMemo(() => m !== null ? h == null ? void 0 : h[m] : null, [
    h,
    m
  ]), C = T.useCallback((E) => {
    var N;
    const S = (N = h == null ? void 0 : h.findIndex((M) => M === E)) != null ? N : null;
    i(S), ee(r.current, {
      transition: `transform ${X.DURATION}s cubic-bezier(${X.EASE.join(",")})`,
      transform: Q(s) ? `translate3d(0, ${E}px, 0)` : `translate3d(${E}px, 0, 0)`
    }), h && S !== h.length - 1 && a !== void 0 && S !== a && S < a ? ee(o.current, {
      transition: `opacity ${X.DURATION}s cubic-bezier(${X.EASE.join(",")})`,
      opacity: "0"
    }) : ee(o.current, {
      transition: `opacity ${X.DURATION}s cubic-bezier(${X.EASE.join(",")})`,
      opacity: "1"
    }), f(n == null ? void 0 : n[Math.max(S, 0)]);
  }, [
    r.current,
    n,
    h,
    a,
    o,
    f
  ]);
  T.useEffect(() => {
    if (u || e) {
      var E;
      const N = (E = n == null ? void 0 : n.findIndex((S) => S === e || S === u)) != null ? E : -1;
      h && N !== -1 && typeof h[N] == "number" && C(h[N]);
    }
  }, [
    u,
    e,
    n,
    h,
    C
  ]);
  function y({ draggedDistance: E, closeDrawer: N, velocity: S, dismissible: M }) {
    if (a === void 0) return;
    const k = s === "bottom" || s === "right" ? (x ?? 0) - E : (x ?? 0) + E, O = m === a - 1, P = m === 0, $ = E > 0;
    if (O && ee(o.current, {
      transition: `opacity ${X.DURATION}s cubic-bezier(${X.EASE.join(",")})`
    }), !d && S > 2 && !$) {
      M ? N() : C(h[0]);
      return;
    }
    if (!d && S > 2 && $ && h && n) {
      C(h[n.length - 1]);
      return;
    }
    const H = h == null ? void 0 : h.reduce((W, _) => typeof W != "number" || typeof _ != "number" ? W : Math.abs(_ - k) < Math.abs(W - k) ? _ : W), I = Q(s) ? window.innerHeight : window.innerWidth;
    if (S > Pa && Math.abs(E) < I * 0.4) {
      const W = $ ? 1 : -1;
      if (W > 0 && v && n) {
        C(h[n.length - 1]);
        return;
      }
      if (P && W < 0 && M && N(), m === null) return;
      C(h[m + W]);
      return;
    }
    C(H);
  }
  function R({ draggedDistance: E }) {
    if (x === null) return;
    const N = s === "bottom" || s === "right" ? x - E : x + E;
    (s === "bottom" || s === "right") && N < h[h.length - 1] || (s === "top" || s === "left") && N > h[h.length - 1] || ee(r.current, {
      transform: Q(s) ? `translate3d(0, ${N}px, 0)` : `translate3d(${N}px, 0, 0)`
    });
  }
  function A(E, N) {
    if (!n || typeof m != "number" || !h || a === void 0) return null;
    const S = m === a - 1;
    if (m >= a && N)
      return 0;
    if (S && !N) return 1;
    if (!b && !S) return null;
    const k = S ? m + 1 : m - 1, O = S ? h[k] - h[k - 1] : h[k + 1] - h[k], P = E / Math.abs(O);
    return S ? 1 - P : P;
  }
  return {
    isLastSnapPoint: v,
    activeSnapPoint: u,
    shouldFade: b,
    getPercentageDragged: A,
    setActiveSnapPoint: f,
    activeSnapPointIndex: m,
    onRelease: y,
    onDrag: R,
    snapPointsOffset: h
  };
}
const Mu = () => () => {
};
function Du() {
  const { direction: e, isOpen: t, shouldScaleBackground: n, setBackgroundColorOnScale: r, noBodyStyles: o } = st(), a = T.useRef(null), i = ys(() => document.body.style.backgroundColor, []);
  function s() {
    return (window.innerWidth - Ln) / window.innerWidth;
  }
  T.useEffect(() => {
    if (t && n) {
      a.current && clearTimeout(a.current);
      const l = document.querySelector("[data-vaul-drawer-wrapper]") || document.querySelector("[vaul-drawer-wrapper]");
      if (!l) return;
      Tu(r && !o ? En(document.body, {
        background: "black"
      }) : Mu, En(l, {
        transformOrigin: Q(e) ? "top" : "left",
        transitionProperty: "transform, border-radius",
        transitionDuration: `${X.DURATION}s`,
        transitionTimingFunction: `cubic-bezier(${X.EASE.join(",")})`
      }));
      const d = En(l, {
        borderRadius: `${Oa}px`,
        overflow: "hidden",
        ...Q(e) ? {
          transform: `scale(${s()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`
        } : {
          transform: `scale(${s()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`
        }
      });
      return () => {
        d(), a.current = window.setTimeout(() => {
          i ? document.body.style.background = i : document.body.style.removeProperty("background");
        }, X.DURATION * 1e3);
      };
    }
  }, [
    t,
    n,
    i
  ]);
}
let yt = null;
function Iu({ isOpen: e, modal: t, nested: n, hasBeenOpened: r, preventScrollRestoration: o, noBodyStyles: a }) {
  const [i, s] = T.useState(() => typeof window < "u" ? window.location.href : ""), l = T.useRef(0), d = T.useCallback(() => {
    if (Qr() && yt === null && e && !a) {
      yt = {
        position: document.body.style.position,
        top: document.body.style.top,
        left: document.body.style.left,
        height: document.body.style.height,
        right: "unset"
      };
      const { scrollX: f, innerHeight: p } = window;
      document.body.style.setProperty("position", "fixed", "important"), Object.assign(document.body.style, {
        top: `${-l.current}px`,
        left: `${-f}px`,
        right: "0px",
        height: "auto"
      }), window.setTimeout(() => window.requestAnimationFrame(() => {
        const g = p - window.innerHeight;
        g && l.current >= p && (document.body.style.top = `${-(l.current + g)}px`);
      }), 300);
    }
  }, [
    e
  ]), u = T.useCallback(() => {
    if (Qr() && yt !== null && !a) {
      const f = -parseInt(document.body.style.top, 10), p = -parseInt(document.body.style.left, 10);
      Object.assign(document.body.style, yt), window.requestAnimationFrame(() => {
        if (o && i !== window.location.href) {
          s(window.location.href);
          return;
        }
        window.scrollTo(p, f);
      }), yt = null;
    }
  }, [
    i
  ]);
  return T.useEffect(() => {
    function f() {
      l.current = window.scrollY;
    }
    return f(), window.addEventListener("scroll", f), () => {
      window.removeEventListener("scroll", f);
    };
  }, []), T.useEffect(() => {
    if (t)
      return () => {
        typeof document > "u" || document.querySelector("[data-vaul-drawer]") || u();
      };
  }, [
    t,
    u
  ]), T.useEffect(() => {
    n || !r || (e ? (!window.matchMedia("(display-mode: standalone)").matches && d(), t || window.setTimeout(() => {
      u();
    }, 500)) : u());
  }, [
    e,
    r,
    i,
    t,
    n,
    d,
    u
  ]), {
    restorePositionSetting: u
  };
}
function Ia({ open: e, onOpenChange: t, children: n, onDrag: r, onRelease: o, snapPoints: a, shouldScaleBackground: i = !1, setBackgroundColorOnScale: s = !0, closeThreshold: l = Nu, scrollLockTimeout: d = Au, dismissible: u = !0, handleOnly: f = !1, fadeFromIndex: p = a && a.length - 1, activeSnapPoint: g, setActiveSnapPoint: v, fixed: m, modal: b = !0, onClose: h, nested: x, noBodyStyles: C = !1, direction: y = "bottom", defaultOpen: R = !1, disablePreventScroll: A = !0, snapToSequentialPoint: E = !1, preventScrollRestoration: N = !1, repositionInputs: S = !0, onAnimationEnd: M, container: k, autoFocus: O = !1 }) {
  var P, $;
  const [H = !1, I] = Da({
    defaultProp: R,
    prop: e,
    onChange: (D) => {
      t == null || t(D), !D && !x && ds(), setTimeout(() => {
        M == null || M(D);
      }, X.DURATION * 1e3), D && !b && typeof window < "u" && window.requestAnimationFrame(() => {
        document.body.style.pointerEvents = "auto";
      }), D || (document.body.style.pointerEvents = "auto");
    }
  }), [W, _] = T.useState(!1), [j, J] = T.useState(!1), [te, St] = T.useState(!1), Ae = T.useRef(null), Ue = T.useRef(null), dt = T.useRef(null), ft = T.useRef(null), Pe = T.useRef(null), Oe = T.useRef(!1), je = T.useRef(null), Ge = T.useRef(0), Ce = T.useRef(!1), pt = T.useRef(!R), Me = T.useRef(0), L = T.useRef(null), Tt = T.useRef(((P = L.current) == null ? void 0 : P.getBoundingClientRect().height) || 0), Nt = T.useRef((($ = L.current) == null ? void 0 : $.getBoundingClientRect().width) || 0), mt = T.useRef(0), pn = T.useCallback((D) => {
    a && D === gt.length - 1 && (Ue.current = /* @__PURE__ */ new Date());
  }, []), { activeSnapPoint: Ke, activeSnapPointIndex: Ye, setActiveSnapPoint: Mr, onRelease: cs, snapPointsOffset: gt, onDrag: ls, shouldFade: Dr, getPercentageDragged: us } = Ou({
    snapPoints: a,
    activeSnapPointProp: g,
    setActiveSnapPointProp: v,
    drawerRef: L,
    fadeFromIndex: p,
    overlayRef: Ae,
    onSnapPointChange: pn,
    direction: y,
    container: k,
    snapToSequentialPoint: E
  });
  bu({
    isDisabled: !H || j || !b || te || !W || !S || !A
  });
  const { restorePositionSetting: ds } = Iu({
    isOpen: H,
    modal: b,
    nested: x ?? !1,
    hasBeenOpened: W,
    preventScrollRestoration: N,
    noBodyStyles: C
  });
  function At() {
    return (window.innerWidth - Ln) / window.innerWidth;
  }
  function fs(D) {
    var G, K;
    !u && !a || L.current && !L.current.contains(D.target) || (Tt.current = ((G = L.current) == null ? void 0 : G.getBoundingClientRect().height) || 0, Nt.current = ((K = L.current) == null ? void 0 : K.getBoundingClientRect().width) || 0, J(!0), dt.current = /* @__PURE__ */ new Date(), Sa() && window.addEventListener("touchend", () => Oe.current = !1, {
      once: !0
    }), D.target.setPointerCapture(D.pointerId), Ge.current = Q(y) ? D.pageY : D.pageX);
  }
  function Ir(D, G) {
    var K;
    let U = D;
    const q = (K = window.getSelection()) == null ? void 0 : K.toString(), oe = L.current ? Lt(L.current, y) : null, re = /* @__PURE__ */ new Date();
    if (U.tagName === "SELECT" || U.hasAttribute("data-vaul-no-drag") || U.closest("[data-vaul-no-drag]"))
      return !1;
    if (y === "right" || y === "left")
      return !0;
    if (Ue.current && re.getTime() - Ue.current.getTime() < 500)
      return !1;
    if (oe !== null && (y === "bottom" ? oe > 0 : oe < 0))
      return !0;
    if (q && q.length > 0)
      return !1;
    if (Pe.current && re.getTime() - Pe.current.getTime() < d && oe === 0 || G)
      return Pe.current = re, !1;
    for (; U; ) {
      if (U.scrollHeight > U.clientHeight) {
        if (U.scrollTop !== 0)
          return Pe.current = /* @__PURE__ */ new Date(), !1;
        if (U.getAttribute("role") === "dialog")
          return !0;
      }
      U = U.parentNode;
    }
    return !0;
  }
  function ps(D) {
    if (L.current && j) {
      const G = y === "bottom" || y === "right" ? 1 : -1, K = (Ge.current - (Q(y) ? D.pageY : D.pageX)) * G, U = K > 0, q = a && !u && !U;
      if (q && Ye === 0) return;
      const oe = Math.abs(K), re = document.querySelector("[data-vaul-drawer-wrapper]"), De = y === "bottom" || y === "top" ? Tt.current : Nt.current;
      let le = oe / De;
      const Be = us(oe, U);
      if (Be !== null && (le = Be), q && le >= 1 || !Oe.current && !Ir(D.target, U)) return;
      if (L.current.classList.add(Sn), Oe.current = !0, ee(L.current, {
        transition: "none"
      }), ee(Ae.current, {
        transition: "none"
      }), a && ls({
        draggedDistance: K
      }), U && !a) {
        const ve = Su(K), Pt = Math.min(ve * -1, 0) * G;
        ee(L.current, {
          transform: Q(y) ? `translate3d(0, ${Pt}px, 0)` : `translate3d(${Pt}px, 0, 0)`
        });
        return;
      }
      const Ie = 1 - le;
      if ((Dr || p && Ye === p - 1) && (r == null || r(D, le), ee(Ae.current, {
        opacity: `${Ie}`,
        transition: "none"
      }, !0)), re && Ae.current && i) {
        const ve = Math.min(At() + le * (1 - At()), 1), Pt = 8 - le * 8, kr = Math.max(0, 14 - le * 14);
        ee(re, {
          borderRadius: `${Pt}px`,
          transform: Q(y) ? `scale(${ve}) translate3d(0, ${kr}px, 0)` : `scale(${ve}) translate3d(${kr}px, 0, 0)`,
          transition: "none"
        }, !0);
      }
      if (!a) {
        const ve = oe * G;
        ee(L.current, {
          transform: Q(y) ? `translate3d(0, ${ve}px, 0)` : `translate3d(${ve}px, 0, 0)`
        });
      }
    }
  }
  T.useEffect(() => {
    window.requestAnimationFrame(() => {
      pt.current = !0;
    });
  }, []), T.useEffect(() => {
    var D;
    function G() {
      if (!L.current || !S) return;
      const K = document.activeElement;
      if (kn(K) || Ce.current) {
        var U;
        const q = ((U = window.visualViewport) == null ? void 0 : U.height) || 0, oe = window.innerHeight;
        let re = oe - q;
        const De = L.current.getBoundingClientRect().height || 0, le = De > oe * 0.8;
        mt.current || (mt.current = De);
        const Be = L.current.getBoundingClientRect().top;
        if (Math.abs(Me.current - re) > 60 && (Ce.current = !Ce.current), a && a.length > 0 && gt && Ye) {
          const Ie = gt[Ye] || 0;
          re += Ie;
        }
        if (Me.current = re, De > q || Ce.current) {
          const Ie = L.current.getBoundingClientRect().height;
          let ve = Ie;
          Ie > q && (ve = q - (le ? Be : Ln)), m ? L.current.style.height = `${Ie - Math.max(re, 0)}px` : L.current.style.height = `${Math.max(ve, q - Be)}px`;
        } else fu() || (L.current.style.height = `${mt.current}px`);
        a && a.length > 0 && !Ce.current ? L.current.style.bottom = "0px" : L.current.style.bottom = `${Math.max(re, 0)}px`;
      }
    }
    return (D = window.visualViewport) == null || D.addEventListener("resize", G), () => {
      var K;
      return (K = window.visualViewport) == null ? void 0 : K.removeEventListener("resize", G);
    };
  }, [
    Ye,
    a,
    gt
  ]);
  function vt(D) {
    ms(), h == null || h(), D || I(!1), setTimeout(() => {
      a && Mr(a[0]);
    }, X.DURATION * 1e3);
  }
  function _r() {
    if (!L.current) return;
    const D = document.querySelector("[data-vaul-drawer-wrapper]"), G = Lt(L.current, y);
    ee(L.current, {
      transform: "translate3d(0, 0, 0)",
      transition: `transform ${X.DURATION}s cubic-bezier(${X.EASE.join(",")})`
    }), ee(Ae.current, {
      transition: `opacity ${X.DURATION}s cubic-bezier(${X.EASE.join(",")})`,
      opacity: "1"
    }), i && G && G > 0 && H && ee(D, {
      borderRadius: `${Oa}px`,
      overflow: "hidden",
      ...Q(y) ? {
        transform: `scale(${At()}) translate3d(0, calc(env(safe-area-inset-top) + 14px), 0)`,
        transformOrigin: "top"
      } : {
        transform: `scale(${At()}) translate3d(calc(env(safe-area-inset-top) + 14px), 0, 0)`,
        transformOrigin: "left"
      },
      transitionProperty: "transform, border-radius",
      transitionDuration: `${X.DURATION}s`,
      transitionTimingFunction: `cubic-bezier(${X.EASE.join(",")})`
    }, !0);
  }
  function ms() {
    !j || !L.current || (L.current.classList.remove(Sn), Oe.current = !1, J(!1), ft.current = /* @__PURE__ */ new Date());
  }
  function gs(D) {
    if (!j || !L.current) return;
    L.current.classList.remove(Sn), Oe.current = !1, J(!1), ft.current = /* @__PURE__ */ new Date();
    const G = Lt(L.current, y);
    if (!D || !Ir(D.target, !1) || !G || Number.isNaN(G) || dt.current === null) return;
    const K = ft.current.getTime() - dt.current.getTime(), U = Ge.current - (Q(y) ? D.pageY : D.pageX), q = Math.abs(U) / K;
    if (q > 0.05 && (St(!0), setTimeout(() => {
      St(!1);
    }, 200)), a) {
      cs({
        draggedDistance: U * (y === "bottom" || y === "right" ? 1 : -1),
        closeDrawer: vt,
        velocity: q,
        dismissible: u
      }), o == null || o(D, !0);
      return;
    }
    if (y === "bottom" || y === "right" ? U > 0 : U < 0) {
      _r(), o == null || o(D, !0);
      return;
    }
    if (q > Pa) {
      vt(), o == null || o(D, !1);
      return;
    }
    var oe;
    const re = Math.min((oe = L.current.getBoundingClientRect().height) != null ? oe : 0, window.innerHeight);
    var De;
    const le = Math.min((De = L.current.getBoundingClientRect().width) != null ? De : 0, window.innerWidth), Be = y === "left" || y === "right";
    if (Math.abs(G) >= (Be ? le : re) * l) {
      vt(), o == null || o(D, !1);
      return;
    }
    o == null || o(D, !0), _r();
  }
  T.useEffect(() => (H && (ee(document.documentElement, {
    scrollBehavior: "auto"
  }), Ue.current = /* @__PURE__ */ new Date()), () => {
    Eu(document.documentElement, "scrollBehavior");
  }), [
    H
  ]);
  function vs(D) {
    const G = D ? (window.innerWidth - We) / window.innerWidth : 1, K = D ? -We : 0;
    je.current && window.clearTimeout(je.current), ee(L.current, {
      transition: `transform ${X.DURATION}s cubic-bezier(${X.EASE.join(",")})`,
      transform: Q(y) ? `scale(${G}) translate3d(0, ${K}px, 0)` : `scale(${G}) translate3d(${K}, 0, 0)`
    }), !D && L.current && (je.current = setTimeout(() => {
      const U = Lt(L.current, y);
      ee(L.current, {
        transition: "none",
        transform: Q(y) ? `translate3d(0, ${U}px, 0)` : `translate3d(${U}px, 0, 0)`
      });
    }, 500));
  }
  function hs(D, G) {
    if (G < 0) return;
    const K = (window.innerWidth - We) / window.innerWidth, U = K + G * (1 - K), q = -We + G * We;
    ee(L.current, {
      transform: Q(y) ? `scale(${U}) translate3d(0, ${q}px, 0)` : `scale(${U}) translate3d(${q}px, 0, 0)`,
      transition: "none"
    });
  }
  function ws(D, G) {
    const K = Q(y) ? window.innerHeight : window.innerWidth, U = G ? (K - We) / K : 1, q = G ? -We : 0;
    G && ee(L.current, {
      transition: `transform ${X.DURATION}s cubic-bezier(${X.EASE.join(",")})`,
      transform: Q(y) ? `scale(${U}) translate3d(0, ${q}px, 0)` : `scale(${U}) translate3d(${q}px, 0, 0)`
    });
  }
  return T.useEffect(() => {
    b || window.requestAnimationFrame(() => {
      document.body.style.pointerEvents = "auto";
    });
  }, [
    b
  ]), /* @__PURE__ */ T.createElement(ya, {
    defaultOpen: R,
    onOpenChange: (D) => {
      !u && !D || (D ? _(!0) : vt(!0), I(D));
    },
    open: H
  }, /* @__PURE__ */ T.createElement(Ea.Provider, {
    value: {
      activeSnapPoint: Ke,
      snapPoints: a,
      setActiveSnapPoint: Mr,
      drawerRef: L,
      overlayRef: Ae,
      onOpenChange: t,
      onPress: fs,
      onRelease: gs,
      onDrag: ps,
      dismissible: u,
      shouldAnimate: pt,
      handleOnly: f,
      isOpen: H,
      isDragging: j,
      shouldFade: Dr,
      closeDrawer: vt,
      onNestedDrag: hs,
      onNestedOpenChange: vs,
      onNestedRelease: ws,
      keyboardIsOpen: Ce,
      modal: b,
      snapPointsOffset: gt,
      activeSnapPointIndex: Ye,
      direction: y,
      shouldScaleBackground: i,
      setBackgroundColorOnScale: s,
      noBodyStyles: C,
      container: k,
      autoFocus: O
    }
  }, n));
}
const _a = /* @__PURE__ */ T.forwardRef(function({ ...e }, t) {
  const { overlayRef: n, snapPoints: r, onRelease: o, shouldFade: a, isOpen: i, modal: s, shouldAnimate: l } = st(), d = Na(t, n), u = r && r.length > 0;
  if (!s)
    return null;
  const f = T.useCallback((p) => o(p), [
    o
  ]);
  return /* @__PURE__ */ T.createElement(sr, {
    onMouseUp: f,
    ref: d,
    "data-vaul-overlay": "",
    "data-vaul-snap-points": i && u ? "true" : "false",
    "data-vaul-snap-points-overlay": i && a ? "true" : "false",
    "data-vaul-animate": l != null && l.current ? "true" : "false",
    ...e
  });
});
_a.displayName = "Drawer.Overlay";
const ka = /* @__PURE__ */ T.forwardRef(function({ onPointerDownOutside: e, style: t, onOpenAutoFocus: n, ...r }, o) {
  const { drawerRef: a, onPress: i, onRelease: s, onDrag: l, keyboardIsOpen: d, snapPointsOffset: u, activeSnapPointIndex: f, modal: p, isOpen: g, direction: v, snapPoints: m, container: b, handleOnly: h, shouldAnimate: x, autoFocus: C } = st(), [y, R] = T.useState(!1), A = Na(o, a), E = T.useRef(null), N = T.useRef(null), S = T.useRef(!1), M = m && m.length > 0;
  Du();
  const k = (P, $, H = 0) => {
    if (S.current) return !0;
    const I = Math.abs(P.y), W = Math.abs(P.x), _ = W > I, j = [
      "bottom",
      "right"
    ].includes($) ? 1 : -1;
    if ($ === "left" || $ === "right") {
      if (!(P.x * j < 0) && W >= 0 && W <= H)
        return _;
    } else if (!(P.y * j < 0) && I >= 0 && I <= H)
      return !_;
    return S.current = !0, !0;
  };
  T.useEffect(() => {
    M && window.requestAnimationFrame(() => {
      R(!0);
    });
  }, []);
  function O(P) {
    E.current = null, S.current = !1, s(P);
  }
  return /* @__PURE__ */ T.createElement(cr, {
    "data-vaul-drawer-direction": v,
    "data-vaul-drawer": "",
    "data-vaul-delayed-snap-points": y ? "true" : "false",
    "data-vaul-snap-points": g && M ? "true" : "false",
    "data-vaul-custom-container": b ? "true" : "false",
    "data-vaul-animate": x != null && x.current ? "true" : "false",
    ...r,
    ref: A,
    style: u && u.length > 0 ? {
      "--snap-point-height": `${u[f ?? 0]}px`,
      ...t
    } : t,
    onPointerDown: (P) => {
      h || (r.onPointerDown == null || r.onPointerDown.call(r, P), E.current = {
        x: P.pageX,
        y: P.pageY
      }, i(P));
    },
    onOpenAutoFocus: (P) => {
      n == null || n(P), C || P.preventDefault();
    },
    onPointerDownOutside: (P) => {
      if (e == null || e(P), !p || P.defaultPrevented) {
        P.preventDefault();
        return;
      }
      d.current && (d.current = !1);
    },
    onFocusOutside: (P) => {
      if (!p) {
        P.preventDefault();
        return;
      }
    },
    onPointerMove: (P) => {
      if (N.current = P, h || (r.onPointerMove == null || r.onPointerMove.call(r, P), !E.current)) return;
      const $ = P.pageY - E.current.y, H = P.pageX - E.current.x, I = P.pointerType === "touch" ? 10 : 2;
      k({
        x: H,
        y: $
      }, v, I) ? l(P) : (Math.abs(H) > I || Math.abs($) > I) && (E.current = null);
    },
    onPointerUp: (P) => {
      r.onPointerUp == null || r.onPointerUp.call(r, P), E.current = null, S.current = !1, s(P);
    },
    onPointerOut: (P) => {
      r.onPointerOut == null || r.onPointerOut.call(r, P), O(N.current);
    },
    onContextMenu: (P) => {
      r.onContextMenu == null || r.onContextMenu.call(r, P), N.current && O(N.current);
    }
  });
});
ka.displayName = "Drawer.Content";
const _u = 250, ku = 120, La = /* @__PURE__ */ T.forwardRef(function({ preventCycle: e = !1, children: t, ...n }, r) {
  const { closeDrawer: o, isDragging: a, snapPoints: i, activeSnapPoint: s, setActiveSnapPoint: l, dismissible: d, handleOnly: u, isOpen: f, onPress: p, onDrag: g } = st(), v = T.useRef(null), m = T.useRef(!1);
  function b() {
    if (m.current) {
      C();
      return;
    }
    window.setTimeout(() => {
      h();
    }, ku);
  }
  function h() {
    if (a || e || m.current) {
      C();
      return;
    }
    if (C(), !i || i.length === 0) {
      d || o();
      return;
    }
    if (s === i[i.length - 1] && d) {
      o();
      return;
    }
    const R = i.findIndex((E) => E === s);
    if (R === -1) return;
    const A = i[R + 1];
    l(A);
  }
  function x() {
    v.current = window.setTimeout(() => {
      m.current = !0;
    }, _u);
  }
  function C() {
    v.current && window.clearTimeout(v.current), m.current = !1;
  }
  return /* @__PURE__ */ T.createElement("div", {
    onClick: b,
    onPointerCancel: C,
    onPointerDown: (y) => {
      u && p(y), x();
    },
    onPointerMove: (y) => {
      u && g(y);
    },
    // onPointerUp is already handled by the content component
    ref: r,
    "data-vaul-drawer-visible": f ? "true" : "false",
    "data-vaul-handle": "",
    "aria-hidden": "true",
    ...n
  }, /* @__PURE__ */ T.createElement("span", {
    "data-vaul-handle-hitarea": "",
    "aria-hidden": "true"
  }, t));
});
La.displayName = "Drawer.Handle";
function Lu({ onDrag: e, onOpenChange: t, ...n }) {
  const { onNestedDrag: r, onNestedOpenChange: o, onNestedRelease: a } = st();
  if (!r)
    throw new Error("Drawer.NestedRoot must be placed in another drawer");
  return /* @__PURE__ */ T.createElement(Ia, {
    nested: !0,
    onClose: () => {
      o(!1);
    },
    onDrag: (i, s) => {
      r(i, s), e == null || e(i, s);
    },
    onOpenChange: (i) => {
      i && o(i);
    },
    onRelease: a,
    ...n
  });
}
function $u(e) {
  const t = st(), { container: n = t.container, ...r } = e;
  return /* @__PURE__ */ T.createElement(Ca, {
    container: n,
    ...r
  });
}
const ge = {
  Root: Ia,
  NestedRoot: Lu,
  Content: ka,
  Overlay: _a,
  Trigger: xa,
  Portal: $u,
  Handle: La,
  Close: dr,
  Title: lr,
  Description: ur
}, Fu = ({
  shouldScaleBackground: e = !0,
  ...t
}) => /* @__PURE__ */ w(
  ge.Root,
  {
    shouldScaleBackground: e,
    ...t
  }
);
Fu.displayName = "Drawer";
const _p = ge.Trigger, zu = ge.Portal, kp = ge.Close, $a = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  ge.Overlay,
  {
    ref: n,
    className: B("fixed inset-0 z-50 bg-black/80", e),
    ...t
  }
));
$a.displayName = ge.Overlay.displayName;
const Bu = c.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ se(zu, { children: [
  /* @__PURE__ */ w($a, { className: "drawer-overlay" }),
  /* @__PURE__ */ w(
    ge.Content,
    {
      ref: r,
      className: B(
        "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
        e
      ),
      ...n,
      children: t
    }
  )
] }));
Bu.displayName = "DrawerContent";
const Wu = ({
  className: e,
  ...t
}) => /* @__PURE__ */ w(
  "div",
  {
    className: B("grid gap-1.5 p-4 text-center sm:text-left", e),
    ...t
  }
);
Wu.displayName = "DrawerHeader";
const Vu = ({
  className: e,
  ...t
}) => /* @__PURE__ */ w(
  "div",
  {
    className: B("mt-auto flex flex-col gap-2 p-4", e),
    ...t
  }
);
Vu.displayName = "DrawerFooter";
const Hu = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  ge.Title,
  {
    ref: n,
    className: B(
      "text-lg font-semibold leading-none tracking-tight",
      e
    ),
    ...t
  }
));
Hu.displayName = ge.Title.displayName;
const Uu = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  ge.Description,
  {
    ref: n,
    className: B("text-sm text-muted-foreground", e),
    ...t
  }
));
Uu.displayName = ge.Description.displayName;
var ju = "Label", Fa = c.forwardRef((e, t) => /* @__PURE__ */ w(
  V.label,
  {
    ...e,
    ref: t,
    onMouseDown: (n) => {
      var o;
      n.target.closest("button, input, select, textarea") || ((o = e.onMouseDown) == null || o.call(e, n), !n.defaultPrevented && n.detail > 1 && n.preventDefault());
    }
  }
));
Fa.displayName = ju;
var za = Fa;
const Gu = nr(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
), Ku = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  za,
  {
    ref: n,
    className: B(Gu(), "text-gray-500 text-sm", e),
    ...t
  }
));
Ku.displayName = za.displayName;
function Yu(e) {
  const t = c.useRef({ value: e, previous: e });
  return c.useMemo(() => (t.current.value !== e && (t.current.previous = t.current.value, t.current.value = e), t.current.previous), [e]);
}
var Xu = "VisuallyHidden", Ba = c.forwardRef(
  (e, t) => /* @__PURE__ */ w(
    V.span,
    {
      ...e,
      ref: t,
      style: {
        // See: https://github.com/twbs/bootstrap/blob/master/scss/mixins/_screen-reader.scss
        position: "absolute",
        border: 0,
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        wordWrap: "normal",
        ...e.style
      }
    }
  )
);
Ba.displayName = Xu;
var Wa = Ba, ct = "NavigationMenu", [pr, Va, qu] = Xt(ct), [$n, Zu, Qu] = Xt(ct), [mr, Lp] = it(
  ct,
  [qu, Qu]
), [Ju, ce] = mr(ct), [ed, td] = mr(ct), Ha = c.forwardRef(
  (e, t) => {
    const {
      __scopeNavigationMenu: n,
      value: r,
      onValueChange: o,
      defaultValue: a,
      delayDuration: i = 200,
      skipDelayDuration: s = 300,
      orientation: l = "horizontal",
      dir: d,
      ...u
    } = e, [f, p] = c.useState(null), g = Z(t, (S) => p(S)), v = qt(d), m = c.useRef(0), b = c.useRef(0), h = c.useRef(0), [x, C] = c.useState(!0), [y = "", R] = Te({
      prop: r,
      onChange: (S) => {
        const M = S !== "", k = s > 0;
        M ? (window.clearTimeout(h.current), k && C(!1)) : (window.clearTimeout(h.current), h.current = window.setTimeout(
          () => C(!0),
          s
        )), o == null || o(S);
      },
      defaultProp: a
    }), A = c.useCallback(() => {
      window.clearTimeout(b.current), b.current = window.setTimeout(() => R(""), 150);
    }, [R]), E = c.useCallback(
      (S) => {
        window.clearTimeout(b.current), R(S);
      },
      [R]
    ), N = c.useCallback(
      (S) => {
        y === S ? window.clearTimeout(b.current) : m.current = window.setTimeout(() => {
          window.clearTimeout(b.current), R(S);
        }, i);
      },
      [y, R, i]
    );
    return c.useEffect(() => () => {
      window.clearTimeout(m.current), window.clearTimeout(b.current), window.clearTimeout(h.current);
    }, []), /* @__PURE__ */ w(
      ja,
      {
        scope: n,
        isRootMenu: !0,
        value: y,
        dir: v,
        orientation: l,
        rootNavigationMenu: f,
        onTriggerEnter: (S) => {
          window.clearTimeout(m.current), x ? N(S) : E(S);
        },
        onTriggerLeave: () => {
          window.clearTimeout(m.current), A();
        },
        onContentEnter: () => window.clearTimeout(b.current),
        onContentLeave: A,
        onItemSelect: (S) => {
          R((M) => M === S ? "" : S);
        },
        onItemDismiss: () => R(""),
        children: /* @__PURE__ */ w(
          V.nav,
          {
            "aria-label": "Main",
            "data-orientation": l,
            dir: v,
            ...u,
            ref: g
          }
        )
      }
    );
  }
);
Ha.displayName = ct;
var Ua = "NavigationMenuSub", nd = c.forwardRef(
  (e, t) => {
    const {
      __scopeNavigationMenu: n,
      value: r,
      onValueChange: o,
      defaultValue: a,
      orientation: i = "horizontal",
      ...s
    } = e, l = ce(Ua, n), [d = "", u] = Te({
      prop: r,
      onChange: o,
      defaultProp: a
    });
    return /* @__PURE__ */ w(
      ja,
      {
        scope: n,
        isRootMenu: !1,
        value: d,
        dir: l.dir,
        orientation: i,
        rootNavigationMenu: l.rootNavigationMenu,
        onTriggerEnter: (f) => u(f),
        onItemSelect: (f) => u(f),
        onItemDismiss: () => u(""),
        children: /* @__PURE__ */ w(V.div, { "data-orientation": i, ...s, ref: t })
      }
    );
  }
);
nd.displayName = Ua;
var ja = (e) => {
  const {
    scope: t,
    isRootMenu: n,
    rootNavigationMenu: r,
    dir: o,
    orientation: a,
    children: i,
    value: s,
    onItemSelect: l,
    onItemDismiss: d,
    onTriggerEnter: u,
    onTriggerLeave: f,
    onContentEnter: p,
    onContentLeave: g
  } = e, [v, m] = c.useState(null), [b, h] = c.useState(/* @__PURE__ */ new Map()), [x, C] = c.useState(null);
  return /* @__PURE__ */ w(
    Ju,
    {
      scope: t,
      isRootMenu: n,
      rootNavigationMenu: r,
      value: s,
      previousValue: Yu(s),
      baseId: we(),
      dir: o,
      orientation: a,
      viewport: v,
      onViewportChange: m,
      indicatorTrack: x,
      onIndicatorTrackChange: C,
      onTriggerEnter: ne(u),
      onTriggerLeave: ne(f),
      onContentEnter: ne(p),
      onContentLeave: ne(g),
      onItemSelect: ne(l),
      onItemDismiss: ne(d),
      onViewportContentChange: c.useCallback((y, R) => {
        h((A) => (A.set(y, R), new Map(A)));
      }, []),
      onViewportContentRemove: c.useCallback((y) => {
        h((R) => R.has(y) ? (R.delete(y), new Map(R)) : R);
      }, []),
      children: /* @__PURE__ */ w(pr.Provider, { scope: t, children: /* @__PURE__ */ w(ed, { scope: t, items: b, children: i }) })
    }
  );
}, Ga = "NavigationMenuList", Ka = c.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: n, ...r } = e, o = ce(Ga, n), a = /* @__PURE__ */ w(V.ul, { "data-orientation": o.orientation, ...r, ref: t });
    return /* @__PURE__ */ w(V.div, { style: { position: "relative" }, ref: o.onIndicatorTrackChange, children: /* @__PURE__ */ w(pr.Slot, { scope: n, children: o.isRootMenu ? /* @__PURE__ */ w(ri, { asChild: !0, children: a }) : a }) });
  }
);
Ka.displayName = Ga;
var Ya = "NavigationMenuItem", [rd, Xa] = mr(Ya), qa = c.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: n, value: r, ...o } = e, a = we(), i = r || a || "LEGACY_REACT_AUTO_VALUE", s = c.useRef(null), l = c.useRef(null), d = c.useRef(null), u = c.useRef(() => {
    }), f = c.useRef(!1), p = c.useCallback((v = "start") => {
      if (s.current) {
        u.current();
        const m = zn(s.current);
        m.length && hr(v === "start" ? m : m.reverse());
      }
    }, []), g = c.useCallback(() => {
      if (s.current) {
        const v = zn(s.current);
        v.length && (u.current = ud(v));
      }
    }, []);
    return /* @__PURE__ */ w(
      rd,
      {
        scope: n,
        value: i,
        triggerRef: l,
        contentRef: s,
        focusProxyRef: d,
        wasEscapeCloseRef: f,
        onEntryKeyDown: p,
        onFocusProxyEnter: p,
        onRootContentClose: g,
        onContentFocusOutside: g,
        children: /* @__PURE__ */ w(V.li, { ...o, ref: t })
      }
    );
  }
);
qa.displayName = Ya;
var Fn = "NavigationMenuTrigger", Za = c.forwardRef((e, t) => {
  const { __scopeNavigationMenu: n, disabled: r, ...o } = e, a = ce(Fn, e.__scopeNavigationMenu), i = Xa(Fn, e.__scopeNavigationMenu), s = c.useRef(null), l = Z(s, i.triggerRef, t), d = ai(a.baseId, i.value), u = ii(a.baseId, i.value), f = c.useRef(!1), p = c.useRef(!1), g = i.value === a.value;
  return /* @__PURE__ */ se(xt, { children: [
    /* @__PURE__ */ w(pr.ItemSlot, { scope: n, value: i.value, children: /* @__PURE__ */ w(oi, { asChild: !0, children: /* @__PURE__ */ w(
      V.button,
      {
        id: d,
        disabled: r,
        "data-disabled": r ? "" : void 0,
        "data-state": wr(g),
        "aria-expanded": g,
        "aria-controls": u,
        ...o,
        ref: l,
        onPointerEnter: z(e.onPointerEnter, () => {
          p.current = !1, i.wasEscapeCloseRef.current = !1;
        }),
        onPointerMove: z(
          e.onPointerMove,
          Ut(() => {
            r || p.current || i.wasEscapeCloseRef.current || f.current || (a.onTriggerEnter(i.value), f.current = !0);
          })
        ),
        onPointerLeave: z(
          e.onPointerLeave,
          Ut(() => {
            r || (a.onTriggerLeave(), f.current = !1);
          })
        ),
        onClick: z(e.onClick, () => {
          a.onItemSelect(i.value), p.current = g;
        }),
        onKeyDown: z(e.onKeyDown, (v) => {
          const b = { horizontal: "ArrowDown", vertical: a.dir === "rtl" ? "ArrowLeft" : "ArrowRight" }[a.orientation];
          g && v.key === b && (i.onEntryKeyDown(), v.preventDefault());
        })
      }
    ) }) }),
    g && /* @__PURE__ */ se(xt, { children: [
      /* @__PURE__ */ w(
        Wa,
        {
          "aria-hidden": !0,
          tabIndex: 0,
          ref: i.focusProxyRef,
          onFocus: (v) => {
            const m = i.contentRef.current, b = v.relatedTarget, h = b === s.current, x = m == null ? void 0 : m.contains(b);
            (h || !x) && i.onFocusProxyEnter(h ? "start" : "end");
          }
        }
      ),
      a.viewport && /* @__PURE__ */ w("span", { "aria-owns": u })
    ] })
  ] });
});
Za.displayName = Fn;
var od = "NavigationMenuLink", no = "navigationMenu.linkSelect", Qa = c.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: n, active: r, onSelect: o, ...a } = e;
    return /* @__PURE__ */ w(oi, { asChild: !0, children: /* @__PURE__ */ w(
      V.a,
      {
        "data-active": r ? "" : void 0,
        "aria-current": r ? "page" : void 0,
        ...a,
        ref: t,
        onClick: z(
          e.onClick,
          (i) => {
            const s = i.target, l = new CustomEvent(no, {
              bubbles: !0,
              cancelable: !0
            });
            if (s.addEventListener(no, (d) => o == null ? void 0 : o(d), { once: !0 }), Mn(s, l), !l.defaultPrevented && !i.metaKey) {
              const d = new CustomEvent(Bt, {
                bubbles: !0,
                cancelable: !0
              });
              Mn(s, d);
            }
          },
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }
);
Qa.displayName = od;
var gr = "NavigationMenuIndicator", Ja = c.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = ce(gr, e.__scopeNavigationMenu), a = !!o.value;
  return o.indicatorTrack ? ho.createPortal(
    /* @__PURE__ */ w(pe, { present: n || a, children: /* @__PURE__ */ w(ad, { ...r, ref: t }) }),
    o.indicatorTrack
  ) : null;
});
Ja.displayName = gr;
var ad = c.forwardRef((e, t) => {
  const { __scopeNavigationMenu: n, ...r } = e, o = ce(gr, n), a = Va(n), [i, s] = c.useState(
    null
  ), [l, d] = c.useState(null), u = o.orientation === "horizontal", f = !!o.value;
  c.useEffect(() => {
    var m;
    const v = (m = a().find((b) => b.value === o.value)) == null ? void 0 : m.ref.current;
    v && s(v);
  }, [a, o.value]);
  const p = () => {
    i && d({
      size: u ? i.offsetWidth : i.offsetHeight,
      offset: u ? i.offsetLeft : i.offsetTop
    });
  };
  return Bn(i, p), Bn(o.indicatorTrack, p), l ? /* @__PURE__ */ w(
    V.div,
    {
      "aria-hidden": !0,
      "data-state": f ? "visible" : "hidden",
      "data-orientation": o.orientation,
      ...r,
      ref: t,
      style: {
        position: "absolute",
        ...u ? {
          left: 0,
          width: l.size + "px",
          transform: `translateX(${l.offset}px)`
        } : {
          top: 0,
          height: l.size + "px",
          transform: `translateY(${l.offset}px)`
        },
        ...r.style
      }
    }
  ) : null;
}), nt = "NavigationMenuContent", ei = c.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, o = ce(nt, e.__scopeNavigationMenu), a = Xa(nt, e.__scopeNavigationMenu), i = Z(a.contentRef, t), s = a.value === o.value, l = {
    value: a.value,
    triggerRef: a.triggerRef,
    focusProxyRef: a.focusProxyRef,
    wasEscapeCloseRef: a.wasEscapeCloseRef,
    onContentFocusOutside: a.onContentFocusOutside,
    onRootContentClose: a.onRootContentClose,
    ...r
  };
  return o.viewport ? /* @__PURE__ */ w(id, { forceMount: n, ...l, ref: i }) : /* @__PURE__ */ w(pe, { present: n || s, children: /* @__PURE__ */ w(
    ti,
    {
      "data-state": wr(s),
      ...l,
      ref: i,
      onPointerEnter: z(e.onPointerEnter, o.onContentEnter),
      onPointerLeave: z(
        e.onPointerLeave,
        Ut(o.onContentLeave)
      ),
      style: {
        // Prevent interaction when animating out
        pointerEvents: !s && o.isRootMenu ? "none" : void 0,
        ...l.style
      }
    }
  ) });
});
ei.displayName = nt;
var id = c.forwardRef((e, t) => {
  const n = ce(nt, e.__scopeNavigationMenu), { onViewportContentChange: r, onViewportContentRemove: o } = n;
  return ue(() => {
    r(e.value, {
      ref: t,
      ...e
    });
  }, [e, t, r]), ue(() => () => o(e.value), [e.value, o]), null;
}), Bt = "navigationMenu.rootContentDismiss", ti = c.forwardRef((e, t) => {
  const {
    __scopeNavigationMenu: n,
    value: r,
    triggerRef: o,
    focusProxyRef: a,
    wasEscapeCloseRef: i,
    onRootContentClose: s,
    onContentFocusOutside: l,
    ...d
  } = e, u = ce(nt, n), f = c.useRef(null), p = Z(f, t), g = ai(u.baseId, r), v = ii(u.baseId, r), m = Va(n), b = c.useRef(null), { onItemDismiss: h } = u;
  c.useEffect(() => {
    const C = f.current;
    if (u.isRootMenu && C) {
      const y = () => {
        var R;
        h(), s(), C.contains(document.activeElement) && ((R = o.current) == null || R.focus());
      };
      return C.addEventListener(Bt, y), () => C.removeEventListener(Bt, y);
    }
  }, [u.isRootMenu, e.value, o, h, s]);
  const x = c.useMemo(() => {
    const y = m().map((M) => M.value);
    u.dir === "rtl" && y.reverse();
    const R = y.indexOf(u.value), A = y.indexOf(u.previousValue), E = r === u.value, N = A === y.indexOf(r);
    if (!E && !N) return b.current;
    const S = (() => {
      if (R !== A) {
        if (E && A !== -1) return R > A ? "from-end" : "from-start";
        if (N && R !== -1) return R > A ? "to-start" : "to-end";
      }
      return null;
    })();
    return b.current = S, S;
  }, [u.previousValue, u.value, u.dir, m, r]);
  return /* @__PURE__ */ w(ri, { asChild: !0, children: /* @__PURE__ */ w(
    Jt,
    {
      id: v,
      "aria-labelledby": g,
      "data-motion": x,
      "data-orientation": u.orientation,
      ...d,
      ref: p,
      disableOutsidePointerEvents: !1,
      onDismiss: () => {
        var y;
        const C = new Event(Bt, {
          bubbles: !0,
          cancelable: !0
        });
        (y = f.current) == null || y.dispatchEvent(C);
      },
      onFocusOutside: z(e.onFocusOutside, (C) => {
        var R;
        l();
        const y = C.target;
        (R = u.rootNavigationMenu) != null && R.contains(y) && C.preventDefault();
      }),
      onPointerDownOutside: z(e.onPointerDownOutside, (C) => {
        var E;
        const y = C.target, R = m().some((N) => {
          var S;
          return (S = N.ref.current) == null ? void 0 : S.contains(y);
        }), A = u.isRootMenu && ((E = u.viewport) == null ? void 0 : E.contains(y));
        (R || A || !u.isRootMenu) && C.preventDefault();
      }),
      onKeyDown: z(e.onKeyDown, (C) => {
        var A;
        const y = C.altKey || C.ctrlKey || C.metaKey;
        if (C.key === "Tab" && !y) {
          const E = zn(C.currentTarget), N = document.activeElement, S = E.findIndex((O) => O === N), k = C.shiftKey ? E.slice(0, S).reverse() : E.slice(S + 1, E.length);
          hr(k) ? C.preventDefault() : (A = a.current) == null || A.focus();
        }
      }),
      onEscapeKeyDown: z(e.onEscapeKeyDown, (C) => {
        i.current = !0;
      })
    }
  ) });
}), vr = "NavigationMenuViewport", ni = c.forwardRef((e, t) => {
  const { forceMount: n, ...r } = e, a = !!ce(vr, e.__scopeNavigationMenu).value;
  return /* @__PURE__ */ w(pe, { present: n || a, children: /* @__PURE__ */ w(sd, { ...r, ref: t }) });
});
ni.displayName = vr;
var sd = c.forwardRef((e, t) => {
  const { __scopeNavigationMenu: n, children: r, ...o } = e, a = ce(vr, n), i = Z(t, a.onViewportChange), s = td(
    nt,
    e.__scopeNavigationMenu
  ), [l, d] = c.useState(null), [u, f] = c.useState(null), p = l ? (l == null ? void 0 : l.width) + "px" : void 0, g = l ? (l == null ? void 0 : l.height) + "px" : void 0, v = !!a.value, m = v ? a.value : a.previousValue;
  return Bn(u, () => {
    u && d({ width: u.offsetWidth, height: u.offsetHeight });
  }), /* @__PURE__ */ w(
    V.div,
    {
      "data-state": wr(v),
      "data-orientation": a.orientation,
      ...o,
      ref: i,
      style: {
        // Prevent interaction when animating out
        pointerEvents: !v && a.isRootMenu ? "none" : void 0,
        "--radix-navigation-menu-viewport-width": p,
        "--radix-navigation-menu-viewport-height": g,
        ...o.style
      },
      onPointerEnter: z(e.onPointerEnter, a.onContentEnter),
      onPointerLeave: z(e.onPointerLeave, Ut(a.onContentLeave)),
      children: Array.from(s.items).map(([h, { ref: x, forceMount: C, ...y }]) => {
        const R = m === h;
        return /* @__PURE__ */ w(pe, { present: C || R, children: /* @__PURE__ */ w(
          ti,
          {
            ...y,
            ref: Yn(x, (A) => {
              R && A && f(A);
            })
          }
        ) }, h);
      })
    }
  );
}), cd = "FocusGroup", ri = c.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: n, ...r } = e, o = ce(cd, n);
    return /* @__PURE__ */ w($n.Provider, { scope: n, children: /* @__PURE__ */ w($n.Slot, { scope: n, children: /* @__PURE__ */ w(V.div, { dir: o.dir, ...r, ref: t }) }) });
  }
), ro = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"], ld = "FocusGroupItem", oi = c.forwardRef(
  (e, t) => {
    const { __scopeNavigationMenu: n, ...r } = e, o = Zu(n), a = ce(ld, n);
    return /* @__PURE__ */ w($n.ItemSlot, { scope: n, children: /* @__PURE__ */ w(
      V.button,
      {
        ...r,
        ref: t,
        onKeyDown: z(e.onKeyDown, (i) => {
          if (["Home", "End", ...ro].includes(i.key)) {
            let l = o().map((f) => f.ref.current);
            if ([a.dir === "rtl" ? "ArrowRight" : "ArrowLeft", "ArrowUp", "End"].includes(i.key) && l.reverse(), ro.includes(i.key)) {
              const f = l.indexOf(i.currentTarget);
              l = l.slice(f + 1);
            }
            setTimeout(() => hr(l)), i.preventDefault();
          }
        })
      }
    ) });
  }
);
function zn(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
function hr(e) {
  const t = document.activeElement;
  return e.some((n) => n === t ? !0 : (n.focus(), document.activeElement !== t));
}
function ud(e) {
  return e.forEach((t) => {
    t.dataset.tabindex = t.getAttribute("tabindex") || "", t.setAttribute("tabindex", "-1");
  }), () => {
    e.forEach((t) => {
      const n = t.dataset.tabindex;
      t.setAttribute("tabindex", n);
    });
  };
}
function Bn(e, t) {
  const n = ne(t);
  ue(() => {
    let r = 0;
    if (e) {
      const o = new ResizeObserver(() => {
        cancelAnimationFrame(r), r = window.requestAnimationFrame(n);
      });
      return o.observe(e), () => {
        window.cancelAnimationFrame(r), o.unobserve(e);
      };
    }
  }, [e, n]);
}
function wr(e) {
  return e ? "open" : "closed";
}
function ai(e, t) {
  return `${e}-trigger-${t}`;
}
function ii(e, t) {
  return `${e}-content-${t}`;
}
function Ut(e) {
  return (t) => t.pointerType === "mouse" ? e(t) : void 0;
}
var si = Ha, ci = Ka, dd = qa, li = Za, fd = Qa, ui = Ja, di = ei, fi = ni;
const pd = (e) => /* @__PURE__ */ w("svg", { className: e.className, width: e.width || "24", height: e.height || "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ w("path", { d: "M6 9L12 15L18 9", stroke: e.color || "black", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }), md = c.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ se(
  si,
  {
    ref: r,
    className: B(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ w(pi, {})
    ]
  }
));
md.displayName = si.displayName;
const gd = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  ci,
  {
    ref: n,
    className: B(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      e
    ),
    ...t
  }
));
gd.displayName = ci.displayName;
const $p = dd, vd = nr(
  "group inline-flex h-10 w-max items-center justify-center rounded-md bg-background text-sm font-medium transition-colors hover:text-accent-foreground  disabled:pointer-events-none disabled:opacity-50"
), hd = c.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ se(
  li,
  {
    ref: r,
    className: B(vd(), "group", e),
    ...n,
    children: [
      t,
      " ",
      /* @__PURE__ */ w(
        pd,
        {
          style: { transform: "rotate(0)" },
          width: 16,
          height: 16,
          color: "rgba(75, 85, 99, 1)",
          className: "relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180",
          "aria-hidden": "true"
        }
      )
    ]
  }
));
hd.displayName = li.displayName;
const wd = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  di,
  {
    ref: n,
    className: B(
      "left-0 top-0 w-full data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 md:absolute md:w-auto ",
      e
    ),
    ...t
  }
));
wd.displayName = di.displayName;
const Fp = fd, pi = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w("div", { className: B("absolute left-0 top-full flex justify-center"), children: /* @__PURE__ */ w(
  fi,
  {
    className: B(
      "origin-top-center relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-[var(--radix-navigation-menu-viewport-width)]",
      e
    ),
    ref: n,
    ...t
  }
) }));
pi.displayName = fi.displayName;
const bd = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  ui,
  {
    ref: n,
    className: B(
      "top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in",
      e
    ),
    ...t,
    children: /* @__PURE__ */ w("div", { className: "relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" })
  }
));
bd.displayName = ui.displayName;
var yd = "Separator", oo = "horizontal", xd = ["horizontal", "vertical"], mi = c.forwardRef((e, t) => {
  const { decorative: n, orientation: r = oo, ...o } = e, a = Cd(r) ? r : oo, s = n ? { role: "none" } : { "aria-orientation": a === "vertical" ? a : void 0, role: "separator" };
  return /* @__PURE__ */ w(
    V.div,
    {
      "data-orientation": a,
      ...s,
      ...o,
      ref: t
    }
  );
});
mi.displayName = yd;
function Cd(e) {
  return xd.includes(e);
}
var gi = mi;
const Rd = c.forwardRef(
  ({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ w(
    gi,
    {
      ref: o,
      decorative: n,
      orientation: t,
      className: B(
        "shrink-0 bg-border",
        t === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
        e
      ),
      ...r
    }
  )
);
Rd.displayName = gi.displayName;
function zp({
  className: e,
  ...t
}) {
  return /* @__PURE__ */ w(
    "div",
    {
      className: B("animate-pulse rounded-md bg-muted", e),
      ...t
    }
  );
}
function Ed(e, t = []) {
  let n = [];
  function r(a, i) {
    const s = c.createContext(i), l = n.length;
    n = [...n, i];
    function d(f) {
      const { scope: p, children: g, ...v } = f, m = (p == null ? void 0 : p[e][l]) || s, b = c.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ w(m.Provider, { value: b, children: g });
    }
    function u(f, p) {
      const g = (p == null ? void 0 : p[e][l]) || s, v = c.useContext(g);
      if (v) return v;
      if (i !== void 0) return i;
      throw new Error(`\`${f}\` must be used within \`${a}\``);
    }
    return d.displayName = a + "Provider", [d, u];
  }
  const o = () => {
    const a = n.map((i) => c.createContext(i));
    return function(s) {
      const l = (s == null ? void 0 : s[e]) || a;
      return c.useMemo(
        () => ({ [`__scope${e}`]: { ...s, [e]: l } }),
        [s, l]
      );
    };
  };
  return o.scopeName = e, [r, Sd(o, ...t)];
}
function Sd(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const i = r.reduce((s, { useScope: l, scopeName: d }) => {
        const f = l(a)[`__scope${d}`];
        return { ...s, ...f };
      }, {});
      return c.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
var Tn = "rovingFocusGroup.onEntryFocus", Td = { bubbles: !1, cancelable: !0 }, tn = "RovingFocusGroup", [Wn, vi, Nd] = Xt(tn), [Ad, hi] = Ed(
  tn,
  [Nd]
), [Pd, Od] = Ad(tn), wi = c.forwardRef(
  (e, t) => /* @__PURE__ */ w(Wn.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ w(Wn.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ w(Md, { ...e, ref: t }) }) })
);
wi.displayName = tn;
var Md = c.forwardRef((e, t) => {
  const {
    __scopeRovingFocusGroup: n,
    orientation: r,
    loop: o = !1,
    dir: a,
    currentTabStopId: i,
    defaultCurrentTabStopId: s,
    onCurrentTabStopIdChange: l,
    onEntryFocus: d,
    preventScrollOnEntryFocus: u = !1,
    ...f
  } = e, p = c.useRef(null), g = Z(t, p), v = qt(a), [m = null, b] = Te({
    prop: i,
    defaultProp: s,
    onChange: l
  }), [h, x] = c.useState(!1), C = ne(d), y = vi(n), R = c.useRef(!1), [A, E] = c.useState(0);
  return c.useEffect(() => {
    const N = p.current;
    if (N)
      return N.addEventListener(Tn, C), () => N.removeEventListener(Tn, C);
  }, [C]), /* @__PURE__ */ w(
    Pd,
    {
      scope: n,
      orientation: r,
      dir: v,
      loop: o,
      currentTabStopId: m,
      onItemFocus: c.useCallback(
        (N) => b(N),
        [b]
      ),
      onItemShiftTab: c.useCallback(() => x(!0), []),
      onFocusableItemAdd: c.useCallback(
        () => E((N) => N + 1),
        []
      ),
      onFocusableItemRemove: c.useCallback(
        () => E((N) => N - 1),
        []
      ),
      children: /* @__PURE__ */ w(
        V.div,
        {
          tabIndex: h || A === 0 ? -1 : 0,
          "data-orientation": r,
          ...f,
          ref: g,
          style: { outline: "none", ...e.style },
          onMouseDown: z(e.onMouseDown, () => {
            R.current = !0;
          }),
          onFocus: z(e.onFocus, (N) => {
            const S = !R.current;
            if (N.target === N.currentTarget && S && !h) {
              const M = new CustomEvent(Tn, Td);
              if (N.currentTarget.dispatchEvent(M), !M.defaultPrevented) {
                const k = y().filter((I) => I.focusable), O = k.find((I) => I.active), P = k.find((I) => I.id === m), H = [O, P, ...k].filter(
                  Boolean
                ).map((I) => I.ref.current);
                xi(H, u);
              }
            }
            R.current = !1;
          }),
          onBlur: z(e.onBlur, () => x(!1))
        }
      )
    }
  );
}), bi = "RovingFocusGroupItem", yi = c.forwardRef(
  (e, t) => {
    const {
      __scopeRovingFocusGroup: n,
      focusable: r = !0,
      active: o = !1,
      tabStopId: a,
      ...i
    } = e, s = we(), l = a || s, d = Od(bi, n), u = d.currentTabStopId === l, f = vi(n), { onFocusableItemAdd: p, onFocusableItemRemove: g } = d;
    return c.useEffect(() => {
      if (r)
        return p(), () => g();
    }, [r, p, g]), /* @__PURE__ */ w(
      Wn.ItemSlot,
      {
        scope: n,
        id: l,
        focusable: r,
        active: o,
        children: /* @__PURE__ */ w(
          V.span,
          {
            tabIndex: u ? 0 : -1,
            "data-orientation": d.orientation,
            ...i,
            ref: t,
            onMouseDown: z(e.onMouseDown, (v) => {
              r ? d.onItemFocus(l) : v.preventDefault();
            }),
            onFocus: z(e.onFocus, () => d.onItemFocus(l)),
            onKeyDown: z(e.onKeyDown, (v) => {
              if (v.key === "Tab" && v.shiftKey) {
                d.onItemShiftTab();
                return;
              }
              if (v.target !== v.currentTarget) return;
              const m = _d(v, d.orientation, d.dir);
              if (m !== void 0) {
                if (v.metaKey || v.ctrlKey || v.altKey || v.shiftKey) return;
                v.preventDefault();
                let h = f().filter((x) => x.focusable).map((x) => x.ref.current);
                if (m === "last") h.reverse();
                else if (m === "prev" || m === "next") {
                  m === "prev" && h.reverse();
                  const x = h.indexOf(v.currentTarget);
                  h = d.loop ? kd(h, x + 1) : h.slice(x + 1);
                }
                setTimeout(() => xi(h));
              }
            })
          }
        )
      }
    );
  }
);
yi.displayName = bi;
var Dd = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function Id(e, t) {
  return t !== "rtl" ? e : e === "ArrowLeft" ? "ArrowRight" : e === "ArrowRight" ? "ArrowLeft" : e;
}
function _d(e, t, n) {
  const r = Id(e.key, n);
  if (!(t === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(t === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return Dd[r];
}
function xi(e, t = !1) {
  const n = document.activeElement;
  for (const r of e)
    if (r === n || (r.focus({ preventScroll: t }), document.activeElement !== n)) return;
}
function kd(e, t) {
  return e.map((n, r) => e[(t + r) % e.length]);
}
var Ld = wi, $d = yi, br = "Tabs", [Fd, Bp] = it(br, [
  hi
]), Ci = hi(), [zd, yr] = Fd(br), Ri = c.forwardRef(
  (e, t) => {
    const {
      __scopeTabs: n,
      value: r,
      onValueChange: o,
      defaultValue: a,
      orientation: i = "horizontal",
      dir: s,
      activationMode: l = "automatic",
      ...d
    } = e, u = qt(s), [f, p] = Te({
      prop: r,
      onChange: o,
      defaultProp: a
    });
    return /* @__PURE__ */ w(
      zd,
      {
        scope: n,
        baseId: we(),
        value: f,
        onValueChange: p,
        orientation: i,
        dir: u,
        activationMode: l,
        children: /* @__PURE__ */ w(
          V.div,
          {
            dir: u,
            "data-orientation": i,
            ...d,
            ref: t
          }
        )
      }
    );
  }
);
Ri.displayName = br;
var Ei = "TabsList", Si = c.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, loop: r = !0, ...o } = e, a = yr(Ei, n), i = Ci(n);
    return /* @__PURE__ */ w(
      Ld,
      {
        asChild: !0,
        ...i,
        orientation: a.orientation,
        dir: a.dir,
        loop: r,
        children: /* @__PURE__ */ w(
          V.div,
          {
            role: "tablist",
            "aria-orientation": a.orientation,
            ...o,
            ref: t
          }
        )
      }
    );
  }
);
Si.displayName = Ei;
var Ti = "TabsTrigger", Ni = c.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: r, disabled: o = !1, ...a } = e, i = yr(Ti, n), s = Ci(n), l = Oi(i.baseId, r), d = Mi(i.baseId, r), u = r === i.value;
    return /* @__PURE__ */ w(
      $d,
      {
        asChild: !0,
        ...s,
        focusable: !o,
        active: u,
        children: /* @__PURE__ */ w(
          V.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": u,
            "aria-controls": d,
            "data-state": u ? "active" : "inactive",
            "data-disabled": o ? "" : void 0,
            disabled: o,
            id: l,
            ...a,
            ref: t,
            onMouseDown: z(e.onMouseDown, (f) => {
              !o && f.button === 0 && f.ctrlKey === !1 ? i.onValueChange(r) : f.preventDefault();
            }),
            onKeyDown: z(e.onKeyDown, (f) => {
              [" ", "Enter"].includes(f.key) && i.onValueChange(r);
            }),
            onFocus: z(e.onFocus, () => {
              const f = i.activationMode !== "manual";
              !u && !o && f && i.onValueChange(r);
            })
          }
        )
      }
    );
  }
);
Ni.displayName = Ti;
var Ai = "TabsContent", Pi = c.forwardRef(
  (e, t) => {
    const { __scopeTabs: n, value: r, forceMount: o, children: a, ...i } = e, s = yr(Ai, n), l = Oi(s.baseId, r), d = Mi(s.baseId, r), u = r === s.value, f = c.useRef(u);
    return c.useEffect(() => {
      const p = requestAnimationFrame(() => f.current = !1);
      return () => cancelAnimationFrame(p);
    }, []), /* @__PURE__ */ w(pe, { present: o || u, children: ({ present: p }) => /* @__PURE__ */ w(
      V.div,
      {
        "data-state": u ? "active" : "inactive",
        "data-orientation": s.orientation,
        role: "tabpanel",
        "aria-labelledby": l,
        hidden: !p,
        id: d,
        tabIndex: 0,
        ...i,
        ref: t,
        style: {
          ...e.style,
          animationDuration: f.current ? "0s" : void 0
        },
        children: p && a
      }
    ) });
  }
);
Pi.displayName = Ai;
function Oi(e, t) {
  return `${e}-trigger-${t}`;
}
function Mi(e, t) {
  return `${e}-content-${t}`;
}
var Di = Ri, nn = Si, rn = Ni, on = Pi;
const Wp = Di, Bd = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  nn,
  {
    ref: n,
    className: B(
      "inline-flex items-center justify-center rounded-full bg-transparent border border-gray-250",
      e
    ),
    ...t
  }
));
Bd.displayName = nn.displayName;
const Wd = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  rn,
  {
    ref: n,
    className: B(
      "transition-all text-sm sm:text-[16px] font-inter font-medium py-2.5 sm:py-3.5 px-6 sm:px-[30px] text-gray-600 rounded-full data-[state=active]:bg-black data-[state=active]:text-white",
      e
    ),
    ...t
  }
));
Wd.displayName = rn.displayName;
const Vd = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  on,
  {
    ref: n,
    className: B(
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      e
    ),
    ...t
  }
));
Vd.displayName = on.displayName;
const Vp = Di, Hd = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  nn,
  {
    ref: n,
    className: B("flex border-b border-gray-250 font-inter", e),
    ...t
  }
));
Hd.displayName = nn.displayName;
const Ud = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  rn,
  {
    ref: n,
    className: B(
      "px-4 pt-3 pb-2 border-b-4 border-transparent transition-all relative text-gray-600 data-[state=active]:text-black data-[state=active]:font-medium data-[state=active]:border-b-black",
      e
    ),
    ...t
  }
));
Ud.displayName = rn.displayName;
const jd = c.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  on,
  {
    ref: n,
    className: B(
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 mt-4 space-y-4",
      e
    ),
    ...t
  }
));
jd.displayName = on.displayName;
const Gd = ["top", "right", "bottom", "left"], $e = Math.min, ae = Math.max, jt = Math.round, $t = Math.floor, be = (e) => ({
  x: e,
  y: e
}), Kd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
}, Yd = {
  start: "end",
  end: "start"
};
function Vn(e, t, n) {
  return ae(e, $e(t, n));
}
function Ee(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Se(e) {
  return e.split("-")[0];
}
function lt(e) {
  return e.split("-")[1];
}
function xr(e) {
  return e === "x" ? "y" : "x";
}
function Cr(e) {
  return e === "y" ? "height" : "width";
}
function Fe(e) {
  return ["top", "bottom"].includes(Se(e)) ? "y" : "x";
}
function Rr(e) {
  return xr(Fe(e));
}
function Xd(e, t, n) {
  n === void 0 && (n = !1);
  const r = lt(e), o = Rr(e), a = Cr(o);
  let i = o === "x" ? r === (n ? "end" : "start") ? "right" : "left" : r === "start" ? "bottom" : "top";
  return t.reference[a] > t.floating[a] && (i = Gt(i)), [i, Gt(i)];
}
function qd(e) {
  const t = Gt(e);
  return [Hn(e), t, Hn(t)];
}
function Hn(e) {
  return e.replace(/start|end/g, (t) => Yd[t]);
}
function Zd(e, t, n) {
  const r = ["left", "right"], o = ["right", "left"], a = ["top", "bottom"], i = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? t ? o : r : t ? r : o;
    case "left":
    case "right":
      return t ? a : i;
    default:
      return [];
  }
}
function Qd(e, t, n, r) {
  const o = lt(e);
  let a = Zd(Se(e), n === "start", r);
  return o && (a = a.map((i) => i + "-" + o), t && (a = a.concat(a.map(Hn)))), a;
}
function Gt(e) {
  return e.replace(/left|right|bottom|top/g, (t) => Kd[t]);
}
function Jd(e) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...e
  };
}
function Ii(e) {
  return typeof e != "number" ? Jd(e) : {
    top: e,
    right: e,
    bottom: e,
    left: e
  };
}
function Kt(e) {
  const {
    x: t,
    y: n,
    width: r,
    height: o
  } = e;
  return {
    width: r,
    height: o,
    top: n,
    left: t,
    right: t + r,
    bottom: n + o,
    x: t,
    y: n
  };
}
function ao(e, t, n) {
  let {
    reference: r,
    floating: o
  } = e;
  const a = Fe(t), i = Rr(t), s = Cr(i), l = Se(t), d = a === "y", u = r.x + r.width / 2 - o.width / 2, f = r.y + r.height / 2 - o.height / 2, p = r[s] / 2 - o[s] / 2;
  let g;
  switch (l) {
    case "top":
      g = {
        x: u,
        y: r.y - o.height
      };
      break;
    case "bottom":
      g = {
        x: u,
        y: r.y + r.height
      };
      break;
    case "right":
      g = {
        x: r.x + r.width,
        y: f
      };
      break;
    case "left":
      g = {
        x: r.x - o.width,
        y: f
      };
      break;
    default:
      g = {
        x: r.x,
        y: r.y
      };
  }
  switch (lt(t)) {
    case "start":
      g[i] -= p * (n && d ? -1 : 1);
      break;
    case "end":
      g[i] += p * (n && d ? -1 : 1);
      break;
  }
  return g;
}
const ef = async (e, t, n) => {
  const {
    placement: r = "bottom",
    strategy: o = "absolute",
    middleware: a = [],
    platform: i
  } = n, s = a.filter(Boolean), l = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let d = await i.getElementRects({
    reference: e,
    floating: t,
    strategy: o
  }), {
    x: u,
    y: f
  } = ao(d, r, l), p = r, g = {}, v = 0;
  for (let m = 0; m < s.length; m++) {
    const {
      name: b,
      fn: h
    } = s[m], {
      x,
      y: C,
      data: y,
      reset: R
    } = await h({
      x: u,
      y: f,
      initialPlacement: r,
      placement: p,
      strategy: o,
      middlewareData: g,
      rects: d,
      platform: i,
      elements: {
        reference: e,
        floating: t
      }
    });
    u = x ?? u, f = C ?? f, g = {
      ...g,
      [b]: {
        ...g[b],
        ...y
      }
    }, R && v <= 50 && (v++, typeof R == "object" && (R.placement && (p = R.placement), R.rects && (d = R.rects === !0 ? await i.getElementRects({
      reference: e,
      floating: t,
      strategy: o
    }) : R.rects), {
      x: u,
      y: f
    } = ao(d, p, l)), m = -1);
  }
  return {
    x: u,
    y: f,
    placement: p,
    strategy: o,
    middlewareData: g
  };
};
async function Ct(e, t) {
  var n;
  t === void 0 && (t = {});
  const {
    x: r,
    y: o,
    platform: a,
    rects: i,
    elements: s,
    strategy: l
  } = e, {
    boundary: d = "clippingAncestors",
    rootBoundary: u = "viewport",
    elementContext: f = "floating",
    altBoundary: p = !1,
    padding: g = 0
  } = Ee(t, e), v = Ii(g), b = s[p ? f === "floating" ? "reference" : "floating" : f], h = Kt(await a.getClippingRect({
    element: (n = await (a.isElement == null ? void 0 : a.isElement(b))) == null || n ? b : b.contextElement || await (a.getDocumentElement == null ? void 0 : a.getDocumentElement(s.floating)),
    boundary: d,
    rootBoundary: u,
    strategy: l
  })), x = f === "floating" ? {
    x: r,
    y: o,
    width: i.floating.width,
    height: i.floating.height
  } : i.reference, C = await (a.getOffsetParent == null ? void 0 : a.getOffsetParent(s.floating)), y = await (a.isElement == null ? void 0 : a.isElement(C)) ? await (a.getScale == null ? void 0 : a.getScale(C)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  }, R = Kt(a.convertOffsetParentRelativeRectToViewportRelativeRect ? await a.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements: s,
    rect: x,
    offsetParent: C,
    strategy: l
  }) : x);
  return {
    top: (h.top - R.top + v.top) / y.y,
    bottom: (R.bottom - h.bottom + v.bottom) / y.y,
    left: (h.left - R.left + v.left) / y.x,
    right: (R.right - h.right + v.right) / y.x
  };
}
const tf = (e) => ({
  name: "arrow",
  options: e,
  async fn(t) {
    const {
      x: n,
      y: r,
      placement: o,
      rects: a,
      platform: i,
      elements: s,
      middlewareData: l
    } = t, {
      element: d,
      padding: u = 0
    } = Ee(e, t) || {};
    if (d == null)
      return {};
    const f = Ii(u), p = {
      x: n,
      y: r
    }, g = Rr(o), v = Cr(g), m = await i.getDimensions(d), b = g === "y", h = b ? "top" : "left", x = b ? "bottom" : "right", C = b ? "clientHeight" : "clientWidth", y = a.reference[v] + a.reference[g] - p[g] - a.floating[v], R = p[g] - a.reference[g], A = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(d));
    let E = A ? A[C] : 0;
    (!E || !await (i.isElement == null ? void 0 : i.isElement(A))) && (E = s.floating[C] || a.floating[v]);
    const N = y / 2 - R / 2, S = E / 2 - m[v] / 2 - 1, M = $e(f[h], S), k = $e(f[x], S), O = M, P = E - m[v] - k, $ = E / 2 - m[v] / 2 + N, H = Vn(O, $, P), I = !l.arrow && lt(o) != null && $ !== H && a.reference[v] / 2 - ($ < O ? M : k) - m[v] / 2 < 0, W = I ? $ < O ? $ - O : $ - P : 0;
    return {
      [g]: p[g] + W,
      data: {
        [g]: H,
        centerOffset: $ - H - W,
        ...I && {
          alignmentOffset: W
        }
      },
      reset: I
    };
  }
}), nf = function(e) {
  return e === void 0 && (e = {}), {
    name: "flip",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        middlewareData: a,
        rects: i,
        initialPlacement: s,
        platform: l,
        elements: d
      } = t, {
        mainAxis: u = !0,
        crossAxis: f = !0,
        fallbackPlacements: p,
        fallbackStrategy: g = "bestFit",
        fallbackAxisSideDirection: v = "none",
        flipAlignment: m = !0,
        ...b
      } = Ee(e, t);
      if ((n = a.arrow) != null && n.alignmentOffset)
        return {};
      const h = Se(o), x = Fe(s), C = Se(s) === s, y = await (l.isRTL == null ? void 0 : l.isRTL(d.floating)), R = p || (C || !m ? [Gt(s)] : qd(s)), A = v !== "none";
      !p && A && R.push(...Qd(s, m, v, y));
      const E = [s, ...R], N = await Ct(t, b), S = [];
      let M = ((r = a.flip) == null ? void 0 : r.overflows) || [];
      if (u && S.push(N[h]), f) {
        const $ = Xd(o, i, y);
        S.push(N[$[0]], N[$[1]]);
      }
      if (M = [...M, {
        placement: o,
        overflows: S
      }], !S.every(($) => $ <= 0)) {
        var k, O;
        const $ = (((k = a.flip) == null ? void 0 : k.index) || 0) + 1, H = E[$];
        if (H)
          return {
            data: {
              index: $,
              overflows: M
            },
            reset: {
              placement: H
            }
          };
        let I = (O = M.filter((W) => W.overflows[0] <= 0).sort((W, _) => W.overflows[1] - _.overflows[1])[0]) == null ? void 0 : O.placement;
        if (!I)
          switch (g) {
            case "bestFit": {
              var P;
              const W = (P = M.filter((_) => {
                if (A) {
                  const j = Fe(_.placement);
                  return j === x || // Create a bias to the `y` side axis due to horizontal
                  // reading directions favoring greater width.
                  j === "y";
                }
                return !0;
              }).map((_) => [_.placement, _.overflows.filter((j) => j > 0).reduce((j, J) => j + J, 0)]).sort((_, j) => _[1] - j[1])[0]) == null ? void 0 : P[0];
              W && (I = W);
              break;
            }
            case "initialPlacement":
              I = s;
              break;
          }
        if (o !== I)
          return {
            reset: {
              placement: I
            }
          };
      }
      return {};
    }
  };
};
function io(e, t) {
  return {
    top: e.top - t.height,
    right: e.right - t.width,
    bottom: e.bottom - t.height,
    left: e.left - t.width
  };
}
function so(e) {
  return Gd.some((t) => e[t] >= 0);
}
const rf = function(e) {
  return e === void 0 && (e = {}), {
    name: "hide",
    options: e,
    async fn(t) {
      const {
        rects: n
      } = t, {
        strategy: r = "referenceHidden",
        ...o
      } = Ee(e, t);
      switch (r) {
        case "referenceHidden": {
          const a = await Ct(t, {
            ...o,
            elementContext: "reference"
          }), i = io(a, n.reference);
          return {
            data: {
              referenceHiddenOffsets: i,
              referenceHidden: so(i)
            }
          };
        }
        case "escaped": {
          const a = await Ct(t, {
            ...o,
            altBoundary: !0
          }), i = io(a, n.floating);
          return {
            data: {
              escapedOffsets: i,
              escaped: so(i)
            }
          };
        }
        default:
          return {};
      }
    }
  };
};
async function of(e, t) {
  const {
    placement: n,
    platform: r,
    elements: o
  } = e, a = await (r.isRTL == null ? void 0 : r.isRTL(o.floating)), i = Se(n), s = lt(n), l = Fe(n) === "y", d = ["left", "top"].includes(i) ? -1 : 1, u = a && l ? -1 : 1, f = Ee(t, e);
  let {
    mainAxis: p,
    crossAxis: g,
    alignmentAxis: v
  } = typeof f == "number" ? {
    mainAxis: f,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: f.mainAxis || 0,
    crossAxis: f.crossAxis || 0,
    alignmentAxis: f.alignmentAxis
  };
  return s && typeof v == "number" && (g = s === "end" ? v * -1 : v), l ? {
    x: g * u,
    y: p * d
  } : {
    x: p * d,
    y: g * u
  };
}
const af = function(e) {
  return e === void 0 && (e = 0), {
    name: "offset",
    options: e,
    async fn(t) {
      var n, r;
      const {
        x: o,
        y: a,
        placement: i,
        middlewareData: s
      } = t, l = await of(t, e);
      return i === ((n = s.offset) == null ? void 0 : n.placement) && (r = s.arrow) != null && r.alignmentOffset ? {} : {
        x: o + l.x,
        y: a + l.y,
        data: {
          ...l,
          placement: i
        }
      };
    }
  };
}, sf = function(e) {
  return e === void 0 && (e = {}), {
    name: "shift",
    options: e,
    async fn(t) {
      const {
        x: n,
        y: r,
        placement: o
      } = t, {
        mainAxis: a = !0,
        crossAxis: i = !1,
        limiter: s = {
          fn: (b) => {
            let {
              x: h,
              y: x
            } = b;
            return {
              x: h,
              y: x
            };
          }
        },
        ...l
      } = Ee(e, t), d = {
        x: n,
        y: r
      }, u = await Ct(t, l), f = Fe(Se(o)), p = xr(f);
      let g = d[p], v = d[f];
      if (a) {
        const b = p === "y" ? "top" : "left", h = p === "y" ? "bottom" : "right", x = g + u[b], C = g - u[h];
        g = Vn(x, g, C);
      }
      if (i) {
        const b = f === "y" ? "top" : "left", h = f === "y" ? "bottom" : "right", x = v + u[b], C = v - u[h];
        v = Vn(x, v, C);
      }
      const m = s.fn({
        ...t,
        [p]: g,
        [f]: v
      });
      return {
        ...m,
        data: {
          x: m.x - n,
          y: m.y - r,
          enabled: {
            [p]: a,
            [f]: i
          }
        }
      };
    }
  };
}, cf = function(e) {
  return e === void 0 && (e = {}), {
    options: e,
    fn(t) {
      const {
        x: n,
        y: r,
        placement: o,
        rects: a,
        middlewareData: i
      } = t, {
        offset: s = 0,
        mainAxis: l = !0,
        crossAxis: d = !0
      } = Ee(e, t), u = {
        x: n,
        y: r
      }, f = Fe(o), p = xr(f);
      let g = u[p], v = u[f];
      const m = Ee(s, t), b = typeof m == "number" ? {
        mainAxis: m,
        crossAxis: 0
      } : {
        mainAxis: 0,
        crossAxis: 0,
        ...m
      };
      if (l) {
        const C = p === "y" ? "height" : "width", y = a.reference[p] - a.floating[C] + b.mainAxis, R = a.reference[p] + a.reference[C] - b.mainAxis;
        g < y ? g = y : g > R && (g = R);
      }
      if (d) {
        var h, x;
        const C = p === "y" ? "width" : "height", y = ["top", "left"].includes(Se(o)), R = a.reference[f] - a.floating[C] + (y && ((h = i.offset) == null ? void 0 : h[f]) || 0) + (y ? 0 : b.crossAxis), A = a.reference[f] + a.reference[C] + (y ? 0 : ((x = i.offset) == null ? void 0 : x[f]) || 0) - (y ? b.crossAxis : 0);
        v < R ? v = R : v > A && (v = A);
      }
      return {
        [p]: g,
        [f]: v
      };
    }
  };
}, lf = function(e) {
  return e === void 0 && (e = {}), {
    name: "size",
    options: e,
    async fn(t) {
      var n, r;
      const {
        placement: o,
        rects: a,
        platform: i,
        elements: s
      } = t, {
        apply: l = () => {
        },
        ...d
      } = Ee(e, t), u = await Ct(t, d), f = Se(o), p = lt(o), g = Fe(o) === "y", {
        width: v,
        height: m
      } = a.floating;
      let b, h;
      f === "top" || f === "bottom" ? (b = f, h = p === (await (i.isRTL == null ? void 0 : i.isRTL(s.floating)) ? "start" : "end") ? "left" : "right") : (h = f, b = p === "end" ? "top" : "bottom");
      const x = m - u.top - u.bottom, C = v - u.left - u.right, y = $e(m - u[b], x), R = $e(v - u[h], C), A = !t.middlewareData.shift;
      let E = y, N = R;
      if ((n = t.middlewareData.shift) != null && n.enabled.x && (N = C), (r = t.middlewareData.shift) != null && r.enabled.y && (E = x), A && !p) {
        const M = ae(u.left, 0), k = ae(u.right, 0), O = ae(u.top, 0), P = ae(u.bottom, 0);
        g ? N = v - 2 * (M !== 0 || k !== 0 ? M + k : ae(u.left, u.right)) : E = m - 2 * (O !== 0 || P !== 0 ? O + P : ae(u.top, u.bottom));
      }
      await l({
        ...t,
        availableWidth: N,
        availableHeight: E
      });
      const S = await i.getDimensions(s.floating);
      return v !== S.width || m !== S.height ? {
        reset: {
          rects: !0
        }
      } : {};
    }
  };
};
function an() {
  return typeof window < "u";
}
function ut(e) {
  return _i(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function ie(e) {
  var t;
  return (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) || window;
}
function xe(e) {
  var t;
  return (t = (_i(e) ? e.ownerDocument : e.document) || window.document) == null ? void 0 : t.documentElement;
}
function _i(e) {
  return an() ? e instanceof Node || e instanceof ie(e).Node : !1;
}
function de(e) {
  return an() ? e instanceof Element || e instanceof ie(e).Element : !1;
}
function ye(e) {
  return an() ? e instanceof HTMLElement || e instanceof ie(e).HTMLElement : !1;
}
function co(e) {
  return !an() || typeof ShadowRoot > "u" ? !1 : e instanceof ShadowRoot || e instanceof ie(e).ShadowRoot;
}
function Et(e) {
  const {
    overflow: t,
    overflowX: n,
    overflowY: r,
    display: o
  } = fe(e);
  return /auto|scroll|overlay|hidden|clip/.test(t + r + n) && !["inline", "contents"].includes(o);
}
function uf(e) {
  return ["table", "td", "th"].includes(ut(e));
}
function sn(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function Er(e) {
  const t = Sr(), n = de(e) ? fe(e) : e;
  return n.transform !== "none" || n.perspective !== "none" || (n.containerType ? n.containerType !== "normal" : !1) || !t && (n.backdropFilter ? n.backdropFilter !== "none" : !1) || !t && (n.filter ? n.filter !== "none" : !1) || ["transform", "perspective", "filter"].some((r) => (n.willChange || "").includes(r)) || ["paint", "layout", "strict", "content"].some((r) => (n.contain || "").includes(r));
}
function df(e) {
  let t = ze(e);
  for (; ye(t) && !rt(t); ) {
    if (Er(t))
      return t;
    if (sn(t))
      return null;
    t = ze(t);
  }
  return null;
}
function Sr() {
  return typeof CSS > "u" || !CSS.supports ? !1 : CSS.supports("-webkit-backdrop-filter", "none");
}
function rt(e) {
  return ["html", "body", "#document"].includes(ut(e));
}
function fe(e) {
  return ie(e).getComputedStyle(e);
}
function cn(e) {
  return de(e) ? {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  } : {
    scrollLeft: e.scrollX,
    scrollTop: e.scrollY
  };
}
function ze(e) {
  if (ut(e) === "html")
    return e;
  const t = (
    // Step into the shadow DOM of the parent of a slotted node.
    e.assignedSlot || // DOM Element detected.
    e.parentNode || // ShadowRoot detected.
    co(e) && e.host || // Fallback.
    xe(e)
  );
  return co(t) ? t.host : t;
}
function ki(e) {
  const t = ze(e);
  return rt(t) ? e.ownerDocument ? e.ownerDocument.body : e.body : ye(t) && Et(t) ? t : ki(t);
}
function Rt(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const o = ki(e), a = o === ((r = e.ownerDocument) == null ? void 0 : r.body), i = ie(o);
  if (a) {
    const s = Un(i);
    return t.concat(i, i.visualViewport || [], Et(o) ? o : [], s && n ? Rt(s) : []);
  }
  return t.concat(o, Rt(o, [], n));
}
function Un(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function Li(e) {
  const t = fe(e);
  let n = parseFloat(t.width) || 0, r = parseFloat(t.height) || 0;
  const o = ye(e), a = o ? e.offsetWidth : n, i = o ? e.offsetHeight : r, s = jt(n) !== a || jt(r) !== i;
  return s && (n = a, r = i), {
    width: n,
    height: r,
    $: s
  };
}
function Tr(e) {
  return de(e) ? e : e.contextElement;
}
function et(e) {
  const t = Tr(e);
  if (!ye(t))
    return be(1);
  const n = t.getBoundingClientRect(), {
    width: r,
    height: o,
    $: a
  } = Li(t);
  let i = (a ? jt(n.width) : n.width) / r, s = (a ? jt(n.height) : n.height) / o;
  return (!i || !Number.isFinite(i)) && (i = 1), (!s || !Number.isFinite(s)) && (s = 1), {
    x: i,
    y: s
  };
}
const ff = /* @__PURE__ */ be(0);
function $i(e) {
  const t = ie(e);
  return !Sr() || !t.visualViewport ? ff : {
    x: t.visualViewport.offsetLeft,
    y: t.visualViewport.offsetTop
  };
}
function pf(e, t, n) {
  return t === void 0 && (t = !1), !n || t && n !== ie(e) ? !1 : t;
}
function He(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const o = e.getBoundingClientRect(), a = Tr(e);
  let i = be(1);
  t && (r ? de(r) && (i = et(r)) : i = et(e));
  const s = pf(a, n, r) ? $i(a) : be(0);
  let l = (o.left + s.x) / i.x, d = (o.top + s.y) / i.y, u = o.width / i.x, f = o.height / i.y;
  if (a) {
    const p = ie(a), g = r && de(r) ? ie(r) : r;
    let v = p, m = Un(v);
    for (; m && r && g !== v; ) {
      const b = et(m), h = m.getBoundingClientRect(), x = fe(m), C = h.left + (m.clientLeft + parseFloat(x.paddingLeft)) * b.x, y = h.top + (m.clientTop + parseFloat(x.paddingTop)) * b.y;
      l *= b.x, d *= b.y, u *= b.x, f *= b.y, l += C, d += y, v = ie(m), m = Un(v);
    }
  }
  return Kt({
    width: u,
    height: f,
    x: l,
    y: d
  });
}
function Nr(e, t) {
  const n = cn(e).scrollLeft;
  return t ? t.left + n : He(xe(e)).left + n;
}
function Fi(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(), o = r.left + t.scrollLeft - (n ? 0 : (
    // RTL <body> scrollbar.
    Nr(e, r)
  )), a = r.top + t.scrollTop;
  return {
    x: o,
    y: a
  };
}
function mf(e) {
  let {
    elements: t,
    rect: n,
    offsetParent: r,
    strategy: o
  } = e;
  const a = o === "fixed", i = xe(r), s = t ? sn(t.floating) : !1;
  if (r === i || s && a)
    return n;
  let l = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = be(1);
  const u = be(0), f = ye(r);
  if ((f || !f && !a) && ((ut(r) !== "body" || Et(i)) && (l = cn(r)), ye(r))) {
    const g = He(r);
    d = et(r), u.x = g.x + r.clientLeft, u.y = g.y + r.clientTop;
  }
  const p = i && !f && !a ? Fi(i, l, !0) : be(0);
  return {
    width: n.width * d.x,
    height: n.height * d.y,
    x: n.x * d.x - l.scrollLeft * d.x + u.x + p.x,
    y: n.y * d.y - l.scrollTop * d.y + u.y + p.y
  };
}
function gf(e) {
  return Array.from(e.getClientRects());
}
function vf(e) {
  const t = xe(e), n = cn(e), r = e.ownerDocument.body, o = ae(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth), a = ae(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + Nr(e);
  const s = -n.scrollTop;
  return fe(r).direction === "rtl" && (i += ae(t.clientWidth, r.clientWidth) - o), {
    width: o,
    height: a,
    x: i,
    y: s
  };
}
function hf(e, t) {
  const n = ie(e), r = xe(e), o = n.visualViewport;
  let a = r.clientWidth, i = r.clientHeight, s = 0, l = 0;
  if (o) {
    a = o.width, i = o.height;
    const d = Sr();
    (!d || d && t === "fixed") && (s = o.offsetLeft, l = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: s,
    y: l
  };
}
function wf(e, t) {
  const n = He(e, !0, t === "fixed"), r = n.top + e.clientTop, o = n.left + e.clientLeft, a = ye(e) ? et(e) : be(1), i = e.clientWidth * a.x, s = e.clientHeight * a.y, l = o * a.x, d = r * a.y;
  return {
    width: i,
    height: s,
    x: l,
    y: d
  };
}
function lo(e, t, n) {
  let r;
  if (t === "viewport")
    r = hf(e, n);
  else if (t === "document")
    r = vf(xe(e));
  else if (de(t))
    r = wf(t, n);
  else {
    const o = $i(e);
    r = {
      x: t.x - o.x,
      y: t.y - o.y,
      width: t.width,
      height: t.height
    };
  }
  return Kt(r);
}
function zi(e, t) {
  const n = ze(e);
  return n === t || !de(n) || rt(n) ? !1 : fe(n).position === "fixed" || zi(n, t);
}
function bf(e, t) {
  const n = t.get(e);
  if (n)
    return n;
  let r = Rt(e, [], !1).filter((s) => de(s) && ut(s) !== "body"), o = null;
  const a = fe(e).position === "fixed";
  let i = a ? ze(e) : e;
  for (; de(i) && !rt(i); ) {
    const s = fe(i), l = Er(i);
    !l && s.position === "fixed" && (o = null), (a ? !l && !o : !l && s.position === "static" && !!o && ["absolute", "fixed"].includes(o.position) || Et(i) && !l && zi(e, i)) ? r = r.filter((u) => u !== i) : o = s, i = ze(i);
  }
  return t.set(e, r), r;
}
function yf(e) {
  let {
    element: t,
    boundary: n,
    rootBoundary: r,
    strategy: o
  } = e;
  const i = [...n === "clippingAncestors" ? sn(t) ? [] : bf(t, this._c) : [].concat(n), r], s = i[0], l = i.reduce((d, u) => {
    const f = lo(t, u, o);
    return d.top = ae(f.top, d.top), d.right = $e(f.right, d.right), d.bottom = $e(f.bottom, d.bottom), d.left = ae(f.left, d.left), d;
  }, lo(t, s, o));
  return {
    width: l.right - l.left,
    height: l.bottom - l.top,
    x: l.left,
    y: l.top
  };
}
function xf(e) {
  const {
    width: t,
    height: n
  } = Li(e);
  return {
    width: t,
    height: n
  };
}
function Cf(e, t, n) {
  const r = ye(t), o = xe(t), a = n === "fixed", i = He(e, !0, a, t);
  let s = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const l = be(0);
  if (r || !r && !a)
    if ((ut(t) !== "body" || Et(o)) && (s = cn(t)), r) {
      const p = He(t, !0, a, t);
      l.x = p.x + t.clientLeft, l.y = p.y + t.clientTop;
    } else o && (l.x = Nr(o));
  const d = o && !r && !a ? Fi(o, s) : be(0), u = i.left + s.scrollLeft - l.x - d.x, f = i.top + s.scrollTop - l.y - d.y;
  return {
    x: u,
    y: f,
    width: i.width,
    height: i.height
  };
}
function Nn(e) {
  return fe(e).position === "static";
}
function uo(e, t) {
  if (!ye(e) || fe(e).position === "fixed")
    return null;
  if (t)
    return t(e);
  let n = e.offsetParent;
  return xe(e) === n && (n = n.ownerDocument.body), n;
}
function Bi(e, t) {
  const n = ie(e);
  if (sn(e))
    return n;
  if (!ye(e)) {
    let o = ze(e);
    for (; o && !rt(o); ) {
      if (de(o) && !Nn(o))
        return o;
      o = ze(o);
    }
    return n;
  }
  let r = uo(e, t);
  for (; r && uf(r) && Nn(r); )
    r = uo(r, t);
  return r && rt(r) && Nn(r) && !Er(r) ? n : r || df(e) || n;
}
const Rf = async function(e) {
  const t = this.getOffsetParent || Bi, n = this.getDimensions, r = await n(e.floating);
  return {
    reference: Cf(e.reference, await t(e.floating), e.strategy),
    floating: {
      x: 0,
      y: 0,
      width: r.width,
      height: r.height
    }
  };
};
function Ef(e) {
  return fe(e).direction === "rtl";
}
const Sf = {
  convertOffsetParentRelativeRectToViewportRelativeRect: mf,
  getDocumentElement: xe,
  getClippingRect: yf,
  getOffsetParent: Bi,
  getElementRects: Rf,
  getClientRects: gf,
  getDimensions: xf,
  getScale: et,
  isElement: de,
  isRTL: Ef
};
function Tf(e, t) {
  let n = null, r;
  const o = xe(e);
  function a() {
    var s;
    clearTimeout(r), (s = n) == null || s.disconnect(), n = null;
  }
  function i(s, l) {
    s === void 0 && (s = !1), l === void 0 && (l = 1), a();
    const {
      left: d,
      top: u,
      width: f,
      height: p
    } = e.getBoundingClientRect();
    if (s || t(), !f || !p)
      return;
    const g = $t(u), v = $t(o.clientWidth - (d + f)), m = $t(o.clientHeight - (u + p)), b = $t(d), x = {
      rootMargin: -g + "px " + -v + "px " + -m + "px " + -b + "px",
      threshold: ae(0, $e(1, l)) || 1
    };
    let C = !0;
    function y(R) {
      const A = R[0].intersectionRatio;
      if (A !== l) {
        if (!C)
          return i();
        A ? i(!1, A) : r = setTimeout(() => {
          i(!1, 1e-7);
        }, 1e3);
      }
      C = !1;
    }
    try {
      n = new IntersectionObserver(y, {
        ...x,
        // Handle <iframe>s
        root: o.ownerDocument
      });
    } catch {
      n = new IntersectionObserver(y, x);
    }
    n.observe(e);
  }
  return i(!0), a;
}
function Nf(e, t, n, r) {
  r === void 0 && (r = {});
  const {
    ancestorScroll: o = !0,
    ancestorResize: a = !0,
    elementResize: i = typeof ResizeObserver == "function",
    layoutShift: s = typeof IntersectionObserver == "function",
    animationFrame: l = !1
  } = r, d = Tr(e), u = o || a ? [...d ? Rt(d) : [], ...Rt(t)] : [];
  u.forEach((h) => {
    o && h.addEventListener("scroll", n, {
      passive: !0
    }), a && h.addEventListener("resize", n);
  });
  const f = d && s ? Tf(d, n) : null;
  let p = -1, g = null;
  i && (g = new ResizeObserver((h) => {
    let [x] = h;
    x && x.target === d && g && (g.unobserve(t), cancelAnimationFrame(p), p = requestAnimationFrame(() => {
      var C;
      (C = g) == null || C.observe(t);
    })), n();
  }), d && !l && g.observe(d), g.observe(t));
  let v, m = l ? He(e) : null;
  l && b();
  function b() {
    const h = He(e);
    m && (h.x !== m.x || h.y !== m.y || h.width !== m.width || h.height !== m.height) && n(), m = h, v = requestAnimationFrame(b);
  }
  return n(), () => {
    var h;
    u.forEach((x) => {
      o && x.removeEventListener("scroll", n), a && x.removeEventListener("resize", n);
    }), f == null || f(), (h = g) == null || h.disconnect(), g = null, l && cancelAnimationFrame(v);
  };
}
const Af = af, Pf = sf, Of = nf, Mf = lf, Df = rf, fo = tf, If = cf, _f = (e, t, n) => {
  const r = /* @__PURE__ */ new Map(), o = {
    platform: Sf,
    ...n
  }, a = {
    ...o.platform,
    _c: r
  };
  return ef(e, t, {
    ...o,
    platform: a
  });
};
var Wt = typeof document < "u" ? mo : go;
function Yt(e, t) {
  if (e === t)
    return !0;
  if (typeof e != typeof t)
    return !1;
  if (typeof e == "function" && e.toString() === t.toString())
    return !0;
  let n, r, o;
  if (e && t && typeof e == "object") {
    if (Array.isArray(e)) {
      if (n = e.length, n !== t.length) return !1;
      for (r = n; r-- !== 0; )
        if (!Yt(e[r], t[r]))
          return !1;
      return !0;
    }
    if (o = Object.keys(e), n = o.length, n !== Object.keys(t).length)
      return !1;
    for (r = n; r-- !== 0; )
      if (!{}.hasOwnProperty.call(t, o[r]))
        return !1;
    for (r = n; r-- !== 0; ) {
      const a = o[r];
      if (!(a === "_owner" && e.$$typeof) && !Yt(e[a], t[a]))
        return !1;
    }
    return !0;
  }
  return e !== e && t !== t;
}
function Wi(e) {
  return typeof window > "u" ? 1 : (e.ownerDocument.defaultView || window).devicePixelRatio || 1;
}
function po(e, t) {
  const n = Wi(e);
  return Math.round(t * n) / n;
}
function An(e) {
  const t = c.useRef(e);
  return Wt(() => {
    t.current = e;
  }), t;
}
function kf(e) {
  e === void 0 && (e = {});
  const {
    placement: t = "bottom",
    strategy: n = "absolute",
    middleware: r = [],
    platform: o,
    elements: {
      reference: a,
      floating: i
    } = {},
    transform: s = !0,
    whileElementsMounted: l,
    open: d
  } = e, [u, f] = c.useState({
    x: 0,
    y: 0,
    strategy: n,
    placement: t,
    middlewareData: {},
    isPositioned: !1
  }), [p, g] = c.useState(r);
  Yt(p, r) || g(r);
  const [v, m] = c.useState(null), [b, h] = c.useState(null), x = c.useCallback((_) => {
    _ !== A.current && (A.current = _, m(_));
  }, []), C = c.useCallback((_) => {
    _ !== E.current && (E.current = _, h(_));
  }, []), y = a || v, R = i || b, A = c.useRef(null), E = c.useRef(null), N = c.useRef(u), S = l != null, M = An(l), k = An(o), O = An(d), P = c.useCallback(() => {
    if (!A.current || !E.current)
      return;
    const _ = {
      placement: t,
      strategy: n,
      middleware: p
    };
    k.current && (_.platform = k.current), _f(A.current, E.current, _).then((j) => {
      const J = {
        ...j,
        // The floating element's position may be recomputed while it's closed
        // but still mounted (such as when transitioning out). To ensure
        // `isPositioned` will be `false` initially on the next open, avoid
        // setting it to `true` when `open === false` (must be specified).
        isPositioned: O.current !== !1
      };
      $.current && !Yt(N.current, J) && (N.current = J, vo.flushSync(() => {
        f(J);
      }));
    });
  }, [p, t, n, k, O]);
  Wt(() => {
    d === !1 && N.current.isPositioned && (N.current.isPositioned = !1, f((_) => ({
      ..._,
      isPositioned: !1
    })));
  }, [d]);
  const $ = c.useRef(!1);
  Wt(() => ($.current = !0, () => {
    $.current = !1;
  }), []), Wt(() => {
    if (y && (A.current = y), R && (E.current = R), y && R) {
      if (M.current)
        return M.current(y, R, P);
      P();
    }
  }, [y, R, P, M, S]);
  const H = c.useMemo(() => ({
    reference: A,
    floating: E,
    setReference: x,
    setFloating: C
  }), [x, C]), I = c.useMemo(() => ({
    reference: y,
    floating: R
  }), [y, R]), W = c.useMemo(() => {
    const _ = {
      position: n,
      left: 0,
      top: 0
    };
    if (!I.floating)
      return _;
    const j = po(I.floating, u.x), J = po(I.floating, u.y);
    return s ? {
      ..._,
      transform: "translate(" + j + "px, " + J + "px)",
      ...Wi(I.floating) >= 1.5 && {
        willChange: "transform"
      }
    } : {
      position: n,
      left: j,
      top: J
    };
  }, [n, s, I.floating, u.x, u.y]);
  return c.useMemo(() => ({
    ...u,
    update: P,
    refs: H,
    elements: I,
    floatingStyles: W
  }), [u, P, H, I, W]);
}
const Lf = (e) => {
  function t(n) {
    return {}.hasOwnProperty.call(n, "current");
  }
  return {
    name: "arrow",
    options: e,
    fn(n) {
      const {
        element: r,
        padding: o
      } = typeof e == "function" ? e(n) : e;
      return r && t(r) ? r.current != null ? fo({
        element: r.current,
        padding: o
      }).fn(n) : {} : r ? fo({
        element: r,
        padding: o
      }).fn(n) : {};
    }
  };
}, $f = (e, t) => ({
  ...Af(e),
  options: [e, t]
}), Ff = (e, t) => ({
  ...Pf(e),
  options: [e, t]
}), zf = (e, t) => ({
  ...If(e),
  options: [e, t]
}), Bf = (e, t) => ({
  ...Of(e),
  options: [e, t]
}), Wf = (e, t) => ({
  ...Mf(e),
  options: [e, t]
}), Vf = (e, t) => ({
  ...Df(e),
  options: [e, t]
}), Hf = (e, t) => ({
  ...Lf(e),
  options: [e, t]
});
var Uf = "Arrow", Vi = c.forwardRef((e, t) => {
  const { children: n, width: r = 10, height: o = 5, ...a } = e;
  return /* @__PURE__ */ w(
    V.svg,
    {
      ...a,
      ref: t,
      width: r,
      height: o,
      viewBox: "0 0 30 10",
      preserveAspectRatio: "none",
      children: e.asChild ? n : /* @__PURE__ */ w("polygon", { points: "0,0 30,0 15,10" })
    }
  );
});
Vi.displayName = Uf;
var jf = Vi;
function Gf(e, t = []) {
  let n = [];
  function r(a, i) {
    const s = c.createContext(i), l = n.length;
    n = [...n, i];
    function d(f) {
      const { scope: p, children: g, ...v } = f, m = (p == null ? void 0 : p[e][l]) || s, b = c.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ w(m.Provider, { value: b, children: g });
    }
    function u(f, p) {
      const g = (p == null ? void 0 : p[e][l]) || s, v = c.useContext(g);
      if (v) return v;
      if (i !== void 0) return i;
      throw new Error(`\`${f}\` must be used within \`${a}\``);
    }
    return d.displayName = a + "Provider", [d, u];
  }
  const o = () => {
    const a = n.map((i) => c.createContext(i));
    return function(s) {
      const l = (s == null ? void 0 : s[e]) || a;
      return c.useMemo(
        () => ({ [`__scope${e}`]: { ...s, [e]: l } }),
        [s, l]
      );
    };
  };
  return o.scopeName = e, [r, Kf(o, ...t)];
}
function Kf(...e) {
  const t = e[0];
  if (e.length === 1) return t;
  const n = () => {
    const r = e.map((o) => ({
      useScope: o(),
      scopeName: o.scopeName
    }));
    return function(a) {
      const i = r.reduce((s, { useScope: l, scopeName: d }) => {
        const f = l(a)[`__scope${d}`];
        return { ...s, ...f };
      }, {});
      return c.useMemo(() => ({ [`__scope${t.scopeName}`]: i }), [i]);
    };
  };
  return n.scopeName = t.scopeName, n;
}
function Yf(e) {
  const [t, n] = c.useState(void 0);
  return ue(() => {
    if (e) {
      n({ width: e.offsetWidth, height: e.offsetHeight });
      const r = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const a = o[0];
        let i, s;
        if ("borderBoxSize" in a) {
          const l = a.borderBoxSize, d = Array.isArray(l) ? l[0] : l;
          i = d.inlineSize, s = d.blockSize;
        } else
          i = e.offsetWidth, s = e.offsetHeight;
        n({ width: i, height: s });
      });
      return r.observe(e, { box: "border-box" }), () => r.unobserve(e);
    } else
      n(void 0);
  }, [e]), t;
}
var Ar = "Popper", [Hi, Ui] = Gf(Ar), [Xf, ji] = Hi(Ar), Gi = (e) => {
  const { __scopePopper: t, children: n } = e, [r, o] = c.useState(null);
  return /* @__PURE__ */ w(Xf, { scope: t, anchor: r, onAnchorChange: o, children: n });
};
Gi.displayName = Ar;
var Ki = "PopperAnchor", Yi = c.forwardRef(
  (e, t) => {
    const { __scopePopper: n, virtualRef: r, ...o } = e, a = ji(Ki, n), i = c.useRef(null), s = Z(t, i);
    return c.useEffect(() => {
      a.onAnchorChange((r == null ? void 0 : r.current) || i.current);
    }), r ? null : /* @__PURE__ */ w(V.div, { ...o, ref: s });
  }
);
Yi.displayName = Ki;
var Pr = "PopperContent", [qf, Zf] = Hi(Pr), Xi = c.forwardRef(
  (e, t) => {
    var Pe, Oe, je, Ge, Ce, pt;
    const {
      __scopePopper: n,
      side: r = "bottom",
      sideOffset: o = 0,
      align: a = "center",
      alignOffset: i = 0,
      arrowPadding: s = 0,
      avoidCollisions: l = !0,
      collisionBoundary: d = [],
      collisionPadding: u = 0,
      sticky: f = "partial",
      hideWhenDetached: p = !1,
      updatePositionStrategy: g = "optimized",
      onPlaced: v,
      ...m
    } = e, b = ji(Pr, n), [h, x] = c.useState(null), C = Z(t, (Me) => x(Me)), [y, R] = c.useState(null), A = Yf(y), E = (A == null ? void 0 : A.width) ?? 0, N = (A == null ? void 0 : A.height) ?? 0, S = r + (a !== "center" ? "-" + a : ""), M = typeof u == "number" ? u : { top: 0, right: 0, bottom: 0, left: 0, ...u }, k = Array.isArray(d) ? d : [d], O = k.length > 0, P = {
      padding: M,
      boundary: k.filter(Jf),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: O
    }, { refs: $, floatingStyles: H, placement: I, isPositioned: W, middlewareData: _ } = kf({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: S,
      whileElementsMounted: (...Me) => Nf(...Me, {
        animationFrame: g === "always"
      }),
      elements: {
        reference: b.anchor
      },
      middleware: [
        $f({ mainAxis: o + N, alignmentAxis: i }),
        l && Ff({
          mainAxis: !0,
          crossAxis: !1,
          limiter: f === "partial" ? zf() : void 0,
          ...P
        }),
        l && Bf({ ...P }),
        Wf({
          ...P,
          apply: ({ elements: Me, rects: L, availableWidth: Tt, availableHeight: Nt }) => {
            const { width: mt, height: pn } = L.reference, Ke = Me.floating.style;
            Ke.setProperty("--radix-popper-available-width", `${Tt}px`), Ke.setProperty("--radix-popper-available-height", `${Nt}px`), Ke.setProperty("--radix-popper-anchor-width", `${mt}px`), Ke.setProperty("--radix-popper-anchor-height", `${pn}px`);
          }
        }),
        y && Hf({ element: y, padding: s }),
        ep({ arrowWidth: E, arrowHeight: N }),
        p && Vf({ strategy: "referenceHidden", ...P })
      ]
    }), [j, J] = Qi(I), te = ne(v);
    ue(() => {
      W && (te == null || te());
    }, [W, te]);
    const St = (Pe = _.arrow) == null ? void 0 : Pe.x, Ae = (Oe = _.arrow) == null ? void 0 : Oe.y, Ue = ((je = _.arrow) == null ? void 0 : je.centerOffset) !== 0, [dt, ft] = c.useState();
    return ue(() => {
      h && ft(window.getComputedStyle(h).zIndex);
    }, [h]), /* @__PURE__ */ w(
      "div",
      {
        ref: $.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...H,
          transform: W ? H.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: dt,
          "--radix-popper-transform-origin": [
            (Ge = _.transformOrigin) == null ? void 0 : Ge.x,
            (Ce = _.transformOrigin) == null ? void 0 : Ce.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((pt = _.hide) == null ? void 0 : pt.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: e.dir,
        children: /* @__PURE__ */ w(
          qf,
          {
            scope: n,
            placedSide: j,
            onArrowChange: R,
            arrowX: St,
            arrowY: Ae,
            shouldHideArrow: Ue,
            children: /* @__PURE__ */ w(
              V.div,
              {
                "data-side": j,
                "data-align": J,
                ...m,
                ref: C,
                style: {
                  ...m.style,
                  // if the PopperContent hasn't been placed yet (not all measurements done)
                  // we prevent animations so that users's animation don't kick in too early referring wrong sides
                  animation: W ? void 0 : "none"
                }
              }
            )
          }
        )
      }
    );
  }
);
Xi.displayName = Pr;
var qi = "PopperArrow", Qf = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}, Zi = c.forwardRef(function(t, n) {
  const { __scopePopper: r, ...o } = t, a = Zf(qi, r), i = Qf[a.placedSide];
  return (
    // we have to use an extra wrapper because `ResizeObserver` (used by `useSize`)
    // doesn't report size as we'd expect on SVG elements.
    // it reports their bounding box which is effectively the largest path inside the SVG.
    /* @__PURE__ */ w(
      "span",
      {
        ref: a.onArrowChange,
        style: {
          position: "absolute",
          left: a.arrowX,
          top: a.arrowY,
          [i]: 0,
          transformOrigin: {
            top: "",
            right: "0 0",
            bottom: "center 0",
            left: "100% 0"
          }[a.placedSide],
          transform: {
            top: "translateY(100%)",
            right: "translateY(50%) rotate(90deg) translateX(-50%)",
            bottom: "rotate(180deg)",
            left: "translateY(50%) rotate(-90deg) translateX(50%)"
          }[a.placedSide],
          visibility: a.shouldHideArrow ? "hidden" : void 0
        },
        children: /* @__PURE__ */ w(
          jf,
          {
            ...o,
            ref: n,
            style: {
              ...o.style,
              // ensures the element can be measured correctly (mostly for if SVG)
              display: "block"
            }
          }
        )
      }
    )
  );
});
Zi.displayName = qi;
function Jf(e) {
  return e !== null;
}
var ep = (e) => ({
  name: "transformOrigin",
  options: e,
  fn(t) {
    var b, h, x;
    const { placement: n, rects: r, middlewareData: o } = t, i = ((b = o.arrow) == null ? void 0 : b.centerOffset) !== 0, s = i ? 0 : e.arrowWidth, l = i ? 0 : e.arrowHeight, [d, u] = Qi(n), f = { start: "0%", center: "50%", end: "100%" }[u], p = (((h = o.arrow) == null ? void 0 : h.x) ?? 0) + s / 2, g = (((x = o.arrow) == null ? void 0 : x.y) ?? 0) + l / 2;
    let v = "", m = "";
    return d === "bottom" ? (v = i ? f : `${p}px`, m = `${-l}px`) : d === "top" ? (v = i ? f : `${p}px`, m = `${r.floating.height + l}px`) : d === "right" ? (v = `${-l}px`, m = i ? f : `${g}px`) : d === "left" && (v = `${r.floating.width + l}px`, m = i ? f : `${g}px`), { data: { x: v, y: m } };
  }
});
function Qi(e) {
  const [t, n = "center"] = e.split("-");
  return [t, n];
}
var tp = Gi, np = Yi, rp = Xi, op = Zi, [ln, Hp] = it("Tooltip", [
  Ui
]), un = Ui(), Ji = "TooltipProvider", ap = 700, jn = "tooltip.open", [ip, Or] = ln(Ji), es = (e) => {
  const {
    __scopeTooltip: t,
    delayDuration: n = ap,
    skipDelayDuration: r = 300,
    disableHoverableContent: o = !1,
    children: a
  } = e, [i, s] = c.useState(!0), l = c.useRef(!1), d = c.useRef(0);
  return c.useEffect(() => {
    const u = d.current;
    return () => window.clearTimeout(u);
  }, []), /* @__PURE__ */ w(
    ip,
    {
      scope: t,
      isOpenDelayed: i,
      delayDuration: n,
      onOpen: c.useCallback(() => {
        window.clearTimeout(d.current), s(!1);
      }, []),
      onClose: c.useCallback(() => {
        window.clearTimeout(d.current), d.current = window.setTimeout(
          () => s(!0),
          r
        );
      }, [r]),
      isPointerInTransitRef: l,
      onPointerInTransitChange: c.useCallback((u) => {
        l.current = u;
      }, []),
      disableHoverableContent: o,
      children: a
    }
  );
};
es.displayName = Ji;
var dn = "Tooltip", [sp, fn] = ln(dn), ts = (e) => {
  const {
    __scopeTooltip: t,
    children: n,
    open: r,
    defaultOpen: o = !1,
    onOpenChange: a,
    disableHoverableContent: i,
    delayDuration: s
  } = e, l = Or(dn, e.__scopeTooltip), d = un(t), [u, f] = c.useState(null), p = we(), g = c.useRef(0), v = i ?? l.disableHoverableContent, m = s ?? l.delayDuration, b = c.useRef(!1), [h = !1, x] = Te({
    prop: r,
    defaultProp: o,
    onChange: (E) => {
      E ? (l.onOpen(), document.dispatchEvent(new CustomEvent(jn))) : l.onClose(), a == null || a(E);
    }
  }), C = c.useMemo(() => h ? b.current ? "delayed-open" : "instant-open" : "closed", [h]), y = c.useCallback(() => {
    window.clearTimeout(g.current), g.current = 0, b.current = !1, x(!0);
  }, [x]), R = c.useCallback(() => {
    window.clearTimeout(g.current), g.current = 0, x(!1);
  }, [x]), A = c.useCallback(() => {
    window.clearTimeout(g.current), g.current = window.setTimeout(() => {
      b.current = !0, x(!0), g.current = 0;
    }, m);
  }, [m, x]);
  return c.useEffect(() => () => {
    g.current && (window.clearTimeout(g.current), g.current = 0);
  }, []), /* @__PURE__ */ w(tp, { ...d, children: /* @__PURE__ */ w(
    sp,
    {
      scope: t,
      contentId: p,
      open: h,
      stateAttribute: C,
      trigger: u,
      onTriggerChange: f,
      onTriggerEnter: c.useCallback(() => {
        l.isOpenDelayed ? A() : y();
      }, [l.isOpenDelayed, A, y]),
      onTriggerLeave: c.useCallback(() => {
        v ? R() : (window.clearTimeout(g.current), g.current = 0);
      }, [R, v]),
      onOpen: y,
      onClose: R,
      disableHoverableContent: v,
      children: n
    }
  ) });
};
ts.displayName = dn;
var Gn = "TooltipTrigger", ns = c.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = fn(Gn, n), a = Or(Gn, n), i = un(n), s = c.useRef(null), l = Z(t, s, o.onTriggerChange), d = c.useRef(!1), u = c.useRef(!1), f = c.useCallback(() => d.current = !1, []);
    return c.useEffect(() => () => document.removeEventListener("pointerup", f), [f]), /* @__PURE__ */ w(np, { asChild: !0, ...i, children: /* @__PURE__ */ w(
      V.button,
      {
        "aria-describedby": o.open ? o.contentId : void 0,
        "data-state": o.stateAttribute,
        ...r,
        ref: l,
        onPointerMove: z(e.onPointerMove, (p) => {
          p.pointerType !== "touch" && !u.current && !a.isPointerInTransitRef.current && (o.onTriggerEnter(), u.current = !0);
        }),
        onPointerLeave: z(e.onPointerLeave, () => {
          o.onTriggerLeave(), u.current = !1;
        }),
        onPointerDown: z(e.onPointerDown, () => {
          d.current = !0, document.addEventListener("pointerup", f, { once: !0 });
        }),
        onFocus: z(e.onFocus, () => {
          d.current || o.onOpen();
        }),
        onBlur: z(e.onBlur, o.onClose),
        onClick: z(e.onClick, o.onClose)
      }
    ) });
  }
);
ns.displayName = Gn;
var cp = "TooltipPortal", [Up, lp] = ln(cp, {
  forceMount: void 0
}), ot = "TooltipContent", rs = c.forwardRef(
  (e, t) => {
    const n = lp(ot, e.__scopeTooltip), { forceMount: r = n.forceMount, side: o = "top", ...a } = e, i = fn(ot, e.__scopeTooltip);
    return /* @__PURE__ */ w(pe, { present: r || i.open, children: i.disableHoverableContent ? /* @__PURE__ */ w(os, { side: o, ...a, ref: t }) : /* @__PURE__ */ w(up, { side: o, ...a, ref: t }) });
  }
), up = c.forwardRef((e, t) => {
  const n = fn(ot, e.__scopeTooltip), r = Or(ot, e.__scopeTooltip), o = c.useRef(null), a = Z(t, o), [i, s] = c.useState(null), { trigger: l, onClose: d } = n, u = o.current, { onPointerInTransitChange: f } = r, p = c.useCallback(() => {
    s(null), f(!1);
  }, [f]), g = c.useCallback(
    (v, m) => {
      const b = v.currentTarget, h = { x: v.clientX, y: v.clientY }, x = pp(h, b.getBoundingClientRect()), C = mp(h, x), y = gp(m.getBoundingClientRect()), R = hp([...C, ...y]);
      s(R), f(!0);
    },
    [f]
  );
  return c.useEffect(() => () => p(), [p]), c.useEffect(() => {
    if (l && u) {
      const v = (b) => g(b, u), m = (b) => g(b, l);
      return l.addEventListener("pointerleave", v), u.addEventListener("pointerleave", m), () => {
        l.removeEventListener("pointerleave", v), u.removeEventListener("pointerleave", m);
      };
    }
  }, [l, u, g, p]), c.useEffect(() => {
    if (i) {
      const v = (m) => {
        const b = m.target, h = { x: m.clientX, y: m.clientY }, x = (l == null ? void 0 : l.contains(b)) || (u == null ? void 0 : u.contains(b)), C = !vp(h, i);
        x ? p() : C && (p(), d());
      };
      return document.addEventListener("pointermove", v), () => document.removeEventListener("pointermove", v);
    }
  }, [l, u, i, d, p]), /* @__PURE__ */ w(os, { ...e, ref: a });
}), [dp, fp] = ln(dn, { isInside: !1 }), os = c.forwardRef(
  (e, t) => {
    const {
      __scopeTooltip: n,
      children: r,
      "aria-label": o,
      onEscapeKeyDown: a,
      onPointerDownOutside: i,
      ...s
    } = e, l = fn(ot, n), d = un(n), { onClose: u } = l;
    return c.useEffect(() => (document.addEventListener(jn, u), () => document.removeEventListener(jn, u)), [u]), c.useEffect(() => {
      if (l.trigger) {
        const f = (p) => {
          const g = p.target;
          g != null && g.contains(l.trigger) && u();
        };
        return window.addEventListener("scroll", f, { capture: !0 }), () => window.removeEventListener("scroll", f, { capture: !0 });
      }
    }, [l.trigger, u]), /* @__PURE__ */ w(
      Jt,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: a,
        onPointerDownOutside: i,
        onFocusOutside: (f) => f.preventDefault(),
        onDismiss: u,
        children: /* @__PURE__ */ se(
          rp,
          {
            "data-state": l.stateAttribute,
            ...d,
            ...s,
            ref: t,
            style: {
              ...s.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ w(Eo, { children: r }),
              /* @__PURE__ */ w(dp, { scope: n, isInside: !0, children: /* @__PURE__ */ w(Wa, { id: l.contentId, role: "tooltip", children: o || r }) })
            ]
          }
        )
      }
    );
  }
);
rs.displayName = ot;
var as = "TooltipArrow", is = c.forwardRef(
  (e, t) => {
    const { __scopeTooltip: n, ...r } = e, o = un(n);
    return fp(
      as,
      n
    ).isInside ? null : /* @__PURE__ */ w(op, { ...o, ...r, ref: t });
  }
);
is.displayName = as;
function pp(e, t) {
  const n = Math.abs(t.top - e.y), r = Math.abs(t.bottom - e.y), o = Math.abs(t.right - e.x), a = Math.abs(t.left - e.x);
  switch (Math.min(n, r, o, a)) {
    case a:
      return "left";
    case o:
      return "right";
    case n:
      return "top";
    case r:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
function mp(e, t, n = 5) {
  const r = [];
  switch (t) {
    case "top":
      r.push(
        { x: e.x - n, y: e.y + n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "bottom":
      r.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x + n, y: e.y - n }
      );
      break;
    case "left":
      r.push(
        { x: e.x + n, y: e.y - n },
        { x: e.x + n, y: e.y + n }
      );
      break;
    case "right":
      r.push(
        { x: e.x - n, y: e.y - n },
        { x: e.x - n, y: e.y + n }
      );
      break;
  }
  return r;
}
function gp(e) {
  const { top: t, right: n, bottom: r, left: o } = e;
  return [
    { x: o, y: t },
    { x: n, y: t },
    { x: n, y: r },
    { x: o, y: r }
  ];
}
function vp(e, t) {
  const { x: n, y: r } = e;
  let o = !1;
  for (let a = 0, i = t.length - 1; a < t.length; i = a++) {
    const s = t[a].x, l = t[a].y, d = t[i].x, u = t[i].y;
    l > r != u > r && n < (d - s) * (r - l) / (u - l) + s && (o = !o);
  }
  return o;
}
function hp(e) {
  const t = e.slice();
  return t.sort((n, r) => n.x < r.x ? -1 : n.x > r.x ? 1 : n.y < r.y ? -1 : n.y > r.y ? 1 : 0), wp(t);
}
function wp(e) {
  if (e.length <= 1) return e.slice();
  const t = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r];
    for (; t.length >= 2; ) {
      const a = t[t.length - 1], i = t[t.length - 2];
      if ((a.x - i.x) * (o.y - i.y) >= (a.y - i.y) * (o.x - i.x)) t.pop();
      else break;
    }
    t.push(o);
  }
  t.pop();
  const n = [];
  for (let r = e.length - 1; r >= 0; r--) {
    const o = e[r];
    for (; n.length >= 2; ) {
      const a = n[n.length - 1], i = n[n.length - 2];
      if ((a.x - i.x) * (o.y - i.y) >= (a.y - i.y) * (o.x - i.x)) n.pop();
      else break;
    }
    n.push(o);
  }
  return n.pop(), t.length === 1 && n.length === 1 && t[0].x === n[0].x && t[0].y === n[0].y ? t : t.concat(n);
}
var bp = es, yp = ts, xp = ns, ss = rs, Cp = is;
const jp = bp, Gp = yp, Kp = xp, Rp = c.forwardRef(({ className: e, sideOffset: t = 4, children: n, ...r }, o) => /* @__PURE__ */ se(
  ss,
  {
    ref: o,
    sideOffset: t,
    className: B(
      "z-50 overflow-hidden rounded-md px-4 py-3 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 bg-gray-600 dark:bg-gray-600",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ w(Cp, { className: "fill-gray-600" }),
      n
    ]
  }
));
Rp.displayName = ss.displayName;
export {
  Ap as Accordion,
  $c as AccordionContent,
  kc as AccordionItem,
  Lc as AccordionTrigger,
  Bc as Button,
  Wc as Card,
  jc as CardContent,
  Uc as CardDescription,
  Gc as CardFooter,
  Vc as CardHeader,
  Hc as CardTitle,
  Mp as Dialog,
  Ip as DialogClose,
  iu as DialogContent,
  uu as DialogDescription,
  cu as DialogFooter,
  su as DialogHeader,
  Ra as DialogOverlay,
  au as DialogPortal,
  lu as DialogTitle,
  Dp as DialogTrigger,
  Fu as Drawer,
  kp as DrawerClose,
  Bu as DrawerContent,
  Uu as DrawerDescription,
  Vu as DrawerFooter,
  Wu as DrawerHeader,
  $a as DrawerOverlay,
  zu as DrawerPortal,
  Hu as DrawerTitle,
  _p as DrawerTrigger,
  ec as Input,
  Ku as Label,
  md as NavigationMenu,
  wd as NavigationMenuContent,
  bd as NavigationMenuIndicator,
  $p as NavigationMenuItem,
  Fp as NavigationMenuLink,
  gd as NavigationMenuList,
  hd as NavigationMenuTrigger,
  pi as NavigationMenuViewport,
  Rd as Separator,
  zp as Skeleton,
  Wp as Tabs,
  Vp as Tabs2,
  jd as Tabs2Content,
  Hd as Tabs2List,
  Ud as Tabs2Trigger,
  Vd as TabsContent,
  Bd as TabsList,
  Wd as TabsTrigger,
  Gp as Tooltip,
  Rp as TooltipContent,
  jp as TooltipProvider,
  Kp as TooltipTrigger,
  zc as buttonVariants,
  vd as navigationMenuTriggerStyle
};
//# sourceMappingURL=index.es.js.map

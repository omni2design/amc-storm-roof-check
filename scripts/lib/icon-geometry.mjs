/**
 * Centers visible SVG content in a 24×24 viewBox with equal padding (meet, uniform scale).
 */
import { createRequire } from "node:module";
import { DOMParser } from "@xmldom/xmldom";

const require = createRequire(import.meta.url);
const { svgPathBbox } = require("svg-path-bbox");

export const VIEW_SIZE = 24;
/** Matches well-centered Figma exports (e.g. status/not-sure). */
export const TARGET_PADDING = 1.75;

const CENTER = VIEW_SIZE / 2;
const MAX_CONTENT = VIEW_SIZE - TARGET_PADDING * 2;

const IDENTITY = { a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 };

function parseTransformToMatrix(transform) {
  if (!transform) return { ...IDENTITY };

  let matrix = { ...IDENTITY };
  const translate = transform.match(/translate\(\s*([-\d.eE+]+)(?:[\s,]+([-\d.eE+]+))?\s*\)/);
  if (translate) {
    matrix = multiply(matrix, { a: 1, b: 0, c: 0, d: 1, e: Number(translate[1]), f: Number(translate[2] ?? 0) });
  }
  const scale = transform.match(/scale\(\s*([-\d.eE+]+)(?:[\s,]+([-\d.eE+]+))?\s*\)/);
  if (scale) {
    const sx = Number(scale[1]);
    const sy = Number(scale[2] ?? scale[1]);
    matrix = multiply(matrix, { a: sx, b: 0, c: 0, d: sy, e: 0, f: 0 });
  }
  return matrix;
}

function multiply(m1, m2) {
  return {
    a: m1.a * m2.a + m1.c * m2.b,
    b: m1.b * m2.a + m1.d * m2.b,
    c: m1.a * m2.c + m1.c * m2.d,
    d: m1.b * m2.c + m1.d * m2.d,
    e: m1.a * m2.e + m1.c * m2.f + m1.e,
    f: m1.b * m2.e + m1.d * m2.f + m1.f,
  };
}

function transformBBox(bbox, matrix) {
  const corners = [
    { x: bbox.x, y: bbox.y },
    { x: bbox.x + bbox.width, y: bbox.y },
    { x: bbox.x + bbox.width, y: bbox.y + bbox.height },
    { x: bbox.x, y: bbox.y + bbox.height },
  ].map(({ x, y }) => ({
    x: matrix.a * x + matrix.c * y + matrix.e,
    y: matrix.b * x + matrix.d * y + matrix.f,
  }));

  const xs = corners.map((p) => p.x);
  const ys = corners.map((p) => p.y);
  const x1 = Math.min(...xs);
  const x2 = Math.max(...xs);
  const y1 = Math.min(...ys);
  const y2 = Math.max(...ys);
  return { x: x1, y: y1, width: x2 - x1, height: y2 - y1 };
}

function unionBBox(a, b) {
  if (!a) return b;
  if (!b) return a;
  const x1 = Math.min(a.x, b.x);
  const y1 = Math.min(a.y, b.y);
  const x2 = Math.max(a.x + a.width, b.x + b.width);
  const y2 = Math.max(a.y + a.height, b.y + b.height);
  return { x: x1, y: y1, width: x2 - x1, height: y2 - y1 };
}

function pathBBoxFromElement(el, matrix) {
  const d = el.getAttribute("d");
  if (!d) return null;
  const [minX, minY, maxX, maxY] = svgPathBbox(d);
  let bbox = {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY,
  };
  const stroke = el.getAttribute("stroke");
  const strokeWidth = stroke && stroke !== "none" ? Number(el.getAttribute("stroke-width") ?? 1.5) : 0;
  if (strokeWidth > 0) {
    const pad = strokeWidth / 2;
    bbox = {
      x: bbox.x - pad,
      y: bbox.y - pad,
      width: bbox.width + strokeWidth,
      height: bbox.height + strokeWidth,
    };
  }
  return transformBBox(bbox, matrix);
}

function circleBBoxFromElement(el, matrix) {
  const cx = Number(el.getAttribute("cx") ?? 0);
  const cy = Number(el.getAttribute("cy") ?? 0);
  const r = Number(el.getAttribute("r") ?? 0);
  return transformBBox({ x: cx - r, y: cy - r, width: r * 2, height: r * 2 }, matrix);
}

function rectBBoxFromElement(el, matrix) {
  const x = Number(el.getAttribute("x") ?? 0);
  const y = Number(el.getAttribute("y") ?? 0);
  const width = Number(el.getAttribute("width") ?? 0);
  const height = Number(el.getAttribute("height") ?? 0);
  return transformBBox({ x, y, width, height }, matrix);
}

function collectBBox(node, matrix, acc = null) {
  if (!node) return acc;

  if (node.nodeType === 1) {
    const tag = node.tagName?.toLowerCase();
    const localMatrix = multiply(matrix, parseTransformToMatrix(node.getAttribute("transform")));

    if (tag === "path") {
      return unionBBox(acc, pathBBoxFromElement(node, localMatrix));
    }
    if (tag === "circle") {
      return unionBBox(acc, circleBBoxFromElement(node, localMatrix));
    }
    if (tag === "rect") {
      return unionBBox(acc, rectBBoxFromElement(node, localMatrix));
    }

    for (let i = 0; i < node.childNodes.length; i += 1) {
      acc = collectBBox(node.childNodes[i], localMatrix, acc);
    }
    return acc;
  }

  if (node.nodeType === 11) {
    for (let i = 0; i < node.childNodes.length; i += 1) {
      acc = collectBBox(node.childNodes[i], matrix, acc);
    }
  }

  return acc;
}

function format(n) {
  const v = Math.abs(n) < 1e-9 ? 0 : n;
  return Number(v.toFixed(4)).toString();
}

/** Unwrap single-child group wrappers (prior normalization layers). */
function stripWrapperGroups(inner) {
  let current = inner.trim();
  let changed = true;
  while (changed) {
    changed = false;
    const match = current.match(/^<g(?:\s[^>]*)?>([\s\S]*)<\/g>$/);
    if (match) {
      current = match[1].trim();
      changed = true;
    }
  }
  return current;
}

function buildCenteringWrap(source, bbox) {
  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;
  const maxDim = Math.max(bbox.width, bbox.height);
  const scale = maxDim > MAX_CONTENT ? MAX_CONTENT / maxDim : 1;

  if (Math.abs(scale - 1) < 0.0001) {
    const offsetX = CENTER - cx;
    const offsetY = CENTER - cy;
    if (Math.abs(offsetX) < 0.01 && Math.abs(offsetY) < 0.01) {
      return source;
    }
    return `<g transform="translate(${format(offsetX)} ${format(offsetY)})">${source}</g>`;
  }

  return `<g transform="translate(${format(CENTER)} ${format(CENTER)}) scale(${format(scale)}) translate(${format(-cx)} ${format(-cy)})">${source}</g>`;
}

/**
 * Wraps icon inner markup in a centering group (baked transform).
 * Strips prior wrapper groups first so re-sync is idempotent.
 */
export function normalizeIconInner(inner) {
  const trimmed = inner.trim();
  if (!trimmed) return trimmed;

  const source = stripWrapperGroups(trimmed);
  const doc = new DOMParser().parseFromString(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEW_SIZE} ${VIEW_SIZE}">${source}</svg>`,
    "image/svg+xml",
  );

  const bbox = collectBBox(doc.documentElement, IDENTITY);
  if (!bbox || bbox.width <= 0 || bbox.height <= 0) {
    return trimmed;
  }

  return buildCenteringWrap(source, bbox);
}

/** Extract inner SVG markup from a full file or fragment. */
export function extractInnerFromSvg(svgMarkup) {
  const trimmed = svgMarkup.trim();
  if (!trimmed.startsWith("<svg")) {
    return trimmed;
  }
  return trimmed.replace(/^<svg[^>]*>/i, "").replace(/<\/svg>\s*$/i, "").trim();
}

/** Full SVG file → normalized inner markup for registry. */
export function normalizeSvgMarkup(svgMarkup) {
  return normalizeIconInner(extractInnerFromSvg(svgMarkup));
}

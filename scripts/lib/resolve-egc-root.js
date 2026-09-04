'use strict';

// Canonical EGC root resolver (Everything Gemini Code)
// Maintains backwards compatibility with resolve-ecc-root
const ecc = require('./resolve-ecc-root');

module.exports = {
  resolveEgcRoot: ecc.resolveEccRoot,
  resolveEccRoot: ecc.resolveEccRoot,
  INLINE_RESOLVE: ecc.INLINE_RESOLVE,
};

/**
 * escapeRegex(str)
 *
 * Escapes all characters that have special meaning in a regular expression
 * so that user-supplied search strings are treated as plain literals.
 *
 * The escaped characters are the fourteen metacharacters recognised by
 * JavaScript's RegExp engine:
 *   \ ^ $ . | ? * + ( ) [ ] { }
 *
 * Example:
 *   escapeRegex('c++')  → 'c\+\+'       → matches the literal string "c++"
 *   escapeRegex('(foo') → '\(foo'        → matches the literal string "(foo"
 *   escapeRegex('a.b')  → 'a\.b'        → matches "a.b", not "aXb"
 *
 * @param {string} str - Raw user input
 * @returns {string}   - Escaped string safe to pass to new RegExp()
 */
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

module.exports = escapeRegex;

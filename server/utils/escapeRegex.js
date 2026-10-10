
  // Escapes regex metacharacters so user input is matched literally (e.g. "c++", "(")
const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

module.exports = escapeRegex;

import './base64';

/* eslint-disable no-extend-native, camelcase */
if (!String.prototype.trim) {
  String.prototype.trim = function trim() {
    return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };
}

if (!String.prototype.escapeRegexCharacters) {
  String.prototype.escapeRegexCharacters = function escapeRegexCharacters() {
    return this.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };
}

if (!String.prototype.toCapitalize) {
  String.prototype.toCapitalize = function toCapitalize(allWords) {
    return allWords // If all words
      ? this.split(' ')
          .map(word => word.toCapitalize())
          .join(' ') // Break down the phrase to words and then recursive
      : // calls until capitalizing all words
        this.charAt(0).toUpperCase() + this.slice(1); // If allWords is undefined, capitalize only the first word,
    // meaning the first character of the whole string
  };
}

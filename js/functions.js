
const numberOfCharacters = function(sentence, num) {
  if (sentence.length <= num) {
    return true;
  } else {
    return false;
  }
};

numberOfCharacters();

const palindrome = function(str) {
  return str === str.split('').reverse().join('');
};


palindrome();

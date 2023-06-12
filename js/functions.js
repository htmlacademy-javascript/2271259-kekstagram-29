const numberOfCharacters = (sentence, num) => sentence.length <= num;

numberOfCharacters();

const palindrome = (str) => str === str.split('').reverse().join('').toLowerCase();

palindrome();

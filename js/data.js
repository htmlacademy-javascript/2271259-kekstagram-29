import {getRandomPositiveInteger, getRandomArrayElement, getId } from './utile.js';

const similarPersonCount = 25;

export const names = [
  'John',
  'Jack',
  'Maria',
  'Ivan',
  'Liz',
  'Karim',
  'Cristiano',
  'Nico',
  'Alex',
  'Leo'
];

export const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const generatePhotoId = getId(1, 25);
const generateCommentId = getId(1, 750);

const generateComments = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomPositiveInteger(1, 6)}.svg`,
  message: getRandomArrayElement(messages),
  name: getRandomArrayElement(names)

});

const createPerson = () => ({

  id: generatePhotoId(),
  url: `photos/${getRandomPositiveInteger(1, 25)}.jpg`,
  description: 'My photo',
  likes: Math.floor(Math.random() * 100),
  comments: generateComments(),
});

const createSimilarPerson = () => Array.from({length: similarPersonCount}, createPerson, () => new createPerson());


export{createSimilarPerson, getRandomPositiveInteger };

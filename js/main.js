const names = [
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

const comments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const photos = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg',
  '11.jpg',
  '12.jpg',
  '13.jpg',
  '14.jpg',
  '15.jpg',
  '16.jpg',
  '17.jpg',
  '18.jpg',
  '19.jpg',
  '20.jpg',
  '21.jpg',
  '22.jpg',
  '23.jpg',
  '24.jpg',
  '25.jpg'
];

const avatars = [
  'avatar-1.svg',
  'avatar-2.svg',
  'avatar-3.svg',
  'avatar-4.svg',
  'avatar-5.svg',
  'avatar-6.svg'
];

const similarPersonCount = 25;

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.cell(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => (elements[getRandomPositiveInteger(0, elements.length - 1)]);


function createPerson () {
  return {
    id: Math.random(1,25),
    url: getRandomArrayElement(photos),
    avatar: getRandomArrayElement(avatars),
    description: 'My avatar',
    likes: Math.random(15, 200),
    message: getRandomArrayElement(comments),
    name: getRandomArrayElement(names),
  };
}

const similarPerson = Array.from({length: similarPersonCount}, createPerson);

similarPerson();



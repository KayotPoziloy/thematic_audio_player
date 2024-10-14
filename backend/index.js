const colors = require('colors');

const chosenColor = colors.getRandomColor();
console.log(`Предлагаем использовать цвет ${chosenColor.name} на своем сайте. Его код HTML ${chosenColor.code}`);
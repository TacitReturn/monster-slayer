function getRandomValue(min, max) {
  return (attackValue = Math.floor(Math.random() * (max - min)) + min);
}

export default getRandomValue;

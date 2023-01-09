export const getFilteredSounds = (sounds, filter) => {
  if (!Array.isArray(sounds)) {
    return [];
  }

  const filteredSounds = filter 
    ? sounds.filter(sound => sound.category === filter) 
    : sounds;

  return filteredSounds;
};


export const getSoundCategories = (sounds) => {
  if (!Array.isArray(sounds)) {
    return [];
  }
  const categoriesBuffer = {};
  sounds.forEach((sound) => (categoriesBuffer[sound.category] = 0));

  return Object.keys(categoriesBuffer);
};
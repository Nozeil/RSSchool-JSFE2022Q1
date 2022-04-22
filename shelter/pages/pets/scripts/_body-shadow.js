const OUR_PETS_CONTAINER = document.querySelector('.our-pets.container');

export const SHADOW = document.createElement('div');
SHADOW.className = 'body__shadow';
OUR_PETS_CONTAINER.prepend(SHADOW);
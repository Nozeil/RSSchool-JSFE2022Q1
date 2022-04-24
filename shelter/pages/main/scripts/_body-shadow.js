const START_SCREEN_CONTAINER = document.querySelector('.start-screen-container');

export const SHADOW = document.createElement('div');
SHADOW.className = 'body__shadow';
START_SCREEN_CONTAINER.prepend(SHADOW);
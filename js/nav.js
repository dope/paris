'use strict';

/**
 * NAVIGATION
 * Toggles navigation on mobile and tablet
 */
var menuTrigger = document.querySelector('.js-nav-trigger');
var menu        = document.querySelector('.js-nav');

 function toggleMenu() {
    menuTrigger.classList.toggle('nav__cross');
    menu.classList.toggle('nav__wrapper--toggle');
 }

 menuTrigger.addEventListener('click', toggleMenu);
/**
* Paris - Modern Framework, by @dope and @quagliero
*
* Paris API - fast effective relief from the front end
* https://pbs.twimg.com/media/BNVN1OMCcAA2W-S.jpg
*
* @author Tobias Harison-Denby
*/

(function (window, document, undefined) {
  'use strict';

  var API = {};

  API.defaults = {
    'namespace': 'paris'
  };

  API.modules = {
    'modal': true,
    'validate': false
  };

  API.setModules = function (config) {
    for (var module in config) {
      if (API.modules.hasOwnProperty(module) === true) {
        API.modules[module] = config[module];
      }
    }
  };

  API.fireModules = function () {
    for (var module in API.modules) {
      if (API.modules.hasOwnProperty(module) === true && API.modules[module] === true) {
        // uppercase the first letter so we can init the corresponding class!
        var moduleName = toUpperFirst(module);
        // final safety check to see if Class and init actually exists
        if (API[moduleName] && API[moduleName].init) {
          API[moduleName].init();
        } else {
          throw new Error('Module must exist and have an init function.');
        }
      }
    }
  };


  /*************************************************************************\
  HELPER METHODS
  \*************************************************************************/

  /*
  * Uppercase first letter of a string
  */
  function toUpperFirst(s) {
    if (typeof s !== 'string') {
      s = String(s);
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  /*
  * Improved `typeof` that checks for Arrays
  */
  function typeOf(value) {
    var s = typeof value;
    if (s === 'object') {
      if (value) {
        if (value instanceof Array) {
          s = 'array';
        }
      } else {
        s = 'null';
      }
    }
    return s;
  }



  /*************************************************************************\
  CLASSES
  \*************************************************************************/


  /*
  * Modal ... In your way since 2001.
  * @Class Modal
  * @Namespace API.Modal
  */

  API.Modal = (function Modal() {
    var triggers;
    var modals;
    var overlay;
    var activeModal;
    var modalsCreated = {};
    var selector = API.defaults.namespace + '-modal';
    var dataSelector = 'data-' + selector;

    var init = function () {
      triggers = document.querySelectorAll('[' + dataSelector + '-trigger]');
      modals = document.querySelectorAll('[' + dataSelector + ']');

      /* Move all modals into the hoard and add class just incase user missed */
      for (var i = modals.length; i--;) {
        var modal = modals[i];
        document.body.appendChild(modal);
        modal.classList.add('modal');
      }

      setHandlers(triggers);
    };

    var setHandlers = function (triggers) {
      for (var i = 0, ii = triggers.length; i < ii; i++) {
        var trigger = triggers[i];
        var modalId = trigger.getAttribute(dataSelector + '-trigger');

        /* Bind the modal triggers to modals with matching value */
        trigger.addEventListener('click', openModal(modalId));
      }

      document.addEventListener('keyup', closeModal);
    };

    var buildModal = function (modalId) {
      /* check if modal has been built and in DOM already */
      if (modalsCreated[modalId]) {
        return;
      }

      var modal = document.querySelector('[' + dataSelector + '="' + modalId + '"]');
      var modalInner = '<div class="modal__inner">' + modal.innerHTML + '</div>';
      modal.innerHTML = modalInner;

      /* add it to the existing modals object */
      modalsCreated[modalId] = modal;
    };

    var setActiveModal = function (modalId) {
      activeModal = modalId;
    };

    var buildOverlay = function () {
      if (overlay !== undefined) {
        return;
      }

      overlay = document.createElement('div');
      overlay.className = 'overlay';
      document.body.appendChild(overlay);
    };

    var showModal = function (modalId) {
      /* add visibility classes */
      overlay.classList.add('overlay--open');
      modalsCreated[modalId].classList.add('modal--open');
    };

    var openModal = function (modalId) {
      return function () {
        buildOverlay();

        buildModal(modalId);

        setActiveModal(modalId);

        showModal(modalId);
      };
    };

    var closeModal = function (e) {
      /* close on Escape */
      if (e.which === 27) {
        /* remove visibility classes */
        overlay.classList.remove('overlay--open');
        modalsCreated[activeModal].classList.remove('modal--open');
        activeModal = null;
      }
    };

    return {
      init: init
    };
  }());


  /*************************************************************************\
  GLOBAL
  \*************************************************************************/

  /* Expose the `paris` init function to the global namespace */
  window.paris = function paris(config) {

    if (typeOf(config) === 'object') {
      /* update the defaults if necessary */
      API.setModules(config);
    }

    /* fire your guns */
    API.fireModules();
  };

}(window, document));

// CHEEKY LITTLE INIT RIGHT HERE.
paris({});

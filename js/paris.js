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
            if (API.modules.hasOwnProperty(module)) {
                API.modules[module] = config[module];
            }
        }
    };

    API.fireModules = function () {
        for (var module in API.modules) {
            if (API.modules.hasOwnProperty(module) && API.modules[module] === true) {
                // uppercase the first letter so we can init the corresponding class!
                var moduleName = module.charAt(0).toUpperCase() + module.slice(1);
                // final safety check to see if Class actually exists
                if (API[moduleName]) {
                    API[moduleName].init();
                }
            }
        }
    };



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
            /* Just incase. Hide all modal content blocks */
            for (var i = modals.length; i--;) {
                var modal = modals[i];
                document.body.appendChild(modal);
                modal.classList.add('modal');
            }

            setHandlers(triggers);
        };

        var setHandlers = function (triggers) {
            for (var i = triggers.length; i--;) {
                var trigger = triggers[i];
                var modalId = trigger.getAttribute(dataSelector + '-trigger');

                /* Bind the modal triggers to modals with matching value */
                trigger.addEventListener('click', openModal(modalId));
            }

            document.addEventListener('keyup', closeModal);
        };

        var buildModal = function (modalId) {
            var modal = document.querySelector('[' + dataSelector + '="' + modalId + '"]');
            var modalInner = '<div class="modal__inner">' + modal.innerHTML + '</div>';
            modal.innerHTML = modalInner;

            // add it to the existing modals object
            modalsCreated[modalId] = modal;
        };

        var buildOverlay = function () {
            overlay = document.createElement('div');
            overlay.className = 'overlay';
            document.body.appendChild(overlay);
        };

        var openModal = function (modalId) {
            return function () {
                if (overlay === undefined) {
                    buildOverlay();
                }
                // check if modal has been built and in DOM already
                if (!modalsCreated.hasOwnProperty(modalId)) {
                    buildModal(modalId);
                }

                // set the active modal
                activeModal = modalId;
                // show it
                setTimeout(function () {
                    overlay.classList.add('overlay--open');
                    modalsCreated[modalId].classList.add('modal--open');
                }, 50);
            };
        };

        var closeModal = function (e) {
            // close on Escape
            if (e.which === 27) {
                overlay.classList.remove('overlay--open');
                modalsCreated[activeModal].classList.remove('modal--open');
            }
        };

        return {
            init: init
        };
    }());


    /*************************************************************************\
                                    GLOBAL
    \*************************************************************************/

    // Expose the `paris` init function to the global namespace
    window.paris = function paris(config) {

        if (typeof config === 'object') {
            // update the defaults if necessary
            API.setModules(config);
        }

        // fire your guns
        API.fireModules();
    };

}(window, document));

// CHEEKY LITTLE INIT RIGHT HERE.
paris({});

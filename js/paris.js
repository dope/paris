/**
* Paris - Modern Framework, by @dope and @quagliero
*
* Paris API - fast effective relief from the front end
* https://pbs.twimg.com/media/BNVN1OMCcAA2W-S.jpg
*
* @author Tobias Harison-Denby
*/

(function (window, document) {
    'use strict';

    var API = {};

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

        var init = function () {
            triggers = document.querySelectorAll('[data-paris-modal-trigger]');
            modals = document.querySelectorAll('[data-paris-modal]');
            /* Just incase. Hide all modal content blocks */
            for (var i = modals.length; i--;) {
                modals[i].style.display = 'none';
                modals[i].style.visibility = 'hidden';
            }

            setHandlers(triggers);
        };

        var setHandlers = function (triggers) {

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

        if (typeof config === "object") {
            // update the defaults if necessary
            API.setModules(config);
        }

        // fire your guns
        API.fireModules();
    };

}(window, document));

// CHEEKY LITTLE INIT RIGHT HERE.
paris({});

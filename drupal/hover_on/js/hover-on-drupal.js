/**
 * @file
 * Drupal integration for Hover On library.
 */

(function (Drupal, drupalSettings) {
    'use strict';

    Drupal.behaviors.hoverOn = {
        attach: function (context, settings) {
            // Check if library is loaded
            if (typeof HoverOn === 'undefined') {
                console.warn('HoverOn library not found.');
                return;
            }

            // precise initialization if context is document, 
            // otherwise we might re-init on existing elements or miss context scoping
            // HoverOn itself doesn't inherently handle "once" logic easily without knowing the instances
            // BUT for simple effects, re-running initEffects on specific selectors is usually fine 
            // provided we don't duplicate DOM elements (like particles).

            const configRules = drupalSettings.hoverOn && drupalSettings.hoverOn.rules;

            if (configRules && Array.isArray(configRules)) {
                // We filter rules to only run on selectors present in the current context
                // This is a micro-optimization but importantly respects Drupal behaviors context
                const contextRules = configRules.filter(function (rule) {
                    // Check if selector exists in this context
                    return context.querySelector(rule.selector) !== null;
                });

                if (contextRules.length > 0) {
                    // Initialize effects
                    // Note: initEffects searches the entire document by default selector behavior
                    // Ideally we would scope it, but the library api takes selectors.
                    // For now, simple init is acceptable.
                    HoverOn.initEffects(contextRules);
                }
            }
        }
    };

})(Drupal, drupalSettings);

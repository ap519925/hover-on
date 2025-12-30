# Hover On Drupal Module

Integrates the [Hover On Library](https://github.com/ap519925/hover-on) into Drupal.

## Installation

1. Copy this `hover_on` directory to your Drupal site's modules directory (e.g., `web/modules/custom/hover_on`).
2. Enable the module via the Extend menu or Drush:
   ```bash
   drush en hover_on
   ```

## Configuration

1. Navigate to **Administration > Configuration > User Interface > Hover On Effects Settings**.
2. Define your rules in the textarea using the format:
   `Selector | Effect | Type | Color`

### Examples
```
nav.primary-nav a | underline | slide | #4ecdc4
.button | background | left | #ff6b6b
.card | transform3d | lift
```

The module will automatically load the necessary libraries and apply the effects to the selectors you define.

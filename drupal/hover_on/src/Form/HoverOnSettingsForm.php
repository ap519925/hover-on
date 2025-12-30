<?php

namespace Drupal\hover_on\Form;

use Drupal\Core\Form\ConfigFormBase;
use Drupal\Core\Form\FormStateInterface;

/**
 * Configure Hover On settings for this site.
 */
class HoverOnSettingsForm extends ConfigFormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'hover_on_settings';
  }

  /**
   * {@inheritdoc}
   */
  protected function getEditableConfigNames() {
    return ['hover_on.settings'];
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $config = $this->config('hover_on.settings');

    $form['description'] = [
      '#markup' => '<p>Define your hover effects below. Use the format: <strong>Selector | Effect | Type | Color</strong></p>
      <p>Examples:</p>
      <ul>
        <li><code>nav a | underline | slide | #4ecdc4</code></li>
        <li><code>.button | background | left | #ff6b6b</code></li>
        <li><code>.card | transform3d | lift |</code> (leave color blank for default)</li>
        <li><code>.btn | rainbow | spectrum |</code> (animated rainbow gradient)</li>
        <li><code>.cta | gooey | blobs | #ff3366</code> (morphing goo effect)</li>
        <li><code>.menu-item | liquid | | #00d4ff</code> (wave rising effect)</li>
      </ul>
      <h3>Core Effects:</h3>
      <p><em>underline, background, border, transform3d, icon, text, modern, particle, card, classic, advanced, gallery, imageoverlay</em></p>

      <h3>Advanced Effects:</h3>
      <p><em>squishy, complexborder, angled, rainbow, mask, drawborder, flip, fizzy, svgborder, stripe, gooey, liquid, glow, borderfill, centerfill</em></p>

      <details>
        <summary><strong>Effect Types Reference</strong></summary>
        <ul>
          <li><strong>underline:</strong> slide, center, fade</li>
          <li><strong>background:</strong> left, right, top, bottom</li>
          <li><strong>border:</strong> corners, pulse, draw, glow</li>
          <li><strong>transform3d:</strong> lift, tilt, tilt-follow</li>
          <li><strong>text:</strong> gradient, wave, glitch, neon, shadow</li>
          <li><strong>rainbow:</strong> smooth, spectrum, warm, blocks</li>
          <li><strong>gooey:</strong> blobs, diagonal</li>
          <li><strong>mask:</strong> nature, urban</li>
          <li><strong>squishy:</strong> classic, neon, candy</li>
          <li><strong>complexborder:</strong> shrink, bubble</li>
        </ul>
      </details>',
    ];

    $form['rules'] = [
      '#type' => 'textarea',
      '#title' => $this->t('Effect Rules'),
      '#default_value' => $config->get('rules'),
      '#description' => $this->t('Enter one rule per line.'),
      '#rows' => 10,
    ];

    return parent::buildForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    $this->config('hover_on.settings')
      ->set('rules', $form_state->getValue('rules'))
      ->save();
    parent::submitForm($form, $form_state);
  }

}

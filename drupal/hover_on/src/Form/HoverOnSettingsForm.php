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
      </ul>
      <p>Available Effects: <em>underline, background, border, transform3d, icon, text, modern, particle</em></p>',
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

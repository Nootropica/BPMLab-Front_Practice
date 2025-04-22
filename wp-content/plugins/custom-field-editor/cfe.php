<?php
/**
 * Plugin Name:       CFE
 * Description:       Плагин для организации работы с группами полей
 * Version:           1.0
 * Requires at least: 6.7.2
 * Requires PHP:      8.3
 * Author:            BPMLab
 * License:           GPL v2 or later
 * Text Domain:       cfe
 * Domain Path:       /lang
 */

defined('ABSPATH') || exit;

register_activation_hook(__FILE__, 'cfe_activate_plugin');

function cfe_activate_plugin() {
    $default_settings = [
        'description' => true,
        'status' => true,
        'key' => true,
        'location' => true,
        'fields' => true
    ];

    if (get_option('cfe_field_settings') === false) {
        add_option('cfe_field_settings', $default_settings);
    }
}

require_once plugin_dir_path(__FILE__) . 'includes/admin/class-cfe-admin.php';
require_once plugin_dir_path(__FILE__) . 'includes/enqueue.php';
require_once plugin_dir_path(__FILE__) . 'includes/functions.php';
require_once plugin_dir_path(__FILE__) . 'includes/cfe-rest-api.php';

new Cfe_Admin();

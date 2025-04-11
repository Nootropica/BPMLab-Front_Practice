<?php
defined('ABSPATH') or die('Прямой доступ запрещен!');

class Cfe_Assets {
    public function __construct() {
        add_action('admin_enqueue_scripts', [$this, 'enqueue_assets']);
    }

    public function enqueue_assets($hook) {
        if (strpos($hook, 'cfe-settings') === false) {
            return;
        }

        wp_enqueue_style(
            'cfe-admin-css',
            plugins_url('/assets/css/admin.css', dirname(__FILE__) . '../')
        );

        wp_enqueue_script(
            'cfe-admin-js',
            plugins_url('/assets/js/admin.js', dirname(__FILE__) . '../'),
            ['jquery'],
            '1.0',
            true
        );
    }
}
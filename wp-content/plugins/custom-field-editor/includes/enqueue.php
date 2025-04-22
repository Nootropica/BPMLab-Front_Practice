<?php
defined('ABSPATH') || exit;

function cfe_enqueue_admin_assets($hook) {
    if ($hook !== 'toplevel_page_cfe-main') return;

    wp_enqueue_style('cfe-admin-style', plugin_dir_url(__FILE__) . '../assets/css/admin.css');
    wp_enqueue_style('cfe-react-admin-style', plugin_dir_url(__FILE__) . '../assets/js/admin/app.css');

    wp_enqueue_script(
        'cfe-admin-react',
        plugin_dir_url(__FILE__) . '../assets/js/admin/app.js',
        ['wp-element', 'wp-api'],
        filemtime(plugin_dir_path(__FILE__) . '../assets/js/admin/app.js'),
        true
    );

    wp_localize_script('cfe-admin-react', 'cfeSettings', [
        'nonce' => wp_create_nonce('wp_rest'),
        'rest_url' => esc_url_raw(rest_url('cfe/v1/settings')),
    ]);
}
add_action('admin_enqueue_scripts', 'cfe_enqueue_admin_assets');
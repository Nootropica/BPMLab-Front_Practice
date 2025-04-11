<?php

class Cfe_Admin {
    public function __construct() {
        add_action('admin_menu', [$this, 'add_admin_menu']);
    }

    public function add_admin_menu() {
        add_menu_page(
            esc_html__('Custom Field Editor', 'cfe'),
            esc_html__('CFE', 'cfe'),
            'manage_options',
            'cfe-main',
            [$this, 'render_admin_page'],
            'dashicons-grid-view',
            80
        );
    }

    public function render_admin_page() {
        include plugin_dir_path(__FILE__) . '../../templates/admin-page.php';
    }
}

<?php

function cfe_enqueue_admin_assets($hook) {
    if ($hook !== 'toplevel_page_cfe-main') return;

    wp_enqueue_style('cfe-admin-style', plugin_dir_url(__FILE__) . '../assets/css/admin.css');
    
    wp_enqueue_script(
        'cfe-admin-react',
        plugin_dir_url(__FILE__) . '../assets/js/admin/app.js',
        [],
        null,
        true  
    );
}
add_action('admin_enqueue_scripts', 'cfe_enqueue_admin_assets');


<?php

add_action('rest_api_init', function () {
    register_rest_route('cfe/v1', '/settings', [
        'methods'  => 'GET',
        'callback' => 'cfe_get_field_settings',
        'permission_callback' => function () {
            return current_user_can('manage_options');
        }
    ]);

    register_rest_route('cfe/v1', '/settings', [
        'methods'  => 'POST',
        'callback' => 'cfe_update_field_settings',
        'permission_callback' => function () {
            return current_user_can('manage_options');
        }
    ]);
});

function cfe_get_field_settings() {
    $settings = get_option('cfe_field_settings');

    if ($settings === false) {
        return new WP_Error('not_found', 'Settings not found', ['status' => 404]);
    }

    return rest_ensure_response($settings);
}

function cfe_update_field_settings($request) {
    $params = $request->get_json_params();

    $expected_keys = ['description', 'status', 'key', 'location', 'fields'];

    $new_settings = [];

    foreach ($expected_keys as $key) {
        $new_settings[$key] = isset($params[$key]) ? (bool)$params[$key] : false;
    }

    update_option('cfe_field_settings', $new_settings);

    return rest_ensure_response(['success' => true, 'settings' => $new_settings]);
}

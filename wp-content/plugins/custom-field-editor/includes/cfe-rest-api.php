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

    register_rest_route('cfe/v1', '/pages', [
        'methods'  => 'GET',
        'callback' => 'cfe_get_all_pages',
        'permission_callback' => function () {
            return current_user_can('manage_options');
        }
    ]);
    register_rest_route('cfe/v1', '/posts', [
        'methods'  => 'GET',
        'callback' => 'cfe_get_all_posts',
        'permission_callback' => function () {
            return current_user_can('manage_options');
        }
    ]);

    // register_rest_route('cfe/v1', '/blocks', [
    //     'methods'  => 'GET',
    //     'callback' => 'cfe_get_all_gutenberg_blocks',
    //     'permission_callback' => function () {
    //         return current_user_can('manage_options');
    //     }
    // ]);
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

function cfe_get_all_pages() {
    $pages = get_pages([
        'post_status' => ['publish', 'draft', 'private'],
    ]);

    if (empty($pages)) {
        return rest_ensure_response([]);
    }

    $titles = array_map(function ($page) {
        return [
            'id'    => $page->ID,
            'title' => get_the_title($page),
        ];
    }, $pages);

    return rest_ensure_response($titles);
}

function cfe_get_all_posts() {
    $posts = get_posts([
        'post_type'   => 'post',
        'post_status' => ['publish', 'draft', 'private'],
        'numberposts' => -1,
    ]);

    if (empty($posts)) {
        return rest_ensure_response([]);
    }

    $titles = array_map(function ($post) {
        return [
            'id'    => $post->ID,
            'title' => get_the_title($post),
        ];
    }, $posts);

    return rest_ensure_response($titles);
}

// function cfe_get_all_gutenberg_blocks() {
//     function cfe_get_all_gutenberg_blocks() {
//         $pages = get_pages([
//             'post_status' => 'any',
//         ]);
    
//         if (empty($pages)) {
//             return rest_ensure_response([]);
//         }
    
//         $all_blocks = [];
    
//         foreach ($pages as $page) {
//             $blocks = parse_blocks($page->post_content);
    
//             foreach ($blocks as $index => $block) {
//                 if (!empty($block['blockName'])) {
//                     $block_id = md5($page->ID . '-' . $index . '-' . $block['blockName']); // Псевдо-ID
    
//                     $all_blocks[] = [
//                         'id'        => $block_id,
//                         'blockName' => $block['blockName'],
//                         'page_id'   => $page->ID,
//                     ];
//                 }
//             }
//         }
    
//         return rest_ensure_response($all_blocks);
//     }

//     $all_blocks = array_unique($all_blocks);

//     return rest_ensure_response(array_values($all_blocks));
// }

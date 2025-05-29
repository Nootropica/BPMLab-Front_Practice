<?php
/**
 * ============================================================================
 *  Файл-«узел» c набором low-level-функций и REST-маршрутов, которые
 *  используются React-админкой плагина.
 *
 *  Содержит:
 *    1. Регистрацию двух нестандартных статусов записей (disabled / remove)
 *    2. Полноценный REST-endpoint-набор  (namespace: cfe/v1)
 *    3. CRUD-операции для пост-типа  cfe-field-group
 *    4. Вспомогательные утилиты (генерация slug’ов, выборка страниц/постов)
 * ============================================================================
 */


 /* ---------------------------------------------------------------------------
 * 1.  РЕГИСТРАЦИЯ ПРОИЗВОЛЬНЫХ СТАТУСОВ ЗАПИСЕЙ
 * ------------------------------------------------------------------------ */
/**
 * Добавляем два статуса, которые будут показываться в админ-фильтрах,
 * но не будут «публичными» на фронте:
 *   • disabled – «заблокировано»
 *   • remove   – «помечено к удалению» (используется вместо реального удаления)
 */
add_action( 'init', 'cfe_register_custom_statuses' );
function cfe_register_custom_statuses() {

    // ───── Disabled ─────
    register_post_status( 'disabled', array(
        'label'                     => _x( 'Disabled', 'post' ),
        'public'                    => false,
        'show_in_admin_status_list' => true,
        'show_in_admin_all_list'    => true,
        'label_count'               => _n_noop(
            'Disabled <span class="count">(%s)</span>',
            'Disabled <span class="count">(%s)</span>' )
    ) );

    // ───── Removed ─────
    register_post_status( 'remove', array(
        'label'                     => _x( 'Removed', 'post' ),
        'public'                    => false,
        'show_in_admin_status_list' => true,
        'show_in_admin_all_list'    => true,
        'label_count'               => _n_noop(
            'Removed <span class="count">(%s)</span>',
            'Removed <span class="count">(%s)</span>' )
    ) );
}

/* ---------------------------------------------------------------------------
 * 2.  РЕЕСТР REST-МАРШРУТОВ
* ------------------------------------------------------------------------ */
add_action('rest_api_init', function () {
    // Создать новую «группу полей»
    register_rest_route('cfe/v1', '/create-post-group', [
        'methods'             => 'POST',
        'callback'            => 'cfe_create_field_group_post_rest',
        'permission_callback' => function () {
            return current_user_can('manage_options');
        }
    ]);

    // Получить одну группу по ID
    register_rest_route('cfe/v1', '/field-group/(?P<id>\d+)', [
        'methods'  => 'GET',
        'callback' => 'cfe_get_field_group_post',
        'permission_callback' => function () {
            return current_user_can('manage_options');
        }
    ]);

	// Получить список всех групп
    register_rest_route('cfe/v1', '/field-groups', [
        'methods'  => 'GET',
        'callback' => 'cfe_get_all_field_groups',
        'permission_callback' => function () {
            return current_user_can('manage_options');
        }
    ]);

    // Сменить статус группы (publish ↔ draft  +  произвольный PATCH)
    register_rest_route( 'cfe/v1', '/field-group/(?P<id>\d+)/status', [
        'methods'             => 'PATCH',
        'callback'            => 'cfe_change_field_group_status',
        'permission_callback' => function () {
            return current_user_can( 'manage_options' );
        },
        'args'                => [
            'target_status' => [
                'required'          => false,
                'validate_callback' => function ( $value ) {
                    return is_string( $value ) && $value !== '';
                },
            ],
        ],
    ] );

    // Настройки для отображения таблицы
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

    // Вспомогательные выборки (список страниц / постов)
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

/* ---------------------------------------------------------------------------
 * 3.  ВСПОМОГАТЕЛЬНЫЕ ХЕЛПЕРЫ
 * ------------------------------------------------------------------------ */

/**
 * Генерирует «контролируемый» slug:
 *   group_xxxxxxxxxxxxxxxx  (22 символа) – для групп
 *   field_xxxxxxxxxxxxxxxx  – для полей
 *   unknown_xxxxxxxxxxxxxxxx – дефолт
 *
 * Используем sha-256 + mt_rand() → коллизии практически исключены.
 */
function cfe_generate_custom_slug($type = 'group') {
    $random = mt_rand();
    $base = $type . '_' . $random;

    $hash = substr(hash('sha256', $base), 0, 16);

    if ($type === 'group') {
        return 'group_' . $hash;
    } elseif ($type === 'field') {
        return 'field_' . $hash;
    } else {
        return 'unknown_' . $hash;
    }
}

/* ---------------------------------------------------------------------------
 * 4.  CRUD : СОЗДАТЬ   ГРУППУ   ПОЛЕЙ
 * ------------------------------------------------------------------------ */

/**
 * Низкоуровневая функция. Не привязана к REST.
 * Возвращает  WP_Error  либо массив:
 *   [ 'id' => (int), 'post_name' => (string) ]
 */
function cfe_create_field_group_post() {
    if (!is_user_logged_in()) {
        return new WP_Error('unauthorized', 'User not logged in', ['status' => 401]);
    }

    $current_user = wp_get_current_user();

    $post_name = cfe_generate_custom_slug('group');

    $default_content = [
        'location'        => 'default',
        'locationLabel'   => 'top',
        'locationManual'  => 'label',
        'description'     => '',
        'textIcon'        => $post_name,
        'conditions'      => [],
    ];

    $post_data = [
        'post_author'    => $current_user->ID,
        'post_date'      => current_time('mysql'),
        'post_title'     => 'Без названия',
        'post_status'    => 'publish',
        'comment_status' => 'closed',
        'ping_status'    => 'closed',
        'post_name'      => $post_name,
        'post_type'      => 'cfe-field-group',
        'menu_order'     => 0,
        'comment_count'  => 0,
        'post_content'   => wp_json_encode($default_content),
    ];

    $post_id = wp_insert_post($post_data);

    if (is_wp_error($post_id)) {
        return $post_id;
    }

    return [
        'id'        => $post_id,
        'post_name' => $post_name
    ];
}

/*  Обёртка-callback для эндпоинта `/create-post-group`  */
function cfe_create_field_group_post_rest($request) {
    return rest_ensure_response(cfe_create_field_group_post());
}

/* ---------------------------------------------------------------------------
 * 5.  CRUD : ПОЛУЧИТЬ  ОДНУ  ГРУППУ  ПО  ID
 * ------------------------------------------------------------------------ */
function cfe_get_field_group_post($request) {
    $post_id = $request->get_param('id');

    $post = get_post($post_id);

    if (!$post) {
        return new WP_Error('not_found', 'Post not found', ['status' => 404]);
    }

    $post_content = json_decode($post->post_content, true);
    $post_meta    = get_post_meta($post_id);

    return rest_ensure_response([
        'id'              => $post->ID,
        'post_title'      => $post->post_title,
        'post_status'     => $post->post_status,
        'post_name'       => $post->post_name,
        'post_type'       => $post->post_type,
        'post_date'       => $post->post_date,
        'post_modified'   => $post->post_modified,
        'comment_status'  => $post->comment_status,
        'ping_status'     => $post->ping_status,
        'menu_order'      => $post->menu_order,
        'comment_count'   => $post->comment_count,
        'post_content'    => $post_content,
        'meta'            => $post_meta,
    ]);
}

/* ---------------------------------------------------------------------------
 * 6.  CRUD : ПОЛУЧИТЬ  ВСЕ  ГРУППЫ
 * ------------------------------------------------------------------------ */
function cfe_get_all_field_groups($request) {
    global $wpdb;

    $results = $wpdb->get_results("
        SELECT ID, post_title, post_name, post_status, post_content
        FROM {$wpdb->posts}
        WHERE post_type = 'cfe-field-group'
          AND post_status != 'trash'
          AND post_name LIKE 'group\_%'
          AND CHAR_LENGTH(post_name) = 22
    ");

    $groups = [];

    foreach ($results as $post) {
        $content = json_decode($post->post_content, true);

        $groups[] = [
            'id'           => $post->ID,
            'post_title'   => $post->post_title,
            'post_name'    => $post->post_name,
            'post_status'  => $post->post_status,
            'description'  => $content['description'] ?? '',
        ];
    }

    return rest_ensure_response($groups);
}


/* ---------------------------------------------------------------------------
 * 7.  CRUD : СМЕНА СТАТУСА  У  ГРУППЫ
 * ------------------------------------------------------------------------ */
/**
 *  PATCH /field-group/{id}/status
 *
 *  Логика:
 *   – Если передан  target_status =>  жёстко выставляем его
 *   – Иначе: publish ↔ draft ;  всё остальное → trash
 */
function cfe_change_field_group_status( WP_REST_Request $request ) {

    $id            = (int) $request['id'];
    $target_status = $request->get_param( 'target_status' );

    $post = get_post( $id );

    if ( ! $post || $post->post_type !== 'cfe-field-group' ) {
        return new WP_Error( 'not_found', 'Field group not found', [ 'status' => 404 ] );
    }

    $current_status = $post->post_status;
    $new_status     = '';

    if ( $target_status ) {

        $allowed = [ 'publish', 'disabled', 'trash', 'draft', 'pending', 'private' ];

        if ( ! in_array( $target_status, $allowed, true ) ) {
            return new WP_Error( 'bad_status',
                                 sprintf( 'Status "%s" is not allowed', esc_html( $target_status ) ),
                                 [ 'status' => 400 ] );
        }

        $new_status = $target_status;

    } else {

        if ( $current_status === 'publish' ) {
            $new_status = 'draft';
        } elseif ( $current_status === 'draft' ) {
            $new_status = 'publish';
        } else {
            $new_status = 'trash';
        }
    }

    if ( $new_status === $current_status ) {
        return rest_ensure_response( [
            'id'         => $id,
            'old_status' => $current_status,
            'new_status' => $new_status,
            'changed'    => false,
        ] );
    }

    $updated = wp_update_post( [
        'ID'          => $id,
        'post_status' => $new_status,
    ], true );

    if ( is_wp_error( $updated ) ) {
        return $updated;
    }

    return rest_ensure_response( [
        'id'         => $id,
        'old_status' => $current_status,
        'new_status' => $new_status,
        'changed'    => true,
    ] );
}

/* ---------------------------------------------------------------------------
 * 8.  СИСТЕМНЫЕ НАСТРОЙКИ ГРУПП / ПОЛЕЙ
 * ------------------------------------------------------------------------ */

/*  GET /settings  */
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

/* ---------------------------------------------------------------------------
 * 9.  ВСПОМОГАТЕЛЬНЫЕ ВЫБОРКИ (страницы / посты)
 * ------------------------------------------------------------------------ */
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

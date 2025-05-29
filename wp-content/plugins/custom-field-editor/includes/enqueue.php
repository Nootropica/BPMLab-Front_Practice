<?php
/**
 * ============================================================================
 *  cfe_enqueue_admin_assets()
 * ────────────────────────────────────────────────────────────────────────────
 *  Подключаем CSS / JS-бандл админки плагина **CFE** (Custom Field Editor).
 *
 *  Логика:
 *    1.  Хук `admin_enqueue_scripts` пробрасывает в функцию slug текущей
 *        админ-страницы.  Нас интересует только  'toplevel_page_cfe-main'
 *        (главный экран плагина).  В остальных случаях — early-return.
 *    2.  Динамически вычисляем:
 *          • абсолютный путь к плагину  ($plugin_path)
 *          • публичный URL плагина      ($plugin_url)
 *    3.  Формируем относительные / абсолютные пути к ассетам:
 *          admin.css  – базовые стили WP-админки
 *          app.css    – стили скомпилированного React-приложения
 *          app.js     – сам React-бандл
 *    4.  Версионируем файлы по `filemtime()` — кэш браузера
 *        сбросится при каждом обновлении ассетов.
 *    5.  Скрипту React передаём объект `cfeSettings` с endpoint-ами и nonce,
 *        чтобы фронт мог стучаться в REST-API без дополнительных запросов.
 * ============================================================================
 */

defined( 'ABSPATH' ) || exit;

function cfe_enqueue_admin_assets( $hook ) {
    /* 1. Проверяем, на той ли мы странице */
	if ( $hook !== 'toplevel_page_cfe-main' ) {
		return;
	}

	/* ───────── определяем корень плагина ───────── */
	$plugin_path = dirname( plugin_dir_path( __FILE__ ) );
	$plugin_url  = trailingslashit( dirname( plugin_dir_url( __FILE__ ) ) );

	/* относительные пути к ассетам */
	$css_admin_rel = 'assets/css/admin.css';
	$css_app_rel   = 'assets/js/admin/app.css';
	$js_app_rel    = 'assets/js/admin/app.js';

	/* абсолютные пути (для filemtime) */
	$css_admin_path = $plugin_path . '/' . $css_admin_rel;
	$css_app_path   = $plugin_path . '/' . $css_app_rel;
	$js_app_path    = $plugin_path . '/' . $js_app_rel;

	/* url-ы  */
	$css_admin_url = $plugin_url . $css_admin_rel;
	$css_app_url   = $plugin_url . $css_app_rel;
	$js_app_url    = $plugin_url . $js_app_rel;

	/* ───────── стили ───────── */
	wp_enqueue_style(
		'cfe-admin-style',
		$css_admin_url,
		[],
		file_exists( $css_admin_path ) ? filemtime( $css_admin_path ) : null
	);

	wp_enqueue_style(
		'cfe-react-admin-style',
		$css_app_url,
		[],
		file_exists( $css_app_path ) ? filemtime( $css_app_path ) : null
	);

	/* ───────── скрипт React ───────── */
	wp_enqueue_script(
		'cfe-admin-react',
		$js_app_url,
		[ 'wp-element', 'wp-api', 'wp-api-fetch' ],
		file_exists( $js_app_path ) ? filemtime( $js_app_path ) : null,
		true
	);

	/* ───────── данные для фронтенда ───────── */
	wp_localize_script(
		'cfe-admin-react',
		'cfeSettings',
		[
			'nonce'                   => wp_create_nonce( 'wp_rest' ),
			'settings_url'            => esc_url_raw( rest_url( 'cfe/v1/settings' ) ),
			'pages_url'               => esc_url_raw( rest_url( 'cfe/v1/pages' ) ),
			'posts_url'               => esc_url_raw( rest_url( 'cfe/v1/posts' ) ),
			'post_group_url'          => esc_url_raw( rest_url( 'cfe/v1/create-post-group' ) ),
			'field_group_url'         => esc_url_raw( rest_url( 'cfe/v1/field-group' ) ),
			'field_groups_url'        => esc_url_raw( rest_url( 'cfe/v1/field-groups' ) ),
			'field_group_status_base' => esc_url_raw( rest_url( 'cfe/v1/field-group' ) ),
		]
	);
}
add_action( 'admin_enqueue_scripts', 'cfe_enqueue_admin_assets' );
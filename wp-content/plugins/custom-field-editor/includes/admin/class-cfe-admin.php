<?php
/**
 * ============================================================================
 *  class Cfe_Admin
 * ────────────────────────────────────────────────────────────────────────────
 *  Регистрирует пункт меню «CFE» в админ-панели WordPress и выводит
 *  корневой шаблон React-приложения.
 *
 *  Как работает:
 *    1.  В конструкторе вешаемся на хук `admin_menu`.
 *    2.  `add_admin_menu()` добавляет top-level пункт меню:
 *         • page-title  : «Custom Field Editor»
 *         • menu-title  : «CFE»
 *         • capability  : manage_options (только админы)
 *         • slug        : cfe-main            ← используем далее в enqueue
 *         • callback    : render_admin_page() (рендерит <div id="cfe-root">…)
 *         • icon        : dashicons-grid-view
 *         • position    : 80  (чуть ниже «Settings»)
 *    3.  `render_admin_page()` просто подключает PHP-шаблон из /templates/,
 *        внутри которого, как правило, размещён контейнер для React-бандла.
 * ============================================================================
 */

defined('ABSPATH') || exit;

class Cfe_Admin {
    /* --------------------------------------------------------------------- */
	/* 1. Конструктор: регистрируем меню                                     */
	/* --------------------------------------------------------------------- */
    public function __construct() {
        add_action('admin_menu', [$this, 'add_admin_menu']);
    }

    /* --------------------------------------------------------------------- */
	/* 2. Создание пункта меню «CFE»                                           */
	/* --------------------------------------------------------------------- */
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

    /* --------------------------------------------------------------------- */
	/* 3. Рендер страницы (подключаем PHP-шаблон)                            */
	/* --------------------------------------------------------------------- */
    public function render_admin_page() {
        include plugin_dir_path(__FILE__) . '../../templates/admin-page.php';
    }
}

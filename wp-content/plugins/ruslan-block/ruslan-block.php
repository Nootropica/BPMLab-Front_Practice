<?php
/**
 * Plugin Name: Ruslan Editable Block
 * Description: Gutenberg block with editable heading and list.
 * Version: 1.0
 * Author: Ruslan
 */

defined( 'ABSPATH' ) || exit;

function ruslan_editable_block_register() {
    $dir = plugin_dir_path( __FILE__ );

    // Подключаем CSS-стили (не через Webpack, а напрямую из исходников)
    wp_register_style(
        'ruslan-style',
        plugins_url( 'src/blocks/editable-block/style.css', __FILE__ ),
        [],
        filemtime( $dir . 'src/blocks/editable-block/style.css' )
    );

    // Подключаем JS, собранный wp-scripts
    $asset_file = include $dir . 'build/index.asset.php';

    wp_register_script(
        'ruslan-editable-block',
        plugins_url( 'build/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version'],
        true
    );

    // Регистрируем блок
    register_block_type( 'ruslan/editable-block', [
        'editor_script' => 'ruslan-editable-block',
        'style'         => 'ruslan-style',
    ]);
}
add_action( 'init', 'ruslan_editable_block_register' );

function ruslan_block_enqueue_assets() {
    // Подключаем Font Awesome (используется для иконок)
    wp_enqueue_style(
        'font-awesome',
        'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css',
        [],
        '6.5.0'
    );
}
add_action( 'enqueue_block_assets', 'ruslan_block_enqueue_assets' );

// Глобальная поддержка палитры цветов и размеров шрифтов
add_theme_support( 'editor-color-palette', [
    [ 'name' => 'Бирюзовый',   'slug' => 'turquoise', 'color' => '#00EBC7' ],
    [ 'name' => 'Белый',       'slug' => 'white',     'color' => '#FFFFFE' ],
    [ 'name' => 'Розовый',     'slug' => 'pink',      'color' => '#FF5470' ],
    [ 'name' => 'Жёлтый',      'slug' => 'yellow',    'color' => '#FDE24F' ],
    [ 'name' => 'Тёмно-синий', 'slug' => 'darkblue',  'color' => '#00214D' ],
]);

add_theme_support( 'editor-font-sizes', [
    [ 'name' => 'Маленький',      'slug' => 'small',  'size' => 14 ],
    [ 'name' => 'Обычный',        'slug' => 'normal', 'size' => 18 ],
    [ 'name' => 'Крупный',        'slug' => 'large',  'size' => 24 ],
    [ 'name' => 'Очень крупный',  'slug' => 'xlarge', 'size' => 32 ],
]);

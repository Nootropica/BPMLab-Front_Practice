<?php
/**
 * Plugin Name: Ruslan Editable Block
 * Description: Gutenberg block with editable heading and list.
 * Version: 1.0
 * Author: Ruslan
 */

defined( 'ABSPATH' ) || exit;

function ruslan_editable_block_register() {
    wp_register_script(
        'ruslan-editable-block',
        plugins_url( 'block.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-block-editor' ),
        filemtime( plugin_dir_path( __FILE__ ) . 'block.js' )
    );

    register_block_type( 'ruslan/editable-block', array(
        'editor_script' => 'ruslan-editable-block'
    ));
}
add_action( 'init', 'ruslan_editable_block_register' );
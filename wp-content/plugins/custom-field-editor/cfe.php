<?php
/**
 * Plugin Name:       CFE
 * Description:       Плагин для организации работы с группами полей
 * Version:           1.0
 * Requires at least: 6.7.2
 * Requires PHP:      8.3
 * Author:            BPMLab
 * License:           GPL v2 or later
 * Text Domain:       cfe
 * Domain Path:       /lang
 */

defined('ABSPATH') || exit;

require_once plugin_dir_path(__FILE__) . 'includes/admin/class-cfe-admin.php';
require_once plugin_dir_path(__FILE__) . 'includes/enqueue.php';
require_once plugin_dir_path(__FILE__) . 'includes/functions.php';

new Cfe_Admin();

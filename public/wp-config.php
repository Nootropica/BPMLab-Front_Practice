<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'lending' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'MySQL-8.2' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '3)%Fu@B*MhU1N_sr..K@cp=h_gG}}/dr9z1Kk(@S?5Vsl{!<,h{$3qKn3U=c&!c5' );
define( 'SECURE_AUTH_KEY',  'O0./pCZ1sQepYO&ELpPGh$<}rk8IURyihqbHMD22t=vQbr:/5fo0za|-5UtopnpJ' );
define( 'LOGGED_IN_KEY',    'Z.Z._sqv/VAa8Kzt(.htJHt3qPK0X!H2PGfPRw.m596 /^=>,x)4ld3COesU|sJz' );
define( 'NONCE_KEY',        '[[*e]=4OkLh>/H:{?73WA(M,l;Z%C@A=k#MU=jNa+C1jK@cJ;#b$HP1Xp%6]cR@D' );
define( 'AUTH_SALT',        'iXjOJqvOL$.;*rn!;-x[/MU8owQ$1t~xiXH>BVT/(%*(Nmt~& _DF)a[am4(ex:4' );
define( 'SECURE_AUTH_SALT', '/i&.P@c,OH+DOE)i?^r,1gK2rxx mD!W4r+/#}EoQn)Wn5cO~`@v5fU;E,XcgAT4' );
define( 'LOGGED_IN_SALT',   'co<}q|2I^LL|r)<JA~C}|G8G9G,}W[W.tskGB$$f~4B7!u}o4/#  7[`PpF6nh#|' );
define( 'NONCE_SALT',       'Y*c@/v(!In~%Xq0xypQ*YM:dtML2^o@CZ;oD~jBAkNv6vm}3yq=H _a4Z3_h33Qj' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

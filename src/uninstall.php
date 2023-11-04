<?php
if ( ! defined('ABSPATH') && ! defined('WP_UNINSTALL_PLUGIN') ) {
	exit();
}
	global $wpdb;

	delete_site_option( 'metronet_tag_manager' );
	delete_option( 'metronet_tag_manager' );

	$wpdb->query($wpdb->prepare("delete from {$wpdb->postmeta} where `meta_key` = %s", '_gtm_vars'));

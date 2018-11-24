<?php
if ( !defined('ABSPATH') && !defined('WP_UNINSTALL_PLUGIN') ) {
    exit();
}
	global $wpdb;
	
	delete_site_option( 'metronet_tag_manager' );
	delete_option( 'metronet_tag_manager' );

	$sql = "delete from $wpdb->postmeta where meta_key = '_gtm_vars'";
	$wpdb->query($sql);
?>

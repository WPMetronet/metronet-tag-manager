<?php
 // Prevent direct file access
 if (!defined('ABSPATH')) {
    die('No direct access');
}
/**
 * Gutenberg class for Metronet Tag Manager
 *
 * Gutenberg class for Metronet Tag Manager
 *
 * @category Metronet Tag Manager
 * @package  Metronet Tag Manager
 * @author   Ronald Huereca <ronald@mediaron.com>
 * @license  GPL-2.0+
 * @link     https://github.com/ronalfy/metronet-tag-manager
 *
 * @since 2.0.0
 */
class Metronet_Tag_Manager_Gutenberg {
	public function __construct() {
		if (!function_exists( 'register_block_type')) {
			return;
		}

		add_action('init', array($this, 'register_block'));
		add_action('enqueue_block_assets', array($this, 'add_gutenberg_styles'));
		add_action('enqueue_block_editor_assets', array($this,'add_gutenberg_scripts'));
		add_action('rest_api_init', array($this,'register_routes'));
	}

	public function register_routes() {
	}

	function rest_check_permissions() {
		if (current_user_can('edit_posts')) {
			return true;
		}
		return false;
	}

	public function register_block() {
		register_block_type( 'metronettagmanager/anchor', array(
			'attributes' => array()
		) );
	}

	public function add_gutenberg_scripts() {

		// Ensure script debug allows non-minified scripts
		$min_or_not = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min';

		wp_enqueue_script('mtm_gutenberg', Metronet_Tag_Manager::get_plugin_url('js/gutenberg'.$min_or_not.'.js'), array('wp-blocks', 'wp-element'), METRONET_TAG_MANAGER_VERISON, true);

		/* For the Gutenberg plugin */
		if ( function_exists( 'gutenberg_get_jed_locale_data' ) ) {
			$locale  = gutenberg_get_jed_locale_data( 'metronet-tag-manager' );
			$content = 'wp.i18n.setLocaleData( ' . json_encode( $locale ) . ', "metronet-tag-manager" );';
			wp_script_add_data( 'mtm_gutenberg', 'data', $content );
		} elseif (function_exists('wp_get_jed_locale_data')) {
			/* for 5.0 */
			$locale  = wp_get_jed_locale_data( 'metronet-tag-manager' );
			$content = 'wp.i18n.setLocaleData( ' . json_encode( $locale ) . ', "metronet-tag-manager" );';
			wp_script_add_data( 'mtm_gutenberg', 'data', $content );
		}

		// Pass in REST URL
		wp_localize_script(
			'mtm_gutenberg',
			'mtm_gutenberg',
			array(
				'rest_url' => esc_url(rest_url()),
			)
		);

		wp_enqueue_style('mtm_gutenberg', Metronet_Tag_Manager::get_plugin_url('css/gutenberg'.$min_or_not.'.css'), array(), METRONET_TAG_MANAGER_VERISON, 'all' );
	}

	public function add_gutenberg_styles() {
		// Ensure script debug allows non-minified scripts
		$min_or_not = (defined('SCRIPT_DEBUG') && SCRIPT_DEBUG) ? '' : '.min';
	}
}
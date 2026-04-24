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
		register_rest_route(
			'metronet-tag-manager/v1',
			'/post-variables/(?P<id>\d+)',
			array(
				array(
					'methods'             => WP_REST_Server::READABLE,
					'callback'            => array( $this, 'rest_get_post_variables' ),
					'permission_callback' => array( $this, 'rest_check_permissions' ),
					'args'                => array(
						'id' => array( 'validate_callback' => 'is_numeric' ),
					),
				),
				array(
					'methods'             => WP_REST_Server::EDITABLE,
					'callback'            => array( $this, 'rest_save_post_variables' ),
					'permission_callback' => array( $this, 'rest_check_permissions' ),
					'args'                => array(
						'id'        => array( 'validate_callback' => 'is_numeric' ),
						'variables' => array( 'type' => 'array' ),
					),
				),
			)
		);
	}

	public function rest_get_post_variables( WP_REST_Request $request ) {
		$post_id   = (int) $request->get_param( 'id' );
		$variables = get_post_meta( $post_id, '_gtm_vars', true );
		return rest_ensure_response( is_array( $variables ) ? $variables : array() );
	}

	public function rest_save_post_variables( WP_REST_Request $request ) {
		$post_id   = (int) $request->get_param( 'id' );
		$variables = $request->get_param( 'variables' );
		if ( ! is_array( $variables ) ) {
			return new WP_Error( 'invalid_variables', __( 'Variables must be an array.', 'metronet-tag-manager' ), array( 'status' => 400 ) );
		}
		$sanitized = array();
		foreach ( $variables as $var ) {
			if ( isset( $var['name'] ) && isset( $var['value'] ) ) {
				$sanitized[] = array(
					'name'  => sanitize_text_field( $var['name'] ),
					'value' => sanitize_text_field( $var['value'] ),
				);
			}
		}
		update_post_meta( $post_id, '_gtm_vars', $sanitized );
		return rest_ensure_response( $sanitized );
	}

	public function rest_check_permissions( WP_REST_Request $request ) {
		$post_id = (int) $request->get_param( 'id' );
		if ( $post_id && ! current_user_can( 'edit_post', $post_id ) ) {
			return false;
		}
		return current_user_can( 'edit_posts' );
	}

	public function register_block() {
		register_block_type( 'metronettagmanager/anchor', array(
			'attributes' => array()
		) );
		register_block_type( 'metronettagmanager/datalayer-push', array(
			'attributes' => array(
				'buttonText'  => array( 'type' => 'string', 'default' => 'Click Me' ),
				'eventName'   => array( 'type' => 'string', 'default' => 'mtm_event' ),
				'eventKey'    => array( 'type' => 'string', 'default' => 'event' ),
				'eventValue'  => array( 'type' => 'string', 'default' => '' ),
			),
			'render_callback' => array( $this, 'render_datalayer_push_block' ),
		) );
	}

	public function render_datalayer_push_block( $attributes ) {
		$button_text = esc_html( isset( $attributes['buttonText'] ) ? $attributes['buttonText'] : 'Click Me' );
		$event_name  = esc_js( isset( $attributes['eventName'] ) ? $attributes['eventName'] : 'mtm_event' );
		$event_key   = esc_js( isset( $attributes['eventKey'] ) ? $attributes['eventKey'] : 'event' );
		$event_value = esc_js( isset( $attributes['eventValue'] ) ? $attributes['eventValue'] : '' );
		$onclick     = sprintf( "dataLayer.push({'%s':'%s','%s':'%s'})", 'event', $event_name, $event_key, $event_value );
		return sprintf(
			'<button class="mtm-datalayer-push" onclick="%s">%s</button>',
			esc_attr( $onclick ),
			$button_text
		);
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
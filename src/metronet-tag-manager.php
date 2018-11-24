<?php
/*
Plugin Name: Metronet Tag Manager
Plugin URI: https://wordpress.org/plugins/metronet-profile-picture/
Description: Add Google Tag Manager tracking and declare Data Layer variables
Author: Ronald Huereca
Version: 1.5.0
Requires at least: 4.2
Author URI: https://mediaron.com
Text Domain: metronet-tag-manager
Domain Path: /languages
Contributors: ronalfy,pereirinha
Credits: Ronald Huereca, Marco Pereirinha
*/ 
define('METRONET_TAG_MANAGER_VERISON', '1.5.0');
class Metronet_Tag_Manager {
	private static $instance = null;
	private $admin_options = array();
	
	//Singleton
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self;
		}
		return self::$instance;
	} //end get_instance
	
	private function __construct() {
		add_action( 'init', array( $this, 'init' ) );
		$this->admin_options = $this->get_admin_options();
		include_once Metronet_Tag_Manager::get_plugin_dir('/gutenberg/class-gutenberg.php');
		new Metronet_Tag_Manager_Gutenberg();
	
	} //end construct
	
	/**
	* admin_menu_init()
	* 
	* Initialize admin menus and provide callback methods
	*
	*/
	public function admin_menu_init() {
		$pagename = $this->is_multisite() ? 'settings.php' : 'options-general.php';
		$capabilities = $this->is_multisite() ? 'manage_network' : 'manage_options';
		
		$page_hook = add_submenu_page( $pagename, 'Metronet Tag Manager', 'Metronet Tag Manager', $capabilities, 'metronet-tag-manager', array( $this, 'settings_page' ) );
		add_action( 'admin_print_scripts-' . $page_hook, array( $this, 'print_scripts_settings' ) );
	} //end admin_menu_init
	
	//Add a settings link for single site
	public function add_settings_link( $links ) {
		$admin_uri = add_query_arg( array( 'page' => 'metronet-tag-manager' ), admin_url( 'options-general.php' ) );
		array_push($links, sprintf( '<a href="%s">%s</a>', esc_url( $admin_uri ), esc_html__( 'Settings', 'metronet-tag-manager' ) ) );
		return $links;
	} //end add_settings_link
	
	//Add a settings link for multisite
	public function add_settings_link_multisite( $links ) {
		$admin_uri = add_query_arg( array( 'page' => 'metronet-tag-manager' ), network_admin_url( 'settings.php' ) );
		array_push($links, sprintf( '<a href="%s">%s</a>', esc_url( $admin_uri ), esc_html__( 'Settings', 'metronet-tag-manager' ) ) );
		return $links;
	} //end add_settings_link_multisite
	
	//Output the TinyMCE Popup
	public function ajax_tinymce_popup() {
		include rtrim( plugin_dir_path(__FILE__), '/' ) . '/tinyMCE/addparams.php';
		exit;
	} //end ajax_tiny_mce
	
	/* Filters for dataLayer values */
	public function filter_post_title( $total_match, $match, $post_id ) {
		return get_the_title( $post_id );
	} //end filter_post_title
	public function filter_author_name( $total_match, $match, $post_id ) {	
		$author_id = get_post_field( 'post_author', $post_id );
		$display_name = get_the_author_meta( 'display_name', $author_id );
		return $display_name;
	} //end filter_author_name
	public function filter_wordcount( $total_match, $match, $post_id ) {
		$post_content = get_post_field( 'post_content', $post_id );
		return str_word_count( strip_tags( $post_content ) );
	} //end filter_wordcount
	public function filter_logged_in( $total_match, $match, $post_id ) {
		if ( is_user_logged_in() ) 
			return 'true';
		else
			return 'false';
	} //end filter_logged_in
	public function filter_page_id( $total_match, $match, $post_id ) {
		return $post_id;
	} //end filter_page_id
	public function filter_post_date( $total_match, $match, $post_id ) {
		$post_date = get_post_field( 'post_date', $post_id );
		return $post_date;
	} //end filter_post_date
	
	private function get_admin_options() {
		if ( empty( $this->admin_options ) ) {
			$admin_options = $this->get_default_options();
			
			
			$options = $this->is_multisite() ? get_site_option( 'metronet_tag_manager' ) : get_option( 'metronet_tag_manager' ) ;
			if ( !$options ) $options = array();
			if ( !empty( $options ) ) {
				foreach ( $options as $key => $option ) {
					if (array_key_exists( $key, $admin_options ) ) {
						$admin_options[$key] = $option;
					} 
				} //end foreach $options
			} //end if empty options
			$this->admin_options = $admin_options;
			
			if ( $this->admin_options !== $options ) {
				$this->save_admin_options();
			}
		} //end load default options
		return $this->admin_options;
	} //end get_admin_options
	
	private function get_default_options() {
		$defaults = array(
			'code' => '',
			'code_head' => '',
			'variables' => array(
				0 => array(
					'name' => 'title',
					'value' => '%post_title%',
				),
				1 => array(
					'name' => 'author',
					'value' => '%author_name%',
				),
				2 => array(
					'name' => 'wordcount',
					'value' => '%wordcount%',
				),
				3 => array(
					'name' => 'logged_in',
					'value' => '%logged_in%',
				),
				4 => array(
					'name' => 'page_id',
					'value' => '%page_id%',
				),
				5 => array(
					'name' => 'post_date',
					'value' => '%post_date%',
				)
			),
			'external_variables' => array()		
		);
		return $defaults;
	} //end get_default_options
	
	/**
	* is_multisite()
	* @desc - Returns a boolean if the site is multisite or not
	* 
	* @returns true if plugin is network activated, false if not
	*/
	private function is_multisite() {
		$multisite_network = false;
		if ( ! function_exists( 'is_plugin_active_for_network' ) )  require_once( ABSPATH . '/wp-admin/includes/plugin.php' );
		if ( is_plugin_active_for_network( plugin_basename( __FILE__  ) ) ) {
			$multisite_network = true;
		}
		return $multisite_network;
	} //end is_multisite
	
	/**
     * Return the absolute path to an asset.
     *
     * Return the absolute path to an asset based on a relative argument.
     *
     * @param string $path Relative path to the asset.
     *
     * @since  5.0.0
     * @access static
     *
     * @return string Absolute path to the relative asset.
     */
    public static function get_plugin_dir($path = '')
    {
        $dir = rtrim(plugin_dir_path(__FILE__), '/');
        if (!empty($path) && is_string($path))
            $dir .= '/' . ltrim($path, '/');
        return $dir;
    }

    /**
     * Return the web path to an asset.
     *
     * Return the web path to an asset based on a relative argument.
     *
     * @since 2.0.0
     * @access static
     *
     * @param string $path Relative path to the asset.
     * @return string Web path to the relative asset.
     */
    public static function get_plugin_url($path = '')
    {
        $dir = rtrim(plugin_dir_url(__FILE__), '/');
        if (!empty($path) && is_string($path))
            $dir .= '/' . ltrim($path, '/');
        return $dir;
	}
	
	/**
	* init()
	* 
	* Initializes plugin localization, post types, updaters, plugin info, and adds actions/filters
	*
	*/
	public function init() {
		//* Localization Code */
		load_plugin_textdomain( 'metronet-tag-manager', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
		
		//Admin Menu
		if ( $this->is_multisite() ) {
			add_action( 'network_admin_menu', array( $this, 'admin_menu_init' ) );
		} else {
			add_action( 'admin_menu', array( $this, 'admin_menu_init' ) );
		}
		
		//For the plugin settings link
		if ( $this->is_multisite() ) {
			add_filter( 'network_admin_plugin_action_links_' . plugin_basename(__FILE__) , array( $this, 'add_settings_link_multisite'), 5 );
		} else {
			add_filter( 'plugin_action_links_' . plugin_basename(__FILE__) , array( $this, 'add_settings_link'), 5 );
		}
		
		//Print post scripts
		add_action( 'admin_print_scripts-post.php', array( $this, 'print_scripts_settings' ) );
		add_action( 'admin_print_scripts-post-new.php', array( $this, 'print_scripts_settings' ) );
		
		//Plugin meta box
		add_action( 'add_meta_boxes', array( $this, 'meta_box_init' ), 10, 1 );
		
		//Save post hook for the metabox variables
		add_action( 'save_post', array( $this, 'meta_box_save' ), 10, 1 );
		
		//Load GTM in the Footer (or header if they have the do_action( 'body_open' ) functionality
		add_action( 'wp_head', array( $this, 'output_tag_manager_head' ), 1 );
		add_action( 'body_open', array( $this, 'output_tag_manager_body' ) );
		add_action( 'wp_footer', array( $this, 'output_tag_manager_body' ) );
		
		//Filters for the GTM variables
		add_filter( 'gtm_post_title', array( $this, 'filter_post_title' ), 9, 3 );
		add_filter( 'gtm_author_name', array( $this, 'filter_author_name' ), 9, 3 );
		add_filter( 'gtm_wordcount', array( $this, 'filter_wordcount' ), 9, 3 );
		add_filter( 'gtm_logged_in', array( $this, 'filter_logged_in' ), 9, 3 );
		add_filter( 'gtm_page_id', array( $this, 'filter_page_id' ), 9, 3 );
		add_filter( 'gtm_post_date', array( $this, 'filter_post_date' ), 9, 3 );
		
		//TinyMCE Addition
		if ( ( current_user_can('edit_posts') || current_user_can('edit_pages') ) && get_user_option('rich_editing') ) {
			// Register addicional attribue for A tag
			add_filter('tiny_mce_before_init', array( $this, 'tinymce_options'  ) );

			add_filter('mce_external_plugins', array( $this, 'tinymce_add_metro_gtm_tinymce_plugin' ) );
			add_filter('mce_buttons', array( $this, 'tinymce_register_metro_gtm_button' ) );
			
			add_action( 'wp_ajax_mtm_addparams', array( $this, 'ajax_tinymce_popup' ) );
		}
	} //end init
	
	public function tinymce_options( $options ) {
		if ( ! isset( $options['extended_valid_elements'] ) )
			$options['extended_valid_elements'] = ''; 
	
		$options['extended_valid_elements'] .= ',a[target<_blank?_self?_top?_parent|ping|media|href|hreflang|type|rel<alternate?archives?author?bookmark?external?feed?first?help?index?last?license?next?nofollow?noreferrer?prev?search?sidebar?tag?up|onclick|id|class|title]'; 
		return $options; 
	}
	public function tinymce_add_metro_gtm_tinymce_plugin( $plugin_array ) {
		$plugin_array['metro_gtm'] = plugins_url( '/tinyMCE/editor_plugin.js', __FILE__ );
		return $plugin_array;
	} //end tinymce_add_metro_gtm_tinymce_plugin
	
	public function tinymce_register_metro_gtm_button( $buttons ) {
		array_push( $buttons, "separator", "metro_gtm" );
		return $buttons;
	} //end tinymce_register_metro_gtm_button
	
	//Initializes the post meta box
	public function meta_box_init( $post_type ) {
		if ( get_post_type() === false ) return;
		add_meta_box( 'metronet_tag_manager', 'Google Tag Manager DataLayer variables', array( $this, 'meta_box_settings' ), $post_type, 'normal', 'default' );
	} //end meta_box_init
	
	//Save meta box options
	public function meta_box_save( $post_id ) {
		
		//Make sure user can edit post/page
		if ( 'page' === get_post_type() ) {
			if ( !current_user_can( 'edit_page', $post_id ) ) {
				return;
			}
		} else {
			if ( !current_user_can( 'edit_post', $post_id ) ) {
				return;
			}
		}
		
		//Make sure not a post revision
		if ( wp_is_post_revision( $post_id ) ) return;
		
		//Verify da nonce
		if ( !isset( $_POST[ 'mtm_save_post' ] ) ) return;
		if ( !wp_verify_nonce( $_POST[ 'mtm_save_post' ], plugin_basename( __FILE__ ) ) ) return;
		

		//Save the variables
		$variable_array = array();
		if ( isset( $_POST[ 'tag_manager' ] ) && !empty( $_POST[ 'tag_manager' ] ) ) {
			foreach( $_POST[ 'tag_manager' ] as $variable ) {
				$name = $this->sanitize_variable_name( $variable[ 'name' ] );
				$value = $this->sanitize_value( $variable[ 'value' ] );
				$variable_array[] = array(
					'name' => $name,
					'value' => $value
				);
			}
		}
		update_post_meta( $post_id, '_gtm_vars', $variable_array );
	} //end meta_box_save
	
	//Show the meta box settings
	public function meta_box_settings() {
		global $post;
		wp_nonce_field( plugin_basename( __FILE__ ), 'mtm_save_post' );
		
		//Output Datalayer variables
		$post_id = $post->ID;
		$gtm_vars = get_post_meta( $post_id, '_gtm_vars', true );
		$this->output_variables_to_edit( $gtm_vars, 'tag_manager' );
	} //end meta_box_settings
	
	public function output_tag_manager_head() {
		//Output DataLayer Variables
		$data_layer_array = array();
		if ( !is_single() && !is_page() ) {
			//Output datalayer variables if not on a single or post page
			$gtm_vars = $this->admin_options[ 'external_variables' ];
			foreach( $gtm_vars as $index => $vars ) {
				$data_layer_array[ $vars[ 'name' ] ] = esc_js( $vars[ 'value' ] );
			}
		} else {
			//Output DataLayer variables only if on a single post or page
			global $post;
			$post_id = $post->ID;
			
			//Retrieve global options and store to array
			$gtm_vars = $this->admin_options[ 'variables' ];
			foreach( $gtm_vars as $index => $vars ) {
				$data_layer_array[ $vars[ 'name' ] ] = esc_js( $vars[ 'value' ] );
			}
			
			//Retrieve per-post options and store to same array, overwriting the global options
			$post_gtm_vars = get_post_meta( $post_id, '_gtm_vars', true );
			if ( is_array( $post_gtm_vars ) ) {
				foreach( $post_gtm_vars as $index => $vars ) {
					$data_layer_array[ $vars[ 'name' ] ] = esc_js( $vars[ 'value' ] );
				}
			}
		}
		//Now output dataLayer variables
		$post_id = get_queried_object_id();
		foreach( $data_layer_array as &$value ) {
			if ( preg_match( '/^%([^%]*)%/', $value, $matches ) ) {
				/**
				 * Retrieves a variable like %post_title% and does apply_filters( 'gtm_post_title', '%post_title%', 'post_title', post_id );
				 *
				 * Description.
				 *
				 * @since 1.0.0
				 *
				 * @param string  $matches[0] %variable_name%
				 * @param string  $matches[1] variable_name
				 * @param int     $post_id    Object ID
				 */
				$value = apply_filters( 'gtm_' . $matches[1], $matches[0], $matches[1], $post_id );
				//Prevent %item% from outputting in the dataLayer
				if ( is_string( $value ) && $value === $matches[0] ) {
					$value = '';
				}
			}
		}
		echo "\n" . '<script>' . "\n";
		echo sprintf( 'dataLayer = [%s];', wp_json_encode( $data_layer_array ) ) . "\n";
		echo '</script>' . "\n";
		
		//Output GTM Code
		$gtm_code = stripslashes( $this->admin_options[ 'code_head' ] );
		add_filter( 'safe_style_css', array( $this, 'safe_css' ) );
		$allowed_tags = array(
			'iframe'   => array(
				'src'    => true,
				'style'  => true,
				'width'  => true,
				'height' => true,
			),
			'noscript' => array(
			),
			'script'   => array(
				'data-cfasync' => true
			),
			'style' => array(
				
			)
		);
		$gtm_code = wp_kses( $gtm_code, $allowed_tags );
		$gtm_code = str_replace( '&amp;', '&', $gtm_code );
		remove_filter( 'safe_style_css', array( $this, 'safe_css' ) );
		echo $gtm_code;
		
	} //end output_tag_manager
	
	public function output_tag_manager_body() {
		if ( did_action( 'body_open' ) === 1 && did_action( 'wp_footer' ) === 1 ) return;
		
		//Output GTM Code
		$gtm_code = stripslashes( $this->admin_options[ 'code' ] );
		add_filter( 'safe_style_css', array( $this, 'safe_css' ) );
		$allowed_tags = array(
			'iframe'   => array(
				'src'    => true,
				'style'  => true,
				'width'  => true,
				'height' => true,
			),
			'noscript' => array(
			),
			'script'   => array(
				'data-cfasync' => true
			),
			'style' => array(
				
			)
		);
		$gtm_code = wp_kses( $gtm_code, $allowed_tags );
		$gtm_code = str_replace( '&amp;', '&', $gtm_code );
		remove_filter( 'safe_style_css', array( $this, 'safe_css' ) );
		echo $gtm_code;
		
	} //end output_tag_manager_body
	
	private function output_variables_to_edit( $gtm_vars, $gtm_label ) {
		?>
		<div class="datalayer_variables">
			<ol>
			<?php
			if ( !is_array( $gtm_vars ) ) $gtm_vars = array();
			foreach( $gtm_vars as $index => $vars ) {
				//$vars should contain 'name', 'value'
				?>
				<li>
				<label for="var_name_<?php echo esc_attr( $index ); ?>"><?php esc_html_e( 'Name: ', 'metronet-tag-manager' ); ?></label><input type="text" value="<?php echo esc_attr( $vars[ 'name' ] ); ?>" id="var_name_<?php echo esc_attr( $index ); ?>" name="<?php echo esc_attr( $gtm_label ); ?>[<?php echo esc_attr( $index ); ?>][name]" />&nbsp;&nbsp;-&nbsp;&nbsp;
				<label for="var_value_<?php echo esc_attr( $index ); ?>"><?php esc_html_e( 'Value: ', 'metronet-tag-manager' ); ?></label><input type="text" value="<?php echo esc_attr( $vars[ 'value' ] ); ?>" id="var_value_<?php echo esc_attr( $index ); ?>" name="<?php echo esc_attr( $gtm_label ); ?>[<?php echo esc_attr( $index ); ?>][value]" />&nbsp;&nbsp;&nbsp;&nbsp;<a href="#" title="<?php echo esc_attr( __( 'Delete', 'metronet-tag-manager' ) ); ?>"><img src="<?php echo esc_url( plugins_url( '/images/delete.png', __FILE__ ) ); ?>" alt="<?php echo esc_attr( __( 'Delete', 'metronet-tag-manager' ) ); ?>" title="<?php echo esc_attr( __( 'Delete', 'metronet-tag-manager' ) ); ?>" width="20" height="20" /></a>
				</li>
				<?php
			} //end foreach $gtm_vars
			?>
			</ol>
			<a class="tag_manager_add" href="#" title="<?php echo esc_attr( 'Add Item', 'metronet-tag-manager' ); ?>"><?php echo esc_attr( 'Add Item', 'metronet-tag-manager' ); ?></a>
			<input type="hidden" name="tag_manager_index" class="tag_manager_index" value="<?php echo count( $gtm_vars ); ?>" />
			<input type="hidden" name="tag_manager_label" class="tag_manager_label" value="<?php echo esc_attr( $gtm_label ); ?>" />
		</div><!-- .datalayer_variables -->
		<?php
	} //end output_variables_to_edit
	
	//Print JavaScript on the main plugin settings screen
	public function print_scripts_settings() {
		wp_enqueue_script( 'MTM_settings', plugins_url( '/js/mtm-settings.js', __FILE__ ), array( 'jquery' ), '20120715', true );
		wp_localize_script( 'MTM_settings', 'mtm_admin', array(
			'name' => esc_html__( 'Name', 'metronet-tag-manager' ),
			'value' => esc_html__( 'Value', 'metronet-tag-manager' ),
			'delete' => esc_html__( 'Delete', 'metronet-tag-manager' ),
			'delete_src' => plugins_url( '/images/delete.png', __FILE__ )
		) );
	} //end print_scripts_settings
	
	/**
	* safe_css
	* 
	* Used when saving the iframe code on the settings page
	*
	* @param array $css - Array of CSS attributes that are allowed
	* @returns array $css - Appended array of CSS attributes
	**/
	public function safe_css( $css = array() ) {	
		$css[] = 'display';
		$css[] = 'visibility';
		return $css;
	} //end safe_css
	
	/**
	* sanitize_value
	* 
	* Make sure values are in the proper format
	*
	* @param   string  $value   A variable to be sanitized
	* @returns string   $value   A formatted variable
	**/
	private function sanitize_value( $value ) { 
		if( preg_match( '/^%([-_A-Za-z0-9]*)%$/', $value ) ) {
			return $value;
		}
		return sanitize_text_field( $value );
	}
	
	/**
	* sanitize_variable_name
	* 
	* Makes sure a variable name is stripped of spaces and converted for use
	*
	* @param string $var - A variable to be sanitized
	* @returns string $var - A formatted variable
	**/
	private function sanitize_variable_name( $var ) {
		
		$var = remove_accents($var);
		//Code ripped from sanitize_title_with_dashes
		$var = strip_tags($var);
	// Preserve escaped octets.
		$var = preg_replace('|%([a-fA-F0-9][a-fA-F0-9])|', '---$1---', $var);
		// Remove percent signs that are not part of an octet.
		$var = str_replace('%', '', $var);
		// Restore octets.
		$var = preg_replace('|---([a-fA-F0-9][a-fA-F0-9])---|', '%$1', $var);
	
		if (seems_utf8($var)) {
			$var = utf8_uri_encode($var, 200);
		}
	
		$var = preg_replace('/&.+?;/', '', $var); // kill entities
		//$var = str_replace('.', '-', $var); //Commented out for compatibility with GTM 2.0
	
		// Convert nbsp, ndash and mdash to hyphens
		$var = str_replace( array( '%c2%a0', '%e2%80%93', '%e2%80%94' ), '-', $var );

		// Strip these characters entirely
		$var = str_replace( array(
			// iexcl and iquest
			'%c2%a1', '%c2%bf',
			// angle quotes
			'%c2%ab', '%c2%bb', '%e2%80%b9', '%e2%80%ba',
			// curly quotes
			'%e2%80%98', '%e2%80%99', '%e2%80%9c', '%e2%80%9d',
			'%e2%80%9a', '%e2%80%9b', '%e2%80%9e', '%e2%80%9f',
			// copy, reg, deg, hellip and trade
			'%c2%a9', '%c2%ae', '%c2%b0', '%e2%80%a6', '%e2%84%a2',
			// grave accent, acute accent, macron, caron
			'%cc%80', '%cc%81', '%cc%84', '%cc%8c',
		), '', $var );

		// Convert times to x
		$var = str_replace( '%c3%97', 'x', $var );
	
		$var = preg_replace('/[^\.%a-zA-Z0-9 _-]/', '', $var);
		$var = preg_replace('/\s+/', '-', $var);
		$var = preg_replace('|-+|', '-', $var);
		$var = trim($var, '-');
	
		return $var;
	} //end sanitize_variable_name
	
	//Saves settings for admin users
	private function save_admin_options( $admin_options = false ){
		if ( !empty( $this->admin_options ) ) {
			if ( is_array( $admin_options ) ) {
				$this->admin_options = $admin_options;
			}
			if ( $this->is_multisite() ) {
				update_site_option( 'metronet_tag_manager', $this->admin_options);
			} else {
				update_option( 'metronet_tag_manager', $this->admin_options );
			}
		}
	} //end save_admin_options
	
	
	
	/**
	* settings_page()
	* 
	* Output the settings page for the plugin
	*
	*/
	public function settings_page() {
		
		//Handle saving of data
		if ( isset( $_POST[ 'reset' ] ) || isset( $_POST[ 'submit' ] ) ) {
			if ( !wp_verify_nonce( $_REQUEST[ '_metronet' ], 'save_metronet_settings_tags' ) ) {
				echo sprintf( '<div class="error"><p><strong>%s</strong></p></div>', esc_html__( 'This request cannot be verified', 'metronet-tag-manager' ) );
					die( '' );
			} else {
				//A little early, but who cares?
				echo sprintf( '<div class="updated"><p><strong>%s</strong></p></div>', esc_html__( 'Settings saved', 'metronet-tag-manager' ) );
			}
		}
		if ( isset( $_POST[ 'reset' ] ) ) {
			$this->admin_options = $this->get_default_options();
			$this->save_admin_options();
		} elseif ( isset( $_POST[ 'submit' ] ) ) {
			
			//Format the GTM Code for saving
			add_filter( 'safe_style_css', array( $this, 'safe_css' ) );
			$allowed_tags = array(
				'iframe'   => array(
					'src'    => true,
					'style'  => true,
					'width'  => true,
					'height' => true,
				),
				'noscript' => array(
				),
				'script'   => array(
					'data-cfasync' => true
				),
				'style' => array(
				
				)
			);
			$gtm_code = $_POST[ 'gtm-code' ];
			$gtm_code_head = $_POST[ 'gtm-code-head' ];
			$gtm_code_head = wp_kses( $gtm_code_head, $allowed_tags );
			$gtm_code_head = str_replace( '&amp;', '&', $gtm_code_head );
			$gtm_code = wp_kses( $gtm_code, $allowed_tags );
			$gtm_code = str_replace( '&amp;', '&', $gtm_code );
			remove_filter( 'safe_style_css', array( $this, 'safe_css' ) );
			$this->admin_options[ 'code' ] = $gtm_code;
			$this->admin_options[ 'code_head' ] = $gtm_code_head;
			
			//Save the regular post/post type variables
			$variable_array = array();
			if ( isset( $_POST[ 'tag_manager' ] ) && !empty( $_POST[ 'tag_manager' ] ) ) {
				foreach( $_POST[ 'tag_manager' ] as $variable ) {
					$name = $this->sanitize_variable_name( $variable[ 'name' ] );
					$value = $this->sanitize_value( $variable[ 'value' ] );
					$variable_array[] = array(
						'name' => $name,
						'value' => $value
					);
				}
			}
			$this->admin_options[ 'variables' ] = $variable_array;
			
			//Save the external variables (used on home, archive templates)
			$external_variable_array = array();
			if ( isset( $_POST[ 'external_tag_manager' ] ) && !empty( $_POST[ 'external_tag_manager' ] ) ) {
				foreach( $_POST[ 'external_tag_manager' ] as $variable ) {
					$name = $this->sanitize_variable_name( $variable[ 'name' ] );
					$value = $this->sanitize_value( $variable[ 'value' ] );
					$external_variable_array[] = array(
						'name' => $name,
						'value' => $value
					);
				}
			}
			$this->admin_options[ 'external_variables' ] = $external_variable_array;
			
			//Save the admin options
			$this->save_admin_options();
		}
		
		$gtm_code = $this->admin_options[ 'code' ];
		$gtm_code_head = $this->admin_options[ 'code_head' ];
		$gtm_vars = $this->admin_options[ 'variables' ];
		$gtm_external_vars = $this->admin_options[ 'external_variables' ];
		?>
		<form action="<?php echo esc_url( add_query_arg( array() ) ); ?>" method="post">
		<input type="hidden" name="action" value="save" />
		<?php wp_nonce_field( 'save_metronet_settings_tags', '_metronet' ); ?>
		<h2>Metronet Tag Manager</h2>
		<?php
		//Show the body error message (dismissable).
		global $current_user;
		$user_id = $current_user->ID;
		if ( !get_user_meta( $user_id, 'gtm_body_notice', true ) ) {
			echo '<div class="updated"><p>';
			esc_html_e( "Google recommends that the Google Tag Manager script is loaded straight after the opening <body> tag. For this to work, you will need to add the following piece of code into your template file just after the <body> tag: <?php do_action( 'body_open' ); ?> . Otherwise the GMT script will be added at the bottom of your site and might not track the way you want it to.", 'metronet-tag-manager' );
			echo '&nbsp;';
			printf( '<a href="%s">%s</a>', esc_url( 'https://developers.google.com/tag-manager/quickstart' ), esc_html__( 'View the Quickstart Guide', 'metronet-tag-manager' ) );
			echo '</p></div>';
		}
		?>
		<table class="form-table">
			<tr valign="top">
				<th scope="row"><?php esc_html_e( 'Google Tag Manager Code', 'metronet-tag-manager' ); ?></th>
				<td>
					<p><?php esc_html_e( 'You can view your Container Snippet by logging into Google Tag Manager, clicking Workspace, and clicking on your GTM-XXXXX code.', 'metronet-tag-manager' ); ?></p>
					<p><em><?php esc_html_e( 'Paste your Google Tag Manager code here, which will appear in the <head> portion of your site:', 'metronet-tag-manager' ); ?></em></p>
					<p><textarea name="gtm-code-head" class="large-text code" rows="10"><?php echo stripslashes( esc_textarea( $gtm_code_head ) ); ?></textarea></p>
					<p><em><?php esc_html_e( 'Paste your Google Tag Manager code here, which will ideally appear after the opening <body> tag:', 'metronet-tag-manager' ); ?></em></p>
					<p><textarea name="gtm-code" class="large-text code" rows="10"><?php echo stripslashes( esc_textarea( $gtm_code ) ); ?></textarea></p>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row"><?php esc_html_e( 'Post/Page Variables', 'metronet-tag-manager' ); ?></th>
				<td>
					<p><?php esc_html_e( 'Add global variables and set defaults to show on posts, pages, and custom post types.  You can configure or overwrite these on a per-post basis by viewing a post.', 'metronet-tag-manager' ); ?></p>
					<p><?php printf( '%s <a href="%s">%s</a>.', esc_html__( 'To see some examples, please visit the', 'metronet-tag-manager' ), esc_url( 'https://developers.google.com/tag-manager/reference' ), esc_html__( 'Google Tag Manager Reference', 'metronet-tag-manager' ) );?></p>
					<?php $this->output_variables_to_edit( $gtm_vars, 'tag_manager' ); ?>
				</td>
			</tr>
			<tr valign="top">
				<th scope="row"><?php esc_html_e( 'External Variables', 'metronet-tag-manager' ); ?></th>
				<td>
					<p><?php esc_html_e( 'Add global variables that will show on all pages except posts, pages, or custom post types.', 'metronet-tag-manager' ); ?></p>
					<p><?php printf( '%s <a href="%s">%s</a>.', esc_html__( 'To see some examples, please visit the', 'metronet-tag-manager' ), esc_url( 'https://developers.google.com/tag-manager/reference' ), esc_html__( 'Google Tag Manager Reference', 'metronet-tag-manager' ) );?></p>
					<?php $this->output_variables_to_edit( $gtm_external_vars, 'external_tag_manager' ); ?>
				</td>
			</tr>
		</table>
		<p class="submit"><?php submit_button( esc_html__( 'Reset to Defaults', 'metronet-tag-manager' ), 'delete', 'reset', false ); ?>&nbsp;&nbsp;&nbsp;<?php submit_button( esc_html__( 'Save Changes', 'metronet-tag-manager' ), 'primary', 'submit', false ); ?>
		<?php
		
		
		
	} //end settings_page
	
} //end class Metronet_Tag_Manager

add_action( 'plugins_loaded', 'metronet_tag_manager_instantiate' );
function metronet_tag_manager_instantiate() {
	Metronet_Tag_Manager::get_instance();
} //end metronet_tag_manager_instantiate
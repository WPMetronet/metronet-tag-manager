=== Metronet Tag Manager ===
Contributors: ronalfy, metronet, pereirinha
Tags: google, google tag manager, tag manager
Requires at least: 3.1
Tested up to: 3.6
Stable tag: 1.0.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html

Integrate Google Tag Manager into  your website.

== Description ==

Integrate Google Tag Manager into your website.  Use dataLayer variables on a per-post and per-page basis.  Use variables for flexibility.

== Installation ==

1. Just unzip and upload the "metronet-tag-manager" folder to your '/wp-content/plugins/' directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Modify your theme's `header.php` to include `<?php do_action( 'body_open' ); ?>` right after the opening `<body>` tag.
4. Go to the plugin's settings and input your Google Tag Manager data.

== Frequently Asked Questions ==

= What is Google Tag Manager =

Please refer to the <a href="http://www.google.com/tagmanager/faq.html">Google Tag Manager FAQ</a>.

= What are dataLayer variables? =

Please refer to the <a href="https://developers.google.com/tag-manager/reference">Google Tag Manager API</a> reference.

= What are dataLayer variables used for? =

== Screenshots ==

1. Admin settings.
2. Per-post/page settings.
3. TinyMCE button for adding dataLayer variables.

== Changelog ==

= 1.0 =
* Initial release.

== Upgrade Notice ==

= 1.0 =
Initial Release

== Filtering Variables ==

If you choose to place variable values inside percentage signs (e.g., %replace_test%), you can filter these as necessary.

Here's an example:
`
add_filter( 'gtm_replace_test', 'gtm_replace_test', 10, 3 );
function gtm_replace_test( $total_match, $match, $post_id ) {
	return "replaced with content";
}
`

The filter name is `gtm_` with the suffix of `replace_test`, since that content is inbetween the percentage signs.

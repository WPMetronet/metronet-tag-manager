Metronet Tag Manager for WordPress
====================

Integrate Google Tag Manager into your website.  Use dataLayer variables on a per-post and per-page basis.  Use variables for flexibility.

Installation
----------------------

1. Just unzip and upload the "metronet-tag-manager" folder to your '/wp-content/plugins/' directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Modify your theme's `header.php` to include `<?php do_action( 'body_open' ); ?>` right after the opening `<body>` tag.
4. Go to the plugin's settings and input your Google Tag Manager data.

FAQ
-----------------------
### What is Google Tag Manager

Please refer to the <a href="http://www.google.com/tagmanager/faq.html">Google Tag Manager FAQ</a>.

### What are dataLayer variables?

Please refer to the <a href="https://developers.google.com/tag-manager/reference">Google Tag Manager API</a> reference.

### What are dataLayer variables used for?

The data layer is an object that contains the information that you want to pass to Google Tag Manager. By setting up rules in Google Tag Manager, these variables can then be used to include the correct snippets or scripts – for example when a certain button is clicked.

Filtering Variables
-----------------------
If you choose to place variable values inside percentage signs (e.g., %replace_test%), you can filter these as necessary.

Here's an example:
```php
add_filter( 'gtm_replace_test', 'gtm_replace_test', 10, 3 );
function gtm_replace_test( $total_match, $match, $post_id ) {
	return "replaced with content";
}
```

The filter name is `gtm_` with the suffix of `replace_test`, since that content is inbetween the percentage signs.

Another example is outputting the post categories. The value in this case would be `%post_category%`.

You would place the code below in your theme's `functions.php` or a site-specific plugin.

```php
add_filter( 'gtm_post_category', 'gtm_populate_category_items', 10, 3 );
function gtm_populate_category_items( $total_match, $match, $post_id  ) {
	$terms = wp_get_object_terms( $post_id, 'category', array( 'fields' => 'slugs' ) );
	if ( is_wp_error( $terms ) || empty( $terms ) ) {
		return '';
	}
	return $terms;
}
```

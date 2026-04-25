Metronet Tag Manager for WordPress
====================

Integrate Google Tag Manager into your website. Use dataLayer variables on a per-post and per-page basis. Use variables for flexibility.

Developed and maintained by [WP Metronet](https://wpmetronet.com/) and [Ruskin Consulting](https://ruskinconsulting.com/).

Description
----------------------

The great thing about Google Tag Manager (GTM) is that you are able to gather most of your tracking scripts in one place. You can then fire these scripts whenever you want, specified by the rules you set up. This sounds great, right? Well it is. The only problem is that sometimes it takes a bit of implementing to set these rules up. This implementation can either be setting a dataLayer variable in the dataLayer before the tag manager script is loaded, or pushing a HTML event handler with the variable "event" to the dataLayer when a button is clicked. The problem is that this isn't always that easy to do when you don't have the ability/access to add the code to your site.

This is where the Metronet Tag Manager plugin shines. It really unlocks the power of the dataLayer so you can easily set macros and firing rules on almost any element.

This plugin lets you:

- Easily add as many dataLayer variables on a per-post and per-page basis as you need.
- The plugin already gives you predefined dataLayer variables that you can change/remove or test the system with. These will be loaded on all pages and posts. Built-in placeholders include: `%post_title%`, `%author_name%`, `%wordcount%`, `%logged_in%`, `%page_id%`, `%post_date%`, `%post_type%`, `%category%`, `%tags%`, `%post_id%`, `%permalink%`, and `%language%`.
- Set up separate dataLayer variables for pages that aren't posts or pages (like archives, etc).
- Lets you easily add a HTML event handler to any content link with the GTM TinyMCE button in the WYSIWYG.
- Lets you add your own unique ID or a class to each content link with the GTM TinyMCE button in the WYSIWYG.
- Google Consent Mode v2 support — output default consent states before the GTM snippet for EU compliance.
- Export and import all plugin settings as JSON for easy migration between sites.
- Conditionally exclude GTM from logged-in users or mobile devices.
- Enable GTM output on the WordPress login page.
- Full Gutenberg / block editor support — use the `metronettagmanager/datalayer-push` block to add inline dataLayer push buttons to any section of your block-based content.

Gutenberg / Block Editor Support
----------------------

Metronet Tag Manager has full support for the WordPress block editor (Gutenberg). This integration lets you add dataLayer push events directly within individual sections of your content — no custom code required.

Using the built-in `metronettagmanager/datalayer-push` block, you can:

- Insert a dataLayer push button anywhere in the block editor.
- Configure the event name, key, and value directly in the block inspector panel — right alongside the section you want to track.
- Target individual content sections, so different parts of a page can fire completely different GTM events.
- Render a fully functional frontend button that fires `dataLayer.push()` on click, with no template edits needed.

This makes it easy to track user interactions at the section level — exactly where they happen in your content, not just on the page as a whole.

Installation
----------------------

1. Just unzip and upload the "metronet-tag-manager" folder to your '/wp-content/plugins/' directory
2. Activate the plugin through the 'Plugins' menu in WordPress
3. Modify your theme's `header.php` to include `<?php do_action( 'body_open' ); ?>` right after the opening `<body>` tag.
4. Go to the plugin's settings and input your Google Tag Manager data.

> **Note**: if you are using WordPress 5.2 and up, contact your theme developer and ask them to insert `<?php wp_body_open(); ?>` just after the opening body tag of their theme.

Resources
-----------------------

- [Official Google Tag Manager website](https://developers.google.com/tag-manager/)
- [Tracking PDF Downloads with Tag Manager on WordPress](https://wpmetronet.com/how-to-track-pdf-downloads-with-tag-manager-on-wordpress/)
- [The Benefits of Using a Tag Manager Plugin on WordPress](https://wpmetronet.com/the-benefits-of-using-a-tag-manager-plugin-on-wordpress/)

FAQ
-----------------------
### What is Google Tag Manager

Please refer to the [Google Tag Manager FAQ](http://www.google.com/tagmanager/faq.html).

### What are dataLayer variables?

Please refer to the [Google Tag Manager API](https://developers.google.com/tag-manager/reference) reference.

### What are dataLayer variables used for?

The data layer is an object that contains the information that you want to pass to Google Tag Manager. By setting up rules in Google Tag Manager, these variables can then be used to include the correct snippets or scripts – for example when a certain button is clicked.

### Can I have dynamic values?

Yes. For custom values, please see the [Filtering Variables](#filtering-variables) section below.

Filtering Variables
-----------------------
If you choose to place variable values inside percentage signs (e.g., `%replace_test%`), you can filter these as necessary.

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

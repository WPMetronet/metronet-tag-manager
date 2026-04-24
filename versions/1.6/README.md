=== Metronet Tag Manager ===
Contributors: leonhitchens, ruskinconsulting
Tags: google, google tag manager, tag manager, datalayer, gtm, analytics, consent mode
Requires at least: 5.0
Tested up to: 6.9
Stable tag: 1.6.0
License: GPLv2 or later
License URI: http://www.gnu.org/licenses/gpl-2.0.html
Donate link: https://wpmetronet.com/contribute/

Integrate Google Tag Manager into your website with dataLayer variables, Consent Mode v2 support, and advanced analytics controls.

== Description ==

Integrate Google Tag Manager into your WordPress website and take full control of your dataLayer. Metronet Tag Manager makes it easy to set up GTM tracking without touching code on every page.

The great thing about Google Tag Manager (GTM) is that you can gather most of your tracking scripts in one place and fire them based on rules you define. This plugin unlocks the power of the dataLayer so you can easily set macros and firing rules on almost any element — without needing developer access for every change.

This plugin lets you:

<ul>
<li>Easily add as many dataLayer variables on a per-post and per-page basis as you need.</li>
<li>Seven built-in predefined dataLayer variables (title, author, wordcount, logged_in, page_id, post_date, post_type) load on all posts and pages — customise or remove them as needed.</li>
<li>Additional built-in placeholders: <code>%category%</code>, <code>%tags%</code>, <code>%post_id%</code>, <code>%permalink%</code>, and <code>%language%</code>.</li>
<li>Set up separate dataLayer variables for non-post/page templates (archives, search results, home page, etc.).</li>
<li>Add an HTML event handler to any content link using the GTM button in the TinyMCE / Classic Editor WYSIWYG.</li>
<li>Add a unique ID or class to any content link via the GTM TinyMCE button.</li>
<li>Enable <strong>Google Consent Mode v2</strong> — output default consent states before the GTM snippet for GDPR / EU compliance.</li>
<li>Conditionally load GTM based on user role (e.g. exclude admins from tracking) or device type (mobile vs desktop).</li>
<li>Enable GTM output on the WordPress login page.</li>
<li><strong>Export and Import</strong> your full settings as JSON — ideal for migrating between environments.</li>
<li>Use the Gutenberg <strong>dataLayer Push block</strong> (<code>metronettagmanager/datalayer-push</code>) to attach a dataLayer event to any button in the block editor.</li>
</ul>

> **Theme compatibility:** WordPress does not allow scripts directly after the opening `<body>` tag by default. For the GTM body snippet to fire correctly, your theme must call `<?php wp_body_open(); ?>` just after `<body>`. Most modern themes (WordPress 5.2+) already support this. If yours does not, ask your theme developer to add it. Here is some code to <a href="https://gist.github.com/ronalfy/6b7f43e70e644320aba67d1876a0aeff">show the theme developer to make it compatible with Metronet Tag Manager</a>.

Please let us know if you have any feature requests or issues with this plugin.

Below are a couple of resources you might find valuable if you are new to Google Tag Manager:

Official Google Tag Manager website
<a href="https://developers.google.com/tag-manager/">https://developers.google.com/tag-manager/</a>

Tracking PDF Downloads with Tag Manager on WordPress
<a href="https://wpmetronet.com/how-to-track-pdf-downloads-with-tag-manager-on-wordpress/">https://wpmetronet.com/how-to-track-pdf-downloads-with-tag-manager-on-wordpress/</a>

The Benefits of Using a Tag Manager Plugin on WordPress
<a href="https://wpmetronet.com/the-benefits-of-using-a-tag-manager-plugin-on-wordpress/">https://wpmetronet.com/the-benefits-of-using-a-tag-manager-plugin-on-wordpress/</a>

**Metronet Tag Manager is maintained by <a href="https://ruskinconsulting.com">Ruskin Consulting</a>.** If you need help with Google Tag Manager, Google Analytics (GA4), or analytics strategy for your WordPress site, reach out to us — we would love to help.

== Installation ==

1. Unzip and upload the `metronet-tag-manager` folder to your `/wp-content/plugins/` directory.
2. Activate the plugin through the **Plugins** menu in WordPress.
3. Ensure your theme calls `<?php wp_body_open(); ?>` just after the opening `<body>` tag (required for the GTM body snippet).
4. Go to **Settings → Metronet Tag Manager** and paste your Google Tag Manager snippet(s).
5. Configure dataLayer variables, Consent Mode, and conditional loading as needed.

> <strong>Note:</strong> if your theme does not support <code>wp_body_open</code>, contact your theme developer and point them to this <a href="https://gist.github.com/ronalfy/6b7f43e70e644320aba67d1876a0aeff">compatibility snippet</a>.

For custom dynamic variable values, <a href="https://github.com/WPMetronet/metronet-tag-manager#filtering-variables">please see the Filtering Variables section on GitHub</a>.

== Frequently Asked Questions ==

= What is Google Tag Manager? =

Please refer to the <a href="https://support.google.com/tagmanager/answer/6103696">Google Tag Manager FAQ</a>.

= What are dataLayer variables? =

Please refer to the <a href="https://developers.google.com/tag-manager/reference">Google Tag Manager API</a> reference.

= What are dataLayer variables used for? =

The data layer is a JavaScript object that contains information you want to pass to Google Tag Manager. By setting up rules in GTM, these variables control which tags fire — for example, tracking a button click or identifying a page category.

= Can I have dynamic values? =

Yes. Use <code>%placeholder%</code> syntax in variable values. Many placeholders are built in (see below). For custom dynamic values, see the Filtering Variables section.

= What built-in placeholders are available? =

The following placeholders are available out of the box:

<ul>
<li><code>%post_title%</code> — The post or page title</li>
<li><code>%author_name%</code> — The author's display name</li>
<li><code>%wordcount%</code> — Word count of the post content</li>
<li><code>%logged_in%</code> — <code>true</code> or <code>false</code> depending on login state</li>
<li><code>%page_id%</code> — The WordPress queried object ID</li>
<li><code>%post_id%</code> — The numeric post ID</li>
<li><code>%post_date%</code> — The post publication date</li>
<li><code>%post_type%</code> — The post type slug (e.g. <code>post</code>, <code>page</code>)</li>
<li><code>%category%</code> — The primary category slug</li>
<li><code>%tags%</code> — Comma-separated tag slugs</li>
<li><code>%permalink%</code> — The canonical URL of the post/page</li>
<li><code>%language%</code> — The site locale string (e.g. <code>en_US</code>)</li>
</ul>

= What is Google Consent Mode v2? =

Google Consent Mode v2 is required for EU sites using GTM with Google Ads or Analytics. It lets you set default consent states before GTM fires, ensuring compliant data collection even before a user interacts with your consent banner. Enable it under <strong>Settings → Metronet Tag Manager → Consent Mode</strong>.

= How do I exclude admins from GTM tracking? =

Under <strong>Other Options</strong>, check <strong>Exclude logged-in users by role</strong> and select which roles to exclude. GTM snippets will not be output for those users.

= How do I migrate settings between sites? =

Use the <strong>Export Settings</strong> button to download a JSON file of your current configuration. On the target site, use <strong>Import Settings</strong> to upload and apply it.

= I need help with GTM or Analytics — who do I contact? =

Metronet Tag Manager is maintained by <a href="https://ruskinconsulting.com">Ruskin Consulting</a>. Reach out to us for hands-on help with Google Tag Manager, GA4, and analytics strategy.

== Screenshots ==

1. Google Tag Manager account dashboard
2. Google Tag Manager Workspace
3. Recommended Google Tag Manager snippet
4. Google Tag Manager snippet inside the plugin settings
5. Consent Mode v2 settings panel
6. dataLayer Push Gutenberg block in the block editor

== Changelog ==

= 1.6.0 =
* Released 2025-04-24
* Bug fix: Corrected Plugin URI — was incorrectly pointing to `metronet-profile-picture` (Issue #10).
* Bug fix: GTM head/body snippets now output on the WordPress login page when enabled (Issue #9).
* Bug fix: Fixed `%category%` placeholder — `sanitize_text_field()` was stripping `%` signs, preventing storage (Issue #2).
* Bug fix: Wired up REST route permission callback in Gutenberg class — previously registered but unused (Issue #21).
* Bug fix: `uninstall.php` now uses `$wpdb->prepare()` for safe SQL (WPCS compliance).
* New feature: Additional built-in dataLayer placeholders: `%category%`, `%tags%`, `%post_id%`, `%permalink%`, `%language%`.
* New feature: Google Consent Mode v2 support — configure default consent states output before the GTM snippet.
* New feature: Settings Import / Export — export plugin settings as JSON and import on another site.
* New feature: Conditional tag loading — exclude users by role or device type (mobile/desktop) from GTM output.
* New feature: GTM output can now be enabled on the WordPress login page.
* New feature: Gutenberg dataLayer Push block (`metronettagmanager/datalayer-push`) — add button-triggered dataLayer events directly in the block editor.
* Maintenance: Updated all JS/CSS dependencies (axios, node-sass, jquery, loader-utils, qs, and others flagged by Dependabot).
* Maintenance: WPCS 3.0 compliance — renamed `getMessage()` to `get_message()`, fixed remaining coding standards violations.
* Tested with WordPress 6.9.

= 1.5.5 =
* Released 2023-06-24
* Adding the ability to update header messages remotely.

= 1.5.4 =
* Released 2019-07-16
* Adding GTM dataLayer on search pages.

= 1.5.3 =
* Released 2019-07-16
* Added Beaver Builder compatibility.

= 1.5.2 =
* Released 2019-05-24
* Updating documentation.
* Adding option to hide GTM data layer settings on posts/pages.

= 1.5.1 =
* Released 2019-05-21
* Added support for WordPress 5.2's wp_body_open tag.

= 1.5.0 =
* Released 2018-11-24
* Added Gutenberg inline option for setting a dataLayer variable.

= 1.3.0 =
* Released 2018-07-25
* Fixed a bug when saving and outputting Google Tag Manager snippets where an ampersand HTML entity was added to the output.

= 1.2.9 =
* Released 2018-04-24
* Fixed serious security issue. Please update immediately.

= 1.2.7 =
* Released 2017-11-15
* Fixing issues in the admin where HTML elements were escaped accidentally.

= 1.2.3 =
* Updated 2017-08-10
* Adding style element support.

= 1.2.1 =
* Updated 2017-05-02
* Code cleanup and remediation by 10up.

= 1.2.0 =
* Updated 2016-11-08
* Able to adhere to the new tag recommendations of inserting tag markup in the header and also after the body tag.

= 1.1.0 =
* Updated 2016-04-08
* Improved sanitization for custom values.
* Added support for CloudFlare arguments in GTM code.
* Prevent non-filtered custom value from being outputted in the dataLayer.

= 1.0.8 =
* Updated 2016-03-25
* Allow arrays/objects in dataLayer as JSON arguments.

= 1.0.6 =
* Updated 2015-08-20 — WordPress 4.3 compatibility.
* Bug fix — allow periods in data variable names to comply with GTM 2.0.

= 1.0.5 =
* Updated 2014-12-11 — WordPress 4.1 compatibility.
* Fixed anonymous function crashing on PHP < 5.3.

= 1.0.4 =
* Released 2014-08-27
* Fixed meta problem with data variables showing up in areas where there are no posts or pages.
* WordPress 4.0 compatibility.

= 1.0.3 =
* Released 2014-07-08
* Migration to TinyMCE 4.
* Translations template added.

= 1.0.2 =
* Released 2013-07-30
* Documentation update.

= 1.0.1 =
* Released 2013-07-24
* Fixing TinyMCE JavaScript issue.

= 1.0 =
* Initial release.

== Upgrade Notice ==

= 1.6.0 =
Major update — bug fixes, new dataLayer placeholders, Google Consent Mode v2, settings import/export, conditional loading, login page support, and a new Gutenberg block. Compatible with WordPress 6.9.

= 1.5.5 =
Compatible with WordPress 6.1.1.

= 1.5.4 =
Adding GTM dataLayer on search pages.

= 1.5.3 =
Added Beaver Builder compatibility.

= 1.5.2 =
Updating documentation. Adding option to hide GTM data layer settings on posts/pages.

= 1.5.1 =
Added support for WordPress 5.2's wp_body_open tag.

= 1.5.0 =
Added Gutenberg inline option for setting a dataLayer variable.

= 1.3.0 =
Fixed a bug when saving and outputting Google Tag Manager snippets where an ampersand HTML entity was added to the output.

= 1.2.9 =
Fixed serious security issue. Please update.

== Filtering Variables ==

If you choose to place variable values inside percentage signs (e.g., %replace_test%), you can filter these dynamically using WordPress filters.

Here's a basic example:

`
add_filter( 'gtm_replace_test', 'gtm_replace_test', 10, 3 );
function gtm_replace_test( $total_match, $match, $post_id ) {
    return 'replaced with content';
}
`

The filter name is `gtm_` followed by the text between the percentage signs (e.g. `gtm_replace_test` for `%replace_test%`).

Each filter callback receives three arguments: the full match string, the match name, and the current post ID.

Here is an example that outputs post categories using the placeholder `%post_category%`. Place the code in your theme's `functions.php` or a site-specific plugin:

`
add_filter( 'gtm_post_category', 'gtm_populate_category_items', 10, 3 );
function gtm_populate_category_items( $total_match, $match, $post_id ) {
    $terms = wp_get_object_terms( $post_id, 'category', array( 'fields' => 'slugs' ) );
    if ( is_wp_error( $terms ) || empty( $terms ) ) {
        return '';
    }
    return $terms;
}
`

Built-in placeholder filters registered automatically by the plugin:

* `gtm_post_title` — `%post_title%` — post/page title
* `gtm_author_name` — `%author_name%` — author display name
* `gtm_wordcount` — `%wordcount%` — integer word count
* `gtm_logged_in` — `%logged_in%` — `true` or `false`
* `gtm_page_id` — `%page_id%` — queried object ID
* `gtm_post_id` — `%post_id%` — numeric post ID
* `gtm_post_date` — `%post_date%` — post date string
* `gtm_post_type` — `%post_type%` — post type slug
* `gtm_category` — `%category%` — primary category slug
* `gtm_tags` — `%tags%` — comma-separated tag slugs
* `gtm_permalink` — `%permalink%` — canonical URL
* `gtm_language` — `%language%` — site locale (e.g. `en_US`)

Maintained by <a href="https://ruskinconsulting.com">Ruskin Consulting</a>. Need help with Google Tag Manager or analytics? <a href="https://ruskinconsulting.com">Get in touch.</a>

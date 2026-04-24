Metronet Tag Manager for WordPress — v1.6.0
====================

Integrate Google Tag Manager into your website. Use dataLayer variables on a per-post and per-page basis. Use built-in or custom variable placeholders for flexible, dynamic data layer population.

**Maintained by [Ruskin Consulting](https://ruskinconsulting.com).** Need help with Google Tag Manager or Analytics? [Get in touch.](https://ruskinconsulting.com)

Installation
----------------------

1. Unzip and upload the "metronet-tag-manager" folder to your `/wp-content/plugins/` directory.
2. Activate the plugin through the **Plugins** menu in WordPress.
3. Ensure your theme calls `<?php wp_body_open(); ?>` just after the opening `<body>` tag.
4. Go to **Settings → Metronet Tag Manager** and paste your Google Tag Manager snippet(s).
5. Configure dataLayer variables, Consent Mode, and conditional loading as needed.

FAQ
-----------------------

### What is Google Tag Manager?

Please refer to the <a href="https://support.google.com/tagmanager/answer/6103696">Google Tag Manager FAQ</a>.

### What are dataLayer variables?

Please refer to the <a href="https://developers.google.com/tag-manager/reference">Google Tag Manager API</a> reference.

### What are dataLayer variables used for?

The data layer is a JavaScript object that contains information you want to pass to Google Tag Manager. By setting up rules in GTM, these variables control which tags fire — for example, tracking a button click or identifying a page category.

### What built-in placeholders are available?

| Placeholder | Description |
|---|---|
| `%post_title%` | Post or page title |
| `%author_name%` | Author display name |
| `%wordcount%` | Word count of post content |
| `%logged_in%` | `true` or `false` |
| `%page_id%` | Queried object ID |
| `%post_id%` | Numeric post ID |
| `%post_date%` | Post publication date |
| `%post_type%` | Post type slug |
| `%category%` | Primary category slug |
| `%tags%` | Comma-separated tag slugs |
| `%permalink%` | Canonical URL |
| `%language%` | Site locale (e.g. `en_US`) |

### What is Google Consent Mode v2?

Google Consent Mode v2 is required for EU sites using GTM with Google Ads or Analytics. Enable it under **Settings → Metronet Tag Manager → Consent Mode** to output default consent states before the GTM snippet fires.

### How do I exclude admins from tracking?

Under **Other Options**, check **Exclude logged-in users by role** and select which roles to exclude.

### How do I migrate settings between sites?

Use **Export Settings** to download a JSON file, then **Import Settings** on the target site.

Filtering Variables
-----------------------

If you choose to place variable values inside percentage signs (e.g., `%replace_test%`), you can filter them dynamically.

```php
add_filter( 'gtm_replace_test', 'gtm_replace_test', 10, 3 );
function gtm_replace_test( $total_match, $match, $post_id ) {
    return 'replaced with content';
}
```

The filter name is `gtm_` followed by the text between the `%` signs. Each callback receives `( $total_match, $match, $post_id )`.

Here is an example outputting post categories using the placeholder `%post_category%`. Place the code in your theme's `functions.php` or a site-specific plugin:

```php
add_filter( 'gtm_post_category', 'gtm_populate_category_items', 10, 3 );
function gtm_populate_category_items( $total_match, $match, $post_id ) {
    $terms = wp_get_object_terms( $post_id, 'category', array( 'fields' => 'slugs' ) );
    if ( is_wp_error( $terms ) || empty( $terms ) ) {
        return '';
    }
    return $terms;
}
```

What's New in 1.6.0
-----------------------

**Bug Fixes**
- Corrected Plugin URI (was incorrectly pointing to `metronet-profile-picture`) — Issue #10
- GTM snippets now output on the WordPress login page when enabled — Issue #9
- Fixed `%category%` placeholder storage — `sanitize_text_field()` was stripping `%` signs — Issue #2
- Wired up REST permission callback in Gutenberg class — Issue #21
- `uninstall.php` now uses `$wpdb->prepare()` for safe SQL

**New Features**
- Additional built-in placeholders: `%category%`, `%tags%`, `%post_id%`, `%permalink%`, `%language%`
- Google Consent Mode v2 support with configurable default consent states
- Settings Import / Export as JSON
- Conditional tag loading by user role or device type
- GTM output on the WordPress login page
- Gutenberg dataLayer Push block (`metronettagmanager/datalayer-push`)

**Maintenance**
- All Dependabot-flagged JS/CSS dependencies updated
- WPCS 3.0 compliance throughout

---

*Maintained by [Ruskin Consulting](https://ruskinconsulting.com) — need help with Google Tag Manager or analytics? [Reach out to us.](https://ruskinconsulting.com)*

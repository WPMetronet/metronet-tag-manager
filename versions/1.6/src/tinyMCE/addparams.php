<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Metronet Tag Manager</title>
	<?php
	//Register Scripts
	wp_register_script( 'tiny_mce_popup', includes_url( '/js/tinymce/tiny_mce_popup.js' ), array( 'jquery-ui-core', 'jquery-ui-dialog' ) );
	wp_register_script( 'MTM_tiny_mce', plugins_url( 'addparams.js', __FILE__ ), array( 'tiny_mce_popup' ), 'v2' );
	
	//Register Styles
	wp_register_style( 'jquery-ui', plugins_url( '/css/jquery-ui.css', __FILE__ ) );
	wp_register_style( 'MTM_tiny_mce', plugins_url( '/css/style.css', __FILE__ ), array( 'jquery-ui' ) );
	
	wp_print_scripts( array( 'MTM_tiny_mce' ) );
	wp_print_styles( array( 'MTM_tiny_mce' ) ); ?>
</head>
<body>
	<form name="source" onsubmit="return AddParams.insert();" action="#" id="data">

		<div class="row">
			<p><?php esc_html_e( 'Description', 'metronet-tag-manager' ); ?></p>
		</div>

		<div class="row">
			<input type="text" id="desc" name="desc" class="fullwidth">
		<div>

		<div class="row">
			<p><?php esc_html_e( 'Title', 'metronet-tag-manager' ); ?></p>
		</div>

		<div class="row">
			<input type="text" id="title" name="title" class="fullwidth">
		<div>

		<div class="row">
			<p><?php esc_html_e( 'URL', 'metronet-tag-manager' ); ?></p>
		</div>

		<div class="row">
			<input type="text" id="url" name="url" class="fullwidth">
			
		</div>

		<div class="row">
			<p><?php esc_html_e( 'Id', 'metronet-tag-manager' ); ?></p>
			<p><?php esc_html_e( 'Class', 'metronet-tag-manager' ); ?></p>
		</div>

		<div class="row">
			<input type="text" id="id" name="id">
			<input type="text" id="class" name="class">
		</div>

		<div class="row">
			<p><?php esc_html_e( 'Target', 'metronet-tag-manager' ); ?></p>
		</div>

		<div class="row">
			<input type="checkbox" id="target" name="target">
			<small><?php esc_html_e( 'Open in new tab/window', 'metronet-tag-manager' ); ?></small>
		</div>

		<div class="row">
			<strong><?php esc_html_e( 'Data Layers', 'metronet-tag-manager' ); ?></strong>
		</div>

		<div id="dataLayers">
			<div class="row">
				<p><?php esc_html_e( 'Parameter', 'metronet-tag-manager' ); ?></p>
				<p><?php esc_html_e( 'Value', 'metronet-tag-manager' ); ?></p>
			</div>

			<div class="row">
				<input type="text" id="param1" name="param1">
				<input type="text" id="value1" name="value1">
			</div>
		</div>

		<input type="button" value="<?php esc_attr_e( 'Add', 'metronet-tag-manager' ); ?>" id="apply">

		<div class="mceActionPanel">
			<input type="submit" name="insert" value="<?php esc_attr_e( 'Save', 'metronet-tag-manager' ); ?>" id="insert" />
			<input type="button" name="cancel" value="<?php esc_attr_e( 'Cancel', 'metronet-tag-manager' ); ?>" onclick="tinymce.activeEditor.windowManager.close();" id="cancel" />
		</div>
	</form>
</body> 
</html>
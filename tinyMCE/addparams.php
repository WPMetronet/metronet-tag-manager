<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Metronet Google Tag Manager</title>
	<?php
	//Register Scripts
	wp_register_script( 'tiny_mce_popup', includes_url( '/js/tinymce/tiny_mce_popup.js' ), array( 'jquery-ui-core', 'jquery-ui-dialog' ) );
	wp_register_script( 'MTM_tiny_mce', plugins_url( 'addparams.js', __FILE__ ), array( 'tiny_mce_popup' ), '20120718' );
	
	//Register Styles
	wp_register_style( 'jquery-ui', plugins_url( '/css/jquery-ui.css', __FILE__ ) );
	wp_register_style( 'MTM_tiny_mce', plugins_url( '/css/style.css', __FILE__ ), array( 'jquery-ui' ) );
	
	wp_print_scripts( array( 'MTM_tiny_mce' ) );
	wp_print_styles( array( 'MTM_tiny_mce' ) ); ?>
</head>
<body>
	<form name="source" onsubmit="return AddParams.insert();" action="#" id="data">

		<div class="row">
			<p>Description</p>
		</div>

		<div class="row">
			<input type="text" id="desc" name="desc" class="fullwidth">
		<div>

		<div class="row">
			<p>Title</p>
		</div>

		<div class="row">
			<input type="text" id="title" name="title" class="fullwidth">
		<div>

		<div class="row">
			<p>URL</p>
		</div>

		<div class="row">
			<input type="text" id="url" name="url" class="fullwidth">
			
		</div>

		<div class="row">
			<p>Id</p>
			<p>Class</p>
		</div>

		<div class="row">
			<input type="text" id="id" name="id">
			<input type="text" id="class" name="class">
		</div>

		<div class="row">
			<p>Target</p>
		</div>

		<div class="row">
			<input type="checkbox" id="target" name="target">
			<small>Open in new tab/window</small>
		</div>

		<div class="row">
			<strong>Data Layers</strong>
		</div>

		<div id="dataLayers">
			<div class="row">
				<p>Parameter</p>
				<p>Value</p>
			</div>

			<div class="row">
				<input type="text" id="param1" name="param1">
				<input type="text" id="value1" name="value1">
			</div>
		</div>

		<input type="button" value="Add" id="apply">

		<div class="mceActionPanel">
			<input type="submit" name="insert" value="Save" id="insert" />
			<input type="button" name="cancel" value="Cancel" onclick="tinyMCEPopup.close();" id="cancel" />
		</div>
	</form>
</body> 
</html>
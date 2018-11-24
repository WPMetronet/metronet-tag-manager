/**
 * Metronet Tag Manager Plugin
 */

(function() {
	tinymce.PluginManager.add('metro_gtm', function(editor, url) {
		editor.addButton( 'metro_gtm', {
			title: 'Metronet Tag Manager',
			image: url + '/img/metro_gtm.png',

			// Call form
			onclick: function() {
				editor.windowManager.open({
					title: 'Metronet Tag Manager',
					url: ajaxurl + '?action=mtm_addparams',
					width: 400,
					height: 600,
				});
			},

			//Prevent javacript onclick to be executed when select a A node
			onPostRender: function() {
				var ctrl = this;
				editor.on('NodeChange', function(e) {
					if(e.element.nodeName == 'A') {
						e.element.onclick = false;
					}
				});
			}
		});

	});


})();
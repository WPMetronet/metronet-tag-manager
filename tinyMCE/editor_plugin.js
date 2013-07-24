/**
 * Metro GTM Plugin
 */

(function($) {
	tinymce.create('tinymce.plugins.Metro_GTM', {
		init : function(ed, url) {

			// Register metro_gtm button
			ed.addButton('metro_gtm', {
				title : 'Metro Google Tag Manager',
				cmd : 'mceMetro_GTM',
				image : url + '/img/metro_gtm.png'
			});

			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
			ed.addCommand('mceMetro_GTM', function() {
				ed.windowManager.open({
					file : ajaxurl + '?action=mtm_addparams',
					width : 320,
					height : 500,
					inline : 1
				});
			});

			// Declare dataLayer array within content_ifr iFrame to capture onclick event
			ed.onPostRender.add(function(ed, cm) {
				if ( typeof( content_ifr ) != "undefined" ) {
					content_ifr['dataLayer'] = [];
				}
			});
		},

		getInfo : function() {
			return {
				longname : 'Metro GTM',
				author : 'Metronet, Marco Pereirinha, Ronald Huereca',
				authorurl : 'http://www.metronet.no',
				infourl : 'http://www.metronet.no',
				version : '0.1'
			};
		},
	});

	// Register plugin
	tinymce.PluginManager.add('metro_gtm', tinymce.plugins.Metro_GTM);
})(jQuery);
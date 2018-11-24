var AddParams;

(function($){
	var i=1;

	AddParams = {
		init : function() {
			var selection = tinymce.activeEditor.selection;

			if( selection.getNode().nodeName == 'A' ){
				var link = selection.getNode(),
					i = 1,
					dataLayers = {};
				
				if( $(link).attr('onclick') != undefined)
					dataLayers = $.parseJSON( $(link).attr('onclick').replace('dataLayer.push(','').replace(');','').replace(/'/g, '"') );

				if ( link.text )
					$('#desc').val( link.text );

				if ( link.href ) 
					$('#url').val( link.href );

				if ( link.title )
					$('#title').val( link.title );

				if ( link.id )
					$('#id').val( link.id );

				if ( link.className )
					$('#class').val( link.className );

				if ( link.target )
					$('#target').prop("checked", true);

				if ( ! $.isEmptyObject( dataLayers ) ) {
					$.each( dataLayers, function(index, value){
						if( $('#param'+i).length == 0 ){
							AddParamToDom(i);
						}
						$('#param'+i).val( index );
						$('#value'+i).val( value );
						i++;
					});
				}

			}

			if ( $('#desc').val().length == 0 && selection.getContent() )
				$('#desc').val( selection.getContent() );
		},

		insert : function(){
			var desc = $('#desc').val()
				, title = $('#title').val()
				, url = $('#url').val()
				, id = $('#id').val()
				, tclass= $('#class').val()
				, target = $('#target').is(':checked')
				, $params = $('[id^=param]')
				, $values = $('[id^=value]')
				, params = []
				, values = []
				, dataLayer = {}
				, node = tinymce.activeEditor.selection.getNode()
				, result = ' <a';

			if( url.length > 0 )
				result += ' href="' + url + '"';

			if( title.length > 0 )
				result += ' title="' + title + '"';

			if( id.length > 0 )
				result += ' id="' + id + '"';

			if( tclass.length > 0 )
				result += ' class="' + tclass + '"';

			if( target )
				result += ' target="_blank"';
			
			$.each($params, function() {
				if( $(this).val().length > 0 )
					params.push( $(this).val() );
			});

			$.each($values, function() {
				values.push( $(this).val() );
			});

			if( params.length > 0 ){
				for (var i = 0; i < params.length; i++)
					dataLayer[params[i]] = values[i];
				
				result += ' onclick="dataLayer.push(' + JSON.stringify( dataLayer ).replace(/'/g,'').replace(/\"/g,"'") + ');"';
			}

			result += '>';

			if( desc.length > 0 )
				result += desc;
				
			result += '</a> ';

			if( node.nodeName == 'A' ){
				$( node ).remove();
			}

			tinymce.activeEditor.insertContent( result );
			tinymce.activeEditor.windowManager.close();
		}
	};

	$(document).ready( function() {
		AddParams.init();

		$('#apply').on('click', function() {
			i++;
			AddParamToDom(i);
		});

		$('.remParam').on('click', function() { 
			ConfirmDialog('Are you sure that you want to delete this parameter', $(this) );
		});

	});

	function ConfirmDialog(message, parameter){
		$('<div></div>').appendTo('body')
			.html('<div><h6>'+message+'?</h6></div>')
				.dialog({
					modal: true,
					title: 'Delete parameter',
					zIndex: 10,
					autoOpen: true,
					width: 300, resizable: false,
					buttons: {
						Yes: function () {
							parameter.parent('.row').remove();
							i--;

							$(this).dialog("close");
						},
						No: function () {
							$(this).dialog("close");
						}
					},
					close: function (event, ui) {
						$(this).remove();
					}
				});
	};

	function AddParamToDom(i){
		$('<div class="row"><input type="text" id="param'+i+'" name="param'+i+'"> <input type="text" id="value'+i+'" name="value'+i+'"><span class="remParam" title="Remove Parameter"> - </span></div>').appendTo('#dataLayers');
	}

}(jQuery));
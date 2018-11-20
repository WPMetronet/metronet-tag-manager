const { PanelBody, PanelRow } = wp.components;
const { __, _x } = wp.i18n;
const {registerFormatType, insertObject } = wp.richText;
const { Fragment, Component } = wp.element;
const {
	InspectorControls,
	BlockControls,
	MediaUpload,
	RichText,
	AlignmentToolbar,
	PanelColorSettings,
} = wp.editor;

wp.richText.registerFormatType( 'mtm/link', {
	title: __( 'Datalayer Link', 'metronet-tag-manager' ),
	tagName: 'a',
	attributes: {
		url: 'href',
	},
	className: 'mtm-dl-link',
	edit: function( props ) {
		return (
			<InspectorControls>
				<PanelBody title={ __( 'Datalayer', 'metronet-tag-manager' ) } initialOpen={ false }>
					<PanelRow>
						<label>{__( 'URL', 'metronet-tag-manager' )}<br /><input type="text" /></label>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
		)
	}
} );
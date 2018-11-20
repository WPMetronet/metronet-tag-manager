
const { ToolbarButton, Toolbar } = wp.components;
const { __, _x } = wp.i18n;
const {registerFormatType, insertObject } = wp.richText;
const { Fragment } = wp.element;
export default registerFormatType( 'mtmdl/insert', {
	selector: 'a',
	title: __('DataLayer', 'metronet-tag-manager'),
	tagName: 'a',
	className: 'mtmdl',
	edit( { isActive } ) {
		return (
			<ToolbarButton
				icon="editor-bold"
				title={ __( 'DataLayer' ) }
			/>
		);
	},
	save() {
		return null;
	}
} );
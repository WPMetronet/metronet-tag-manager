const { registerBlockType } = wp.blocks;
const { __, _x } = wp.i18n;
import paragraph from './paragraph.js';
registerBlockType( 'mtmdl/paragraph', {
	title: __( 'DataLayer Paragraph', 'metronet-tag-manager' ), // Block title.
	icon: 'admin-links',
	category: 'common',
	edit: paragraph,
	save: () => {
		return (
			null
		);
	}
} );
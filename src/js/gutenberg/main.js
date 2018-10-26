/**
 * BLOCK: Basic with ESNext
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 *
 * Using inline styles - no external stylesheet needed.  Not recommended!
 * because all of these styles will appear in `post_content`.
 */

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { InnerBlocks } = wp.editor;

// Import CSS
//import './styles/style.scss';
//import './styles/editor.scss';

// Import JS
import 'idempotent-babel-polyfill';
import link from './link';

// Extend component
const { Component } = wp.element;

// Register alignments
const validAlignments = [ 'center', 'wide' ];

export const name = 'mtmdl/link';

/**
 * Register Basic Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made available as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'mtmdl/link', { // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'DataLayer Link', 'metronet-tag-manager' ), // Block title.
	icon: 'admin-links',
	category: 'common',
	parent: ['core/paragraph'],
	edit: (className) => {
		return(
			<div className={ className }>
				<InnerBlocks />
			</div>
		)
	}
	,
	save: () => {
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	}
} );
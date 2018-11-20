const { ToolbarButton, Toolbar, Popover } = wp.components;
const { __, _x } = wp.i18n;
const {registerFormatType, insertObject } = wp.richText;
const { Fragment, Component } = wp.element;
import ReactDOM from 'react-dom';


export default class MTMDLInput extends Component {
	constructor( props ) {
		super( ...props );

		this.state = {
			active: false
		};
	}
	handleOnClick = () => {
		if ( this.state.active ) {
			this.setState(
				{
					active: false
				}
			);
		} else {
			this.setState(
				{
					active: true
				}
			);
		}
	}
	registerFormat = () => {
		let ref = this;
		wp.richText.registerFormatType( 'mtm/link', {
			title: 'Datalayer Link',
			tagName: 'a',
			attributes: {
				url: 'href',
			},
			active: false,
			className: 'mtm-dl-link',
			edit: function( props ) {
				return wp.element.createElement( wp.editor.RichTextToolbarButton, {
					icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>,
					title: 'Datalayer Link',
					onClick: function() {
						ref.handleOnClick();
					},
					isActive: props.isActive,
				} )
			},
		} );
	}
	render() {
		this.registerFormat();
		return (
			<Fragment>
				<Popover>
					<div className="editor-url-input">
						<input
							type="text"
							aria-label={ __( 'URL' ) }
							required
							onChange={ this.onChange }
							placeholder={ __( 'Paste URL' ) }
							role="combobox"
						/>
					</div>
				</Popover>
			</Fragment>
		);
	}
}
ReactDOM.render(<MTMDLInput />, document.getElementById('editor') );
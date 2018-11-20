const { PanelBody, PanelRow, TextControl, Popover, Button } = wp.components;
const { __, _x } = wp.i18n;
const {registerFormatType, getActiveFormat, applyFormat, toggleFormat } = window.wp.richText;
const { Fragment, Component } = wp.element;
const {
	InspectorControls,
	BlockControls,
	MediaUpload,
	RichText,
	AlignmentToolbar,
	PanelColorSettings,
	RichTextToolbarButton,
} = window.wp.editor;
registerFormatType( 'mtm/link', {
	title: __( 'Datalayer Link', 'metronet-tag-manager' ),
	tagName: 'a',
	attributes: {
		url: 'href',
		title: 'title'
	},
	className: 'mtm-dl-link',
	edit: class MTMDLEdit extends Component {
		constructor( props ) {
			super( ...props );
			this.state = {
				modal: false,
				url: (undefined == props.activeAttributes.url) ? '' : props.activeAttributes.url,
				title: '',
				is_active: props.isActive,
			};
		}
		onClick = (e) => {
			console.log(e);
			console.log(this.props);
			if( this.props.value.start == this.props.value.end ) {
				this.setState(
					{
						modal: false
					}
				);
				return;
			}
			if ( this.state.modal == false ) {
				this.setState(
					{
						modal: true
					}
				);
			} else {
				this.setState(
					{
						modal: false
					}
				);
			}
		}
		onURLChange = (text) => {
			this.props.activeAttributes.url = text;
			this.setState(
				{
					url: text
				}
			);
		}
		onTitleChange = (text) => {
			this.props.activeAttributes.title = text;
			this.setState(
				{
					title: text
				}
			);
		}
		onCancel = () => {
			this.setState( { modal: false } );
		}
		onSave = () => {
			this.setState( { modal: false } );
			console.log(this.props);
			applyFormat( 
				this.props.value, 
				{
					type: 'mtm/link',
					attributes: {
						url: this.state.url,
						title: this.state.title
					}
				},
				this.props.value.start,
				this.props.value.end
			); 
		}
		render() {
			let {
				activeAttributes
			} = this.props;
			return (
				<Fragment>
					<RichTextToolbarButton
						icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>}
						title={__('Datalayer Link', 'metronet-tag-manager')}
						onClick={this.onClick}
					/>
					{this.state.modal && this.props.value.start != this.props.value.end &&
						<Fragment>
							<Popover position="bottom" noArrow>
								<div className="mtm-datalayer-input">
									<h2>{__('Datalayer Variables', 'metronet-tag-manager')}</h2>
									<TextControl
										label={__('Selected Text', 'metronet-tag-manager')}
										value={ this.props.value.text.slice( this.props.value.start, this.props.value.end ) } 
									/>
									<TextControl
										label={__('Enter Title', 'metronet-tag-manager')}
										value={this.state.title} 
										onChange={ (text) => this.onTitleChange(text) }
									/>
									<TextControl
										label={__('Enter URL', 'metronet-tag-manager')}
										value={ this.state.url } 
										onChange={ (text) => this.onURLChange(text) }
									/>
									<Button isPrimary={false} isSmall={true} onClick={this.onCancel}>
										{__('Cancel', 'metronet-tag-manager')}
									</Button>
									<Button className="alignright" isPrimary={true} isSmall={true} onClick={this.onSave}>
										{__('Save', 'metronet-tag-manager')}
									</Button>
								</div>
							</Popover>
						</Fragment>
					}
				</Fragment>
			)
		}
	}
} );
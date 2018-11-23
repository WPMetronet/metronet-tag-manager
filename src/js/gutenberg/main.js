const { PanelBody, PanelRow, TextControl, Popover, Button, withSpokenMessages } = wp.components;
const { __, _x } = wp.i18n;
const {registerFormatType, getActiveFormat, applyFormat, toggleFormat, removeFormat } = window.wp.richText;
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
	edit: withSpokenMessages( class MTMDLEdit extends Component {
		constructor() {
			super( ...arguments );
			this.state = {
				modal: false,
				url: '',
				title: '',
			};
		}
		onClick = () => {
			if ( this.props.isActive ) {
				this.props.onChange( removeFormat( 
					this.props.value, 
					'mtm/link'
				) );
				return;
			}
			if( this.props.value.start == this.props.value.end && !this.props.isActive) {
				this.setState(
					{
						modal: false
					}
				);
				return;
			}
			let url = '';
			let title = '';
			if ( this.state.modal == false || this.props.isActive ) {
				let format = getActiveFormat(this.props.value, 'mtm/link');
				if ( undefined != format ) {
					url = format.attributes.url;
					title = format.attributes.title;
				}
				this.setState(
					{
						modal: true,
						url: url,
						title: title
					}
				);
			} else {
				this.setState(
					{
						modal: false,
						url: url,
						title: title
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
			this.props.onChange( applyFormat( 
				this.props.value, 
				{
					type: 'mtm/link',
					attributes: {
						url: this.state.url,
						title: this.state.title
					}
				}
			) ); 
		}
		onEdit = () => {
			this.props.onChange( applyFormat( 
				this.props.value, 
				{
					type: 'mtm/link',
					attributes: {
						url: this.state.url,
						title: this.state.title
					}
				}
			) ); 
		}
		onRemove = () => {
			this.props.onChange( removeFormat( 
				this.props.value, 
				'mtm/link'
			) );
			this.setState( { modal: false } );
			return;
		}
		render() {
			let isActive = this.props.isActive;
			let format = getActiveFormat(this.props.value, 'mtm/link');
			let renderModal = false;
			if ( ( this.state.modal && this.props.value.start != this.props.value.end ) || ( isActive && undefined !== format ) ) {
				renderModal = true;
			} else {
				renderModal = false;
			}
			return (
				<Fragment>
					{false === this.props.isActive &&
						<RichTextToolbarButton
							icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>}
							title={__('Datalayer Link', 'metronet-tag-manager')}
							onClick={this.onClick}
						/>
					}
					{true === this.props.isActive &&
						<RichTextToolbarButton
							icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" style={{backgroundColor: '#555d66', color: '#FFFFFF'}} viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>}
							title={__('Datalayer Link', 'metronet-tag-manager')}
							onClick={this.onClick}
						/>
					}
					{renderModal &&
						<Fragment>
							<Popover position="bottom" noArrow>
								<div className="mtm-datalayer-input">
									<h2>{__('Datalayer Variables', 'metronet-tag-manager')}</h2>
									<TextControl
										label={__('Enter Title', 'metronet-tag-manager')}
										value={undefined !== format ? format.attributes.title : this.state.title} 
										onChange={ (text) => this.onTitleChange(text) }
									/>
									<TextControl
										label={__('Enter URL', 'metronet-tag-manager')}
										value={ undefined !== format ? format.attributes.url : this.state.url } 
										onChange={ (text) => this.onURLChange(text) }
									/>
									{!isActive &&
									<Fragment>
										<Button isPrimary={false} isSmall={true} onClick={this.onCancel}>
											{__('Cancel', 'metronet-tag-manager')}
										</Button>
										<Button className="alignright" isPrimary={true} isSmall={true} onClick={this.onSave}>
											{__('Save', 'metronet-tag-manager')}
										</Button>
									</Fragment>
									}
									{isActive &&
									<Fragment>
										<Button isPrimary={false} isSmall={true} onClick={this.onRemove}>
											{__('Remove', 'metronet-tag-manager')}
										</Button>
										<Button className="alignright" isPrimary={true} isSmall={true} onClick={this.onEdit}>
											{__('Edit', 'metronet-tag-manager')}
										</Button>
									</Fragment>
									}
								</div>
							</Popover>
						</Fragment>
					}
				</Fragment>
			)
		}
	} )
} );
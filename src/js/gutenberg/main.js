const { PanelBody, PanelRow, TextControl, Popover, Button, CheckboxControl, withSpokenMessages } = wp.components;
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
		title: 'title',
		id: 'id',
		class: 'class',
		target: 'target',
		onclick: 'onclick',
		data_param: 'data-param',
		data_value: 'data-value'
	},
	className: 'mtm-dl-link',
	edit: withSpokenMessages( class MTMDLEdit extends Component {
		constructor() {
			super( ...arguments );
			this.state = {
				modal: false,
				url: '',
				title: '',
				id: '',
				classname: '',
				target: '',
				dlparameter: '',
				dlvalue: '',
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
			let id = '';
			let classname = '';
			let dlparameter = '';
			let dlvalue = '';
			if ( this.state.modal == false || this.props.isActive ) {
				let format = getActiveFormat(this.props.value, 'mtm/link');
				if ( undefined != format ) {
					url = format.attributes.url;
					title = format.attributes.title;
					id = format.attributes.id;
					classname = format.attributes.class;
					dlparameter = format.attributes.data_param;
					dlvalue = format.attributes.data_value;
				}
				this.setState(
					{
						modal: true,
						url: url,
						title: title,
						id: id,
						classname: classname,
						dlparameter: dlparameter,
						dlvalue: dlvalue
					}
				);
			} else {
				this.setState(
					{
						modal: false,
						url: url,
						title: title,
						id: id,
						classname: classname,
						dlparameter: dlparameter,
						dlvalue: dlvalue,
					}
				);
			}
		}
		onURLChange = (text) => {
			this.setState(
				{
					url: text
				}
			);
		}
		onTitleChange = (text) => {
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
						title: this.state.title,
						id: this.state.id,
						class: this.state.classname,
						target: 'none' == this.state.target ? '' : this.state.target,
						data_param: this.state.dlparameter,
						data_value: this.state.dlvalue,
						onclick: `dataLayer.push({'${this.state.dlparameter}':'${this.state.dlvalue}'})`
					}
				}
			) ); 
		}
		onIDChange = ( text ) => {
			this.setState(
				{
					id: text
				}
			);
		}
		onClassChange = ( text ) => {
			this.setState(
				{
					classname: text
				}
			);
		}
		onTargetChange = ( checked ) => {
			if( checked ) {
				this.setState(
					{
						target: '_blank'
					}
				);
			} else {
				this.setState(
					{
						target: 'none'
					}
				);
			}
		}
		onDLParameterChange = ( text ) => {
			this.setState(
				{
					dlparameter: text
				}
			);
		}
		onDLValueChange = ( text ) => {
			this.setState( 
				{
					dlvalue: text
				}
			)
		}
		onEdit = () => {
			let format = getActiveFormat(this.props.value, 'mtm/link');
			if ( undefined !== format ) {
				let url = (format.attributes.url != this.state.url && '' == this.state.url) ? format.attributes.url : this.state.url;
				let title = (format.attributes.title != this.state.title && '' == this.state.title) ? format.attributes.title : this.state.title;
				let classname =(format.attributes.class != this.state.classname && '' == this.state.classname ) ? format.attributes.class : this.state.classname;
				let id = (format.attributes.id != this.state.id && '' == this.state.id ) ? format.attributes.id : this.state.id;
				let target =  (format.attributes.target != this.state.target && '' == this.state.target ) ? format.attributes.target : this.state.target;
				let dlparameter = (format.attributes.data_param != this.state.dlparameter && '' == this.state.dlparameter ) ? format.attributes.data_param : this.state.dlparameter;
				let dlvalue = (format.attributes.data_value != this.state.dlvalue && '' == this.state.dlvalue ) ? format.attributes.data_value : this.state.dlvalue;
				this.setState = ( 
					{
					url: url,
					title: title,
					classname: classname,
					id: id,
					target: target,
					dlparameter: dlparameter,
					dlvalue: dlvalue,
					},
					this.props.onChange( applyFormat( 
						this.props.value, 
						{
							type: 'mtm/link',
							attributes: {
								url: url,
								title: title,
								id: id,
								class: classname,
								target: 'none' == target ? '' : target,
								data_value: dlvalue,
								data_param: dlparameter,
								onclick: `dataLayer.push({'${dlparameter}':'${dlvalue}'})`
							}
						}
					) ) 
				);
			} 
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
			let url = '';
			let title = '';
			let classname = '';
			let id = '';
			let target = '';
			let dlvalue = '';
			let dlparameter = '';
			if( undefined !== format && this.props.isActive ) {
				url = (format.attributes.url != this.state.url && '' == this.state.url) ? format.attributes.url : this.state.url;
				title = (format.attributes.title != this.state.title && '' == this.state.title) ? format.attributes.title : this.state.title;
				classname = (format.attributes.class != this.state.classname && '' == this.state.classname ) ? format.attributes.class : this.state.classname;
				id = (format.attributes.id != this.state.id && '' == this.state.id ) ? format.attributes.id : this.state.id;
				target = (format.attributes.target != this.state.target && '' == this.state.target ) ? format.attributes.target : this.state.target;
				dlvalue = (format.attributes.data_value != this.state.dlvalue && '' == this.state.dlvalue ) ? format.attributes.data_value : this.state.dlvalue;
				dlparameter = (format.attributes.data_param != this.state.dlparameter && '' == this.state.dlparameter ) ? format.attributes.data_param : this.state.dlparameter;
			} else {
				url = this.state.url;
				title = this.state.title;
				id = this.state.id;
				classname = this.state.classname;
				target = this.state.target;
				dlvalue = this.state.dlvalue;
				dlparameter = this.state.dlparameter;
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
										value={title} 
										onChange={ (text) => this.onTitleChange(text) }
									/>
									<TextControl
										label={__('Enter URL', 'metronet-tag-manager')}
										value={url} 
										onChange={ (text) => this.onURLChange(text) }
									/>
									<TextControl
										label={__('Enter ID', 'metronet-tag-manager')}
										value={id} 
										onChange={ (text) => this.onIDChange(text) }
									/>
									<TextControl
										label={__('Enter Class Name', 'metronet-tag-manager')}
										value={classname} 
										onChange={ (text) => this.onClassChange(text) }
									/>
									<CheckboxControl
										label={__('Open in new window', 'metronet-tag-manager')}
										checked={target == '_blank' ? true : false}
										onChange={(checked) => this.onTargetChange(checked) }
									/>
									<TextControl
										label={__('Datalayer Parameter', 'metronet-tag-manager')}
										value={dlparameter} 
										onChange={ (text) => this.onDLParameterChange(text) }
									/>
									<TextControl
										label={__('Datalayer Value', 'metronet-tag-manager')}
										value={dlvalue} 
										onChange={ (text) => this.onDLValueChange(text) }
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
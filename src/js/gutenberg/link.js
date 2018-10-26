/**
 * External dependencies
 */

import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import {lowerCase} from 'lodash/lowerCase';
import pickBy from 'lodash/pickBy';
import moment from 'moment';
import classnames from 'classnames';
import { stringify } from 'querystringify';
import axios from 'axios';
const { Component, Fragment } = wp.element;

const { __, _e } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const { apiFetch } = wp;

const {
	registerStore,
} = wp.data;

const {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	SelectControl,
	Spinner,
	TextControl,
	ToggleControl,
	Toolbar,
	withAPIData,
	ColorPalette,
} = wp.components;

const {
	InspectorControls,
	BlockAlignmentToolbar,
	BlockControls,
} = wp.editor;


class MTM_Gutenberg extends Component {
	constructor() {
		super( ...arguments );

		this.state = {
		
		};
	}
	render() {
		const { attributes, setAttributes } = this.props;
		
		return(
			<Fragment>
				<Placeholder>
					{__('Hello world', 'metronet-tag-manager')}
				</Placeholder>
			</Fragment>
		)
	}
}

export default MTM_Gutenberg;
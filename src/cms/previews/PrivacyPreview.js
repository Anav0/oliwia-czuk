import React from 'react'
import PropTypes from 'prop-types'
import { PrivacyTemplate } from 'src/pages/privacy'

const PrivacyPreview = ({ entry, widgetFor }) => (
    <PrivacyTemplate
        title={entry.getIn(['data', 'title'])}
        content={widgetFor('body')}
    />
)

PrivacyPreview.propTypes = {
    entry: PropTypes.shape({
        getIn: PropTypes.func,
    }),
    widgetFor: PropTypes.func,
}

export default PrivacyPreview
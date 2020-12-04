import React, { Component, cloneElement, Children } from 'react';
import PropTypes from 'prop-types'

class SampReact extends Component {

    displayName: 'SampReact'

    componentWillUnmount() {
        if (this.connector) {
            try {
                this.connector.detach();
            } catch (err) {
                throw new Error('Internal connector error', err);
            }
        }
    }

    componentDidMount() {
        this.updateSamp(this.props);
    }

    componentDidUpdate() {
        this.updateSamp(this.props);
    }

    updateSamp(config) {
        let samp = require('./samp.js');

        let { type, data } = config;
        let options = config.options || {};
        let responsiveOptions = config.responsiveOptions || [];
        let event;

        if (this.connector) {
            this.connector.update(data, options, responsiveOptions);
        } else {
            this.connector = new window.samp.Connector("pinger", {"samp.name": "Pinger"})

            if (config.listener) {
                for (event in config.listener) {
                    if (config.listener.hasOwnProperty(event)) {
                        this.connector.on(event, config.listener[event]);
                    }
                }
            }
        }

        return this.connector;
    }

    render() {
        const { className, style, children, data, type } = this.props;
        const childrenWithProps = children && Children.map(children, (child) => (
                cloneElement(child, {
                    type,
                    data
                })
            ));
        return (
            <div className={`ct-chart ${className || ''}`} ref={(ref) => this.chart = ref} style={style}>
                {childrenWithProps}
            </div>
        )
    }
}

SampReact.propTypes = {
    type: PropTypes.oneOf(['Line', 'Bar', 'Pie']).isRequired,
    data: PropTypes.object.isRequired,
    className: PropTypes.string,
    options: PropTypes.object,
    responsiveOptions: PropTypes.array,
    style: PropTypes.object
}

export default SampReact;
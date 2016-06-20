import React, { PropTypes } from 'react';
import { BaseComponent } from 'BaseComponent';
import { Watch } from './Watch';
import { time, milliseconds } from 'helpers';
import { padLeftWithZero } from './localHelpers';

export class CountdownWatch extends BaseComponent {
    render() {
        return <Watch time={this.getRemainingTime()} lightTheme={this.props.lightTheme} />;
    }
    
    getRemainingTime() {
        return this.props.totalTime - this.props.currentTime;
    }
}

CountdownWatch.propTypes = {
    currentTime: PropTypes.number,
    totalTime: PropTypes.number,
    lightTheme: PropTypes.bool
};

CountdownWatch.defaultProps = {
    currentTime: 0,
    totalTime: 0
};
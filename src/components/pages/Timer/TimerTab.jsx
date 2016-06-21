import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    FlexBox, FlexItem, Tab, TabContent,
    CommandBar, CommandBarItem, 
    CountdownTimer
} from 'components/common';
import { TimerTabCommandBar } from './TimerTabCommandBar';
import { milliseconds } from 'helpers';
import { enableBackButton, disableBackButton, setBackButtonCallback } from 'components/common';
import { removeTimer } from './actions';

class TimerTabComponent extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isEditionModeEnabled: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.timers.length === 0 && this.state.isEditionModeEnabled) {
            this.setState({ isEditionModeEnabled: false });
        }
    }

    render() {
        const timers = this.renderCountdownTimers();

        return (
            <Tab>
                <TabContent>
                    <FlexBox wrap justify='center'>
                        {timers.length ? timers : <p>Click + add a timer</p>}
                    </FlexBox>
                </TabContent>
                <TimerTabCommandBar 
                    isEditionModeEnabled={this.state.isEditionModeEnabled}
                    hideEditButton={timers.length === 0}
                    onClickEdit={this.enableEdition.bind(this)}
                    onClickDone={this.disableEdition.bind(this)} 
                />
            </Tab>
        );
    }

    renderCountdownTimers() {
        return this.props.timers.map(timer => {
            const { id, name, hours, minutes, seconds } = timer;

            return <CountdownTimer 
                        key={id} 
                        name={name} 
                        time={milliseconds(hours, minutes, seconds)} 
                        isEditionModeEnabled={this.state.isEditionModeEnabled}
                        onExpand={(timer) => this.onTimerExpanded(timer)}
                        onShrink={(timer) => this.onTimerShrunken(timer)}
                        onClickRemoveButton={() => this.removeTimer(id)}
                    />;
        });
    }

    onTimerExpanded(timer) {
        this.props.setBackButtonCallback(() => timer.shrink());
        this.props.enableBackButton();
    }

    onTimerShrunken(timer) {
        this.props.disableBackButton();
    }

    enableEdition() {
        this.setState({ isEditionModeEnabled: true });
    }

    disableEdition() {
        this.setState({ isEditionModeEnabled: false });
    }

    removeTimer(id) {
        this.props.removeTimer(id);
    }
}

const mapStateToProps = (state) => ({
    timers: state.timers
});

const mapDispatchToProps = (dispatch) => ({
    enableBackButton: () => dispatch(enableBackButton()),
    disableBackButton: () => dispatch(disableBackButton()),
    setBackButtonCallback: (callback) => dispatch(setBackButtonCallback(callback)),
    removeTimer: (id) => dispatch(removeTimer(id))
})

export const TimerTab = connect(mapStateToProps, mapDispatchToProps)(TimerTabComponent);
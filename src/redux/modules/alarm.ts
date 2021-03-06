import { take, call, fork, select } from 'redux-saga/effects';
import { audio } from 'utils';
import { actions as countdownsActions } from 'src/redux/modules/countdowns';
import { State } from 'src/redux';
import { Countdown } from 'models';

// SAGAS

function* alarmFlow() {
  const alarm = audio('/static/alarm.mp3');

  while (true) {
    yield take(countdownsActions.update);

    const countdowns: Countdown[] = yield select(({ countdowns }: State) => countdowns);

    if (countdowns.some(c => c.alarmSoundEnabled)) {
      if (alarm.isPaused()) {
        yield call(alarm.play);
      }
    } else {
      yield call(alarm.stop);
    }
  }
}

export const alarmSagas = [
  fork(alarmFlow),
];

import * as React from 'react';
import * as classNames from 'classnames';
import { HTMLProps, SFC } from 'react';
import { IconPlay, IconPause } from 'components/common/Icons';
import { validatePercentageProgressProp } from './propValidations';

const renderMainCssClasses = ({ className, lightTheme }: Partial<StartPauseButtonProps>) => (
  classNames(
    className,
    { '-lighttheme': lightTheme }
  )
)

const renderHiddenClassWhen = (isHidden: boolean) => (
  classNames({ 'h-hidden': isHidden })
)

const calculateStrokeDashoffsetSize = (percentageProgress: number) => (
  ((1 - percentageProgress) * 100) * 182 / 100 + 'px'
)

interface StartPauseButtonProps extends HTMLProps<HTMLButtonElement> {
  lightTheme?: boolean;
  showPause?: boolean;
  percentageProgress?: number;
  onClick: () => void;
}

export const StartPauseButton: SFC<StartPauseButtonProps> = ({ showPause, percentageProgress, onClick, ...otherProps }) => (
  <button
    {...otherProps}
    className={renderMainCssClasses(otherProps)}
    id="start-pause-button"
    title="Start/Pause"
  >
    <svg
      className="border"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="29" />
    </svg>

    <svg
      className="time-progress"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="29"
        style={{ strokeDashoffset: calculateStrokeDashoffsetSize(percentageProgress) }}
      />
    </svg>

    <IconPlay className={renderHiddenClassWhen(showPause)} />
    <IconPause className={renderHiddenClassWhen(!showPause)} />
  </button>
);
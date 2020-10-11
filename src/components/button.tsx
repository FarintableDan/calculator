import * as React from 'react';
import { IButton } from 'interfaces/IButton';


export const Button = (props:IButton):React.ReactElement => {
  const {
    text,
    value,
    calc,
  } = props;

  return (
    <button
      value={value}
      onClick={calc}
    >
      <span>{text}</span>
    </button>
  );
};

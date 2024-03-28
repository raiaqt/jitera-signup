import React, { useMemo, type CSSProperties } from 'react';

import clsx from 'clsx';

import styles from './index.module.css';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  inputStyle?: Record<string, unknown> | string;
  isPasswordField?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {
    style = {},
    inputStyle = {},
    isPasswordField,
    className,
    type,
    ...rest
  } = props;

  const inputStyleProps = useMemo(() => {
    return typeof inputStyle === 'object'
      ? {
          style: {
            ...style,
            ...(inputStyle as CSSProperties),
          },
        }
      : {
          className: inputStyle,
        };
  }, [inputStyle, style]);

  return (
    <input
      className={clsx(styles.input, className)}
      ref={ref}
      type={isPasswordField ? 'password' : type}
      {...inputStyleProps}
      {...rest}
    />
  );
});

export { Input };

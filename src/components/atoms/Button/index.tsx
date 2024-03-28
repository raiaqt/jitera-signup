import React, { useMemo } from 'react';

import clsx from 'clsx';

import styles from './index.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType?: 'link' | 'text' | 'ghost' | 'default' | 'primary' | 'dashed';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props: ButtonProps, ref) => {
  const { buttonType = 'primary', className, children, ...rest } = props;

  const component = useMemo(() => {
    if (typeof children === 'string') {
      return <span>{children}</span>;
    }
    return children;
  }, [children]);

  return (
    <button ref={ref} className={clsx(className, styles.button, styles[buttonType])} {...rest}>
      {component}
    </button>
  );
});

export { Button };

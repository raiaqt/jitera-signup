import React from 'react';
import clsx from 'clsx';
import styles from './index.module.css';

export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';
  align?: 'top' | 'middle' | 'bottom';
  wrap?: boolean;
  direction?: 'ltr' | 'rtl';
  gutter?: [number, number];
}

const Row = React.forwardRef<HTMLDivElement, RowProps>((props, ref) => {
  const {
    children,
    className,
    wrap = true,
    justify,
    align,
    direction = 'ltr',
    gutter,
    style,
    ...rest
  } = props;
  const classes = clsx(styles['jitera-row'], !wrap ? styles['jitera-row-no-wrap'] : '', className);
  const internalStyle = {
    ...style,
    '--justify': justify,
    '--align': align,
    '--wrap': wrap ? 'wrap' : 'nowrap',
    '--direction': direction,
    '--gutter-horizontal': gutter ? `${gutter[0]}px` : '0',
    '--gutter-vertical': gutter ? `${gutter[1]}px` : '0',
  };
  return (
    <div {...rest} style={internalStyle} className={classes} ref={ref}>
      {children}
    </div>
  );
});

export { Row };
// export { Row } from './old'

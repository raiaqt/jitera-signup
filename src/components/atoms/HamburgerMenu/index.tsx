import React, { useState, useEffect, useRef, forwardRef, useMemo } from 'react';
import { Button, ButtonProps } from '@components/atoms/Button';
import { Icon, IconProps } from '@components/atoms/Icon';
import clsx from 'clsx';
import styles from './index.module.css';

export enum HamburgerDrawerPlacementEnum {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

type HamburgerDrawerProps = {
  headerVisible?: boolean;
  onClose?: () => void;
  visible?: boolean;
  title?: string;
  closable?: boolean;
  width?: number;
  placement?: string;
};

export interface HamburgerMenuProps {
  className?: string;
  drawerTitle?: string;
  buttonProps?: Partial<ButtonProps>;
  buttonStyle?: ButtonProps['style'];
  drawerProps?: Partial<HamburgerDrawerProps>;
  headerStyle?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  iconProps?: Partial<IconProps>;
  children?: React.ReactNode;
}

const HamburgerMenu = forwardRef<HTMLDivElement, HamburgerMenuProps>((props, ref) => {
  const {
    buttonProps,
    buttonStyle,
    drawerTitle,
    drawerProps,
    headerStyle,
    bodyStyle,
    iconProps,
    children,
    className,
  } = props;
  const [drawerVisible, setDrawerVisible] = useState(false);
  const { headerVisible, onClose, closable, placement, width } = drawerProps || {};
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const drawerStyles = useMemo(() => {
    const baseStyles: React.CSSProperties = {
      position: 'absolute',
      backgroundColor: 'white',
      borderRadius: '4px',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
      width: width || '20%',
      height: '100%',
    };

    switch (placement) {
      case HamburgerDrawerPlacementEnum.TOP:
        return {
          ...baseStyles,
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: 'auto',
        };
      case HamburgerDrawerPlacementEnum.LEFT:
        return {
          ...baseStyles,
          top: 0,
          bottom: 0,
          left: 0,
        };
      case HamburgerDrawerPlacementEnum.BOTTOM:
        return {
          ...baseStyles,
          bottom: 0,
          left: 0,
          right: 0,
          width: '100%',
          height: 'auto',
        };
      default:
        return {
          ...baseStyles,
          top: '50%',
          right: 0,
          transform: 'translateY(-50%)',
        };
    }
  }, [placement, width]);

  useEffect(() => {
    const isBelongToDrawer = (child: Node) => {
      let node: Node | null = child.parentNode;

      while (node) {
        if (node instanceof Element && node.classList.contains(`${styles.drawer_container}`)) {
          return true;
        }

        node = node.parentNode;
      }

      return false;
    };

    const handleClickOutside = (event: MouseEvent) => {
      const drawerContainer = document.querySelector(`.${styles.drawer_container}`);
      if (drawerContainer && !isBelongToDrawer(event.target as Node)) {
        setDrawerVisible(false);
        if (onClose) {
          onClose();
        }
      }
    };

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDrawerVisible(false);
        if (onClose) {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [onClose]);

  const handleButtonClick = () => {
    if (drawerVisible) {
      setDrawerVisible(false);
      if (onClose) {
        onClose();
      }
    } else {
      setDrawerVisible(true);
      if (closeButtonRef.current) {
        closeButtonRef.current.focus();
      }
    }
  };

  const handleCloseButtonClick = () => {
    setDrawerVisible(false);
  };

  return (
    <div ref={ref} className={className} style={{ width: 'fit-content' }}>
      <Button onClick={handleButtonClick} style={buttonStyle} {...buttonProps}>
        <Icon iconName="MdMenu" {...iconProps} />
      </Button>
      <div className={clsx(styles.drawer_container, drawerVisible ? styles.show : styles.hidden)}>
        <div className="drawer" style={{ ...drawerStyles }}>
          {headerVisible && (
            <div className={clsx(styles.drawer_header)} style={{ ...headerStyle }}>
              {closable && (
                <span onClick={handleCloseButtonClick} className={styles.closable}>
                  <Icon iconName="MdClose" size={20} />
                </span>
              )}
              <div style={{ flex: 1 }}>{drawerTitle}</div>
            </div>
          )}
          <div
            style={{
              ...bodyStyle,
            }}
          >
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
});

export { HamburgerMenu };

import { HamburgerMenu } from '@components/atoms/HamburgerMenu';
import { Text } from '@components/atoms/Text';
import React from 'react';
import { DefaultPageProps } from '@interfaces/page';

import styles from './index.module.css';

export type DefaultHamburgerMenuProps = DefaultPageProps & {
  className?: string;
};

function DefaultHamburgerMenu(props: DefaultHamburgerMenuProps): JSX.Element {
  return (
    <div className={`${styles.hamburger_menu_molecule_0} ${props.className}`}>
      <div className={styles.box_0}>
        <HamburgerMenu
          drawerTitle={`[Title]`}
          className={styles.hamburger_menu_molecule_hamburger_menu_0}
          iconProps={{ iconName: 'MdMenu' }}
          drawerProps={{ placement: 'right', width: 256, closable: true }}
          buttonProps={{ buttonType: 'primary' }}
          buttonStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
        >
          <div className={styles.box_1}>
            <Text
              href={`https://jitera.com`}
              textType="Link"
              className={styles.hamburger_menu_molecule_home}
            >{`Home`}</Text>
            <Text
              href={`https://jitera.com`}
              textType="Link"
              className={styles.hamburger_menu_molecule_home}
            >{`News`}</Text>
            <Text
              href={`https://jitera.com`}
              textType="Link"
              className={styles.hamburger_menu_molecule_home}
            >{`About Us`}</Text>
            <Text
              href={`https://jitera.com`}
              textType="Link"
              className={styles.hamburger_menu_molecule_home}
            >{`Contact`}</Text>
          </div>
        </HamburgerMenu>
      </div>
    </div>
  );
}

export default DefaultHamburgerMenu;

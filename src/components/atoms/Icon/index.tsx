import { Suspense } from 'react';
import { IconBaseProps, IconType } from 'react-icons/lib';
import * as MdIcon from 'react-icons/md';
import * as FaIcon from 'react-icons/fa';
import * as BsIcon from 'react-icons/bs';
import * as FiIcon from 'react-icons/fi';
import * as AiIcon from 'react-icons/ai';

export enum IconSet {
  All = 'all',
  Antd = 'antd',
  Bootstrap = 'bootstrap',
  Feather = 'feather',
  FontAwesome = 'font-awesome',
  Material = 'material',
}

export function getIconComponent(iconName: string, props: IconBaseProps = {}) {
  if (iconName.startsWith('Md')) {
    const Icon = MdIcon[iconName as keyof typeof MdIcon] as IconType;
    return <Icon {...props} />;
  } else if (iconName.startsWith('Fa')) {
    const Icon = FaIcon[iconName as keyof typeof FaIcon] as IconType;
    return <Icon {...props} />;
  } else if (iconName.startsWith('Bs')) {
    const Icon = BsIcon[iconName as keyof typeof BsIcon] as IconType;
    return <Icon {...props} />;
  } else if (iconName.startsWith('Fi')) {
    const Icon = FiIcon[iconName as keyof typeof FiIcon] as IconType;
    return <Icon {...props} />;
  } else if (iconName.startsWith('Ai')) {
    const Icon = AiIcon[iconName as keyof typeof AiIcon] as IconType;
    return <Icon {...props} />;
  }
  return null;
}

export function assertUnreachable(value: never): never {
  throw new Error(`Should not reach with ${value}`);
}

export interface IconProps extends IconBaseProps {
  iconName: string;
}

export const Icon = (props: IconProps) => {
  const { className, style, iconName, color, size } = props;

  return (
    <span
      style={{ display: 'inline-block', verticalAlign: 'middle', ...style }}
      className={className}
    >
      <Suspense fallback={<></>}>{getIconComponent(iconName, { color, size })}</Suspense>
    </span>
  );
};

import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, ElementType, createElement } from 'react';
import { IconType } from 'react-icons';

type IconButtonProps<Component extends ElementType> =
  ComponentPropsWithoutRef<Component> & {
    Icon: IconType;
    iconClassName?: string;
    className?: string;
    component?: Component;
  };

const IconButton = <Component extends ElementType = 'button'>({
  Icon,
  iconClassName,
  className,
  component,
  ...props
}: IconButtonProps<Component>) => {
  return createElement(
    component ?? 'button',
    {
      className: cn('p-1.5 lg:p-2', className),
      ...props,
    },
    <Icon className={cn('size-5 transition-all lg:size-6', iconClassName)} />,
  );
};

export default IconButton;

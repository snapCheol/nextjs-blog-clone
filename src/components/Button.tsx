import { cn } from '@/utils/style';
import { ComponentPropsWithoutRef, FC } from 'react';

type ButtonProps = ComponentPropsWithoutRef<'button'>;

const Button: FC<ButtonProps> = ({ className, children, onClick, ...rest }) => {
  return (
    <button
      className={cn(
        'w-full rounded-md bg-gray-800 py-2 text-white hover:bg-gray-700',
        className,
      )}
      {...rest}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;

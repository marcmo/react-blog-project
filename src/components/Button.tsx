import * as React from 'react';

interface Props {
  onClick: (event: any) => void;
  type?: string;
  children: any;
}
const ButtonInline = ({
  onClick,
  type = 'button',
  children
}: Props) => (
    <Button
      type={type}
      className="btn btn-link float-left"
      onClick={onClick}
    >
      {children}
    </Button>
  );

interface ButtonProps {
  onClick?: (event: any) => void;
  type: string;
  className: string;
  children: any;
}
const Button = ({
  onClick,
  className,
  type = 'button',
  children
}: ButtonProps) => (
    <button
      type={type}
      className={className}
      onClick={onClick}
    >
      {children}
    </button>
  );

export default Button;

export {
  ButtonInline
};

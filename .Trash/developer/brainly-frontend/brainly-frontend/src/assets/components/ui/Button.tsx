export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  return <button>Button</button>;
};

<Button
  variant="primary"
  size="md"
  onClick={() => {}}
  text={"ada"}
  startIcon={"_"}
/>;

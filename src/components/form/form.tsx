type FormProps = {
  children: React.ReactNode;
  action?: (formData: FormData) => void;
  className?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const Form = ({
  children,
  action,
  className,
  onSubmit,
  ...props
}: FormProps) => {
  return (
    <form action={action} className={className} onSubmit={onSubmit} {...props}>
      {children}
    </form>
  );
};

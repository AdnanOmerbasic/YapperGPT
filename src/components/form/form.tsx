type FormProps = {
  children: React.ReactNode;
  action: (formData: FormData) => void;
  className?: string;
};

export const Form = ({ children, action, className, ...props }: FormProps) => {
  return (
    <form action={action} className={className} {...props}>
      {children}
    </form>
  );
};

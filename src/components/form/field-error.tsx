type FieldErrorProps = {
  field: string;
  result?: {
    validationErrors?: Record<string, string[] | undefined>;
    data?: {
      validationErrors?: Record<string, string[] | undefined>;
    };
  };
};

export const FieldError = ({ field, result }: FieldErrorProps) => {
  const error =
    result?.validationErrors?.[field]?.[0] ||
    result?.data?.validationErrors?.[field]?.[0];

  if (!error) return null;

  return <p className="text-sm text-red-500">{error}</p>;
};

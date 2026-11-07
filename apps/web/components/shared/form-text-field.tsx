type FormTextFieldProps = {
  id: string;
  name: string;
  label: string;
  type: "text" | "email" | "tel";
  autoComplete: string;
  maxLength: number;
  className: string;
  error?: string;
  placeholder?: string;
  required?: boolean;
};

export function FormTextField({
  id,
  name,
  label,
  type,
  autoComplete,
  maxLength,
  className,
  error,
  placeholder,
  required = false,
}: FormTextFieldProps) {
  const errorId = `${id}-error`;

  return (
    <div className={className}>
      <label htmlFor={id}>
        {label} {required ? <span aria-hidden="true">*</span> : null}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        maxLength={maxLength}
        placeholder={placeholder}
        required={required}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error ? <small id={errorId}>{error}</small> : null}
    </div>
  );
}

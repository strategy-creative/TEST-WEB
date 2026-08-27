/**
 * FIELD
 * ─────────────────────────────────────────────────────────────
 * The grey input box used throughout checkout. Label sits above or
 * beside it depending on which step it is in.
 */

type FieldProps = {
  id: string;
  label: string;
  type?: "text" | "email";
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
  /** "beside" is step one; "above" is step two. */
  labelPosition?: "beside" | "above";
};

export function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder = "XXXXXX",
  required = false,
  autoComplete,
  labelPosition = "beside",
}: FieldProps) {
  const input = (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      className="h-[27px] w-full bg-field px-[10px] font-sc text-(length:--text-caption) tracking-design text-ink outline-none placeholder:text-muted-soft focus-visible:ring-1 focus-visible:ring-ink"
    />
  );

  if (labelPosition === "above") {
    return (
      <div className="flex w-full flex-col gap-[12px]">
        <label
          htmlFor={id}
          className="font-sc text-(length:--text-tiny) tracking-design"
        >
          {label}
        </label>
        {input}
      </div>
    );
  }

  return (
    <div className="flex w-full items-center gap-[20px]">
      <label
        htmlFor={id}
        className="w-[80px] shrink-0 font-sc text-(length:--text-caption) tracking-design"
      >
        {label}
      </label>
      {input}
    </div>
  );
}

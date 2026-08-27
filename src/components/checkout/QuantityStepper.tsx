"use client";

/**
 * QUANTITY STEPPER
 * ─────────────────────────────────────────────────────────────
 * The QUANTITY: n readout with the + and − boxes underneath.
 * `max` guards against someone buying more than the door allows.
 */

type QuantityStepperProps = {
  value: number;
  onChange: (next: number) => void;
  max?: number;
  disabled?: boolean;
};

export function QuantityStepper({
  value,
  onChange,
  max = 10,
  disabled = false,
}: QuantityStepperProps) {
  const step = (delta: number) =>
    onChange(Math.min(max, Math.max(1, value + delta)));

  const buttonClass =
    "flex h-[27px] w-[28px] cursor-pointer items-center justify-center border border-ink font-sc text-(length:--text-body) leading-none tracking-design transition-colors duration-200 hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink";

  return (
    <div className="flex w-[134px] flex-col gap-[21px]">
      <p className="flex items-center gap-[12px] whitespace-nowrap font-sc text-(length:--text-body) tracking-design">
        <span>QUANTITY:</span>
        <span aria-live="polite">{value}</span>
      </p>

      <div className="flex items-center gap-[6px]">
        <button
          type="button"
          onClick={() => step(1)}
          disabled={disabled || value >= max}
          aria-label="Increase quantity"
          className={buttonClass}
        >
          +
        </button>
        <button
          type="button"
          onClick={() => step(-1)}
          disabled={disabled || value <= 1}
          aria-label="Decrease quantity"
          className={buttonClass}
        >
          −
        </button>
      </div>
    </div>
  );
}

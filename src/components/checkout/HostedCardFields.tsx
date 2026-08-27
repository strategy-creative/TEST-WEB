/**
 * HOSTED CARD FIELDS
 * ═════════════════════════════════════════════════════════════
 * ⚠ READ THIS BEFORE CHANGING ANYTHING IN HERE.
 *
 * The Figma design shows CARD NUMBER / EXPIRY DATE / CVV as ordinary
 * text boxes. They are NOT built that way, on purpose.
 *
 * If this site collects a raw card number into its own <input>, the
 * venue lands inside PCI-DSS scope: the card data passes through your
 * server and your logs, and you become liable for how it is handled.
 * That is a legal and financial problem, not a technical preference.
 *
 * Instead, this component renders the payment provider's own hosted
 * fields (Stripe Elements, or the ticketing platform's iframe), styled
 * to match the design pixel for pixel. The buyer sees the same boxes.
 * The card number never touches this codebase.
 *
 * WHAT YOU SEE NOW: the styled shell, with the fields disabled and
 * labelled, because no payment provider is connected yet. Once keys are
 * added it mounts the real hosted fields in the same slots.
 *
 * DO NOT replace these with plain <input> elements to "make it work".
 * If a payment step seems broken, the fix is connecting the provider —
 * see CLAUDE.md → Ticketing.
 * ═════════════════════════════════════════════════════════════
 */

function HostedSlot({
  label,
  placeholder,
  width,
}: {
  label: string;
  placeholder: string;
  width?: string;
}) {
  return (
    <div className={`flex flex-col gap-[12px] ${width ?? "w-full"}`}>
      <span className="font-sc text-(length:--text-tiny) tracking-design">
        {label}
      </span>
      {/*
        This div is the mount point for the provider's iframe.
        data-hosted-field is how the provider's init code finds it.
      */}
      <div
        data-hosted-field={label.toLowerCase().replace(/\s+/g, "-")}
        className="flex h-[27px] items-center bg-field px-[10px] font-sc text-(length:--text-tiny) tracking-design text-muted-soft"
      >
        {placeholder}
      </div>
    </div>
  );
}

export function HostedCardFields() {
  return (
    <div className="flex h-[185px] w-[241px] flex-col justify-between">
      <HostedSlot label="CARD NUMBER" placeholder="XXXX XXXX XXXX XXXX" />
      <HostedSlot label="NAME" placeholder="XXXXX" />

      <div className="flex items-end gap-[13px]">
        <HostedSlot label="EXPIRY DATE" placeholder="XX/XX" width="w-[143px]" />
        <HostedSlot label="CVV" placeholder="XXX" width="w-[85px]" />
      </div>
    </div>
  );
}

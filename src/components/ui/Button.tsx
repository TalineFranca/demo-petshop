import { cn } from "@/lib/utils";

type Variant = "stamp" | "ink";

const base =
  "hand-border inline-flex items-center justify-center gap-2 border-[2.5px] border-ink px-6 py-3 font-display text-lg font-semibold leading-tight transition-transform duration-150 hover:-translate-y-0.5 hover:-rotate-1 active:translate-y-0.5";

const variants: Record<Variant, string> = {
  stamp:
    "bg-mustard text-ink shadow-[3px_4px_0_0_var(--color-ink)] active:shadow-[1px_1px_0_0_var(--color-ink)]",
  ink: "bg-ink text-cream shadow-[3px_4px_0_0_var(--color-mustard)] active:shadow-[1px_1px_0_0_var(--color-mustard)]",
};

type CommonProps = { variant?: Variant; className?: string; children: React.ReactNode };
type LinkProps = CommonProps & { href: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className">;
type NativeButtonProps = CommonProps & { href?: undefined } & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">;

/** Botão com cara de etiqueta colada. Com `href` vira link. */
export function Button(props: LinkProps | NativeButtonProps) {
  const { variant = "stamp", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], className);

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }
  const buttonProps = rest as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? "button"} className={classes} {...buttonProps}>
      {children}
    </button>
  );
}

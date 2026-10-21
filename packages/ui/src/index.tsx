import type { AnchorHTMLAttributes, HTMLAttributes } from "react";

type ActionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "secondary";
};

export function ActionLink({
  className,
  variant = "primary",
  ...props
}: ActionLinkProps) {
  return (
    <a
      className={["ui-action", `ui-action--${variant}`, className]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  );
}

type PillProps = HTMLAttributes<HTMLSpanElement> & {
  href?: string;
  target?: string;
  rel?: string;
};

export function Pill({
  className,
  href,
  target,
  rel,
  children,
  ...props
}: PillProps) {
  const classes = ["ui-pill", className].filter(Boolean).join(" ");

  if (href) {
    return (
      <a className={classes} href={href} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}

import loyaltyStyles from "./loyalty-demo.module.css";
import adminStyles from "./loyalty-admin-preview.module.css";
import voucherStyles from "./voucher-demo.module.css";

const styles: Record<string, string> = {
  ...loyaltyStyles,
  ...adminStyles,
  ...voucherStyles,
};

export function demoClass(...names: string[]) {
  return names
    .flatMap((name) => [name, styles[name]])
    .filter(Boolean)
    .join(" ");
}

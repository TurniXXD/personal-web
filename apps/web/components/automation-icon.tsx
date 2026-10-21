import {
  Activity,
  AtSign,
  Bell,
  CalendarClock,
  CalendarDays,
  ChartNoAxesCombined,
  Database,
  FileStack,
  FileText,
  Inbox,
  LibraryBig,
  ListTodo,
  Mail,
  MailCheck,
  PackagePlus,
  Radar,
  ReceiptText,
  RefreshCw,
  Share2,
  ShieldAlert,
  ShoppingCart,
  Star,
  TrendingUp,
  Truck,
  UserPlus,
  UserRoundSearch,
  Workflow,
} from "lucide-react";

export type AutomationIconName =
  | "activity"
  | "at-sign"
  | "bell"
  | "calendar-clock"
  | "calendar-days"
  | "chart"
  | "database"
  | "file-stack"
  | "file-text"
  | "inbox"
  | "library"
  | "list-todo"
  | "mail"
  | "mail-check"
  | "package-plus"
  | "radar"
  | "receipt"
  | "refresh"
  | "share"
  | "shield-alert"
  | "shopping-cart"
  | "star"
  | "trending-up"
  | "truck"
  | "user-plus"
  | "user-search"
  | "workflow";

const icons = {
  activity: Activity,
  "at-sign": AtSign,
  bell: Bell,
  "calendar-clock": CalendarClock,
  "calendar-days": CalendarDays,
  chart: ChartNoAxesCombined,
  database: Database,
  "file-stack": FileStack,
  "file-text": FileText,
  inbox: Inbox,
  library: LibraryBig,
  "list-todo": ListTodo,
  mail: Mail,
  "mail-check": MailCheck,
  "package-plus": PackagePlus,
  radar: Radar,
  receipt: ReceiptText,
  refresh: RefreshCw,
  share: Share2,
  "shield-alert": ShieldAlert,
  "shopping-cart": ShoppingCart,
  star: Star,
  "trending-up": TrendingUp,
  truck: Truck,
  "user-plus": UserPlus,
  "user-search": UserRoundSearch,
  workflow: Workflow,
} as const satisfies Record<AutomationIconName, typeof Mail>;

type AutomationIconProps = {
  name: AutomationIconName;
  size?: number;
  className?: string;
};

export const AutomationIcon = ({
  name,
  size = 24,
  className,
}: AutomationIconProps) => {
  const Icon = icons[name];
  return (
    <Icon
      className={className}
      size={size}
      strokeWidth={1.8}
      aria-hidden="true"
    />
  );
};

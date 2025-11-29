import {
  Home,
  BookCopy,
  LayoutTemplate,
  Megaphone,
  BarChart2,
} from "lucide-react"

export const navItems = [
  { href: "/dashboard", icon: Home, label: "Dashboard" },
  { href: "/dashboard/minisite", icon: LayoutTemplate, label: "Minisite" },
  { href: "/dashboard/katalog", icon: BookCopy, label: "Katalog" },
  { href: "/dashboard/promosi", icon: Megaphone, label: "Promosi" },
  { href: "/dashboard/insight", icon: BarChart2, label: "Insight" },
];

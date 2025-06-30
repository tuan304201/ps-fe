import { h } from "vue";

import {
  ChevronUp,
  ChevronDown,
  ChevronRight,
  Circle,
  CircleCheckBig,
  CircleX,
  CircleHelp,
  Timer,
} from "lucide-vue-next";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "delivery",
    label: "Đang giao",
    icon: h(Circle),
    bgColor: "border border-blue-500/50 ",
    textColor: "text-blue-500/90",
  },
  {
    value: "processing",
    label: "Chờ xác nhận",
    icon: h(Timer),
    bgColor: "border border-yellow-500/50",
    textColor: "text-yellow-500/90",
  },
  {
    value: "received",
    label: "Đã nhận",
    icon: h(CircleCheckBig),
    bgColor: "border border-green-500/50",
    textColor: "text-green-500/90",
  },
  {
    value: "canceled",
    label: "Đã huỷ",
    icon: h(CircleX),
    bgColor: "border border-red-500/50",
    textColor: "text-red-500/90",
  },
];

export const priorities = [
  {
    value: "low",
    label: "Low",
    icon: h(ChevronDown),
  },
  {
    value: "medium",
    label: "Medium",
    icon: h(ChevronRight),
  },
  {
    value: "high",
    label: "High",
    icon: h(ChevronUp),
  },
];

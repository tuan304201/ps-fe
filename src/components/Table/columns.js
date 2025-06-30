import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { h } from "vue";
import { labels, priorities, statuses } from "./data/data";
import DataTableColumnHeader from "./DataTableColumnHeader.vue";
import DataTableRowActions from "./DataTableRowActions.vue";

export const columns = [
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        modelValue: table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate"),
        "onUpdate:modelValue": (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
        class: "translate-y-0.5",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        modelValue: row.getIsSelected(),
        "onUpdate:modelValue": (value) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
        class: "translate-y-0.5",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "", class: "whitespace-nowrap text-center" }),

    cell: ({ row }) => {
      return h("div", { class: "flex justify-center items-center min-w-[80px]" }, [
        h("img", {
          src: row.getValue("image"),
          class: "h-20 w-20 rounded-md object-cover",
          alt: "Product Image",
        }),
      ]);
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "productName",
    header: ({ column }) => h(DataTableColumnHeader, { column, title: "Sản phẩm", class: "whitespace-nowrap" }),

    cell: ({ row }) => {
      return h("div", {}, [
        h("div", { class: "min-w-[200px] max-w-[400px] text-start" }, [
          h(
            "div",
            { class: "block font-medium tite__purchase line-clamp-2 text-ellipsis text-[15px]" },
            row.original.productName,
          ),
        ]),
      ]);
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "unitPrice",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Giá tiền", class: "text-center whitespace-nowrap" }),
    cell: ({ row }) => {
      const formattedPrice = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(row.getValue("unitPrice"));

      return h("div", { class: "text-center line-through text-neutral-400" }, formattedPrice);
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "classification",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Phân loại", class: "text-center whitespace-nowrap" }),
    cell: ({ row }) => h("div", { class: "text-center text-neutral-400 " }, row.getValue("classification")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "quantity",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Số lượng", class: "text-center whitespace-nowrap" }),
    cell: ({ row }) => h("div", { class: "text-center" }, row.getValue("quantity")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "paymentMethod",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Phương thức thanh toán", class: "text-center whitespace-nowrap" }),
    cell: ({ row }) => h("div", { class: "text-center" }, row.getValue("paymentMethod")),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Status", class: "text-center whitespace-nowrap" }),

    cell: ({ row }) => {
      const status = statuses.find((status) => status.value === row.getValue("status"));

      if (!status) return null;

      return h(
        "div",
        {
          class: `flex items-center px-2 whitespace-nowrap py-2 rounded-[4px] ${status.textColor} justify-center font-semibold ${status.bgColor}`,
        },
        [h("div", status.label)],
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) =>
      h(DataTableColumnHeader, { column, title: "Thành tiền", class: "text-center whitespace-nowrap" }),
    cell: ({ row }) => {
      const formattedPrice = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(row.getValue("totalPrice"));

      return h("div", { class: "text-center text-primary font-semibold text-[16px]" }, formattedPrice);
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => h(DataTableRowActions, { row }),
  },
];

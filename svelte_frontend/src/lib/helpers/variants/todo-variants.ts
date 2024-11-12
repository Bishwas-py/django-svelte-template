import {tv} from "tailwind-variants";

export const todoStatus = tv({
  base: "text-xs border-l-4 pl-2",
  variants: {
    status: {
      success: "text-green-500 border-green-500",
      error: "text-red-500 border-red-500",
      warning: "text-blue-500 border-blue-500",
      neutral: "text-gray-500 border-gray-500"
    }
  },
  defaultVariants: {
    status: "neutral"
  }
});

export const actionButton = tv({
  base: "text-xs",
  variants: {
    intent: {
      primary: "text-blue-500",
      danger: "text-red-500"
    },
    padding: {
      left: "pl-2",
      none: ""
    }
  },
  defaultVariants: {
    padding: "none"
  }
});

export const modal = tv({
  base: "fixed inset-0 bg-black/50 flex justify-center items-center backdrop-blur",
  slots: {
    container: "flex flex-col gap-2 bg-white dark:bg-neutral-950 shadow rounded p-3 w-full max-w-xl outline outline-4 outline-sky-500/40",
    input: "inp-wrap"
  }
});

export interface BaseModalProps {
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: "primary" | "danger";
}

export const baseModalDefaults = {
  confirmLabel: "Подтвердить",
  cancelLabel: "Отмена",
  confirmVariant: "primary",
} satisfies Partial<BaseModalProps>;

export interface BaseModalEmits {
  confirm: [];
  cancel: [];
}

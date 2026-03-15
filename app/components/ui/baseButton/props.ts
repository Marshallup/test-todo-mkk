export interface BaseButtonProps {
  variant?: "primary" | "secondary" | "danger" | "ghost";
  disabled?: boolean;
  loading?: boolean;
}

export const baseButtonDefaults: Required<BaseButtonProps> = {
  variant: "primary",
  disabled: false,
  loading: false,
};

import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "hero";
  disabled?: boolean;
};

export default function Button({
  children,
  variant = "default",
  disabled,
}: ButtonProps) {
  return (
    <button disabled={disabled}
      className={`${styles.button} ${variant === "hero" ? styles.hero : ""}`}
    >
      {children}
    </button>
  );
}

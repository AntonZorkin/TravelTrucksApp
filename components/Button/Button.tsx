import styles from "./Button.module.css";

type ButtonProps = {
  children: React.ReactNode;
  variant?: "default" | "hero";
  disabled?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};

export default function Button({
  children,
  variant = "default",
  disabled,
  type,
}: ButtonProps) {
  return (
    <button disabled={disabled} type={type}
      className={`${styles.button} ${variant === "hero" ? styles.hero : ""}`}
    >
      {children}
    </button>
  );
}

import styles from "./Button.module.css"

type ButtonProps = {
    children: React.ReactNode;
    variant?: "default" | "hero";
}

export default function Button({children, variant="default"}:ButtonProps) {
    return (
        <button className={`${styles.button} ${variant==="hero"?styles.hero:""}`}>{children}</button>
    )
}
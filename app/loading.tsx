import styles from "./page.module.css";

const Loading = () => {
  return (
    <div
      className={styles.overlay}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.loader} aria-hidden="true" />
      <p className={styles.text}>Loading, please wait…</p>
    </div>
  );
};
export default Loading;

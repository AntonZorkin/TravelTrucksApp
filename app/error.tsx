'use client';

import styles from "./page.module.css";

type Props = {
    error: Error;
    reset: () => void;
}

const Error = ({ error, reset }: Props) => {
    return (<div className={styles.errorWrapper }>
        <h2 className={styles.errorTitle }>Loading error</h2>
        <p className={styles.errorText }>{error.message}</p>
        <button onClick={reset} className={styles.errorBtn}>Try again</button>
    </div>)
}
export default Error;
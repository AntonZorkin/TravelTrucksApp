import Button from "@/components/Button/Button";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main className={styles.container}>
        <section>
          <div className={styles.hero}>
            <div className={styles.titleWrapper}>
              <h1 className={styles.title}>Campers of your dreams</h1>
              <p className={styles.text}>
                You can find everything you want in our catalog
              </p>
            </div>

            <Link href={"/catalog"}>
              <Button>View Now</Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

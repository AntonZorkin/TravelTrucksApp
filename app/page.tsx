import Button from "@/components/Button/Button";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div>
      <main className={styles.container}>
        <section>
          <div className={styles.hero}>
            <h1 className={styles.title}>Campers of your dreams</h1>
            <p className={styles.text}>
              You can find everything you want in our catalog
            </p>
            <Button>View Now</Button>            
          </div>
        </section>
      </main>
    </div>
  );
}

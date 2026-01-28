
import Button from "@/components/Button/Button";
import styles from "./page.module.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import { fetchCampers } from "@/lib/api";
import TruckList from '@/components/TruckList/TruckList'

export default function Catalog() {
    
    return (
        <section className={styles.container}>
            {/* <h1 className={styles.disable}>Truck Catalog</h1> */}
            <aside>{<Sidebar/>}</aside>
            <div>{<TruckList trucks={ campers} />}</div>
    </section>
)
}
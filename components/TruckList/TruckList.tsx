import { Camper } from "@/types/trucks";
import styles from "./TruckList.module.css";
import Image from "next/image";
import Icon from "../Icon/Icon";
import Link from "next/link";
import Button from "../Button/Button";

interface TruckListProps {
  trucks: Camper[];
}

const TruckList = ({ trucks }: TruckListProps) => {
  return (
    <ul className={styles.container}>
      {trucks.map((truck: Camper) => {
        const features = [
          truck.transmission && { label: truck.transmission, icon: "diagram" },
          truck.engine && { label: truck.engine, icon: "fuel-pump" },

          truck.AC && { label: "AC", icon: "wind" },
          truck.bathroom && { label: "Bathroom", icon: "shower" },
          truck.kitchen && { label: "Kitchen", icon: "cup-hot" },
          truck.TV && { label: "TV", icon: "tv" },
          truck.radio && { label: "Radio", icon: "radios" },
          truck.refrigerator && { label: "Refrigerator", icon: "fridge" },
          truck.microwave && { label: "Microwave", icon: "microwave" },
          truck.gas && { label: "Gas", icon: "gas" },
          truck.water && { label: "Water", icon: "water" },
        ]
          .filter((item): item is { label: string; icon: string } =>
            Boolean(item),
          )
          .slice(0, 7);
        return (
          <li key={truck.id} className={styles.item}>
            <div className={styles.image}>
              <Image
                src={
                  truck.gallery.length > 0
                    ? truck.gallery[0].thumb
                    : "/images/placeholder.png"
                }
                alt={truck.name}
                fill
                sizes="292px"
              />
            </div>
            <div className={styles.info}>
              <div>
                <div className={styles.head}>
                  <h2 className={styles.title}>{truck.name}</h2>
                  <div className={styles.price}>
                    <p>€{truck.price}.00</p>
                    <Icon name="heart" size={24} />
                  </div>
                </div>
                <div className={styles.ratingLocation}>
                  <div className={styles.rating}>
                    <Icon name="rating" size={16} />
                    <p>
                      {truck.rating}({truck.reviews ? truck.reviews.length : 0}{" "}
                      Reviews)
                    </p>
                  </div>
                  <div className={styles.location}>
                    <Icon name="map" size={16} />
                    <p>{truck.location}</p>
                  </div>
                </div>
              </div>
              <p className={styles.description}>{truck.description}</p>
              <div className={styles.details}>
                {features.map((feature, index) => (
                  <div key={index} className={styles.comfort}>
                    <Icon name={feature.icon} size={20} />
                    <p>{feature.label}</p>
                  </div>
                ))}
              </div>
              <div>
                <Link href={`/catalog/${truck.id}`}>
                  <Button>Show more</Button>
                </Link>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TruckList;

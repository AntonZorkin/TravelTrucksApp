import { CamperListItem } from "@/types/trucks";
import styles from "./TruckList.module.css";
import Image from "next/image";
import Icon from "../Icon/Icon";
import Link from "next/link";
import Button from "../Button/Button";
import FeaturesList from "../FeaturesList/FeaturesList";
import { useFavoritesStore } from "@/store/favorites";

interface TruckListProps {
  trucks: CamperListItem[];
  onLoadMore: () => void;
  showLoadMore: boolean;
  loading: boolean;
}

const TruckList = ({
  trucks,
  onLoadMore,
  showLoadMore,
  loading,
}: TruckListProps) => {
  const { favorites, toggleFavorite } = useFavoritesStore();

  return (
    <div>
      <ul className={styles.container}>
        {trucks.map((truck: CamperListItem) => {
          const isFavorite = favorites.includes(truck.id);
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
                      {truck?.price !== undefined && <p>€{truck.price.toFixed(2)}</p>}

                      <button
                        type="button"
                        className={`${styles.btnHeart} ${
                          isFavorite ? styles.btnHeartActive : ""
                        }`}
                        onClick={() => toggleFavorite(truck.id)}
                        aria-pressed={isFavorite}
                      >
                        <Icon name="heart" size={24} />
                      </button>
                    </div>
                  </div>

                  <div className={styles.ratingLocation}>
                    <div className={styles.rating}>
                      <Icon name="rating" size={16} />
                      <p className={styles.ratingText}>
                        {truck.rating}(
                        {truck.reviews ? truck.reviews.length : 0} Reviews)
                      </p>
                    </div>

                    <div className={styles.location}>
                      <Icon name="map" size={16} />
                      <p>{truck.location}</p>
                    </div>
                  </div>
                </div>

                <p className={styles.description}>{truck.description}</p>

                <FeaturesList truck={truck} limit={7} />

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

      {showLoadMore && (
        <div className={styles.loadMoreWrapper}>
          <button
            type="button"
            className={styles.loadMoreBtn}
            onClick={onLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load more"}
          </button>
        </div>
      )}
    </div>
  );
};

export default TruckList;

"use client";

import { useParams } from "next/navigation";
import styles from "./page.module.css";
import { fetchCampersById } from "@/lib/api";
import { useEffect, useState } from "react";
import { Camper } from "@/types/trucks";
import Icon from "@/components/Icon/Icon";
import Image from "next/image";
import Button from "@/components/Button/Button";
import FeaturesList from "@/components/FeaturesList/FeaturesList";

export default function TruckDetails() {
  const [truck, setTruck] = useState<Camper | null>(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [date, setDate] = useState<string>();
  const [comment, setComment] = useState<string>();

  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    if (!id) {
      return;
    }
    const loadTruck = async () => {
      try {
        setLoading(true);
        const response = await fetchCampersById(id);
        setTruck(response);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    loadTruck();
  }, [id]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("Booking successful");
    setName("");
    setEmail("");
    setDate("");
    setComment("");
  };

  return (
    <section className={styles.container}>
      <div className={styles.general}>
        <div className={styles.head}>
          <h2 className={styles.title}>{truck?.name}</h2>
          <div className={styles.ratingLocation}>
            <div className={styles.rating}>
              <Icon name="rating" size={16} />
              <p>
                {truck?.rating}({truck?.reviews ? truck.reviews.length : 0}{" "}
                Reviews)
              </p>
            </div>
            <div className={styles.location}>
              <Icon name="map" size={16} />
              <p>{truck?.location}</p>
            </div>
          </div>
          <div className={styles.price}>
            <p>€{truck?.price}.00</p>
          </div>
        </div>

        <div className={styles.imageWrapper}>
          {truck?.gallery.map((image, index) => (
            <div className={styles.image} key={index}>
              <Image src={image.original} alt={truck.name} fill />
            </div>
          ))}
        </div>

        <div className={styles.description}>{truck?.description}</div>
      </div>
      <div className={styles.tabs}>
        <div className={styles.tabsHead}>
          <div className={styles.tabsTitles}>
            <h3>Features</h3>
            <h3>Reviews</h3>
          </div>

          <hr className={styles.line} />
        </div>

        <div className={styles.features}>
          <div className={styles.truckDetails}>
            <div className={styles.featuresWrapper}>
              {truck && <FeaturesList truck={truck} limit={7} />}
            </div>
            <div className={styles.details}>
              <h4 className={styles.detailsTitle}>Vehicle details</h4>
              <div className={styles.detailsLineWrapper}>
                <hr className={styles.line} />
              </div>
              <div className={styles.detailsWrapper}>
                <div className={styles.detItem}>
                  <p>Form</p>
                  <p>{truck?.form}</p>
                </div>
                <div className={styles.detItem}>
                  <p>Length</p>
                  <p>{truck?.length}</p>
                </div>
                <div className={styles.detItem}>
                  <p>Width</p>
                  <p>{truck?.width}</p>
                </div>
                <div className={styles.detItem}>
                  <p>Height</p>
                  <p>{truck?.height}</p>
                </div>
                <div className={styles.detItem}>
                  <p>Tank</p>
                  <p>{truck?.tank}</p>
                </div>
                <div className={styles.detItem}>
                  <p>Consumption</p>
                  <p>{truck?.consumption}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.formWrapper}>
            <div className={styles.formHead}>
              <h4>Book your campervan now</h4>
              <p>Stay connected! We are always ready to help you.</p>
            </div>
            <form onSubmit={handleSubmit}  className={styles.form}>
              <input
                className={styles.inputField}
                type="text"
                placeholder="Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className={styles.inputField}
                type="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={styles.inputField}
                type="date"
                placeholder="Booking date*"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <input
                className={styles.inputField}
                type="text"
                placeholder="Comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Send"}
              </Button>
            </form>
          </div>
        </div>
        <div className={styles.reviews}>
          <div>
            <div>
              {truck?.reviews.map((comment, index) => (
                <div className={styles.commentTitle} key={index}>
                  <div>{comment.reviewer_name[0]}</div>
                  <div>{comment.reviewer_name}</div>
                  <div>{comment.reviewer_rating}</div>
                  <div>{comment.comment}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

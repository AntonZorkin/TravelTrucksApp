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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { uk } from "date-fns/locale";
import { handleClientScriptLoad } from "next/script";

export default function TruckDetails() {
  const [truck, setTruck] = useState<Camper | null>(null);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState<Date | null>();
  const [comment, setComment] = useState("");

  const [activeTab, setActiveTab] = useState<"Features"|"Reviews">("Features")
  const handleClick = () => {
    if (activeTab==="Features") {
      setActiveTab("Reviews")
    }    
    else {
      setActiveTab("Features")
    }
  }

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
    setDate(null);
    setComment("");
  };

  const renderStars = (rating: number | string) => {
    const value = Math.floor(Number(rating));
    return (
      <div className={styles.stars}>
        {Array.from({ length: 5 }, (_, i) => (
          <Icon
            key={i}
            name="rating"
            size={16}
            className={i < value ? styles.starActive : styles.starInactive}
          />
        ))}
      </div>
    );
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
          <div className={styles.tabsTitlesWrapper}>
            <button className={styles.tabsTitles} onClick={() => setActiveTab("Features")}>Features</button>
            <button className={styles.tabsTitles} onClick={() => setActiveTab("Reviews")}>Reviews</button>
          </div>

          <hr className={styles.line} />
        </div>
        <div className={styles.features}>

          {activeTab==="Features"&&<div className={styles.truckDetails}>
            <div className={styles.featuresWrapper}>
              {truck && <FeaturesList truck={truck} limit={11} />}
            </div>
            <div className={styles.details}>
              <h4 className={styles.detailsTitle}>Vehicle details</h4>
              <div className={styles.detailsLineWrapper}>
                <hr className={styles.line} />
              </div>
              <ul className={styles.detailsWrapper}>
                <li className={styles.detItem}>
                  <p>Form</p>
                  <p>{truck?.form}</p>
                </li>
                <li className={styles.detItem}>
                  <p>Length</p>
                  <p>{truck?.length}</p>
                </li>
                <li className={styles.detItem}>
                  <p>Width</p>
                  <p>{truck?.width}</p>
                </li>
                <li className={styles.detItem}>
                  <p>Height</p>
                  <p>{truck?.height}</p>
                </li>
                <li className={styles.detItem}>
                  <p>Tank</p>
                  <p>{truck?.tank}</p>
                </li>
                <li className={styles.detItem}>
                  <p>Consumption</p>
                  <p>{truck?.consumption}</p>
                </li>
              </ul>
            </div>
          </div>}
          {activeTab==="Reviews"&&<div className={styles.reviews}>
          <div>
            <div className={styles.commentWrapper}>
              {truck?.reviews.map((comment, index) => (
                <div className={styles.commentItem} key={index}>
                  <div className={styles.commentHead}>
                    <div className={styles.commentTitle}>
                      {comment.reviewer_name[0]}
                    </div>
                    <div className={styles.commentName}>
                      <div>{comment.reviewer_name}</div>
                      <div className={styles.stars}>
                        {renderStars(comment.reviewer_rating)}
                      </div>
                    </div>
                  </div>

                  <div className={styles.comment}>{comment.comment}</div>
                </div>
              ))}
            </div>
          </div>
        </div>}
          <div className={styles.formWrapper}>
            <div className={styles.formHead}>
              <h4 className={styles.bookTitle}>Book your campervan now</h4>
              <p className={styles.bookText}>
                Stay connected! We are always ready to help you.
              </p>
            </div>
            <form onSubmit={handleSubmit} className={styles.form}>
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
              <DatePicker
                selected={date}
                onChange={(d: Date | null) => setDate(d)}
                locale={uk}
                dateFormat="dd.MM.yyyy"
                placeholderText="Booking date*"
                className={styles.inputField}
              />
              <textarea
                className={`${styles.inputField} ${styles.textarea}`}
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
        
      </div>
    </section>
  );
}

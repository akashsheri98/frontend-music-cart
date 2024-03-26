import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./skeltan.module.css";

const CardSkeltan = () => {
  return (
    <div className={styles.productCard}>
      <SkeletonTheme baseColor="#e7e1e1" highlightColor="#cccccc">
        <div className={styles.product_image_div}>
          <Skeleton height={220} />
        </div>
        <div className={styles.product_desc}>
          <Skeleton height={25} width={230} marginBottom={30} />
          <Skeleton height={20} width={110} />
          <Skeleton height={15} />
          <Skeleton height={15} />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default CardSkeltan;

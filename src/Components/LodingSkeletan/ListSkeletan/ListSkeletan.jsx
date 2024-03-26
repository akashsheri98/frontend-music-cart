import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./ListSkeletan.module.css";

const ListSkeletan = () => {
  return (
    <div className={styles.productList_container}>
      <SkeletonTheme baseColor="#e7e1e1" highlightColor="#cccccc">
        <div className={styles.product_image_div}>
          <Skeleton height={220} width={300} />
        </div>
        <div className={styles.product_desc}>
          <Skeleton height={30} width={200} />
          <Skeleton height={25} width={250} />
          <Skeleton height={20} width={550} />
          <Skeleton height={20} width={550} />
          <br />
          <Skeleton height={45} width={130} />
        </div>
      </SkeletonTheme>
    </div>
  );
};

export default ListSkeletan;

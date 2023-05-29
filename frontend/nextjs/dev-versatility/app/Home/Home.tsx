import React from "react";
import Image from 'next/image'
import styles from "./Home.module.css";

const Home: React.FC = () => (
  <>
    <div className={styles["welcome-container"]}>
      <h1 className={styles["welcome-message"]}>Welcome to</h1>
      <span className={styles.logo}>Dev Versatility!</span>
      <br/>
      {/* <Image
        className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
        src="/StudCupcake.svg"
        alt="Dev Versatility Logo"
        width={180}
        height={37}
        priority
      /> */}
    </div>
  </>
);

export default Home;

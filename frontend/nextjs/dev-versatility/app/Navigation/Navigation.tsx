"use client";

import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faEnvelope,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Navigation.module.css";
import HoverButton from "../Components/Hoverbutton/HoverButton";
import Tooltip from "../Components/Tooltip/Tooltip";

const Navigation = () => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [firstLoadDone, setFirstLoadDone] = useState(false);

  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!hasFocus) {
      timeoutId.current = setTimeout(
        () => {
          setIsHidden(true);
          setIsMinimized(true);
          setFirstLoadDone(true);
        },
        firstLoadDone ? 1500 : 3000
      );
    } else {
      clearTimeout(timeoutId.current);
      setIsHidden(false);
    }

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [firstLoadDone, hasFocus]);

  const toggleMinimized = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className={`${isHidden ? styles.isHidden : ""} ${styles.navigation} ${
        isMinimized ? styles.minimized : ""
      }`}
      onMouseEnter={(e) => setHasFocus(true)}
      onMouseLeave={(e) => setHasFocus(false)}
    >
      <HoverButton
        timeout={500}
        callback={() => setIsMinimized(false)}
        className={styles.toggleButton}
        onClick={toggleMinimized}
      >
        {isMinimized ? (
          <FontAwesomeIcon icon={faBars} />
        ) : (
          <FontAwesomeIcon icon={faBars} />
        )}
      </HoverButton>
      <ul className={styles.menuItems}>
        <li>
          <Tooltip text={isMinimized ? "Home": ""}>
            <a className={styles.navItem} href="/">
              <FontAwesomeIcon icon={faHome} />
              {
                <span
                  className={`${styles.hideOnMinimized} ${
                    isMinimized ? styles.minimized : ""
                  }`}
                >
                  Home
                </span>
              }
            </a>
          </Tooltip>
        </li>
        <li>
          <Tooltip text={isMinimized ? "Profile": ""}>
            <a className={styles.navItem} href="/profile">
              <FontAwesomeIcon icon={faUser} />
              {
                <span
                  className={`${styles.hideOnMinimized} ${
                    isMinimized ? styles.minimized : ""
                  }`}
                >
                  Profile
                </span>
              }
            </a>
          </Tooltip>
        </li>
        <li>
          <Tooltip text={isMinimized ? "Message": ""}>
            <a className={styles.navItem} href="/message">
              <FontAwesomeIcon icon={faEnvelope} />
              {
                <span
                  className={`${styles.hideOnMinimized} ${
                    isMinimized ? styles.minimized : ""
                  }`}
                >
                  Message
                </span>
              }
            </a>
          </Tooltip>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;

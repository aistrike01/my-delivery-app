import React from "react";
import styles from "./NotFoundBlock.module.scss";

export default function NotFoundBlock() {
    return (
        <div className={styles.root}>
            <h1>404</h1>
            <h2>( ͡❛ ︵ ͡❛)</h2>
            <h3>Not Found </h3>
        </div>
    );
}

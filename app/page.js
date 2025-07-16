"use client"

import styles from "./page.module.css";
import { Poppins } from "next/font/google";
import { useRef } from "react";

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["400", "500", "600"],
});

export default function Home() {
	const nameRef = useRef();
	const codeRef = useRef();

	function handleJoin() {
    const name = nameRef.current.value
    const code = codeRef.current.value
    if (!code || !name) {
      alert("Empty input Fields Check the name and code")
    } else {
      console.log(`Joining: ${name} ${code}`)
    }
  }

	return (
		<section className={styles.home} id='home'>
			<div className={styles.header}>
				<p className={`${poppins.className} ${styles.logo}`}>Whispr</p>
			</div>
			<div className={styles.hero} id='hero'>
				<p className={styles.textMain}>Welcome to Whispr-v2</p>
				<p className={styles.textSub}>
					Chat with anyone in the world without installing an app just with your
					<span className={styles.highlight}> name</span> and a
					<span className={styles.highlight}> Room code</span>
				</p>
			</div>
			<div className={styles.inputFields}>
				<div className={styles.inputSection}>
					<p className={styles.input}>Name: </p>
					<input type='text' className={styles.inputBox} ref={nameRef} />
				</div>
				<div className={styles.inputSection}>
					<p className={styles.input}>Code: </p>
					<input type='text' className={styles.inputBox} ref={codeRef} />
				</div>
				<button className={styles.join} onClick={handleJoin}>Join</button>
			</div>
		</section>
	);
}

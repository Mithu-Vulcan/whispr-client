"use client";

import styles from "./page.module.css";
import { Poppins } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["400", "500", "600"],
});

export default function Home() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [code, setCode] = useState("");

	function handleBtn(endPoint) {
		router.push(endPoint);
	}

	function handleCreate() {
		if (!name) {
			alert("Empty input Fields Check the name");
		} else {
			requestCode();
		}
	}

	async function requestCode() {
		try {
			const res = await fetch("https://whispr-express.onrender.com/api/rooms/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			});

			const data = await res.json();
			setCode(data.roomCode)
			handleBtn(`/chat?name=${name}&code=${data.roomCode}`)
		} catch (err) {
			console.log("Error occured while fetch: ", err);
		}
	}

	return (
		<section className={styles.home} id='home'>
			<div className={styles.header}>
				<p className={`${poppins.className} ${styles.logo}`}>Whispr</p>
			</div>
			<div className={styles.hero} id='hero'>
				<p className={styles.textMain}>
					Create the Room, Share the code, Whispr!
				</p>
				<p className={styles.textSub}>
					Chat with anyone in the world without installing an app just with your
					<span className={styles.highlight}> name</span> and a
					<span className={styles.highlight}> Room code</span>
				</p>
			</div>
			<div className={styles.inputFields}>
				<div className={styles.inputSection}>
					<p className={styles.input}>Name: </p>
					<input
						type='text'
						className={styles.inputBox}
						id='name'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className={styles.btnSection}>
					<button className={styles.btn} onClick={() => handleBtn("/")}>
						Main Page
					</button>
					<button className={styles.btn} onClick={handleCreate}>
						Create
					</button>
				</div>
			</div>
		</section>
	);
}

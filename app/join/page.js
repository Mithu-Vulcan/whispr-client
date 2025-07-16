"use client";

import styles from "./page.module.css";
import { Poppins } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["400", "500", "600"],
});

export default function Home() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [code, setCode] = useState("");
	const [name, setName] = useState("");

	useEffect(() => {
		const queryCode = searchParams.get("code");
		if (queryCode) setCode(queryCode);
	}, [searchParams]);

	function handleBtn(endPoint) {
		if (endPoint == "/") {
			router.push("/")
		} else {
			if (!code || !name) {
				alert("Empty input Fields Check the name and code");
			} else {
				if (code.length == 6) {
					console.log(`Joining: ${name} ${code}`);
					router.push(`${endPoint}?code=${code}`);
				} else {
					alert("Invalid Code");
				}
			}
		}
	}

	function handleJoin () {
		console.log("join")
	}

	return (
		<section className={styles.home} id='home'>
			<div className={styles.header}>
				<p className={`${poppins.className} ${styles.logo}`}>Whispr</p>
			</div>
			<div className={styles.hero} id='hero'>
				<p className={styles.textMain}>
					Join the Room, Share the code, Whispr!
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
				<div className={`${styles.inputSection}`}>
					<p className={styles.input}>Code: </p>
					<input
						type='text'
						className={`${styles.inputBox}  ${styles.code}`}
						id='code'
						value={code}
						autoComplete='off'
						onChange={(e) => setCode(e.target.value.toUpperCase())}
					/>
				</div>
				<div className={styles.btnSection}>
					<button className={styles.btn} onClick={() => handleBtn("/")}>
						Main Page
					</button>
					<button className={styles.btn} onClick={handleJoin}>
						Join
					</button>
				</div>
			</div>
		</section>
	);
}

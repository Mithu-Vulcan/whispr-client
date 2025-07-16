"use client";

import styles from "./page.module.css";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["400", "500", "600"],
});

export default function Home() {
	const router = useRouter();

	function handleCreate() {
		router.push('/create')
	}
	function handleJoin() {
		router.push('/join')
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
				<button className={styles.btn} onClick={handleJoin}>Join a Room</button>
				<button className={styles.btn} onClick={handleCreate}>Create a Room</button>
			</div>
		</section>
	);
}

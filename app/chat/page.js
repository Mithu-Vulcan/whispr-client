"use client";
import FloatingDialog from "../components/FloatingDialog";
import { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Poppins } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["400", "500", "600"],
});

export default function Chat() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [showDialog, setShowDialog] = useState(false);
	const [code, setCode] = useState("");
	const [name, setName] = useState("");

	useEffect(() => {
		const queryName = searchParams.get("name");
		const querycode = searchParams.get("code");
		if (!queryName && !querycode) {
			alert("Invalid Attempt");
			router.push("/");
		} else {
			setName(queryName);
			setCode(querycode);
		}
	}, [searchParams, router]);

	return (
		<section id='chat' className={styles.section}>
			<div className={styles.header}>
				<p className={`${poppins.className} ${styles.logo}`}>Whispr</p>
				<button className={styles.btn} onClick={() => setShowDialog(true)}>
					Room Code
				</button>
				<FloatingDialog
					isOpen={showDialog}
					onClose={() => setShowDialog(false)}
				>
					<p className={styles.text}>Your Code:</p>
					<p className={styles.code}>{code}</p>
					<div className={styles.btns}>
						<button
							className={`${styles.btn} ${styles.dialogBtn}`}
							onClick={() => setShowDialog(true)}
						>
							Exit
						</button>
						<button
							className={`${styles.btn} ${styles.dialogBtn}`}
							onClick={() => setShowDialog(true)}
						>
							Copy Link
						</button>
					</div>
				</FloatingDialog>
			</div>

			<div className={styles.messages}>
				<div className={styles.messageWrapper}>
					<p className={styles.name}>Alice</p>
					<p className={styles.message}>Hey there 👋</p>
				</div>

				<div className={styles.messageWrapper}>
					<p className={styles.name}>Alice</p>
					<p className={styles.message}>Welcome to Whispr</p>
				</div>

				<div className={`${styles.messageWrapper} ${styles.ownWrapper}`}>
					<p className={styles.name}>You</p>
					<p className={`${styles.message} ${styles.own}`}>Hey there 👋</p>
				</div>

				<div className={`${styles.messageWrapper} ${styles.ownWrapper}`}>
					<p className={styles.name}>You</p>
					<p className={`${styles.message} ${styles.own}`}>Welcome to Whispr</p>
				</div>

				<div className={styles.messageWrapper}>
					<p className={styles.name}>Alice</p>
					<p className={styles.message}>Hey there 👋</p>
				</div>

				<div className={styles.messageWrapper}>
					<p className={styles.name}>Alice</p>
					<p className={styles.message}>Welcome to Whispr</p>
				</div>

				<div className={`${styles.messageWrapper} ${styles.ownWrapper}`}>
					<p className={styles.name}>You</p>
					<p className={`${styles.message} ${styles.own}`}>Hey there 👋</p>
				</div>

				<div className={`${styles.messageWrapper} ${styles.ownWrapper}`}>
					<p className={styles.name}>You</p>
					<p className={`${styles.message} ${styles.own}`}>Welcome to Whispr</p>
				</div>
				<div className={styles.messageWrapper}>
					<p className={styles.name}>Alice</p>
					<p className={styles.message}>Hey there 👋</p>
				</div>

				<div className={styles.messageWrapper}>
					<p className={styles.name}>Alice</p>
					<p className={styles.message}>Welcome to Whispr</p>
				</div>

				<div className={`${styles.messageWrapper} ${styles.ownWrapper}`}>
					<p className={styles.name}>You</p>
					<p className={`${styles.message} ${styles.own}`}>Hey there 👋</p>
				</div>

				<div className={`${styles.messageWrapper} ${styles.ownWrapper}`}>
					<p className={styles.name}>You</p>
					<p className={`${styles.message} ${styles.own}`}>Welcome to Whispr</p>
				</div>

				<div className={styles.messageWrapper}>
					<p className={styles.name}>Alice</p>
					<p className={styles.message}>Hey there 👋</p>
				</div>

				<div className={styles.messageWrapper}>
					<p className={styles.name}>Alice</p>
					<p className={styles.message}>Welcome to Whispr</p>
				</div>

				<div className={`${styles.messageWrapper} ${styles.ownWrapper}`}>
					<p className={styles.name}>You</p>
					<p className={`${styles.message} ${styles.own}`}>Hey there 👋</p>
				</div>

				<div className={`${styles.messageWrapper} ${styles.ownWrapper}`}>
					<p className={styles.name}>You</p>
					<p className={`${styles.message} ${styles.own}`}>Welcome to Whispr</p>
				</div>
			</div>

			<div className={styles.messageBody}>
				<div className={styles.inputField}>
					<textarea name='message' id='msg' className={styles.input}></textarea>
					<button className={styles.send}>&gt;</button>
				</div>
			</div>
		</section>
	);
}

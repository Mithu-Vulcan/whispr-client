"use client";

import FloatingDialog from "../components/FloatingDialog";
import { useEffect, useState, Suspense } from "react";
import styles from "./page.module.css";
import { Poppins } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";

let socket;

const poppins = Poppins({
	variable: "--font-poppins",
	subsets: ["latin"],
	weight: ["400", "500", "600"],
});

// Create a separate component for the chat functionality
function ChatContent() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [showDialog, setShowDialog] = useState(false);
	const [code, setCode] = useState("");
	const [name, setName] = useState("");
	const [messages, setMessages] = useState([]);
	const [currentMessage, setCurrentMessage] = useState("");

	useEffect(() => {
		const queryName = searchParams.get("name");
		const querycode = searchParams.get("code");
		if (!queryName && !querycode) {
			alert("Invalid Attempt");
			router.push("/");
		} else {
			setName(queryName);
			setCode(querycode);

			socket = io("https://whispr-express.onrender.com/");
			socket.emit("join-room", querycode, queryName);
			socket.on("chat message", (msg) => {
				console.log(msg);
				setMessages((prev) => [...prev, msg]);
			});
			return () => {
				socket.emit("leave-room", { code: querycode, name: queryName });
				socket.disconnect();
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	function copyJoinLink(code) {
		const joinURL = `${window.location.origin}/join?code=${encodeURIComponent(
			code
		)}`;

		// Try modern clipboard API first
		if (
			navigator.clipboard &&
			typeof navigator.clipboard.writeText === "function"
		) {
			navigator.clipboard
				.writeText(joinURL)
				.then(() => {
					showCopiedToast(); // Optional toast
				})
				.catch((err) => {
					console.warn("Clipboard API failed:", err);
					fallbackCopy(joinURL);
				});
		} else {
			// Fallback for older/locked-down browsers
			fallbackCopy(joinURL);
		}
	}

	function fallbackCopy(text) {
		const textarea = document.createElement("textarea");
		textarea.value = text;
		textarea.setAttribute("readonly", "");
		textarea.style.position = "absolute";
		textarea.style.left = "-9999px";
		document.body.appendChild(textarea);
		textarea.select();

		try {
			const success = document.execCommand("copy");
			if (success) {
				showCopiedToast(); // Optional toast
			} else {
				alert("Copy failed.");
			}
		} catch (err) {
			console.error("Fallback failed:", err);
			alert("Copy not supported on this device.");
		}

		document.body.removeChild(textarea);
	}

	function showCopiedToast() {
		alert("✅ Link copied!");
	}

	function handleSendMessage() {
		console.log("message: ", currentMessage);
		const message = currentMessage.trim();
		const roomId = code;
		const username = name;
		if (message !== "") {
			socket.emit("chat message", {
				roomId,
				username,
				message,
			});
			setCurrentMessage("");
			document.getElementById("msg").innerText = "";
			document.getElementById("msg").innerHTML = "";
		}
	}

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
							onClick={() => router.push("/")}
						>
							Exit
						</button>
						<button
							className={`${styles.btn} ${styles.dialogBtn}`}
							onClick={() => copyJoinLink(code)}
						>
							Copy Link
						</button>
					</div>
				</FloatingDialog>
			</div>

			<div className={styles.messages}>
				{messages.map((data, index) => (
					<div
						key={index}
						className={`${styles.messageWrapper} ${
							data.username === name ? styles.ownWrapper : ""
						} ${data.username === "System" ? styles.sysWrapper : ""}`}
					>
						<p className={styles.name}>
							{data.username === name ? "You" : data.username}
						</p>
						<p className={styles.message}>{data.message}</p>
					</div>
				))}
			</div>

			<div className={styles.messageBody}>
				<div className={styles.inputField}>
					<textarea
						name='message'
						id='msg'
						className={styles.input}
						onChange={(e) => setCurrentMessage(e.target.value)}
					></textarea>
					<button className={styles.send} onClick={handleSendMessage}>
						&gt;
					</button>
				</div>
			</div>
		</section>
	);
}

// Loading component to show while suspending
function ChatLoading() {
	return (
		<div className={styles.section}>
			<div className={styles.header}>
				<p className={`${poppins.className} ${styles.logo}`}>Whispr</p>
			</div>
			<div className={styles.messages}>
				<p>Loading chat...</p>
			</div>
		</div>
	);
}

// Main component wrapped with Suspense
export default function Chat() {
	return (
		<Suspense fallback={<ChatLoading />}>
			<ChatContent />
		</Suspense>
	);
}
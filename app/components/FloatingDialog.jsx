// FloatingDialog.jsx
import React from "react";
import styles from "./FloatingDialog.module.css";

export default function FloatingDialog({ isOpen, onClose, children }) {
	if (!isOpen) return null;

	return (
		<>
			<div className={styles.overlay} onClick={onClose} />

			<div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
				<button onClick={onClose} className={styles.closeBtn}>
					X
				</button>
				{children}
			</div>
		</>
	);
}

import styles from "../../../styles/components/transitions/Buttons/ButtonPag.module.scss";

/**
 * @description This component is a button with right arrow and left arrow. Heptagon-wrapped.
 * @param {String} className Enter className as string.
 * @param {String} variant Enter variant (next or prev).
 * @param {String} className Enter className as string.
 * @returns {JSX.Element} returns button
 */
const ButtonPag = ({ className, variant, onClick, children }) => {
	const classes = `${styles.btn} ${className}`;
	return (
		<button className={classes} onClick={onClick}>
			{variant === "next" && (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='icon icon-tabler icon-tabler-chevron-right'
					viewBox='0 0 24 24'
					strokeWidth='2'
					stroke='currentColor'
					fill='none'
					strokeLinecap='round'
					strokeLinejoin='round'>
					<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
					<path d='M9 6l6 6l-6 6'></path>
				</svg>
			)}
			{variant === "prev" && (
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='icon icon-tabler icon-tabler-chevron-left'
					viewBox='0 0 24 24'
					strokeWidth='2'
					stroke='currentColor'
					fill='none'
					strokeLinecap='round'
					strokeLinejoin='round'>
					<path stroke='none' d='M0 0h24v24H0z' fill='none'></path>
					<path d='M15 6l-6 6l6 6'></path>
				</svg>
			)}
			{children}
		</button>
	);
};

export default ButtonPag;

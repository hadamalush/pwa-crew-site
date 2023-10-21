import styles from "./ModalTest.module.scss";

const ModalText = ({ children }) => {
	return <div className={styles.div}>{children}</div>;
};

export default ModalText;

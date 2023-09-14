import styles from "../../../styles/components/transitions/Wrappers/WrapperMain.module.scss";

const WrapperMain = props => {
	const classes = `${styles.wrapper} ${props.className}`;
	return <div className={classes}>{props.children}</div>;
};

export default WrapperMain;

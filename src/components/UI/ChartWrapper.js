import styles from "./ChartWrapper.module.css";

const ChartWrapper = (props) => {
  return <div className={styles.box}>{props.children}</div>;
};

export default ChartWrapper;

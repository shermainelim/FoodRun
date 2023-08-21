import * as React from "react";
import classNames from "classnames/bind";
import styles from "./CustomButton.scss";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";

interface Props {
  testId?: string;
  content: string;
  clicked: () => void;
  className: string;
  loading?: boolean;
}

const CustomButton: React.FC<Props> = ({
  testId,
  content,
  clicked,
  className,
  loading,
}) => {
  const cx = classNames.bind(styles);

  return (
    <button
      data-testid={`custom-btn-${testId}`}
      className={cx("basic", className)}
      onClick={clicked}
    >
      {loading?(<div className={cx("spinner")} ><Spinner/></div>):(<div>{content}</div>)}
      
    </button>
  );
};

export default CustomButton;

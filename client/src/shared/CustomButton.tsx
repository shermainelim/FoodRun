import * as React from "react";
import classNames from "classnames/bind";
import styles from "./CustomButton.scss";
import { useButtonSoundFlagData } from "../redux/appSlice";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import cloth2 from "../assets/music/cloth2.mp3";


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
  const buttonFlagSound:any = useButtonSoundFlagData();
  let audio = new Audio(cloth2);

const buttonClick=()=>{

  if(buttonFlagSound){
    audio.play();
    clicked();
  }else{
    clicked();
  }
  
}

  return (
    <button
      data-testid={`custom-btn-${testId}`}
      className={cx("basic", className)}
      onClick={buttonClick}
    >
      {loading?(<div className={cx("spinner")} ><Spinner/></div>):(<div>{content}</div>)}
      
    </button>
  );
};

export default CustomButton;

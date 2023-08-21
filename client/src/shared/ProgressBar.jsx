import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ProgressBar.scss";
import { useDispatch } from "react-redux";
import { contributionBackPost } from "../redux/appSlice";

const ProgressBar = ({ starterGoal, currentSaved, enderGoal, description, spacerName, ider }) => {
  const cx = classNames.bind(styles);
  const [style, setStyle] = useState({});
  const dispatch = useDispatch();

  const currentGoal = currentSaved;
  const endGoal = enderGoal;
  const startGoal = starterGoal;

  const spaceName = spacerName;
  const id= ider;

  let currentProgress = (currentGoal / endGoal) * 100;

  const [current, setCurrent] = useState(currentProgress);

  useEffect(()=>{
setCurrent(currentSaved);
  },[currentGoal])

  let incrementalGoal = (startGoal / endGoal) * 100;

  const Contribute = () => {
    const curr = parseInt(current);
    const res = curr + incrementalGoal;

    setCurrent(res);
    let currentSaved = res;
    dispatch(contributionBackPost({  spaceName, id , currentSaved}));
  };

  const Backtrack = () => {
    const curr = parseInt(current);
    const res = curr - incrementalGoal;

    setCurrent(res);
    let currentSaved = res;
    dispatch(contributionBackPost({  spaceName, id , currentSaved}));
  };

  setTimeout(() => {
    const newStyle = {
      opacity: 1,
      width: `${current}%`,
    };

    setStyle(newStyle);
  }, 200);

  return (
    <div className={cx("progress")}>
      <div className={cx("progress-done")} style={style}>
        {current}%
      </div>
      <div className={cx("progress-start-end")}>
        <div className={cx("progress-start")}>{startGoal}</div>
        <div className={cx("progress-end")}>{endGoal}</div>
      </div>
      <div className="pro-card-description">{description}</div>
      <div onClick={Contribute} className="pro-card-btn-contribute">
        Contribute
      </div>

      <div onClick={Backtrack} className="pro-card-btn-backtrack">
        Backtrack
      </div>
    </div>
  );
};

export default ProgressBar;

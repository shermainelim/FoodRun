import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./ManyStores.scss";
import { Card } from "../../shared/Card";
import CustomButton from "../../shared/CustomButton";
import UpdateForm from "../todo/UpdateForm";
import AddTaskForm from "../todo/AddTaskForm";
import ToDo from "../todo/ToDo";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faRefresh } from "@fortawesome/free-solid-svg-icons";
import {
  goalPost,
  fetchGoal,
  logOutFirstPerson,
  useFirstPerson,
  useGoalFetch,
  goalDelete,
  goalDone,
  fetchFinance,
  useFinanceFetch,
  financeDelete,
  spaceDelete,
  completeSpaceDelete,
  useFinanceFetchLoading,
  useGoalFetchLoading,
} from "../../redux/appSlice";
import { Navigate } from "react-router-dom";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import Couple from "../../assets/couple6.png";
import * as cgUtils from "../../utils/cgUtil";
import cogoToast from "cogo-toast";
import { Spinner } from "react-activity";
import "react-activity/dist/library.css";
import toast from "../../assets/toat.png";
import hamster from "../../assets/hamster.gif";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Image } from "semantic-ui-react";

const ManyStores = () => {
    const defaultSelectValue = "Select a fruit"

    const [selected, setSelected] = useState(defaultSelectValue)
  
  return (
    <>
      <label htmlFor="fruits">Fruits</label>{' '}
      <select
        id="fruits"
        name="fruits"
        defaultValue={selected}
        style={{ color: selected === defaultSelectValue ? "gray" : "black" }}
        onChange={e => setSelected(e.target.value)}
      >
        <option>{defaultSelectValue}</option>
        <option>Banana</option>
        <option>Apple</option>
        <option>Orange</option>
      </select>

      <h2>Selected: {selected}</h2>
    </>
  );
};

export default ManyStores;

import React, { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./DashboardFirst.scss";
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

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  }
};
const images = [
  "https://images.unsplash.com/photo-1549989476-69a92fa57c36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549396535-c11d5c55b9df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550133730-695473e544be?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550167164-1b67c2be3973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550338861-b7cfeaf8ffd8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550223640-23097fc71cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550353175-a3611868086b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550330039-a54e15ed9d33?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549737328-8b9f3252b927?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549833284-6a7df91c1f65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1549985908-597a09ef0a7c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  "https://images.unsplash.com/photo-1550064824-8f993041ffd3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
];


const DashboardFirst = () => {
  const cx = classNames.bind(styles);
  const navigate = useNavigate();
  const [logout, setLogout] = useState(false);
  const [toDo, setToDo] = useState([]);
  const [deleted, setDeleted] = useState(false);
  let secondPersonData = useFirstPerson();

  const goalFetchLoading = useFinanceFetchLoading();
  const financeFetchLoading = useGoalFetchLoading();

 

  //first person login
  const spaceName = secondPersonData[0];
  const secondPersonNameUser = secondPersonData[1];
  const secondPersonBirthdayUser = secondPersonData[2];
  const secondPersonName = secondPersonData[3];
  const secondPersonBirthday = secondPersonData[4];
  const anniversaryDateFirstPersonUser = secondPersonData[5];
  const secondPersonEmail = secondPersonData[6];

  // Tasks (ToDo List) State

  const [toDoFinance, setToDoFinance] = useState([]);
  const [finalArr, setFinalArr] = useState([]);
  const [newArr, setNewArr] = useState([]);

  useEffect(() => {
    //fetch
    dispatch(fetchGoal({ spaceName }));
    dispatch(fetchFinance({ spaceName }));
  }, []);

  let fetchGoalData = useGoalFetch();
  let fetchFinanceData = useFinanceFetch();

  // Temp State
  /////////////
  const [newTask, setNewTask] = useState("");
  const [updateData, setUpdateData] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (typeof fetchGoalData !== "undefined") {
      processNow();
      sortedArr();
      setToDo(finalArr);
      setNewArr([]);
      setFinalArr([]);
    }
  }, [fetchGoalData]);

  useEffect(() => {
    if (typeof fetchFinanceData !== "undefined") {
      let fetchFinanceDataProcessed = fetchFinanceData[0];
      setToDoFinance(fetchFinanceDataProcessed);
    }
  }, [fetchFinanceData]);

  function refresh() {
    dispatch(fetchGoal({ spaceName }));
    dispatch(fetchFinance({ spaceName }));
    cogoToast.success("Refreshed");
  }

  function processNow() {
    if (fetchGoalData === undefined) {
      return;
    } else {
      let onlyGoalsTable = fetchGoalData[1];

      const objCopy = [onlyGoalsTable];
      objCopy[0]?.map(function (element) {
        let newData = { ...element };

        if (element?.status === 0) {
          newData.status = false;
          newArr.push({ newData });
        } else if (element?.status === 1) {
          newData.status = true;
          newArr.push({ newData });
        }
        return newData;
      });
    }
  }

  function sortedArr() {
    if (newArr.length === 0) {
      return;
    }
    newArr.map(function (element) {
      finalArr.push({
        spaceName: element.newData.spaceName,
        id: element.newData.id,
        title: element.newData.title,
        status: element.newData.status,
      });
    });
  }

  




  if (logout) {
    return <Navigate to="/" />;
  }


  

  
  
  return (
    <div className={cx("dh-cus-container")}>
     <div style={{position:"relative"}}> <img
          data-testid="img-logo-resident"
          className={cx("dh-cus-hamster")}
          src={hamster}
          alt="Logo"
         
        />

        <img
          data-testid="img-logo-resident"
          className={cx("dh-cus-imageIcon")}
          src={toast}
          alt="Logo"
         
        /></div>
    

<input
        style={{
          borderRadius: "0.625rem",
          padding: "0.5rem",
          width:"18.5rem",
          marginBottom: "1.25rem",
        }}
        type="text"
        name="name"
        placeholder="Search Store"
        
      />

<input
        style={{
          borderRadius: "0.625rem",
          padding: "0.5rem",
          width:"18.5rem",
          marginBottom: "1.25rem",
        }}
        type="text"
        name="name"
        placeholder="Search Postal Code"
        
      />


   


      
    </div>
  );
};

export default DashboardFirst;

import React from "react";

import "./Card.scss";
import ProgressBar from "./ProgressBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export const Card = ({ todoFinance, deleteFinance }) => {
  
  
  return (
    <>
      {todoFinance &&
        todoFinance.map((ele) => {
          return (
            <div className="card-container">
              <div className="card-mini-container">
                <h1 className="card-title">{ele.title}</h1>

                <div onClick={() => deleteFinance(ele.id)}>
                  <FontAwesomeIcon size="xl" icon={faTrashCan} />
                </div>
              </div>

              <div className="card-progress-bar">
                {
                  <ProgressBar
                    starterGoal={ele.startGoal}
                    currentSaved={ele.currentSaved}
                    enderGoal={ele.endGoal}
                    description={ele.description}
                    spacerName={ele.spaceName}
                    ider={ele.id}
                  />
                }
              </div>
            </div>
          );
        })}
    </>
  );
};

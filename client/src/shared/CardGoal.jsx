import React from "react";
import "./CardGoal.scss";
import ProgressBar from "./ProgressBar";

export const CardGoal = ({ title, description, buttonText, link }) => {
  return (
    <div className="card-container-goal">
      {title && <h1 className="card-title">{title}</h1>}
      <div className="card-progress-bar">{<ProgressBar done="80" />}</div>

      {description && <p className="card-description">{description}</p>}
      {buttonText && link && (
        <a href={link} className="card-btn">
          {buttonText}
        </a>
      )}
    </div>
  );
};

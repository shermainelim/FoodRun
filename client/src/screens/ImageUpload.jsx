import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./ImageUpload.scss";
import Axios from "axios";
import { AdvancedImage } from '@cloudinary/react'
import { Cloudinary } from '@cloudinary/url-gen';
import {
    lazyload,
    responsive,
    accessibility,
    placeholder
  } from "@cloudinary/react";


const ImageUpload = () => {
  const navigate = useNavigate();
  const cx = classNames.bind(styles);

  const [imageSelected, setImageSelected] = useState("");
  const [url , setUrl] = useState("");

  const myCld = new Cloudinary({
    cloud: {
      cloudName: "dbpz6zmrx",
    },
  });
  
  let img = myCld.image(url);
  

  const uploadImage= ()=>{
    const formData = new FormData();
    formData.append("file", imageSelected);
    formData.append("upload_preset", "qt7djoyu");


    Axios.post("https://api.cloudinary.com/v1_1/dbpz6zmrx/image/upload", formData).then((response)=>{
        console.log(response);
        if(response.status=200){
            setUrl(response.data.public_id);
        }
    });
  }

  return (
    <div className={cx("container")}>
      <input type="file" onChange={(event)=>{setImageSelected(event.target.files[0])}}/>
      <button onClick={uploadImage}>Upload Image</button>

      <AdvancedImage cldImg={img} plugins={[lazyload(),responsive(), placeholder()]} />
    </div>
  );
};

export default ImageUpload;

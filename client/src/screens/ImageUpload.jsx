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

  const [imageSelected, setImageSelected] = useState([]);
  const [url , setUrl] = useState([]);
  let arr = [];

  const myCld = new Cloudinary({
    cloud: {
      cloudName: "dbpz6zmrx",
    },
  });
  
  let img = myCld.image(url);
  

  const uploadImage= ()=>{
    setUrl([]);

    const formData = new FormData();

    console.log("images", imageSelected);

    for(let i = 0; i<imageSelected.length; i++){
      formData.append("file", imageSelected[i]);
      formData.append("upload_preset", "qt7djoyu");
      Axios.post("https://api.cloudinary.com/v1_1/dbpz6zmrx/image/upload", formData).then((response)=>{
        console.log(response);
        if(response.status=200){

          setUrl(url => [...url, response.data.public_id]);
          
            console.log("the arr here", url);
        }
    });

    console.log("url arr", arr);
    }
  }

  return (
    <div className={cx("container")}>
      <input type="file" multiple={true} onChange={(event)=>{setImageSelected(event.target.files)}}/>
      <button onClick={uploadImage}>Upload Image</button>
      {url.map((item, i)=><AdvancedImage style={{padding:"20px"}}key={i} cldImg={myCld?.image(url[i])} plugins={[lazyload(),responsive(), placeholder()]} />)}
      

     
    </div>
  );
};

export default ImageUpload;

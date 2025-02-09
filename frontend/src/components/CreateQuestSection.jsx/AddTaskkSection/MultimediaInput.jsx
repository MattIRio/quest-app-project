import { Button } from "@mui/material";
import { useRef, useState } from "react";
import { MyButton } from "../../../UI/button/MyButton";

export function MultimediaInput({ onUpload }) {
   const [file, setFile] = useState(null);
   const inputFileRef = useRef(null); // створюємо реф для інпута

   const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      if (!selectedFile) return;

      const fileType = selectedFile.type.startsWith("video/") ? "hasVideo" : "hasImage";
      if (onUpload) onUpload(fileType);
      setFile(selectedFile);
   };

   const handleButtonClick = () => {
      inputFileRef.current.click(); // викликаємо click на інпуті
   };

   return (
      <>
         <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", flex: "1 1 100%" }}>
               <input
                  ref={inputFileRef} // додаємо реф до інпута
                  accept="image/*, video/*"
                  style={{ opacity: 0, position: "absolute", width: 0, height: 0 }}
                  id="multimedia-input"
                  type="file"
                  onChange={handleFileChange}
               />
               <MyButton onClick={handleButtonClick} text={"Add Multimedia"}></MyButton>
            </div>
            {file && (
               <div>
                  <h3>Uploaded File:</h3>
                  <p>{file.name}</p>
               </div>
            )}
         </div>

      </>
   );
}
import { Button } from "@mui/material";
import { useRef, useState } from "react";
import { MyButton } from "../../../UI/button/MyButton";

export function MultimediaInput() {
   const [file, setFile] = useState(null);
   const inputFileRef = useRef(null); // створюємо реф для інпута

   const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
   };

   const handleButtonClick = () => {
      inputFileRef.current.click(); // викликаємо click на інпуті
   };

   return (
      <>
         <input
            ref={inputFileRef} // додаємо реф до інпута
            accept="image/*, video/*"
            style={{ opacity: 0, position: "absolute", width: 0, height: 0 }}
            id="multimedia-input"
            type="file"
            onChange={handleFileChange}
         />
         <MyButton onClick={handleButtonClick} text={"Add Multimedia"}></MyButton>

         {file && (
            <div>
               <h3>Uploaded File:</h3>
               <p>{file.name}</p>
            </div>
         )}
      </>
   );
}
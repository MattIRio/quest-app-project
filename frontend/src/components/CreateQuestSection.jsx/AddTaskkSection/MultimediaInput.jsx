import { useRef, useState } from "react";
import { MyButton } from "../../../UI/button/MyButton";

export function MultimediaInput({ onUpload }) {
   const [file, setFile] = useState(null);
   const inputFileRef = useRef(null);
   const fileUrlRef = useRef(null)
   const handleFileChange = (event) => {
      const selectedFile = event.target.files?.[0];
      if (!selectedFile) return;

      const fileType = selectedFile.type.startsWith("video/") ? "hasVideo" : "hasImage";
      fileUrlRef.current = URL.createObjectURL(selectedFile)

      if (onUpload) {
         onUpload(fileUrlRef.current, fileType);
      }
      setFile(selectedFile);
   };

   const handleButtonClick = () => {
      inputFileRef.current?.click();
   };

   return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
         <input
            ref={inputFileRef}
            accept="image/*, video/*"
            style={{ display: "none" }}
            id="multimedia-input"
            type="file"
            onChange={handleFileChange}
         />
         <MyButton onClick={handleButtonClick} text={"Add Multimedia"} />

         {file && (
            <div >
               {file.type.startsWith("image/") && (
                  <img
                     src={fileUrlRef.current}
                     alt="Uploaded"
                     style={{ width: 200, height: 200, objectFit: "cover", borderRadius: 10 }}
                  />
               )}

               {file.type.startsWith("video/") && (
                  <video
                     controls
                     style={{ maxWidth: "100%", marginTop: "10px" }}
                  >
                     <source src={fileUrlRef.current} type={file.type} />
                     Your browser does not support the video tag.
                  </video>
               )}
            </div>
         )}
      </div>
   );
}

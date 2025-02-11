import { useState } from "react";
import { MyButton } from "../../../UI/button/MyButton";
import { Modal } from "@mui/material";


export function ImageSelectionAnswer({ correctAnswer, setCorrectAnswer, imageUrl }) {
   const [selection, setSelection] = useState({
      x1: correctAnswer?.x1 || 0,
      y1: correctAnswer?.y1 || 0,
      x2: correctAnswer?.x2 || 0,
      y2: correctAnswer?.y2 || 0,
   });
   const [open, setOpen] = useState(false);
   const [isSelecting, setIsSelecting] = useState(false);

   const handleMouseDown = (e) => {
      e.preventDefault();
      const rect = e.target.getBoundingClientRect();
      setSelection((prev) => ({
         ...prev,
         x1: Math.round(e.clientX - rect.left),
         y1: Math.round(e.clientY - rect.top),
         x2: Math.round(e.clientX - rect.left),
         y2: Math.round(e.clientY - rect.top),
      }));
      setIsSelecting(true);
   };

   const handleMouseMove = (e) => {
      e.preventDefault();
      if (!isSelecting) return;

      const rect = e.target.getBoundingClientRect();
      setSelection((prev) => ({
         ...prev,
         x2: Math.round(e.clientX - rect.left),
         y2: Math.round(e.clientY - rect.top),
      }));
      console.log(selection)
   };

   const handleMouseUp = (e) => {
      e.preventDefault();
      setIsSelecting(false);
   };

   const handleConfirm = () => {
      setCorrectAnswer(selection);
      setOpen(false);
   };

   return (
      <>
         <MyButton onClick={() => setOpen(true)} text={"Select Area"}></MyButton>
         <Modal open={open} onClose={() => setOpen(false)}>
            <div style={{ position: "relative", padding: "20px", background: "rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", alignItems: "center", height: "100%", justifyContent: "center", backdropFilter: "blur(10px)" }}>
               <div style={{ position: "relative", display: "inline-block" }}>
                  <img
                     src={imageUrl}
                     alt="Selection"
                     style={{ width: 500, height: 500, cursor: "crosshair" }}
                     onMouseDown={handleMouseDown}
                     onMouseMove={handleMouseMove}
                     onMouseUp={handleMouseUp}
                  />
                  {selection.x1 !== 0 && selection.x2 !== 0 && (
                     <div
                        style={{
                           position: "absolute",
                           left: Math.min(selection.x1, selection.x2),
                           top: Math.min(selection.y1, selection.y2),
                           width: Math.abs(selection.x2 - selection.x1),
                           height: Math.abs(selection.y2 - selection.y1),
                           border: "2px solid red",
                           background: "rgba(255, 0, 0, 0.2)",
                           pointerEvents: "none"
                        }}
                     />
                  )}
               </div>
               <button onClick={handleConfirm} style={{ marginTop: "10px" }}>Confirm Selection</button>
            </div>
         </Modal>
      </>
   );
}

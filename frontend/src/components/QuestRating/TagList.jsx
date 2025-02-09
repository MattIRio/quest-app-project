import React, { useMemo, useState } from "react";
import { tagsList } from "../../constants/temporary/quests";
import { Box } from "@mui/material";

const TagList = ({ selectedTags, handleTagClick }) => {
   const tagColors = useMemo(() => {
      const colors = {};
      tagsList.forEach((tag) => {
         colors[tag] = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      });
      return colors;
   }, [tagsList]);


   return (
      <Box
         display="flex"
         gap={1}
         sx={{
            // overflowX: "auto", // Дозволяє горизонтальний скрол
            whiteSpace: "nowrap", // Забезпечує, що елементи не переходять на новий рядок
            maxWidth: "100%",
            display: "flex",
            flexWrap: "wrap",
            // scrollbarWidth: 0,
            // scrollBehavior: "smooth",
            paddingBottom: 1
         }}>
         {tagsList.map((tag) => (
            <button
               key={tag}
               onClick={() => handleTagClick(tag)}
               style={{
                  border: `4px solid ${tagColors[tag]}`,
                  background: selectedTags.includes(tag) ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)",
                  borderRadius: 20,
                  padding: 5,
                  margin: 5,// Додаємо відступ між кнопками

               }}
            >
               {tag}
            </button>
         ))}
      </Box>
   );
};

export default TagList;

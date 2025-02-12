import {
   Box,
   Chip,
   Rating,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TablePagination,
   TableRow,
} from "@mui/material";
import { format } from "date-fns";
import React, { useState } from "react";

export default function CompletedQuests({ data }) {

   const [page, setPage] = useState(0);
   const [rowsPerPage, setRowsPerPage] = useState(5);

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   console.log(data)
   return (
      <>
         <TableContainer>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>Quest Name</TableCell>
                     <TableCell>Rating</TableCell>
                     <TableCell>Completion Date</TableCell>
                     <TableCell>Score</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((quest, index) => (
                     <TableRow key={index}>
                        <TableCell>{quest.quest.name}</TableCell>
                        <TableCell>
                           <Rating value={quest.quest.rating} readOnly />
                        </TableCell>
                        <TableCell>
                           {format(quest.completionDate, "MMM dd, yyyy")}
                        </TableCell>
                        <TableCell>
                           {quest.score}
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </TableContainer>
         <TablePagination
            rowsPerPageOptions={[5, 10, 15, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
         // style={{ maxWidth: "40vw" }}
         />
      </>
   )
}
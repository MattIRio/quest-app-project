import {
    Chip,
    Rating,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material";
import {format} from "date-fns";
import React, {useState} from "react";

export default function CompletedQuests({data})
{
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    return (
        <>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Quest Name</TableCell>
                        <TableCell>Rating</TableCell>
                        <TableCell>Tags</TableCell>
                        <TableCell>Completion Date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((quest, index) => (
                            <TableRow key={index}>
                                <TableCell>{quest.name}</TableCell>
                                <TableCell>
                                    <Rating value={quest.rating} readOnly />
                                </TableCell>
                                <TableCell>
                                    {quest.tags.map((tag) => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            size="small"
                                            sx={{ mr: 0.5 }}
                                        />
                                    ))}
                                </TableCell>
                                <TableCell>
                                    {format(quest.completionDate, "MMM dd, yyyy")}
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
    />
        </>
    )
}
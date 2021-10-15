import React, { useState } from "react";
//next
import { useRouter } from "next/router";
//mui
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
///interfaces
import { IPostResponse } from "../interfaces";

interface Props {
  posts: Array<IPostResponse>;
}

interface Column {
  id: "title" | "body" | "userId" | "id";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: Column[] = [
  { id: "title", label: "Title" },
  { id: "body", label: "Body" },
  {
    id: "userId",
    label: "UserId",
    align: "right",
  },
  {
    id: "id",
    label: "Id",
    align: "right",
  },
];

const PostTable = ({ posts: rows }: Props) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);

  const router = useRouter();

  const handleGetSpecificPost = (id: number) => {
    router.push(`/post/${id}`);
  };

  const handleGetSpecificFakePost = (id: number) => {
    router.push(`/fakePost/${id}`);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={2}>
                Post
              </TableCell>
              <TableCell align="center" colSpan={3}>
                Post details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ top: 57, minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={row.id}
                  sx={{ cursor: "pointer" }}
                  onClick={() => (row.fake ? handleGetSpecificFakePost(row.id) : handleGetSpecificPost(row.id))}
                >
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === "number" ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default PostTable;

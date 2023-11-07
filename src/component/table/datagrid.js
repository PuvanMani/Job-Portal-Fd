import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';



export default function MyDataGrid({ rows, columns, id }) {
    return (
        <Box >
            <DataGrid
                sx={{
                    '& .MuiDataGrid-columnHeader': {
                        background: "#f0f0f0",
                        color: "black",
                        fontWeight: 700,
                    },
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                }}
                rows={rows}
                columns={columns}
                getRowId={(row) => row[id]}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 5,
                        },
                    },
                }}
                pageSizeOptions={[5]}

                disableRowSelectionOnClick
            />
        </Box>
    );
}
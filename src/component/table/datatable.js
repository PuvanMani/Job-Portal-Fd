import React, { useEffect } from 'react'

function Datatable({ rows, columns, EditFunc, DeleteFunct, id, applyButton }) {

    return (
        <div class="table-responsive" style={{ backgroundColor: "#FFF", padding: "20px", borderRadius: "12px", boxShadow: "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em", marginTop: "20px" }}>
            <table class="table table-hover table-nowrap">
                <thead class="table-light">
                    <tr>
                        {
                            columns.map(val => {
                                return (<th scope="col" style={{ fontWeight: "700" }}>{val.headerName}</th>)
                            })
                        }
                        <th scope="col" style={{ fontWeight: "700" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (columns.length > 0 && rows.length > 0) && rows.map((row, ind) => {
                            return (
                                (<tr>
                                    {columns.map(col => {
                                        return (<td><span>{row[col.field]}</span></td>)
                                    })}
                                    {
                                        applyButton ? (<td>
                                            <button style={{ padding: "5px 10px", marginRight: "10px" }} className='btn btn-primary' onClick={() => alert("Job Has Applied Succesfully")}>Apply</button>
                                        </td>) : (
                                            <td>
                                                <button style={{ padding: "5px 10px", marginRight: "10px" }} className='btn btn-primary' onClick={() => EditFunc(row[id])}>Edit</button>
                                                <button style={{ padding: "5px 10px" }} className='btn btn-danger' onClick={() => DeleteFunct(row[id])}>Delete</button>
                                            </td>)
                                    }
                                </tr>)

                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Datatable;

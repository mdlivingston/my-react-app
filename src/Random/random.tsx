import { Box } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
export interface RandomProps
{
    name: string;
}

export interface RandomState
{
    isLoading: boolean;
    rows: any;
}


function createData(name: string, calories: number, fat: number, carbs: number, protein: number)
{
    return { name, calories, fat, carbs, protein };
}



const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];






class Random extends React.Component<RandomProps, RandomState> {
    state = { isLoading: false, rows: rows };

    render()
    {
        return (
            <React.Fragment>
                <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} m={10}>
                    <TableContainer style={{ width: '850px' }} component={Paper}>
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Dessert (100g serving)</TableCell>
                                    <TableCell align="right">Calories</TableCell>
                                    <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                    <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                    <TableCell align="right">Protein&nbsp;(g)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row: any, i: number) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.calories}</TableCell>
                                        <TableCell align="right">{row.fat}</TableCell>
                                        <TableCell align="right">{row.carbs}</TableCell>
                                        <TableCell align="right">{row.protein}</TableCell>
                                        <TableCell onClick={() => this.removeItem(i)} align="right">
                                            Delete
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </React.Fragment>
        );
    }

    removeItem(i: number) 
    {
        rows.splice(i, 1);
        this.setState({ rows: rows, isLoading: false })
    }

}

export default Random;
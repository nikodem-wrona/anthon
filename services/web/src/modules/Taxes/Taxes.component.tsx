import { Box, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';

import { Tax } from '../../types.ts';

type TaxesComponentProps = {
  taxes: Tax[];
  onDeleteTaxButtonClick: (taxId: string) => void;
};

export const TaxesComponent = ({
  taxes,
  onDeleteTaxButtonClick,
}: TaxesComponentProps) => {
  console.log(taxes);
  return (
    <Box sx={{ padding: '2rem' }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Amount</TableCell>
              <TableCell align="right">Currency</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Created at</TableCell>
              <TableCell align="right">Transferred at</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {taxes.map((tax) => (
              <TableRow
                key={tax._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {tax.amount}
                </TableCell>
                <TableCell align="right">{tax.currency}</TableCell>
                <TableCell align="right">{tax.type}</TableCell>
                <TableCell align="right">{tax.createdAt.toString()}</TableCell>
                <TableCell align="right">
                  {tax.transferredAt.toString()}
                </TableCell>
                <TableCell align={'right'}>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: '1rem',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button
                      variant={'outlined'}
                      color={'error'}
                      onClick={() => onDeleteTaxButtonClick(tax._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to={'/taxes/add'}>
        <Button variant="contained" color="primary">
          Add Tax
        </Button>
      </Link>
    </Box>
  );
};

import { useEffect, useState } from "react";
import type { InventoryOperationDTO } from "../../types/inventoryTypes";
import { getInventoryOperations } from "../../services/inventoryService";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { formatDate } from "../../utils/helpers";


const InventoryList: React.FC = () => {
  const [operations, setOperations] = useState<InventoryOperationDTO[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchOperations = async () => {
      try {
        const data = await getInventoryOperations();
        setOperations(data);
      } catch (error) {
        console.error('Error fetching inventory operations:', error);
      }
    };
    fetchOperations();
  }, []);
 

  const filteredOperations = operations.filter(op =>
    op.product.name.toLowerCase().includes(filter.toLowerCase()) ||
    op.operationType.toLowerCase().includes(filter.toLowerCase()) ||
    op.notes?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Inventory Operations
      </Typography>
      <TextField
        label="Filter operations"
        variant="outlined"
        fullWidth
        margin="normal"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Product</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell>Notes</TableCell>
              <TableCell>Performed By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOperations.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body2" color="textSecondary">
                    No operations found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              filteredOperations.map((op) => (
                <TableRow key={op.id}>
                  <TableCell>{formatDate(op.operationDate)}</TableCell>
                  <TableCell>{op.product.name}</TableCell>
                  <TableCell>
                    <span style={{ 
                      color: op.operationType === 'IN' ? 'green' : 'red',
                      fontWeight: 'bold'
                    }}>
                      {op.operationType}
                    </span>
                  </TableCell>
                  <TableCell align="right">
                    <span style={{ 
                      color: op.quantity > 0 ? 'green' : 'red',
                      fontWeight: 'bold'
                    }}>
                      {op.quantity > 0 ? `+${op.quantity}` : op.quantity}
                    </span>
                  </TableCell>
                  <TableCell>{op.notes}</TableCell>
                  <TableCell>{op.performedBy}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default InventoryList;
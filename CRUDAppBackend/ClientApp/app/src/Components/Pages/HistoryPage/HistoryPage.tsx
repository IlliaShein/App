import { createContext, useEffect, useState } from "react";
import { Transaction } from "../../../Interfaces/Transaction";
import * as Api from '../../../APIs/HistoryApi';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { format, parseISO } from 'date-fns';
import TransactionsTableActionButtons from "./TransactionsTableActionButtons";
import React from "react";

interface GetTransactionsContextProps {
  updateTransactions: () => Promise<void>;
  transactions: Transaction[];
}

export const GetTransactionsContext = createContext<GetTransactionsContextProps | undefined>(undefined);

function HistoryPage() {
  const [transactions, setTransacrions] = useState<Transaction[]>([]);

  useEffect(() => {
    updateTransactions();
  }, []);

  const updateTransactions = async () => {
    const transactions = await Api.getTransactions();
    setTransacrions(transactions);
  };

  return (
    <GetTransactionsContext.Provider value={{ transactions, updateTransactions }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Transaction ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Participants Count</TableCell>
              <TableCell>Currency</TableCell>
              <TableCell>Dollar</TableCell>
              <TableCell>Hryvnia</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction: Transaction) => (
              <TableRow>
                <TableCell>{transaction.id}</TableCell>
                <TableCell> {format(parseISO(transaction.creationTime.toString()), 'MM/dd/yyyy HH:mm')}</TableCell>
                <TableCell>{transaction.participantsCount}</TableCell>
                <TableCell>
                        {transaction.dollarsSum && transaction.dollarsSum !== 0
                            ? (transaction.hryvniaSum / transaction.dollarsSum).toFixed(2)
                            : '-'}
                    </TableCell>
                <TableCell>{transaction.dollarsSum}</TableCell>
                <TableCell>{transaction.hryvniaSum}</TableCell>
                <TableCell>
                  <TransactionsTableActionButtons transaction={transaction} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </GetTransactionsContext.Provider>
  );
}

export default HistoryPage;

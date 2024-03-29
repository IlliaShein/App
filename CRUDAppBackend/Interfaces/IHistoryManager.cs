﻿using CRUDAppBackend.DTOs;

namespace CRUDAppBackend.Interfaces
{
    public interface IHistoryManager
    {
        Task<List<TransactionDTO>> GetTransactions();
        Task<TransactionDTO> GetTransactionById(int id); 
        Task<List<PersonPaymentDTO>> GetPersonPaymentsByTransactionId(int id);
        Task DeleteTransaction(int id);
        Task CreateTransaction(PersonPaymentDTO[] payments);
    }
}

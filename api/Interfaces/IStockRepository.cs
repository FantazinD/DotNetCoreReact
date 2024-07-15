using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs.Stock;
using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface IStockRepository
    {
        Task<List<Stock>> GetAllAsync(QueryObject query);
        Task<Stock?> GetByIdAsync(int stockId);
        Task<Stock?> GetBySymbolAsync(string stockSymbol);
        Task<Stock> CreateAsync(Stock stockModel);
        Task<Stock?> UpdateAsync(int stockId, UpdateStockRequestDTO stockDTO);
        Task<Stock?> DeleteAsync(int stockId);
        Task<bool> StockExists(int stockId);
    }
}
using api.Data;
using api.DTOs.Stock;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class StockRepository(ApplicationDBContext context) : IStockRepository
    {
        private readonly ApplicationDBContext _context = context;

        public async Task<Stock> CreateAsync(Stock stockModel)
        {
            await _context.Stocks.AddAsync(stockModel);
            await _context.SaveChangesAsync();

            return stockModel;
        }

        public async Task<Stock?> DeleteAsync(int stockId)
        {
            var stockModel = await _context.Stocks.FirstOrDefaultAsync(stock => stock.Id == stockId);
            
            if(stockModel == null)
            {
                return null;
            }

            _context.Stocks.Remove(stockModel);
            await _context.SaveChangesAsync();
            return stockModel;
        }

        public async Task<Stock?> GetByIdAsync(int stockId)
        {
            return await _context.Stocks.Include(stock => stock.Comments).FirstOrDefaultAsync(stock => stock.Id == stockId);
        }

        public async Task<List<Stock>> GetAllAsync(QueryObject query)
        {
            var stocks = _context.Stocks.Include(stock => stock.Comments).ThenInclude(stock => stock.AppUser).AsQueryable();

            if(!string.IsNullOrWhiteSpace(query.CompanyName))
            {
                stocks = stocks.Where(stock => stock.CompanyName.Contains(query.CompanyName));
            }

            if(!string.IsNullOrWhiteSpace(query.Symbol))
            {
                stocks = stocks.Where(stock => stock.Symbol.Contains(query.Symbol));
            }
            
            if(!string.IsNullOrWhiteSpace(query.SortBy))
            {
                if(query.SortBy.Equals("Symbol", StringComparison.OrdinalIgnoreCase))
                {
                    stocks = query.IsDescending ? stocks.OrderByDescending(stock => stock.Symbol) : stocks.OrderBy(stock => stock.Symbol);
                }
            }

            var skipNumber = (query.PageNumber - 1) * query.PageSize;

            return await stocks.Skip(skipNumber).Take(query.PageSize).ToListAsync();
        }

        public async Task<Stock?> UpdateAsync(int stockId, UpdateStockRequestDTO stockDTO)
        {
            var stockModel = await _context.Stocks.FirstOrDefaultAsync(stock => stock.Id == stockId);

            if(stockModel == null)
            {
                return null;
            }

            stockModel.Symbol = stockDTO.Symbol;
            stockModel.CompanyName = stockDTO.CompanyName;
            stockModel.Purchase = stockDTO.Purchase;
            stockModel.LastDiv = stockDTO.LastDiv;
            stockModel.Industry = stockDTO.Industry;
            stockModel.MarketCap = stockDTO.MarketCap;

            await _context.SaveChangesAsync();

            return stockModel;
        }

        public Task<bool> StockExists(int stockId)
        {
            return _context.Stocks.AnyAsync(stock => stock.Id == stockId);
        }

        public async Task<Stock?> GetBySymbolAsync(string stockSymbol)
        {
            return await _context.Stocks.Include(stock => stock.Comments).FirstOrDefaultAsync(stock => stock.Symbol == stockSymbol);
        }
    }
}
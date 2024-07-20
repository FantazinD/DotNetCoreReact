using api.DTOs.Stock;
using api.Models;

namespace api.Mappers
{
    public static class StockMapper
    {
        public static StockDTO ToStockDTO(this Stock stockModel)
        {
            return new StockDTO
            {
                Id = stockModel.Id,
                Symbol = stockModel.Symbol,
                CompanyName = stockModel.CompanyName,
                Purchase = stockModel.Purchase,
                LastDiv = stockModel.LastDiv,
                Industry = stockModel.Industry,
                MarketCap = stockModel.MarketCap,
                Comments = stockModel.Comments.Select(comment => comment.ToCommentDTO()).ToList()
            };
        }

        public static Stock ToStockFromCreateDTO(this CreateStockRequestDTO stockDTO)
        {
            return new Stock
            {
                Symbol = stockDTO.Symbol,
                CompanyName = stockDTO.CompanyName,
                Purchase = stockDTO.Purchase,
                LastDiv = stockDTO.LastDiv,
                Industry = stockDTO.Industry,
                MarketCap = stockDTO.MarketCap
            };
        }

        public static Stock ToStockFromFMPDTO(this FMPStockDTO fmpStockDTO)
        {
            return new Stock
            {
                Symbol = fmpStockDTO.symbol,
                CompanyName = fmpStockDTO.companyName,
                Purchase = (decimal)fmpStockDTO.price,
                LastDiv = (decimal)fmpStockDTO.lastDiv,
                Industry = fmpStockDTO.industry,
                MarketCap = (long)fmpStockDTO.mktCap
            };
        }
    }
}
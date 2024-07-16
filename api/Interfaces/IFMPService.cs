using api.Models;

namespace api.Interfaces
{
    //FMP = Financial Modeling Prep
    public interface IFMPService
    {
        Task<Stock> FindStockBySymbolAsync(string stockSymbol);
    }
}
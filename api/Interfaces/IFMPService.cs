using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Interfaces
{
    //FMP = Financial Modeling Prep
    public interface IFMPService
    {
        Task<Stock> FindStockBySymbolAsync(string stockSymbol);
    }
}
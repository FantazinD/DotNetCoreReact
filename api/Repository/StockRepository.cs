using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using api.Models;

namespace api.Repository
{
    public class StockRepository : IStockRepository
    {
        public Task<List<Stock>> GettAllAsync()
        {
            throw new NotImplementedException();
        }
    }
}
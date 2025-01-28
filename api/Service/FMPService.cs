using api.DTOs.Stock;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Newtonsoft.Json;

namespace api.Service
{
    public class FMPService(HttpClient httpClient, IConfiguration config) : IFMPService
    {
        private readonly HttpClient _httpClient = httpClient;
        private readonly IConfiguration _config = config;
        public async Task<Stock> FindStockBySymbolAsync(string stockSymbol)
        {
            try
            {
                var result = await _httpClient.GetAsync($"https://financialmodelingprep.com/api/v3/profile/{stockSymbol}?apikey={_config["FMPKey"]}");

                if(result.IsSuccessStatusCode)
                {
                    var content = await result.Content.ReadAsStringAsync();
                    var tasks = JsonConvert.DeserializeObject<FMPStockDTO[]>(content);
                    var stock = tasks[0];

                    if(stock != null)
                    {
                        return stock.ToStockFromFMPDTO();
                    }
                    return null;
                }
                return null;
            }
            catch(Exception e)
            {
                Console.WriteLine(e);
                return null;
            }
        }
    }
}
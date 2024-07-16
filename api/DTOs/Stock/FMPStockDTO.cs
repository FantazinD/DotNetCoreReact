namespace api.DTOs.Stock
{
    public class FMPStockDTO
    {
        public string symbol { get; set; } = string.Empty;
        public double price { get; set; }
        public double beta { get; set; }
        public int volAvg { get; set; }
        public long mktCap { get; set; }
        public double lastDiv { get; set; }
        public string range { get; set; } = string.Empty;
        public double changes { get; set; }
        public string companyName { get; set; } = string.Empty;
        public string currency { get; set; } = string.Empty;
        public string cik { get; set; } = string.Empty;
        public string isin { get; set; } = string.Empty;
        public string cusip { get; set; } = string.Empty;
        public string exchange { get; set; } = string.Empty;
        public string exchangeShortName { get; set; } = string.Empty;
        public string industry { get; set; } = string.Empty;
        public string website { get; set; } = string.Empty;
        public string description { get; set; } = string.Empty;
        public string ceo { get; set; } = string.Empty;
        public string sector { get; set; } = string.Empty;
        public string country { get; set; } = string.Empty;
        public string fullTimeEmployees { get; set; } = string.Empty;
        public string phone { get; set; } = string.Empty;
        public string address { get; set; } = string.Empty;
        public string city { get; set; } = string.Empty;
        public string state { get; set; } = string.Empty;
        public string zip { get; set; } = string.Empty;
        public double dcfDiff { get; set; }
        public double dcf { get; set; }
        public string image { get; set; } = string.Empty;
        public string ipoDate { get; set; } = string.Empty;
        public bool defaultImage { get; set; }
        public bool isEtf { get; set; }
        public bool isActivelyTrading { get; set; }
        public bool isAdr { get; set; }
        public bool isFund { get; set; }
    }
}
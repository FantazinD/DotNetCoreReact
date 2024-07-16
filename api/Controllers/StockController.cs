using api.DTOs.Stock;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/stock")]
    [ApiController]
    public class StockController(IStockRepository stockRepository) : ControllerBase
    {
        private readonly IStockRepository _stockRepository = stockRepository;

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] QueryObject query)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var stockModels = await _stockRepository.GetAllAsync(query);
            var stockDTO = stockModels.Select(stockModel => stockModel.ToStockDTO()).ToList();

            return Ok(stockDTO);
        }

        [HttpGet("{stockId:int}")]
        public async Task<IActionResult> GetById([FromRoute] int stockId)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var stockModel = await _stockRepository.GetByIdAsync(stockId);

            if(stockModel == null){
                return NotFound();
            }

            return Ok(stockModel.ToStockDTO());
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateStockRequestDTO stockDTO)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var stockModel = stockDTO.ToStockFromCreateDTO();
            
            await _stockRepository.CreateAsync(stockModel);

            return CreatedAtAction(nameof(GetById), new { id = stockModel.Id }, stockModel.ToStockDTO());
        }

        [HttpPut("{stockId:int}")]
        public async Task<IActionResult> Update([FromRoute] int stockId, [FromBody] UpdateStockRequestDTO updateDTO)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var stockModel = await _stockRepository.UpdateAsync(stockId, updateDTO);

            if(stockModel == null)
            {
                return NotFound();
            }

            return Ok(stockModel.ToStockDTO());
        }

        [HttpDelete("{stockId:int}")]
        public async Task<IActionResult> Delete([FromRoute] int stockId)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var stockModel = await _stockRepository.DeleteAsync(stockId);

            if(stockModel == null)
            {
                return NotFound("Stock not found.");
            }

            return NoContent();
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTOs.Comment;
using api.Interfaces;
using api.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController(ICommentRepository commentRepository, IStockRepository stockRepository) : ControllerBase
    {
        private readonly ICommentRepository _commentRepository = commentRepository;
        private readonly IStockRepository _stockRepository = stockRepository;

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var commentModels = await _commentRepository.GetAllAsync();
            var commentDTO = commentModels.Select(commentModel => commentModel.ToCommentDTO());

            return Ok(commentModels);
        }

        [HttpGet("{commentId:int}")]
        public async Task<IActionResult> GetById([FromRoute] int commentId)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var commentModel = await _commentRepository.GetByIdAsync(commentId);

            if(commentModel == null){
                return NotFound();
            }

            return Ok(commentModel.ToCommentDTO());
        }

        [HttpPost("{stockId:int}")]
        public async Task<IActionResult> Create([FromRoute] int stockId, CreateCommentRequestDTO commentDTO)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            if(!await _stockRepository.StockExists(stockId)){
                return BadRequest("Stock does not exist.");
            }
            
            var commentModel = commentDTO.ToCommentFromCreateDTO(stockId);
            await _commentRepository.CreateAsync(commentModel);

            return CreatedAtAction(nameof(GetById), new { id = commentModel }, commentModel.ToCommentDTO());
        }

        [HttpPut("{commentId:int}")]
        public async Task<IActionResult> Update([FromRoute] int commentId, [FromBody] UpdateCommentRequestDTO updateDTO)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var commentModel = await _commentRepository.UpdateAsync(commentId, updateDTO.ToCommentFromUpdateDTO(commentId));

            if (commentModel == null)
            {
                return NotFound("Comment not found.");
            }

            return Ok(commentModel.ToCommentDTO());
        }

        [HttpDelete("{commentId:int}")]
        public async Task<IActionResult> Delete([FromRoute] int commentId)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var commentModel = await _commentRepository.DeleteAsync(commentId);

            if(commentModel == null)
            {
                return NotFound("Comment does not exist.");
            }

            return NoContent();
        }
    }
}
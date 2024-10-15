using api.DTOs.Comment;
using api.Extensions;
using api.Helpers;
using api.Interfaces;
using api.Mappers;
using api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [Route("api/comment")]
    [ApiController]
    public class CommentController(ICommentRepository commentRepository, IStockRepository stockRepository, UserManager<AppUser> userManager, IFMPService fmpService) : ControllerBase
    {
        private readonly ICommentRepository _commentRepository = commentRepository;
        private readonly IStockRepository _stockRepository = stockRepository;
        private readonly UserManager<AppUser> _userManager = userManager;
        private readonly IFMPService _fmpService = fmpService;

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetAll([FromQuery] CommentQueryObject queryObject)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var commentModels = await _commentRepository.GetAllAsync(queryObject);
            var commentDTO = commentModels.Select(commentModel => commentModel.ToCommentDTO());

            return Ok(commentModels);
        }

        [HttpGet("{commentId:int}")]
        [Authorize]
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

        [HttpPost("{stockSymbol:alpha}")]
        [Authorize]
        public async Task<IActionResult> Create([FromRoute] string stockSymbol, CreateCommentRequestDTO commentDTO)
        {
            if(!ModelState.IsValid)
                return BadRequest(ModelState);

            var stock = await _stockRepository.GetBySymbolAsync(stockSymbol);

            if(stock == null)
            {
                stock = await _fmpService.FindStockBySymbolAsync(stockSymbol);

                if(stock == null)
                {
                    return BadRequest("Stock does not exist.");
                }
                else
                {
                    await _stockRepository.CreateAsync(stock);
                }
            }
            
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);
            
            var commentModel = commentDTO.ToCommentFromCreateDTO(stock.Id);
            commentModel.AppUserId = appUser.Id;

            await _commentRepository.CreateAsync(commentModel);

            var hehe = nameof(GetById);
            hehe.AsQueryable();

            return CreatedAtAction(nameof(GetById), new { commentId = commentModel.Id }, commentModel.ToCommentDTO());
        }

        [HttpPut("{commentId:int}")]
        [Authorize]
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
        [Authorize]
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
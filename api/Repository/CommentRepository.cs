using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Helpers;
using api.Interfaces;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Repository
{
    public class CommentRepository(ApplicationDBContext context) : ICommentRepository
    {
        private readonly ApplicationDBContext _context = context;

        public async Task<Comment> CreateAsync(Comment commentModel)
        {
            await _context.Comments.AddAsync(commentModel);
            await _context.SaveChangesAsync();

            return commentModel;
        }

        public async Task<Comment?> DeleteAsync(int commentId)
        {
            var commentModel = await _context.Comments.FirstOrDefaultAsync(comment => comment.Id == commentId);

            if(commentModel == null){
                return null;
            }

            _context.Comments.Remove(commentModel);
            await _context.SaveChangesAsync();

            return commentModel;
        }

        public async Task<List<Comment>> GetAllAsync(CommentQueryObject queryObject)
        {
            var comments = _context.Comments
                .Include(comment => comment.AppUser)
                .AsQueryable();

            if(!string.IsNullOrWhiteSpace(queryObject.Symbol))
            {
                comments = comments.Where(s => s.Stock.Symbol == queryObject.Symbol);
            };

            if(queryObject.IsDescending)
            {
                comments = comments.OrderByDescending(c => c.CreatedOn);
            }
            
            return await comments.ToListAsync();
        }

        public async Task<Comment?> GetByIdAsync(int commentId)
        {
            return await _context.Comments.Include(comment => comment.AppUser).FirstOrDefaultAsync(comment => comment.Id == commentId);
        }

        public async Task<Comment?> UpdateAsync(int commentId, Comment commentModel)
        {
            var existingComment = await _context.Comments.FindAsync(commentId);

            if (existingComment == null)
            {
                return null;
            }

            existingComment.Title = commentModel.Title;
            existingComment.Content = commentModel.Content;

            await _context.SaveChangesAsync();

            return existingComment;
        }
    }
}
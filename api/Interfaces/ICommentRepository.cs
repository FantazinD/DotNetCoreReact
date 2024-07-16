using api.Helpers;
using api.Models;

namespace api.Interfaces
{
    public interface ICommentRepository
    {
        Task<List<Comment>> GetAllAsync(CommentQueryObject queryObject);
        Task<Comment?> GetByIdAsync(int commentId);
        Task<Comment> CreateAsync(Comment commentModel);
        Task<Comment?> DeleteAsync(int commentId);
        Task<Comment?> UpdateAsync(int commentId, Comment commentModel);
    }
}
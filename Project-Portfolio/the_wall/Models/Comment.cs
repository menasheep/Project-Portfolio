using System;

// Set up model attributes and relationships (make sure to match convention if using EF -- Model syntax must match db table syntax exactly for data mapping to work)



namespace Wall.Models
{
    public class Comment : BaseEntity
    {
        public int CommentId { get; set; }
        public string Content { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int MessageId { get; set; }
        public Message Message { get; set; }
    
        public Comment(){
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
        }
    }
}
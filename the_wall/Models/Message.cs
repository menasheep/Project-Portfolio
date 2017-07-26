using System;
using System.Collections.Generic;

// Set up model attributes and relationships (make sure to match convention if using EF -- Model syntax must match db table syntax exactly for data mapping to work)



namespace Wall.Models
{
    public class Message : BaseEntity
    {
        public int MessageId { get; set; }
        public string Content { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public List<Comment> Comments { get; set; }

        public Message() //constructor fx
        {
            Comments = new List<Comment>();
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
        }
    }
}
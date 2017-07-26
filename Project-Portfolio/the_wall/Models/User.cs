using System;
using System.Collections.Generic;

// Set up model attributes and relationships (make sure to match convention if using EF -- Model syntax must match db table syntax exactly for data mapping to work)



namespace Wall.Models
{
    public class User : BaseEntity
    {
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<Message> Messages { get; set; }
        public List<Comment> Comments { get; set; }

        public User()
        {
            Messages = new List<Message>();
            Comments = new List<Comment>();
            CreatedAt = DateTime.Now;
            UpdatedAt = DateTime.Now;
        }
    }
}



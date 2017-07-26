using System;
using Microsoft.EntityFrameworkCore;


// Context grabs the entire Model class, and subsequent lambda functions allow you to query the db tables for specific class attributes/fields


namespace Wall.Models
{
    public class WallContext : DbContext
    {
        // base() calls the parent class' constructor passing the "options" parameter along
        public WallContext(DbContextOptions<WallContext> options) : base(options) { }
        
        public DbSet<User> Users { get; set; } // DbSet<object type> table_name { get;set;}

        public DbSet<Message> Messages { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}


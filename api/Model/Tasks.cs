using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace api.Models
{
    public class Task
    {
        public int id { get; set; }
        [Required]
        public string Title { get; set; }
        public Boolean Completed { get; set; }
    }

    public class TaskContext : DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options) : base(options)
        {
        }


        public DbSet<Task> Tasks { get; set; }
    }


}

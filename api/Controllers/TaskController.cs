using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ApiTask = api.Models.Task;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskContext _context;

        public TaskController(TaskContext context)
        {
            _context = context;

            // if (_context.Tasks.Count() == 0)
            // {
            //     _context.Tasks.Add(new ApiTask { Title = "Salut" });
            //     _context.Tasks.Add(new ApiTask { Title = "les gens" });
            //     _context.SaveChanges();
            // }
        }

        // GET api/Task
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ApiTask>>> GetTaskItems()
        {
            string con = _context.Database.GetDbConnection().ConnectionString;
            return await _context.Tasks.ToListAsync();
        }

        // GET api/Task/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ApiTask>> GetTaskItem(long id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<ApiTask>> PostTaskItem(ApiTask task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTaskItem", new { id = task.id }, task);
        }

        // PUT: api/Task/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTaskItem(long id, ApiTask task)
        {
            if (id != task.id)
            {
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Task/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskItem(long id)
        {
            var todoItem = await _context.Tasks.FindAsync(id);
            if (todoItem == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(todoItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

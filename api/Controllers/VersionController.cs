using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class VersionController : ControllerBase
    {
        private readonly TaskContext _context;

        public VersionController(TaskContext context)
        {
            _context = context;
        }

        // GET api/Task
        [HttpGet]
        public ActionResult<string> GetVersion()
        {
            return _context.Database.GetDbConnection().ConnectionString;
        }

    }
}

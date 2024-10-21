using Microsoft.AspNetCore.Mvc;
using EcoAquatic.Data;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace EcoAquatic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DatabaseTestController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DatabaseTestController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetTestEntities()
        {
            var entities = await _context.TestEntities.ToListAsync();
            return Ok(entities);
        }

        // New POST method to add test data
       [HttpPost]
        public async Task<IActionResult> AddTestEntity([FromBody] TestEntity entity) // Add [FromBody] to accept JSON
        {
            if (entity == null)
            {
                return BadRequest("Invalid data.");
            }

            _context.TestEntities.Add(entity);
            await _context.SaveChangesAsync();
            return Ok(entity);
        }
            }
}

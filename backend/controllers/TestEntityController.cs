using Microsoft.AspNetCore.Mvc;
using EcoAquatic.Data;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace EcoAquatic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestEntityController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TestEntityController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/testentity - Insert new TestEntity
        [HttpPost]
        public async Task<IActionResult> AddTestEntity([FromBody] TestEntity entity)
        {
                if (entity == null || string.IsNullOrEmpty(entity.Name))
                {
                    return BadRequest("Invalid data. Entity name is required.");
                }

                try
                {
                    _context.TestEntities.Add(entity);  
                    await _context.SaveChangesAsync();  
                    return Ok(entity); 
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Internal server error: {ex.Message}");
                }
        }

        // GET: api/testentity - Fetch all TestEntity data
        [HttpGet]
        public async Task<IActionResult> GetAllTestEntities()
        {
            var entities = await _context.TestEntities.ToListAsync();
            return Ok(entities);
        }
    }
}

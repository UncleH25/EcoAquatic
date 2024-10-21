using Microsoft.AspNetCore.Mvc;

namespace EcoAquatic.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ConnectionController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetConnectionStatus()
        {
            // Return a simple message confirming the connection
            return Ok("Connection between backend and frontend successful!");
        }
    }
}
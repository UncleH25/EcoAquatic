using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using EcoAquatic.Models;

[ApiController]
[Route("api/[controller]")]
public class SpeciesController : ControllerBase
{
    private readonly ApiService _apiService;
    private readonly SpeciesService _speciesService;

    public SpeciesController(ApiService apiService, SpeciesService speciesService)
    {
        _apiService = apiService;
        _speciesService = speciesService;
    }

    [HttpGet]
    public async Task<ActionResult<List<SpeciesModel>>> GetSpecies()
    {
        try
        {
            var speciesList = await Task.Run(() => _apiService.ReadSpeciesFromCsv());
            return Ok(speciesList);
        }
        catch (FileNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred while processing your request.", error = ex.Message });
        }
    }

    [HttpPost("import")]
    public async Task<IActionResult> ImportSpecies()
    {
        try
        {
            await _speciesService.ImportFishSpeciesFromCsv();
            return Ok(new { message = "Import successful." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred during import.", error = ex.Message });
        }
    }
}
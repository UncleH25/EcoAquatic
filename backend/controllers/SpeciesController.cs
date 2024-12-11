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

    //Read FishBase CSV
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

    // Import from modified_species_fishbase.csv
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

    // OBIS API GET
    // Endpoint to get occurrence data
    [HttpGet("obis/occurrence")]
    public async Task<IActionResult> GetOccurrenceData(
        string scientificName = null, string taxonId = null, string datasetId = null,
        string startDate = null, string endDate = null, int? startDepth = null, int? endDepth = null,
        string geometry = null, int? size = null, int? offset = null)
    {
        var result = await _speciesService.GetOccurrenceData(scientificName, taxonId, datasetId, startDate, endDate, startDepth, endDepth, geometry, size, offset);
        return Ok(result);
    }

    // Endpoint to get gridded occurrences
    [HttpGet("obis/occurrence/grid")]
    public async Task<IActionResult> GetGriddedOccurrences(
        string precision, string geometry, string redlist = null, string hab = null, string wrims = null)
    {
        var result = await _speciesService.GetGriddedOccurrences(precision, geometry, redlist, hab, wrims);
        return Ok(result);
    }

    // Endpoint to get datasets
    [HttpGet("obis/dataset")]
    public async Task<IActionResult> GetDatasets(string nodeId = null, string modifiedSince = null)
    {
        var result = await _speciesService.GetDatasets(nodeId, modifiedSince);
        return Ok(result);
    }

    // Endpoint to get taxonomy
    [HttpGet("obis/taxon")]
    public async Task<IActionResult> GetTaxonomy(string scientificName, string rank = null)
    {
        var result = await _speciesService.GetTaxonomy(scientificName, rank);
        return Ok(result);
    }

    // Endpoint to get OBIS nodes
    [HttpGet("obis/node")]
    public async Task<IActionResult> GetNodes()
    {
        var result = await _speciesService.GetNodes();
        return Ok(result);
    }

    // Endpoint to get statistics
    [HttpGet("obis/statistics")]
    public async Task<IActionResult> GetStatistics(string scientificName = null, string geometry = null, 
        string startDate = null, string endDate = null)
    {
        var result = await _speciesService.GetStatistics(scientificName, geometry, startDate, endDate);
        return Ok(result);
    }
}
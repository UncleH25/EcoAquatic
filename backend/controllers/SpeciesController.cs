using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using EcoAquatic.Models;

[ApiController]
[Route("api/[controller]")]
public class SpeciesController : ControllerBase
{
    private readonly ApiService_FB _apiServiceFB;
    private readonly SpeciesService_FB _speciesServiceFB;
    private readonly ApiService_OBIS _apiServiceOBIS;
    private readonly SpeciesService_OBIS _speciesServiceOBIS;

    public SpeciesController(ApiService_FB apiServiceFB, SpeciesService_FB speciesServiceFB, ApiService_OBIS apiServiceOBIS, SpeciesService_OBIS speciesServiceOBIS)
    {
        _apiServiceFB = apiServiceFB;
        _speciesServiceFB = speciesServiceFB;
        _apiServiceOBIS = apiServiceOBIS;
        _speciesServiceOBIS = speciesServiceOBIS;
    }

    //Read FishBase CSV
    [HttpGet]
    public async Task<ActionResult<List<SpeciesModel>>> GetSpecies()
    {
        try
        {
            var speciesList = await Task.Run(() => _apiServiceFB.ReadSpeciesFromCsv());
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
            await _speciesServiceFB.ImportFishSpeciesFromCsv();
            return Ok(new { message = "Import successful." });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "An error occurred during import.", error = ex.Message });
        }
    }

    // OBIS API GET
    // Endpoint to get occurrence data
    // GET occurrence data
    [HttpGet("occurrences")]
    public async Task<IActionResult> GetOccurrenceData(
        string scientificName = null,
        string taxonId = null,
        string datasetId = null,
        string startDate = null,
        string endDate = null,
        int? startDepth = null,
        int? endDepth = null,
        string geometry = null,
        int? size = null,
        int? offset = null)
    {
        await _speciesServiceOBIS.SaveOccurrenceDataToCsv(
            scientificName,
            taxonId,
            datasetId,
            startDate,
            endDate,
            startDepth,
            endDepth,
            geometry,
            size,
            offset);

        return Ok("Occurrence data saved to CSV");
    }

    [HttpGet("gridded-occurrences")]
    public async Task<IActionResult> GetGriddedOccurrences(
        string precision,
        string geometry,
        string redlist = null,
        string hab = null,
        string wrims = null)
    {
        await _speciesServiceOBIS.SaveGriddedOccurrencesToCsv(
            precision,
            geometry,
            redlist,
            hab,
            wrims);

        return Ok("Gridded occurrences saved to CSV");
    }

    [HttpGet("datasets")]
    public async Task<IActionResult> GetDatasets(
        string nodeId = null,
        string modifiedSince = null)
    {
        await _speciesServiceOBIS.SaveDatasetsToCsv(nodeId, modifiedSince);

        return Ok("Datasets saved to CSV");
    }

    [HttpGet("taxonomy")]
    public async Task<IActionResult> GetTaxonomy(
        string scientificName,
        string rank = null)
    {
        await _speciesServiceOBIS.SaveTaxonomyToCsv(scientificName, rank);

        return Ok("Taxonomy saved to CSV");
    }

    [HttpGet("nodes")]
    public async Task<IActionResult> GetNodes()
    {
        await _speciesServiceOBIS.SaveNodesToCsv();

        return Ok("Nodes saved to CSV");
    }

    [HttpGet("statistics")]
    public async Task<IActionResult> GetStatistics(
        string scientificName = null,
        string geometry = null,
        string startDate = null,
        string endDate = null)
    {
        await _speciesServiceOBIS.SaveStatisticsToCsv(scientificName, geometry, startDate, endDate);

        return Ok("Statistics saved to CSV");
    }
}
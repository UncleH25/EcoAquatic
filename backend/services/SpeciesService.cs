using System.Globalization;
using CsvHelper;
using EcoAquatic.Data;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using EcoAquatic.Models;
using CsvHelper.Configuration;
using System.Text.Json;

public class SpeciesService_FB
{
    private readonly ApiService_FB _apiServiceFB;
    private readonly AppDbContext _dbContext;

    public SpeciesService_FB(ApiService_FB apiServiceFB, AppDbContext dbContext)
    {
        _apiServiceFB = apiServiceFB;
        _dbContext = dbContext;
    }

    public async Task ImportFishSpeciesFromCsv(string fileName = "modified_species_fishbase.csv")
    {
        try
        {
            // Construct the file path using the Documents folder and known structure
            string filePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), 
                "EcoAquatic", "Data", fileName);

            Console.WriteLine($"Looking for CSV file at: {filePath}");

            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException("CSV file not found.", filePath);
            }

            using (var reader = new StreamReader(filePath))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                var records = csv.GetRecords<dynamic>().ToList(); // Use dynamic to read original headers
                var speciesList = new List<SpeciesModel>();

                foreach (var record in records)
                {
                    // Log the properties of the record
                    foreach (var property in (IDictionary<string, object>)record)
                    {
                        Console.WriteLine($"{property.Key}: {property.Value}");
                    }

                    var species = new SpeciesModel
                    {
                        ScientificName = record.ScientificName,
                        CommonName = record.CommonName,
                        Taxonomy = JsonConvert.SerializeObject(record.Taxonomy ?? new { }), //Serialize Taxonomy
                        ConservationStatus = record.ConservationStatus,
                        Threats = JsonConvert.SerializeObject(record.Threats ?? new { }), // Serialize Threats
                        ConservationActions = JsonConvert.SerializeObject(record.ConservationActions ?? new { }), // Serialize ConservationActions
                        NativeStatus = record.NativeStatus,
                        Behaviour = record.Behaviour,
                        EconomicImportance = JsonConvert.SerializeObject(record.EconomicImportance ?? new { }), // Serialize EconomicImportance
                        EcologicalRole = JsonConvert.SerializeObject(record.EcologicalRole ?? new { }), // Serialize EcologicalRole
                        ClimateSensitivity = record.ClimateSensitivity,
                        PopulationTrend = record.PopulationTrend,
                        GeographicalLocation_Continent = record.GeographicalLocation_Continent,
                        GeographicalLocation_Country = record.GeographicalLocation_Country,
                        GeographicalLocation_BodyOfWater = record.GeographicalLocation_BodyOfWater,
                        Habitat = record.Habitat,
                        SubHabitat = record.SubHabitat != null ? record.SubHabitat : null,
                        HabitatCategory = JsonConvert.SerializeObject(record.HabitatCategory ?? new { }),  // Serialize HabitatCategory
                        MigrationPattern = JsonConvert.SerializeObject(record.MigrationPattern ?? new { }), // Serialize MigrationPattern
                        DepthRange = int.TryParse(record.DepthRange?.ToString(), out int depth) ? depth : 0,
                        TemperatureRange = float.TryParse(record.TemperatureRange?.ToString(), out float temp) ? temp : 0f,
                        Distribution = JsonConvert.SerializeObject(record.Distribution ?? new { }),  // Serialize Distribution
                        Endemism = record.Endemism,
                        Diet = record.Diet,
                        Lifespan = record.Lifespan,
                        ImageUrl = record.ImageUrl,
                        Description = record.Description,
                        ObservationDate = record.ObservationDate,
                        SourceApi = record.SourceApi,
                        TaxonomicAuthority = record.TaxonomicAuthority,
                        AverageSize = float.TryParse(record.AverageSize?.ToString(), out float size) ? size : 0f,
                        AverageWeight = float.TryParse(record.AverageWeight?.ToString(), out float weight) ? weight : 0f
                    };

                    speciesList.Add(species);
                }

                // Save the species to the database
                await _dbContext.Species.AddRangeAsync(speciesList);
                await _dbContext.SaveChangesAsync();

                Console.WriteLine($"Imported {speciesList.Count} species from {filePath}.");
            }
        }
        catch (FileNotFoundException ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
            throw; // Rethrow the exception to be handled upstream
        }
        catch (Exception ex)
        {
            Console.WriteLine($"An error occurred while importing species: {ex.Message}");
            throw; // Rethrow the exception to be handled upstream
        }
    }
}

public class SpeciesService_OBIS
{
    private readonly ApiService_OBIS _apiServiceOBIS;
    private readonly string _baseOutputPath;

    public SpeciesService_OBIS(ApiService_OBIS apiServiceOBIS, string baseOutputPath = null)
    {
        _apiServiceOBIS = apiServiceOBIS;
        _baseOutputPath = baseOutputPath ?? Path.Combine(
            Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments),
            "EcoAquatic",
            "ObisData"
        );
        EnsureOutputDirectoryExists();
    }

    public void EnsureOutputDirectoryExists()
    {
        if (!Directory.Exists(_baseOutputPath))
        {
            Directory.CreateDirectory(_baseOutputPath);
        }
    }

    public string GetOutputFilePath(string fileName)
    {
        return Path.Combine(_baseOutputPath, $"{fileName}_{DateTime.Now:yyyyMMdd_HHmmss}.json");
    }

    public async Task SaveToJson(string data, string fileName)
    {
        var filePath = GetOutputFilePath(fileName);
        
        using var writer = new StreamWriter(filePath);
        await writer.WriteAsync(data);
        Console.WriteLine($"Saved data to {filePath}");
    }

    // OBIS API Methods
    public async Task SaveOccurrenceDataToCsv(string scientificName = null, string taxonId = null, 
        string datasetId = null, string startDate = null, string endDate = null, 
        int? startDepth = null, int? endDepth = null, string geometry = null, 
        int? size = null, int? offset = null)
    {
        try
        {
            var jsonResponse = await _apiServiceOBIS.GetOccurrenceDataAsync(scientificName, taxonId, 
                datasetId, startDate, endDate, startDepth, endDepth, geometry, size, offset);
            
            await SaveToJson(jsonResponse, "Occurrences");
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to save occurrence data: {ex.Message}", ex);
        }
    }

    public async Task SaveGriddedOccurrencesToCsv(string precision, string geometry, 
        string redlist = null, string hab = null, string wrims = null)
    {
        try
        {
            var jsonResponse = await _apiServiceOBIS.GetGriddedOccurrencesAsync(precision, geometry, 
                redlist, hab, wrims);
            
            await SaveToJson(jsonResponse, "GriddedOccurrences");
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to save gridded occurrences: {ex.Message}", ex);
        }
    }

    public async Task SaveDatasetsToCsv(string nodeId = null, string modifiedSince = null)
    {
        try
        {
            var jsonResponse = await _apiServiceOBIS.GetDatasetsAsync(nodeId, modifiedSince);
            await SaveToJson(jsonResponse, "Datasets");
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to save datasets: {ex.Message}", ex);
        }
    }

    public async Task SaveTaxonomyToCsv(string scientificName, string rank = null)
    {
        try
        {
            var jsonResponse = await _apiServiceOBIS.GetTaxonomyAsync(scientificName, rank);
            await SaveToJson(jsonResponse, "Taxonomy");
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to save taxonomy: {ex.Message}", ex);
        }
    }

    public async Task SaveNodesToCsv()
    {
        try
        {
            var jsonResponse = await _apiServiceOBIS.GetNodesAsync();
            await SaveToJson(jsonResponse, "Nodes");
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to save nodes: {ex.Message}", ex);
        }
    }

    public async Task SaveStatisticsToCsv(string scientificName = null, string geometry = null, 
        string startDate = null, string endDate = null)
    {
        try
        {
            var jsonResponse = await _apiServiceOBIS.GetStatisticsAsync(scientificName, geometry, 
                startDate, endDate);
            
            await SaveToJson(jsonResponse, "Statistics");
        }
        catch (Exception ex)
        {
            throw new Exception($"Failed to save statistics: {ex.Message}", ex);
        }
    }
}
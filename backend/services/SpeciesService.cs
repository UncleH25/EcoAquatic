using System.Globalization;
using CsvHelper;
using EcoAquatic.Data;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

public class SpeciesService
{
    private readonly ApiService _apiService;
    private readonly AppDbContext _dbContext;

    public SpeciesService(ApiService apiService, AppDbContext dbContext)
    {
        _apiService = apiService;
        _dbContext = dbContext;
    }

    public async Task ImportFishSpeciesFromCsv(string fileName = "modified_species_fishbase.csv")
    {
        try
        {
            // Construct the file path using the Documents folder and known structure
            string filePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments), 
                "EcoAquatic", "Fish_Data", fileName);

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
                        ObservationDate = DateTime.UtcNow,
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
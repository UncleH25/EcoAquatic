using System.Globalization;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using CsvHelper;
using Microsoft.Extensions.Configuration;
using System.IO;
using System;
using Newtonsoft.Json;

public class ApiService
{
    private readonly HttpClient _httpClient;
    private readonly string _filePath;
    private readonly string _obisApiUrl;

    public ApiService(IConfiguration configuration, HttpClient httpClient)
    {
        // Get the file path from configuration
        _filePath = configuration["APISettings:FishBaseApi:CSV_FilePath"];
        _httpClient = httpClient;
        // Fetch the OBIS API URL from the environment variable
        _obisApiUrl = Environment.GetEnvironmentVariable("OBIS_API_BASE_URL");

        // Log the constructed OBIS API URL
        Console.WriteLine($"Constructed OBIS API BASE URL: {_obisApiUrl}");

        // Check if the OBIS API URL is set
        if (string.IsNullOrEmpty(_obisApiUrl))
        {
            throw new InvalidOperationException("OBIS_API_BASE_URL environment variable is not set.");
        }

        // Log the constructed file path
        Console.WriteLine($"Constructed file path: {_filePath}");

        // Check if the file exists
        if (!File.Exists(_filePath))
        {
            Console.WriteLine($"File not found at path: {_filePath}");
            throw new FileNotFoundException("CSV file not found.", _filePath);
        }
    }

    // FishBase (Read CSV file)
    public List<SpeciesModel> ReadSpeciesFromCsv()
    {
        var speciesList = new List<SpeciesModel>();

        try
        {
            using (var reader = new StreamReader(_filePath))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                var records = csv.GetRecords<dynamic>().ToList(); // Use dynamic to read original headers

                foreach (var record in records)
                {
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
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error reading CSV file: {ex.Message}");
            throw; // Rethrow the exception after logging
        }

        return speciesList;
    }

      // get occurrence data with parameters
    public async Task<string> GetOccurrenceData(string? scientificName = null, string? taxonId = null, string? datasetId = null,
        string? startDate = null, string? endDate = null, int? startDepth = null, int? endDepth = null,
        string? geometry = null, int? size = null, int? offset = null)
    {
        var queryParams = new List<string>();
        if (!string.IsNullOrEmpty(scientificName)) queryParams.Add($"scientificname={Uri.EscapeDataString(scientificName)}");
        if (!string.IsNullOrEmpty(taxonId)) queryParams.Add($"taxonid={taxonId}");
        if (!string.IsNullOrEmpty(datasetId)) queryParams.Add($"datasetid={datasetId}");
        if (!string.IsNullOrEmpty(startDate)) queryParams.Add($"startdate={startDate}");
        if (!string.IsNullOrEmpty(endDate)) queryParams.Add($"enddate={endDate}");
        if (startDepth.HasValue) queryParams.Add($"startdepth={startDepth.Value}");
        if (endDepth.HasValue) queryParams.Add($"enddepth={endDepth.Value}");
        if (!string.IsNullOrEmpty(geometry)) queryParams.Add($"geometry={Uri.EscapeDataString(geometry)}");
        if (size.HasValue) queryParams.Add($"size={size.Value}");
        if (offset.HasValue) queryParams.Add($"offset={offset.Value}");

        var queryString = string.Join("&", queryParams);
        return await GetDataFromObisApi($"/occurrence?{queryString}");
    }

    // get gridded occurrence data
    public async Task<string> GetGriddedOccurrences(string precision, string geometry, string? redlist = null, string? hab = null, string? wrims = null)
    {
        var queryParams = new List<string>
        {
            $"geometry={Uri.EscapeDataString(geometry)}"
        };

        if (!string.IsNullOrEmpty(redlist)) queryParams.Add($"redlist={redlist}");
        if (!string.IsNullOrEmpty(hab)) queryParams.Add($"hab={hab}");
        if (!string.IsNullOrEmpty(wrims)) queryParams.Add($"wrims={wrims}");

        var queryString = string.Join("&", queryParams);
        return await GetDataFromObisApi($"/occurrence/grid/{precision}?{queryString}");
    }

    // get dataset metadata
    public async Task<string> GetDatasets(string? nodeId = null, string? modifiedSince = null)
    {
        var queryParams = new List<string>();
        if (!string.IsNullOrEmpty(nodeId)) queryParams.Add($"nodeid={nodeId}");
        if (!string.IsNullOrEmpty(modifiedSince)) queryParams.Add($"modified={modifiedSince}");

        var queryString = string.Join("&", queryParams);
        return await GetDataFromObisApi($"/dataset?{queryString}");
    }

    // get taxonomic details
    public async Task<string> GetTaxonomy(string scientificName, string? rank = null)
    {
        var queryParams = new List<string>
        {
            $"scientificname={Uri.EscapeDataString(scientificName)}"
        };

        if (!string.IsNullOrEmpty(rank)) queryParams.Add($"rank={rank}");

        var queryString = string.Join("&", queryParams);
        return await GetDataFromObisApi($"/taxon?{queryString}");
    }

    // get OBIS nodes
    public async Task<string> GetNodes()
    {
        return await GetDataFromObisApi("/node");
    }

    // get statistics
    public async Task<string> GetStatistics(string? scientificName = null, string? geometry = null, 
        string? startDate = null, string? endDate = null)
    {
        var queryParams = new List<string>();
        if (!string.IsNullOrEmpty(scientificName)) queryParams.Add($"scientificname={Uri.EscapeDataString(scientificName)}");
        if (!string.IsNullOrEmpty(geometry)) queryParams.Add($"geometry={Uri.EscapeDataString(geometry)}");
        if (!string.IsNullOrEmpty(startDate)) queryParams.Add($"startdate={startDate}");
        if (!string.IsNullOrEmpty(endDate)) queryParams.Add($"enddate={endDate}");

        var queryString = string.Join("&", queryParams);
        return await GetDataFromObisApi($"/statistics?{queryString}");
    }

    // OBIS API call
    private async Task<string> GetDataFromObisApi(string endpoint)
    {
        var requestUrl = $"{_obisApiUrl}{endpoint}";
        var request = new HttpRequestMessage(HttpMethod.Get, requestUrl);
        request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

        var response = await _httpClient.SendAsync(request);
        response.EnsureSuccessStatusCode();

        return await response.Content.ReadAsStringAsync();
    }
}
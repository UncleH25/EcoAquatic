using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class SpeciesModel
{
    [Key]
    public int Id { get; set; }  // Primary key for the table

    [Required]
    [MaxLength(200)]
    public required string ScientificName { get; set; }  // Scientific name of the species

    [MaxLength(200)]
    public string? CommonName { get; set; }  // Common name(s) of the species

    [Required]
    [Column(TypeName = "jsonb")]
    public required string Taxonomy { get; set; }  // JSON structure for taxonomy (e.g., kingdom, phylum, class)

    [Required]
    [MaxLength(50)]
    public required string ConservationStatus { get; set; }  // e.g., Endangered, Vulnerable, Least Concern

    [Column(TypeName = "jsonb")]
    public string? Threats { get; set; }  // JSON structure for threats

    [Column(TypeName = "jsonb")]
    public string? ConservationActions { get; set; }  // JSON structure for conservation measures

    [MaxLength(50)]
    public string? NativeStatus { get; set; }  // Native, Introduced, or Both

    [MaxLength(100)]
    public string? Behaviour { get; set; }  // General behaviour of the species

    [Column(TypeName = "text")]
    public string? EconomicImportance { get; set; }  // Details about fisheries, aquaculture, etc.

    [Column(TypeName = "text")]
    public string? EcologicalRole { get; set; }  // Description of ecological roles

    [MaxLength(50)]
    public string? ClimateSensitivity { get; set; }  // High, Medium, Low sensitivity to climate change

    [Required]
    [MaxLength(50)]
    public required string PopulationTrend { get; set; }  // e.g., Increasing, Decreasing, Stable

    [Required]
    [MaxLength(100)]
    public required string GeographicalLocation_Continent { get; set; }  // Habitat type(s) (e.g., freshwater, marine)

    [Required]
    [MaxLength(100)]
    public required string GeographicalLocation_Country{ get; set; }  // Habitat type(s) (e.g., freshwater, marine)

    [Required]
    [MaxLength(100)]
    public required string GeographicalLocation_BodyOfWater { get; set; }  // Habitat type(s) (e.g., freshwater, marine)

    [Required]
    [MaxLength(100)]
    public required string Habitat { get; set; }  // Habitat type(s) (e.g., freshwater, marine)

    [MaxLength(100)]
    public string? SubHabitat { get; set; }  // Sub Habitat type(s) (e.g., rivers, reefs)

    [Required]
    [Column(TypeName = "jsonb")]
    public required string HabitatCategory { get; set; }  // JSON structure for habitat categories

    [Required]
    [Column(TypeName = "jsonb")]
    public required string MigrationPattern { get; set; }  // JSON structure for migration patterns

    [Required]
    public required int DepthRange { get; set; }  // Depth range of the species (e.g., 0-200 meters)

    [Required]
    public required float TemperatureRange { get; set; }  // Temperature range (e.g., 15.5-30.0°C)

    [Required]
    [Column(TypeName = "jsonb")]
    public required string Distribution { get; set; }  // JSON structure for distribution (e.g., regions)

    [MaxLength(100)]
    public string? Endemism { get; set; }  // Description of endemic status or location

    [Required]
    [MaxLength(100)]
    public required string Diet { get; set; }  // Dietary information (e.g., herbivore, carnivore)

    [MaxLength(50)]
    public string? Lifespan { get; set; }  // Average lifespan of the species (e.g., "10 years")

    [MaxLength(500)]
    public string? ImageUrl { get; set; }  // URL to an image of the species

    [Required]
    [Column(TypeName = "text")]
    public required string Description { get; set; }  // General description or notes about the species

    [Column(TypeName = "text")]
    public string? Adaptations { get; set; }  // Description of adaptations

    [Required]
    public required float AverageSize { get; set; }  // Average size/length of the species in cm

    [Required]
    public required float AverageWeight { get; set; }  // Average weight of the species in kg

    public DateTime ObservationDate { get; set; } = DateTime.UtcNow;  // Last updated date for the data

    [Required]
    [MaxLength(100)]
    public required string SourceApi { get; set; }  // Source API of the data (e.g., GBIF, IUCN, OBIS)

    [MaxLength(200)]
    public string? TaxonomicAuthority { get; set; }  // e.g., Linnaeus, 1758
}
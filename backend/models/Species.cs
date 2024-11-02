using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

 public class SpeciesModel
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(200)]
        public required string ScientificName { get; set; }  // Scientific name of the species

        [StringLength(200)]
        public required string CommonName { get; set; }  // Common name(s) of the species

        [Column(TypeName = "jsonb")]
        public required string Taxonomy { get; set; }  // JSON structure for taxonomy (e.g., kingdom, phylum, class)

        [StringLength(50)]
        public required string ConservationStatus { get; set; }  // e.g., Endangered, Vulnerable, Least Concern

        [StringLength(50)]
        public required string PopulationTrend { get; set; }  // e.g., Increasing, Decreasing, Stable

        [StringLength(100)]
        public required string Habitat { get; set; }  // Habitat type(s) (e.g., freshwater, marine)

        [Column(TypeName = "jsonb")]
        public required string Distribution { get; set; }  // JSON structure for distribution (e.g., regions and ranges)

        [StringLength(50)]
        public required string AverageSize { get; set; }  // Average size/length of the species

        [StringLength(100)]
        public required string Diet { get; set; }  // Dietary information (e.g., herbivore, carnivore)

        [StringLength(500)]
        public string? ImageUrl { get; set; }  // URL to an image of the species

        [Column(TypeName = "text")]
        public required string Description { get; set; }  // General description or notes about the species

        public DateTime LastUpdated { get; set; } = DateTime.UtcNow;  // Last updated date for the data

        [StringLength(100)]
        public required string SourceApi { get; set; }  // Source API of the data (e.g., GBIF, IUCN, OBIS)

        [Column(TypeName = "jsonb")]
        public required string RegionInfo { get; set; }  // JSON structure for additional region information
    }

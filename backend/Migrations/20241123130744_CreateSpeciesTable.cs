using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class CreateSpeciesTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Species",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ScientificName = table.Column<string>(maxLength: 200, nullable: false),
                    CommonName = table.Column<string>(maxLength: 200, nullable: true),
                    Taxonomy = table.Column<string>(type: "jsonb", nullable: false),
                    ConservationStatus = table.Column<string>(maxLength: 50, nullable: false),
                    Threats = table.Column<string>(type: "jsonb", nullable: true),
                    ConservationActions = table.Column<string>(type: "jsonb", nullable: true),
                    NativeStatus = table.Column<string>(maxLength: 50, nullable: true),
                    Behaviour = table.Column<string>(maxLength: 100, nullable: true),
                    EconomicImportance = table.Column<string>(type: "text", nullable: true),
                    EcologicalRole = table.Column<string>(type: "text", nullable: true),
                    ClimateSensitivity = table.Column<string>(maxLength: 50, nullable: true),
                    PopulationTrend = table.Column<string>(maxLength: 50, nullable: false),
                    GeographicalLocation_Continent = table.Column<string>(maxLength: 100, nullable: false),
                    GeographicalLocation_Country = table.Column<string>(maxLength: 100, nullable: false),
                    GeographicalLocation_BodyOfWater = table.Column<string>(maxLength: 100, nullable: false),
                    Habitat = table.Column<string>(maxLength: 100, nullable: false),
                    SubHabitat = table.Column<string>(maxLength: 100, nullable: true),
                    HabitatCategory = table.Column<string>(type: "jsonb", nullable: false),
                    MigrationPattern = table.Column<string>(type: "jsonb", nullable: false),
                    DepthRange = table.Column<int>(nullable: false),
                    TemperatureRange = table.Column<float>(nullable: false),
                    Distribution = table.Column<string>(type: "jsonb", nullable: false),
                    Endemism = table.Column<string>(maxLength: 100, nullable: true),
                    Diet = table.Column<string>(maxLength: 100, nullable: false),
                    Lifespan = table.Column<string>(maxLength: 50, nullable: true),
                    ImageUrl = table.Column<string>(maxLength: 500, nullable: true),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Adaptations = table.Column<string>(type: "text", nullable: true),
                    AverageSize = table.Column<float>(nullable: false),
                    AverageWeight = table.Column<float>(nullable: false),
                    ObservationDate = table.Column<DateTime>(nullable: false, defaultValueSql: "CURRENT_TIMESTAMP"),
                    SourceApi = table.Column<string>(maxLength: 100, nullable: false),
                    TaxonomicAuthority = table.Column<string>(maxLength: 200, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Species", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Species");
        }
    }
}

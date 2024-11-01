using System;
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
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ScientificName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    CommonName = table.Column<string>(type: "character varying(200)", maxLength: 200, nullable: false),
                    Taxonomy = table.Column<string>(type: "jsonb", nullable: false),
                    ConservationStatus = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    PopulationTrend = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Habitat = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Distribution = table.Column<string>(type: "jsonb", nullable: false),
                    AverageSize = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Diet = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    ImageUrl = table.Column<string>(type: "character varying(500)", maxLength: 500, nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    LastUpdated = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    SourceApi = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    RegionInfo = table.Column<string>(type: "jsonb", nullable: false)
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

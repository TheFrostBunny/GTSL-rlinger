using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GreenTechSee.Migrations
{
    /// <inheritdoc />
    public partial class AddStudentLocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Location",
                table: "Students",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Location",
                table: "Students");
        }
    }
}

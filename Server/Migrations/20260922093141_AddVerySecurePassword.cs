using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GreenTechSee.Migrations
{
    /// <inheritdoc />
    public partial class AddVerySecurePassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Students",
                type: "text",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "StudentCredentials",
                columns: table => new
                {
                    StudentId = table.Column<int>(type: "integer", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentCredentials", x => x.StudentId);
                    table.ForeignKey(
                        name: "FK_StudentCredentials_Students_StudentId",
                        column: x => x.StudentId,
                        principalTable: "Students",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentCredentials");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "Students");
        }
    }
}

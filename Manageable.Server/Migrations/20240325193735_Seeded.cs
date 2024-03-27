using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Manageable.Server.Migrations
{
    /// <inheritdoc />
    public partial class Seeded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "People",
                columns: new[] { "Id", "Age", "DateOfBirth", "FirstName", "Sex", "Surname", "Title" },
                values: new object[,]
                {
                    { 1, 41, new DateOnly(1980, 1, 1), "John", "Male", "Doe", "Mr" },
                    { 2, 36, new DateOnly(1985, 1, 1), "Jane", "Female", "Doe", "Mrs" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "People",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "People",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}

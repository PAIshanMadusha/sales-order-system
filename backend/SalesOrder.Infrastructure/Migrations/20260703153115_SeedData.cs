using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SalesOrder.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Clients",
                columns: new[] { "Id", "Address1", "Address2", "Address3", "CustomerName", "PostCode", "State", "Suburb" },
                values: new object[,]
                {
                    { 1, "No 10", "Main Street", "Colombo", "John Traders", "00100", "Western", "Colombo" },
                    { 2, "No 25", "Lake Road", "Kandy", "ABC Pvt Ltd", "20000", "Central", "Kandy" }
                });

            migrationBuilder.InsertData(
                table: "Items",
                columns: new[] { "Id", "Description", "ItemCode", "Price" },
                values: new object[,]
                {
                    { 1, "Laptop", "ITM001", 1000m },
                    { 2, "Mouse", "ITM002", 50m }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Clients",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Clients",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Items",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}

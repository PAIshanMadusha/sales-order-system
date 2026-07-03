using Microsoft.EntityFrameworkCore;

namespace SalesOrder.Infrastructure.Data.SeedData
{
    public static class DbSeeder
    {
        public static void Seed(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Client>().HasData(
                new Client
                {
                    Id = 1,
                    CustomerName = "John Traders",
                    Address1 = "No 10",
                    Address2 = "Main Street",
                    Address3 = "Colombo",
                    Suburb = "Colombo",
                    State = "Western",
                    PostCode = "00100"
                },
                new Client
                {
                    Id = 2,
                    CustomerName = "ABC Pvt Ltd",
                    Address1 = "No 25",
                    Address2 = "Lake Road",
                    Address3 = "Kandy",
                    Suburb = "Kandy",
                    State = "Central",
                    PostCode = "20000"
                }
            );

            modelBuilder.Entity<Item>().HasData(
                new Item
                {
                    Id = 1,
                    ItemCode = "ITM001",
                    Description = "Laptop",
                    Price = 1000m
                },
                new Item
                {
                    Id = 2,
                    ItemCode = "ITM002",
                    Description = "Mouse",
                    Price = 50m
                }
            );
        }
    }
}
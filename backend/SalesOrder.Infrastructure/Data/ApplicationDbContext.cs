using Microsoft.EntityFrameworkCore;
using SalesOrder.Domain.Entities;
using SalesOrderEntity = SalesOrder.Domain.Entities.SalesOrder;

namespace SalesOrder.Infrastructure.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        { }

        // DbSets
        public DbSet<Client> Clients => Set<Client>();
        public DbSet<Item> Items => Set<Item>();
        public DbSet<SalesOrderEntity> SalesOrders => Set<SalesOrderEntity>();
        public DbSet<SalesOrderItem> SalesOrderItems => Set<SalesOrderItem>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Client
            modelBuilder.Entity<Client>()
                .HasKey(c => c.Id);

            // Item
            modelBuilder.Entity<Item>()
                .HasKey(i => i.Id);

            // SalesOrder
            modelBuilder.Entity<SalesOrderEntity>()
                .HasKey(o => o.Id);

            modelBuilder.Entity<SalesOrderEntity>()
                .HasMany(o => o.Items)
                .WithOne(i => i.SalesOrder)
                .HasForeignKey(i => i.SalesOrderId);

            modelBuilder.Entity<SalesOrderEntity>()
                .HasOne(o => o.Client)
                .WithMany()
                .HasForeignKey(o => o.ClientId);

            // SalesOrderItem
            modelBuilder.Entity<SalesOrderItem>()
                .HasKey(oi => oi.Id);

            modelBuilder.Entity<SalesOrderItem>()
                .HasOne(oi => oi.Item)
                .WithMany()
                .HasForeignKey(oi => oi.ItemId);

            // Configure decimal precision for SalesOrderItem properties    
            modelBuilder.Entity<SalesOrderItem>()
                .Property(p => p.Price)
                .HasPrecision(18, 2);

            modelBuilder.Entity<SalesOrderItem>()
                .Property(p => p.ExclAmount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<SalesOrderItem>()
                .Property(p => p.TaxAmount)
                .HasPrecision(18, 2);

            modelBuilder.Entity<SalesOrderItem>()
                .Property(p => p.InclAmount)
                .HasPrecision(18, 2);
        }
    }
}
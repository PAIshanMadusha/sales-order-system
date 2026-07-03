using SalesOrderEntity = SalesOrder.Domain.Entities.SalesOrder;
using Microsoft.EntityFrameworkCore;
using SalesOrder.Application.Interfaces;
using SalesOrder.Infrastructure.Data;

namespace SalesOrder.Infrastructure.Repositories;

// Repository for managing sales order data
public class SalesOrderRepository : ISalesOrderRepository
{
    private readonly ApplicationDbContext _context;

    public SalesOrderRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<SalesOrderEntity>> GetAllAsync()
    {
        return await _context.SalesOrders
            .Include(o => o.Client)
            .Include(o => o.Items)
                .ThenInclude(i => i.Item)
            .ToListAsync();
    }

    public async Task<SalesOrderEntity?> GetByIdAsync(int id)
    {
        return await _context.SalesOrders
            .Include(o => o.Client)
            .Include(o => o.Items)
                .ThenInclude(i => i.Item)
            .FirstOrDefaultAsync(o => o.Id == id);
    }

    public async Task AddAsync(SalesOrderEntity order)
    {
        await _context.SalesOrders.AddAsync(order);
    }

    public Task UpdateAsync(SalesOrderEntity order)
    {
        _context.SalesOrders.Update(order);
        return Task.CompletedTask;
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
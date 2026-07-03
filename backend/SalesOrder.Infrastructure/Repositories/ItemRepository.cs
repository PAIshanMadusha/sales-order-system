using Microsoft.EntityFrameworkCore;
using SalesOrder.Application.Interfaces;
using SalesOrder.Infrastructure.Data;

namespace SalesOrder.Infrastructure.Repositories;

// Repository for managing Item data
public class ItemRepository : IItemRepository
{
    private readonly ApplicationDbContext _context;

    public ItemRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Item>> GetAllAsync()
    {
        return await _context.Items.ToListAsync();
    }

    public async Task<Item?> GetByIdAsync(int id)
    {
        return await _context.Items
            .FirstOrDefaultAsync(i => i.Id == id);
    }
}
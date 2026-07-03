namespace SalesOrder.Application.Interfaces;

// Interface for item data access
public interface IItemRepository
{
    Task<List<Item>> GetAllAsync();

    Task<Item?> GetByIdAsync(int id);
}
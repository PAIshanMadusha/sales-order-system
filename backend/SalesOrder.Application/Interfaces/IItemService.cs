namespace SalesOrder.Application.Interfaces;

// Interface for item service
public interface IItemService
{
    Task<IEnumerable<object>> GetAllAsync();

    Task<object?> GetByIdAsync(int id);
}
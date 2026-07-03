namespace SalesOrder.Application.Interfaces;

// Interface for client service
public interface IClientService
{
    Task<IEnumerable<object>> GetAllAsync();

    Task<object?> GetByIdAsync(int id);
}
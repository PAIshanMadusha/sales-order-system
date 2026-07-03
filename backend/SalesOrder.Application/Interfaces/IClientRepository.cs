namespace SalesOrder.Application.Interfaces;

// Interface for client data access
public interface IClientRepository
{
    Task<List<Client>> GetAllAsync();

    Task<Client?> GetByIdAsync(int id);
}
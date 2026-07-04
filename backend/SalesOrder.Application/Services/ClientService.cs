using SalesOrder.Application.Interfaces;

namespace SalesOrder.Application.Services;

// Implementation of the client service
public class ClientService : IClientService
{
    private readonly IClientRepository _repo;

    public ClientService(IClientRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<object>> GetAllAsync()
    {
        var clients = await _repo.GetAllAsync();

        return clients.Select(c => new
        {
            c.Id,
            c.CustomerName,
            c.Address1,
            c.Address2,
            c.Address3,
            c.Suburb,
            c.State,
            c.PostCode
        });
    }

    public async Task<object?> GetByIdAsync(int id)
    {
        var c = await _repo.GetByIdAsync(id);

        if (c == null) return null;

        return new
        {
            c.Id,
            c.CustomerName,
            c.Address1,
            c.Address2,
            c.Address3,
            c.Suburb,
            c.State,
            c.PostCode
        };
    }
}
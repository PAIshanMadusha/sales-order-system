using SalesOrder.Application.Interfaces;

namespace SalesOrder.Application.Services;

// Implementation of the item service
public class ItemService : IItemService
{
    private readonly IItemRepository _repo;

    public ItemService(IItemRepository repo)
    {
        _repo = repo;
    }

    public async Task<IEnumerable<object>> GetAllAsync()
    {
        var items = await _repo.GetAllAsync();

        return items.Select(i => new
        {
            i.Id,
            i.ItemCode,
            i.Description,
            i.Price
        });
    }

    public async Task<object?> GetByIdAsync(int id)
    {
        var i = await _repo.GetByIdAsync(id);

        if (i == null) return null;

        return new
        {
            i.Id,
            i.ItemCode,
            i.Description,
            i.Price
        };
    }
}
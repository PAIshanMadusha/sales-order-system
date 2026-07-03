using SalesOrderEntity = SalesOrder.Domain.Entities.SalesOrder;
namespace SalesOrder.Application.Interfaces;

// Interface for sales order data access
public interface ISalesOrderRepository
{
    Task<List<SalesOrderEntity>> GetAllAsync();
    Task<SalesOrderEntity?> GetByIdAsync(int id);
    Task AddAsync(SalesOrderEntity order);
    Task UpdateAsync(SalesOrderEntity order);
    Task SaveChangesAsync();
}
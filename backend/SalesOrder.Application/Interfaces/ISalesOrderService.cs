using SalesOrder.Application.Models;
namespace SalesOrder.Application.Interfaces;

// Interface for sales order service
public interface ISalesOrderService
{
    Task<SalesOrderResponse> CreateAsync(CreateSalesOrderRequest request);

    Task<IEnumerable<SalesOrderResponse>> GetAllAsync();

    Task<SalesOrderResponse?> GetByIdAsync(int id);

    Task<SalesOrderResponse?> UpdateAsync(int id, CreateSalesOrderRequest request);

    Task<bool> DeleteAsync(int id);
}
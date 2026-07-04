using SalesOrder.Application.Interfaces;
using SalesOrder.Application.Models;
using SalesOrder.Domain.Entities;

namespace SalesOrder.Application.Services;

// Implementation of the sales order service
public class SalesOrderService : ISalesOrderService
{
    private readonly IClientRepository _clientRepo;
    private readonly IItemRepository _itemRepo;
    private readonly ISalesOrderRepository _orderRepo;

    public SalesOrderService(
        IClientRepository clientRepo,
        IItemRepository itemRepo,
        ISalesOrderRepository orderRepo)
    {
        _clientRepo = clientRepo;
        _itemRepo = itemRepo;
        _orderRepo = orderRepo;
    }

    // Create a new sales order
    public async Task<SalesOrderResponse> CreateAsync(CreateSalesOrderRequest request)
    {
        var client = await _clientRepo.GetByIdAsync(request.ClientId);

        if (client == null)
            throw new Exception("Client not found");

        var order = new Domain.Entities.SalesOrder
        {
            OrderNo = "SO-" + DateTime.Now.Ticks,
            ReferenceNo = request.ReferenceNo,
            ClientId = request.ClientId,
            Client = client,
            Address1 = request.Address1,
            Address2 = request.Address2,
            Address3 = request.Address3,
            Date = DateTime.Now,
            Items = new List<SalesOrderItem>()
        };

        decimal grandTotal = 0;

        foreach (var item in request.Items)
        {
            var product = await _itemRepo.GetByIdAsync(item.ItemId);

            if (product == null)
                throw new Exception($"Item {item.ItemId} not found");

            decimal excl = item.Quantity * product.Price;
            decimal tax = excl * item.TaxRate / 100;
            decimal incl = excl + tax;

            grandTotal += incl;

            order.Items.Add(new SalesOrderItem
            {
                ItemId = item.ItemId,
                Quantity = item.Quantity,
                TaxRate = item.TaxRate,
                Price = product.Price,
                ExclAmount = excl,
                TaxAmount = tax,
                InclAmount = incl,
                Note = item.Note,
                Item = product
            });
        }

        order.GrandTotal = grandTotal;

        await _orderRepo.AddAsync(order);
        await _orderRepo.SaveChangesAsync();

        return new SalesOrderResponse
        {
            Id = order.Id,
            OrderNo = order.OrderNo,
            ReferenceNo = order.ReferenceNo,
            CustomerName = client.CustomerName,
            Address1 = order.Address1,
            Address2 = order.Address2,
            Address3 = order.Address3,
            Date = order.Date,
            GrandTotal = order.GrandTotal,
            Items = order.Items.Select(i => new SalesOrderItemResponse
            {
                ItemId = i.ItemId,
                ItemCode = productCodePlaceholder(i.ItemId),
                Description = "",
                Quantity = i.Quantity,
                Price = i.Price,
                TaxRate = i.TaxRate,
                ExclAmount = i.ExclAmount,
                TaxAmount = i.TaxAmount,
                InclAmount = i.InclAmount
            }).ToList()
        };
    }

    // Helper method to generate a product code placeholder based on the item ID
    private string productCodePlaceholder(int itemId)
    {
        return "ITEM-" + itemId;
    }

    // Get all sales orders
    public async Task<IEnumerable<SalesOrderResponse>> GetAllAsync()
    {
        var orders = await _orderRepo.GetAllAsync();

        return orders.Select(o => new SalesOrderResponse
        {
            Id = o.Id,
            OrderNo = o.OrderNo,
            ReferenceNo = o.ReferenceNo,
            CustomerName = o.Client.CustomerName,
            Address1 = o.Address1,
            Address2 = o.Address2,
            Address3 = o.Address3,
            Date = o.Date,
            GrandTotal = o.GrandTotal,
            Items = o.Items.Select(i => new SalesOrderItemResponse
            {
                ItemId = i.ItemId,
                ItemCode = i.Item?.ItemCode ?? "",
                Description = i.Item?.Description ?? "",
                Quantity = i.Quantity,
                Price = i.Price,
                TaxRate = i.TaxRate,
                ExclAmount = i.ExclAmount,
                TaxAmount = i.TaxAmount,
                InclAmount = i.InclAmount
            }).ToList()
        });
    }

    // Get a sales order by its ID
    public async Task<SalesOrderResponse?> GetByIdAsync(int id)
    {
        var o = await _orderRepo.GetByIdAsync(id);

        if (o == null) return null;

        return new SalesOrderResponse
        {
            Id = o.Id,
            OrderNo = o.OrderNo,
            ReferenceNo = o.ReferenceNo,
            CustomerName = o.Client.CustomerName,
            Address1 = o.Address1,
            Address2 = o.Address2,
            Address3 = o.Address3,
            Date = o.Date,
            GrandTotal = o.GrandTotal,
            Items = o.Items.Select(i => new SalesOrderItemResponse
            {
                ItemId = i.ItemId,
                ItemCode = i.Item?.ItemCode ?? "",
                Description = i.Item?.Description ?? "",
                Quantity = i.Quantity,
                Price = i.Price,
                TaxRate = i.TaxRate,
                ExclAmount = i.ExclAmount,
                TaxAmount = i.TaxAmount,
                InclAmount = i.InclAmount
            }).ToList()
        };
    }

    // Update an existing sales order
    public Task<SalesOrderResponse?> UpdateAsync(int id, CreateSalesOrderRequest request)
    {
        throw new NotImplementedException("UpdateAsync method is not implemented yet.");
    }
}
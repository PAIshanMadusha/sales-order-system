namespace SalesOrder.Application.Models;

// SalesOrderItemRequest model represents the data required to create a new sales order item
public class SalesOrderItemRequest
{
    public int ItemId { get; set; }
    public string? Note { get; set; }
    public int Quantity { get; set; }
    public decimal TaxRate { get; set; }
}
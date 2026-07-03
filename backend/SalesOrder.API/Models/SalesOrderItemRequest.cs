namespace SalesOrder.API.Models;

public class SalesOrderItemRequest
{
    public int ItemId { get; set; }
    public string? Note { get; set; }
    public int Quantity { get; set; }
    public decimal TaxRate { get; set; }
}
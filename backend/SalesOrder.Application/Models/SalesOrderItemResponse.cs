namespace SalesOrder.Application.Models;

// SalesOrderItemResponse model represents the data returned for a sales order item
public class SalesOrderItemResponse
{
    public int ItemId { get; set; }
    public required string ItemCode { get; set; }
    public required string Description { get; set; }
    public string? Note { get; set; }
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public decimal TaxRate { get; set; }
    public decimal ExclAmount { get; set; }
    public decimal TaxAmount { get; set; }
    public decimal InclAmount { get; set; }
}
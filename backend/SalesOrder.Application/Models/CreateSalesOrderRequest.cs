namespace SalesOrder.Application.Models;

public class CreateSalesOrderRequest
{
    public int ClientId { get; set; }
    public required string Address1 { get; set; }
    public string? Address2 { get; set; }
    public string? Address3 { get; set; }
    public required string ReferenceNo { get; set; }
    public required List<SalesOrderItemRequest> Items { get; set; }
}
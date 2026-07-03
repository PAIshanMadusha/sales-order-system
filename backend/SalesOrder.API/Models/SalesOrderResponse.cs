namespace SalesOrder.API.Models;

public class SalesOrderResponse
{
    public int Id { get; set; }
    public required string OrderNo { get; set; }
    public required string ReferenceNo { get; set; }
    public required string CustomerName { get; set; }
    public required string Address1 { get; set; }
    public string? Address2 { get; set; }
    public string? Address3 { get; set; }
    public DateTime Date { get; set; }
    public decimal GrandTotal { get; set; }
    public List<SalesOrderItemResponse> Items { get; set; } = new();
}
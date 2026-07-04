namespace SalesOrder.Domain.Entities;

// SalesOrder entity represents a sales order in the system
public class SalesOrder
{
    public int Id { get; set; }
    public required string OrderNo { get; set; }
    public required string ReferenceNo { get; set; }
    public int ClientId { get; set; }
    public required Client Client { get; set; }
    public required string Address1 { get; set; }
    public string? Address2 { get; set; }
    public string? Address3 { get; set; }
    public DateTime Date { get; set; }
    public decimal GrandTotal { get; set; }
    public List<SalesOrderItem> Items { get; set; } = new();
}
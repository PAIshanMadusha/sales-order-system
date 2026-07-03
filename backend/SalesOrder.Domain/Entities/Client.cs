public class Client
{
    public int Id { get; set; }
    public required string CustomerName { get; set; }
    public required string Address1 { get; set; }
    public string? Address2 { get; set; }
    public string? Address3 { get; set; }
    public required string Suburb { get; set; }
    public required string State { get; set; }
    public required string PostCode { get; set; }
}
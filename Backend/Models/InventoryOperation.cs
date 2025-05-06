namespace Backend.Models;

public class InventoryOperation
{
    public int Id { get; set; }
    public DateTime OperationDate { get; set; } = DateTime.UtcNow;
    public int Quantity { get; set; }
    public string OperationType { get; set; } // "IN", "OUT"
    public string Notes { get; set; }
    public string PerformedBy { get; set; }
    public int ProductId { get; set; }
    public Product Product { get; set; }
}
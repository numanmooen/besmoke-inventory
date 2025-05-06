using System.ComponentModel.DataAnnotations;

namespace Backend.DTOs;

public class InventoryOperationDTO
{
    public int Id { get; set; }
    public DateTime OperationDate { get; set; }
    public int Quantity { get; set; }
    public string OperationType { get; set; }
    public string Notes { get; set; }
    public string PerformedBy { get; set; }
    public int ProductId { get; set; }
    public ProductDTO Product { get; set; }
}

public class InventoryOperationCreateDTO
{
    [Required]
    public int ProductId { get; set; }

    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Quantity must be positive")]
    public int Quantity { get; set; }

    [Required]
    public string OperationType { get; set; } // "IN" or "OUT"

    [StringLength(500)]
    public string Notes { get; set; }
}
 
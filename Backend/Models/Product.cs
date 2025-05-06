namespace Backend.Models;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public ProductType Type { get; set; }
    public string Size { get; set; }
    public Material Material { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public string CreatedBy { get; set; }
    public DateTime? LastModifiedAt { get; set; }
    public string? LastModifiedBy { get; set; }

    public ICollection<InventoryOperation> InventoryOperations { get; set; }
}

public enum ProductType
{
    ErlenmeyerFlask,
    DewarFlask,
    Beaker,
    Vial
}

public enum Material
{
    Glass,
    Plastic
}
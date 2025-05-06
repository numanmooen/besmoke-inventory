namespace Backend.DTOs;

public class InventoryStatusDTO
{
    public ProductDTO Product { get; set; }
    public int AvailableQuantity { get; set; }
}

public class InventoryReportRequestDTO
{
    public string? ProductType { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}

public class InventoryReportDTO
{
    public DateTime GeneratedAt { get; set; }
    public List<InventoryStatusDTO> ReportData { get; set; }
    public InventoryReportRequestDTO FilterCriteria { get; set; }
}
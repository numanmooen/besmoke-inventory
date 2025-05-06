using Backend.DTOs;
using Backend.Models;

namespace Backend.Services;

public interface IInventoryService
{
    Task<IEnumerable<InventoryOperation>> GetAllOperationsAsync();
    Task<InventoryOperationDTO> AddInventoryOperationAsync(
        InventoryOperationCreateDTO operationDto,
        string userId);
    Task<IEnumerable<InventoryStatusDTO>> GetInventoryStatusAsync();
    Task<IEnumerable<InventoryStatusDTO>> GetLowInventoryAsync(int threshold = 50);
    Task<InventoryReportDTO> GenerateInventoryReportAsync(InventoryReportRequestDTO request);
}
using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims; 

[ApiController]
[Route("api/[controller]")]
[Authorize] 
public class InventoryController : ControllerBase
{
    private readonly IInventoryService _inventoryService;
    private readonly ILogger<InventoryController> _logger;

    public InventoryController(
        IInventoryService inventoryService,
        ILogger<InventoryController> logger)
    {
        _inventoryService = inventoryService;
        _logger = logger;
    }
     
    [HttpGet("status")]
    public async Task<ActionResult<IEnumerable<InventoryStatusDTO>>> GetInventoryStatus()
    {
        try
        {
            var status = await _inventoryService.GetInventoryStatusAsync();
            return Ok(status);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting inventory status");
            return StatusCode(500, "Internal server error");
        }
    }
     
    [HttpGet("low-stock")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<ActionResult<IEnumerable<InventoryStatusDTO>>> GetLowInventory(
        [FromQuery] int threshold = 50)
    {
        try
        {
            var lowStock = await _inventoryService.GetLowInventoryAsync(threshold);
            return Ok(lowStock);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error getting low inventory with threshold {threshold}");
            return StatusCode(500, "Internal server error");
        }
    }
     
    [HttpGet("operations")]
    public async Task<ActionResult<IEnumerable<InventoryOperationDTO>>> GetInventoryOperations()
    {
        try
        {
            var operations = await _inventoryService.GetAllOperationsAsync();
            return Ok(operations);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error getting inventory operations");
            return StatusCode(500, "Internal server error");
        }
    }
     
    [HttpPost("operations")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<ActionResult<InventoryOperationDTO>> AddInventoryOperation(
        [FromBody] InventoryOperationCreateDTO operationDto)
    {
        try
        {
            // Get current user ID from claims
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (string.IsNullOrEmpty(userId))
            {
                return Unauthorized("User ID not found in token");
            }

            var operation = await _inventoryService.AddInventoryOperationAsync(operationDto, userId);
            return CreatedAtAction(
                nameof(GetInventoryOperations),
                new { id = operation.Id },
                operation);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error adding inventory operation");
            return StatusCode(500, "Internal server error");
        }
    }
}
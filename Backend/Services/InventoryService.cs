using AutoMapper;
using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services;

public class InventoryService : IInventoryService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly ILogger<InventoryService> _logger;

    public InventoryService(
        IUnitOfWork unitOfWork,
        IMapper mapper,
        ILogger<InventoryService> logger)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<IEnumerable<InventoryOperation>> GetAllOperationsAsync()
    {
        try
        {
            return await _unitOfWork.InventoryOperations.GetAllAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting inventory operations");
            throw;
        }
    }

    public async Task<InventoryOperationDTO> AddInventoryOperationAsync(
        InventoryOperationCreateDTO operationDto,
        string userId)
    {
        var operation = new InventoryOperation
        {
            ProductId = operationDto.ProductId,
            Quantity = operationDto.OperationType == "IN"
                ? operationDto.Quantity
                : -operationDto.Quantity,
            OperationType = operationDto.OperationType,
            Notes = operationDto.Notes,
            PerformedBy = userId,
            OperationDate = DateTime.UtcNow
        };

        await _unitOfWork.InventoryOperations.AddAsync(operation);
        await _unitOfWork.CompleteAsync();

        return _mapper.Map<InventoryOperationDTO>(operation);
    }

    public async Task<IEnumerable<InventoryStatusDTO>> GetInventoryStatusAsync()
    {
        try
        {
            var products = await _unitOfWork.Products.GetAllAsync();
            var operations = await _unitOfWork.InventoryOperations.GetAllAsync();

            return products.Select(p => new InventoryStatusDTO
            {
                Product = _mapper.Map<ProductDTO>(p),
                AvailableQuantity = operations
                    .Where(o => o.ProductId == p.Id)
                    .Sum(o => o.Quantity)
            }).ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting inventory status");
            throw;
        }
    }

    public async Task<IEnumerable<InventoryStatusDTO>> GetLowInventoryAsync(int threshold = 50)
    {
        try
        {
            var status = await GetInventoryStatusAsync();
            return status.Where(s => s.AvailableQuantity < threshold).ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting low inventory");
            throw;
        }
    }

    public async Task<InventoryReportDTO> GenerateInventoryReportAsync(InventoryReportRequestDTO request)
    {
        try
        {
            var products = await _unitOfWork.Products.GetAllAsync();
            var operations = await _unitOfWork.InventoryOperations.GetAllAsync();

            var filteredProducts = products
                .Where(p => request.ProductType == null || p.Type.ToString() == request.ProductType)
                .ToList();

            var reportData = filteredProducts.Select(p => new InventoryStatusDTO
            {
                Product = _mapper.Map<ProductDTO>(p),
                AvailableQuantity = operations
                    .Where(o => o.ProductId == p.Id)
                    .Sum(o => o.Quantity)
            }).ToList();

            return new InventoryReportDTO
            {
                GeneratedAt = DateTime.UtcNow,
                ReportData = reportData,
                FilterCriteria = request
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while generating inventory report");
            throw;
        }
    }
}
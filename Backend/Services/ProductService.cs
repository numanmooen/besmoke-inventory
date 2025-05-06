using AutoMapper;
using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace Backend.Services;

public class ProductService : IProductService
{
    private readonly IUnitOfWork _unitOfWork;
    private readonly IMapper _mapper;
    private readonly IMemoryCache _cache;
    private readonly ILogger<ProductService> _logger;

    public ProductService(
        IUnitOfWork unitOfWork,
        IMapper mapper,
        IMemoryCache cache,
        ILogger<ProductService> logger)
    {
        _unitOfWork = unitOfWork;
        _mapper = mapper;
        _cache = cache;
        _logger = logger;
    }

    public async Task<IEnumerable<Product>> GetAllProductsAsync()
    {
        try
        {
            const string cacheKey = "all-products";
            if (!_cache.TryGetValue(cacheKey, out IEnumerable<Product> products))
            {
                products = await _unitOfWork.Products.GetAllAsync();
                _cache.Set(cacheKey, products, TimeSpan.FromMinutes(5));
                _logger.LogInformation("Products loaded from database and cached");
            }
            return products;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while getting all products");
            throw;
        }
    }

    public async Task<Product?> GetProductByIdAsync(int id)
    {
        try
        {
            var cacheKey = $"product-{id}";
            if (!_cache.TryGetValue(cacheKey, out Product product))
            {
                product = await _unitOfWork.Products.GetByIdAsync(id);
                if (product != null)
                {
                    _cache.Set(cacheKey, product, TimeSpan.FromMinutes(5));
                }
            }
            return product;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error occurred while getting product with ID {id}");
            throw;
        }
    }

    public async Task<Product> AddProductAsync(Product product)
    {
        try
        {
            await _unitOfWork.Products.AddAsync(product);
            await _unitOfWork.CompleteAsync();
            _cache.Remove("all-products"); // Invalidate cache
            return product;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error occurred while adding new product");
            throw;
        }
    }

    public async Task UpdateProductAsync(Product product)
    {
        try
        {
            _unitOfWork.Products.Update(product);
            await _unitOfWork.CompleteAsync();
            _cache.Remove($"product-{product.Id}");
            _cache.Remove("all-products");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error occurred while updating product with ID {product.Id}");
            throw;
        }
    }

    public async Task DeleteProductAsync(int id)
    {
        try
        {
            var product = await _unitOfWork.Products.GetByIdAsync(id);
            if (product == null)
                throw new KeyNotFoundException($"Product with ID {id} not found");

            _unitOfWork.Products.Delete(product);
            await _unitOfWork.CompleteAsync();
            _cache.Remove($"product-{id}");
            _cache.Remove("all-products");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error occurred while deleting product with ID {id}");
            throw;
        }
    }

    public async Task<bool> ProductExistsAsync(int id)
    {
        return await _unitOfWork.Products.ExistsAsync(p => p.Id == id);
    }

    public async Task<int> GetProductStockAsync(int productId)
    {
        try
        {
            var cacheKey = $"product-stock-{productId}";
            if (!_cache.TryGetValue(cacheKey, out int stock))
            {
                var operations = await _unitOfWork.InventoryOperations.GetAllAsync();
                stock = operations
                    .Where(io => io.ProductId == productId)
                    .Sum(io => io.Quantity);
                _cache.Set(cacheKey, stock, TimeSpan.FromMinutes(1));
            }
            return stock;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Error occurred while calculating stock for product {productId}");
            throw;
        }
    }
}
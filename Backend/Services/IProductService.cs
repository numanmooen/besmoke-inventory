using Backend.DTOs;
using Backend.Models;

namespace Backend.Services;

public interface IProductService
{
    Task<IEnumerable<Product>> GetAllProductsAsync();
    Task<Product?> GetProductByIdAsync(int id);
    Task<Product> AddProductAsync(Product product);
    Task UpdateProductAsync(Product product);
    Task DeleteProductAsync(int id);
    Task<bool> ProductExistsAsync(int id);
    Task<int> GetProductStockAsync(int productId);
}
using Backend.Models;

namespace Backend.Data;

public interface IUnitOfWork : IDisposable
{
    IRepository<Product> Products { get; }
    IRepository<InventoryOperation> InventoryOperations { get; }
    Task<int> CompleteAsync();
}
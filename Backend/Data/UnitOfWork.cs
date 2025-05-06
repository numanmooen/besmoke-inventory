using Backend.Models;

namespace Backend.Data;

public class UnitOfWork : IUnitOfWork
{
    private readonly BesmokeDbContext _context;
    private IRepository<Product> _products;
    private IRepository<InventoryOperation> _inventoryOperations;

    public UnitOfWork(BesmokeDbContext context)
    {
        _context = context;
    }

    public IRepository<Product> Products =>
        _products ??= new Repository<Product>(_context);

    public IRepository<InventoryOperation> InventoryOperations =>
        _inventoryOperations ??= new Repository<InventoryOperation>(_context);

    public async Task<int> CompleteAsync() => await _context.SaveChangesAsync();

    public void Dispose() => _context.Dispose();
}
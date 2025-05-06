using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Backend.Data;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly BesmokeDbContext _context;
    private readonly DbSet<T> _dbSet;

    public Repository(BesmokeDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    public async Task<IEnumerable<T>> GetAllAsync() => await _dbSet.ToListAsync();

    public async Task<T?> GetByIdAsync(int id) => await _dbSet.FindAsync(id);

    public async Task AddAsync(T entity) => await _dbSet.AddAsync(entity);

    public void Update(T entity) => _dbSet.Update(entity);

    public void Delete(T entity) => _dbSet.Remove(entity);

    public async Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate) =>
        await _dbSet.AnyAsync(predicate);

    public async Task SaveAsync() => await _context.SaveChangesAsync();
}
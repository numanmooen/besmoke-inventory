using AutoMapper;
using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Backend.Controllers;

[Authorize]
[ApiController]
[Route("api/[controller]")] 
public class ProductsController : ControllerBase
{
    private readonly IProductService _productService;
    private readonly IMapper _mapper;

    public ProductsController(IProductService productService, IMapper mapper)
    {
        _productService = productService;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var products = await _productService.GetAllProductsAsync();
        return Ok(_mapper.Map<List<ProductDTO>>(products));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var product = await _productService.GetProductByIdAsync(id);
        if (product == null) return NotFound();
        return Ok(_mapper.Map<ProductDTO>(product));
    }

    [HttpPost]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Create(ProductCreateDTO productDto)
    {
        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
        var product = _mapper.Map<Product>(productDto);
        product.CreatedBy = userId;
        await _productService.AddProductAsync(product);
        return CreatedAtAction(nameof(GetById), new { id = product.Id }, _mapper.Map<ProductDTO>(product));
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin,Manager")]
    public async Task<IActionResult> Update(int id, ProductUpdateDTO productDto)
    {
        var product = await _productService.GetProductByIdAsync(id);
        if (product == null) return NotFound();

        var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

        _mapper.Map(productDto, product);
        product.LastModifiedBy = userId;
        product.LastModifiedAt = DateTime.UtcNow;

        await _productService.UpdateProductAsync(product);
        return NoContent();
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin")]
    public async Task<IActionResult> Delete(int id)
    {
        await _productService.DeleteProductAsync(id);
        return NoContent();
    }
}
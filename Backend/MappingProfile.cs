using AutoMapper;
using Backend.DTOs;
using Backend.Models;

namespace Backend;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Product, ProductDTO>().ReverseMap();
        CreateMap<ProductCreateDTO, Product>();
        CreateMap<ProductUpdateDTO, Product>();
        CreateMap<InventoryOperation, InventoryOperationDTO>().ReverseMap();
        CreateMap<ApplicationUser, UserDTO>().ReverseMap();
    }
}
namespace Backend.DTOs;

public class ProductDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Type { get; set; }
    public string Size { get; set; }
    public string Material { get; set; }
}

public class ProductCreateDTO
{
    public string Name { get; set; }
    public string Type { get; set; }
    public string Size { get; set; }
    public string Material { get; set; }
}

public class ProductUpdateDTO
{
    public string Name { get; set; }
    public string Type { get; set; }
    public string Size { get; set; }
    public string Material { get; set; }
}
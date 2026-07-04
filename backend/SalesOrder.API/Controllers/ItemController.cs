using Microsoft.AspNetCore.Mvc;
using SalesOrder.Application.Interfaces;

namespace SalesOrder.API.Controllers;

// This controller handles the item related endpoints
[ApiController]
[Route("api/[controller]")]
public class ItemController : ControllerBase
{
    private readonly IItemService _service;

    public ItemController(IItemService service)
    {
        _service = service;
    }

    // Get: api/item
    [HttpGet]
    public async Task<IActionResult> GetItems()
    {
        return Ok(await _service.GetAllAsync());
    }

    // Get: api/item/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);

        if (result == null)
            return NotFound();

        return Ok(result);
    }
}
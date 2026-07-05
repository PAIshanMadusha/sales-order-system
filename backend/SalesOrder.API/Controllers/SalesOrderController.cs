using Microsoft.AspNetCore.Mvc;
using SalesOrder.Application.Interfaces;
using SalesOrder.Application.Models;

namespace SalesOrder.API.Controllers;

// This controller handles the sales order related endpoints
[ApiController]
[Route("api/[controller]")]
public class SalesOrderController : ControllerBase
{
    private readonly ISalesOrderService _service;

    public SalesOrderController(ISalesOrderService service)
    {
        _service = service;
    }

    // post: api/salesorder
    [HttpPost]
    public async Task<IActionResult> Create(CreateSalesOrderRequest request)
    {
        var result = await _service.CreateAsync(request);
        return Ok(result);
    }

    // Get: api/salesorder
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _service.GetAllAsync();
        return Ok(result);
    }

    // Get: api/salesorder/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    // Put: api/salesorder/{id}
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, CreateSalesOrderRequest request)
    {
        var result = await _service.UpdateAsync(id, request);

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    // Delete: api/salesorder/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.DeleteAsync(id);

        if (!result)
            return NotFound();

        return Ok(new { message = "Order deleted successfully!" });
    }
}
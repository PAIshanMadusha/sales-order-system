using Microsoft.AspNetCore.Mvc;
using SalesOrder.Application.Interfaces;

namespace SalesOrder.API.Controllers;

// This controller handles the client related endpoints
[ApiController]
[Route("api/[controller]")]
public class ClientController : ControllerBase
{
    private readonly IClientService _service;

    public ClientController(IClientService service)
    {
        _service = service;
    }

    // Get: api/client
    [HttpGet]
    public async Task<IActionResult> GetClients()
    {
        return Ok(await _service.GetAllAsync());
    }

    // Get: api/client/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var result = await _service.GetByIdAsync(id);

        if (result == null)
            return NotFound();

        return Ok(result);
    }
}
using Microsoft.AspNetCore.Mvc;
using SalesOrder.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace SalesOrder.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ClientController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get: api/client
        [HttpGet]
        public async Task<IActionResult> GetClients()
        {
            var clients = await _context.Clients.ToListAsync();
            return Ok(clients);
        }

        // Get: api/client/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetClientById(int id)
        {
            var client = await _context.Clients.FirstOrDefaultAsync(x => x.Id == id);

            if (client == null)
                return NotFound();

            return Ok(client);
        }
    }
}
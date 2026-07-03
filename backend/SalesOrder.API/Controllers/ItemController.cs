using Microsoft.AspNetCore.Mvc;
using SalesOrder.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace SalesOrder.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ItemController(ApplicationDbContext context)
        {
            _context = context;
        }

        // Get: api/item
        [HttpGet]
        public async Task<IActionResult> GetItems()
        {
            var items = await _context.Items.ToListAsync();
            return Ok(items);
        }

        // Get: api/item/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetItemById(int id)
        {
            var item = await _context.Items.FirstOrDefaultAsync(x => x.Id == id);

            if (item == null)
                return NotFound();

            return Ok(item);
        }
    }
}
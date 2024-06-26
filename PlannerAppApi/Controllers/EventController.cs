using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlannerAppApi.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PlannerAppApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class EventController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EventController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Event
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Event>>> GetEvent()
        {
            if (_context.Event == null)
            {
                return NotFound();
            }
            // Include the Profile in the query to load related data
            return await _context.Event.Include(e => e.Profile).ToListAsync();
        }

        // GET: api/Event/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Event>> GetEvent(int id)
        {
            // Include the Profile in the query to load related data
            var eventItem = await _context.Event.Include(e => e.Profile).FirstOrDefaultAsync(e => e.EventId == id);
            if (eventItem == null || _context.Event == null)
            {
                return NotFound();
            }
            return eventItem;
        }

        // POST: api/Event
        [HttpPost]
        public async Task<ActionResult<Event>> PostEvent(Event eventItem)
        {
            if (_context.Event == null)
            {
                return Problem("Entity set 'ApplicationDbContext.Event' is null.");
            }
            _context.Event.Add(eventItem);
            await _context.SaveChangesAsync();

            // Include the Profile in the query to load related data when returning the created event
            var newEvent = await _context.Event.Include(e => e.Profile).FirstOrDefaultAsync(e => e.EventId == eventItem.EventId);
            return CreatedAtAction(nameof(GetEvent), new { id = newEvent.EventId }, newEvent);
        }

        // PUT: api/Event/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvent(int id, Event eventItem)
        {
            if (id != eventItem.EventId)
            {
                return BadRequest();
            }

            _context.Entry(eventItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Event.Any(e => e.EventId == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Event/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            if (_context.Event == null)
            {
                return NotFound();
            }
            var eventItem = await _context.Event.FindAsync(id);
            if (eventItem == null)
            {
                return NotFound();
            }

            _context.Event.Remove(eventItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}

using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PlannerAppApi.Data;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PlannerAppApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProfileController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProfileController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Profile
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profile>>> GetProfiles()
        {
            return await _context.Profile.ToListAsync();
        }

        // GET: api/Profile/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Profile>> GetProfile(int id)
        {
            var profile = await _context.Profile.FindAsync(id);

            if (profile == null)
            {
                return NotFound();
            }

            return profile;
        }

        // POST: api/Profile
        [HttpPost]
        public async Task<ActionResult<Profile>> PostProfile(Profile profile)
        {
            // Check if the UserId is provided and if a user with the given UserId exists
            if (profile.UserId == null || !_context.User.Any(u => u.UserId == profile.UserId))
            {
                return BadRequest("No user found with the provided UserId.");
            }

            // Add the profile to the context
            _context.Profile.Add(profile);
            await _context.SaveChangesAsync();

            // Fetch the profile with related user data to include in the response
            var createdProfile = await _context.Profile
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.ProfileId == profile.ProfileId);

            return CreatedAtAction("GetProfile", new { id = profile.ProfileId }, createdProfile);
        }

        // PUT: api/Profile/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProfile(int id, Profile profile)
        {
            if (id != profile.ProfileId)
            {
                return BadRequest();
            }

            _context.Entry(profile).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProfileExists(id))
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

        // DELETE: api/Profile/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProfile(int id)
        {
            var profile = await _context.Profile.FindAsync(id);
            if (profile == null)
            {
                return NotFound();
            }

            _context.Profile.Remove(profile);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProfileExists(int id)
        {
            return _context.Profile.Any(e => e.ProfileId == id);
        }
    }
}

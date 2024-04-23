namespace PlannerAppApi;

// User model
public class User
{
    public int UserId { get; set; }
    public string? UserName { get; set; }
    public List<Profile> Profiles { get; set; } = new List<Profile>();

}

// Event model
public class Event
{
    public int EventId { get; set; }
    public string? Title { get; set; }
    public string? Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public bool IsRecurring { get; set; }
    public int ProfileId { get; set; }
    public Profile? Profile { get; set; }}

public class Profile
{
    public int ProfileId { get; set; }
    public string? ProfileName { get; set; }

    // Navigation properties
    public int UserId { get; set; }
    public User? User { get; set; } // Fix: Declare User property as nullable
    public List<Event> Events { get; set; } = new List<Event>();
}

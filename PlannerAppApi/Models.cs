namespace PlannerAppApi;

// User model
public class User
{
    public int UserId { get; set; }
    public string? UserName { get; set; }
    public List<Profile>? Profiles { get; set; } // Profiles can be null
}

// Profile model
public class Profile
{
    public int ProfileId { get; set; }
    public string? ProfileName { get; set; }
    public int? UserId { get; set; } // User ID is now nullable
    public User? User { get; set; } // User can be null
    public List<Event>? Events { get; set; } // Events can be null
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
    public int? ProfileId { get; set; } // ProfileId is now nullable
    public Profile? Profile { get; set; } // Profile can be null
}

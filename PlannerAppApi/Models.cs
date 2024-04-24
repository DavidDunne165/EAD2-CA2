namespace PlannerAppApi;

// User model
public class User
{
    public User()
    {
        Profiles = new List<Profile>();  // Initialize the list to prevent null references
    }

    public int UserId { get; set; }
    public string? UserName { get; set; }
    public List<Profile> Profiles { get; set; }  // No longer nullable
}

// Profile model
public class Profile
{
    public Profile()
    {
        Events = new List<Event>();  // Initialize the list of events to prevent null references
    }

    public int ProfileId { get; set; }
    public string? ProfileName { get; set; }
    public int? UserId { get; set; } // Keep as nullable if a profile may exist without a user initially
    public User? User { get; set; } // Navigation property, keep as nullable if needed
    public List<Event> Events { get; set; } // No longer nullable
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

namespace PlannerAppApi;

// User model
public class User
{
    public int UserId { get; set; }
    public string? UserName { get; set; }
    // Add other user-related properties as needed
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
    // Add other event-related properties as needed
}


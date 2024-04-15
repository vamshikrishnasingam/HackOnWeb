using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Models
{
    public class HackathonModel
    {
        public string HackathonId { get; set; }
        public string HackathonName { get; set; }
        public string HackathonDescription { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public bool coding { get; set; }
        public string organization { get; set; }
        public Round1Details Round1 { get; set; }
        public Round2Details Round2 { get; set; }
        public Round3Details Round3 { get; set; }


    }
    public class Round1Details
    {
        public string Round1Name { get; set; }
        public string platform { get; set; }
        public string Link { get; set; }
        public DateOnly CodingDate { get; set; }
        public TimeOnly StartTime { get; set; }
        public TimeOnly EndTime { get; set; }
    }
    public class Round2Details
    {
        public string Round2Name { get; set; }
        public string ProblemStatementsURL { get; set; }
        public string ModeOfProblemStatements { get; set; }
        public DateOnly PPTStartDate { get; set; }
        public DateOnly PPTEndDate { get; set; }
        public TimeOnly PPTStartTime { get; set; }
        public TimeOnly PPTEndTime { get; set; }
        public string ModeOfSubmission { get; set; }
    }
    public class Round3Details
    {
        public string Round3Name { get; set; }
        public string DiscordURL { get; set; }
        public string ModeOfHack { get; set; }
        public DateOnly HackStartDate { get; set; }
        public DateOnly HackEndDate { get; set; }
        public TimeOnly HackStartTime { get; set; }
        public TimeOnly HackEndTime { get; set; }
        public string Venue { get; set; }
    }

}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Models
{
    public class HackathonModel
    {
        public string id { get; set; }

        public string HackathonId { get; set; }
        public string HackathonName { get; set; }
        public string HackathonDescription { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
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
        public string CodingDate { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
    }
    public class Round2Details
    {
        public string Round2Name { get; set; }
        public string ProblemStatementsURL { get; set; }
        public string ModeOfProblemStatements { get; set; }
        public string PPTStartDate { get; set; }
        public string PPTEndDate { get; set; }
        public string PPTStartTime { get; set; }
        public string PPTEndTime { get; set; }
        public string ModeOfSubmission { get; set; }
    }
    public class Round3Details
    {
        public string Round3Name { get; set; }
        public string DiscordURL { get; set; }
        public string ModeOfHack { get; set; }
        public string HackStartDate { get; set; }
        public string HackEndDate { get; set; }
        public string HackStartTime { get; set; }
        public string HackEndTime { get; set; }
        public string Venue { get; set; }
    }

}
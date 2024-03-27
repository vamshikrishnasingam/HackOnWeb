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
        public string Hackathonid { get; set; }
        public string HackathonName { get; set; }
        public string HackathonDescription { get; set; }
        public Round1Details Round1 { get; set; }
        public Round2Details Round2 { get; set; }

    }
    public class Round1Details
    {
        public bool IsRound1 { get; set; }
        public string Round1Name { get; set; }
        public string Link { get; set; }
    }
    public class Round2Details
    {
        public string Round2Name { get; set; }
        public List<string> ProblemStatements { get; set; }
        public string ModeOfProblemStatements { get; set; }

        public PPTSubmission pptround { get; set; }

        public class PPTSubmission
        {
            public string Type { get; set; }

            // 1 submit ppt online
            public string MainLink { get; set; }
            /*                public List<string> pptLink { get; set; }
            */
            // check for summary
            public bool summarize { get; set; }
            /*                    public List<string> SummarizedPPT { get; set; }
            */                    // 2 manual check
            public List<string> Qualifiers { get; set; }
            // 2 make online presentation
            // 
            // 3 
        }
    }
    public class Round3Details
    {
        public string Id { get; set; }
        public string Name { get; set; }
    }

}
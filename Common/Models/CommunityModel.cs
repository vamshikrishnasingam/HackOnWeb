using System;
using System.Collections.Generic;

namespace Common.Models
{
    public class CommunityModel
    {
        public string id { get; set; }
        public string communityName { get; set; }
        public List<FileModel> posts { get; set; }
        public List<FileModel> files { get; set; }
        public List<CommentModel> comments { get; set; }
        public int likes { get; set; }
        public int disLikes { get; set; }
        public string HackathonId { get; set; }
        public List<string> Members { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public PPTModel IdeaSubmission { get; set; }
        public string githubLink { get; set; }
        public string appLink { get; set; }
        public string description { get; set; }
        public bool visibility { get; set; }
        public class PPTModel
        {
            public string? Uri { get; set; }
            public string? Id { get; set; }

            public string? FileName { get; set; }

            public string? ContentType { get; set; }
            public string? Summary { get; set; }
            public Stream? Content { get; set; } // Byte array representing the file content
                                                    // Add additional properties as needed, such as URL or path
        }
    }
}

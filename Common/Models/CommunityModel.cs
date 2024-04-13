using System;
using System.Collections.Generic;

namespace Common.Models
{
    public class CommunityModel
    {
        public string Id { get; set; }
        public string CommunityName { get; set; }
        public List<FileModel> Posts { get; set; }
        public List<FileModel> Files { get; set; }
        public string GithubLink { get; set; }
        public string AppLink { get; set; }
        public string Description { get; set; }
    }
}

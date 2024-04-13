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
        public string githubLink { get; set; }
        public string appLink { get; set; }
        public string description { get; set; }
    }
}

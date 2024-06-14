﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Models
{
    public class SignUpModel
    {
        public string username { get; set; }
        public string password { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public bool verified { get; set; }
        public FileModel verificationDocs { get; set; }
        public List<CommunityModel> Teams { get; set; }
        public string uid { get; set; }
        public SignUpModel()
        {
            uid = "1";
            verified = false;
            verificationDocs = new FileModel();
            Teams = new List<CommunityModel>();
        }
    }
    /*public class Team
    {
        public string id { get; set; }
        public string communityName { get; set; }
        public string HackathonId { get; set; }
        public List<string> Members { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
        public int Status { get; set; }
    }*/
}
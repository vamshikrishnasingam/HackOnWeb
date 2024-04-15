using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Models
{
    public class UserModel
    {
        public string id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
        public string phone { get; set; }
        public string email { get; set; }
        public bool verified { get; set; }
        public FileModel verificationDocs { get; set; }

        public UserModel()
        {
            verified = false;
            verificationDocs = new FileModel();
        }
    }
}
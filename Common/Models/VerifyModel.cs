using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Models
{
    public class VerifyModel
    {
        public string email { get; set; }
        public string password { get; set; }

        public bool verified { get; set; }
        public FileModel verificationDocs { get; set; }
    }
}

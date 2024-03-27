using Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HackOnWebRepo
{
    public interface IHackathonRepository
    {
        public Task<List<UserModel>> getAllUsers();

        public Task<List<UserModel>> getUserById(string id);
    }
}
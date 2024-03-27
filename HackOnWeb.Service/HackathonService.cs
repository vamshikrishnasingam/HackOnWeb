using Common.Models;
using HackOnWebRepo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HackOnWebService
{
    public class HackathonService : IHackathonService
    {
        private readonly IHackathonRepository _hackathonRepository;
        public HackathonService(IHackathonRepository hackathonRespoitory)
        {
            _hackathonRepository = hackathonRespoitory;
        }
        public async Task<List<UserModel>> getAllUsers()
        {
            return await _hackathonRepository.getAllUsers();
        }

        public async Task<List<UserModel>> getUserById(string id)
        {
            return await _hackathonRepository.getUserById(id);
        }
        public async Task<UserModel> LoginWithPassword(string email,string password)
        {
            return await _hackathonRepository.LoginWithPassword(email, password);
        }
        public async Task<UserModel> CreateNewUser(UserModel user)
        {
            return await _hackathonRepository.CreateNewUser(user);
        }
    }
}
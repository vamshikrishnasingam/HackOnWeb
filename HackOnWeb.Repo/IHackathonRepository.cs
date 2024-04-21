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

        public Task<UserModel> LoginWithPassword(string email, string password);

        public Task<UserModel> CreateNewUser(UserModel user);

        public Task<List<HackathonModel>> GetHackathonDetails();
        public Task<HackathonModel> uploadHackathon(HackathonModel hackathon);


        public Task AddFile(FileModel file);

        public Task<CommunityModel> GetCommunityDetails(string Id);
        public Task<List<CommunityModel>> GetAllCommunityDetails();


        public Task<string> UpdateCommunityDetails(CommunityModel community);

        public Task<int> VerifyHost(VerifyModel vm);
    }
}
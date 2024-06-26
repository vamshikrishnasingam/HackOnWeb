﻿using Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;

namespace HackOnWebService
{
    public interface IHackathonService
    {

        public Task<List<UserModel>> getAllUsers();
        public Task<List<UserModel>> getUserByEmail(string email);
        public Task<List<UserModel>> getUserById(string id);
        
        public Task<UserModel> LoginWithPassword(string email,string password);

        public Task<UserModel> CreateNewUser(UserModel user);

        public Task<bool> UpdateUser(UserModel user);
        public Task<List<HackathonModel> >GetHackathonDetails();
        public Task<HackathonModel> uploadHackathon(HackathonModel hackathon);
        public Task<List<FileModel>> ListAsync();

        public Task<FileResponseModel> UploadAsync(IFormFile blob);

        public Task<CommunityModel> GetCommunityDetails(string Id);
        public Task<List<CommunityModel>> GetAllCommunityDetails();

        public Task<string> UpdateCommunityDetails(CommunityModel community);

        public Task<int> VerifyHost(VerifyModel vm);


        //get hackathon details by id
        public Task<List<HackathonModel>> GetHackathonDetailsbyId(string id);
        public Task<List<string>> ValidateUserEmails(List<string> emails);
        public Task<int> CreateTeam(CommunityModel team);

    }
}
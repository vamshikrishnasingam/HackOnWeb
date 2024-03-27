﻿using Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HackOnWebService
{
    public interface IHackathonService
    {

        public Task<List<UserModel>> getAllUsers();

        public Task<List<UserModel>> getUserById(string id);
        
        public Task<UserModel> LoginWithPassword(string email,string password);

        public Task<UserModel> CreateNewUser(UserModel user);

        public Task<string> HackathonDetails(HackathonModel hackdetails);
    }
}
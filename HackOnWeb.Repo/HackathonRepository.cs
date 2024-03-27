using Microsoft.Azure.Cosmos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;

namespace HackOnWebRepo
{
    public class HackathonRepository : IHackathonRepository
    {
        private readonly CosmosClient _cosmosclient;
        private const string DatabaseId = "HackathonMgmt";
        private const string ContainerId = "Users";
        public HackathonRepository(CosmosClient cosmosClient)
        {
            _cosmosclient = cosmosClient;
        }
        public async Task<List<UserModel>> getAllUsers()
        {
            var container = _cosmosclient.GetContainer(DatabaseId, ContainerId);

            var query = "SELECT * FROM c";
            var queryDefinition = new QueryDefinition(query);
            var Users = new List<UserModel>();

            var resultSetIterator = container.GetItemQueryIterator<UserModel>(queryDefinition);

            while (resultSetIterator.HasMoreResults)
            {
                var CurrentUser = await resultSetIterator.ReadNextAsync();
                Users.AddRange(CurrentUser);
            }

            return Users;
        }

        public async Task<List<UserModel>> getUserById(string id)
        {
            var container = _cosmosclient.GetContainer(DatabaseId, ContainerId);

            var query = "SELECT * FROM c WHERE c.id = @id";
            var queryDefinition = new QueryDefinition(query).WithParameter("@id", id);
            var users = new List<UserModel>();

            var resultSetIterator = container.GetItemQueryIterator<UserModel>(queryDefinition);

            while (resultSetIterator.HasMoreResults)
            {
                var currentUser = await resultSetIterator.ReadNextAsync();
                users.AddRange(currentUser);
            }

            return users;
        }

        public async Task<UserModel> LoginWithPassword(string email, string password)
        {
            var container = _cosmosclient.GetContainer(DatabaseId, ContainerId);

            var query = "SELECT * FROM c WHERE c.email = @email";
            UserModel user = null;
            var queryDefinition = new QueryDefinition(query).WithParameter("@email", email);
            var resultSetIterator = container.GetItemQueryIterator<UserModel>(queryDefinition);
            while (resultSetIterator.HasMoreResults)
            {
                var response = await resultSetIterator.ReadNextAsync();
                foreach (var currentUser in response)
                {
                    if (ValidatePassword(currentUser, password))
                    {
                        user = currentUser;
                        break; // Exit the loop once a valid user is found
                    }
                }
            }
            return user;

        }
        private bool ValidatePassword(UserModel user, string password)
        {
            // Example: Implement password validation logic (e.g., using hashing and comparison)
            // Compare hashed password stored in user.PasswordHash with the hashed password derived from input password
            // Example: return PasswordHashing.VerifyPassword(password, user.PasswordHash);
            return user.password == password; // This is a basic example; use a secure hashing algorithm in a real application
        }

        public async Task<UserModel> CreateNewUser(UserModel user)
        {
            var container = _cosmosclient.GetContainer(DatabaseId, ContainerId);

            // Assuming UserModel has an 'Id' property for document identification
            user.id = Guid.NewGuid().ToString(); // Generate a unique ID for the new user

            // Insert the user document into the container
            var response = await container.CreateItemAsync(user, new PartitionKey(user.email));

            // Check if the user was successfully created
            if (response.StatusCode == System.Net.HttpStatusCode.Created)
            {
                return user; 
            }
            else
            {
                throw new Exception("Failed to create user.");
            }

        }
        public async Task<string> HackathonDetails(HackathonModel hackdetails)
        {
            var container = _cosmosclient.GetContainer(DatabaseId, "HackathonDetails");

            try
            {
                hackdetails.id = Guid.NewGuid().ToString();
                hackdetails.Hackathonid = Guid.NewGuid().ToString();
                var response = await container.CreateItemAsync(hackdetails);
                return $"Hackathon details inserted with status code: {response.StatusCode}";
            }
            catch (Exception ex)
            {
                return $"Error inserting hackathon details: {ex.Message}";
            }
        }

    }

}
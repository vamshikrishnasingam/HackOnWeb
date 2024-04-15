using Microsoft.Azure.Cosmos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Common.Models;
using Azure;
using Newtonsoft.Json;

namespace HackOnWebRepo
{
    public class HackathonRepository : IHackathonRepository
    {
        private readonly CosmosClient _cosmosclient;
        private const string DatabaseId = "HackathonMgmt";
        private const string UserContainerId = "Users";
        private const string FContainerId = "Files";
        private const string HackathonContainerId = "HackathonDetails";
        private const string CommunityContainerId = "Communities";

        public HackathonRepository(CosmosClient cosmosClient)
        {
            _cosmosclient = cosmosClient;
        }
        public async Task<List<UserModel>> getAllUsers()
        {
            var container = _cosmosclient.GetContainer(DatabaseId, UserContainerId);

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
        //getHackathonDetails
        public async Task<List<HackathonModel>> GetHackathonDetails()
        {
            var container = _cosmosclient.GetContainer(DatabaseId, HackathonContainerId);
            var query = "SELECT * FROM c";
            var queryDefinition = new QueryDefinition(query);
            var hackathons = new List<HackathonModel>();
            var resultSetIterator = container.GetItemQueryIterator<HackathonModel>(queryDefinition);
            while (resultSetIterator.HasMoreResults)
            {
                var CurrentHackathon = await resultSetIterator.ReadNextAsync();
                hackathons.AddRange(CurrentHackathon);
            }
            return hackathons;
        }
        //uploadHackathonDetails
        public async Task<HackathonModel> uploadHackathon(HackathonModel hackathon)
        {
            var container = _cosmosclient.GetContainer(DatabaseId, HackathonContainerId);
            var response = await container.CreateItemAsync(hackathon, new PartitionKey(hackathon.HackathonId));

            // Check if the user was successfully created
            if (response.StatusCode == System.Net.HttpStatusCode.Created)
            {
                return hackathon;
            }
            else
            {
                throw new Exception("Failed to create user.");
            }

        }








        public async Task<List<UserModel>> getUserById(string id)
        {
            var container = _cosmosclient.GetContainer(DatabaseId, UserContainerId);

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
            var container = _cosmosclient.GetContainer(DatabaseId, UserContainerId);

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
            var container = _cosmosclient.GetContainer(DatabaseId, UserContainerId);


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
                hackdetails.HackathonId = Guid.NewGuid().ToString();
                var response = await container.CreateItemAsync(hackdetails);
                return $"Hackathon details inserted with status code: {response.StatusCode}";
            }
            catch (Exception ex)
            {
                return $"Error inserting hackathon details: {ex.Message}";
            }
        }

        //uploading file
        public async Task AddFile(FileModel file)
        {
            var container = _cosmosclient.GetContainer(DatabaseId, FContainerId);
            await container.CreateItemAsync(file, new PartitionKey(file.FileName));
        }

        public async Task<CommunityModel> GetCommunityDetails(string Id)
        {
            var container = _cosmosclient.GetContainer(DatabaseId, CommunityContainerId);

            var query = "SELECT * FROM c WHERE c.id = @Id";
            var queryDefinition = new QueryDefinition(query).WithParameter("@Id", Id);
            try
            {
                var resultSetIterator = container.GetItemQueryIterator<CommunityModel>(queryDefinition);
                if (resultSetIterator.HasMoreResults)
                {
                    var response = await resultSetIterator.ReadNextAsync();
                    var currentComm = response.FirstOrDefault();
                    if (currentComm != null)
                    {
                        return new CommunityModel
                        {
                            communityName = currentComm.communityName,
                            id = currentComm.id,
                            description = currentComm.description,
                            appLink = currentComm.appLink,
                            githubLink = currentComm.githubLink,
                            posts = currentComm.posts,
                            files = currentComm.files,
                            visibility = currentComm.visibility
                        };
                    }
                }
            }
            catch (Exception ex)
            {
                // Handle exception
                Console.WriteLine($"An error occurred: {ex.Message}");
            }

            return null; // or throw an exception if required
        }
        public async Task<string> UpdateCommunityDetails(CommunityModel community)
        {
            var container = _cosmosclient.GetContainer(DatabaseId, CommunityContainerId);

            try
            {
                var id = community.id;
                var name = community.communityName;
                var response = await container.ReplaceItemAsync(community, id, new PartitionKey(name));

                return $"Community details updated with status code: {response.StatusCode}";
            }
            catch (Exception ex)
            {
                return $"Error updating community details: {ex.Message}";
            }

        }


    }

}
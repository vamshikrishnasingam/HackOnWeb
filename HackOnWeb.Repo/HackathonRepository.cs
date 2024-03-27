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
            var students = new List<UserModel>();

            var resultSetIterator = container.GetItemQueryIterator<UserModel>(queryDefinition);

            while (resultSetIterator.HasMoreResults)
            {
                var currentUser = await resultSetIterator.ReadNextAsync();
                students.AddRange(currentUser);
            }

            return students;
        }

    }

}
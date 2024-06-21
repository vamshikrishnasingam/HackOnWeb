using Common.Models;
using HackOnWebRepo;
using Azure.Storage.Blobs;
using Azure.Storage;
using Microsoft.AspNetCore.Http;




namespace HackOnWebService
{
    public class HackathonService : IHackathonService
    {
        private readonly string _storageAccount = "fileblob1421";
        private readonly string _accesskey = "VeL0hmaBlKb4v1f/80UU3gVcgIl4G+2CtU6/aCpOT9PFDXViG1QzLQ/IeBemcBhd7FquMm8A9fGF+AStmpY4Aw==";
        private readonly BlobContainerClient  _filesContainer;
        private readonly IHackathonRepository _hackathonRepository;

        public HackathonService(IHackathonRepository hackathonRespoitory)
        {
            _hackathonRepository = hackathonRespoitory;
            var credential = new StorageSharedKeyCredential(_storageAccount, _accesskey);
            var blobUri = $"https://{_storageAccount}.blob.core.windows.net";
            var blobServiceClient=new BlobServiceClient(new Uri(blobUri), credential);
            _filesContainer = blobServiceClient.GetBlobContainerClient("files");
        }

        
        public async Task<List<UserModel>> getAllUsers()
        {
            return await _hackathonRepository.getAllUsers();
        }

        public async Task<List<UserModel>> getUserById(string id)
        {
            return await _hackathonRepository.getUserById(id);
        }
        public async Task<List<UserModel>> getUserByEmail(string email)
        {
            return await _hackathonRepository.getUserByEmail(email);
        }

        public async Task<bool> UpdateUser(UserModel user)
        {
            return await _hackathonRepository.UpdateUser(user);
        }
        public async Task<UserModel> LoginWithPassword(string email,string password)
        {
            return await _hackathonRepository.LoginWithPassword(email, password);
        }
        public async Task<UserModel> CreateNewUser(UserModel user)
        {
            return await _hackathonRepository.CreateNewUser(user);
        }
      /*  public async Task<string> HackathonDetails(HackathonModel hackdetails)
        {
            return await _hackathonRepository.HackathonDetails(hackdetails);
        }*/

        public async Task<List<FileModel>> ListAsync()
        {
            List<FileModel>files=new List<FileModel>();
            await foreach (var file in _filesContainer.GetBlobsAsync())
            {
                string uri = _filesContainer.Uri.ToString();
                var name = file.Name;
                var fullUri = $"{uri}/{name}";
                files.Add(new FileModel
                {
                    Uri = fullUri,
                    ContentType = file.Properties.ContentType,
                    Id = name,
                });
            }
            return files;
        }

        public async Task<FileResponseModel> UploadAsync (IFormFile blob)
        {

            try
            {

                FileResponseModel response = new();
                var FileId = Guid.NewGuid().ToString() + Path.GetExtension(blob.FileName);
                BlobClient client = _filesContainer.GetBlobClient(FileId);
                await using (Stream? data = blob.OpenReadStream())
                {
                    await client.UploadAsync(data);
                }
                response.Status = $"File {blob.FileName} uploaded succesfully";
                response.Error = false;
                response.Blob.Uri = client.Uri.AbsoluteUri;
                response.Blob.Id = FileId;
                response.Blob.FileName = blob.FileName;
                response.Blob.ContentType = blob.ContentType;
                return response;
            }
            catch (Exception e)
            {
                return new FileResponseModel
                {
                    Status = e.Message,
                    Error = true
                };
            }   
        }
        public async Task<CommunityModel> GetCommunityDetails(string Id)
        {
            return await _hackathonRepository.GetCommunityDetails(Id);
        }
        public async Task<List<CommunityModel>> GetAllCommunityDetails()
        {
            return await _hackathonRepository.GetAllCommunityDetails();
        }


        public async Task<string> UpdateCommunityDetails(CommunityModel community)
        {
            return await _hackathonRepository.UpdateCommunityDetails(community);
        }

        public async Task<List<HackathonModel>> GetHackathonDetails()
        {
            return await _hackathonRepository.GetHackathonDetails();
        }
        public async Task<HackathonModel> uploadHackathon(HackathonModel hackathon)
        {
            return await _hackathonRepository.uploadHackathon(hackathon);

        }

        public async Task<int> VerifyHost(VerifyModel vm)
        {
            return await _hackathonRepository.VerifyHost(vm);
        }

        //get hackathon details by id
        public async Task<List<HackathonModel>> GetHackathonDetailsbyId(string id)
        {
            return await _hackathonRepository.GetHackathonDetailsbyId(id);
        }
        //validate user emails

        public async Task<List<string>> ValidateUserEmails(List<string> emails)
        {
            var invalidEmails = new List<string>();

            foreach (var email in emails)
            {
                bool isValid = await _hackathonRepository.ValidateUserEmail(email);
                if (!isValid)
                {
                    invalidEmails.Add(email);
                }
            }

            return invalidEmails;
        }
        //create team or community
        public async Task<int> CreateTeam(CommunityModel team)
        {
            bool teamres=await _hackathonRepository.CreateTeam(team);
            if(teamres==false)
            {
                return 3;
            }
            bool usersTeamsUpdated = true;
            foreach (string email in team.Members)
            {
                List<UserModel> users = await _hackathonRepository.getUserByEmail(email);
                users[0].Teams.Add(team);
                bool currentUsersTeamsUpdated = await _hackathonRepository.UpdateUser(users[0]);
                usersTeamsUpdated=(usersTeamsUpdated && currentUsersTeamsUpdated);
            }
            if (teamres && usersTeamsUpdated)
            {
                return 1;
            }
            return 2;
        }
    }
}
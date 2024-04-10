using Common.Models;
using HackOnWebRepo;
using Azure.Storage.Blobs;
using Azure.Storage;
using Microsoft.AspNetCore.Http;




namespace HackOnWebService
{
    public class HackathonService : IHackathonService
    {
        //private readonly string _storageAccount = "fileblob1421";
        //private readonly string _accesskey = "";
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
        public async Task<UserModel> LoginWithPassword(string email,string password)
        {
            return await _hackathonRepository.LoginWithPassword(email, password);
        }
        public async Task<UserModel> CreateNewUser(UserModel user)
        {
            return await _hackathonRepository.CreateNewUser(user);
        }
        public async Task<string> HackathonDetails(HackathonModel hackdetails)
        {
            return await _hackathonRepository.HackathonDetails(hackdetails);
        }

        public async Task<List<FileModel>> ListAsync()
        {
            List<FileModel>files=new List<FileModel>();
            await foreach (var file in _filesContainer.GetBlobsAsync())
            {
                string uri=_filesContainer.Uri.ToString();
                var name=file.Name;
                var fullUri = $"{uri}/{name}";
                files.Add(new FileModel
                {
                    Uri = fullUri,
                    Name = name,
                    ContentType = file.Properties.ContentType,
                    FileName= name,
                });
            }
            return files;
        }

        public async Task<FileResponseModel> UploadAsync (IFormFile blob)
        {
            

            FileResponseModel response = new();
            BlobClient client = _filesContainer.GetBlobClient(blob.FileName);
            await using (Stream? data = blob.OpenReadStream())
            {
                await client.UploadAsync(data);
            }
            response.Status=$"File {blob.FileName} uploaded succesfully";
            response.Error = false;
            response.Blob.Uri = client.Uri.AbsoluteUri;
            response.Blob.Name=client.Name;
            response.Blob.FileName=blob.FileName;

            return response;
        }
       
    }
}
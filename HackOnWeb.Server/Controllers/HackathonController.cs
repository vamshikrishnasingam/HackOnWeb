using Common.Models;
using HackOnWebService;
using Microsoft.AspNetCore.Mvc;

namespace HackOnWeb.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HackathonsController : Controller
    {
        private readonly IHackathonService _hackathonService;

        public HackathonsController(IHackathonService hackathonService)
        {
            _hackathonService = hackathonService;
        }
        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<ActionResult<List<UserModel>>> GetAllUsers()
        {
            try
            {
                // Call the corresponding method in the service layer
                return Ok(await _hackathonService.getAllUsers());
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpGet]
        [Route("GetUserById")]
        public async Task<ActionResult<List<UserModel>>> GetUserById(string id)
        {
            try
            {
                // Call the corresponding method in the service layer
                return Ok(await _hackathonService.getUserById(id));
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("LoginWithPassword")]
        public async Task<ActionResult<UserModel>> LoginWithPassword(LoginModel userCredObj)
        {
            try
            {
                var email = userCredObj.email;
                var password = userCredObj.password;
                if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
                {
                    return BadRequest("username and password are required.");
                }
                // Call the corresponding method in the service layer
                UserModel user=await _hackathonService.LoginWithPassword(email,password);
                if (user == null)
                {
                    return NotFound();
                }
                else
                {
                    return Ok(user);
                }
            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("CreateNewUser")]
        public async Task<ActionResult<UserModel>> CreateNewUser(SignUpModel user)
        {
            try
            {
                if (string.IsNullOrEmpty(user.username)||string.IsNullOrEmpty(user.email) || string.IsNullOrEmpty(user.password) || string.IsNullOrEmpty(user.firstname) || string.IsNullOrEmpty(user.lastname) || string.IsNullOrEmpty(user.phone))
                {
                    return BadRequest("All fields are required.");
                }
                // Call the corresponding method in the service layer
                /*UserModel user = new UserModel
                { 
                    firstname = firstname,
                    lastname = lastname,
                    email = email,
                    password = password,
                    phone = phone
                };*/

                UserModel newUser = new UserModel
                {
                    username = user.username,
                    email = user.email,
                    password = user.password,
                    firstname = user.firstname,
                    lastname = user.lastname,
                    id = Guid.NewGuid().ToString(), // You might adjust this based on your logic
                    phone = user.phone
                };
                var createdUser = await _hackathonService.CreateNewUser(newUser);
                return CreatedAtAction(nameof(GetUserById), new { id = createdUser.id }, createdUser);

            }
            catch (Exception ex)
            {
                // Log the exception or handle it as needed
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        //file upload
        [HttpGet]
        [Route("ListFiles")]
        public async Task<IActionResult> ListAllBlobs()
        {
            var result = await _hackathonService.ListAsync();
            return Ok(result);
        }

        [HttpPost]
        [Route("UploadFile")]
        public async Task<IActionResult>UploadFile(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest("No file uploaded");
                var result = await _hackathonService.UploadAsync(file);
                return Ok(result); 
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("GetCommunityDetails")]
        public async Task<ActionResult<CommunityModel>>GetCommunityDetails(string Id)
        {
            try
            {
                var result = await _hackathonService.GetCommunityDetails(Id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("GetAllCommunityDetails")]
        public async Task<ActionResult<List<CommunityModel>>> GetAllCommunityDetails()
        {
            try
            {
                var result = await _hackathonService.GetAllCommunityDetails();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpPut]
        [Route("UpdateCommunityDetails")]
        public async Task<ActionResult<CommunityModel>> UpdateCommunityDetails(CommunityModel community)
        {
            try
            {
                var result = await _hackathonService.UpdateCommunityDetails(community);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("GetHackathonDetails")]
        public async Task<ActionResult<List<HackathonModel>>> GetHackathonDetails()
        {
            try
            {
                var result = await _hackathonService.GetHackathonDetails();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("UploadHackathonDetails")]
        public async Task<ActionResult<HackathonModel>> UploadHackathon(HackathonModel hackathon)
        {
            try
            {
                var result = await _hackathonService.uploadHackathon(hackathon);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        [HttpPost]
        [Route("VerifyHost")]
        public async Task<ActionResult<int>> VerifyHost(VerifyModel vm)
        {
            try
            {
                vm.verified = false;
                int result = await _hackathonService.VerifyHost(vm);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }

        [HttpGet]
        [Route("GetHackathonDetailsID")]
        public async Task<ActionResult<List<HackathonModel>>> GetHackathonDetailsbyId(string id)
        {
            try
            {
                var result = await _hackathonService.GetHackathonDetailsbyId(id);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
    }

}

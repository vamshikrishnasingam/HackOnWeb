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
    }
}
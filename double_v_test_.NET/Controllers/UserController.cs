using AutoMapper;
using double_v_test_.NET.Dto;
using double_v_test_.NET.Interfaces;
using double_v_test_.NET.Models;
using Microsoft.AspNetCore.Mvc;

namespace double_v_test_.NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserController(IUserRepository userRepository, IMapper mapper)
        {
            this._userRepository = userRepository;
            this._mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(200, Type = typeof(IEnumerable<User>))]
        public IActionResult GetUsers()
        {
            var users = _mapper.Map<List<UserDto>>(_userRepository.GetUsers());

            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(users);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(200, Type = typeof(User))]
        [ProducesResponseType(400)]
        public IActionResult GetUser(int id)
        {
            if (!_userRepository.UserExists(id))
            {
                return NotFound();
            }

            var user = _mapper.Map<UserDto>(_userRepository.GetUser(id));

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            return Ok(user);
        }

        [HttpPost]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult CreateUser([FromBody] User user)
        {
            if (user == null)
            {
                return NotFound();
            }

            if (_userRepository.UserNameExists(user.Name))
            {
                return Ok(new
                {
                    status = 401,
                    message = "User name already exists"
                });
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userMapped = _mapper.Map<User>(user);

            if (!_userRepository.CreateUser(userMapped))
            {
                ModelState.AddModelError("", "User Could Not Be Created");
                return StatusCode(500, ModelState);
            }

            return Ok("User Created");
        }

        [HttpPut("{id}")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        [ProducesResponseType(404)]
        public IActionResult UpdateUser([FromQuery] int id, [FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest();
            }

            if(id != user.Id) {
                return BadRequest(ModelState);
            }

            if(!_userRepository.UserExists(id))
            {
                return NotFound();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var savedUser = _mapper.Map<User>(_userRepository.GetUser(id));
            savedUser.Password = user.Password;

            if (!_userRepository.UpdateUser(savedUser))
            {
                ModelState.AddModelError("", "User Could Not Be Updated");
                return StatusCode(500, ModelState);
            }

            return NoContent();
        }

        [HttpPost("login")]
        [ProducesResponseType(204)]
        [ProducesResponseType(400)]
        public IActionResult Login([FromBody] LoginDto user)
        {
            if(user == null)
            {
                return BadRequest(ModelState);
            }

            if(user.Password == null)
            {
                return BadRequest(ModelState);
            }

            if (!_userRepository.UserNameExists(user.Name))
            {
                return NotFound();
            }

            var userSaved = _mapper.Map<User>(_userRepository.GetUserByName(user.Name));

            if(userSaved.Password != user.Password)
            {
                return Ok(new
                {
                    status = 400,
                    message = "Incorrect password"
                });
            }

            return Ok(new {
                status = 200,
                data = true
            });
        }
    }
}

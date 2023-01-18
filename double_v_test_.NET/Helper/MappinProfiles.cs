using AutoMapper;
using double_v_test_.NET.Dto;
using double_v_test_.NET.Models;

namespace double_v_test_.NET.Helper
{
    public class MappinProfiles : Profile
    {
        public MappinProfiles()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Wall.Models;


public class LoginRegController : Controller
{
    private readonly WallContext _Context;

    public LoginRegController(WallContext connect)
    {
        _Context = connect;
    }

    [HttpGet]
    [Route("")]
    public IActionResult Index()
    {
        ViewBag.errors = new List<string>();
        return View();
    }


    [HttpPost]
    [Route("register")]
    public IActionResult Register(RegisterViewModel Model)
    {
        if(ModelState.IsValid)
        {
            User newUser = new User //new User constructor fx
            {
                FirstName = Model.FirstName,
                LastName = Model.LastName,
                Email = Model.Email,
                Password = Model.Password,
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
            };
            _Context.Users.Add(newUser);
            _Context.SaveChanges();

            HttpContext.Session.SetInt32("CurrUserId", newUser.UserId);

            return RedirectToAction("ViewMsg", "Message");
        }
        else
        {
            ViewBag.errors = ModelState.Values;
            return View("Index");
        }
    }

    [HttpPost]
    [Route("login")]
    public IActionResult Login(string Email, string Password){
        // do some checks with stored emails and associated password
        ViewBag.errors = new List<KeyValuePair<string,string>>();

        List<User> Userlist= _Context.Users.Where(User => User.Email==Email).ToList();

        if (Userlist.Count!=1 || Userlist[0].Password!=Password){
            ViewBag.errors= ModelState.Values;

            return View("Index");
        }
        
        else{
            HttpContext.Session.SetInt32("CurrUserId", Userlist[0].UserId);

            return RedirectToAction("ViewMsg", "Message");
        }
    }
}

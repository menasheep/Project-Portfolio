using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Wall.Models;
using Microsoft.EntityFrameworkCore;



namespace Wall.Controllers
{
    public class MessageController : Controller
    {
        private WallContext _Context;

        public MessageController(WallContext connect)
        {
            _Context = connect;
        }


        [HttpGet]
        [Route("message-board")]
        public IActionResult ViewMsg()
        {

            ViewBag.CurrUser = _Context.Users.SingleOrDefault(User => User.UserId == HttpContext.Session.GetInt32("CurrUserId"));
            
            ViewBag.AllMsgs = _Context.Messages.Include(m => m.User).Include(m => m.Comments).OrderByDescending(m => m.CreatedAt).ToList(); 

            return View("MsgBoard");
        }


        [HttpPost]
        [Route("view-message")]
        public IActionResult CreateMsg(string Content)
        {
            ViewBag.errors = new List<KeyValuePair<string,string>>();

            int? UserID = HttpContext.Session.GetInt32("CurrUserId");

            Message newMessage = new Message //new msg constructor fx
            {
                UserId = (int) UserID,
                Content = Content
            };

            if(Content == null){ //failure result
                ViewBag.errors =("Error -- Message cannot be empty");
                return RedirectToAction("ViewMsg");
            }

            else //success result
            {   
                _Context.Messages.Add(newMessage);
                _Context.SaveChanges();
                Console.WriteLine("Your message actually saved!");
                return RedirectToAction("ViewMsg");
            }
        }


        [HttpGet]
        [Route("logout")]
        public IActionResult LogOut()
        {
            HttpContext.Session.Clear(); //clears session data
            return RedirectToAction("Index", "LoginReg");
        }
    }
}


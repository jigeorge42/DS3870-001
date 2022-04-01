using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace UserAuthentication
{
    public static class Function1
    {
        public class TaskModules
        {
            public string Description { get; set; }
            public double Price { get; set; }
            public TaskModules (string strDescription, double dblPrice)
            {
                Description = strDescription;
                Price = dblPrice;
            }
        }

        public class TaskRole
        {
            public string Description { get; set; }
            public List<TaskModules> AccessTo { get; set; }
            public TaskRole(string strDescription, List<TaskModules> lstAccessTo)
            {
                Description = strDescription;
                AccessTo = lstAccessTo;
            }
        }

        public class TaskUser
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Password { get; set; }
            public List<TaskRole> Roles { get; set; }
            public TaskUser(string strFirstName, string strLastName, string strEmail, string strPassword, List<TaskRole> lstRoles)
            {
                FirstName = strFirstName;
                LastName = strLastName;
                Email = strEmail;
                Password = strPassword;
                Roles = lstRoles;
            }
            public bool verifyPassword(string strPassword)
            {
                if(strPassword == Password)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }

        }

        [FunctionName("authenticateUser")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            TaskModules modBasicTask = new TaskModules("Basic Tasks", 0.99);
            TaskModules modAdvancedTask = new TaskModules("Advanced Tasks", 1.99);
           
            List<TaskModules> lstBasic = new List<TaskModules>();
            lstBasic.Add(modBasicTask);
            List<TaskModules> lstPremier = new List<TaskModules>();
            lstPremier.Add(modBasicTask);
            lstPremier.Add(modAdvancedTask);
           
            List<TaskRole> lstBasicRoles = new List<TaskRole>();
            TaskRole rolBasic = new TaskRole("Basic", lstBasic);
            lstBasicRoles.Add(rolBasic);
           
            List<TaskRole> lstPremierRoles = new List<TaskRole>();
            TaskRole rolPremier = new TaskRole("Premeir", lstPremier);
            lstPremierRoles.Add(rolPremier);

            List<TaskUser> lstUsers = new List<TaskUser>();
            TaskUser usrJaneDoeling = new TaskUser("jane", "Doeling", "Janedoeling@gmail.com", "mickey2020!", lstBasicRoles);
            TaskUser usrJohnDoe = new TaskUser("John", "Doe", "johndoe12@gmail.com", "mickey2020!", lstPremierRoles);
            lstUsers.Add(usrJaneDoeling);
            lstUsers.Add(usrJohnDoe);

            string strUsername = req.Query["strUsername"];
            string strPassword = req.Query["strPassword"];

            foreach(TaskUser usrCurrent in lstUsers)
            {
                if(usrCurrent.Email == strUsername && usrCurrent.verifyPassword(strPassword))
                {
                    return new OkObjectResult(usrCurrent.Roles);
                }
            }

            return new OkObjectResult("User not found or password incorrect");
        }
    }
}

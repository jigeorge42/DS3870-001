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

namespace Hello_World
{
    public static class Function1
    {
        [FunctionName("HelloWorld")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            List<string> lstAnimals = new List<string>();
            string[] arAnimals = {"pig", "cow", "hippo"};

            foreach(string strCurrentAnimal in arAnimals)
            {
                lstAnimals.Add(strCurrentAnimal);
            }
            lstAnimals.Add("Chicken");

            string strAnimal = req.Query[ "strAnimal"];
            

            string requestBody = await new StreamReader(req.Body).ReadToEndAsync();
            dynamic data = JsonConvert.DeserializeObject(requestBody);
         
            bool blnFound = false;

            if (strAnimal != "" && strAnimal != null)
            { 
                foreach(string strCurrentAnimal in lstAnimals)
                {
                    if(strCurrentAnimal == strAnimal)
                    {
                        blnFound = true;
                    }
                   
                }
            }

            if(blnFound == true)
            {
                return new OkObjectResult("animal found");
            }
            else
            {
                return new OkObjectResult("animal not found");
            }
        }
    }
}

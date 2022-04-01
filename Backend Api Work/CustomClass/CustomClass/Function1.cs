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


namespace CustomClass
{

    public static class Function1
    {
        private class Athlete
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public int JereseyNumber { get; set; }
            public string Classification { get; set; }
            public DateTime DateOfBirth { get; set; }
            public Athlete(string strFirstName, string strLastName, int intJerseyNumber, string strClassification, DateTime datDOB)
            {
                FirstName = strFirstName;
                LastName = strLastName;
                JereseyNumber = intJerseyNumber;
                Classification = strClassification;
                DateOfBirth = datDOB;
            }
        }

        private class SportsTeam
        {
            public string Season { get; set; }
            public int TotalPlayers { get; set; }
            public int TravelPlayers { get; set; }
            public List<SportsTeam> Players { get; set; }
            public int PlayersNotTraveled { get; set; }
            public SportsTeam(string strSeason, int intTotalPlayers, int intTravelPlayers, List<SportsTeam> lstPlayers)
            {
                Season = strSeason;
                TotalPlayers = intTotalPlayers;
                TravelPlayers = intTravelPlayers;
                Players = lstPlayers;
                PlayersNotTraveled = TotalPlayers - TravelPlayers;

            }
        }

        private class Classification
        {
            public string description { get; set; }
            public int MinHours { get; set; }
            public Classification(string strdescription, int intMinHours)
            {
                description = strdescription;
                MinHours = intMinHours;
            }
        }

        private class Vehicle
        {
            public string Make { get; set; }
            public string Model { get; set; }
            public int Year { get; set; }
            public int MPG { get; set; }
            public Vehicle(string strMake, string strModel, int intYear, int intMPG)
            {
                Make = strMake;
                Model = strModel;
                Year = intYear;
                MPG = intMPG;
            }
        }

        public double CalcuateFuelCost(int intMilesTraveled, double dblPricePerGallon)
        {
            return (intMilesTraveled / mpg) * dblPricePerGallon;
        }





        [FunctionName("Function1")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            log.LogInformation("C# HTTP trigger function processed a request.");

            Classification clsFreshmen = new Classification("Freshmen", 0);
            Classification clsSophmore = new Classification("Sophmore", 30);

            Athlete athJane = new Athlete("Jane", "Doeling", 45, System.DateTime.Now, clsFreshmen);
            Athlete athJohn = new Athlete("John", "Doe", 44, System.DateTime.Now, clsSophmore);

            List<Athlete> lstAthletes = new List<Athlete>();
            lstAthletes.Add(athJane);
            lstAthletes.Add(athJohn);

            SportsTeam sprtBasketBall = new SportsTeam("Winter", 32, 21, lstAthletes);


            return new OkObjectResult(sprtBasketBall.);
        }
    }
}

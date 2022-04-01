using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Data.SqlClient;
using System.Data;
namespace Sql_Integration
{
    public static class Function1
    {
        [FunctionName("Users")]
        public static async Task<IActionResult> Run(
            [HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequest req,
            ILogger log)
        {
            string strConnection = @"Server=PCLABSQL01\COB_DS2;Database=DS3870;User Id=student;Password=Mickey2020!;";
            log.LogInformation("C# HTTP trigger function processed a request.");
            if (req.Method == HttpMethods.Post)
            {
                string strEmail = req.Query["Email"];
                string strFirstName = req.Query["FirstName"];
                string strLastName = req.Query["LastName"];
                string strPassword = req.Query["Password"];
                bool blnErrors = false;
                string strErrorMessage = "";
                if (strEmail.Length < 0)
                {
                    blnErrors = true;
                    strErrorMessage += Environment.NewLine + "Email Cannot Be Blank";
                }
                if (strFirstName.Length < 0)
                {
                    blnErrors = true;
                    strErrorMessage += Environment.NewLine + "First Name Cannot Be Blank";
                }
                if (strLastName.Length < 0)
                {
                    blnErrors = true;
                    strErrorMessage += Environment.NewLine + "Last Name Cannot Be Blank";
                }
                if (strPassword.Length < 0)
                {
                    blnErrors = true;
                    strErrorMessage += Environment.NewLine + "Password Cannot Be Blank";
                }
                if (blnErrors == true)
                {
                    return new OkObjectResult(strErrorMessage);
                }
                string strQuery = "INSERT INTO dbo.tblUsers (Email,FirstName,LastName,Status,Password) VALUES (@Email,@FirstName,@LastName,'ACTIVE',@Password)";
                using (SqlConnection conDS3870 = new SqlConnection(strConnection))
                using (SqlCommand comDS3870 = new SqlCommand(strQuery, conDS3870))
                {
                    SqlParameter parEmail = new SqlParameter("Email", SqlDbType.VarChar);
                    parEmail.Value = strEmail;
                    comDS3870.Parameters.Add(parEmail);
                    SqlParameter parFirstName = new SqlParameter("FirstName", SqlDbType.VarChar);
                    parFirstName.Value = strFirstName;
                    comDS3870.Parameters.Add(parFirstName);
                    SqlParameter parLastName = new SqlParameter("LastName", SqlDbType.VarChar);
                    parLastName.Value = strLastName;
                    comDS3870.Parameters.Add(parLastName);
                    SqlParameter parPassword = new SqlParameter("Password", SqlDbType.VarChar);
                    parPassword.Value = strPassword;
                    comDS3870.Parameters.Add(parPassword);
                    conDS3870.Open();
                    comDS3870.ExecuteNonQuery();
                    conDS3870.Close();
                    return new OkObjectResult("User Added");
                }
            }
            else if (req.Method == HttpMethods.Get)
            {
                string strEmail = req.Query["Email"];
                DataSet dsUsers = new DataSet();
                if (strEmail == null || strEmail == "")
                {
                    string strQuery = "SELECT * FROM dbo.tblUsers";
                    using (SqlConnection conDS3870 = new SqlConnection(strConnection))
                    using (SqlCommand comDS3870 = new SqlCommand(strQuery, conDS3870))
                    {
                        SqlDataAdapter daUsers = new SqlDataAdapter(comDS3870);
                        daUsers.Fill(dsUsers);
                        return new OkObjectResult(dsUsers.Tables[0]);
                    }
                }
                else
                {
                    string strQuery = "SELECT * FROM dbo.tblUsers WHERE Email = @Email";
                    using (SqlConnection conDS3870 = new SqlConnection(strConnection))
                    using (SqlCommand comDS3870 = new SqlCommand(strQuery, conDS3870))
                    {
                        SqlParameter parEmail = new SqlParameter("Email", SqlDbType.VarChar);
                        parEmail.Value = strEmail;
                        comDS3870.Parameters.Add(parEmail);
                        SqlDataAdapter daUsers = new SqlDataAdapter(comDS3870);
                        daUsers.Fill(dsUsers);
                        return new OkObjectResult(dsUsers.Tables[0]);
                    }
                }
            }
            else
            {
                return new OkObjectResult("You must perform a POST or GET only");
            }
        }
    }
}
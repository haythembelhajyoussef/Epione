using Epione.Domain;
using Epione.Web.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace Epione.Web.Controllers
{
    public class PatientAppointmentController : Controller
    {


        // to get all the appointments of the current user
        public async Task<ActionResult> ListAppointments()
        {

            var currentUser = (user)System.Web.HttpContext.Current.Session["IUser"];

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:8089/epione-web/");

            // to get all the appointments of the current user

            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.GetAsync("search/patientappointment/"+ currentUser.id).Result;

            var result = response.Content.ReadAsAsync<IEnumerable<appointment>>().Result;

            ViewBag.result = result;



            return View();
        }


        // add appointment

        




        [HttpPost]
        public async Task<ActionResult> CancelPatientAppointment(String id)
        {
            var request = new HttpRequestMessage(HttpMethod.Put,
       "http://localhost:8089/epione-web/appointment/"+id);
            var client = new HttpClient();
            //var json = JsonConvert.SerializeObject(user);
            //request.Content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await client.SendAsync(request);
        
                //Get Reponse content here
                return RedirectToAction("ListAppointments");

            
            //Error something went wrong
          
        }


        // view to update appointment

        public ActionResult PatientAppointmentToUpdate(String id, String specialtyname , String iddoctor)
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:8089/epione-web/");

            // to get the appointment selected

            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.GetAsync("appointment/byid/" + id).Result;

            var appointment = response.Content.ReadAsAsync<IEnumerable<appointment>>().Result;

            ViewBag.appointment = appointment;


            // to get all the motives from database for the update

            HttpResponseMessage response1 = client.GetAsync("search/motive/" + specialtyname).Result;

            var allmotives = response1.Content.ReadAsAsync<IEnumerable<motive>>().Result;

            ViewBag.motives = new SelectList(allmotives, "id", "name");

            ViewBag.allmotives = allmotives;

            
            // to get the docttor selected
            
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response2 = client.GetAsync("confirmed/" + iddoctor).Result;

            var doctor = response2.Content.ReadAsAsync<IEnumerable<user>>().Result;

            ViewBag.doctor = doctor;


            // to get all appointments of the doctor selected


            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response3 = client.GetAsync("search/appointment/" + iddoctor).Result;

            var listappointments = response3.Content.ReadAsAsync<IEnumerable<appointment>>().Result;

            ViewBag.listappointments = listappointments;



            


            // to get all the times from database to update  

            


            return View();
        }


 
        // Update appointment

       


        // to get all appointments by docotorId

        public ActionResult ListAppointmentByDoctorId()
        {
            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:8089/epione-web/");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response1 = client.GetAsync("appointment/1").Result;

            var result1 = response1.Content.ReadAsAsync<IEnumerable<appointment>>().Result;

            ViewBag.result1 = result1;


            return View();
        }



        // to get all the treated appointments

        public async System.Threading.Tasks.Task<ActionResult> ListAppointmentsTreated()
        {
            var currentUser = (user)System.Web.HttpContext.Current.Session["IUser"];

            HttpClient client = new HttpClient();


            client.BaseAddress = new Uri("http://localhost:8089/epione-web/");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.GetAsync("search/patientappointment/"+ currentUser.id).Result;

            var result = response.Content.ReadAsAsync<IEnumerable<appointment>>().Result;

            ViewBag.result = result;

            return View();
        }




    }




}
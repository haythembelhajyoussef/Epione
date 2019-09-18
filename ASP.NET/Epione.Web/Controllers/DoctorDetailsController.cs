using Epione.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;

namespace Epione.Web.Controllers
{
    public class DoctorDetailsController : Controller
    {
        // GET: DoctorDetails
        public ActionResult Index()
        {
            return View();
        }
        // GET: Doctors
        public ActionResult ListDoctorDetails(String id, String specialtyname)
        {

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:8089/epione-web/");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = client.GetAsync("confirmed/"+id).Result;

            var result = response.Content.ReadAsAsync<IEnumerable<user>>().Result;

            ViewBag.result = result;

            HttpResponseMessage response1 = client.GetAsync("search/motive/"+specialtyname).Result;

            var result1 = response1.Content.ReadAsAsync<IEnumerable<motive>>().Result;

            ViewBag.result1 = result1;


            return View();
        }
    }
}
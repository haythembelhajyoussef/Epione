using Epione.Domain.Entities;
using Epione.Web.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Mvc;

namespace Epione.Web.Controllers
{
    public class DoctolibController : Controller
    {
        // GET: Doctolib
        public ActionResult Index()
        {
            char[] alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
            ViewBag.alphabet = alphabet;

            HttpClient Client = new HttpClient();
            Client.BaseAddress = new Uri("http://localhost:8089");
            Client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            //pie chart
            HttpResponseMessage response = Client.GetAsync("Epione-web/rest/doctolib").Result;
            var result = response.Content.ReadAsAsync<IEnumerable<DoctolibDoctor>>().Result;
            ViewBag.result = result;
            return View();
        }
        public ActionResult FirstLettre(String id)
        {
            char[] alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".ToCharArray();
            ViewBag.alphabet = alphabet;
            ViewBag.urlId = id;

            HttpClient Client = new HttpClient();
            Client.BaseAddress = new Uri("http://localhost:8089");
            Client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            HttpResponseMessage response = Client.GetAsync("Epione-web/rest/doctolib/" + id).Result;
            var result = response.Content.ReadAsAsync<IEnumerable<DoctolibDoctor>>().Result;
            ViewBag.result = result;
            return View();
        }
        public ActionResult DetailsDoctor(string id)
        {
            ViewBag.id = id;
            HttpClient Client = new HttpClient();
            Client.BaseAddress = new Uri("http://localhost:8089");
            Client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = Client.GetAsync("Epione-web/rest/doctolib/path/" + id).Result;
            ViewBag.status = response.StatusCode;
            var result = response.Content.ReadAsAsync<IEnumerable<DoctolibDoctor>>().Result;
            DoctolibDoctor doctor = new DoctolibDoctor();
            foreach (var d in result)
            {
                doctor = d;
            }
            ViewBag.doctor = doctor;

            return View();

        }

        [HttpPost]
        public ActionResult addDoctorDoctolib(addDoctor addDoctor)
        {
            HttpClient Client = new HttpClient();
            Client.BaseAddress = new Uri("http://localhost:8089");
            Client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            HttpResponseMessage response = Client.GetAsync("Epione-web/rest/doctolib/path/" + addDoctor.path).Result;
            ViewBag.path = addDoctor.path;
            ViewBag.email = addDoctor.email;
            var result = response.Content.ReadAsAsync<IEnumerable<DoctolibDoctor>>().Result;
            if (response.IsSuccessStatusCode)
            {
                DoctolibDoctor doctor = new DoctolibDoctor();
                foreach (var d in result)
                {
                    doctor = d;
                }
                doctor.email = addDoctor.email;
                doctor.password = addDoctor.password;
                Client.PostAsJsonAsync<DoctolibDoctor>("Epione-web/rest/doctolib/addDoctor", doctor).ContinueWith((postTask) => postTask.Result.EnsureSuccessStatusCode());
                ViewBag.status = response.StatusCode;

            }
            else
            {
                ViewBag.status = "Error";
            }
            return View();
        }
    }
}
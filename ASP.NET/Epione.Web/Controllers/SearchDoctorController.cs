using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Net.Http;
using System.Net.Http.Headers;
using Epione.Domain;
using Epione.Web.Models;

namespace Epione.Web.Controllers
{
    public class SearchDoctorController : Controller
    {
        // GET: SearchDoctor
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult ListSearchForDoctor(SearchForDoctorViewModel model)
        {
            // to search for doctor

            HttpClient client = new HttpClient();
            client.BaseAddress = new Uri("http://localhost:8089/epione-web/");
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            if (model.addr != null)
            {
                HttpResponseMessage response = client.GetAsync("search/filter/" + model.spec + "/" + model.addr).Result;
                var result = response.Content.ReadAsAsync<IEnumerable<user>>().Result;
                ViewBag.result = result;
            }
            else
            {
                HttpResponseMessage response = client.GetAsync("search/filter/" + model.spec).Result;
                var result = response.Content.ReadAsAsync<IEnumerable<user>>().Result;
                ViewBag.result = result;
            }

            return View();
        }



    }
}
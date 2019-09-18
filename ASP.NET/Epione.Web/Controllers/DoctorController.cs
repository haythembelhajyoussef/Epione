using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Epione.Domain;
using Epione.Domain.DTO;
using Epione.Service;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Epione.Web.Extensions;
using Epione.Web.Models;

namespace Epione.Web.Controllers
{
    public class DoctorController : Controller
    {
        ServiceUser _UserService;

        public DoctorController()
        {
            _UserService = new ServiceUser();
        }
        // GET: Doctor
        public async Task<ActionResult> Index()
        {
            List<DoctorDTO> doctors = await _UserService.getDoctorsList();

            //   return Json(doctors, JsonRequestBehavior.AllowGet);
            return View(doctors);
        }

        public async Task<ActionResult> Profile(int id)
        {
            DoctorDTO doctor = await _UserService.getDoctorByIdAsync(id);

             // return Json(doctor, JsonRequestBehavior.AllowGet);
            return View(doctor);
        }
    }
}
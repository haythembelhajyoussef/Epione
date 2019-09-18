using Epione.Domain.Entities;
using Highsoft.Web.Mvc.Charts;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;

namespace Epione.Web.Controllers
{
    public class AnalyticsController : Controller
    {
        // GET: Analytics
        public ActionResult Index()
        {
            HttpClient Client = new HttpClient();
            Client.BaseAddress = new Uri("http://localhost:8089");
            Client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            //pie chart
            HttpResponseMessage response = Client.GetAsync("Epione-web/rest/analytics/cancel/3").Result;
            var result = response.Content.ReadAsAsync<IEnumerable<JObject>>().Result;

            List<PieSeriesData> pieData = new List<PieSeriesData>();
            foreach (var r in result)
            {
                pieData.Add(new PieSeriesData
                {
                    Name = r.key,
                    Y = Convert.ToDouble(r.value, new CultureInfo("en-US"))
                });
            }
            ViewData["pieData"] = pieData;

            return View();
        }
        public IEnumerable<DateTime> EachDay(DateTime from, DateTime thru)
        {
            for (var day = from.Date; day.Date <= thru.Date; day = day.AddDays(1))
                yield return day;
        }
        public ActionResult Dashboard()
        {
            HttpClient Client = new HttpClient();
            Client.BaseAddress = new Uri("http://localhost:8089");
            Client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));


            DateTime toDay = DateTime.Now;
            HttpResponseMessage responseToday = Client.GetAsync("Epione-web/rest/analytics/next/3/day/" + toDay.ToString("yyyy-MM-dd")).Result;
            HttpResponseMessage responseDay1 = Client.GetAsync("Epione-web/rest/analytics/next/3/day/" + toDay.AddDays(1).ToString("yyyy-MM-dd")).Result;
            HttpResponseMessage responseDay2 = Client.GetAsync("Epione-web/rest/analytics/next/3/day/" + toDay.AddDays(2).ToString("yyyy-MM-dd")).Result;

            var resultToday = responseToday.Content.ReadAsAsync<IEnumerable<JObject>>().Result;
            var resultDay1 = responseDay1.Content.ReadAsAsync<IEnumerable<JObject>>().Result;
            var resultDay2 = responseDay2.Content.ReadAsAsync<IEnumerable<JObject>>().Result;

            foreach (var r in resultToday)
            {
                double rr = Convert.ToDouble(r.value, new CultureInfo("en-US"));
                ViewBag.vacationToday = rr;
            }
            foreach (var r in resultDay1)
            {
                double rr = Convert.ToDouble(r.value, new CultureInfo("en-US"));
                ViewBag.vacationDay1 = rr;
            }
            foreach (var r in resultDay2)
            {
                double rr = Convert.ToDouble(r.value, new CultureInfo("en-US"));
                ViewBag.vacationDay2 = rr;
            }
            ViewBag.toDay = toDay.ToString("yyyy-MM-dd");
            ViewBag.Day1 = toDay.AddDays(1).ToString("yyyy-MM-dd");
            ViewBag.Day2 = toDay.AddDays(2).ToString("yyyy-MM-dd");


            ViewBag.classSuccess = "success";
            ViewBag.classDanger = "danger";
            ViewBag.classWarning = "warning";

            HttpResponseMessage responseMostDay = Client.GetAsync("Epione-web/rest/analytics/most/3").Result;
            var resultMostDay = responseMostDay.Content.ReadAsAsync<IEnumerable<JObject>>().Result;


            List<int> numbersOccured = new List<int>();

            foreach (var d in resultMostDay)
            {
                numbersOccured.Add(Convert.ToInt32(d.value));
            }
            List<SplineSeriesData> DataOccured = new List<SplineSeriesData>();


            foreach (double value in numbersOccured)
            {
                SplineSeriesData data = new SplineSeriesData();
                data.Y = value;
                if (value == 26.5)
                {
                    data.Marker.Symbol = "url(http://www.highcharts.com/demo/gfx/sun.png)";
                }
                data.Drilldown = "time";
                DataOccured.Add(data);
            }

            ViewData["numbersOccured"] = DataOccured;

            DateTime date = new DateTime();
            var resultTimes = Enumerable.Repeat(date, 24)
                                   .Select((x, i) => x.AddHours(i).ToString("HH:tt"));
            ViewBag.listTimes = resultTimes;

            HttpResponseMessage responseNextPatient = Client.GetAsync("Epione-web/rest/analytics/next5Patient/3").Result;
            var resultNextPatient = responseNextPatient.Content.ReadAsAsync<IEnumerable<JObjectPatient>>().Result;
            ViewBag.resultNextPatient = resultNextPatient;

            return View();
        }
        public ActionResult Vacation(String option, String dateChosen)
        {
            ViewBag.dateChosen = dateChosen;
            ViewBag.option = option;
            HttpClient Client = new HttpClient();
            Client.BaseAddress = new Uri("http://localhost:8089");
            Client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));

            //LineTime chart
            int yearInt = Convert.ToInt32(dateChosen.Substring(0, 4));
            int monthInt = Convert.ToInt32(dateChosen.Substring(5, 2));
            int dayInt = Convert.ToInt32(dateChosen.Substring(8, 2));
            DateTime StartDate = new DateTime(yearInt, monthInt, dayInt);
            DateTime EndDate;
            if (option.Equals("day"))
            {
                EndDate = StartDate;
            }
            else if (option.Equals("week"))
            {
                EndDate = StartDate.AddDays(7);
            }
            else
            {
                EndDate = StartDate.AddMonths(1);
            }

            List<double> usedSlot = new List<double>();
            List<double> openSlot = new List<double>();
            List<double> notUsed = new List<double>();

            List<string> Categories = new List<string>();


            foreach (DateTime day in EachDay(StartDate, EndDate))
            {
                HttpResponseMessage response1 = Client.GetAsync("Epione-web/rest/analytics/3/day/" + day.ToString("yyyy-MM-dd")).Result;
                var result1 = response1.Content.ReadAsAsync<IEnumerable<JObject>>().Result;
                Categories.Add(day.ToString("yyyy-MM-dd"));

                foreach (var r in result1)
                {
                    if (Convert.ToDouble(r.value, new CultureInfo("en-US")) != 0.0)
                    {
                        if (r.key.Equals("usedSlots"))
                        {
                            usedSlot.Add(Convert.ToDouble(r.value, new CultureInfo("en-US")));
                        }
                        else if (r.key.Equals("openSlots"))
                        {
                            openSlot.Add(Convert.ToDouble(r.value, new CultureInfo("en-US")));
                        }
                        else
                        {
                            notUsed.Add(Convert.ToDouble(r.value, new CultureInfo("en-US")));
                        }
                    }
                }
            }




            List<ColumnSeriesData> johnData = new List<ColumnSeriesData>();
            List<ColumnSeriesData> janeData = new List<ColumnSeriesData>();
            List<ColumnSeriesData> joeData = new List<ColumnSeriesData>();

            usedSlot.ForEach(p => johnData.Add(new ColumnSeriesData { Y = p }));
            openSlot.ForEach(p => janeData.Add(new ColumnSeriesData { Y = p }));
            notUsed.ForEach(p => joeData.Add(new ColumnSeriesData { Y = p }));

            ViewData["johnData"] = johnData;
            ViewData["janeData"] = janeData;
            ViewData["joeData"] = joeData;
            ViewData["Categories"] = Categories;

            List<double> timeValues = usedSlot;


            List<AreaSeriesData> timeData = new List<AreaSeriesData>();
            timeValues.ForEach(p => timeData.Add(new AreaSeriesData { Y = p }));
            ViewBag.TimeData = timeData;


            return View();
        }
    }
}
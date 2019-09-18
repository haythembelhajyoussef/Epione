using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Epione.Domain;
using Epione.Data.Infrastructure;
using Epione.Domain;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ServicePattern;

using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Epione.Service
{
	
    public class ServiceSpecialty : Service<specialty>
    {
        private static DatabaseFactory dbf = new DatabaseFactory();
        private static IUnitOfWork uof = new UnitOfWork(dbf);

        public ServiceSpecialty() : base(uof)
        {
        }

		//get speciality by id
        public async Task<specialty> getSpecialityById(int id)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
         "http://localhost:8089/epione-web/specialty/" + id.ToString());
            var client = new HttpClient();
			// response 
            var response = await client.SendAsync(request);
            var byteArray = response.Content.ReadAsByteArrayAsync().Result;
            var result = Encoding.UTF8.GetString(byteArray, 0, byteArray.Length);
            var jsonObjects = JsonConvert.DeserializeObject<JObject>(result);
            var specialty = jsonObjects.Value<JObject>().ToObject<specialty>();
            return specialty;
        }

		
		//get speciality by exact name
        public async Task<specialty> getSpecialityByEcaxtName(string name)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,
         "http://localhost:8089/epione-web/specialty?exactname=" + name);
            var client = new HttpClient();
			//response
            var response = await client.SendAsync(request);
            var byteArray = response.Content.ReadAsByteArrayAsync().Result;
            var result = Encoding.UTF8.GetString(byteArray, 0, byteArray.Length);
            var jsonObjects = JsonConvert.DeserializeObject<JObject>(result);
            var specialty = jsonObjects.Value<JObject>().ToObject<specialty>();
            return specialty;
        }

    }
}

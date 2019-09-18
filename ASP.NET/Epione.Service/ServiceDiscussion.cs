using Epione.Data.Infrastructure;
using Epione.Domain;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using ServicePattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace Epione.Service
{
    public class ServiceDiscussion : Service<discussion>, IServiceDiscussion
    {
        private static DatabaseFactory dbf = new DatabaseFactory();
        private static IUnitOfWork uof = new UnitOfWork(dbf);
        public ServiceDiscussion() : base(uof)
        {


        }

        public async Task<List<discussion>> getDiscussionsByIdUserAsync(int userId)
        {
            var request = new HttpRequestMessage(HttpMethod.Get,"http://localhost:8089/epione-web/chat/all/"+userId.ToString());
            var client = new HttpClient();
            var response = await client.SendAsync(request);
            var byteArray = response.Content.ReadAsByteArrayAsync().Result;
            var result = Encoding.UTF8.GetString(byteArray, 0, byteArray.Length);
            var jsonObjects = JsonConvert.DeserializeObject<JArray>(result);
            var list = jsonObjects.Value<JArray>().ToObject<List<discussion>>();
            
            return list;
        }

        public async Task<int> sendMessageAsync(int senderId, int sentToId, string message, int discussionId,string role)
        {
            string complete = senderId.ToString() + "/" + sentToId.ToString();
            if (role.Equals("patient"))
            {
                complete = sentToId.ToString() + "/" + senderId.ToString();
            }
            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost:8089/epione-web/chat/"+complete))
            {
                message m = new message
                {
                    content = message,
                    senderId = senderId
                };

                var json = JsonConvert.SerializeObject(m);
                using (var stringContent = new StringContent(json, Encoding.UTF8, "application/json"))
                {
                    request.Content = stringContent;

                    using (var response = await client
                        .SendAsync(request, HttpCompletionOption.ResponseHeadersRead)
                        .ConfigureAwait(false))
                    {
                        var x = response.Content.ReadAsStringAsync();
                        response.EnsureSuccessStatusCode();
                      
                        return 1;
                    }
                }
            }
            
        }
        
        public async Task<int> setSeenMessageAsync(string idConversation,string id)
        {
            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage(HttpMethod.Post, "http://localhost:8089/epione-web/chat/seen/" + idConversation+"/"+id))
            {
                    using (var response = await client
                        .SendAsync(request, HttpCompletionOption.ResponseHeadersRead)
                        .ConfigureAwait(false))
                    {
                        var x = response.Content.ReadAsStringAsync();
                        response.EnsureSuccessStatusCode();

                        return 1;
                    }
            }

        }

        public async Task<int> deleteConversation(string idConversation, string id)
        {
            using (var client = new HttpClient())
            using (var request = new HttpRequestMessage(HttpMethod.Delete, "http://localhost:8089/epione-web/chat/" + idConversation + "/" + id))
            {
                using (var response = await client
                    .SendAsync(request, HttpCompletionOption.ResponseHeadersRead)
                    .ConfigureAwait(false))
                {
                    var x = response.Content.ReadAsStringAsync();
                    response.EnsureSuccessStatusCode();

                    return 1;
                }
            }

        }
    }
}

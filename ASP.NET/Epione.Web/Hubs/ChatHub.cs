using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using Epione.Service;
using Epione.Web.Models;
using System.Web.Mvc;
using Epione.Domain;

namespace Epione.Web.Hubs
{
    public class ChatHub : Hub
    {

        private readonly static ConnectionMapping<string> _connections = new ConnectionMapping<string>();
        private readonly static string fileKey = "#+-*/64168!__)(*&?%#";
        

        public override Task OnConnected()
        {
            var userId = Context.QueryString["userId"];

            if (HttpContext.Current != null)
            {
                _connections.Add(userId, Context.ConnectionId);
            }
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            var userId = Context.QueryString["userId"];

            if (HttpContext.Current != null)
            {
                _connections.Remove(userId, Context.ConnectionId);
            }
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            var userId = Context.QueryString["userId"];
            if (HttpContext.Current != null)
            {
                if (!_connections.GetConnections(userId).Contains(Context.ConnectionId))
                {
                    _connections.Add(userId, Context.ConnectionId);
                }
            }
            return base.OnReconnected();
        }

        public async Task<int> Send(string discussionId, string message,string fileNameDB, string previewMsgFile,string userId,string sendToId, string role)
        {
         
            foreach (var connectionId in _connections.GetConnections(sendToId))
            {
                Clients.Client(connectionId).addNewMessageToPage(message, previewMsgFile, discussionId,"replies");
            }
            foreach (var connectionId in _connections.GetConnections(userId))
            {
                Clients.Client(connectionId).addNewMessageToPage(message, previewMsgFile, discussionId, "sent");
            }

            return await WriteMessage(userId, sendToId, message, discussionId, role, fileNameDB);
        }

        public async Task<int> WriteMessage(String Sender, String SentTo, String Message, String discussionId,String role, string fileNameDB)
        {
            ServiceDiscussion serviceDiscussion = new ServiceDiscussion();
            if (!String.IsNullOrEmpty(fileNameDB))// /Content/Files/
                Message =  fileKey + fileNameDB + fileKey+ Message;
            serviceDiscussion.sendMessageAsync(Int32.Parse(Sender), Int32.Parse(SentTo), Message, Int32.Parse(discussionId),role);
            return 1;
        }

        public async Task<int> SetSeen(string idConversation,string id)
        {
            Clients.All.addSeenMessages(idConversation);

            return await SetSeenMessages(idConversation,id);
        }

        public async Task<int> SetSeenMessages(string idConversation,string id)
        {
            ServiceDiscussion serviceDiscussion = new ServiceDiscussion();
            return await serviceDiscussion.setSeenMessageAsync(idConversation,id);
        }

        public async Task<int> DeleteConversation(string idConversation,string id)
        {

            foreach (var connectionId in _connections.GetConnections(id))
            {
                Clients.Client(connectionId).delete(idConversation);
            }

            return 1;
        }

    }

    // Connection Mapping class

    public class ConnectionMapping<T>
    {
        private readonly Dictionary<T, HashSet<string>> _connections = new Dictionary<T, HashSet<string>>();

        public int Count
        {
            get
            {
                return _connections.Count;
            }
        }

        public void Add(T key, string connectionId)
        {
            lock (_connections)
            {
                HashSet<string> connections;
                if (!_connections.TryGetValue(key, out connections))
                {
                    connections = new HashSet<string>();
                    _connections.Add(key, connections);
                }

                lock (connections)
                {
                    connections.Add(connectionId);
                }
            }
        }

        public IEnumerable<string> GetConnections(T key)
        {
            HashSet<string> connections;
            if (_connections.TryGetValue(key, out connections))
            {
                return connections;
            }

            return Enumerable.Empty<string>();
        }

        public void Remove(T key, string connectionId)
        {
            lock (_connections)
            {
                HashSet<string> connections;
                if (!_connections.TryGetValue(key, out connections))
                {
                    return;
                }

                lock (connections)
                {
                    connections.Remove(connectionId);

                    if (connections.Count == 0)
                    {
                        _connections.Remove(key);
                    }
                }
            }
        }
    }
}
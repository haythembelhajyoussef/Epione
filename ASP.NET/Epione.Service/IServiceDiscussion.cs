using ServicePattern;
using Epione.Domain;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Epione.Service
{
    public interface IServiceDiscussion : IService<discussion>
    {

        Task<List<discussion>> getDiscussionsByIdUserAsync(int userId);

        Task<int> sendMessageAsync(int senderId, int sentToId, string message, int discussionId,string role);
        Task<int> setSeenMessageAsync(string idConversation, string id);

        Task<int> deleteConversation(string idConversation, string id);


    }
}
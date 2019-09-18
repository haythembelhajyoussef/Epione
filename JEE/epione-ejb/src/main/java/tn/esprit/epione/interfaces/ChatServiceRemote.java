package tn.esprit.epione.interfaces;

import java.util.List;

import javax.ejb.Remote;

import tn.esprit.epione.persistence.Conversation;
import tn.esprit.epione.persistence.Message;

@Remote
public interface ChatServiceRemote {
	
	public int addConversation(Conversation c);
	public int sendMsg(int idDoctor, int idPatient, Message msg);
	public boolean seenConversation(int conversationId,int id);
	
	public Conversation getConversationById(int conversationId);
	public List<Message> getMessageLastDays(int conversationId, int days);
	public Conversation getConversation2Users(int idDoctor, int idPatient);
	public Conversation getConversation2UsersLastDays(int idDoctor, int idPatient,int days);
	public List<Conversation> getConversationsByUser(int idUser);
	public List<Conversation> getConversationsLastDays(int idUser, int days);
	
	public boolean deleteConversation(int conversationId, int idUser);
	
}
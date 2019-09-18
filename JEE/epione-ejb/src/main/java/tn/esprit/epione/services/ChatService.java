package tn.esprit.epione.services;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import javax.ejb.LocalBean;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.TemporalType;
import javax.persistence.TypedQuery;

import tn.esprit.epione.interfaces.ChatServiceLocal;
import tn.esprit.epione.interfaces.ChatServiceRemote;
import tn.esprit.epione.persistence.Conversation;
import tn.esprit.epione.persistence.Doctor;
import tn.esprit.epione.persistence.Message;
import tn.esprit.epione.persistence.Patient;
import tn.esprit.epione.persistence.User;
import tn.esprit.epione.util.Util;

@LocalBean
@Stateless
public class ChatService implements ChatServiceLocal, ChatServiceRemote {

	@PersistenceContext(unitName = "epione-ejb")
	EntityManager em;

	@Override
	public int addConversation(Conversation c) {
		em.persist(c);
		em.flush();
		return c.getId();
	}

	@Override
	public int sendMsg(int idDoctor, int idPatient, Message msg) {

		TypedQuery<Conversation> q;
		Conversation c;
		try {
			msg.setSentTime(Util.getDateNowUTC());
			q = em.createQuery(
					"select c from Conversation c where (c.doctor.id = :idDoctor and c.patient.id = :idPatient)",
					Conversation.class);
			q.setParameter("idDoctor", idDoctor).setParameter("idPatient", idPatient);
			List<Conversation> cl = q.getResultList();

			if (cl.isEmpty()) {
				System.out.println("***************** NULL ***********");
				c = new Conversation();
				c.setDoctor(new Doctor(idDoctor));
				c.setPatient(new Patient(idPatient));
				int idConversation = addConversation(c);

				c = em.find(Conversation.class, idConversation);

				msg.setConversation(c);
				
				em.persist(msg);
				em.flush();
				return msg.getId();
			}
			System.out.println("***************** NOT NULL ***********");
			c = cl.get(0);

			c.setLastUpdated(Util.getDateNowUTC());
			c.getMessages().add(msg);
			msg.setConversation(c);
			em.persist(msg);
			em.merge(c);
			return msg.getId();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return -1;
		}

	}

	@Override
	public Conversation getConversationById(int conversationId) {
		return em.find(Conversation.class, conversationId);
	}

	@Override
	public List<Message> getMessageLastDays(int conversationId, int days) {
		try {
			TypedQuery<Message> q = em.createQuery(
					"select m from Message m where (m.conversation.id = :cid) "
							+ " and ( (  TO_DAYS(:nowUTC) - TO_DAYS(m.sentTime) ) <= :days ) " + "order by m.sentTime",
					Message.class);
			q.setParameter("cid", conversationId).setParameter("days", new Long(days)).setParameter("nowUTC",
					Util.getDateNowUTC(), TemporalType.TIMESTAMP);
			List<Message> msgs = q.getResultList();
			return msgs;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	@Override
	public Conversation getConversation2Users(int idDoctor, int idPatient) {
		try {
			TypedQuery<Conversation> q = em.createQuery(
					"select c from Conversation c where (c.patient.id= :p and c.doctor.id= :d)", Conversation.class);
			q.setParameter("p", idPatient).setParameter("d", idDoctor);
			return (Conversation) q.getSingleResult();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	@Override
	public Conversation getConversation2UsersLastDays(int idDoctor, int idPatient, int days) {
		try {
			TypedQuery<Conversation> q = em.createQuery(
					"select c from Conversation c where (c.patient.id= :p and c.doctor.id= :d)", Conversation.class);
			q.setParameter("p", idPatient).setParameter("d", idDoctor);
			Conversation c = (Conversation) q.getSingleResult();
			c.setMessages(getMessageLastDays(c.getId(), days));
			return c;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	// My conversations order by last message sent
	@Override
	public List<Conversation> getConversationsByUser(int idUser) {

		try {
			User u = em.find(User.class, idUser);
			if (u == null)
				return null;

			TypedQuery<Conversation> q = em.createQuery(
					"select c from Conversation c where  ((c.doctor.id= :idUser) or (c.patient.id = :idUser)) order by lastUpdated desc",
					Conversation.class);

			q.setParameter("idUser", idUser);
			List<Conversation> conversations = q.getResultList();

//			if (!conversations.isEmpty()) {
//				conversations.stream().forEach(c -> c.getMessages().sort(Comparator.comparing(Message::getSentTime).reversed()));//desc
				
//				Collections.sort(conversations, new Comparator<Conversation>() {
//					@Override
//					public int compare(Conversation c1, Conversation c2) {
//						return c1.getMessages().get(0).getSentTime().compareTo(c2.getMessages().get(0).getSeenTime());// ASC
//					}
//				});
//			}

			return conversations;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	@Override
	public List<Conversation> getConversationsLastDays(int idUser, int days) {

		try {
			User u = em.find(User.class, idUser);

			if (u == null)
				return null;

			TypedQuery<Conversation> q = em.createQuery(
					"select c from Conversation c where ((c.doctor.id= :idUser) or (c.patient.id = :idUser)) "
							+ " and ((TO_DAYS(NOW()) - TO_DAYS(c.lastUpdated)) <= " + days
							+ ") order by c.lastUpdated desc",
					Conversation.class);
			q.setParameter("idUser", idUser);

			return q.getResultList();
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
	}

	@Override
	public boolean seenConversation(int conversationId,int id) {
		try {
			Conversation c = em.find(Conversation.class, conversationId);
			c.getMessages().stream().filter(m -> m.getSeenTime() == null && m.getSenderId() == id)
					.forEach(m -> m.setSeenTime(Util.getDateNowUTC()));

			em.merge(c);
			return true;
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}

	}

	@Override
	public boolean deleteConversation(int conversationId, int idUser) {

		try {
			Conversation c = em.find(Conversation.class, conversationId);
			if (c.getDoctor().getId() == idUser) {
				if (c.isPatientDeleted()) {
					em.refresh(c);
					em.remove(c);
					return true;
				}
				c.setDoctorDeleted(true);
				em.merge(c);
				return true;
			}

			if (c.getPatient().getId() == idUser) {
				if (c.isDoctorDeleted()) {
					em.refresh(c);
					em.remove(c);
					return true;
				}
				c.setPatientDeleted(true);
				em.merge(c);
				return true;
			}
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return false;
		}
		return false;
	}

}

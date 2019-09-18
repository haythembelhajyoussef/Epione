package tn.esprit.epione.beans;

import java.util.List;

import javax.ejb.EJB;
import javax.enterprise.context.RequestScoped;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import tn.esprit.epione.interfaces.ChatServiceLocal;
import tn.esprit.epione.persistence.Conversation;
import tn.esprit.epione.persistence.Message;

@Path("chat")
@RequestScoped
public class ChatResource {

	@EJB
	ChatServiceLocal cs;

	@POST
	@Path("{idDoctor}/{idPatient}")
	@Consumes("application/json; charset=utf8")
	public Response sendMessage(@PathParam("idDoctor") int idDoctor, @PathParam("idPatient") int idPatient,
			Message msg) {
//		System.out.println(msg.getContent().codePointAt(0));
//		System.out.println(msg.getContent()+"    😄 &#128516; :smile:  khlbhlh  &#128516;");
		int id = cs.sendMsg(idDoctor, idPatient, msg);
		if (id > -1)
			return Response.status(Response.Status.CREATED).entity(id).build();
		return Response.status(Response.Status.NOT_ACCEPTABLE).entity("Message failed").build();
	}

	@POST
	@Path("/seen/{idConversation}/{id}")
	@Consumes(MediaType.APPLICATION_JSON)
	public Response seenConversation(@PathParam("idConversation") int idConversation,@PathParam("id") int id) {
		if (cs.seenConversation(idConversation,id))
			return Response.status(Response.Status.ACCEPTED).entity("Conversation marked seen with now date UTC")
					.build();
		return Response.status(Response.Status.NOT_ACCEPTABLE).entity("NOt Valid conversation id !").build();
	}

	@GET
	@Path("{id}")
	@Produces(MediaType.APPLICATION_JSON)
	public Response getConversationById(@PathParam("id") int idConversation) {
		Conversation c = cs.getConversationById(idConversation);
		if (c == null)
			return Response.status(Response.Status.NOT_ACCEPTABLE).entity("failed to get conversation !").build();
		return Response.status(Response.Status.FOUND).entity(c).build();
	}

	@GET
	@Path("/messages/{idConversation}/{days}")
	@Produces(MediaType.APPLICATION_JSON+"; charset=utf8")
	public Response getMessageLastDays(@PathParam("idConversation") int idConversation, @PathParam("days") int days) {
		List<Message> l = cs.getMessageLastDays(idConversation, days);
		if (l != null)
			return Response.status(Response.Status.ACCEPTED).entity(l).build();
		return Response.status(Response.Status.NOT_ACCEPTABLE).entity("get messages failed !!").build();
	}

	@GET
	@Path("{idDoctor}/{idPatient}")
	@Produces(MediaType.APPLICATION_JSON+"; charset=utf8")
	public Response getConversation2Users(@PathParam("idDoctor") int idDoctor, @PathParam("idPatient") int idPatient) {

		Conversation c = cs.getConversation2Users(idDoctor, idPatient);
		if (c != null)
			return Response.status(Response.Status.FOUND).entity(c).build();
		return Response.status(Response.Status.NOT_ACCEPTABLE).entity("Get Conversation failed !!").build();
	}

	@GET
	@Path("{idDoctor}/{idPatient}/{days}")
	@Produces(MediaType.APPLICATION_JSON+"; charset=utf8")
	public Response getConversation2UsersLastDays(@PathParam("idDoctor") int idDoctor,
			@PathParam("idPatient") int idPatient, @PathParam("days") int days) {
		Conversation c = cs.getConversation2UsersLastDays(idDoctor, idPatient, days);
		if (c != null)
			return Response.status(Response.Status.FOUND).entity(c).build();
		return Response.status(Response.Status.NOT_ACCEPTABLE).entity("Get Conversation failed !!").build();
	}

	@GET
	@Path("all/{idUser}")
	@Produces(MediaType.APPLICATION_JSON+"; charset=utf8")
	public Response getConversationsByUser(@PathParam("idUser") int idUser) {

		List<Conversation> c = cs.getConversationsByUser(idUser);
		if (c != null)
			return Response.status(Response.Status.FOUND).entity(c).build();
		return Response.status(Response.Status.NOT_ACCEPTABLE).entity("Get Conversations failed !!").build();
	}

	@GET
	@Path("all/{idUser}/{days}")
	@Produces(MediaType.APPLICATION_JSON+"; charset=utf8")
	public Response getConversationsLastDays(@PathParam("idUser") int idUser, @PathParam("days") int days) {
		List<Conversation> c = cs.getConversationsLastDays(idUser, days);
		if (c != null)
			return Response.status(Response.Status.FOUND).entity(c).build();
		return Response.status(Response.Status.NOT_ACCEPTABLE).entity("Get Conversations failed !!").build();
	}

	@DELETE
	@Path("{idConversation}/{idUser}")
	public Response deleteConversation(@PathParam("idConversation") int idConversation,
			@PathParam("idUser") int idUser) {
		if (cs.deleteConversation(idConversation, idUser))
			return Response.status(Response.Status.ACCEPTED).entity("Conversation deleted successfully").build();
		return Response.status(Response.Status.NOT_ACCEPTABLE).entity("Conversation deletion failed !!").build();

	}

}

using Epione.Service;
using Epione.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Epione.Domain;
using System.IO;
using Newtonsoft.Json;
using System.Net;
using Newtonsoft.Json.Converters;

namespace Epione.Web.Controllers
{

    public class ChatController : Controller
    {
        // GET: Chat
        public async Task<ActionResult> ChatBox()
        {
            ChatViewModel Model = new ChatViewModel();
            ServiceDiscussion serviceDiscussion = new ServiceDiscussion();
            Model.currentUser = (user) System.Web.HttpContext.Current.Session["IUser"];
            if (Model.currentUser == null)
            {
                return RedirectToAction("Login", "Home");
            }
            Model.discussions = await serviceDiscussion.getDiscussionsByIdUserAsync(Model.currentUser.id);
            return View(Model);
        }

        [HttpPost]
        [Route("Chat/DeleteConversation/{idConv}")]
        public ActionResult DeleteConversation(string idConv)
        {
            ServiceDiscussion serviceDiscussion = new ServiceDiscussion();
            user currentUser = (user)System.Web.HttpContext.Current.Session["IUser"];
            serviceDiscussion.deleteConversation(idConv, currentUser.id.ToString());
            return Json("Conversation deleted");
        }


        [HttpPost]
        public ActionResult UploadFile()
        {
            if (Request.Files.Count > 0)
            {
                try
                {
                    //  Get all files from Request object  
                    HttpFileCollectionBase files = Request.Files;
                    //for (int i = 0; i < files.Count; i++)
                    //{
                        //string path = AppDomain.CurrentDomain.BaseDirectory + "Uploads/";  
                        //string filename = Path.GetFileName(Request.Files[i].FileName);  

                        HttpPostedFileBase file = files[0];
                        string fname, extension="";
                        

                        // Checking for Internet Explorer  
                        if (Request.Browser.Browser.ToUpper() == "IE" || Request.Browser.Browser.ToUpper() == "INTERNETEXPLORER")
                        {
                            string[] testfiles = file.FileName.Split(new char[] { '\\' });
                            fname = testfiles[testfiles.Length - 1];
                        }
                        else
                        {
                            int index = file.FileName.LastIndexOf(".");
                            string name = file.FileName;
                            if (index > 0)
                            {
                                extension = name.Substring(index);
                            }
                            else// it's a record
                            {
                                if (name.Contains("blob"))
                                    extension = ".wav";
                        }

                            fname = Guid.NewGuid()+extension;
                        }

                        // save to the complete folder path and store the file inside it.  
                        file.SaveAs(Path.Combine(Server.MapPath("~/Content/Files/"), fname));
                        file.SaveAs("C:/root/Content/Files/" + fname);
                    //}
                    // Returns name of file uploaded  
                    return Json(fname);
                }
                catch (Exception ex)
                {
                    return Json("Error occurred. Error details: " + ex.Message);
                }
            }
            else
            {
                return Json("No files selected.");
            }
        }

        

    }
}
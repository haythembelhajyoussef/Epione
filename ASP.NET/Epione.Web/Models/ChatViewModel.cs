using Epione.Domain;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace Epione.Web.Models
{
    public class ChatViewModel
    {
       public user currentUser;
       public List<discussion> discussions;


        public string FormatDate(DateTime? d)
        {
            return d?.ToString("ddd, dd MMM yyyy, h:mm:ss tt", CultureInfo.CreateSpecificCulture("en-US"));
        }

    }
}
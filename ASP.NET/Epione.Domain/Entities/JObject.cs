using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Epione.Domain.Entities
{
    public class JObject
    {
        public string key { get; set; }
        public string value { get; set; }
        public JObject(string key, string value)
        {
            this.key = key;
            this.value = value;
        }
    }
}

namespace Epione.Domain
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("epione.message")]
    public partial class message
    {
    
        public int id { get; set; }

        [StringLength(5000)]
        public string content { get; set; }

        public DateTime? seenTime { get; set; }

        public int? senderId { get; set; }

        public DateTime? sentTime { get; set; }

        public int? discussion_id { get; set; }

        public virtual discussion discussion { get; set; }

        public bool ShouldSerializediscussion_id()
        {
            return false;
        }
        public bool ShouldSerializediscussion()
        {
            return false;
        }
    }
}

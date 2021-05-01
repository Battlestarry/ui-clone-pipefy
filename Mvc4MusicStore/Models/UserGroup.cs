using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Mvc4MusicStore.Models
{
    public class UserGroup
    {
        [StringLength(16)]
        public string Name { get; set; }
    }
}
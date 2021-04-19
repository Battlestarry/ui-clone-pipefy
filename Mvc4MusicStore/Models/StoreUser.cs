
﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Mvc4MusicStore.Models
{
    public class StoreUser
    {
        [Display(Name = "Username")]
        public string userName { get; set; }

        [Display(Name="Is Store Manager?")]
        public bool isManager { get; set; }

        [Display(Name = "Record Label")]
        public string recordLabel { get; set; }
    }
}
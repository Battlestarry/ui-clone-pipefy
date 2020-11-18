using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace Mvc4MusicStore.Models
{
    [Bind(Exclude = "AlbumId")]
    p
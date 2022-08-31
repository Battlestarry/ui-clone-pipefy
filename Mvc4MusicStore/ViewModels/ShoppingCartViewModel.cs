using System.Collections.Generic;
using Mvc4MusicStore.Models;

namespace Mvc4MusicStore.ViewModels
{
    public class ShoppingCartViewModel
    {
        public List<Cart> CartItems { get; set; }
        public decimal CartTotal { get; set; }
    }
}
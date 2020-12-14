using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using ShoppingPortal.DAL;
using ShoppingPortal.Models;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;

namespace ShoppingPortal.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderDetailsController : Controller
    {
        private readonly IConfiguration _configuration;
        private DataAccess _da;
        public OrderDetailsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        public JsonResult Post(OrderDetails ordDetails)
        {
            _da = new DataAccess(_configuration);
            return new JsonResult(_da.SaveShipBillDetails(ordDetails));
        }


        [Route("SaveProductsOrdered")]
        [HttpPost]
        public JsonResult SaveProductsOrdered(List<ProductsOrdered> productsOrdered)
        {
            _da = new DataAccess(_configuration);
            return new JsonResult(_da.SaveOrdersProd(productsOrdered));
        }
        
    }
}

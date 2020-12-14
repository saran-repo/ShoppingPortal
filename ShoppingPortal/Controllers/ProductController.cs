using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
using System.Data;
using Microsoft.Extensions.Configuration;
using ShoppingPortal.DAL;

namespace ShoppingPortal.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : Controller
    {
        private readonly IConfiguration _configuration;
        private DataAccess _da;

        public ProductController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult Get()
        {
            DataTable table = new DataTable();
            _da = new DataAccess(_configuration);
            table = _da.SelectAll("uspGetAllProducts");

            return new JsonResult(table);
        }

    }
}

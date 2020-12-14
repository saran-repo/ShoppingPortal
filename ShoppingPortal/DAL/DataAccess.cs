using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Configuration;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using ShoppingPortal.Models;

namespace ShoppingPortal.DAL
{
    public class DataAccess
    {
        private readonly IConfiguration _configuration;
        private string sqlDataSource;
        SqlDataReader myReader;

        public DataAccess(IConfiguration configuration)
        {
            _configuration = configuration;
            sqlDataSource = _configuration.GetConnectionString("ShoppingDBAppCon");
        }

        public string SaveShipBillDetails(OrderDetails ordDetails)
        {
            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    SqlCommand Cmd = new SqlCommand("uspPlaceOrderIns", myCon);
                    Cmd.CommandType = CommandType.StoredProcedure;
                    Cmd.Parameters.AddWithValue("@OrderId", ordDetails.Id);
                    Cmd.Parameters.AddWithValue("@FirstName", ordDetails.FirstName);
                    Cmd.Parameters.AddWithValue("@LastName", ordDetails.LastName);
                    Cmd.Parameters.AddWithValue("@Email", ordDetails.Email);
                    Cmd.Parameters.AddWithValue("@Address", ordDetails.Address);
                    Cmd.Parameters.AddWithValue("@Address2", ordDetails.Address2);
                    Cmd.Parameters.AddWithValue("@Country", ordDetails.Country);
                    Cmd.Parameters.AddWithValue("@State", ordDetails.State);
                    Cmd.Parameters.AddWithValue("@City", ordDetails.City);
                    Cmd.Parameters.AddWithValue("@Zip", ordDetails.Zip);
                    Cmd.Parameters.AddWithValue("@CardType", ordDetails.CardType);
                    Cmd.Parameters.AddWithValue("@NameOnCard", ordDetails.NameOnCard);
                    Cmd.Parameters.AddWithValue("@CardNumber", ordDetails.CardNumber);
                    Cmd.Parameters.AddWithValue("@Expiration", ordDetails.Expiration);
                    Cmd.Parameters.AddWithValue("@CVV", ordDetails.CVV);
                    myCon.Open();
                    Cmd.ExecuteNonQuery();
                    myCon.Close();

                }
                return "Thank You for placing this Order!!! Your OrderID is " + ordDetails.Id.ToString();
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        }
        public string SaveOrdersProd(List<ProductsOrdered> productsOrdered)
        {
            try
            {
                using (SqlConnection myCon = new SqlConnection(sqlDataSource))
                {
                    foreach (var products in productsOrdered)
                    {
                        SqlCommand Cmd = new SqlCommand("uspSaveProductsOrderedIns", myCon);
                        Cmd.CommandType = CommandType.StoredProcedure;
                        Cmd.Parameters.AddWithValue("@OrderId", products.OrderId);
                        Cmd.Parameters.AddWithValue("@ProductId", products.ProductId);
                        Cmd.Parameters.AddWithValue("@ProductName", products.ProductName);
                        Cmd.Parameters.AddWithValue("@Price", products.Price);
                        Cmd.Parameters.AddWithValue("@Quantity", products.ProductQuantity);
                        Cmd.Parameters.AddWithValue("@TotalPrice", products.Price * products.ProductQuantity);
                        myCon.Open();
                        Cmd.ExecuteNonQuery();
                        myCon.Close();
                    }
                }
                return "Processed Successfully";
            }
            catch (Exception ex)
            {
                return ex.Message.ToString();
            }
        }
        public DataTable SelectAll(string query)
        {
            DataTable dt = new DataTable();
            using (SqlConnection myCon = new SqlConnection(sqlDataSource))
            {
                using (SqlCommand myCommand = new SqlCommand(query, myCon))
                {
                    myCon.Open();
                    myReader = myCommand.ExecuteReader();
                    dt.Load(myReader);
                    myReader.Close();
                    myCon.Close();
                }
            }
            return dt;
        }
    }
}


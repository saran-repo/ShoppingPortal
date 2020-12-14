import { Component, OnInit, Input } from '@angular/core';

import { SharedService } from 'src/app/shared.service';

import { OrderDetails } from 'src/app/Models/OrderDetails';
import { CartDetails } from 'src/app/Models/CartDetails';
import { Guid } from 'guid-typescript';



@Component({
  selector: 'app-view-add-prod',
  templateUrl: './view-add-prod.component.html',
  styleUrls: ['./view-add-prod.component.css']
})
export class ViewAddProdComponent implements OnInit {

  constructor(private service: SharedService) { }


  ProductList: any = [];
  //ModalTitle: string;
  //ActivateAddEditDepComp:boolean=false;


  //For activating Different views
  ProductsListView: Boolean = false;
  ProductsGridView: Boolean = false;
  CartDetailsTable: Boolean = false;
  checkoutWithoutProducts: Boolean = false;
  hideShippingAddress: Boolean = true;
  CheckoutWindow: Boolean = false;
  ShowControls: Boolean = true;

  public totalItem: number = 0;
  public cartDetails: CartDetails[] = [];
  public LabelMessage:string="";


  //For calculate Total Price,Qty and Grand Total price  
  public totalPrice: number = 0;
  public totalQty: number = 0;
  public GrandtotalPrice: number = 0;

  //For display Item details and Cart Detail items  
  // public ProductId: number;
  // public ProductName: string = "";
  // public Price: number = 0;
  // public ImageName: string = "";
  // public ImagePath: string = "";
  // public Description: string = "";
  // public Quantity: number = 0;


  //For storing Biling and Payment information
  public guidId : Guid;  
  FirstName: string = "";
  LastName: string = "";
  Email: string = "";
  Address: string = "";
  Address2: string = "";
  Country: string = "";
  State: string = "";
  City: string = "";
  Zip: string = "";
  CardType:string = "";
  NameOnCard: string = "";
  CardNumber: number;
  Expiration: string = "";
  CVV: number;

  onItemChange(value){
    this.CardType = value;
 }

  ngOnInit() {
    this.refreshProdList();
    this.ProductsListView = true;
    this.CartDetailsTable = false;
    this.ShowControls = true;
    this.guidId = Guid.create();
  }


//Sorting and Fileters
  ProductNameFilter: string = "";
  ProductListWithoutFilter: any = [];
  
  

  addProductsToCart(dataItem) {
    
    var count: number = 0;
    var ItemCountExists: number = 0;
    this.totalItem = this.cartDetails.length;
    let customProdList = new CartDetails();
    this.checkoutWithoutProducts = false;

    if (this.cartDetails.length > 0) {
      for (count = 0; count < this.cartDetails.length; count++) {
        if (this.cartDetails[count].ProductId == dataItem.ProductId) {
          ItemCountExists = this.cartDetails[count].ProductQuantity + 1;
          this.cartDetails[count].ProductQuantity = ItemCountExists;
        }
      }
    }
    if (ItemCountExists <= 0) {
      customProdList.OrderId = this.guidId.toString();
      customProdList.ProductId = dataItem.ProductId;
      customProdList.ProductName = dataItem.ProductName;
      customProdList.Description = dataItem.Description;
      customProdList.Price = dataItem.Price;
      customProdList.ImageName = dataItem.ImageName;
      customProdList.ProductQuantity = 1;

      this.cartDetails.push(customProdList);
    }
    this.getItemTotalresult();
  }

  //Save order details
  placeOrder() {
    var shipBillDetails = {
      Id:this.guidId.toString(),
      FirstName: this.FirstName,
      LastName: this.LastName,
      Email: this.Email,
      Address: this.Address,
      Address2: this.Address2,
      Country: this.Country,
      State: this.State,
      City: this.City,
      Zip: this.Zip,

      CardType: this.CardType,
      NameOnCard: this.NameOnCard,
      CardNumber: this.CardNumber,
      Expiration: this.Expiration,
      CVV: this.CVV,
    };

    this.service.submitProductsDetails(this.cartDetails).subscribe(res => {
      alert(res.toString());
    });
    this.service.submitOrderDetails(shipBillDetails).subscribe(res => {
      this.LabelMessage = res.toString();
    });
  }


  //to calculate and display the total price information in Shopping cart.  
  getItemTotalresult() {
    this.totalPrice = 0;
    this.totalQty = 0;
    this.GrandtotalPrice = 0;
    var count: number = 0;
    this.totalItem = this.cartDetails.length;
    for (count = 0; count < this.cartDetails.length; count++) {
      this.totalPrice += this.cartDetails[count].Price;
      this.totalQty += (this.cartDetails[count].ProductQuantity);
      this.GrandtotalPrice += this.cartDetails[count].Price * this.cartDetails[count].ProductQuantity;
    }
  }

  //To remove products from Cart
  removeFromCart(removeIndex) {
    this.cartDetails.splice(removeIndex, 1);

    this.getItemTotalresult();
  }

  proceedToCart() {
    if (this.cartDetails.length <= 0) {
      this.checkoutWithoutProducts = true;
    }
    else {
      this.CheckoutWindow = true;
      this.ProductsListView = false;
      this.CartDetailsTable = false;
    }

  }

  changeProductListView(){
    if(this.ProductsListView==true){
      this.ProductsListView = false;
      this.ProductsGridView = true;
    }
    else{
      this.ProductsListView = true;
      this.ProductsGridView = false;
    }
  }

  showCart() {
    this.CartDetailsTable = true;
    this.ProductsListView = false;
    this.ProductsGridView = false;
    this.ShowControls = false;
    this.CheckoutWindow = false;
  }

  displayOutputFromAPI(){
    
  }

  enableDisableShipping(e) {
    if (e.target.checked) {
      if (this.hideShippingAddress == true) {
        this.hideShippingAddress = false;
      }
    }
    else {
      if (this.hideShippingAddress == true) {
        this.hideShippingAddress = false;
      }
    }

  }

  showProductList() {
    this.ProductsListView = true;
    this.CartDetailsTable = false;
    this.ShowControls = true;
  }

  sortResult(prop, asc) {
    this.ProductList = this.ProductListWithoutFilter.sort(function (a, b) {
      if (asc) {
        return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
      } else {
        return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      }
    })
  }


  refreshProdList() {
    this.service.getProductList().subscribe(data => {
      this.ProductList = data;
      this.ProductListWithoutFilter = data;
    });
  }



  FilterFn() {
    var ProductNameFilter = this.ProductNameFilter;

    this.ProductList = this.ProductListWithoutFilter.filter(function (el) {
      return el.ProductName.toString().toLowerCase().includes(
        ProductNameFilter.toString().trim().toLowerCase()
      )
    });
  }

}

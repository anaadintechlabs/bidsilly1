import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders,HttpBackend } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiService } from "services/api.service";
import { JwtServiceService } from "services/jwt-service.service";
import { environment } from './../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppService {

  //  BaseUrl='https://aclassdeal.appspot.com/api';
   //BaseUrl='http://13.229.125.248:8080/aclassdeal-0.0.1-SNAPSHOT/api';
  // BaseUrl:'http://localhost:8081/aclassdeal/api';

  BaseUrl= `${environment.api_url}` + '/api';
  imageUrl = this.BaseUrl+"/downloadFile/";

   errorHandler(error){
  return Observable.throw(error) ;
  }

  successResponse(response){
  try {
      if (response) {
        return response.data;
      }
    }
    catch (ex) {
      console.log(ex);
    }
    return response;

  }
  constructor(private httpClient:HttpClient,private apiService:ApiService,private httpBackend:HttpBackend,private jwtTokenService:JwtServiceService) { }

  uploadImage(formData) 
  {
    console.log("upload image called ");
    console.log('upload image proudct'+formData);   
    let url=this.BaseUrl+'/uploadFile';
       return this.httpClient.post(url,formData).pipe(map(this.successResponse), catchError(this.errorHandler));
 
  }
  getAllAttributeOfSubCategoryCode(catCode,limit,offset){
    return this.apiService.get('/api/getAllAttributeOfSubCategoryCode?limit='+limit+'&offset='+offset+'&catCode='+catCode).pipe(map(this.successResponse));
  
  }
  deleteImage(formData) 
  {
    console.log('delete proudct'+formData);   
    let url=this.BaseUrl+'/delProd';
       return this.httpClient.post(url,formData).pipe(map(this.successResponse), catchError(this.errorHandler));
 

    // return this.http.post<any>(`${this.apiUrl}api/deleteImage`, formData)
    // .pipe(
    //   catchError(this.handleError)
    // );
  }

  
// This will not intercepted by default interceptor bcz default interceptor's content type os
//Application/json and we want multipart/form-data

  saveProduct(formData){    
    const HttpUploadOptions = {
    headers: new HttpHeaders({
    // "Content-Type": "multipart/form-data",
    'Authorization': 'Bearer ' + this.jwtTokenService.getToken()
      }),
    }
    this.httpClient= new HttpClient(this.httpBackend);
    let url = this.BaseUrl + '/saveProductWithImages';
    return this.httpClient.post(url,formData,HttpUploadOptions).pipe(map(this.successResponse), catchError(this.errorHandler));
  }


  approveOrBlockProducts(productIdList,status)
    {
         return this.apiService.get('/api/approveOrBlockProduct?Ids='+productIdList+'&status='+status).pipe(map(this.successResponse));

      // let url=this.BaseUrl+'/approveProduct?Ids='+productIdList;
      //  return this.httpClient.get(url,productIdList).pipe(map(this.successResponse), catchError(this.errorHandler));
    }


    saveCategory(formData) {  
      const HttpUploadOptions = {
       headers: new HttpHeaders({
         'Authorization': 'Bearer ' + this.jwtTokenService.getToken()
       }),
     }
 
     this.httpClient= new HttpClient(this.httpBackend);
          let url=this.BaseUrl+'/saveCategory';
        return this.httpClient.post(url,formData,HttpUploadOptions).pipe(map(this.successResponse), catchError(this.errorHandler));
 
     }

     getAllPostOfUser(limit,offset){
      return this.apiService.get('/api/getAllPostedAdsOfUser?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));
       }

  saveSubCategory(data){
    return this.apiService.post('/api/saveSubCategory',data).pipe(map(this.successResponse));
    // let url=this.BaseUrl+'/saveSubCategory';
    // return this.httpClient.post(url,data).pipe(map(this.successResponse), catchError(this.errorHandler));
    }

   
  reportFormOnSubmit(data,prodId){
    return this.apiService.post('/api/addReportedAids?prodId='+prodId,data).pipe(map(this.successResponse));
    //  let url=this.BaseUrl+'/addReportedAids?prodId='+prodId;
    // return this.httpClient.post(url,data).pipe(map(this.successResponse), catchError(this.errorHandler));
    
    }

  saveAttribute(data){
      return this.apiService.post('/api/saveAttribute',data).pipe(map(this.successResponse));
   
    //    let url=this.BaseUrl+'/saveAttribute';
    // return this.httpClient.post(url,data).pipe(map(this.successResponse), catchError(this.errorHandler));
      }

      getAllCategoryWithCount(limit,offset){
        return this.apiService.get('/api/getAllCategorieswithCount?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));

      }
  getAllProducts(limit,offset){
    return this.apiService.get('/api/getAllProducts?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));

    //     let url = this.BaseUrl+'/getAllProducts?limit='+limit+'&offset='+offset;
    //  return this.httpClient.get(url).pipe(map(this.successResponse),catchError(this.errorHandler));
      }
  getAllProductsDashboard(limit,offset){
      return this.apiService.get('/api/getAllProductsDashboard?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));

    //     let url = this.BaseUrl+'/getAllProductsDashboard?limit='+limit+'&offset='+offset;
    //  return this.httpClient.get(url).pipe(map(this.successResponse),catchError(this.errorHandler));
      }

      getAllProductsIrrespectiveOfStatus(limit,offset)
      {
         return this.apiService.get('/api/getAllProductsIrrespectiveOfStatus?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));

      }
  
  getAllPendingProduct(limit,offset){
     return this.apiService.get('/api/getAllPendingProducts?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));

    // let url = this.BaseUrl+'/getAllPendingProducts?limit='+limit+'&offset='+offset;
    //  return this.httpClient.get(url).pipe(map(this.successResponse),catchError(this.errorHandler));
  }
  getProductApprovedById(prodId)
      {
           return this.apiService.get('/api/getProductApprovedById?prodid='+prodId).pipe(map(this.successResponse));

        // let url = this.BaseUrl+'/getProductApprovedById?prodid='+prodId;
        // return this.httpClient.get(url).pipe(map(this.successResponse),catchError(this.errorHandler));
      }

      getProductById(prodId){
         return this.apiService.get('/api/getProductById?prodId='+prodId).pipe(map(this.successResponse));


        // let url = this.BaseUrl+ '/getProductById?prodId=' +prodId;
        // return this.httpClient.get(url).pipe(map(this.successResponse),catchError(this.errorHandler));
      }

  getAllCategories(limit,offset)
   {
  return this.apiService.get('/api/getAllCategories?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));


    //  let url = this.BaseUrl+'/getAllCategories?limit='+limit+'&offset='+offset;
    //  return this.httpClient.get(url).pipe(map(this.successResponse),catchError(this.errorHandler));
   }

  getAllSubCategoryAndAttributeOfCategoryCode(catCode,limit,offset){
      return this.apiService.get('/api/getAllSubCategoryAndAttributeOfCategoryCode?catCode='+catCode+'&limit='+limit+'&offset='+offset).pipe(map(this.successResponse));

    // let url = this.BaseUrl+'/getAllSubCategoryAndAttributeOfCategoryCode?catCode='+catCode+'&limit='+limit+'&offset='+offset;
    // return this.httpClient.get(url).pipe(map(this.successResponse),catchError(this.errorHandler));
   }

  getAllAttributeOfCategory(catCode){
     return this.apiService.get('/api/getAllAttributeOfCategory?catCode='+catCode).pipe(map(this.successResponse));

    //  let url=this.BaseUrl+'/getAllAttributeOfCategory?catCode='+catCode;
    //  return this.httpClient.get(url).pipe(map(this.successResponse),catchError(this.errorHandler));
   }


  getAllReportedAds(limit,offset)
   {
       return this.apiService.get('/api/getallAds?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));

    //  let url = this.BaseUrl+'/getallAds?limit='+limit+'&offset='+offset;
    //  return this.httpClient.get(url).pipe(map(this.successResponse),catchError(this.errorHandler));
   }

  blockAdd(reportedId){
        return this.apiService.get('/api/blockAdd?reportedId='+reportedId).pipe(map(this.successResponse));


    //     let url = this.BaseUrl+'/blockAdd?reportedId='+reportedId;
    //  return this.httpClient.get(url).pipe(map(this.successResponse),catchError(this.errorHandler));
   
   }

   addToWishlist(prodId,userId){
        return  this.apiService.post('/api/addtoWishlist?prodId='+prodId+'&userId='+userId,'').pipe(map(this.successResponse));
     

    // let url = this.BaseUrl+'/addtoWishlist?prodId='+prodId;
    // return this.httpClient.post(url, prodId).pipe(map(this.successResponse),catchError(this.errorHandler));
   }

   getWishList(limit,offset){
          return this.apiService.get('/api/getallWishlist?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));

    //  let url = this.BaseUrl+'/getallWishlist';
    //  return this.httpClient.get(url).pipe(map(this.successResponse),catchError(this.errorHandler));
   }

   getAllDetailsOfProductById(prodId){
        return this.apiService.get('/api/getAllDetailsOfProduct?prodId='+prodId).pipe(map(this.successResponse));


    //  let url = this.BaseUrl+'/getAllDetailsOfProduct?prodId='+prodId;
    //  return this.httpClient.get(url).pipe(map(this.successResponse),catchError(this.errorHandler));
   }

    // saveBidForProduct(data){
    //   return this.apiService.post('/api/saveClosedDeal',data).pipe(map(this.successResponse));   
    // }
   saveBidForProduct(data){
      return this.apiService.post('/api/saveBidForProduct',data).pipe(map(this.successResponse));   
    }


    saveIntrestForProduct(data)
    {
     return this.apiService.post('/api/saveInterestForProduct',data).pipe(map(this.successResponse));      
    }
    closeBidForProduct(data)
    {
       return this.apiService.post('/api/saveBidForProduct',data).pipe(map(this.successResponse));   
    }

    searchProduct(data,limit,offset){
        return this.apiService.post('/api/searchProduct?limit='+limit+'&offset='+offset,data).pipe(map(this.successResponse));   
   
    }
    getAllProductOfCategory(limit,offset,catcode){
      return this.apiService.get('/api/getAllProductsOfCategory?limit='+limit+'&offset='+offset+'&catCode='+catcode).pipe(map(this.successResponse));
    }
    getAllProductOfSubCategory(limit,offset,catcode){
      return this.apiService.get('/api/getAllProductsOfSubCategory?limit='+limit+'&offset='+offset+'&catCode='+catcode).pipe(map(this.successResponse));
    }
    getAllBidsOfProduct(limit,offset,productId){
      return this.apiService.get('/api/getAllBidsOfProduct?limit='+limit+'&offset='+offset+'&productId='+productId).pipe(map(this.successResponse));
   }
   getAllBidsOfUSer(limit,offset){
     return this.apiService.get('/api/getAllBidsOfUser?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));
   }
     getAllBidsOfAllProductsOfaUserz(limit,offset){
     return this.apiService.get('/api/getAllBidsOfAllProductsOfaUser?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));
   }

   
   getAllDataForAdminDashboard(){
    return this.apiService.get('/api/getAllDataForAdminDashboard').pipe(map(this.successResponse));
 }


 getAllCategoryAndSubCategory(){
   return this.apiService.get('/api/getAllCategorieswithSubcategory').pipe(map(this.successResponse));
 }

 getAllSubCategoryWithCatId(limit,offset,catId){
   return this.apiService.get('/api/getAllSubCategoryOfCategoryCode?limit='+limit+'&offset='+offset+'&catCode='+catId).pipe(map(this.successResponse));
 }
 getAllUserDetails(limit,offset){
  return this.apiService.get('/api/getAllUsers?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));
}

getAllClosedDeals(limit,offset){
  return this.apiService.get('/api/getAllClosedDeals?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));
}

closedDealFormOnSubmit(data){
   return this.apiService.post('/api/saveClosedDeal',data).pipe(map(this.successResponse)); 
}

deleteCategory(catCode){
    return this.apiService.delete('/api/deleteCategory?catCode='+catCode).pipe(map(this.successResponse));

}

deleteSubCategory(catCode)
{
     return this.apiService.delete('/api/deleteSubCategory?catCode='+catCode).pipe(map(this.successResponse));


}
  blockUser(userId)
  {
      return this.apiService.get('/api/blockUser?userId='+userId).pipe(map(this.successResponse));
 
  }
    reactivateUser(userId)
  {
      return this.apiService.get('/api/reactivateUserAccount?userId='+userId).pipe(map(this.successResponse));
 
  }

  getLoggerInUserDetails(){
     return this.apiService.get('/api/getLoggedInUser').pipe(map(this.successResponse));
  }

  updateUser(data)
  {

        const HttpUploadOptions = {
       headers: new HttpHeaders({
         'Authorization': 'Bearer ' + this.jwtTokenService.getToken()
       }),
     }
 
     this.httpClient= new HttpClient(this.httpBackend);
          let url=this.BaseUrl+'/updateUser';
        return this.httpClient.put(url,data,HttpUploadOptions).pipe(map(this.successResponse), catchError(this.errorHandler));
  }

  setNewPassword(data,id)
  {
       return this.apiService.post('/api/changePassword?userId='+id,data).pipe(map(this.successResponse)); 
  }

  deactivateAndLogOut(data)
  {
        return this.apiService.post('/api/deactivateUserAccount',data).pipe(map(this.successResponse));  
  }

  enableDisablePhoneNumber(enable,id)
  {
     return this.apiService.get('/api/enableDisablePhoneNumber?id='+id+'&enable='+enable).pipe(map(this.successResponse));
 
  }
  getAllExpiredProduct(limit,offset){
    return this.apiService.get('/api/getAllExpiredPostedAdsOfUser?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));
  }
  getAllRejectedProduct(limit,offset){
    return this.apiService.get('/api/getAllRejectedPostedAdsOfUser?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));
  }
  getAllUnApprovedProduct(limit,offset){
    return this.apiService.get('/api/getAllUnapprovedPostedAdsOfUser?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));
  }
  getAllActiveProduct(limit,offset){
    return this.apiService.get('/api/getAllActivePostedAdsOfUser?limit='+limit+'&offset='+offset).pipe(map(this.successResponse));
  }
}

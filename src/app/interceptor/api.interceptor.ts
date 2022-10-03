// import { Inject, Injectable } from '@angular/core';
// import {
//   HttpInterceptor,
//   HttpEvent,
//   HttpRequest,
//   HttpHandler,
//   HttpEventType,
//   HttpResponse,
// } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
// // import { environment } from '.src/environments/environment';


// @Injectable()
// export class HeaderInterceptor implements HttpInterceptor {
//   constructor() {}

//   intercept(
//     request: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {
//     const token = sessionStorage.getItem('token');

//     if (
//       request.url.includes('/assets/i18n') 
       
//     ) {
//       return next.handle(request);
//     }
//     const headers = {
//       Authorization: `Bearer ${token}`,
//       Accept: 'application/json',
//     };

//     request = request.clone({
//       url: `${environment.api}/${request.url}`,
//       setHeaders: headers,
//     });

//     let requestData = {
//       url: request.url,
//       body: request.body,
//       method: request.method,
//       type: 'request',
//     };

//     return next.handle(request);
//   }
// }

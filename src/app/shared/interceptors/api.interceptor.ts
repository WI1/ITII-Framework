import { HttpInterceptorFn } from '@angular/common/http';

// Zentrale Konstante für BaseURL
export const apiBaseURL = "https://swapi.tech/api";

// In der Funktion wird überprüft, ob die Anfrage-URL mit "/api" beginnt.
// Falls ja, wird eine modifizierte Kopie der Anfrage erstellt, bei der der "/api"-Teil durch die in apiBaseURL definierte Basis-URL ersetzt wird.
// Andernfalls wird die Anfrage unverändert weitergeleitet.
// => Anfragen an den Server können immer mit dem prefix '/api' gestellt werden
export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  if( req.url.startsWith('/api')){
    const newReq = req.clone({
      url: `${apiBaseURL}${req.url.replace('/api', '')}`
    })
    return next(newReq);
  }
  return next(req);
};

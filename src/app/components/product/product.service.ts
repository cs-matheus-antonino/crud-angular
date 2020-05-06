import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Product } from "./product.model";
import { Observable, EMPTY } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private baseUrl = "http://localhost:3001/products";

  constructor(private snackBar: MatSnackBar, private http: HttpClient) {}

  showMessage(msg: string, isError: boolean = false): void {
    this.snackBar.open(msg, "X", {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ["msg-error"] : ["msg-success"],
    });
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandle(err))
    );
  }

  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandle(err))
    );
  }

  readById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandle(err))
    );
  }

  update(product: Product): Observable<Product> {
    return this.http
      .put<Product>(`${this.baseUrl}/${product.id}`, product)
      .pipe(
        map((obj) => obj),
        catchError((err) => this.errorHandle(err))
      );
  }

  delete(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.baseUrl}/${id}`).pipe(
      map((obj) => obj),
      catchError((err) => this.errorHandle(err))
    );
  }

  errorHandle(err: any): Observable<any> {
    this.showMessage("Ocorreu um erro!", true);
    return EMPTY;
  }
}

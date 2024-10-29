package main

import (
	"database/sql"
	db2 "github.com/SavioViana/go-hexagonal/adapters/db"
	_ "github.com/mattn/go-sqlite3"
	"github.com/SavioViana/go-hexagonal/application"
)

var Db *sql.DB

func main()  {
	db, _ := sql.Open("sqlite3", "db.sqlite")
	productDbAdapter := db2.NewProductDb(db)
	productService := application.NewProductService(productDbAdapter)

	product, _ := productService.Create("Product Example", 30)
	
	productService.Enable(product)
}
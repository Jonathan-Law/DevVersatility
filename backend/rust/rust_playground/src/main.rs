use std::fs;

use actix_web::{get, web, App, HttpServer, Responder};
#[get("/")]
async fn index(web::Path(()): web::Path<()>) -> impl Responder {
    read_html_file("src/static/index.html").with_header("Content-Type", "text/html")
}
#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| App::new().service(index))
        .bind("127.0.0.1:8080")?
        .run()
        .await
}

fn read_html_file(filename: &str) -> String {
    fs::read_to_string(filename).unwrap_or_else(|_| String::from("Error reading file: ".to_owned() + filename))
}

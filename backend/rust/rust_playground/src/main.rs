use std::io::prelude::*;
use std::net::{TcpListener, TcpStream};
use std::fs;
use std::path::Path;


fn main() {
    let listener = TcpListener::bind("localhost:8080").expect("Failed to bind to address");
    println!("Server listening on http://localhost:8080");

    for stream in listener.incoming() {
        let stream = stream.expect("Failed to establish connection");
        handle_connection(stream);
    }
}

fn handle_connection(mut stream: TcpStream) {
    let mut buffer = [0; 4096];
    let read_result = stream.read(&mut buffer);

    match read_result {
        Ok(0) => {
            println!("No data was sent");
            return;
        }
        Ok(_) => {
            let get_request = b"GET / HTTP/1.1\r\n";
            if buffer.starts_with(get_request) {
                let static_dir = Path::new(file!()).parent().unwrap().join("static");
                let index_html = static_dir.join("index.html");
                let response = format!(
                    "HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n{}",
                    read_html_file(&index_html)
                );
                stream.write(response.as_bytes()).expect("Failed to write response to stream");
                stream.flush().expect("Failed to flush stream");
            } else {
                let response = "HTTP/1.1 404 NOT FOUND\r\n\r\n";
                stream.write(response.as_bytes()).expect("Failed to write response to stream");
                stream.flush().expect("Failed to flush stream");
            }
        }
        Err(err) => {
            println!("Error reading stream: {:?}", err);
            return;
        }
    }
}

fn read_html_file(filename: &Path) -> String {
    fs::read_to_string(filename).unwrap_or_else(|_| String::from("Error reading file: ".to_owned() + filename.to_str().unwrap()))
}

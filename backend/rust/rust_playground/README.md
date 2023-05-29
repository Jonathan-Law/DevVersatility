# rustPlayground
Playground for rust (Note that this server runs on 0.0.0.0, but will be accessible through any local IP. http://localhost:8080)

## startup
```
cargo run
```
-- or --  
```
docker build -t rust-image .  
docker run -it -p 8080:8080 --rm --name rust-playground rust-image
```


FROM rust:1.69 as builder
WORKDIR /app/src
RUN USER=root cargo new --bin rust_playground
COPY Cargo.toml Cargo.lock ./rust_playground/

WORKDIR /app/src/rust_playground
RUN cargo build --release

RUN cargo clean

COPY . .
RUN cargo build --release

FROM debian:stable-slim
WORKDIR /app
RUN apt update \
    && apt install -y openssl ca-certificates \
    && apt clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

EXPOSE 8080

COPY --from=builder /app/src/rust_playground/target/release/rust_playground ./
COPY src/static /app/src/static/

CMD ["/app/rust_playground"]
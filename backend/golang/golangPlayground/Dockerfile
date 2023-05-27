# Use the official GoLang base image
FROM golang:1.20

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files
COPY go.mod ./

# Copy the rest of the project source code
COPY . .

# Build the Go application
RUN go build -o startup .

# Set the command to run when the container starts
CMD ["./startup"]

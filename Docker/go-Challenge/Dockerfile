FROM golang:alpine3.18 as builder

WORKDIR /app

COPY . .

RUN go mod init go-challenge

RUN go build -ldflags "-s -w" -o main . 



FROM scratch

WORKDIR /app

COPY --from=builder /app/main /app/main

CMD [ "./main" ]
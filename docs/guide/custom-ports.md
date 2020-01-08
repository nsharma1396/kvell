---
id: custom-ports
title: Using Custom Ports in Development
---

For using custom ports in your application, you can either

- Add a `PORT` key in your `.env` file.
- Pass the `PORT` environment variable through the command line.

## Add to .env file

```sh
PORT=8000
```

## Pass `PORT` via command line

### Windows (cmd.exe)

```cmd
set PORT=8000&&npm start
```

(Note: the lack of whitespace is intentional.)

### Windows (Powershell)

```Powershell
($env:PORT = "8000") -and (npm start)
```

### Linux, macOS (Bash)

```sh
PORT=8000 npm start
```

To avoid having to set the environment variable each time, you can either include in the `npm start` script like so:

```json
{
  "start": "PORT=8000 kvell-scripts start"
}
```
# Untitled Angular Book & Author Management App

This project is an Angular application for managing books and authors. It uses Angular Material for UI components and communicates with a backend API via a proxy configuration.

## Features

- Manage books: add, list, and delete books
- Manage authors: add, list, and delete authors
- Material UI with navigation drawer
- Async data loading with RxJS
- Proxy setup for API requests (`/api`)

## Project Structure

- `src/app/feature/book-page`: Book management page and book list
- `src/app/feature/author-page`: Author management page and author list
- `src/app/core/services`: Services for API communication
- `src/app/shared/models`: TypeScript models for Book and Author
- `src/app/app.html`: Main layout with navigation

## Getting Started

To start the development server, run:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
npm start
```

Then open your browser at `http://localhost:4200/`.

## API Proxy

API requests to `/api` are proxied to `https://localhost:32775` as configured in `proxy.conf.json`.

## Building

To build the project:

```bash
npm run build
```

Build artifacts are output to the `dist/` directory.

## Running Unit Tests


To execute unit tests:

```bash
npm run test
```


## Linting

To check code style and quality:

```bash
npm run lint
```

## End-to-End Testing

End-to-end (e2e) testing is not configured by default. You can add your preferred framework.


## Additional Resources

For more information on Angular CLI, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli).

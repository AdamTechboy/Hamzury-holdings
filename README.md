# Hamzury Holding

Mobile-first client journey and staff workspace preview.

## Run locally

```sh
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. No dependency installation or build step is required. Deploy the `dist` folder to a static host.

## Preview limitations

Records use browser-local storage (localStorage and IndexedDB). Role selection is a demonstration, not access control. Shared accounts, server-side permissions, secure uploads, live payments and notifications still require backend implementation. Use sample data only. Browser-local records are not included in this export.

The current hosted site continues independently; GitHub pushes do not automatically deploy it.

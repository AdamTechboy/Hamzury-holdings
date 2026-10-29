# Hamzury Holding

Mobile-first client journey and staff workspace preview.

## Run locally

```sh
python3 -m http.server 8000 --directory dist
```

Open http://localhost:8000. No dependencies or build step are required. Deploy `dist` to a static host.

## Preview limitations

Records stay in the visitor's browser (localStorage and IndexedDB). Role selection is a preview, not access control. Shared accounts, server-side permissions, secure file storage, payments and notifications require backend implementation. Use sample data only. Browser-local records are not included in this export.

The existing hosted site continues independently; GitHub pushes do not automatically deploy it.

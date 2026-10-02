# Catalogue API and staff admin

Laravel 12 and Filament 5. Setup, the database choice, and the API list are in the repository README at the root.

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate --seed --force
php artisan storage:link
php artisan serve --host=127.0.0.1 --port=8000
```

Staff admin: http://127.0.0.1:8000/admin

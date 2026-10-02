<?php

use App\Http\Controllers\Api\CatalogueController;
use App\Http\Controllers\Api\EnquiryController;
use Illuminate\Support\Facades\Route;

Route::get('/products', [CatalogueController::class, 'products']);
Route::get('/products/{slug}', [CatalogueController::class, 'product']);
Route::get('/categories', [CatalogueController::class, 'categories']);
Route::get('/categories/{slug}', [CatalogueController::class, 'category']);
Route::get('/collections', [CatalogueController::class, 'collections']);
Route::get('/collections/{slug}', [CatalogueController::class, 'collection']);
Route::get('/site-settings', [CatalogueController::class, 'settings']);
Route::post('/enquiries', [EnquiryController::class, 'store']);

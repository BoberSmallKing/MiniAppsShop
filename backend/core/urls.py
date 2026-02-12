from django.contrib import admin
from apps.shop.views import ProductListView, CategoryListView, ProductRetrieveView
from apps.orders.views import OrderView
from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/products/", ProductListView.as_view()),
    path("api/products/<int:pk>/", ProductRetrieveView.as_view()),
    path("api/orders/", OrderView.as_view()),
    path("api/categories/", CategoryListView.as_view()),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
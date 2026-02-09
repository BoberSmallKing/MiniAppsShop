from django.contrib import admin
from apps.shop.views import ProductListView, CategoryListView
from apps.orders.views import OrderView
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/products/", ProductListView.as_view()),
    path("api/orders/", OrderView.as_view()),
    path("api/categories/", CategoryListView.as_view()),
]

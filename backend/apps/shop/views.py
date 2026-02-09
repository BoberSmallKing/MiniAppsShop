from rest_framework.generics import ListAPIView
from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer


class CategoryListView(ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductListView(ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_slug = self.request.query_params.get("category")
        if category_slug:
            return Product.objects.filter(category__slug=category_slug)
        return Product.objects.all()

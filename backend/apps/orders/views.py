from rest_framework.generics import ListCreateAPIView
from .models import Order
from .serializers import OrderSerializer

class OrderView(ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    def get_queryset(self):
        user_id = self.request.query_params.get("user_id")
        if user_id:
            return Order.objects.filter(user_id=user_id)
        return super().get_queryset()

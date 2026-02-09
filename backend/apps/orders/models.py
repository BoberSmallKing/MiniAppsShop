from django.db import models

class Order(models.Model):
    user_id = models.CharField(max_length=100)
    items = models.JSONField()
    status = models.CharField(max_length=50, default="new")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order {self.id}"
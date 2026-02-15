from django.db import models

class Order(models.Model):
    user_id = models.CharField("ID пользователя", max_length=100)
    items = models.JSONField("Товары в корзине")
    name = models.CharField("Имя клиента", max_length=100)
    number = models.CharField("Номер телефона", max_length=20)
    description = models.CharField("Комментарий", max_length=500, blank=True)
    status = models.CharField("Статус заказа", max_length=50, default="new", choices=[
        ('new', 'Новый'),
        ('process', 'В работе'),
        ('completed', 'Завершен'),
        ('canceled', 'Отменен'),
    ])
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)

    class Meta:
        verbose_name = "Заказ"
        verbose_name_plural = "Заказы"
        ordering = ['-created_at'] 

    def __str__(self):
        return f"Заказ №{self.id} от {self.name}"
from django.db import models

class Category(models.Model):
    title = models.CharField(max_length=100)
    image = models.ImageField(upload_to="categorys/")
    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.title


class Product(models.Model):
    title = models.CharField(max_length=255)
    price = models.IntegerField()
    image = models.ImageField(upload_to="products/")
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="products"
    )
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title

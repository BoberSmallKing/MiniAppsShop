from django.contrib import admin
from django.utils.html import format_html
from .models import Order

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'status', 'status_colored', 'total_price_display', 'created_at')
    list_editable = ('status',)
    
    search_fields = ('name', 'number', 'id')
    
    list_editable = ('status',)
    
    fieldsets = (
        ('Контактная информация', {
            'fields': ('name', 'number', 'user_id')
        }),
        ('Детали заказа', {
            'fields': ('status', 'items_preview', 'description')
        }),
        ('Служебная информация', {
            'fields': ('created_at',),
            'classes': ('collapse',), # Скрывает блок по умолчанию
        }),
    )
    
    readonly_fields = ('created_at', 'items_preview')

    # Красивое отображение статуса с цветом
    @admin.display(description="Статус")
    def status_colored(self, obj):
        colors = {
            'new': '#007bff',      
            'completed': '#28a745', 
            'canceled': '#dc3545',  
        }
        return format_html(
            '<span style="color: white; background: {}; padding: 3px 10px; border-radius: 10px; font-weight: bold;">{}</span>',
            colors.get(obj.status, '#6c757d'),
            obj.status.upper()
        )

    @admin.display(description="Состав заказа")
    def items_preview(self, obj):
        if not obj.items:
            return "Пусто"
        
        html = '<table style="width:100%; border:1px solid #ddd; border-collapse: collapse;">'
        html += '<tr style="background:#f4f4f4;"><th>Товар</th><th>Кол-во</th><th>Цена</th></tr>'
        
        for item in obj.items:
            html += format_html(
                '<tr style="border-bottom:1px solid #ddd;">'
                '<td style="padding:5px;">{}</td>'
                '<td style="padding:5px; text-align:center;">{} шт.</td>'
                '<td style="padding:5px;">{} ₽</td>'
                '</tr>',
                item.get('title', 'Без названия'),
                item.get('quantity', 1),
                item.get('price', 0)
            )
        html += '</table>'
        return format_html(html)

    @admin.display(description="Сумма")
    def total_price_display(self, obj):
        total = sum(item.get('price', 0) * item.get('quantity', 1) for item in obj.items)
        return f"{total} ₽"

    class Media:
        pass
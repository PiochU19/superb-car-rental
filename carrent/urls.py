from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
	TokenObtainPairView,
	TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),

# account URLs import
    path('', include('account.urls')),

# car URLs import
    path('api/car/', include('car.urls')),

# JSON Web Token Endpoints
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
]


# Additional imports to set up Media
from django.conf import settings
from django.conf.urls.static import static

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
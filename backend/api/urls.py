from django.urls import path
from .views import RegisterView
from .views import SweetCreateView
from .views import SweetSearchView
from .views import SweetDetailView  
from .views import SweetPurchaseView, SweetRestockView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('auth/register/', RegisterView.as_view(), name='register'),
    path('auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('sweets/', SweetCreateView.as_view(), name='sweets'),
    path('sweets/<int:id>/', SweetDetailView.as_view(), name='sweet-detail'),
    path('sweets/search/', SweetSearchView.as_view(), name='sweets-search'),
    path('sweets/<int:id>/purchase/', SweetPurchaseView.as_view(), name='sweet-purchase'),
    path('sweets/<int:id>/restock/', SweetRestockView.as_view(), name='sweet-restock'),
]

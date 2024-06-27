from django.urls import path, include
from rest_framework import routers, permissions, viewsets
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework.routers import DefaultRouter
from pair_paws_app.views import *

router = DefaultRouter()
router.register(r'Pet-mate-requests', PetMateRequestsViewSet)
router.register(r'Pet-mate-matches', PetMateMatchesViewSet)
router.register(r'Pets', PetsViewSet)
router.register(r'Users', UsersViewSet)
router.register(r'Managers', ManagersViewSet)
router.register(r'Admins', AdminsViewSet)
router.register(r'Messages', MessageViewSet)
router.register(r'Reviews', ReviewViewSet)

schema_view = get_schema_view(
    openapi.Info(
        title="PairPaws API",
        default_version='v1',
        description="API PairPaws",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="contact@pairpaws.com"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('api/', include(router.urls)),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]

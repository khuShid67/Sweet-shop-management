from rest_framework import generics
from .serializers import RegisterSerializer
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import generics
from .models import Sweet
from .serializers import SweetSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.shortcuts import get_object_or_404


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

class SweetCreateView(generics.ListCreateAPIView):
    queryset = Sweet.objects.all()
    serializer_class = SweetSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print("User:", request.user)    
        return super().post(request, *args, **kwargs)
    
class SweetSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        name = request.query_params.get('name')
        category = request.query_params.get('category')
        price_min = request.query_params.get('price_min')
        price_max = request.query_params.get('price_max')

        sweets = Sweet.objects.all()

        if name:
            sweets = sweets.filter(name__icontains=name)
        if category:
            sweets = sweets.filter(category__icontains=category)
        if price_min:
            sweets = sweets.filter(price__gte=price_min)
        if price_max:
            sweets = sweets.filter(price__lte=price_max)

        serializer = SweetSerializer(sweets, many=True)
        return Response(serializer.data)

class SweetDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Sweet.objects.all()
    serializer_class = SweetSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = 'id'

    def get_permissions(self):
        if self.request.method == 'DELETE':
            return [IsAdminUser()]  # Only admin can delete
        return [IsAuthenticated()] 
    
class SweetPurchaseView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        sweet = get_object_or_404(Sweet, id=id)
        qty = int(request.data.get('quantity', 1))

        if sweet.quantity < qty:
            return Response({"error": "Not enough stock"}, status=status.HTTP_400_BAD_REQUEST)

        sweet.quantity -= qty
        sweet.save()
        return Response({"message": f"Purchased {qty} of {sweet.name}"}, status=status.HTTP_200_OK)
    
class SweetRestockView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request, id):
        sweet = get_object_or_404(Sweet, id=id)
        qty = int(request.data.get('quantity', 1))

        sweet.quantity += qty
        sweet.save()
        return Response({"message": f"Restocked {qty} of {sweet.name}"}, status=status.HTTP_200_OK)
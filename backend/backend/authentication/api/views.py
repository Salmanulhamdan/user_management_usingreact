from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import permissions, status
from rest_framework.views import APIView
from authentication.models import Account
from .serializers import UserRegisterSerializer, UserSerializer
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken, TokenError
from rest_framework.exceptions import AuthenticationFailed

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):

        print(user, "login side in server")
        token = super().get_token(user)
        

        # Add custom claims
        
        token['email'] = user.email
        token['name'] = user.name
        token['is_superuser'] = user.is_superuser
        print("serialissssss",user.image)
        # token['image'] = user.image


        # ...
        print(token)

        return token


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer




class RegisterView(APIView):
    def post(self, request):
        data = request.data
        print(data,'llll')
        serializer = UserRegisterSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
#currently authenticated user
class UserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class ImageUploadView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def put(self, request, format=None):
        print('image uploaded', request)
        data = request.data["image"]
        print("upload",data)
        user = request.user
        user.image = data
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
class RegisteredUserView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def get(self,request):
        user = Account.objects.exclude(is_superuser=True)
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)  
    
class UpdateView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def post(self, request, id):
        user = Account.objects.get(id = id)
        user.name = request.data['name']
        user.email = request.data['email']
        user.save()
        return Response({"message": "success"}, status = status.HTTP_200_OK)

class DeleteView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def get(self,request, id):
        user = Account.objects.get(id=id)
        user.delete()
        return Response({"message": "success"}, status = status.HTTP_200_OK)
    
# class LogoutView(APIView):
#     def post(self, request):
#         try:
#             refresh_token = request.data['refresh_token']
#             if refresh_token:
#                 token = RefreshToken(refresh_token)
#                 token.blacklist()
#             return Response("Logout Successful", status=status.HTTP_200_OK)
#         except TokenError:
#             raise AuthenticationFailed("Invalid Token")



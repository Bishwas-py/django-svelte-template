from django.urls import path
from .views import auth_views
from .views import confirm_email_views
from .views import forgot_password_views
from .views import users_views

urlpatterns = [
   path('login/', auth_views.login_user, name="login"),
   path('logout/', auth_views.logout_user, name="logout"),
   path('register/', auth_views.register_user, name="register"),

   path('email-confirm/', confirm_email_views.send_confirmation_email, name="send_confirmation_email"),
   path('email-confirm/<str:confirmation_token>/', confirm_email_views.confirm_email, name="confirm_email"),

   path('forgot-password/', forgot_password_views.request_password_token, name="request_password_token"),
   path('forgot-password/reset-password/', forgot_password_views.reset_password, name="reset_password"),

   path('user/<str:username>/', users_views.get_user_by_username, name="update_user"),
]

from django.contrib.auth import get_user_model
from djapy import SessionAuth, djapify
from authentication.schemas.user_schema import ProfileSchema
from generics.schemas import MessageOut

from .models import Profile
from .schemas import CreateProfileSchema

User = get_user_model()

@djapify(auth=SessionAuth, method="POST")
def update_profile(request, data: CreateProfileSchema) -> MessageOut:
    """
    Update user profile information
    """
    profile = Profile.objects.get_or_create(user=request.user)[0]

    # Update profile fields
    if data.bio is not None:
        profile.bio = data.bio
    if data.location is not None:
        profile.location = data.location
    if data.birth_date is not None:
        profile.birth_date = data.birth_date

    # Update user fields
    print("first_name: ", data.first_name)
    if data.first_name is not None:
        profile.user.first_name = data.first_name
    if data.last_name is not None:
        profile.user.last_name = data.last_name

    profile.user.save()
    profile.save()

    return {
        "message": "Profile updated successfully.",
        "message_type": "success",
        "alias": "profile_updated",
    }

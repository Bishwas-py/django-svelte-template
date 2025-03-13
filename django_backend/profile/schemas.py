from datetime import date
from typing import Optional
from djapy.schema import Form

class CreateProfileSchema(Form):
    bio: Optional[str] = None
    location: Optional[str] = None
    birth_date: Optional[date] = None
    first_name: Optional[str] = None
    last_name: Optional[str] = None

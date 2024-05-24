from djapy import Schema


class LinksSchema(Schema):
    id: int
    link_text: str
    link_url: str
    iconify_icon: str

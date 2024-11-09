class MessageValueError(Exception):
   def __init__(self, message: str,
                alias="validation_error",
                message_type="error",
                inline: dict[str, str | list[str]] | None = None,
                action: dict | None = None):
      self.message = message
      self.alias = alias
      self.message_type = message_type
      self.inline = inline
      self.action = action
      super().__init__(message)

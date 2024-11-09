from djapy_ext.exception import MessageValueError


def handle_message_out(request, exception: MessageValueError):
   return 404, {
      'message': exception.message,
      'alias': exception.alias,
      'message_type': exception.message_type,
      'inline': exception.inline,
      'action': exception.action
   }

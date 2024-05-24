MESSAGE_SEPERATOR = '|--|'


def detach_message(msg: str) -> str | list[str]:
    if MESSAGE_SEPERATOR in msg:
        msg = msg.split(MESSAGE_SEPERATOR)
    return msg


def attach_message(msg_list: list[str]) -> str:
    return MESSAGE_SEPERATOR.join(msg_list)

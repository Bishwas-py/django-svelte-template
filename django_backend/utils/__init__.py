def get_client_ip(request):
    """
    Get client's IP address from the request
    :param request: request object
    :return: IP address
    """
    x_forwarded_for = request.headers.get('X-Forwarded-For')
    if x_forwarded_for:
        ip = x_forwarded_for
    else:
        ip = request.META.get('REMOTE_ADDR', None)
    return ip

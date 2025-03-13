"""SvelteKit actions handler."""

from django.http import HttpRequest, HttpResponse
from django.urls import NoReverseMatch, resolve, reverse
from django.views.decorators.csrf import csrf_exempt
from utils.c_logging import logger


@csrf_exempt
def sveltekit_actions_handler(request: HttpRequest) -> HttpResponse:
    """Proxy view to handle SvelteKit actions.

    @param request: HttpRequest
    @return: HttpResponse
    """
    url_name = request.GET.get("url_name")
    try:
        url = reverse(url_name)
        logger.info(f"[PROXY:{request.method}] {url}")
        view_func = resolve(url).func
    except NoReverseMatch:
        return HttpResponse(f"URL '{url_name}' does not exist.", status=404)
    if getattr(view_func, "remove_trigger__", False):
        return HttpResponse(
            f"ViewFunc '{view_func.__name__}' not triggerable.", status=403
        )
    return view_func(request)

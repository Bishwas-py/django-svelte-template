import json

from django.http import HttpResponse
from django.urls import resolve, reverse, NoReverseMatch, path
from django.views.decorators.csrf import csrf_exempt


def prevent_trigger(view_func):
   """
   Wrap a view function to prevent it from being triggered via the trigger_pattern.
   :param view_func:
   :return:
   """
   setattr(view_func, 'remove_trigger__', True)
   return view_func


@csrf_exempt
def proxy(request):
   url_name = request.GET.get('url_name')
   try:
      view_func = resolve(reverse(url_name)).func
   except NoReverseMatch:
      return HttpResponse(f"URL name '{url_name}' does not exist.", status=404)
   if getattr(view_func, 'remove_trigger__', False):
      return HttpResponse(f"View function '{view_func.__name__}' is not triggerable.", status=400)
   return view_func(request)

# Django Svelte Template

Well, the desperate urge of creating awesome webapps using Django had forced you to
search for a well-coupled Svelte template, and you're here.

I can confidently confirm you that this templete has almost everything
you need to work with Django's awesome backend, and SvelteKit powerful frontend.

> Note: This templated strictly supports Svelte 5.

Okay, what now? Obviously, you wanna how to use this template and everything around it.

So, let's start with:

### Prerequisites

We have used powerful tools from both worlds to make this happen, you can see that here:

- For backend: Django, Djapy, Pydantic, [DjangoKit (PyPi)](https://pypi.org/project/django-kit-fos/)
- For frontend: Svelte 5, Tailwind CSS, [DjangoKit (NPM)](https://www.npmjs.com/package/@friendofsvelte/django-kit)

#### For backend

The primary reason of using Django, it has good ORM, and I am comfortable using it. You can
use whatever backend you want with this template, it's extremely compatible.

Using Djapy, well it is bound with Pydantic and Django, with great validations, and
quick, satisfying development process, with Dark-mode swagger in it.

DjangoKit, is actually a url binder or somehow like a request handler. Let's say, it proxifies
SvelteKit requests to Django.

#### For Frontend

No doubts, Svelte is awesome, and I do feel Svelte 5 is awesome too. And `DjangoKit (NPM)` is a really
powerful tool, provides quick and easy ways to integrate django's djapy with sveltekit
frontend, has toast (svelte runes based) and flash notification (cookie based).

And tailwind css obviously, it could be a semi-sin to hate this thing, but yes, if you wanna remove
this, it's perfectly fine.

## Integration of tools

To simplify things, I will start from Svelte part of this template.

### SvelteKit - frontend using Svelte 5

Our frontend is using a lot of magic from the django-kit (npm) library, and
we might feel it's just pure magic going on here, but that's totally not magic.

Making things, even simple, we should start from the very `+layout.svelte` file.

### Flash messages

In `+layout.svelte`, you can see:

```sveltehtml
<script>
    import "../app.css"; // for styling, optional: $items and pages are styled using tailwind css
    import "iconify-icon"; // for icons, optional: $items/Flash.svelte uses this

    import PutFlash from "@friendofsvelte/django-kit/components/PutFlash.svelte";
    import Flash from "$items/Flash.svelte";

    let {children} = $props();
</script>

<PutFlash/>
<Flash/>

{@render children()}
```

`PutFlash` is an components via `@friendofsvelte`, which bind server sent flash
messages to `notifier.toasts` (which you will learn shortly).

`Flash` is an custom written component, within `src/items/` directory, (alias for `$items`).


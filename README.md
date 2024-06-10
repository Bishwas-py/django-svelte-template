# Django Svelte Template

Well, the desperate urge of creating awesome webapps using Django had forced you to
search for a well-coupled Svelte template, and you're here.

I can confidently confirm you that this template has almost everything
you need to work with Django's awesome backend, and SvelteKit powerful frontend.

> Note: This templated strictly supports Svelte 5.

Okay, what now? Obviously, you wanna how to use this template and everything around it.

So, let's start with:

## Prerequisites

We have used powerful tools from both worlds to make this happen, you can see that here:

- For backend: Django, Djapy, Pydantic, [DjangoKit (PyPi)](https://pypi.org/project/django-kit-fos/)
- For frontend: Svelte 5, Tailwind CSS, [DjangoKit (NPM)](https://www.npmjs.com/package/@friendofsvelte/django-kit)

### For backend  <img src="https://skillicons.dev/icons?i=django" width="12">

The primary reason of using Django, it has good ORM, and I am comfortable using it. You can
use whatever backend you want with this template, it's extremely compatible.

Using Djapy, well it is bound with Pydantic and Django, with great validations, and
quick, satisfying development process, with Dark-mode swagger in it.

DjangoKit, is actually an url binder or somehow like a request handler. Let's say,
it serves as a proxy for SvelteKit requests to Django.

### For Frontend  <img src="https://skillicons.dev/icons?i=svelte" width="12">

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

#### Flash messages

In `src/+layout.svelte`, you can see:

```svelte
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

`PutFlash` is a components via `@friendofsvelte/django-kit`, which bind server sent flash
messages to `notifier.toasts` (which you will learn shortly).

`Flash` is a custom written component, within `src/items/` directory, (alias for `$items`).

`@friendofsvelte/django-kit` also provides a `Flash` component inside, `components/Flash.svelte`.

#### Current user and site info

Now, let's have a simple look at `src/+layout.server.ts`,

```ts
import type {LayoutServerLoad} from "./$types";

export const load: LayoutServerLoad = async (event) => {
    return {
        current_user: event.locals.current_user,
        site_data: event.locals.site_data
    };
};
```

`event.locals` is assigned by `hooks.server.ts`, which is a middleware for the server.

#### Form handling and validation

Well, this is my favorite part, and I am sure you will love it too. Using DjangoKit and Djapy
makes it really easy to handle forms and validations.

##### Components Info

In `src/items/`, you can see a `Form.svelte` file, which is a custom form component, you are not
required to use this, but it has some extra features, like `loading` state boolean, enhanced-forms actions
and `after` submit callback.

`$items/Error.svelte` is a component which is used to show errors, it filters out the errors
sent by the server (using Pydantic), and shows them in a nice way.

```svelte
<script lang="ts">
    import Error from "$items/Error.svelte";
</script>

<input type="text" name="username"/>
<Error for="username"/>
```

This will show the error for the `username` field, if any.

Also, `<PutFlash/>` binds every error sent in the following way:

```json
{
  "message": "Error message",
  "message_type": "error",
  "alias": "error",
  "action": {
    "path": "/login",
    "label": "Login here"
  }
}
```

`message` and `message_type` are required, else are optional.

##### Form actions

The most favorite part of this template, is the form actions. Let's have a look at our `src/routes/+page.svelte`,

```svelte
<Form action="?/create_todo" method="post" ...>
    ...
</Form>
<!--use html `form` tag if you want to use the default form action; perfectly fine-->
```

`?/create_todo` is a form action, which is a path name (or urlname) for the form action, which is
handled by DjangoKit, and it will be proxied to Django.

For that you have to index the form action in `src/routes/+page.server.ts`,

```ts
import {via_route, via_route_name} from "@friendofsvelte/django-kit/server/actions";

export const actions = via_route_name('create_todo');
```

`via_route_name` is a powerful and dynamic function, you can pass multiple route names and their
required methods, and it will handle the form submission for you.

It's not just limited to form actions, you can use it for any action, like `GET`, `POST`, `PUT`, `DELETE`.

```ts
export const actions = via_route_name([
    {name: 'create_todo', method: 'POST'},
    {name: 'delete_todo', method: 'DELETE'},
]);
```

> **Note**: for `via_route_name` to work you have to install `djagno-kit-fos` in your Django project, and set it up.
> ```python
> from django_kit_fos import trigger_pattern
> urlpatterns = [..., *trigger_pattern]
> ```

OR,

```ts
export const actions = via_route(['update',], {prefix: 'todos'})
```

OR, mixed

```ts
export const actions = {
    ...via_route_name([{name: 'create_todo', method: 'POST'}, {name: 'delete_todo', method: 'DELETE'},]),
    ...via_route(['update',], {prefix: 'todos'})
}
```

#### Rendering data

In `src/routes/+page.server.ts`, you can see:

```ts
export const load: PageServerLoad = async (event) => {
    if (!event.locals.current_user) {
        flash_redirect(event.cookies, {
            alias: 'error',
            message: 'You need to be logged in to access the dashboard.',
            message_type: 'error'
        }, 302, '/login')
    }
    return {
        todos: await get_todos(event)
    }
}
```

Here, `get_todos` is a function which is used to get the todos from the server, and it
uses `get_paginator` to get the paginated data.

If user is not logged in, it will redirect the user to the login page with an error message.

> **Note**: You can use `flash_redirect` to redirect with a flash message, it's a helper function.
> Or you can use `redirect` to redirect without a flash message.
> Or you can use `put_flash` to put a flash message without redirecting,
> `import {put_flash} from '@friendofsvelte/django-kit'`;

#### Hooks: Authentication and Site data

For each first visit in a page, it triggers `handleAuth` which assigns `event.locals.current_user` and
`event.locals.site_data` to the event, which is used in `src/+layout.server.ts`.

`handleAuth` uses the `get_init_data` function is used to get data.
`handleAuth` later saves the cookies sent by the server, and assigns the data (site and user) to the event.

To make fetching data to backend easier, we are using `django_fetch_handle`:

```ts
import {django_fetch_handle} from "@friendofsvelte/django-kit/server/handle";

export const handleFetch = django_fetch_handle;
```

It allows you to request to backend endpoints by using `$api/` alias:

```ts
event.fetch(`$api/path/to/endpoint`, {
    method: 'POST',
    body: JSON.stringify({data: 'data'}),
    headers: {
        'Content-Type': 'application/json'
    }
})
```

You can use this alias on `load` functions, forms `actions` or anywhere where
you need to fetch data from the backend via `event.fetch`. It's the SvelteKit
feature, extended by `django-kit`.

### Backend - using Django and Djapy

The backend, it's actually the heart of this template, and it's the most important part.
It is completely rich with features, and you can use it for other projects as well.

It has session based authentication, permissions, paginated data, forgot password, reset password,
confirm email, and a lot more.

It is inside `django_backend/` directory, and it's a Django project.

#### Authentication

The `authentication` app is responsible for handling the authentication, and it has a lot of features.

* [auth_views.py](django_backend%2Fauthentication%2Fviews%2Fauth_views.py)
* [confirm_email_views.py](django_backend%2Fauthentication%2Fviews%2Fconfirm_email_views.py)
* [forgot_password_views.py](django_backend%2Fauthentication%2Fviews%2Fforgot_password_views.py)
* [users_views.py](django_backend%2Fauthentication%2Fviews%2Fusers_views.py)

It has four major views files, each fulfilling a specific task, related to their name.
You can check [urls.py](django_backend%2Fauthentication%2Furls.py) for more info.


# Django Svelte Template 🚀

A powerful, modern web application template that combines Django's robust backend with SvelteKit's reactive frontend. This template provides everything you need to build full-stack web applications with best practices and modern tooling.

[![Django](https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=white)](https://www.djangoproject.com/)
[![Svelte](https://img.shields.io/badge/SvelteKit-FF3E00?style=flat&logo=svelte&logoColor=white)](https://kit.svelte.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

> **Note**: This template uses Svelte 5 with Runes [Strict]

## 🚀 Quick Start

1. **Clone the Repository**
   ```bash
   git clone git@github.com:Bishwas-py/django-svelte-template.git
   cd django-svelte-template
   ```

2. **Run Initial Setup**
   ```bash
   # Run the configuration script
   ./configure
   
   # Initialize development tools
   source bin/setup
   ```

   The setup process will:
   - Check and install required dependencies
   - Create a Python virtual environment
   - Set up configuration files (db.py, env.py, mail.py)
   - Install frontend dependencies
   - Set up pre-commit hooks
   - Make development commands available

3. **Start Development Servers**
   ```bash
   run  # Starts all development servers
   ```

   This will start:
   - Django backend at `http://localhost:8000`
   - SvelteKit frontend at `http://localhost:5173`
   - Test email server at `localhost:1725`

4. **Format Code (Optional)**
   ```bash
   format  # Runs pre-commit hooks to format and lint all files
   ```

✨ After setup, you'll see a feature-rich todo app demonstrating the template's capabilities. Feel free to remove it and start building your own application.

## 🛠️ Project Structure

### Development Tools
- **`configure`**: Initial project setup script that:
  - Sets up Python virtual environment
  - Installs project dependencies
  - Creates configuration files
  - Sets up pre-commit hooks
- **`bin/setup`**: Development environment initialization
- **`bin/run`**: Unified development server management

### Backend Technologies
- **Django**: Production-ready web framework with powerful ORM and admin interface
- **Djapy**: Django-Pydantic integration for robust API validation
- **Pydantic**: Data validation using Python type annotations
- **[DjangoKit](https://pypi.org/project/django-kit-fos/)**: Seamless SvelteKit-Django request handling

### Frontend Technologies
- **SvelteKit**: Next-generation frontend framework with Svelte 5
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **TypeScript**: Enhanced type safety and developer experience

### Key Features
- ✅ Automated development environment setup
- ✅ Type-safe API interactions
- ✅ Built-in form validation
- ✅ Toast notifications system
- ✅ Flash messages support
- ✅ Dark mode Swagger UI
- ✅ Modern, responsive UI components
- ✅ Code formatting and linting with pre-commit hooks

## 📚 Component Documentation

### Layout and Base Components

The template uses a standard SvelteKit layout structure with TypeScript integration. The base layout file (`src/+layout.svelte`) sets up core functionality:

```svelte
<script>
    import "../app.css";
    import PutFlash from "$items/PutFlash.svelte";
    import Flash from "$items/Flash.svelte";

    let {children} = $props();
</script>

<PutFlash/>
<Flash/>
{@render children()}
```

### Notification System

#### Flash Messages
Server-side flash messages are handled by the `PutFlash` and `Flash` components (`src/items/`):

```json
{
  "message": "Error message",     // Required: Message content
  "message_type": "error",      // Required: error, success, info, warning
  "alias": "error",             // Optional: For message grouping
  "action": {                     // Optional: Call-to-action button
    "path": "/login",
    "label": "Login here"
  }
}
```

#### Client-Side Notifications
Use the `notifier` store for client-side toast notifications:

```typescript
import { add_toast, dismiss_toast_after } from "$lib/stores/notifier.svelte";

// Persistent toast
add_toast({
    message: 'Hello World',
    message_type: 'success'
});

// Auto-dismissing toast
dismiss_toast_after(
    add_toast({
        message: 'Hello World',
        message_type: 'success'
    })
);
```

Example component usage:
```svelte
<script>
    import { add_toast, dismiss_toast_after } from "@friendofsvelte/django-kit/notifier";
</script>

<button 
    onclick={() => {
        dismiss_toast_after(
            add_toast({
                message: 'Hello World',
                message_type: 'success'
            })
        )
    }}
>
    Show Notification
</button>
```

### User and Site Data

User and site data are loaded through SvelteKit's server-side load functions:

```typescript
// src/+layout.server.ts
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
    return {
        current_user: event.locals.current_user,
        site_data: event.locals.site_data
    };
};
```

This data is populated by the server middleware in `hooks.server.ts`.

### Form Components

The template provides robust form handling through two main components:

1. **Form Component** (`src/items/Form.svelte`)
   - Loading state management
   - Enhanced form actions
   - Post-submit callbacks
   - Automatic error handling

2. **Error Component** (`src/items/Error.svelte`)
   - Seamless Pydantic validation integration
   - User-friendly error display
   - Automatic error filtering and formatting

https://github.com/Bishwas-py/django-svelte-template/assets/42182303/2910fa0c-a850-4a93-8c93-cc9cca51a473

```svelte
<script lang="ts">
    import Error from "$items/Error.svelte";
</script>

<input type="text" name="username"/>
<Error for="username" {uniq}/>
```

The `uniq` prop is provided by the parent `Form` component to associate errors with specific fields.

### Form Actions and Data Handling

#### Basic Form Actions
```svelte
<!-- src/routes/+page.svelte -->
<Form action="?/create_todo" method="post">
    <!-- Form fields -->
</Form>
```

Register form actions in `src/routes/+page.server.ts`:
```typescript
import { repl } from "$lib/server/repl";

// Single action
export const actions = repl('create_todo');

// Multiple actions with methods
export const actions = repl([
    { name: 'create_todo', method: 'POST' },
    { name: 'delete_todo', method: 'DELETE' }
]);
```

#### Dynamic Endpoints
```svelte
<Form action="?/call&s=/todos/update/{todo.id}/&m=post">
    <!-- Form fields -->
</Form>
```

#### Server-Side Data and Redirects
```typescript
// src/routes/+page.server.ts
import flashRedirect from "$lib/server/flash";

export const load: PageServerLoad = async (event) => {
    if (!event.locals.current_user) {
        flashRedirect(event.cookies, {
            message: 'Login required',
            message_type: 'error'
        }, 302, '/login');
    }
    return { todos: await get_todos(event) };
}
```

### API Communication

Use the `$api` alias for backend requests:
```typescript
event.fetch(`$api/endpoint`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
});
```

## 🛠️ Backend Architecture

### Authentication System
The `authentication` app (`django_backend/authentication/`) provides:
- Session-based authentication
- Email verification
- Password reset
- User management

Key components:
- `auth_views.py`: Core authentication
- `confirm_email_views.py`: Email verification
- `forgot_password_views.py`: Password recovery
- `users_views.py`: User management

### Application Structure
- Each Django app contains:
  - `schema.py`: Pydantic models
  - `views.py`: API endpoints
  - `urls.py`: URL routing

### Home App
The `home` app provides:
- Initial data loading
- User session management
- CSRF protection
- Site configuration

## 👨‍💻 Development Workflow

### Using the Development Tools

After running `source bin/setup`, you'll have access to:

1. **`run` Command**
   ```bash
   run  # Starts all development servers
   ```
   - Django backend: `http://localhost:8000`
   - SvelteKit frontend: `http://localhost:5173`
   - Email server: `localhost:1725`

2. **`format` Command**
   ```bash
   format  # Runs pre-commit hooks
   ```
   - Formats code
   - Runs linters
   - Ensures code quality

The development servers can be started from any project directory, and hot-reloading is enabled for both frontend and backend changes.

### Demo
https://youtu.be/d3cCsptNcgg

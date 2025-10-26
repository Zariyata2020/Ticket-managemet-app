<?php
session_start();

require_once __DIR__ . '/../vendor/autoload.php';

use Twig\Environment;
use Twig\Loader\FilesystemLoader;

// Initialize Twig
$loader = new FilesystemLoader(__DIR__ . '/../templates');
$twig = new Environment($loader, [
    'cache' => __DIR__ . '/../cache',
    'debug' => true,
]);

// Simple routing
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request_uri = str_replace('/twig-app/public', '', $request_uri);
if (empty($request_uri)) $request_uri = '/';

// Check authentication
$is_authenticated = isset($_SESSION['user']);

// Route handling
switch ($request_uri) {
    case '/':
        echo $twig->render('landing.html.twig');
        break;

    case '/auth/login':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';
            $error = '';

            if (empty($email) || empty($password)) {
                $error = 'Please fill in all fields';
            } elseif (strpos($email, '@') === false) {
                $error = 'Please enter a valid email';
            } else {
                $_SESSION['user'] = [
                    'email' => $email,
                    'id' => bin2hex(random_bytes(5)),
                    'name' => explode('@', $email)[0],
                ];
                header('Location: /twig-app/public/dashboard');
                exit;
            }

            echo $twig->render('auth/login.html.twig', ['error' => $error]);
        } else {
            echo $twig->render('auth/login.html.twig');
        }
        break;

    case '/auth/signup':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $name = $_POST['name'] ?? '';
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';
            $confirm_password = $_POST['confirm_password'] ?? '';
            $error = '';

            if (empty($name) || empty($email) || empty($password) || empty($confirm_password)) {
                $error = 'Please fill in all fields';
            } elseif (strpos($email, '@') === false) {
                $error = 'Please enter a valid email';
            } elseif ($password !== $confirm_password) {
                $error = 'Passwords do not match';
            } elseif (strlen($password) < 6) {
                $error = 'Password must be at least 6 characters';
            } else {
                $_SESSION['user'] = [
                    'email' => $email,
                    'id' => bin2hex(random_bytes(5)),
                    'name' => $name,
                ];
                header('Location: /twig-app/public/dashboard');
                exit;
            }

            echo $twig->render('auth/signup.html.twig', ['error' => $error]);
        } else {
            echo $twig->render('auth/signup.html.twig');
        }
        break;

    case '/dashboard':
        if (!$is_authenticated) {
            header('Location: /twig-app/public/auth/login');
            exit;
        }
        echo $twig->render('dashboard.html.twig', ['user' => $_SESSION['user']]);
        break;

    case '/dashboard/tickets':
        if (!$is_authenticated) {
            header('Location: /twig-app/public/auth/login');
            exit;
        }

        // Load tickets from file
        $tickets_file = __DIR__ . '/../data/tickets.json';
        $tickets = [];
        if (file_exists($tickets_file)) {
            $tickets = json_decode(file_get_contents($tickets_file), true) ?? [];
        } else {
            // Initialize with sample data
            $tickets = [
                [
                    'id' => '1',
                    'title' => 'Fix login bug',
                    'description' => 'Users unable to login with special characters',
                    'status' => 'open',
                    'priority' => 'high',
                    'createdAt' => date('c'),
                    'updatedAt' => date('c'),
                ],
                [
                    'id' => '2',
                    'title' => 'Add dark mode',
                    'description' => 'Implement dark mode theme',
                    'status' => 'in-progress',
                    'priority' => 'medium',
                    'createdAt' => date('c'),
                    'updatedAt' => date('c'),
                ],
                [
                    'id' => '3',
                    'title' => 'Update documentation',
                    'description' => 'Update API documentation',
                    'status' => 'closed',
                    'priority' => 'low',
                    'createdAt' => date('c'),
                    'updatedAt' => date('c'),
                ],
            ];
            @mkdir(dirname($tickets_file), 0755, true);
            file_put_contents($tickets_file, json_encode($tickets, JSON_PRETTY_PRINT));
        }

        // Handle CRUD operations
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $action = $_POST['action'] ?? '';

            if ($action === 'create') {
                $new_ticket = [
                    'id' => bin2hex(random_bytes(5)),
                    'title' => $_POST['title'] ?? '',
                    'description' => $_POST['description'] ?? '',
                    'status' => $_POST['status'] ?? 'open',
                    'priority' => $_POST['priority'] ?? 'medium',
                    'createdAt' => date('c'),
                    'updatedAt' => date('c'),
                ];

                if (!empty($new_ticket['title']) && !empty($new_ticket['description'])) {
                    $tickets[] = $new_ticket;
                    file_put_contents($tickets_file, json_encode($tickets, JSON_PRETTY_PRINT));
                }
            } elseif ($action === 'update') {
                $ticket_id = $_POST['id'] ?? '';
                foreach ($tickets as &$ticket) {
                    if ($ticket['id'] === $ticket_id) {
                        $ticket['title'] = $_POST['title'] ?? $ticket['title'];
                        $ticket['description'] = $_POST['description'] ?? $ticket['description'];
                        $ticket['status'] = $_POST['status'] ?? $ticket['status'];
                        $ticket['priority'] = $_POST['priority'] ?? $ticket['priority'];
                        $ticket['updatedAt'] = date('c');
                        break;
                    }
                }
                file_put_contents($tickets_file, json_encode($tickets, JSON_PRETTY_PRINT));
            } elseif ($action === 'delete') {
                $ticket_id = $_POST['id'] ?? '';
                $tickets = array_filter($tickets, fn($t) => $t['id'] !== $ticket_id);
                $tickets = array_values($tickets);
                file_put_contents($tickets_file, json_encode($tickets, JSON_PRETTY_PRINT));
            }

            header('Location: /twig-app/public/dashboard/tickets');
            exit;
        }

        $filter = $_GET['filter'] ?? 'all';
        $filtered_tickets = $filter === 'all' ? $tickets : array_filter($tickets, fn($t) => $t['status'] === $filter);

        echo $twig->render('tickets.html.twig', [
            'user' => $_SESSION['user'],
            'tickets' => array_values($filtered_tickets),
            'all_tickets' => $tickets,
            'filter' => $filter,
        ]);
        break;

    case '/logout':
        session_destroy();
        header('Location: /twig-app/public/');
        exit;

    default:
        http_response_code(404);
        echo $twig->render('404.html.twig');
}

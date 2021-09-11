- [11.09](#1109)
- [08.10](#0810)
- [08.09](#0809)
- [07.09](#0709)
- [05.09](#0509)
# 11.09
- Added dependency injection support. It can only be used for `__construct` without requiring mandatory parameters. It continues to be developed.
  - [Injection.php](src/Reflection/Injection.php)
- Deleted Errors
- 
# 08.10
- The parameters defined in the router must be the same as both the name and the sequence in the relevant function or method. example: `$router->get('/users/:username/:postId/:comments', "UserController@index");` and `public function index($username, $postId, $comments)`
  - [Related section](src/Reflection/Method.php#L62)
# 08.09
- Updated [`path`](src/Helper/helpers.php#L34) helper.
- Updated [`Request`](src/Request/Request.php)
- Added [`Route`](src/Router/Route.php) 
- Added PUT HTTP method support.
# 07.09
- [added](src/Router/Route.php) a new object 
# 05.09
- Returns 404 if HTTP methods are false. So if `/home` is `POST` it will return 404 for the request with `GET`.
- Added HTTP methods
  - post, get, put, patch and delete.
- Added `name`. Calling the route has been made easier.
- Added `path` method. The path method makes it easy to call the corresponding route with the unique name given.

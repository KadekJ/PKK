<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use App\User;
use Auth;
class UserController extends Controller
{

  function __construct()
  {

  }

  public function get()
  {
    $user = [];
    foreach (User::all() as $u) {
      $item = [
        "id_user" => $u->id_user,
        "nama_user" => $u->nama_user,
        "username" => $u->username,
        "password" => Crypt::decrypt($u->password)
      ];
      array_push($user, $item);
    }
    return response([
      "user" => $user
    ]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $users = User::where("nama_user","like","%$find%")->orWhere("username","like","%$find%")->get();
    $user = [];
    foreach ($users as $u) {
      $item = [
        "id_user" => $u->id_user,
        "nama_user" => $u->nama_user,
        "username" => $u->username,
        "password" => Crypt::decrypt($u->password)
      ];
      array_push($user, $item);
    }
    return response([
      "user" => $user
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {
        $user = new User();
        $user->nama_user = $request->nama_user;
        $user->username = $request->username;
        $user->password = Crypt::encrypt($request->password);
        $user->save();
        return response(["message" => "Data user berhasil ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }else if($action == "update"){
      try {
        $user = User::where("id_user", $request->id_user)->first();
        $user->nama_user = $request->nama_user;
        $user->username = $request->username;
        $user->password = Crypt::encrypt($request->password);
        $user->save();
        return response(["message" => "Data user berhasil diubah"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($id_user)
  {
    try {
      User::where("id_user", $id_user)->delete();
      return response(["message" => "Data user berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }

  public function auth(Request $request)
  {
    $username = $request->username;
    $password = $request->password;

    $user = User::where("username", $username);
    if ($user->count() > 0) {
      // login sukses
      $u = $user->first();
      if(Crypt::decrypt($u->password) == $password){
        return response(["status" => true, "user" => $u, "token" => Crypt::encrypt($u->id_user)]);
      }else{
        return response(["status" => false]);
      }
    }else{
      return response(["status" => false]);
    }
  }
}
 ?>

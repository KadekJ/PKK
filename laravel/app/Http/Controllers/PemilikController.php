<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Pemilik;
use Auth;
class PemilikController extends Controller
{

  function __construct()
  {

  }

  public function get()
  {
    return response([
      "pemilik" => Pemilik::all()
    ]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $pemilik = Pemilik::where("nama_pemilik","like","%$find%")
    ->orWhere("alamat","like","%$find%")->orWhere("telepon","like","%$find%")->get();
    return response([
      "pemilik" => $pemilik
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {
        $pemilik= new Pemilik();
        $pemilik->nama_pemilik = $request->nama_pemilik;
        $pemilik->alamat = $request->alamat;
        $pemilik->telepon = $request->telepon;
        $pemilik->save();
        return response(["message" => "Data Pemilik Berhasil Ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }else if($action == "update"){
      try {
        $pemilik = Pemilik::where("id_pemilik", $request->id_pemilik)->first();
        $pemilik->nama_pemilik = $request->nama_pemilik;
        $pemilik->alamat = $request->alamat;
        $pemilik->telepo = $request->telepon;
        $pemilik->save();
        return response(["message" => "Data Pemilik berhasil diubah"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($id_pemilik)
  {
    try {
      Pemilik::where("id_pemilik", $id_pemilik)->delete();
      return response(["message" => "Data Pemilik berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
}
 ?>

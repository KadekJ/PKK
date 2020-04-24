<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Penyewa;
use Auth;
class PenyewaController extends Controller
{

  function __construct()
  {

  }

  public function get()
  {
    return response([
      "penyewa" => Penyewa::all()
    ]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $penyewa = Penyewa::where("nik","like","%$find%")->orWhere("nama_penyewa","like","%$find%")
    ->orWhere("alamat","like","%$find%")->get();
    return response([
      "penyewa" => $penyewa
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {
        $penyewa = new Penyewa();
        $penyewa->nik = $request->nik;
        $penyewa->nama_penyewa = $request->nama_penyewa;
        $penyewa->alamat = $request->alamat;
        $penyewa->save();
        return response(["message" => "Data Penyewa Berhasil Ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }else if($action == "update"){
      try {
        $penyewa = Penyewa::where("id_penyewa", $request->id_penyewa)->first();
        $penyewa->nik = $request->nik;
        $penyewa->nama_penyewa = $request->nama_penyewa;
        $penyewa->alamat = $request->alamat;
        $penyewa->save();
        return response(["message" => "Data Penyewa berhasil diubah"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($id_penyewa)
  {
    try {
      Penyewa::where("id_penyewa", $id_penyewa)->delete();
      return response(["message" => "Data Penyewa berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
}
 ?>

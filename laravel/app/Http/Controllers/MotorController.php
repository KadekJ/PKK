<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Motor;
use Auth;
class MotorController extends Controller
{

  function __construct()
  {

  }

  public function get()
  {
    return response([
      "motor" => Motor::all()
    ]);
  }

  public function find(Request $request)
  {
    $find = $request->find;
    $motor = Motor::where("nama_pemilik","like","%$find%")->orWhere("jenis_motor","like","%$find%")
    ->orWhere("tahun","like","%$find%")->get();
    return response([
      "motor" => $motor
    ]);
  }

  public function save(Request $request)
  {
    $action = $request->action;
    if ($action == "insert") {
      try {
        $motor = new Motor();
        $motor->nama_pemilik = $request->nama_pemilik;
        $motor->jenis_motor = $request->jenis_motor;
        $motor->tahun = $request->tahun;
        $motor->save();
        return response(["message" => "Data Motor Berhasil Ditambahkan"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }else if($action == "update"){
      try {
        $motor = Motor::where("id_motor", $request->id_motor)->first();
        $motor->nama_pemilik = $request->nama_pemilik;
        $motor->jenis_motor = $request->jenis_motor;
        $motor->tahun = $request->tahun;
        $motor->save();
        return response(["message" => "Data Motor berhasil diubah"]);
      } catch (\Exception $e) {
        return response(["message" => $e->getMessage()]);
      }
    }
  }

  public function drop($id_motor)
  {
    try {
      Motor::where("id_motor", $id_motor)->delete();
      return response(["message" => "Data Motor berhasil dihapus"]);
    } catch (\Exception $e) {
      return response(["message" => $e->getMessage()]);
    }
  }
}
 ?>
